import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import {
  addStudioLights, createConfetti, createRenderer, createTile, easeOutBack, loadDisplayFont, prefersReducedMotion,
  readPalette, trackHost,
} from '../../lib/three/kit'

const FLIP_MS = 620
const STAGGER_MS = 220

/** Digits of the new level flip in as big tiles, then confetti bursts from behind them. */
export function LevelUpScene({ level }: { level: number }) {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = hostRef.current!
    const reducedMotion = prefersReducedMotion()
    const maybeRenderer = createRenderer()
    if (!maybeRenderer) return
    const renderer = maybeRenderer
    host.appendChild(renderer.domElement)

    const palette = readPalette()
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100)
    camera.position.set(0, 0, 7)
    addStudioLights(scene, palette.accent)
    const group = new THREE.Group()
    scene.add(group)

    const digits = String(level).split('')
    const tiles = digits.map((digit, index) => {
      const tile = createTile()
      tile.setBodyColor(palette.tile)
      tile.paint('front', '', palette.tile, palette.text)
      tile.paint('back', digit, palette.accent, palette.bg, 170)
      tile.pivot.position.x = (index - (digits.length - 1) / 2) * 1.25
      tile.pivot.scale.setScalar(1.5)
      group.add(tile.pivot)
      return tile
    })
    loadDisplayFont().then(() => tiles.forEach((tile, index) => tile.paint('back', digits[index], palette.accent, palette.bg, 170)))
    const confetti = createConfetti(palette, 140)
    scene.add(confetti.mesh)

    const host$ = trackHost(host, (width, height) => {
      renderer.setSize(width, height, false)
      camera.aspect = width / height
      camera.position.z = width / height < 0.9 ? 9 : 7
      camera.updateProjectionMatrix()
    })

    const start = performance.now() + 200
    const revealEnd = STAGGER_MS * (digits.length - 1) + FLIP_MS
    let burst = false
    let frame = 0
    let last = performance.now()
    function render(now: number) {
      frame = requestAnimationFrame(render)
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      const elapsed = now - start
      tiles.forEach((tile, index) => {
        const progress = reducedMotion ? 1 : Math.min(1, Math.max(0, (elapsed - index * STAGGER_MS) / FLIP_MS))
        tile.pivot.rotation.x = easeOutBack(progress) * Math.PI
        tile.pivot.position.y = reducedMotion ? 0 : Math.sin(now / 700 + index) * 0.08
      })
      if (!burst && !reducedMotion && elapsed > revealEnd - 150) {
        burst = true
        confetti.burst(new THREE.Vector3(0, -0.3, -0.5))
      }
      confetti.update(dt)
      group.rotation.y = reducedMotion ? 0 : Math.sin(now / 1400) * 0.2
      renderer.render(scene, camera)
    }
    frame = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(frame)
      host$.disconnect()
      tiles.forEach((tile) => tile.dispose())
      confetti.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [level])

  return <div ref={hostRef} className="level-up-canvas" aria-hidden="true" />
}
