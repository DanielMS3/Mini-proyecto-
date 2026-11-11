import { TeamMember, BacklogItem, DailyScrumRecord, RetrospectiveAgreement } from '../types';

export const ACADEMIC_INFO = {
  title: "Simulación de un Sprint de Scrum para el Registro de Fallas de Internet",
  shortTitle: "Registro Trazable de Fallas ISP",
  institution: "Corporación Universitaria Tecnológica del Oriente",
  program: "Ingeniería de Software",
  course: "Seminario de Actualización N6 Gr B",
  professor: "Docente: Leydi Johana Polo Amador",
  date: "Noviembre de 2026",
  sprintDuration: "5 días hábiles (Día 1 a Día 5)",
  initialVelocity: 13,
  prototypeVersion: "v0.1",
  deliverable: "Prototipo funcional, bitácora de intentos y matriz de resultados de prueba",
  contextSummary: "En un proveedor local de internet, los reportes de falla que llegan por chat quedan dispersos o llegan sin el sector donde ocurre el problema. Se automatiza la validación y se genera un folio para seguir cada intento con trazabilidad completa."
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Jesús Telmo Nene",
    role: "Product Owner",
    responsibilities: [
      "Ordena y prioriza el Product Backlog",
      "Explica la problemática de la mesa de soporte del ISP",
      "Define y valida criterios de aceptación observables",
      "Acepta o rechaza los incrementos en el Sprint Review"
    ],
    reportSections: "Secciones 1, 3, 8 y visión prospectiva",
    avatarSeed: "Jesus",
    bio: "Conoce de primera mano el flujo operativo de los proveedores locales de internet y cuida el valor de negocio de la trazabilidad."
  },
  {
    name: "Astrid Villota",
    role: "Scrum Master",
    responsibilities: [
      "Facilita Sprint Planning, Daily Scrums, Sprint Review y Retrospectiva",
      "Registra impedimentos y actas formales de acuerdos",
      "Da seguimiento riguroso a los acuerdos de mejora",
      "Custodia el cumplimiento de los tiempos de ceremonia (timebox)"
    ],
    reportSections: "Secciones 4, 6, 9, 12 y revisión de formato APA",
    avatarSeed: "Astrid",
    bio: "Guía al equipo en los principios ágiles, protegiendo el foco del desarrollador y fomentando la inspección y adaptación constante."
  },
  {
    name: "Daniel Moreno",
    role: "Desarrollador",
    responsibilities: [
      "Construye el flujo y el motor de validación del prototipo",
      "Genera la numeración correlacionada de folios INT-00x",
      "Prepara y ejecuta los casos de prueba automatizados",
      "Actualiza el Sprint Backlog con los resultados y evidencias técnicas"
    ],
    reportSections: "Secciones 5, 7, 10 y referencias técnicas",
    avatarSeed: "Daniel",
    bio: "Ingeniero de software a cargo del incremento técnico, asegurando código limpio, validación de cadenas y registro auditable de eventos."
  }
];

