import { useEffect, useRef } from 'react'
import { FeedbackBurst } from '../common/FeedbackBurst'
import { Icon } from '../common/Icon'
import { DifferentialList } from './DifferentialList'
import { NextCaseCountdown } from './NextCaseCountdown'

interface ResultPanelProps {
  solved: boolean
  score: number
  correctDisorderName: string
  explanation: string
  differentials: Array<{ disorderName: string; whyNot: string }>
  xpGained: number
  coinsGained: number
  onAddToReview: () => void
  onReviewExplanation: () => void
  addedToReview: boolean
  explanationReviewed: boolean
  onShare?: () => void
  showCountdown?: boolean
}

/** How long the explanation must stay on screen before it counts as read. */
const READ_DWELL_MS = 2500

export function ResultPanel({
  solved,
  score,
  correctDisorderName,
  explanation,
  differentials,
  xpGained,
  coinsGained,
  onAddToReview,
  onReviewExplanation,
  addedToReview,
  explanationReviewed,
  onShare,
  showCountdown = false,
}: ResultPanelProps) {
  const answerRef = useRef<HTMLDivElement>(null)
  const onReadRef = useRef(onReviewExplanation)

  useEffect(() => {
    onReadRef.current = onReviewExplanation
  })

  useEffect(() => {
    if (explanationReviewed) return
    let timer = 0
    const observer = new IntersectionObserver(([entry]) => {
      window.clearTimeout(timer)
      if (entry.isIntersecting) timer = window.setTimeout(() => onReadRef.current(), READ_DWELL_MS)
    }, { threshold: 0.75 })
    observer.observe(answerRef.current!)
    return () => {
      observer.disconnect()
      window.clearTimeout(timer)
    }
  }, [explanationReviewed])

  return (
    <section className={`card reward-flash result-card ${solved ? 'result-ok' : 'result-bad'}`}>
      <FeedbackBurst
        key={`${solved ? 'success' : 'failure'}-${correctDisorderName}-${score}`}
        variant={solved ? 'success' : 'review'}
        density={solved ? 'full' : 'soft'}
      />

      <div className="result-head">
        <span className={`tile tile-flip ${solved ? 'tile-ok' : 'tile-bad'}`}><Icon name={solved ? 'check' : 'book'} /></span>
        <div className="min-w-0 flex-1">
          <h3 className="h2">{solved ? 'Acertou!' : 'Não foi dessa vez'}</h3>
          {!solved && <p className="small muted">Foi para a revisão.</p>}
        </div>
        {showCountdown && <NextCaseCountdown />}
      </div>

      <div ref={answerRef} className="card-muted answer-box">
        <div className="flex items-center justify-between gap-3">
          <p className="kicker">Resposta</p>
          {explanationReviewed && <span className="tag tag-ok"><Icon name="check" />Lida</span>}
        </div>
        <p className="answer-name">{correctDisorderName}</p>
        <p className="explain">{explanation}</p>
      </div>

      <div className="result-stats">
        <div className="card-muted stat"><span className="stat-label">Pontuação</span><span className="stat-value">{score}</span></div>
        <div className="card-muted stat"><span className="stat-label">XP</span><span className="stat-value">+{xpGained}</span></div>
        <div className="card-muted stat"><span className="stat-label">Moedas</span><span className="stat-value">+{coinsGained}</span></div>
      </div>

      <DifferentialList items={differentials} />

      <div className="result-actions">
        {onShare && (
          <button type="button" onClick={onShare} className="btn btn-primary">
            <Icon name="share" width="18" height="18" />Compartilhar
          </button>
        )}
        <button type="button" onClick={onAddToReview} disabled={addedToReview} className="btn btn-ghost">
          <Icon name="book" width="18" height="18" />{addedToReview ? 'Na revisão' : 'Revisar depois'}
        </button>
      </div>
    </section>
  )
}
