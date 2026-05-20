import { supabase } from './supabase';
import type { Project, ProjectCategory } from '@/types';
import { fallbackProjects } from '@/lib/data';

function mergeWithFallbackProjects(projects: Project[]) {
  const projectSlugs = new Set(projects.map((project) => project.slug));
  const missingFallbackProjects = fallbackProjects.filter((project) => !projectSlugs.has(project.slug));

  return [...projects, ...missingFallbackProjects].sort((a, b) => {
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

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;
    if (error) throw error;
    const projects = mergeWithFallbackProjects((data as Project[]) ?? fallbackProjects);
    return category ? projects.filter((project) => project.category === category) : projects;
  } catch {
    return fallbackProjects;
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
    return data as Project;
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
