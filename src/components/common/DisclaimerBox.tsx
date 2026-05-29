import { fullDisclaimerText, shortDisclaimerText } from '../../data/disclaimer'

interface DisclaimerBoxProps {
  compact?: boolean
}

export function DisclaimerBox({ compact = false }: DisclaimerBoxProps) {
  return (
    <aside className="panel p-4">
      <p className="font-semibold text-[color:var(--text-strong)]">Aviso educacional</p>
      <p className="mt-1 text-sm leading-relaxed text-[color:var(--text-body)]">
        {compact ? shortDisclaimerText : fullDisclaimerText}
      </p>
    </aside>
  )
}
