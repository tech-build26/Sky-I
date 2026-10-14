const {chromium}=require('C:/Users/ISHE-GAMING/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('fs');
const folder='docs/design/skyi-conversion-implementation-20261013/';
const origin=process.argv[2]||'http://localhost:3006';
const assert=(ok,message)=>{if(!ok)throw Error(message)};
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true});const results=[],errors=[];
 for(const [width,height] of [[1440,900],[1920,1080],[1024,768],[768,1024],[390,844],[320,700],[740,390]]){
  const page=await browser.newPage({viewport:{width,height},reducedMotion:'reduce'});page.on('pageerror',e=>errors.push(e.message));
  await page.goto(origin+'/home/');await page.waitForTimeout(900);await page.evaluate(()=>document.fonts.ready);
  const sections={};
  for(const id of ['opening','about','services','industries','safety','impact','testimonials','contact','skyi-footer']){
   const node=page.locator('#'+id);await node.scrollIntoViewIfNeeded();await node.locator('img').evaluateAll(async imgs=>{await Promise.all(imgs.map(img=>img.decode().catch(()=>{})));});
   sections[id]=await node.evaluate(n=>({height:n.offsetHeight,width:n.offsetWidth,overflow:n.scrollWidth>n.clientWidth,paddingTop:getComputedStyle(n).paddingTop,paddingBottom:getComputedStyle(n).paddingBottom}));
   assert(!sections[id].overflow||id==='impact','Section overflow '+id+' '+width);
   const bad=await node.locator('a,button,input,textarea,select,summary').evaluateAll(nodes=>nodes.filter(n=>{const b=n.getBoundingClientRect();return b.width>0&&(b.left<0||b.right>innerWidth+1)}).map(n=>n.textContent));
   assert(!bad.length,'Control bounds '+id+' '+width+' '+JSON.stringify(bad));
   if([1440,390,320].includes(width))await node.screenshot({path:folder+id+'-'+width+'.png',style:'header,#skyi-social-rail,a[href="#skyi-title"],a[aria-label="Back to top"],.nextjs-toast,nextjs-portal{visibility:hidden!important}'});
  }
  for(const id of ['services','industries']){
   const list=page.locator(id==='services'?'#services details[name="skyi-service-preview"]':'#industries details[name="skyi-sector"]');
   for(let i=0;i<await list.count();i++){
    const choice=list.nth(i);if(await choice.getAttribute('open')===null){await choice.locator('summary').focus();await page.keyboard.press('Enter');}await page.waitForTimeout(120);
    const b=await choice.evaluate(n=>({bottom:n.querySelector('[data-disclosure-panel]').getBoundingClientRect().bottom,next:n.closest('section').querySelector('[class*=faq],[class*=baseline]').getBoundingClientRect().top}));
    assert(b.bottom<=b.next+1,'Panel overlap '+id+' '+width+' '+i+' '+JSON.stringify(b));
    assert(await list.locator('[open]').count()===0||await page.locator(id==='services'?'#services details[name="skyi-service-preview"][open]':'#industries details[name="skyi-sector"][open]').count()===1,'Exclusive choice');
   }
  }
  assert(await page.locator('#opening a[href="#contact"]').count()===0,'Owner removes hero enquiry button');
  assert(await page.locator('[aria-disabled=true]').count()===0,'No pending navigation');
  assert(await page.locator('#testimonials blockquote').count()===0,'No fictional quotes');
  assert(!await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),'Page overflow '+width);
  results.push({width,height,pageHeight:await page.evaluate(()=>document.documentElement.scrollHeight),sections});await page.close();
 }
 fs.writeFileSync(folder+(origin.includes('3006')?'development-layout.json':'layout.json'),JSON.stringify({origin,results,errors},null,2));assert(!errors.length,errors.join('\n'));await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
