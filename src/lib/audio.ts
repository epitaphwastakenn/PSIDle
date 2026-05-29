import { getUserSettings, type UserSettings } from './settings'

type SoundKey = 'correct' | 'wrong' | 'type1' | 'type2' | 'click'

const SOUND_FILES: Record<SoundKey, string> = {
  correct: 'correct.mp3',
  wrong: 'wrong.mp3',
  type1: 'type-1.mp3',
  type2: 'type-2.mp3',
  click: 'click.mp3',
}

const TYPING_COOLDOWN_MS = 45

function getSoundUrl(fileName: string): string {
  const baseUrl = import.meta.env.BASE_URL || './'
  return `${baseUrl}sounds/${fileName}`
}

class AudioManager {
  private settings: UserSettings = getUserSettings()
  private unlocked = false
  private lastTypingAt = 0
  private sounds = new Map<SoundKey, HTMLAudioElement>()

  constructor() {
    this.preload()
  }

  unlock(): void {
    if (this.unlocked || typeof Audio === 'undefined') {
      this.unlocked = true
      return
    }

    this.unlocked = true

    for (const audio of this.sounds.values()) {
      try {
        audio.load()
      } catch {
        // no-op
      }
    }
  }

  setSettings(settings: UserSettings): void {
    this.settings = settings
  }

  refreshSettings(): void {
    this.settings = getUserSettings()
  }

  playCorrect(): void {
    if (!this.settings.feedbackSoundEnabled || this.settings.correctMuted) {
      return
    }

    this.play('correct', this.settings.correctVolume)
  }

  playWrong(): void {
    if (!this.settings.feedbackSoundEnabled || this.settings.wrongMuted) {
      return
    }

    this.play('wrong', this.settings.wrongVolume)
  }

  playTyping(): void {
    if (!this.settings.typingSoundEnabled || this.settings.typingMuted) {
      return
    }

    const now = Date.now()
    if (now - this.lastTypingAt < TYPING_COOLDOWN_MS) {
      return
    }
    this.lastTypingAt = now

    this.play(Math.random() > 0.5 ? 'type1' : 'type2', this.settings.typingVolume)
  }

  playClick(): void {
    if (!this.settings.uiSoundEnabled || this.settings.clickMuted) {
      return
    }

    this.play('click', this.settings.clickVolume)
  }

  private preload(): void {
    if (typeof Audio === 'undefined') {
      return
    }

    Object.entries(SOUND_FILES).forEach(([key, fileName]) => {
      try {
        const audio = new Audio(getSoundUrl(fileName))
        audio.preload = 'auto'
        audio.volume = this.getVolume(1)
        this.sounds.set(key as SoundKey, audio)
      } catch {
        // no-op: missing/unsupported audio should never break the app
      }
    })
  }

  private play(key: SoundKey, volumeMultiplier: number): void {
    if (!this.unlocked || !this.settings.soundEnabled) {
      return
    }

    const source = this.sounds.get(key)
    if (!source) {
      return
    }

    try {
      const audio = source.cloneNode(true) as HTMLAudioElement
      audio.volume = this.getVolume(volumeMultiplier)
      audio.currentTime = 0
      const playResult = audio.play()
      if (playResult) {
        playResult.catch(() => undefined)
      }
    } catch {
      // no-op
    }
  }

  private getVolume(multiplier: number): number {
    return Math.min(1, Math.max(0, this.settings.masterVolume * multiplier))
  }
}

export const audioManager = new AudioManager()
