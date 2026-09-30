const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const test = require('node:test');
const ts = require('typescript');

require.extensions['.ts'] = (loaded, filename) => {
  const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2017, esModuleInterop: true },
  }).outputText;
  loaded._compile(compiled, filename);
};

function loadTypeScript(relativePath) {
  const filename = path.resolve(__dirname, '..', relativePath);
  const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2017, esModuleInterop: true },
  }).outputText;
  const loaded = new Module(filename, module);
  loaded.filename = filename;
  loaded.paths = module.paths;
  loaded._compile(compiled, filename);
  return loaded.exports;
}

const { fallbackProjects: projects } = loadTypeScript('lib/data.ts');
const { projectDossiers } = loadTypeScript('data/projects.ts');
const { getProjectSelection } = loadTypeScript('lib/project-list.ts');
const featuredSlugs = [
  'global-electronics-powerbi', 'expected-goals-xg-statsbomb', 'statsbomb-sql-analytics',
  'lol-win-prediction', 'tfg-modulo-chatbots', 'hotel-booking-cancellation-ml', 'unimate',
];

test('the explicit featured order survives catalog reordering', () => {
  const result = getProjectSelection([...projects].reverse(), true, false);
  assert.equal(result.visible.length, 6);
  assert.deepEqual(result.visible.map((p) => p.slug), featuredSlugs.slice(0, 6));
  assert(!result.visible.some((p) => p.slug === 'unimate'));
  assert.equal(result.hasMore, true);
});

test('expansion retains the first seven and reveals every project once', () => {
  const { visible } = getProjectSelection(projects, true, true);
  assert.equal(visible.length, projects.length);
  assert.equal(new Set(visible.map((p) => p.slug)).size, projects.length);
  assert.equal(new Set(projects.map((p) => p.id)).size, projects.length);
  assert.deepEqual(visible.slice(0, 7).map((p) => p.slug), featuredSlugs);
  assert(visible.some((p) => p.slug === 'statistical-sales-analysis'));
  assert.deepEqual(getProjectSelection(projects, true, false).visible.map((p) => p.slug), featuredSlugs.slice(0, 6));
});

for (const count of [0, 4, 6, 7]) {
  test('category/search with ' + count + ' matches is limited after filtering', () => {
    const filtered = Array.from({ length: count }, (_, index) => ({
      ...projects[0], slug: 'match-' + index, featured: false,
    }));
    const initial = getProjectSelection(filtered, false, false);
    assert.equal(initial.visible.length, Math.min(count, 6));
    assert.equal(initial.hasMore, count > 6);
    assert.deepEqual(getProjectSelection(filtered, false, true).visible, filtered);
  });
}

test('non-featured Statistics remains reachable through category and search results', () => {
  const matching = projects.filter((p) => (p.categories ?? [p.category]).includes('data-analytics'));
  assert(getProjectSelection(matching, false, false).visible.some((p) => p.slug === 'statistical-sales-analysis'));
  const searched = projects.filter((p) => p.slug === 'statistical-sales-analysis');
  assert.deepEqual(getProjectSelection(searched, false, false).visible, searched);
});

test('recovered cards and dossiers share real covers and retain their resources', () => {
  for (const slug of ['statistical-sales-analysis', 'global-electronics-powerbi']) {
    const card = projects.find((p) => p.slug === slug);
    const dossier = projectDossiers.find((p) => p.slug === slug);
    assert(card && dossier, slug);
    assert.equal(card.image_url, dossier.coverImage);
    assert(card.image_url.endsWith('-cover.jpg'));
    assert(fs.existsSync(path.resolve(__dirname, '../public' + card.image_url)));
    assert(dossier.resources.length >= 2);
    for (const resource of dossier.resources) {
      if (resource.url.startsWith('/')) assert(fs.existsSync(path.resolve(__dirname, '../public' + resource.url)), resource.url);
    }
    assert(dossier.translations.en, slug);
  }
});

const hotelSlug = 'hotel-booking-cancellation-ml';
const hotel = projectDossiers.find((project) => project.slug === hotelSlug);
const hotelPublic = path.resolve(__dirname, '../public/projects', hotelSlug);

