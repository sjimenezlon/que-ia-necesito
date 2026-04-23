import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function ContextRoleStep({ role, setRole, audience, setAudience, context, setContext, domainData, onNext, onPrev }) {
  return (
    <div>
      <div className="mb-6">
        <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">Paso 2 — Contexto y Rol</p>
        <h2 className="text-xl font-bold text-text mb-1">Define el escenario</h2>
        <p className="text-sm text-text-light">Establece quién eres, para quién y en qué contexto se ejecutará la tarea.</p>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-text mb-1">¿Qué rol debe asumir la IA?</label>
          <p className="text-xs text-text-lighter italic mb-2">{domainData?.roleHint}</p>
          <textarea
            value={role}
            onChange={(e) => setRole(e.target.value)}
            rows={3}
            placeholder="Describe el rol, la experiencia y la especialidad..."
            className="w-full px-4 py-3 rounded-xl border border-border text-sm text-text placeholder:text-text-lighter focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 resize-y"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-1">¿Quién es la audiencia o destinatario?</label>
          {domainData?.audienceHint && (
            <p className="text-xs text-text-lighter italic mb-2">{domainData.audienceHint}</p>
          )}
          <textarea
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            rows={2}
            placeholder="Ej: Emprendedores de 25-35 años en Latinoamérica que están lanzando su primer producto digital..."
            className="w-full px-4 py-3 rounded-xl border border-border text-sm text-text placeholder:text-text-lighter focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 resize-y"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-1">Contexto adicional relevante</label>
          <textarea
            value={context}
            onChange={(e) => setContext(e.target.value)}
            rows={2}
            placeholder="Ej: Estamos en fase de lanzamiento, el presupuesto es limitado, la marca aún no es conocida..."
            className="w-full px-4 py-3 rounded-xl border border-border text-sm text-text placeholder:text-text-lighter focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 resize-y"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-2">Plantillas rápidas de rol</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {domainData?.roleTemplates.map((t) => (
              <button
                key={t.title}
                type="button"
                onClick={() => setRole(`Eres un ${t.title.toLowerCase()}. ${t.desc}`)}
                className="text-left p-3 rounded-lg border border-border bg-surface hover:border-primary/30 hover:bg-primary/5 transition-colors cursor-pointer"
              >
                <p className="text-sm font-medium text-text">{t.title}</p>
                <p className="text-xs text-text-lighter">{t.desc}</p>
              </button>
            ))}
          </div>
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
