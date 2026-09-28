import type { Project } from '@/types';

export const PROJECT_PREVIEW_LIMIT = 6;

export function getOrderedFeaturedProjects(projects: Project[]) {
  return projects.filter((project) => project.featured)
    .sort((a, b) => (a.featuredOrder ?? Infinity) - (b.featuredOrder ?? Infinity));
}

// Receive the complete category/search result, never a pre-limited catalog.
export function getProjectSelection(projects: Project[], featuredFirst: boolean, expanded: boolean) {
  const preview = featuredFirst
    ? getOrderedFeaturedProjects(projects).slice(0, PROJECT_PREVIEW_LIMIT)
    : projects.slice(0, PROJECT_PREVIEW_LIMIT);
  const previewSlugs = new Set(preview.map((project) => project.slug));
  return {
    visible: expanded
      ? [...preview, ...projects.filter((project) => !previewSlugs.has(project.slug))]
      : preview,
    hasMore: projects.length > preview.length,
  };
}
