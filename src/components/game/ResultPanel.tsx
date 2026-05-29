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
    <section className="animate-fadeUp rounded-2xl border border-surface-200 bg-white p-5 shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-title text-2xl text-denim-600">{solved ? 'Resposta correta!' : 'Fim da tentativa'}</h3>
        <span className="rounded-full bg-surface-100 px-3 py-1 text-sm font-semibold text-slate-700">Score: {score}</span>
      </div>

      <p className="mt-3 text-slate-700">
        Diagnóstico mais provável do caso fictício: <span className="font-semibold text-denim-600">{correctDisorderName}</span>
      </p>
      <p className="mt-3 rounded-xl bg-surface-50 p-3 text-sm leading-relaxed text-slate-700">{explanation}</p>

      <div className="mt-4">
        <DifferentialList items={differentials} />
      </div>

      <div className="mt-4 rounded-xl bg-mint-200/40 p-3 text-sm text-slate-700">
        <p className="font-semibold text-denim-600">Recompensas da partida</p>
        <p>
          +{xpGained} XP | +{coinsGained} moedas
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onAddToReview}
          disabled={addedToReview}
          className="rounded-xl border border-denim-300 px-4 py-2 text-sm font-semibold text-denim-600 transition hover:bg-denim-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {addedToReview ? 'Adicionado à revisão' : 'Adicionar à revisão'}
        </button>
        <button
          type="button"
          onClick={onReviewExplanation}
          disabled={explanationReviewed}
          className="rounded-xl border border-mint-500 px-4 py-2 text-sm font-semibold text-mint-500 transition hover:bg-mint-200/40 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {explanationReviewed ? 'Explicação revisada (+20 XP)' : 'Marcar explicação como revisada'}
        </button>
      </div>
    </section>
  )
}
