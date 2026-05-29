interface AttemptHistoryProps {
  guesses: string[]
}

export function AttemptHistory({ guesses }: AttemptHistoryProps) {
  return (
    <section className="panel panel-motion p-4">
      <h3 className="page-title text-xl">Historico de palpites</h3>
      {!guesses.length ? (
        <p className="mt-2 text-sm text-[color:var(--text-muted)]">Nenhum palpite enviado ainda.</p>
      ) : (
        <ul className="mt-3 space-y-2">
          {guesses.map((guess, index) => (
            <li
              key={`${guess}-${index}`}
              className="list-pop panel-soft px-3 py-2 text-sm text-[color:var(--text-body)]"
              style={{ animationDelay: `${index * 45}ms` }}
            >
              Tentativa {index + 1}: <span className="font-semibold text-[color:var(--text-strong)]">{guess}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
