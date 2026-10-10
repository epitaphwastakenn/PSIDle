import { fullDisclaimerText, shortDisclaimerText } from '../../data/disclaimer'

interface DisclaimerBoxProps {
  compact?: boolean
}

export function DisclaimerBox({ compact = false }: DisclaimerBoxProps) {
  return (
    <aside className="callout callout-warn">
      <p className="h3">Aviso educacional</p>
      <p className="mt-1">{compact ? shortDisclaimerText : fullDisclaimerText}</p>
    </aside>
  )
}
