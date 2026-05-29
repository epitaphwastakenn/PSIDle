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
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm font-semibold text-[color:var(--text-body)]">
        <span>Nivel {level}</span>
        <span>
          {Math.max(0, withinLevel)} / {span} XP
        </span>
      </div>
      <div className="h-3 overflow-hidden rounded-full border border-[color:var(--border-soft)] bg-[color:rgba(31,45,90,0.55)]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#8a6cff] via-[#5e8fff] to-[#3bd7b0] transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
