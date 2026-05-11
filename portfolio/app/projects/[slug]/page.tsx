import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProjectDetailPage from '@/components/projects/ProjectDetailPage';
import { getProjectDossierBySlug, projectDossiers } from '@/data/projects';

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return projectDossiers.map((project) => ({
    slug: project.slug,
  }));
}

export function generateMetadata({ params }: ProjectPageProps): Metadata {
  const project = getProjectDossierBySlug(params.slug);

  if (!project) {
    return {
      title: 'Proyecto no encontrado',
    };
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: `${project.title} | Daniel Garcia Nilo`,
      description: project.description,
      images: project.coverImage ? [project.coverImage] : undefined,
    },
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = getProjectDossierBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailPage project={project} />;
}
