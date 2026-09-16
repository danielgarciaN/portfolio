export interface SkillProject {
  slug: string;
  title: string;
  technologies: string[];
}

// Equivalent names already used by the project dossiers. No substring matching:
// SQL must not be associated with a project just because it uses another database.
const aliases: Record<string, string> = {
  'jupyter notebook': 'jupyter',
  'documentacion tecnica': 'documentation',
  'documentación técnica': 'documentation',
  'arquitectura software': 'architecture',
  'software architecture': 'architecture',
  'backend': 'backend development',
  'ia generativa': 'artificial intelligence',
  'google cloud vision api': 'google cloud',
};

// These broader practices are documented in the existing project descriptions.
const documentedPractice: Record<string, string[]> = {
  'machine learning': ['expected-goals-xg-statsbomb', 'lol-win-prediction', 'marketing-ia'],
  'statistical analysis': ['statistical-sales-analysis'],
  'exploratory data analysis': ['statistical-sales-analysis', 'expected-goals-xg-statsbomb'],
  'data visualization': ['statistical-sales-analysis', 'global-electronics-powerbi', 'expected-goals-xg-statsbomb', 'futbol-data', 'lol-win-prediction'],
};

const normalize = (value: string) => {
  const key = value.toLowerCase().trim();
  return aliases[key] ?? key;
};

export function projectsForSkill(skill: string, projects: SkillProject[]) {
  const key = normalize(skill);
  return projects.filter((project) =>
    project.technologies.some((technology) => normalize(technology) === key) ||
    documentedPractice[key]?.includes(project.slug),
  );
}
