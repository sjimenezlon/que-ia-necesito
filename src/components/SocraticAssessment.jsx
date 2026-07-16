import { useState } from 'react'
import {
  ArrowRight,
  Brain,
  Check,
  CheckCircle2,
  Copy,
  GraduationCap,
  Layers3,
  Lightbulb,
  MessageSquareText,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
} from 'lucide-react'

const DIALOGUE_STAGES = [
  {
    id: 'afirmar',
    label: 'Aclara la afirmación',
    purpose: 'Delimitar qué sostiene realmente el estudiante.',
    questions: [
      '¿Qué estás afirmando exactamente?',
      '¿Cómo lo explicarías con tus propias palabras?',
      '¿Qué término necesitas definir antes de continuar?',
    ],
    observe: 'Distingue la idea central de ejemplos, detalles o frases aprendidas de memoria.',
  },
  {
    id: 'supuestos',
    label: 'Examina supuestos',
    purpose: 'Hacer visibles las ideas que sostienen la respuesta.',
    questions: [
      '¿Qué tendría que ser cierto para que tu respuesta funcione?',
      '¿Qué estás dando por sentado?',
      '¿En qué situación ese supuesto podría fallar?',
    ],
    observe: 'Reconoce condiciones, límites y decisiones que no estaban explícitas en el producto.',
  },
  {
    id: 'evidencia',
    label: 'Pide evidencia',
    purpose: 'Conectar la afirmación con razones y fuentes verificables.',
    questions: [
      '¿Qué evidencia respalda esa conclusión?',
      '¿Cómo verificaste esa fuente o ese dato?',
      '¿Qué evidencia podría hacerte cambiar de opinión?',
    ],
    observe: 'Justifica, distingue evidencia de opinión y puede explicar cómo verificó la información.',
  },
  {
    id: 'alternativas',
    label: 'Abre alternativas',
    purpose: 'Comprobar si puede considerar otras explicaciones o decisiones.',
    questions: [
      '¿Qué otra interpretación sería razonable?',
      '¿Cómo respondería alguien que no está de acuerdo?',
      '¿Qué gana y qué pierde cada alternativa?',
    ],
    observe: 'Compara perspectivas sin caricaturizarlas y ajusta su argumento cuando aparece una alternativa mejor.',
  },
  {
    id: 'transferir',
    label: 'Transfiere y revisa',
    purpose: 'Observar comprensión cuando cambia el contexto.',
    questions: [
      '¿Qué cambiaría si modificamos esta condición?',
      '¿Dónde más podrías aplicar esta idea?',
      'Después de esta conversación, ¿qué mantienes y qué revisarías?',
    ],
    observe: 'Aplica la idea en un caso nuevo, reconoce límites y explica por qué modifica o conserva su posición.',
  },
]

const EVALUATION_FOCI = [
  { id: 'concepto', label: 'Comprensión conceptual', prompt: 'una explicación o respuesta conceptual' },
  { id: 'producto', label: 'Proyecto o producto', prompt: 'un proyecto, ensayo, presentación o producto final' },
  { id: 'decision', label: 'Decisión o caso', prompt: 'una decisión frente a un caso auténtico' },
]

const MODES = [
  { id: 'individual', label: 'Diálogo individual', note: '5–8 minutos por estudiante' },
  { id: 'parejas', label: 'En parejas', note: 'Uno pregunta, otro responde y luego cambian' },
  { id: 'grupo', label: 'Seminario grupal', note: 'El grupo construye y cuestiona argumentos' },
]

const OBSERVATION_CRITERIA = [
  { title: 'Claridad', body: 'Expresa una posición comprensible y define los conceptos esenciales.' },
  { title: 'Razones y evidencia', body: 'Justifica, verifica y distingue entre dato, inferencia y opinión.' },
  { title: 'Apertura intelectual', body: 'Considera alternativas y revisa su respuesta cuando encuentra mejores razones.' },
  { title: 'Transferencia', body: 'Aplica lo comprendido cuando cambia el caso, la condición o el contexto.' },
]

