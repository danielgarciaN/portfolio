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
  name: 'El nombre debe tener entre 2 y 100 caracteres, en una sola línea.',
  email: 'Introduce un email válido.',
  subject: 'El asunto debe tener entre 3 y 160 caracteres, en una sola línea.',
  message: 'El mensaje debe tener entre 10 y 5000 caracteres.',
};

export const CONTACT_LIMITS = {
  name: { min: 2, max: 100 },
  email: { min: 3, max: 254 },
  subject: { min: 3, max: 160 },
  message: { min: 10, max: 5000 },
} as const;

export function isValidEmail(value: unknown): value is string {
  if (typeof value !== 'string' || value.trim().length > CONTACT_LIMITS.email.max) return false;
  if (/[\u0000-\u001f\u007f]/.test(value)) return false;
  return /^[^\s@<>(),;:\\"\[\]]+@[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+$/i.test(value.trim());
}

export function validateContactForm(
  data: unknown,
  messages: ContactValidationMessages = defaultMessages
): ValidationError[] {
  const errors: ValidationError[] = [];
  const fields = data && typeof data === 'object' && !Array.isArray(data)
    ? data as Record<string, unknown>
    : {};

  for (const field of ['name', 'subject', 'message'] as const) {
    const value = fields[field];
    const limits = CONTACT_LIMITS[field];
    if (typeof value !== 'string' || value.trim().length < limits.min || value.trim().length > limits.max ||
        (field !== 'message' && /[\u0000-\u001f\u007f]/.test(value))) {
      errors.push({ field, message: messages[field] });
    }
  }

  if (!isValidEmail(fields.email)) {
    errors.push({ field: 'email', message: messages.email });
  }

  return errors;
}
