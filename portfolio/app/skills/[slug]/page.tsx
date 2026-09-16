import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SkillsDetail from '@/components/sections/SkillsDetail';
import { projectDossiers } from '@/data/projects';
import es from '@/messages/es.json';

export function generateStaticParams() {
  return es.skills.categories.map((category) => ({ slug: category.id }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const category = es.skills.categories.find((item) => item.id === params.slug);
  return { title: category?.name ?? 'Skills', description: category?.desc };
}

export default function SkillCategoryPage({ params }: { params: { slug: string } }) {
  if (!es.skills.categories.some((category) => category.id === params.slug)) notFound();
  const projects = projectDossiers.map(({ slug, title, technologies }) => ({ slug, title, technologies }));
  return <SkillsDetail categoryId={params.slug} projects={projects} />;
}
