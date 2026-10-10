import { useState } from 'react'
import type { FormEvent } from 'react'
import { AchievementGrid } from '../components/profile/AchievementGrid'
import { DailyStatsCard } from '../components/profile/DailyStatsCard'
import { getDailyStats } from '../lib/daily'
import { LevelCard, ProfileStats } from '../components/profile/ProfileStats'
import { achievements } from '../data/achievements'
import { audioManager } from '../lib/audio'
import { getUserProgress, saveUserProgress } from '../lib/storage'
import { getCategoryStats } from '../lib/study'
import { Icon } from '../components/common/Icon'

export function ProfilePage() {
  const [progress, setProgress] = useState(() => getUserProgress())
  const [nameInput, setNameInput] = useState(progress.displayName ?? '')
  const [nameSaved, setNameSaved] = useState(false)
  const categoryStats = getCategoryStats(progress.attempts).filter((item) => item.played > 0)
    .sort((a, b) => a.accuracy - b.accuracy)
  const totalCases = progress.attempts.length
  const dailyCases = progress.attempts.filter((attempt) => attempt.mode === 'daily').length
  const practiceCases = progress.attempts.filter((attempt) => attempt.mode === 'practice').length
  const solvedCases = progress.attempts.filter((attempt) => attempt.solved).length
  const accuracy = totalCases > 0 ? solvedCases / totalCases : 0
  const displayName = progress.displayName?.trim()
  const profileInitial = (displayName?.charAt(0) || 'ψ').toUpperCase()

  function handleSaveName(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    audioManager.playClick()
    const nextName = nameInput.trim().slice(0, 28)
    const updatedProgress = {
      ...progress,
      displayName: nextName || undefined,
    }
    saveUserProgress(updatedProgress)
    setProgress(updatedProgress)
    setNameInput(nextName)
    setNameSaved(true)
  }

  return (
    <div className="page-stack">
      <header className="page-header">
        <h1 className="display">Perfil</h1>
      </header>

      <div className="profile-top">
        <section className="card identity-card">
          <div className="identity-avatar" aria-hidden="true">{profileInitial}</div>
          <h2 className="identity-name min-w-0">{displayName || 'Você'}</h2>
          <details className="name-editor">
            <summary><Icon name="edit" width="16" height="16" />Editar nome</summary>
            <form onSubmit={handleSaveName} className="name-form">
              <input value={nameInput} onChange={(event) => { setNameInput(event.target.value); setNameSaved(false) }} maxLength={28} placeholder="Seu nome" aria-label="Seu nome" className="input" />
              <button type="submit" className="btn btn-primary">Salvar</button>
              {nameSaved && <p className="save-status saved" role="status">Salvo.</p>}
            </form>
          </details>
        </section>
        <LevelCard level={progress.level} xp={progress.xp} coins={progress.coins} streak={progress.streak} />
      </div>

      <ProfileStats totalCases={totalCases} dailyCases={dailyCases} practiceCases={practiceCases} accuracy={accuracy} />

      <DailyStatsCard stats={getDailyStats(progress.attempts)} currentStreak={progress.streak} />

      <AchievementGrid achievements={achievements} unlockedIds={progress.achievements} />

      <section>
        <div className="section-head">
          <h2 className="h2">Por tema</h2>
        </div>
        {categoryStats.length ? (
          <div className="card category-list">
            {categoryStats.map((item) => (
              <div className="category-row" key={item.category}>
                <div className="category-row-top"><span>{item.category}</span><strong>{item.accuracy}%</strong></div>
                <div className={`progress progress-thin${item.accuracy >= 70 ? ' progress-ok' : ''}`}><span style={{ width: `${item.accuracy}%` }} /></div>
                <small className="small muted">{item.solved}/{item.played}</small>
              </div>
            ))}
          </div>
        ) : (
          <div className="card empty-state"><p className="muted">Sem dados ainda.</p></div>
        )}
      </section>
    </div>
  )
}
