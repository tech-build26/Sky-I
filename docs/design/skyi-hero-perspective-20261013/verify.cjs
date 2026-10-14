const { chromium } = require('C:/Users/ISHE-GAMING/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('fs');
const path = require('path');
const dir = __dirname;
const base = process.env.CAMERA_REVIEW_ORIGIN || 'http://localhost:3006';
const assert = (ok, msg) => { if (!ok) throw Error(msg); };
(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const errors = [], layouts = [], samples = [];
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  page.on('pageerror', e => errors.push(e.message));
  await page.goto(base + '/home/'); await page.waitForTimeout(5200);
  const geometry = await page.evaluate(() => ({ hero: document.getElementById('opening').offsetHeight, set: document.querySelector('[data-camera-descent]').offsetHeight, doc: document.documentElement.scrollHeight }));
  const start = Math.max(0, geometry.hero - 1000), end = geometry.hero - 120;
  for (const p of [0, .25, .5, .75, 1, .5, 0]) {
    await page.evaluate(y => scrollTo(0, y), start + (end - start) * p); await page.waitForTimeout(250);
    const state = await page.locator('[data-camera-descent]').evaluate(n => { const hero = document.getElementById('opening'); return { active: n.dataset.cameraActive, progress: n.dataset.cameraProgress, transform: hero.style.transform, opacity: hero.style.opacity, heldTop: hero.offsetTop - scrollY, height: n.offsetHeight, doc: document.documentElement.scrollHeight, aboutTop: document.getElementById('about').getBoundingClientRect().top }; });
    assert(state.active === (p > 0 ? 'true' : undefined), 'camera boundary scope'); assert(state.height === geometry.set && state.doc === geometry.doc, 'camera changed document geometry');
    samples.push({ p, ...state });
    await page.screenshot({ path: path.join(dir, `desktop-${p}-${samples.length}.png`) });
  }
  assert(samples[2].transform.includes('scale(0.9675)'), 'missing recession');
  assert(samples[1].heldTop === samples[3].heldTop, 'hero moves vertically');
  assert(Number(samples[1].opacity) > Number(samples[2].opacity) && Number(samples[2].opacity) > Number(samples[3].opacity), 'hero does not fade');
  assert(samples[1].aboutTop > samples[2].aboutTop && samples[2].aboutTop > samples[3].aboutTop, 'About does not rise');
  assert(samples[2].transform === samples[5].transform, 'reverse does not match');
  const still = samples[2].transform;
  await page.evaluate(y => scrollTo(0, y), (start + end) / 2); await page.waitForTimeout(1800);
  assert(await page.locator('#opening').evaluate(n => n.style.transform) === still, 'camera moves without scrolling');
  await page.screenshot({ path: path.join(dir, 'held-hero-settled.png') });
  await page.evaluate(y => scrollTo(0, y), geometry.hero - 60); await page.waitForTimeout(250);
  assert(await page.locator('#opening').evaluate(n => n.style.opacity === '0'), 'hero reappears before coverage');
  await page.evaluate(y => scrollTo(0, y), geometry.hero + 5); await page.waitForTimeout(250);
  assert(await page.locator('[data-camera-descent]').getAttribute('data-camera-active') === null, 'hold extends into About');
  await page.locator('nav a[href="#about"]').first().click(); await page.waitForTimeout(1200);
  assert(await page.locator('#about').evaluate(n => Math.abs(n.getBoundingClientRect().top - 120) < 3), 'About fragment clearance');
  assert(await page.locator('[data-camera-descent]').getAttribute('data-camera-active') === null, 'fragment not settled');
  await page.locator('a[href="#skyi-about-story"]').click(); await page.waitForTimeout(1200);
  assert(await page.locator('#skyi-about-story').evaluate(n => Math.abs(n.getBoundingClientRect().top - 120) < 3), 'story clearance');
  await page.goto(base + '/home/#about'); await page.waitForTimeout(1500);
  assert(await page.locator('[data-camera-descent]').getAttribute('data-camera-active') === null, 'direct hash camera');
  await page.goto(base + '/home/'); await page.waitForTimeout(5200);
  await page.locator('#opening a[href="#internal-inspections"]').click(); await page.waitForTimeout(1200);
  assert(await page.locator('#internal-inspections').getAttribute('open') !== null, 'hero service destination');
  assert(await page.locator('#internal-inspections summary').evaluate(n => n === document.activeElement), 'hero service focus');
  await page.evaluate(() => scrollTo(0, 0)); await page.waitForTimeout(500);
  await page.locator('#opening a').first().focus();
  assert(await page.locator('[data-camera-descent]').getAttribute('data-camera-active') === null, 'focus camera');
  await page.mouse.wheel(0, (start + end) / 2); await page.waitForTimeout(1100);
  assert(await page.locator('[data-camera-descent]').getAttribute('data-camera-active') === 'true', 'resume camera');
  await page.emulateMedia({ reducedMotion: 'reduce' }); await page.waitForTimeout(250);
  assert(await page.locator('[data-camera-descent]').getAttribute('data-camera-active') === null, 'live reduced camera');
  await page.close();
  for (const [width, height] of [[1440,1000],[1920,1080],[1024,768],[768,1024],[390,844],[320,700],[740,390]]) {
    const context = await browser.newContext({ viewport: { width, height }, ...(width < 768 ? { isMobile: true, hasTouch: true } : {}) });
    const p = await context.newPage(); p.on('pageerror', e => errors.push(e.message));
    await p.goto(base + '/home/'); await p.waitForTimeout(1500);
    await p.evaluate(() => document.fonts.ready);
    const h = await p.locator('#opening').evaluate(n => n.offsetHeight);
    await p.evaluate(y => scrollTo(0, y), Math.max(0, h - height * .55)); await p.waitForTimeout(1700);
    const layout = await p.evaluate(() => ({ width: innerWidth, overflow: document.documentElement.scrollWidth > innerWidth, active: document.querySelector('[data-camera-descent]').dataset.cameraActive, about: document.getElementById('about').getBoundingClientRect().toJSON(), images: Array.from(document.querySelectorAll('#about img')).filter(n => n.getBoundingClientRect().top < innerHeight && n.getBoundingClientRect().bottom > 0).every(n => n.complete && n.naturalWidth > 0) }));
    assert(!layout.overflow, 'overflow ' + width); assert(layout.active === 'true', 'layout camera ' + width); assert(layout.images, 'about images ' + width);
    layouts.push({ width, height, ...layout });
    await p.screenshot({ path: path.join(dir, `layout-${width}.png`) });
    if (width === 390) {
      await p.getByRole('button', { name: 'Menu', exact: true }).click(); await p.waitForTimeout(250);
      assert(await p.locator('[data-camera-descent]').getAttribute('data-camera-active') === null, 'menu camera');
      await p.keyboard.press('Escape'); await p.waitForTimeout(400);
      await p.evaluate(() => scrollTo(0, 0));
      await p.mouse.wheel(0, h - height * .55); await p.waitForTimeout(800);
      assert(await p.locator('[data-camera-descent]').getAttribute('data-camera-active') === 'true', 'menu resume');
    }
    await context.close();
  }
  for (const options of [{ javaScriptEnabled: false }, { reducedMotion: 'reduce' }, { failure: true }]) {
    const { failure, ...settings } = options;
    const context = await browser.newContext({ viewport: { width: 320, height: 700 }, ...settings });
    const p = await context.newPage(); p.on('pageerror', e => errors.push(e.message));
    if (failure) await p.route('**/_next/image?**', r => r.abort());
    await p.goto(base + '/home/#about'); await p.waitForTimeout(1700);
    assert(await p.locator('#skyi-about-title').isVisible(), 'fallback heading');
    assert(await p.locator('[data-camera-descent]').getAttribute('data-camera-active') === null, 'fallback native');
    assert(await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'fallback overflow');
    await p.screenshot({ path: path.join(dir, failure ? 'failed-art.png' : settings.javaScriptEnabled === false ? 'no-js.png' : 'reduced.png') });
    await context.close();
  }
  assert(errors.length === 0, 'page exceptions');
  fs.writeFileSync(path.join(dir, 'verification.json'), JSON.stringify({ base, geometry, samples, layouts, errors }, null, 2));
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
