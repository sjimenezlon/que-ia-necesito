import { useEffect, useRef } from 'react'

/**
 * Reveal a single element when it enters the viewport.
 * Returns a ref to attach to the target element.
 * The element should have className "scroll-reveal".
 */
export function useScrollReveal(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed')
          observer.unobserve(el)
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px', ...options }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}

/**
 * Reveal children of a container with staggered delays.
 * Returns a ref to attach to the parent grid/container.
 * Each child should have className "scroll-reveal".
 */
export function useStaggerReveal(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const container = ref.current
    if (!container) return

    const children = container.querySelectorAll('.scroll-reveal')
    if (!children.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target
            const index = Array.from(children).indexOf(el)
            const delay = index * 80
            el.style.transitionDelay = `${delay}ms`
            el.classList.add('revealed')
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.05, rootMargin: '0px 0px -20px 0px', ...options }
    )

    children.forEach((child) => observer.observe(child))
    return () => observer.disconnect()
  }, [])

  return ref
}
