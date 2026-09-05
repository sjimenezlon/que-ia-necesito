import { useState, useEffect } from 'react'
import { getToolById } from '../utils/recommender'

export function useCompare() {
  const [ids, setIds] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('compare-tools') || '[]')
      return Array.isArray(stored)
        ? [...new Set(stored)].filter((id) => typeof id === 'string' && getToolById(id)).slice(0, 3)
        : []
    } catch {
      return []
    }
  })
  const [message, setMessage] = useState('')
  useEffect(() => {
    try {
      localStorage.setItem('compare-tools', JSON.stringify(ids))
    } catch {
      /* Still usable without storage. */
    }
  }, [ids])
  const toggle = (id) => {
    if (ids.includes(id)) {
      setIds(ids.filter((item) => item !== id))
      setMessage('Herramienta retirada del comparador.')
      return
    }
    if (ids.length === 3) {
      setMessage('El comparador tiene 3 herramientas. Quita una para añadir otra.')
      return
    }
    setIds([...ids, id])
    setMessage(`${getToolById(id)?.name} añadida al comparador.`)
  }
  const remove = (id) => {
    setIds((prev) => prev.filter((item) => item !== id))
    setMessage('Herramienta retirada del comparador.')
  }
  return { ids, toggle, remove, message }
}
