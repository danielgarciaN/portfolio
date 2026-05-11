'use client';

import Link from 'next/link';
import { ArrowLeft, Terminal } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

export default function NotFound() {
  const { messages } = useI18n();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="mb-6 rounded-2xl bg-accent/10 p-4 text-accent">
        <Terminal className="h-8 w-8" />
      </div>
      <h1 className="mb-2 font-mono text-6xl font-bold tracking-tighter text-surface-800 dark:text-white">
        404
      </h1>
      <p className="mb-1 text-lg font-semibold text-surface-700 dark:text-surface-200">
        {messages.notFound.title}
      </p>
      <p className="mb-8 max-w-md text-sm text-surface-500 dark:text-surface-400">
        {messages.notFound.body}
      </p>
      <Link href="/" className="btn-primary">
        <ArrowLeft className="h-4 w-4" />
        {messages.notFound.back}
      </Link>
    </div>
  );
}
