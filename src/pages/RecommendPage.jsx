import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import RecommendationFlow from '../components/RecommendationFlow'

export default function RecommendPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Link
        to="/"
        className="inline-flex items-center gap-1 text-text-light text-sm mb-6 no-underline hover:text-primary transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver al inicio
      </Link>

      <RecommendationFlow />
    </div>
  )
}
