import { useEffect, useRef, useState } from 'react'
import type { AnimationEvent } from 'react'
import { createPortal } from 'react-dom'
import { FeedbackBurst } from './FeedbackBurst'

export type RewardToastVariant = 'reward' | 'success' | 'danger' | 'review' | 'info'

interface RewardToastProps {
  show: boolean
  message: string
  durationMs?: number
  onClose?: () => void
  title?: string
  variant?: RewardToastVariant
}

const TOAST_TITLES: Record<RewardToastVariant, string> = {
  reward: 'Recompensa recebida',
  success: 'Acerto registrado',
  danger: 'Atenção',
  review: 'Revisão atualizada',
  info: 'Atualização',
}

const TOAST_LABELS: Record<RewardToastVariant, string> = {
  reward: 'XP',
  success: 'OK',
  danger: 'ERRO',
  review: 'REV',
  info: 'INFO',
}

function getBurstVariant(variant: RewardToastVariant) {
  if (variant === 'success') {
    return 'success'
  }
  if (variant === 'danger') {
    return 'danger'
  }
  if (variant === 'review') {
    return 'review'
  }
  return 'reward'
}

export function RewardToast({
  show,
  message,
  durationMs = 2200,
  onClose,
  title,
  variant = 'reward',
}: RewardToastProps) {
  const [mounted, setMounted] = useState(show)
  const [phase, setPhase] = useState<'enter' | 'exit'>(show ? 'enter' : 'exit')
  const frameRef = useRef<number | null>(null)

  useEffect(() => {
    if (!show) {
      return
    }

    const timeout = window.setTimeout(() => {
      onClose?.()
    }, durationMs)

    return () => window.clearTimeout(timeout)
  }, [show, durationMs, onClose])

  useEffect(() => {
    if (frameRef.current !== null) {
      window.cancelAnimationFrame(frameRef.current)
      frameRef.current = null
    }

    if (show && !mounted) {
      frameRef.current = window.requestAnimationFrame(() => {
        setMounted(true)
        setPhase('enter')
      })

      return () => {
        if (frameRef.current !== null) {
          window.cancelAnimationFrame(frameRef.current)
          frameRef.current = null
        }
      }
    }

    if (!show && mounted) {
      frameRef.current = window.requestAnimationFrame(() => {
        setPhase('exit')
      })
    }

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current)
        frameRef.current = null
      }
    }
  }, [show, mounted])

  if (!mounted) {
    return null
  }

  function handleAnimationEnd(event: AnimationEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget) {
      return
    }

    if (!show && phase === 'exit') {
      setMounted(false)
    }
  }

  const toast = (
    <div className="reward-toast-layer">
      <div
        className={[
          'reward-toast reward-toast-position relative overflow-hidden',
          phase === 'enter' ? 'reward-toast-entering' : 'reward-toast-exiting',
          `reward-toast-${variant}`,
        ].join(' ')}
        role="status"
        aria-live="polite"
        onAnimationEnd={handleAnimationEnd}
      >
        <FeedbackBurst key={`${variant}-${message}`} variant={getBurstVariant(variant)} density="soft" />
        <div className="reward-toast-body">
          <span className="reward-toast-badge">{TOAST_LABELS[variant]}</span>
          <div className="reward-toast-copy min-w-0">
            <p className="reward-toast-title">{title ?? TOAST_TITLES[variant]}</p>
            <p className="reward-toast-message">{message}</p>
          </div>
        </div>
      </div>
    </div>
  )

  if (typeof document === 'undefined') {
    return toast
  }

  return createPortal(toast, document.body)
}
