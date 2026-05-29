import type { CaseClue } from '../../types/models'

interface ClueListProps {
  clues: CaseClue[]
  revealedCluesCount: number
}

const clueTypeLabels: Record<CaseClue['type'], string> = {
  chief_complaint: 'Queixa principal',
  symptoms: 'Sintomas',
  duration: 'Duração',
  impairment: 'Prejuízo',
  exclusion: 'Exclusão',
  differential: 'Diferencial',
}

export function ClueList({ clues, revealedCluesCount }: ClueListProps) {
  const visibleClues = clues
    .sort((a, b) => a.order - b.order)
    .slice(0, Math.max(0, Math.min(revealedCluesCount, clues.length)))

  if (!visibleClues.length) {
    return (
      <section className="rounded-2xl border border-surface-200 bg-white p-4 shadow-card">
        <h3 className="font-title text-xl text-denim-600">Pistas</h3>
        <p className="mt-2 text-sm text-slate-600">Ainda sem pistas extras. Um erro libera a próxima dica.</p>
      </section>
    )
  }

  return (
    <section className="rounded-2xl border border-surface-200 bg-white p-4 shadow-card">
      <h3 className="font-title text-xl text-denim-600">Pistas reveladas</h3>
      <ul className="mt-3 space-y-3">
        {visibleClues.map((clue) => (
          <li key={clue.id} className="rounded-xl bg-surface-50 px-3 py-2 text-sm text-slate-700">
            <p className="font-semibold text-denim-600">{clueTypeLabels[clue.type]}</p>
            <p>{clue.text}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
