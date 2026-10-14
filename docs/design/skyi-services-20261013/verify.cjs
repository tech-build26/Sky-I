const {chromium}=require('C:/Users/ISHE-GAMING/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('fs');const assert=(ok,msg)=>{if(!ok)throw Error(msg)};
(async()=>{const browser=await chromium.launch({headless:true,channel:'chrome'});const results=[];const errors=[];
 for(const config of [{viewport:{width:1440,height:1000}},{viewport:{width:390,height:844},isMobile:true,hasTouch:true},{viewport:{width:320,height:700},javaScriptEnabled:false},{viewport:{width:390,height:844},reducedMotion:'reduce'}]){
  const context=await browser.newContext(config);const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://localhost:3006/home/#services');await page.waitForTimeout(1800);
  const section=page.locator('#services');await section.evaluate(n=>n.scrollIntoView({block:'start'}));await page.waitForTimeout(1800);
  for(const id of ['tanks-and-silos','external-inspections','buildings-and-roofs','thermal-inspections','internal-inspections']){
   const summary=page.locator('#'+id+' summary');await summary.focus();await page.keyboard.press('Enter');await page.waitForTimeout(1600);
   assert(await page.locator('#'+id).getAttribute('open')!==null,'keyboard opening '+id);
   assert(await section.locator('details[name="skyi-service-preview"][open]').count()===1,'exclusive disclosure');
   assert(await page.locator('#'+id+' a').isVisible(),'action visibility');
   if(config.viewport.width<1024) assert(await page.locator('#'+id).evaluate(n=>{const s=n.querySelector('summary').getBoundingClientRect();const p=n.querySelector('summary+div').getBoundingClientRect();return p.top>=s.bottom-1}),'inline mobile detail');
  }
  await page.locator('#window-washing summary').focus();await page.keyboard.press('Space');assert(await page.locator('#window-washing').getAttribute('open')!==null,'native cleaning');
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'overflow');
  if(config.javaScriptEnabled!==false){
   for(const id of ['internal-inspections','external-inspections','window-washing']){
    await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(300);
    await page.locator('#opening a[href="#'+id+'"]').click();await page.waitForTimeout(650);
    assert(await page.locator('#'+id).getAttribute('open')!==null,'hero destination '+id);
    assert(await page.locator('#'+id+' summary').evaluate(n=>n===document.activeElement),'hero focus '+id);
    assert(await page.locator('#'+id+' summary').evaluate(n=>n.getBoundingClientRect().top>=90),'header clearance '+id);
   }
   await page.goto('http://localhost:3006/home/#thermal-inspections');await page.waitForTimeout(1800);assert(await page.locator('#thermal-inspections').getAttribute('open')!==null,'direct hash');
  }
  await page.locator('#internal-inspections summary').click();await section.evaluate(n=>n.scrollIntoView({block:'start'}));await page.waitForTimeout(1800);
  await page.screenshot({path:'docs/design/skyi-services-20261013/'+(config.javaScriptEnabled===false?'no-js':config.reducedMotion?'reduced':config.isMobile?'touch':'desktop')+'.png'});
  results.push(config);await context.close();
 }
 assert(errors.length===0,'browser errors '+errors);fs.writeFileSync('docs/design/skyi-services-20261013/verification.json',JSON.stringify({results,errors},null,2));await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
