import { SettingsPanel } from '../components/settings/SettingsPanel'
import { getUserSettings } from '../lib/settings'

export function SettingsPage() {
  return <SettingsPanel initialSettings={getUserSettings()} />
}
