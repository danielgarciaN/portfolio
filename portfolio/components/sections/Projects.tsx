'use client';

import { useId, useMemo, useRef, useState } from 'react';
import Section from '@/components/ui/Section';
import ProjectCard from '@/components/ui/ProjectCard';
import { fallbackProjects } from '@/lib/data';
import { useI18n } from '@/lib/i18n';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';
import { getProjectSelection } from '@/lib/project-list';
import type { Project, ProjectCategory } from '@/types';

interface ProjectsProps {
  projects?: Project[];
}

const categories: (ProjectCategory | 'all')[] = [
  'all',
  'data-analytics',
  'data-science',
  'master',
  'web-app',
  'backend',
  'universidad',
  'personal',
];

export default function Projects({ projects }: ProjectsProps) {
  const { messages } = useI18n();
  const allProjects = projects ?? fallbackProjects;
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | 'all'>('all');
  const [search, setSearch] = useState('');
  const [showAll, setShowAll] = useState(false);
  const gridId = useId();
  const filtersRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const filtered = useMemo(() => {
    return allProjects.filter((project) => {
      const projectCategories = project.categories ?? (project.category ? [project.category] : []);
      const matchesCategory = activeCategory === 'all' || projectCategories.includes(activeCategory);
      const query = search.trim().toLowerCase();
      const translatedProject = messages.projects.items[project.slug as keyof typeof messages.projects.items];
      const matchesSearch =
        !query ||
        (translatedProject?.title ?? project.title).toLowerCase().includes(query) ||
        (translatedProject?.description ?? project.description).toLowerCase().includes(query) ||
        project.technologies.some((technology) => technology.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [allProjects, activeCategory, search, messages]);

  const { visible, hasMore } = getProjectSelection(
    filtered, activeCategory === 'all' && !search.trim(), showAll,
  );

  function toggleExpanded() {
    if (showAll && filtersRef.current && filtersRef.current.getBoundingClientRect().top < 80) {
      filtersRef.current.scrollIntoView({ behavior: reduceMotion ? 'instant' : 'smooth', block: 'start' });
    }
    setShowAll((expanded) => !expanded);
  }

  return (
    <Section id="proyectos" className="section-soft">
      <span className="heading-section">{messages.projects.eyebrow}</span>
      <h2 className="heading-lg mt-3 mb-4">
        {messages.projects.title}{' '}
        <span className="text-accent-ink">{messages.projects.titleAccent}</span>
      </h2>
      <p className="mb-8 max-w-2xl text-sm leading-relaxed text-muted">
        {messages.projects.intro}
      </p>

      <div ref={filtersRef} className="mb-8 flex scroll-mt-24 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setShowAll(false);
              }}
              aria-pressed={activeCategory === category}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 ${
                activeCategory === category
                  ? 'border border-accent bg-accent text-surface-950 shadow-sm shadow-accent/25 '
                  : 'border border-line/10 bg-[rgb(var(--color-card)/0.76)] text-muted hover:-translate-y-0.5 hover:border-accent/35 hover:bg-accent/10 hover:text-accent-ink      '
              }`}
            >
              {messages.projects.categories[category]}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-subtle" />
          <input
            type="text"
            placeholder={messages.projects.search}
            aria-label={messages.projects.search}
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setShowAll(false);
            }}
            className="w-full rounded-lg border border-line/10 bg-[rgb(var(--color-card)/0.92)] py-2 pl-9 pr-4 text-sm text-ink placeholder:text-subtle focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/20 sm:w-64"
          />
        </div>
      </div>

      {filtered.length > 0 ? (
        <div id={gridId} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index % 6} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-sm text-muted">
            {messages.projects.noResults}
          </p>
          <button
            onClick={() => {
              setActiveCategory('all');
              setSearch('');
              setShowAll(false);
            }}
            className="mt-3 text-sm font-semibold text-accent-ink hover:underline"
          >
            {messages.projects.clearFilters}
          </button>
        </div>
      )}
      {hasMore && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            aria-expanded={showAll}
            aria-controls={gridId}
            onClick={toggleExpanded}
            className="btn-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            {showAll ? messages.projects.showLess : messages.projects.viewMore}
            {showAll ? <ChevronUp aria-hidden="true" className="h-4 w-4" /> : <ChevronDown aria-hidden="true" className="h-4 w-4" />}
          </button>
        </div>
      )}
    </Section>
  );
}
