import type { Project, SkillCategory, TimelineItem } from '@/types';

export const fallbackProjects: Project[] = [
  {
    id: '8',
    title: 'AI Marketing Intelligence Platform',
    slug: 'marketing-ia',
    description:
      'Plataforma enterprise de inteligencia de marketing con sistema multiagente LangGraph, RAG, ML clasico, FastAPI y dashboard Next.js.',
    long_description:
      'Proyecto personal en progreso que convierte datos transaccionales de ecommerce en recomendaciones de negocio. Combina scoring RFM, clustering KMeans, prediccion de churn, simulacion de campanas, recuperacion RAG con Qdrant y agentes especializados capaces de razonar sobre KPIs, segmentos, playbooks CRM y ROI estimado. Funciona con Ollama local, OpenAI o modo mock.',
    category: 'personal',
    technologies: ['LangGraph', 'FastAPI', 'Ollama', 'Qdrant', 'RAG', 'Next.js', 'TypeScript', 'scikit-learn'],
    github_url: 'https://github.com/danielgarciaN/marketing-ia',
    image_url: '/images/projects/marketing-ia.jpg',
    status: 'en_proceso',
    featured: true,
    learnings: [
      'Orquestacion multiagente con LangGraph',
      'RAG con Qdrant y embeddings locales',
      'APIs de analitica y simulacion de campanas',
      'Arquitectura AI Engineering con valor de negocio',
    ],
    created_at: '2026-05-20',
  },
  {
    id: '1',
    title: 'Expected Goals xG - StatsBomb',
    slug: 'expected-goals-xg-statsbomb',
    description:
      'Notebook de nivel máster para construir un modelo de Expected Goals con datos abiertos de StatsBomb, storytelling y evaluación avanzada.',
    long_description:
      'Proyecto en curso centrado en crear una notebook entregable de Data Science aplicada al fútbol. El objetivo es modelar la probabilidad de que un tiro acabe en gol mediante Logistic Regression, Random Forest y XGBoost, incorporando feature engineering futbolístico, calibración, comparación con xG de StatsBomb e insights interpretables.',
    category: 'master',
    technologies: ['Python', 'StatsBomb', 'Pandas', 'scikit-learn', 'XGBoost', 'Matplotlib', 'Seaborn'],
    image_url: '/images/projects/expected-goals-xg-statsbomb.jpg',
    status: 'en_proceso',
    featured: true,
    learnings: [
      'Modelado de Expected Goals',
      'Feature engineering futbolístico',
      'Evaluación con ROC-AUC, Brier Score y calibración',
      'Storytelling con datos deportivos',
    ],
    created_at: '2026-05-01',
  },
  {
    id: '2',
    title: 'TFG - Modulo de Chatbots',
    slug: 'tfg-modulo-chatbots',
    description:
      'Proyecto de Trabajo Final de Grado centrado en el diseno y desarrollo de un modulo de agentes conversacionales/chatbots.',
    long_description:
      'Trabajo de Fin de Grado desarrollado en colaboración con Catalana Occident. El proyecto diseña una arquitectura de agentes conversacionales configurables, con flujos gestionados mediante estructuras clave-valor, validación mediante Proof of Concept e integración con IA generativa para asistir procesos de soporte e incidencias.',
    category: 'universidad',
    technologies: ['IA generativa', 'Arquitectura software', 'SQL', 'C#', '.NET', 'PoC'],
    image_url: '/images/projects/tfg-agentes-conversacionales-iatech.jpg',
    status: 'terminado',
    featured: true,
    learnings: [
      'Diseño de arquitecturas parametrizables',
      'Validación de soluciones mediante Proof of Concept',
      'Aplicación de IA generativa a procesos corporativos',
      'Modelado de flujos conversacionales configurables',
    ],
    created_at: '2025-06-01',
  },
  {
    id: '3',
    title: 'FindIt',
    slug: 'find-it',
    description:
      'Backend serverless para un juego de retos visuales, validando fotografías de objetos con Google Cloud Vision y Firebase.',
    long_description:
      'Aplicación gamificada con foco backend que combina Firebase, Cloud Functions y Google Cloud Vision API. El usuario recibe un reto aleatorio, fotografía el objeto y el sistema valida automáticamente si coincide. Incluye modos de juego, puntuación y ranking.',
    category: 'backend',
    technologies: ['TypeScript', 'Firebase', 'Cloud Functions', 'Google Cloud Vision API', 'Backend'],
    github_url: 'https://github.com/danielgarciaN/find-it',
    image_url: '/images/projects/find-it.jpg',
    status: 'terminado',
    featured: true,
    learnings: [
      'Integración con Google Cloud Vision API',
      'Arquitectura serverless con Firebase',
      'Validación backend de retos visuales',
    ],
    created_at: '2024-12-01',
  },
  {
    id: '4',
    title: 'LoL Win Prediction',
    slug: 'lol-win-prediction',
    description:
      'Modelo de machine learning para predecir el equipo ganador en partidas de League of Legends usando datos reales.',
    long_description:
      'Proyecto de Data Science que construye un modelo predictivo con XGBoost para estimar el ganador de una partida. Incluye feature engineering, control de data leakage, entrenamiento con scikit-learn y análisis de resultados orientado a explicabilidad.',
    category: 'data-science',
    technologies: ['Python', 'Pandas', 'scikit-learn', 'XGBoost', 'Matplotlib', 'Jupyter'],
    github_url: 'https://github.com/danielgarciaN/lol-win-prediction',
    image_url: '/images/projects/lol-win-prediction.jpg',
    status: 'terminado',
    featured: true,
    learnings: [
      'Feature engineering aplicado a datos competitivos',
      'Prevención de data leakage',
      'Evaluación de modelos predictivos',
      'Interpretación de métricas y errores',
    ],
    created_at: '2025-01-15',
  },
  {
    id: '5',
    title: 'FutbolData',
    slug: 'futbol-data',
    description:
      'Scripts de análisis y visualización de datos de fútbol: mapas de calor, redes de pases, posesión y valoración de jugadores.',
    long_description:
      'Repositorio de análisis deportivo con Python orientado a transformar datos de eventos y tracking en visualizaciones útiles para interpretación táctica. Incluye mapas de calor, grafos de pases y métricas de rendimiento.',
    category: 'data-science',
    technologies: ['Python', 'Pandas', 'Matplotlib', 'Data Analysis'],
    github_url: 'https://github.com/danielgarciaN/futbol-data',
    image_url: '/images/projects/futbol-data.jpg',
    status: 'terminado',
    featured: true,
    learnings: [
      'Procesamiento de datos deportivos',
      'Visualización avanzada con Matplotlib',
      'Análisis estadístico aplicado al fútbol',
    ],
    created_at: '2024-11-01',
  },
  {
    id: '6',
    title: 'Tofu Awards',
    slug: 'tofu-awards',
    description:
      'Aplicación web para gestionar y votar premios, desplegada con Firebase Hosting y CI/CD con GitHub Actions.',
    long_description:
      'Proyecto web con frontend en JavaScript, CSS y HTML, desplegado en Firebase Hosting con pipeline automatizado mediante GitHub Actions. Permite gestionar categorías y sistema de votación.',
    category: 'web-app',
    technologies: ['JavaScript', 'CSS', 'HTML', 'Firebase', 'GitHub Actions'],
    github_url: 'https://github.com/danielgarciaN/tofu-awards',
    image_url: '/images/projects/tofu-awards.jpg',
    status: 'terminado',
    featured: false,
    learnings: [
      'Despliegue con Firebase Hosting',
      'Automatización con GitHub Actions',
      'Desarrollo frontend con JavaScript vanilla',
    ],
    created_at: '2024-06-01',
  },
  {
    id: '7',
    title: 'UNImate',
    slug: 'unimate',
    description:
      'Proyecto colaborativo académico para facilitar la organización académica y la conexión dentro de la comunidad universitaria.',
    long_description:
      'Aplicación desarrollada en equipo, orientada a mejorar la experiencia académica mediante herramientas de organización, colaboración y gestión de tareas.',
    category: 'universidad',
    technologies: ['React', 'Node.js', 'Firebase', 'CSS', 'Trabajo en equipo'],
    github_url: 'https://github.com/danielgarciaN/Unimate',
    image_url: '/images/projects/unimate.JPG',
    status: 'terminado',
    featured: false,
    learnings: [
      'Trabajo con repositorio compartido',
      'Diseño centrado en comunidad universitaria',
      'Integración de servicios cloud',
    ],
    created_at: '2024-03-01',
  },
];

