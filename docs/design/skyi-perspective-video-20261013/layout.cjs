const {chromium}=require('C:/Users/ISHE-GAMING/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const path=require('node:path');
(async()=>{
  const browser=await chromium.launch({channel:'chrome',headless:true});
  for(const width of [1440,390]) {
    const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});
    await page.goto('http://localhost:3007/home/#about');
    await page.locator('#skyi-about-story').scrollIntoViewIfNeeded();
    await page.waitForFunction(()=>[...document.querySelectorAll('#about img')].every(i=>i.complete&&i.naturalWidth>0));
    await page.locator('#about').screenshot({path:path.join(__dirname,`complete-static-about-${width}.png`),style:'header,[data-skyi-logo],#skyi-social-rail,a[href="#skyi-title"],a[aria-label="Back to top"] { visibility:hidden!important; }'});
    await page.close();
  }
  await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
