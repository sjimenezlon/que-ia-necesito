import { useNavigate } from 'react-router-dom'
import { Sparkles, Compass } from 'lucide-react'
import SearchBar from './SearchBar'
import CategoryGrid from './CategoryGrid'

export default function Hero({ query, onQueryChange, results }) {
  const navigate = useNavigate()

  const hasQuery = query.length > 0

  return (
    <section
      className={`relative px-4 hero-gradient noise-overlay overflow-x-clip transition-[padding] duration-300 ease-out ${
        hasQuery ? 'py-8 md:py-14' : 'py-16 md:py-28'
      }`}
    >
      {/* Dot pattern overlay */}
      <div className="absolute inset-0 dot-pattern pointer-events-none" />

      {/* Decorative blobs */}
      <div className="absolute top-20 -left-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-48 h-48 bg-warm/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center">
        <div
          className={`inline-flex items-center gap-2 bg-primary/8 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-8 animate-fade-in border border-primary/10 transition-all duration-300 ${
            hasQuery ? 'opacity-0 max-h-0 !mb-0 pointer-events-none' : 'opacity-100 max-h-12'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          Más de 80 herramientas de IA curadas
        </div>

        <h1
          className={`font-extrabold text-text leading-[1.08] tracking-tight animate-slide-up transition-all duration-300 ${
            hasQuery
              ? 'text-2xl sm:text-3xl md:text-4xl mb-3'
              : 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-5'
          }`}
        >
          ¿Qué <span className="text-gradient-primary">IA</span> necesitas?
        </h1>

        <div
          className={`overflow-hidden transition-all duration-300 ease-out ${
            hasQuery ? 'max-h-0 opacity-0' : 'max-h-24 opacity-100 mb-10'
          }`}
        >
          <p className="text-text-light text-lg md:text-xl max-w-2xl mx-auto leading-relaxed animate-slide-up"
            style={{ animationDelay: '80ms' }}
          >
            Describe lo que quieres hacer y te recomendamos la herramienta perfecta.
            <span className="text-text-lighter"> Sin jerga, sin complicaciones.</span>
          </p>
        </div>

        <div className="relative z-30 flex justify-center mb-6 animate-slide-up" style={{ animationDelay: '160ms' }}>
          <SearchBar value={query} onChange={onQueryChange} large hasResults={results.length > 0} />
        </div>

        <div
          className={`relative z-10 overflow-hidden transition-all duration-300 ease-out ${
            hasQuery ? 'max-h-0 opacity-0 pointer-events-none' : 'max-h-28 opacity-100 mb-14'
          }`}
        >
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-slide-up"
            style={{ animationDelay: '240ms' }}
          >
            <button
              onClick={() => navigate('/recomendador')}
              className="inline-flex items-center gap-2 bg-text text-white px-6 py-3.5 rounded-xl font-semibold cursor-pointer hover:bg-text/90 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 border-none text-sm"
            >
              <Compass className="w-4 h-4" />
              Guíame paso a paso
            </button>
            <button
              onClick={() => navigate('/prompt-lab')}
              className="inline-flex items-center gap-2 bg-surface text-text border border-border px-6 py-3.5 rounded-xl font-semibold cursor-pointer hover:border-primary/40 hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-sm"
            >
              <Sparkles className="w-4 h-4 text-warm" />
              Mejora tus prompts
            </button>
          </div>
        </div>

        <div
          className={`relative z-10 overflow-hidden transition-all duration-300 ease-out ${
            hasQuery ? 'max-h-0 opacity-0 pointer-events-none' : 'max-h-[600px] opacity-100 mt-4'
          }`}
        >
          <div className="animate-slide-up" style={{ animationDelay: '320ms' }}>
            <h2 className="text-xs font-semibold text-text-lighter uppercase tracking-[0.15em] mb-5">
              Explora por categoría
            </h2>
            <CategoryGrid />
          </div>
        </div>
      </div>
    </section>
  )
}
