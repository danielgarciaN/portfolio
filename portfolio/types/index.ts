export type ProjectStatus = 'terminado' | 'en_proceso' | 'futuro';
export type ProjectCategory =
  | 'data-analytics'
  | 'data-science'
  | 'master'
  | 'universidad'
  | 'backend'
  | 'web-app'
  | 'personal';

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  long_description?: string;
  categories?: ProjectCategory[];
  category?: ProjectCategory;
  technologies: string[];
  github_url?: string;
  demo_url?: string;
  image_url?: string;
  status: ProjectStatus;
  featured: boolean;
  featuredOrder?: number;
  learnings?: string[];
  created_at: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  icon?: string;
  level?: number;
  order_index: number;
}

export interface SkillCategory {
  name: string;
  icon: string;
  skills: Skill[];
}

export type TimelineType = 'work' | 'education' | 'certification';

export interface TimelineItem {
  id: string;
  type: TimelineType;
  title: string;
  organization: string;
  location?: string;
  start_date: string;
  end_date?: string;
  current: boolean;
  description: string;
  highlights?: string[];
  order_index: number;
}

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string[];
  published: boolean;
  published_at?: string;
  created_at: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
  order_index: number;
}

export type ProjectResourceType =
  | 'pdf'
  | 'notebook'
  | 'powerbi'
  | 'data'
  | 'video'
  | 'presentation'
  | 'excel'
  | 'code'
  | 'demo'
  | 'memory'
  | 'diagram'
  | 'external';

export type ProjectResourceAction = 'view' | 'download' | 'external';

export interface ProjectResource {
  title: string;
  type: ProjectResourceType;
  description?: string;
  url?: string;
  action: ProjectResourceAction;
  available?: boolean;
}

export interface ProjectVideo {
  title: string;
  type: 'video' | 'youtube' | 'demo' | 'external';
  url: string;
  description?: string;
  poster?: string;
}

export interface ProjectGalleryImage {
  title: string;
  src: string;
  alt: string;
  description?: string;
}

export interface ProjectDetailMetric {
  label: string;
  value: string;
  description?: string;
}

export interface ProjectDetailImage {
  src: string;
  alt: string;
  title?: string;
  description?: string;
}

export interface ProjectDetailSection {
  eyebrow?: string;
  title?: string;
  body?: string[];
  steps?: string[];
  items?: string[];
  metrics?: ProjectDetailMetric[];
  image?: ProjectDetailImage;
  src?: string;
  alt?: string;
  description?: string;
  content?: string;
  label?: string;
  value?: string;
}

export interface ProjectDossierTranslation {
  title?: string;
  subtitle?: string;
  author?: string;
  description?: string;
  longDescription?: string;
  resources?: ProjectResource[];
  videos?: ProjectVideo[];
  gallery?: ProjectGalleryImage[];
  notes?: string[];
  detailSections?: ProjectDetailSection[];
}

export interface ProjectDossier {
  title: string;
  slug: string;
  subtitle: string;
  author: string;
  description: string;
  longDescription: string;
  categories?: ProjectCategory[];
  category?: ProjectCategory;
  status: ProjectStatus;
  technologies: string[];
  colorTheme: {
    primary: string;
    soft: string;
  };
  logo?: string;
  coverImage?: string;
  githubUrl?: string;
  demoUrl?: string;
  resources: ProjectResource[];
  videos: ProjectVideo[];
  gallery: ProjectGalleryImage[];
  detailSections?: ProjectDetailSection[];
  notes: string[];
  translations?: {
    en?: ProjectDossierTranslation;
  };
}
