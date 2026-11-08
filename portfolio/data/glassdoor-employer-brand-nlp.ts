import type { ProjectDetailSection, ProjectDossier, ProjectResource } from '@/types';

const base = '/projects/glassdoor-employer-brand-nlp';

// Every figure comes from the saved outputs of Glassdoor_proyecto.ipynb (revision 2026-10-09).
// Charts are the notebook's original figures and keep their Spanish labels.

function resources(english: boolean): ProjectResource[] {
  return [
    {
      title: 'Jupyter Notebook', type: 'notebook', action: 'download',
      url: `${base}/notebooks/Glassdoor_proyecto.ipynb`,
      description: english
        ? 'Complete analysis in Spanish with saved outputs: EDA, sentiment check, BERTopic, peer comparison and HR recommendations.'
        : 'Análisis completo con salidas guardadas: EDA, control de sentimiento, BERTopic, comparación con peers y recomendaciones para RRHH.',
    },
    {
      title: english ? 'Priority matrix' : 'Matriz de prioridad',
      type: 'diagram', action: 'view', url: `${base}/images/priority-matrix.png`,
      description: english
        ? 'Final notebook chart: weight in Deutsche Bank cons vs. disadvantage against peers.'
        : 'Gráfico final del notebook: peso en cons de Deutsche Bank frente a desventaja respecto a peers.',
    },
  ];
}

