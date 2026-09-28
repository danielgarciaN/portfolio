import type { ProjectDossier, ProjectDetailSection, ProjectResource } from '@/types';

const base = '/projects/hotel-booking-cancellation-ml';
const githubUrl = 'https://github.com/danielgarciaN/hoteles_evolve';

function resources(english: boolean): ProjectResource[] {
  return [
    {
      title: english ? 'GitHub Repository' : 'Repositorio GitHub',
      type: 'code', action: 'external', url: githubUrl,
      description: english ? 'Source code and project notebooks.' : 'Código fuente y notebooks del proyecto.',
    },
    {
      title: 'Jupyter Notebook', type: 'notebook', action: 'download',
      url: `${base}/notebooks/cancelaciones_hoteleras_DanielGarcia.ipynb`,
      description: english ? 'Complete analysis with saved outputs, model selection and SHAP.' : 'Análisis completo con salidas guardadas, selección de modelo y SHAP.',
    },
    {
      title: english ? 'Project Presentation' : 'Presentación del proyecto',
      type: 'presentation', action: 'view', url: `${base}/docs/cancelacion-reservas.pdf`,
      description: english ? 'Original 14-slide presentation in Spanish (PDF).' : 'Presentación original de 14 diapositivas en PDF.',
    },
    {
      title: english ? 'Hotel Bookings Dataset' : 'Dataset de reservas hoteleras',
      type: 'data', action: 'download', url: `${base}/data/reservas_hoteleras.csv`,
      description: english ? 'Original CSV: 119,390 bookings and 32 columns (17 MB).' : 'CSV original: 119.390 reservas y 32 columnas (17 MB).',
    },
  ];
}

