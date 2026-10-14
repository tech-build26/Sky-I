const {chromium}=require('C:/Users/ISHE-GAMING/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('fs');
const folder='docs/design/skyi-photo-frames-20261013/';
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true});const results=[];
 for(const [width,height] of [[1440,900],[390,844],[740,390]]){
  const page=await browser.newPage({viewport:{width,height},reducedMotion:'reduce'});
  await page.goto('http://localhost:3006/home/');await page.evaluate(()=>document.fonts.ready);
  const data=await page.evaluate(()=>({height:document.documentElement.scrollHeight,overflow:document.documentElement.scrollWidth>innerWidth,sections:[...document.querySelectorAll('main section,footer')].map(n=>({id:n.id,height:n.offsetHeight,text:n.innerText,fonts:[...n.querySelectorAll('h1,h2,p,label,summary,figcaption')].map(e=>{const s=getComputedStyle(e);return {tag:e.tagName,text:e.innerText.slice(0,65),size:s.fontSize,weight:s.fontWeight,family:s.fontFamily,lineHeight:s.lineHeight,color:s.color};})}))}));
  for(const id of ['opening','about','services','industries','safety','impact','testimonials','contact','skyi-footer']){
   const node=page.locator('#'+id);if(!await node.count())continue;
   await node.scrollIntoViewIfNeeded();await node.locator('img').evaluateAll(async imgs=>{await Promise.all(imgs.map(img=>img.decode().catch(()=>{})));});
   if(width!==740)await node.screenshot({path:folder+'audit-'+id+'-'+width+'.png',style:'header,#skyi-social-rail,a[aria-label="Back to top"],nextjs-portal{visibility:hidden!important}'});
  }
  results.push({width,height,...data});await page.close();
 }
 fs.writeFileSync(folder+'conversion-audit.json',JSON.stringify({environment:'development: layout/content only, no production performance or conversion measurement',results},null,2));
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
