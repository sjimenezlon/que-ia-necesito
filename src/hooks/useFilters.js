import { useState, useMemo } from 'react'
import tools from '../data/tools.json'

export function useFilters(sourceTools = null) {
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedPricing, setSelectedPricing] = useState([])
  const [selectedDifficulty, setSelectedDifficulty] = useState([])
  const [minRating, setMinRating] = useState(0)

  const base = sourceTools || tools

  const filtered = useMemo(() => {
    return base.filter((tool) => {
      if (selectedCategories.length > 0) {
        const hasCategory = tool.categories.some((c) =>
          selectedCategories.includes(c)
        )
        if (!hasCategory) return false
      }
      if (selectedPricing.length > 0 && !selectedPricing.includes(tool.pricing)) {
        return false
      }
      if (
        selectedDifficulty.length > 0 &&
        !selectedDifficulty.includes(tool.difficulty)
      ) {
        return false
      }
      if (tool.rating < minRating) return false
      return true
    })
  }, [base, selectedCategories, selectedPricing, selectedDifficulty, minRating])

  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    )
  }

  const togglePricing = (p) => {
    setSelectedPricing((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    )
  }

  const toggleDifficulty = (d) => {
    setSelectedDifficulty((prev) =>
      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]
    )
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedPricing([])
    setSelectedDifficulty([])
    setMinRating(0)
  }

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedPricing.length > 0 ||
    selectedDifficulty.length > 0 ||
    minRating > 0

  return {
    filtered,
    selectedCategories,
    selectedPricing,
    selectedDifficulty,
    minRating,
    toggleCategory,
    togglePricing,
    toggleDifficulty,
    setMinRating,
    clearFilters,
    hasActiveFilters,
  }
}
