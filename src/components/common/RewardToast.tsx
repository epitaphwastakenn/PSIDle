import { useEffect } from 'react'

interface RewardToastProps {
  show: boolean
  message: string
  durationMs?: number
  onClose?: () => void
}

export function RewardToast({ show, message, durationMs = 2200, onClose }: RewardToastProps) {
  useEffect(() => {
    if (!show) {
      return
    }

    const timeout = window.setTimeout(() => {
      onClose?.()
    }, durationMs)

    return () => window.clearTimeout(timeout)
  }, [show, durationMs, onClose])

  if (!show) {
    return null
  }

  return (
    <div className="panel fixed bottom-4 right-4 z-50 animate-fadeUp px-4 py-3 text-sm font-semibold text-[color:var(--text-strong)] glow-outline">
      {message}
    </div>
  )
}
