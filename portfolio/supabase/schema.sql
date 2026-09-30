-- Daniel Garcia Nilo Portfolio - Supabase Schema

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  long_description TEXT,
  categories TEXT[] NOT NULL DEFAULT '{}' CHECK (categories <@ ARRAY['data-analytics', 'data-science', 'master', 'universidad', 'backend', 'web-app']),
  technologies TEXT[] NOT NULL DEFAULT '{}',
  github_url TEXT,
  demo_url TEXT,
  image_url TEXT,
  status TEXT NOT NULL DEFAULT 'en_proceso' CHECK (status IN ('terminado', 'en_proceso', 'futuro')),
  featured BOOLEAN NOT NULL DEFAULT false,
  learnings TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_projects_categories ON projects USING GIN(categories);
CREATE INDEX idx_projects_featured ON projects(featured);
CREATE INDEX idx_projects_slug ON projects(slug);

CREATE TABLE skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  icon TEXT,
  level INTEGER CHECK (level >= 0 AND level <= 100),
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_skills_category ON skills(category);

CREATE TABLE experiences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type TEXT NOT NULL CHECK (type IN ('work', 'education', 'certification')),
  title TEXT NOT NULL,
  organization TEXT NOT NULL,
  location TEXT,
  start_date TEXT NOT NULL,
  end_date TEXT,
  current BOOLEAN NOT NULL DEFAULT false,
  description TEXT NOT NULL,
  highlights TEXT[] DEFAULT '{}',
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  icon TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL DEFAULT '',
  tags TEXT[] DEFAULT '{}',
  published BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_published ON blog_posts(published);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read projects" ON projects FOR SELECT USING (true);

ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read skills" ON skills FOR SELECT USING (true);

ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read experiences" ON experiences FOR SELECT USING (true);

ALTER TABLE links ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read links" ON links FOR SELECT USING (true);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read published posts" ON blog_posts FOR SELECT USING (published = true);

