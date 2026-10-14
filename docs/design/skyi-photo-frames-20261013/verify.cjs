const { chromium } = require('C:/Users/ISHE-GAMING/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('fs');
const origin = process.argv[2] || 'http://localhost:3006';
const folder = 'docs/design/skyi-photo-frames-20261013/';
const assert = (ok, message) => { if (!ok) throw Error(message); };
(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const results = [], errors = [];
  for (const [width,height] of [[1440,1000],[1920,1080],[1024,768],[768,1024],[390,844],[320,700],[740,390]]) {
    const page = await browser.newPage({ viewport:{width,height}, reducedMotion:'reduce' });
    page.on('pageerror', e => errors.push(e.message));
    await page.goto(origin+'/home/');
    const sections = {};
    for (const id of ['services','safety']) {
      const section = page.locator('#'+id);
      await section.scrollIntoViewIfNeeded();
      await section.locator('img[src*="field-"]').evaluateAll(async imgs => { await Promise.all(imgs.map(img => img.decode())); });
      sections[id] = await section.evaluate(n => ({height:n.offsetHeight,width:n.offsetWidth,overflow:n.scrollWidth>n.clientWidth,photos:[...n.querySelectorAll('img[src*="field-"]')].map(img=>({alt:img.alt,loaded:img.complete&&img.naturalWidth>0,lazy:img.loading==='lazy',width:img.width,height:img.height,fit:getComputedStyle(img).objectFit}))}));
      assert(!sections[id].overflow, 'Section overflow '+id+' '+width);
      assert(sections[id].photos.every(p=>p.loaded&&p.lazy&&p.width>0&&p.height>0), 'Photo load/dimensions '+id+' '+width);
      const frames=await section.locator('[data-sketch-frame]').evaluateAll(nodes=>nodes.map(n=>{
        const svg=n.querySelector('svg'), rect=svg.getBoundingClientRect(), caption=n.closest('figure').querySelector('figcaption').getBoundingClientRect();
        return {left:rect.left,right:rect.right,bottom:rect.bottom,captionTop:caption.top+parseFloat(getComputedStyle(n.closest('figure').querySelector('figcaption')).paddingTop),decorative:svg.getAttribute('aria-hidden')==='true'&&svg.getAttribute('focusable')==='false',interactive:getComputedStyle(svg).pointerEvents};
      }));
      assert(frames.length===(id==='services'?2:1),'All photographs framed');
      assert(frames.every(f=>f.left>=0&&f.right<=width&&f.bottom<=f.captionTop&&f.decorative&&f.interactive==='none'),'Frame bounds/caption clearance/decoration '+id+' '+width+' '+JSON.stringify(frames));
      sections[id].frames=frames;
      if([1440,390,320].includes(width)) await section.screenshot({path:folder+id+'-'+width+'.png',style:'header,a[href="#skyi-title"],#skyi-social-rail,a[aria-label="Back to top"],nextjs-portal{visibility:hidden!important}'});
    }
    for(let i=0;i<5;i++) {
      const detail=page.locator('#services details[name="skyi-service-preview"]').nth(i);
      if(await detail.getAttribute('open')===null) { await detail.locator('summary').focus(); await page.keyboard.press('Enter'); }
      assert(await page.locator('#services details[name="skyi-service-preview"][open]').count()===1,'Exclusive service');
      const bounds=await detail.evaluate(n=>({panel:n.querySelector('[class*=panel]').getBoundingClientRect().bottom,closing:n.closest('section').querySelector('[class*=closing]').getBoundingClientRect().top}));
      assert(bounds.panel<=bounds.closing, 'Service overlaps closing '+width+' '+i+' '+JSON.stringify(bounds));
    }
    assert(!await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),'Page overflow '+width);
    results.push({width,height,sections}); await page.close();
  }
  const page = await browser.newPage({ viewport:{width:390,height:844}, isMobile:true,hasTouch:true });
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto(origin+'/home/#safety');
  await page.locator('#safety').evaluate(n=>n.scrollIntoView());
  await page.waitForTimeout(1800);
  const photo=page.locator('#safety img[src*="field-"]');
  await photo.evaluate(img=>img.decode());
  assert(await photo.evaluate(img=>getComputedStyle(img.closest('figure')).opacity)==='1','Photo entrance finished');
  await page.locator('input[name=skyi-plan-view]').nth(1).focus(); await page.keyboard.press('Space');
  assert((await page.locator('#safety [aria-live]').innerText()).includes('Outside a structure'),'Live brief');
  await page.locator('#safety a[href="#contact"]').click();
  assert((await page.locator('#contact textarea[name="Message"]').inputValue()).includes('Outside a structure'),'Brief handoff');
  await page.close();
  const staticPage=await browser.newPage({viewport:{width:320,height:700},javaScriptEnabled:false});
  await staticPage.goto(origin+'/home/#services');
  await staticPage.locator('#internal-inspections').scrollIntoViewIfNeeded();
  assert(await staticPage.locator('#services img[src*="field-"]').count()===2,'No-JS service photos');
  await staticPage.locator('#safety').scrollIntoViewIfNeeded();
  assert(await staticPage.locator('#safety img[src*="field-"]').isVisible(),'No-JS site photo');
  assert(!await staticPage.evaluate(()=>document.documentElement.scrollWidth>innerWidth),'No-JS overflow');
  await staticPage.close();
  const failed=await browser.newPage({viewport:{width:320,height:700},reducedMotion:'reduce'});
  await failed.route('**/*field-*',route=>route.abort());
  await failed.goto(origin+'/home/#services');
  await failed.locator('#internal-inspections').scrollIntoViewIfNeeded();
  assert(await failed.locator('#internal-inspections a').isVisible(),'Failed-photo service action');
  await failed.locator('#safety').scrollIntoViewIfNeeded();
  assert(await failed.locator('#safety a').isVisible(),'Failed-photo brief action');
  assert(!await failed.evaluate(()=>document.documentElement.scrollWidth>innerWidth),'Failed-photo overflow');
  await failed.close();
  fs.writeFileSync(folder+(origin.includes('3006')?'development-verification.json':'verification.json'),JSON.stringify({origin,results,checks:['native exclusive services and closing clearance','preserved full photos/lazy load','finite photo entry','live brief and contact handoff','no JavaScript','failed photographs'],errors},null,2));
  assert(errors.length===0,errors.join('\n'));
  await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});

