import type { ContactMessage } from '@/types';

export interface ValidationError {
  field: string;
  message: string;
}

interface ContactValidationMessages {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const defaultMessages: ContactValidationMessages = {
  name: 'El nombre debe tener al menos 2 caracteres.',
  email: 'Introduce un email válido.',
  subject: 'El asunto debe tener al menos 3 caracteres.',
  message: 'El mensaje debe tener al menos 10 caracteres.',
};

export function validateContactForm(
  data: ContactMessage,
  messages: ContactValidationMessages = defaultMessages
): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!data.name || data.name.trim().length < 2) {
    errors.push({ field: 'name', message: messages.name });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    errors.push({ field: 'email', message: messages.email });
  }

  if (!data.subject || data.subject.trim().length < 3) {
    errors.push({ field: 'subject', message: messages.subject });
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.push({ field: 'message', message: messages.message });
  }

  return errors;
}
