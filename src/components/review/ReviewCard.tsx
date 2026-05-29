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
    <article className="panel p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-[color:var(--text-muted)]">{caseData.category}</p>
      <h3 className="page-title mt-1 text-2xl">{caseData.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-[color:var(--text-body)] md:text-base">{caseData.vignette}</p>

      {!revealed ? (
        <div className="mt-4 space-y-3">
          <label htmlFor={`review-guess-${item.id}`} className="block text-sm font-semibold text-[color:var(--text-body)]">
            Seu palpite antes da resposta
          </label>
          <input
            id={`review-guess-${item.id}`}
            value={guess}
            onChange={(event) => setGuess(event.target.value)}
            placeholder="Digite seu palpite"
            className="field-input"
          />
          <button type="button" onClick={() => setRevealed(true)} className="btn-primary">
            Mostrar resposta
          </button>
        </div>
      ) : (
        <div className="panel-soft mt-4 p-3">
          <p className="text-sm text-[color:var(--text-body)]">
            Seu palpite: <span className="font-semibold text-[color:var(--text-strong)]">{guess || 'Nao informado'}</span>
          </p>
          <p className="mt-2 text-sm text-[color:var(--text-body)]">
            Resposta correta: <span className="font-semibold text-[color:var(--text-strong)]">{correctDisorderName}</span>
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" onClick={() => onGrade(item.id, true)} className="btn-success">
              Acertei
            </button>
            <button type="button" onClick={() => onGrade(item.id, false)} className="btn-danger">
              Errei
            </button>
          </div>
        </div>
      )}
    </article>
  )
}
