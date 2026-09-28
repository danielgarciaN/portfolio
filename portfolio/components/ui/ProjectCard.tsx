'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ExternalLink, FileText, Github, ImageIcon } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import type { Project, ProjectCategory } from '@/types';

const statusConfig: Record<string, string> = {
  terminado: 'badge-completed',
  en_proceso: 'badge-progress',
  futuro: 'badge-future',
};

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const { messages } = useI18n();
  const reduceMotion = useReducedMotion();
  const status = statusConfig[project.status] ?? statusConfig.terminado;
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = Boolean(project.image_url) && !imageFailed;
  const translatedProject = messages.projects.items[project.slug as keyof typeof messages.projects.items];
  const title = translatedProject?.title ?? project.title;
  const description = translatedProject?.description ?? project.description;
  const categories = project.categories ?? (project.category ? [project.category] : []);

  return (
    <motion.article
      initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.25, delay: reduceMotion ? 0 : Math.min(index, 5) * 0.04 }}
      className="card card-hover group relative flex flex-col overflow-hidden !p-0"
    >
      <Link
        href={`/projects/${project.slug}`}
        className="absolute inset-0 z-10 rounded-2xl"
        aria-label={`${messages.projects.actions.details}: ${title}`}
      />

      <div className="relative aspect-[16/10] overflow-hidden border-b border-line/10 bg-surface-900">
        {showImage ? (
          <Image
            src={project.image_url as string}
            alt={`${title}`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[rgb(var(--color-card))] text-center">
            <div className="rounded-full border border-accent/20 bg-[rgb(var(--color-card)/0.72)] p-3 text-accent-ink shadow-sm">
              <ImageIcon className="h-5 w-5" />
            </div>
            <span className="px-6 font-mono text-xs text-subtle">
              /images/projects/{project.slug}.jpg
            </span>
          </div>
        )}

        <div className="absolute inset-x-3 top-3 z-[1] grid grid-cols-[minmax(0,1fr)_auto] items-start gap-2">
          <div className="flex flex-wrap gap-1.5">
          {categories.map((category) => (
            <span
              key={category}
              className="status-badge badge-category"
            >
              {messages.projects.categories[category as ProjectCategory] ?? category}
            </span>
          ))}
          </div>
          <span className={`status-badge justify-self-end whitespace-nowrap ${status}`}>{messages.projects.statuses[project.status]}</span>
        </div>

        <div className="section-dark absolute inset-0 flex items-center justify-center gap-3 bg-surface-950/0 opacity-0 transition-all duration-300 group-hover:bg-surface-950/60 group-hover:opacity-100 group-focus-within:bg-surface-950/60 group-focus-within:opacity-100">
          <Link
            href={`/projects/${project.slug}`}
            className="relative z-20 rounded-full bg-[rgb(var(--color-card))] p-2.5 text-surface-800 shadow-lg transition-transform hover:scale-110 dark:bg-surface-50 dark:text-surface-950"
            aria-label={`Abrir dossier: ${title}`}
          >
            <FileText className="h-4 w-4" />
          </Link>
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-20 rounded-full bg-[rgb(var(--color-card))] p-2.5 text-surface-800 shadow-lg transition-transform hover:scale-110 dark:bg-surface-50 dark:text-surface-950"
              aria-label={`${messages.projects.actions.github}: ${title}`}
            >
              <Github className="h-4 w-4" />
            </a>
          )}
          {project.demo_url && (
            <a
              href={project.demo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-20 rounded-full border border-accent/60 bg-accent/90 p-2.5 text-surface-950 shadow-lg transition-all hover:scale-110 hover:bg-accent-light"
              aria-label={`${messages.projects.actions.demo}: ${title}`}
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="text-lg font-bold text-ink transition-colors group-hover:text-accent-ink">
            {title}
          </h3>
          <Link
            href={`/projects/${project.slug}`}
            className="relative z-20 shrink-0 text-subtle transition-colors hover:text-accent-ink"
            aria-label={`${messages.projects.actions.details}: ${title}`}
          >
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <p className="mb-4 flex-1 text-sm leading-relaxed text-muted">
          {description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 5).map((tech) => (
            <span key={tech} className="tech-badge text-[11px]">
              {tech}
            </span>
          ))}
          {project.technologies.length > 5 && (
            <span className="tech-badge text-[11px]">+{project.technologies.length - 5}</span>
          )}
        </div>
        <div className="mt-6 flex items-center justify-between gap-3 border-t border-accent/15 pt-4">
          <Link href={`/projects/${project.slug}`} className="relative z-20 inline-flex items-center gap-2 text-sm font-bold text-accent-ink">
            {messages.projects.actions.details}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
          {project.github_url && <a href={project.github_url} target="_blank" rel="noopener noreferrer" aria-label={`${messages.projects.actions.github}: ${title}`} className="relative z-20 rounded-lg p-2 text-muted transition-colors hover:bg-accent/10 hover:text-accent-ink"><Github className="h-4 w-4" /></a>}
        </div>
      </div>
    </motion.article>
  );
}