export const INITIAL_BACKLOG: BacklogItem[] = [
  {
    id: "PB01",
    title: "Registro de reporte con sector y descripción",
    userStory: "Como agente de soporte, quiero registrar un reporte con sector y descripción, para obtener un folio con el cual seguir el caso.",
    acceptanceCriteria: "Un sector y una descripción válidos generan un folio correlativo y el estado Registrado.",
    points: 5,
    priority: "Alta",
    sprint: 1,
    status: "Terminado",
    assignee: "Daniel Moreno",
    tasks: ["T1. Crear el formulario, asignar un folio por intento y mostrar el resultado."],
    testCaseRef: "CP01"
  },
  {
    id: "PB02",
    title: "Rechazo de reportes incompletos o con solo espacios",
    userStory: "Como agente de soporte, quiero que se rechacen los reportes incompletos y se indique qué falta, para no perder tiempo con intentos inválidos.",
    acceptanceCriteria: "Si falta un campo o solo hay espacios, el intento se rechaza y se indica qué información se requiere.",
    points: 3,
    priority: "Alta",
    sprint: 1,
    status: "Terminado",
    assignee: "Daniel Moreno",
    tasks: ["T2. Validar sector y descripción, incluidos valores vacíos o con espacios (recorte .trim())."],
    testCaseRef: "CP02, CP03"
  },
  {
    id: "PB03",
    title: "Bitácora correlacionada de intentos para auditoría",
    userStory: "Como supervisor, quiero consultar cada intento con su folio, fecha, versión y resultado, para reconstruir lo ocurrido.",
    acceptanceCriteria: "Cada intento muestra folio, fecha, versión y resultado; un rechazo incluye el motivo observable.",
    points: 5,
    priority: "Alta",
    sprint: 1,
    status: "Terminado",
    assignee: "Daniel Moreno",
    tasks: ["T3. Mostrar una bitácora correlacionada por folio, con versión y fecha.", "T4. Integrar el flujo y verificar los casos antes de la Review (revisión cruzada)."],
    testCaseRef: "CP04"
  },
  {
    id: "PB04",
    title: "Persistencia del historial entre sesiones",
    userStory: "Como agente, quiero que el historial siga disponible al cerrar la herramienta, para retomar un caso otro día.",
    acceptanceCriteria: "Tras cerrar y abrir la herramienta, el historial y sus folios siguen disponibles sin reutilizar folios guardados.",
    points: 8,
    priority: "Alta",
    sprint: 2,
    status: "Por Hacer",
    assignee: "Daniel Moreno",
    tasks: ["Implementar almacenamiento local persistente", "Garantizar no colisión de folios previos"]
  },
  {
    id: "PB05",
    title: "Búsqueda de casos por folio",
    userStory: "Como agente, quiero buscar un caso por su folio, para atender al cliente que lo menciona.",
    acceptanceCriteria: "Al consultar un folio existente se muestra su registro; si no existe, se informa el resultado.",
    points: 3,
    priority: "Media",
    sprint: 2,
    status: "Por Hacer",
    assignee: "Daniel Moreno",
    tasks: ["Campo de búsqueda por folio exacto o parcial", "Visualización instantánea del caso"]
  },
  {
    id: "PB06",
    title: "Restricción de acceso al historial (RBAC)",
    userStory: "Como supervisor, quiero restringir el acceso al historial, para proteger los datos de los clientes.",
    acceptanceCriteria: "Solo una persona con rol/permiso de soporte puede consultar el historial conforme a la Ley 1581 de 2012.",
    points: 5,
    priority: "Media",
    sprint: 3,
    status: "Por Hacer",
    assignee: "Daniel Moreno",
    tasks: ["Control de roles: Agente, Supervisor, Auditor"]
  },
  {
    id: "PB07",
    title: "Asignación de caso a un responsable técnico",
    userStory: "Como supervisor, quiero asignar un caso a una persona, para saber quién lo atiende.",
    acceptanceCriteria: "Al asignar un responsable, se registra quién recibió el caso y la marca de tiempo de la asignación.",
    points: 5,
    priority: "Media",
    sprint: 3,
    status: "Por Hacer",
    assignee: "Daniel Moreno",
    tasks: ["Selector de técnicos de soporte", "Trazabilidad de asignación"]
  },
  {
    id: "PB08",
    title: "Cierre de caso con motivo documentado",
    userStory: "Como agente, quiero cerrar un caso indicando el motivo, para saber qué fallas ya se resolvieron.",
    acceptanceCriteria: "El cierre exige un motivo explícito y deja el cambio de estado con fecha y hora en el historial.",
    points: 5,
    priority: "Media",
    sprint: 4,
    status: "Por Hacer",
    assignee: "Daniel Moreno",
    tasks: ["Formulario de resolución de falla", "Transición a estado Cerrado"]
  }
];