const sectionsEs: ProjectDetailSection[] = [
  {
    eyebrow: 'Encargo de negocio', title: '¿Qué valoran y qué critican los empleados de Deutsche Bank?',
    body: [
      'Caso práctico de NLP del máster: RRHH pide un diagnóstico de la compañía como empleador a partir de reseñas públicas de Glassdoor. La pregunta guía es qué valoran y critican los empleados, qué diferencia a la empresa de sus competidores y qué debería priorizar RRHH para atraer y retener talento.',
      'Es un diagnóstico descriptivo: se usan modelos ya entrenados para leer textos a escala. No se entrena una red neuronal ni se predice el rating, y el resultado termina en un máximo de tres propuestas accionables.',
    ],
  },
  {
    eyebrow: 'Dataset', title: '47.450 reseñas de cinco bancos globales',
    metrics: [
      { label: 'Reseñas analizadas', value: '47.450', description: 'Deutsche Bank y cuatro peers, filtradas al leer el Parquet.' },
      { label: 'Empresas', value: '5', description: 'Deutsche Bank frente a J.P. Morgan, Barclays, Citi y HSBC Holdings.' },
      { label: 'Ventana', value: '2018–2023', description: 'Del 27/07/2018 al 14/04/2023. Evidencia histórica.' },
      { label: 'Deutsche Bank', value: '5.474', description: 'Reseñas; Citi aporta 14.609 y J.P. Morgan 11.100.' },
      { label: 'Muestra NLP', value: '5.000', description: 'Hasta 1.000 reseñas por empresa, semilla 42.' },
      { label: 'Duplicados exactos', value: '0', description: 'Tampoco fechas no interpretables ni ratings fuera de 1–5.' },
    ],
    body: [
      'Cada reseña aporta empresa, fecha, situación (actual o antiguo), rating global, recomendación y dos textos libres: pros y cons. El Excel del encargo confirma sector y número de reseñas, no el tamaño de plantilla. Los peers se eligen por ser bancos globales con banca corporativa y de inversión y perfiles de talento compartidos.',
    ],
  },
  {
    eyebrow: 'Pipeline NLP', title: 'De reseñas en bruto a decisiones de RRHH',
    steps: ['Parquet filtrado', 'Limpieza', 'EDA', 'Muestra equilibrada', 'Idioma (langdetect)', 'Sentimiento (DistilBERT)', 'Embeddings (MiniLM)', 'BERTopic', 'Categorías RRHH', 'Comparación con peers', 'Priorización'],
    body: [
      'El EDA usa todas las reseñas; los modelos usan la muestra equilibrada para limitar coste y evitar que el banco con más reseñas domine los temas. Pros y cons se analizan siempre como corpus separados. Los resultados pesados se guardan en caché con huella de muestra, modelos, parámetros y versiones: si algo cambia, se recalcula.',
    ],
  },
  {
    eyebrow: 'Preprocessing', title: 'Limpieza mínima para conservar el significado',
    items: [
      'Solo se eliminan duplicados exactos: dos comentarios parecidos no prueban que sean la misma reseña.',
      'Se normalizan espacios y saltos de línea; los textos originales se conservan.',
      'Sin stemming ni lematización y sin borrar negaciones: los transformers necesitan frases completas.',
      'Textos vacíos o sin letras se excluyen: 47.449 pros y 47.435 cons válidos.',
      'Frases como «no cons» se conservan: expresan ausencia de quejas, no un dato vacío.',
      'Idioma orientativo con langdetect: 99,2–99,9 % inglés estimado; no se elimina nada automáticamente.',
    ],
  },
  {
    eyebrow: 'EDA', title: 'Deutsche Bank parte por debajo de la media de sus peers',
    metrics: [
      { label: 'Rating medio', value: '3,73', description: 'Frente a 3,83 de media simple de los cuatro peers.' },
      { label: 'Recomienda', value: '70,9 %', description: 'De quienes responden sí/no; peers 75,9 %. Cobertura 61,3 %.' },
      { label: 'Antiguos − actuales', value: '−0,39', description: 'Puntos sobre 5: 3,49 frente a 3,87.' },
    ],
    body: [
      '«Sin opinión» no equivale a «no», por lo que la recomendación se calcula como sí / (sí + no) y se informa su cobertura. La diferencia entre antiguos y actuales orienta a quién escuchar; no demuestra que salir de la empresa cause una peor opinión.',
    ],
    image: {
      src: `${base}/images/rating-current-vs-former.png`,
      alt: 'Rating medio de empleados actuales y antiguos por empresa',
      description: 'Figura original del notebook, base completa sin duplicados.',
    },
  },
  {
    eyebrow: 'EDA temporal', title: 'Una media global que oculta cambios',
    body: [
      'La media anual observada de Deutsche Bank pasa de 3,40 en 2018 a 3,87 en 2023. Los periodos con menos de 30 ratings no se dibujan y el primer y último año pueden ser parciales. J.P. Morgan y HSBC no aportan reseñas en 2022–2023, por lo que la comparación de categorías se repite después sobre el periodo común.',
    ],
    image: {
      src: `${base}/images/annual-rating-trend.png`,
      alt: 'Evolución anual del rating medio por empresa entre 2018 y 2023',
      description: 'Figura original del notebook. No se atribuye el cambio a políticas concretas.',
    },
  },
  {
    eyebrow: 'Transformers', title: 'Sentimiento como control de calidad, no como métrica de acierto',
    metrics: [
      { label: 'Pros positivos · DB', value: '93,2 %', description: 'Coherencia con el campo; peers entre 93,1 y 95,3 %.' },
      { label: 'Cons negativos · DB', value: '85,2 %', description: 'Coherencia con el campo; peers entre 80,1 y 83,3 %.' },
      { label: 'Textos truncados', value: '0 / 4', description: 'Pros / cons por encima de 512 tokens, sobre 5.000 cada uno.' },
    ],
    body: [
      'DistilBERT SST-2 (Hugging Face Transformers, CPU) clasifica cada texto en positivo o negativo, sin clase neutral. Como no hay etiquetas humanas, se usa para comprobar la coherencia de los campos pros y cons, no como accuracy ni como medida de satisfacción.',
      'Los desacuerdos se leen uno a uno: «Nothing is good about this place» en pros es una crítica real, mientras que «They pay you to get licensed» marcado como negativo parece un error del modelo. Desacuerdo con el campo y error del modelo no son lo mismo.',
    ],
  },
  {
    eyebrow: 'Topic modeling', title: 'BERTopic: de qué hablan realmente los empleados',
    steps: ['all-MiniLM-L6-v2', 'UMAP (15 vecinos, 5 dims)', 'HDBSCAN (min_cluster_size 40)', 'c-TF-IDF (1-2 gramas)'],
    metrics: [
      { label: 'Topics en pros', value: '27', description: 'Modelo ajustado con los pros de las cinco empresas juntas.' },
      { label: 'Topics en cons', value: '27', description: 'Modelo independiente para los cons.' },
      { label: 'Sin clasificar · DB', value: '33,3 / 29,6 %', description: 'Pros / cons outliers (-1); se mantienen en los denominadores.' },
    ],
    body: [
      'Los embeddings de MiniLM acercan «salario competitivo» y «buena remuneración» aunque usen palabras distintas. UMAP reduce dimensiones, HDBSCAN agrupa sin imponer el número de temas y c-TF-IDF describe cada grupo. Las stopwords en inglés solo se eliminan en esa descripción, no en los textos del modelo.',
      'Los parámetros son elecciones exploratorias para obtener temas legibles, no valores optimizados con etiquetas humanas.',
    ],
  },
  {
    eyebrow: 'Categorías de negocio', title: 'Un diccionario explícito de topics a palancas de RRHH',
    items: [
      'Compensación: sueldo, beneficios, variable, seguros y permisos.',
      'Conciliación: flexibilidad, horarios y carga de trabajo.',
      'Cultura: compañeros, ambiente e inclusión.',
      'Carrera: aprendizaje, promoción y movilidad.',
      'Dirección: gestión, política interna y cambios de estrategia.',
      'Procesos y tecnología: herramientas, burocracia y tecnología heredada.',
      'Marca y alcance internacional: prestigio y escala global.',
      'Estabilidad laboral: seguridad del empleo, despidos y offshoring.',
    ],
    body: [
      'Cada etiqueta se propone tras leer palabras y ejemplos representativos reales, y queda pendiente de validación humana conjunta. Los grupos ambiguos se mantienen como «Otros temas», «Valoración general» o «Sin quejas concretas» y nunca generan una recomendación automáticamente.',
    ],
  },
  {
    eyebrow: 'Comparación con peers', title: 'Conciliación destaca; compensación y carrera quedan por detrás',
    metrics: [
      { label: 'Conciliación', value: '+5,62 pp', description: 'Gap de balance (pros − cons) frente a la media de peers.' },
      { label: 'Cultura', value: '+3,90 pp', description: 'La categoría más frecuente en pros de DB (20,8 %).' },
      { label: 'Compensación', value: '−4,15 pp', description: 'Mayor desventaja relativa: 8,5 % de cons frente a 6,52 % en peers.' },
      { label: 'Carrera', value: '−2,25 pp', description: '10,3 % de cons de DB frente a 9,07 % en peers.' },
      { label: 'Dirección', value: '−0,85 pp', description: '7,0 % de cons, sin topic específico en pros.' },
      { label: 'Procesos y tecnología', value: '−0,75 pp', description: 'La categoría con más cons de DB: 12,0 %.' },
    ],
    body: [
      'Balance neto = % pros − % cons; gap = balance de Deutsche Bank − media simple de los cuatro peers, para que cada competidor pese igual. Son proporciones relativas: un gap negativo no demuestra causalidad ni significación estadística.',
    ],
    image: {
      src: `${base}/images/category-gap-vs-peers.png`,
      alt: 'Gap del balance de Deutsche Bank frente a peers por categoría',
      description: 'Figura original del notebook, muestra NLP.',
    },
  },
  {
    eyebrow: 'Sensibilidad', title: 'Repetir la comparación en el periodo común',
    body: [
      'Con las mismas etiquetas, sobre las fechas que comparten las cinco empresas, seis de las ocho categorías mantienen el signo. Conciliación sigue siendo favorable (+4,75 pp) y compensación desfavorable (−2,53 pp); dirección empeora a −3,85 pp. Cultura (+3,90 → −0,53) y marca (−0,25 → +3,03) cambian de signo, por lo que no se presentan como hallazgos estables.',
    ],
  },
  {
    eyebrow: 'Retención', title: 'Quejas frente a valoración y empleados antiguos',
    metrics: [
      { label: 'Recomiendan · cons de cultura', value: '26,9 %', description: '−46,95 pp frente al resto de cons de DB; rating 2,97.' },
      { label: 'Recomiendan · cons de dirección', value: '45,1 %', description: '−29,21 pp frente al resto; rating 3,30 frente a 3,81.' },
      { label: 'Dirección · antiguos', value: '9,6 %', description: 'De los cons de antiguos, frente a 5,4 % en actuales y 8,4 % en antiguos de peers.' },
    ],
    body: [
      'Procesos y tecnología acumula 120 cons, pero con rating 4,03: el volumen de quejas no basta para priorizar. Las opiniones de antiguos no son motivos de salida confirmados; se proponen como temas para entrevistas de permanencia y salida.',
    ],
  },
  {
    eyebrow: 'Resultados', title: 'Qué investigar primero',
    metrics: [
      { label: 'Compensación', value: '35,28', description: 'Puntuación heurística: peso en cons × máximo(0, desventaja).' },
      { label: 'Carrera', value: '23,17', description: 'Segunda prioridad; contraste de rating de solo −0,10/5.' },
      { label: 'Procesos y tecnología', value: '9,00', description: 'Mucho volumen, pero desventaja pequeña y rating alto.' },
    ],
    body: [
      'La matriz cruza el peso en cons de Deutsche Bank con su desventaja frente a peers. Es una ordenación heurística, sin interpretación económica ni estadística, contrastada después con rating, recomendación, antiguos y periodo común.',
    ],
    image: {
      src: `${base}/images/priority-matrix.png`,
      alt: 'Matriz de prioridad: peso en cons de Deutsche Bank frente a desventaja respecto a peers',
      description: 'Figura original del notebook. Los puntos vacíos tienen menos de 30 cons.',
    },
  },
  {
    eyebrow: 'Recomendaciones', title: 'Tres propuestas para RRHH, como hipótesis a validar',
    items: [
      '1. Diagnosticar la compensación: revisar en 60 días bandas y progresión por puesto y país con datos internos; ajustar solo donde se confirme la desventaja.',
      '2. Pilotar conversaciones de carrera: 90 días en dos equipos con conversaciones mensuales, criterios de promoción escritos y plan de aprendizaje.',
      '3. Comunicar conciliación verificable: confirmar qué flexibilidad sigue vigente por puesto y comunicarla en vacantes y entrevistas.',
      'Cada propuesta incluye un indicador interno que todavía no se ha medido; se fija primero la base inicial.',
    ],
    body: [
      'Conclusión del notebook: la conciliación es la fortaleza comparativa más consistente. Compensación y carrera merecen investigación, pero las quejas salariales por sí solas no justifican ajustes generales; las de dirección sí acompañan valoraciones más bajas.',
    ],
  },
  {
    eyebrow: 'Limitaciones', title: 'Lo que este análisis no puede afirmar',
    items: [
      'Glassdoor recoge opiniones autoseleccionadas, no una muestra representativa de la plantilla.',
      'Sin país ni puesto no se puede ajustar la mezcla de empleados entre empresas.',
      'Datos históricos (2018–2023) y dos peers sin reseñas en 2022–2023.',
      'Sentimiento binario de otro dominio, con errores, ambigüedad y recorte de textos.',
      'Un topic dominante por texto; las etiquetas requieren validación humana.',
      'Asociaciones sin causalidad ni significación estadística; sin métricas supervisadas porque no hay etiquetas de referencia.',
    ],
  },
];

