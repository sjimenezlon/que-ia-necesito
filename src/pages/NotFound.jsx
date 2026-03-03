import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto px-4 py-20 text-center">
      <div className="w-20 h-20 bg-primary/8 rounded-2xl flex items-center justify-center mx-auto mb-6">
        <span className="text-4xl">🤖</span>
      </div>
      <h1 className="text-3xl font-bold text-text mb-3 tracking-tight">
        Página no encontrada
      </h1>
      <p className="text-text-light mb-8">
        La página que buscas no existe o fue movida. Vuelve al inicio para seguir explorando herramientas de IA.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-text text-white px-6 py-3 rounded-xl font-semibold no-underline hover:bg-text/90 hover:shadow-md active:scale-[0.98] transition-all duration-200 text-sm"
      >
        <Home className="w-4 h-4" />
        Volver al inicio
      </Link>
    </div>
  )
}
