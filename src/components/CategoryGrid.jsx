import { useNavigate } from 'react-router-dom'
import {
  PenLine, Palette, Presentation, Video, Music,
  Code, BarChart3, Search, Mic, GraduationCap,
  Mail, Bot, Briefcase, Zap, Globe,
} from 'lucide-react'
import { CATEGORIES } from '../utils/recommender'

const iconMap = {
  PenLine, Palette, Presentation, Video, Music,
  Code, BarChart3, Search, Mic, GraduationCap,
  Mail, Bot, Briefcase, Zap, Globe,
}

export default function CategoryGrid() {
  const navigate = useNavigate()

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
      {CATEGORIES.map((cat) => {
        const Icon = iconMap[cat.icon]
        return (
          <button
            key={cat.id}
            onClick={() => navigate(`/explorar?categoria=${cat.id}`)}
            className={`flex flex-col items-center gap-2 p-4 rounded-xl border border-transparent cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${cat.color}`}
          >
            {Icon && <Icon className="w-7 h-7" />}
            <span className="text-xs font-medium text-center leading-tight">
              {cat.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
