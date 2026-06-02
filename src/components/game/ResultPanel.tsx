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
        'panel reward-flash result-panel relative overflow-hidden p-5',
        solved ? 'result-panel-success' : 'result-panel-failure',
      ].join(' ')}
    >
      <FeedbackBurst key={`${solved ? 'success' : 'failure'}-${correctDisorderName}-${score}`} variant={solved ? 'success' : 'review'} density={solved ? 'full' : 'soft'} />
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="page-title text-2xl">{solved ? 'Resposta correta' : 'Fim da tentativa'}</h3>
        <div className="flex flex-wrap items-center gap-2">
          <span className="chip rounded-full px-3 py-1 text-sm font-semibold">{solved ? 'Caso resolvido' : 'Entrou em revisao'}</span>
          <span className="chip rounded-full px-3 py-1 text-sm font-semibold">Score: {score}</span>
        </div>
      </div>

      <p className="mt-3 text-sm text-[color:var(--text-body)] md:text-base">
        Diagnostico mais provavel do caso ficticio:{' '}
        <span className="font-semibold text-[color:var(--text-strong)]">{correctDisorderName}</span>
      </p>
      <p className="panel-soft mt-3 p-3 text-sm leading-relaxed text-[color:var(--text-body)]">{explanation}</p>

      <div className="mt-4">
        <DifferentialList items={differentials} />
      </div>

      <div className="reward-flash panel-soft result-reward-strip mt-4 p-3 text-sm text-[color:var(--text-body)]">
        <p className="font-semibold text-[color:var(--text-strong)]">Recompensas da partida</p>
        <p>
          +{xpGained} XP | +{coinsGained} moedas
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
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
