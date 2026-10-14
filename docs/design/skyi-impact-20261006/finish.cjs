const {chromium}=require('C:/Users/ISHE-GAMING/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');const fs=require('fs'),path=require('path');const out=path.resolve('docs/design/skyi-impact-20261006');
const assert=(v,m)=>{if(!v)throw Error(m)};
(async()=>{
 const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});const p=await browser.newPage({viewport:{width:1440,height:1000}});await p.goto('http://localhost:3007/home/',{waitUntil:'networkidle'});
 await p.locator('#services').scrollIntoViewIfNeeded();await p.locator('#skyi-desktop-nav a[href="#services"]').focus();await p.mouse.move(1,1);const before=await p.locator('#services button[aria-pressed="true"]').innerText();await p.waitForTimeout(8200);const after=await p.locator('#services button[aria-pressed="true"]').innerText();assert(before!==after,'visible service rotation missing');
 const layouts=[];
 for(const [width,height]of [[1440,1000],[390,844],[320,700],[740,390],[720,450]]){
  await p.setViewportSize({width,height});
  for(const id of ['opening','about','services','industries','impact','contact','skyi-footer']){
   await p.locator('#'+id).scrollIntoViewIfNeeded();await p.waitForTimeout(1800);assert(await p.evaluate(()=>document.documentElement.scrollWidth===innerWidth),'overflow '+width+' '+id);
  }
  await p.locator('#impact').screenshot({path:path.join(out,`impact-final-${width}.jpg`),type:'jpeg',quality:88});
  if(width<768){const clear=await p.evaluate(()=>{const section=document.getElementById('impact');const note=section.querySelector('[class*="note"]');const photo=section.querySelector('[class*="photo"]');return photo.getBoundingClientRect().top-note.getBoundingClientRect().bottom;});assert(clear>15,'photo crosses mobile copy '+width);layouts.push({width,height,overflow:false,photoClearance:clear});}else layouts.push({width,height,overflow:false});
  if(width===390)await p.locator('#skyi-footer').screenshot({path:path.join(out,'footer-final-390.jpg'),type:'jpeg',quality:88});
 }
 const home=fs.readFileSync('web/.next-impact-review/server/app/home.html','utf8'),root=fs.readFileSync('web/.next-impact-review/server/app/index.html','utf8');
 const production={homeCanonical:home.includes('https://skyi.co.za/home/'),localhost:/localhost|127\.0\.0\.1/.test(home+root),retired:/Before the flight|The site comes first|Your next question/.test(home),sisterRoot:home.includes('href="https://ropeaccess.co.za/"'),impact:home.includes('Bring the unseen'),footer:home.includes('tel:+27136925219')};assert(production.homeCanonical&&!production.localhost&&!production.retired&&production.sisterRoot&&production.impact&&production.footer,'production contract');
 fs.writeFileSync(path.join(out,'finish.json'),JSON.stringify({visibleServiceRotation:{before,after},layouts,production},null,2));console.log(JSON.stringify({layouts,production}));await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