INSERT INTO projects (title, slug, description, long_description, categories, technologies, github_url, image_url, status, featured, learnings) VALUES
(
  'AI Marketing Intelligence Platform',
  'marketing-ia',
  'Plataforma enterprise de inteligencia de marketing con sistema multiagente LangGraph, RAG, ML clasico, FastAPI y dashboard Next.js.',
  'Proyecto en progreso que convierte datos transaccionales de ecommerce en recomendaciones de negocio. Combina scoring RFM, clustering KMeans, prediccion de churn, simulacion de campanas, recuperacion RAG con Qdrant y agentes especializados capaces de razonar sobre KPIs, segmentos, playbooks CRM y ROI estimado. Funciona con Ollama local, OpenAI o modo mock.',
  ARRAY['data-analytics', 'data-science'],
  ARRAY['LangGraph', 'FastAPI', 'Ollama', 'Qdrant', 'RAG', 'Next.js', 'TypeScript', 'scikit-learn'],
  'https://github.com/danielgarciaN/marketing-ia',
  '/images/projects/marketing-ia.jpg',
  'en_proceso',
  true,
  ARRAY['Orquestacion multiagente con LangGraph', 'RAG con Qdrant y embeddings locales', 'APIs de analitica y simulacion de campanas', 'Arquitectura AI Engineering con valor de negocio']
),
(
  'Expected Goals xG - StatsBomb',
  'expected-goals-xg-statsbomb',
  'Notebook de nivel master para construir un modelo de Expected Goals con datos de eventos de StatsBomb Open Data.',
  'Proyecto finalizado centrado en modelar la probabilidad de gol de cada tiro mediante Logistic Regression, Random Forest y XGBoost. Incluye feature engineering futbolistico, calibracion, comparacion con el xG de StatsBomb, visualizaciones e interpretacion de negocio deportivo.',
  ARRAY['master', 'data-analytics'],
  ARRAY['Python', 'StatsBomb', 'Pandas', 'scikit-learn', 'XGBoost', 'Matplotlib', 'Seaborn'],
  NULL,
  '/images/projects/expected-goals-xg-statsbomb.jpg',
  'terminado',
  true,
  ARRAY['Modelado xG', 'Calibracion probabilistica', 'Storytelling con datos', 'Visualizacion futbolistica']
),
(
  'TFG - Agentes Conversacionales IATech',
  'tfg-agentes-conversacionales-iatech',
  'Trabajo de Fin de Grado sobre agentes conversacionales configurables para soporte interno, desarrollado en colaboracion con Catalana Occident.',
  'Arquitectura de agentes conversacionales configurables con flujos gestionados mediante estructuras clave-valor, validacion mediante Proof of Concept e integracion con IA generativa para asistir procesos de soporte e incidencias.',
    ARRAY['universidad'],
  ARRAY['Python', 'IA generativa', 'Arquitectura software', 'Prompt engineering', 'JSON', 'APIs'],
  NULL,
  '/images/projects/tfg-agentes-conversacionales-iatech.jpg',
  'terminado',
  true,
  ARRAY['Arquitectura de agentes', 'Diseno de PoC', 'Documentacion tecnica', 'Aplicacion real en entorno corporativo']
),
(
  'FindIt',
  'find-it',
  'Backend serverless para un juego de deteccion de objetos con Firebase y Google Cloud Vision API.',
  'Proyecto centrado en el backend de una experiencia gamificada donde los usuarios reciben retos, suben fotografias y el sistema valida los objetos mediante Cloud Vision API. Incluye Cloud Functions, Firebase y reglas de integracion.',
  ARRAY['universidad', 'backend'],
  ARRAY['TypeScript', 'Firebase', 'Cloud Functions', 'Google Cloud Vision API', 'Serverless'],
  'https://github.com/danielgarciaN/find-it',
  '/images/projects/find-it.jpg',
  'terminado',
  true,
  ARRAY['Arquitectura serverless', 'Integracion con Cloud Vision API', 'Validacion de imagenes', 'Backend orientado a eventos']
),
(
  'LoL Win Prediction',
  'lol-win-prediction',
  'Modelo de machine learning para predecir el ganador de partidas de League of Legends usando datos reales.',
  'Proyecto de Data Science que construye un modelo predictivo con XGBoost para estimar el ganador de una partida. Incluye feature engineering, control de data leakage, entrenamiento con scikit-learn y analisis de resultados orientado a explicabilidad.',
  ARRAY['universidad', 'data-science'],
  ARRAY['Python', 'Pandas', 'scikit-learn', 'XGBoost', 'Matplotlib', 'Jupyter'],
  'https://github.com/danielgarciaN/lol-win-prediction',
  '/images/projects/lol-win-prediction.jpg',
  'terminado',
  true,
  ARRAY['Feature engineering', 'Prevencion de data leakage', 'Evaluacion con ROC-AUC', 'Explicabilidad de modelos']
),
(
  'FutbolData',
  'futbol-data',
  'Scripts de analisis y visualizacion de datos de futbol con Python.',
  'Repositorio de analisis de datos deportivos con scripts para mapas de calor, grafos de pases, posesion y rating de jugadores.',
  ARRAY['data-analytics', 'data-science'],
  ARRAY['Python', 'Pandas', 'Matplotlib', 'Seaborn'],
  'https://github.com/danielgarciaN/futbol-data',
  '/images/projects/futbol-data.jpg',
  'terminado',
  true,
  ARRAY['Procesamiento de datos deportivos', 'Visualizacion avanzada', 'Analisis exploratorio']
),
(
  'Tofu Awards',
  'tofu-awards',
  'Aplicacion web para gestionar y votar premios, desplegada con Firebase Hosting y CI/CD.',
  'Proyecto web completo con frontend en JavaScript, CSS y HTML, desplegado en Firebase Hosting con pipeline automatizado de GitHub Actions.',
  ARRAY['web-app'],
  ARRAY['JavaScript', 'CSS', 'HTML', 'Firebase', 'GitHub Actions'],
  'https://github.com/danielgarciaN/tofu-awards',
  '/images/projects/tofu-awards.jpg',
  'terminado',
  false,
  ARRAY['Firebase Hosting', 'CI/CD con GitHub Actions', 'Frontend vanilla']
),
(
  'UNImate',
  'unimate',
  'Proyecto colaborativo para facilitar la organizacion academica y la conexion dentro de la comunidad universitaria.',
  'Aplicacion desarrollada en equipo durante el grado, orientada a mejorar la experiencia academica mediante herramientas de organizacion y comunidad.',
  ARRAY['universidad', 'web-app'],
  ARRAY['React', 'Node.js', 'Firebase', 'CSS'],
  'https://github.com/Carolbg28/UNImate',
  '/images/projects/unimate.jpg',
  'terminado',
  false,
  ARRAY['Trabajo en equipo', 'Diseno centrado en usuario', 'Integracion cloud']
);

