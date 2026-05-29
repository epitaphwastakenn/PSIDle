const THEME_STORAGE_KEY = 'psidle.theme.v1'

export type ThemeMode = 'dark' | 'light'

function isThemeMode(value: string | null): value is ThemeMode {
  return value === 'dark' || value === 'light'
}

export function getSavedTheme(): ThemeMode {
  if (typeof window === 'undefined') {
    return 'dark'
  }

  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY)
    return isThemeMode(stored) ? stored : 'dark'
  } catch {
    return 'dark'
  }
}

export function saveTheme(theme: ThemeMode): void {
  if (typeof window === 'undefined') {
    return
  }

  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    // no-op
  }
}

export function applyThemeToDocument(theme: ThemeMode): void {
  if (typeof document === 'undefined') {
    return
  }

  document.documentElement.setAttribute('data-theme', theme)
}
