import { X } from 'lucide-react'
import { getCategoryInfo } from '../utils/recommender'

const pricingLabels = {
  gratis: 'Gratis',
  freemium: 'Freemium',
  pago: 'De pago',
}

const difficultyLabels = {
  1: 'Principiante',
  2: 'Intermedio',
  3: 'Avanzado',
}

export default function SearchContextChips({ meta, onRemove }) {
  if (!meta || !meta.hasStrongIntent) return null

  const chips = []

  for (const cat of meta.detectedCategories) {
    const info = getCategoryInfo(cat)
    if (info) {
      chips.push({ type: 'category', value: cat, label: info.label })
    }
  }

  if (meta.pricingHint) {
    chips.push({ type: 'pricing', value: meta.pricingHint, label: pricingLabels[meta.pricingHint] || meta.pricingHint })
  }

  if (meta.difficultyHint) {
    chips.push({ type: 'difficulty', value: meta.difficultyHint, label: difficultyLabels[meta.difficultyHint] || `Nivel ${meta.difficultyHint}` })
  }

  if (chips.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {chips.map((chip) => (
        <span
          key={`${chip.type}-${chip.value}`}
          className="inline-flex items-center gap-1.5 bg-primary/8 text-primary text-xs font-medium px-3 py-1.5 rounded-full border border-primary/15"
        >
          {chip.label}
          <button
            onClick={() => onRemove(chip.type, chip.value)}
            className="p-0.5 rounded-full hover:bg-primary/15 bg-transparent border-none cursor-pointer transition-colors"
            aria-label={`Quitar filtro ${chip.label}`}
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}
    </div>
  )
}