export default function SocraticAssessment({ copiedId, onCopy }) {
  const [activeStage, setActiveStage] = useState(0)
  const [focusId, setFocusId] = useState(EVALUATION_FOCI[0].id)
  const [modeId, setModeId] = useState(MODES[0].id)
  const [topic, setTopic] = useState('la idea central trabajada en clase')

  const stage = DIALOGUE_STAGES[activeStage]
  const focus = EVALUATION_FOCI.find((item) => item.id === focusId) || EVALUATION_FOCI[0]
  const mode = MODES.find((item) => item.id === modeId) || MODES[0]
  const socraticPrompt = `Actúa como facilitador de una evaluación socrática para ${focus.prompt}. Tema o reto: ${topic || '[tema o reto]'}. Modalidad: ${mode.label}.\n\nPropósito: observar comprensión, razonamiento, uso de evidencia, apertura a revisar ideas y transferencia. No entregues la respuesta ni conviertas el diálogo en un interrogatorio de memoria.\n\nSecuencia:\n${DIALOGUE_STAGES.map((item, index) => `${index + 1}. ${item.label}: ${item.questions.join(' / ')}`).join('\n')}\n\nReglas de interacción:\n- Haz una sola pregunta por turno y espera la respuesta.\n- Pide aclaración o evidencia antes de corregir.\n- Adapta la siguiente pregunta a lo que el estudiante dijo.\n- Si se bloquea, ofrece una reformulación, no la solución.\n- Al final, pide que explique qué mantuvo, qué cambió y qué puede transferir.\n- Devuelve al docente un registro descriptivo según cuatro criterios: claridad, razones y evidencia, apertura intelectual y transferencia.\n\nNo asignes una nota automática, no infieras autoría a partir del estilo, no diagnostiques y no recopiles datos personales. La decisión evaluativa es del docente.`

  function advanceStage() {
    setActiveStage((current) => current === DIALOGUE_STAGES.length - 1 ? 0 : current + 1)
  }

  return (
    <section id="socratico" className="relative overflow-hidden py-16 scroll-mt-28" style={{ background: 'linear-gradient(135deg, #111827 0%, #1e1b4b 54%, #18252c 100%)' }}>
      <div className="absolute inset-0 opacity-[0.08] dot-pattern pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/90 px-3 py-1 rounded-full text-xs font-semibold mb-3 border border-white/15">
            <MessageSquareText className="w-3 h-3" />
            Evaluación socrática
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-3">Evalúa cómo piensa, no solo qué entrega</h2>
          <p className="text-white/60 text-sm md:text-base max-w-3xl mx-auto leading-relaxed">Un diálogo breve puede revelar comprensión, supuestos, evidencia y capacidad de revisión. No busca una respuesta perfecta: busca que el estudiante haga visible su relación con lo aprendido.</p>
        </div>

        <div className="grid lg:grid-cols-[0.76fr_1.24fr] gap-5 items-start mb-6">
          <div className="bg-white/[0.055] backdrop-blur-sm border border-white/10 rounded-3xl p-5 md:p-6">
            <label htmlFor="socratic-topic" className="block text-xs font-semibold text-white mb-2">Tema, producto o decisión</label>
            <input id="socratic-topic" type="text" value={topic} onChange={(event) => setTopic(event.target.value)} className="w-full bg-white/[0.06] border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/40 focus:ring-2 focus:ring-white/10 mb-5" />

            <div className="text-xs font-semibold text-white mb-2">¿Qué quieres examinar?</div>
            <div className="space-y-2 mb-5">
              {EVALUATION_FOCI.map((item) => (
                <button key={item.id} type="button" aria-pressed={focusId === item.id} onClick={() => setFocusId(item.id)} className={`w-full text-left px-4 py-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${focusId === item.id ? 'bg-white text-text border-white' : 'bg-white/[0.035] text-white/65 border-white/10 hover:border-white/25 hover:text-white'}`}>
                  {item.label}
                </button>
              ))}
            </div>

            <div className="text-xs font-semibold text-white mb-2">Modalidad</div>
            <div className="space-y-2">
              {MODES.map((item) => (
                <button key={item.id} type="button" aria-pressed={modeId === item.id} onClick={() => setModeId(item.id)} className={`w-full text-left px-4 py-3 rounded-xl border cursor-pointer transition-all ${modeId === item.id ? 'bg-emerald-300/10 border-emerald-300/30 text-white' : 'bg-white/[0.025] border-white/10 text-white/60 hover:border-white/25'}`}>
                  <span className="block text-xs font-semibold">{item.label}</span>
                  <span className="block text-[10px] mt-1 opacity-60">{item.note}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white/[0.055] backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden min-h-[500px] flex flex-col" aria-live="polite">
            <div className="p-5 md:p-7 border-b border-white/10">
              <div className="flex items-center justify-between gap-4 mb-6">
                <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-amber-300">Momento {activeStage + 1} de {DIALOGUE_STAGES.length}</span>
                <div className="flex gap-1.5" aria-label={`Momento ${activeStage + 1} de ${DIALOGUE_STAGES.length}`}>
                  {DIALOGUE_STAGES.map((item, index) => (
                    <button key={item.id} type="button" aria-label={`Ir a ${item.label}`} aria-pressed={index === activeStage} onClick={() => setActiveStage(index)} className={`h-2 rounded-full border-0 cursor-pointer transition-all ${index === activeStage ? 'w-9 bg-amber-300' : index < activeStage ? 'w-5 bg-emerald-300/50' : 'w-5 bg-white/15 hover:bg-white/30'}`} />
                  ))}
                </div>
              </div>
              <h3 className="font-display font-bold text-white text-2xl md:text-3xl tracking-tight mb-2">{stage.label}</h3>
              <p className="text-white/50 text-sm">{stage.purpose}</p>
            </div>

            <div className="p-5 md:p-7 flex-1 flex flex-col justify-center">
              <div className="space-y-3">
                {stage.questions.map((question, index) => (
                  <div key={question} className="flex items-start gap-3 bg-white/[0.035] border border-white/10 rounded-2xl p-4">
                    <span className="w-7 h-7 rounded-lg bg-amber-300/10 text-amber-300 flex items-center justify-center text-xs font-bold shrink-0">{index + 1}</span>
                    <p className="text-white/80 text-sm md:text-base leading-relaxed">{question}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 bg-emerald-300/10 border border-emerald-300/20 rounded-2xl p-4 flex items-start gap-3">
                <Search className="w-4 h-4 text-emerald-300 mt-0.5 shrink-0" />
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.1em] text-emerald-300 mb-1">Qué observar</div>
                  <p className="text-white/65 text-xs leading-relaxed">{stage.observe}</p>
                </div>
              </div>
            </div>

            <div className="p-5 md:p-7 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <button type="button" onClick={() => onCopy(socraticPrompt, 'socratic-prompt')} className="inline-flex items-center justify-center gap-2 bg-white/10 text-white border border-white/15 px-4 py-2.5 rounded-xl font-semibold text-xs cursor-pointer hover:bg-white/15 transition-colors">
                {copiedId === 'socratic-prompt' ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedId === 'socratic-prompt' ? 'Prompt copiado' : 'Copiar guía para la IA'}
              </button>
              <button type="button" onClick={advanceStage} className="inline-flex items-center justify-center gap-2 bg-white text-text px-4 py-2.5 rounded-xl font-semibold text-xs cursor-pointer hover:bg-white/90 transition-colors">
                {activeStage === DIALOGUE_STAGES.length - 1 ? 'Volver al inicio' : 'Siguiente momento'}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-3 mb-8">
          {OBSERVATION_CRITERIA.map((criterion, index) => {
            const icons = [Target, Layers3, Brain, Sparkles]
            const Icon = icons[index]
            return (
              <div key={criterion.title} className="bg-white/[0.04] border border-white/10 rounded-2xl p-4">
                <Icon className="w-4 h-4 text-amber-300 mb-3" />
                <h3 className="font-display font-bold text-white text-sm mb-1.5">{criterion.title}</h3>
                <p className="text-white/50 text-[11px] leading-relaxed">{criterion.body}</p>
              </div>
            )
          })}
        </div>

        <div className="relative overflow-hidden bg-white rounded-3xl p-7 md:p-10">
          <div className="absolute -top-16 -right-16 w-56 h-56 bg-primary/8 rounded-full blur-3xl pointer-events-none" />
          <div className="relative grid lg:grid-cols-[0.72fr_1.28fr] gap-7 lg:gap-10 items-center">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-primary/8 flex items-center justify-center mb-4"><GraduationCap className="w-6 h-6 text-primary" /></div>
              <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-primary mb-2">Una invitación docente</div>
              <h2 className="font-display font-extrabold text-text text-2xl md:text-3xl tracking-tight leading-tight">No persigas la IA. Persigue evidencia de comprensión.</h2>
            </div>
            <div>
              <p className="text-text-light text-sm md:text-base leading-relaxed mb-5">Intentar adivinar si cada frase fue escrita por una máquina convierte el aula en una investigación permanente y desplaza la conversación que sí importa. Define usos permitidos, pide transparencia y conversa sobre el proceso. Después evalúa si el estudiante puede explicar, verificar, cuestionar, revisar y transferir lo que presenta.</p>
              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  { icon: ShieldCheck, label: 'Acordar', body: 'Qué usos de IA están permitidos y cómo se declaran.' },
                  { icon: MessageSquareText, label: 'Preguntar', body: 'Qué decidió, qué verificó y qué cambió el estudiante.' },
                  { icon: CheckCircle2, label: 'Comprobar', body: 'Qué puede explicar o transferir sin depender del producto.' },
                ].map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.label} className="bg-text/[0.025] border border-border rounded-xl p-3">
                      <Icon className="w-4 h-4 text-accent mb-2" />
                      <div className="text-xs font-bold text-text mb-1">{item.label}</div>
                      <p className="text-[11px] text-text-light leading-relaxed">{item.body}</p>
                    </div>
                  )
                })}
              </div>
              <div className="mt-5 flex items-start gap-2 text-xs text-text-lighter leading-relaxed">
                <Lightbulb className="w-4 h-4 text-warm mt-0.5 shrink-0" />
                La pregunta no es “¿usó IA?”, sino “¿qué aprendió, qué puede sostener y cómo usó la herramienta con responsabilidad?”.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
