import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Landmark, Users, FileSearch, ShieldCheck, Megaphone,
  GitBranch, Sparkles, AlertTriangle, BookOpen, ArrowRight,
  Building2, ScrollText, Scale, Rocket, Target,
  Gauge, TrendingUp, Zap, CheckCircle2, ExternalLink, Gavel,
  BarChart3, Globe2, Heart, Leaf, Stethoscope, GraduationCap,
  Truck, Banknote, Shield, Briefcase, Mic,
  PlayCircle, Headphones, MessageSquare, Layers,
  Upload, Terminal, Quote, Map, Brain, Video, FolderOpen,
  Lock, Play, Pause, Rewind, FastForward, ShieldAlert,
  FileCheck, Radio, Waves, Copy, Check, Ban,
  XCircle, ArrowLeft, RefreshCcw, Award,
  Compass, Package, Hammer, Flag, Lightbulb, Handshake,
  ClipboardList, Wrench, Calendar, BookMarked,
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
    tools: ['chatgpt', 'claude', 'humata', 'zapier-ai', 'manus', 'deepseek'],
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
        application: 'Política Nacional de IA (feb 2025), COP $479.000 millones (~USD 112M) con más de 100 acciones a 2030 y 6 ejes estratégicos.',
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
    tools: ['notebooklm', 'claude', 'kimi', 'perplexity', 'humata', 'cocounsel'],
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
    tools: ['claude', 'kimi', 'humata', 'mindbridge', 'chatgpt', 'cocounsel'],
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
    tools: ['julius', 'notebooklm', 'claude', 'deepseek', 'perplexity', 'rows'],
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
    tools: ['mindbridge', 'julius', 'claude', 'deepseek', 'copilot-finance'],
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
    desc: 'Hoja de ruta nacional aprobada el 14-feb-2025 (COP $479.000 M, 6 ejes, 100+ acciones a 2030) sobre gobernanza, ética, riesgos y transparencia.',
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

const ROLES = [
  {
    id: 'directivo',
    icon: Briefcase,
    grad: 'from-primary/15 via-primary/5 to-transparent',
    accent: 'text-primary',
    bg: 'bg-primary/10',
    ring: 'ring-primary/15',
    title: 'Directivo / Secretario de despacho',
    subtitle: 'Decide con evidencia, no con intuición',
    tasks: [
      'Tablero ejecutivo con ejecución presupuestal y metas del Plan',
      'Resúmenes de 30 min antes de reuniones (informes, contratos, estudios)',
      'Escenarios "qué pasa si" sobre tarifas, cobertura o inversión',
    ],
    tools: ['claude', 'julius', 'notebooklm'],
    anchor: 'datos',
  },
  {
    id: 'planeacion',
    icon: Map,
    grad: 'from-accent/15 via-accent/5 to-transparent',
    accent: 'text-accent',
    bg: 'bg-accent/10',
    ring: 'ring-accent/15',
    title: 'Analista de planeación / PDT',
    subtitle: 'Diagnóstico territorial y formulación de metas',
    tasks: [
      'Cruce DANE + SISBEN + ECV + Terridata por municipio',
      'Formulación de indicadores SMART con línea base y meta',
      'Fichas de proyecto para el Banco de Proyectos (SUIFP / MGA)',
    ],
    tools: ['julius', 'claude', 'deepseek'],
    anchor: 'datos',
  },
  {
    id: 'juridico',
    icon: Gavel,
    grad: 'from-warm/15 via-warm/5 to-transparent',
    accent: 'text-warm',
    bg: 'bg-warm/10',
    ring: 'ring-warm/15',
    title: 'Abogado de contratación',
    subtitle: 'Pliegos, ofertas y cláusulas bajo control',
    tasks: [
      'Revisión de pliegos vs. Ley 80, 1150 y Decreto 1082',
      'Comparación ofertas técnicas y económicas lado a lado',
      'Mapa de riesgos contractuales y cláusulas problemáticas',
    ],
    tools: ['humata', 'kimi', 'cocounsel'],
    anchor: 'secop',
  },
  {
    id: 'ventanilla',
    icon: Users,
    grad: 'from-primary/15 via-primary/5 to-transparent',
    accent: 'text-primary',
    bg: 'bg-primary/10',
    ring: 'ring-primary/15',
    title: 'Servidor de ventanilla / PQRSD',
    subtitle: 'Atención rápida y trazable al ciudadano',
    tasks: [
      'Triage automático de peticiones por tipo y urgencia',
      'Borradores de respuesta en tono institucional con citas del TUPA',
      'Traducción a lenguaje claro de fichas GOV.CO',
    ],
    tools: ['chatgpt', 'claude', 'zapier-ai'],
    anchor: 'pqrsd',
  },
  {
    id: 'control',
    icon: ShieldCheck,
    grad: 'from-emerald-500/15 via-emerald-500/5 to-transparent',
    accent: 'text-emerald-700',
    bg: 'bg-emerald-100',
    ring: 'ring-emerald-200',
    title: 'Auditor / Control interno',
    subtitle: 'Del muestreo al 100% con trazabilidad',
    tasks: [
      'Auditoría de cuentas por pagar al 100% (no por muestreo)',
      'Detección de colusión y beneficiarios finales en SECOP',
      'Conflictos de interés cruzando contratistas con nómina',
    ],
    tools: ['mindbridge', 'julius', 'deepseek'],
    anchor: 'auditoria',
  },
  {
    id: 'comunicador',
    icon: Megaphone,
    grad: 'from-pink-500/15 via-pink-500/5 to-transparent',
    accent: 'text-pink-600',
    bg: 'bg-pink-50',
    ring: 'ring-pink-200',
    title: 'Comunicador institucional',
    subtitle: 'Piezas rápidas, inclusivas y en varios idiomas',
    tasks: [
      'Piezas para GOV.CO y redes con plantillas Canva',
      'Videos explicativos con avatares y voz sintética',
      'Traducción a wayuunaiki, nasa yuwe o criollo',
    ],
    tools: ['canva', 'heygen', 'elevenlabs'],
    anchor: 'comunicacion',
  },
  {
    id: 'govtech',
    icon: Terminal,
    grad: 'from-indigo-500/15 via-indigo-500/5 to-transparent',
    accent: 'text-indigo-600',
    bg: 'bg-indigo-50',
    ring: 'ring-indigo-200',
    title: 'Equipo TI / GovTech',
    subtitle: 'Automatización, RAG e integraciones',
    tasks: [
      'Chatbots RAG sobre TUPA, manuales y normativa interna',
      'Integración GOV.CO + Orfeo/SAIA con pipelines en Make',
      'Agentes que orquestan descargas de datos.gov.co y reportes',
    ],
    tools: ['claude-code', 'manus', 'zapier-ai'],
    anchor: 'automatizacion',
  },
  {
    id: 'politica',
    icon: BookOpen,
    grad: 'from-violet-500/15 via-violet-500/5 to-transparent',
    accent: 'text-violet-600',
    bg: 'bg-violet-50',
    ring: 'ring-violet-200',
    title: 'Investigador / Asesor de política',
    subtitle: 'CONPES, AIR y líneas jurisprudenciales',
    tasks: [
      'Análisis de Impacto Regulatorio (AIR) comparado',
      'Líneas jurisprudenciales sobre un tema específico',
      'Benchmark de políticas OCDE traducidas al contexto colombiano',
    ],
    tools: ['notebooklm', 'kimi', 'perplexity'],
    anchor: 'politicas',
  },
]

