import { useEffect, useState } from 'react'
import { getTodayKey } from '../../lib/daily'

function msUntilMidnight(): number {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime() - now.getTime()
}

function format(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000))
  return [Math.floor(total / 3600), Math.floor(total / 60) % 60, total % 60].map((part) => String(part).padStart(2, '0')).join(':')
}

export function NextCaseCountdown() {
  const [startDay] = useState(getTodayKey)
  const [remaining, setRemaining] = useState(msUntilMidnight)

  useEffect(() => {
    const timer = window.setInterval(() => setRemaining(msUntilMidnight()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  if (remaining > 0 && getTodayKey() !== startDay) {
    return <button type="button" className="btn btn-primary btn-sm" onClick={() => window.location.reload()}>Novo caso disponível</button>
  }

  return (
    <div className="countdown">
      <span className="kicker">Próximo caso em</span>
      <span className="countdown-value mono">{format(remaining)}</span>
    </div>
  )
}
