import { useState, useCallback } from 'react'

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('fav-tools') || '[]')
      return Array.isArray(stored) ? stored.filter((id) => typeof id === 'string') : []
    } catch {
      return []
    }
  })

  const toggle = useCallback((id) => {
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
      try {
        localStorage.setItem('fav-tools', JSON.stringify(next))
      } catch {
        /* Favorites remain available for this session. */
      }
      return next
    })
  }, [])

  const isFavorite = useCallback((id) => favorites.includes(id), [favorites])

  return { favorites, toggle, isFavorite }
}
