const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const dictionaries = { es: require('../messages/es.json'), en: require('../messages/en.json') };
const root = process.env.TEST_BASE_URL || 'http://127.0.0.1:3000';
const featured = ['global-electronics-powerbi', 'expected-goals-xg-statsbomb', 'statsbomb-sql-analytics', 'lol-win-prediction', 'tfg-modulo-chatbots', 'hotel-booking-cancellation-ml', 'unimate'];

async function main() {
  const browser = await chromium.launch({ channel: process.platform === 'win32' ? 'msedge' : undefined, headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    const output = path.resolve(__dirname, '../node_modules/.cache/patches-browser');
    fs.mkdirSync(output, { recursive: true });
    await page.goto(root, { waitUntil: 'networkidle' });

    for (const [locale, messages] of Object.entries(dictionaries)) {
      await page.getByRole('button', { name: messages.nav[locale === 'en' ? 'english' : 'spanish'], exact: true }).click();
      await page.waitForFunction((language) => document.documentElement.lang === language, locale);
      const passions = page.locator('#pasiones');
      assert.deepEqual(await passions.locator('h3').allTextContents(), messages.about.interests.map((interest) => interest.title));
      assert(!(await passions.innerText()).includes('Marvel'));
      assert.equal(await passions.locator('article').first().locator('svg.lucide-book-open').count(), 1);
      const jobs = page.locator('#experiencia article');
      const occidentTitle = messages.timeline.items.find((item) => item.id === 't1').title;
      const occident = jobs.filter({ has: page.getByRole('heading', { name: occidentTitle, exact: true }) });
      const sdg = jobs.filter({ has: page.getByRole('heading', { name: 'Data Analyst', exact: true }) });
      assert((await occident.locator('header').innerText()).includes(messages.timeline.occidentEmployment));
      assert((await sdg.locator('header').innerText()).includes(messages.timeline.employment));
      const metadata = occident.locator('h3 + p');
      assert.equal(await metadata.innerText(), messages.timeline.occidentEmployment);
      for (const task of messages.timeline.workDetails.t1.responsibilities) assert((await occident.innerText()).includes(task));

      const projects = page.locator('#proyectos');
      await projects.getByRole('button', { name: messages.projects.categories.all, exact: true }).click();
      const articles = projects.locator('article');
      const slugs = () => articles.locator('a').filter({ hasNot: page.locator('svg') }).evaluateAll((links) => links.filter((link) => link.getAttribute('aria-label')?.includes(':')).map((link) => link.getAttribute('href').split('/').pop()));
      assert.equal(await articles.count(), 6);
      assert.deepEqual(await slugs(), featured.slice(0, 6));
      const more = projects.getByRole('button', { name: messages.projects.viewMore, exact: true });
      assert.equal(await more.getAttribute('aria-expanded'), 'false');
      await more.focus();
      await page.keyboard.press('Enter');
      assert.equal(await articles.count(), 12);
      assert.deepEqual((await slugs()).slice(0, 7), featured);
      assert.equal(new Set(await slugs()).size, 12);
      assert((await slugs()).includes('statistical-sales-analysis'));
      for (const slug of ['tofu-awards', 'statsbomb-sql-analytics', 'expected-goals-xg-statsbomb']) {
        const img = articles.filter({ has: page.locator(`a[href="/projects/${slug}"]`) }).locator('img');
        await img.scrollIntoViewIfNeeded();
        await img.evaluate((image) => image.decode());
        const file = slug === 'expected-goals-xg-statsbomb' ? `${slug}.jpg` : `${slug}-cover.jpg`;
        assert(decodeURIComponent(await img.getAttribute('src')).includes(file));
      }
      await projects.getByRole('button', { name: messages.projects.showLess, exact: true }).click();
      assert.deepEqual(await slugs(), featured.slice(0, 6));
      for (const category of ['data-analytics', 'master']) {
        await projects.getByRole('button', { name: messages.projects.categories[category], exact: true }).click();
        assert((await slugs()).includes('statistical-sales-analysis'));
        assert.equal(await projects.getByRole('button', { name: messages.projects.viewMore, exact: true }).count(), 0);
      }
      await projects.getByRole('button', { name: messages.projects.categories.all, exact: true }).click();
      await projects.getByRole('textbox').fill('Statistical');
      assert.deepEqual(await slugs(), ['statistical-sales-analysis']);
      await projects.getByRole('textbox').fill('');
      assert.deepEqual(await slugs(), featured.slice(0, 6));

      const contact = page.locator('#contacto');
      for (const width of [1440, 768, 390, 320]) {
        await page.setViewportSize({ width, height: 1000 });
        for (const [name, section] of [['passions', passions], ['occident', occident], ['contact', contact], ['projects', projects]]) {
          await section.scrollIntoViewIfNeeded();
          if (width === 1440 || width === 390) await section.screenshot({ path: path.join(output, `${locale}-${name}-${width}.png`) });
          assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false, `${locale} ${width} ${name} overflow`);
        }
      }
      await page.setViewportSize({ width: 1440, height: 1000 });
      await contact.getByRole('button', { name: messages.contact.send, exact: true }).click();
      assert.equal(await contact.locator('[aria-invalid="true"]').count(), 4);
      for (const [field, value] of Object.entries({ name: 'Portfolio Test', email: 'visitor@example.com', subject: 'Contact smoke test', message: 'This is a contact form verification message.' })) await contact.locator(`[name="${field}"]`).fill(value);
      assert.equal(await contact.locator('#website').isVisible(), false);
      assert.equal(await contact.locator('#message').getAttribute('maxlength'), '5000');
      let submissions = 0;
      let finish;
      const gate = new Promise((resolve) => { finish = resolve; });
      await page.route('**/api/contact', async (route) => {
        submissions++;
        assert.equal(route.request().method(), 'POST');
        assert.equal(route.request().postDataJSON().website, '');
        await gate;
        await route.fulfill({ status: 502, contentType: 'application/json', body: JSON.stringify({ error: 'Email delivery failed' }) });
      });
      await contact.getByRole('button', { name: messages.contact.send, exact: true }).click();
      await page.waitForFunction(() => document.querySelector('#contacto form').getAttribute('aria-busy') === 'true');
      assert.equal(await contact.getByRole('button', { name: messages.contact.sending, exact: true }).isDisabled(), true);
      await contact.locator('form').evaluate((form) => { form.requestSubmit(); form.requestSubmit(); });
      finish();
      await contact.getByRole('alert').waitFor();
      assert.equal(submissions, 1);
      assert.equal(await contact.getByRole('alert').innerText(), messages.contact.error);
      assert.equal(await contact.locator('#message').inputValue(), 'This is a contact form verification message.');
      await page.unroute('**/api/contact');
      await page.route('**/api/contact', (route) => route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ success: true }) }));
      await contact.getByRole('button', { name: messages.contact.send, exact: true }).click();
      await contact.getByRole('status').waitFor();
      assert((await contact.getByRole('status').innerText()).includes(messages.contact.successTitle));
      await contact.getByRole('button', { name: messages.contact.sendAnother, exact: true }).click();
      assert.equal(await contact.locator('#message').inputValue(), '');
      await page.unroute('**/api/contact');
      console.log(`PASS ${locale}: passions, employment, six initial projects, filters, responsive and form states (mock email responses)`);
    }

    for (const [slug, image] of [['tofu-awards', 'tofu-awards-cover.jpg'], ['statsbomb-sql-analytics', 'statsbomb-sql-analytics-cover.jpg'], ['expected-goals-xg-statsbomb', 'expected-goals-xg-statsbomb.jpg']]) {
      assert.equal((await page.goto(`${root}/projects/${slug}`, { waitUntil: 'networkidle' })).status(), 200);
      const cover = page.locator('main header img').first();
      await cover.evaluate((img) => img.decode());
      assert(decodeURIComponent(await cover.getAttribute('src')).includes(image));
      assert((await page.locator('meta[property="og:image"]').getAttribute('content')).includes(image));
    }
    await page.goto(root + '/projects', { waitUntil: 'networkidle' });
    assert.equal(await page.locator('#proyectos article').count(), 6);
    await page.goto(root + '/contact', { waitUntil: 'networkidle' });
    assert.equal(await page.locator('#contacto form').count(), 1);
    assert.equal((await page.request.get(root + '/api/contact')).status(), 405);
    assert.equal((await page.request.post(root + '/api/contact', { data: { name: '' } })).status(), 400);
    assert.deepEqual(errors, []);
    console.log('PASS: card/detail/metadata images, standalone pages and actual API validation; no browser errors');
  } finally {
    await browser.close();
  }
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
