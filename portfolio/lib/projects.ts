import { supabase } from './supabase';
import type { Project, ProjectCategory } from '@/types';
import { fallbackProjects } from '@/lib/data';

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
  return {
    ...project,
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
    if (!supabase) return fallbackProjects;

    let query = supabase
      .from('projects')
      .select('*')
      .order('featured', { ascending: false })
      .order('created_at', { ascending: false });

    const { data, error } = await query;
    if (error) throw error;
    const projects = mergeWithFallbackProjects((data as Project[]) ?? fallbackProjects);
    return category ? projects.filter((project) => project.categories.includes(category)) : projects;
  } catch {
    return category ? fallbackProjects.filter((project) => project.categories.includes(category)) : fallbackProjects;
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
  try {
    if (!supabase) return fallbackProjects.filter((p) => p.featured);

    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('featured', true)
      .order('created_at', { ascending: false })
      .limit(4);

    if (error) throw error;
    return mergeWithFallbackProjects((data as Project[]) ?? []).filter((p) => p.featured).slice(0, 4);
  } catch {
    return fallbackProjects.filter((p) => p.featured);
  }
}
