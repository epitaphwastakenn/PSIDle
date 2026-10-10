import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { LEVEL_UP_EVENT } from '../../lib/storage'

const LevelUpScene = lazy(() => import('./LevelUpScene').then((module) => ({ default: module.LevelUpScene })))

const AUTO_CLOSE_MS = 4200

/** Full-screen celebration whenever the saved progress reaches a new level. */
export function LevelUpOverlay() {
  const [level, setLevel] = useState<number | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const onLevelUp = (event: Event) => setLevel((event as CustomEvent<number>).detail)
    window.addEventListener(LEVEL_UP_EVENT, onLevelUp)
    return () => window.removeEventListener(LEVEL_UP_EVENT, onLevelUp)
  }, [])

  useEffect(() => {
    const dialog = dialogRef.current!
    if (level === null) {
      if (dialog.open) dialog.close()
      return
    }
    if (!dialog.open) dialog.showModal()
    const timer = window.setTimeout(() => setLevel(null), AUTO_CLOSE_MS)
    return () => window.clearTimeout(timer)
  }, [level])

  return (
    <dialog ref={dialogRef} className="level-up" aria-labelledby="level-up-title" onClose={() => setLevel(null)} onClick={() => setLevel(null)}>
      {level !== null && (
        <div className="level-up-content">
          <Suspense fallback={<div className="level-up-canvas" />}><LevelUpScene level={level} /></Suspense>
          <p className="kicker kicker-accent">Subiu de nível</p>
          <h2 id="level-up-title" className="display">Nível {level}</h2>
          <button type="button" className="btn btn-primary" onClick={() => setLevel(null)}>Continuar</button>
        </div>
      )}
    </dialog>
  )
}
