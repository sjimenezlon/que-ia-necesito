export default function Footer() {
  return (
    <footer className="bg-white border-t border-border mt-16">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-text font-semibold text-sm">
              Hecho con <span role="img" aria-label="robot">🤖</span> por Santiago Jiménez Londoño y Cristian Espinal Maya
            </p>
            <p className="text-text-lighter text-xs mt-1">
              Última actualización: Marzo 2026
            </p>
          </div>
          <p className="text-text-lighter text-xs text-center max-w-md">
            Esta guía es orientativa. Verifica siempre los precios y funcionalidades en los sitios oficiales.
          </p>
        </div>
      </div>
    </footer>
  )
}
