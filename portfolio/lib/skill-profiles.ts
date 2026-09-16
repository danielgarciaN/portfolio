export interface SkillProfile {
  experience?: 'continuousSql' | 'pythonProjects' | 'currentData' | 'biProjects' | 'modeling' | 'learning';
  work: string[];
  education: string[];
}

// Academic and professional usage contexts, without proficiency ratings.
const contexts: Record<string, Partial<SkillProfile>> = {
  SQL: { experience: 'continuousSql', work: ['t0', 't1'], education: ['t3', 't2'] },
  'Power BI': { experience: 'biProjects', education: ['t2'] },
  'Power Query': { experience: 'biProjects', education: ['t2'] },
  DAX: { experience: 'biProjects', education: ['t2'] },
  Snowflake: { experience: 'currentData', work: ['t0'] },
  Informatica: { experience: 'currentData', work: ['t0'] },
  'ETL / ELT': { experience: 'currentData', work: ['t0'] },
  Databricks: { experience: 'learning' },
  'Data Modeling': { experience: 'modeling', education: ['t3', 't2'] },
  Python: { experience: 'pythonProjects', education: ['t3', 't2'] },
};

const professionalContext: Record<string, string[]> = {
  'C#': ['t1'], '.NET': ['t1'], JavaScript: ['t1'],
  'Backend Development': ['t1'], APIs: ['t1'], 'APIs REST': ['t1'],
  Architecture: ['t1'], 'Software Architecture': ['t1'], Automation: ['t1'],
  'Database Integration': ['t1'], JIRA: ['t1'],
  Documentation: ['t0', 't1'], 'Documentación técnica': ['t0', 't1'],
  'Data Transformation': ['t0'], 'Relational Databases': ['t0', 't1'],
};

export function profileForSkill(skill: string): SkillProfile {
  const supplied = contexts[skill];
  if (supplied) return { work: [], education: [], ...supplied };
  return {
    work: professionalContext[skill] ?? [],
    education: skill === 'Java' ? ['t3'] : [],
  };
}
