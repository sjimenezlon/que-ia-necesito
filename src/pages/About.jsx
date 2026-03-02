import { Bot, Heart, Search, GitCompare, Compass } from 'lucide-react'

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Bot className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-text mb-3">
          ¿Qué IA necesito?
        </h1>
        <p className="text-text-light text-lg">
          Tu guía práctica para encontrar la herramienta de inteligencia artificial perfecta.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-border p-6 md:p-8 mb-8">
        <h2 className="text-xl font-bold text-text mb-4">¿Por qué existe esta app?</h2>
        <p className="text-text-light leading-relaxed mb-4">
          A marzo de 2026, existen cientos de herramientas de IA, pero la mayoría de personas no sabe cuál usar para qué.
          Cada semana aparecen nuevas opciones y es difícil mantenerse al día.
        </p>
        <p className="text-text-light leading-relaxed">
          Esta app resuelve eso de forma simple: describes lo que necesitas hacer y te recomendamos las mejores
          herramientas. Sin jerga técnica, sin complicaciones. Como un amigo experto en tecnología que te explica
          las cosas con paciencia.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-border p-5 text-center">
          <Search className="w-8 h-8 text-primary mx-auto mb-3" />
          <h3 className="font-semibold text-text mb-1 text-sm">Busca por necesidad</h3>
          <p className="text-text-lighter text-xs">
            Escribe lo que quieres hacer en lenguaje natural y encuentra la herramienta ideal.
          </p>
        </div>
        <div className="bg-white rounded-xl border border-border p-5 text-center">
          <Compass className="w-8 h-8 text-secondary mx-auto mb-3" />
          <h3 className="font-semibold text-text mb-1 text-sm">Flujo guiado</h3>
          <p className="text-text-lighter text-xs">
            Si no sabes qué buscar, responde 3 preguntas simples y recibe recomendaciones personalizadas.
          </p>
        </div>
        <div className="bg-white rounded-xl border border-border p-5 text-center">
          <GitCompare className="w-8 h-8 text-accent mx-auto mb-3" />
          <h3 className="font-semibold text-text mb-1 text-sm">Compara opciones</h3>
          <p className="text-text-lighter text-xs">
            Pon hasta 3 herramientas lado a lado para decidir cuál te conviene más.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-border p-6 md:p-8 mb-8">
        <h2 className="text-xl font-bold text-text mb-4">¿Qué incluye?</h2>
        <ul className="space-y-2 text-text-light">
          <li className="flex items-start gap-2">
            <span className="text-accent">✓</span>
            Más de 70 herramientas de IA curadas y verificadas
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent">✓</span>
            15 categorías: desde escritura y diseño hasta programación y automatización
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent">✓</span>
            Información de precios, nivel de dificultad y casos de uso
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent">✓</span>
            Guías paso a paso para empezar con cada herramienta
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent">✓</span>
            Consejos prácticos de uso para cada herramienta
          </li>
        </ul>
      </div>

      <div className="text-center">
        <p className="text-text-light flex items-center justify-center gap-1">
          Hecho con <Heart className="w-4 h-4 text-secondary fill-secondary" /> por Santiago Jiménez Londoño y Cristian Espinal Maya
        </p>
        <p className="text-text-lighter text-sm mt-2">Marzo 2026</p>
      </div>
    </div>
  )
}
