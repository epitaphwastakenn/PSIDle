import { Link } from 'react-router-dom'
import { Icon } from '../components/common/Icon'
import { audioManager } from '../lib/audio'
import { findDailyAttempt, getArchiveDayKeys, parseDayKey } from '../lib/daily'
import { getActiveSession, getUserProgress } from '../lib/storage'

type DayStatus = 'solved' | 'failed' | 'started' | 'open'

const backLabel: Record<DayStatus, string> = { solved: 'Resolvido', failed: 'Não deu', started: 'Continuar', open: 'Jogar' }
const statusTile: Record<DayStatus, string> = { solved: 'tile-ok', failed: 'tile-bad', started: 'tile-warn', open: '' }

export function ArchivePage() {
  const { attempts } = getUserProgress()
  const days = getArchiveDayKeys().map((dayKey) => {
    const attempt = findDailyAttempt(attempts, dayKey)
    const status: DayStatus = attempt ? (attempt.solved ? 'solved' : 'failed') : getActiveSession('daily', dayKey)?.guesses.length ? 'started' : 'open'
    return { dayKey, date: parseDayKey(dayKey)!, status, attempt }
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
            aria-label={`${day.date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' })}: ${backLabel[day.status]}`}
            className={`archive-day archive-${day.status} list-pop`} style={{ animationDelay: `${Math.min(index, 14) * 25}ms` }}>
            <span className="archive-flip">
              <span className="archive-face archive-front">
                <span className="archive-weekday">{day.date.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '')}</span>
                <span className="archive-date num">{day.date.getDate()}</span>
                <span className="archive-month">{day.date.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '')}</span>
                <span className={`tile tile-sm ${statusTile[day.status]}`}>
                  {day.status === 'solved' ? <Icon name="check" /> : day.status === 'failed' ? <Icon name="x" /> : day.status === 'started' ? <Icon name="play" /> : null}
                </span>
              </span>
              <span className="archive-face archive-back" aria-hidden="true">
                <span className={`tile ${statusTile[day.status] || 'tile-accent'}`}>
                  <Icon name={day.status === 'solved' ? 'check' : day.status === 'failed' ? 'x' : 'play'} />
                </span>
                <strong>{backLabel[day.status]}</strong>
                {day.attempt && <span className="mono small muted">{day.attempt.solved ? `${day.attempt.guesses.length}/5 · ${day.attempt.score} pts` : 'ver resultado'}</span>}
              </span>
            </span>
          </Link>
        ))}
      </section>
    </div>
  )
}
