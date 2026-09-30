import type { Project } from '@/types';

export const PROJECT_PREVIEW_LIMIT = 6;
export const FEATURED_PREVIEW_LIMIT = 6;

export function getOrderedFeaturedProjects(projects: Project[]) {
  return projects.filter((project) => project.featured)
    .sort((a, b) => (a.featuredOrder ?? Infinity) - (b.featuredOrder ?? Infinity));
}

// Receive the complete category/search result, never a pre-limited catalog.
export function getProjectSelection(projects: Project[], featuredFirst: boolean, expanded: boolean) {
  const featured = featuredFirst ? getOrderedFeaturedProjects(projects) : [];
  const preview = featuredFirst
    ? featured.slice(0, FEATURED_PREVIEW_LIMIT)
    : projects.slice(0, PROJECT_PREVIEW_LIMIT);
  const leading = featuredFirst ? featured : preview;
  const leadingSlugs = new Set(leading.map((project) => project.slug));
  return {
    visible: expanded
      ? [...leading, ...projects.filter((project) => !leadingSlugs.has(project.slug))]
      : preview,
    hasMore: projects.length > preview.length,
  };
}
