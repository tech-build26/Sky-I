const { chromium } = require('C:/Users/ISHE-GAMING/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('node:fs');
const path = require('node:path');
(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  for (const name of ['inspection-perspective', 'exterior-inspection']) {
    const page = await browser.newPage();
    await page.goto(`http://localhost:3006/videos/${name}.mp4`);
    await page.evaluate(async () => {
      const v = document.querySelector('video'); v.pause(); v.muted = true; v.loop = false;
      if (v.readyState < 1) await new Promise(r => v.addEventListener('loadedmetadata', r, { once: true }));
      v.currentTime = 0;
    });
    const metadata = await page.evaluate(() => { const v = document.querySelector('video'); return { duration: v.duration, width: v.videoWidth, height: v.videoHeight }; });
    console.log(name, JSON.stringify(metadata));
    const review = await page.evaluate(async () => {
      const v = document.querySelector('video'), frames = [], canvas = document.createElement('canvas');
      canvas.width = 480; canvas.height = 270;
      const ctx = canvas.getContext('2d'); let last = -2, decoded = 0;
      const capture = () => {
        decoded++;
        if (v.currentTime - last >= 1.95 || v.ended) {
          ctx.drawImage(v, 0, 0, 480, 270); frames.push({ time: v.currentTime, image: canvas.toDataURL('image/jpeg', .85) }); last = v.currentTime;
        }
        if (!v.ended) v.requestVideoFrameCallback(capture);
      };
      v.requestVideoFrameCallback(capture);
      await v.play(); await new Promise((resolve, reject) => { v.addEventListener('ended', resolve, { once: true }); v.addEventListener('error', reject, { once: true }); });
      const sheets = [];
      for (let start = 0; start < frames.length; start += 12) {
        const sheet = document.createElement('canvas'); sheet.width = 1440; sheet.height = 1160; const c = sheet.getContext('2d'); c.fillStyle = '#111'; c.fillRect(0, 0, sheet.width, sheet.height);
        for (let i = start; i < Math.min(start + 12, frames.length); i++) {
          const img = new Image(); img.src = frames[i].image; await img.decode(); const col = (i - start) % 3, row = Math.floor((i - start) / 3); c.drawImage(img, col * 480, row * 290); c.fillStyle = '#fff'; c.font = '16px sans-serif'; c.fillText(frames[i].time.toFixed(2) + 's', col * 480 + 10, row * 290 + 285);
        }
        sheets.push(sheet.toDataURL('image/jpeg', .9).split(',')[1]);
      }
      return { ended: v.ended, finalTime: v.currentTime, decoded, timestamps: frames.map(f => f.time), sheets, poster: frames[0].image.split(',')[1] };
    });
    for (let i = 0; i < review.sheets.length; i++) fs.writeFileSync(path.join(__dirname, `${name}-timeline-${i}.jpg`), Buffer.from(review.sheets[i], 'base64'));
    fs.writeFileSync(path.join(__dirname, `${name}-poster.jpg`), Buffer.from(review.poster, 'base64'));
    delete review.sheets; delete review.poster;
    fs.writeFileSync(path.join(__dirname, `${name}-playback.json`), JSON.stringify({ ...metadata, ...review }, null, 2));
    console.log(name, 'full playback ended', review.finalTime, review.decoded);
    await page.close();
  }
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
