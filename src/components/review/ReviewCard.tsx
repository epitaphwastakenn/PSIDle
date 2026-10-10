import { useState } from 'react'
import { audioManager } from '../../lib/audio'
import type { Case, ReviewItem } from '../../types/models'
import { FeedbackBurst } from '../common/FeedbackBurst'
import { Icon } from '../common/Icon'

interface ReviewCardProps {
  item: ReviewItem
  caseData: Case
  correctDisorderName: string
  onGrade: (itemId: string, correct: boolean, guess?: string) => void
}

export function ReviewCard({ item, caseData, correctDisorderName, onGrade }: ReviewCardProps) {
  const [guess, setGuess] = useState('')
  const [revealed, setRevealed] = useState(false)

  function handleGuessChange(nextValue: string) {
    if (nextValue.length > guess.length) {
      audioManager.playTyping()
    }

    setGuess(nextValue)
  }

  return (
    <div className="review-grid">
      <article className="card case-card">
        <div className="case-card-head">
          <span className="tag">{caseData.category}</span>
        </div>
        <h2 className="case-title">{caseData.title}</h2>
        <p className="case-text">{caseData.vignette}</p>
      </article>

      <aside className="card flashcard relative overflow-hidden">
        {!revealed ? (
          <form className="grid gap-4" onSubmit={(event) => { event.preventDefault(); audioManager.playClick(); setRevealed(true) }}>
            <div>
              <span className="tile tile-sm tile-warn mb-3"><Icon name="book" /></span>
              <h3 className="h2">Flashcard</h3>
            </div>
            <label htmlFor={`review-guess-${item.id}`} className="field">
              Seu palpite
              <input
                id={`review-guess-${item.id}`}
                value={guess}
                onChange={(event) => handleGuessChange(event.target.value)}
                placeholder="Digite seu palpite"
                className="input"
              />
            </label>
            <button type="submit" disabled={!guess.trim()} className="btn btn-primary btn-block">
              Revelar
            </button>
          </form>
        ) : (
          <div className="clue-reveal relative grid gap-4">
            <FeedbackBurst key={`review-reveal-${item.id}`} variant="review" density="soft" />
            <div className="card-muted p-4 relative">
              <p className="kicker">Seu palpite</p>
              <p className="h3 mt-1">{guess || 'Não informado'}</p>
            </div>
            <div className="card-muted p-4 relative" style={{ borderColor: 'color-mix(in srgb, var(--ok) 45%, transparent)' }}>
              <p className="kicker">Resposta correta</p>
              <p className="h3 mt-1">{correctDisorderName}</p>
            </div>
            <p className="small relative">{caseData.explanation}</p>
            <p className="small muted relative">Como foi?</p>
            <div className="grid gap-2 sm:grid-cols-2 relative">
              <button type="button" onClick={() => { audioManager.playClick(); onGrade(item.id, true, guess) }} className="btn btn-success">
                <Icon name="check" width="18" height="18" />Acertei
              </button>
              <button type="button" onClick={() => { audioManager.playClick(); onGrade(item.id, false, guess) }} className="btn btn-danger">
                <Icon name="x" width="18" height="18" />Errei
              </button>
            </div>
          </div>
        )}
      </aside>
    </div>
  )
}