// Metrics and figures are from saved notebook outputs, not a new training run.
const sectionsEs: ProjectDetailSection[] = [
  {
    eyebrow: 'Problema de negocio', title: 'Anticipar cancelaciones sin multiplicar las falsas alarmas',
    body: [
      'Proyecto del Máster en Data Science & IA de Evolve Academy. La clasificación binaria estima el riesgo de cancelación: is_canceled = 1 significa cancelada y 0, no cancelada. El objetivo es aproximar una predicción en el momento de reservar, pendiente de validar la disponibilidad temporal real de las variables.',
      'Una cancelación no detectada puede dejar una habitación vacía; una falsa alarma puede generar contactos innecesarios. La selección equilibra discriminación, Precision, Recall, F1 y volumen de reservas señaladas, no solo una métrica.',
    ],
  },
  {
    eyebrow: 'Dataset', title: '119.390 reservas de dos hoteles',
    metrics: [
      { label: 'Reservas', value: '119.390', description: 'City Hotel y Resort Hotel.' },
      { label: 'Variables originales', value: '32', description: '22 predictores tras la preparación.' },
      { label: 'Llegadas', value: '2015-2017', description: 'Julio de 2015 a agosto de 2017.' },
      { label: 'Canceladas', value: '37,0 %', description: '44.224 reservas; 75.166 no canceladas.' },
      { label: 'Filas idénticas adicionales', value: '31.994', description: 'Conservadas: no existe un identificador único para confirmar duplicados erróneos.' },
      { label: 'País ausente', value: '488', description: 'Conteo del CSV y notebook; corrige la errata de la presentación.' },
    ],
    body: ['El desbalanceo es moderado. Accuracy no se utiliza como métrica principal. Se conserva un ADR extremo de 5.400 €, 715 reservas sin noches y 180 sin huéspedes registrados al no poder confirmar que sean errores; un ADR negativo pasa a nulo.'],
  },
  {
    eyebrow: 'Data Leakage', title: '¿Se conocería este dato al crear la reserva?',
    body: [
      'La fuga de información aparece cuando se usan datos que no estarían disponibles al predecir. Se excluyen el estado final, su fecha y variables potencialmente posteriores a la reserva.',
      'Se conservan lead_time, fechas previstas, hotel, país, canal, segmento, agencia, empresa, cliente, comidas, habitación reservada e historial anterior. ADR, parking y peticiones especiales se mantienen como aproximaciones, no como disponibilidad temporal demostrada.',
    ],
    items: ['reservation_status', 'reservation_status_date', 'assigned_room_type', 'booking_changes', 'days_in_waiting_list', 'deposit_type'],
  },
  {
    eyebrow: 'Preparación', title: 'Nulos y variables derivadas',
    items: [
      'agent: Sin_agente; company: Sin_empresa. Significan no registrado, no ausencia confirmada.',
      'country: Desconocido. Los códigos de agencia y empresa son categorías.',
      'total_guests = adults + children + babies.',
      'total_nights = stays_in_week_nights + stays_in_weekend_nights.',
      'Los totales sustituyen a sus componentes; los cuatro nulos de children se propagan a total_guests.',
      'Mediana para total_guests y ADR dentro del pipeline: robusta frente a extremos y aprendida en cada ajuste.',
    ],
  },
  {
    eyebrow: 'EDA', title: 'Hotel, segmento y canal: asociaciones, no causas',
    body: [
      'El código calcula el EDA con las 97.192 reservas anteriores al 1 de mayo de 2017: desarrollo completo, incluyendo la futura validación, pero excluyendo TEST. Los gráficos originales lo rotulan TRAIN; no debe confundirse con las 77.698 reservas de ajuste.',
      'City Hotel presenta un 41,5 % de cancelaciones frente al 26,0 % de Resort Hotel. El segmento Groups alcanza el 60,2 %; el canal TA/TO, 40,3 %, frente al 16,8 % del canal Direct. Son asociaciones descriptivas, no efectos causales.',
      'Solo se ocultan en los gráficos categorías con menos de 100 reservas; sus registros siguen en el dataset.',
    ],
    image: { src: `${base}/images/eda-channel-segment.png`, alt: 'Tasas de cancelación por canal de distribución y segmento de mercado', description: 'Salida original del notebook, celda 18. Periodo de desarrollo anterior a TEST.' },
  },
  {
    eyebrow: 'EDA', title: 'La antelación concentra uno de los patrones más claros',
    metrics: [
      { label: 'Antelación 0-7 días', value: '9,4 %', description: 'Tasa de cancelación.' },
      { label: 'Más de 180 días', value: '60,0 %', description: 'Tasa de cancelación.' },
      { label: 'Abril / enero', value: '40,8 / 30,5 %', description: 'Los meses no incluyen exactamente los mismos años.' },
    ],
    body: ['Una mayor antelación se asocia con más cancelaciones en estos datos. El ADR medio es 92,64 € en no canceladas y 96,08 € en canceladas: esta diferencia tampoco demuestra causalidad.'],
    image: { src: `${base}/images/eda-lead-time.png`, alt: 'Cancelaciones por intervalos de antelación de la reserva', description: 'Salida original del notebook, celda 21. No se utiliza TEST para este análisis.' },
  },
  {
    eyebrow: 'Validación temporal', title: 'Aprender del pasado y evaluar en un periodo posterior',
    steps: ['Pasado', 'TRAIN / ajuste', 'VALIDATION', 'TEST', 'Futuro'],
    metrics: [
      { label: 'TRAIN / ajuste', value: '77.698', description: '65,08 %. Llegadas: 01/07/2015 a 25/12/2016.' },
      { label: 'VALIDATION', value: '19.494', description: '16,33 %. Llegadas: 26/12/2016 a 30/04/2017.' },
      { label: 'TEST', value: '22.198', description: '18,59 %. Llegadas: 01/05/2017 a 31/08/2017.' },
    ],
    body: [
      'TRAIN ajusta modelos. La búsqueda de hiperparámetros utiliza tres ventanas temporales dentro de TRAIN/FIT, manteniendo juntas las reservas del mismo día. VALIDATION compara configuraciones y selecciona modelo y umbral. TEST se consulta después de fijar la decisión en esta ejecución.',
      'Finalmente se reentrena el pipeline elegido con las 97.192 reservas de desarrollo. El corte es por llegada, no por creación: no reproduce exactamente qué información se conocía al reservar. TEST ya fue evaluado en versiones anteriores, por lo que hace falta otro periodo para una comprobación externa sin exposición previa.',
    ],
  },
  {
    eyebrow: 'Pipeline', title: 'Preprocesamiento aprendido dentro de cada ajuste',
    steps: ['ColumnTransformer', 'SimpleImputer', 'StandardScaler / OneHotEncoder', 'Clasificador'],
    body: [
      'Las variables numéricas se imputan con mediana y se estandarizan. Las categóricas reciben una categoría desconocida y OneHotEncoder, con handle_unknown=infrequent_if_exist, min_frequency=30 y max_categories=20.',
      'Pipeline encapsula preparación y modelo. Durante la comparación, medianas, escalas y categorías se aprenden solo con el entrenamiento de cada ajuste; en el reentrenamiento final se usa desarrollo completo, nunca TEST.',
    ],
  },
  {
    eyebrow: 'Modelos y métricas', title: 'Comparación inicial en VALIDATION, umbral 0,50',
    body: ['Logistic Regression es el baseline interpretable; su versión balanced aumenta el peso de la clase cancelada. Random Forest y HistGradientBoosting son los finalistas.'],
    metrics: [
      { label: 'Logistic Regression', value: '0,871', description: 'ROC-AUC. Precision 72,3 %; Recall 73,2 %; F1 72,7 %.' },
      { label: 'Logistic balanced', value: '0,872', description: 'ROC-AUC. Precision 65,4 %; Recall 83,3 %; F1 73,2 %.' },
      { label: 'Random Forest', value: '0,895', description: 'ROC-AUC. Precision 83,2 %; Recall 57,1 %; F1 67,7 %.' },
      { label: 'HistGradientBoosting', value: '0,902', description: 'ROC-AUC. Precision 81,0 %; Recall 62,1 %; F1 70,3 %.' },
    ],
    items: [
      'ROC-AUC: discriminación global, sin depender del umbral seleccionado.',
      'Precision: proporción de alertas que realmente cancelan.',
      'Recall: proporción de cancelaciones reales detectadas.',
      'F1: media armónica de Precision y Recall.',
    ],
  },
  {
    eyebrow: 'Optimización', title: 'Una versión optimizada no mejora necesariamente todas las métricas',
    body: [
      'RandomizedSearchCV prueba 12 combinaciones de Random Forest: árboles, profundidad, mínimo de división, mínimo por hoja, variables por división y peso de clases. GridSearchCV prueba cuatro combinaciones de HGB: hojas (15/31) y regularización L2 (0,1/5,0). En HGB se mantienen learning_rate=0,08 y max_iter=150; no se optimiza la tasa de aprendizaje.',
      'Ambas búsquedas optimizan ROC-AUC medio en tres ventanas temporales de TRAIN/FIT. En VALIDATION el AUC de RF pasa de 0,8950 a 0,8933 y el de HGB de 0,9018 a 0,8998. Se comparan las versiones antes de decidir, sin dar por ganadora la etiqueta optimized.',
    ],
  },
  {
    eyebrow: 'Selección', title: 'HistGradientBoosting inicial + threshold 0,30',
    metrics: [
      { label: 'RF optimizado a 0,30', value: '0,8933', description: 'AUC; Precision 71,8 %; Recall 77,8 %; F1 74,6 %; señaladas 39,7 %.' },
      { label: 'HGB inicial a 0,30', value: '0,9018', description: 'AUC; Precision 76,2 %; Recall 75,3 %; F1 75,7 %; señaladas 36,2 %.' },
    ],
    body: [
      'HGB inicial ofrece mejor AUC, Precision y F1 que RF optimizado con menos intervenciones, a costa de 2,5 puntos de Recall. La versión optimizada de HGB no aporta una mejora operativa suficiente.',
      'Configuración final: max_iter=150, learning_rate=0,08, max_leaf_nodes=15, l2_regularization=1,0 y early_stopping=False. Se selecciona modelo más umbral antes de consultar TEST en esta ejecución.',
    ],
  },
  {
    eyebrow: 'Threshold', title: '0,30 es una elección operativa, no un óptimo universal',
    body: [
      'Se estudian nueve umbrales entre 0,20 y 0,60 en VALIDATION. El umbral convierte una probabilidad en una decisión: con 0,30, una probabilidad de cancelación de 0,72 activa una alerta. Reducirlo suele aumentar Recall y volumen de intervención, pero reducir Precision.',
      'HGB a 0,25: Precision 72,5 %, Recall 80,0 %, F1 76,1 % y 40,5 % señaladas. A 0,30: Precision 76,2 %, Recall 75,3 %, F1 75,7 % y 36,2 % señaladas. Se prioriza reducir falsas alarmas y carga con una pérdida pequeña de F1. Sin costes reales de FP/FN no se demuestra un óptimo económico.',
    ],
    image: { src: `${base}/images/threshold-analysis.png`, alt: 'Precision y Recall según el umbral para RF optimizado e HistGradientBoosting', description: 'Curvas originales de VALIDATION, celda 53 del notebook.' },
  },
  {
    eyebrow: 'Resultados finales', title: 'TEST: HistGradientBoosting reentrenado, umbral 0,30',
    metrics: [
      { label: 'ROC-AUC', value: '0,8914', description: 'Discriminación en el periodo final.' },
      { label: 'Precision', value: '68,2 %', description: 'Aproximadamente 68 de cada 100 alertas cancelan.' },
      { label: 'Recall', value: '89,0 %', description: 'Aproximadamente 89 de cada 100 cancelaciones detectadas.' },
      { label: 'F1', value: '77,3 %', description: 'Equilibrio entre Precision y Recall.' },
      { label: 'Reservas señaladas', value: '52,9 %', description: '11.745 de las 22.198 reservas de TEST.' },
      { label: 'Falsas alarmas', value: '31,8 %', description: 'De las alertas emitidas, no de todas las reservas.' },
    ],
    body: ['8.014 verdaderos positivos, 987 falsos negativos, 3.731 falsos positivos y 9.466 verdaderos negativos. No se mantiene la referencia provisional del 70 % de Precision. Estos resultados no acreditan un ahorro económico ni un despliegue en producción.'],
    image: { src: `${base}/images/test-confusion-matrix.png`, alt: 'Matriz de confusión de TEST: TN 9466, FP 3731, FN 987, TP 8014', description: 'Evaluación guardada en la celda 59. Filas: resultado real; columnas: predicción.' },
  },
  {
    eyebrow: 'Validation frente a Test', title: 'Más detección, pero también más carga operativa',
    items: ['Precision: 76,2 % a 68,2 %.', 'Recall: 75,3 % a 89,0 %.', 'Reservas señaladas: 36,2 % a 52,9 %.'],
    body: ['TEST pertenece a un periodo posterior y el modelo final se reentrena con desarrollo completo. El cambio es compatible con diferencias de distribución, pero no demuestra por sí solo su causa. No se reajusta el umbral tras observar TEST: hacerlo contaminaría la evaluación.'],
  },
  {
    eyebrow: 'SHAP', title: 'Qué variables contribuyen al riesgo estimado',
    body: [
      'SHAP explica cómo cada variable aumenta o reduce la puntuación del modelo, no una relación causal. Se utiliza TreeExplainer sobre el HGB final y una muestra aleatoria de 250 reservas de TEST, sin elegirlas por su etiqueta.',
      'Ranking agrupado por variable original: country, agent, required_car_parking_spaces, total_of_special_requests, lead_time, customer_type, market_segment y arrival_date_year. El gráfico muestra columnas individuales, incluidas las categorías One-Hot.',
      'Los aportes se expresan en log-odds, no en puntos porcentuales. Se comprueba que valor base más contribuciones, convertido a probabilidad, reproduce predict_proba.',
    ],
    image: { src: `${base}/images/shap-summary.png`, alt: 'SHAP summary del HistGradientBoosting final con aportes en log-odds', description: 'Gráfico original de la celda 61. El ranking depende del modelo y de la muestra.' },
  },
  {
    eyebrow: 'Interpretación individual', title: 'Desde el valor base hasta una predicción de alto riesgo',
    body: ['En el caso de mayor riesgo estimado, country=PRT, market_segment=Groups y lead_time=323 días aumentan la puntuación. El waterfall suma aportes positivos y negativos al valor base. Es un caso extremo seleccionado por la predicción, no una reserva representativa ni una regla causal.'],
    image: { src: `${base}/images/shap-waterfall-high.png`, alt: 'Waterfall SHAP para la reserva de mayor riesgo, país Portugal, segmento Groups y antelación de 323 días', description: 'Primer waterfall de la celda 63; escala log-odds.' },
  },
  {
    eyebrow: 'Parking', title: 'Una asociación fuerte que requiere validación',
    body: ['Solicitar parking aparece asociado con menor riesgo estimado; no significa que el parking evite cancelaciones. En el ejemplo de menor riesgo su aporte es negativo. Antes de producción se necesita verificar la solicitud inicial, comparar estabilidad entre periodos y evaluar modelos con y sin parking.'],
    image: { src: `${base}/images/shap-waterfall-low.png`, alt: 'Waterfall SHAP del caso de menor riesgo, con contribución negativa del parking solicitado', description: 'Segundo waterfall de la celda 63; ejemplo individual, no prueba causal.' },
  },
  {
    eyebrow: 'Aplicación de negocio', title: 'Un sistema de priorización con acciones de bajo coste',
    body: ['La propuesta es un piloto supervisado, no una política automatizada ya validada. Los niveles siguientes son conceptuales: no se han validado umbrales adicionales para tres bandas de riesgo.'],
    items: [
      'Riesgo bajo: sin intervención adicional.',
      'Riesgo medio: recordatorio o confirmación automática.',
      'Riesgo alto: reconfirmación y seguimiento; apoyo a Revenue Management.',
      'Posible apoyo al overbooking tras validar costes, capacidad y riesgos operativos.',
      'No aplicar depósitos, restricciones o penalizaciones automáticamente por la predicción.',
      'Medir utilidad y carga de contactos: en TEST se señala más de la mitad de las reservas.',
    ],
  },
  {
    eyebrow: 'Limitaciones', title: 'Un resultado académico, pendiente de validación operativa',
    items: [
      'El CSV no permite comprobar el instante real de registro de cada variable.',
      'Split por llegada, no por fecha de creación de reserva.',
      'El EDA incluye desarrollo completo y la validación se reutiliza para varias decisiones: puede haber optimismo.',
      'TEST estuvo expuesto en versiones previas; hace falta un nuevo periodo externo.',
      'Posibles duplicados y valores atípicos conservados requieren revisión.',
      'SHAP describe asociaciones; no demuestra causas ni garantiza estabilidad futura.',
    ],
  },
  {
    eyebrow: 'Próximos pasos', title: 'Traducir falsos positivos y negativos a impacto económico',
    body: ['Un falso negativo puede perder la oportunidad de revender una habitación; un falso positivo añade una intervención innecesaria. Estimar ambos costes permitiría elegir un umbral según coste esperado y capacidad real del equipo, en datos de validación nuevos.'],
    items: ['Validar disponibilidad temporal de ADR, historial, parking y peticiones.', 'Comparar el modelo con y sin parking.', 'Revisar calibración y probar nuevos periodos.', 'Monitorizar distribución, Precision y tasa de reservas señaladas.', 'Reentrenar periódicamente con evaluación temporal.', 'Ejecutar un piloto y medir costes antes de automatizar decisiones.'],
  },
];

