// Optional browser QA: PLAYWRIGHT_MODULE may point to an existing Playwright install.
// Run against the dev/preview server with PORTFOLIO_URL (defaults to localhost:3005).
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir } from 'node:fs/promises';

const { chromium } = createRequire(import.meta.url)(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.PORTFOLIO_URL || 'http://127.0.0.1:3005';
const browser = await chromium.launch({ headless: true, ...(process.env.BROWSER_CHANNEL ? { channel: process.env.BROWSER_CHANNEL } : {}) });
const errors = [];
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();
page.on('pageerror', error => errors.push(error.message));
await mkdir(new URL('../build/qa/', import.meta.url), { recursive: true });

async function assertMenu() {
  await page.locator('.menu-channel').first().waitFor();
  assert.equal(await page.locator('.menu-channel').count(), 12);
  assert.equal(await page.locator('.menu-channel').nth(5).getAttribute('href'), '/mii');
  assert.equal(await page.locator('a[href^="/play"], a[href="/now"], .menu-pager').count(), 0);
  assert.equal(await page.locator('.skip-link').evaluate(el => getComputedStyle(el).opacity), '0');
}

async function assertFits(label) {
  const layout = await page.evaluate(() => {
    const banner = document.querySelector('.building-banner').getBoundingClientRect();
    const home = document.querySelector('.console-home').getBoundingClientRect();
    return { width: innerWidth, scrollWidth: document.documentElement.scrollWidth, bannerBottom: banner.bottom, homeTop: home.top };
  });
  assert.ok(layout.scrollWidth <= layout.width + 1, `${label}: horizontal overflow ${JSON.stringify(layout)}`);
  assert.ok(layout.homeTop >= layout.bannerBottom, `${label}: HOME overlaps banner`);
}

try {
  await page.goto(base);
  await page.locator('.boot-screen').waitFor();
  assert.equal(await page.locator('.app-frame, .skip-link, .console-home').count(), 0);
  await page.locator('.boot-enter').waitFor();
  await page.keyboard.press('Tab');
  assert.equal(await page.evaluate(() => document.activeElement.getAttribute('href')), 'mailto:aaron.kleiman@queensu.ca');
  await page.keyboard.press('Shift+Tab');
  assert.ok(await page.locator('.boot-enter').evaluate(el => el === document.activeElement));
  await page.keyboard.press('a');
  await assertMenu();
  await page.keyboard.press('Tab');
  assert.equal(await page.locator('.skip-link').evaluate(el => getComputedStyle(el).opacity), '1');
  await page.keyboard.press('Enter');
  assert.equal(await page.evaluate(() => document.activeElement.id), 'main-content');
  assert.equal(await page.locator('.skip-link').evaluate(el => getComputedStyle(el).opacity), '0');
  await page.reload();
  await assertMenu();
  assert.equal(await page.locator('.boot-screen').count(), 0);

  // Browser/webview focus restoration must not reveal the link by itself.
  const skip = page.locator('.skip-link');
  const skipOpacity = () => skip.evaluate(el => getComputedStyle(el).opacity);
  const tabToSkip = async () => {
    await page.locator('.menu-channel').first().focus();
    await page.keyboard.press('Shift+Tab');
    assert.equal(await skipOpacity(), '1');
  };
  await skip.focus();
  assert.equal(await skipOpacity(), '0', 'programmatic focus must stay hidden');
  await page.keyboard.press('a');
  assert.equal(await skipOpacity(), '0', 'non-Tab keyboard input must not reveal the link');
  await tabToSkip();
  await page.reload();
  await assertMenu();
  await skip.focus();
  assert.equal(await skipOpacity(), '0', 'focus restored after reload must stay hidden');
  await tabToSkip();
  await page.goto(base + '/about');
  await page.getByRole('button', { name: 'Start', exact: true }).waitFor();
  await page.goBack();
  await assertMenu();
  await tabToSkip();
  await page.locator('main').click({ position: { x: 2, y: 2 } });
  assert.equal(await skipOpacity(), '0', 'pointer interaction must dismiss the link');
  await tabToSkip();
  await skip.click();
  assert.equal(await page.evaluate(() => document.activeElement.id), 'main-content');
  assert.equal(await skipOpacity(), '0', 'the revealed link remains mouse-clickable');
  await tabToSkip();
  await page.evaluate(() => window.dispatchEvent(new Event('blur')));
  assert.equal(await skipOpacity(), '0', 'leaving the window clears a stale reveal');
  await tabToSkip();
  await page.keyboard.press('Enter');
  assert.equal(await page.evaluate(() => document.activeElement.id), 'main-content');
  assert.equal(await skipOpacity(), '0');

  await page.evaluate(() => sessionStorage.setItem('ak-menu-page', '1'));
  await page.goto(`${base}/?page=play`);
  await assertMenu();
  await page.locator('.menu-channel').first().focus();
  await page.keyboard.press('End');
  assert.ok(await page.locator('.menu-channel').last().evaluate(el => el === document.activeElement));
  await page.keyboard.press('Home');
  await page.keyboard.press('ArrowRight');
  assert.ok(await page.locator('.menu-channel').nth(1).evaluate(el => el === document.activeElement));
  await page.locator('main').click({ position: { x: 2, y: 2 } });
  await assertFits('desktop menu');
  await page.screenshot({ path: new URL('../build/qa/menu-desktop.png', import.meta.url).pathname.replace(/^\/([A-Z]:)/i, '$1'), fullPage: true });
  await page.locator('.menu-channel[href="/mii"]').click();
  await page.getByRole('button', { name: 'Start', exact: true }).click();
  await page.getByRole('heading', { name: 'Mii Channel', exact: true }).waitFor();
  assert.equal(await page.locator('.channel-header-band > span').textContent(), '06');
  assert.equal(await page.locator('a[href*="page=play"]').count(), 0);
  await page.getByRole('link', { name: 'Wii Menu', exact: true }).click();
  await assertMenu();
  assert.ok(await page.locator('.menu-channel[href="/mii"]').evaluate(el => el === document.activeElement));
  for (const path of ['/arcade', '/play', '/play/snake', '/play/reversi']) {
    await page.goto(base + path);
    await page.waitForURL(base + '/');
    await assertMenu();
  }
  await page.goto(base + '/now');
  await page.waitForURL(base + '/mii');
  await page.getByRole('button', { name: 'Start', exact: true }).waitFor();

  for (const [width, height] of [[320, 568], [390, 844], [844, 390]]) {
    await page.setViewportSize({ width, height });
    await page.goto(base);
    await assertMenu();
    await assertFits(`${width} menu`);
    const clock = await page.locator('.footer-clock').boundingBox();
    const footer = await page.locator('.wii-footer').boundingBox();
    assert.ok(clock.y >= footer.y && clock.y + clock.height <= footer.y + footer.height + 1, `${width}: clock outside footer`);
    const brokenImages = await page.locator('.wii-channel-grid img').evaluateAll(images => images.filter(img => img.complete && !img.naturalWidth).map(img => img.src));
    assert.deepEqual(brokenImages, []);
    await page.screenshot({ path: new URL(`../build/qa/menu-${width}.png`, import.meta.url).pathname.replace(/^\/([A-Z]:)/i, '$1'), fullPage: true });
    await page.locator('.menu-channel[href="/mii"]').click();
    await page.getByRole('button', { name: 'Start', exact: true }).click();
    await assertFits(`${width} Mii`);
    await page.getByRole('button', { name: /Open HOME Menu/ }).click();
    await page.getByRole('dialog', { name: 'HOME Menu' }).waitFor();
    await page.getByRole('button', { name: 'Resume', exact: true }).click();
  }
  const blocked = await browser.newContext();
  await blocked.addInitScript(() => {
    Object.defineProperty(window, 'sessionStorage', { get() { throw new DOMException('Blocked', 'SecurityError'); } });
  });
  const blockedPage = await blocked.newPage();
  blockedPage.on('pageerror', error => errors.push(error.message));
  await blockedPage.goto(base + '/mii');
  await blockedPage.locator('.boot-screen').waitFor();
  await blockedPage.keyboard.press('Escape');
  await blockedPage.getByRole('button', { name: 'Start', exact: true }).waitFor();
  assert.equal(await blockedPage.locator('.boot-screen').count(), 0);
  await blocked.close();

  const touch = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
  await touch.addInitScript(() => sessionStorage.setItem('ak-startup-complete', '1'));
  const touchPage = await touch.newPage();
  touchPage.on('pageerror', error => errors.push(error.message));
  await touchPage.goto(base);
  await touchPage.locator('.skip-link').focus();
  assert.equal(await touchPage.locator('.skip-link').evaluate(el => getComputedStyle(el).opacity), '0');
  await touchPage.locator('.menu-channel').first().focus();
  await touchPage.keyboard.press('Shift+Tab');
  assert.equal(await touchPage.locator('.skip-link').evaluate(el => getComputedStyle(el).opacity), '1');
  await touchPage.touchscreen.tap(200, 85);
  assert.equal(await touchPage.locator('.skip-link').evaluate(el => getComputedStyle(el).opacity), '0');
  await touch.close();
  assert.deepEqual(errors, []);
  console.log('PASS: startup, focus trap, deliberate Tab-only skip link, restored focus, focused reload/history, pointer/touch dismissal, menu ordering, stale links, Mii navigation, HOME, blocked storage, desktop and 320/390/844px layouts.');
} finally {
  await browser.close();
}
