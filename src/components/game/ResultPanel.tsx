import { FeedbackBurst } from '../common/FeedbackBurst'
import { DifferentialList } from './DifferentialList'

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
}

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
}: ResultPanelProps) {
  return (
    <section
      className={[
        'panel reward-flash result-panel relative overflow-hidden p-5 md:p-6',
        solved ? 'result-panel-success' : 'result-panel-failure',
      ].join(' ')}
    >
      <FeedbackBurst
        key={`${solved ? 'success' : 'failure'}-${correctDisorderName}-${score}`}
        variant={solved ? 'success' : 'review'}
        density={solved ? 'full' : 'soft'}
      />

      <div className="result-header-row">
        <div>
          <p className="result-kicker">{solved ? 'Acerto confirmado' : 'Tentativa concluida'}</p>
          <h3 className="page-title mt-2 text-2xl md:text-3xl">{solved ? 'Resposta correta' : 'Hora de revisar o caso'}</h3>
        </div>
        <div className="result-chip-stack">
          <span className="chip rounded-full px-3 py-1 text-sm font-semibold">{solved ? 'Caso resolvido' : 'Entrou em revisao'}</span>
          <span className="chip rounded-full px-3 py-1 text-sm font-semibold">Score {score}</span>
        </div>
      </div>

      <div className="result-answer-surface mt-4 p-4 md:p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--text-muted)]">Hipotese mais provavel</p>
        <p className="page-title mt-2 text-2xl md:text-[2rem]">{correctDisorderName}</p>
        <p className="page-subtitle mt-3 text-sm leading-relaxed md:text-base">{explanation}</p>
      </div>

      <div className="result-meta-grid mt-4">
        <div className="mini-stat">
          <span className="mini-stat-label">Score</span>
          <span className="mini-stat-value">{score}</span>
        </div>
        <div className="mini-stat">
          <span className="mini-stat-label">XP</span>
          <span className="mini-stat-value">+{xpGained}</span>
        </div>
        <div className="mini-stat">
          <span className="mini-stat-label">Moedas</span>
          <span className="mini-stat-value">+{coinsGained}</span>
        </div>
      </div>

      <div className="mt-5">
        <DifferentialList items={differentials} />
      </div>

      <div className="result-action-row mt-5">
        <button type="button" onClick={onAddToReview} disabled={addedToReview} className="btn-ghost">
          {addedToReview ? 'Adicionado a revisao' : 'Adicionar a revisao'}
        </button>
        <button type="button" onClick={onReviewExplanation} disabled={explanationReviewed} className="btn-secondary">
          {explanationReviewed ? 'Explicacao revisada (+20 XP)' : 'Marcar explicacao como revisada'}
        </button>
      </div>
    </section>
  )
}

