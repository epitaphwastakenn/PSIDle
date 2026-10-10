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
    <div>
      <div role="progressbar" aria-label="Progresso de nível" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)} className="progress">
        <span style={{ width: `${progress}%` }} />
      </div>
      <div className="xp-meta"><span>Rumo ao nível {level + 1}</span><span className="mono">{Math.max(0, withinLevel)} / {span} XP</span></div>
    </div>
  )
}
