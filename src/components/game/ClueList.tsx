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
      <section className="panel panel-motion p-4">
        <h3 className="page-title text-xl">Pistas</h3>
        <p className="mt-2 text-sm text-[color:var(--text-muted)]">Ainda sem pistas extras. Um erro libera a proxima dica.</p>
      </section>
    )
  }

  return (
    <section className="panel panel-motion p-4">
      <h3 className="page-title text-xl">Pistas reveladas</h3>
      <ul className="mt-3 space-y-3">
        {visibleClues.map((clue, index) => (
          <li
            key={clue.id}
            className="clue-reveal panel-soft px-3 py-2 text-sm text-[color:var(--text-body)]"
            style={{ animationDelay: `${index * 55}ms` }}
          >
            <p className="font-semibold text-[color:var(--text-strong)]">{clueTypeLabels[clue.type]}</p>
            <p>{clue.text}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
