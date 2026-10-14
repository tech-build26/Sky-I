const { chromium } = require('C:/Users/ISHE-GAMING/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('node:fs');
const path = require('node:path');
(async () => {
  const browser = await chromium.launch({channel:'chrome',headless:true});
  const page = await browser.newPage({viewport:{width:1280,height:720}});
  await page.goto('http://localhost:3006/videos/exterior-inspection.mp4');
  await page.evaluate(async () => {
    const video = document.querySelector('video');
    video.pause(); video.muted = true;
    if (video.readyState < 1) await new Promise(resolve => video.addEventListener('loadedmetadata',resolve,{once:true}));
  });
  const metadata = await page.evaluate(() => { const v=document.querySelector('video'); return {duration:v.duration,width:v.videoWidth,height:v.videoHeight}; });
  const times=[0.1,6,12,18,24,30,38,46];
  for (const time of times) {
    const data = await page.evaluate(async time => {
      const v=document.querySelector('video');
      await new Promise(resolve => {v.addEventListener('seeked',resolve,{once:true});v.currentTime=time;});
      const canvas=document.createElement('canvas');canvas.width=1280;canvas.height=720;
      canvas.getContext('2d').drawImage(v,0,0,1280,720);
      return canvas.toDataURL('image/jpeg',.9).split(',')[1];
    },time);
    fs.writeFileSync(path.join(__dirname,`frame-${time}.jpg`),Buffer.from(data,'base64'));
  }
  fs.writeFileSync(path.join(__dirname,'metadata.json'),JSON.stringify({...metadata,times},null,2));
  console.log(metadata);
  await browser.close();
})();
