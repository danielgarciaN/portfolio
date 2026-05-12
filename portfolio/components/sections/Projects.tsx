'use client';

import { useMemo, useState } from 'react';
import Section from '@/components/ui/Section';
import ProjectCard from '@/components/ui/ProjectCard';
import { fallbackProjects } from '@/lib/data';
import { useI18n } from '@/lib/i18n';
import { Search } from 'lucide-react';
import type { Project, ProjectCategory } from '@/types';

interface ProjectsProps {
  projects?: Project[];
}

const categories: (ProjectCategory | 'all')[] = [
  'all',
  'data-science',
  'web-app',
  'backend',
  'universidad',
  'master',
  'personal',
];

export default function Projects({ projects }: ProjectsProps) {
  const { messages } = useI18n();
  const allProjects = projects ?? fallbackProjects;
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | 'all'>('all');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return allProjects.filter((project) => {
      const matchesCategory = activeCategory === 'all' || project.category === activeCategory;
      const query = search.toLowerCase();
      const translatedProject = messages.projects.items[project.slug as keyof typeof messages.projects.items];
      const matchesSearch =
        !query ||
        (translatedProject?.title ?? project.title).toLowerCase().includes(query) ||
        (translatedProject?.description ?? project.description).toLowerCase().includes(query) ||
        project.technologies.some((technology) => technology.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [allProjects, activeCategory, search, messages]);

  return (
    <Section id="proyectos">
      <span className="heading-section">{messages.projects.eyebrow}</span>
      <h2 className="heading-lg mt-3 mb-4">{messages.projects.title}</h2>
      <p className="mb-8 max-w-2xl text-sm leading-relaxed text-surface-500 dark:text-surface-400">
        {messages.projects.intro}
      </p>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 ${
                activeCategory === category
                  ? 'bg-accent text-white shadow-sm shadow-accent/25 dark:text-surface-950'
                  : 'bg-surface-100 text-surface-600 hover:bg-surface-200 dark:bg-surface-800 dark:text-surface-400 dark:hover:bg-surface-700'
              }`}
            >
              {messages.projects.categories[category]}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-surface-400" />
          <input
            type="text"
            placeholder={messages.projects.search}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full rounded-lg border border-surface-200 bg-[rgb(var(--color-card)/0.92)] py-2 pl-9 pr-4 text-sm text-surface-700 placeholder:text-surface-400 focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/20 dark:border-surface-700 dark:bg-surface-900 dark:text-surface-200 dark:placeholder:text-surface-500 sm:w-64"
          />
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-sm text-surface-500">
            {messages.projects.noResults}
          </p>
          <button
            onClick={() => {
              setActiveCategory('all');
              setSearch('');
            }}
            className="mt-3 text-sm font-semibold text-accent hover:underline"
          >
            {messages.projects.clearFilters}
          </button>
        </div>
      )}
    </Section>
  );
}
