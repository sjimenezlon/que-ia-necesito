import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Bot } from 'lucide-react'
import Footer from './Footer'

const navLinks = [
  { to: '/', label: 'Inicio' },
  { to: '/explorar', label: 'Explorar' },
  { to: '/comparar', label: 'Comparar' },
  { to: '/acerca', label: 'Acerca de' },
]

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 no-underline">
            <Bot className="w-7 h-7 text-primary" />
            <span className="font-bold text-lg text-text">
              ¿Qué IA necesito?
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-lg text-sm font-medium no-underline transition-colors ${
                  location.pathname === link.to
                    ? 'bg-primary/10 text-primary'
                    : 'text-text-light hover:bg-gray-100 hover:text-text'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 bg-transparent border-none cursor-pointer"
            aria-label="Menu"
          >
            {menuOpen ? (
              <X className="w-6 h-6 text-text" />
            ) : (
              <Menu className="w-6 h-6 text-text" />
            )}
          </button>
        </div>

        {menuOpen && (
          <nav className="md:hidden border-t border-border bg-white animate-fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={`block px-6 py-3 text-sm font-medium no-underline transition-colors ${
                  location.pathname === link.to
                    ? 'bg-primary/10 text-primary'
                    : 'text-text-light hover:bg-gray-50'
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
