import { useEffect, useRef, useState } from 'react'
import { GameSession } from '../components/game/GameSession'
import { Icon } from '../components/common/Icon'
import { disorderCategories } from '../data/disorders'
import { audioManager } from '../lib/audio'
import { generatePracticeProceduralCase } from '../lib/proceduralCases'
import { getActiveSession, getPracticeSelection, getUserProgress, savePracticeSelection } from '../lib/storage'
import { difficultyLabels, getPracticePool, selectPracticeDisorder } from '../lib/study'
import type { Case, Difficulty } from '../types/models'

function createPracticeCase(selection: ReturnType<typeof getPracticeSelection>): Case | null {
  const { attempts } = getUserProgress()
  const current = getActiveSession('practice')
  const disorder = selectPracticeDisorder({
    pool: getPracticePool(selection.category, selection.difficulty),
    attempts,
    servedIds: selection.servedIds,
    adaptive: selection.adaptive,
  })
  if (!disorder) return null
  const recentCases = attempts.flatMap((attempt) => attempt.caseSnapshot ? [attempt.caseSnapshot] : [])
  if (current) recentCases.push(current.caseData)
  // The difficulty filter is the level of the written case; "all" lets the generator pick one.
  const level = selection.difficulty === 'all' ? undefined : selection.difficulty as Difficulty
  return generatePracticeProceduralCase({ disorderId: disorder.id, level, seed: crypto.randomUUID(), recentCases })
}

export function PracticePage() {
  const [selection, setSelection] = useState(getPracticeSelection)
  const [selectedCase, setSelectedCase] = useState<Case | null>(() =>
    getActiveSession('practice')?.caseData ?? createPracticeCase(getPracticeSelection()),
  )
  const [confirmReplace, setConfirmReplace] = useState(false)
  const [completed, setCompleted] = useState(false)
  const caseRef = useRef<HTMLDivElement>(null)
  const scrollToNewCase = useRef(false)
  const pool = getPracticePool(selection.category, selection.difficulty)

  useEffect(() => {
    if (selectedCase) {
      const saved = getPracticeSelection()
      if (saved.servedIds.at(-1) !== selectedCase.correctDisorderId) {
        savePracticeSelection({ ...saved, servedIds: [...saved.servedIds.slice(-49), selectedCase.correctDisorderId] })
      }
    }
    if (scrollToNewCase.current) {
      scrollToNewCase.current = false
      const frame = window.requestAnimationFrame(() => caseRef.current!.scrollIntoView({
        block: 'start', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
      }))
      return () => window.cancelAnimationFrame(frame)
    }
  }, [selectedCase])

  function updateSelection(partial: Partial<typeof selection>) {
    const next = { ...getPracticeSelection(), ...partial }
    setSelection(next)
    savePracticeSelection(next)
  }

  function nextCase(force = false) {
    const current = getActiveSession('practice')
    if (!force && !completed && current && current.guesses.length > 0) {
      setConfirmReplace(true)
      return
    }
    audioManager.playClick()
    scrollToNewCase.current = true
    setSelectedCase(createPracticeCase(getPracticeSelection()))
    setCompleted(false)
    setConfirmReplace(false)
  }

  return (
    <div className="page-stack">
      <header className="page-header">
        <h1 className="display">Treino</h1>
      </header>

      <section className="card filter-card" aria-label="Configurar próximo caso">
        <div className="filter-grid">
          <label className="field">Tema
            <select className="select" value={selection.category} onChange={(event) => updateSelection({ category: event.target.value })}>
              <option value="all">Todos os temas</option>
              {disorderCategories.map((category) => <option key={category}>{category}</option>)}
            </select>
          </label>
          <label className="field">Dificuldade
            <select className="select" value={selection.difficulty} onChange={(event) => updateSelection({ difficulty: event.target.value })}>
              <option value="all">Todas</option>
              {Object.entries(difficultyLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
          </label>
          <button type="button" className="btn btn-primary" disabled={!pool.length} onClick={() => nextCase()}><Icon name="shuffle" width="18" height="18" />Novo caso</button>
        </div>
        <label className="switch-row">
          <input type="checkbox" className="switch" checked={selection.adaptive} onChange={(event) => updateSelection({ adaptive: event.target.checked })} />
          <span><strong>Seleção inteligente</strong><span>Prioriza temas novos e seus erros.</span></span>
        </label>
        {!pool.length && <p className="notice" role="status">Nenhum caso com esses filtros.</p>}
        {pool.length === 1 && <p className="notice" role="status">Só uma hipótese possível com esses filtros.</p>}
        {confirmReplace && <div className="callout replace-prompt" role="group" aria-label="Trocar caso em andamento">
          <p>Descartar o caso em andamento?</p>
          <button className="btn btn-ghost btn-sm" onClick={() => setConfirmReplace(false)}>Continuar</button>
          <button className="btn btn-primary btn-sm" onClick={() => nextCase(true)}>Trocar caso</button>
        </div>}
      </section>

      <div ref={caseRef} className="scroll-anchor">{selectedCase && <GameSession key={selectedCase.id} caseData={selectedCase} mode="practice" onComplete={() => setCompleted(true)} onNext={() => nextCase(true)} />}</div>
    </div>
  )
}
