'use client';

import Image from 'next/image';
import type { ComponentType } from 'react';
import { useState } from 'react';
import { Bot, CheckCircle2, Clock3, Layers3, User2 } from 'lucide-react';
import type { ProjectCategory, ProjectDossier, ProjectStatus } from '@/types';

const categoryLabels: Record<ProjectCategory, string> = {
  personal: 'Personal',
  universidad: 'Universidad',
  master: 'Master',
  'data-science': 'Data Science',
  backend: 'Backend',
  'web-app': 'Web/App',
};

const statusLabels: Record<ProjectStatus, string> = {
  terminado: 'Finalizado',
  en_proceso: 'En proceso',
  futuro: 'Futuro',
};

const statusIcons: Record<ProjectStatus, ComponentType<{ className?: string }>> = {
  terminado: CheckCircle2,
  en_proceso: Clock3,
  futuro: Layers3,
};

interface ProjectHeaderProps {
  project: ProjectDossier;
}

export default function ProjectHeader({ project }: ProjectHeaderProps) {
  const [coverFailed, setCoverFailed] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);
  const StatusIcon = statusIcons[project.status];
  const showCover = Boolean(project.coverImage) && !coverFailed;
  const showLogo = Boolean(project.logo) && !logoFailed;

  return (
    <header className="overflow-hidden rounded-2xl border border-surface-200 bg-white shadow-sm dark:border-surface-800 dark:bg-surface-900">
      {showCover && (
        <div className="relative aspect-[16/7] min-h-56 overflow-hidden border-b border-surface-200 bg-surface-100 dark:border-surface-800 dark:bg-surface-950">
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
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--project-primary)]/25 bg-[var(--project-soft)] px-3 py-1 text-xs font-bold text-[var(--project-primary)]">
                <Layers3 className="h-3.5 w-3.5" />
                {categoryLabels[project.category]}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-surface-200 bg-surface-50 px-3 py-1 text-xs font-bold text-surface-600 dark:border-surface-700 dark:bg-surface-800 dark:text-surface-300">
                <StatusIcon className="h-3.5 w-3.5 text-[var(--project-primary)]" />
                {statusLabels[project.status]}
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
                Dossier del proyecto
              </span>
            </div>
          </div>

          <div className="flex shrink-0 items-center justify-center">
            {showLogo ? (
              <div className="relative h-20 w-32 overflow-hidden rounded-xl border border-surface-200 bg-white p-3 dark:border-surface-800 dark:bg-surface-950">
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
            <span key={technology} className="rounded-lg bg-surface-100 px-2.5 py-1 text-xs font-semibold text-surface-600 dark:bg-surface-800 dark:text-surface-300">
              {technology}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
