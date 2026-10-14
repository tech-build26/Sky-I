const { chromium } = require('C:/Users/ISHE-GAMING/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('node:fs'); const path = require('node:path');
const assert = (ok, message) => { if (!ok) throw Error(message); };
(async () => {
  const origin = process.env.REVIEW_ORIGIN || 'http://localhost:3006';
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const results = [], errors = [];
  const observe = page => {
    page.on('pageerror', e => errors.push(e.message)); const requests = [];
    page.on('request', r => { if (r.url().includes('/videos/')) requests.push(r.url()); }); return requests;
  };
  for (const [width, height] of [[1440,900],[1280,800],[1200,800],[1024,768],[768,1024],[390,844],[320,740],[844,390]]) {
    if(process.env.REVIEW_WIDTH && width!==Number(process.env.REVIEW_WIDTH)) continue;
    const page = await browser.newPage({ viewport: { width, height } }); const requests = observe(page);
    await page.goto(origin + '/home/'); await page.waitForTimeout(1700);
    assert(requests.length === 0, `video downloaded in hero ${width}`);
    assert(await page.locator('#opening a[href*="inspections"],#opening a[href*="washing"]').count() === 3, 'hero choices');
    assert(await page.locator('#opening video').count() === 0, 'hero changed');
    for (const id of ['about', 'impact']) {
      const video = page.locator(`#${id} video`);
      await video.scrollIntoViewIfNeeded();
      await page.waitForFunction(id => { const v = document.querySelector(`#${id} video`); return !v.paused && v.readyState >= 2 && v.currentTime > .2; }, id);
      await page.waitForTimeout(1000);
      const state = await video.evaluate(v => {
        const r = v.getBoundingClientRect(); return { x:r.x, width:r.width, height:r.height, right:r.right, time:v.currentTime, muted:v.muted, inline:v.playsInline, loop:v.loop, fit:getComputedStyle(v).objectFit, sourceWidth:v.videoWidth, sourceHeight:v.videoHeight, filter:getComputedStyle(v).filter, overflow:document.documentElement.scrollWidth > innerWidth };
      });
      assert(!state.overflow && state.x >= 0 && state.right <= width + 1, `bounds ${width}/${id}`);
      assert(state.muted && state.inline && state.loop && state.time > 0, `playback ${width}/${id} ${JSON.stringify(state)}`);
      if (id === 'about') assert(state.fit === 'contain' && Math.abs(state.width/state.height - 16/9) < .01, 'full frame');
      assert(state.filter === 'none', 'footage filter');
      await page.locator(`#${id}`).screenshot({ path: path.join(__dirname, `${origin.endsWith('3006')?'dev':'production'}-${id}-${width}.png`) });
      await page.locator('#contact').scrollIntoViewIfNeeded();
      await page.waitForFunction(id=>document.querySelector(`#${id} video`).paused,id,{timeout:5000}).catch(async e=>{ console.log('pause failure',width,id,await video.evaluate(v=>({paused:v.paused,y:v.getBoundingClientRect().y,bottom:v.getBoundingClientRect().bottom,scrollY,viewport:innerHeight}))); throw e; });
      results.push({ width, height, id, ...state, offscreenPaused:true });
    }
    await page.close();
  }
  for (const mode of ['reduced', 'no-js', 'failure', 'save-data']) {
    const context = await browser.newContext({ viewport:{width:390,height:844}, reducedMotion:mode==='reduced'?'reduce':'no-preference', javaScriptEnabled:mode!=='no-js' });
    if (mode==='save-data') await context.addInitScript(() => Object.defineProperty(navigator,'connection',{value:{saveData:true}}));
    const page = await context.newPage(); const requests = observe(page);
    if (mode==='failure') await page.route('**/videos/**', r => r.abort());
    await page.goto(origin+'/home/#about');
    for (const id of ['about','impact']) {
      await page.locator(`#${id} video`).scrollIntoViewIfNeeded(); await page.waitForTimeout(1200);
      const state = await page.locator(`#${id} video`).evaluate(v => ({ paused:v.paused, src:v.getAttribute('src'), poster:v.poster }));
      assert(state.paused && !state.src && state.poster, `fallback ${mode}/${id}`);
      const action = page.locator(id==='about'?'#about a[href="#skyi-about-story"]':'#impact a[href="#contact"]');
      await action.focus(); await page.keyboard.press('Enter'); await page.waitForTimeout(400);
      assert(page.url().endsWith(id==='about'?'#skyi-about-story':'#contact'), 'fallback action');
      results.push({mode,id,...state});
    }
    if(mode!=='failure') assert(requests.length===0,'fallback fetch '+mode);
    await context.close();
  }
  const page = await browser.newPage({ viewport:{width:390,height:844} }); observe(page);
  await page.goto(origin+'/home/#about'); await page.locator('#about video').scrollIntoViewIfNeeded();
  await page.waitForFunction(() => !document.querySelector('#about video').paused);
  const menu = page.getByRole('button',{name:'Menu',exact:true});
  await menu.focus(); await menu.click();
  await page.waitForFunction(()=>document.querySelector('#about video').paused);
  assert(await page.locator('#about video').evaluate(v=>v.paused),'menu pause');
  await page.getByRole('button',{name:'Close',exact:true}).click();
  await page.waitForFunction(()=>!document.querySelector('#about video').paused);
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.waitForFunction(()=>document.querySelector('#about video').paused);
  assert(await page.locator('#about video').evaluate(v=>v.paused),'live reduced pause');
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.waitForFunction(()=>!document.querySelector('#about video').paused);
  const hidden = await page.evaluate(async()=>{
    Object.defineProperty(document,'hidden',{configurable:true,value:true}); document.dispatchEvent(new Event('visibilitychange'));
    await new Promise(r=>setTimeout(r,100)); return document.querySelector('#about video').paused;
  });
  assert(hidden,'hidden handler');
  await page.evaluate(()=>{delete document.hidden; document.dispatchEvent(new Event('visibilitychange'));});
  await page.waitForFunction(()=>!document.querySelector('#about video').paused);
  results.push({lifecycle:'menu/reduced/visibility handler',passed:true,visibility:'simulated hidden state'});
  assert(!errors.length,errors.join('\n'));
  fs.writeFileSync(path.join(__dirname,origin.endsWith('3006')?'development-verification.json':'verification.json'),JSON.stringify({origin,results,errors},null,2));
  console.log(JSON.stringify({origin,checks:results.length,errors})); await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
