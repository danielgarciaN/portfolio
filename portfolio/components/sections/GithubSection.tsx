'use client';

import Link from 'next/link';
import Section from '@/components/ui/Section';
import { ArrowUpRight, BarChart3, Github } from 'lucide-react';
import { fallbackProjects, personalInfo } from '@/lib/data';
import { useI18n } from '@/lib/i18n';

const featuredSlugs = [
  'global-electronics-powerbi',
  'statistical-sales-analysis',
  'expected-goals-xg-statsbomb',
  'marketing-ia',
];

const projectAccent: Record<string, string> = {
  'global-electronics-powerbi': 'Power BI',
  'statistical-sales-analysis': 'Statistics',
  'expected-goals-xg-statsbomb': 'Football Analytics',
  'marketing-ia': 'AI + Analytics',
};

export default function GithubSection() {
  const { messages } = useI18n();
  const featuredProjects = featuredSlugs
    .map((slug) => fallbackProjects.find((project) => project.slug === slug))
    .filter((project): project is (typeof fallbackProjects)[number] => Boolean(project));

  return (
    <Section id="github" className="section-white">
      <span className="heading-section">{messages.github.eyebrow}</span>
      <h2 className="heading-lg mt-3 mb-4">
        {messages.github.title}{' '}
        <span className="text-accent-ink">{messages.github.titleAccent}</span>
      </h2>
      <p className="mb-8 max-w-xl text-sm text-muted">
        {messages.github.intro}
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {featuredProjects.map((project) => (
          <article key={project.slug} className="card card-hover group relative flex flex-col justify-between">
            <Link
              href={`/projects/${project.slug}`}
              className="absolute inset-0 z-10 rounded-2xl"
              aria-label={`Abrir proyecto destacado: ${project.title}`}
            />
            <div>
              <div className="mb-2 flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-accent-ink" />
                <span className="text-sm font-semibold text-ink group-hover:text-accent-ink">
                  {project.title}
                </span>
                <ArrowUpRight className="ml-auto h-3.5 w-3.5 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-ink" />
              </div>
              <p className="text-sm text-muted">
                {messages.github.repos[project.slug as keyof typeof messages.github.repos] ?? project.description}
              </p>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-subtle">
              <span className="rounded-full border border-accent/25 bg-accent/10 px-2.5 py-1 font-semibold text-accent-ink">
                {projectAccent[project.slug]}
              </span>
              {(project.categories ?? (project.category ? [project.category] : [])).slice(0, 2).map((category) => (
                <span
                  key={category}
                  className="rounded-full border border-line/10 px-2.5 py-1 font-semibold text-muted"
                >
                  {messages.projects.categories[category] ?? category}
                </span>
              ))}
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-20 ml-auto inline-flex items-center gap-1 rounded-full text-muted transition-colors hover:text-accent-ink"
                  aria-label={`${messages.projects.actions.github}: ${project.title}`}
                >
                  <Github className="h-3.5 w-3.5" />
                  GitHub
                </a>
              )}
            </div>
          </article>
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
