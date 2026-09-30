const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const test = require('node:test');
const ts = require('typescript');
const { NextRequest } = require('next/server');

function load(relativePath, mocks = {}) {
  const filename = path.resolve(__dirname, '..', relativePath);
  const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const loaded = new Module(filename, module);
  loaded.filename = filename;
  loaded.paths = module.paths;
  const originalRequire = loaded.require.bind(loaded);
  loaded.require = (id) => Object.hasOwn(mocks, id) ? mocks[id] : originalRequire(id);
  loaded._compile(compiled, filename);
  return loaded.exports;
}

const validation = load('lib/validations.ts');
const { POST } = load('app/api/contact/route.ts', { '@/lib/validations': validation });
const valid = { name: 'Test Visitor', email: 'visitor@example.com', subject: 'Project inquiry', message: 'A message for the portfolio owner.', website: '' };

function request(payload = valid, headers = {}) {
  return new NextRequest('http://localhost:3000/api/contact', {
    method: 'POST', headers: { 'Content-Type': 'application/json', ...headers },
    body: typeof payload === 'string' ? payload : JSON.stringify(payload),
  });
}

function setup(t, response = () => Response.json({ id: 'test-email-id' })) {
  const keys = ['RESEND_API_KEY', 'CONTACT_EMAIL', 'CONTACT_FROM_EMAIL'];
  const previous = keys.map((key) => process.env[key]);
  Object.assign(process.env, { RESEND_API_KEY: 're_test_not_real', CONTACT_EMAIL: 'owner@example.com', CONTACT_FROM_EMAIL: 'contact@example.com' });
  t.after(() => keys.forEach((key, index) => {
    if (previous[index] === undefined) delete process.env[key];
    else process.env[key] = previous[index];
  }));
  t.mock.method(console, 'error', () => {});
  return t.mock.method(globalThis, 'fetch', response);
}

test('shared validation accepts valid input and enforces every length boundary', () => {
  assert.deepEqual(validation.validateContactForm(valid), []);
  for (const field of ['name', 'subject', 'message']) {
    const { min, max } = validation.CONTACT_LIMITS[field];
    for (const length of [min, max]) assert.deepEqual(validation.validateContactForm({ ...valid, [field]: 'x'.repeat(length) }), []);
    for (const value of ['', '   ', 'x'.repeat(min - 1), 'x'.repeat(max + 1), null, 123, [], {}]) {
      assert(validation.validateContactForm({ ...valid, [field]: value }).some((error) => error.field === field));
    }
  }
  for (const email of ['not-an-email', 'a@b', 'a b@example.com', 'a@example.com,b@example.com', 'Name <a@example.com>', 'a@example.com\r\nBcc: victim@example.com', 'a\0@example.com', 'x'.repeat(250) + '@example.com', null, 123]) {
    assert.equal(validation.isValidEmail(email), false, String(email));
  }
  for (const name of ['Injected\r\nBcc: bad@example.com', 'A\0B']) assert(validation.validateContactForm({ ...valid, name }).length > 0);
  for (const payload of [null, [], true, 42, {}]) assert(validation.validateContactForm(payload).length > 0);
});

test('POST sends through Resend with server-controlled recipient, sender and visitor Reply-To', async (t) => {
  const fetch = setup(t);
  const response = await POST(request({ ...valid, name: '  Test Visitor  ', email: ' visitor@example.com ', message: '<script>text, not HTML</script>\nSecond line', to: 'attacker@example.com', from: 'attacker@example.com' }, { Origin: 'http://localhost:3000' }));
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { success: true });
  assert.equal(fetch.mock.callCount(), 1);
  const [url, options] = fetch.mock.calls[0].arguments;
  assert.equal(url, 'https://api.resend.com/emails');
  assert.equal(options.method, 'POST');
  assert.equal(options.headers.Authorization, 'Bearer re_test_not_real');
  assert.equal(options.cache, 'no-store');
  assert(options.signal instanceof AbortSignal);
  const email = JSON.parse(options.body);
  assert.deepEqual(email.to, ['owner@example.com']);
  assert.equal(email.from, 'Portfolio <contact@example.com>');
  assert.equal(email.reply_to, 'visitor@example.com');
  assert.equal(email.subject, 'Portfolio Contact - Test Visitor: Project inquiry');
  assert(email.text.includes('Name: Test Visitor\nEmail: visitor@example.com\nSubject: Project inquiry'));
  assert(email.text.includes('<script>text, not HTML</script>\nSecond line'));
  assert.equal(email.html, undefined);
});