export const DAILY_SCRUM_LOGS: DailyScrumRecord[] = [
  {
    day: 1,
    phase: "Análisis y diseño",
    mainVoice: "Jesús Telmo Nene (PO)",
    summary: "Se detecta que falta definir si los intentos inválidos dejan rastro. Se precisa PB03: sí generan un evento.",
    inspectionAndAdjustment: "Un registro que solo guarda lo exitoso responde «qué pasó», pero no «qué intentó la gente y por qué falló». Se decide que los rechazos también reciben folio y evento.",
    dialogue: [
      { speaker: "Astrid (SM)", text: "Iniciamos el Daily del Día 1. ¿Qué definimos hoy para el inicio del desarrollo?" },
      { speaker: "Jesús (PO)", text: "Al revisar el flujo con soporte, detecto una laguna: si un agente manda un reporte vacío, ¿debe desaparecer o quedar guardado? En soporte necesitamos auditar los intentos fallidos." },
      { speaker: "Daniel (Dev)", text: "De acuerdo. Ajusto el diseño para que el motor asigne folio y genere evento de rechazo en la bitácora técnica." }
    ]
  },
  {
    day: 2,
    phase: "Desarrollo",
    mainVoice: "Daniel Moreno (Dev)",
    summary: "El registro nominal tiene salida prevista. Se mantiene la prioridad de conectar el rechazo con el folio.",
    inspectionAndAdjustment: "Se construye la estructura básica del formulario y la función de numeración correlativa INT-00x.",
    dialogue: [
      { speaker: "Daniel (Dev)", text: "Ayer implementé el formulario base. El flujo nominal con sector y descripción ya genera folio INT-001 y estado Registrado." },
      { speaker: "Astrid (SM)", text: "¿Existe algún impedimento para avanzar con los rechazos?" },
      { speaker: "Daniel (Dev)", text: "Ninguno. Hoy conectaré la validación de campos obligatorios con la generación del evento de rechazo." }
    ]
  },
  {
    day: 3,
    phase: "Desarrollo",
    mainVoice: "Daniel Moreno (Dev)",
    summary: "Se identifica el caso de descripción con espacios. Se añade a CP02 y se ajusta T2 para recortar los espacios (.trim()).",
    inspectionAndAdjustment: "Hallazgo crítico durante codificación: una persona podía teclear tres barras espaciadoras y pasar la validación simple. Se implementa .trim().",
    dialogue: [
      { speaker: "Daniel (Dev)", text: "Encontré un caso límite: si alguien escribe solo espacios ('   ') en la descripción, la comprobación 'desc !== \"\"' la daba por válida." },
      { speaker: "Jesús (PO)", text: "Excelente ojo Daniel. Eso no debe permitirse. Debe rechazarse indicando qué falta." },
      { speaker: "Astrid (SM)", text: "Registramos este ajuste en el Sprint Backlog. Se actualiza T2 y se añade a los casos de prueba." }
    ]
  },
  {
    day: 4,
    phase: "Validación",
    mainVoice: "Astrid Villota (SM)",
    summary: "Se revisan los cuatro casos de prueba. Se prepara la demostración de un registro válido y un rechazo.",
    inspectionAndAdjustment: "Astrid y Jesús ejecutan la revisión cruzada de CP01 a CP04 antes de la Review, validando que el motor no dependa de una sola mirada.",
    dialogue: [
      { speaker: "Astrid (SM)", text: "Día 4 dedicado a pruebas y revisión cruzada. Jesús y yo ejecutaremos los casos en Node.js y en el prototipo." },
      { speaker: "Jesús (PO)", text: "He corrido CP01 (Sector A válido), CP02 (espacios) y CP03 (sin sector). Los tres dan los folios INT-001, INT-002 e INT-003 esperados." },
      { speaker: "Daniel (Dev)", text: "Y CP04 comprueba que los 3 eventos coexisten en la bitácora con hora colombiana y versión v0.1." }
    ]
  },
  {
    day: 5,
    phase: "Validación y cierre",
    mainVoice: "Astrid Villota (SM)",
    summary: "Se comprueba el guion de la Review. Se aclara que la bitácora dura solo una sesión en v0.1.",
    inspectionAndAdjustment: "Preparación para el Sprint Review y Retrospectiva. Se documenta la limitación de sesión volátil que motiva PB04 para el Sprint 2.",
    dialogue: [
      { speaker: "Astrid (SM)", text: "Hoy culminamos el Sprint. A las 3 PM tenemos la Review con el representante simulado de soporte y luego la Retrospectiva." },
      { speaker: "Jesús (PO)", text: "Listo el guion: demostraremos el envío válido y luego el rechazo inmediato con motivo." },
      { speaker: "Daniel (Dev)", text: "Incremento v0.1 listo y verificado con los 13 puntos cumplidos." }
    ]
  }
];

export const RETROSPECTIVE_AGREEMENTS: RetrospectiveAgreement[] = [
  {
    observation: "El folio común facilitó comparar la salida y la bitácora.",
    agreement: "Mantener la relación entre ítem de backlog, caso de prueba y evidencia.",
    responsible: "Daniel Moreno verifica esa relación al actualizar el tablero.",
    tracking: "Comprobar en cada tarea técnica qué caso de prueba la valida.",
    verified: true
  },
  {
    observation: "El caso de espacios apareció después de planificar la validación.",
    agreement: "Escribir un ejemplo válido y uno inválido por ítem crítico antes de construirlo.",
    responsible: "Jesús Telmo Nene y Daniel Moreno revisan los ejemplos en la próxima Planning.",
    tracking: "Validar ejemplos de aceptación antes de arrancar PB04 y PB05.",
    verified: true
  },
  {
    observation: "La pérdida del historial al recargar se entiende mejor al probar el flujo en vivo.",
    agreement: "Demostrar temprano las limitaciones que afectan el uso operativo de soporte.",
    responsible: "Astrid Villota facilita una comprobación a mitad del próximo Sprint.",
    tracking: "Realizar una inspección preliminar en el Día 3 del Sprint 2.",
    verified: true
  }
];

