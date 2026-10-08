import { useSearchParams } from 'react-router-dom'
import { ArrowRight, CheckCircle2, Clock3, MapPin, Search, SlidersHorizontal } from 'lucide-react'
import { exercises, sectors } from '../data/pymes'
import { filterBusinessCases } from '../utils/caseFinder'

const businessLabels = {
  Comercio: 'Tienda y comercio',
  Servicios: 'Servicios',
  'Alimentos y turismo': 'Comida y turismo',
  Manufactura: 'Taller y manufactura',
  'Agro y producción rural': 'Agro y rural',
}

export default function BusinessCaseFinder({ selectedId, completedIds, onChoose }) {
  const [params, setParams] = useSearchParams()
  const selected = exercises.find((item) => item.id === selectedId)
  const collection =
    params.get('biblioteca') === 'fundamentos'
      ? 'fundamentos'
      : params.get('biblioteca') === 'regional'
        ? 'regional'
        : selected?.collection || 'regional'
  const country = ['Colombia', 'Perú', 'México', 'Ecuador'].includes(params.get('pais'))
    ? params.get('pais')
    : ''
  const sector = sectors.includes(params.get('negocio')) ? params.get('negocio') : ''
  const query = params.get('buscar') || ''
  const cases = filterBusinessCases(exercises, {
    collection,
    country: collection === 'regional' ? country : '',
    sector: collection === 'regional' ? sector : '',
    query,
  })
  const setFilter = (key, value) =>
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        if (value) next.set(key, value)
        else next.delete(key)
        return next
      },
      { replace: true }
    )
  const clear = () =>
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        ;['pais', 'negocio', 'buscar'].forEach((key) => next.delete(key))
        return next
      },
      { replace: true }
    )

  return (
    <section id="talleres" className="lab-container lab-section" aria-labelledby="workshops-title">
      <div className="lab-section-heading">
        <div>
          <span className="lab-kicker">01 / Un ejemplo que se parezca a tu día a día</span>
          <h2 id="workshops-title">¿En qué negocio estás pensando?</h2>
          <p>Elige una situación. Mira el resultado de referencia o haz la práctica paso a paso.</p>
        </div>
        <span className="lab-counter">8 casos locales + 6 fundamentos</span>
      </div>
      <div className="case-library-switch" aria-label="Tipo de ejercicios">
        {[
          ['regional', 'Colombia y Latinoamérica'],
          ['fundamentos', 'Fundamentos para cualquier negocio'],
        ].map(([id, label]) => (
          <button
            key={id}
            aria-pressed={collection === id}
            onClick={() => setFilter('biblioteca', id)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="case-search-row">
        <label className="case-search">
          <span className="sr-only">Buscar un caso de negocio</span>
          <Search size={18} aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setFilter('buscar', e.target.value)}
            placeholder="Prueba: pedidos, panadería, caja, WhatsApp…"
            maxLength={100}
          />
        </label>
        {collection === 'regional' && (
          <label className="case-country">
            <span>País del ejemplo</span>
            <select value={country} onChange={(e) => setFilter('pais', e.target.value)}>
              <option value="">Todos los países</option>
              {['Colombia', 'Perú', 'México', 'Ecuador'].map((value) => (
                <option key={value}>{value}</option>
              ))}
            </select>
          </label>
        )}
      </div>
      {collection === 'regional' && (
        <div className="lab-filters" aria-label="Filtrar por tipo de negocio">
          <button aria-pressed={!sector} onClick={() => setFilter('negocio', '')}>
            Todos los negocios
          </button>
          {sectors.map((value) => (
            <button
              key={value}
              aria-pressed={sector === value}
              onClick={() => setFilter('negocio', value)}
            >
              {businessLabels[value]}
            </button>
          ))}
        </div>
      )}
      <div className="case-result-count">
        <p role="status">
          {cases.length} {cases.length === 1 ? 'ejemplo disponible' : 'ejemplos disponibles'}
          {country && collection === 'regional' ? ` en ${country}` : ''}
        </p>
        {(country || sector || query) && (
          <button className="lab-text-button" onClick={clear}>
            Limpiar filtros
          </button>
        )}
      </div>
      {cases.length ? (
        <div className="lab-exercise-grid">
          {cases.map((item) => (
            <article
              className={`case-card ${selectedId === item.id ? 'selected' : ''}`}
              key={item.id}
            >
              <div className="lab-card-meta">
                <span>
                  {item.country ? (
                    <>
                      <MapPin size={13} />
                      {item.city}, {item.country}
                    </>
                  ) : (
                    item.area
                  )}
                </span>
                <span>
                  {completedIds.includes(item.id) ? (
                    <CheckCircle2 size={17} aria-label="Completado" />
                  ) : (
                    <Clock3 size={15} />
                  )}{' '}
                  {item.minutes} min
                </span>
              </div>
              <span className="case-business">{item.business || 'Práctica de fundamentos'}</span>
              <h3>{item.title}</h3>
              <p>{item.pain || item.outcome}</p>
              <div className="case-deliverable">
                <span>Te llevas</span>
                <p>{item.outcome}</p>
              </div>
              <div className="case-card-actions">
                <button
                  className="lab-text-button"
                  onClick={() => onChoose(item, 0)}
                  aria-label={`Ver ejemplo: ${item.title}`}
                >
                  Ver ejemplo <ArrowRight size={16} />
                </button>
                <span>{item.channel || item.area}</span>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="case-empty">
          <SlidersHorizontal size={26} />
          <h3>No hay un ejemplo con esta combinación.</h3>
          <p>Prueba otro país, un tipo de negocio más amplio o una palabra como «pedidos».</p>
          <button className="lab-primary" onClick={clear}>
            Mostrar todos los ejemplos
          </button>
        </div>
      )}
      <p className="lab-small case-fiction-note">
        Son situaciones y cifras ficticias para practicar, no empresas reales ni precios de mercado.
        Puedes adaptar el método a otro país conservando tu moneda y las condiciones de tu negocio.
      </p>
    </section>
  )
}
