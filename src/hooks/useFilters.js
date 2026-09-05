import { useSearchParams } from 'react-router-dom'
import tools from '../data/tools.json'

export function useFilters(sourceTools = null) {
  const [params, setParams] = useSearchParams()
  const selectedCategories = (params.get('categoria') || '').split(',').filter(Boolean)
  const selectedPricing = (params.get('precio') || '').split(',').filter(Boolean)
  const selectedDifficulty = (params.get('nivel') || '').split(',').filter(Boolean).map(Number)
  const minRating = Math.max(0, Math.min(5, Number(params.get('rating')) || 0))
  const base = sourceTools || tools
  const filtered = base.filter(
    (tool) =>
      (!selectedCategories.length || tool.categories.some((c) => selectedCategories.includes(c))) &&
      (!selectedPricing.length || selectedPricing.includes(tool.pricing)) &&
      (!selectedDifficulty.length || selectedDifficulty.includes(tool.difficulty)) &&
      tool.rating >= minRating
  )
  const toggle = (key, value) =>
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        const current = (next.get(key) || '').split(',').filter(Boolean)
        const updated = current.includes(String(value))
          ? current.filter((item) => item !== String(value))
          : [...current, String(value)]
        if (updated.length) next.set(key, updated.join(','))
        else next.delete(key)
        return next
      },
      { replace: true }
    )
  const clearFilters = () =>
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        for (const key of ['categoria', 'precio', 'nivel', 'rating']) next.delete(key)
        return next
      },
      { replace: true }
    )
  return {
    filtered,
    selectedCategories,
    selectedPricing,
    selectedDifficulty,
    minRating,
    toggleCategory: (value) => toggle('categoria', value),
    togglePricing: (value) => toggle('precio', value),
    toggleDifficulty: (value) => toggle('nivel', value),
    setMinRating: (value) =>
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev)
          if (value) next.set('rating', value)
          else next.delete('rating')
          return next
        },
        { replace: true }
      ),
    clearFilters,
    hasActiveFilters: !!(
      selectedCategories.length ||
      selectedPricing.length ||
      selectedDifficulty.length ||
      minRating
    ),
  }
}
