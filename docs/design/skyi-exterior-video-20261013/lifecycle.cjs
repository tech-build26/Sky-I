const {chromium}=require('C:/Users/ISHE-GAMING/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('node:fs');const path=require('node:path');
(async()=>{
 const b=await chromium.launch({channel:'chrome',headless:true});const context=await b.newContext({viewport:{width:1440,height:900}});const p=await context.newPage();
 await p.goto('http://localhost:3018/home/#impact');await p.locator('#impact').scrollIntoViewIfNeeded();
 await p.waitForFunction(()=>!document.querySelector('#impact video').paused);await p.waitForTimeout(500);
 const state=()=>p.locator('#impact video').evaluate(v=>({paused:v.paused,time:v.currentTime,src:v.getAttribute('src')}));
 const before=await state();
 await p.emulateMedia({reducedMotion:'reduce'});await p.waitForTimeout(200);const reduced=await state();
 await p.emulateMedia({reducedMotion:'no-preference'});await p.waitForTimeout(500);const resumed=await state();
 await p.locator('#opening').scrollIntoViewIfNeeded();await p.waitForTimeout(250);const offscreen=await state();
 await p.locator('#impact').scrollIntoViewIfNeeded();await p.waitForTimeout(400);
 // A background browser tab represents actual document visibility changes.
 const other=await p.context().newPage();await other.goto('about:blank');await other.bringToFront();await p.waitForTimeout(300);
 const hidden={hidden:await p.evaluate(()=>document.hidden),...await state()};
 // Headless Chrome leaves both tabs visible; verify the handler with a
 // visibilitychange simulation, and record that this is not physical tab QA.
 await p.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,value:true});document.dispatchEvent(new Event('visibilitychange'));});
 const simulatedHidden=await state();
 await p.evaluate(()=>{delete document.hidden;document.dispatchEvent(new Event('visibilitychange'));});
 await p.bringToFront();await p.waitForTimeout(400);const foreground=await state();
 await p.locator('#impact a').focus();await p.keyboard.press('Enter');await p.waitForTimeout(600);
 const contact={hash:await p.evaluate(()=>location.hash),...await state()};
 await p.setViewportSize({width:390,height:844});await p.locator('#impact video').scrollIntoViewIfNeeded();await p.waitForTimeout(400);
 await p.getByRole('button',{name:'Menu',exact:true}).click();await p.waitForTimeout(150);const menu=await state();
 await p.getByRole('button',{name:'Close',exact:true}).click();await p.waitForTimeout(400);const menuResumed=await state();
 const dataContext=await b.newContext();await dataContext.addInitScript(()=>Object.defineProperty(navigator,'connection',{value:{saveData:true}}));
 const dataPage=await dataContext.newPage();await dataPage.goto('http://localhost:3018/home/#impact');await dataPage.locator('#impact video').scrollIntoViewIfNeeded();await dataPage.waitForTimeout(500);
 const saveData=await dataPage.locator('#impact video').evaluate(v=>({src:v.getAttribute('src'),paused:v.paused}));
 const result={before,reduced,resumed,offscreen,hidden,simulatedHidden,foreground,contact,menu,menuResumed,saveData};
 fs.writeFileSync(path.join(__dirname,'lifecycle.json'),JSON.stringify(result,null,2));console.log(JSON.stringify(result));await b.close();
})();

