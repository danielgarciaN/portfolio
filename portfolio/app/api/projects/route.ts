import { NextRequest, NextResponse } from 'next/server';
import { getProjects } from '@/lib/projects';
import type { ProjectCategory } from '@/types';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') as ProjectCategory | null;

  try {
    const projects = await getProjects(category ?? undefined);
    return NextResponse.json(projects);
  } catch {
    return NextResponse.json(
      { error: 'Error al obtener proyectos.' },
      { status: 500 }
    );
  }
}
