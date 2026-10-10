import { useEffect, useLayoutEffect, useState } from 'react'
import type { PropsWithChildren } from 'react'
import { useLocation } from 'react-router-dom'
import { hasSeenTutorial, markTutorialSeen } from '../../lib/storage'
import { applyThemeToDocument, getSavedTheme, saveTheme, type ThemeMode } from '../../lib/theme'
import { HowToPlay } from '../common/HowToPlay'
import { LevelUpOverlay } from '../common/LevelUpOverlay'
import { Footer } from './Footer'
import { Navbar } from './Navbar'

export function AppShell({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState<ThemeMode>(() => getSavedTheme())
  const location = useLocation()
  const [helpOpen, setHelpOpen] = useState(false)
  const [tutorialSeen, setTutorialSeen] = useState(hasSeenTutorial)

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  useEffect(() => {
    applyThemeToDocument(theme)
    saveTheme(theme)
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0b1214' : '#f3f6f5')
  }, [theme])

  useEffect(() => {
    // Feeds the pointer position to the hover spotlight on clickable cards.
    function onPointerMove(event: PointerEvent) {
      const card = (event.target as Element | null)?.closest?.<HTMLElement>('.card-link')
      if (!card) return
      const rect = card.getBoundingClientRect()
      card.style.setProperty('--mx', `${event.clientX - rect.left}px`)
      card.style.setProperty('--my', `${event.clientY - rect.top}px`)
    }
    document.addEventListener('pointermove', onPointerMove, { passive: true })
    return () => document.removeEventListener('pointermove', onPointerMove)
  }, [])

  function handleToggleTheme() {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }

  function handleCloseHelp() {
    setHelpOpen(false)
    if (!tutorialSeen) {
      markTutorialSeen()
      setTutorialSeen(true)
    }
  }

  // First visit to a game screen opens the tutorial once; afterwards it lives behind the "?" button.
  const onGameRoute = location.pathname.startsWith('/daily') || location.pathname === '/practice'

  return (
    <div className="app-root">
      <Navbar theme={theme} onToggleTheme={handleToggleTheme} onHelp={() => setHelpOpen(true)} />
      <HowToPlay open={helpOpen || (onGameRoute && !tutorialSeen)} onClose={handleCloseHelp} />
      <LevelUpOverlay />
      <main id="main-content" tabIndex={-1} key={`${location.pathname}${location.search}`} className="page-motion page-shell">
        {children}
      </main>
      <Footer />
    </div>
  )
}
