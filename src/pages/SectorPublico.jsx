import { Link } from 'react-router-dom'
import {
  Landmark, Users, FileSearch, ShieldCheck, Megaphone,
  GitBranch, Sparkles, AlertTriangle, BookOpen, ArrowRight,
} from 'lucide-react'
import { getToolById } from '../utils/recommender'
import { ToolFavicon } from '../components/ToolCard'

const SECTIONS = [
  {
    id: 'pqrsd',
    icon: Users,
    color: 'text-primary',
    bg: 'bg-primary/8',
    title: '1. Atención ciudadana y PQRSD',
    lead: 'Las entidades reciben miles de peticiones, quejas, reclamos, sugerencias y denuncias cada mes. La IA puede clasificar, priorizar y responder consultas de rutina, liberando al equipo humano para casos complejos.',
    useCases: [
      'Clasificar PQRSD por tipo y urgencia automáticamente',
      'Chatbot 24/7 en sedes electrónicas con respuestas basadas en la normativa vigente',
      'Resumir consultas largas y extraer datos clave (cédula, radicado, tema)',
      'Detectar tutelas o riesgos legales a tiempo para escalamiento',
      'Generar borradores de respuesta con tono institucional en plazos de ley',
    ],
    examples: [
      {
        entity: 'Alcaldía de Medellín',
        application: 'Chatbot MAIA responde consultas sobre trámites, impuestos y eventos en WhatsApp y web, reduciendo carga de call center.',
      },
      {
        entity: 'DIAN',
        application: 'Asistentes virtuales en portal MUISCA ayudan con RUT, firma electrónica y devoluciones.',
      },
      {
        entity: 'Función Pública (DAFP)',
        application: 'Análisis de PQRSD agregadas para detectar problemas sistémicos por entidad.',
      },
      {
        entity: 'Alcaldía de Bogotá — SDQS',
        application: 'Sistema Distrital de Quejas y Soluciones con categorización automática por tema y localidad para enrutar a la secretaría correcta.',
      },
      {
        entity: 'Supersalud',
        application: 'Tamizaje automático de PQRSD sensibles (urgencia vital, tutelas, óbitos) con alertas al equipo jurídico en tiempo real.',
      },
      {
        entity: 'ICBF',
        application: 'Análisis de llamadas al 141 (línea de atención) con transcripción + NLP para priorizar casos de protección inmediata.',
      },
    ],
    playbooks: [
      {
        title: 'Triage automático de PQRSD por correo',
        steps: [
          'Conectar el buzón institucional (peticiones@entidad.gov.co) a Make o Zapier AI',
          'Cada nuevo correo pasa por Claude/ChatGPT con prompt: clasificar tipo (P/Q/R/S/D), extraer cédula, tema (salud/vivienda/impuestos…), urgencia 1-5 y resumen de 3 líneas',
          'La automatización radica en el SGD (Orfeo, SAIA, GESDOC) y notifica al responsable con borrador de respuesta en Teams/Slack',
          'Panel semanal en Looker o Power BI con temas recurrentes para escalar a política pública',
        ],
        impact: 'Reducción 60–70% del tiempo de triage; trazabilidad del término de 15 días hábiles con SLA visibles.',
      },
      {
        title: 'Chatbot normativo para sede electrónica',
        steps: [
          'Subir a NotebookLM o Humata los manuales, TUPA y normativa aplicable al trámite (ej: impuesto predial)',
          'Configurar el chatbot para responder solo con citas verificables del corpus cargado',
          'Integrar con GOV.CO usando API de WhatsApp Business o widget web',
          'Revisar cada 15 días la tasa de "no sé" y alimentar el corpus con los vacíos detectados',
        ],
        impact: 'Atención 24/7 sin backlog; 40–50% de consultas frecuentes resueltas sin escalar a asesor.',
      },
    ],
    tools: ['chatgpt', 'claude', 'humata', 'zapier-ai', 'manus'],
  },
  {
    id: 'politicas',
    icon: BookOpen,
    color: 'text-accent',
    bg: 'bg-accent/8',
    title: '2. Análisis de políticas públicas y regulación',
    lead: 'CONPES, decretos, leyes, circulares y reglamentos técnicos suman cientos de páginas. La IA permite investigar rápido, encontrar precedentes y preparar evaluaciones de impacto.',
    useCases: [
      'Buscar artículos específicos en leyes, decretos y sentencias',
      'Comparar versiones de una misma norma entre trámites',
      'Generar fichas técnicas de política pública con evidencia',
      'Resumir documentos CONPES y estudios sectoriales en minutos',
      'Traducir marcos normativos internacionales a contexto colombiano',
    ],
    examples: [
      {
        entity: 'DNP',
        application: 'Análisis de consistencia entre CONPES, Plan Nacional de Desarrollo y Presupuesto Plurianual de Inversiones.',
      },
      {
        entity: 'MINTIC',
        application: 'Implementación del CONPES 4144 (IA) y la política de transformación digital con investigación comparada.',
      },
      {
        entity: 'Minjusticia',
        application: 'Análisis de sentencias de la Corte Constitucional para evaluar impacto de proyectos de ley.',
      },
      {
        entity: 'MinAmbiente',
        application: 'Cruce de POMCAS, planes de ordenamiento y resoluciones ANLA para ajustar licenciamiento ambiental regional.',
      },
      {
        entity: 'MinHacienda — DGPM',
        application: 'Síntesis de marcos fiscales de la OCDE y benchmarks regionales para la Regla Fiscal y Marco Fiscal de Mediano Plazo.',
      },
      {
        entity: 'Congreso de la República',
        application: 'Unidades técnicas legislativas usando NotebookLM para comparar proyectos de ley vs. iniciativas similares hundidas en periodos anteriores.',
      },
    ],
    playbooks: [
      {
        title: 'Ficha técnica de impacto regulatorio en 2 horas',
        steps: [
          'Subir a NotebookLM el proyecto de ley/decreto, normativa vigente relacionada, estudios OCDE y 3–5 sentencias relevantes',
          'Pedir: "genera matriz AIR (Análisis de Impacto Regulatorio) con costos, beneficios, afectados y alternativas evaluadas"',
          'Cruzar con Perplexity: "¿qué países han implementado medidas similares y con qué resultado entre 2020-2026?"',
          'Validar con equipo jurídico y armar ficha final con citas trazables',
        ],
        impact: 'De 2 semanas a 2 horas en primera versión; queda tiempo para profundizar en puntos críticos.',
      },
      {
        title: 'Búsqueda jurisprudencial para exposición de motivos',
        steps: [
          'Cargar en Humata o CoCounsel las sentencias de la Corte Constitucional y Consejo de Estado sobre el tema',
          'Preguntar: "identifica la ratio decidendi en cada una y construye una línea jurisprudencial"',
          'Pedir citas con número de sentencia + página exacta para incluir en el proyecto',
          'Verificar manualmente las citas antes de publicar (la IA puede alucinar números de radicado)',
        ],
        impact: 'Exposiciones de motivos más robustas; menor riesgo de vicios por inconstitucionalidad sobreviniente.',
      },
    ],
    tools: ['claude', 'perplexity', 'notebooklm', 'humata', 'cocounsel'],
  },
  {
    id: 'secop',
    icon: FileSearch,
    color: 'text-warm',
    bg: 'bg-warm/8',
    title: '3. Contratación pública y SECOP II',
    lead: 'Colombia Compra Eficiente maneja millones de procesos en SECOP II. La IA ayuda a estructurar pliegos, revisar ofertas, detectar alertas de colusión y dar seguimiento a la ejecución contractual.',
    useCases: [
      'Redactar estudios previos y pliegos con lenguaje claro y alineados al estatuto',
      'Comparar ofertas técnicas y económicas lado a lado',
      'Detectar patrones de colusión (mismos proponentes, precios atípicos)',
      'Resumir contratos largos y marcar cláusulas de riesgo',
      'Verificar requisitos habilitantes automáticamente contra RUP',
    ],
    examples: [
      {
        entity: 'Colombia Compra Eficiente (CCE)',
        application: 'Tienda Virtual del Estado + modelos de IA para recomendar acuerdos marco y estandarizar documentos tipo.',
      },
      {
        entity: 'Contraloría General',
        application: 'OCEANO — análisis masivo de contratos del SECOP para detectar riesgos de corrupción.',
      },
      {
        entity: 'Secretarías de Hacienda (municipios)',
        application: 'Revisión asistida de pliegos antes de publicación para reducir adendas y demandas.',
      },
      {
        entity: 'Agencia Nacional de Infraestructura (ANI)',
        application: 'Revisión asistida de contratos de concesión 4G/5G (cientos de páginas) para identificar riesgos de controversias contractuales.',
      },
      {
        entity: 'Ministerio de Defensa — Agencia Logística',
        application: 'Comparación masiva de cotizaciones de víveres y uniformes entre regionales para detectar sobrecostos sistemáticos.',
      },
      {
        entity: 'Empresas Sociales del Estado (ESE)',
        application: 'Estandarización de estudios previos de medicamentos POS y dispositivos con Claude + plantillas tipo CCE.',
      },
    ],
    playbooks: [
      {
        title: 'Detector de alertas de colusión en procesos SECOP',
        steps: [
          'Descargar de datos.gov.co los procesos del SECOP de los últimos 24 meses (CSV)',
          'Subir a Julius AI y preguntar: "encuentra procesos donde ganen siempre los mismos 2–3 proponentes; proponentes que rotan pero pertenecen al mismo grupo; precios con varianza menor al 1% entre 3+ oferentes"',
          'Cruzar hallazgos con RUES y SIIF para verificar direcciones, representantes legales y beneficiarios finales',
          'Generar reporte para el comité de contratación y archivo de soporte para posible traslado a entes de control',
        ],
        impact: 'Identificación temprana de patrones atípicos que un muestreo tradicional no detectaría.',
      },
      {
        title: 'Revisión jurídica de pliegos antes de publicación',
        steps: [
          'Subir a Humata o CoCounsel el borrador de pliego + Ley 80, Ley 1150, Decreto 1082 y documentos tipo vigentes',
          'Pedir: "identifica cláusulas que contradicen normativa vigente, requisitos desproporcionados y criterios subjetivos de calificación"',
          'Revisar cada hallazgo con el abogado de procesos — la IA propone, el humano decide',
          'Dejar trazabilidad de la revisión como soporte ante observaciones o demandas',
        ],
        impact: 'Menos adendas reactivas, menor exposición a tutelas contractuales y observaciones de la Contraloría.',
      },
    ],
    tools: ['claude', 'humata', 'mindbridge', 'chatgpt', 'cocounsel'],
  },
  {
    id: 'datos',
    icon: GitBranch,
    color: 'text-secondary',
    bg: 'bg-secondary/8',
    title: '4. Datos abiertos y transparencia',
    lead: 'Colombia es líder regional en datos abiertos (datos.gov.co). La IA puede cruzar datasets del DANE, SISPRO, SIGPOT o DNP y convertirlos en insights accionables para toma de decisiones.',
    useCases: [
      'Cruzar datos de varias entidades sin saber SQL avanzado',
      'Detectar tendencias en encuestas del DANE (GEIH, ECV, Censo)',
      'Visualizar ejecución presupuestal por territorio en tiempo real',
      'Identificar brechas de cobertura en salud, educación o seguridad',
      'Preparar boletines de datos abiertos con narrativas automáticas',
    ],
    examples: [
      {
        entity: 'DANE',
        application: 'Uso de IA para control de calidad de microdatos censales y geocoded statistics.',
      },
      {
        entity: 'MinSalud — SISPRO',
        application: 'Análisis predictivo de cobertura en salud y detección temprana de brotes.',
      },
      {
        entity: 'Secretaría de Planeación (ciudades)',
        application: 'Tableros territoriales con indicadores ODS vinculados al Plan de Desarrollo Municipal.',
      },
      {
        entity: 'IDEAM',
        application: 'Predicción de niveles de ríos con modelos de ML entrenados sobre series históricas hidrológicas y meteorológicas.',
      },
      {
        entity: 'Secretaría de Movilidad — Bogotá/Medellín',
        application: 'Visión computacional para conteo vehicular en tiempo real y optimización de semáforos según flujo.',
      },
      {
        entity: 'Fiscalía General — eje de análisis',
        application: 'Análisis de cohortes del Sistema Penal Oral Acusatorio para identificar cuellos de botella por tipo de delito.',
      },
    ],
    playbooks: [
      {
        title: 'Cruce de brechas territoriales sin SQL',
        steps: [
          'Descargar de datos.gov.co los datasets relevantes (ej: cobertura educativa + pobreza multidimensional por municipio)',
          'Subir ambos CSV a Julius AI y preguntar: "haz merge por código DANE de municipio y encuentra los 20 municipios con mayor brecha"',
          'Pedir mapa coroplético con el resultado y ranking por departamento',
          'Validar con equipo técnico y anexar el mapa al informe de planeación',
        ],
        impact: 'Decisiones de inversión basadas en evidencia territorial; democratiza el análisis para no-técnicos.',
      },
      {
        title: 'Boletín mensual de ejecución presupuestal automatizado',
        steps: [
          'Exportar mensualmente ejecución SIIF Nación o SICOF territorial a CSV',
          'Con ChatGPT Advanced Data Analysis o Rows: generar gráficas por entidad, rubro y % de avance',
          'Pedir: "escribe un resumen ejecutivo de 200 palabras destacando los 3 rubros con mayor rezago y los 3 con ejecución atípicamente alta"',
          'Publicar en el portal de transparencia con los datasets fuente para trazabilidad',
        ],
        impact: 'Rendición de cuentas oportuna sin carga operativa; trazabilidad completa.',
      },
    ],
    tools: ['julius', 'notebooklm', 'claude', 'perplexity', 'rows'],
  },
  {
    id: 'comunicacion',
    icon: Megaphone,
    color: 'text-primary',
    bg: 'bg-primary/8',
    title: '5. Comunicación pública y pedagogía ciudadana',
    lead: 'Campañas institucionales, piezas para redes, infografías y videos educativos deben salir rápido y en varios canales. La IA generativa acelera producción sin sacrificar calidad.',
    useCases: [
      'Generar piezas gráficas para GOV.CO y redes sociales',
      'Traducir comunicados a lenguas indígenas o lenguaje claro',
      'Crear videos explicativos de trámites para adultos mayores',
      'Redactar boletines de prensa alineados al tono institucional',
      'Producir audio descriptivo y subtítulos para accesibilidad',
    ],
    examples: [
      {
        entity: 'Presidencia / Mincultura',
        application: 'Campañas multilingües en castellano + lenguas nativas usando traducción asistida por IA.',
      },
      {
        entity: 'Superintendencias',
        application: 'Videos con avatares IA explicando derechos del consumidor en redes.',
      },
      {
        entity: 'Gobernaciones',
        application: 'Generación de infografías territoriales de rendición de cuentas.',
      },
      {
        entity: 'Registraduría — campañas de cedulación',
        application: 'Videos educativos cortos para jóvenes sobre cédula digital y elecciones, producidos con HeyGen en minutos.',
      },
      {
        entity: 'MinEducación — Todos a Aprender',
        application: 'Audiocuentos y material pedagógico en lenguas indígenas (wayuunaiki, nasa yuwe) con ElevenLabs + revisión humana.',
      },
      {
        entity: 'Secretarías de Salud territoriales',
        application: 'Campañas masivas de vacunación con piezas adaptadas por grupo etario y dialecto regional generadas con Canva + DALL-E.',
      },
    ],
    playbooks: [
      {
        title: 'Traducción a lenguaje claro para trámites GOV.CO',
        steps: [
          'Tomar el texto legal del trámite (ej: solicitud de subsidio) tal como figura en el decreto',
          'En Claude: "reescribe este texto en lenguaje claro para alguien con básica primaria. Máximo 7 palabras por frase, voz activa, sin tecnicismos. Preserva los plazos y requisitos exactos"',
          'Someter a prueba de lectura con servidores de ventanilla — ellos detectan dónde falla',
          'Publicar en la ficha GOV.CO y mantener el texto legal como referencia jurídica',
        ],
        impact: 'Menos preguntas en ventanilla, más ciudadanos completando el trámite sin ayuda.',
      },
      {
        title: 'Video explicativo multilingüe en 1 día',
        steps: [
          'Redactar guion en Claude o ChatGPT siguiendo el tono institucional (200–300 palabras)',
          'Generar voz con ElevenLabs en español, wayuunaiki, criollo sanandresano u otro (requiere validación por hablante nativo)',
          'Crear video con HeyGen o Synthesia usando avatar oficial de la entidad y el audio generado',
          'Agregar subtítulos SDH con CapCut para accesibilidad (Ley 1618)',
        ],
        impact: 'Campañas inclusivas con el 10% del costo de producción tradicional.',
      },
    ],
    tools: ['canva', 'synthesia', 'heygen', 'capcut', 'elevenlabs', 'dall-e'],
  },
  {
    id: 'auditoria',
    icon: ShieldCheck,
    color: 'text-emerald-700',
    bg: 'bg-emerald-100',
    title: '6. Auditoría, control interno y antifraude',
    lead: 'Contraloría, Procuraduría, Auditoría General y oficinas de control interno deben revisar volúmenes enormes de transacciones, contratos y declaraciones. La IA permite análisis al 100% en vez de muestreos.',
    useCases: [
      'Auditar ejecución presupuestal al 100% (no por muestreo)',
      'Cruzar declaraciones de bienes con registros de propiedad',
      'Detectar conflictos de interés en contratación',
      'Priorizar hallazgos por riesgo con scoring automático',
      'Generar informes de auditoría con evidencias trazables',
    ],
    examples: [
      {
        entity: 'Contraloría General de la República',
        application: 'Proyecto OCEANO y analítica avanzada sobre SECOP y SIIF Nación para riesgos fiscales.',
      },
      {
        entity: 'Procuraduría',
        application: 'Análisis de declaraciones de bienes y rentas usando modelos de anomalías.',
      },
      {
        entity: 'Auditoría General',
        application: 'Revisión asistida por IA de rendiciones de cuenta de contralorías territoriales.',
      },
      {
        entity: 'UIAF',
        application: 'Detección de operaciones sospechosas de lavado con modelos de grafos sobre transacciones de entidades reporteantes.',
      },
      {
        entity: 'DIAN — Gestión de Riesgos',
        application: 'Scoring de riesgo tributario por NIT cruzando declaraciones, factura electrónica y terceros informantes.',
      },
      {
        entity: 'Oficinas de control interno (territoriales)',
        application: 'Aplicación del MECI con MindBridge para auditar ingresos municipales y detectar evasión predial.',
      },
    ],
    playbooks: [
      {
        title: 'Conflictos de interés en contratación directa',
        steps: [
          'Descargar de SECOP los contratos del último año con sus contratistas (NIT, representante legal, dirección)',
          'Cruzar con la nómina de la entidad (cédula, fecha vinculación, cargo) usando Julius o Claude + CSV',
          'Pedir: "identifica coincidencias en apellidos, direcciones o NIT de empresas con vínculos familiares con funcionarios directivos"',
          'Cada hallazgo se verifica manualmente antes de activar indagación preliminar — la IA asiste, no condena',
        ],
        impact: 'Prevención de riesgos disciplinarios antes de que escalen a entes de control externo.',
      },
      {
        title: 'Auditoría al 100% de cuentas por pagar',
        steps: [
          'Conectar MindBridge al ERP financiero (SAP, Dynamics, SIIF) o cargar export masivo de transacciones',
          'El sistema aplica 30+ algoritmos: facturas duplicadas, pagos en sábado/festivo, proveedores nuevos, montos redondeados',
          'Revisar las transacciones con puntaje de riesgo > 80 (típicamente < 2% del total) con el equipo auditor',
          'Documentar hallazgos y cerrar los falsos positivos para afinar el modelo',
        ],
        impact: 'Cobertura 100% vs. muestreo del 5–10%; 50% menos tiempo en fieldwork tradicional.',
      },
    ],
    tools: ['mindbridge', 'julius', 'claude', 'copilot-finance'],
  },
  {
    id: 'automatizacion',
    icon: Sparkles,
    color: 'text-accent',
    bg: 'bg-accent/8',
    title: '7. Automatización de trámites y back-office',
    lead: 'Simplificación del Estado: cada trámite eliminado o automatizado ahorra horas a ciudadanos y servidores. La IA combinada con RPA transforma procesos internos lentos.',
    useCases: [
      'Clasificar y enrutar correspondencia oficial automáticamente',
      'Generar actas y memorandos de reuniones',
      'Completar formularios a partir de documentos (OCR + IA)',
      'Consolidar reportes mensuales de varias dependencias',
      'Automatizar conciliaciones bancarias de tesorería',
    ],
    examples: [
      {
        entity: 'Agencia Nacional Digital / MinTIC',
        application: 'GOV.CO — Carpeta Ciudadana e interoperabilidad con IA para precargar formularios.',
      },
      {
        entity: 'DIAN',
        application: 'Factura electrónica + IA para categorización automática y detección de evasión.',
      },
      {
        entity: 'Registraduría',
        application: 'Verificación biométrica y validación documental en cedulación.',
      },
      {
        entity: 'Migración Colombia',
        application: 'Check-in biométrico en aeropuertos (PCR facial) + clasificación automática de visados por tipo y riesgo.',
      },
      {
        entity: 'Secretarías de Tránsito (SIM, RUNT)',
        application: 'Validación automática de documentos para renovación de licencias y detección de suplantación con OCR + IA.',
      },
      {
        entity: 'MinSalud — Mi Vacuna',
        application: 'Automatización de carnets de vacunación y cruce con RUAF para detección de duplicados.',
      },
    ],
    playbooks: [
      {
        title: 'Correspondencia oficial clasificada y enrutada',
        steps: [
          'Conectar el correo de radicación (correspondencia@entidad.gov.co) a Make o Zapier AI',
          'Cada oficio entrante pasa por OCR (si es imagen/PDF escaneado) y luego a Claude: "identifica destinatario, asunto, tipo (oficio, memorando, circular), entidad remitente y dependencia responsable"',
          'Sistema radica automáticamente en Orfeo/SAIA y notifica al jefe de dependencia',
          'Los oficios con términos legales (tutela, acción popular) se escalan inmediatamente a jurídica',
        ],
        impact: 'De 2–3 días de radicación manual a minutos; cero oficios perdidos.',
      },
      {
        title: 'Actas de comités con borrador automático',
        steps: [
          'Grabar la reunión en Teams/Zoom (con aviso a asistentes por Ley 1581)',
          'Transcribir con Otter, Fireflies o Whisper en español',
          'Pasar la transcripción a Claude con el prompt: "elabora acta oficial con asistentes, agenda, temas tratados, decisiones adoptadas, tareas asignadas con responsable y fecha. Formato de acta administrativa colombiana"',
          'Secretario técnico revisa, ajusta y firma en 15 minutos en vez de 2 horas',
        ],
        impact: 'Documentación puntual; se libera al secretario técnico para actividades sustantivas.',
      },
    ],
    tools: ['zapier-ai', 'make', 'manus', 'copilot-finance', 'bardeen'],
  },
]

