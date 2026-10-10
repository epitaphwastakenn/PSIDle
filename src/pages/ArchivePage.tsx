import { Link } from 'react-router-dom'
import { Icon } from '../components/common/Icon'
import { audioManager } from '../lib/audio'
import { findDailyAttempt, getArchiveDayKeys, parseDayKey } from '../lib/daily'
import { getActiveSession, getUserProgress } from '../lib/storage'

export function ArchivePage() {
  const { attempts } = getUserProgress()
  const days = getArchiveDayKeys().map((dayKey) => {
    const attempt = findDailyAttempt(attempts, dayKey)
    const status = attempt ? (attempt.solved ? 'solved' : 'failed') : getActiveSession('daily', dayKey)?.guesses.length ? 'started' : 'open'
    return { dayKey, date: parseDayKey(dayKey)!, status, score: attempt?.score }
  })
  const pending = days.filter((day) => day.status === 'open' || day.status === 'started').length

  return (
    <div className="page-stack">
      <header className="page-header">
        <h1 className="display">Dias anteriores</h1>
        <span className="tag tag-accent">{pending} {pending === 1 ? 'caso para jogar' : 'casos para jogar'}</span>
      </header>

      <section className="archive-grid" aria-label="Casos dos últimos dias">
        {days.map((day, index) => (
          <Link key={day.dayKey} to={`/daily/${day.dayKey}`} onClick={() => audioManager.playClick()}
            className={`card card-link archive-day archive-${day.status} list-pop`} style={{ animationDelay: `${Math.min(index, 14) * 25}ms` }}>
            <span className="archive-weekday">{day.date.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '')}</span>
            <span className="archive-date num">{day.date.getDate()}</span>
            <span className="archive-month">{day.date.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '')}</span>
            <span className={`tile tile-sm ${day.status === 'solved' ? 'tile-ok' : day.status === 'failed' ? 'tile-bad' : day.status === 'started' ? 'tile-warn' : ''}`}>
              {day.status === 'solved' ? <Icon name="check" /> : day.status === 'failed' ? <Icon name="x" /> : day.status === 'started' ? <Icon name="play" /> : null}
            </span>
          </Link>
        ))}
      </section>
    </div>
  )
}
