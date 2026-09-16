'use client';

import Section from '@/components/ui/Section';
import { useI18n } from '@/lib/i18n';
import { BarChart3, BrainCircuit, Code2, Database, Server, Wrench, Table2, Sigma, Snowflake, Workflow, GitBranch, Github, NotebookPen, FileText, Target, Network, Layers3, Braces, TestTube2, Lightbulb, Users } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  code: Code2, database: Database, brain: BrainCircuit,
  'bar-chart': BarChart3, server: Server, wrench: Wrench,
};

const skillIcons: Record<string, React.ElementType> = {
  SQL: Database, 'Power BI': BarChart3, 'Power Query': Table2, DAX: Sigma,
  Snowflake, 'ETL / ELT': Workflow, 'Data Modeling': Network, 'Data Warehousing': Layers3,
  'Data Transformation': Workflow, Statistics: Sigma, 'Statistical Analysis': Sigma,
  Python: Code2, Pandas: Table2, NumPy: Sigma, Git: GitBranch, GitHub: Github,
  Jupyter: NotebookPen, Documentation: FileText, 'KPI Analysis': Target,
  APIs: Network, Automation: Workflow, Architecture: Layers3, '.NET': Braces,
  Testing: TestTube2, Agile: Users, 'Problem Solving': Lightbulb,
  'Business-oriented thinking': Target,
};

export default function Skills() {
  const { messages } = useI18n();
  return (
    <Section id="skills">
      <span className="heading-section">{messages.skills.eyebrow}</span>
      <h2 className="heading-lg mb-4 mt-3">{messages.skills.title} <span className="text-accent">{messages.skills.titleAccent}</span></h2>
      <p className="mb-12 max-w-2xl text-sm leading-relaxed text-surface-600 dark:text-slate-300">{messages.skills.intro}</p>
      <div className="space-y-12">
        {messages.skills.categories.map((category) => {
          const Icon = iconMap[category.icon] ?? Code2;
          return (
            <div key={category.name}>
              <div className="mb-5 flex flex-col gap-2 border-b border-accent/15 pb-4 lg:flex-row lg:items-baseline lg:justify-between lg:gap-8">
                <h3 className="text-lg font-bold">{category.name}</h3>
                <p className="text-sm text-surface-500 dark:text-slate-300">{category.desc}</p>
              </div>
              <div className={`grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 ${category.skills.length > 6 ? 'xl:grid-cols-4' : 'xl:grid-cols-6'}`}>
                {category.skills.map((skill) => {
                  const SkillIcon = skillIcons[skill] ?? Icon;
                  return (
                  <article key={skill} className="card card-hover skill-card flex flex-col items-center !p-4 text-center sm:!p-5">
                    <SkillIcon aria-hidden="true" className="mb-4 h-9 w-9 text-accent" strokeWidth={1.4} />
                    <h4 className="text-sm font-bold">{skill}</h4>
                    <p className="mt-2 text-xs leading-relaxed text-surface-500 dark:text-slate-300">{messages.skills.descriptions[skill as keyof typeof messages.skills.descriptions]}</p>
                  </article>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
