import { ChevronLeft, ChevronRight, Package, Landmark, FileStack } from 'lucide-react'

export default function TaskStep({ task, setTask, subtasks, setSubtasks, sources, setSources, example, setExample, product, setProduct, domainData, isPublico, onNext, onPrev }) {
  return (
    <div>
      <div className="mb-6">
        <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">Paso 3 — Requerimiento</p>
        <h2 className="text-xl font-bold text-text mb-1">¿Qué necesitas que haga la IA?</h2>
        <p className="text-sm text-text-light">Describe la tarea concreta. <span className="text-text font-medium">Primero define el producto</span>, luego el trabajo y con qué material lo hará.</p>
      </div>

      {isPublico && (
        <div className="mb-5 rounded-xl border border-primary/25 bg-primary/5 p-4 flex items-start gap-3">
          <Landmark className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <div className="text-xs text-text leading-relaxed">
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

        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4">
          <label className="flex items-center gap-2 text-sm font-semibold text-text mb-1">
            <FileStack className="w-4 h-4 text-primary" />
            Materia prima y fuentes
          </label>
          <p className="text-xs text-text-lighter italic mb-2">
            {domainData?.sourcesHint || 'Ej: el borrador anterior, los datos del último trimestre, el documento del cliente, la norma aplicable.'}
          </p>
          <textarea
            value={sources}
            onChange={(e) => setSources(e.target.value)}
            rows={3}
            placeholder="Enumera qué material vas a adjuntar o pegar, y cuál manda si dos fuentes se contradicen..."
            className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-sm text-text placeholder:text-text-lighter focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 resize-y"
          />
          <p className="text-[11px] text-text-lighter leading-relaxed mt-2">
            Con ventanas de un millón de tokens ya cabe el expediente completo: pegar el material rinde más que pulir
            adjetivos. Anonimiza datos personales antes de subirlos.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-1">Subtareas o pasos esperados <span className="text-text-lighter font-normal">(opcional)</span></label>
          <p className="text-xs text-text-lighter italic mb-2">
            Úsalo solo si el orden importa de verdad. El modelo ya sabe descomponer un problema: no le dictes cómo pensar.
          </p>
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
          <p className="text-xs text-text-lighter italic mb-2">
            Un ejemplo bien elegido enseña lo que un párrafo de instrucciones no logra explicar. Con uno suele bastar.
          </p>
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
