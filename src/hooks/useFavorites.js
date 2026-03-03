import { useState, useCallback } from 'react'

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('fav-tools') || '[]')
    } catch {
      return []
    }
  })

  const toggle = useCallback((id) => {
    setFavorites((prev) => {
      const next = prev.includes(id)
        ? prev.filter((fid) => fid !== id)
        : [...prev, id]
      localStorage.setItem('fav-tools', JSON.stringify(next))
      return next
    })
  }, [])

  const isFavorite = useCallback((id) => favorites.includes(id), [favorites])

  return { favorites, toggle, isFavorite }
}
