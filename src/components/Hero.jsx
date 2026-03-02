import { useNavigate } from 'react-router-dom'
import { Sparkles } from 'lucide-react'
import SearchBar from './SearchBar'
import CategoryGrid from './CategoryGrid'

export default function Hero({ query, onQueryChange, results }) {
  const navigate = useNavigate()

  return (
    <section className="py-12 md:py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6">
          <Sparkles className="w-4 h-4" />
          Más de 80 herramientas de IA
        </div>

        <h1 className="text-3xl md:text-5xl font-bold text-text mb-4 leading-tight">
          ¿Qué IA necesitas?
        </h1>
        <p className="text-text-light text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Describe lo que quieres hacer y te recomendamos la herramienta perfecta. Sin jerga, sin complicaciones.
        </p>

        <div className="flex justify-center mb-6">
          <SearchBar value={query} onChange={onQueryChange} large />
        </div>

        {!query && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
            <button
              onClick={() => navigate('/recomendador')}
              className="inline-flex items-center gap-2 bg-secondary text-white px-6 py-3 rounded-xl font-medium cursor-pointer hover:bg-secondary-dark transition-colors border-none text-sm"
            >
              No sé qué buscar, guíame paso a paso
            </button>
            <button
              onClick={() => navigate('/prompt-lab')}
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-medium cursor-pointer hover:bg-primary/90 transition-colors border-none text-sm"
            >
              <Sparkles className="w-4 h-4" />
              Aprende a hacer mejores prompts
            </button>
          </div>
        )}

        {!query && (
          <div className="mt-8">
            <h2 className="text-sm font-semibold text-text-lighter uppercase tracking-wider mb-4">
              Explora por categoría
            </h2>
            <CategoryGrid />
          </div>
        )}
      </div>
    </section>
  )
}
