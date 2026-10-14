// Actual TypeScript route/mail modules, with only Nodemailer's network transport mocked.
// No real credentials, sockets or outgoing messages are used.
const fs=require('fs'),path=require('path'),vm=require('vm'),crypto=require('crypto');
const ts=require(path.resolve('web/node_modules/typescript'));
const base=path.resolve('web/src');
const checks=[],assert=(ok,message)=>{if(!ok)throw Error(message)};
function fixture(){
 const calls=[],cache=new Map(),environment={SMTP_HOST:'smtp.test.invalid',SMTP_PORT:'465',SMTP_USER:'test-user',SMTP_PASSWORD:'synthetic-test-value',SMTP_FROM:'info@ropeaccess.co.za'};
 const state={mode:'all',calls,options:[]};
 const mailer={createTransport:options=>{state.options.push(options);return {close(){},async sendMail(mail){calls.push(mail);const position=calls.length;if(state.mode==='fail')throw Error('synthetic failure');if(['slow','slowPartial'].includes(state.mode))await new Promise(r=>setTimeout(r,30));return {accepted:state.mode==='partial'||state.mode==='slowPartial'&&position===1?mail.to.slice(0,1):mail.to};}}}};
 function load(file){
  if(cache.has(file))return cache.get(file).exports;
  assert(file.startsWith(base+path.sep),'Module boundary');
  const module={exports:{}};cache.set(file,module);
  const source=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText;
  const requireModule=name=>name==='nodemailer'?mailer:name.startsWith('@/')?load(path.join(base,name.slice(2)+'.ts')):require(name);
  vm.runInNewContext(source,{exports:module.exports,module,require:requireModule,process:{env:environment},Request,Response,TextDecoder,URL,Date,Map,Set,Promise,Object,Array,JSON,Number,String,RegExp,Error,setTimeout},{filename:file});
  return module.exports;
 }
 const route=load(path.join(base,'app/api/enquiry/route.ts'));
 const body={name:'Website test',email:'visitor@example.com',service:'',message:'Please discuss the inspection of our roof.',website:'',started:Date.now()-2000};
 const send=(changes={},id=crypto.randomUUID(),extra={})=>route.POST(new Request('https://skyi.co.za/api/enquiry/',{method:'POST',headers:{origin:'https://skyi.co.za','content-type':'application/json','idempotency-key':id,'x-forwarded-for':crypto.randomUUID(),...extra},body:JSON.stringify({...body,...changes})}));
 return {state,environment,send,body,route};
}
(async()=>{
 let f=fixture();let r=await f.send();assert(r.status===200,'Accepted both');assert(f.state.calls.length===1,'One SMTP message');
 const mail=f.state.calls[0];assert(mail.to.join(',')==='info@ropeaccess.co.za,reception@ropeaccess.co.za','Fixed two recipients');assert(mail.replyTo.address==='visitor@example.com'&&mail.from.address==='info@ropeaccess.co.za','Authenticated from, visitor reply-to');assert(!mail.html,'Plain text email');
 const options=f.state.options[0];assert(options.secure&&options.requireTLS&&options.tls.rejectUnauthorized,'Verified TLS');checks.push('dual recipients / sender / reply-to / plain text / TLS');
 f=fixture();const id=crypto.randomUUID();await f.send({},id);await f.send({},id);assert(f.state.calls.length===1,'Duplicate prevented');assert((await f.send({message:'Changed enquiry'},id)).status===409,'Changed payload rejected');checks.push('idempotency and payload binding');
 f=fixture();f.state.mode='slow';const concurrent=crypto.randomUUID();const result=await Promise.all([f.send({},concurrent),f.send({},concurrent)]);assert(result.every(r=>r.status===200)&&f.state.calls.length===1,'Concurrent duplicate prevented');checks.push('concurrent duplicate prevention');
 f=fixture();f.state.mode='partial';const partial=crypto.randomUUID();assert((await f.send({},partial)).status===502,'Partial not called success');f.state.mode='all';assert((await f.send({},partial)).status===200,'Missing recipient retry');assert(f.state.calls[1].to.join(',')==='reception@ropeaccess.co.za','No repeat to accepted inbox');checks.push('partial acceptance and missing-recipient retry');
 f=fixture();f.state.mode='slowPartial';const shared=crypto.randomUUID();const joined=await Promise.all([f.send({},shared),f.send({},shared),f.send({},shared)]);assert(joined[0].status===502&&joined.slice(1).every(r=>r.status===200)&&f.state.calls.length===2,'Concurrent partial retries join the missing-recipient delivery');assert(f.state.calls[1].to.join(',')==='reception@ropeaccess.co.za','Concurrent partial retry targets only missing inbox');checks.push('concurrent partial-retry duplicate prevention');
 f=fixture();f.state.mode='fail';assert((await f.send()).status===502,'Failure honest');checks.push('SMTP failure feedback');
 f=fixture();delete f.environment.SMTP_PASSWORD;assert((await f.send()).status===503&&f.state.calls.length===0,'Missing credentials do not send');assert((await (await f.route.GET()).json()).available===false,'Unavailable GET');checks.push('configuration gate');
 f=fixture();assert((await f.send({message:'x'.repeat(17000)})).status===413,'Bounded request body');f.environment.SMTP_PORT='587';await f.send();assert(f.state.options[0].secure===false&&f.state.options[0].requireTLS===true,'STARTTLS on 587');checks.push('bounded streaming payload and STARTTLS');
 for(const invalid of [{email:'invalid'},{name:'Name\r\nBcc: x@example.com'},{message:'x'.repeat(2001)},{service:'invented'},{website:'bot'},{started:Date.now()+10000}]){f=fixture();assert((await f.send(invalid)).status===400&&f.state.calls.length===0,'Invalid input rejected '+JSON.stringify(Object.keys(invalid)));}checks.push('validation / header injection / length / allowlist / honeypot / timestamp');
 f=fixture();assert((await f.send({},crypto.randomUUID(),{origin:'https://other.invalid'})).status===403,'Origin gate');assert((await f.send({},crypto.randomUUID(),{'content-type':'text/plain'})).status===415,'Content type');checks.push('origin and content type');
 f=fixture();for(let i=0;i<5;i++)assert((await f.send({},crypto.randomUUID(),{'x-forwarded-for':'192.0.2.1'})).status===200,'Allowed limited request');assert((await f.send({},crypto.randomUUID(),{'x-forwarded-for':'192.0.2.1'})).status===429,'Rate limit');checks.push('bounded per-process rate limiting');
 fs.writeFileSync('docs/design/skyi-conversion-implementation-20261013/enquiry-test.json',JSON.stringify({mode:'mock SMTP only; no real email sent',checks},null,2));console.log(checks.join('\n'));
})().catch(e=>{console.error(e);process.exit(1)});
