import { ChevronLeft, ChevronRight } from 'lucide-react'

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

const TONE_OPTIONS = ['Profesional', 'Conversacional', 'Académico', 'Persuasivo', 'Técnico', 'Inspirador', 'Directo', 'Humorístico', 'Poético', 'Periodístico', 'Minimalista', 'Provocador']

export default function ToneStyleStep({ tones, toggleTone, lang, setLang, complexity, setComplexity, styleRef, setStyleRef, onNext, onPrev }) {
  return (
    <div>
      <div className="mb-6">
        <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">Paso 4 — Tono y Estilo</p>
        <h2 className="text-xl font-bold text-text mb-1">¿Cómo debe sonar el resultado?</h2>
        <p className="text-sm text-text-light">Define la voz, el registro y la personalidad del output.</p>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-text mb-2">Tono general</label>
          <div className="flex flex-wrap gap-2">
            {TONE_OPTIONS.map((t) => (
              <Chip key={t} label={t} selected={tones.includes(t)} onClick={() => toggleTone(t)} />
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-1">Idioma de salida</label>
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-border text-sm text-text bg-surface focus:outline-none focus:border-primary cursor-pointer appearance-none"
          >
            <option value="español">Español</option>
            <option value="inglés">Inglés</option>
            <option value="portugués">Portugués</option>
            <option value="francés">Francés</option>
            <option value="bilingüe español-inglés">Bilingüe (Español-Inglés)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-1">Nivel de complejidad</label>
          <select
            value={complexity}
            onChange={(e) => setComplexity(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-border text-sm text-text bg-surface focus:outline-none focus:border-primary cursor-pointer appearance-none"
          >
            <option value="básico">Básico — Para audiencias generales</option>
            <option value="intermedio">Intermedio — Conocimiento previo del tema</option>
            <option value="avanzado">Avanzado — Público experto o especializado</option>
            <option value="técnico">Técnico — Lenguaje de especialista</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-1">Referencia de estilo <span className="text-text-lighter font-normal">(opcional)</span></label>
          <input
            type="text"
            value={styleRef}
            onChange={(e) => setStyleRef(e.target.value)}
            placeholder="Ej: El estilo editorial de The New York Times, la comunicación de Apple..."
            className="w-full px-4 py-3 rounded-xl border border-border text-sm text-text placeholder:text-text-lighter focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
          />
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <button onClick={onPrev} className="inline-flex items-center gap-1 text-text-light hover:text-text text-sm cursor-pointer bg-transparent border-none font-medium">
          <ChevronLeft className="w-4 h-4" /> Atrás
        </button>
        <button onClick={onNext} className="inline-flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl font-medium cursor-pointer hover:bg-primary/90 transition-colors border-none text-sm">
          Continuar <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
