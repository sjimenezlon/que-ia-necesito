import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Bot, Sun, Moon, Monitor } from 'lucide-react'
import Footer from './Footer'
import { useTheme } from '../hooks/useTheme'

const navLinks = [
  { to: '/', label: 'Inicio' },
  { to: '/explorar', label: 'Explorar' },
  { to: '/prompt-lab', label: 'Prompt Lab' },
  { to: '/comparar', label: 'Comparar' },
  { to: '/acerca', label: 'Acerca de' },
]

const themeLabels = { light: 'Claro', dark: 'Oscuro', system: 'Sistema' }

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const { theme, cycleTheme } = useTheme()
  const ThemeIcon = theme === 'dark' ? Moon : theme === 'light' ? Sun : Monitor

  return (
    <div className="min-h-screen flex flex-col">
      <header className="glass-strong border-b border-border sticky top-0 z-50 gradient-line-top">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 no-underline group">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center transition-transform duration-200 group-hover:scale-110 group-hover:rotate-3">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-lg text-text tracking-tight">
              ¿Qué IA necesito?
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <nav className="flex items-center gap-0.5">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    aria-current={isActive ? 'page' : undefined}
                    className={`relative px-3.5 py-2 rounded-lg text-sm font-medium no-underline transition-all duration-200 ${
                      isActive
                        ? 'text-primary bg-primary/8'
                        : 'text-text-light hover:text-text hover:bg-text/4'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute -bottom-[1px] left-1/2 -translate-x-1/2 w-5 h-[3px] bg-primary rounded-full" />
                    )}
                  </Link>
                )
              })}
            </nav>
            <button
              onClick={cycleTheme}
              aria-label={`Tema: ${themeLabels[theme]}. Clic para cambiar.`}
              title={`Tema: ${themeLabels[theme]}`}
              className="p-2 rounded-lg hover:bg-text/5 bg-transparent border-none cursor-pointer transition-colors text-text-light hover:text-text ml-1"
            >
              <ThemeIcon className="w-4.5 h-4.5" />
            </button>
          </div>

          <div className="md:hidden flex items-center gap-1">
            <button
              onClick={cycleTheme}
              aria-label={`Tema: ${themeLabels[theme]}`}
              className="p-2 rounded-lg hover:bg-text/5 bg-transparent border-none cursor-pointer transition-colors text-text-light"
            >
              <ThemeIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-lg hover:bg-text/5 bg-transparent border-none cursor-pointer transition-colors"
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
            {menuOpen ? (
              <X className="w-6 h-6 text-text" />
            ) : (
              <Menu className="w-6 h-6 text-text" />
            )}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="md:hidden border-t border-border bg-surface animate-slide-down" role="dialog" aria-label="Menú de navegación">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={`block px-6 py-3.5 text-sm font-medium no-underline transition-colors border-l-3 ${
                  location.pathname === link.to
                    ? 'bg-primary/5 text-primary border-l-primary'
                    : 'text-text-light hover:bg-text/3 border-l-transparent'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  )
}
