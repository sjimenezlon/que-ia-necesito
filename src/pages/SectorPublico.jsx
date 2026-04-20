import { Link } from 'react-router-dom'
import {
  Landmark, Users, FileSearch, ShieldCheck, Megaphone,
  GitBranch, Sparkles, AlertTriangle, BookOpen, ArrowRight,
  Building2, ScrollText, Scale, Rocket, Target,
  Gauge, TrendingUp, Zap, CheckCircle2, ExternalLink, Gavel,
  BarChart3, Globe2, Heart, Leaf, Stethoscope, GraduationCap,
  Truck, Banknote, Shield,
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
        application: 'Asistente virtual "Flor" responde en WhatsApp (301 604 4444) sobre predial, trámites y citas de atención ciudadana.',
        source: 'https://www.elcolombiano.com/medellin/nuevos-servicios-de-la-asistente-virtual-de-la-alcaldia-de-medellin-EA26738914',
      },
      {
        entity: 'Alcaldía de Bogotá — "Bogotá Te Escucha" (SDQS + IA)',
        application: 'Canal distrital con IA generativa para clasificar PQRSD; pasó de 17% a 97% de precisión en enrutamiento. Acuerdo 003 de 2025 como marco de gobernanza.',
        source: 'https://bogota.gov.co/mi-ciudad/gestion-publica/bogota-lanzo-canal-de-conversacion-y-atencion-ciudadania-con-ia',
      },
      {
        entity: 'Sena — Asesora virtual "ISA"',
        application: 'Chatbot oficial (chatbotisa.sena.edu.co) atiende dudas sobre Sofía Plus, certificados, formación y estado del proceso las 24 horas.',
        source: 'https://chatbotisa.sena.edu.co/',
      },
      {
        entity: 'DIAN',
        application: 'Portal MUISCA concentra trámites tributarios en línea (RUT, firma electrónica, devoluciones); la entidad reporta uso creciente de analítica e IA para fiscalización.',
      },
      {
        entity: 'Supersalud',
        application: 'Sistema de PQRSD (SuperArgo) para priorización; la Superintendencia avanza en modernización con analítica sobre datos de PQR en salud.',
      },
      {
        entity: 'ICBF — Línea 141',
        application: 'Línea de protección con priorización de casos de niñez; canal clave para ampliar triage asistido cuando la entidad integre NLP.',
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
        entity: 'Corte Constitucional — PretorIA',
        application: 'Sistema de IA que apoya la Sala de Selección en el tamizaje de más de 620.000 tutelas anuales, identificando casos con relevancia constitucional.',
        source: 'https://www.dejusticia.org/conoce-nuestra-investigacion-sobre-pretoria-la-tecnologia-que-incorpora-la-inteligencia-artificial-a-la-corte-constitucional/',
      },
      {
        entity: 'Corte Constitucional — Sentencia T-323/2024',
        application: 'Primer precedente que fija lineamientos sobre uso de ChatGPT/IA por jueces: transparencia, supervisión humana y no discriminación.',
        source: 'https://www.corteconstitucional.gov.co/relatoria/2024/T-323-24.htm',
      },
      {
        entity: 'DNP + MinTIC — CONPES 4144',
        application: 'Política Nacional de IA (feb 2025), USD 479 millones, 6 ejes estratégicos. Hoja de ruta para la adopción ética y responsable.',
        source: 'https://www.dnp.gov.co/publicaciones/Planeacion/Paginas/conpes-4144-hoja-de-ruta-colombia-inteligencia-artificial-retos-actuales-transformacion-futura.aspx',
      },
      {
        entity: 'DNP — Catastro multipropósito',
        application: 'Uso de IA y deep learning sobre Sentinel-2 para apoyar actualización catastral y análisis territorial.',
        source: 'https://www.dnp.gov.co/Prensa_/Noticias/Paginas/con-inteligencia-artificial-el-dnp-apoya-el-proceso-de-actualizacion-del-catastro-multiproposito.aspx',
      },
      {
        entity: 'MinJusticia — política criminal',
        application: 'Analítica sobre grandes volúmenes de sentencias y jurisprudencia para identificar tendencias que alimentan reformas normativas.',
      },
      {
        entity: 'Congreso — unidades técnicas',
        application: 'Oportunidad clara para incorporar NotebookLM / asistentes de lectura jurídica sobre proyectos de ley y jurisprudencia relacionada.',
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
        entity: 'Contraloría General — OCEANO',
        application: 'Plataforma con Big Data, analítica predictiva e IA que vigila el gasto público y genera alertas tempranas de riesgos en contratación estatal.',
        source: 'https://www.contraloria.gov.co/en/w/contralor%C3%ADa-y-colombia-compra-eficiente-unen-esfuerzos-para-generar-alertas-e-identificar-riesgos-de-corrupci%C3%B3n-en-contrataci%C3%B3n-estatal',
      },
      {
        entity: 'Contraloría + Colombia Compra Eficiente',
        application: 'Convenio para cruzar datos de SECOP con OCEANO y generar alertas tempranas sobre prácticas de colusión y sobrecostos.',
        source: 'https://www.contraloria.gov.co/en/w/contralor%C3%ADa-y-colombia-compra-eficiente-unen-esfuerzos-para-generar-alertas-e-identificar-riesgos-de-corrupci%C3%B3n-en-contrataci%C3%B3n-estatal',
      },
      {
        entity: 'Colombia Compra Eficiente',
        application: 'Documentos tipo, Tienda Virtual y acuerdos marco; base estandarizada que facilita auditoría asistida por IA sobre pliegos.',
      },
      {
        entity: 'ANI — contratos de concesión',
        application: 'Volumen contractual 4G/5G hace ideal la revisión asistida de cláusulas (riesgos, hitos, garantías) con LLM + RAG sobre pliegos.',
      },
      {
        entity: 'ESE y hospitales públicos',
        application: 'Estandarización de estudios previos de medicamentos POS y dispositivos usando LLM + plantillas tipo CCE.',
      },
      {
        entity: 'Secretarías de Hacienda territoriales',
        application: 'Revisión asistida de pliegos antes de publicación para reducir adendas reactivas y demandas.',
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
        entity: 'IDEAM — HydroViewer Colombia',
        application: '51 simulaciones de caudales con horizonte de 15 días (alianza IDEAM / CIAT / SERVIR-Amazonía) para gestión del recurso hídrico.',
        source: 'https://ideam.geoglows.org/apps/hydroviewer-colombia/user-manual/',
      },
      {
        entity: 'IGAC — catastro multipropósito',
        application: 'ColSMART: deep learning sobre imágenes Sentinel-2 con precisión 70-94% para apoyar actualización catastral nacional.',
        source: 'https://www.igac.gov.co/noticias/inteligencia-artificial-para-decodificar-imagenes-satelitales-y-nuevas-tecnologias-del-catastro-temas-principales-del-igac-embdata-tech',
      },
      {
        entity: 'Secretaría de Movilidad Bogotá',
        application: 'Semáforos inteligentes con videodetectores que cuentan flujo vehicular y autorregulan ciclos según densidad real.',
        source: 'https://bogota.gov.co/asi-vamos/conoce-la-semaforizacion-inteligente-en-bogota',
      },
      {
        entity: 'Fiscalía General — Fiscal Watson',
        application: 'Sistema con IBM Watson que correlaciona más de 13 millones de denuncias del SPOA; identificó un depredador sexual en Tolima.',
        source: 'https://www.elpais.com.co/judicial/watson-el-investigador-inteligente-con-el-que-la-fiscalia-busca-cerrarle-el-paso-al-crimen.html',
      },
      {
        entity: 'Superfinanciera — Centro de Excelencia IA',
        application: 'Hub de supervisión digital y análisis de redes para entidades vigiladas; transforma el modelo tradicional de inspección.',
        source: 'https://www.superfinanciera.gov.co/publicaciones/10115852/el-papel-de-la-inteligencia-artificial-en-la-transformacion-de-la-supervision-financiera/',
      },
      {
        entity: 'SIATA — Medellín',
        application: '~1.200 sensores + radares meteorológicos para alertas tempranas de inundaciones, deslizamientos y calidad del aire en el Valle de Aburrá.',
        source: 'https://siata.gov.co/portalWeb',
      },
      {
        entity: 'DANE',
        application: 'Dispositivos Móviles de Captura (DMC) y geocodificación sobre microdatos censales — base ideal para escalar IA en control de calidad.',
      },
      {
        entity: 'MinSalud — SISPRO',
        application: 'Repositorio nacional con historiales de prestación, aseguramiento y gasto en salud; base para analítica predictiva y vigilancia epidemiológica.',
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
        entity: 'Registraduría Nacional',
        application: 'Incorpora IA en procesos electorales, identificación y comunicación ciudadana; base ideal para ampliar videos educativos con avatares generativos.',
        source: 'https://www.registraduria.gov.co/Registraduria-implementa-inteligencia-artificial-en-procesos-electorales-y-de.html',
      },
      {
        entity: 'Presidencia / Mincultura',
        application: 'Campañas multilingües en castellano + lenguas nativas; oportunidad concreta para traducción asistida y doblaje con ElevenLabs o HeyGen.',
      },
      {
        entity: 'Superintendencias',
        application: 'Mandato pedagógico frente al consumidor: IA generativa permite acelerar piezas explicativas sobre derechos en redes.',
      },
      {
        entity: 'Gobernaciones y alcaldías',
        application: 'Infografías automáticas de rendición de cuentas con plantillas estándar en Canva + generación de texto asistida.',
      },
      {
        entity: 'MinEducación — Todos a Aprender',
        application: 'Producción de material pedagógico y audiocuentos en lenguas indígenas (wayuunaiki, nasa yuwe) con voces sintéticas + revisión humana.',
      },
      {
        entity: 'Secretarías de Salud territoriales',
        application: 'Campañas masivas de vacunación con piezas adaptadas por grupo etario y dialecto regional generadas con Canva + modelos de imagen.',
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
        entity: 'Contraloría General — OCEANO',
        application: 'Big Data + IA + cartografía digital para vigilar gasto público en tiempo real y generar alertas sobre SECOP y SIIF.',
        source: 'https://www.contraloria.gov.co/en/w/contralor%C3%ADa-y-colombia-compra-eficiente-unen-esfuerzos-para-generar-alertas-e-identificar-riesgos-de-corrupci%C3%B3n-en-contrataci%C3%B3n-estatal',
      },
      {
        entity: 'ADRES — Sistema SIA (AWS + Blend360)',
        application: 'Audita recobros y cuentas médicas con IA; baja el ciclo de revisión de 3 meses a 14 días para agilizar pagos al sector.',
        source: 'https://www.presidencia.gov.co/prensa/Paginas/Gobierno-implementa-sistema-con-inteligencia-artificial-para-auditar-cuentas-medicas-y-agilizar-pagos-260414.aspx',
      },
      {
        entity: 'Superfinanciera — Centro de Excelencia IA',
        application: 'Supervisión digital con análisis de redes sobre entidades vigiladas; transforma el modelo tradicional de inspección.',
        source: 'https://www.superfinanciera.gov.co/publicaciones/10115852/el-papel-de-la-inteligencia-artificial-en-la-transformacion-de-la-supervision-financiera/',
      },
      {
        entity: 'DIAN — Gestión de Riesgos',
        application: 'La DIAN avanza en modelos de scoring de riesgo tributario apalancados en factura electrónica, declaraciones y terceros informantes.',
      },
      {
        entity: 'UIAF — lucha antilavado',
        application: 'La UIAF ha declarado inversión en IA y alianzas internacionales (UNITAR) para detección de operaciones sospechosas de lavado.',
      },
      {
        entity: 'Oficinas de control interno territoriales',
        application: 'Aplicación del MECI con herramientas tipo MindBridge para auditar ingresos municipales y detectar evasión predial.',
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
        entity: 'Migración Colombia — Biomig',
        application: '30 equipos biométricos en 4 aeropuertos internacionales: iris para nacionales y facial para extranjeros, agilizando el control migratorio.',
        source: 'https://www.presidencia.gov.co/prensa/Paginas/Migracion-Colombia-modernizo-control-en-cuatro-aeropuertos-internacionales-del-pais-con-30-equipos-biometricos-231122.aspx',
      },
      {
        entity: 'Cancillería — citas consulares',
        application: 'Plataforma de citas basada en reconocimiento facial para consulados de Miami, Madrid, Barcelona y Valencia.',
        source: 'https://www.cancilleria.gov.co/newsroom/news/cancilleria-moderniza-atencion-consular-nueva-plataforma-citas-basada-reconocimiento',
      },
      {
        entity: 'Registraduría Nacional',
        application: 'Biometría facial y dactilar + centro de analítica para detectar irregularidades en cedulación y procesos electorales.',
        source: 'https://www.registraduria.gov.co/Registraduria-implementa-inteligencia-artificial-en-procesos-electorales-y-de.html',
      },
      {
        entity: 'Agencia Nacional Digital / MinTIC',
        application: 'GOV.CO y la Carpeta Ciudadana son la infraestructura ideal para precargar formularios con IA e interoperar trámites entre entidades.',
      },
      {
        entity: 'DIAN — factura electrónica',
        application: 'Masificación de factura electrónica facilita la categorización automática y detección de evasión con IA sobre el flujo transaccional.',
      },
      {
        entity: 'UGPP — aportes a seguridad social',
        application: 'Cruce DIAN + PILA + nómina electrónica: caso claro donde la IA escala detección de inconsistencias que hoy se revisan manualmente.',
      },
      {
        entity: 'MinSalud — Mi Vacuna',
        application: 'Carnet digital de vacunación con cruce automático contra RUAF para evitar duplicados y mantener coberturas confiables.',
      },
      {
        entity: 'Secretarías de Tránsito (RUNT)',
        application: 'OCR + validación automática de documentos para renovación de licencias y detección de suplantación en trámites.',
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
    icon: ShieldCheck,
    title: 'Ley 1581 de 2012 — Habeas Data',
    desc: 'Toda implementación debe respetar tratamiento de datos personales, con finalidades definidas y bases legales claras.',
  },
  {
    icon: Scale,
    title: 'CONPES 4144 / 2025 — Política Nacional de IA',
    desc: 'Hoja de ruta nacional aprobada en febrero de 2025 (USD 479M, 6 ejes) sobre gobernanza, ética, gestión de riesgos y transparencia.',
    source: 'https://www.dnp.gov.co/publicaciones/Planeacion/Paginas/conpes-4144-hoja-de-ruta-colombia-inteligencia-artificial-retos-actuales-transformacion-futura.aspx',
  },
  {
    icon: Gavel,
    title: 'Sentencia T-323 de 2024 — Corte Constitucional',
    desc: 'Primer precedente que fija límites al uso de ChatGPT/IA por jueces: transparencia, supervisión humana y no discriminación como obligaciones.',
    source: 'https://www.corteconstitucional.gov.co/relatoria/2024/T-323-24.htm',
  },
  {
    icon: ScrollText,
    title: 'Ley 2208 de 2022 — Transformación Digital',
    desc: 'Obliga a las entidades a adoptar tecnologías emergentes con enfoque de servicios centrados en el ciudadano.',
  },
  {
    icon: Building2,
    title: 'Acuerdo 003 de 2025 — Distrito de Bogotá',
    desc: 'Primer marco distrital de gobernanza de IA en Colombia: transparencia, trazabilidad y supervisión humana sobre sistemas como Bogotá Te Escucha.',
  },
  {
    icon: Landmark,
    title: 'Principios OCDE y UNESCO',
    desc: 'Colombia adoptó recomendaciones sobre IA: equidad, no discriminación, supervisión humana y rendición de cuentas.',
  },
]

