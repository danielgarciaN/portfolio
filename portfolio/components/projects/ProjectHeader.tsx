'use client';

import Image from 'next/image';
import type { ComponentType } from 'react';
import { useState } from 'react';
import { Bot, CheckCircle2, Clock3, Layers3, User2 } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import type { ProjectDossier, ProjectStatus } from '@/types';

const statusIcons: Record<ProjectStatus, ComponentType<{ className?: string }>> = {
  terminado: CheckCircle2,
  en_proceso: Clock3,
  futuro: Layers3,
};

const statusStyles: Record<ProjectStatus, string> = {
  terminado: 'badge-completed',
  en_proceso: 'badge-progress',
  futuro: 'badge-future',
};

interface ProjectHeaderProps {
  project: ProjectDossier;
}

export default function ProjectHeader({ project }: ProjectHeaderProps) {
  const { messages } = useI18n();
  const [coverFailed, setCoverFailed] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);
  const StatusIcon = statusIcons[project.status];
  const showCover = Boolean(project.coverImage) && !coverFailed;
  const showLogo = Boolean(project.logo) && !logoFailed;
  const categories = project.categories ?? (project.category ? [project.category] : []);

  return (
    <header className="overflow-hidden rounded-2xl border border-surface-200 bg-[rgb(var(--color-card)/0.92)] shadow-[0_18px_55px_rgba(0,124,145,0.1)] dark:border-white/15 dark:bg-surface-900">
      {showCover && (
        <div className="relative aspect-[16/7] min-h-56 overflow-hidden border-b border-surface-200 bg-surface-100 dark:border-white/15 dark:bg-surface-950">
          <Image
            src={project.coverImage as string}
            alt={project.title}
            fill
            priority
            sizes="(min-width: 1024px) 960px, 100vw"
            className="object-cover"
            onError={() => setCoverFailed(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-950/55 via-transparent to-transparent" />
        </div>
      )}

      <div className="p-6 sm:p-8 lg:p-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="max-w-3xl">
            <div className="mb-5 flex flex-wrap gap-2">
              {categories.map((category) => (
                <span
                  key={category}
                  className="status-badge badge-category"
                >
                  <Layers3 className="h-3.5 w-3.5" />
                  {messages.projects.categories[category] ?? category}
                </span>
              ))}
              <span className={`status-badge ${statusStyles[project.status]}`}>
                <StatusIcon className="h-3.5 w-3.5" />
                {messages.projects.statuses[project.status]}
              </span>
            </div>

            <h1 className="text-3xl font-semibold tracking-tight text-surface-950 dark:text-white sm:text-4xl">
              {project.title}
            </h1>
            <p className="mt-3 text-base leading-relaxed text-surface-500 dark:text-surface-400 sm:text-lg">
              {project.subtitle}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-surface-500 dark:text-surface-400">
              <span className="inline-flex items-center gap-2">
                <User2 className="h-4 w-4 text-[var(--project-primary)]" />
                {project.author}
              </span>
              <span className="inline-flex items-center gap-2">
                <Bot className="h-4 w-4 text-[var(--project-primary)]" />
                {messages.projectDossier.headerLabel}
              </span>
            </div>
          </div>

          <div className="flex shrink-0 items-center justify-center">
            {showLogo ? (
              <div className="relative h-20 w-32 overflow-hidden rounded-xl border border-surface-200 bg-[rgb(var(--color-card))] p-3 dark:border-white/15 dark:bg-surface-950">
                <Image
                  src={project.logo as string}
                  alt={`${project.title} logo`}
                  fill
                  sizes="128px"
                  className="object-contain p-3"
                  onError={() => setLogoFailed(true)}
                />
              </div>
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[var(--project-soft)] text-[var(--project-primary)]">
                <Bot className="h-9 w-9" />
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <span key={technology} className="rounded-lg bg-surface-100 px-2.5 py-1 text-xs font-semibold text-surface-600 dark:bg-white/10 dark:text-slate-200">
              {technology}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
