import { Bot, Heart, Search, GitCompare, Compass, Sparkles } from 'lucide-react'

const features = [
  { icon: Search, color: 'text-primary', bg: 'bg-primary/8', title: 'Busca por necesidad', desc: 'Escribe lo que quieres hacer en lenguaje natural y encuentra la herramienta ideal.' },
  { icon: Compass, color: 'text-secondary', bg: 'bg-secondary/8', title: 'Flujo guiado', desc: 'Si no sabes qué buscar, responde 3 preguntas simples y recibe recomendaciones personalizadas.' },
  { icon: Sparkles, color: 'text-warm', bg: 'bg-warm/8', title: 'Prompt Lab', desc: 'Aprende a hacer mejores prompts con la metodología CORTE-F en 6 pasos simples.' },
  { icon: GitCompare, color: 'text-accent', bg: 'bg-accent/8', title: 'Compara opciones', desc: 'Pon hasta 3 herramientas lado a lado para decidir cuál te conviene más.' },
]

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-14">
      <div className="text-center mb-14 animate-slide-up">
        <div className="w-16 h-16 bg-text rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg">
          <Bot className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-text mb-3 tracking-tight">
          ¿Qué <span className="text-gradient-primary">IA</span> necesito?
        </h1>
        <p className="text-text-light text-lg leading-relaxed max-w-lg mx-auto">
          Tu guía práctica para encontrar la herramienta de inteligencia artificial perfecta.
        </p>
      </div>

      <div className="bg-surface rounded-2xl border border-border p-6 md:p-8 mb-10 shadow-sm">
        <h2 className="text-xl font-bold text-text mb-4 tracking-tight">¿Por qué existe esta app?</h2>
        <p className="text-text-light leading-relaxed mb-4">
          A abril de 2026, existen cientos de herramientas de IA, pero la mayoría de personas no sabe cuál usar para qué.
          Cada semana aparecen nuevas opciones y es difícil mantenerse al día.
        </p>
        <p className="text-text-light leading-relaxed">
          Esta app resuelve eso de forma simple: describes lo que necesitas hacer y te recomendamos las mejores
          herramientas. Sin jerga técnica, sin complicaciones. Como un amigo experto en tecnología que te explica
          las cosas con paciencia.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-10">
        {features.map((item) => {
          const Icon = item.icon
          return (
            <div key={item.title} className="group bg-surface rounded-xl border border-border p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
              <div className={`w-10 h-10 ${item.bg} rounded-xl flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110`}>
                <Icon className={`w-5 h-5 ${item.color}`} />
              </div>
              <h3 className="font-display font-semibold text-text mb-1 text-sm tracking-tight">{item.title}</h3>
              <p className="text-text-lighter text-xs leading-relaxed">{item.desc}</p>
            </div>
          )
        })}
      </div>

      <div className="bg-surface rounded-2xl border border-border p-6 md:p-8 mb-10 shadow-sm">
        <h2 className="text-xl font-bold text-text mb-4 tracking-tight">¿Qué incluye?</h2>
        <ul className="space-y-2.5 text-text-light">
          {[
            'Más de 100 herramientas de IA curadas y verificadas',
            '16 categorías: incluye finanzas, programación, diseño y automatización',
            'Capítulo especial para el sector público colombiano con casos de uso',
            'Información de precios, nivel de dificultad y casos de uso',
            'Guías paso a paso para empezar con cada herramienta',
            'Consejos prácticos de uso para cada herramienta',
            'Prompt Lab: refinador de instrucciones con metodología CORTE-F en 6 pasos',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="text-accent font-bold mt-0.5">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="text-center pt-4">
        <p className="text-text-light flex items-center justify-center gap-1.5 font-medium">
          Hecho con <Heart className="w-4 h-4 text-secondary fill-secondary" /> por Santiago Jiménez Londoño
        </p>
        <p className="text-text-lighter text-sm mt-2">Abril 2026</p>
      </div>
    </div>
  )
}