const PROMPTS_LIBRARY = [
  {
    roleId: 'directivo',
    roleLabel: 'Directivo · Secretario de despacho',
    icon: Briefcase,
    color: '#4338CA',
    prompts: [
      {
        title: 'Resumen ejecutivo para Consejo de Gobierno',
        body: 'Estoy preparando el Consejo de Gobierno del [FECHA]. Lee el documento adjunto y entrega: (1) 3 hallazgos clave con cifra verificable, (2) 2 alertas que requieren decisión esta semana, (3) la recomendación con pros y contras de cada opción. Formato: máximo 1 página, bullets cortos, cero relleno.',
        tool: 'claude',
      },
      {
        title: 'Preguntas difíciles antes de rueda de prensa',
        body: 'Voy a una rueda de prensa sobre [TEMA]. Con las fuentes cargadas, plantea las 10 preguntas más incómodas que un periodista podría hacer. Para cada una, propón una respuesta honesta de 2 frases basada ÚNICAMENTE en las fuentes. Si no hay respuesta posible, dilo.',
        tool: 'notebooklm',
      },
      {
        title: 'Tablero mensual de seguimiento',
        body: 'Con los datos de ejecución presupuestal y cumplimiento de metas que te cargué, arma un tablero mensual con: 5 KPIs de cabecera con semáforo (verde/amarillo/rojo), 3 rubros críticos con explicación corta y los próximos hitos a 30/60/90 días. Formato: tabla en markdown.',
        tool: 'julius',
      },
      {
        title: 'Priorizar correos del día',
        body: 'Pego a continuación mis primeros 30 correos del día (solo asunto + remitente + primer párrafo). Clasifícalos en: URGENTE E IMPORTANTE (requiere firma o decisión hoy), IMPORTANTE NO URGENTE (esta semana), DELEGAR (sugiere a quién), ARCHIVAR. Justifica cada clasificación en 1 frase.',
        tool: 'claude',
      },
      {
        title: 'Preparar reunión con par institucional',
        body: 'Mañana tengo reunión con [CARGO] sobre [TEMA]. Entrega: contexto en 1 párrafo, 3 puntos que debo defender, 2 concesiones aceptables, 3 preguntas para abrir diálogo y 2 señales de alerta que no debo pasar por alto.',
        tool: 'claude',
      },
      {
        title: 'Discurso de 5 minutos',
        body: 'Escribe un discurso de 5 minutos (≈750 palabras) sobre [TEMA] para audiencia de [PERFIL: concejales / gremios / ciudadanía / academia]. Tono institucional pero cercano. Incluye una anécdota verosímil, 3 cifras impactantes verificables y cierre con llamado a la acción específico.',
        tool: 'chatgpt',
      },
    ],
  },
  {
    roleId: 'planeacion',
    roleLabel: 'Analista de planeación · PDT',
    icon: Map,
    color: '#0D9488',
    prompts: [
      {
        title: 'Diagnóstico territorial rápido',
        body: 'Con las fichas Terridata, DANE y ECV cargadas del territorio [NOMBRE], entrega: (1) perfil demográfico y socioeconómico en 5 bullets, (2) top 3 brechas frente al promedio departamental con cifras, (3) 3 factores que explican el rezago.',
        tool: 'notebooklm',
      },
      {
        title: 'Formular indicador SMART',
        body: 'Necesito un indicador para la meta "[TEXTO DE LA META]" del Plan de Desarrollo. Propón nombre, fórmula de cálculo, unidad, línea base estimada con supuestos, meta a 2027, fuente oficial de verificación y periodicidad. Criterio: debe ser SMART y auditable por la Contraloría.',
        tool: 'claude',
      },
      {
        title: 'Comparar entre territorios',
        body: 'Con los datos que te cargué, compara los municipios [A, B, C, D] en: pobreza multidimensional, cobertura educativa, déficit habitacional y homicidios por 100 mil. Entrega tabla + ranking + observaciones atípicas que merezcan explicación.',
        tool: 'julius',
      },
      {
        title: 'Detectar brechas por sector',
        body: 'Analiza los datasets cargados del sector [SALUD/EDUCACIÓN/VIVIENDA]. Identifica los 20 municipios con mayor brecha frente al promedio nacional, agrupa por departamento y sugiere prioridades de inversión para el próximo año.',
        tool: 'julius',
      },
      {
        title: 'Proyección de población objetivo',
        body: 'Dada la población de [GRUPO: ej. menores de 5 años, adultos mayores, víctimas] de [TERRITORIO] al último censo, proyecta a 2027 usando la tasa de crecimiento observada entre 2018-2023. Documenta el método y supuestos. Señala limitaciones.',
        tool: 'deepseek',
      },
      {
        title: 'Alineación PDT ↔ CONPES ↔ ODS',
        body: 'Con el PDT y los CONPES sectoriales cargados, arma una matriz que relacione cada meta del Plan con el CONPES aplicable y el ODS correspondiente. Marca los CONPES o ODS sin cobertura en el Plan como hallazgos para el equipo jurídico.',
        tool: 'notebooklm',
      },
    ],
  },
  {
    roleId: 'juridico',
    roleLabel: 'Abogado de contratación',
    icon: Gavel,
    color: '#F97316',
    prompts: [
      {
        title: 'Revisión express de pliego',
        body: 'Revisa el borrador de pliego cargado frente a Ley 80, Ley 1150, Decreto 1082 y documentos tipo vigentes. Marca: (1) cláusulas que contradicen la normativa, (2) requisitos desproporcionados para el objeto, (3) criterios subjetivos de calificación, (4) riesgos que quedan 100% en la entidad. Cita artículo y página del pliego.',
        tool: 'humata',
      },
      {
        title: 'Comparar dos ofertas',
        body: 'Con las dos ofertas cargadas, genera tabla comparativa lado a lado sobre: cumplimiento técnico, experiencia, equipo clave, plan de trabajo, precio unitario por ítem y total. Destaca ítems donde la diferencia de precio supera 15% del presupuesto oficial. No recomiendes ganador.',
        tool: 'kimi',
      },
      {
        title: 'Cláusulas de riesgo a incluir',
        body: 'Para un contrato de [OBJETO] con valor [VALOR] y plazo [MESES], propón las cláusulas de manejo de riesgo que DEBEN incluirse: garantías, causales de terminación, multas, cláusula penal, confidencialidad, propiedad intelectual y salida anticipada. Redáctalas listas para integrar al pliego.',
        tool: 'claude',
      },
      {
        title: 'Respuesta a observación de oferente',
        body: 'Un oferente observó el pliego argumentando "[TEXTO DE LA OBSERVACIÓN]". Redacta borrador de respuesta técnico-jurídica que: (1) acoja si es procedente, (2) explique con norma si no, (3) proponga adenda si corresponde. Tono formal, máximo 1 página.',
        tool: 'claude',
      },
      {
        title: 'Checklist de requisitos habilitantes',
        body: 'Con el pliego cargado, extrae el checklist completo de requisitos habilitantes jurídicos, financieros, técnicos y de experiencia que debe verificar el comité. Formato: checklist numerado con el documento soporte esperado para cada ítem.',
        tool: 'notebooklm',
      },
      {
        title: 'Análisis de garantías exigidas',
        body: 'Evalúa si las garantías exigidas en el pliego (cumplimiento, calidad, salarios, responsabilidad civil) son proporcionales al objeto y valor del contrato. Compara con Decreto 1082 y jurisprudencia reciente del Consejo de Estado. Marca excesos y defectos.',
        tool: 'cocounsel',
      },
      {
        title: 'Estudio de mercado CCE (obra / bien / servicio)',
        body: `Actúa como consultor senior experto en contratación estatal colombiana. Tu PRODUCTO es un Estudio de Mercado alineado a la Guía para la Elaboración de Estudios de Mercado de Colombia Compra Eficiente.

## DATOS DEL PROYECTO (completa antes de correr)
- Objeto: [DESCRIBE]
- Presupuesto oficial estimado: [VALOR COP]
- Plazo de ejecución: [MESES]
- Ubicación: [MUNICIPIO, DEPARTAMENTO]
- Códigos UNSPSC: [LISTA]
- Actividades principales: [LISTA]
- Estructura AIU propuesta: A [%] · I [%] · U [%]

## CONTEXTO MACROECONÓMICO (reemplaza con los datos oficiales del año vigente)
- SMLMV + auxilio de transporte: [VALOR]
- Factor prestacional aplicable: [%]
- Inflación IPC anual: [%]
- Proyección PIB: [%]
- Tasa de desempleo: [%]
- ICOCIV / índice sectorial: [%]

## PRODUCTO ESPERADO
Informe técnico-jurídico con:
1. Análisis del sector y la región — comportamiento del subsector frente al PIB vigente.
2. Análisis económico — impacto del SMLMV e IPC sobre los APU; justificación de si el presupuesto oficial responde al mercado.
3. Análisis de riesgos — relación entre porcentaje de imprevistos y variables macro.
4. Justificación del AIU — si los porcentajes propuestos cubren los costos indirectos reales.
5. Verificación UNSPSC — coincidencia de códigos con el objeto y las actividades.

## REGLAS
- Tono profesional, técnico, jurídico y económico; lenguaje de pliegos de condiciones colombianos.
- Sólo datos verificables. Si un dato no se sustenta en las fuentes cargadas, dilo explícitamente.
- Cita la normativa aplicable (Ley 80, Ley 1150, Decreto 1082, circulares CCE vigentes) con artículo.
- No inventes cifras oficiales (SMLMV, IPC, PIB se toman de DANE / BanRep del año en curso).

## FUENTES A CARGAR
Estudio previo · presupuesto oficial · APU · normativa y circulares CCE · Guía CCE de estudios de mercado.`,
        tool: 'claude',
      },
    ],
  },
  {
    roleId: 'ventanilla',
    roleLabel: 'Ventanilla · PQRSD',
    icon: Users,
    color: '#4338CA',
    prompts: [
      {
        title: 'Triage de una petición',
        body: 'Pega aquí el texto completo de la PQRSD. Entrega: (1) tipo (petición / queja / reclamo / sugerencia / denuncia), (2) tema, (3) urgencia 1–5 con justificación, (4) término de respuesta aplicable según Ley 1755, (5) datos del peticionario, (6) resumen en 3 frases.',
        tool: 'claude',
      },
      {
        title: 'Respuesta tipo a PQRSD',
        body: 'Con base en la petición pegada y el TUPA del trámite cargado, redacta borrador de respuesta en tono institucional. Incluye saludo formal, contexto del caso, fundamento normativo con cita, respuesta concreta y cierre con datos de contacto. Máximo 400 palabras. Si falta información, lista qué pedir al peticionario.',
        tool: 'chatgpt',
      },
      {
        title: 'Traducir trámite a lenguaje claro',
        body: 'Reescribe este texto legal del trámite en lenguaje claro para alguien con educación básica: [PEGA TEXTO]. Reglas: máximo 7 palabras por frase, voz activa, sin tecnicismos. Preserva los plazos, requisitos y consecuencias exactas. Devuelve dos versiones: una corta (200 palabras) y una mediana (400 palabras).',
        tool: 'claude',
      },
      {
        title: 'Detectar riesgo de tutela',
        body: 'Esta petición menciona: "[PEGA TEXTO]". Evalúa si hay riesgo de acción de tutela o derecho fundamental comprometido (salud, educación, vida digna, debido proceso). Si sí, propón escalamiento inmediato con ruta sugerida. Si no, explica por qué.',
        tool: 'claude',
      },
      {
        title: 'Resumir consulta larga',
        body: 'Pega aquí la transcripción de la consulta del ciudadano (o correo largo). Extrae: (1) qué está pidiendo concretamente, (2) qué documentos o datos aporta, (3) qué le falta para resolver, (4) plazo en el que espera respuesta. Formato: ficha de radicación.',
        tool: 'chatgpt',
      },
      {
        title: 'Escalar caso con contexto completo',
        body: 'Voy a escalar este caso a [DEPENDENCIA]. Redacta el memorando interno con: antecedentes, qué se ha hecho, qué se necesita del área receptora, plazo sugerido y riesgos si no se atiende a tiempo. Tono interinstitucional, breve y trazable.',
        tool: 'claude',
      },
    ],
  },
  {
    roleId: 'control',
    roleLabel: 'Auditor · Control interno',
    icon: ShieldCheck,
    color: '#059669',
    prompts: [
      {
        title: 'Plan de auditoría anual',
        body: 'Con base en la matriz de riesgos cargada y el MECI, propón plan anual de auditoría con: 10 auditorías priorizadas por criticidad, objetivo de cada una, alcance temporal, cronograma, recursos estimados (horas-auditor) y entregables esperados. Formato: tabla priorizada.',
        tool: 'claude',
      },
      {
        title: 'Red flags en transacciones',
        body: 'Con el archivo de transacciones cargado, identifica: (1) facturas duplicadas por valor y concepto, (2) pagos en sábado o festivo, (3) proveedores nuevos con pagos superiores a $50M en primer mes, (4) montos redondeados atípicos, (5) mismo tercero cobrando por múltiples contratos con varianza menor al 2% en precios unitarios. Exporta con score de riesgo.',
        tool: 'mindbridge',
      },
      {
        title: 'Hallazgo de auditoría con evidencia',
        body: 'Para el hallazgo "[TEXTO]", redacta la ficha formal con: condición (lo que se encontró), criterio (norma o procedimiento violado con cita), causa, efecto, recomendación y plazo propuesto. Tono técnico auditor, máximo 1 página. Trazabilidad: lista qué evidencia sustenta cada parte.',
        tool: 'claude',
      },
      {
        title: 'Conflicto de interés en contratación',
        body: 'Cruzando el listado de contratistas (NIT, representante legal, dirección) con la nómina de la entidad (cédula, cargo, dependencia), identifica coincidencias en: apellidos, direcciones, vínculos societarios visibles. Cada hallazgo requiere verificación manual antes de indagación preliminar.',
        tool: 'julius',
      },
      {
        title: 'Gastos atípicos por rubro',
        body: 'Con la ejecución presupuestal de los últimos 24 meses, identifica los 10 rubros con mayor desviación frente al promedio histórico. Para cada uno: valor atípico, valor esperado, mes del atípico, posible explicación administrativa y prueba recomendada.',
        tool: 'deepseek',
      },
      {
        title: 'Seguimiento a planes de mejoramiento',
        body: 'Con la matriz de planes de mejoramiento cargada, identifica: (1) acciones vencidas sin cumplimiento, (2) hallazgos reiterativos año tras año, (3) áreas con mayor acumulación de compromisos incumplidos. Prepara semáforo para el comité institucional.',
        tool: 'julius',
      },
    ],
  },
  {
    roleId: 'comunicador',
    roleLabel: 'Comunicador institucional',
    icon: Megaphone,
    color: '#DB2777',
    prompts: [
      {
        title: 'Comunicado de prensa',
        body: 'Redacta comunicado de prensa sobre [TEMA]. Estructura: titular de 8 palabras, lead en 30 palabras con qué/quién/cuándo/dónde, 3 párrafos de contexto, 1 cita atribuible al directivo, 1 cifra verificable, datos de contacto del equipo de prensa. Tono institucional colombiano.',
        tool: 'claude',
      },
      {
        title: 'Carrusel para redes (Instagram/Facebook)',
        body: 'Convierte este boletín [PEGA TEXTO] en carrusel de 8 diapositivas para Instagram/Facebook. Cada diapositiva: título ≤6 palabras, cuerpo ≤20 palabras, 1 dato o cifra. Última diapositiva: llamado a la acción con canal oficial. Tono cercano, lenguaje claro.',
        tool: 'chatgpt',
      },
      {
        title: 'Guion de video de 60 segundos',
        body: 'Escribe guion de video 60s sobre [TEMA] para redes. Formato: hook en 3 segundos, 3 puntos principales de 15s cada uno, cierre con CTA 5s. Marca escenas con [VISUAL] y voz en off con [VO]. Incluye captions para accesibilidad.',
        tool: 'claude',
      },
      {
        title: 'Traducir a lenguaje claro ciudadano',
        body: 'Reescribe este texto institucional en lenguaje claro: [PEGA TEXTO]. Frases máximo 15 palabras, evita siglas (si usas, explica), voz activa, verbos concretos. Objetivo: que alguien con primaria completa entienda. Conserva los plazos, requisitos y cifras exactas.',
        tool: 'claude',
      },
      {
        title: 'Respuesta en redes ante crisis',
        body: 'En redes está circulando [SITUACIÓN]. Propón 3 borradores de respuesta oficial con tonos distintos: (1) informativo-factual, (2) empático-humano, (3) correctivo-firme. Para cada uno: hashtags sugeridos, riesgos del tono y cuándo usarlo.',
        tool: 'claude',
      },
      {
        title: 'Newsletter mensual de gestión',
        body: 'Con los informes cargados del mes, arma newsletter: asunto con gancho, 3 bloques temáticos (logros, decisiones, próximos hitos), 1 cifra destacada, 1 testimonio ciudadano. Longitud: 600 palabras. Incluye versión corta para Twitter/X de 240 caracteres.',
        tool: 'notebooklm',
      },
    ],
  },
  {
    roleId: 'govtech',
    roleLabel: 'TI · GovTech',
    icon: Terminal,
    color: '#6366F1',
    prompts: [
      {
        title: 'RAG sobre manuales internos',
        body: 'Diseña arquitectura de RAG para habilitar chatbot interno sobre [TIPO DE DOCUMENTOS: TUPA, manuales, circulares]. Define: ingestión de fuentes, chunking, embeddings, vector store, re-ranker, guardarraíles contra alucinación. Incluye estimación de costos mensual para [N] consultas/día.',
        tool: 'claude-code',
      },
      {
        title: 'Definir agente autónomo para caso X',
        body: 'Diseña agente para automatizar [TAREA]. Entrega: objetivo, herramientas que necesita (APIs, MCPs), pasos razonados, criterios de parada, casos donde debe escalar a humano y métricas de éxito. Incluye guardarraíles éticos y de seguridad.',
        tool: 'manus',
      },
      {
        title: 'User stories para chatbot ciudadano',
        body: 'Con el TUPA cargado, redacta 15 user stories para chatbot ciudadano. Formato estándar: Como [PERFIL], quiero [ACCIÓN], para [BENEFICIO]. Incluye criterios de aceptación, datos que maneja y nivel de sensibilidad. Marca las que involucran datos personales.',
        tool: 'chatgpt',
      },
      {
        title: 'Pipeline Make / Zapier',
        body: 'Necesito automatizar este flujo: [DESCRIBE]. Diseña pipeline en Make o Zapier con: trigger, pasos, lógica de error y notificaciones. Marca qué pasos usan IA y cuáles son determinísticos. Estima costo mensual para [N] ejecuciones.',
        tool: 'zapier-ai',
      },
      {
        title: 'Política interna de uso de IA',
        body: 'Redacta borrador de política interna de uso de IA para una entidad pública. Cubre: alcance, herramientas permitidas/prohibidas, datos que no pueden salir, supervisión humana requerida, formación obligatoria, sanciones y revisión anual. Alineada con CONPES 4144, Ley 1581 y T-323/2024.',
        tool: 'claude',
      },
      {
        title: 'Evaluación de proveedor de IA',
        body: 'Para evaluar al proveedor [NOMBRE] que ofrece [SERVICIO], arma matriz con: jurisdicción de datos, certificaciones (SOC 2, ISO 27001), compatibilidad con habeas data, política de entrenamiento, costo total de propiedad, cláusula de salida, plan de continuidad. Recomienda decisión.',
        tool: 'claude',
      },
    ],
  },
  {
    roleId: 'politica',
    roleLabel: 'Investigador · Asesor de política',
    icon: BookOpen,
    color: '#7C3AED',
    prompts: [
      {
        title: 'Análisis de Impacto Regulatorio (AIR)',
        body: 'Con el proyecto de ley/decreto cargado + normativa relacionada + estudios OCDE, genera matriz AIR con: problema que aborda, objetivos, opciones evaluadas (al menos 3), costos y beneficios de cada una, impactos sobre actores afectados y alternativa recomendada con justificación. Cita fuentes cargadas.',
        tool: 'notebooklm',
      },
      {
        title: 'Línea jurisprudencial',
        body: 'Con las sentencias de la Corte Constitucional y Consejo de Estado cargadas sobre [TEMA], identifica la ratio decidendi de cada una y construye línea jurisprudencial cronológica. Marca cuándo cambia la postura y por qué. Entrega tabla + narrativa de 400 palabras.',
        tool: 'kimi',
      },
      {
        title: 'Benchmark internacional',
        body: '¿Qué países de la OCDE han implementado política sobre [TEMA] entre 2020 y 2026? Para cada caso: año, instrumento normativo, alcance, costo aproximado, resultados documentados, lecciones aprendidas. Traduce al contexto colombiano.',
        tool: 'perplexity',
      },
      {
        title: 'Nota técnica con evidencia',
        body: 'Redacta nota técnica de 5 páginas sobre [TEMA] para [DESTINATARIO]. Estructura: resumen ejecutivo, contexto, diagnóstico con cifras, opciones de política con evidencia, recomendación. Cada afirmación con cita verificable. Si no hay evidencia, dilo.',
        tool: 'claude',
      },
      {
        title: 'Matriz de actores',
        body: 'Para una política sobre [TEMA], identifica actores clave: gobierno (qué entidad), academia, gremios, sociedad civil, medios. Para cada uno: posición probable, argumentos, poder e interés, estrategia de relacionamiento. Formato: matriz poder-interés.',
        tool: 'claude',
      },
      {
        title: 'Exposición de motivos',
        body: 'Redacta exposición de motivos para proyecto de ley/decreto sobre [TEMA]. Estructura: antecedentes, marco constitucional, marco legal, jurisprudencia aplicable (con cita), evidencia empírica, análisis de impacto, articulado. Tono formal jurídico colombiano.',
        tool: 'claude',
      },
    ],
  },
]