const FEATURED_CASES = [
  {
    icon: Scale,
    color: 'text-primary',
    bg: 'bg-primary/8',
    ring: 'ring-primary/20',
    entity: 'Corte Constitucional',
    area: 'Justicia · IA',
    headline: 'PretorIA — selección de tutelas',
    story: 'Sistema de IA que apoya la Sala de Selección en el análisis de más de 620.000 tutelas al año, identificando casos con relevancia constitucional.',
    metric: '620K+',
    metricLabel: 'tutelas/año tamizadas',
    source: 'https://www.dejusticia.org/conoce-nuestra-investigacion-sobre-pretoria-la-tecnologia-que-incorpora-la-inteligencia-artificial-a-la-corte-constitucional/',
    sourceLabel: 'Dejusticia',
  },
  {
    icon: Shield,
    color: 'text-warm',
    bg: 'bg-warm/8',
    ring: 'ring-warm/20',
    entity: 'Contraloría General',
    area: 'Control fiscal',
    headline: 'OCEANO sobre SECOP + SIIF',
    story: 'Plataforma de analítica avanzada, Big Data e IA que vigila el gasto público y genera alertas tempranas de riesgos en contratación estatal.',
    metric: 'Convenio',
    metricLabel: 'con Colombia Compra Eficiente',
    source: 'https://www.contraloria.gov.co/en/w/contralor%C3%ADa-y-colombia-compra-eficiente-unen-esfuerzos-para-generar-alertas-e-identificar-riesgos-de-corrupci%C3%B3n-en-contrataci%C3%B3n-estatal',
    sourceLabel: 'CGR',
  },
  {
    icon: Stethoscope,
    color: 'text-rose-600',
    bg: 'bg-rose-50',
    ring: 'ring-rose-200',
    entity: 'ADRES',
    area: 'Salud · Auditoría',
    headline: 'SIA — auditoría de cuentas médicas',
    story: 'Sistema con IA (AWS + Blend360) que audita recobros y cuentas médicas reduciendo de 3 meses a 14 días el tiempo de revisión y pago.',
    metric: '3 meses → 14 días',
    metricLabel: 'auditoría de cuentas',
    source: 'https://www.presidencia.gov.co/prensa/Paginas/Gobierno-implementa-sistema-con-inteligencia-artificial-para-auditar-cuentas-medicas-y-agilizar-pagos-260414.aspx',
    sourceLabel: 'Presidencia',
  },
  {
    icon: Shield,
    color: 'text-slate-700',
    bg: 'bg-slate-100',
    ring: 'ring-slate-200',
    entity: 'Policía Nacional',
    area: 'Seguridad ciudadana',
    headline: 'IAPol / XCrime',
    story: 'Plataforma sobre AWS con mapas de calor delictivo y modelos predictivos; reporta 99% de precisión y −29% en tiempos de respuesta operativa.',
    metric: '−29%',
    metricLabel: 'tiempo de respuesta',
    source: 'https://aws.amazon.com/es/solutions/case-studies/policia-nacional-colombia/',
    sourceLabel: 'AWS Case Study',
  },
  {
    icon: Users,
    color: 'text-accent',
    bg: 'bg-accent/8',
    ring: 'ring-accent/20',
    entity: 'Alcaldía de Bogotá',
    area: 'Atención ciudadana',
    headline: 'Bogotá Te Escucha (SDQS + IA)',
    story: 'Canal distrital con IA para clasificar y responder PQRSD. Pasó de 17% a 97% de precisión en enrutamiento; marco de gobernanza por Acuerdo 003/2025.',
    metric: '17% → 97%',
    metricLabel: 'precisión de enrutamiento',
    source: 'https://bogota.gov.co/mi-ciudad/gestion-publica/bogota-lanzo-canal-de-conversacion-y-atencion-ciudadania-con-ia',
    sourceLabel: 'bogota.gov.co',
  },
  {
    icon: Globe2,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    ring: 'ring-indigo-200',
    entity: 'Migración Colombia',
    area: 'Fronteras',
    headline: 'Biomig — control biométrico',
    story: '30 equipos biométricos en 4 aeropuertos internacionales: iris para nacionales y facial para extranjeros, agilizando el control migratorio.',
    metric: '4 aeropuertos',
    metricLabel: 'con 30 equipos Biomig',
    source: 'https://www.presidencia.gov.co/prensa/Paginas/Migracion-Colombia-modernizo-control-en-cuatro-aeropuertos-internacionales-del-pais-con-30-equipos-biometricos-231122.aspx',
    sourceLabel: 'Presidencia',
  },
  {
    icon: Leaf,
    color: 'text-emerald-700',
    bg: 'bg-emerald-100',
    ring: 'ring-emerald-200',
    entity: 'IDEAM',
    area: 'Hidrología · Clima',
    headline: 'HydroViewer Colombia',
    story: 'Pronóstico hidrológico sobre 51 simulaciones con horizonte de 15 días (alianza IDEAM / CIAT / SERVIR-Amazonía) para gestión del recurso hídrico.',
    metric: '15 días',
    metricLabel: 'horizonte de pronóstico',
    source: 'https://ideam.geoglows.org/apps/hydroviewer-colombia/user-manual/',
    sourceLabel: 'IDEAM',
  },
  {
    icon: BarChart3,
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    ring: 'ring-violet-200',
    entity: 'Superfinanciera',
    area: 'Supervisión financiera',
    headline: 'Centro de Excelencia en IA',
    story: 'Hub de supervisión digital y análisis de redes sobre entidades vigiladas; impulsa la transformación del modelo tradicional de inspección.',
    metric: '2026',
    metricLabel: 'operación Centro IA',
    source: 'https://www.superfinanciera.gov.co/publicaciones/10115852/el-papel-de-la-inteligencia-artificial-en-la-transformacion-de-la-supervision-financiera/',
    sourceLabel: 'SFC',
  },
]

