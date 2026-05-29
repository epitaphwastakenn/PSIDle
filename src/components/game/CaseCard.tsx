import type { Case } from '../../types/models'

interface CaseCardProps {
  caseData: Case
}

export function CaseCard({ caseData }: CaseCardProps) {
  const difficultyLabel: Record<Case['difficulty'], string> = {
    easy: 'Fácil',
    medium: 'Médio',
    hard: 'Difícil',
  }

  return (
    <article className="rounded-2xl border border-surface-200 bg-white p-5 shadow-card">
      <div className="mb-4 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
        <span className="rounded-full bg-surface-100 px-3 py-1">{caseData.category}</span>
        <span className="rounded-full bg-surface-100 px-3 py-1">{difficultyLabel[caseData.difficulty]}</span>
      </div>
      <h2 className="font-title text-2xl text-denim-600">{caseData.title}</h2>
      <p className="mt-3 leading-relaxed text-slate-700">{caseData.vignette}</p>
    </article>
  )
}
