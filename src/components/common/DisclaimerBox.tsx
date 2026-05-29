import { fullDisclaimerText, shortDisclaimerText } from '../../data/disclaimer'

interface DisclaimerBoxProps {
  compact?: boolean
}

export function DisclaimerBox({ compact = false }: DisclaimerBoxProps) {
  return (
    <aside className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 shadow-sm">
      <p className="font-semibold">Aviso educacional</p>
      <p className="mt-1 leading-relaxed">{compact ? shortDisclaimerText : fullDisclaimerText}</p>
    </aside>
  )
}
