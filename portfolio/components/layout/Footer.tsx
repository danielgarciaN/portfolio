'use client';

import { Github, Linkedin, Mail } from 'lucide-react';
import { personalInfo } from '@/lib/data';
import { useI18n } from '@/lib/i18n';

export default function Footer() {
  const { messages } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line/10">
      <div className="section-container flex flex-col items-center gap-6 py-10 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-2 text-sm text-muted">
          <span>&copy; {year} {personalInfo.name}</span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg p-2 text-subtle transition-colors hover:bg-surface-900 hover:text-ink"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg p-2 text-subtle transition-colors hover:bg-surface-900 hover:text-ink"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className="rounded-lg p-2 text-subtle transition-colors hover:bg-surface-900 hover:text-ink"
            aria-label="Email"
          >
            <Mail className="h-4 w-4" />
          </a>
        </div>

        <p className="text-xs text-subtle">
          {messages.footer.madeWith}
        </p>
      </div>
    </footer>
  );
}
