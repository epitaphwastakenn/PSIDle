import { useEffect, useState } from 'react'
import type { PropsWithChildren } from 'react'
import { useLocation } from 'react-router-dom'
import { applyThemeToDocument, getSavedTheme, saveTheme, type ThemeMode } from '../../lib/theme'
import { Footer } from './Footer'
import { Navbar } from './Navbar'

export function AppShell({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState<ThemeMode>(() => getSavedTheme())
  const location = useLocation()

  useEffect(() => {
    applyThemeToDocument(theme)
    saveTheme(theme)
  }, [theme])

  function handleToggleTheme() {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }

  return (
    <div className="app-ambient flex min-h-screen flex-col">
      <Navbar theme={theme} onToggleTheme={handleToggleTheme} />
      <main
        key={`${location.pathname}${location.search}`}
        className="page-motion page-shell mx-auto w-full max-w-7xl flex-1 px-4 py-5 md:px-5 md:py-7 xl:px-6"
      >
        {children}
      </main>
      <Footer />
    </div>
  )
}
