import { NextRequest, NextResponse } from 'next/server';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { supabase } from '@/lib/supabase';
import { validateContactForm } from '@/lib/validations';
import type { ContactMessage } from '@/types';

export const runtime = 'nodejs';

interface StoredContactMessage extends ContactMessage {
  created_at: string;
}

async function saveMessageLocally(message: StoredContactMessage) {
  const storageDir = path.join(process.cwd(), '.contact-messages');
  const storagePath = path.join(storageDir, 'messages.json');

  await mkdir(storageDir, { recursive: true });

  let messages: StoredContactMessage[] = [];
  try {
    const file = await readFile(storagePath, 'utf8');
    messages = JSON.parse(file) as StoredContactMessage[];
  } catch {
    messages = [];
  }

  messages.push(message);
  await writeFile(storagePath, `${JSON.stringify(messages, null, 2)}\n`, 'utf8');
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactMessage = await request.json();

    // Validate
    const errors = validateContactForm(body);
    if (errors.length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    const message = {
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      subject: body.subject.trim(),
      message: body.message.trim(),
      created_at: new Date().toISOString(),
    };

    if (!supabase) {
      await saveMessageLocally(message);
      return NextResponse.json({ success: true, storage: 'local' });
    }

    const { error } = await supabase.from('contact_messages').insert(message);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Error al guardar el mensaje. Inténtalo de nuevo.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Error en el servidor.' },
      { status: 500 }
    );
  }
}