const SECTORS = [
  {
    icon: Stethoscope,
    title: 'Salud',
    desc: 'Cobertura, epidemiología y prestación',
    color: 'text-rose-600',
    bg: 'bg-rose-50',
    entities: ['MinSalud', 'INS', 'ADRES', 'Supersalud', 'Invima'],
  },
  {
    icon: GraduationCap,
    title: 'Educación',
    desc: 'Matrícula, deserción y calidad',
    color: 'text-sky-600',
    bg: 'bg-sky-50',
    entities: ['MinEducación', 'ICFES', 'Sena', 'Colciencias', 'ICETEX'],
  },
  {
    icon: Truck,
    title: 'Transporte',
    desc: 'Movilidad, licencias y logística',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    entities: ['MinTransporte', 'Invías', 'ANI', 'RUNT', 'Aeronáutica Civil'],
  },
  {
    icon: Leaf,
    title: 'Ambiente',
    desc: 'Clima, agua y licenciamiento',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    entities: ['MinAmbiente', 'IDEAM', 'ANLA', 'Parques Nacionales', 'AMVA'],
  },
  {
    icon: Banknote,
    title: 'Finanzas públicas',
    desc: 'Tributación, presupuesto y tesorería',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    entities: ['MinHacienda', 'DIAN', 'Banco de la República', 'Superfinanciera', 'UGPP'],
  },
  {
    icon: Shield,
    title: 'Seguridad y justicia',
    desc: 'Prevención, análisis criminal y rendición',
    color: 'text-slate-700',
    bg: 'bg-slate-100',
    entities: ['Policía', 'Fiscalía', 'MinJusticia', 'INPEC', 'Migración'],
  },
  {
    icon: Heart,
    title: 'Social y territorial',
    desc: 'Focalización, territorios y cultura',
    color: 'text-pink-600',
    bg: 'bg-pink-50',
    entities: ['DPS', 'ICBF', 'DNP', 'DANE', 'Mincultura'],
  },
  {
    icon: Globe2,
    title: 'Transformación digital',
    desc: 'Gobierno digital y ciudadanía',
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    entities: ['MinTIC', 'AND', 'Registraduría', 'GOV.CO', 'Archivo General'],
  },
]

