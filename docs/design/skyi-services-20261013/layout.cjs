const {chromium}=require('C:/Users/ISHE-GAMING/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('fs');
(async()=>{
 const browser=await chromium.launch({headless:true,channel:"chrome"});
 const results=[];const errors=[];
 for(const [width,height] of [[1440,1000],[1920,1080],[1024,768],[768,1024],[390,844],[320,700],[740,390]]){
  const page=await browser.newPage({viewport:{width,height},reducedMotion:'reduce'});
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto((process.env.REVIEW_ORIGIN||'http://localhost:3006')+'/home/#services');
  await page.locator('#services').scrollIntoViewIfNeeded();await page.waitForTimeout(450);
  const bounds=[];
  for(const id of ['internal-inspections','tanks-and-silos','external-inspections','buildings-and-roofs','thermal-inspections']){
   const item=page.locator('#'+id);if(!(await item.getAttribute('open')!==null)) await item.locator('summary').click();
   const state=await page.evaluate(id=>{const item=document.getElementById(id);const panel=item.querySelector('summary+div').getBoundingClientRect();const section=document.getElementById('services').getBoundingClientRect();return {id,overflow:document.documentElement.scrollWidth>innerWidth,open:document.querySelectorAll('details[name="skyi-service-preview"][open]').length,panelBottom:panel.bottom,sectionBottom:section.bottom,closingTop:document.getElementById("services").querySelector("[class*=closing]").getBoundingClientRect().top,colour:getComputedStyle(document.querySelector('#skyi-services-title em')).color};},id);
   if(state.overflow||state.open!==1||state.panelBottom>state.closingTop) throw Error(JSON.stringify({width,...state}));bounds.push(state);
  }
  await page.locator('#internal-inspections summary').click();await page.locator('#services').scrollIntoViewIfNeeded();
  await page.screenshot({path:`docs/design/skyi-services-20261013/preview-${width}.png`,fullPage:false});
  await page.locator('#services').screenshot({path:`docs/design/skyi-services-20261013/section-${width}.png`});
  results.push({width,height,bounds});await page.close();
 }
 fs.writeFileSync('docs/design/skyi-services-20261013/layout.json',JSON.stringify({results,errors},null,2));await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});

