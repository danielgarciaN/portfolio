'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

export default function BackToProjectsButton() {
  const { messages } = useI18n();

  return (
    <Link
      href="/projects"
      className="inline-flex items-center gap-2 rounded-xl border border-line/10 bg-[rgb(var(--color-card)/0.92)] px-4 py-2 text-sm font-semibold text-ink transition-all duration-200 hover:border-[var(--project-primary)] hover:bg-[var(--project-soft)] hover:text-[var(--project-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--project-primary)]/40"
    >
      <ArrowLeft className="h-4 w-4" />
      {messages.projectDossier.backToProjects}
    </Link>
  );
}
