import { NextRequest, NextResponse } from 'next/server';
import { isValidEmail, validateContactForm } from '@/lib/validations';
import type { ContactMessage } from '@/types';

export const runtime = 'nodejs';
const MAX_BODY_BYTES = 32 * 1024;

async function readBody(request: NextRequest): Promise<unknown> {
  const reader = request.body?.getReader();
  if (!reader) throw new SyntaxError('Missing body');
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY_BYTES) {
        await reader.cancel();
        throw new RangeError('Body too large');
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin');
  if (origin && origin !== request.nextUrl.origin) {
    return NextResponse.json({ error: 'Invalid origin' }, { status: 403 });
  }
  if (request.headers.get('content-type')?.split(';')[0].trim().toLowerCase() !== 'application/json') {
    return NextResponse.json({ error: 'Expected JSON' }, { status: 415 });
  }
  if (Number(request.headers.get('content-length')) > MAX_BODY_BYTES) {
    return NextResponse.json({ error: 'Payload too large' }, { status: 413 });
  }

  let body: unknown;
  try {
    body = await readBody(request);
  } catch (error) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: error instanceof RangeError ? 413 : 400 });
  }
  const errors = validateContactForm(body);
  if (errors.length > 0) return NextResponse.json({ errors }, { status: 400 });
  const fields = body as ContactMessage & { website?: unknown };
  if (fields.website !== undefined && typeof fields.website !== 'string') {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }
  // Silently discard submissions that fill the invisible honeypot.
  if (typeof fields.website === 'string' && fields.website.trim()) {
    return NextResponse.json({ success: true });
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const destination = process.env.CONTACT_EMAIL?.trim();
  const sender = process.env.CONTACT_FROM_EMAIL?.trim();
  if (!apiKey || !isValidEmail(destination) || !isValidEmail(sender)) {
    console.error('Contact email configuration is missing or invalid.');
    return NextResponse.json({ error: 'Email service unavailable' }, { status: 503 });
  }

  const name = fields.name.trim();
  const email = fields.email.trim();
  const subject = fields.subject.trim();
  const message = fields.message.trim();
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + apiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'Portfolio <' + sender + '>',
        to: [destination],
        reply_to: email,
        subject: 'Portfolio Contact - ' + name + ': ' + subject,
        text: 'New message from the portfolio\n\nName: ' + name + '\nEmail: ' + email +
          '\nSubject: ' + subject + '\n\nMessage:\n' + message,
      }),
      cache: 'no-store',
      signal: AbortSignal.timeout(15_000),
    });
    if (!response.ok) {
      console.error('Contact email provider rejected the request.', { status: response.status });
      return NextResponse.json({ error: 'Email delivery failed' }, { status: 502 });
    }
    const result = await response.json();
    if (typeof result?.id !== 'string' || !result.id) throw new Error('Missing email ID');
    return NextResponse.json({ success: true });
  } catch {
    console.error('Contact email provider request failed.');
    return NextResponse.json({ error: 'Email delivery failed' }, { status: 502 });
  }
}
