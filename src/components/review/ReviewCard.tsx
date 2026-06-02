import { useEffect, useRef, useState } from 'react'
import { audioManager } from '../../lib/audio'
import type { Case, ReviewItem } from '../../types/models'
import { FeedbackBurst } from '../common/FeedbackBurst'

interface ReviewCardProps {
  item: ReviewItem
  caseData: Case
  correctDisorderName: string
  onGrade: (itemId: string, correct: boolean, guess?: string) => void
}

export function ReviewCard({ item, caseData, correctDisorderName, onGrade }: ReviewCardProps) {
  const [guess, setGuess] = useState('')
  const [revealed, setRevealed] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!revealed) {
      inputRef.current?.focus()
    }
  }, [item.id, revealed])

  function handleGuessChange(nextValue: string) {
    if (nextValue.length > guess.length) {
      audioManager.playTyping()
    }

    setGuess(nextValue)
  }

  return (
    <article className="panel review-card relative overflow-hidden p-4 md:p-5">
      <div className="review-card-grid">
        <div>
          <p className="case-eyebrow">{caseData.category}</p>
          <h3 className="page-title mt-2 text-2xl">{caseData.title}</h3>
          <div className="case-reading-surface mt-4 p-4">
            <p className="text-sm leading-relaxed text-[color:var(--text-body)] md:text-base">{caseData.vignette}</p>
          </div>
        </div>

        <div className="review-answer-panel">
          {!revealed ? (
            <div className="space-y-3">
              <div>
                <p className="filter-label">Flashcard</p>
                <p className="filter-caption">Tente lembrar antes de revelar a resposta.</p>
              </div>
              <label htmlFor={`review-guess-${item.id}`} className="block text-sm font-semibold text-[color:var(--text-body)]">
                Seu palpite
              </label>
              <input
                id={`review-guess-${item.id}`}
                ref={inputRef}
                value={guess}
                onChange={(event) => handleGuessChange(event.target.value)}
                placeholder="Digite seu palpite"
                className="field-input"
              />
              <button
                type="button"
                onClick={() => {
                  audioManager.playClick()
                  setRevealed(true)
                }}
                className="btn-primary w-full"
              >
                Mostrar resposta
              </button>
            </div>
          ) : (
            <div className="clue-reveal relative overflow-hidden">
              <FeedbackBurst key={`review-reveal-${item.id}`} variant="review" density="soft" />
              <p className="text-sm text-[color:var(--text-body)]">
                Seu palpite: <span className="font-semibold text-[color:var(--text-strong)]">{guess || 'Nao informado'}</span>
              </p>
              <p className="mt-2 text-sm text-[color:var(--text-body)]">
                Resposta correta: <span className="font-semibold text-[color:var(--text-strong)]">{correctDisorderName}</span>
              </p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => {
                    audioManager.playClick()
                    onGrade(item.id, true, guess)
                  }}
                  className="btn-success"
                >
                  Acertei
                </button>
                <button
                  type="button"
                  onClick={() => {
                    audioManager.playClick()
                    onGrade(item.id, false, guess)
                  }}
                  className="btn-danger"
                >
                  Errei
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}