const sectionsEn: ProjectDetailSection[] = [
  {
    eyebrow: 'Business problem', title: 'Anticipate cancellations without multiplying false alarms',
    body: [
      'A Data Science & AI Master project at Evolve Academy. Binary classification estimates cancellation risk: is_canceled = 1 means canceled and 0 means not canceled. The goal is to approximate a prediction at booking time, subject to verifying when the input variables were actually recorded.',
      'An undetected cancellation can leave a room empty; a false alarm can generate unnecessary contacts. Selection balances discrimination, Precision, Recall, F1 and flagged booking volume, rather than maximizing a single metric.',
    ],
  },
  {
    eyebrow: 'Dataset', title: '119,390 bookings across two hotels',
    metrics: [
      { label: 'Bookings', value: '119,390', description: 'City Hotel and Resort Hotel.' },
      { label: 'Original variables', value: '32', description: '22 predictors after preparation.' },
      { label: 'Arrivals', value: '2015-2017', description: 'July 2015 through August 2017.' },
      { label: 'Canceled', value: '37.0%', description: '44,224 bookings; 75,166 not canceled.' },
      { label: 'Additional identical rows', value: '31,994', description: 'Retained: no unique booking ID to confirm erroneous duplicates.' },
      { label: 'Missing country', value: '488', description: 'CSV and notebook count; corrects the presentation typo.' },
    ],
    body: ['Class imbalance is moderate. Accuracy is not the primary metric. An extreme ADR of EUR 5,400, 715 zero-night bookings and 180 bookings without registered guests are retained because errors cannot be confirmed; one negative ADR becomes missing.'],
  },
  {
    eyebrow: 'Data Leakage', title: 'Would this information be known when the booking is created?',
    body: [
      'Leakage occurs when a model uses information unavailable at prediction time. Final status, its date and potentially post-booking variables are excluded.',
      'Retained inputs include lead_time, scheduled dates, hotel, country, channel, segment, agent, company, customer, meals, reserved room and previous history. ADR, parking and special requests remain proxies, not proof of temporal availability.',
    ],
    items: ['reservation_status', 'reservation_status_date', 'assigned_room_type', 'booking_changes', 'days_in_waiting_list', 'deposit_type'],
  },
  {
    eyebrow: 'Preparation', title: 'Missing values and derived features',
    items: [
      'agent: Sin_agente; company: Sin_empresa. These mean not recorded, not confirmed absence.',
      'country: Desconocido. Agency and company codes are categorical.',
      'total_guests = adults + children + babies.',
      'total_nights = stays_in_week_nights + stays_in_weekend_nights.',
      'Totals replace their components; the four missing children values propagate to total_guests.',
      'Median imputation for total_guests and ADR within the pipeline: robust to extremes and learned in each fit.',
    ],
  },
  {
    eyebrow: 'EDA', title: 'Hotel, segment and channel: associations, not causes',
    body: [
      'The code computes EDA on the 97,192 bookings before May 1, 2017: the full development period, including future validation but excluding TEST. Original figures label this TRAIN; it is not the 77,698-row fitting subset.',
      'City Hotel has a 41.5% cancellation rate versus 26.0% for Resort Hotel. Groups reaches 60.2%; the TA/TO channel reaches 40.3% versus 16.8% for Direct. These are descriptive associations, not causal effects.',
      'Categories with fewer than 100 bookings are hidden only in charts; their records remain in the dataset.',
    ],
    image: { src: `${base}/images/eda-channel-segment.png`, alt: 'Cancellation rates by distribution channel and market segment', description: 'Original notebook output, cell 18. Development period before TEST; source chart labels are in Spanish.' },
  },
  {
    eyebrow: 'EDA', title: 'Lead time reveals one of the clearest patterns',
    metrics: [
      { label: 'Lead time 0-7 days', value: '9.4%', description: 'Cancellation rate.' },
      { label: 'More than 180 days', value: '60.0%', description: 'Cancellation rate.' },
      { label: 'April / January', value: '40.8 / 30.5%', description: 'Months do not cover exactly the same years.' },
    ],
    body: ['Longer lead times are associated with more cancellations in this data. Mean ADR is EUR 92.64 for non-canceled bookings and EUR 96.08 for canceled bookings; this difference does not establish causality either.'],
    image: { src: `${base}/images/eda-lead-time.png`, alt: 'Cancellation rates by booking lead-time interval', description: 'Original notebook output, cell 21. TEST is excluded from this analysis.' },
  },
  {
    eyebrow: 'Temporal validation', title: 'Learn from the past and evaluate a later period',
    steps: ['Past', 'TRAIN / fit', 'VALIDATION', 'TEST', 'Future'],
    metrics: [
      { label: 'TRAIN / fit', value: '77,698', description: '65.08%. Arrivals: July 1, 2015 to December 25, 2016.' },
      { label: 'VALIDATION', value: '19,494', description: '16.33%. Arrivals: December 26, 2016 to April 30, 2017.' },
      { label: 'TEST', value: '22,198', description: '18.59%. Arrivals: May 1 to August 31, 2017.' },
    ],
    body: [
      'TRAIN fits models. Hyperparameter search uses three temporal windows within TRAIN/FIT, keeping bookings from the same day together. VALIDATION compares configurations and selects model and threshold. TEST is accessed only after the decision is fixed in this execution.',
      'The selected pipeline is finally refitted on all 97,192 development bookings. The split uses arrival dates, not creation dates, so it does not exactly reproduce booking-time knowledge. TEST had already been evaluated in earlier versions; another period is needed for an external check without prior exposure.',
    ],
  },
  {
    eyebrow: 'Pipeline', title: 'Preprocessing learned within each fit',
    steps: ['ColumnTransformer', 'SimpleImputer', 'StandardScaler / OneHotEncoder', 'Classifier'],
    body: [
      'Numeric inputs use median imputation and standardization. Categorical inputs receive an unknown category and OneHotEncoder with handle_unknown=infrequent_if_exist, min_frequency=30 and max_categories=20.',
      'Pipeline encapsulates preparation and modeling. During comparison, medians, scales and categories are learned only from each fitting set; final refitting uses all development data, never TEST.',
    ],
  },
  {
    eyebrow: 'Models and metrics', title: 'Initial VALIDATION comparison, threshold 0.50',
    body: ['Logistic Regression is the interpretable baseline; its balanced version increases the weight of canceled bookings. Random Forest and HistGradientBoosting are the finalists.'],
    metrics: [
      { label: 'Logistic Regression', value: '0.871', description: 'ROC-AUC. Precision 72.3%; Recall 73.2%; F1 72.7%.' },
      { label: 'Logistic balanced', value: '0.872', description: 'ROC-AUC. Precision 65.4%; Recall 83.3%; F1 73.2%.' },
      { label: 'Random Forest', value: '0.895', description: 'ROC-AUC. Precision 83.2%; Recall 57.1%; F1 67.7%.' },
      { label: 'HistGradientBoosting', value: '0.902', description: 'ROC-AUC. Precision 81.0%; Recall 62.1%; F1 70.3%.' },
    ],
    items: ['ROC-AUC: overall discrimination, independent of the selected threshold.', 'Precision: the proportion of flagged bookings that actually cancel.', 'Recall: the proportion of actual cancellations detected.', 'F1: the harmonic mean of Precision and Recall.'],
  },
  {
    eyebrow: 'Optimization', title: 'An optimized version does not necessarily improve every metric',
    body: [
      'RandomizedSearchCV tests 12 Random Forest configurations: trees, depth, minimum split size, minimum leaf size, features per split and class weights. GridSearchCV tests four HGB configurations: leaves (15/31) and L2 regularization (0.1/5.0). HGB keeps learning_rate=0.08 and max_iter=150; its learning rate is not tuned.',
      'Both searches optimize mean ROC-AUC in three temporal TRAIN/FIT windows. VALIDATION AUC moves from 0.8950 to 0.8933 for RF and from 0.9018 to 0.8998 for HGB. Versions are compared before selection; optimized is not automatically better.',
    ],
  },
  {
    eyebrow: 'Selection', title: 'Initial HistGradientBoosting + threshold 0.30',
    metrics: [
      { label: 'Optimized RF at 0.30', value: '0.8933', description: 'AUC; Precision 71.8%; Recall 77.8%; F1 74.6%; flagged 39.7%.' },
      { label: 'Initial HGB at 0.30', value: '0.9018', description: 'AUC; Precision 76.2%; Recall 75.3%; F1 75.7%; flagged 36.2%.' },
    ],
    body: [
      'Initial HGB offers higher AUC, Precision and F1 than optimized RF with fewer interventions, at the cost of 2.5 Recall points. Optimized HGB does not provide a sufficient operational improvement.',
      'Final configuration: max_iter=150, learning_rate=0.08, max_leaf_nodes=15, l2_regularization=1.0 and early_stopping=False. Model plus threshold are selected before accessing TEST in this execution.',
    ],
  },
  {
    eyebrow: 'Threshold', title: '0.30 is an operational choice, not a universal optimum',
    body: [
      'Nine thresholds between 0.20 and 0.60 are studied on VALIDATION. A threshold turns a probability into a decision: at 0.30, a cancellation probability of 0.72 triggers an alert. Lower thresholds usually increase Recall and intervention volume but reduce Precision.',
      'HGB at 0.25: Precision 72.5%, Recall 80.0%, F1 76.1% and 40.5% flagged. At 0.30: Precision 76.2%, Recall 75.3%, F1 75.7% and 36.2% flagged. Fewer false alarms and lower workload are preferred for a small F1 loss. Without actual FP/FN costs, an economic optimum has not been demonstrated.',
    ],
    image: { src: `${base}/images/threshold-analysis.png`, alt: 'Precision and Recall across thresholds for optimized RF and HistGradientBoosting', description: 'Original VALIDATION curves, notebook cell 53.' },
  },
  {
    eyebrow: 'Final results', title: 'TEST: refitted HistGradientBoosting, threshold 0.30',
    metrics: [
      { label: 'ROC-AUC', value: '0.8914', description: 'Discrimination in the final period.' },
      { label: 'Precision', value: '68.2%', description: 'About 68 out of every 100 alerts actually cancel.' },
      { label: 'Recall', value: '89.0%', description: 'About 89 out of every 100 actual cancellations detected.' },
      { label: 'F1', value: '77.3%', description: 'Balance between Precision and Recall.' },
      { label: 'Flagged bookings', value: '52.9%', description: '11,745 of the 22,198 TEST bookings.' },
      { label: 'False alarms', value: '31.8%', description: 'Of issued alerts, not of all bookings.' },
    ],
    body: ['8,014 true positives, 987 false negatives, 3,731 false positives and 9,466 true negatives. The provisional 70% Precision reference is not maintained. These results do not demonstrate financial savings or a production deployment.'],
    image: { src: `${base}/images/test-confusion-matrix.png`, alt: 'TEST confusion matrix: TN 9466, FP 3731, FN 987, TP 8014', description: 'Saved evaluation from cell 59. Rows: actual outcome; columns: prediction.' },
  },
  {
    eyebrow: 'Validation versus Test', title: 'Higher detection, but also a larger operational workload',
    items: ['Precision: 76.2% to 68.2%.', 'Recall: 75.3% to 89.0%.', 'Flagged bookings: 36.2% to 52.9%.'],
    body: ['TEST covers a later period and the final model is refitted on the full development set. The change is compatible with distribution differences but does not establish its cause. The threshold is not readjusted after seeing TEST, which would contaminate evaluation.'],
  },
  {
    eyebrow: 'SHAP', title: 'Which variables contribute to estimated risk?',
    body: [
      'SHAP shows how each variable increases or decreases the model score, not a causal relationship. TreeExplainer is applied to the final HGB using a random sample of 250 TEST bookings, selected without looking at their labels.',
      'Ranking grouped by original variable: country, agent, required_car_parking_spaces, total_of_special_requests, lead_time, customer_type, market_segment and arrival_date_year. The plot shows individual columns, including One-Hot categories.',
      'Contributions use log-odds, not percentage points. Base value plus contributions, transformed into probability, is verified against predict_proba.',
    ],
    image: { src: `${base}/images/shap-summary.png`, alt: 'SHAP summary of the final HistGradientBoosting with log-odds contributions', description: 'Original chart from cell 61. Rankings depend on the model and sample.' },
  },
  {
    eyebrow: 'Individual explanation', title: 'From the base value to a high-risk prediction',
    body: ['In the highest estimated-risk case, country=PRT, market_segment=Groups and lead_time=323 days increase the score. The waterfall adds positive and negative contributions to the base value. This is an extreme case selected by prediction, not a representative booking or a causal rule.'],
    image: { src: `${base}/images/shap-waterfall-high.png`, alt: 'SHAP waterfall for the highest-risk booking: Portugal, Groups and 323-day lead time', description: 'First waterfall from cell 63; log-odds scale.' },
  },
  {
    eyebrow: 'Parking', title: 'A strong association that needs validation',
    body: ['Requesting parking is associated with lower estimated risk; this does not mean parking prevents cancellations. Its contribution is negative in the lowest-risk example. Before production, verify the original request, compare stability across periods and evaluate models with and without parking.'],
    image: { src: `${base}/images/shap-waterfall-low.png`, alt: 'SHAP waterfall of the lowest-risk case showing a negative contribution from requested parking', description: 'Second waterfall from cell 63; an individual example, not causal evidence.' },
  },
  {
    eyebrow: 'Business application', title: 'A prioritization system for low-cost actions',
    body: ['The proposal is a supervised pilot, not an already validated automated policy. These levels are conceptual: additional thresholds for three risk bands have not been validated.'],
    items: ['Low risk: no additional intervention.', 'Medium risk: automatic reminder or confirmation.', 'High risk: reconfirmation and follow-up; Revenue Management support.', 'Potential overbooking support after validating costs, capacity and operational risks.', 'Do not automatically impose deposits, restrictions or penalties based on predictions.', 'Measure benefit and contact workload: more than half of TEST bookings are flagged.'],
  },
  {
    eyebrow: 'Limitations', title: 'An academic result awaiting operational validation',
    items: ['The CSV cannot verify the actual recording time of each input.', 'The split uses arrival dates, not booking creation dates.', 'EDA includes all development data and validation supports multiple decisions: estimates may be optimistic.', 'TEST was exposed in previous versions; a new external period is needed.', 'Retained possible duplicates and unusual values need review.', 'SHAP describes associations, not causes or guaranteed future stability.'],
  },
  {
    eyebrow: 'Next steps', title: 'Translate false positives and negatives into economic impact',
    body: ['A false negative may miss the opportunity to resell a room; a false positive adds an unnecessary intervention. Estimating both costs would allow threshold selection by expected cost and actual team capacity, using new validation data.'],
    items: ['Validate temporal availability of ADR, history, parking and requests.', 'Compare models with and without parking.', 'Review calibration and test new periods.', 'Monitor distributions, Precision and flagged booking rates.', 'Retrain periodically with temporal evaluation.', 'Run a pilot and measure costs before automating decisions.'],
  },
];