const PRINCIPLES = [
  {
    title: 'Ley 1581 de 2012 — Habeas Data',
    desc: 'Toda implementación debe respetar tratamiento de datos personales, con finalidades definidas y bases legales claras.',
  },
  {
    title: 'CONPES 4144 — Política Nacional de IA',
    desc: 'Marco colombiano que exige gobernanza, ética, gestión de riesgos y transparencia en sistemas de IA del Estado.',
  },
  {
    title: 'Ley 2208 de 2022 — Transformación Digital',
    desc: 'Obliga a las entidades a adoptar tecnologías emergentes con enfoque de servicios centrados en el ciudadano.',
  },
  {
    title: 'Principios OCDE y UNESCO',
    desc: 'Colombia adoptó recomendaciones sobre IA: equidad, no discriminación, supervisión humana y rendición de cuentas.',
  },
]

function ToolMini({ id }) {
  const tool = getToolById(id)
  if (!tool) return null
  return (
    <Link
      to={`/herramienta/${tool.id}`}
      className="group flex items-center gap-3 bg-surface border border-border rounded-xl p-3 no-underline hover:shadow-md hover:-translate-y-0.5 hover:border-primary/40 transition-all duration-200"
    >
      <ToolFavicon tool={tool} />
      <div className="min-w-0 flex-1">
        <div className="font-semibold text-text text-sm truncate tracking-tight">{tool.name}</div>
        <div className="text-[11px] text-text-lighter truncate">{tool.bestFor}</div>
      </div>
      <ArrowRight className="w-4 h-4 text-text-lighter group-hover:text-primary transition-colors shrink-0" />
    </Link>
  )
}

