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
    <form onSubmit={handleSubmit} className="rounded-2xl border border-surface-200 bg-white p-4 shadow-card">
      <label htmlFor="guess-input" className="mb-2 block text-sm font-semibold text-slate-700">
        Seu palpite
      </label>
      <div className="flex flex-col gap-3 md:flex-row">
        <input
          id="guess-input"
          list={listId}
          value={value}
          disabled={disabled}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Digite o transtorno em português"
          className="w-full rounded-xl border border-slate-300 px-3 py-2 text-slate-800 outline-none transition focus:border-denim-400 focus:ring-2 focus:ring-denim-200 disabled:cursor-not-allowed disabled:bg-slate-100"
        />
        <button
          type="submit"
          disabled={disabled}
          className="rounded-xl bg-denim-600 px-5 py-2 font-semibold text-white transition hover:bg-denim-500 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
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