export const skillCategories: SkillCategory[] = [
  {
    name: 'Lenguajes',
    icon: 'code',
    skills: [
      { id: 's1', name: 'Python', category: 'Lenguajes', order_index: 0 },
      { id: 's2', name: 'C#', category: 'Lenguajes', order_index: 1 },
      { id: 's3', name: 'Java', category: 'Lenguajes', order_index: 2 },
      { id: 's4', name: 'JavaScript', category: 'Lenguajes', order_index: 3 },
      { id: 's5', name: 'TypeScript', category: 'Lenguajes', order_index: 4 },
      { id: 's6', name: 'SQL', category: 'Lenguajes', order_index: 5 },
    ],
  },
  {
    name: 'AI Engineering',
    icon: 'brain',
    skills: [
      { id: 's7', name: 'Agentes de IA', category: 'AI Engineering', order_index: 0 },
      { id: 's8', name: 'LangGraph', category: 'AI Engineering', order_index: 1 },
      { id: 's9', name: 'LangChain', category: 'AI Engineering', order_index: 2 },
      { id: 's10', name: 'RAG', category: 'AI Engineering', order_index: 3 },
      { id: 's11', name: 'Prompt engineering', category: 'AI Engineering', order_index: 4 },
      { id: 's12', name: 'Ollama', category: 'AI Engineering', order_index: 5 },
      { id: 's13', name: 'OpenAI API', category: 'AI Engineering', order_index: 6 },
      { id: 's14', name: 'Qdrant', category: 'AI Engineering', order_index: 7 },
    ],
  },
  {
    name: 'Data Science & ML',
    icon: 'bar-chart',
    skills: [
      { id: 's15', name: 'Pandas', category: 'Data Science & ML', order_index: 0 },
      { id: 's16', name: 'NumPy', category: 'Data Science & ML', order_index: 1 },
      { id: 's17', name: 'scikit-learn', category: 'Data Science & ML', order_index: 2 },
      { id: 's18', name: 'XGBoost', category: 'Data Science & ML', order_index: 3 },
      { id: 's19', name: 'Power BI', category: 'Data Science & ML', order_index: 4 },
      { id: 's20', name: 'Feature engineering', category: 'Data Science & ML', order_index: 5 },
      { id: 's21', name: 'Clustering', category: 'Data Science & ML', order_index: 6 },
      { id: 's22', name: 'Model evaluation', category: 'Data Science & ML', order_index: 7 },
    ],
  },
  {
    name: 'Backend & Software',
    icon: 'server',
    skills: [
      { id: 's23', name: '.NET', category: 'Backend & Software', order_index: 0 },
      { id: 's24', name: 'FastAPI', category: 'Backend & Software', order_index: 1 },
      { id: 's25', name: 'APIs REST', category: 'Backend & Software', order_index: 2 },
      { id: 's26', name: 'Lógica de negocio', category: 'Backend & Software', order_index: 3 },
      { id: 's27', name: 'Arquitectura software', category: 'Backend & Software', order_index: 4 },
      { id: 's28', name: 'Validaciones JavaScript', category: 'Backend & Software', order_index: 5 },
      { id: 's29', name: 'GAAN', category: 'Backend & Software', order_index: 6 },
      { id: 's30', name: 'SQL', category: 'Backend & Software', order_index: 7 },
    ],
  },
  {
    name: 'Frontend & Cloud',
    icon: 'globe',
    skills: [
      { id: 's31', name: 'React', category: 'Frontend & Cloud', order_index: 0 },
      { id: 's32', name: 'Next.js', category: 'Frontend & Cloud', order_index: 1 },
      { id: 's33', name: 'Tailwind CSS', category: 'Frontend & Cloud', order_index: 2 },
      { id: 's34', name: 'Firebase', category: 'Frontend & Cloud', order_index: 3 },
      { id: 's35', name: 'Google Cloud', category: 'Frontend & Cloud', order_index: 4 },
      { id: 's36', name: 'Supabase', category: 'Frontend & Cloud', order_index: 5 },
      { id: 's37', name: 'Docker', category: 'Frontend & Cloud', order_index: 6 },
    ],
  },
  {
    name: 'Herramientas & Metodologías',
    icon: 'wrench',
    skills: [
      { id: 's38', name: 'Git', category: 'Herramientas & Metodologías', order_index: 0 },
      { id: 's39', name: 'GitHub', category: 'Herramientas & Metodologías', order_index: 1 },
      { id: 's40', name: 'JIRA', category: 'Herramientas & Metodologías', order_index: 2 },
      { id: 's41', name: 'Scrum', category: 'Herramientas & Metodologías', order_index: 3 },
      { id: 's42', name: 'Kanban', category: 'Herramientas & Metodologías', order_index: 4 },
      { id: 's43', name: 'Documentación técnica', category: 'Herramientas & Metodologías', order_index: 5 },
      { id: 's44', name: 'Testing', category: 'Herramientas & Metodologías', order_index: 6 },
      { id: 's45', name: 'Debugging', category: 'Herramientas & Metodologías', order_index: 7 },
    ],
  },
  {
    name: 'Habilidades humanas',
    icon: 'users',
    skills: [
      { id: 's46', name: 'Trabajo en equipo', category: 'Habilidades humanas', order_index: 0 },
      { id: 's47', name: 'Comunicación clara', category: 'Habilidades humanas', order_index: 1 },
      { id: 's48', name: 'Adaptabilidad', category: 'Habilidades humanas', order_index: 2 },
      { id: 's49', name: 'Resolución de problemas', category: 'Habilidades humanas', order_index: 3 },
      { id: 's50', name: 'Liderazgo', category: 'Habilidades humanas', order_index: 4 },
      { id: 's51', name: 'Pensamiento crítico', category: 'Habilidades humanas', order_index: 5 },
      { id: 's52', name: 'Proactividad', category: 'Habilidades humanas', order_index: 6 },
      { id: 's53', name: 'Aprendizaje rápido', category: 'Habilidades humanas', order_index: 7 },
    ],
  },
  {
    name: 'Idiomas',
    icon: 'languages',
    skills: [
      { id: 's54', name: 'Español nativo', category: 'Idiomas', order_index: 0 },
      { id: 's55', name: 'Catalán nativo', category: 'Idiomas', order_index: 1 },
      { id: 's56', name: 'Inglés medio', category: 'Idiomas', order_index: 2 },
    ],
  },
];

