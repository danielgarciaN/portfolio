import type { ProjectDossier } from '@/types';

const tfgBasePath = '/projects/tfg-modulo-chatbots';
const projectBasePath = (slug: string) => `/projects/${slug}`;

function pendingResource(slug: string, title = 'Documentacion del proyecto') {
  return {
    title,
    type: 'pdf' as const,
    description: 'Espacio preparado para anadir memoria, informe o documentacion tecnica.',
    url: `${projectBasePath(slug)}/docs/documentacion.pdf`,
    action: 'download' as const,
    available: false,
  };
}

function githubResource(url: string) {
  return {
    title: 'Repositorio GitHub',
    type: 'code' as const,
    description: 'Codigo fuente, estructura del proyecto y documentacion tecnica disponible en GitHub.',
    url,
    action: 'external' as const,
  };
}

export const projectDossiers: ProjectDossier[] = [
  {
    title: 'TFG - Modulo de Chatbots',
    slug: 'tfg-modulo-chatbots',
    subtitle: 'Dossier documental del Trabajo Final de Grado',
    author: 'Daniel Garcia Nilo',
    description:
      'Proyecto de Trabajo Final de Grado centrado en el diseno y desarrollo de un modulo de agentes conversacionales/chatbots.',
    longDescription:
      'Sistema orientado al diseno de agentes conversacionales parametrizables, con documentacion funcional y tecnica, modelos de datos, arquitectura, analisis del sistema y recursos de seguimiento del proyecto. El dossier funciona como indice central para consultar informes, estudios, diagramas, manuales y pruebas relacionadas.',
    category: 'universidad',
    status: 'terminado',
    technologies: ['IA generativa', 'Chatbots', 'Arquitectura software', 'SQL', 'C#', '.NET', 'Documentacion tecnica'],
    colorTheme: {
      primary: '#d5001c',
      soft: 'rgba(213, 0, 28, 0.1)',
    },
    coverImage: '/images/projects/tfg-agentes-conversacionales-iatech.jpg',
    resources: [
      {
        title: 'Informe Inicial',
        type: 'pdf',
        description: 'Documento de planteamiento, contexto y objetivos iniciales del proyecto.',
        url: `${tfgBasePath}/docs/InformeInicialTFG_DanielGarciaNilo_TFG.pdf`,
        action: 'download',
      },
      {
        title: 'Informe de Progreso I',
        type: 'pdf',
        description: 'Seguimiento del primer bloque de avance y decisiones tecnicas.',
        url: `${tfgBasePath}/docs/InfromeDeProgres1_DanielGarciaNilo_TFG.pdf`,
        action: 'download',
      },
      {
        title: 'Informe de Progreso II',
        type: 'pdf',
        description: 'Evolucion del desarrollo, validacion y ajustes del sistema.',
        url: `${tfgBasePath}/docs/InfromeDeProgres2_DanielGarciaNilo_TFG.pdf`,
        action: 'download',
      },
      {
        title: 'Informe Final',
        type: 'pdf',
        description: 'Memoria final con analisis, arquitectura, resultados y conclusiones.',
        url: `${tfgBasePath}/docs/InformeFinal_DanielGarciaNilo_TFG.pdf`,
        action: 'download',
      },
      {
        title: 'Estudio de Viabilidad',
        type: 'pdf',
        description: 'Analisis de alcance, recursos, planificacion y viabilidad del proyecto.',
        url: `${tfgBasePath}/docs/Estudi_de_Viabilitat_del_Projecte.pdf`,
        action: 'download',
      },
      {
        title: 'Estudio Etico y Legal',
        type: 'pdf',
        description: 'Revision de implicaciones eticas, legales y de tratamiento de informacion.',
        url: `${tfgBasePath}/docs/Estudi_Etic_Legal_del_Projecte.pdf`,
        action: 'download',
      },
      {
        title: 'Presupuesto',
        type: 'pdf',
        description: 'Estimacion economica y recursos asociados al desarrollo.',
        url: `${tfgBasePath}/docs/Pressupost_del_Projecte.pdf`,
        action: 'download',
      },
      {
        title: 'Codi Font / Aviso de confidencialidad',
        type: 'code',
        description:
          'El codigo fuente no se publica por motivos de propiedad intelectual y confidencialidad.',
        action: 'view',
        available: false,
      },
      {
        title: 'Manual de Usuario',
        type: 'pdf',
        description: 'Guia funcional para entender el uso del modulo y sus principales flujos.',
        action: 'download',
        available: false,
      },
      {
        title: 'Diagramas del Proyecto',
        type: 'diagram',
        description: 'Diagramas de arquitectura, datos, componentes y flujos conversacionales.',
        url: `${tfgBasePath}/docs/Diagrames_del_projecte.pdf`,
        action: 'view',
      },
      {
        title: 'Lista de Cambios',
        type: 'excel',
        description: 'Registro de cambios, iteraciones y seguimiento documental.',
        action: 'download',
        available: false,
      },
    ],
    videos: [
      {
        title: 'Demo del sistema',
        type: 'video',
        description: 'Espacio preparado para anadir una demostracion local del modulo.',
        url: `${tfgBasePath}/videos/demo.mp4`,
        poster: `${tfgBasePath}/images/captura-1.png`,
      },
    ],
    gallery: [
      {
        title: 'Captura del modulo',
        src: `${tfgBasePath}/images/captura-1.png`,
        alt: 'Captura principal del modulo de chatbots',
        description: 'Espacio para evidencias visuales, pruebas o pantallas del proyecto.',
      },
      {
        title: 'Arquitectura y pruebas',
        src: `${tfgBasePath}/images/captura-2.png`,
        alt: 'Captura de arquitectura o pruebas del proyecto',
        description: 'Puede sustituirse por diagramas, resultados o capturas funcionales.',
      },
    ],
    notes: [
      'El codigo fuente no se incluye por motivos de propiedad intelectual y confidencialidad, pero el proyecto esta documentado mediante diagramas, arquitectura, descripcion funcional y modelos de datos.',
      'Algunos recursos pueden estar limitados por motivos de confidencialidad, propiedad intelectual o contexto academico/profesional.',
    ],
  },
  {
    title: 'Expected Goals xG - StatsBomb',
    slug: 'expected-goals-xg-statsbomb',
    subtitle: 'Dossier de Data Science aplicado al futbol',
    author: 'Daniel Garcia Nilo',
    description:
      'Notebook de Data Science para construir y evaluar un modelo de Expected Goals con datos abiertos de StatsBomb.',
    longDescription:
      'Proyecto centrado en modelar la probabilidad de gol de cada tiro mediante feature engineering futbolistico, modelos supervisados, evaluacion, calibracion y visualizacion de resultados. La pagina queda preparada para incorporar notebook, memoria, graficas, pruebas y entregables del proyecto.',
    category: 'master',
    status: 'en_proceso',
    technologies: ['Python', 'StatsBomb', 'Pandas', 'scikit-learn', 'XGBoost', 'Matplotlib', 'Seaborn'],
    colorTheme: {
      primary: '#2B7FFF',
      soft: 'rgba(43, 127, 255, 0.1)',
    },
    coverImage: '/images/projects/expected-goals-xg-statsbomb.jpg',
    resources: [
      pendingResource('expected-goals-xg-statsbomb', 'Memoria / Notebook del proyecto'),
    ],
    videos: [],
    gallery: [
      {
        title: 'Visualizacion principal',
        src: `${projectBasePath('expected-goals-xg-statsbomb')}/images/captura-1.png`,
        alt: 'Visualizacion del modelo Expected Goals',
        description: 'Espacio para graficas, metricas o resultados del modelo.',
      },
    ],
    notes: ['Dossier preparado para incorporar entregables del master, notebook final, graficas y pruebas del modelo.'],
  },
  {
    title: 'FindIt',
    slug: 'find-it',
    subtitle: 'Dossier de backend serverless y vision artificial',
    author: 'Daniel Garcia Nilo',
    description:
      'Backend serverless para un juego de retos visuales con validacion automatica de fotografias mediante Google Cloud Vision y Firebase.',
    longDescription:
      'Aplicacion gamificada en la que el usuario recibe retos visuales, fotografia objetos y el backend valida las imagenes automaticamente. La pagina queda preparada para documentar arquitectura serverless, reglas de validacion, endpoints, pruebas y demo.',
    category: 'backend',
    status: 'terminado',
    technologies: ['TypeScript', 'Firebase', 'Cloud Functions', 'Google Cloud Vision API', 'Backend'],
    colorTheme: {
      primary: '#158A78',
      soft: 'rgba(21, 138, 120, 0.1)',
    },
    coverImage: '/images/projects/find-it.jpg',
    githubUrl: 'https://github.com/danielgarciaN/find-it',
    resources: [
      githubResource('https://github.com/danielgarciaN/find-it'),
      {
        title: 'Informe Hackathon',
        type: 'pdf',
        description: 'Documento del proyecto FindIt presentado en contexto hackathon.',
        url: `${projectBasePath('find-it')}/docs/INFORME HACKATHON.pdf`,
        action: 'download',
      },
    ],
    videos: [],
    gallery: [
      {
        title: 'Prueba visual',
        src: `${projectBasePath('find-it')}/images/captura-1.png`,
        alt: 'Captura del juego FindIt',
        description: 'Espacio para capturas de la app, retos o validaciones.',
      },
    ],
    notes: ['Dossier preparado para anadir demo, pruebas de Cloud Vision y diagramas de la arquitectura Firebase.'],
  },
  {
    title: 'LoL Win Prediction',
    slug: 'lol-win-prediction',
    subtitle: 'Dossier de machine learning competitivo',
    author: 'Daniel Garcia Nilo',
    description:
      'Modelo de machine learning para predecir el equipo ganador en partidas de League of Legends usando datos reales.',
    longDescription:
      'Proyecto de Data Science con foco en limpieza de datos, feature engineering, prevencion de data leakage, entrenamiento de modelos y analisis de resultados. La pagina esta lista para incorporar notebook, dataset documentado, metricas, graficas y conclusiones.',
    category: 'data-science',
    status: 'terminado',
    technologies: ['Python', 'Pandas', 'scikit-learn', 'XGBoost', 'Matplotlib', 'Jupyter'],
    colorTheme: {
      primary: '#6D5BD0',
      soft: 'rgba(109, 91, 208, 0.1)',
    },
    coverImage: '/images/projects/lol-win-prediction.jpg',
    githubUrl: 'https://github.com/danielgarciaN/lol-win-prediction',
    resources: [
      githubResource('https://github.com/danielgarciaN/lol-win-prediction'),
      {
        title: 'Presentacion del proyecto',
        type: 'presentation',
        description: 'Presentacion explicativa del modelo, enfoque y resultados del proyecto.',
        url: `${projectBasePath('lol-win-prediction')}/docs/presentacion.pdf`,
        action: 'download',
      },
    ],
    videos: [],
    gallery: [
      {
        title: 'Resultados del modelo',
        src: `${projectBasePath('lol-win-prediction')}/images/captura-1.png`,
        alt: 'Resultados del modelo LoL Win Prediction',
        description: 'Espacio para metricas, matrices o graficas del entrenamiento.',
      },
    ],
    notes: ['Dossier preparado para documentar el pipeline de datos, los experimentos y la evaluacion del modelo.'],
  },
  {
    title: 'FutbolData',
    slug: 'futbol-data',
    subtitle: 'Dossier de analisis y visualizacion de datos de futbol',
    author: 'Daniel Garcia Nilo',
    description:
      'Scripts de analisis y visualizacion de datos de futbol: mapas de calor, redes de pases, posesion y valoracion de jugadores.',
    longDescription:
      'Repositorio orientado a transformar datos deportivos en visualizaciones tacticas e interpretables. La pagina queda preparada para centralizar notebooks, graficas, ejemplos, capturas y explicaciones metodologicas.',
    category: 'data-science',
    status: 'terminado',
    technologies: ['Python', 'Pandas', 'Matplotlib', 'Data Analysis'],
    colorTheme: {
      primary: '#2F7D4F',
      soft: 'rgba(47, 125, 79, 0.1)',
    },
    coverImage: '/images/projects/futbol-data.jpg',
    githubUrl: 'https://github.com/danielgarciaN/futbol-data',
    resources: [
      githubResource('https://github.com/danielgarciaN/futbol-data'),
      pendingResource('futbol-data', 'Informe de analisis'),
    ],
    videos: [],
    gallery: [
      {
        title: 'Visualizacion tactica',
        src: `${projectBasePath('futbol-data')}/images/captura-1.png`,
        alt: 'Visualizacion de datos de futbol',
        description: 'Espacio para mapas de calor, redes de pases o graficas tacticas.',
      },
    ],
    notes: ['Dossier preparado para anadir ejemplos visuales, datasets usados y explicacion de cada grafica.'],
  },
  {
    title: 'Tofu Awards',
    slug: 'tofu-awards',
    subtitle: 'Dossier de aplicacion web y despliegue',
    author: 'Daniel Garcia Nilo',
    description:
      'Aplicacion web para gestionar y votar premios, desplegada con Firebase Hosting y CI/CD con GitHub Actions.',
    longDescription:
      'Proyecto web centrado en frontend, despliegue y automatizacion. La pagina queda preparada para documentar flujo de usuario, arquitectura de hosting, capturas, demo, decisiones tecnicas y pipeline de despliegue.',
    category: 'web-app',
    status: 'terminado',
    technologies: ['JavaScript', 'CSS', 'HTML', 'Firebase', 'GitHub Actions'],
    colorTheme: {
      primary: '#C27A19',
      soft: 'rgba(194, 122, 25, 0.12)',
    },
    coverImage: '/images/projects/tofu-awards.jpg',
    githubUrl: 'https://github.com/danielgarciaN/tofu-awards',
    resources: [
      githubResource('https://github.com/danielgarciaN/tofu-awards'),
      pendingResource('tofu-awards', 'Documentacion funcional'),
    ],
    videos: [],
    gallery: [
      {
        title: 'Interfaz de votacion',
        src: `${projectBasePath('tofu-awards')}/images/captura-1.png`,
        alt: 'Captura de Tofu Awards',
        description: 'Espacio para pantallas de votacion, categorias o resultados.',
      },
    ],
    notes: ['Dossier preparado para anadir capturas, demo online y detalles del despliegue con Firebase.'],
  },
  {
    title: 'UNImate',
    slug: 'unimate',
    subtitle: 'Dossier de proyecto academico colaborativo',
    author: 'Daniel Garcia Nilo',
    description:
      'Proyecto academico colaborativo para facilitar la organizacion universitaria y la conexion entre estudiantes.',
    longDescription:
      'Aplicacion desarrollada en equipo con enfoque en organizacion, colaboracion y experiencia de usuario para estudiantes. La pagina queda preparada para recoger memoria, roles, capturas, presentacion, decisiones de diseno y recursos del proyecto.',
    category: 'universidad',
    status: 'terminado',
    technologies: ['React', 'Node.js', 'Firebase', 'CSS', 'Trabajo en equipo'],
    colorTheme: {
      primary: '#4A7C9B',
      soft: 'rgba(74, 124, 155, 0.1)',
    },
    coverImage: '/images/projects/unimate.JPG',
    githubUrl: 'https://github.com/danielgarciaN/Unimate',
    resources: [
      githubResource('https://github.com/danielgarciaN/Unimate'),
      {
        title: 'Memoria UNImate',
        type: 'pdf',
        description: 'Memoria academica del proyecto colaborativo UNImate.',
        url: `${projectBasePath('unimate')}/docs/Memoria UNImate.pdf`,
        action: 'download',
      },
      {
        title: 'Documento de Especificaciones',
        type: 'pdf',
        description: 'Documento de especificaciones funcionales y tecnicas del proyecto.',
        url: `${projectBasePath('unimate')}/docs/UNImate_ Document d'Especificacions (V3.0).pdf`,
        action: 'download',
      },
      {
        title: 'Documento de Vision',
        type: 'pdf',
        description: 'Documento de vision del producto y alcance funcional.',
        url: `${projectBasePath('unimate')}/docs/UNImate_Document de visió.docx.pdf`,
        action: 'download',
      },
    ],
    videos: [
      {
        title: 'Demo UNImate',
        type: 'video',
        description: 'Video demostrativo del proyecto UNImate.',
        url: `${projectBasePath('unimate')}/videos/unimate.mp4`,
      },
    ],
    gallery: [
      {
        title: 'Interfaz academica',
        src: `${projectBasePath('unimate')}/images/captura-1.png`,
        alt: 'Captura de UNImate',
        description: 'Espacio para capturas de organizacion, tareas o colaboracion.',
      },
    ],
    notes: ['Dossier preparado para documentar aportaciones, funcionalidades, capturas y presentacion del proyecto.'],
  },
];

export function getProjectDossierBySlug(slug: string) {
  return projectDossiers.find((project) => project.slug === slug) ?? null;
}
