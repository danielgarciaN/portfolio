import type { Metadata } from 'next';
import Projects from '@/components/sections/Projects';

export const metadata: Metadata = {
  title: 'Proyectos',
  description:
    'Proyectos de Data Analytics, Business Intelligence, Power BI, estadistica, Data Science, IA y software de Daniel Garcia Nilo.',
};

export default function ProjectsPage() {
  return (
    <div className="pt-16">
      <Projects />
    </div>
  );
}
