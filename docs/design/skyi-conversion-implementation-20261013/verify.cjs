const {chromium}=require('C:/Users/ISHE-GAMING/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('fs');const folder='docs/design/skyi-conversion-implementation-20261013/',origin=process.argv[2]||'http://localhost:3006';
const assert=(v,m)=>{if(!v)throw Error(m)};
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true});const errors=[],checks=[];
 const page=await browser.newPage({viewport:{width:1440,height:900}});page.on('pageerror',e=>errors.push(e.message));
 await page.goto(origin+'/home/');await page.waitForTimeout(5000);
 assert(await page.locator('#opening a[href="#contact"]').count()===0,'Hero enquiry removed');
 await page.locator('header a[href="#contact"]').first().focus();await page.keyboard.press('Enter');
 await page.waitForTimeout(1000);assert(await page.locator('#contact').isVisible(),'Navigation contact handoff');checks.push('normal hero without added enquiry button; navigation contact handoff');
 for(const id of ['internal-inspections','external-inspections','window-washing']){
  await page.goto(origin+'/home/#'+id);await page.waitForTimeout(900);assert(await page.locator('#'+id).getAttribute('open')!==null,'Direct service fragment '+id);
 }
 const api=await page.request.get(origin+'/api/enquiry/');assert((await api.json()).available===false,'Missing SMTP is unavailable');
 const invalid=await page.request.post(origin+'/api/enquiry/',{headers:{origin,'content-type':'application/json','idempotency-key':'00000000-0000-4000-8000-000000000000'},data:{name:'',email:'invalid',message:'',started:Date.now()-2000,website:''}});assert(invalid.status()===400,'Real API validation');
 const unconfigured=await page.request.post(origin+'/api/enquiry/',{headers:{origin,'content-type':'application/json','idempotency-key':'00000000-0000-4000-8000-000000000001'},data:{name:'Review test',email:'visitor@example.com',message:'Mock review only; do not send.',started:Date.now()-2000,website:''}});assert(unconfigured.status()===503,'Real SMTP configuration gate');checks.push('real API validation/configuration, zero real mail');
 await page.goto(origin+'/home/#contact');await page.waitForTimeout(700);assert(await page.getByRole('button',{name:'Prepare email draft',exact:true}).isVisible(),'Honest draft fallback');
 assert((await page.locator('#contact a[href^="mailto:"]').getAttribute('href')).includes('info@ropeaccess.co.za,reception@ropeaccess.co.za'),'Dual fallback recipients');
 await page.getByRole('button',{name:'About sending your enquiry'}).focus();await page.locator('#skyi-email-info').waitFor({state:'visible'});await page.keyboard.press('Escape');checks.push('dual fallback and tooltip');
 const mock=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true,reducedMotion:'reduce'});mock.on('pageerror',e=>errors.push(e.message));
 let mode='error',submissions=[];
 await mock.route('**/api/enquiry/',async route=>{if(route.request().method()==='GET')return route.fulfill({json:{available:true}});submissions.push(route.request().postDataJSON());await new Promise(r=>setTimeout(r,150));if(mode==='error')return route.fulfill({status:502,json:{message:'Delivery could not be confirmed. Your details are kept.'}});if(mode==='fields')return route.fulfill({status:400,json:{message:'Check the fields.',errors:{email:'Enter a valid email address.'}}});return route.fulfill({json:{message:'Your enquiry has been accepted for delivery to both the information and reception teams.'}});});
 await mock.goto(origin+'/home/#safety');await mock.waitForTimeout(900);
 await mock.locator('input[name=skyi-plan-view]').nth(1).focus();await mock.keyboard.press('Space');
 await mock.locator('#safety a[href="#contact"]').click();assert((await mock.locator('textarea[name=Message]').inputValue()).includes('Outside a structure'),'Planning seed');
 await mock.locator('input[name=Name]').fill('Review user');await mock.locator('input[name=Email]').fill('visitor@example.com');
 await mock.getByRole('button',{name:'Send enquiry',exact:true}).click();await mock.getByRole('status').filter({hasText:'Delivery could not'}).waitFor();assert((await mock.locator('textarea[name=Message]').inputValue()).includes('Outside a structure'),'Failure preserves brief');
 mode='fields';await mock.getByRole('button',{name:'Send enquiry',exact:true}).click();await mock.locator('#enquiry-email-error').waitFor();assert(await mock.locator('input[name=Email]').getAttribute('aria-invalid')==='true','Accessible server errors');
 mode='success';await mock.locator('input[name=Email]').fill('corrected@example.com');await mock.getByRole('button',{name:'Send enquiry',exact:true}).click();await mock.getByRole('status').filter({hasText:'both the information'}).waitFor();assert(submissions.length===3,'UI requests');checks.push('mobile planning handoff, server failure/preservation, field error, mocked dual acceptance');
 await mock.locator('#safety details summary').click();assert((await mock.locator('#safety details').innerText()).includes('Agree the scope'),'Process opens');
 await mock.locator('#services details').first().locator('summary').focus();await mock.keyboard.press('Enter');checks.push('native process disclosure');await mock.close();
 const nojs=await browser.newPage({viewport:{width:320,height:700},javaScriptEnabled:false});await nojs.goto(origin+'/home/#services');assert(await nojs.locator('#internal-inspections a[href="#contact"]').isVisible(),'No-JS native service action');
 await nojs.locator('#services details[name="skyi-service-preview"]').nth(1).locator('summary').click();assert(await nojs.locator('#tanks-and-silos').getAttribute('open')!==null,'No-JS selection');await nojs.locator('#contact').scrollIntoViewIfNeeded();assert(!await nojs.locator('form').isVisible(),'No-JS inactive form hidden');assert(await nojs.locator('#contact a[href^="mailto:"]').isVisible(),'No-JS direct email');checks.push('no-JS native services/direct contact');await nojs.close();
 const failed=await browser.newPage({viewport:{width:320,height:700},reducedMotion:'reduce'});await failed.route('**/_next/image**',r=>r.abort());await failed.goto(origin+'/home/#contact');assert(await failed.locator('#contact a[href^="mailto:"]').isVisible(),'Failed-image contact');assert(!await failed.evaluate(()=>document.documentElement.scrollWidth>innerWidth),'Failed-image bounds');checks.push('failed-image contact/bounds');await failed.close();
 assert(!errors.length,errors.join('\n'));fs.writeFileSync(folder+(origin.includes('3006')?'development-verification.json':'verification.json'),JSON.stringify({origin,checks,errors,smtp:'mocked; no production credentials or real messages'},null,2));await page.close();await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
