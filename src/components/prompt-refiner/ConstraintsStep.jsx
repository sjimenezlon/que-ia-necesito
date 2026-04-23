import { ChevronLeft, Sparkles, ShieldCheck } from 'lucide-react'

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

const QUALITY_OPTIONS = ['Originalidad', 'Precisión factual', 'Coherencia lógica', 'Aplicabilidad práctica', 'Creatividad', 'Profundidad analítica', 'Claridad', 'Concisión']

export default function ConstraintsStep({ avoid, setAvoid, quality, toggleQuality, aiTool, setAiTool, onPrev, onGenerate, isPublico, constraintsHint }) {
  return (
    <div>
      <div className="mb-6">
        <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">Paso 6 — Filtros y Resultado</p>
        <h2 className="text-xl font-bold text-text mb-1">Restricciones y generación final</h2>
        <p className="text-sm text-text-light">Agrega lo que la IA debe evitar, criterios de calidad y genera tu prompt refinado.</p>
      </div>

      {isPublico && (
        <div className="mb-5 rounded-xl border border-indigo-200 bg-indigo-50/60 p-4 flex items-start gap-3">
          <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
          <div className="text-xs text-indigo-900 leading-relaxed">
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

        <div>
          <label className="block text-sm font-medium text-text mb-1">¿Para qué herramienta de IA es este prompt?</label>
          <select
            value={aiTool}
            onChange={(e) => setAiTool(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-border text-sm text-text bg-surface focus:outline-none focus:border-primary cursor-pointer appearance-none"
          >
            <option value="universal">Universal — Compatible con cualquier IA</option>
            <option value="claude">Claude (Anthropic)</option>
            <option value="chatgpt">ChatGPT (OpenAI)</option>
            <option value="gemini">Gemini (Google)</option>
            <option value="perplexity">Perplexity</option>
            <option value="lovable">Lovable / v0 / Bolt (constructores de apps)</option>
            <option value="midjourney">Midjourney / DALL-E (imagen)</option>
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
