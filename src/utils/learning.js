export function readProgress(key, fallback, validate = () => true) {
  try {
    const value = JSON.parse(localStorage.getItem(key))
    return value && validate(value) ? value : fallback
  } catch {
    return fallback
  }
}

export function saveProgress(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

export function downloadText(name, text) {
  const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }))
  const link = document.createElement('a')
  link.href = url
  link.download = name
  document.body.appendChild(link)
  link.click()
  link.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

export function calculatePilot({ before, after, weekly, hourly, cost }) {
  const inputs = [before, after, weekly, hourly, cost]
  if (inputs.some((value) => value === '' || !Number.isFinite(Number(value)) || Number(value) < 0))
    return null
  const hours = ((Number(before) - Number(after)) * Number(weekly) * 4) / 60
  const capacity = hours * Number(hourly) - Number(cost)
  return Number.isFinite(hours) && Number.isFinite(capacity) ? { hours, capacity } : null
}
