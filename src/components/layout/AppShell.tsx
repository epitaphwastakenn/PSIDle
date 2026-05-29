import { useEffect, useState } from 'react'
import type { PropsWithChildren } from 'react'
import { applyThemeToDocument, getSavedTheme, saveTheme, type ThemeMode } from '../../lib/theme'
import { Footer } from './Footer'
import { Navbar } from './Navbar'

export function AppShell({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState<ThemeMode>(() => getSavedTheme())

  useEffect(() => {
    applyThemeToDocument(theme)
    saveTheme(theme)
  }, [theme])

  function handleToggleTheme() {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }

  return (
    <div className="min-h-screen pb-6">
      <Navbar theme={theme} onToggleTheme={handleToggleTheme} />
      <main className="mx-auto w-full max-w-6xl px-4 py-4 md:py-6">{children}</main>
      <Footer />
    </div>
  )
}