export default function SectorPublico() {
  return (
    <div className="bg-bg">
      {/* Hero */}
      <section className="relative px-4 hero-gradient noise-overlay overflow-x-clip py-14 md:py-20">
        <div className="absolute inset-0 dot-pattern pointer-events-none" />
        <div className="absolute top-20 -left-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 -right-20 w-48 h-48 bg-warm/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary/8 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-8 border border-primary/10">
            <Landmark className="w-3.5 h-3.5" />
            Capítulo especial
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-text leading-[1.08] tracking-tight mb-5">
            IA para el <span className="text-gradient-primary">sector público</span> colombiano
          </h1>
          <p className="text-text-light text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Una guía práctica para que entidades nacionales, gobernaciones, alcaldías, órganos de control
            y empresas sociales del Estado usen IA con <span className="text-text font-semibold">criterio, ética y enfoque ciudadano</span>.
          </p>
        </div>
      </section>

      {/* Intro normativa */}
      <section className="max-w-5xl mx-auto px-4 pt-12 pb-6">
        <div className="bg-surface rounded-2xl border border-border p-6 md:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-text mb-3 tracking-tight flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-warm" />
            ¿Por qué un capítulo para el sector público?
          </h2>
          <p className="text-text-light leading-relaxed mb-3">
            Colombia tiene más de 5,700 entidades públicas entre el orden nacional y territorial. Cada una enfrenta
            retos parecidos — pero con restricciones presupuestales, obligaciones de transparencia y
            responsabilidad fiscal que el sector privado no tiene.
          </p>
          <p className="text-text-light leading-relaxed">
            Esta guía traduce las herramientas de IA del catálogo a <span className="font-semibold text-text">casos de uso
            concretos</span> del Estado colombiano, con ejemplos de entidades que ya las aplican y recomendaciones
            alineadas al marco normativo vigente.
          </p>
        </div>
      </section>

      {/* Quick nav */}
      <section className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-2">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-surface border border-border rounded-full text-sm text-text-light no-underline hover:border-primary/40 hover:text-primary transition-colors"
            >
              <span className="text-xs">{s.title.split('.')[0]}.</span>
              {s.title.split('.').slice(1).join('.').trim()}
            </a>
          ))}
        </div>
      </section>

      {/* Sections */}
      <div className="max-w-5xl mx-auto px-4 pb-6 space-y-10">
        {SECTIONS.map((section) => {
          const Icon = section.icon
          return (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-20 bg-surface rounded-2xl border border-border p-6 md:p-8 shadow-sm"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-12 h-12 ${section.bg} rounded-xl flex items-center justify-center shrink-0`}>
                  <Icon className={`w-6 h-6 ${section.color}`} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-text tracking-tight mb-2">{section.title}</h2>
                  <p className="text-text-light leading-relaxed">{section.lead}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div>
                  <h3 className="text-xs font-bold text-text-lighter uppercase tracking-[0.12em] mb-3">
                    Casos de uso
                  </h3>
                  <ul className="space-y-2 text-sm text-text-light">
                    {section.useCases.map((uc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-accent font-bold mt-0.5">✓</span>
                        <span>{uc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-text-lighter uppercase tracking-[0.12em] mb-3">
                    Entidades con ejemplos reales
                  </h3>
                  <div className="space-y-3">
                    {section.examples.map((ex, i) => (
                      <div key={i} className="border-l-2 border-primary/30 pl-3">
                        <div className="font-semibold text-text text-sm">{ex.entity}</div>
                        <div className="text-xs text-text-light leading-relaxed">{ex.application}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {section.playbooks && section.playbooks.length > 0 && (
                <div className="mt-6 pt-6 border-t border-border">
                  <h3 className="text-xs font-bold text-text-lighter uppercase tracking-[0.12em] mb-4">
                    Playbooks prácticos
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {section.playbooks.map((pb, i) => (
                      <div
                        key={i}
                        className="bg-bg/60 rounded-xl border border-border/80 p-5"
                      >
                        <div className="flex items-start gap-2 mb-3">
                          <span className={`inline-flex items-center justify-center w-6 h-6 rounded-md ${section.bg} ${section.color} font-bold text-xs shrink-0`}>
                            {i + 1}
                          </span>
                          <h4 className="font-semibold text-text text-sm leading-tight tracking-tight">
                            {pb.title}
                          </h4>
                        </div>
                        <ol className="space-y-1.5 text-xs text-text-light leading-relaxed list-decimal ml-5 mb-3">
                          {pb.steps.map((s, j) => (
                            <li key={j}>{s}</li>
                          ))}
                        </ol>
                        <div className="flex items-start gap-1.5 mt-3 pt-3 border-t border-border/60">
                          <span className="text-accent font-bold text-xs">⟶</span>
                          <p className="text-xs text-text-light italic leading-relaxed">
                            <span className="font-semibold not-italic">Impacto:</span> {pb.impact}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-border">
                <h3 className="text-xs font-bold text-text-lighter uppercase tracking-[0.12em] mb-3">
                  Herramientas recomendadas
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                  {section.tools.map((id) => (
                    <ToolMini key={id} id={id} />
                  ))}
                </div>
              </div>
            </section>
          )
        })}
      </div>

      {/* Principios normativos */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="bg-text text-white rounded-2xl p-6 md:p-10">
          <h2 className="text-2xl font-bold mb-2 tracking-tight">Marco normativo y principios</h2>
          <p className="text-white/80 leading-relaxed mb-6">
            Cualquier uso de IA en el sector público debe alinearse con el marco legal colombiano y los principios
            éticos internacionales. Estos son los cuatro pilares:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {PRINCIPLES.map((p) => (
              <div
                key={p.title}
                className="bg-white/10 rounded-xl p-5 backdrop-blur-sm border border-white/10"
              >
                <h3 className="font-semibold text-base mb-1 tracking-tight">{p.title}</h3>
                <p className="text-white/75 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 text-sm text-white/70">
            <strong className="text-white">Recomendación transversal:</strong> antes de pilotear cualquier sistema de
            IA, realiza una Evaluación de Impacto en Protección de Datos (EIPD) y define indicadores de sesgo,
            explicabilidad y supervisión humana.
          </div>
        </div>
      </section>

      {/* CTAs */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/explorar"
            className="inline-flex items-center gap-2 bg-text text-white px-6 py-3.5 rounded-xl font-semibold no-underline hover:bg-text/90 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-sm"
          >
            Explorar todas las herramientas
          </Link>
          <Link
            to="/recomendador"
            className="inline-flex items-center gap-2 bg-surface text-text border border-border px-6 py-3.5 rounded-xl font-semibold no-underline hover:border-primary/40 hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-sm"
          >
            <Sparkles className="w-4 h-4 text-warm" />
            Recibir recomendación guiada
          </Link>
        </div>
      </section>
    </div>
  )
}
