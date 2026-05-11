import { supabase } from './supabase';
import type { Project, ProjectCategory } from '@/types';
import { fallbackProjects } from '@/lib/data';

export async function getProjects(category?: ProjectCategory): Promise<Project[]> {
  try {
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
    return (data as Project[]) ?? fallbackProjects;
  } catch {
    return fallbackProjects;
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
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
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('featured', true)
      .order('created_at', { ascending: false })
      .limit(4);

    if (error) throw error;
    return (data as Project[]) ?? fallbackProjects.filter((p) => p.featured);
  } catch {
    return fallbackProjects.filter((p) => p.featured);
  }
}
