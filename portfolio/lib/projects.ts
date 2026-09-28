import { supabase } from './supabase';
import type { Project, ProjectCategory } from '@/types';
import { fallbackProjects } from '@/lib/data';
import { getOrderedFeaturedProjects } from '@/lib/project-list';

const legacyCategoryMap: Record<string, ProjectCategory> = {
  personal: 'data-analytics',
  'business-intelligence': 'data-analytics',
  universidad: 'universidad',
  master: 'master',
  'data-science': 'data-science',
  backend: 'backend',
  'web-app': 'web-app',
  'data-analytics': 'data-analytics',
};

function normalizeCategories(project: Project) {
  const rawCategories = project.categories ?? (project.category ? [project.category] : []);
  return Array.from(
    new Set(
      rawCategories
        .map((category) => legacyCategoryMap[category])
        .filter(Boolean),
    ),
  );
}

function normalizeProject(project: Project): Project {
  const localProject = fallbackProjects.find((item) => item.slug === project.slug);
  return {
    ...project,
    featured: localProject?.featured ?? project.featured,
    featuredOrder: localProject ? localProject.featuredOrder : project.featuredOrder,
    image_url: localProject?.image_url?.endsWith('-cover.jpg') ? localProject.image_url : project.image_url,
    categories: normalizeCategories(project),
    // This completed project may still have an older status in Supabase.
    status: project.slug === 'expected-goals-xg-statsbomb' ? 'terminado' : project.status,
  };
}

function mergeWithFallbackProjects(projects: Project[]) {
  const normalizedProjects = projects.map(normalizeProject);
  const projectSlugs = new Set(normalizedProjects.map((project) => project.slug));
  const missingFallbackProjects = fallbackProjects.filter((project) => !projectSlugs.has(project.slug));

  return [...normalizedProjects, ...missingFallbackProjects].sort((a, b) => {
    if (a.featured !== b.featured) return Number(b.featured) - Number(a.featured);
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });
}

export async function getProjects(category?: ProjectCategory): Promise<Project[]> {
  try {
    if (!supabase) return category
      ? fallbackProjects.filter((project) => (project.categories ?? (project.category ? [project.category] : [])).includes(category))
      : fallbackProjects;

    let query = supabase
      .from('projects')
      .select('*')
      .order('featured', { ascending: false })
      .order('created_at', { ascending: false });

    const { data, error } = await query;
    if (error) throw error;
    const projects = mergeWithFallbackProjects((data as Project[]) ?? fallbackProjects);
    return category
      ? projects.filter((project) => (project.categories ?? (project.category ? [project.category] : [])).includes(category))
      : projects;
  } catch {
    return category
      ? fallbackProjects.filter((project) => (project.categories ?? (project.category ? [project.category] : [])).includes(category))
      : fallbackProjects;
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    if (!supabase) {
      return fallbackProjects.find((p) => p.slug === slug) ?? null;
    }

    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) throw error;
    return normalizeProject(data as Project);
  } catch {
    return fallbackProjects.find((p) => p.slug === slug) ?? null;
  }
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return getOrderedFeaturedProjects(await getProjects());
}
