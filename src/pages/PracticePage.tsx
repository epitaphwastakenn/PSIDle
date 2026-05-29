import { useMemo, useState } from 'react'
import { approvedCases } from '../data/cases'
import { GameSession } from '../components/game/GameSession'
import type { Case, Difficulty } from '../types/models'

type DifficultyFilter = Difficulty | 'all'

function randomFromList<T>(list: T[]): T | null {
  if (!list.length) {
    return null
  }
  const index = Math.floor(Math.random() * list.length)
  return list[index]
}

export function PracticePage() {
  const categories = useMemo(() => Array.from(new Set(approvedCases.map((item) => item.category))), [])
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>('all')

  const filteredCases = useMemo(() => {
    return approvedCases.filter((item) => {
      const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter
      const matchesDifficulty = difficultyFilter === 'all' || item.difficulty === difficultyFilter
      return matchesCategory && matchesDifficulty
    })
  }, [categoryFilter, difficultyFilter])

  const [selectedCase, setSelectedCase] = useState<Case | null>(() => randomFromList(approvedCases))

  function pickRandomCase() {
    if (!filteredCases.length) {
      setSelectedCase(null)
      return
    }

    if (filteredCases.length === 1) {
      setSelectedCase(filteredCases[0])
      return
    }

    const next = randomFromList(filteredCases)
    if (!next) {
      setSelectedCase(null)
      return
    }

    if (next.id === selectedCase?.id) {
      const fallback = filteredCases.find((item) => item.id !== selectedCase.id) ?? next
      setSelectedCase(fallback)
      return
    }

    setSelectedCase(next)
  }

  function applyFilters() {
    const next = randomFromList(filteredCases)
    setSelectedCase(next)
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-title text-3xl text-denim-600">Modo treino</h1>
        <p className="text-sm text-slate-600">Escolha filtros e pratique com casos aleatórios.</p>
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
              <option value="easy">Fácil</option>
              <option value="medium">Médio</option>
              <option value="hard">Difícil</option>
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
              Caso aleatório
            </button>
          </div>
        </div>
      </section>

      {selectedCase ? (
        <GameSession key={`${selectedCase.id}-${selectedCase.category}`} caseData={selectedCase} mode="practice" />
      ) : (
        <section className="rounded-2xl border border-surface-200 bg-white p-4 text-sm text-slate-700 shadow-card">
          Nenhum caso encontrado com os filtros atuais.
        </section>
      )}
    </div>
  )
}
