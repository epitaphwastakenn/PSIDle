import { useState } from 'react'
import type { FormEvent } from 'react'
import { AchievementGrid } from '../components/profile/AchievementGrid'
import { ProfileStats } from '../components/profile/ProfileStats'
import { achievements } from '../data/achievements'
import { audioManager } from '../lib/audio'
import { getUserProgress, saveUserProgress } from '../lib/storage'

export function ProfilePage() {
  const [progress, setProgress] = useState(() => getUserProgress())
  const [nameInput, setNameInput] = useState(progress.displayName ?? '')
  const totalCases = progress.attempts.length
  const dailyCases = progress.attempts.filter((attempt) => attempt.mode === 'daily').length
  const practiceCases = progress.attempts.filter((attempt) => attempt.mode === 'practice').length
  const solvedCases = progress.attempts.filter((attempt) => attempt.solved).length
  const accuracy = totalCases > 0 ? solvedCases / totalCases : 0
  const displayName = progress.displayName?.trim()
  const profileInitial = (displayName?.charAt(0) ?? 'P').toUpperCase()

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
  }

  return (
    <div className="space-y-5">
      <section className="panel profile-hero p-5">
        <div className="profile-hero-grid">
          <div className="flex items-center gap-4">
            <div className="profile-avatar" aria-hidden="true">
              {profileInitial}
            </div>
            <div>
              <span className="hero-kicker">Perfil</span>
              <h1 className="page-title mt-2 text-3xl">
                {displayName ? `Bem vindo de volta, ${displayName}` : 'Seu painel de estudo'}
              </h1>
              <p className="page-subtitle mt-2 text-sm">Nivel, acertos, streak e conquistas em uma visao unica.</p>
            </div>
          </div>

          <form onSubmit={handleSaveName} className="profile-name-card">
            <label className="text-sm">
              <span className="mb-1 block font-semibold text-[color:var(--text-body)]">Nome do jogador</span>
              <input
                value={nameInput}
                onChange={(event) => setNameInput(event.target.value)}
                maxLength={28}
                placeholder="Como voce quer ser chamado?"
                className="field-input"
              />
            </label>
            <button type="submit" className="btn-primary">
              Salvar
            </button>
          </form>
        </div>
      </section>

      <ProfileStats
        level={progress.level}
        xp={progress.xp}
        coins={progress.coins}
        streak={progress.streak}
        totalCases={totalCases}
        dailyCases={dailyCases}
        practiceCases={practiceCases}
        accuracy={accuracy}
      />

      <AchievementGrid achievements={achievements} unlockedIds={progress.achievements} />
    </div>
  )
}
