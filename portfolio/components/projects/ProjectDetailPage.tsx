'use client';

import Image from 'next/image';
import type { CSSProperties } from 'react';
import { motion } from 'framer-motion';
import BackToProjectsButton from '@/components/projects/BackToProjectsButton';
import ProjectGallery from '@/components/projects/ProjectGallery';
import ProjectHeader from '@/components/projects/ProjectHeader';
import ProjectNote from '@/components/projects/ProjectNote';
import ProjectResourceList from '@/components/projects/ProjectResourceList';
import ProjectVideoSection from '@/components/projects/ProjectVideoSection';
import { useI18n } from '@/lib/i18n';
import type { ProjectDossier } from '@/types';

interface ProjectDetailPageProps {
  project: ProjectDossier;
}

export default function ProjectDetailPage({ project }: ProjectDetailPageProps) {
  const { locale, messages } = useI18n();
  const localizedProject =
    locale === 'en' && project.translations?.en
      ? {
          ...project,
          ...project.translations.en,
          colorTheme: project.colorTheme,
          technologies: project.technologies,
          resources: project.translations.en.resources ?? project.resources,
          gallery: project.translations.en.gallery ?? project.gallery,
          videos: project.videos,
          notes: project.translations.en.notes ?? project.notes,
          detailSections: project.translations.en.detailSections ?? project.detailSections,
        }
      : project;
  const projectTheme = {
    '--project-primary': '#B8966B',
    '--project-soft': 'rgba(184, 150, 107, 0.10)',
  } as CSSProperties;

  return (
    <main style={projectTheme} className="bg-[rgb(var(--color-page))] pt-24 [overflow-wrap:anywhere]">
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
          <ProjectHeader project={localizedProject} />

          <div className="mt-8 rounded-2xl border border-line/10 bg-[rgb(var(--color-card)/0.9)] p-6 shadow-[0_16px_45px_rgba(0,0,0,0.2)] sm:p-8">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--project-primary)]">
              {messages.projectDossier.overviewEyebrow}
            </span>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink">
              {messages.projectDossier.overviewTitle}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
              {localizedProject.description}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
              {localizedProject.longDescription}
            </p>
          </div>

          {localizedProject.detailSections && localizedProject.detailSections.length > 0 && (
            <div className="mt-8 space-y-6">
              {localizedProject.detailSections.map((section) => {
                const imageSection = section.image ??
                  (section.src
                    ? {
                        src: section.src,
                        alt: section.alt ?? section.title ?? 'Project detail image',
                        title: section.title,
                        description: section.description,
                      }
                    : undefined);

                return (
                <section
                  key={`${section.eyebrow ?? section.title ?? 'section'}-${section.title ?? 'detail'}`}
                  className="rounded-2xl border border-line/10 bg-[rgb(var(--color-card)/0.9)] p-6 shadow-sm sm:p-8"
                >
                  {section.eyebrow && (
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--project-primary)]">
                      {section.eyebrow}
                    </span>
                  )}
                  {section.title && (
                    <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink">
                      {section.title}
                    </h2>
                  )}

                  {section.body && (
                    <div className="mt-4 space-y-3">
                      {section.body.map((paragraph) => (
                        <p
                          key={paragraph}
                          className="text-sm leading-relaxed text-muted sm:text-base"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  )}

                  {section.steps && (
                    <div className="mt-5 flex flex-wrap items-center gap-2">
                      {section.steps.map((step, index) => (
                        <div key={step} className="flex items-center gap-2">
                          <span className="rounded-lg border border-[var(--project-primary)]/20 bg-[var(--project-soft)] px-3 py-1.5 text-xs font-bold text-[var(--project-primary)]">
                            {step}
                          </span>
                          {index < (section.steps?.length ?? 0) - 1 && (
                            <span className="text-xs font-bold text-muted">/</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {section.metrics && (
                    <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {section.metrics.map((metric) => (
                        <div
                          key={`${metric.label}-${metric.value}`}
                          className="rounded-xl border border-line/10 bg-surface-900/70 p-4"
                        >
                          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-subtle">
                            {metric.label}
                          </p>
                          <p className="mt-2 text-2xl font-bold tracking-tight text-[var(--project-primary)]">
                            {metric.value}
                          </p>
                          {metric.description && (
                            <p className="mt-1 text-xs leading-relaxed text-muted">
                              {metric.description}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {section.items && (
                    <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                      {section.items.map((item) => (
                        <li
                          key={item}
                          className="rounded-lg bg-surface-900 px-3 py-2 text-sm text-muted"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}

                  {imageSection && (
                    <div className="mt-6 overflow-hidden rounded-xl border border-line/10 bg-surface-900">
                      <div className="relative aspect-video">
                        <Image
                          src={imageSection.src}
                          alt={imageSection.alt}
                          fill
                          sizes="(min-width: 1024px) 896px, 100vw"
                          className="object-contain"
                        />
                      </div>
                      {(imageSection.title || imageSection.description) && (
                        <div className="border-t border-line/10 p-4">
                          {imageSection.title && (
                            <h3 className="text-sm font-bold text-ink">
                              {imageSection.title}
                            </h3>
                          )}
                          {imageSection.description && (
                            <p className="mt-1 text-sm leading-relaxed text-muted">
                              {imageSection.description}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </section>
                );
              })}
            </div>
          )}

          <div className="mt-10 space-y-12">
            <ProjectResourceList resources={localizedProject.resources} />
            <ProjectVideoSection videos={localizedProject.videos} />
            <ProjectGallery images={localizedProject.gallery} />
            <ProjectNote notes={localizedProject.notes} />
          </div>

          <div className="mt-10">
            <BackToProjectsButton />
          </div>
        </div>
      </motion.div>
    </main>
  );
}
