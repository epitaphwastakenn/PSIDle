import { useMemo, useState } from 'react'
import { GameSession } from '../components/game/GameSession'
import { disorderCategories } from '../data/disorders'
import { generatePracticeProceduralCase } from '../lib/proceduralCases'
import type { Case, Difficulty } from '../types/models'

type DifficultyFilter = Difficulty | 'all'

function buildSeed(): string {
  return `practice-${Date.now()}-${Math.random()}`
}

export function PracticePage() {
  const categories = useMemo(() => disorderCategories, [])
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>('all')
  const [selectedCase, setSelectedCase] = useState<Case>(() =>
    generatePracticeProceduralCase({
      seed: buildSeed(),
    }),
  )

  function generateCaseWithFilters(seed: string): Case {
    return generatePracticeProceduralCase({
      seed,
      category: categoryFilter === 'all' ? undefined : categoryFilter,
      difficulty: difficultyFilter === 'all' ? undefined : difficultyFilter,
    })
  }

  function pickRandomCase() {
    setSelectedCase(generateCaseWithFilters(buildSeed()))
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="page-title text-3xl">Modo treino</h1>
        <p className="page-subtitle text-sm">Gere casos novos com filtros para praticar por tema e dificuldade.</p>
      </div>

      <section className="panel p-4">
        <div className="grid gap-3 md:grid-cols-3">
          <label className="text-sm">
            <span className="mb-1 block font-semibold text-[color:var(--text-body)]">Categoria</span>
            <select
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
              className="field-select"
            >
              <option value="all">Todas</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm">
            <span className="mb-1 block font-semibold text-[color:var(--text-body)]">Dificuldade</span>
            <select
              value={difficultyFilter}
              onChange={(event) => setDifficultyFilter(event.target.value as DifficultyFilter)}
              className="field-select"
            >
              <option value="all">Todas</option>
              <option value="easy">Facil</option>
              <option value="medium">Media</option>
              <option value="hard">Dificil</option>
            </select>
          </label>

          <div className="flex items-end gap-2">
            <button type="button" onClick={pickRandomCase} className="btn-primary w-full sm:w-auto">
              Gerar novo caso
            </button>
          </div>
        </div>
      </section>

      <GameSession key={selectedCase.id} caseData={selectedCase} mode="practice" />
    </div>
  )
}
