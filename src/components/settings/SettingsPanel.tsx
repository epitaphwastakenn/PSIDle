import { useState } from 'react'
import { audioManager } from '../../lib/audio'
import {
  DEFAULT_SETTINGS,
  resetUserSettings,
  updateUserSettings,
  type UserSettings,
} from '../../lib/settings'

interface SettingsPanelProps {
  initialSettings: UserSettings
}

type ToggleSettingKey = 'typingSoundEnabled' | 'feedbackSoundEnabled' | 'uiSoundEnabled'
type VolumeSettingKey = 'correctVolume' | 'wrongVolume' | 'typingVolume' | 'clickVolume'
type MuteSettingKey = 'correctMuted' | 'wrongMuted' | 'typingMuted' | 'clickMuted'

const groupToggles: Array<{
  key: ToggleSettingKey
  title: string
  description: string
}> = [
  {
    key: 'typingSoundEnabled',
    title: 'Sons de digitacao',
    description: 'Controla os sons leves enquanto voce digita respostas.',
  },
  {
    key: 'feedbackSoundEnabled',
    title: 'Sons de resposta',
    description: 'Controla os sons ao acertar ou errar uma tentativa.',
  },
  {
    key: 'uiSoundEnabled',
    title: 'Sons da interface',
    description: 'Controla sons em botoes e interacoes.',
  },
]

const soundControls: Array<{
  title: string
  description: string
  volumeKey: VolumeSettingKey
  muteKey: MuteSettingKey
  preview: () => void
}> = [
  {
    title: 'Acerto',
    description: 'Som tocado quando a resposta esta correta.',
    volumeKey: 'correctVolume',
    muteKey: 'correctMuted',
    preview: () => audioManager.playCorrect(),
  },
  {
    title: 'Erro',
    description: 'Som tocado quando a tentativa esta incorreta.',
    volumeKey: 'wrongVolume',
    muteKey: 'wrongMuted',
    preview: () => audioManager.playWrong(),
  },
  {
    title: 'Digitacao',
    description: 'Som curto e baixo durante a escrita do palpite.',
    volumeKey: 'typingVolume',
    muteKey: 'typingMuted',
    preview: () => audioManager.playTyping(),
  },
  {
    title: 'Clique',
    description: 'Som usado em botoes e controles da interface.',
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
    <section className="settings-page space-y-4">
      <div className="panel settings-hero p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="hero-kicker">Config</span>
            <h1 className="page-title mt-2 text-3xl">Ajustes de audio</h1>
            <p className="page-subtitle mt-2 max-w-2xl text-sm">
              Controle sons de resposta, digitacao e interface sem recarregar a pagina.
            </p>
          </div>
          <button
            type="button"
            onClick={() => applySettings({ soundEnabled: !settings.soundEnabled })}
            className={settings.soundEnabled ? 'btn-ghost settings-master-btn' : 'btn-danger settings-master-btn'}
          >
            {settings.soundEnabled ? 'Mutar todos' : 'Ativar sons'}
          </button>
        </div>
      </div>

      <div className="settings-layout-grid">
        <div className="panel settings-control-column p-4 md:p-5">
          <div>
            <p className="filter-label">Controle geral</p>
            <p className="filter-caption">Define a base de volume e quais grupos podem tocar.</p>
          </div>

          <label className="settings-volume-card mt-4 block">
            <span className="flex items-center justify-between gap-3">
              <span>
                <span className="block font-semibold text-[color:var(--text-strong)]">Volume geral</span>
                <span className="mt-1 block text-sm text-[color:var(--text-muted)]">
                  Multiplica o volume individual de cada som.
                </span>
              </span>
              <span className="settings-volume-value">{masterVolumePercent}%</span>
            </span>
            <input
              type="range"
              min="0"
              max="100"
              value={masterVolumePercent}
              onChange={(event) => applySettings({ masterVolume: Number(event.target.value) / 100 }, false)}
              onPointerUp={() => audioManager.playClick()}
              onKeyUp={() => audioManager.playClick()}
              className="mt-4 w-full accent-[color:var(--accent)]"
            />
          </label>

          <div className="mt-4 grid gap-3">
            {groupToggles.map((toggle) => (
              <label key={toggle.key} className="settings-toggle-row">
                <span>
                  <span className="block font-semibold text-[color:var(--text-strong)]">{toggle.title}</span>
                  <span className="mt-1 block text-sm text-[color:var(--text-muted)]">{toggle.description}</span>
                </span>
                <input
                  type="checkbox"
                  checked={settings[toggle.key]}
                  onChange={(event) => applySettings({ [toggle.key]: event.target.checked })}
                  className="settings-switch"
                />
              </label>
            ))}
          </div>
        </div>

        <div className="panel settings-control-column p-4 md:p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="filter-label">Volumes individuais</p>
              <p className="filter-caption">Mute ou ajuste cada tipo de feedback separadamente.</p>
            </div>
            <button type="button" onClick={handleReset} className="btn-ghost settings-reset-btn">
              Resetar
            </button>
          </div>

          <div className="settings-sound-grid mt-4">
            {soundControls.map((control) => {
              const volumePercent = Math.round(settings[control.volumeKey] * 100)
              const muted = settings[control.muteKey]

              return (
                <article key={control.volumeKey} className={muted ? 'sound-control-card sound-control-muted' : 'sound-control-card'}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="font-semibold text-[color:var(--text-strong)]">{control.title}</h2>
                      <p className="mt-1 text-sm text-[color:var(--text-muted)]">{control.description}</p>
                    </div>
                    <span className="settings-volume-value">{muted ? '0%' : `${volumePercent}%`}</span>
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={volumePercent}
                      onChange={(event) => setSoundVolume(control.volumeKey, Number(event.target.value) / 100)}
                      onPointerUp={control.preview}
                      onKeyUp={control.preview}
                      disabled={muted}
                      className="w-full accent-[color:var(--accent)] disabled:opacity-50"
                    />
                  </div>

                  <div className="mt-3 flex gap-2">
                    <button type="button" onClick={() => toggleSoundMute(control.muteKey)} className="btn-ghost settings-mini-btn">
                      {muted ? 'Desmutar' : 'Mutar'}
                    </button>
                    <button
                      type="button"
                      onClick={control.preview}
                      disabled={muted || !settings.soundEnabled}
                      className="btn-secondary settings-mini-btn"
                    >
                      Testar
                    </button>
                  </div>
                </article>
              )
            })}
          </div>

          <p className="mt-4 text-xs text-[color:var(--text-muted)]">
            Padrao: volume geral {Math.round(DEFAULT_SETTINGS.masterVolume * 100)}%, digitacao{' '}
            {Math.round(DEFAULT_SETTINGS.typingVolume * 100)}%.
          </p>
        </div>
      </div>
    </section>
  )
}