test('malformed and invalid payloads are rejected before any provider request', async (t) => {
  const fetch = setup(t);
  for (const payload of ['{', 'null', '[]', '{}', { ...valid, email: 12 }, { ...valid, subject: 'X\r\nBcc: spam@example.com' }, { ...valid, message: 'x'.repeat(5001) }, { ...valid, website: [] }]) {
    assert.equal((await POST(request(payload))).status, 400);
  }
  assert.equal(fetch.mock.callCount(), 0);
});

test('payload byte limit is enforced even without a truthful Content-Length', async (t) => {
  const fetch = setup(t);
  assert.equal((await POST(request(valid, { 'Content-Length': '50000' }))).status, 413);
  assert.equal((await POST(request({ ...valid, ignored: 'x'.repeat(33000) }))).status, 413);
  assert.equal((await POST(request({ ...valid, ignored: 'x'.repeat(33000) }, { 'Content-Length': '1' }))).status, 413);
  assert.equal(fetch.mock.callCount(), 0);
});

test('foreign origins, non-JSON submissions and honeypot bots never send mail', async (t) => {
  const fetch = setup(t);
  assert.equal((await POST(request(valid, { Origin: 'https://untrusted.example' }))).status, 403);
  assert.equal((await POST(request(valid, { 'Content-Type': 'text/plain' }))).status, 415);
  assert.equal((await POST(request({ ...valid, website: 'https://spam.example' }))).status, 200);
  assert.equal(fetch.mock.callCount(), 0);
});

test('missing or invalid configuration fails closed, without local storage or fake success', async (t) => {
  const fetch = setup(t);
  for (const key of ['RESEND_API_KEY', 'CONTACT_EMAIL', 'CONTACT_FROM_EMAIL']) {
    const previous = process.env[key];
    delete process.env[key];
    assert.equal((await POST(request())).status, 503);
    process.env[key] = previous;
  }
  process.env.CONTACT_EMAIL = 'not a valid mailbox';
  assert.equal((await POST(request())).status, 503);
  process.env.CONTACT_EMAIL = 'owner@example.com';
  process.env.CONTACT_FROM_EMAIL = 'Sender <sender@example.com>';
  assert.equal((await POST(request())).status, 503);
  assert.equal(fetch.mock.callCount(), 0);
});

for (const status of [400, 401, 403, 429, 500]) {
  test(`provider HTTP ${status} returns a generic failure without leaking provider details`, async (t) => {
    setup(t, () => Response.json({ message: 'private provider detail re_test_not_real' }, { status }));
    const response = await POST(request());
    assert.equal(response.status, 502);
    const body = await response.text();
    assert(!body.includes('private provider detail'));
    assert(!body.includes('re_test'));
  });
}

test('network errors, timeout and malformed provider success do not claim delivery', async (t) => {
  const fetch = setup(t, () => { throw new Error('Network failure'); });
  assert.equal((await POST(request())).status, 502);
  fetch.mock.mockImplementation(() => { throw new DOMException('Timeout', 'TimeoutError'); });
  assert.equal((await POST(request())).status, 502);
  fetch.mock.mockImplementation(() => Response.json({}));
  assert.equal((await POST(request())).status, 502);
  fetch.mock.mockImplementation(() => new Response('not JSON'));
  assert.equal((await POST(request())).status, 502);
});

test('contact no longer imports Supabase or filesystem storage; unrelated Supabase features remain', () => {
  const route = fs.readFileSync(path.resolve(__dirname, '../app/api/contact/route.ts'), 'utf8');
  assert(!/supabase|contact_messages|contact-messages|node:fs/.test(route));
  assert(!fs.readFileSync(path.resolve(__dirname, '../supabase/schema.sql'), 'utf8').includes('contact_messages'));
  for (const file of ['lib/projects.ts', 'app/api/skills/route.ts', 'app/api/experience/route.ts']) {
    assert(fs.readFileSync(path.resolve(__dirname, '..', file), 'utf8').includes('supabase'));
  }
  const frontend = fs.readFileSync(path.resolve(__dirname, '../components/sections/ContactForm.tsx'), 'utf8');
  assert(!/RESEND_API_KEY|CONTACT_EMAIL|CONTACT_FROM_EMAIL|supabase/.test(frontend));
});
