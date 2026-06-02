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
        'panel panel-motion guess-shell relative overflow-hidden p-4 md:p-5 transition',
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

      <div className="guess-header-row">
        <div>
          <p className="guess-eyebrow">Seu raciocinio</p>
          <label htmlFor="guess-input" className="page-title mt-1 block text-xl md:text-2xl">
            Qual e o melhor palpite agora?
          </label>
        </div>
        <span className="guess-status-chip">{disabled ? 'Sessao concluida' : 'Resposta aberta'}</span>
      </div>

      <p className="page-subtitle mt-2 text-sm leading-relaxed">
        Digite o transtorno em portugues quando quiser testar seu raciocinio.
      </p>

      <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-stretch">
        <input
          id="guess-input"
          list={listId}
          value={value}
          disabled={disabled}
          onChange={(event) => handleInputChange(event.target.value)}
          placeholder="Digite o transtorno em portugues"
          className={[
            'field-input guess-field min-w-0 disabled:cursor-not-allowed disabled:opacity-70',
            feedbackType === 'correct' ? 'border-[color:rgba(59,215,176,0.8)]' : '',
            feedbackType === 'wrong' ? 'border-[color:rgba(255,111,159,0.8)]' : '',
          ].join(' ')}
        />
        <button type="submit" disabled={disabled} className="btn-primary guess-submit-btn">
          Enviar resposta
        </button>
      </div>

      <datalist id={listId}>
        {options.map((option) => (
          <option key={option} value={option} />
        ))}
      </datalist>

      <div className="mt-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        {helperText ? <p className="text-xs text-[color:var(--text-muted)]">{helperText}</p> : <span />}
        <p className="text-xs font-medium text-[color:var(--text-muted)]">Sugestao: pense no nucleo do caso, nao em palavras isoladas.</p>
      </div>

      {hasFeedback ? (
        <p
          className={[
            'mt-3 rounded-2xl border px-3 py-3 text-sm font-semibold',
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

