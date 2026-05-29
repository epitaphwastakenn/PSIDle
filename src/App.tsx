import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AppShell } from './components/layout/AppShell'
import { audioManager } from './lib/audio'
import { getUserSettings } from './lib/settings'
import { AboutPage } from './pages/AboutPage'
import { DailyPage } from './pages/DailyPage'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { PracticePage } from './pages/PracticePage'
import { ProfilePage } from './pages/ProfilePage'
import { ReviewPage } from './pages/ReviewPage'
import { SettingsPage } from './pages/SettingsPage'
import { TasksPage } from './pages/TasksPage'

function App() {
  useEffect(() => {
    audioManager.setSettings(getUserSettings())

    let unlocked = false
    const unlockAudio = () => {
      if (unlocked) {
        return
      }

      unlocked = true
      audioManager.unlock()
      window.removeEventListener('pointerdown', unlockAudio)
      window.removeEventListener('keydown', unlockAudio)
      window.removeEventListener('touchstart', unlockAudio)
    }

    window.addEventListener('pointerdown', unlockAudio)
    window.addEventListener('keydown', unlockAudio)
    window.addEventListener('touchstart', unlockAudio, { passive: true })

    return () => {
      window.removeEventListener('pointerdown', unlockAudio)
      window.removeEventListener('keydown', unlockAudio)
      window.removeEventListener('touchstart', unlockAudio)
    }
  }, [])

  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/daily" element={<DailyPage />} />
        <Route path="/practice" element={<PracticePage />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AppShell>
  )
}

export default App
