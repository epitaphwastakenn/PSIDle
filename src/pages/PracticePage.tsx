import { useMemo, useState } from 'react'
import { disorderCategories } from '../data/disorders'
import { GameSession } from '../components/game/GameSession'
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

  function applyFilters() {
    setSelectedCase(generateCaseWithFilters(buildSeed()))
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-title text-3xl text-denim-600">Modo treino</h1>
        <p className="text-sm text-slate-600">Escolha filtros e gere novos casos ficticios de forma procedural.</p>
      </div>

      <section className="rounded-2xl border border-surface-200 bg-white p-4 shadow-card">
        <div className="grid gap-3 md:grid-cols-3">
          <label className="text-sm">
            <span className="mb-1 block font-semibold text-slate-700">Categoria</span>
            <select
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
              className="w-full rounded-xl border border-slate-300 px-3 py-2"
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
            <span className="mb-1 block font-semibold text-slate-700">Dificuldade</span>
            <select
              value={difficultyFilter}
              onChange={(event) => setDifficultyFilter(event.target.value as DifficultyFilter)}
              className="w-full rounded-xl border border-slate-300 px-3 py-2"
            >
              <option value="all">Todas</option>
              <option value="easy">Facil</option>
              <option value="medium">Medio</option>
              <option value="hard">Dificil</option>
            </select>
          </label>

          <div className="flex items-end gap-2">
            <button
              type="button"
              onClick={applyFilters}
              className="rounded-xl border border-denim-300 px-4 py-2 text-sm font-semibold text-denim-600 transition hover:bg-denim-50"
            >
              Aplicar filtros
            </button>
            <button
              type="button"
              onClick={pickRandomCase}
              className="rounded-xl bg-denim-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-denim-500"
            >
              Gerar novo caso
            </button>
          </div>
        </div>
      </section>

      <GameSession key={selectedCase.id} caseData={selectedCase} mode="practice" />
    </div>
  )
}
