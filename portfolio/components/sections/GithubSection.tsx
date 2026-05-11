'use client';

import Section from '@/components/ui/Section';
import { ArrowUpRight, GitFork, Github, Star } from 'lucide-react';
import { personalInfo } from '@/lib/data';
import { useI18n } from '@/lib/i18n';

const repos = [
  {
    name: 'lol-win-prediction',
    language: 'Jupyter Notebook',
    stars: 1,
    url: 'https://github.com/danielgarciaN/lol-win-prediction',
  },
  {
    name: 'futbol-data',
    language: 'Python',
    stars: 0,
    url: 'https://github.com/danielgarciaN/futbol-data',
  },
  {
    name: 'find-it',
    language: 'TypeScript',
    stars: 0,
    url: 'https://github.com/danielgarciaN/find-it',
  },
  {
    name: 'tofu-awards',
    language: 'JavaScript',
    stars: 0,
    url: 'https://github.com/danielgarciaN/tofu-awards',
  },
];

const langColors: Record<string, string> = {
  Python: 'bg-yellow-400',
  TypeScript: 'bg-sky-500',
  JavaScript: 'bg-yellow-300',
  'Jupyter Notebook': 'bg-orange-400',
};

export default function GithubSection() {
  const { messages } = useI18n();

  return (
    <Section id="github">
      <span className="heading-section">{messages.github.eyebrow}</span>
      <h2 className="heading-lg mt-3 mb-4">{messages.github.title}</h2>
      <p className="mb-8 max-w-xl text-sm text-surface-500 dark:text-surface-400">
        {messages.github.intro}
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {repos.map((repo) => (
          <a
            key={repo.name}
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="card card-hover group flex flex-col justify-between"
          >
            <div>
              <div className="mb-2 flex items-center gap-2">
                <Github className="h-4 w-4 text-surface-400" />
                <span className="font-mono text-sm font-semibold text-surface-800 group-hover:text-accent dark:text-surface-100 dark:group-hover:text-accent-light">
                  {repo.name}
                </span>
                <ArrowUpRight className="ml-auto h-3.5 w-3.5 text-surface-300 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent dark:text-surface-600" />
              </div>
              <p className="text-sm text-surface-500 dark:text-surface-400">
                {messages.github.repos[repo.name as keyof typeof messages.github.repos]}
              </p>
            </div>
            <div className="mt-4 flex items-center gap-4 text-xs text-surface-400">
              {repo.language && (
                <span className="flex items-center gap-1.5">
                  <span className={`h-2.5 w-2.5 rounded-full ${langColors[repo.language] ?? 'bg-surface-400'}`} />
                  {repo.language}
                </span>
              )}
              {repo.stars > 0 && (
                <span className="flex items-center gap-1">
                  <Star className="h-3 w-3" />
                  {repo.stars}
                </span>
              )}
              <span className="flex items-center gap-1">
                <GitFork className="h-3 w-3" />
                GitHub
              </span>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-6 text-center">
        <a
          href={personalInfo.github}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary inline-flex"
        >
          <Github className="h-4 w-4" />
          {messages.github.more}
        </a>
      </div>
    </Section>
  );
}
