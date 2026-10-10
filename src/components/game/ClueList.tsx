import type { CaseClue } from '../../types/models'
import { Icon } from '../common/Icon'

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
  const sorted = clues.toSorted((a, b) => a.order - b.order)
  const revealed = Math.max(0, Math.min(revealedCluesCount, sorted.length))

  return (
    <section className="card side-card">
      <div className="side-card-head">
        <h3 className="h3">Pistas</h3>
        <span className="tag tag-accent mono">{revealed}/{sorted.length}</span>
      </div>
      <ul className="clue-list">
        {sorted.map((clue, index) => index < revealed ? (
          <li key={clue.id} className="clue-item clue-reveal">
            <span className="tile tile-sm tile-accent">{index + 1}</span>
            <div><span className="clue-type">{clueTypeLabels[clue.type]}</span><p>{clue.text}</p></div>
          </li>
        ) : (
          <li key={clue.id} className="clue-locked">
            <span className="tile tile-sm"><Icon name="lock" /></span>Pista {index + 1}
          </li>
        ))}
      </ul>
    </section>
  )
}