const MATURITY_QUESTIONS = [
  {
    id: 'policy',
    question: '¿La entidad tiene política interna o marco de gobernanza sobre uso de IA?',
    options: [
      { label: 'No se ha discutido', points: 0 },
      { label: 'Hay borrador en discusión', points: 3 },
      { label: 'Aprobada internamente', points: 7 },
      { label: 'Aprobada y publicada en transparencia', points: 10 },
    ],
  },
  {
    id: 'roles',
    question: '¿Existe rol formal responsable de datos e IA (Oficial de Datos, comité, equipo)?',
    options: [
      { label: 'No existe', points: 0 },
      { label: 'Informal, distribuido entre varias áreas', points: 4 },
      { label: 'Formal pero sin dedicación exclusiva', points: 7 },
      { label: 'Equipo con dedicación y presupuesto', points: 10 },
    ],
  },
  {
    id: 'eipd',
    question: '¿Antes de usar IA con datos personales se realiza Evaluación de Impacto en Protección de Datos (EIPD)?',
    options: [
      { label: 'Nunca', points: 0 },
      { label: 'A veces, sólo cuando lo piden', points: 3 },
      { label: 'Siempre que aplica', points: 8 },
      { label: 'Siempre, y la EIPD se publica', points: 10 },
    ],
  },
  {
    id: 'cases',
    question: '¿Cuántos casos de uso de IA están hoy activos en la entidad?',
    options: [
      { label: 'Ninguno', points: 0 },
      { label: '1–2 en piloto', points: 3 },
      { label: '3–5 en operación regular', points: 7 },
      { label: 'Más de 5, integrados a procesos misionales', points: 10 },
    ],
  },
  {
    id: 'data',
    question: '¿Los datos sensibles (personales, reservados) se suben a servicios IA públicos sin control?',
    options: [
      { label: 'Sí, frecuentemente', points: 0 },
      { label: 'A veces ocurre y no se detecta', points: 2 },
      { label: 'Raramente, hay guía interna', points: 6 },
      { label: 'Nunca, hay controles técnicos y DLP', points: 10 },
    ],
  },
  {
    id: 'oversight',
    question: '¿Las decisiones asistidas por IA pasan por supervisión humana?',
    options: [
      { label: 'No, algunas se automatizan sin revisión', points: 0 },
      { label: 'Sólo en casos graves', points: 3 },
      { label: 'En la mayoría de los casos', points: 7 },
      { label: 'Siempre hay humano responsable que firma', points: 10 },
    ],
  },
  {
    id: 'training',
    question: '¿El equipo ha recibido formación en IA y prompting?',
    options: [
      { label: 'Nadie ha recibido formación', points: 0 },
      { label: 'Algunos por iniciativa propia', points: 3 },
      { label: 'Equipo clave con curso formal', points: 7 },
      { label: 'Plan de formación escalado a toda la entidad', points: 10 },
    ],
  },
  {
    id: 'transparency',
    question: '¿Hay mecanismos de transparencia sobre el uso de IA (aviso al ciudadano, registro)?',
    options: [
      { label: 'No hay ningún aviso', points: 0 },
      { label: 'Se documenta sólo internamente', points: 3 },
      { label: 'Aviso en algunos canales visibles', points: 6 },
      { label: 'Registro público de sistemas + aviso claro en cada punto', points: 10 },
    ],
  },
  {
    id: 'measure',
    question: '¿Se mide el impacto de las iniciativas IA (tiempo ahorrado, errores reducidos)?',
    options: [
      { label: 'No se mide', points: 0 },
      { label: 'Anecdóticamente', points: 3 },
      { label: 'Algunas iniciativas con línea base', points: 7 },
      { label: 'Siempre, con tablero público de resultados', points: 10 },
    ],
  },
  {
    id: 'procurement',
    question: '¿Los procesos de contratación ya contemplan cláusulas específicas para IA?',
    options: [
      { label: 'No se ha considerado', points: 0 },
      { label: 'Se empezó a conversar con el equipo jurídico', points: 3 },
      { label: 'Algunos pliegos ya incluyen cláusulas básicas', points: 7 },
      { label: 'Política formal + cláusulas tipo en contratación', points: 10 },
    ],
  },
]

const MATURITY_BANDS = [
  {
    min: 0,
    max: 24,
    label: 'Inicial',
    color: 'text-rose-600',
    bg: 'bg-rose-50',
    ring: 'ring-rose-200',
    grad: 'from-rose-500 to-orange-500',
    summary: 'Tu entidad todavía no tiene bases formales de IA. Es el momento de empezar por lo esencial: no por la tecnología, sino por las reglas del juego.',
    actions: [
      'Define una política mínima de uso de IA en 2 páginas: qué datos no salen, quién firma decisiones, qué herramientas están permitidas.',
      'Escoge 1 caso de uso de bajo riesgo y alto volumen (ej. resumen de PQRSD, lenguaje claro en trámites).',
      'Capacita 3–5 personas clave con NotebookLM o ChatGPT — hazlo antes de escalar a toda la entidad.',
    ],
    tools: ['notebooklm', 'claude', 'chatgpt'],
  },
  {
    min: 25,
    max: 49,
    label: 'En marcha',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    ring: 'ring-amber-200',
    grad: 'from-amber-500 to-yellow-500',
    summary: 'Hay pilotos y sensibilidad, pero la gobernanza va detrás de la operación. Hora de formalizar antes de que crezca el riesgo.',
    actions: [
      'Formaliza política, roles y comité de IA. Publícalos — eso manda señal interna y hacia entes de control.',
      'Documenta EIPD para los pilotos activos y retrospectivamente para los que ya operan.',
      'Mide línea base y resultados: tiempo, costos, errores. Sin métricas, el siguiente Consejo pedirá cerrar los pilotos.',
    ],
    tools: ['notebooklm', 'claude', 'julius'],
  },
  {
    min: 50,
    max: 74,
    label: 'Consolidado',
    color: 'text-primary',
    bg: 'bg-primary/10',
    ring: 'ring-primary/20',
    grad: 'from-primary to-indigo-600',
    summary: 'La entidad opera IA con gobernanza y mediciones. El reto ya no es adoptar, es escalar sin perder control ni ética.',
    actions: [
      'Integra IA en contratación: cláusulas tipo, evaluación de proveedores, exigencia de explicabilidad y jurisdicción de datos.',
      'Habilita transparencia algorítmica pública: registro de sistemas, aviso claro al ciudadano, auditoría de sesgos.',
      'Pasa de cuentas individuales a planes empresariales con SSO, logs y retención — evita shadow IT.',
    ],
    tools: ['claude', 'humata', 'mindbridge'],
  },
  {
    min: 75,
    max: 100,
    label: 'Referente',
    color: 'text-emerald-700',
    bg: 'bg-emerald-50',
    ring: 'ring-emerald-200',
    grad: 'from-emerald-500 to-teal-600',
    summary: 'Tu entidad está entre las pioneras del Estado colombiano. El siguiente salto es multiplicar: ayudar a que otras entidades suban el piso.',
    actions: [
      'Comparte aprendizajes en espacios institucionales (MinTIC, FND, Fedemunicipios, Asocapitales). Lo que funciona se replica.',
      'Explora modelos propios o soberanos donde los datos lo exijan (on-premise, fine-tuning sobre corpus institucional).',
      'Construye capacidades de IA como bien público: publica corpus, embeddings y chatbots reutilizables por otras entidades.',
    ],
    tools: ['claude', 'kimi', 'deepseek'],
  },
]

const RED_FLAGS = [
  {
    title: 'Delegar la decisión en la IA',
    why: 'La T-323 de 2024 fijó que la IA es apoyo, no decisor. Un acto administrativo sin motivación humana es anulable — y el servidor, responsable disciplinariamente.',
    instead: 'Usa IA para resumir, comparar y proponer. La firma y la motivación siempre son humanas.',
    norm: 'T-323/2024 · Corte Constitucional',
  },
  {
    title: 'Subir datos personales a LLMs públicos',
    why: 'Cédulas, historias clínicas, SISBEN, declaraciones juradas cruzando por ChatGPT gratuito = transferencia internacional de datos sin autorización. Multas hasta 2.000 SMMLV.',
    instead: 'Anonimiza o usa versiones enterprise con acuerdo de tratamiento. Para datos muy sensibles, modelos on-premise.',
    norm: 'Ley 1581 de 2012 · Habeas Data',
  },
  {
    title: 'Copiar citas de IA sin verificar',
    why: 'Los modelos inventan números de sentencia, páginas de libros, artículos de ley. Ha habido jueces y abogados sancionados por citar jurisprudencia inexistente generada por IA.',
    instead: 'Toda cita jurídica o bibliográfica debe verificarse contra la fuente original antes de firmar o publicar.',
    norm: 'Deber de diligencia · C.D.U.',
  },
  {
    title: 'Focalizar beneficiarios sin auditoría de sesgos',
    why: 'Modelos de scoring sobre población pueden perpetuar exclusión de mujeres, minorías étnicas, zonas rurales. Resultado: tutelas, acciones populares y pérdida de legitimidad.',
    instead: 'Evalúa sesgos por grupo protegido antes de desplegar. Documenta variables de entrada y resultados por subgrupo.',
    norm: 'Art. 13 C.P. · Igualdad',
  },
  {
    title: 'Chatbot sin aviso al ciudadano',
    why: 'Si el ciudadano cree que habla con un humano cuando en realidad habla con IA, hay vicio de consentimiento. Además, pierde la opción de pedir canal humano para casos sensibles.',
    instead: 'Aviso claro al inicio de la conversación: "Soy un asistente virtual, si necesitas atención humana escribe HUMANO".',
    norm: 'Principios OCDE · Transparencia',
  },
  {
    title: 'Vigilancia o reconocimiento facial sin orden judicial',
    why: 'Identificación biométrica masiva sin habilitación legal expresa viola el núcleo esencial del habeas data e intimidad. Riesgo de nulidad de todas las actuaciones derivadas.',
    instead: 'Sólo con ley habilitante específica, orden judicial y evaluación de proporcionalidad. Documentada EIPD obligatoria.',
    norm: 'Art. 15 C.P. · Intimidad',
  },
  {
    title: 'Contratar IA sin cláusulas de salida',
    why: 'Proveedor se queda con tus datos, tus embeddings y el know-how de tus prompts. Renovar a 3× el precio o perder la operación. Vendor lock-in en procesos misionales.',
    instead: 'Exige portabilidad de datos, propiedad intelectual de prompts/finetuning, SLA de continuidad y plan de salida con periodo de gracia.',
    norm: 'Buenas prácticas contractuales',
  },
  {
    title: 'Omitir la IA en el expediente administrativo',
    why: 'Si un acto administrativo se apoyó en IA y no se documenta qué sistema, con qué datos y quién validó, el expediente incumple el deber de motivación. Nulidad probable.',
    instead: 'En el expediente registra: herramienta usada, versión, datos de entrada, prompt, validación humana y responsable.',
    norm: 'Art. 42 Ley 1437/2011 · CPACA',
  },
]

const NOTEBOOK_FLOW = [
  {
    step: '01 · Fuentes',
    title: 'Sube hasta 300 fuentes',
    detail: 'PDF, Docs, URLs, transcripciones de YouTube, texto suelto. El notebook las indexa y desde ese momento el modelo responde SÓLO desde esas fuentes. Fuera del notebook no existe.',
    example: 'Pliego SECOP + 4 adendas · 3 ofertas técnicas · evaluación jurídica · 5 sentencias Consejo de Estado · 2 circulares SFC · informe Contraloría sectorial.',
    icon: FolderOpen,
    color: '#10B981',
    ring: 'ring-emerald-400/30',
  },
  {
    step: '02 · Guía de estudio',
    title: 'Resumen estructurado automático',
    detail: 'NotebookLM genera una guía con preguntas frecuentes, línea de tiempo, glosario de conceptos y los puntos clave cruzados entre todas las fuentes. Sin pedir nada adicional.',
    example: 'Para el expediente: timeline 2020–2026 con 14 hitos · glosario de 22 términos técnicos (CIIU, desagregación sectorial) · FAQ de 28 preguntas que podrían caer en auditoría.',
    icon: BookOpen,
    color: '#6366F1',
    ring: 'ring-indigo-400/30',
  },
  {
    step: '03 · Mapa mental',
    title: 'Visualización de relaciones',
    detail: 'Mapa interactivo que conecta conceptos, entidades y temas entre fuentes. Útil para descubrir contradicciones o riesgos que un solo documento no revela.',
    example: 'El mapa muestra que 4 de 5 ofertas citan al mismo subcontratista y que una cláusula del pliego contradice la Adenda 3 — hallazgo que no salió en la evaluación.',
    icon: Brain,
    color: '#8B5CF6',
    ring: 'ring-violet-400/30',
  },
  {
    step: '04 · Audio Overview',
    title: 'Podcast de 10–20 minutos',
    detail: 'Dos hosts de IA conversan sobre tus fuentes. Se interrumpen, introducen analogías, discuten escenarios. Perfecto para escuchar camino al comité o al Consejo de Gobierno.',
    example: 'Podcast de 12:34 con el dossier completo del Plan de Desarrollo: diagnóstico, metas en rezago, alertas fiscales, riesgos de contratación y recomendación para el Consejo.',
    icon: Headphones,
    color: '#F97316',
    ring: 'ring-orange-400/30',
  },
  {
    step: '05 · Video Overview',
    title: 'Explainer con diapositivas narradas',
    detail: 'Video de ~5 min con slides explicando lo central de las fuentes. Se comparte con concejales, veedurías o ciudadanía que no va a leer el informe completo.',
    example: 'Video explicativo de 4:48 con 15 slides: contexto del proyecto, alcance, beneficiarios, cronograma, presupuesto y cómo será el control social — listo para redes sociales.',
    icon: Video,
    color: '#EAB308',
    ring: 'ring-yellow-400/30',
  },
  {
    step: '06 · Chat con citas',
    title: 'Preguntas con cita clicable · cero alucinaciones',
    detail: 'Cada respuesta incluye números de cita [1][2] que abren el pasaje exacto de la fuente original. Si no está en las fuentes, dice "no aparece en las fuentes". 100% auditable.',
    example: '"¿Cuáles son las 3 alertas fiscales del municipio?" → respuesta con cita exacta a página 47 del informe Contraloría y al anexo 3 del boletín DANE.',
    icon: MessageSquare,
    color: '#EC4899',
    ring: 'ring-pink-400/30',
  },
]

