export const SITE_URL = 'https://queianecesitas.dev'

export function exampleUrl(id) {
  return `${SITE_URL}/ejemplos?caso=${encodeURIComponent(id)}`
}
