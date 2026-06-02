import type { Case } from '../../types/models'

interface CaseCardProps {
  caseData: Case
}

export function CaseCard({ caseData }: CaseCardProps) {
  const difficultyLabel: Record<Case['difficulty'], string> = {
    easy: 'Facil',
    medium: 'Media',
    hard: 'Dificil',
  }

  return (
    <article className="panel panel-motion case-stage p-5 md:p-6">
      <div className="case-stage-top">
        <div>
          <p className="case-eyebrow">Vinheta clinica</p>
          <h2 className="page-title mt-2 text-2xl md:text-3xl">{caseData.title}</h2>
        </div>
        <div className="case-badge-row">
          <span className="chip case-chip rounded-full px-3 py-1">{caseData.category}</span>
          <span className="chip case-chip rounded-full px-3 py-1">{difficultyLabel[caseData.difficulty]}</span>
        </div>
      </div>

      <div className="case-reading-surface mt-4 p-4 md:p-5">
        <p className="case-reading-copy text-sm leading-7 text-[color:var(--text-body)] md:text-[1.02rem]">
          {caseData.vignette}
        </p>
      </div>
    </article>
  )
}