export const timelineItems: TimelineItem[] = [
  {
    id: 't1',
    type: 'work',
    title: 'Software Developer - Arquitectura, IA y procesos',
    organization: 'Grupo Catalana Occident / Occident',
    location: 'España',
    start_date: '2024-10',
    end_date: '2026-05',
    current: false,
    description:
      'Desarrollo y mejora del módulo corporativo IATeach, una solución orientada a IA para gestión documental y procesos internos. Experiencia en arquitectura corporativa, lógica de negocio con C#/.NET, integración SQL, interfaces GAAN, validaciones JavaScript y trabajo ágil con JIRA, aportando criterio técnico en un entorno real de producto, datos y automatización.',
    highlights: ['AI Engineering', 'C#', '.NET', 'SQL', 'JavaScript', 'GAAN', 'JIRA', 'Arquitectura'],
    order_index: 0,
  },
  {
    id: 't2',
    type: 'education',
    title: 'Máster Evolve - Data Science / Inteligencia Artificial',
    organization: 'Evolve',
    start_date: '2026-03',
    current: true,
    description:
      'Máster de Evolve orientado a entorno profesional real. Especialización en Python, SQL, Power BI, análisis avanzado de datos, automatización, machine learning y toma de decisiones basada en datos.',
    highlights: ['Python', 'SQL', 'Power BI', 'Data Science', 'Machine Learning', 'AI'],
    order_index: 1,
  },
  {
    id: 't3',
    type: 'education',
    title: 'Ingeniería Informática - Mención en Ingeniería del Software',
    organization: 'Formación universitaria',
    start_date: '2020-09',
    end_date: '2025-06',
    current: false,
    description:
      'Grado en Ingeniería Informática con formación integral en ingeniería del software, bases de datos, algoritmos, sistemas, desarrollo web y proyectos en equipo. Trabajo final centrado en agentes conversacionales e IA generativa aplicado a un contexto corporativo.',
    highlights: ['Ingeniería del Software', 'Bases de datos', 'Algoritmos', 'TFG IA', 'Trabajo en equipo'],
    order_index: 2,
  },
  {
    id: 't4',
    type: 'certification',
    title: 'Proyectos de AI Engineering y Data Science',
    organization: 'GitHub personal',
    start_date: '2023-01',
    current: true,
    description:
      'Desarrollo de proyectos propios en Python, análisis de datos, ML, RAG, agentes, aplicaciones web y cloud. Enfoque práctico en documentación, arquitectura limpia y construcción de soluciones con utilidad real.',
    highlights: ['AI Engineering', 'Data Science', 'RAG', 'Agentes', 'Machine Learning', 'Cloud'],
    order_index: 3,
  },
];

export const personalInfo = {
  name: 'Daniel García Nilo',
  shortName: 'Daniel García',
  title: 'AI Engineer & Data Science - Ingeniero Informático',
  bio: 'Ingeniero informático graduado, con experiencia en Occident desarrollando soluciones corporativas vinculadas a IA, procesos, datos y arquitectura. Enfoco mi perfil hacia AI Engineering y Data Science para construir sistemas útiles, fiables y orientados a impacto real.',
  email: 'danielgarcianilo1@gmail.com',
  phone: '+34 644 41 01 49',
  github: 'https://github.com/danielgarciaN',
  linkedin: 'https://www.linkedin.com/in/danielgarcianilo/',
  location: 'España',
  profileImage: '/images/profile/daniel-garcia-nilo.jpg',
  cvUrl: '/cv/daniel-garcia-nilo-cv.pdf',
};
