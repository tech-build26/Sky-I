const {chromium}=require('C:/Users/ISHE-GAMING/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('fs'),folder='docs/design/skyi-services-closing-20261013/',origin=process.argv[2]||'http://localhost:3006';
const assert=(v,m)=>{if(!v)throw Error(m)};
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true}),results=[],errors=[];
 for(const [width,height] of [[1900,906],[1440,900],[1024,768],[768,1024],[390,844],[320,700],[740,390]]){
  const page=await browser.newPage({viewport:{width,height},reducedMotion:'reduce'});page.on('pageerror',e=>errors.push(e.message));
  await page.goto(origin+'/home/#services');await page.waitForTimeout(650);await page.evaluate(()=>document.fonts.ready);
  const closing=page.locator('#services [class*=closing]').first(),questions=closing.locator('details');
  for(let i=0;i<5;i++){
   const choice=page.locator('#services details[name="skyi-service-preview"]').nth(i);
   if(await choice.getAttribute('open')===null){await choice.locator('summary').focus();await page.keyboard.press('Enter');}
   await page.waitForTimeout(90);
   const gap=await choice.evaluate(n=>n.closest('section').querySelector('[class*=closing]').getBoundingClientRect().top-n.querySelector('[data-disclosure-panel]').getBoundingClientRect().bottom);
   assert(gap>=0,'Panel clear of closing '+width+' '+i+' '+gap);
  }
  for(let i=0;i<3;i++){
   const q=questions.nth(i),summary=q.locator('summary');await summary.focus();await page.keyboard.press('Enter');assert(await q.getAttribute('open')!==null,'Keyboard question open');
   assert(await q.locator('p').isVisible(),'Answer visible');await page.keyboard.press('Enter');assert(await q.getAttribute('open')===null,'Keyboard question close');
  }
  await page.locator('#internal-inspections>summary').focus();await page.keyboard.press('Enter');await page.waitForTimeout(120);await page.locator('#services img').evaluateAll(imgs=>Promise.all(imgs.map(n=>n.decode().catch(()=>{}))));
  await closing.scrollIntoViewIfNeeded();await page.locator('#internal-inspections>summary').evaluate(n=>n.blur());
  assert(!await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),'Document overflow '+width);
  const bounds=await closing.locator('a,summary').evaluateAll(nodes=>nodes.map(n=>n.getBoundingClientRect().toJSON()));assert(bounds.every(b=>b.left>=0&&b.right<=width+1),'Closing control bounds '+width);
  results.push({width,height,closing:await closing.evaluate(n=>({height:n.offsetHeight,columns:getComputedStyle(n).gridTemplateColumns})),serviceHeight:await page.locator('#services').evaluate(n=>n.offsetHeight)});
  if([1900,390,320].includes(width)){
   await closing.screenshot({path:folder+'closing-'+width+'.png',style:'header,#skyi-social-rail,a[href="#skyi-title"],a[aria-label="Back to top"],nextjs-portal{visibility:hidden!important}'});
   await page.locator('#services').screenshot({path:folder+'services-'+width+'.png',style:'header,#skyi-social-rail,a[href="#skyi-title"],a[aria-label="Back to top"],nextjs-portal{visibility:hidden!important}'});
  }
  await page.goto(origin+'/home/#window-washing');await page.waitForFunction(()=>document.getElementById('window-washing')?.open,{},{timeout:3000});assert(await page.locator('#window-washing a[href="#contact"]').isVisible(),'Washing enquiry');await page.close();
 }
 const staticPage=await browser.newPage({viewport:{width:320,height:700},javaScriptEnabled:false});await staticPage.goto(origin+'/home/#window-washing');await staticPage.locator('#window-washing>summary').click();assert(await staticPage.locator('#window-washing a').isVisible(),'No-JS washing disclosure');await staticPage.close();
 assert(!errors.length,errors.join('\n'));fs.writeFileSync(folder+(origin.includes('3006')?'development-verification.json':'verification.json'),JSON.stringify({origin,results,checks:['five asset panel clearances','three keyboard disclosures','control/document bounds','window-washing fragment/action','no-JS washing access'],errors},null,2));await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
