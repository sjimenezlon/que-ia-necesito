import { ChevronRight } from 'lucide-react'

export default function DomainSelector({ domains, domain, setDomain, canNext, onNext }) {
  return (
    <div>
      <div className="mb-6">
        <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">Paso 1 — Dominio</p>
        <h2 className="text-xl font-bold text-text mb-1">¿En qué área vas a trabajar?</h2>
        <p className="text-sm text-text-light">Selecciona el dominio para personalizar la estructura del prompt.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {domains.map((d) => {
          const Icon = d.icon
          return (
            <button
              key={d.id}
              type="button"
              onClick={() => setDomain(d.id)}
              className={`text-left p-4 rounded-xl border-2 transition-all cursor-pointer bg-surface ${
                domain === d.id
                  ? 'border-primary shadow-sm'
                  : 'border-border hover:border-primary/30'
              }`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${d.color.split(' ').slice(0, 1).join(' ')}`}>
                <Icon className={`w-5 h-5 ${d.color.split(' ')[1]}`} />
              </div>
              <p className="font-semibold text-text text-sm mb-1">{d.label}</p>
              <p className="text-xs text-text-lighter leading-relaxed">{d.desc}</p>
            </button>
          )
        })}
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={onNext}
          disabled={!canNext}
          className="inline-flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl font-medium cursor-pointer hover:bg-primary/90 transition-colors border-none text-sm disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Continuar <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
