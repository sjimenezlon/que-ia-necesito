export const normalizeCaseSearch = (value) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()

export function filterBusinessCases(exercises, { collection, country, sector, query }) {
  const search = normalizeCaseSearch(query)
  return exercises.filter(
    (item) =>
      item.collection === collection &&
      (!country || item.country === country) &&
      (!sector || item.sector === sector) &&
      normalizeCaseSearch(
        [
          item.title,
          item.business,
          item.city,
          item.country,
          item.channel,
          item.pain,
          item.area,
          item.outcome,
        ]
          .filter(Boolean)
          .join(' ')
      ).includes(search)
  )
}
