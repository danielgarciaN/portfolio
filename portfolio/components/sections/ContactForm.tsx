'use client';

import { useState } from 'react';
import Section from '@/components/ui/Section';
import { AlertCircle, CheckCircle, Github, Linkedin, Loader2, Mail, Phone, Send } from 'lucide-react';
import { validateContactForm, type ValidationError } from '@/lib/validations';
import { personalInfo } from '@/lib/data';
import { useI18n } from '@/lib/i18n';
import type { ContactMessage } from '@/types';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

export default function ContactForm() {
  const { messages } = useI18n();
  const [form, setForm] = useState<ContactMessage>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [status, setStatus] = useState<FormStatus>('idle');

  const fieldError = (field: string) => errors.find((error) => error.field === field)?.message;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => previous.filter((error) => error.field !== name));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const validationErrors = validateContactForm(form, messages.contact.validation);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus('sending');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error('Error sending message');
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const inputClasses = (field: string) =>
    `w-full rounded-xl border bg-[rgb(var(--color-card)/0.92)] px-4 py-2.5 text-sm text-surface-700 placeholder:text-surface-400 transition-all focus:outline-none focus:ring-2 dark:bg-surface-900 dark:text-surface-200 dark:placeholder:text-surface-500 ${
      fieldError(field)
        ? 'border-red-300 focus:border-red-400 focus:ring-red-200 dark:border-red-800 dark:focus:ring-red-900/40'
        : 'border-surface-200 focus:border-accent/50 focus:ring-accent/20 dark:border-surface-700'
    }`;

  return (
    <Section id="contacto">
      <span className="heading-section">{messages.contact.eyebrow}</span>
      <h2 className="heading-lg mt-3 mb-4">{messages.contact.title}</h2>
      <p className="mb-10 max-w-xl text-sm leading-relaxed text-surface-500 dark:text-surface-400">
        {messages.contact.intro}
      </p>

      <div className="grid gap-12 lg:grid-cols-5">
        <div className="lg:col-span-3">
          {status === 'success' ? (
            <div className="card flex flex-col items-center py-12 text-center">
              <CheckCircle className="mb-4 h-10 w-10 text-emerald-500" />
              <h3 className="mb-2 text-lg font-bold text-surface-800 dark:text-surface-100">
                {messages.contact.successTitle}
              </h3>
              <p className="text-sm text-surface-500">
                {messages.contact.successBody}
              </p>
              <button onClick={() => setStatus('idle')} className="btn-secondary mt-6">
                {messages.contact.sendAnother}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-xs font-semibold text-surface-600 dark:text-surface-400">
                    {messages.contact.name}
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder={messages.contact.namePlaceholder}
                    className={inputClasses('name')}
                  />
                  {fieldError('name') && (
                    <p className="mt-1 text-xs text-red-500">{fieldError('name')}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-xs font-semibold text-surface-600 dark:text-surface-400">
                    {messages.contact.email}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder={messages.contact.emailPlaceholder}
                    className={inputClasses('email')}
                  />
                  {fieldError('email') && (
                    <p className="mt-1 text-xs text-red-500">{fieldError('email')}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="mb-1.5 block text-xs font-semibold text-surface-600 dark:text-surface-400">
                  {messages.contact.subject}
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder={messages.contact.subjectPlaceholder}
                  className={inputClasses('subject')}
                />
                {fieldError('subject') && (
                  <p className="mt-1 text-xs text-red-500">{fieldError('subject')}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="mb-1.5 block text-xs font-semibold text-surface-600 dark:text-surface-400">
                  {messages.contact.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder={messages.contact.messagePlaceholder}
                  className={`${inputClasses('message')} resize-none`}
                />
                {fieldError('message') && (
                  <p className="mt-1 text-xs text-red-500">{fieldError('message')}</p>
                )}
              </div>

              {status === 'error' && (
                <div className="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {messages.contact.error}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-primary disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {messages.contact.sending}
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    {messages.contact.send}
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        <div className="space-y-4 lg:col-span-2">
          <div className="card">
            <h3 className="mb-4 text-sm font-bold text-surface-800 dark:text-surface-100">
              {messages.contact.also}
            </h3>
            <div className="space-y-3">
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-3 rounded-lg p-2 text-sm text-surface-600 transition-colors hover:bg-surface-50 hover:text-accent dark:text-surface-400 dark:hover:bg-surface-800 dark:hover:text-accent-light"
              >
                <Mail className="h-4 w-4" />
                {personalInfo.email}
              </a>
              <a
                href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-3 rounded-lg p-2 text-sm text-surface-600 transition-colors hover:bg-surface-50 hover:text-accent dark:text-surface-400 dark:hover:bg-surface-800 dark:hover:text-accent-light"
              >
                <Phone className="h-4 w-4" />
                {personalInfo.phone}
              </a>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-lg p-2 text-sm text-surface-600 transition-colors hover:bg-surface-50 hover:text-accent dark:text-surface-400 dark:hover:bg-surface-800 dark:hover:text-accent-light"
              >
                <Github className="h-4 w-4" />
                github.com/danielgarciaN
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-lg p-2 text-sm text-surface-600 transition-colors hover:bg-surface-50 hover:text-accent dark:text-surface-400 dark:hover:bg-surface-800 dark:hover:text-accent-light"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
            </div>
          </div>

          <div className="card bg-accent/5 dark:bg-accent/5">
            <p className="text-sm leading-relaxed text-surface-600 dark:text-surface-400">
              {messages.contact.location} <strong className="text-surface-800 dark:text-surface-200">{personalInfo.location}</strong>,
              {' '}{messages.contact.locationSuffix}
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
