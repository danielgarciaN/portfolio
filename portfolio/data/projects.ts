import { existsSync } from 'node:fs';
import path from 'node:path';
import type { ProjectDossier, ProjectGalleryImage, ProjectResource, ProjectVideo } from '@/types';

const tfgBasePath = '/projects/tfg-modulo-chatbots';
const projectBasePath = (slug: string) => `/projects/${slug}`;
const statisticalSalesBasePath = projectBasePath('statistical-sales-analysis');
const globalElectronicsBasePath = projectBasePath('global-electronics-powerbi');
const publicRoot = getPublicRoot();

function getPublicRoot() {
  const candidates = [
    path.join(process.cwd(), 'public'),
    path.join(process.cwd(), 'portfolio', 'public'),
  ];

  return candidates.find((candidate) => existsSync(candidate)) ?? candidates[0];
}

function isExternalUrl(url?: string) {
  return Boolean(url && /^(https?:|mailto:|tel:)/.test(url));
}

function publicAssetExists(url?: string) {
  if (!url) return false;
  if (isExternalUrl(url)) return true;

  const cleanPath = url.split(/[?#]/)[0];
  const assetPath = decodeURIComponent(cleanPath).replace(/^\/+/, '');

  return existsSync(path.join(publicRoot, assetPath));
}

function visibleResource(resource: ProjectResource) {
  if (resource.available === false || !resource.url) return false;
  return isExternalUrl(resource.url) || publicAssetExists(resource.url);
}

function visibleVideo(video: ProjectVideo) {
  return isExternalUrl(video.url) || publicAssetExists(video.url);
}

function visibleGalleryImage(image: ProjectGalleryImage) {
  return publicAssetExists(image.src);
}

function normalizeDossier(project: ProjectDossier): ProjectDossier {
  return {
    ...project,
    coverImage: publicAssetExists(project.coverImage) ? project.coverImage : undefined,
    logo: publicAssetExists(project.logo) ? project.logo : undefined,
    resources: project.resources.filter(visibleResource),
    videos: project.videos
      .filter(visibleVideo)
      .map((video) => ({
        ...video,
        poster: publicAssetExists(video.poster) ? video.poster : undefined,
      })),
    gallery: project.gallery.filter(visibleGalleryImage),
  };
}

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

const rawProjectDossiers: ProjectDossier[] = [
  {
    title: 'StatsBomb SQL Analytics',
    slug: 'statsbomb-sql-analytics',
    subtitle: 'Base de datos relacional y analisis de negocio aplicado al futbol',
    author: 'Daniel Garcia Nilo',
    description:
      'Proyecto de master centrado en disenar una base de datos relacional en MySQL a partir de datos abiertos de StatsBomb para obtener valor de negocio mediante SQL.',
    longDescription:
      'El proyecto transforma datos futbolisticos de StatsBomb en un modelo relacional preparado para analisis exploratorio. Incluye diseno conceptual y logico, definicion de tablas, claves primarias y foraneas, restricciones, limpieza, validacion e insights sobre jugadores, equipos y competiciones.',
    category: 'master',
    status: 'terminado',
    technologies: ['SQL', 'MySQL', 'Data Modeling', 'Data Analysis', 'Business Intelligence', 'StatsBomb'],
    colorTheme: {
      primary: '#256B4E',
      soft: 'rgba(37, 107, 78, 0.11)',
    },
    coverImage: '/images/projects/model.jpg',
    resources: [
      {
        title: 'Repositorio GitHub',
        type: 'code',
        description: 'Codigo fuente del proyecto SQL, documentacion, scripts y estructura de datos.',
        url: 'https://github.com/danielgarciaN/player-match-stats-sql',
        action: 'external',
      },
      {
        title: 'Video de presentacion',
        type: 'video',
        description: 'Presentacion del proyecto y explicacion del enfoque de analisis con SQL.',
        url: 'https://www.loom.com/share/2bcabd1eb1344d5cb5fde0393808aa6b',
        action: 'external',
      },
      {
        title: 'Scripts SQL',
        type: 'code',
        description: 'Espacio preparado para anadir schema, carga, limpieza y consultas analiticas.',
        url: `${projectBasePath('statsbomb-sql-analytics')}/docs/scripts-sql.zip`,
        action: 'download',
        available: false,
      },
      {
        title: 'Memoria / PDF tecnico',
        type: 'pdf',
        description: 'Placeholder para memoria, informe o documentacion academica del proyecto.',
        url: `${projectBasePath('statsbomb-sql-analytics')}/docs/memoria.pdf`,
        action: 'download',
        available: false,
      },
      {
        title: 'Diagramas del modelo',
        type: 'diagram',
        description: 'Espacio preparado para diagramas entidad-relacion, capturas o anexos del modelo relacional.',
        url: `${projectBasePath('statsbomb-sql-analytics')}/docs/diagramas.pdf`,
        action: 'view',
        available: false,
      },
    ],
    videos: [],
    gallery: [
      {
        title: 'Modelo relacional',
        src: '/images/projects/model.jpg',
        alt: 'Modelo relacional del proyecto StatsBomb SQL Analytics',
        description: 'Diagrama principal del modelo de datos utilizado para organizar jugadores, equipos, competiciones, partidos y estadisticas.',
      },
      {
        title: 'Espacio para capturas SQL',
        src: `${projectBasePath('statsbomb-sql-analytics')}/images/model.jpg`,
        alt: 'Captura o diagrama adicional del proyecto SQL',
        description: 'Espacio preparado para incorporar capturas de consultas, resultados, vistas de negocio o diagramas adicionales.',
      },
    ],
    detailSections: [
      {
        eyebrow: 'Contexto',
        title: 'Datos abiertos de futbol orientados a decision',
        body: [
          'El proyecto nace dentro del Master en Data Science como ejercicio completo de modelado, limpieza y analisis con SQL sobre un dominio deportivo real.',
          'StatsBomb proporciona datos abiertos de competiciones, partidos, equipos y jugadores. El reto consiste en convertir esa informacion en una estructura relacional consultable, consistente y util para responder preguntas de negocio deportivo.',
          'El enfoque no se limita a almacenar datos: el modelo se plantea para facilitar lectura analitica, comparacion entre competiciones y evaluacion del rendimiento individual y colectivo.',
        ],
      },
      {
        eyebrow: 'Arquitectura de datos',
        title: 'Modelo relacional normalizado',
        body: [
          'La arquitectura separa una tabla principal de hechos, player_match_stats, de las dimensiones player, team, competition y football_match. Esta granularidad permite representar una fila por jugador y partido.',
          'Las claves primarias identifican de forma unica cada entidad y las claves foraneas conectan estadisticas con jugadores, equipos, partidos y competiciones, manteniendo integridad referencial.',
          'El diseno evita duplicidades, facilita consultas agregadas y deja el modelo preparado para vistas de negocio, indices y funciones SQL personalizadas.',
        ],
      },
      {
        eyebrow: 'Modelo relacional',
        title: 'Entidades, relaciones y evidencia visual',
        body: [
          'El dossier deja preparada una zona de evidencias para diagramas entidad-relacion, capturas del modelo, resultados de consultas y anexos visuales.',
          'El modelo principal organiza equipos, competiciones, partidos, jugadores y estadisticas de rendimiento para permitir analisis por competicion, localia, eficiencia ofensiva, dependencia de jugadores y evolucion temporal.',
          'La imagen principal del proyecto funciona como primera evidencia visual y puede complementarse con nuevas capturas dentro de public/projects/statsbomb-sql-analytics/images.',
        ],
      },
      {
        eyebrow: 'Resultados',
        title: 'Consultas analiticas e insights de negocio',
        body: [
          'Las consultas responden preguntas como que competiciones tienen mayor promedio de goles, donde pesa mas jugar como local, que equipos son mas eficientes de cara a gol y que jugadores destacan por posicion o rendimiento por minuto.',
          'Tambien se analiza la dependencia ofensiva de los equipos respecto a jugadores concretos, la evolucion anual del promedio de goles y la relacion entre eficiencia ofensiva y rating medio.',
          'El valor principal esta en transformar un dataset deportivo en informacion accionable para comparar rendimiento, detectar perfiles infravalorados y explicar patrones competitivos.',
        ],
      },
      {
        eyebrow: 'Aprendizajes',
        title: 'SQL avanzado aplicado a valor de negocio',
        body: [
          'El proyecto consolida competencias de modelado relacional, normalizacion, integridad referencial, validacion de datos y diseno de estructuras consultables.',
          'A nivel analitico se trabajan agregaciones, joins, subconsultas, CTEs, funciones ventana, vistas, indices, transacciones y funciones SQL personalizadas.',
          'El aprendizaje transversal es conectar tecnica y negocio: partir de datos reales, limpiarlos, estructurarlos y convertirlos en conclusiones interpretables.',
        ],
      },
    ],
    notes: [
      'La estructura de recursos queda preparada para anadir README, PDF, scripts SQL, diagramas, capturas y entregables adicionales sin cambiar la arquitectura del dossier.',
      'Proyecto finalizado dentro del Master en Data Science, con foco en modelado de datos, analisis SQL y extraccion de valor de negocio a partir de datos deportivos.',
    ],
  },
  {
    title: 'AI Marketing Intelligence Platform',
    slug: 'marketing-ia',
    subtitle: 'Plataforma enterprise de inteligencia de marketing multiagente',
    author: 'Daniel Garcia Nilo',
    description:
      'Plataforma en progreso que transforma datos transaccionales de ecommerce en estrategia de marketing accionable mediante LangGraph, RAG, ML clasico y un dashboard Next.js.',
    longDescription:
      'Sistema de analitica de marketing con scoring RFM, clustering KMeans, segmentacion de clientes, prediccion de churn, simulacion de campanas y una capa multiagente de IA. El backend FastAPI orquesta agentes especializados con LangGraph, consulta conocimiento documental mediante RAG sobre Qdrant y puede funcionar gratis con modelos locales de Ollama, ademas de soportar OpenAI o modo mock para desarrollo.',
    category: 'personal',
    status: 'terminado',
    technologies: [
      'LangGraph',
      'FastAPI',
      'Ollama',
      'Qdrant',
      'RAG',
      'Next.js',
      'TypeScript',
      'Pandas',
      'scikit-learn',
      'Docker',
    ],
    colorTheme: {
      primary: '#0F766E',
      soft: 'rgba(15, 118, 110, 0.11)',
    },
    coverImage: '/images/projects/marketing-ia.jpg',
    githubUrl: 'https://github.com/danielgarciaN/marketing-ia',
    resources: [
      githubResource('https://github.com/danielgarciaN/marketing-ia'),
      pendingResource('marketing-ia', 'Documentacion tecnica / README extendido'),
    ],
    videos: [],
    gallery: [
      {
        title: 'Dashboard y simulador de campanas',
        src: `${projectBasePath('marketing-ia')}/images/captura-1.png`,
        alt: 'Dashboard de AI Marketing Intelligence Platform',
        description: 'Espacio preparado para capturas del dashboard, KPIs, segmentos y simulador de campanas.',
      },
      {
        title: 'Arquitectura multiagente',
        src: `${projectBasePath('marketing-ia')}/images/captura-2.png`,
        alt: 'Arquitectura LangGraph y RAG del proyecto marketing-ia',
        description: 'Espacio para diagramas del flujo supervisor, agentes, RAG, FastAPI y Qdrant.',
      },
    ],
    detailSections: [
      {
        eyebrow: 'Contexto',
        title: 'Analitica de marketing con capa multiagente',
        body: [
          'Proyecto en progreso orientado a transformar datos transaccionales de ecommerce en recomendaciones accionables para marketing y negocio.',
          'La propuesta combina analitica de clientes, modelos de Machine Learning y una capa de agentes que razonan sobre KPIs, segmentos, playbooks y simulacion de campanas.',
        ],
      },
      {
        eyebrow: 'Workflow',
        title: 'De datos transaccionales a decisiones',
        steps: ['Ecommerce Data', 'RFM Scoring', 'Clustering', 'Churn Prediction', 'Campaign Simulation', 'RAG', 'Agents', 'Dashboard'],
      },
      {
        eyebrow: 'Arquitectura',
        title: 'Backend de analitica e IA',
        items: [
          'FastAPI como capa backend',
          'LangGraph para orquestacion multiagente',
          'Qdrant como vector store para RAG',
          'Ollama local, OpenAI o modo mock para desarrollo',
          'Dashboard Next.js y TypeScript',
          'Pandas y scikit-learn para analitica y modelos clasicos',
        ],
      },
      {
        eyebrow: 'Estado',
        title: 'Proyecto en progreso',
        body: [
          'El dossier mantiene el proyecto como en proceso. No se muestran metricas finales porque todavia no hay resultados cerrados documentados en los recursos locales.',
        ],
      },
    ],
    notes: [
      'Proyecto en progreso orientado a demostrar AI Engineering aplicado a negocio: orquestacion multiagente, RAG, analitica ML, API REST y dashboard interactivo.',
      'La arquitectura soporta Ollama local, OpenAI y modo mock para facilitar pruebas sin costes ni dependencias externas obligatorias.',
    ],
    translations: {
      en: {
        subtitle: 'Enterprise multi-agent marketing intelligence platform',
        description:
          'Work-in-progress project that turns ecommerce transactional data into actionable marketing strategy through LangGraph, RAG, classic ML and a Next.js dashboard.',
        longDescription:
          'Marketing analytics system with RFM scoring, KMeans clustering, customer segmentation, churn prediction, campaign simulation and a multi-agent AI layer. The FastAPI backend orchestrates specialized agents with LangGraph, queries documentary knowledge through RAG on Qdrant and can run with local Ollama models, OpenAI or mock mode for development.',
        detailSections: [
          {
            eyebrow: 'Context',
            title: 'Marketing analytics with a multi-agent layer',
            body: [
              'Work-in-progress project focused on turning ecommerce transactional data into actionable recommendations for marketing and business.',
              'The proposal combines customer analytics, Machine Learning models and an agent layer that reasons about KPIs, segments, playbooks and campaign simulation.',
            ],
          },
          {
            eyebrow: 'Workflow',
            title: 'From transactional data to decisions',
            steps: ['Ecommerce Data', 'RFM Scoring', 'Clustering', 'Churn Prediction', 'Campaign Simulation', 'RAG', 'Agents', 'Dashboard'],
          },
          {
            eyebrow: 'Architecture',
            title: 'Analytics and AI backend',
            items: [
              'FastAPI as backend layer',
              'LangGraph for multi-agent orchestration',
              'Qdrant as vector store for RAG',
              'Local Ollama, OpenAI or mock mode for development',
              'Next.js and TypeScript dashboard',
              'Pandas and scikit-learn for analytics and classic models',
            ],
          },
          {
            eyebrow: 'Status',
            title: 'Work in progress',
            body: [
              'The dossier keeps the project marked as in progress. No final metrics are shown because there are no closed results documented in local resources yet.',
            ],
          },
        ],
        notes: [
          'Work-in-progress project aimed at demonstrating business-oriented AI Engineering: multi-agent orchestration, RAG, ML analytics, REST API and interactive dashboard.',
          'The architecture supports local Ollama, OpenAI and mock mode to simplify testing without mandatory external costs or dependencies.',
        ],
      },
    },
  },
  {
    title: 'TFG - Modulo de Chatbots',
    slug: 'tfg-modulo-chatbots',
    subtitle: 'Dossier documental del Trabajo Final de Grado',
    author: 'Daniel Garcia Nilo',
    description:
      'Proyecto de Trabajo Final de Grado centrado en el diseno y desarrollo de un modulo de agentes conversacionales/chatbots.',
    longDescription:
      'Sistema orientado al diseno de agentes conversacionales parametrizables, con documentacion funcional y tecnica, modelos de datos, arquitectura, analisis del sistema y recursos de seguimiento del proyecto. El dossier funciona como indice central para consultar informes, estudios, diagramas, manuales y pruebas relacionadas.',
    categories: ['universidad'],
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
        title: 'Resumen de diagramas',
        src: `${tfgBasePath}/images/diagrams-overview.png`,
        alt: 'Pagina de introduccion del documento de diagramas del TFG',
        description: 'Documento real de diagramas con modelos conceptuales, flujos y estructuras de datos del modulo.',
      },
      {
        title: 'Modelo final',
        src: `${tfgBasePath}/images/final-model-diagram.png`,
        alt: 'Pagina del documento de diagramas con modelo final del TFG',
        description: 'Evidencia visual del rediseño hacia el modelo configurable por agente.',
      },
    ],
    detailSections: [
      {
        eyebrow: 'Contexto',
        title: 'Modulo de agentes conversacionales para IATech',
        body: [
          'El objetivo fue disenar y analizar un modulo escalable para gestionar agentes conversacionales dentro del entorno corporativo de IATech.',
          'La propuesta se integra en un ecosistema corporativo de automatizacion con bus de eventos Kafka y acciones backend para gestionar solicitudes en tiempo real.',
        ],
      },
      {
        eyebrow: 'Objetivo',
        title: 'Arquitectura flexible, configurable y reutilizable',
        body: [
          'El proyecto busca establecer una base funcional para disenar y desplegar chatbots especializados capaces de automatizar procesos, interactuar con usuarios y gestionar flujos conversacionales con autonomia.',
        ],
      },
      {
        eyebrow: 'Evolucion tecnica',
        title: 'De modelo estructurado a parametrizacion por agente',
        steps: ['Analisis funcional', 'Modelo por pasos', 'PoC', 'Rediseño arquitectonico', 'TipoAgente', 'Clave-valor'],
        body: [
          'El analisis inicial partia de multiples entidades compartidas. Durante el desarrollo se opto por una reformulacion centrada en la parametrizacion individualizada de cada agente.',
          'El nuevo modelo encapsula logica, estados, prompts y acciones en un registro de base de datos mediante pares clave-valor, mejorando mantenimiento, escalabilidad y despliegue de nuevos agentes.',
        ],
      },
      {
        eyebrow: 'Validacion',
        title: 'Proof of Concept de incidencias',
        body: [
          'Se implemento una PoC orientada a la gestion de incidencias informaticas. La prueba confirmo la viabilidad del diseno y su capacidad para gestionar flujos configurables.',
        ],
      },
      {
        eyebrow: 'Aprendizajes',
        title: 'Arquitectura, trazabilidad y decisiones pragmáticas',
        items: [
          'Diseño de agentes autonomos y configurables',
          'Modelado de datos para flujos conversacionales',
          'Replanteamiento arquitectonico para evitar sobreingenieria',
          'Documentacion funcional y tecnica',
          'ScrumBan aplicado a un proyecto con analisis conceptual y PoC',
        ],
      },
    ],
    notes: [
      'El codigo fuente no se incluye por motivos de propiedad intelectual y confidencialidad, pero el proyecto esta documentado mediante diagramas, arquitectura, descripcion funcional y modelos de datos.',
      'Algunos recursos pueden estar limitados por motivos de confidencialidad, propiedad intelectual o contexto academico/profesional.',
    ],
    translations: {
      en: {
        title: 'Final Degree Project - Chatbots Module',
        subtitle: 'Documentary dossier for the Final Degree Project',
        description:
          'Final Degree Project focused on designing and developing a conversational agents/chatbots module.',
        longDescription:
          'System focused on the design of configurable conversational agents, with functional and technical documentation, data models, architecture, system analysis and project tracking resources. The dossier acts as a central index for reports, studies, diagrams, manuals and tests.',
        gallery: [
          {
            title: 'Diagrams overview',
            src: `${tfgBasePath}/images/diagrams-overview.png`,
            alt: 'Introduction page from the FGP diagrams document',
            description: 'Real diagrams document with conceptual models, flows and data structures for the module.',
          },
          {
            title: 'Final model',
            src: `${tfgBasePath}/images/final-model-diagram.png`,
            alt: 'Diagrams document page with the final FGP model',
            description: 'Visual evidence of the redesign toward a configurable per-agent model.',
          },
        ],
        detailSections: [
          {
            eyebrow: 'Context',
            title: 'Conversational agents module for IATech',
            body: [
              'The objective was to design and analyze a scalable module for managing conversational agents within IATech’s corporate environment.',
              'The proposal integrates with a corporate automation ecosystem using a Kafka event bus and backend actions to manage requests in real time.',
            ],
          },
          {
            eyebrow: 'Objective',
            title: 'Flexible, configurable and reusable architecture',
            body: [
              'The project establishes a functional foundation for designing and deploying specialized chatbots able to automate processes, interact with users and manage conversational flows autonomously.',
            ],
          },
          {
            eyebrow: 'Technical Evolution',
            title: 'From structured model to per-agent parameterization',
            steps: ['Functional analysis', 'Step model', 'PoC', 'Architectural redesign', 'TipoAgente', 'Key-value'],
            body: [
              'The initial analysis started from multiple shared entities. During development, the architecture was reformulated around individualized parameterization for each agent.',
              'The new model encapsulates logic, states, prompts and actions in a database record using key-value pairs, improving maintenance, scalability and deployment of new agents.',
            ],
          },
          {
            eyebrow: 'Validation',
            title: 'IT incident management Proof of Concept',
            body: [
              'A PoC focused on IT incident management was implemented. The test confirmed the feasibility of the design and its ability to manage configurable flows.',
            ],
          },
          {
            eyebrow: 'Learnings',
            title: 'Architecture, traceability and pragmatic decisions',
            items: [
              'Design of autonomous and configurable agents',
              'Data modeling for conversational flows',
              'Architectural redesign to avoid overengineering',
              'Functional and technical documentation',
              'ScrumBan applied to a project with conceptual analysis and PoC',
            ],
          },
        ],
        notes: [
          'The source code is not included for intellectual property and confidentiality reasons, but the project is documented through diagrams, architecture, functional description and data models.',
          'Some resources may be limited due to confidentiality, intellectual property or academic/professional context.',
        ],
      },
    },
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
    status: 'terminado',
    technologies: ['Python', 'StatsBomb', 'Pandas', 'scikit-learn', 'XGBoost', 'Matplotlib', 'Seaborn'],
    colorTheme: {
      primary: '#2B7FFF',
      soft: 'rgba(43, 127, 255, 0.1)',
    },
    coverImage: '/images/projects/expected-goals-xg-statsbomb.jpg',
    githubUrl: 'https://github.com/danielgarciaN/xG-statsbomb-master',
    resources: [
      githubResource('https://github.com/danielgarciaN/xG-statsbomb-master'),
      {
        title: 'Presentacion del proyecto',
        type: 'presentation',
        description: 'Presentacion del proyecto de master Expected Goals xG con StatsBomb.',
        url: `${projectBasePath('expected-goals-xg-statsbomb')}/docs/xG-statsbomb.pptx`,
        action: 'download',
      },
      pendingResource('expected-goals-xg-statsbomb', 'Memoria / Notebook del proyecto'),
    ],
    videos: [],
    gallery: [],
    detailSections: [
      {
        eyebrow: 'Contexto',
        title: 'Expected Goals como problema de analitica deportiva',
        body: [
          'El proyecto parte de una idea sencilla: no todos los tiros tienen la misma probabilidad de acabar en gol. El xG intenta medir esa probabilidad usando la posicion y el contexto de cada disparo.',
          'El notebook se apoya en una estructura compatible con StatsBomb Open Data y mantiene un fallback reproducible cuando los JSON originales no estan disponibles localmente.',
        ],
      },
      {
        eyebrow: 'Objetivo',
        title: 'Predecir la probabilidad de gol de cada tiro',
        items: [
          'Preparar un dataset de tiros compatible con StatsBomb Open Data',
          'Crear variables futbolisticas interpretables: distancia, angulo, parte del cuerpo, tipo de jugada, presion y zona',
          'Construir una variable propia de big_chance y una metrica de eficiencia ofensiva',
          'Comparar Logistic Regression, Random Forest y XGBoost',
          'Evaluar con ROC-AUC, Brier Score y curvas de calibracion',
        ],
      },
      {
        title: 'Visualizacion principal',
        src: '/images/projects/expected-goals-xg-statsbomb.jpg',
        alt: 'Visualizacion del modelo Expected Goals',
        description: 'Espacio para graficas, metricas o resultados del modelo.',
      },
      {
        eyebrow: 'Criterio analitico',
        title: 'Ordenar y calibrar probabilidades',
        body: [
          'La evaluacion no se centra solo en acertar goles. En xG es clave que las probabilidades esten calibradas: un conjunto de tiros con 0.10 xG deberia convertirse en gol aproximadamente el 10% de las veces.',
        ],
      },
    ],
    notes: [
      'El proyecto queda marcado como finalizado y el notebook local esta disponible como recurso consultable.',
      'No se muestran metricas numericas finales porque no aparecen como salida textual verificable en el notebook revisado.',
    ],
    translations: {
      en: {
        subtitle: 'Sports Data Analytics dossier for football Expected Goals',
        description:
          'Data Science notebook to build and evaluate an Expected Goals model using StatsBomb-style shot event data.',
        longDescription:
          'Project focused on modeling the probability that a shot becomes a goal through football feature engineering, supervised models, evaluation, calibration and visual storytelling.',
        resources: [
          {
            title: 'Expected Goals notebook',
            type: 'notebook',
            description: 'Local xG project notebook with framing, EDA, feature engineering and evaluation.',
            url: `${projectBasePath('expected-goals-xg-statsbomb')}/notebooks/expected-goals-xg-statsbomb.ipynb`,
            action: 'download',
          },
        ],
        detailSections: [
          {
            eyebrow: 'Context',
            title: 'Expected Goals as a sports analytics problem',
            body: [
              'The project starts from a simple idea: not every shot has the same probability of becoming a goal. xG tries to measure that probability using shot location and context.',
              'The notebook uses a structure compatible with StatsBomb Open Data and keeps a reproducible fallback when the original JSON files are not available locally.',
            ],
          },
          {
            eyebrow: 'Objective',
            title: 'Predict the goal probability of each shot',
            items: [
              'Prepare a shot dataset compatible with StatsBomb Open Data',
              'Create interpretable football features: distance, angle, body part, play type, pressure and zone',
              'Build a custom big_chance feature and offensive efficiency metric',
              'Compare Logistic Regression, Random Forest and XGBoost',
              'Evaluate with ROC-AUC, Brier Score and calibration curves',
            ],
          },
          {
            eyebrow: 'Pipeline',
            title: 'From shot event to calibrated probability',
            steps: ['StatsBomb Events', 'Shots Dataset', 'Cleaning', 'Football Features', 'Models', 'Calibration', 'Insights'],
          },
          {
            eyebrow: 'Analytical Judgment',
            title: 'Ranking and calibrating probabilities',
            body: [
              'Evaluation is not only about guessing goals. In xG, probabilities must be calibrated: a group of shots with 0.10 xG should become goals around 10% of the time.',
            ],
          },
        ],
        notes: [
          'The project remains marked as in progress because no final report is published in public, although the local notebook is now available as a resource.',
          'No final numeric metrics are displayed because they do not appear as verifiable textual output in the reviewed notebook.',
        ],
      },
    },
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
    categories: ['universidad', 'backend'],
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
        title: 'Arquitectura y stack',
        src: `${projectBasePath('find-it')}/images/architecture-and-stack.png`,
        alt: 'Pagina del informe FindIt con arquitectura y stack tecnologico',
        description: 'Captura real del informe con componentes frontend, Firestore, Storage, Cloud Functions y Vision API.',
      },
      {
        title: 'Capturas de la app',
        src: `${projectBasePath('find-it')}/images/app-screenshots.png`,
        alt: 'Pagina del informe FindIt con capturas del juego',
        description: 'Evidencia visual del diseño de pantallas incluida en el informe de hackathon.',
      },
    ],
    detailSections: [
      {
        eyebrow: 'Contexto',
        title: 'Juego visual con validacion automatica',
        body: [
          'FindIt es una aplicacion desarrollada para practicar Google Cloud y sus APIs. El usuario recibe retos aleatorios de objetos cotidianos y debe fotografiar el objeto indicado dentro de un margen de tiempo.',
          'La validacion se realiza en backend: la imagen se guarda en Firebase Storage, una Cloud Function la procesa y Google Vision API devuelve etiquetas que se comparan con las variantes aceptadas del reto.',
        ],
      },
      {
        eyebrow: 'Arquitectura',
        title: 'Backend serverless sobre Firebase y Google Cloud',
        steps: ['Frontend', 'Firebase Storage', 'Cloud Function', 'Vision API', 'Firestore', 'Stats'],
        items: [
          'Retos almacenados en Firestore con palabra objetivo y variantes aceptadas',
          'Usuarios con perfil, estadisticas globales y subcoleccion de partidas',
          'Imagenes subidas a Storage y eliminadas al finalizar la partida',
          'Cloud Function validate photo para orquestar la validacion',
          'Vision API para deteccion de labels en imagenes',
        ],
      },
      {
        eyebrow: 'Funcionalidades',
        title: 'Modos de juego y seguimiento',
        items: [
          'Modo Normal: la partida acaba al primer error',
          'Modo Contrarreloj: tiempo limitado para encontrar el maximo de objetos',
          'Ranking y estadisticas personales/globales',
          'Registro de partidas con objetos correctos, objetos jugados, precision, puntos y fecha',
        ],
      },
      {
        eyebrow: 'Retos tecnicos',
        title: 'Compatibilidad, Cloud Functions y priorizacion',
        body: [
          'El informe documenta una curva de aprendizaje con Google Cloud, Firebase y Cloud Functions, ademas de problemas de compatibilidad al ejecutar la app en dispositivos con Expo Go. El equipo priorizo la version web funcional para cerrar la logica principal del juego.',
        ],
      },
      {
        eyebrow: 'Aprendizajes',
        title: 'Integracion cloud en un plazo corto',
        body: [
          'El proyecto sirvio para gestionar un desarrollo de 4-5 semanas con sprints semanales, control de versiones y reparto de tareas. Daniel aparece documentado como parte del foco backend junto a Alex.',
        ],
      },
    ],
    notes: ['La informacion ampliada procede del informe de hackathon incluido como recurso del proyecto.'],
    translations: {
      en: {
        subtitle: 'Serverless backend and computer vision dossier',
        description:
          'Serverless backend for a visual challenge game that validates object photos automatically with Google Cloud Vision and Firebase.',
        longDescription:
          'Gamified application where the user receives visual challenges, photographs objects and the backend validates images automatically. The page documents the serverless architecture, validation rules, game flow and project report.',
        gallery: [
          {
            title: 'Architecture and stack',
            src: `${projectBasePath('find-it')}/images/architecture-and-stack.png`,
            alt: 'FindIt report page with architecture and technology stack',
            description: 'Real report capture with frontend, Firestore, Storage, Cloud Functions and Vision API components.',
          },
          {
            title: 'App screenshots',
            src: `${projectBasePath('find-it')}/images/app-screenshots.png`,
            alt: 'FindIt report page with game screenshots',
            description: 'Visual evidence of the screen design included in the hackathon report.',
          },
        ],
        detailSections: [
          {
            eyebrow: 'Context',
            title: 'Visual game with automated validation',
            body: [
              'FindIt is an application built to practice Google Cloud and its APIs. The user receives random everyday-object challenges and must photograph the requested object within a time limit.',
              'Validation happens in the backend: the image is saved in Firebase Storage, a Cloud Function processes it and Google Vision API returns labels that are compared with the accepted challenge variants.',
            ],
          },
          {
            eyebrow: 'Architecture',
            title: 'Serverless backend on Firebase and Google Cloud',
            steps: ['Frontend', 'Firebase Storage', 'Cloud Function', 'Vision API', 'Firestore', 'Stats'],
            items: [
              'Challenges stored in Firestore with target word and accepted variants',
              'Users with profile, global stats and games subcollection',
              'Images uploaded to Storage and removed when the game ends',
              'validate photo Cloud Function to orchestrate validation',
              'Vision API for image label detection',
            ],
          },
          {
            eyebrow: 'Features',
            title: 'Game modes and tracking',
            items: [
              'Normal mode: the game ends after the first error',
              'Time trial mode: limited time to find as many objects as possible',
              'Ranking and personal/global stats',
              'Game records with correct objects, played objects, precision, points and date',
            ],
          },
          {
            eyebrow: 'Technical Challenges',
            title: 'Compatibility, Cloud Functions and prioritization',
            body: [
              'The report documents a learning curve with Google Cloud, Firebase and Cloud Functions, plus compatibility issues when running the app on devices with Expo Go. The team prioritized a functional web version to close the main game logic.',
            ],
          },
          {
            eyebrow: 'Learnings',
            title: 'Cloud integration in a short timeline',
            body: [
              'The project helped manage a 4-5 week build with weekly sprints, version control and task distribution. Daniel is documented as part of the backend-focused work together with Alex.',
            ],
          },
        ],
        notes: ['The expanded information comes from the hackathon report included as a project resource.'],
      },
    },
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
    categories: ['universidad', 'data-science'],
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
        title: 'Estructura del proyecto',
        src: `${projectBasePath('lol-win-prediction')}/images/project-flow.png`,
        alt: 'Indice de la presentacion LoL Win Prediction',
        description: 'La presentacion organiza el proyecto desde exploracion y feature engineering hasta comparacion, optimizacion e interpretacion.',
      },
      {
        title: 'Comparacion y validacion',
        src: `${projectBasePath('lol-win-prediction')}/images/model-comparison.png`,
        alt: 'Slide de comparacion de modelos del proyecto LoL',
        description: 'Validacion train/test 80/20 y comparacion de modelos de clasificacion.',
      },
      {
        title: 'Analisis de errores',
        src: `${projectBasePath('lol-win-prediction')}/images/error-analysis.png`,
        alt: 'Slide de analisis de errores del proyecto LoL',
        description: 'Seccion dedicada a entender en que casos falla el modelo.',
      },
    ],
    detailSections: [
      {
        eyebrow: 'Contexto',
        title: 'Prediccion de victoria en League of Legends',
        body: [
          'League of Legends genera mucha informacion estrategica por partida: objetivos, momentos clave, composicion de equipos y estadisticas. El proyecto aprovecha esa estructura para predecir el equipo ganador.',
        ],
      },
      {
        eyebrow: 'Objetivo',
        title: 'Modelo predictivo realista y explicable',
        body: [
          'El objetivo fue construir un modelo capaz de estimar que equipo ganara una partida usando informacion estrategica disponible antes de que la partida este decidida, ademas de entender cuando falla el modelo y por que.',
        ],
      },
      {
        eyebrow: 'Dataset',
        title: 'Mas de 180.000 partidas y dataset final por partida',
        items: [
          'matches.csv: informacion general de cada partida',
          'participants.csv: jugadores, campeones y equipo',
          'champs.csv: informacion de mas de 150 campeones',
          'teamstats.csv: kills, muertes, asistencias, oro y minions',
          'stats1.csv y stats2.csv: objetivos y eventos de partida',
          'lol_final.csv: dataset construido con una fila por partida y 60 columnas',
        ],
      },
      {
        eyebrow: 'Feature Engineering',
        title: 'Variables estrategicas y prevencion de leakage',
        items: [
          'Variables de primeras acciones: first blood, primera torre, primer dragon, primer baron',
          'Variables de objetivos totales por equipo',
          'Estadisticas por equipo y diferencias entre equipos',
          'Variables de composicion mediante target encoding',
          'Eliminacion de identificadores, resultados duplicados y variables que revelan directamente el resultado final',
        ],
      },
      {
        eyebrow: 'Modelado',
        title: 'Comparacion, optimizacion e interpretacion',
        body: [
          'La presentacion documenta una particion train/test 80/20, comparacion de modelos de clasificacion y seleccion de XGBoost como modelo final.',
          'La optimizacion usa Randomized Search con validacion cruzada CV = 3 y ROC-AUC como criterio principal.',
        ],
        items: ['Accuracy', 'F1-score', 'ROC-AUC', 'Matriz de confusion'],
      },
      {
        eyebrow: 'Conclusiones',
        title: 'Equilibrio entre rendimiento y generalizacion',
        body: [
          'El proyecto concluye que XGBoost ofrece el mejor equilibrio entre rendimiento y generalizacion. Las variables creadas de composicion, fases y late game aportan valor real al enfoque estrategico y explicable.',
        ],
      },
    ],
    notes: [
      'La pagina no muestra metricas numericas finales porque la extraccion textual de la presentacion no proporciona esos valores de forma verificable.',
      'La informacion ampliada procede de la presentacion PDF incluida como recurso.',
    ],
    translations: {
      en: {
        subtitle: 'Competitive machine learning dossier',
        description:
          'Machine learning model to predict the winning team in League of Legends matches using real data.',
        longDescription:
          'Data Science project focused on data cleaning, feature engineering, data leakage prevention, model training and result analysis with an explainability-oriented approach.',
        gallery: [
          {
            title: 'Project structure',
            src: `${projectBasePath('lol-win-prediction')}/images/project-flow.png`,
            alt: 'LoL Win Prediction presentation outline',
            description: 'The presentation organizes the project from exploration and feature engineering to comparison, optimization and interpretation.',
          },
          {
            title: 'Comparison and validation',
            src: `${projectBasePath('lol-win-prediction')}/images/model-comparison.png`,
            alt: 'Model comparison slide from the LoL project',
            description: '80/20 train/test validation and classification model comparison.',
          },
          {
            title: 'Error analysis',
            src: `${projectBasePath('lol-win-prediction')}/images/error-analysis.png`,
            alt: 'Error analysis slide from the LoL project',
            description: 'Section dedicated to understanding when the model fails.',
          },
        ],
        detailSections: [
          {
            eyebrow: 'Context',
            title: 'League of Legends win prediction',
            body: [
              'League of Legends generates a large amount of strategic information per match: objectives, key moments, team composition and statistics. The project uses that structure to predict the winning team.',
            ],
          },
          {
            eyebrow: 'Objective',
            title: 'Realistic and explainable predictive model',
            body: [
              'The objective was to build a model able to estimate which team will win a match using strategic information available before the game is decided, while also understanding when the model fails and why.',
            ],
          },
          {
            eyebrow: 'Dataset',
            title: 'Over 180,000 matches and a final match-level dataset',
            items: [
              'matches.csv: general match information',
              'participants.csv: players, champions and team',
              'champs.csv: information about more than 150 champions',
              'teamstats.csv: kills, deaths, assists, gold and minions',
              'stats1.csv and stats2.csv: objectives and match events',
              'lol_final.csv: engineered dataset with one row per match and 60 columns',
            ],
          },
          {
            eyebrow: 'Feature Engineering',
            title: 'Strategic variables and leakage prevention',
            items: [
              'First-action variables: first blood, first tower, first dragon, first baron',
              'Total objective variables per team',
              'Team statistics and differences between teams',
              'Composition variables through target encoding',
              'Removal of identifiers, duplicated results and variables that directly reveal the final result',
            ],
          },
          {
            eyebrow: 'Modeling',
            title: 'Comparison, optimization and interpretation',
            body: [
              'The presentation documents an 80/20 train/test split, classification model comparison and XGBoost selection as the final model.',
              'Optimization uses Randomized Search with CV = 3 cross-validation and ROC-AUC as the main criterion.',
            ],
            items: ['Accuracy', 'F1-score', 'ROC-AUC', 'Confusion matrix'],
          },
          {
            eyebrow: 'Conclusions',
            title: 'Balance between performance and generalization',
            body: [
              'The project concludes that XGBoost offers the best balance between performance and generalization. The engineered composition, phase and late-game variables add real value to the strategic and explainable approach.',
            ],
          },
        ],
        notes: [
          'The page does not show final numeric metrics because the text extraction from the presentation does not provide those values in a verifiable way.',
          'The expanded information comes from the PDF presentation included as a resource.',
        ],
      },
    },
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
    categories: ['data-analytics', 'data-science'],
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
    detailSections: [
      {
        eyebrow: 'Contexto',
        title: 'Analitica y visualizacion de datos de futbol',
        body: [
          'Proyecto orientado a transformar datos deportivos en visualizaciones tacticas e interpretables, como mapas de calor, redes de pases, posesion y valoracion de jugadores.',
        ],
      },
      {
        eyebrow: 'Objetivo',
        title: 'Convertir eventos deportivos en lectura tactica',
        items: [
          'Procesar datos de futbol con Python y Pandas',
          'Construir graficas que ayuden a interpretar comportamiento colectivo e individual',
          'Comunicar patrones tacticos de forma visual',
          'Mantener scripts reutilizables para distintos analisis',
        ],
      },
      {
        eyebrow: 'Tecnologias',
        title: 'Stack de analisis reproducible',
        steps: ['Data Loading', 'Processing', 'Aggregation', 'Matplotlib', 'Tactical Visualization'],
      },
    ],
    notes: [
      'No hay documentos locales adicionales para extraer metricas o resultados cerrados; el dossier se limita a la informacion actual del proyecto y al repositorio enlazado.',
    ],
    translations: {
      en: {
        subtitle: 'Football data analysis and visualization dossier',
        description:
          'Football data analysis and visualization scripts: heatmaps, passing networks, possession and player ratings.',
        longDescription:
          'Repository focused on turning sports data into tactical and interpretable visualizations. The page centralizes the project purpose, technical approach and available repository resources.',
        detailSections: [
          {
            eyebrow: 'Context',
            title: 'Football data analytics and visualization',
            body: [
              'Project focused on turning sports data into tactical and interpretable visualizations, such as heatmaps, passing networks, possession and player rating views.',
            ],
          },
          {
            eyebrow: 'Objective',
            title: 'Turn sports events into tactical reading',
            items: [
              'Process football data with Python and Pandas',
              'Build charts that help interpret collective and individual behavior',
              'Communicate tactical patterns visually',
              'Keep reusable scripts for different analyses',
            ],
          },
          {
            eyebrow: 'Technologies',
            title: 'Reproducible analysis stack',
            steps: ['Data Loading', 'Processing', 'Aggregation', 'Matplotlib', 'Tactical Visualization'],
          },
        ],
        notes: [
          'There are no additional local documents to extract closed metrics or results from; the dossier is limited to current project information and the linked repository.',
        ],
      },
    },
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
    categories: ['web-app'],
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
    detailSections: [
      {
        eyebrow: 'Contexto',
        title: 'Aplicacion web para premios y votaciones',
        body: [
          'Tofu Awards es una aplicacion web para gestionar categorias de premios y permitir votaciones, con foco en frontend, despliegue y automatizacion.',
        ],
      },
      {
        eyebrow: 'Arquitectura',
        title: 'Frontend ligero y despliegue automatizado',
        items: [
          'Frontend con JavaScript, HTML y CSS',
          'Despliegue en Firebase Hosting',
          'Pipeline de CI/CD con GitHub Actions',
          'Repositorio publico como recurso tecnico principal',
        ],
      },
      {
        eyebrow: 'Aprendizajes',
        title: 'Producto web, hosting y automatizacion',
        body: [
          'El proyecto refuerza el flujo completo de una web sencilla: implementacion frontend, organizacion del repositorio, despliegue y automatizacion del proceso de publicacion.',
        ],
      },
    ],
    notes: [
      'No hay documentacion local adicional ni capturas publicadas para extraer mas detalles; el dossier se mantiene prudente y enlaza el repositorio.',
    ],
    translations: {
      en: {
        subtitle: 'Web application and deployment dossier',
        description:
          'Web application to manage and vote awards, deployed with Firebase Hosting and CI/CD using GitHub Actions.',
        longDescription:
          'Web project focused on frontend, deployment and automation. The page documents the product purpose, hosting architecture and technical repository resources.',
        detailSections: [
          {
            eyebrow: 'Context',
            title: 'Web application for awards and voting',
            body: [
              'Tofu Awards is a web application to manage award categories and voting, focused on frontend development, deployment and automation.',
            ],
          },
          {
            eyebrow: 'Architecture',
            title: 'Lightweight frontend and automated deployment',
            items: [
              'Frontend with JavaScript, HTML and CSS',
              'Deployment on Firebase Hosting',
              'CI/CD pipeline with GitHub Actions',
              'Public repository as the main technical resource',
            ],
          },
          {
            eyebrow: 'Learnings',
            title: 'Web product, hosting and automation',
            body: [
              'The project reinforces the full flow of a simple web app: frontend implementation, repository organization, deployment and publication automation.',
            ],
          },
        ],
        notes: [
          'There is no additional local documentation or published screenshots to extract more details from; the dossier remains conservative and links the repository.',
        ],
      },
    },
  },
  {
    title: 'UNImate',
    slug: 'unimate',
    subtitle: 'Dossier de proyecto academico colaborativo',
    author: 'Daniel Garcia Nilo',
    description:
      'Proyecto academico colaborativo para facilitar la organizacion y conexion dentro de la comunidad universitaria.',
    longDescription:
      'Aplicacion desarrollada en equipo con enfoque en organizacion, colaboracion y experiencia de usuario universitaria. La pagina queda preparada para recoger memoria, roles, capturas, presentacion, decisiones de diseno y recursos del proyecto.',
    categories: ['universidad', 'web-app'],
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
        title: 'Objetivos y requisitos',
        src: `${projectBasePath('unimate')}/images/requirements-summary.png`,
        alt: 'Pagina de la memoria de UNImate con objetivos y requisitos',
        description: 'Extracto real de la memoria con funcionalidades completadas y reparto de trabajo.',
      },
      {
        title: 'Metodologia y progreso',
        src: `${projectBasePath('unimate')}/images/methodology-and-progress.png`,
        alt: 'Pagina de la memoria de UNImate con metodologia y sprints',
        description: 'Evidencia documental del trabajo por sprints y metodologia de desarrollo.',
      },
    ],
    detailSections: [
      {
        eyebrow: 'Contexto',
        title: 'Plataforma academica para comunidad universitaria',
        body: [
          'UNImate es una aplicacion colaborativa orientada a facilitar la organizacion, conexion e informacion dentro de la comunidad universitaria.',
          'El proyecto se desarrollo en equipo y Daniel aparece documentado con rol de Front y Documentacion en el documento de especificaciones.',
        ],
      },
      {
        eyebrow: 'Funcionalidades',
        title: 'Objetivos completados del proyecto',
        items: [
          'Registro, inicio de sesion y perfiles personalizables',
          'Busqueda de informacion sobre universidades, facultades y grados',
          'Foro con publicaciones, comentarios, reacciones y filtros por categorias',
          'Red de amigos y solicitudes de amistad',
          'Mapa interactivo de universidades y facultades',
          'Chat privado y chats grupales por grado/facultad',
          'Recomendador de perfiles',
          'Verificacion de matricula',
        ],
      },
      {
        eyebrow: 'Metodologia',
        title: 'Trabajo por sprints y control de versiones',
        body: [
          'La memoria documenta tres sprints principales, captura de requisitos, control de versiones y politica de ramas. El desarrollo incluyo aprendizaje desde cero de tecnologias y resolucion de bloqueos de base de datos y entorno.',
        ],
      },
      {
        eyebrow: 'Aportacion',
        title: 'Frontend y documentacion',
        body: [
          'La documentacion indica que Daniel participo en el diseno e implementacion del frontend para las pantallas y funcionalidades principales, ademas de tareas de documentacion.',
        ],
      },
      {
        eyebrow: 'Recursos',
        title: 'Memoria, especificaciones, vision y demo',
        body: [
          'El dossier centraliza la memoria academica, el documento de especificaciones, el documento de vision y un video demostrativo ya disponible en public.',
        ],
      },
    ],
    notes: ['La informacion ampliada procede de la memoria, especificaciones y video existentes del proyecto.'],
    translations: {
      en: {
        subtitle: 'Collaborative academic project dossier',
        description:
          'Collaborative academic project to support organization and connection within the university community.',
        longDescription:
          'Team-developed application focused on organization, collaboration and university user experience. The page centralizes the report, specifications, vision document, contribution context and demo video.',
        resources: [
          githubResource('https://github.com/danielgarciaN/Unimate'),
          {
            title: 'UNImate report',
            type: 'pdf',
            description: 'Academic report for the collaborative UNImate project.',
            url: `${projectBasePath('unimate')}/docs/Memoria UNImate.pdf`,
            action: 'download',
          },
          {
            title: 'Specification document',
            type: 'pdf',
            description: 'Functional and technical specification document for the project.',
            url: `${projectBasePath('unimate')}/docs/UNImate_ Document d'Especificacions (V3.0).pdf`,
            action: 'download',
          },
          {
            title: 'Vision document',
            type: 'pdf',
            description: 'Product vision and functional scope document.',
            url: `${projectBasePath('unimate')}/docs/UNImate_Document de visió.docx.pdf`,
            action: 'download',
          },
        ],
        gallery: [
          {
            title: 'Objectives and requirements',
            src: `${projectBasePath('unimate')}/images/requirements-summary.png`,
            alt: 'UNImate report page with objectives and requirements',
            description: 'Real report extract with completed features and task distribution.',
          },
          {
            title: 'Methodology and progress',
            src: `${projectBasePath('unimate')}/images/methodology-and-progress.png`,
            alt: 'UNImate report page with methodology and sprints',
            description: 'Documentary evidence of sprint-based development and methodology.',
          },
        ],
        detailSections: [
          {
            eyebrow: 'Context',
            title: 'Academic platform for the university community',
            body: [
              'UNImate is a collaborative application aimed at supporting organization, connection and information within the university community.',
              'The project was developed as a team, and Daniel is documented with a Front and Documentation role in the specification document.',
            ],
          },
          {
            eyebrow: 'Features',
            title: 'Completed project objectives',
            items: [
              'Registration, login and customizable profiles',
              'Search for information about universities, faculties and degrees',
              'Forum with posts, comments, reactions and category filters',
              'Friend network and friend requests',
              'Interactive map of universities and faculties',
              'Private chat and group chats by degree/faculty',
              'Profile recommender',
              'Enrollment verification',
            ],
          },
          {
            eyebrow: 'Methodology',
            title: 'Sprint work and version control',
            body: [
              'The report documents three main sprints, requirements capture, version control and branch policy. Development included learning technologies from scratch and solving database and environment blockers.',
            ],
          },
          {
            eyebrow: 'Contribution',
            title: 'Frontend and documentation',
            body: [
              'The documentation indicates that Daniel contributed to the design and implementation of the frontend for the main screens and features, along with documentation tasks.',
            ],
          },
          {
            eyebrow: 'Resources',
            title: 'Report, specifications, vision and demo',
            body: [
              'The dossier centralizes the academic report, specification document, vision document and an existing demo video available in public.',
            ],
          },
        ],
        notes: ['The expanded information comes from the existing report, specifications and video resources.'],
      },
    },
  },
];

export const projectDossiers: ProjectDossier[] = rawProjectDossiers.map(normalizeDossier);

export function getProjectDossierBySlug(slug: string) {
  return projectDossiers.find((project) => project.slug === slug) ?? null;
}
