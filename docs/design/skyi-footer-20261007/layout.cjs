const { chromium } = require('C:/Users/ISHE-GAMING/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('fs');
(async () => {
 const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
 const results = [];
 for (const [width,height] of [[1440,1000],[1024,768],[768,1024],[390,844],[320,700],[740,390],[720,450]]) {
  const page = await browser.newPage({ viewport: { width,height } });
  await page.goto(`${process.env.REVIEW_ORIGIN || 'http://localhost:3006'}/home/`, {waitUntil:'networkidle'});
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => scrollTo(0,document.documentElement.scrollHeight));
  await page.waitForTimeout(500);
  const result = await page.locator('#skyi-footer').evaluate(footer => {
   const box = footer.getBoundingClientRect();
   return { height: box.height, pageOverflow: document.documentElement.scrollWidth > innerWidth,
    escaped: [...footer.querySelectorAll('a,address,p,h2')].filter(n => {const r=n.getBoundingClientRect();return r.width>2 && (r.left < -1 || r.right > innerWidth+1)}).map(n=>n.textContent),
    links: [...footer.querySelectorAll('a')].map(n=>({name:n.getAttribute('aria-label') || n.textContent.trim() || n.querySelector('img')?.alt,href:n.getAttribute('href'),height:n.getBoundingClientRect().height})),
    images: [...footer.querySelectorAll('img')].map(n=>({loaded:n.complete&&n.naturalWidth>0,src:n.getAttribute('src')})) };
  });
  results.push({width,height,...result,section:await page.locator('#skyi-desktop-nav').getAttribute('data-section'),headerVisible:await page.locator('a[data-skyi-logo]').isVisible()});
  await page.locator('#skyi-footer').screenshot({path:`docs/design/skyi-footer-20261007/footer-${width}.jpg`,type:'jpeg',quality:90});
  if ([1440,390,320].includes(width)) await page.screenshot({path:`docs/design/skyi-footer-20261007/closing-${width}.jpg`,type:'jpeg',quality:90});
  await page.close();
 }
 fs.writeFileSync('docs/design/skyi-footer-20261007/layout.json', JSON.stringify(results,null,2));
 console.log(JSON.stringify(results.map(({width,height,links,images,...rest})=>({width,height,...rest,shortTargets:links.filter(n=>n.height<43),loadedImages:images.every(n=>n.loaded)}))));
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
