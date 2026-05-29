export type UserSettings = {
  soundEnabled: boolean
  typingSoundEnabled: boolean
  feedbackSoundEnabled: boolean
  uiSoundEnabled: boolean
  masterVolume: number
  correctVolume: number
  wrongVolume: number
  typingVolume: number
  clickVolume: number
  correctMuted: boolean
  wrongMuted: boolean
  typingMuted: boolean
  clickMuted: boolean
}

export const DEFAULT_SETTINGS: UserSettings = {
  soundEnabled: true,
  typingSoundEnabled: true,
  feedbackSoundEnabled: true,
  uiSoundEnabled: true,
  masterVolume: 0.7,
  correctVolume: 0.75,
  wrongVolume: 0.65,
  typingVolume: 0.16,
  clickVolume: 0.35,
  correctMuted: false,
  wrongMuted: false,
  typingMuted: false,
  clickMuted: false,
}

const SETTINGS_STORAGE_KEY = 'psidle:user-settings:v1'

function isBrowserReady(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
}

function clampVolume(value: unknown, fallback = DEFAULT_SETTINGS.masterVolume): number {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    return fallback
  }

  return Math.min(1, Math.max(0, value))
}

function normalizeSettings(value: Partial<UserSettings> | null | undefined): UserSettings {
  return {
    ...DEFAULT_SETTINGS,
    ...value,
    soundEnabled: typeof value?.soundEnabled === 'boolean' ? value.soundEnabled : DEFAULT_SETTINGS.soundEnabled,
    typingSoundEnabled:
      typeof value?.typingSoundEnabled === 'boolean' ? value.typingSoundEnabled : DEFAULT_SETTINGS.typingSoundEnabled,
    feedbackSoundEnabled:
      typeof value?.feedbackSoundEnabled === 'boolean'
        ? value.feedbackSoundEnabled
        : DEFAULT_SETTINGS.feedbackSoundEnabled,
    uiSoundEnabled: typeof value?.uiSoundEnabled === 'boolean' ? value.uiSoundEnabled : DEFAULT_SETTINGS.uiSoundEnabled,
    masterVolume: clampVolume(value?.masterVolume, DEFAULT_SETTINGS.masterVolume),
    correctVolume: clampVolume(value?.correctVolume, DEFAULT_SETTINGS.correctVolume),
    wrongVolume: clampVolume(value?.wrongVolume, DEFAULT_SETTINGS.wrongVolume),
    typingVolume: clampVolume(value?.typingVolume, DEFAULT_SETTINGS.typingVolume),
    clickVolume: clampVolume(value?.clickVolume, DEFAULT_SETTINGS.clickVolume),
    correctMuted: typeof value?.correctMuted === 'boolean' ? value.correctMuted : DEFAULT_SETTINGS.correctMuted,
    wrongMuted: typeof value?.wrongMuted === 'boolean' ? value.wrongMuted : DEFAULT_SETTINGS.wrongMuted,
    typingMuted: typeof value?.typingMuted === 'boolean' ? value.typingMuted : DEFAULT_SETTINGS.typingMuted,
    clickMuted: typeof value?.clickMuted === 'boolean' ? value.clickMuted : DEFAULT_SETTINGS.clickMuted,
  }
}

export function getUserSettings(): UserSettings {
  if (!isBrowserReady()) {
    return DEFAULT_SETTINGS
  }

  try {
    const raw = window.localStorage.getItem(SETTINGS_STORAGE_KEY)
    if (!raw) {
      return DEFAULT_SETTINGS
    }

    return normalizeSettings(JSON.parse(raw) as Partial<UserSettings>)
  } catch {
    return DEFAULT_SETTINGS
  }
}

export function saveUserSettings(settings: UserSettings): void {
  if (!isBrowserReady()) {
    return
  }

  try {
    window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(normalizeSettings(settings)))
  } catch {
    // no-op: settings are optional client-side state
  }
}

export function updateUserSettings(partial: Partial<UserSettings>): UserSettings {
  const nextSettings = normalizeSettings({
    ...getUserSettings(),
    ...partial,
  })

  saveUserSettings(nextSettings)
  return nextSettings
}

export function resetUserSettings(): UserSettings {
  saveUserSettings(DEFAULT_SETTINGS)
  return DEFAULT_SETTINGS
}
