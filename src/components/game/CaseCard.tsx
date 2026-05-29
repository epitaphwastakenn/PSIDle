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
    <article className="panel panel-motion p-5 md:p-6">
      <div className="mb-4 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[color:var(--text-muted)]">
        <span className="chip rounded-full px-3 py-1">{caseData.category}</span>
        <span className="chip rounded-full px-3 py-1">{difficultyLabel[caseData.difficulty]}</span>
      </div>
      <h2 className="page-title text-2xl">{caseData.title}</h2>
      <p className="mt-3 text-sm leading-relaxed text-[color:var(--text-body)] md:text-base">{caseData.vignette}</p>
    </article>
  )
}
