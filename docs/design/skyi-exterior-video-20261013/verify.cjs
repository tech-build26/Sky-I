const { chromium }=require('C:/Users/ISHE-GAMING/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('node:fs');
const path=require('node:path');
(async()=>{
 const origin=process.env.REVIEW_ORIGIN||'http://localhost:3006';
 const browser=await chromium.launch({channel:'chrome',headless:true});
 const results=[]; const errors=[];
 for(const [width,height] of [[1440,900],[1280,800],[1101,800],[1024,768],[768,1024],[390,844],[320,740],[844,390]]) {
  const page=await browser.newPage({viewport:{width,height}}); page.on('pageerror',e=>errors.push(e.message));
  const requests=[];page.on('request',r=>{if(r.url().endsWith('exterior-inspection.mp4'))requests.push(r.url());});
  await page.goto(origin+'/home/');await page.waitForTimeout(1600);
  const initialRequests=requests.length;
  await page.locator('#impact').scrollIntoViewIfNeeded();
  await page.waitForFunction(()=>{const v=document.querySelector('#impact video');return v.readyState>=2&&!v.paused;});
  await page.waitForTimeout(1600);
  const layout=await page.locator('#impact').evaluate(s=>{
   const v=s.querySelector('video'),c=s.querySelector('h2').parentElement;
   const rect=e=>{const r=e.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height,right:r.right,bottom:r.bottom};};
   return {section:rect(s),video:rect(v),copy:rect(c),overflow:document.documentElement.scrollWidth>innerWidth,paused:v.paused,time:v.currentTime,muted:v.muted,loop:v.loop,inline:v.playsInline,filter:getComputedStyle(v).filter,cta:s.querySelector('a').getAttribute('href')};
  });
  await page.locator('#impact').screenshot({path:path.join(__dirname,`desktop-mobile-${width}.png`)});
  await page.locator('#opening').scrollIntoViewIfNeeded();await page.waitForTimeout(400);
  const offscreenPaused=await page.locator('#impact video').evaluate(v=>v.paused);
  results.push({width,height,initialRequests,requests:requests.length,offscreenPaused,...layout});await page.close();
 }
 for(const mode of ['reduced','no-js','failure']) {
  const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:mode==='reduced'?'reduce':'no-preference',javaScriptEnabled:mode!=='no-js'});
  const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));let requests=0;
  page.on('request',r=>{if(r.url().endsWith('exterior-inspection.mp4'))requests++;});
  if(mode==='failure')await page.route('**/videos/exterior-inspection.mp4',r=>r.abort());
  await page.goto(origin+'/home/#impact');await page.locator('#impact').scrollIntoViewIfNeeded();await page.waitForTimeout(1800);
  const state=await page.locator('#impact video').evaluate(v=>({paused:v.paused,src:v.getAttribute('src'),poster:v.poster,error:v.error?.code||null}));
  await page.locator('#impact a').focus();await page.keyboard.press('Enter');await page.waitForTimeout(500);
  results.push({mode,requests,...state,ctaReached:page.url().endsWith('#contact')});await context.close();
 }
 fs.writeFileSync(path.join(__dirname,'verification.json'),JSON.stringify({results,errors},null,2));console.log(JSON.stringify({results,errors}));
 await browser.close();
})();