const PODCAST_PUBLICO = {
  title: 'Dossier ejecutivo · Comité Primario PDT 2024–2027',
  subtitle: 'Generado por NotebookLM · 14 fuentes · hosts sintéticos Ana + Diego',
  totalSec: 754,
  sources: [
    { n: 'Plan de Desarrollo Territorial (PDT)', type: 'PDF', pages: 248 },
    { n: 'Ejecución presupuestal SIIF · 2024', type: 'XLSX', pages: 34 },
    { n: 'Informe Contraloría Sectorial 2024', type: 'PDF', pages: 87 },
    { n: 'Terridata · ficha municipal', type: 'PDF', pages: 22 },
    { n: 'Boletín DANE · ECV 2024', type: 'PDF', pages: 56 },
    { n: 'Ficha SINERGIA · metas PDT', type: 'XLSX', pages: 18 },
    { n: 'CONPES 4144 · Política Nal. IA', type: 'PDF', pages: 164 },
    { n: 'Informe MECI · control interno', type: 'PDF', pages: 42 },
    { n: 'SISBEN IV · cobertura municipal', type: 'XLSX', pages: 12 },
    { n: 'Auto Consejo de Estado · tutela', type: 'PDF', pages: 18 },
    { n: 'Matriz de riesgos DAFP', type: 'XLSX', pages: 9 },
    { n: 'Acta Consejo Municipal · feb 2026', type: 'PDF', pages: 14 },
    { n: 'Presupuesto 2026 aprobado', type: 'PDF', pages: 76 },
    { n: 'Rendición cuentas vigencia 2024', type: 'PDF', pages: 52 },
  ],
  chapters: [
    { start: 0,   label: 'Diagnóstico territorial',        gist: 'Pobreza multidimensional 8 pp sobre el promedio departamental — brecha se amplía en zona rural' },
    { start: 134, label: 'Cumplimiento de metas PDT',      gist: '72% metas en verde · 18% en rezago · 10% sin arrancar — sectores críticos: salud rural y vivienda' },
    { start: 348, label: 'Alertas fiscales',               gist: 'Gastos de personal +12% vs. PAC · dos transferencias de la Nación represadas desde Q3 2025' },
    { start: 502, label: 'Riesgos de contratación',        gist: '3 contratos con observaciones de la Contraloría en ejecución · uno con tutela en Consejo de Estado' },
    { start: 615, label: 'Recomendación al Consejo',       gist: 'Reformular 5 metas · activar 2 planes de contingencia · convocar mesa fiscal con MinHacienda' },
  ],
}

