import CompareTools from '../components/CompareTools'

export default function Compare({ compareIds, onRemove }) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text mb-2">
          Comparar herramientas
        </h1>
        <p className="text-text-light text-sm">
          Compara hasta 3 herramientas lado a lado para elegir la mejor opción.
          {compareIds.length < 3 && (
            <span className="text-text-lighter">
              {' '}({3 - compareIds.length} espacio{3 - compareIds.length !== 1 ? 's' : ''} disponible{3 - compareIds.length !== 1 ? 's' : ''})
            </span>
          )}
        </p>
      </div>

      <CompareTools toolIds={compareIds} onRemove={onRemove} />
    </div>
  )
}
