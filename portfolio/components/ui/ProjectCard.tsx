'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink, FileText, Github, ImageIcon } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import type { Project, ProjectCategory } from '@/types';

const statusConfig: Record<string, { label: string; color: string }> = {
  terminado: {
    label: 'Terminado',
    color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  },
  en_proceso: {
    label: 'En proceso',
    color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  },
  futuro: {
    label: 'Futuro',
    color: 'bg-surface-100 text-surface-500 dark:bg-surface-800 dark:text-surface-400',
  },
};

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const { messages } = useI18n();
  const status = statusConfig[project.status] ?? statusConfig.terminado;
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = Boolean(project.image_url) && !imageFailed;
  const translatedProject = messages.projects.items[project.slug as keyof typeof messages.projects.items];
  const title = translatedProject?.title ?? project.title;
  const description = translatedProject?.description ?? project.description;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="card card-hover group relative flex flex-col"
    >
      <Link
        href={`/projects/${project.slug}`}
        className="absolute inset-0 z-10 rounded-2xl"
        aria-label={`Abrir dossier del proyecto: ${title}`}
      />

      <div className="relative mb-4 aspect-video overflow-hidden rounded-lg border border-surface-200/70 bg-surface-100 dark:border-surface-800/70 dark:bg-surface-900">
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
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-surface-50 via-white to-accent/10 text-center dark:from-surface-900 dark:via-surface-900 dark:to-accent/10">
            <div className="rounded-full border border-accent/20 bg-white/70 p-3 text-accent shadow-sm dark:bg-surface-900/70">
              <ImageIcon className="h-5 w-5" />
            </div>
            <span className="px-6 font-mono text-xs text-surface-400">
              /images/projects/{project.slug}.jpg
            </span>
          </div>
        )}

        <div className="absolute left-3 top-3">
          <span className="status-badge bg-white/90 text-surface-600 shadow-sm backdrop-blur dark:bg-surface-950/80 dark:text-surface-300">
            {messages.projects.categories[project.category as ProjectCategory]}
          </span>
        </div>
        <div className="absolute right-3 top-3">
          <span className={`status-badge ${status.color}`}>{messages.projects.statuses[project.status]}</span>
        </div>

        <div className="absolute inset-0 flex items-center justify-center gap-3 bg-surface-950/0 opacity-0 transition-all duration-300 group-hover:bg-surface-950/55 group-hover:opacity-100">
          <Link
            href={`/projects/${project.slug}`}
            className="relative z-20 rounded-full bg-white p-2.5 text-surface-800 shadow-lg transition-transform hover:scale-110"
            aria-label={`Abrir dossier: ${title}`}
          >
            <FileText className="h-4 w-4" />
          </Link>
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-20 rounded-full bg-white p-2.5 text-surface-800 shadow-lg transition-transform hover:scale-110"
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
              className="relative z-20 rounded-full bg-accent p-2.5 text-white shadow-lg transition-transform hover:scale-110 dark:text-surface-950"
              aria-label={`${messages.projects.actions.demo}: ${title}`}
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="text-base font-bold text-surface-800 dark:text-surface-100">
            {title}
          </h3>
          <Link
            href={`/projects/${project.slug}`}
            className="relative z-20 shrink-0 text-surface-400 transition-colors hover:text-accent"
            aria-label={`Abrir dossier del proyecto: ${title}`}
          >
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <p className="mb-4 flex-1 text-sm leading-relaxed text-surface-500 dark:text-surface-400">
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
      </div>
    </motion.article>
  );
}
