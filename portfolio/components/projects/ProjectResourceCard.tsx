'use client';

import type { ComponentType } from 'react';
import {
  Code2,
  Download,
  ExternalLink,
  FileArchive,
  FileCode2,
  FileSpreadsheet,
  FileText,
  Link as LinkIcon,
  MonitorPlay,
  Presentation,
  Workflow,
} from 'lucide-react';
import type { ProjectResource, ProjectResourceType } from '@/types';

const resourceIcons: Record<ProjectResourceType, ComponentType<{ className?: string }>> = {
  pdf: FileText,
  video: MonitorPlay,
  presentation: Presentation,
  excel: FileSpreadsheet,
  code: FileCode2,
  demo: MonitorPlay,
  memory: FileArchive,
  diagram: Workflow,
  external: LinkIcon,
};

const resourceLabels: Record<ProjectResourceType, string> = {
  pdf: 'PDF',
  video: 'Video',
  presentation: 'Presentacion',
  excel: 'Excel',
  code: 'Codigo',
  demo: 'Demo',
  memory: 'Memoria',
  diagram: 'Diagrama',
  external: 'Enlace',
};

interface ProjectResourceCardProps {
  resource: ProjectResource;
}

export default function ProjectResourceCard({ resource }: ProjectResourceCardProps) {
  const Icon = resourceIcons[resource.type] ?? FileText;
  const isAvailable = resource.available !== false && Boolean(resource.url);
  const isExternal = resource.action === 'external' || resource.type === 'external' || resource.url?.startsWith('http');
  const actionLabel =
    resource.action === 'download' ? 'Descargar' : resource.action === 'external' ? 'Abrir' : 'Ver';

  return (
    <article className="flex h-full flex-col rounded-xl border border-surface-200 bg-white p-5 shadow-sm transition-all duration-200 hover:border-[var(--project-primary)]/45 hover:shadow-md dark:border-surface-800 dark:bg-surface-900">
      <div className="flex items-start gap-4">
        <div className="rounded-xl bg-[var(--project-soft)] p-3 text-[var(--project-primary)]">
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-sm font-bold text-surface-800 dark:text-surface-100">{resource.title}</h3>
            <span className="rounded-full border border-[var(--project-primary)]/25 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--project-primary)]">
              {resourceLabels[resource.type]}
            </span>
          </div>
          {resource.description && (
            <p className="mt-2 text-sm leading-relaxed text-surface-500 dark:text-surface-400">
              {resource.description}
            </p>
          )}
        </div>
      </div>

      <div className="mt-5 flex flex-1 items-end">
        {isAvailable ? (
          <a
            href={resource.url}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            download={resource.action === 'download' ? true : undefined}
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--project-primary)] px-3.5 py-2 text-xs font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[var(--project-primary)]"
          >
            {resource.action === 'download' ? <Download className="h-3.5 w-3.5" /> : <ExternalLink className="h-3.5 w-3.5" />}
            {actionLabel}
          </a>
        ) : (
          <span className="inline-flex items-center gap-2 rounded-lg border border-surface-200 px-3.5 py-2 text-xs font-bold text-surface-400 dark:border-surface-700 dark:text-surface-500">
            <Code2 className="h-3.5 w-3.5" />
            No disponible
          </span>
        )}
      </div>
    </article>
  );
}
