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

const FORMAT_OPTIONS = ['Texto corrido', 'Lista con viñetas', 'Tabla comparativa', 'Código fuente', 'JSON / Datos estructurados', 'Paso a paso', 'Presentación / Slides', 'Documento formal', 'Guion / Script', 'Email / Mensaje', 'Post para redes', 'Infografía textual']

export default function FormatStep({ formats, toggleFormat, length, setLength, sections, setSections, onNext, onPrev }) {
  return (
    <div>
      <div className="mb-6">
        <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">Paso 5 — Estructura</p>
        <h2 className="text-xl font-bold text-text mb-1">¿Qué forma debe tener el resultado?</h2>
        <p className="text-sm text-text-light">Especifica el formato, la extensión y la organización del output.</p>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-text mb-2">Formato de salida</label>
          <div className="flex flex-wrap gap-2">
            {FORMAT_OPTIONS.map((f) => (
              <Chip key={f} label={f} selected={formats.includes(f)} onClick={() => toggleFormat(f)} />
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-1">Extensión aproximada</label>
          <select
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-border text-sm text-text bg-surface focus:outline-none focus:border-primary cursor-pointer appearance-none"
          >
            <option value="breve (máximo 150 palabras)">Breve — Máximo 150 palabras</option>
            <option value="moderada (300-500 palabras)">Moderada — 300 a 500 palabras</option>
            <option value="extensa (800-1500 palabras)">Extensa — 800 a 1.500 palabras</option>
            <option value="muy extensa (más de 1500 palabras)">Muy extensa — Más de 1.500 palabras</option>
            <option value="la que sea necesaria para cubrir el tema">Flexible — Lo que sea necesario</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-1">Secciones o estructura interna <span className="text-text-lighter font-normal">(opcional)</span></label>
          <textarea
            value={sections}
            onChange={(e) => setSections(e.target.value)}
            rows={3}
            placeholder="Ej: Introducción, análisis de mercado, recomendaciones, conclusión con call-to-action..."
            className="w-full px-4 py-3 rounded-xl border border-border text-sm text-text placeholder:text-text-lighter focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 resize-y"
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
