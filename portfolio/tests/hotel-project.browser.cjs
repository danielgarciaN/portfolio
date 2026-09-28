const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const es = require('../messages/es.json');
const en = require('../messages/en.json');

async function main() {
  const browser = await chromium.launch({ channel: process.platform === 'win32' ? 'msedge' : undefined, headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    const root = process.env.TEST_BASE_URL || 'http://127.0.0.1:3001';
    const slug = 'hotel-booking-cancellation-ml';
    const screenshots = path.resolve(__dirname, '../node_modules/.cache/hotel-browser');
    fs.mkdirSync(screenshots, { recursive: true });
    await page.goto(root + '/projects', { waitUntil: 'networkidle' });
    const articles = page.locator('#proyectos article');
    assert.equal(await articles.count(), 6);
    const initialTitles = await articles.locator('h3').allTextContents();
    assert.deepEqual(initialTitles, ['UNImate', 'LoL Win Prediction', 'TFG - Modulo de Chatbots', 'Global Electronics Retail Analytics', 'Expected Goals xG - StatsBomb', 'StatsBomb SQL Analytics']);
    await page.getByRole('button', { name: es.projects.viewMore, exact: true }).click();
    assert.equal(await articles.count(), 12);
    const card = articles.filter({ has: page.getByRole('heading', { name: 'Hotel Booking Cancellation Prediction', exact: true }) });
    assert.equal(await card.count(), 1);
    for (const category of ['master', 'data-science']) assert((await card.innerText()).includes(es.projects.categories[category]));
    await card.scrollIntoViewIfNeeded();
    await card.locator('img').evaluate((img) => img.decode());
    await card.screenshot({ path: path.join(screenshots, 'card.png') });
    await page.getByRole('button', { name: es.projects.showLess, exact: true }).click();
    assert.equal(await articles.count(), 6);
    for (const category of ['data-science', 'master']) {
      await page.getByRole('button', { name: es.projects.categories[category], exact: true }).click();
      assert.equal(await card.count(), 1);
    }
    await page.getByRole('button', { name: es.projects.categories.all, exact: true }).click();
    await page.getByRole('textbox').fill('cancelaciones');
    assert.equal(await card.count(), 1);
    assert.equal(await articles.count(), 1);
    console.log('PASS: original six, expanded twelve, categories and search');

    const response = await page.goto(root + '/projects/' + slug, { waitUntil: 'networkidle' });
    assert.equal(response.status(), 200);
    assert((await page.locator('meta[property="og:image"]').getAttribute('content')).includes(slug + '-cover.jpg'));
    for (const [locale, messages] of [['es', es], ['en', en]]) {
      await page.getByRole('button', { name: messages.nav[locale === 'en' ? 'english' : 'spanish'], exact: true }).click();
      await page.waitForFunction((language) => document.documentElement.lang === language, locale);
      const titles = await page.locator('main h2').allTextContents();
      assert.equal(new Set(titles).size, titles.length, 'duplicate sections');
      assert((await page.locator('main h1, main h2, main h3').allTextContents()).every((title) => title.trim()), 'empty heading');
      assert.equal(await page.locator('main section').count(), 22);
      const body = await page.locator('main').last().innerText();
      assert(body.includes(locale === 'en' ? '68.2%' : '68,2 %'));
      assert(body.includes(locale === 'en' ? 'earlier versions' : 'versiones anteriores'));
      assert.equal(await page.getByRole('heading', { name: locale === 'en' ? 'GitHub Repository' : 'Repositorio GitHub', exact: true }).count(), 1);
      for (const width of [1440, 768, 390, 320]) {
        await page.setViewportSize({ width, height: 1000 });
        await page.evaluate(() => scrollTo(0, 0));
        await page.screenshot({ path: path.join(screenshots, `${locale}-${width}.png`) });
        const overflow = await page.evaluate(() => ({
          page: document.documentElement.scrollWidth > innerWidth + 1,
          elements: [...document.querySelectorAll('main p, main li, main h1, main h2, main span')]
            .filter((el) => el.clientWidth > 0 && el.scrollWidth > el.clientWidth + 2)
            .map((el) => el.textContent.slice(0, 80)),
        }));
        assert.equal(overflow.page, false, `${locale} ${width}: page overflow`);
        assert.deepEqual(overflow.elements, [], `${locale} ${width}: text overflow`);
        console.log(`PASS: ${locale} ${width}px`);
      }
    }
    await page.setViewportSize({ width: 1440, height: 1000 });
    for (const img of await page.locator('main img').all()) {
      await img.scrollIntoViewIfNeeded();
      await img.evaluate((image) => image.decode());
      assert(await img.evaluate((image) => image.naturalWidth > 0));
    }
    assert.equal(await page.locator('main img').count(), 8);
    const results = page.locator('section').filter({ has: page.getByRole('heading', { name: 'TEST: refitted HistGradientBoosting, threshold 0.30', exact: true }) });
    await results.screenshot({ path: path.join(screenshots, 'results-desktop.png') });
    await page.setViewportSize({ width: 390, height: 844 });
    await results.screenshot({ path: path.join(screenshots, 'results-mobile.png') });
    const resourceUrls = await page.locator(`main a[href^="/projects/${slug}/"]`).evaluateAll((links) => links.map((link) => link.getAttribute('href')));
    assert.equal(resourceUrls.length, 3);
    for (const url of resourceUrls) {
      const resource = await page.request.get(root + url);
      assert.equal(resource.status(), 200, url);
      assert((await resource.body()).length > 1000);
    }
    for (const oldSlug of ['statistical-sales-analysis', 'global-electronics-powerbi', 'unimate', 'lol-win-prediction', 'tfg-modulo-chatbots', 'expected-goals-xg-statsbomb', 'statsbomb-sql-analytics', 'marketing-ia', 'find-it', 'futbol-data', 'tofu-awards']) {
      assert.equal((await page.request.get(root + '/projects/' + oldSlug)).status(), 200, oldSlug);
    }
    assert.deepEqual(errors, []);
    console.log('PASS: bilingual dossier, no empty/duplicate sections, eight images, downloads, all existing routes, no browser errors');
  } finally {
    await browser.close();
  }
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
