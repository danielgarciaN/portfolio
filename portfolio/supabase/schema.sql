-- Daniel Garcia Nilo Portfolio - Supabase Schema

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  long_description TEXT,
  category TEXT NOT NULL CHECK (category IN ('personal', 'universidad', 'master', 'data-science', 'backend', 'web-app')),
  technologies TEXT[] NOT NULL DEFAULT '{}',
  github_url TEXT,
  demo_url TEXT,
  image_url TEXT,
  status TEXT NOT NULL DEFAULT 'en_proceso' CHECK (status IN ('terminado', 'en_proceso', 'futuro')),
  featured BOOLEAN NOT NULL DEFAULT false,
  learnings TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_projects_category ON projects(category);
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

CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN NOT NULL DEFAULT false,
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

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can send messages" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated read messages" ON contact_messages FOR SELECT USING (auth.role() = 'authenticated');

ALTER TABLE links ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read links" ON links FOR SELECT USING (true);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read published posts" ON blog_posts FOR SELECT USING (published = true);

INSERT INTO projects (title, slug, description, long_description, category, technologies, github_url, image_url, status, featured, learnings) VALUES
(
  'Expected Goals xG - StatsBomb',
  'expected-goals-xg-statsbomb',
  'Notebook de nivel master para construir un modelo de Expected Goals con datos de eventos de StatsBomb Open Data.',
  'Proyecto en curso centrado en modelar la probabilidad de gol de cada tiro mediante Logistic Regression, Random Forest y XGBoost. Incluye feature engineering futbolistico, calibracion, comparacion con el xG de StatsBomb, visualizaciones e interpretacion de negocio deportivo.',
  'master',
  ARRAY['Python', 'StatsBomb', 'Pandas', 'scikit-learn', 'XGBoost', 'Matplotlib', 'Seaborn'],
  NULL,
  '/images/projects/expected-goals-xg-statsbomb.jpg',
  'en_proceso',
  true,
  ARRAY['Modelado xG', 'Calibracion probabilistica', 'Storytelling con datos', 'Visualizacion futbolistica']
),
(
  'TFG - Agentes Conversacionales IATech',
  'tfg-agentes-conversacionales-iatech',
  'Trabajo de Fin de Grado sobre agentes conversacionales configurables para soporte interno, desarrollado en colaboracion con Catalana Occident.',
  'Arquitectura de agentes conversacionales configurables con flujos gestionados mediante estructuras clave-valor, validacion mediante Proof of Concept e integracion con IA generativa para asistir procesos de soporte e incidencias.',
  'universidad',
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
  'backend',
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
  'data-science',
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
  'data-science',
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
  'web-app',
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
  'Proyecto colaborativo para facilitar la organizacion academica y la conexion entre estudiantes.',
  'Aplicacion desarrollada en equipo durante el grado, orientada a mejorar la experiencia academica mediante herramientas de organizacion y comunidad.',
  'universidad',
  ARRAY['React', 'Node.js', 'Firebase', 'CSS'],
  'https://github.com/Carolbg28/UNImate',
  '/images/projects/unimate.jpg',
  'terminado',
  false,
  ARRAY['Trabajo en equipo', 'Diseno centrado en usuario', 'Integracion cloud']
);

INSERT INTO skills (name, category, icon, order_index) VALUES
('Python', 'Lenguajes', 'code', 0),
('Java', 'Lenguajes', 'code', 1),
('C#', 'Lenguajes', 'code', 2),
('JavaScript', 'Lenguajes', 'code', 3),
('TypeScript', 'Lenguajes', 'code', 4),
('SQL', 'Lenguajes', 'code', 5),
('Pandas', 'Data Science & AI', 'bar-chart', 0),
('NumPy', 'Data Science & AI', 'bar-chart', 1),
('scikit-learn', 'Data Science & AI', 'bar-chart', 2),
('XGBoost', 'Data Science & AI', 'bar-chart', 3),
('Power BI', 'Data Science & AI', 'bar-chart', 4),
('IA generativa', 'Data Science & AI', 'bar-chart', 5),
('React', 'Frontend', 'globe', 0),
('Next.js', 'Frontend', 'globe', 1),
('Tailwind CSS', 'Frontend', 'globe', 2),
('HTML/CSS', 'Frontend', 'globe', 3),
('APIs REST', 'Backend & Cloud', 'cloud', 0),
('.NET', 'Backend & Cloud', 'cloud', 1),
('Firebase', 'Backend & Cloud', 'cloud', 2),
('Supabase', 'Backend & Cloud', 'cloud', 3),
('Google Cloud', 'Backend & Cloud', 'cloud', 4),
('Git', 'Herramientas', 'wrench', 0),
('GitHub', 'Herramientas', 'wrench', 1),
('Docker', 'Herramientas', 'wrench', 2),
('JIRA', 'Herramientas', 'wrench', 3),
('Linux', 'Herramientas', 'wrench', 4);

INSERT INTO experiences (type, title, organization, start_date, end_date, current, description, highlights, order_index) VALUES
('work', 'Departamento de Arquitectura', 'Grupo Catalana Occident / Occident', '2024-10', '2026-05', false, 'Experiencia en entorno corporativo participando en soluciones vinculadas a arquitectura, procesos, datos e inteligencia artificial.', ARRAY['C#/.NET', 'SQL', 'JavaScript', 'GAAN', 'JIRA', 'Procesos corporativos'], 0),
('education', 'Master Evolve - Data Science / Inteligencia Artificial', 'Evolve', '2026-03', NULL, true, 'Master de Evolve orientado a entorno profesional real. Especializacion en Python, SQL, Power BI, analisis avanzado de datos, automatizacion y toma de decisiones basada en datos.', ARRAY['Python', 'SQL', 'Power BI', 'Data Science', 'AI', 'Big Data'], 1),
('education', 'Ingenieria Informatica', 'Formacion universitaria', '2020-09', '2025-06', false, 'Formacion integral en ingenieria del software, bases de datos, algoritmos, sistemas, desarrollo web y proyectos en equipo.', ARRAY['Ingenieria del software', 'Bases de datos', 'Algoritmos', 'Proyectos en equipo'], 2),
('certification', 'Aprendizaje continuo en software, datos e IA', 'Proyectos personales', '2023-01', NULL, true, 'Desarrollo de proyectos propios aplicando tecnologias web, data science, backend, cloud e inteligencia artificial.', ARRAY['Data Science deportiva', 'Apps con Firebase', 'ML predictivo', 'Cloud'], 3);

INSERT INTO links (platform, url, icon, order_index) VALUES
('GitHub', 'https://github.com/danielgarciaN', 'github', 0),
('LinkedIn', 'https://www.linkedin.com/in/danielgarcianilo/', 'linkedin', 1),
('Email', 'mailto:danielgarcianilo1@gmail.com', 'mail', 2);
