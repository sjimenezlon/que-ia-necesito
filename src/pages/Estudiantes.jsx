import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Backpack, Cpu, GraduationCap, Sparkles, Users } from 'lucide-react'
import { STUDENTS_UPDATED } from '../data/students'
import Primaria from '../components/estudiantes/Primaria'
import Secundaria from '../components/estudiantes/Secundaria'
import Universidad from '../components/estudiantes/Universidad'

const LEVELS = {
  primaria: {
    path: '/para-estudiantes/primaria',
    tab: 'Primaria',
    who: 'Niñas, niños y sus familias',
    icon: Users,
    badge: 'Primaria · 6 a 11 años, con sus familias',
    title: ['La IA es una máquina.', 'Tu imaginación es tuya.'],
    lead: 'Juegos para entender qué es la IA, cuándo se equivoca y qué nunca contarle. Y para las familias: cómo acompañar según la edad, qué revisar antes de una app o un juguete con IA, y un acuerdo para firmar en casa.',
    rule: ['Primero imaginas tú.', 'Después, si quieres, la máquina.'],
    ruleNote: 'A esta edad la IA no es una pantalla para quedarse solo: es una actividad para hacer en familia, con un adulto al lado.',
    Component: Primaria,
  },
  secundaria: {
    path: '/para-estudiantes',
    tab: 'Secundaria',
    who: 'Jóvenes, familias y reflexiones',
    icon: Backpack,
    badge: 'Secundaria · Colegio, con sus familias',
    title: ['La IA no vino a reemplazarte.', 'Llegó a retarte.'],
    lead: 'Cómo funciona por dentro, cuándo usarla y cuándo no, cómo pedirle para aprender más (no menos) y qué hace con tu atención la otra IA: la de tu feed. Con una guía para familias y reflexiones para conversar.',
    rule: ['La IA pone el borrador.', 'Tú pones el criterio.'],
    ruleNote: 'Si la IA hace el esfuerzo por ti, aprendes menos. Si la pones a preguntarte, corregirte y llevarte la contraria, aprendes más rápido que nunca.',
    Component: Secundaria,
  },
  universidad: {
    path: '/para-estudiantes/universidad',
    tab: 'Universidad',
    who: 'Pregrado y primeros empleos',
    icon: GraduationCap,
    badge: 'Universidad · Pregrado y primer empleo',
    title: ['La IA hace el borrador.', 'Tu carrera es el criterio.'],
    lead: 'Qué cambia en tu profesión, un sistema de estudio con evidencia, integridad académica, cómo citar la IA, investigar con fuentes reales, cuidar los datos ajenos y llegar mejor preparado a tu primer empleo.',
    rule: ['Primero piensas tú.', 'Después la IA revisa.'],
    ruleNote: 'El orden cambia lo que aprendes. La IA que te contradice te forma; la que piensa por ti te reemplaza.',
    Component: Universidad,
  },
}

export default function Estudiantes() {
  const { nivel } = useParams()
  const key = nivel || 'secundaria'
  const level = LEVELS[key]

  useEffect(() => {
    if (level) document.title = `Estudiantes · ${level.tab} · ¿Qué IA necesito?`
  }, [level])

  if (!level) return <Navigate to="/para-estudiantes" replace />
  if (nivel === 'secundaria') return <Navigate to="/para-estudiantes" replace />

  const Body = level.Component

  return (
    <div className="bg-bg">
      <section className="relative px-4 hero-gradient noise-overlay overflow-x-clip pt-10 pb-16 md:pt-12 md:pb-20">
        <div className="absolute inset-0 dot-pattern pointer-events-none" />
        <div className="absolute -top-16 -left-24 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-24 -right-24 w-80 h-80 bg-secondary/8 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto">
          <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-12 max-w-3xl" role="tablist" aria-label="Escoge tu nivel">
            {Object.entries(LEVELS).map(([id, item]) => {
              const Icon = item.icon
              const on = id === key
              return (
                <Link
                  key={id}
                  to={item.path}
                  role="tab"
                  aria-selected={on}
                  className={`rounded-2xl p-3 sm:p-4 border no-underline transition-all ${
                    on ? 'bg-text border-text text-bg shadow-lg' : 'bg-surface/80 border-border text-text hover:border-primary/30 hover:shadow-md'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${on ? 'text-bg' : 'text-primary'}`} />
                  <span className="block font-display font-bold text-base sm:text-lg mt-2">{item.tab}</span>
                  <span className={`hidden sm:block text-xs mt-0.5 ${on ? 'text-bg/70' : 'text-text-light'}`}>{item.who}</span>
                </Link>
              )
            })}
          </div>

          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-16 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-primary/8 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-7 border border-primary/15 shadow-sm">
                <level.icon className="w-4 h-4" />
                {level.badge}
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-text leading-[1.05] tracking-tight mb-6">
                <span className="text-text-light font-bold">{level.title[0]}</span>
                <br className="hidden sm:block" />
                <span className="text-gradient-primary"> {level.title[1]}</span>
              </h1>
              <p className="text-text-light text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 leading-relaxed">{level.lead}</p>
            </div>

            <div className="bg-surface border border-border rounded-3xl p-6 md:p-7 shadow-lg">
              <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-text-lighter mb-4">La regla de este recorrido</div>
              <div className="grid grid-cols-2 rounded-2xl overflow-hidden border border-border">
                <div className="p-5 bg-text/[0.03]">
                  <Cpu className="w-5 h-5 text-text-light mb-3" />
                  <p className="font-display font-bold text-text text-xl leading-tight">{level.rule[0]}</p>
                </div>
                <div className="p-5 bg-primary text-white">
                  <Sparkles className="w-5 h-5 mb-3" />
                  <p className="font-display font-bold text-xl leading-tight">{level.rule[1]}</p>
                </div>
              </div>
              <p className="text-sm text-text-light leading-relaxed mt-5">{level.ruleNote}</p>
            </div>
          </div>
        </div>
      </section>

      <Body />

      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid sm:grid-cols-3 gap-3 border-t border-border pt-10">
          {Object.entries(LEVELS)
            .filter(([id]) => id !== key)
            .map(([id, item]) => (
              <Link key={id} to={item.path} className="starter-card" onClick={() => window.scrollTo({ top: 0 })}>
                <span className="text-xs text-text-light">Otro recorrido</span>
                <h3 className="font-semibold text-lg mt-3 mb-1">{item.tab}</h3>
                <p className="text-sm text-text-light">{item.who}</p>
              </Link>
            ))}
          <Link to="/docentes" className="starter-card">
            <span className="text-xs text-text-light">¿Eres docente?</span>
            <h3 className="font-semibold text-lg mt-3 mb-1">IA para profesoras y profesores</h3>
            <p className="text-sm text-text-light">Planeación, evaluación y prompts para el aula.</p>
          </Link>
        </div>
        <p className="text-xs text-text-lighter mt-12">
          Revisado el {STUDENTS_UPDATED}. Capítulo creado por{' '}
          <a href="https://sjimenezlon.co/" target="_blank" rel="noopener noreferrer" className="text-text-lighter hover:text-primary">
            Santiago Jiménez Londoño
          </a>
          , profesor de la Universidad EAFIT.
        </p>
      </div>
    </div>
  )
}