export const hotelBookingCancellationDossier: ProjectDossier = {
  title: 'Hotel Booking Cancellation Prediction',
  slug: 'hotel-booking-cancellation-ml',
  subtitle: 'Predicción de cancelaciones con validación temporal, selección de umbral y SHAP',
  author: 'Daniel García Nilo',
  description: 'Proyecto finalizado del Máster en Data Science & IA: clasificación de reservas hoteleras con Python y scikit-learn, centrada en el equilibrio entre detección de cancelaciones y falsas alarmas.',
  longDescription: '119.390 reservas, dos hoteles y una evaluación temporal. El trabajo combina auditoría de datos, prevención de leakage, EDA, pipelines, comparación y optimización de modelos, selección de HistGradientBoosting con umbral 0,30 e interpretación SHAP. En TEST alcanza ROC-AUC 0,8914 y Recall 89,0 %, con Precision 68,2 % y 52,9 % de reservas señaladas.',
  categories: ['master', 'data-science'],
  status: 'terminado',
  technologies: ['Python', 'Pandas', 'NumPy', 'scikit-learn', 'Matplotlib', 'SHAP', 'SciPy', 'IPython', 'Jupyter Notebook', 'Random Forest', 'HistGradientBoosting', 'Binary Classification'],
  colorTheme: { primary: '#B8966B', soft: 'rgba(184, 150, 107, 0.10)' },
  coverImage: '/images/projects/hotel-booking-cancellation-ml-cover.jpg',
  githubUrl,
  resources: resources(false),
  videos: [],
  gallery: [],
  detailSections: sectionsEs,
  notes: ['Fuente principal: cancelaciones_hoteleras_DanielGarcia.ipynb, con salidas guardadas. El dossier prioriza el notebook y el CSV frente a erratas de la presentación. Las figuras conservan los rótulos originales en español.'],
  translations: {
    en: {
      subtitle: 'Cancellation prediction with temporal validation, threshold selection and SHAP',
      description: 'Completed Data Science & AI Master project: hotel booking classification with Python and scikit-learn, focused on balancing cancellation detection and false alarms.',
      longDescription: '119,390 bookings, two hotels and a temporal evaluation. The project combines data auditing, leakage prevention, EDA, pipelines, model comparison and optimization, selection of HistGradientBoosting at threshold 0.30 and SHAP explanations. TEST ROC-AUC is 0.8914 and Recall is 89.0%, with 68.2% Precision and 52.9% of bookings flagged.',
      resources: resources(true),
      detailSections: sectionsEn,
      notes: ['Primary source: cancelaciones_hoteleras_DanielGarcia.ipynb with saved outputs. The dossier prioritizes the notebook and CSV over presentation typos. Figures retain their original Spanish labels.'],
    },
  },
};
