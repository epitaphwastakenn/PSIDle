import { useEffect, useRef } from 'react'
import type { FormEvent } from 'react'
import { audioManager } from '../../lib/audio'
import { FeedbackBurst } from '../common/FeedbackBurst'

interface GuessInputProps {
  value: string
  options: string[]
  disabled?: boolean
  helperText?: string
  feedbackType?: 'idle' | 'correct' | 'wrong'
  feedbackMessage?: string
  feedbackPulseKey?: number
  onChange: (value: string) => void
  onSubmit: () => void
}

export function GuessInput({
  value,
  options,
  disabled = false,
  helperText,
  feedbackType = 'idle',
  feedbackMessage,
  feedbackPulseKey = 0,
  onChange,
  onSubmit,
}: GuessInputProps) {
  const listId = 'disorder-options'
  const hasFeedback = feedbackType !== 'idle' && Boolean(feedbackMessage)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (disabled) {
      return
    }

    inputRef.current?.focus()
  }, [disabled])

  useEffect(() => {
    if (feedbackType === 'wrong' && !disabled) {
      inputRef.current?.focus()
    }
  }, [feedbackType, disabled])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    audioManager.playClick()
    onSubmit()
  }

  function handleInputChange(nextValue: string) {
    if (nextValue.length > value.length) {
      audioManager.playTyping()
    }

    onChange(nextValue)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={[
        'panel panel-motion relative overflow-hidden p-4 transition',
        feedbackType === 'correct'
          ? 'feedback-correct ring-2 ring-[color:rgba(59,215,176,0.75)] bg-[color:rgba(59,215,176,0.06)]'
          : '',
        feedbackType === 'wrong'
          ? 'feedback-wrong ring-2 ring-[color:rgba(255,111,159,0.75)] bg-[color:rgba(255,111,159,0.07)]'
          : '',
      ].join(' ')}
    >
      {hasFeedback ? (
        <FeedbackBurst
          key={`${feedbackType}-${feedbackPulseKey}`}
          density="soft"
          variant={feedbackType === 'correct' ? 'success' : 'danger'}
        />
      ) : null}
      <label htmlFor="guess-input" className="mb-2 block text-sm font-semibold text-[color:var(--text-body)]">
        Seu palpite
      </label>
      <div className="flex flex-col gap-3 md:flex-row">
        <input
          id="guess-input"
          ref={inputRef}
          list={listId}
          value={value}
          disabled={disabled}
          onChange={(event) => handleInputChange(event.target.value)}
          placeholder="Digite o transtorno em portugues"
          className={[
            'field-input disabled:cursor-not-allowed disabled:opacity-70',
            feedbackType === 'correct' ? 'border-[color:rgba(59,215,176,0.8)]' : '',
            feedbackType === 'wrong' ? 'border-[color:rgba(255,111,159,0.8)]' : '',
          ].join(' ')}
        />
        <button type="submit" disabled={disabled} className="btn-primary">
          Enviar
        </button>
      </div>
      <datalist id={listId}>
        {options.map((option) => (
          <option key={option} value={option} />
        ))}
      </datalist>

      {helperText ? <p className="mt-3 text-xs text-[color:var(--text-muted)]">{helperText}</p> : null}

      {hasFeedback ? (
        <p
          className={[
            'mt-2 rounded-lg border px-3 py-2 text-sm font-semibold',
            feedbackType === 'correct'
              ? 'feedback-correct border-[color:rgba(59,215,176,0.6)] bg-[color:rgba(59,215,176,0.16)] text-[color:var(--text-strong)]'
              : '',
            feedbackType === 'wrong'
              ? 'feedback-wrong border-[color:rgba(255,111,159,0.6)] bg-[color:rgba(255,111,159,0.16)] text-[color:var(--text-strong)]'
              : '',
          ].join(' ')}
          role="status"
          aria-live="polite"
        >
          {feedbackType === 'correct' ? '[OK] ' : '[ERRO] '}
          {feedbackMessage}
        </p>
      ) : null}
    </form>
  )
}
