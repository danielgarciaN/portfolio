import type { Metadata } from 'next';
import SkillsIndex from '@/components/skills/SkillsIndex';

export const metadata: Metadata = {
  title: 'Skills',
  description: 'Herramientas y conocimientos de Daniel García Nilo, con contexto y proyectos reales de Data Analytics, Data Science y Software Engineering.',
};

export default function SkillsPage() {
  return <SkillsIndex />;
}
