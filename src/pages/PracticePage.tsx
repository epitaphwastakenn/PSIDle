import { useMemo, useState } from 'react'
import { GameSession } from '../components/game/GameSession'
import { disorderCategories } from '../data/disorders'
import { audioManager } from '../lib/audio'
import { generatePracticeProceduralCase } from '../lib/proceduralCases'
import type { Case, Difficulty } from '../types/models'

type DifficultyFilter = Difficulty | 'all'

function buildSeed(): string {
  return `practice-${Date.now()}-${Math.random()}`
}

const difficultyOptions: Array<{ value: DifficultyFilter; label: string }> = [
  { value: 'all', label: 'Todas' },
  { value: 'easy', label: 'Facil' },
  { value: 'medium', label: 'Media' },
  { value: 'hard', label: 'Dificil' },
]

function getDifficultyLabel(value: DifficultyFilter): string {
  return difficultyOptions.find((option) => option.value === value)?.label ?? 'Todas'
}

export function PracticePage() {
  const categories = useMemo(() => disorderCategories, [])
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>('all')
  const [recentDisorderIds, setRecentDisorderIds] = useState<string[]>([])
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
      excludeDisorderIds: Array.from(new Set([selectedCase.correctDisorderId, ...recentDisorderIds.slice(-7)])),
    })
  }

  function pickRandomCase() {
    audioManager.playClick()
    const generated = generateCaseWithFilters(buildSeed())
    setSelectedCase(generated)
    setRecentDisorderIds((previous) => [...previous.slice(-15), generated.correctDisorderId])
  }

  const activeCategoryLabel = categoryFilter === 'all' ? 'Todas as categorias' : categoryFilter
  const activeDifficultyLabel = getDifficultyLabel(difficultyFilter)

  return (
    <div className="space-y-4">
      <section className="panel practice-hero p-4 md:p-5">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-3xl">
            <div className="hero-kicker-row">
              <span className="hero-kicker">Modo treino</span>
              <span className="hero-subkicker">Casos ilimitados • filtros ativos • repeticao reduzida</span>
            </div>
            <h1 className="page-title mt-3 text-2xl md:text-4xl">Treino guiado para acertar com mais clareza.</h1>
            <p className="page-subtitle mt-2 max-w-2xl text-sm leading-relaxed md:text-base">
              Escolha o foco da sessao, gere um caso novo e receba pistas, historico e resultado organizados para leitura rapida.
            </p>
          </div>

          <div className="practice-summary-grid">
            <div className="mini-stat">
              <span className="mini-stat-label">Categoria</span>
              <span className="mini-stat-value text-base md:text-lg">{activeCategoryLabel}</span>
            </div>
            <div className="mini-stat">
              <span className="mini-stat-label">Dificuldade</span>
              <span className="mini-stat-value text-base md:text-lg">{activeDifficultyLabel}</span>
            </div>
            <div className="mini-stat">
              <span className="mini-stat-label">Sessao</span>
              <span className="mini-stat-value text-base md:text-lg">Treino livre</span>
            </div>
          </div>
        </div>
      </section>

      <section className="panel practice-control-panel p-4 md:p-5">
        <div className="practice-control-grid">
          <div className="practice-control-section">
            <div className="filter-heading-row">
              <div>
                <p className="filter-label">Categoria</p>
                <p className="filter-caption">Defina o territorio clinico que voce quer praticar agora.</p>
              </div>
              <span className="filter-current">Ativa: {activeCategoryLabel}</span>
            </div>
            <div className="category-choice-grid mt-3">
              <button
                type="button"
                aria-pressed={categoryFilter === 'all'}
                onClick={() => {
                  audioManager.playClick()
                  setCategoryFilter('all')
                }}
                className={categoryFilter === 'all' ? 'filter-pill filter-pill-active' : 'filter-pill'}
              >
                Todas
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  aria-pressed={categoryFilter === category}
                  onClick={() => {
                    audioManager.playClick()
                    setCategoryFilter(category)
                  }}
                  className={categoryFilter === category ? 'filter-pill filter-pill-active' : 'filter-pill'}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="practice-control-stack">
            <div className="practice-control-section">
              <div className="filter-heading-row">
                <div>
                  <p className="filter-label">Dificuldade</p>
                  <p className="filter-caption">Ajuste a ambiguidade sem sair do fluxo.</p>
                </div>
                <span className="filter-current">Ativa: {activeDifficultyLabel}</span>
              </div>
              <div className="segmented-control mt-3">
                {difficultyOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    aria-pressed={difficultyFilter === option.value}
                    onClick={() => {
                      audioManager.playClick()
                      setDifficultyFilter(option.value)
                    }}
                    className={difficultyFilter === option.value ? 'segment-btn segment-btn-active' : 'segment-btn'}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="practice-action-bar">
              <div className="practice-action-copy">
                <p className="filter-label">Nova vinheta</p>
                <p className="filter-caption">Evita repeticoes recentes e respeita seus filtros.</p>
              </div>
              <button type="button" onClick={pickRandomCase} className="btn-primary practice-generate-btn">
                Gerar novo caso
              </button>
            </div>
          </div>
        </div>
      </section>

      <GameSession key={selectedCase.id} caseData={selectedCase} mode="practice" />
    </div>
  )
}
