import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import {
  addStudioLights, createConfetti, createRenderer, createTile, easeOutBack, loadDisplayFont, onThemeChange,
  prefersReducedMotion, readPalette, toneColor, trackHost, type TileTone,
} from '../../lib/three/kit'

const FLIP_MS = 560
const STAGGER_MS = 260
const SPACING = 1.16
const FOV = 30

interface ResultRevealProps {
  tones: TileTone[]
  slots: number
  solved: boolean
}

/** End-of-case moment: the player's guesses flip one by one, with confetti on a solve. */
export function ResultReveal({ tones, slots, solved }: ResultRevealProps) {
  const hostRef = useRef<HTMLDivElement>(null)
  const tonesKey = tones.join(',')

  useEffect(() => {
    const host = hostRef.current!
    const reducedMotion = prefersReducedMotion()
    const maybeRenderer = createRenderer()
    if (!maybeRenderer) return
    const renderer = maybeRenderer
    host.appendChild(renderer.domElement)
    const revealTones = tonesKey ? tonesKey.split(',') as TileTone[] : []

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 100)
    const rim = addStudioLights(scene, 0xffffff)
    const row = new THREE.Group()
    scene.add(row)

    const tiles = Array.from({ length: slots }, (_, index) => {
      const tile = createTile()
      tile.pivot.position.x = (index - (slots - 1) / 2) * SPACING
      row.add(tile.pivot)
      return tile
    })
    let palette = readPalette()
    const confetti = createConfetti(palette, 70)
    scene.add(confetti.mesh)

    function paint() {
      palette = readPalette()
      rim.color.set(palette.accent)
      tiles.forEach((tile, index) => {
        const tone = revealTones[index]
        tile.setBodyColor(palette.tile)
        tile.paint('front', tone ? String(index + 1) : '', palette.tile, palette.muted, 120)
        tile.paint('back', tone === 'ok' ? '✓' : '✕', tone ? toneColor(palette, tone) : palette.tile, '#ffffff', 140)
      })
    }
    paint()
    loadDisplayFont().then(paint)
    const stopThemeWatch = onThemeChange(paint)

    const host$ = trackHost(host, (width, height) => {
      renderer.setSize(width, height, false)
      camera.aspect = width / height
      // Fit the whole row horizontally, with a little air on each side.
      const halfWidth = (slots * SPACING) / 2 + 0.5
      const fitWidth = halfWidth / (Math.tan(THREE.MathUtils.degToRad(FOV / 2)) * camera.aspect)
      const fitHeight = 1.05 / Math.tan(THREE.MathUtils.degToRad(FOV / 2))
      camera.position.set(0, 0, Math.max(fitWidth, fitHeight))
      camera.updateProjectionMatrix()
    })

    const start = performance.now() + 250
    const revealEnd = STAGGER_MS * Math.max(0, revealTones.length - 1) + FLIP_MS
    let celebrated = false
    let frame = 0
    let last = performance.now()
    function render(now: number) {
      frame = requestAnimationFrame(render)
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      if (!host$.isVisible()) return
      const elapsed = now - start
      tiles.forEach((tile, index) => {
        if (index >= revealTones.length) return
        const progress = reducedMotion ? 1 : Math.min(1, Math.max(0, (elapsed - index * STAGGER_MS) / FLIP_MS))
        tile.pivot.rotation.x = easeOutBack(progress) * Math.PI
        tile.pivot.position.y = reducedMotion ? 0 : Math.sin(progress * Math.PI) * 0.25
      })
      if (solved && !celebrated && !reducedMotion && elapsed > revealEnd) {
        celebrated = true
        confetti.burst(new THREE.Vector3(((revealTones.length - 1) - (slots - 1) / 2) * SPACING, 0, 0.5))
      }
      confetti.update(dt)
      row.rotation.y = reducedMotion ? 0 : Math.sin(now / 1600) * 0.12
      renderer.render(scene, camera)
    }
    frame = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(frame)
      stopThemeWatch()
      host$.disconnect()
      tiles.forEach((tile) => tile.dispose())
      confetti.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [tonesKey, slots, solved])

  return <div ref={hostRef} className="result-reveal" role="img" aria-label={`Seus palpites: ${tones.length} de ${slots}`} />
}
