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
