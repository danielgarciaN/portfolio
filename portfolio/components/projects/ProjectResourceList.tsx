import ProjectResourceCard from '@/components/projects/ProjectResourceCard';
import type { ProjectResource } from '@/types';

interface ProjectResourceListProps {
  resources: ProjectResource[];
}

export default function ProjectResourceList({ resources }: ProjectResourceListProps) {
  const visibleResources = resources.filter(
    (resource) => resource.available !== false && Boolean(resource.url),
  );

  if (visibleResources.length === 0) return null;

  return (
    <section>
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--project-primary)]">
            Indice
          </span>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-surface-900 dark:text-surface-50">
            Recursos del proyecto
          </h2>
        </div>
        <p className="max-w-md text-sm leading-relaxed text-surface-500 dark:text-surface-400">
          Documentos, pruebas, diagramas y enlaces organizados como dossier consultable.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {visibleResources.map((resource) => (
          <ProjectResourceCard key={`${resource.type}-${resource.title}`} resource={resource} />
        ))}
      </div>
    </section>
  );
}
