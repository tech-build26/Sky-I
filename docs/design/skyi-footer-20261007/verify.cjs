const {chromium}=require('C:/Users/ISHE-GAMING/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('fs');
const assert=(ok,message)=>{if(!ok) throw Error(message)};
const check = async page => {
 const footer=page.locator('#skyi-footer');
 await page.evaluate(()=>scrollTo(0,document.documentElement.scrollHeight));
 await page.waitForTimeout(400);
 assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'horizontal overflow');
 for (const href of ['mailto:info@ropeaccess.co.za','tel:+27113120450','tel:+27136925219']) assert(await footer.locator(`a[href="${href}"]`).isVisible(),`contact unavailable: ${href}`);
 const links=await footer.locator('a[href^="#"]').evaluateAll(nodes=>nodes.map(n=>n.hash.slice(1)));
 assert(await page.evaluate(ids=>ids.every(id=>!!document.getElementById(id)),links),'missing anchor');
 assert(await footer.locator('a[href="http://localhost:3000/"]').count()===1,'sister must open root pre-landing');
 assert(await footer.getByRole('link',{name:'Skyriders on Facebook'}).getAttribute('rel')==='noopener noreferrer','external social relation');
 assert(await footer.getByRole('link',{name:'Skyriders on LinkedIn'}).isVisible(),'social unavailable');
};
(async()=>{
 const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 const results=[];const errors=[];
 const page=await browser.newPage({viewport:{width:1440,height:1000}});
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://localhost:3006/home/',{waitUntil:'networkidle'});await check(page);
 assert(!await page.locator('a[data-skyi-logo]').isVisible(),'header remains over footer at page end');
 const links=page.locator('#skyi-footer a');await links.first().focus();
 for (let i=0;i<await links.count();i++) {
  const focused=await links.nth(i).evaluate(n=>n===document.activeElement && getComputedStyle(n).outlineStyle!=='none');
  assert(focused,`keyboard order/focus failed at ${i}`);
  if(i<await links.count()-1) await page.keyboard.press('Tab');
 }
 results.push('All footer links reachable in order with visible keyboard focus');
 await page.locator('#skyi-footer a[href="#services"]').click();await page.waitForTimeout(1400);
 assert(await page.locator('#skyi-desktop-nav').getAttribute('data-section')==='services','footer service navigation');
 assert(await page.locator('a[data-skyi-logo]').isVisible(),'header fails to return after section navigation');
 await check(page);await page.locator('#skyi-footer a[href="#opening"]').click();await page.waitForTimeout(1800);
 assert(await page.evaluate(()=>scrollY<5),'return-to-top failed');
 assert(await page.locator('#skyi-desktop-nav').getAttribute('data-section')==='opening','header fails to reset');
 results.push('Section navigation and Back to top restore original header');
 await page.close();
 for(const preferences of [{viewport:{width:320,height:700},javaScriptEnabled:false},{viewport:{width:390,height:844},reducedMotion:'reduce'}]){
  const context=await browser.newContext(preferences);const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://localhost:3006/home/',{waitUntil:'networkidle'});await check(page);
  if(preferences.javaScriptEnabled===false) assert(await page.locator('a[data-skyi-logo]').evaluate(n=>getComputedStyle(n).position)==='absolute','no-JS header overlays footer');
  else {
   await page.locator('#skyi-footer a[href="#opening"]').focus();
   assert(await page.locator('#skyi-footer svg').evaluateAll(nodes=>nodes.every(n=>getComputedStyle(n).transitionDuration==='0s')),'reduced-motion transition');
  }
  results.push(preferences.javaScriptEnabled===false?'No-JS footer links/details at 320px':'Reduced-motion footer at 390px');
  await context.close();
 }
 assert(errors.length===0,'browser exceptions');
 fs.writeFileSync('docs/design/skyi-footer-20261007/verification.json',JSON.stringify({results,errors},null,2));
 console.log(JSON.stringify({results,errors}));await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
