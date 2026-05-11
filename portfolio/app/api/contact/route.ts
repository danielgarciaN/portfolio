import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { validateContactForm } from '@/lib/validations';
import type { ContactMessage } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body: ContactMessage = await request.json();

    // Validate
    const errors = validateContactForm(body);
    if (errors.length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    // Insert into Supabase
    const { error } = await supabase.from('contact_messages').insert({
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      subject: body.subject.trim(),
      message: body.message.trim(),
    });

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
