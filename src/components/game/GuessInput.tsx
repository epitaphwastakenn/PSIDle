import type { FormEvent } from 'react'

interface GuessInputProps {
  value: string
  options: string[]
  disabled?: boolean
  helperText?: string
  feedbackType?: 'idle' | 'correct' | 'wrong'
  feedbackMessage?: string
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
  onChange,
  onSubmit,
}: GuessInputProps) {
  const listId = 'disorder-options'
  const hasFeedback = feedbackType !== 'idle' && Boolean(feedbackMessage)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSubmit()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={[
        'panel p-4 transition',
        feedbackType === 'correct'
          ? 'ring-2 ring-[color:rgba(59,215,176,0.75)] bg-[color:rgba(59,215,176,0.06)]'
          : '',
        feedbackType === 'wrong'
          ? 'ring-2 ring-[color:rgba(255,111,159,0.75)] bg-[color:rgba(255,111,159,0.07)] animate-pulse'
          : '',
      ].join(' ')}
    >
      <label htmlFor="guess-input" className="mb-2 block text-sm font-semibold text-[color:var(--text-body)]">
        Seu palpite
      </label>
      <div className="flex flex-col gap-3 md:flex-row">
        <input
          id="guess-input"
          list={listId}
          value={value}
          disabled={disabled}
          onChange={(event) => onChange(event.target.value)}
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
              ? 'border-[color:rgba(59,215,176,0.6)] bg-[color:rgba(59,215,176,0.16)] text-[color:var(--text-strong)]'
              : '',
            feedbackType === 'wrong'
              ? 'border-[color:rgba(255,111,159,0.6)] bg-[color:rgba(255,111,159,0.16)] text-[color:var(--text-strong)]'
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
