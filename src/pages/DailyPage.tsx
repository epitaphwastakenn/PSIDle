import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { GameSession } from '../components/game/GameSession'
import { Icon } from '../components/common/Icon'
import { findDailyAttempt, getTodayKey, isArchiveDayKey, parseDayKey } from '../lib/daily'
import { generateDailyProceduralCase } from '../lib/proceduralCases'
import { getActiveSession, getUserProgress } from '../lib/storage'

export function DailyPage() {
  const { date } = useParams()
  const dayKey = date ?? getTodayKey()
  const archiveDate = date && date !== getTodayKey() && isArchiveDayKey(date) ? date : undefined

  if (date && date !== getTodayKey() && !archiveDate) {
    return <Navigate to="/archive" replace />
  }

  return <DailyCase key={dayKey} dayKey={dayKey} archiveDate={archiveDate} />
}

function DailyCase({ dayKey, archiveDate }: { dayKey: string; archiveDate?: string }) {
  const [dailyCase] = useState(() => {
    const saved = findDailyAttempt(getUserProgress().attempts, dayKey)
    // Past cases are generated on demand from their date, the same way today's case is.
    return saved?.caseSnapshot ?? getActiveSession('daily', archiveDate)?.caseData ?? generateDailyProceduralCase(parseDayKey(dayKey) ?? new Date())
  })
  const label = (parseDayKey(dayKey) ?? new Date()).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' })

  return (
    <div className="page-stack">
      <header className="page-header">
        <h1 className="display">{archiveDate ? `Caso de ${label}` : 'Caso de hoje'}</h1>
        <div className="flex flex-wrap items-center gap-2">
          {!archiveDate && <span className="tag"><Icon name="calendar" />{label}</span>}
          {archiveDate && <span className="tag tag-warn">Recompensa reduzida</span>}
          <Link to="/archive" className="btn btn-secondary btn-sm"><Icon name="calendar" width="16" height="16" />Dias anteriores</Link>
        </div>
      </header>
      <GameSession key={dailyCase.id} caseData={dailyCase} mode="daily" caseDate={archiveDate} />
    </div>
  )
}