const ROADMAP = [
  {
    phase: 'Fase 1',
    duration: '1–3 meses',
    title: 'Piloto controlado',
    icon: Target,
    color: 'text-primary',
    bg: 'bg-primary/8',
    points: [
      'Elegir 1 caso de uso de alto impacto y bajo riesgo (ej: resumen de PQRSD, traducción a lenguaje claro)',
      'Equipo pequeño (3–5 personas) con supervisor humano en cada paso',
      'Herramientas freemium con datos no sensibles o anonimizados',
      'Medir línea base antes de arrancar (tiempo, costos, errores)',
    ],
  },
  {
    phase: 'Fase 2',
    duration: '3–12 meses',
    title: 'Escalamiento',
    icon: TrendingUp,
    color: 'text-warm',
    bg: 'bg-warm/8',
    points: [
      'Expandir 2–4 casos de uso adicionales en dependencias distintas',
      'Definir política interna de IA + comité de ética + rol de Oficial de Datos',
      'Pasar a planes empresariales con gobernanza (SSO, logs, retención)',
      'Evaluación de Impacto en Protección de Datos (EIPD) formalizada',
    ],
  },
  {
    phase: 'Fase 3',
    duration: '12+ meses',
    title: 'Institucionalización',
    icon: Gauge,
    color: 'text-accent',
    bg: 'bg-accent/8',
    points: [
      'IA como capa transversal (API gateway, modelos internos, integración ERP)',
      'Monitoreo continuo de sesgos, drift y calidad del servicio',
      'Contratación de modelos on-premise o soberanos si los datos lo requieren',
      'Transparencia algorítmica publicada como parte de rendición de cuentas',
    ],
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
            Colombia tiene miles de entidades públicas entre el orden nacional y territorial — 32 departamentos,
            más de 1,100 municipios, y cientos de ministerios, superintendencias, establecimientos públicos,
            empresas sociales del Estado y unidades administrativas especiales. Cada una enfrenta retos
            parecidos, pero con restricciones presupuestales, obligaciones de transparencia y responsabilidad
            fiscal que el sector privado no tiene.
          </p>
          <p className="text-text-light leading-relaxed">
            Esta guía traduce las herramientas de IA del catálogo a <span className="font-semibold text-text">casos de uso
            concretos</span> del Estado colombiano, con ejemplos de entidades que ya las aplican y recomendaciones
            alineadas al marco normativo vigente.
          </p>
        </div>
      </section>

      {/* Featured cases — visual storytelling */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-warm/10 text-warm px-3 py-1 rounded-full text-xs font-semibold mb-3 border border-warm/15">
            <Zap className="w-3 h-3" />
            Casos verificados con fuente pública
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-text tracking-tight mb-2">
            La IA ya opera en el Estado colombiano
          </h2>
          <p className="text-text-light text-sm max-w-2xl mx-auto">
            Ocho iniciativas con evidencia oficial: cada tarjeta cita la fuente. No son pilotos de laboratorio, son sistemas en operación.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURED_CASES.map((c) => {
            const CIcon = c.icon
            return (
              <div
                key={c.entity}
                className={`group relative bg-surface rounded-2xl border border-border p-5 hover:shadow-lg hover:-translate-y-1 hover:border-primary/30 transition-all duration-300 flex flex-col`}
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className={`w-12 h-12 ${c.bg} rounded-xl flex items-center justify-center shrink-0 ring-4 ${c.ring} ring-offset-0`}>
                    <CIcon className={`w-6 h-6 ${c.color}`} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className={`text-[10px] font-bold uppercase tracking-[0.12em] ${c.color}`}>
                      {c.area}
                    </div>
                    <div className="font-display font-bold text-text text-sm mt-0.5 tracking-tight truncate">
                      {c.entity}
                    </div>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-1" title="Verificado con fuente pública" />
                </div>
                <h3 className="font-display font-semibold text-text text-base leading-tight tracking-tight mb-2">
                  {c.headline}
                </h3>
                <p className="text-xs text-text-light leading-relaxed mb-4 flex-1">
                  {c.story}
                </p>
                <div className={`flex items-baseline gap-2 pt-3 border-t border-border/60`}>
                  <div className={`font-display font-extrabold ${c.color} text-xl tracking-tight leading-none`}>
                    {c.metric}
                  </div>
                  <div className="text-[11px] text-text-lighter">{c.metricLabel}</div>
                </div>
                {c.source && (
                  <a
                    href={c.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-semibold text-text-lighter hover:text-primary transition-colors no-underline"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Fuente: {c.sourceLabel}
                  </a>
                )}
              </div>
            )
          })}
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
                      <div
                        key={i}
                        className={`border-l-2 ${section.color.replace('text-', 'border-')}/40 pl-3 hover:pl-4 transition-all duration-200`}
                      >
                        <div className="flex items-start gap-2">
                          <Building2 className={`w-3.5 h-3.5 ${section.color} mt-0.5 shrink-0`} />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="font-semibold text-text text-sm">{ex.entity}</span>
                              {ex.source && (
                                <CheckCircle2 className="w-3 h-3 text-accent shrink-0" title="Caso verificado con fuente pública" />
                              )}
                            </div>
                            <div className="text-xs text-text-light leading-relaxed">{ex.application}</div>
                            {ex.source && (
                              <a
                                href={ex.source}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 mt-1 text-[10px] font-semibold text-text-lighter hover:text-primary transition-colors no-underline"
                              >
                                <ExternalLink className="w-2.5 h-2.5" />
                                Ver fuente
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {section.playbooks && section.playbooks.length > 0 && (
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="flex items-center gap-2 mb-4">
                    <div className={`w-6 h-6 rounded-md ${section.bg} ${section.color} flex items-center justify-center`}>
                      <Rocket className="w-3.5 h-3.5" />
                    </div>
                    <h3 className="text-xs font-bold text-text-lighter uppercase tracking-[0.12em]">
                      Playbooks prácticos
                    </h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {section.playbooks.map((pb, i) => (
                      <div
                        key={i}
                        className="relative bg-bg/60 rounded-xl border border-border/80 p-5 hover:shadow-md hover:border-primary/30 transition-all duration-200"
                      >
                        {/* Accent top bar */}
                        <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-xl ${section.color.replace('text-', 'bg-')}/60`} />
                        <div className="flex items-start gap-3 mb-4 mt-1">
                          <span className={`inline-flex items-center justify-center w-7 h-7 rounded-lg ${section.bg} ${section.color} font-bold text-sm shrink-0 font-display`}>
                            {i + 1}
                          </span>
                          <h4 className="font-display font-semibold text-text text-sm leading-tight tracking-tight pt-0.5">
                            {pb.title}
                          </h4>
                        </div>
                        <div className="space-y-2.5 mb-4">
                          {pb.steps.map((s, j) => (
                            <div key={j} className="flex items-start gap-2.5">
                              <div className={`w-5 h-5 rounded-full border ${section.color.replace('text-', 'border-')}/40 ${section.bg} flex items-center justify-center shrink-0 mt-0.5`}>
                                <span className={`text-[10px] font-bold ${section.color}`}>{j + 1}</span>
                              </div>
                              <p className="text-xs text-text-light leading-relaxed flex-1">{s}</p>
                            </div>
                          ))}
                        </div>
                        <div className="flex items-start gap-2 mt-3 pt-3 border-t border-border/60 bg-accent/4 -mx-5 -mb-5 px-5 pb-4 pt-3 rounded-b-xl">
                          <TrendingUp className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                          <p className="text-xs text-text leading-relaxed">
                            <span className="font-semibold text-accent">Impacto:</span>{' '}
                            <span className="text-text-light">{pb.impact}</span>
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

      {/* Sectores del Estado donde ya se aplica IA */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-primary/8 text-primary px-3 py-1 rounded-full text-xs font-semibold mb-3 border border-primary/10">
            <BarChart3 className="w-3 h-3" />
            Panorama por sectores
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-text tracking-tight mb-2">
            La IA ya llegó a todos los frentes del Estado
          </h2>
          <p className="text-text-light text-sm max-w-2xl mx-auto">
            No es un tema exclusivo de TIC o innovación. Desde salud hasta control fiscal, hay entidades moviendo la aguja.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {SECTORS.map((s) => {
            const SIcon = s.icon
            return (
              <div
                key={s.title}
                className="group relative bg-surface rounded-2xl border border-border p-4 hover:shadow-md hover:-translate-y-0.5 hover:border-primary/30 transition-all duration-200 overflow-hidden"
              >
                <div className={`absolute -top-6 -right-6 w-20 h-20 ${s.bg} rounded-full opacity-60 group-hover:scale-125 transition-transform duration-500`} />
                <div className="relative">
                  <div className={`w-11 h-11 ${s.bg} rounded-xl flex items-center justify-center mb-3`}>
                    <SIcon className={`w-5 h-5 ${s.color}`} />
                  </div>
                  <h3 className="font-display font-bold text-text text-sm tracking-tight mb-1">
                    {s.title}
                  </h3>
                  <p className="text-[11px] text-text-lighter leading-snug mb-3">{s.desc}</p>
                  <div className="flex flex-wrap gap-1">
                    {s.entities.map((e) => (
                      <span
                        key={e}
                        className={`inline-flex items-center text-[10px] font-medium ${s.color} ${s.bg} px-1.5 py-0.5 rounded-md border border-current/10`}
                      >
                        {e}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Roadmap de adopción */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-accent/8 text-accent px-3 py-1 rounded-full text-xs font-semibold mb-3 border border-accent/10">
            <Rocket className="w-3 h-3" />
            Ruta de adopción
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-text tracking-tight mb-2">
            Cómo empezar sin quemar recursos
          </h2>
          <p className="text-text-light text-sm max-w-2xl mx-auto">
            No todas las entidades arrancan igual. Esta ruta de madurez te da un punto de partida realista
            según el estado actual de tu equipo y presupuesto.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-14 left-[16.6%] right-[16.6%] h-0.5 bg-gradient-to-r from-primary/20 via-warm/20 to-accent/20 z-0" />

          {ROADMAP.map((phase) => {
            const PhaseIcon = phase.icon
            return (
              <div
                key={phase.phase}
                className="relative bg-surface rounded-2xl border border-border p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 z-10"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 ${phase.bg} rounded-xl flex items-center justify-center shrink-0`}>
                    <PhaseIcon className={`w-6 h-6 ${phase.color}`} />
                  </div>
                  <div>
                    <div className={`text-xs font-bold uppercase tracking-[0.1em] ${phase.color}`}>
                      {phase.phase}
                    </div>
                    <div className="text-[11px] text-text-lighter">{phase.duration}</div>
                  </div>
                </div>
                <h3 className="font-display font-bold text-text text-lg tracking-tight mb-3">
                  {phase.title}
                </h3>
                <ul className="space-y-2">
                  {phase.points.map((p, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs text-text-light leading-relaxed">
                      <span className={`${phase.color} font-bold mt-0.5 text-xs`}>•</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </section>

      {/* Principios normativos */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="bg-text text-white rounded-2xl p-6 md:p-10">
          <h2 className="text-2xl font-bold mb-2 tracking-tight">Marco normativo y principios</h2>
          <p className="text-white/80 leading-relaxed mb-6">
            Cualquier uso de IA en el sector público debe alinearse con el marco legal colombiano y los principios
            éticos internacionales. Estos son los cuatro pilares:
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PRINCIPLES.map((p) => {
              const PIcon = p.icon
              return (
                <div
                  key={p.title}
                  className="bg-white/10 rounded-xl p-5 backdrop-blur-sm border border-white/10 hover:bg-white/15 hover:border-white/20 transition-all duration-300 flex flex-col"
                >
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-9 h-9 bg-white/15 rounded-lg flex items-center justify-center shrink-0">
                      <PIcon className="w-4.5 h-4.5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm mb-1 tracking-tight leading-tight">{p.title}</h3>
                      <p className="text-white/75 text-xs leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                  {p.source && (
                    <a
                      href={p.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1 text-[10px] font-semibold text-white/60 hover:text-white transition-colors no-underline"
                    >
                      <ExternalLink className="w-2.5 h-2.5" />
                      Fuente oficial
                    </a>
                  )}
                </div>
              )
            })}
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
