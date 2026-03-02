import { useParams } from 'react-router-dom'
import { getToolById } from '../utils/recommender'
import ToolDetail from '../components/ToolDetail'

export default function ToolDetailPage() {
  const { id } = useParams()
  const tool = getToolById(id)

  if (!tool) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-text-lighter text-lg">Herramienta no encontrada.</p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <ToolDetail tool={tool} />
    </div>
  )
}
