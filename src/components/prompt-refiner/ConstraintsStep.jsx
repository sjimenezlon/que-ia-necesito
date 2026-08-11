import { ChevronLeft, Sparkles, ShieldCheck, Gauge } from 'lucide-react'

function Chip({ label, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs font-medium border cursor-pointer transition-colors ${
        selected
          ? 'bg-primary/10 border-primary text-primary'
          : 'bg-surface border-border text-text-light hover:border-primary/50'
      }`}
    >
      {label}
    </button>
  )
}

const QUALITY_OPTIONS = ['Originalidad', 'Precisión factual', 'Trazabilidad de fuentes', 'Coherencia lógica', 'Aplicabilidad práctica', 'Creatividad', 'Profundidad analítica', 'Claridad', 'Concisión']

const EFFORT_OPTIONS = [
  { value: 'auto', label: 'Automático — Que el modelo decida (recomendado)' },
  { value: 'bajo', label: 'Bajo — Tarea sencilla, prima la velocidad' },
  { value: 'medio', label: 'Medio — Verifica coherencia antes de responder' },
  { value: 'alto', label: 'Alto — Problema difícil, que lo mire por varios ángulos' },
]

const AI_TOOLS = [
  { value: 'universal', label: 'Universal — Compatible con cualquier IA' },
  { value: 'claude', label: 'Claude (Opus 5 / Sonnet 5)' },
  { value: 'chatgpt', label: 'ChatGPT (GPT-5.6 Luna / Terra / Sol)' },
  { value: 'gemini', label: 'Gemini (3.6 Flash / 3.1 Pro)' },
  { value: 'perplexity', label: 'Perplexity — Búsqueda con fuentes' },
  { value: 'grok', label: 'Grok 4.5 — Actualidad en tiempo real' },
  { value: 'abiertos', label: 'Modelos abiertos (Kimi K3, DeepSeek V4, GLM, Qwen)' },
  { value: 'agentes', label: 'Agentes de código (Claude Code, Codex, Cursor)' },
  { value: 'appbuilders', label: 'Constructores de apps (Lovable, v0, Bolt)' },
  { value: 'imagen', label: 'Imagen (GPT Image 2, Nano Banana Pro, Midjourney)' },
  { value: 'video', label: 'Video (Veo 3.1, Kling, Seedance, Sora)' },
]

export default function ConstraintsStep({ avoid, setAvoid, quality, toggleQuality, effort, setEffort, allowUncertainty, setAllowUncertainty, aiTool, setAiTool, onPrev, onGenerate, isPublico, constraintsHint }) {
  return (
    <div>
      <div className="mb-6">
        <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">Paso 6 — Filtros y Resultado</p>
        <h2 className="text-xl font-bold text-text mb-1">Restricciones y generación final</h2>
        <p className="text-sm text-text-light">Agrega lo que la IA debe evitar, los criterios de calidad y cuánto esfuerzo quieres que dedique.</p>
      </div>

      {isPublico && (
        <div className="mb-5 rounded-xl border border-primary/25 bg-primary/5 p-4 flex items-start gap-3">
          <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <div className="text-xs text-text leading-relaxed">
            <span className="font-semibold">Checklist sector público:</span> activa "Precisión factual" y agrega en Evitar
            → <span className="italic">"No inventar números de sentencia, radicado ni artículos de ley. Si un dato no
            está en las fuentes, decirlo."</span> Toda cita jurídica debe verificarse contra la fuente original antes de firmar.
          </div>
        </div>
      )}

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-text mb-1">¿Qué debe EVITAR la IA?</label>
          {constraintsHint && (
            <p className="text-xs text-text-lighter italic mb-2">{constraintsHint}</p>
          )}
          <textarea
            value={avoid}
            onChange={(e) => setAvoid(e.target.value)}
            rows={3}
            placeholder="Ej: Evitar jerga técnica innecesaria, no usar clichés de marketing, no inventar datos estadísticos..."
            className="w-full px-4 py-3 rounded-xl border border-border text-sm text-text placeholder:text-text-lighter focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 resize-y"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-2">Criterios de calidad</label>
          <div className="flex flex-wrap gap-2">
            {QUALITY_OPTIONS.map((q) => (
              <Chip key={q} label={q} selected={quality.includes(q)} onClick={() => toggleQuality(q)} />
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-accent/30 bg-accent/5 p-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={allowUncertainty}
              onChange={(e) => setAllowUncertainty(e.target.checked)}
              className="mt-0.5 w-4 h-4 accent-[var(--color-accent)] cursor-pointer shrink-0"
            />
            <span>
              <span className="block text-sm font-semibold text-text">Darle permiso de decir «no sé»</span>
              <span className="block text-xs text-text-light leading-relaxed mt-0.5">
                Agrega al prompt la instrucción de marcar lo que no puede verificar, separar dato de inferencia y
                enumerar los supuestos al final. Es la línea que más alucinaciones evita.
              </span>
            </span>
          </label>
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-text mb-1">
            <Gauge className="w-4 h-4 text-primary" />
            Esfuerzo de razonamiento
          </label>
          <p className="text-xs text-text-lighter italic mb-2">
            Los modelos de 2026 (Opus 5, GPT-5.6 Sol, Grok 4.5) traen su propio dial de esfuerzo. Deja "automático"
            salvo que sepas que la tarea es trivial o especialmente dura.
          </p>
          <select
            value={effort}
            onChange={(e) => setEffort(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-border text-sm text-text bg-surface focus:outline-none focus:border-primary cursor-pointer appearance-none"
          >
            {EFFORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-1">¿Para qué herramienta de IA es este prompt?</label>
          <select
            value={aiTool}
            onChange={(e) => setAiTool(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-border text-sm text-text bg-surface focus:outline-none focus:border-primary cursor-pointer appearance-none"
          >
            {AI_TOOLS.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <button onClick={onPrev} className="inline-flex items-center gap-1 text-text-light hover:text-text text-sm cursor-pointer bg-transparent border-none font-medium">
          <ChevronLeft className="w-4 h-4" /> Atrás
        </button>
        <button
          onClick={onGenerate}
          className="inline-flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl font-medium cursor-pointer hover:bg-primary/90 transition-colors border-none text-sm"
        >
          <Sparkles className="w-4 h-4" /> Generar prompt refinado
        </button>
      </div>
    </div>
  )
}