INSERT INTO skills (name, category, icon, order_index) VALUES
('Python', 'Lenguajes', 'code', 0),
('C#', 'Lenguajes', 'code', 1),
('Java', 'Lenguajes', 'code', 2),
('JavaScript', 'Lenguajes', 'code', 3),
('TypeScript', 'Lenguajes', 'code', 4),
('SQL', 'Lenguajes', 'code', 5),
('Agentes de IA', 'AI Engineering', 'brain', 0),
('LangGraph', 'AI Engineering', 'brain', 1),
('LangChain', 'AI Engineering', 'brain', 2),
('RAG', 'AI Engineering', 'brain', 3),
('Prompt engineering', 'AI Engineering', 'brain', 4),
('Ollama', 'AI Engineering', 'brain', 5),
('OpenAI API', 'AI Engineering', 'brain', 6),
('Qdrant', 'AI Engineering', 'brain', 7),
('Pandas', 'Data Science & ML', 'bar-chart', 0),
('NumPy', 'Data Science & ML', 'bar-chart', 1),
('scikit-learn', 'Data Science & ML', 'bar-chart', 2),
('XGBoost', 'Data Science & ML', 'bar-chart', 3),
('Power BI', 'Data Science & ML', 'bar-chart', 4),
('Feature engineering', 'Data Science & ML', 'bar-chart', 5),
('Clustering', 'Data Science & ML', 'bar-chart', 6),
('Model evaluation', 'Data Science & ML', 'bar-chart', 7),
('.NET', 'Backend & Software', 'server', 0),
('FastAPI', 'Backend & Software', 'server', 1),
('APIs REST', 'Backend & Software', 'server', 2),
('Logica de negocio', 'Backend & Software', 'server', 3),
('Arquitectura software', 'Backend & Software', 'server', 4),
('Validaciones JavaScript', 'Backend & Software', 'server', 5),
('GAAN', 'Backend & Software', 'server', 6),
('SQL', 'Backend & Software', 'server', 7),
('React', 'Frontend & Cloud', 'globe', 0),
('Next.js', 'Frontend & Cloud', 'globe', 1),
('Tailwind CSS', 'Frontend & Cloud', 'globe', 2),
('Firebase', 'Frontend & Cloud', 'globe', 3),
('Google Cloud', 'Frontend & Cloud', 'globe', 4),
('Supabase', 'Frontend & Cloud', 'globe', 5),
('Docker', 'Frontend & Cloud', 'globe', 6),
('Git', 'Herramientas & Metodologias', 'wrench', 0),
('GitHub', 'Herramientas & Metodologias', 'wrench', 1),
('JIRA', 'Herramientas & Metodologias', 'wrench', 2),
('Scrum', 'Herramientas & Metodologias', 'wrench', 3),
('Kanban', 'Herramientas & Metodologias', 'wrench', 4),
('Documentacion tecnica', 'Herramientas & Metodologias', 'wrench', 5),
('Testing', 'Herramientas & Metodologias', 'wrench', 6),
('Debugging', 'Herramientas & Metodologias', 'wrench', 7),
('Trabajo en equipo', 'Habilidades humanas', 'users', 0),
('Comunicacion clara', 'Habilidades humanas', 'users', 1),
('Adaptabilidad', 'Habilidades humanas', 'users', 2),
('Resolucion de problemas', 'Habilidades humanas', 'users', 3),
('Liderazgo', 'Habilidades humanas', 'users', 4),
('Pensamiento critico', 'Habilidades humanas', 'users', 5),
('Proactividad', 'Habilidades humanas', 'users', 6),
('Aprendizaje rapido', 'Habilidades humanas', 'users', 7);

INSERT INTO experiences (type, title, organization, start_date, end_date, current, description, highlights, order_index) VALUES
('work', 'Software Developer - Arquitectura, IA y procesos', 'Grupo Catalana Occident / Occident', '2024-10', '2026-05', false, 'Desarrollo y mejora del modulo corporativo IATeach, una solucion orientada a IA para gestion documental y procesos internos. Experiencia en arquitectura corporativa, logica de negocio con C#/.NET, integracion SQL, interfaces GAAN, validaciones JavaScript y trabajo agil con JIRA.', ARRAY['AI Engineering', 'C#/.NET', 'SQL', 'JavaScript', 'GAAN', 'JIRA', 'Arquitectura'], 0),
('education', 'Master Evolve - Data Science / Inteligencia Artificial', 'Evolve', '2026-03', NULL, true, 'Master de Evolve orientado a entorno profesional real. Especializacion en Python, SQL, Power BI, analisis avanzado de datos, automatizacion, machine learning y toma de decisiones basada en datos.', ARRAY['Python', 'SQL', 'Power BI', 'Data Science', 'Machine Learning', 'AI'], 1),
('education', 'Ingenieria Informatica', 'Formacion universitaria', '2021-09', '2025-06', false, 'Grado en Ingenieria Informatica con formacion integral en ingenieria del software, bases de datos, algoritmos, sistemas, desarrollo web y proyectos en equipo. Trabajo final centrado en agentes conversacionales e IA generativa aplicado a un contexto corporativo.', ARRAY['Ingenieria del software', 'Bases de datos', 'Algoritmos', 'TFG IA', 'Trabajo en equipo'], 2),
('certification', 'Proyectos de AI Engineering y Data Science', 'GitHub personal', '2024-01', NULL, true, 'Desarrollo de proyectos propios en Python, analisis de datos, ML, RAG, agentes, aplicaciones web y cloud. Enfoque practico en documentacion, arquitectura limpia y construccion de soluciones con utilidad real.', ARRAY['AI Engineering', 'Data Science', 'RAG', 'Agentes', 'Machine Learning', 'Cloud'], 3),
('education', 'Bachillerato Tecnologico', 'Institut Joan Oliver', '2019-09', '2021-06', false, 'Formacion cientifica y tecnica con base en matematicas, fisica, tecnologia y electrotecnia.', ARRAY['Matematicas', 'Fisica', 'Tecnologia', 'Electrotecnia'], 4);

INSERT INTO links (platform, url, icon, order_index) VALUES
('GitHub', 'https://github.com/danielgarciaN', 'github', 0),
('LinkedIn', 'https://www.linkedin.com/in/danielgarcianilo/', 'linkedin', 1),
('Email', 'mailto:danielgarcianilo1@gmail.com', 'mail', 2);
