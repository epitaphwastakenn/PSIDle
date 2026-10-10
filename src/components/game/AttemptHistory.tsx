import type { GuessTone } from '../../lib/feedback'
import { toneTileClass } from '../../lib/feedback'
import { Icon } from '../common/Icon'

interface AttemptHistoryProps {
  guesses: string[]
  tones: GuessTone[]
}

export function AttemptHistory({ guesses, tones }: AttemptHistoryProps) {
  return (
    <section className="card side-card">
      <div className="side-card-head">
        <h3 className="h3">Tentativas</h3>
        <span className="tag mono">{guesses.length}</span>
      </div>
      {!guesses.length ? (
        <p className="small muted">Nenhuma ainda.</p>
      ) : (
        <ul className="attempt-list">
          {guesses.map((guess, index) => {
            const tone = tones[index]
            return (
              <li key={`${guess}-${index}`} className="attempt-item list-pop" style={{ animationDelay: `${index * 45}ms` }}>
                <span className={`tile tile-sm ${toneTileClass[tone]}`}><Icon name={tone === 'ok' ? 'check' : 'x'} /></span>
                <div className="min-w-0">
                  <p>{guess}</p>
                  {tone === 'near' && <span className="attempt-note">Mesma família</span>}
                </div>
              </li>
            )
          })}
        </ul>
      )}
      <div className="tone-legend" aria-label="Legenda">
        <span><span className="tile tile-xs tile-ok" />Certo</span>
        <span><span className="tile tile-xs tile-warn" />Mesma família</span>
        <span><span className="tile tile-xs tile-bad" />Outra família</span>
      </div>
    </section>
  )
}
