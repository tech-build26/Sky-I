// Local production lab only; no analytics, tracking or real SMTP requests.
const {chromium}=require('C:/Users/ISHE-GAMING/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('fs');
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true}),results=[];
 for(const [width,height] of [[1440,900],[390,844]]){
  const page=await browser.newPage({viewport:{width,height}});
  await page.addInitScript(()=>{
   window.lab={lcp:[],shifts:[],longTasks:[]};
   new PerformanceObserver(list=>list.getEntries().forEach(e=>window.lab.lcp.push({time:e.startTime,size:e.size,url:e.url,element:e.element?.tagName,text:e.element?.textContent?.trim().slice(0,100)}))).observe({type:'largest-contentful-paint',buffered:true});
   new PerformanceObserver(list=>list.getEntries().forEach(e=>{if(!e.hadRecentInput)window.lab.shifts.push({time:e.startTime,value:e.value});})).observe({type:'layout-shift',buffered:true});
   new PerformanceObserver(list=>list.getEntries().forEach(e=>window.lab.longTasks.push({time:e.startTime,duration:e.duration}))).observe({type:'longtask',buffered:true});
  });
  await page.goto('http://localhost:3014/home/');await page.waitForTimeout(10000);
  results.push(await page.evaluate(({width,height})=>{
   const fonts=[...document.fonts].map(f=>({family:f.family,status:f.status}));
   const images=[...document.querySelectorAll('#opening img,header img')].map(n=>({alt:n.alt,width:n.clientWidth,height:n.clientHeight,naturalWidth:n.naturalWidth,sizes:n.sizes,currentSrc:n.currentSrc.replace(location.origin,''),loaded:n.complete&&n.naturalWidth>0}));
   const r=performance.getEntriesByType('resource');
   return {width,height,...window.lab,shiftSum:window.lab.shifts.reduce((s,e)=>s+e.value,0),fonts,images,imageTransferBytes:r.filter(e=>e.initiatorType==='img').reduce((s,e)=>s+e.transferSize,0),fontTransferBytes:r.filter(e=>/woff/.test(e.name)).reduce((s,e)=>s+e.transferSize,0)};
  },{width,height}));await page.close();
 }
 fs.writeFileSync('docs/design/skyi-conversion-implementation-20261013/performance.json',JSON.stringify({mode:'Single unthrottled local production Chrome run per viewport; normal motion, ten-second observation. Not field Core Web Vitals or a conversion measurement. shiftSum is observation sum, not session-window CLS.',results},null,2));
 console.log(results.map(r=>({width:r.width,lcp:r.lcp.at(-1),shiftSum:r.shiftSum,longTaskCount:r.longTasks.length,loadedImages:r.images.every(n=>n.loaded)})));await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
