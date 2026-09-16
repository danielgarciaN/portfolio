import { BarChart3, Braces, Code2, Coffee, Database, Flame, GitBranch, Layers3, Network, Sigma, Snowflake, Table2, Workflow } from 'lucide-react';

// Consistent pictograms, not imitations of vendor logos.
const icons: Record<string, React.ElementType> = {
  SQL: Database, 'Power BI': BarChart3, 'Power Query': Table2, DAX: Sigma,
  Snowflake, Databricks: Layers3, Informatica: Workflow, 'ETL / ELT': Workflow,
  'Data Modeling': Network, Firebase: Flame, Python: Code2, Java: Coffee,
  'C#': Braces, '.NET': Braces, Git: GitBranch, Pandas: Table2, NumPy: Sigma,
};
export default function TechnologyIcon({ name }: { name: string }) {
  const Icon = icons[name] ?? Code2;
  return <Icon aria-hidden="true" className="h-8 w-8 shrink-0" strokeWidth={1.5} />;
}
