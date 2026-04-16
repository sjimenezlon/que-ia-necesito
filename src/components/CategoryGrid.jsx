import { useNavigate } from 'react-router-dom'
import {
  PenLine, Palette, Presentation, Video, Music,
  Code, BarChart3, Search, Mic, GraduationCap,
  Mail, Bot, Briefcase, Zap, Globe, DollarSign,
} from 'lucide-react'
import { CATEGORIES } from '../utils/recommender'

const iconMap = {
  PenLine, Palette, Presentation, Video, Music,
  Code, BarChart3, Search, Mic, GraduationCap,
  Mail, Bot, Briefcase, Zap, Globe, DollarSign,
}

export default function CategoryGrid() {
  const navigate = useNavigate()

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5">
      {CATEGORIES.map((cat) => {
        const Icon = iconMap[cat.icon]
        return (
          <button
            key={cat.id}
            onClick={() => navigate(`/explorar?categoria=${cat.id}`)}
            className={`group flex flex-col items-center gap-2 p-4 rounded-xl border border-transparent cursor-pointer transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:border-border active:scale-[0.97] ${cat.color}`}
          >
            {Icon && (
              <Icon className="w-6 h-6 transition-transform duration-300 group-hover:scale-115" />
            )}
            <span className="text-xs font-semibold text-center leading-tight">
              {cat.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
