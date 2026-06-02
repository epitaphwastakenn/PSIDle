interface AttemptHistoryProps {
  guesses: string[]
}

export function AttemptHistory({ guesses }: AttemptHistoryProps) {
  return (
    <section className="panel panel-motion p-4 md:p-5">
      <p className="guess-eyebrow">Tentativas</p>
      <h3 className="page-title mt-2 text-xl">Historico de palpites</h3>
      {!guesses.length ? (
        <p className="mt-2 text-sm text-[color:var(--text-muted)]">Nenhum palpite enviado ainda. Seu primeiro chute define o ritmo da rodada.</p>
      ) : (
        <ul className="mt-4 space-y-2.5">
          {guesses.map((guess, index) => (
            <li
              key={`${guess}-${index}`}
              className="list-pop panel-soft px-3 py-3 text-sm text-[color:var(--text-body)]"
              style={{ animationDelay: `${index * 45}ms` }}
            >
              <span className="text-xs font-extrabold uppercase tracking-[0.14em] text-[color:var(--text-muted)]">
                Tentativa {index + 1}
              </span>
              <p className="mt-1 font-semibold text-[color:var(--text-strong)]">{guess}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

