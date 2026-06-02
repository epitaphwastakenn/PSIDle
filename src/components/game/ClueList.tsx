import type { CaseClue } from '../../types/models'

interface ClueListProps {
  clues: CaseClue[]
  revealedCluesCount: number
}

const clueTypeLabels: Record<CaseClue['type'], string> = {
  chief_complaint: 'Queixa principal',
  symptoms: 'Sintomas',
  duration: 'Duracao',
  impairment: 'Prejuizo',
  exclusion: 'Exclusao',
  differential: 'Diferencial',
}

export function ClueList({ clues, revealedCluesCount }: ClueListProps) {
  const visibleClues = clues
    .sort((a, b) => a.order - b.order)
    .slice(0, Math.max(0, Math.min(revealedCluesCount, clues.length)))

  if (!visibleClues.length) {
    return (
      <section className="panel panel-motion p-4 md:p-5">
        <p className="guess-eyebrow">Pistas</p>
        <h3 className="page-title mt-2 text-xl">Nenhuma pista extra ainda</h3>
        <p className="mt-2 text-sm text-[color:var(--text-muted)]">No treino, cada erro abre a proxima dica para afinar o raciocinio.</p>
      </section>
    )
  }

  return (
    <section className="panel panel-motion p-4 md:p-5">
      <p className="guess-eyebrow">Pistas</p>
      <h3 className="page-title mt-2 text-xl">Pistas reveladas</h3>
      <ul className="mt-4 space-y-3">
        {visibleClues.map((clue, index) => (
          <li
            key={clue.id}
            className="clue-reveal panel-soft px-3 py-3 text-sm text-[color:var(--text-body)]"
            style={{ animationDelay: `${index * 55}ms` }}
          >
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[color:var(--accent)]">
              {clueTypeLabels[clue.type]}
            </p>
            <p className="mt-2 leading-relaxed">{clue.text}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

