const {chromium}=require('C:/Users/ISHE-GAMING/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');const fs=require('fs');
const assert=(v,m)=>{if(!v)throw Error(m)};
(async()=>{const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});const results=[];
 for(const width of [1440,390,320]){
  const p=await browser.newPage({viewport:{width,height:width===1440?1000:844}});await p.goto('http://localhost:3007/home/',{waitUntil:'networkidle'});await p.locator('#skyi-footer').scrollIntoViewIfNeeded();await p.waitForTimeout(400);
  assert(await p.locator('#skyi-desktop-nav').getAttribute('data-section')==='skyi-footer','footer section tracking');assert(!(await p.locator('a[data-skyi-logo]').isVisible()),'fixed logo covers footer');assert(!(await p.locator('#skyi-sister-logo').isVisible()),'fixed sister covers footer');
  await p.locator('#skyi-footer').screenshot({path:`docs/design/skyi-impact-20261006/footer-final-${width}.jpg`,type:'jpeg',quality:88});
  await p.locator('#skyi-footer a[href="#opening"]').click();await p.waitForTimeout(1700);assert(await p.locator('a[data-skyi-logo]').isVisible(),'logo fails to return');assert(await p.locator('#skyi-desktop-nav').getAttribute('data-section')==='opening','header does not reset');assert(await p.evaluate(()=>scrollY<5),'return to top');results.push({width,footerUnobstructed:true,headerRestored:true});await p.close();
 }
 const c=await browser.newContext({viewport:{width:320,height:700},javaScriptEnabled:false});const p=await c.newPage();await p.goto('http://localhost:3007/home/',{waitUntil:'networkidle'});assert(await p.locator('a[data-skyi-logo]').evaluate(n=>getComputedStyle(n).position)==='absolute','no-js fixed logo');await p.locator('#skyi-footer').scrollIntoViewIfNeeded();assert(await p.locator('#skyi-footer a[href="tel:+27136925219"]').isVisible(),'no-js footer access');
 fs.writeFileSync('docs/design/skyi-impact-20261006/footer-verification.json',JSON.stringify({results,noJsAbsoluteHeader:true},null,2));console.log(JSON.stringify(results));await browser.close();})().catch(e=>{console.error(e);process.exit(1)});
