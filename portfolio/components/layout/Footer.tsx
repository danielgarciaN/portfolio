'use client';

import { Github, Linkedin, Mail, Terminal } from 'lucide-react';
import { personalInfo } from '@/lib/data';
import { useI18n } from '@/lib/i18n';

export default function Footer() {
  const { messages } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-surface-200/60 dark:border-surface-800/60">
      <div className="section-container flex flex-col items-center gap-6 py-10 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-2 font-mono text-sm text-surface-500">
          <Terminal className="h-3.5 w-3.5 text-accent" />
          <span>&copy; {year} {personalInfo.name}</span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg p-2 text-surface-400 transition-colors hover:bg-surface-100 hover:text-surface-700 dark:hover:bg-surface-800 dark:hover:text-surface-300"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg p-2 text-surface-400 transition-colors hover:bg-surface-100 hover:text-surface-700 dark:hover:bg-surface-800 dark:hover:text-surface-300"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className="rounded-lg p-2 text-surface-400 transition-colors hover:bg-surface-100 hover:text-surface-700 dark:hover:bg-surface-800 dark:hover:text-surface-300"
            aria-label="Email"
          >
            <Mail className="h-4 w-4" />
          </a>
        </div>

        <p className="text-xs text-surface-400">
          {messages.footer.madeWith}
        </p>
      </div>
    </footer>
  );
}
