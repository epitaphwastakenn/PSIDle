import { getXpRequiredForLevel } from '../../lib/rewards'

interface XPBarProps {
  xp: number
  level: number
}

export function XPBar({ xp, level }: XPBarProps) {
  const currentLevelXp = getXpRequiredForLevel(level)
  const nextLevelXp = getXpRequiredForLevel(level + 1)
  const withinLevel = xp - currentLevelXp
  const span = Math.max(1, nextLevelXp - currentLevelXp)
  const progress = Math.min(100, Math.max(0, (withinLevel / span) * 100))

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm font-semibold text-[color:var(--text-body)]">
        <span className="chip rounded-full px-3 py-1 text-xs">Nivel {level}</span>
        <span>
          {Math.max(0, withinLevel)} / {span} XP para o proximo nivel
        </span>
      </div>
      <div className="h-3.5 overflow-hidden rounded-full border border-[color:var(--border-soft)] bg-[color:rgba(31,45,90,0.55)]">
        <div
          className="progress-flow h-full rounded-full bg-gradient-to-r from-[#8a6cff] via-[#5e8fff] to-[#3bd7b0] transition-all duration-700"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}