const NOTEBOOKLM_LABS = [
  {
    icon: Scale,
    tint: 'from-primary/80 to-primary',
    badge: 'Justicia',
    title: 'Línea jurisprudencial en una mañana',
    files: '12 sentencias Corte Constitucional + Consejo de Estado (PDF)',
    prompt: 'Identifica la ratio decidendi de cada sentencia, construye una línea jurisprudencial cronológica y marca cuándo cambia la postura.',
    output: 'Tabla comparada + citas trazables + Audio Overview de 10 min para escuchar camino al trabajo.',
  },
  {
    icon: FileSearch,
    tint: 'from-warm/80 to-warm',
    badge: 'SECOP',
    title: 'Expediente de licitación bajo lupa',
    files: 'Pliego + adendas (2–6) + ofertas (PDF) + acta de evaluación',
    prompt: 'Señala contradicciones entre pliego y adendas, ítems donde la oferta ganadora difiere del presupuesto oficial >15%, y cláusulas que concentran el riesgo en la entidad.',
    output: 'Lista priorizada de observaciones con referencia exacta a página y párrafo.',
  },
  {
    icon: BookOpen,
    tint: 'from-accent/80 to-accent',
    badge: 'Política pública',
    title: 'CONPES + Plan de Desarrollo en diálogo',
    files: 'CONPES sectorial + PND/PDT + informe de seguimiento SINERGIA',
    prompt: 'Cruza los objetivos del CONPES con las metas del Plan y marca los indicadores sin línea base ni responsable claro.',
    output: 'Matriz de alineación + gaps de formulación para ajustar antes del Consejo de Gobierno.',
  },
  {
    icon: Mic,
    tint: 'from-emerald-500/80 to-emerald-600',
    badge: 'Audiencia pública',
    title: 'Audiencia de 8 horas resumida',
    files: 'Grabación de audiencia pública (MP3/YouTube) + orden del día',
    prompt: 'Lista intervenciones por actor, compromisos asumidos por la entidad con fecha y responsable, y desacuerdos sin resolver.',
    output: 'Acta ejecutiva + plan de seguimiento listo para publicar en transparencia.',
  },
  {
    icon: MessageSquare,
    tint: 'from-rose-500/80 to-rose-600',
    badge: 'PQRSD',
    title: 'Chatbot de trámite sin alucinaciones',
    files: 'TUPA del trámite + decretos reglamentarios + manual operativo',
    prompt: 'Responde sólo con lo que aparece en las fuentes. Si no hay respuesta, di "consulte con su asesor". Cada respuesta cita el documento y la página.',
    output: 'Asistente consultable que baja 40–50% las preguntas repetitivas en ventanilla.',
  },
  {
    icon: BarChart3,
    tint: 'from-violet-500/80 to-violet-600',
    badge: 'Rendición de cuentas',
    title: 'Informe de gestión digerible para la ciudadanía',
    files: 'Informe de gestión + ejecución presupuestal + metas del Plan',
    prompt: 'Escribe una versión ciudadana del informe: máximo 800 palabras, lenguaje claro, 5 logros concretos con cifra, 3 temas pendientes.',
    output: 'Pieza publicable en el portal de transparencia + Audio Overview bilingüe.',
  },
  {
    icon: Map,
    tint: 'from-indigo-500/80 to-indigo-600',
    badge: 'Territorio',
    title: 'Diagnóstico municipal en una tarde',
    files: 'Fichas Terridata + boletines DANE + ECV + estudios regionales',
    prompt: 'Perfila el municipio X: demografía, pobreza multidimensional, coberturas clave, brechas frente al promedio departamental y top 3 prioridades de inversión.',
    output: 'Diagnóstico de 6 páginas con fuentes citadas y mapa de indicadores críticos.',
  },
  {
    icon: Gavel,
    tint: 'from-slate-600/80 to-slate-700',
    badge: 'Tutela',
    title: 'Expediente de tutela resumido',
    files: 'Demanda + contestación + pruebas + sentencias de referencia',
    prompt: 'Resume los hechos probados, los argumentos de cada parte, y los precedentes aplicables. Identifica vacíos probatorios.',
    output: 'Memorial de estudio para el despacho en vez de 4 días de lectura.',
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

const REFLECTIONS = [
  {
    icon: Compass,
    kicker: '01',
    title: 'La IA no reemplaza criterio — lo amplifica',
    body: 'Un servidor con juicio + IA rinde como tres sin ella. Sin juicio, produce más rápido lo mismo mal. El cuello de botella sigue siendo el criterio humano, no la velocidad del modelo.',
  },
  {
    icon: FileCheck,
    kicker: '02',
    title: 'Si no entra al expediente, no existió',
    body: 'Todo lo que la IA produzca debe documentarse: herramienta, versión, prompt, datos de entrada, validación humana, responsable. La Sentencia T-323/2024 no es sugerencia, es obligación.',
  },
  {
    icon: Target,
    kicker: '03',
    title: 'Empieza por lo que duele cada lunes',
    body: 'No arranques por el caso más ambicioso — arranca por la tarea repetitiva que consume 40% del tiempo del equipo. El ROI se mide en horas recuperadas la primera semana, no en titulares.',
  },
  {
    icon: Lock,
    kicker: '04',
    title: 'Datos sensibles, puertas cerradas',
    body: 'Cédulas, historias clínicas, SISBEN y declaraciones no salen por IA pública gratuita — es transferencia internacional sin autorización. Anonimiza, o ve a versiones enterprise con acuerdo de tratamiento.',
  },
  {
    icon: Handshake,
    kicker: '05',
    title: 'Gobernanza antes que pilotos',
    body: 'Sin política, cada piloto es un riesgo latente. Con 2 páginas claras (qué datos no salen, quién firma, qué herramientas permitidas), el equipo tiene permiso para experimentar con red de seguridad.',
  },
  {
    icon: BarChart3,
    kicker: '06',
    title: 'Lo que no se mide no convence',
    body: 'Antes de arrancar toma línea base: horas, errores, tiempos de respuesta. Sin métricas, el próximo Consejo pedirá cerrar los pilotos. Con métricas en mano, pedirá escalarlos.',
  },
  {
    icon: Lightbulb,
    kicker: '07',
    title: 'El prompt más corto que funcione',
    body: 'Los modelos ya razonan por cuenta propia. No les expliques cómo pensar — diles qué producto esperas (memorando de 1 página, tabla comparativa, boletín ciudadano de 400 palabras) y con qué materia prima.',
  },
  {
    icon: Handshake,
    kicker: '08',
    title: 'IA en público: avisa al ciudadano',
    body: 'Si un chatbot atiende PQRSD, el ciudadano debe saberlo al iniciar y tener salida a canal humano. Transparencia no es moda — es condición de validez del trámite.',
  },
]

const FIRST_WEEK = [
  {
    day: 'Día 1',
    label: 'Lunes',
    icon: ClipboardList,
    color: 'text-primary',
    bg: 'bg-primary/10',
    ring: 'ring-primary/20',
    title: 'Inventario honesto',
    tasks: [
      'Lista 5 tareas repetitivas que consumen más tiempo del equipo esta semana',
      'Clasifica cada una: ¿contiene datos personales?, ¿contiene información reservada?, ¿puede ir a IA pública?',
      'Escoge UNA: la de menor riesgo y mayor volumen',
    ],
    deliverable: 'Una hoja con 5 tareas y la ganadora marcada en amarillo',
    tool: 'chatgpt',
  },
  {
    day: 'Día 2',
    label: 'Martes',
    icon: FolderOpen,
    color: 'text-accent',
    bg: 'bg-accent/10',
    ring: 'ring-accent/20',
    title: 'Reúne tu corpus',
    tasks: [
      'Junta las 8–15 fuentes necesarias para ese caso (normativa, manuales, plantillas, ejemplos pasados)',
      'Depura: quita datos personales identificables si no son indispensables',
      'Verifica versiones: sólo lo vigente, no decretos derogados',
    ],
    deliverable: 'Carpeta con los documentos base listos para cargar',
    tool: 'notebooklm',
  },
  {
    day: 'Día 3',
    label: 'Miércoles',
    icon: Upload,
    color: 'text-warm',
    bg: 'bg-warm/10',
    ring: 'ring-warm/20',
    title: 'Carga y explora',
    tasks: [
      'Sube las fuentes a NotebookLM y deja que genere la guía de estudio automática',
      'Haz 10 preguntas de prueba: mitad fáciles (verificación), mitad difíciles (frontera)',
      'Registra cuándo alucina, cuándo dice "no aparece", cuándo cita bien',
    ],
    deliverable: 'Bitácora con 10 preguntas + calidad de respuesta (1 a 5)',
    tool: 'notebooklm',
  },
  {
    day: 'Día 4',
    label: 'Jueves',
    icon: Wrench,
    color: 'text-secondary',
    bg: 'bg-secondary/10',
    ring: 'ring-secondary/20',
    title: 'Construye tu prompt-producto',
    tasks: [
      'Define el producto esperado: tipo de entregable, extensión, estructura, destinatario',
      'Escribe el prompt en el Prompt Lab (CORTE-F): claridad sobre rol + producto',
      'Corre el prompt 3 veces con variaciones de inputs para ver la consistencia',
    ],
    deliverable: 'Plantilla de prompt versionada con 3 salidas comparadas',
    tool: 'claude',
  },
  {
    day: 'Día 5',
    label: 'Viernes',
    icon: ShieldCheck,
    color: 'text-emerald-700',
    bg: 'bg-emerald-100',
    ring: 'ring-emerald-200',
    title: 'Valida con humano + mide',
    tasks: [
      'Revisa cada salida con un experto del dominio (jurídico, técnico, territorial)',
      'Cronometra: cuánto tomaba antes, cuánto toma ahora, cuántos errores hay',
      'Documenta limitaciones detectadas (alucinaciones, tono, vacíos)',
    ],
    deliverable: 'Ficha de retrospectiva con tiempos, errores y decisión ir / no-ir',
    tool: 'julius',
  },
  {
    day: 'Día 6–7',
    label: 'Fin de semana',
    icon: BookMarked,
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    ring: 'ring-violet-200',
    title: 'Reposa, escribe, comparte',
    tasks: [
      'Redacta el memorando interno con aprendizajes (1 página): qué funcionó, qué no, riesgos',
      'Prepara la propuesta de escalamiento para la semana siguiente',
      'Comparte con al menos 2 pares institucionales — lo que funciona se replica',
    ],
    deliverable: 'Memorando + propuesta de escalamiento para el Comité',
    tool: 'claude',
  },
]

const QUICK_WINS = [
  {
    icon: MessageSquare,
    time: '20 min',
    title: 'Resumir un comité de 2 horas',
    how: 'Grabas Teams, transcribes con Otter o Whisper, pegas en Claude con el prompt "acta oficial con acuerdos, responsables y fechas".',
    impact: 'De 2 h a 15 min en acta lista para firmar',
  },
  {
    icon: Users,
    time: '30 min',
    title: 'Triage de 50 PQRSD del buzón',
    how: 'Exporta los correos a una hoja, pega en ChatGPT y pide clasificar por tipo, urgencia 1–5 y dependencia responsable.',
    impact: '80% del triage automatizado con trazabilidad',
  },
  {
    icon: BookOpen,
    time: '45 min',
    title: 'Lenguaje claro de un trámite GOV.CO',
    how: 'Toma el texto legal vigente, pídele a Claude una versión con frases ≤ 7 palabras, voz activa y sin tecnicismos.',
    impact: 'Menos preguntas en ventanilla; mejor NPS ciudadano',
  },
  {
    icon: FileSearch,
    time: '1 hora',
    title: 'Comparar 3 ofertas de un pliego',
    how: 'Sube el pliego + ofertas a Humata, pide tabla lado a lado de cumplimiento técnico, precio y experiencia.',
    impact: 'Revisión jurídica empieza con hallazgos priorizados',
  },
  {
    icon: BarChart3,
    time: '1 hora',
    title: 'Cruce de brechas por municipio',
    how: 'Descarga 2 CSV de datos.gov.co, súbelos a Julius y pide merge por código DANE + top 20 municipios con mayor brecha.',
    impact: 'Mapa territorial sin saber SQL avanzado',
  },
  {
    icon: Megaphone,
    time: '30 min',
    title: 'Carrusel de 8 diapositivas del boletín mensual',
    how: 'Pega el boletín largo en ChatGPT con prompt "8 slides, 20 palabras máximo por slide, CTA final con canal oficial".',
    impact: 'Pieza lista para Canva en 30 min',
  },
  {
    icon: Gavel,
    time: '1 hora',
    title: 'Línea jurisprudencial sobre un tema',
    how: 'Sube 8 sentencias a NotebookLM y pide ratio decidendi + línea cronológica con cambios de postura.',
    impact: 'Exposición de motivos robusta en vez de 2 días leyendo',
  },
  {
    icon: ShieldCheck,
    time: '1.5 horas',
    title: 'Detectar conflictos de interés',
    how: 'Cruza listado de contratistas (NIT + representantes) con nómina (cédula + cargo) en Julius: apellidos, direcciones, vínculos.',
    impact: 'Prevención antes de que escale a control externo',
  },
  {
    icon: Mic,
    time: '1 hora',
    title: 'Podcast del dossier del Consejo',
    how: '14 documentos en NotebookLM → Audio Overview de 12 min para escuchar camino al comité.',
    impact: 'El alcalde llega informado sin leer 600 páginas',
  },
  {
    icon: Globe2,
    time: '45 min',
    title: 'Benchmark OCDE sobre un tema',
    how: 'Usa Perplexity: "qué países OCDE aplicaron política sobre X entre 2020-2026, resultados documentados, lecciones".',
    impact: 'Nota técnica con evidencia internacional trazable',
  },
  {
    icon: Calendar,
    time: '20 min',
    title: 'Priorizar los 30 correos del día',
    how: 'Pega asuntos + primer párrafo en Claude: urgente hoy, importante esta semana, delegar a X, archivar.',
    impact: '2 h de revisión → 20 min con justificación',
  },
  {
    icon: Video,
    time: '1.5 horas',
    title: 'Video explicativo de un trámite',
    how: 'Guion en Claude (300 palabras), voz en ElevenLabs, avatar en HeyGen, subtítulos en CapCut.',
    impact: 'Campaña inclusiva al 10% del costo tradicional',
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

function fmt(sec) {
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default function SectorPublico() {
  const [activeStep, setActiveStep] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [elapsed, setElapsed] = useState(134)
  const [promptRole, setPromptRole] = useState('directivo')
  const [copiedId, setCopiedId] = useState(null)
  const [answers, setAnswers] = useState({})
  const [qIndex, setQIndex] = useState(-1)
  const totalPoints = MATURITY_QUESTIONS.reduce((sum, q) => sum + (answers[q.id] ?? 0), 0)
  const maturityBand = MATURITY_BANDS.find((b) => totalPoints >= b.min && totalPoints <= b.max) || MATURITY_BANDS[0]
  const testComplete = qIndex >= MATURITY_QUESTIONS.length

  function copyPrompt(body, id) {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(body).catch(() => {})
    }
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 1400)
  }

  function answer(points) {
    const q = MATURITY_QUESTIONS[qIndex]
    setAnswers((a) => ({ ...a, [q.id]: points }))
    setQIndex((i) => i + 1)
  }

  function resetTest() {
    setAnswers({})
    setQIndex(-1)
  }

  const activePromptRole = PROMPTS_LIBRARY.find((r) => r.roleId === promptRole) || PROMPTS_LIBRARY[0]
  const currentChapter = (() => {
    const idx = PODCAST_PUBLICO.chapters.findIndex((c, i) => {
      const next = PODCAST_PUBLICO.chapters[i + 1]?.start ?? PODCAST_PUBLICO.totalSec + 1
      return elapsed >= c.start && elapsed < next
    })
    return idx < 0 ? 0 : idx
  })()

  useEffect(() => {
    if (!playing) return
    const iv = setInterval(() => {
      setElapsed((e) => (e + 1 >= PODCAST_PUBLICO.totalSec ? 0 : e + 1))
    }, 1000)
    return () => clearInterval(iv)
  }, [playing])

  const active = NOTEBOOK_FLOW[activeStep]
  const ActiveIcon = active.icon

  return (
    <div className="bg-bg">
      {/* Hero */}
      <section className="relative px-4 hero-gradient noise-overlay overflow-x-clip py-16 md:py-24">
        <div className="absolute inset-0 dot-pattern pointer-events-none" />
        {/* Colombia flag colour accents, very soft */}
        <div className="absolute -top-10 -left-32 w-80 h-80 bg-yellow-300/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-32 -right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-warm/8 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary/8 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-8 border border-primary/10 shadow-sm">
            <Landmark className="w-3.5 h-3.5" />
            Capítulo especial · abril 2026
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-text leading-[1.05] tracking-tight mb-6">
            IA para el <span className="text-gradient-primary">sector público</span>
            <br className="hidden sm:block" />
            <span className="text-text-light font-bold"> colombiano</span>
          </h1>
          <p className="text-text-light text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-6">
            Guía práctica por <span className="text-text font-semibold">rol misional</span>: buscar información,
            contratar, auditar, hacer dashboards, revisar contratos, comunicar. Con ejemplos que ya operan
            en el Estado colombiano y <span className="text-text font-semibold">cifras verificadas a abril 2026</span>.
          </p>

          {/* Byline */}
          <div className="flex items-center justify-center gap-2 mb-10 text-sm">
            <span className="text-text-lighter">Por</span>
            <a
              href="https://sjimenezlon.co/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-primary font-semibold no-underline hover:text-primary/80"
            >
              Santiago Jiménez Londoño
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Metric strip — el estado de la IA pública */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
            {[
              { v: '620K+', l: 'tutelas/año', s: 'PretorIA' },
              { v: '3m→14d', l: 'auditoría cuentas', s: 'ADRES SIA' },
              { v: '17→97%', l: 'precisión PQRSD', s: 'Bogotá Te Escucha' },
              { v: '$479 mil M', l: 'COP · CONPES 4144', s: 'Política Nal. IA' },
            ].map((m, i) => (
              <div
                key={i}
                className="bg-surface/80 backdrop-blur-sm border border-border rounded-2xl px-3 py-4 hover:border-primary/30 hover:shadow-md transition-all duration-300"
              >
                <div className="font-display font-extrabold text-text text-xl sm:text-2xl tracking-tight leading-none">{m.v}</div>
                <div className="text-[11px] text-text-lighter mt-1 font-medium">{m.l}</div>
                <div className="text-[10px] text-primary mt-0.5 font-semibold">{m.s}</div>
              </div>
            ))}
          </div>

          {/* Quick entry — rutas de uso */}
          <div className="mt-10 flex flex-wrap gap-2 justify-center">
            <a
              href="#reflexiones"
              className="inline-flex items-center gap-2 bg-surface border border-border text-text px-5 py-2.5 rounded-xl font-semibold no-underline hover:border-accent/40 hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-sm"
            >
              <Compass className="w-4 h-4 text-accent" />
              Reflexiones
            </a>
            <a
              href="#roles"
              className="inline-flex items-center gap-2 bg-text text-white px-5 py-2.5 rounded-xl font-semibold no-underline hover:bg-text/90 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-sm"
            >
              <Users className="w-4 h-4" />
              Tu rol
            </a>
            <a
              href="#primera-semana"
              className="inline-flex items-center gap-2 bg-surface border border-border text-text px-5 py-2.5 rounded-xl font-semibold no-underline hover:border-warm/40 hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-sm"
            >
              <Hammer className="w-4 h-4 text-warm" />
              Primera semana
            </a>
            <a
              href="#quick-wins"
              className="inline-flex items-center gap-2 bg-surface border border-border text-text px-5 py-2.5 rounded-xl font-semibold no-underline hover:border-primary/40 hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-sm"
            >
              <Zap className="w-4 h-4 text-primary" />
              Quick wins
            </a>
            <a
              href="#notebook-lab"
              className="inline-flex items-center gap-2 bg-surface border border-border text-text px-5 py-2.5 rounded-xl font-semibold no-underline hover:border-primary/40 hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-sm"
            >
              <Sparkles className="w-4 h-4 text-warm" />
              Lab NotebookLM
            </a>
            <a
              href="#prompts"
              className="inline-flex items-center gap-2 bg-surface border border-border text-text px-5 py-2.5 rounded-xl font-semibold no-underline hover:border-primary/40 hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-sm"
            >
              <Copy className="w-4 h-4 text-primary" />
              Prompts listos
            </a>
            <a
              href="#madurez"
              className="inline-flex items-center gap-2 bg-surface border border-border text-text px-5 py-2.5 rounded-xl font-semibold no-underline hover:border-primary/40 hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-sm"
            >
              <Award className="w-4 h-4 text-accent" />
              Test madurez
            </a>
            <a
              href="#red-flags"
              className="inline-flex items-center gap-2 bg-surface border border-rose-200 text-rose-700 px-5 py-2.5 rounded-xl font-semibold no-underline hover:bg-rose-50 hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-sm"
            >
              <Ban className="w-4 h-4" />
              Red flags
            </a>
          </div>
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

      {/* ═══════════ REFLEXIONES ═══════════ */}
      <section id="reflexiones" className="max-w-6xl mx-auto px-4 pt-4 pb-12 scroll-mt-20">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-semibold mb-3 border border-accent/15">
            <Compass className="w-3 h-3" />
            Mindset antes de la tecnología
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-text tracking-tight mb-2">
            Ocho reflexiones antes de tocar una sola IA
          </h2>
          <p className="text-text-light text-sm max-w-2xl mx-auto">
            La adopción de IA pública fracasa cuando se parte de la herramienta, no de la pregunta. Estas son las ideas
            que conviene digerir antes de abrir la primera cuenta.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {REFLECTIONS.map((r) => {
            const RIcon = r.icon
            return (
              <div
                key={r.kicker}
                className="group relative bg-surface rounded-2xl border border-border p-5 hover:shadow-md hover:-translate-y-0.5 hover:border-accent/30 transition-all duration-300 flex flex-col overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-accent/5 rounded-full blur-xl group-hover:bg-accent/10 transition-colors" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center ring-4 ring-accent/5">
                      <RIcon className="w-5 h-5 text-accent" />
                    </div>
                    <span className="font-display font-extrabold text-text-lighter/40 text-3xl tracking-tighter leading-none">
                      {r.kicker}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-text text-base leading-tight tracking-tight mb-2">
                    {r.title}
                  </h3>
                  <p className="text-xs text-text-light leading-relaxed">{r.body}</p>
                </div>
              </div>
            )
          })}
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

      {/* Roles misionales */}
      <section id="roles" className="relative max-w-6xl mx-auto px-4 py-14 scroll-mt-20 overflow-hidden">
        {/* Decorative background */}
        <div className="absolute top-10 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-0 w-72 h-72 bg-warm/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-text text-white px-4 py-1.5 rounded-full text-xs font-semibold mb-4 shadow-md">
            <Briefcase className="w-3 h-3" />
            Tu rol en el Estado
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-text tracking-tight mb-3 leading-tight">
            ¿Qué hago, qué necesito y con qué IA lo resuelvo?
          </h2>
          <p className="text-text-light text-base max-w-2xl mx-auto">
            Ocho roles que hoy existen en cualquier entidad colombiana — del directivo que firma decisiones al
            servidor que recibe al ciudadano en ventanilla. Cada tarjeta trae <span className="font-semibold text-text">tareas típicas</span> y las
            <span className="font-semibold text-text"> 3 herramientas</span> que más rinden para ese rol.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ROLES.map((role, idx) => {
            const RIcon = role.icon
            return (
              <div
                key={role.id}
                className={`group relative bg-surface rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col`}
              >
                {/* Gradient top */}
                <div className={`absolute inset-0 bg-gradient-to-br ${role.grad} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
                <div className={`h-1.5 ${role.bg}`} />

                <div className="relative p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 ${role.bg} rounded-xl flex items-center justify-center shrink-0 ring-4 ${role.ring} ring-offset-0 group-hover:scale-110 transition-transform duration-300`}>
                      <RIcon className={`w-6 h-6 ${role.accent}`} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className={`text-[10px] font-bold uppercase tracking-[0.12em] ${role.accent} font-mono`}>
                        {String(idx + 1).padStart(2, '0')} / 08
                      </div>
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-text text-base leading-tight tracking-tight mb-1">
                    {role.title}
                  </h3>
                  <p className="text-xs text-text-lighter leading-snug mb-4 italic">
                    {role.subtitle}
                  </p>

                  <ul className="space-y-1.5 mb-4 flex-1">
                    {role.tasks.map((t, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-text-light leading-snug">
                        <span className={`${role.accent} font-bold mt-0.5 shrink-0`}>›</span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-3 border-t border-border/60">
                    <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-text-lighter mb-2">
                      Stack recomendado
                    </div>
                    <div className="space-y-1.5">
                      {role.tools.map((tid) => (
                        <ToolMini key={tid} id={tid} />
                      ))}
                    </div>
                  </div>

                  {role.anchor && (
                    <a
                      href={`#${role.anchor}`}
                      className={`mt-4 inline-flex items-center justify-center gap-1.5 text-xs font-semibold ${role.accent} hover:gap-2 transition-all no-underline`}
                    >
                      Ver playbook completo
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Quick nav */}
      <section className="max-w-5xl mx-auto px-4 py-6">
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-text-lighter uppercase tracking-[0.12em]">
            <Layers className="w-3 h-3" />
            7 dominios de trabajo · salto rápido
          </div>
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-surface border border-border rounded-full text-sm text-text-light no-underline hover:border-primary/40 hover:text-primary hover:shadow-md transition-all"
            >
              <span className="text-xs font-bold text-primary">{s.title.split('.')[0]}.</span>
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

      {/* Laboratorio NotebookLM — casos prácticos */}
      <section
        id="notebook-lab"
        className="relative overflow-hidden scroll-mt-20 py-16"
        style={{ background: 'linear-gradient(135deg, #0b1320 0%, #141d33 50%, #1a1530 100%)' }}
      >
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 20%, #ffffff 1px, transparent 1px), radial-gradient(circle at 80% 70%, #ffffff 1px, transparent 1px)',
            backgroundSize: '48px 48px, 64px 64px',
          }}
        />
        <div className="absolute -top-32 -left-24 w-96 h-96 bg-primary/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-24 w-96 h-96 bg-warm/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/12 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-semibold mb-5 border border-white/20">
              <Sparkles className="w-3 h-3" />
              Laboratorio NotebookLM · 100% gratis
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4 leading-[1.05]">
              Ocho experimentos que <span className="text-gradient-gold">cambian tu semana</span>
            </h2>
            <p className="text-white/70 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
              NotebookLM de Google es la mejor puerta de entrada a la IA en lo público: subes tus documentos,
              te responde <span className="text-white font-semibold">sólo con citas verificables</span> y genera
              Audio Overviews conversacionales. <span className="text-white font-semibold">Cero alucinaciones,
              cero costo, máxima trazabilidad.</span>
            </p>

            {/* Why NotebookLM strip */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
              {[
                { icon: Upload, label: 'Sube hasta 300 fuentes', sub: 'PDF · docs · audio · YouTube · URL' },
                { icon: Quote, label: 'Responde con citas', sub: 'Cada frase enlaza al documento' },
                { icon: Headphones, label: 'Audio Overview', sub: 'Podcast de 2 hosts automático' },
                { icon: Lock, label: 'Datos no se usan', sub: 'Google no entrena con tus fuentes' },
              ].map((f, i) => {
                const FIcon = f.icon
                return (
                  <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 text-left hover:bg-white/10 transition-colors">
                    <FIcon className="w-4 h-4 text-warm mb-2" />
                    <div className="text-white text-xs font-bold leading-tight">{f.label}</div>
                    <div className="text-white/60 text-[10px] mt-0.5 leading-snug">{f.sub}</div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* ═══ Subtítulo: Cero alucinaciones ═══ */}
          <div className="relative max-w-4xl mx-auto mb-12">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.18em] text-warm mb-4">
                <ShieldAlert className="w-3.5 h-3.5" />
                NotebookLM · Deep Dive
              </div>
              <h3 className="text-3xl md:text-5xl font-extrabold text-white leading-[1.05] tracking-tight mb-5">
                Cero alucinaciones: el asistente que{' '}
                <span className="text-gradient-gold">sólo habla de tus fuentes</span>
              </h3>
              <p className="text-white/70 text-base md:text-lg leading-relaxed">
                Subes documentos, NotebookLM los indexa, y desde ese momento <em className="text-white not-italic font-semibold">sólo responde desde lo que tú le diste</em>. Cada respuesta con citas clicables. Ideal para contratación, control interno, política pública y rendición de cuentas — donde una alucinación cuesta caro.
              </p>
            </div>
          </div>

          {/* ═══ 6 STEP CARDS interactive ═══ */}
          <div className="max-w-6xl mx-auto mb-6">
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {NOTEBOOK_FLOW.map((f, i) => {
                const FIcon = f.icon
                const isActive = activeStep === i
                return (
                  <button
                    key={f.step}
                    type="button"
                    onClick={() => setActiveStep(i)}
                    className={`rounded-xl px-2 py-4 border transition-all text-center ${isActive ? 'border-white/30 shadow-xl' : 'border-white/8 hover:border-white/20'}`}
                    style={{
                      background: isActive ? `${f.color}22` : 'rgba(255,255,255,0.03)',
                      borderColor: isActive ? `${f.color}90` : undefined,
                    }}
                  >
                    <div className="w-7 h-7 mx-auto rounded-lg flex items-center justify-center" style={{ background: isActive ? `${f.color}40` : 'rgba(255,255,255,0.06)' }}>
                      <FIcon className="w-4 h-4" style={{ color: f.color }} />
                    </div>
                    <div className="font-mono text-[9px] uppercase tracking-[0.14em] mt-2 leading-tight" style={{ color: isActive ? f.color : 'rgba(255,255,255,0.5)' }}>
                      {f.step}
                    </div>
                  </button>
                )
              })}
            </div>

            <div
              className="mt-4 rounded-2xl overflow-hidden border backdrop-blur-sm"
              style={{
                background: 'rgba(13, 18, 41, 0.75)',
                borderColor: `${active.color}40`,
              }}
            >
              <div
                className="px-6 py-5 border-b border-white/5 flex items-center gap-4"
                style={{ background: `linear-gradient(90deg, ${active.color}20, transparent)` }}
              >
                <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ background: `${active.color}25` }}>
                  <ActiveIcon className="w-7 h-7" style={{ color: active.color }} />
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: active.color }}>
                    {active.step}
                  </div>
                  <h4 className="text-xl md:text-2xl font-bold text-white tracking-tight">{active.title}</h4>
                </div>
              </div>
              <div className="p-6 md:p-8 grid md:grid-cols-2 gap-6">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/50 mb-2">Qué hace</div>
                  <p className="text-white/90 leading-relaxed text-sm">{active.detail}</p>
                </div>
                <div className="bg-white/[0.04] rounded-xl p-4 border border-white/10">
                  <div className="font-mono text-[10px] uppercase tracking-[0.14em] mb-2" style={{ color: active.color }}>
                    Ejemplo · Sector público
                  </div>
                  <p className="text-sm text-white italic leading-relaxed">{active.example}</p>
                </div>
              </div>
            </div>
          </div>

          {/* ═══ MOCK NotebookLM UI con citas ═══ */}
          <div className="max-w-6xl mx-auto mt-14">
            <div className="text-center mb-5">
              <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.14em] text-accent">
                <FileCheck className="w-3.5 h-3.5" />
                Cómo se ve un notebook real
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 overflow-hidden bg-[#fafafa] shadow-[0_30px_80px_rgba(99,102,241,0.25)]">
              {/* Header tipo Google */}
              <div className="flex items-center justify-between px-5 py-3 bg-white border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">Comité Primario · PDT 2024–2027</div>
                    <div className="text-[11px] text-gray-500">14 fuentes · última edición 20 abr 2026 · compartido con 6 personas</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-orange-50 text-orange-600 text-[10px] font-medium border border-orange-200">
                    <Mic className="w-3 h-3" /> Generate Audio
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-gray-100 text-gray-600 text-[10px] font-medium">Share</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[240px_1fr_220px] min-h-[440px] text-[12px]">
                {/* Sources panel */}
                <div className="bg-white border-r border-gray-200 p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900 text-[12px]">Fuentes (14)</span>
                    <span className="text-[10px] text-blue-600 font-medium">+ Añadir</span>
                  </div>
                  <div className="space-y-1">
                    {[
                      { n: '1', name: 'PDT 2024–2027.pdf', c: '#10B981' },
                      { n: '2', name: 'Ejecución SIIF 2024.xlsx', c: '#6366F1' },
                      { n: '3', name: 'Informe Contraloría 2024', c: '#F97316' },
                      { n: '4', name: 'Terridata · ficha municipal', c: '#3B82F6' },
                      { n: '5', name: 'DANE · ECV 2024', c: '#EAB308' },
                      { n: '6', name: 'SINERGIA · metas PDT', c: '#8B5CF6' },
                      { n: '7', name: 'CONPES 4144 · IA', c: '#EC4899' },
                    ].map((s) => (
                      <div key={s.n} className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-gray-50">
                        <div className="w-5 h-5 rounded flex items-center justify-center font-mono text-[10px] font-bold text-white shrink-0" style={{ background: s.c }}>{s.n}</div>
                        <span className="text-[11px] text-gray-800 truncate">{s.name}</span>
                      </div>
                    ))}
                    <div className="text-[10px] text-gray-400 px-2 italic pt-1">+7 fuentes más…</div>
                  </div>
                </div>

                {/* Chat con citas */}
                <div className="p-5 bg-[#fafafa]">
                  <div className="space-y-4">
                    <div className="flex justify-end">
                      <div className="bg-blue-100 text-gray-900 rounded-2xl rounded-tr-sm px-3.5 py-2 text-[12px] max-w-[80%]">
                        ¿Cuáles son las 3 alertas fiscales más críticas del municipio según las fuentes?
                      </div>
                    </div>
                    <div className="text-[12px] text-gray-900 leading-relaxed">
                      <div className="font-semibold text-gray-900 mb-2">Según las fuentes, las 3 alertas fiscales prioritarias son:</div>
                      <p className="mb-2.5">
                        <span className="font-semibold">1. Gastos de personal por encima del PAC</span> — crecieron 12% sobre el plan anualizado, presionando la regla fiscal territorial
                        <sup className="ml-1 inline-flex gap-0.5">
                          <span className="inline-flex items-center justify-center w-4 h-4 rounded bg-[#F97316] text-white text-[9px] font-mono font-bold">3</span>
                          <span className="inline-flex items-center justify-center w-4 h-4 rounded bg-[#6366F1] text-white text-[9px] font-mono font-bold">2</span>
                        </sup>
                      </p>
                      <p className="mb-2.5">
                        <span className="font-semibold">2. Transferencias nacionales represadas</span> — dos giros de SGP pendientes desde Q3 2025 afectan liquidez de la red hospitalaria
                        <sup className="ml-1 inline-flex gap-0.5">
                          <span className="inline-flex items-center justify-center w-4 h-4 rounded bg-[#6366F1] text-white text-[9px] font-mono font-bold">2</span>
                          <span className="inline-flex items-center justify-center w-4 h-4 rounded bg-[#EAB308] text-white text-[9px] font-mono font-bold">5</span>
                        </sup>
                      </p>
                      <p>
                        <span className="font-semibold">3. Contratos con observaciones en ejecución</span> — 3 contratos con hallazgos en firme, uno con tutela admitida por el Consejo de Estado
                        <sup className="ml-1 inline-flex gap-0.5">
                          <span className="inline-flex items-center justify-center w-4 h-4 rounded bg-[#F97316] text-white text-[9px] font-mono font-bold">3</span>
                          <span className="inline-flex items-center justify-center w-4 h-4 rounded bg-[#10B981] text-white text-[9px] font-mono font-bold">1</span>
                        </sup>
                      </p>
                      <div className="mt-3 pt-3 border-t border-gray-200 text-[10px] text-gray-500 italic leading-snug">
                        Cada cita abre el pasaje exacto de la fuente original. Si la respuesta no estuviera en las fuentes, NotebookLM diría
                        “no aparece en las fuentes cargadas”.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Studio panel */}
                <div className="bg-white border-l border-gray-200 p-3">
                  <span className="font-semibold text-gray-900 text-[12px] block mb-2">Studio</span>
                  <div className="rounded-lg border border-orange-200 bg-orange-50 p-3 mb-2">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <Mic className="w-3.5 h-3.5 text-orange-600" />
                      <span className="text-[10px] font-semibold text-orange-700">Audio Overview</span>
                      <span className="ml-auto flex items-center gap-1 text-[9px] font-mono text-orange-500">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                        Live
                      </span>
                    </div>
                    <span className="text-[10px] text-orange-700 font-medium leading-snug block">Deep dive · 2 hosts · 12:34</span>
                  </div>
                  <div className="rounded-lg border border-indigo-200 bg-indigo-50 p-3 mb-2">
                    <div className="flex items-center gap-1.5 mb-1">
                      <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                      <span className="text-[10px] font-semibold text-indigo-700">Guía de estudio</span>
                    </div>
                    <span className="text-[10px] text-indigo-700 leading-snug block">28 Q · timeline · 22 términos</span>
                  </div>
                  <div className="rounded-lg border border-violet-200 bg-violet-50 p-3">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Brain className="w-3.5 h-3.5 text-violet-600" />
                      <span className="text-[10px] font-semibold text-violet-700">Mapa mental</span>
                    </div>
                    <span className="text-[10px] text-violet-700 leading-snug block">Relaciones entre fuentes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ═══ AUDIO OVERVIEW PLAYER ═══ */}
          <div className="max-w-6xl mx-auto mt-16">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.14em] text-warm mb-3">
                <Radio className="w-3.5 h-3.5" />
                Feature killer · Audio Overview
              </div>
              <h3 className="text-3xl md:text-5xl font-extrabold text-white leading-[1.05] tracking-tight mb-4">
                14 documentos <span className="text-white/30">→</span> <span className="text-gradient-gold">podcast de 12 minutos</span>
              </h3>
              <p className="text-white/70 text-base max-w-2xl mx-auto leading-relaxed">
                El alcalde escucha el dossier del PDT camino al Consejo de Gobierno. Dos hosts sintéticos debaten entre sí y citan las fuentes exactas. Cero alucinaciones — sólo tus docs.
              </p>
            </div>

            <div className="grid lg:grid-cols-[1.7fr_1fr] gap-5 items-start">
              {/* Player */}
              <div className="relative rounded-3xl p-6 md:p-8 overflow-hidden border border-white/15 shadow-2xl"
                   style={{ background: 'linear-gradient(135deg, #0F1A3D 0%, #13122D 50%, #1A1630 100%)' }}>
                <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
                <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-warm/15 blur-3xl pointer-events-none" />

                <div className="relative">
                  {/* Brand */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                        <BookOpen className="w-3.5 h-3.5 text-white" />
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/80">NotebookLM · Audio Overview</span>
                    </div>
                    <span className="flex items-center gap-1.5 text-[10px] font-mono text-accent">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                      Live · generado hoy 08:47
                    </span>
                  </div>

                  {/* Cover + hosts */}
                  <div className="flex gap-4 mb-6">
                    <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-gradient-to-br from-primary via-accent to-warm flex items-center justify-center shadow-xl shrink-0">
                      <Mic className="w-10 h-10 text-white" />
                      <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-accent border-2 border-[#0F1A3D] flex items-center justify-center text-[9px] font-bold text-white">AI</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-lg md:text-xl font-bold text-white leading-tight mb-1 truncate">{PODCAST_PUBLICO.title}</h4>
                      <p className="text-[12px] text-white/60 mb-3">{PODCAST_PUBLICO.subtitle}</p>
                      <div className="flex gap-2 flex-wrap">
                        <span className="inline-flex items-center gap-1.5 bg-white/[0.06] border border-white/10 rounded-full px-2.5 py-1 text-[10px] text-white/85">
                          <span className="w-5 h-5 rounded-full bg-gradient-to-br from-warm to-rose-500 flex items-center justify-center text-[9px] font-bold text-white">A</span>
                          Ana · Host
                        </span>
                        <span className="inline-flex items-center gap-1.5 bg-white/[0.06] border border-white/10 rounded-full px-2.5 py-1 text-[10px] text-white/85">
                          <span className="w-5 h-5 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-[9px] font-bold text-white">D</span>
                          Diego · Analista
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Now speaking */}
                  <div className="mb-4 flex items-center gap-3 text-[12px]">
                    <div className="flex items-center gap-1.5">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white transition-all ${currentChapter % 2 === 0 ? 'bg-gradient-to-br from-warm to-rose-500 scale-110 ring-2 ring-warm/40' : 'bg-gradient-to-br from-primary to-accent opacity-50'}`}>A</div>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white transition-all ${currentChapter % 2 === 1 ? 'bg-gradient-to-br from-primary to-accent scale-110 ring-2 ring-primary/40' : 'bg-gradient-to-br from-primary to-accent opacity-50'}`}>D</div>
                    </div>
                    <p className="text-white/90 italic flex-1 leading-snug text-[13px]">“{PODCAST_PUBLICO.chapters[currentChapter].gist}”</p>
                  </div>

                  {/* Waveform */}
                  <div className="relative h-16 flex items-center gap-[2px] mb-2 bg-black/25 rounded-xl px-3 py-2 border border-white/5">
                    {Array.from({ length: 64 }).map((_, i) => {
                      const progress = elapsed / PODCAST_PUBLICO.totalSec
                      const played = i / 64 < progress
                      const h = 22 + Math.abs(Math.sin(i * 0.5 + Math.cos(i * 0.13) * 2)) * 30
                      return (
                        <div
                          key={i}
                          className="flex-1 rounded-full transition-all"
                          style={{
                            height: `${Math.min(h, 48)}px`,
                            background: played ? 'linear-gradient(to top, #4338CA, #E11D48)' : 'rgba(255,255,255,0.1)',
                          }}
                        />
                      )
                    })}
                  </div>

                  <div className="flex items-center justify-between font-mono text-[11px] text-white/55 mb-5">
                    <span className="text-accent">{fmt(elapsed)}</span>
                    <span>-{fmt(PODCAST_PUBLICO.totalSec - elapsed)}</span>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <button type="button" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-all">
                      <Rewind className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setPlaying((p) => !p)}
                      className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white shadow-xl shadow-primary/40 hover:scale-105 transition-all"
                      aria-label={playing ? 'Pausar' : 'Reproducir'}
                    >
                      {playing ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                    </button>
                    <button type="button" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-all">
                      <FastForward className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Chapters */}
                  <div className="space-y-1">
                    {PODCAST_PUBLICO.chapters.map((c, i) => {
                      const isActive = i === currentChapter
                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setElapsed(c.start)}
                          className={`w-full grid grid-cols-[52px_1fr_auto] gap-3 items-center px-3 py-2 rounded-lg text-left transition-all border ${isActive ? 'bg-primary/15 border-primary/30' : 'bg-transparent border-transparent hover:bg-white/[0.04]'}`}
                        >
                          <span className={`font-mono text-[11px] ${isActive ? 'text-accent' : 'text-white/40'}`}>{fmt(c.start)}</span>
                          <span className={`text-[13px] font-semibold leading-tight ${isActive ? 'text-white' : 'text-white/70'}`}>{c.label}</span>
                          {isActive && (
                            <span className="flex items-center gap-1 text-[9px] font-mono text-accent uppercase tracking-[0.14em]">
                              <span className="w-1 h-1 rounded-full bg-accent animate-pulse" />
                              Now
                            </span>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-4">
                <div className="rounded-2xl p-5 border border-white/10"
                     style={{ background: 'linear-gradient(135deg, #0F1438 0%, #080C1F 100%)' }}>
                  <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent mb-2">Por qué importa</div>
                  <h5 className="text-lg font-bold text-white leading-tight mb-3">
                    El Consejo escucha el dossier <span className="text-accent">antes</span> de sentarse.
                  </h5>
                  <ul className="space-y-2 text-[12px] text-white/85">
                    {[
                      'Los directivos leen menos y escuchan más',
                      '12 min en el carro = lectura de 674 páginas',
                      'Dos voces que debaten es más memorable que un memo',
                      'Cero alucinaciones: sólo contenido de tus documentos',
                    ].map((v) => (
                      <li key={v} className="flex gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent mt-0.5 shrink-0" />
                        <span className="leading-snug">{v}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl p-5 border border-white/10 bg-white/[0.03]">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">Fuentes del podcast</span>
                    <span className="font-mono text-[12px] text-white font-bold">{PODCAST_PUBLICO.sources.length}</span>
                  </div>
                  <div className="space-y-1 max-h-[240px] overflow-y-auto pr-1">
                    {PODCAST_PUBLICO.sources.map((s, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px] py-1 border-b border-white/5 last:border-0">
                        <span className={`font-mono text-[9px] px-1.5 py-0.5 rounded-sm font-semibold ${s.type === 'PDF' ? 'bg-rose-500/15 text-rose-300' : s.type === 'XLSX' ? 'bg-emerald-500/15 text-emerald-300' : 'bg-primary/15 text-primary'}`}>{s.type}</span>
                        <span className="flex-1 text-white/80 truncate">{s.n}</span>
                        <span className="font-mono text-[10px] text-white/40">{s.pages}p</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl p-4 border border-accent/25 bg-accent/8 flex items-center gap-3">
                  <Lock className="w-5 h-5 text-accent shrink-0" />
                  <div className="flex-1">
                    <div className="text-[12px] font-semibold text-white leading-tight">NotebookLM Enterprise</div>
                    <div className="text-[10px] text-white/65 leading-snug mt-0.5">Datos no se usan para entrenar. SOC 2 Type II · ISO 27001. Disponible para cuentas @gov.co y educativas.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ═══ 8 labs aplicables ═══ */}
          <div className="max-w-6xl mx-auto mt-20">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.14em] text-warm mb-3">
                <Waves className="w-3.5 h-3.5" />
                8 experimentos listos para tu entidad
              </div>
              <h3 className="text-2xl md:text-4xl font-extrabold text-white leading-tight tracking-tight">
                Ocho usos que <span className="text-gradient-gold">cambian tu semana</span>
              </h3>
            </div>
          </div>

          {/* 8 lab cards */}
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-5">
            {NOTEBOOKLM_LABS.map((lab, i) => {
              const LIcon = lab.icon
              return (
                <div
                  key={i}
                  className="group relative bg-white/[0.04] backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:bg-white/[0.07] hover:border-white/25 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                >
                  {/* Gradient accent corner */}
                  <div className={`absolute -top-16 -right-16 w-40 h-40 rounded-full bg-gradient-to-br ${lab.tint} opacity-30 blur-2xl group-hover:opacity-50 transition-opacity`} />

                  <div className="relative">
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${lab.tint} flex items-center justify-center shrink-0 shadow-lg`}>
                        <LIcon className="w-6 h-6 text-white" />
                      </div>
                      <div className="min-w-0 flex-1 pt-1">
                        <div className="inline-flex items-center gap-1.5 bg-white/10 text-white/80 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-[0.12em] border border-white/10">
                          {lab.badge}
                        </div>
                        <div className="mt-1 text-[11px] text-white/50 font-mono">Lab #{String(i + 1).padStart(2, '0')}</div>
                      </div>
                    </div>

                    <h3 className="font-display font-bold text-white text-lg leading-tight tracking-tight mb-4">
                      {lab.title}
                    </h3>

                    <div className="space-y-3">
                      <div className="flex items-start gap-2.5">
                        <div className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                          <Upload className="w-3 h-3 text-white/70" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-white/50 mb-0.5">Fuentes a cargar</div>
                          <div className="text-xs text-white/80 leading-relaxed">{lab.files}</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <div className="w-6 h-6 rounded-md bg-primary/25 flex items-center justify-center shrink-0 mt-0.5">
                          <Terminal className="w-3 h-3 text-primary" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-primary/80 mb-0.5">Prompt sugerido</div>
                          <div className="text-xs text-white/90 leading-relaxed font-mono bg-black/30 border border-white/5 rounded-lg p-2">
                            "{lab.prompt}"
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <div className="w-6 h-6 rounded-md bg-accent/25 flex items-center justify-center shrink-0 mt-0.5">
                          <Sparkles className="w-3 h-3 text-accent" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-accent/90 mb-0.5">Qué obtienes</div>
                          <div className="text-xs text-white/80 leading-relaxed">{lab.output}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* CTA NotebookLM */}
          <div className="mt-10 text-center">
            <a
              href="https://notebooklm.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-text px-7 py-3.5 rounded-xl font-semibold no-underline hover:bg-white/90 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-sm"
            >
              <PlayCircle className="w-4 h-4 text-primary" />
              Abrir NotebookLM y empezar ahora
              <ExternalLink className="w-3.5 h-3.5 text-text-lighter" />
            </a>
            <p className="text-white/50 text-xs mt-3">
              Gratis con tu cuenta @gov.co o personal de Google · Requiere acceso a dominios Google
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════ BIBLIOTECA DE PROMPTS ═══════════ */}
      <section id="prompts" className="relative max-w-6xl mx-auto px-4 py-16 scroll-mt-20 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-text text-white px-4 py-1.5 rounded-full text-xs font-semibold mb-4 shadow-md">
            <Copy className="w-3 h-3" />
            Biblioteca de prompts · listos para copiar
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-text tracking-tight mb-3 leading-tight">
            48 prompts probados, uno por <span className="text-gradient-primary">tu rol</span>
          </h2>
          <p className="text-text-light text-base max-w-2xl mx-auto">
            Cada prompt está escrito en genérico: reemplaza los <span className="font-mono font-semibold text-text bg-warm/10 px-1.5 py-0.5 rounded">[CORCHETES]</span> con tu dato.
            Pégalo en Claude, ChatGPT o la herramienta sugerida y listo. Sin tutorial, sin capacitación previa.
          </p>
        </div>

        {/* Role tabs */}
        <div className="mb-8 flex flex-wrap gap-2 justify-center">
          {PROMPTS_LIBRARY.map((r) => {
            const RIcon = r.icon
            const isActive = r.roleId === promptRole
            return (
              <button
                key={r.roleId}
                type="button"
                onClick={() => setPromptRole(r.roleId)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold border transition-all ${isActive ? 'bg-text text-white border-text shadow-md scale-[1.03]' : 'bg-surface text-text-light border-border hover:border-primary/40 hover:text-primary'}`}
              >
                <RIcon className="w-3.5 h-3.5" style={{ color: isActive ? 'white' : r.color }} />
                {r.roleLabel}
              </button>
            )
          })}
        </div>

        {/* Prompt cards for active role */}
        <div className="grid md:grid-cols-2 gap-4">
          {activePromptRole.prompts.map((p, i) => {
            const id = `${activePromptRole.roleId}-${i}`
            const isCopied = copiedId === id
            const tool = p.tool ? getToolById(p.tool) : null
            return (
              <div
                key={id}
                className="group relative bg-surface rounded-2xl border border-border p-5 hover:shadow-lg hover:border-primary/30 transition-all duration-300 flex flex-col"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] font-mono uppercase tracking-[0.14em] text-text-lighter mb-1">
                      Prompt #{String(i + 1).padStart(2, '0')}
                    </div>
                    <h3 className="font-display font-bold text-text text-base leading-tight tracking-tight">
                      {p.title}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyPrompt(p.body, id)}
                    className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${isCopied ? 'bg-accent text-white border-accent' : 'bg-bg text-text-light border-border hover:border-primary/40 hover:text-primary'}`}
                    aria-label="Copiar prompt"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        Copiado
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        Copiar
                      </>
                    )}
                  </button>
                </div>

                <div className="bg-bg/70 border border-border rounded-xl p-3 mb-3 flex-1">
                  <p className="text-[12px] text-text leading-relaxed font-mono whitespace-pre-wrap">{p.body}</p>
                </div>

                {tool && (
                  <div className="pt-3 border-t border-border/60">
                    <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-text-lighter mb-1.5">
                      Herramienta sugerida
                    </div>
                    <Link
                      to={`/herramienta/${tool.id}`}
                      className="group inline-flex items-center gap-2 no-underline hover:text-primary"
                    >
                      <ToolFavicon tool={tool} />
                      <span className="text-sm font-semibold text-text group-hover:text-primary">{tool.name}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-text-lighter group-hover:text-primary transition-colors" />
                    </Link>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <p className="text-center text-xs text-text-lighter mt-6">
          Los prompts son genéricos. La calidad del resultado depende de qué tan bien llenes los <span className="font-mono">[CORCHETES]</span> con contexto real.
        </p>
      </section>

      {/* ═══════════ TEST DE MADUREZ ═══════════ */}
      <section
        id="madurez"
        className="relative overflow-hidden scroll-mt-20 py-16"
        style={{ background: 'linear-gradient(135deg, rgba(67,56,202,0.06) 0%, rgba(250,250,245,1) 45%, rgba(249,115,22,0.06) 100%)' }}
      >
        <div className="absolute inset-0 dot-pattern opacity-40 pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-primary text-white px-4 py-1.5 rounded-full text-xs font-semibold mb-4 shadow-md">
              <Award className="w-3 h-3" />
              Test de madurez IA · 10 preguntas · 3 minutos
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-text tracking-tight mb-3 leading-tight">
              ¿En qué nivel está <span className="text-gradient-warm">tu entidad</span>?
            </h2>
            <p className="text-text-light text-base max-w-2xl mx-auto">
              Responde 10 preguntas sobre gobernanza, datos, talento y medición.
              La página te ubica en una de 4 bandas y te da 3 acciones concretas para los próximos 90 días.
              <span className="block mt-2 text-xs text-text-lighter">Anónimo · no guarda datos · todo se calcula en tu navegador.</span>
            </p>
          </div>

          {/* State 1: antes de empezar */}
          {qIndex === -1 && !testComplete && (
            <div className="bg-surface border border-border rounded-3xl p-8 md:p-10 shadow-lg text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent mb-6 shadow-xl">
                <Gauge className="w-10 h-10 text-white" />
              </div>
              <h3 className="font-display font-bold text-text text-2xl tracking-tight mb-3">
                Empieza el diagnóstico
              </h3>
              <p className="text-text-light text-sm max-w-lg mx-auto mb-6">
                Cada pregunta tiene 4 opciones. No hay respuestas correctas: solo honestas.
                El score (0–100) te ayuda a saber por dónde empezar.
              </p>
              <button
                type="button"
                onClick={() => setQIndex(0)}
                className="inline-flex items-center gap-2 bg-text text-white px-7 py-3.5 rounded-xl font-semibold hover:bg-text/90 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-sm"
              >
                <Play className="w-4 h-4" />
                Iniciar test
              </button>
              <div className="mt-6 grid grid-cols-4 gap-2">
                {MATURITY_BANDS.map((b) => (
                  <div key={b.label} className="text-center">
                    <div className={`h-1.5 rounded-full bg-gradient-to-r ${b.grad} mb-1.5`} />
                    <div className={`text-[10px] font-bold uppercase tracking-[0.14em] ${b.color}`}>{b.label}</div>
                    <div className="text-[10px] text-text-lighter font-mono">{b.min}–{b.max}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* State 2: respondiendo */}
          {qIndex >= 0 && !testComplete && (() => {
            const current = MATURITY_QUESTIONS[qIndex]
            const progress = ((qIndex + 1) / MATURITY_QUESTIONS.length) * 100
            return (
              <div className="bg-surface border border-border rounded-3xl p-7 md:p-9 shadow-lg">
                {/* Progress */}
                <div className="flex items-center justify-between mb-5">
                  <div className="text-[11px] font-mono uppercase tracking-[0.14em] text-text-lighter">
                    Pregunta {qIndex + 1} de {MATURITY_QUESTIONS.length}
                  </div>
                  {qIndex > 0 && (
                    <button
                      type="button"
                      onClick={() => setQIndex((i) => i - 1)}
                      className="inline-flex items-center gap-1 text-xs text-text-light hover:text-primary transition-colors"
                    >
                      <ArrowLeft className="w-3 h-3" />
                      Anterior
                    </button>
                  )}
                </div>
                <div className="h-1.5 w-full bg-bg rounded-full overflow-hidden mb-6">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <h3 className="font-display font-bold text-text text-xl md:text-2xl tracking-tight leading-tight mb-6">
                  {current.question}
                </h3>

                <div className="space-y-2.5">
                  {current.options.map((opt, i) => {
                    const isSelected = answers[current.id] === opt.points
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => answer(opt.points)}
                        className={`w-full text-left flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-all ${isSelected ? 'border-primary bg-primary/5 shadow-md' : 'border-border bg-bg/50 hover:border-primary/40 hover:bg-primary/3'}`}
                      >
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${isSelected ? 'border-primary bg-primary text-white' : 'border-border-dark'}`}>
                          {isSelected && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <span className="text-sm text-text flex-1">{opt.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })()}

          {/* State 3: resultado */}
          {testComplete && (
            <div className="bg-surface border border-border rounded-3xl overflow-hidden shadow-2xl">
              {/* Band header */}
              <div className={`relative p-8 md:p-10 bg-gradient-to-br ${maturityBand.grad} text-white overflow-hidden`}>
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
                <div className="relative flex items-start gap-5">
                  <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center shrink-0">
                    <Award className="w-10 h-10 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] font-mono uppercase tracking-[0.14em] text-white/80 mb-1">
                      Nivel de madurez
                    </div>
                    <h3 className="font-display font-extrabold text-3xl md:text-4xl tracking-tight leading-tight mb-2">
                      {maturityBand.label}
                    </h3>
                    <div className="flex items-baseline gap-2">
                      <span className="font-display font-extrabold text-4xl md:text-5xl tracking-tight leading-none">{totalPoints}</span>
                      <span className="text-white/70 text-sm">/ 100 puntos</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-7 md:p-9">
                <p className="text-text leading-relaxed mb-7">
                  {maturityBand.summary}
                </p>

                <div className="mb-7">
                  <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-text-lighter mb-3">
                    Tus próximos 90 días
                  </div>
                  <div className="space-y-2.5">
                    {maturityBand.actions.map((a, i) => (
                      <div key={i} className="flex items-start gap-3 bg-bg/60 rounded-xl border border-border/60 p-4">
                        <div className={`w-7 h-7 rounded-lg ${maturityBand.bg} flex items-center justify-center shrink-0 ring-2 ${maturityBand.ring}`}>
                          <span className={`text-xs font-bold ${maturityBand.color}`}>{i + 1}</span>
                        </div>
                        <p className="text-sm text-text leading-relaxed flex-1">{a}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-7">
                  <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-text-lighter mb-3">
                    Arranca con estas herramientas
                  </div>
                  <div className="grid sm:grid-cols-3 gap-2.5">
                    {maturityBand.tools.map((tid) => (
                      <ToolMini key={tid} id={tid} />
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-5 border-t border-border">
                  <button
                    type="button"
                    onClick={resetTest}
                    className="inline-flex items-center justify-center gap-2 bg-bg border border-border text-text px-5 py-2.5 rounded-xl font-semibold hover:border-primary/40 hover:text-primary transition-all text-sm"
                  >
                    <RefreshCcw className="w-4 h-4" />
                    Hacer el test otra vez
                  </button>
                  <a
                    href="#prompts"
                    className="inline-flex items-center justify-center gap-2 bg-text text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-text/90 hover:shadow-lg transition-all text-sm"
                  >
                    <Copy className="w-4 h-4" />
                    Ver biblioteca de prompts
                  </a>
                  <Link
                    to="/explorar"
                    className="inline-flex items-center justify-center gap-2 bg-surface border border-border text-text px-5 py-2.5 rounded-xl font-semibold no-underline hover:border-primary/40 hover:text-primary transition-all text-sm"
                  >
                    <Sparkles className="w-4 h-4 text-warm" />
                    Catálogo completo de IA
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ═══════════ RED FLAGS ═══════════ */}
      <section id="red-flags" className="relative max-w-6xl mx-auto px-4 py-16 scroll-mt-20">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-rose-600 text-white px-4 py-1.5 rounded-full text-xs font-semibold mb-4 shadow-md">
            <Ban className="w-3 h-3" />
            Red flags · lo que NUNCA hacer
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-text tracking-tight mb-3 leading-tight">
            Ocho atajos que cuestan <span className="text-rose-600">sanción disciplinaria</span>
          </h2>
          <p className="text-text-light text-base max-w-2xl mx-auto">
            La IA bien usada ahorra horas. Mal usada puede costar tutelas, nulidades de actos administrativos e incluso
            responsabilidad del servidor. Estas son las ocho trampas más frecuentes en el sector público.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {RED_FLAGS.map((f, i) => (
            <div
              key={i}
              className="group relative bg-surface rounded-2xl border-2 border-rose-100 overflow-hidden hover:border-rose-400 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-rose-500/10 rounded-full blur-2xl group-hover:bg-rose-500/20 transition-colors" />

              <div className="relative p-5 flex flex-col flex-1">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 ring-4 ring-rose-100 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <XCircle className="w-5 h-5 text-rose-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] font-mono uppercase tracking-[0.14em] text-rose-600 mb-0.5">
                      Red flag #{String(i + 1).padStart(2, '0')}
                    </div>
                    <h3 className="font-display font-bold text-text text-sm leading-tight tracking-tight">
                      {f.title}
                    </h3>
                  </div>
                </div>

                <div className="space-y-2.5 flex-1">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-rose-600 mb-1">Por qué duele</div>
                    <p className="text-[12px] text-text-light leading-snug">{f.why}</p>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-700 mb-1">Qué hacer en cambio</div>
                    <p className="text-[12px] text-text leading-snug">{f.instead}</p>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-rose-100">
                  <div className="inline-flex items-center gap-1.5 text-[10px] font-mono text-rose-700 bg-rose-50 px-2 py-1 rounded-md">
                    <ScrollText className="w-3 h-3" />
                    {f.norm}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-text-lighter max-w-2xl mx-auto">
            Referencia clave: <span className="font-semibold text-text">Sentencia T-323 de 2024</span> · <span className="font-semibold text-text">Ley 1581 de 2012</span> · <span className="font-semibold text-text">CONPES 4144 de 2025</span> · <span className="font-semibold text-text">Ley 1437 de 2011 (CPACA)</span>.
          </p>
        </div>
      </section>

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

      {/* ═══════════ PRIMERA SEMANA CONSTRUYENDO CON IA ═══════════ */}
      <section id="primera-semana" className="relative max-w-6xl mx-auto px-4 py-16 scroll-mt-20 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-warm/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-warm text-white px-4 py-1.5 rounded-full text-xs font-semibold mb-4 shadow-md">
            <Hammer className="w-3 h-3" />
            Construye paso a paso · plan de 1 semana
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-text tracking-tight mb-3 leading-tight">
            Tu primera semana con IA, <span className="text-gradient-warm">sin morir en el intento</span>
          </h2>
          <p className="text-text-light text-base max-w-2xl mx-auto">
            Seis días, un entregable por día, una herramienta por día. Diseñado para un equipo de 3–5 personas con 2
            horas diarias y ningún crédito disponible. Al viernes tienes datos para decidir si escalas.
          </p>
        </div>

        {/* Timeline vertical */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical connector line */}
          <div className="hidden sm:block absolute left-8 top-4 bottom-4 w-0.5 bg-gradient-to-b from-primary/20 via-warm/30 to-accent/20 pointer-events-none" />

          <div className="space-y-5">
            {FIRST_WEEK.map((d) => {
              const DIcon = d.icon
              return (
                <div key={d.day} className="relative flex items-start gap-5">
                  {/* Day marker */}
                  <div className={`relative shrink-0 w-16 h-16 ${d.bg} rounded-2xl flex items-center justify-center ring-4 ${d.ring} shadow-sm`}>
                    <DIcon className={`w-7 h-7 ${d.color}`} />
                  </div>

                  {/* Card */}
                  <div className="flex-1 bg-surface rounded-2xl border border-border p-6 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                    <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
                      <div>
                        <div className={`text-[10px] font-mono uppercase tracking-[0.14em] ${d.color} mb-0.5`}>
                          {d.day} · {d.label}
                        </div>
                        <h3 className="font-display font-bold text-text text-xl leading-tight tracking-tight">
                          {d.title}
                        </h3>
                      </div>
                    </div>

                    <ul className="space-y-2 mb-5">
                      {d.tasks.map((t, j) => (
                        <li key={j} className="flex items-start gap-2.5 text-sm text-text-light leading-relaxed">
                          <span className={`w-5 h-5 rounded-md ${d.bg} ${d.color} flex items-center justify-center shrink-0 mt-0.5 font-mono text-[10px] font-bold`}>
                            {j + 1}
                          </span>
                          <span className="flex-1">{t}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-4 border-t border-border/60 grid sm:grid-cols-[1fr_auto] gap-3 items-center">
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-text-lighter mb-0.5">
                          Entregable del día
                        </div>
                        <div className="text-xs text-text leading-snug font-medium">{d.deliverable}</div>
                      </div>
                      <div className="shrink-0">
                        <ToolMini id={d.tool} />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Final milestone */}
        <div className="mt-10 max-w-2xl mx-auto bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-100 mb-3">
            <Flag className="w-6 h-6 text-emerald-700" />
          </div>
          <h3 className="font-display font-bold text-text text-lg tracking-tight mb-2">
            Viernes a las 5 p.m. tienes evidencia dura
          </h3>
          <p className="text-sm text-text-light leading-relaxed">
            Tiempos comparados, errores, alcance real y riesgos documentados. Es la materia prima que convierte el
            piloto en programa — o lo cierra con dignidad. Sin evidencia, es solo opinión.
          </p>
        </div>
      </section>

      {/* ═══════════ QUICK WINS ═══════════ */}
      <section id="quick-wins" className="max-w-6xl mx-auto px-4 py-14 scroll-mt-20">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-primary text-white px-4 py-1.5 rounded-full text-xs font-semibold mb-4 shadow-md">
            <Zap className="w-3 h-3" />
            Quick wins · ejecutables en &lt; 2 horas
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-text tracking-tight mb-3 leading-tight">
            Doce victorias rápidas para <span className="text-gradient-primary">demostrar valor esta semana</span>
          </h2>
          <p className="text-text-light text-base max-w-2xl mx-auto">
            No necesitas presupuesto ni aprobación de la Junta. Cada quick win rinde antes del almuerzo y acumula
            evidencia para cuando pidas escalar.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {QUICK_WINS.map((q, i) => {
            const QIcon = q.icon
            return (
              <div
                key={i}
                className="group relative bg-surface rounded-2xl border border-border p-5 hover:shadow-lg hover:-translate-y-1 hover:border-primary/30 transition-all duration-300 flex flex-col overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 w-28 h-28 bg-primary/5 rounded-full blur-xl group-hover:bg-primary/10 transition-colors" />
                <div className="relative flex flex-col h-full">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center ring-4 ring-primary/5">
                      <QIcon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="inline-flex items-center gap-1 bg-warm/10 text-warm px-2 py-0.5 rounded-full text-[10px] font-bold border border-warm/20">
                      <Zap className="w-2.5 h-2.5" />
                      {q.time}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-text text-base leading-tight tracking-tight mb-2">
                    {q.title}
                  </h3>

                  <p className="text-xs text-text-light leading-relaxed mb-4 flex-1">{q.how}</p>

                  <div className="pt-3 border-t border-border/60 flex items-start gap-2">
                    <TrendingUp className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                    <p className="text-xs text-text leading-snug">
                      <span className="font-semibold text-accent">Impacto:</span>{' '}
                      <span className="text-text-light">{q.impact}</span>
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <p className="text-center text-xs text-text-lighter mt-6 max-w-xl mx-auto">
          Cada quick win es un experimento: mide antes, ejecuta, mide después. Esa es la única forma de construir
          evidencia que aguante el siguiente Consejo de Gobierno.
        </p>
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

      {/* Disclaimer ético + créditos */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="bg-accent/5 border border-accent/20 rounded-2xl p-6 md:p-8">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-text tracking-tight leading-tight">Uso responsable · la ética no se terceriza</h3>
              <p className="text-xs text-text-lighter mt-0.5">Lee antes de llevar cualquier recomendación a tu entidad</p>
            </div>
          </div>
          <div className="space-y-2.5 text-sm text-text-light leading-relaxed">
            <p>
              Esta guía es educativa y orientativa. La decisión sobre qué herramienta usar, qué datos cargar y cómo aplicar
              los resultados es <span className="font-semibold text-text">responsabilidad de cada servidor público y de la
              entidad</span> bajo su rol y marco normativo.
            </p>
            <p>
              El uso ético exige: supervisión humana sobre decisiones que afectan ciudadanos, no cargar datos personales
              o reservados en servicios públicos sin las garantías legales, documentar en el expediente el uso de IA
              (conforme a la T-323/2024 y CONPES 4144), y verificar siempre antes de firmar.
            </p>
            <p className="text-text-lighter text-xs italic flex items-start gap-2">
              <AlertTriangle className="w-3.5 h-3.5 text-warm shrink-0 mt-0.5" />
              <span>El autor de esta guía no se hace responsable del uso que se dé a las herramientas aquí listadas. Cualquier aplicación concreta debe validarse por jurídica, control interno y la oficina de protección de datos de la entidad.</span>
            </p>
          </div>
          <div className="mt-5 pt-5 border-t border-accent/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="text-xs text-text-light">
              Capítulo curado por{' '}
              <a
                href="https://sjimenezlon.co/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-primary no-underline hover:text-primary/80"
              >
                Santiago Jiménez Londoño
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="text-[11px] text-text-lighter">
              Última revisión: abril 2026 · sjimenezlon.co
            </div>
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
