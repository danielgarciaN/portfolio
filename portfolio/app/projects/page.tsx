import type { Metadata } from 'next';
import Projects from '@/components/sections/Projects';

export const metadata: Metadata = {
  title: 'Proyectos',
  description:
    'Proyectos de software, Data Science, IA, backend y cloud de Daniel García Nilo.',
};

export default function ProjectsPage() {
  return (
    <div className="pt-16">
      <Projects />
    </div>
  );
}
