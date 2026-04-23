import { ChevronLeft, ChevronRight, Package, Landmark } from 'lucide-react'

export default function TaskStep({ task, setTask, subtasks, setSubtasks, example, setExample, product, setProduct, domainData, isPublico, onNext, onPrev }) {
  return (
    <div>
      <div className="mb-6">
        <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">Paso 3 — Requerimiento</p>
        <h2 className="text-xl font-bold text-text mb-1">¿Qué necesitas que haga la IA?</h2>
        <p className="text-sm text-text-light">Describe la tarea concreta. <span className="text-text font-medium">Primero define el producto</span>, luego el trabajo.</p>
      </div>

      {isPublico && (
        <div className="mb-5 rounded-xl border border-indigo-200 bg-indigo-50/60 p-4 flex items-start gap-3">
          <Landmark className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
          <div className="text-xs text-indigo-900 leading-relaxed">
            <span className="font-semibold">Sector público:</span> sé explícito con el entregable (memorando radicable,
            acta, ficha AIR, tabla comparativa de ofertas, boletín ciudadano en lenguaje claro). El tono institucional,
            las citas normativas y la trazabilidad se negocian en el paso de <span className="font-semibold">Filtros</span>.
          </div>
        </div>
      )}

      <div className="space-y-5">
        <div className="rounded-2xl border border-accent/30 bg-accent/5 p-4">
          <label className="flex items-center gap-2 text-sm font-semibold text-text mb-1">
            <Package className="w-4 h-4 text-accent" />
            Producto esperado
            <span className="text-[10px] bg-accent/15 text-accent px-1.5 py-0.5 rounded font-bold uppercase tracking-[0.1em]">Clave</span>
          </label>
          <p className="text-xs text-text-lighter italic mb-2">
            {domainData?.productHint || 'Ej: "Documento de 2 páginas", "Tabla comparativa con 4 columnas", "Borrador de correo de 150 palabras", "Guion de video de 60 segundos"'}
          </p>
          <textarea
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            rows={2}
            placeholder="Describe el entregable concreto: tipo de documento, extensión aproximada, formato, propósito..."
            className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-sm text-text placeholder:text-text-lighter focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 resize-y"
          />
        </div>

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
