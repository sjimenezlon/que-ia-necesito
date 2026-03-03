import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function TaskStep({ task, setTask, subtasks, setSubtasks, example, setExample, domainData, onNext, onPrev }) {
  return (
    <div>
      <div className="mb-6">
        <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">Paso 3 — Requerimiento</p>
        <h2 className="text-xl font-bold text-text mb-1">¿Qué necesitas que haga la IA?</h2>
        <p className="text-sm text-text-light">Describe la tarea concreta. Sé específico: los verbos de acción marcan la diferencia.</p>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-text mb-1">Tarea principal</label>
          <p className="text-xs text-text-lighter italic mb-2">{domainData?.taskHint}</p>
          <textarea
            value={task}
            onChange={(e) => setTask(e.target.value)}
            rows={4}
            placeholder="Describe exactamente lo que necesitas que la IA produzca..."
            className="w-full px-4 py-3 rounded-xl border border-border text-sm text-text placeholder:text-text-lighter focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 resize-y"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-1">Subtareas o pasos esperados <span className="text-text-lighter font-normal">(opcional)</span></label>
          <textarea
            value={subtasks}
            onChange={(e) => setSubtasks(e.target.value)}
            rows={3}
            placeholder={"1. Primero investigar...\n2. Luego comparar...\n3. Finalmente producir..."}
            className="w-full px-4 py-3 rounded-xl border border-border text-sm text-text placeholder:text-text-lighter focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 resize-y"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-1">Ejemplo de resultado deseado <span className="text-text-lighter font-normal">(opcional)</span></label>
          <textarea
            value={example}
            onChange={(e) => setExample(e.target.value)}
            rows={3}
            placeholder="Ej: Similar a como lo haría The Economist en sus análisis de tendencias tecnológicas..."
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
