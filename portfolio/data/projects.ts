import type { ProjectDossier } from '@/types';

const tfgBasePath = '/projects/tfg-modulo-chatbots';

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
        url: `${tfgBasePath}/docs/informe-inicial.pdf`,
        action: 'download',
      },
      {
        title: 'Informe de Progreso I',
        type: 'pdf',
        description: 'Seguimiento del primer bloque de avance y decisiones tecnicas.',
        url: `${tfgBasePath}/docs/informe-progreso-1.pdf`,
        action: 'download',
      },
      {
        title: 'Informe de Progreso II',
        type: 'pdf',
        description: 'Evolucion del desarrollo, validacion y ajustes del sistema.',
        url: `${tfgBasePath}/docs/informe-progreso-2.pdf`,
        action: 'download',
      },
      {
        title: 'Informe Final',
        type: 'pdf',
        description: 'Memoria final con analisis, arquitectura, resultados y conclusiones.',
        url: `${tfgBasePath}/docs/informe-final.pdf`,
        action: 'download',
      },
      {
        title: 'Estudio de Viabilidad',
        type: 'pdf',
        description: 'Analisis de alcance, recursos, planificacion y viabilidad del proyecto.',
        url: `${tfgBasePath}/docs/estudio-viabilidad.pdf`,
        action: 'download',
      },
      {
        title: 'Estudio Etico y Legal',
        type: 'pdf',
        description: 'Revision de implicaciones eticas, legales y de tratamiento de informacion.',
        url: `${tfgBasePath}/docs/estudio-etico-legal.pdf`,
        action: 'download',
      },
      {
        title: 'Presupuesto',
        type: 'pdf',
        description: 'Estimacion economica y recursos asociados al desarrollo.',
        url: `${tfgBasePath}/docs/presupuesto.pdf`,
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
        url: `${tfgBasePath}/docs/manual-usuario.pdf`,
        action: 'download',
      },
      {
        title: 'Diagramas del Proyecto',
        type: 'diagram',
        description: 'Diagramas de arquitectura, datos, componentes y flujos conversacionales.',
        url: `${tfgBasePath}/docs/diagramas.pdf`,
        action: 'view',
      },
      {
        title: 'Lista de Cambios',
        type: 'excel',
        description: 'Registro de cambios, iteraciones y seguimiento documental.',
        url: `${tfgBasePath}/docs/lista-cambios.xlsx`,
        action: 'download',
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
];

export function getProjectDossierBySlug(slug: string) {
  return projectDossiers.find((project) => project.slug === slug) ?? null;
}