export const ACADEMIC_REFERENCES = [
  {
    citation: "Comisión de Regulación de Comunicaciones. (2017).",
    title: "Resolución 5111 de 2017: Régimen de Protección de los Derechos de los Usuarios de Servicios de Comunicaciones.",
    detail: "Diario Oficial n.º 50.157. Regula el seguimiento a peticiones, quejas y reclamos (PQR) en telecomunicaciones e internet en Colombia."
  },
  {
    citation: "Congreso de la República de Colombia. (2012).",
    title: "Ley Estatutaria 1581 de 2012: Disposiciones generales para la protección de datos personales.",
    detail: "Fundamenta la decisión de registrar metadatos del evento en la bitácora técnica de soporte omitiendo datos personales sensibles innecesarios."
  },
  {
    citation: "Schwaber, K., & Sutherland, J. (2020).",
    title: "The Scrum Guide: The Definitive Guide to Scrum: The Rules of the Game.",
    detail: "Define los 3 roles (PO, SM, Dev), los eventos del Sprint (Planning, Daily, Review, Retrospective) y los artefactos con sus compromisos."
  },
  {
    citation: "van der Aalst, W. M. P. (2010).",
    title: "Process Mining: Discovery, Conformance and Enhancement of Business Processes.",
    detail: "Explica cómo registrar los eventos fallidos permite entender qué intentó el usuario y por qué falló, base de la minería de procesos."
  },
  {
    citation: "IEEE Computer Society. (2014).",
    title: "Guide to the Software Engineering Body of Knowledge (SWEBOK Guide V3.0).",
    detail: "Establece el concepto de trazabilidad de software al asociar cada intento con folio, resultado, fecha y versión de flujo."
  },
  {
    citation: "Heras del Dedo, R. D. L., & Álvarez García, A. (2017).",
    title: "Métodos ágiles: Scrum, Kanban, Lean.",
    detail: "Anaya Multimedia. Fundamenta el uso de historias de usuario y la estimación con la serie de Fibonacci (1, 2, 3, 5, 8, 13)."
  },
  {
    citation: "Kuz, A., Falco, M., & Giandini, R. S. (2018).",
    title: "Comprendiendo la aplicabilidad de Scrum en el aula: Herramientas y ejemplos.",
    detail: "Revista Iberoamericana de Tecnología en Educación. Modela la aplicación pedagógica y colaborativa de Scrum en educación superior."
  },
  {
    citation: "Monte Galiano, J. (2016).",
    title: "Implantar Scrum con éxito.",
    detail: "Editorial UOC. Analiza la velocidad del equipo y por qué un solo Sprint de 13 puntos sirve como línea base pero no como predictor definitivo."
  }
];

export const MOCK_CHATS = [
  {
    customer: "Familia Morales - Cra 33 # 45",
    time: "Hace 4 min",
    sector: "Sector A",
    text: "Buenas tardes señores soporte, desde la 1 PM se cayó la señal de fibra óptica en la casa, la luz de LOS parpadea en rojo.",
    suggestedSector: "Sector A",
    suggestedDesc: "Caída de señal de fibra óptica desde la 1 PM, luz de LOS en ONT parpadeando en rojo."
  },
  {
    customer: "Alba Rocío (Tienda La Esquina)",
    time: "Hace 12 min",
    sector: "Sector B",
    text: "Hola auxilio no tengo internet para pasar los datáfonos en el local.",
    suggestedSector: "Sector B",
    suggestedDesc: "Interrupción de servicio comercial afectando operaciones de datáfono en local."
  },
  {
    customer: "Usuario Chat Web",
    time: "Hace 18 min",
    sector: "",
    text: "No me abre nada de internet",
    suggestedSector: "",
    suggestedDesc: "No abre nada de internet (reporte sin sector especificado - genera rechazo CP03)."
  },
  {
    customer: "Prueba de espacios",
    time: "Hace 25 min",
    sector: "Sector A",
    text: "   ",
    suggestedSector: "Sector A",
    suggestedDesc: "   "
  }
];

export const ISP_SECTORS = [
  "Sector A",
  "Sector B",
  "Sector Centro",
  "Sector Norte",
  "Sector Sur Industrial",
  "Sector Cabecera del Llano"
];

export const TECH_STAFF = [
  "Carlos Gómez (Técnico Redes N2)",
  "Marcela Rivas (Soporte N1)",
  "Javier Peñaranda (Fibra Óptica Terreno)",
  "Mesa de Soporte General"
];
