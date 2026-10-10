import { useId, useState } from 'react'
import type { FormEvent, KeyboardEvent } from 'react'
import type { Disorder } from '../../types/models'
import { audioManager } from '../../lib/audio'
import { getAliases } from '../../lib/guessing'
import { normalizeText } from '../../lib/normalize'
import { Icon } from '../common/Icon'

interface GuessInputProps {
  value: string
  options: Disorder[]
  disabled?: boolean
  helperText?: string
  feedbackType?: 'idle' | 'correct' | 'near' | 'wrong'
  feedbackMessage?: string
  feedbackPulseKey?: number
  validationMessage?: string
  onChange: (value: string) => void
  onSubmit: () => void
  /** Reveals the next clue early; omitted when no clue is left. */
  onHint?: () => void
  hintCost?: number
}

export function GuessInput({
  value, options, disabled = false, helperText, feedbackType = 'idle',
  feedbackMessage, feedbackPulseKey = 0, validationMessage, onChange, onSubmit, onHint, hintCost,
}: GuessInputProps) {
  const id = useId()
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const query = normalizeText(value)
  const matches = query.length > 0 ? options.filter((item) => getAliases(item).some((alias) => normalizeText(alias).includes(query))).slice(0, 7) : []
  const expanded = open && !disabled && matches.length > 0

  function select(item: Disorder) {
    onChange(item.namePt)
    setOpen(false)
    setActiveIndex(-1)
    audioManager.playClick()
  }

  function handleKey(event: KeyboardEvent<HTMLInputElement>) {
    if (event.nativeEvent.isComposing) return
    if (event.key === 'Escape') { setOpen(false); setActiveIndex(-1); return }
    if ((event.key === 'ArrowDown' || event.key === 'ArrowUp') && matches.length) {
      event.preventDefault()
      setOpen(true)
      setActiveIndex((current) => event.key === 'ArrowDown' ? (current + 1) % matches.length : (current <= 0 ? matches.length - 1 : current - 1))
    }
    if (event.key === 'Enter' && expanded && activeIndex >= 0) {
      event.preventDefault()
      select(matches[activeIndex])
    }
  }

  function submit(event: FormEvent) {
    event.preventDefault()
    if (!value.trim() || disabled) return
    setOpen(false)
    setActiveIndex(-1)
    onSubmit()
  }

  return (
    <form onSubmit={submit} className="card guess-card">
      <div className="guess-head">
        <label htmlFor={id} className="h2">Sua hipótese</label>
        {disabled ? <span className="tag">Concluído</span> : onHint && (
          <button type="button" className="btn btn-ghost btn-sm" onClick={onHint}><Icon name="bulb" width="16" height="16" />Pedir pista{hintCost ? <span className="muted mono">−{hintCost}</span> : null}</button>
        )}
      </div>
      <div className="guess-controls">
        <div className="combobox">
          <input id={id} value={value} disabled={disabled} className="input"
            placeholder="Nome ou sigla (ex.: TAG)" role="combobox" aria-autocomplete="list"
            aria-expanded={expanded} aria-controls={`${id}-list`}
            aria-activedescendant={expanded && activeIndex >= 0 ? `${id}-option-${activeIndex}` : undefined}
            aria-describedby={`${id}-message`} aria-invalid={Boolean(validationMessage)}
            autoComplete="off" autoCapitalize="none" spellCheck={false} enterKeyHint="send"
            onKeyDown={handleKey} onFocus={() => setOpen(true)}
            onBlur={() => { setOpen(false); setActiveIndex(-1) }}
            onChange={(event) => {
              if (event.target.value !== value) audioManager.playTyping()
              onChange(event.target.value)
              setActiveIndex(-1)
              setOpen(true)
            }}
          />
          {expanded && <ul className="suggestions" id={`${id}-list`} role="listbox" aria-label="Hipóteses disponíveis">
            {matches.map((item, index) => <li key={item.id} id={`${id}-option-${index}`} role="option" aria-selected={activeIndex === index}
              className={activeIndex === index ? 'suggestion active' : 'suggestion'}
              onPointerDown={(event) => event.preventDefault()} onClick={() => select(item)}>
              <span>{item.namePt}</span><small>{item.category}</small>
            </li>)}
          </ul>}
        </div>
        <button type="submit" disabled={disabled || !value.trim()} className="btn btn-primary">Responder<Icon name="arrow" width="18" height="18" /></button>
      </div>
      <div id={`${id}-message`} aria-live="polite">
        {validationMessage ? <p className="validation-note">{validationMessage}</p> :
          feedbackType !== 'idle' && feedbackMessage ? <p key={feedbackPulseKey} className={`guess-feedback ${feedbackType === 'correct' ? 'is-correct feedback-correct' : feedbackType === 'near' ? 'is-near feedback-wrong' : 'is-wrong feedback-wrong'}`}><Icon name={feedbackType === 'correct' ? 'check' : 'x'} /><span>{feedbackMessage}</span></p> :
          helperText ? <p className="helper-note">{helperText}</p> : null}
      </div>
    </form>
  )
}

