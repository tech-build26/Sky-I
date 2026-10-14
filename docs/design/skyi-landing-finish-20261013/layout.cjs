const { chromium } = require('C:/Users/ISHE-GAMING/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('fs');
const folder = 'docs/design/skyi-landing-finish-20261013/';
const origin = process.argv[2] || 'http://localhost:3006';
(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const results = [], errors = [];
  for (const [width, height] of [[1440,1000],[1920,1080],[1024,768],[768,1024],[390,844],[320,700],[740,390]]) {
    const page = await browser.newPage({ viewport: {width,height}, reducedMotion:'reduce' });
    page.on('pageerror', e => errors.push(e.message));
    await page.goto(origin+'/home/');
    await page.waitForTimeout(800);
    const sections = {};
    for (const id of ['industries','safety','testimonials','contact','skyi-footer']) {
      const node = page.locator('#'+id);
      await node.scrollIntoViewIfNeeded();
      await page.waitForTimeout(200);
      sections[id] = await node.evaluate(n => ({height:n.offsetHeight,width:n.offsetWidth,overflow:n.scrollWidth>n.clientWidth}));
      if ([1440,390,320].includes(width)) await node.screenshot({path:folder+id+'-'+width+'.png',style:'header,a[href="#skyi-title"],#skyi-social-rail,a[aria-label="Back to top"],nextjs-portal{visibility:hidden!important}'});
    }
    for(let i=0;i<6;i++) {
      const detail=page.locator('#industries details').nth(i);
      if(await detail.getAttribute('open')===null) await detail.locator('summary').click();
      await page.waitForTimeout(50);
      const geometry=await detail.evaluate(n=>{const panel=n.querySelector('[class*=panel]').getBoundingClientRect();const baseline=n.closest('section').querySelector('[class*=baseline]').getBoundingClientRect();return {open:n.open,panelBottom:panel.bottom,baselineTop:baseline.top}});
      if(!geometry.open||geometry.panelBottom>geometry.baselineTop) throw Error('Sector geometry '+width+' / '+i+' '+JSON.stringify(geometry));
    }
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
    if(overflow) throw Error('Page overflow '+width);
    results.push({width,height,sections,overflow}); await page.close();
  }
  fs.writeFileSync(folder+'layout.json',JSON.stringify({results,errors},null,2));
  if(errors.length) throw Error(errors.join('\n'));
  await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