test('the completed hotel project is featured sixth without losing other projects', () => {
  assert.equal(projects.length, 12);
  const card = projects.find((project) => project.slug === hotelSlug);
  assert(card && hotel);
  assert.equal(card.featured, true);
  assert.equal(card.featuredOrder, 6);
  assert.equal(card.status, 'terminado');
  assert.deepEqual(card.categories, ['master', 'data-science']);
  assert.equal(card.image_url, hotel.coverImage);
  assert.equal(card.github_url, hotel.githubUrl);
  assert(getProjectSelection(projects, true, true).visible.some((project) => project.slug === hotelSlug));
  for (const category of card.categories) {
    const matches = projects.filter((project) => (project.categories ?? [project.category]).includes(category));
    assert(getProjectSelection(matches, false, true).visible.some((project) => project.slug === hotelSlug));
  }
  for (const locale of ['es', 'en']) {
    const messages = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../messages', locale + '.json')));
    assert.equal(messages.projects.items[hotelSlug].title, hotel.title);
    assert(messages.projects.items[hotelSlug].description.length > 30);
  }
});

test('the hotel dossier is complete in both languages with no empty or repeated sections', () => {
  assert.equal(hotel.detailSections.length, hotel.translations.en.detailSections.length);
  for (const localized of [hotel, hotel.translations.en]) {
    assert.equal(new Set(localized.detailSections.map((section) => section.title)).size, localized.detailSections.length);
    for (const section of localized.detailSections) {
      assert(section.title);
      assert(section.body?.length || section.items?.length || section.metrics?.length || section.image);
      for (const field of ['body', 'items', 'steps']) {
        if (section[field]) assert(section[field].every((value) => value.trim().length > 0));
      }
      if (section.image) assert(fs.existsSync(path.resolve(__dirname, '../public' + section.image.src)));
    }
    assert.equal(localized.resources.length, 4);
    for (const resource of localized.resources) {
      assert(resource.title && resource.description && resource.url);
      if (resource.url.startsWith('/')) assert(fs.existsSync(path.resolve(__dirname, '../public' + resource.url)));
    }
  }
  assert(!hotel.technologies.includes('Seaborn'));
  assert.equal(hotel.translations.en.resources[0].title, 'GitHub Repository');
});

test('published hotel dataset and figures match the supplied executed notebook', () => {
  const crypto = require('node:crypto');
  const notebook = JSON.parse(fs.readFileSync(path.join(hotelPublic, 'notebooks/cancelaciones_hoteleras_DanielGarcia.ipynb')));
  const hash = crypto.createHash('sha256').update(fs.readFileSync(path.join(hotelPublic, 'data/reservas_hoteleras.csv'))).digest('hex');
  const loadOutput = notebook.cells[4].outputs.map((output) => (output.text ?? []).join('')).join('');
  assert(loadOutput.includes(hash));
  const chartCells = [
    [18, 0, 'eda-channel-segment'], [21, 0, 'eda-lead-time'], [53, 0, 'threshold-analysis'],
    [59, 0, 'test-confusion-matrix'], [61, 0, 'shap-summary'],
    [63, 0, 'shap-waterfall-high'], [63, 1, 'shap-waterfall-low'],
  ];
  for (const [cell, index, name] of chartCells) {
    const png = notebook.cells[cell].outputs.filter((output) => output.data?.['image/png'])[index].data['image/png'];
    assert.deepEqual(fs.readFileSync(path.join(hotelPublic, 'images', name + '.png')), Buffer.from(Array.isArray(png) ? png.join('') : png, 'base64'));
  }
  const testOutput = notebook.cells[59].outputs.map((output) => (output.data?.['text/markdown'] ?? []).join('')).join('');
  for (const value of ['0.8914', '68.2%', '89.0%', '77.3%', '52.9']) assert(testOutput.includes(value));
  const finalResults = hotel.translations.en.detailSections.find((section) => section.eyebrow === 'Final results');
  assert.deepEqual(finalResults.metrics.map((metric) => metric.value), ['0.8914', '68.2%', '89.0%', '77.3%', '52.9%', '31.8%']);
});
