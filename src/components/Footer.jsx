import { Bot } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-border mt-20 bg-surface relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Bot className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="font-display text-text font-semibold text-sm">
                Hecho con <span role="img" aria-label="corazón">❤️</span> por Santiago Jiménez Londoño y Cristian Espinal Maya
              </p>
              <p className="text-text-lighter text-xs mt-0.5">
                Última actualización: Abril 2026
              </p>
            </div>
          </div>
          <p className="text-text-lighter text-xs text-center md:text-right max-w-sm leading-relaxed">
            Esta guía es orientativa. Verifica siempre los precios y funcionalidades en los sitios oficiales.
          </p>
        </div>
      </div>
    </footer>
  )
}