const sectionsEn: ProjectDetailSection[] = [
  {
    eyebrow: 'Business brief', title: 'What do Deutsche Bank employees value and criticise?',
    body: [
      'A master\'s NLP case study: HR asks for a diagnosis of the company as an employer based on public Glassdoor reviews. The guiding question is what employees value and criticise, what sets the company apart from competitors and what HR should prioritise to attract and retain talent.',
      'It is a descriptive diagnosis: pre-trained models are used to read text at scale. No neural network is trained and the rating is not predicted, and the work ends in at most three actionable proposals.',
    ],
  },
  {
    eyebrow: 'Dataset', title: '47,450 reviews from five global banks',
    metrics: [
      { label: 'Reviews analysed', value: '47,450', description: 'Deutsche Bank and four peers, filtered while reading the Parquet file.' },
      { label: 'Companies', value: '5', description: 'Deutsche Bank vs. J.P. Morgan, Barclays, Citi and HSBC Holdings.' },
      { label: 'Window', value: '2018–2023', description: 'From 27/07/2018 to 14/04/2023. Historical evidence.' },
      { label: 'Deutsche Bank', value: '5,474', description: 'Reviews; Citi contributes 14,609 and J.P. Morgan 11,100.' },
      { label: 'NLP sample', value: '5,000', description: 'Up to 1,000 reviews per company, seed 42.' },
      { label: 'Exact duplicates', value: '0', description: 'Also no unparseable dates or ratings outside 1–5.' },
    ],
    body: [
      'Each review provides company, date, status (current or former), overall rating, recommendation and two free texts: pros and cons. The brief\'s spreadsheet confirms sector and review count, not headcount. Peers were chosen as global banks with corporate and investment banking and shared talent profiles.',
    ],
  },
  {
    eyebrow: 'NLP pipeline', title: 'From raw reviews to HR decisions',
    steps: ['Filtered Parquet', 'Cleaning', 'EDA', 'Balanced sample', 'Language (langdetect)', 'Sentiment (DistilBERT)', 'Embeddings (MiniLM)', 'BERTopic', 'HR categories', 'Peer comparison', 'Prioritisation'],
    body: [
      'EDA uses every review; models use the balanced sample to limit cost and keep the bank with most reviews from dominating the topics. Pros and cons are always analysed as separate corpora. Heavy results are cached with a fingerprint of sample, models, parameters and versions: if anything changes, it is recomputed.',
    ],
  },
  {
    eyebrow: 'Preprocessing', title: 'Minimal cleaning to preserve meaning',
    items: [
      'Only exact duplicates are removed: two similar comments do not prove they are the same review.',
      'Whitespace and line breaks are normalised; original texts are kept.',
      'No stemming, lemmatisation or negation removal: transformers need complete sentences.',
      'Empty or letter-free texts are excluded: 47,449 valid pros and 47,435 valid cons.',
      'Phrases such as "no cons" are kept: they express an absence of complaints, not missing data.',
      'Indicative language detection with langdetect: 99.2–99.9% estimated English; nothing is dropped automatically.',
    ],
  },
  {
    eyebrow: 'EDA', title: 'Deutsche Bank starts below its peers\' average',
    metrics: [
      { label: 'Average rating', value: '3.73', description: 'Vs. 3.83 simple average of the four peers.' },
      { label: 'Recommend', value: '70.9%', description: 'Of yes/no answers; peers 75.9%. Coverage 61.3%.' },
      { label: 'Former − current', value: '−0.39', description: 'Points out of 5: 3.49 vs. 3.87.' },
    ],
    body: [
      '"No opinion" does not mean "no", so recommendation is computed as yes / (yes + no) and its coverage is reported. The gap between former and current employees points to whom to listen to; it does not prove that leaving causes a worse opinion.',
    ],
    image: {
      src: `${base}/images/rating-current-vs-former.png`,
      alt: 'Average rating of current and former employees by company',
      description: 'Original notebook figure (Spanish labels), full deduplicated base.',
    },
  },
  {
    eyebrow: 'Temporal EDA', title: 'A global average that hides change',
    body: [
      'Deutsche Bank\'s observed yearly average rises from 3.40 in 2018 to 3.87 in 2023. Periods with fewer than 30 ratings are not drawn and the first and last years may be partial. J.P. Morgan and HSBC have no reviews in 2022–2023, so the category comparison is later repeated on the shared period.',
    ],
    image: {
      src: `${base}/images/annual-rating-trend.png`,
      alt: 'Yearly average rating by company between 2018 and 2023',
      description: 'Original notebook figure (Spanish labels). The change is not attributed to specific policies.',
    },
  },
  {
    eyebrow: 'Transformers', title: 'Sentiment as a quality check, not an accuracy metric',
    metrics: [
      { label: 'Positive pros · DB', value: '93.2%', description: 'Consistency with the field; peers between 93.1 and 95.3%.' },
      { label: 'Negative cons · DB', value: '85.2%', description: 'Consistency with the field; peers between 80.1 and 83.3%.' },
      { label: 'Truncated texts', value: '0 / 4', description: 'Pros / cons above 512 tokens, out of 5,000 each.' },
    ],
    body: [
      'DistilBERT SST-2 (Hugging Face Transformers, CPU) labels each text as positive or negative, with no neutral class. Without human labels, it is used to check the consistency of the pros and cons fields, not as accuracy or a satisfaction measure.',
      'Disagreements are read one by one: "Nothing is good about this place" in pros is real criticism, while "They pay you to get licensed" labelled negative looks like a model error. Disagreeing with the field and a model error are not the same thing.',
    ],
  },
  {
    eyebrow: 'Topic modeling', title: 'BERTopic: what employees actually talk about',
    steps: ['all-MiniLM-L6-v2', 'UMAP (15 neighbours, 5 dims)', 'HDBSCAN (min_cluster_size 40)', 'c-TF-IDF (1-2 grams)'],
    metrics: [
      { label: 'Topics in pros', value: '27', description: 'Model fitted on the pros of all five companies together.' },
      { label: 'Topics in cons', value: '27', description: 'Independent model for the cons.' },
      { label: 'Unclassified · DB', value: '33.3 / 29.6%', description: 'Pros / cons outliers (-1); kept in the denominators.' },
    ],
    body: [
      'MiniLM embeddings bring "competitive salary" and "good pay" close together despite different wording. UMAP reduces dimensions, HDBSCAN clusters without fixing the number of topics and c-TF-IDF describes each cluster. English stopwords are removed only in that description, not in the model inputs.',
      'Parameters are exploratory choices for readable topics, not values optimised against human labels.',
    ],
  },
  {
    eyebrow: 'Business categories', title: 'An explicit dictionary from topics to HR levers',
    items: [
      'Compensation: pay, benefits, bonus, insurance and leave.',
      'Work-life balance: flexibility, hours and workload.',
      'Culture: colleagues, atmosphere and inclusion.',
      'Career: learning, promotion and mobility.',
      'Management: leadership, internal politics and strategy changes.',
      'Processes & technology: tools, bureaucracy and legacy technology.',
      'Brand & international reach: prestige and global scale.',
      'Job stability: job security, layoffs and offshoring.',
    ],
    body: [
      'Each label is proposed after reading real representative words and examples, and remains pending joint human validation. Ambiguous clusters stay as "Other topics", "General assessment" or "No specific complaints" and never trigger a recommendation automatically.',
    ],
  },
  {
    eyebrow: 'Peer comparison', title: 'Work-life balance stands out; compensation and career lag behind',
    metrics: [
      { label: 'Work-life balance', value: '+5.62 pp', description: 'Balance gap (pros − cons) vs. the peer average.' },
      { label: 'Culture', value: '+3.90 pp', description: 'The most frequent category in DB pros (20.8%).' },
      { label: 'Compensation', value: '−4.15 pp', description: 'Largest relative disadvantage: 8.5% of cons vs. 6.52% for peers.' },
      { label: 'Career', value: '−2.25 pp', description: '10.3% of DB cons vs. 9.07% for peers.' },
      { label: 'Management', value: '−0.85 pp', description: '7.0% of cons, with no specific topic in pros.' },
      { label: 'Processes & technology', value: '−0.75 pp', description: 'The category with most DB cons: 12.0%.' },
    ],
    body: [
      'Net balance = % pros − % cons; gap = Deutsche Bank balance − simple average of the four peers, so each competitor weighs the same. These are relative proportions: a negative gap does not prove causality or statistical significance.',
    ],
    image: {
      src: `${base}/images/category-gap-vs-peers.png`,
      alt: 'Deutsche Bank balance gap vs. peers by category',
      description: 'Original notebook figure (Spanish labels), NLP sample.',
    },
  },
  {
    eyebrow: 'Sensitivity', title: 'Repeating the comparison on the shared period',
    body: [
      'With the same labels, on the dates shared by all five companies, six of eight categories keep their sign. Work-life balance remains favourable (+4.75 pp) and compensation unfavourable (−2.53 pp); management worsens to −3.85 pp. Culture (+3.90 → −0.53) and brand (−0.25 → +3.03) flip sign, so they are not presented as stable findings.',
    ],
  },
  {
    eyebrow: 'Retention', title: 'Complaints vs. ratings and former employees',
    metrics: [
      { label: 'Recommend · culture cons', value: '26.9%', description: '−46.95 pp vs. the rest of DB cons; rating 2.97.' },
      { label: 'Recommend · management cons', value: '45.1%', description: '−29.21 pp vs. the rest; rating 3.30 vs. 3.81.' },
      { label: 'Management · former', value: '9.6%', description: 'Of former employees\' cons, vs. 5.4% for current and 8.4% for former peer employees.' },
    ],
    body: [
      'Processes & technology gathers 120 cons, but with a 4.03 rating: complaint volume alone is not enough to prioritise. Former employees\' opinions are not confirmed reasons for leaving; they are proposed as topics for stay and exit interviews.',
    ],
  },
  {
    eyebrow: 'Results', title: 'What to investigate first',
    metrics: [
      { label: 'Compensation', value: '35.28', description: 'Heuristic score: weight in cons × max(0, disadvantage).' },
      { label: 'Career', value: '23.17', description: 'Second priority; rating contrast of only −0.10/5.' },
      { label: 'Processes & technology', value: '9.00', description: 'High volume, but a small disadvantage and a high rating.' },
    ],
    body: [
      'The matrix crosses the weight of each category in Deutsche Bank cons with its disadvantage against peers. It is a heuristic ranking with no economic or statistical meaning, then checked against rating, recommendation, former employees and the shared period.',
    ],
    image: {
      src: `${base}/images/priority-matrix.png`,
      alt: 'Priority matrix: weight in Deutsche Bank cons vs. disadvantage against peers',
      description: 'Original notebook figure (Spanish labels). Hollow points have fewer than 30 cons.',
    },
  },
  {
    eyebrow: 'Recommendations', title: 'Three HR proposals, framed as hypotheses to validate',
    items: [
      '1. Diagnose compensation: within 60 days, review pay bands and progression by role and country with internal data; adjust only where a disadvantage is confirmed.',
      '2. Pilot career conversations: 90 days in two teams with monthly manager conversations, written promotion criteria and a learning plan.',
      '3. Communicate verifiable work-life balance: confirm which flexibility options are still in place by role and communicate them in job ads and interviews.',
      'Each proposal includes an internal indicator that has not been measured yet; a baseline is set first.',
    ],
    body: [
      'Notebook conclusion: work-life balance is the most consistent comparative strength. Compensation and career deserve investigation, but salary complaints alone do not justify general adjustments; management complaints do come with lower ratings.',
    ],
  },
  {
    eyebrow: 'Limitations', title: 'What this analysis cannot claim',
    items: [
      'Glassdoor holds self-selected opinions, not a representative sample of the workforce.',
      'Without country or role, the employee mix across companies cannot be adjusted.',
      'Historical data (2018–2023) and two peers without reviews in 2022–2023.',
      'Binary out-of-domain sentiment, with errors, ambiguity and truncated texts.',
      'One dominant topic per text; labels require human validation.',
      'Associations without causality or statistical significance; no supervised metrics because there are no reference labels.',
    ],
  },
];

