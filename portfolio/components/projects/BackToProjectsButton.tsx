'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function BackToProjectsButton() {
  return (
    <Link
      href="/projects"
      className="inline-flex items-center gap-2 rounded-xl border border-surface-200 bg-[rgb(var(--color-card)/0.92)] px-4 py-2 text-sm font-semibold text-surface-700 transition-all duration-200 hover:border-[var(--project-primary)] hover:bg-[var(--project-soft)] hover:text-[var(--project-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--project-primary)]/40 dark:border-surface-700 dark:bg-surface-900 dark:text-surface-300"
    >
      <ArrowLeft className="h-4 w-4" />
      Volver a proyectos
    </Link>
  );
}
