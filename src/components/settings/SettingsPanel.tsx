import { useState } from 'react'
import { audioManager } from '../../lib/audio'
import {
  resetUserSettings,
  updateUserSettings,
  type UserSettings,
} from '../../lib/settings'
import { Icon } from '../common/Icon'

interface SettingsPanelProps {
  initialSettings: UserSettings
}

type ToggleSettingKey = 'typingSoundEnabled' | 'feedbackSoundEnabled' | 'uiSoundEnabled'
type VolumeSettingKey = 'correctVolume' | 'wrongVolume' | 'typingVolume' | 'clickVolume'
type MuteSettingKey = 'correctMuted' | 'wrongMuted' | 'typingMuted' | 'clickMuted'

const groupToggles: Array<{
  key: ToggleSettingKey
  title: string
}> = [
  {
    key: 'typingSoundEnabled',
    title: 'Sons de digitação',
  },
  {
    key: 'feedbackSoundEnabled',
    title: 'Sons de resposta',
  },
  {
    key: 'uiSoundEnabled',
    title: 'Sons da interface',
  },
]

const soundControls: Array<{
  title: string
  volumeKey: VolumeSettingKey
  muteKey: MuteSettingKey
  preview: () => void
}> = [
  {
    title: 'Acerto',
    volumeKey: 'correctVolume',
    muteKey: 'correctMuted',
    preview: () => audioManager.playCorrect(),
  },
  {
    title: 'Erro',
    volumeKey: 'wrongVolume',
    muteKey: 'wrongMuted',
    preview: () => audioManager.playWrong(),
  },
  {
    title: 'Digitação',
    volumeKey: 'typingVolume',
    muteKey: 'typingMuted',
    preview: () => audioManager.playTyping(),
  },
  {
    title: 'Clique',
    volumeKey: 'clickVolume',
    muteKey: 'clickMuted',
    preview: () => audioManager.playClick(),
  },
]

export function SettingsPanel({ initialSettings }: SettingsPanelProps) {
  const [settings, setSettings] = useState(initialSettings)
  const masterVolumePercent = Math.round(settings.masterVolume * 100)

  function applySettings(partial: Partial<UserSettings>, playClick = true) {
    const updated = updateUserSettings(partial)
    audioManager.setSettings(updated)
    setSettings(updated)

    if (playClick) {
      audioManager.playClick()
    }
  }

  function setSoundVolume(key: VolumeSettingKey, value: number) {
    applySettings({ [key]: value } as Partial<UserSettings>, false)
  }

  function toggleSoundMute(key: MuteSettingKey) {
    applySettings({ [key]: !settings[key] } as Partial<UserSettings>)
  }

  function handleReset() {
    const updated = resetUserSettings()
    audioManager.setSettings(updated)
    setSettings(updated)
    audioManager.playClick()
  }

  return (
    <div className="page-stack">
      <header className="page-header">
        <h1 className="display">Configurações</h1>
        <button
          type="button"
          aria-pressed={!settings.soundEnabled}
          onClick={() => applySettings({ soundEnabled: !settings.soundEnabled })}
          className={`btn ${settings.soundEnabled ? 'btn-secondary' : 'btn-primary'}`}
        >
          <Icon name="volume" width="18" height="18" />{settings.soundEnabled ? 'Silenciar tudo' : 'Ativar sons'}
        </button>
      </header>

      <div className="settings-grid">
        <section className="card settings-card">
          <h2 className="h2">Geral</h2>

          <label className="grid gap-2">
            <span className="flex items-center justify-between gap-3">
              <strong className="h3">Volume geral</strong>
              <span className="volume-value">{masterVolumePercent}%</span>
            </span>
            <input
              type="range"
              min="0"
              max="100"
              value={masterVolumePercent}
              onChange={(event) => applySettings({ masterVolume: Number(event.target.value) / 100 }, false)}
              onPointerUp={() => audioManager.playClick()}
              onKeyUp={() => audioManager.playClick()}
              className="range"
            />
          </label>

          <div>
            {groupToggles.map((toggle) => (
              <label key={toggle.key} className="setting-row">
                <strong>{toggle.title}</strong>
                <input
                  type="checkbox"
                  checked={settings[toggle.key]}
                  onChange={(event) => applySettings({ [toggle.key]: event.target.checked })}
                  className="switch"
                />
              </label>
            ))}
          </div>
        </section>

        <section className="card settings-card">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="h2">Sons</h2>
            <button type="button" onClick={handleReset} className="btn btn-ghost btn-sm">
              <Icon name="refresh" width="16" height="16" />Restaurar
            </button>
          </div>

          <div className="sound-grid">
            {soundControls.map((control) => {
              const volumePercent = Math.round(settings[control.volumeKey] * 100)
              const muted = settings[control.muteKey]
              const groupEnabled = control.volumeKey === 'typingVolume' ? settings.typingSoundEnabled
                : control.volumeKey === 'clickVolume' ? settings.uiSoundEnabled : settings.feedbackSoundEnabled
              const audible = settings.soundEnabled && groupEnabled && !muted && settings.masterVolume > 0 && volumePercent > 0

              return (
                <article key={control.volumeKey} className={`card-muted sound-card${muted ? ' sound-card-muted' : ''}`}>
                  <div className="sound-card-head">
                    <h3>{control.title}</h3>
                    <span className="volume-value">{muted ? '0%' : `${volumePercent}%`}</span>
                  </div>

                  <input
                    type="range"
                    aria-label={`Volume de ${control.title.toLowerCase()}`}
                    min="0"
                    max="100"
                    value={volumePercent}
                    onChange={(event) => setSoundVolume(control.volumeKey, Number(event.target.value) / 100)}
                    onPointerUp={control.preview}
                    onKeyUp={control.preview}
                    disabled={muted}
                    className="range"
                  />

                  <div className="flex gap-2">
                    <button type="button" aria-label={`${muted ? 'Ativar' : 'Silenciar'} som de ${control.title.toLowerCase()}`} aria-pressed={muted} onClick={() => toggleSoundMute(control.muteKey)} className="btn btn-secondary btn-sm">
                      {muted ? 'Ativar' : 'Silenciar'}
                    </button>
                    <button
                      type="button"
                      onClick={control.preview}
                      disabled={!audible}
                      aria-label={`Testar som de ${control.title.toLowerCase()}`}
                      className="btn btn-ghost btn-sm"
                    >
                      <Icon name="play" width="14" height="14" />Testar
                    </button>
                  </div>
                </article>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}
