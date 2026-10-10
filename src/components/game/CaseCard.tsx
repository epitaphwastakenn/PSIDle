import type { Case } from '../../types/models'

interface CaseCardProps {
  caseData: Case
  /** The diagnostic family is hidden while playing, since "same family" is part of the feedback. */
  revealCategory?: boolean
}

const difficultyLabel: Record<Case['difficulty'], string> = {
  easy: 'Fácil',
  medium: 'Médio',
  hard: 'Difícil',
}

const difficultyTone: Record<Case['difficulty'], string> = {
  easy: 'tag-ok',
  medium: 'tag-warn',
  hard: 'tag-bad',
}

export function CaseCard({ caseData, revealCategory = true }: CaseCardProps) {
  return (
    <article className="card case-card">
      <div className="case-card-head">
        <div className="flex flex-wrap gap-2">
          <span className="tag">{revealCategory ? caseData.category : 'Família oculta'}</span>
          <span className={`tag ${difficultyTone[caseData.difficulty]}`}>{difficultyLabel[caseData.difficulty]}</span>
        </div>
      </div>
      <h2 className="case-title">{caseData.title}</h2>
      <p className="case-text">{caseData.vignette}</p>
    </article>
  )
}
