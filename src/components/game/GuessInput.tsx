import type { FormEvent } from 'react'

interface GuessInputProps {
  value: string
  options: string[]
  disabled?: boolean
  onChange: (value: string) => void
  onSubmit: () => void
}

export function GuessInput({ value, options, disabled = false, onChange, onSubmit }: GuessInputProps) {
  const listId = 'disorder-options'

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit} className="panel p-4">
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
          className="field-input disabled:cursor-not-allowed disabled:opacity-70"
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
    </form>
  )
}
