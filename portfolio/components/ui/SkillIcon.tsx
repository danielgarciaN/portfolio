import { BarChart3, BrainCircuit, Code2, Database, Server, Wrench, Users, Languages } from 'lucide-react';

const icons: Record<string, React.ElementType> = {
  code: Code2, database: Database, brain: BrainCircuit, 'bar-chart': BarChart3,
  server: Server, wrench: Wrench, users: Users, languages: Languages,
};

export default function SkillIcon({ name, className = '' }: { name: string; className?: string }) {
  const Icon = icons[name] ?? Code2;
  return <Icon aria-hidden="true" className={className} strokeWidth={1.4} />;
}
