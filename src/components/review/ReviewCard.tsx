import { useState } from 'react'
import type { Case, ReviewItem } from '../../types/models'

interface ReviewCardProps {
  item: ReviewItem
  caseData: Case
  correctDisorderName: string
  onGrade: (itemId: string, correct: boolean) => void
}

export function ReviewCard({ item, caseData, correctDisorderName, onGrade }: ReviewCardProps) {
  const [guess, setGuess] = useState('')
  const [revealed, setRevealed] = useState(false)

  return (
    <article className="rounded-2xl border border-surface-200 bg-white p-5 shadow-card">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{caseData.category}</p>
      <h3 className="mt-1 font-title text-2xl text-denim-600">{caseData.title}</h3>
      <p className="mt-3 leading-relaxed text-slate-700">{caseData.vignette}</p>

      {!revealed ? (
        <div className="mt-4 space-y-3">
          <label htmlFor={`review-guess-${item.id}`} className="block text-sm font-semibold text-slate-700">
            Seu palpite antes da resposta
          </label>
          <input
            id={`review-guess-${item.id}`}
            value={guess}
            onChange={(event) => setGuess(event.target.value)}
            placeholder="Digite seu palpite"
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-slate-800 outline-none transition focus:border-denim-400 focus:ring-2 focus:ring-denim-200"
          />
          <button
            type="button"
            onClick={() => setRevealed(true)}
            className="rounded-xl bg-denim-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-denim-500"
          >
            Mostrar resposta
          </button>
        </div>
      ) : (
        <div className="mt-4 rounded-xl bg-surface-50 p-3">
          <p className="text-sm text-slate-600">
            Seu palpite: <span className="font-semibold text-slate-800">{guess || 'Não informado'}</span>
          </p>
          <p className="mt-2 text-sm text-slate-700">
            Resposta correta: <span className="font-semibold text-denim-600">{correctDisorderName}</span>
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => onGrade(item.id, true)}
              className="rounded-xl bg-mint-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-mint-500/90"
            >
              Acertei
            </button>
            <button
              type="button"
              onClick={() => onGrade(item.id, false)}
              className="rounded-xl bg-peach-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-peach-500/90"
            >
              Errei
            </button>
          </div>
        </div>
      )}
    </article>
  )
}
