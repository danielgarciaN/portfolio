'use client';

import type { CSSProperties } from 'react';
import { motion } from 'framer-motion';
import BackToProjectsButton from '@/components/projects/BackToProjectsButton';
import ProjectGallery from '@/components/projects/ProjectGallery';
import ProjectHeader from '@/components/projects/ProjectHeader';
import ProjectNote from '@/components/projects/ProjectNote';
import ProjectResourceList from '@/components/projects/ProjectResourceList';
import ProjectVideoSection from '@/components/projects/ProjectVideoSection';
import type { ProjectDossier } from '@/types';

interface ProjectDetailPageProps {
  project: ProjectDossier;
}

export default function ProjectDetailPage({ project }: ProjectDetailPageProps) {
  const projectTheme = {
    '--project-primary': project.colorTheme.primary,
    '--project-soft': project.colorTheme.soft,
  } as CSSProperties;

  return (
    <main style={projectTheme} className="bg-[rgb(var(--color-page))] pt-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="section-container pb-20"
      >
        <div className="mb-6">
          <BackToProjectsButton />
        </div>

        <div className="mx-auto max-w-5xl">
          <ProjectHeader project={project} />

          <div className="mt-8 rounded-2xl border border-surface-200 bg-[rgb(var(--color-card)/0.9)] p-6 shadow-[0_16px_45px_rgba(35,78,112,0.08)] dark:border-surface-800 dark:bg-surface-900 sm:p-8">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--project-primary)]">
              Descripcion
            </span>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-surface-900 dark:text-surface-50">
              Que es y que resuelve
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-surface-500 dark:text-surface-400 sm:text-base">
              {project.description}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-surface-600 dark:text-surface-300 sm:text-base">
              {project.longDescription}
            </p>
          </div>

          <div className="mt-10 space-y-12">
            <ProjectResourceList resources={project.resources} />
            <ProjectVideoSection videos={project.videos} />
            <ProjectGallery images={project.gallery} />
            <ProjectNote notes={project.notes} />
          </div>

          <div className="mt-10">
            <BackToProjectsButton />
          </div>
        </div>
      </motion.div>
    </main>
  );
}