export const glassdoorEmployerBrandNlpDossier: ProjectDossier = {
  title: 'Diagnóstico de Marca Empleadora con NLP',
  slug: 'glassdoor-employer-brand-nlp',
  subtitle: 'Reseñas de Glassdoor de Deutsche Bank frente a cuatro bancos globales con Transformers y BERTopic',
  author: 'Daniel García Nilo',
  description: 'Caso práctico de NLP del máster: diagnóstico de Deutsche Bank como empleador a partir de 47.450 reseñas de Glassdoor, comparado con J.P. Morgan, Barclays, Citi y HSBC, para proponer prioridades de atracción y retención a RRHH.',
  longDescription: 'El análisis combina EDA sobre todas las reseñas, un control de sentimiento con DistilBERT, embeddings MiniLM y BERTopic (UMAP, HDBSCAN y c-TF-IDF) sobre una muestra equilibrada de 5.000 reseñas, un diccionario explícito de categorías de RRHH y una comparación de balances frente a peers con prueba de sensibilidad temporal. Concluye que la conciliación es la fortaleza más consistente (+5,62 pp) y que compensación (−4,15 pp) y carrera (−2,25 pp) merecen investigación.',
  categories: ['master', 'data-science'],
  status: 'terminado',
  technologies: ['Python', 'NLP', 'Hugging Face Transformers', 'DistilBERT', 'Sentence-Transformers', 'BERTopic', 'UMAP', 'HDBSCAN', 'scikit-learn', 'PyTorch', 'langdetect', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Jupyter Notebook'],
  colorTheme: { primary: '#B8966B', soft: 'rgba(184, 150, 107, 0.10)' },
  coverImage: '/images/projects/glassdoor-employer-brand-nlp-cover.jpg',
  resources: resources(false),
  videos: [],
  gallery: [],
  detailSections: sectionsEs,
  notes: [
    'Fuente: Glassdoor_proyecto.ipynb con salidas guardadas (revisión del 09/10/2026). Todas las cifras proceden de esas salidas; las figuras conservan sus rótulos originales en español.',
    'Proyecto académico basado en reseñas públicas, sin relación con Deutsche Bank. El dataset Parquet del caso (≈ 290 MB) no se publica en el portfolio.',
  ],
  translations: {
    en: {
      title: 'Employer Brand Diagnosis with NLP',
      subtitle: 'Deutsche Bank Glassdoor reviews vs. four global banks with Transformers and BERTopic',
      description: 'A master\'s NLP case study: diagnosing Deutsche Bank as an employer from 47,450 Glassdoor reviews, compared with J.P. Morgan, Barclays, Citi and HSBC, to propose attraction and retention priorities to HR.',
      longDescription: 'The analysis combines EDA on every review, a DistilBERT sentiment check, MiniLM embeddings and BERTopic (UMAP, HDBSCAN and c-TF-IDF) on a balanced sample of 5,000 reviews, an explicit dictionary of HR categories and a balance comparison against peers with a temporal sensitivity check. It concludes that work-life balance is the most consistent strength (+5.62 pp) and that compensation (−4.15 pp) and career (−2.25 pp) deserve investigation.',
      resources: resources(true),
      detailSections: sectionsEn,
      notes: [
        'Source: Glassdoor_proyecto.ipynb with saved outputs (revision of 09/10/2026). Every figure comes from those outputs; charts keep their original Spanish labels.',
        'Academic project based on public reviews, not affiliated with Deutsche Bank. The case\'s Parquet dataset (≈ 290 MB) is not published in the portfolio.',
      ],
    },
  },
};
