import { useEffect, useRef } from 'react'
import { Icon } from './Icon'

interface HowToPlayProps {
  open: boolean
  onClose: () => void
}

const examples = [
  { tone: 'tile-bad', icon: 'x' as const, guess: 'Transtorno Bipolar Tipo I', note: 'Outra família' },
  { tone: 'tile-warn', icon: 'x' as const, guess: 'Transtorno do Pânico', note: 'Mesma família' },
  { tone: 'tile-ok', icon: 'check' as const, guess: 'Transtorno de Ansiedade Generalizada', note: 'Certo' },
]

export function HowToPlay({ open, onClose }: HowToPlayProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current!
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog ref={dialogRef} className="modal" aria-labelledby="how-to-play-title" onClose={onClose}
      onClick={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <div className="modal-card">
        <div className="flex items-center justify-between gap-3">
          <h2 id="how-to-play-title" className="h2">Como jogar</h2>
          <button type="button" className="icon-btn" aria-label="Fechar" onClick={onClose}><Icon name="x" /></button>
        </div>
        <ol className="how-steps">
          <li><span className="tile tile-sm tile-accent">1</span><p>Leia o caso e escolha um diagnóstico. São <strong>5 tentativas</strong>.</p></li>
          <li>
            <span className="tile tile-sm tile-accent">2</span>
            <div className="grid gap-2 min-w-0">
              <p>Cada palpite ganha uma cor:</p>
              {examples.map((example) => (
                <div key={example.guess} className="how-example">
                  <span className={`tile tile-sm ${example.tone}`}><Icon name={example.icon} /></span>
                  <span className="truncate">{example.guess}</span>
                  <span className="mono small muted">{example.note}</span>
                </div>
              ))}
            </div>
          </li>
          <li><span className="tile tile-sm tile-accent">3</span><p>Errou? Uma <strong>nova pista</strong> aparece. Também dá para pedir pista antes, valendo menos pontos.</p></li>
        </ol>
        <button type="button" className="btn btn-primary btn-lg btn-block" onClick={onClose}>Jogar</button>
      </div>
    </dialog>
  )
}
