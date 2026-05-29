interface AttemptHistoryProps {
  guesses: string[]
}

export function AttemptHistory({ guesses }: AttemptHistoryProps) {
  return (
    <section className="rounded-2xl border border-surface-200 bg-white p-4 shadow-card">
      <h3 className="font-title text-xl text-denim-600">Histórico de palpites</h3>
      {!guesses.length ? (
        <p className="mt-2 text-sm text-slate-600">Nenhum palpite enviado ainda.</p>
      ) : (
        <ul className="mt-3 space-y-2">
          {guesses.map((guess, index) => (
            <li
              key={`${guess}-${index}`}
              className="rounded-xl border border-surface-200 bg-surface-50 px-3 py-2 text-sm text-slate-700"
            >
              Tentativa {index + 1}: <span className="font-semibold">{guess}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
