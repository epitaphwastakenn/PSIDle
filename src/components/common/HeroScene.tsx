import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import {
  addStudioLights, createConfetti, createRenderer, createTile, disposeScene, easeInOut, loadDisplayFont,
  onThemeChange, prefersReducedMotion, readPalette, toneColor, trackHost, type TileTone,
} from '../../lib/three/kit'

const LETTERS = ['P', 'S', 'I', 'D', 'L', 'E']
// Attract mode: each round reveals one row of guesses; the last one is the solved word.
const ROUNDS: TileTone[][] = [
  ['far', 'near', 'far', 'far', 'near', 'far'],
  ['near', 'ok', 'far', 'ok', 'near', 'ok'],
  ['ok', 'ok', 'ok', 'ok', 'ok', 'ok'],
]
const FLIP_MS = 520
const STAGGER_MS = 170
const HOLD_MS = 2200
const NODE_COUNT = 90

interface HeroSceneProps {
  /**
   * Today's result, one entry per tile (null keeps the tile face-down). When set, the tiles reveal it
   * once and hold; when omitted the scene loops through example rounds.
   */
  finalTones?: Array<TileTone | null>
}

export function HeroScene({ finalTones }: HeroSceneProps) {
  const hostRef = useRef<HTMLDivElement>(null)
  const tonesKey = finalTones?.map((tone) => tone ?? '-').join(',') ?? ''

  useEffect(() => {
    const host = hostRef.current!
    const reducedMotion = prefersReducedMotion()
    const maybeRenderer = createRenderer()
    // No WebGL: the hero keeps its glow and chips without the 3D scene.
    if (!maybeRenderer) return
    const renderer = maybeRenderer
    host.appendChild(renderer.domElement)
    const fixed = tonesKey ? tonesKey.split(',').map((tone) => (tone === '-' ? null : tone as TileTone)) : null

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100)
    camera.position.set(0, 0, 7.6)
    const rim = addStudioLights(scene, 0xffffff)
    const world = new THREE.Group()
    scene.add(world)

    // Neuron-like network behind the tiles.
    const nodes = Array.from({ length: NODE_COUNT }, () => {
      const v = new THREE.Vector3().randomDirection().multiplyScalar(3.2 + Math.random() * 1.6)
      v.z -= 1.5
      return v
    })
    const pointsMaterial = new THREE.PointsMaterial({ size: 0.07, transparent: true, opacity: 0.9, depthWrite: false })
    const network = new THREE.Group()
    network.add(new THREE.Points(new THREE.BufferGeometry().setFromPoints(nodes), pointsMaterial))
    const linePositions: number[] = []
    nodes.forEach((a, i) => nodes.slice(i + 1).forEach((b) => {
      if (a.distanceTo(b) < 1.55) linePositions.push(a.x, a.y, a.z, b.x, b.y, b.z)
    }))
    const linesGeometry = new THREE.BufferGeometry()
    linesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3))
    const linesMaterial = new THREE.LineBasicMaterial({ transparent: true, opacity: 0.22, depthWrite: false })
    network.add(new THREE.LineSegments(linesGeometry, linesMaterial))
    world.add(network)

    const tiles = LETTERS.map((_, index) => {
      const tile = createTile()
      tile.pivot.position.set((index % 3 - 1) * 1.18, (0.5 - Math.floor(index / 3)) * 1.18, 0)
      world.add(tile.pivot)
      return tile
    })

    let palette = readPalette()
    const confetti = createConfetti(palette)
    world.add(confetti.mesh)
    let round = reducedMotion ? ROUNDS.length - 1 : 0
    const toneAt = (index: number) => (fixed ? fixed[index] : ROUNDS[round][index])
    function paintBack() {
      tiles.forEach((tile, index) => {
        const tone = toneAt(index)
        tile.paint('back', LETTERS[index], tone ? toneColor(palette, tone) : palette.tile, '#ffffff')
      })
    }
    function applyPalette() {
      palette = readPalette()
      tiles.forEach((tile, index) => {
        tile.setBodyColor(palette.tile)
        tile.paint('front', LETTERS[index], palette.tile, palette.text)
      })
      pointsMaterial.color.set(palette.accent)
      linesMaterial.color.set(palette.accent)
      rim.color.set(palette.accent)
      paintBack()
    }
    applyPalette()
    loadDisplayFont().then(applyPalette)
    const stopThemeWatch = onThemeChange(applyPalette)

    // Loop timeline: flip in (staggered) → hold → flip out → next round. Fixed results flip in once.
    const cycle = FLIP_MS + STAGGER_MS * (tiles.length - 1)
    const roundLength = cycle * 2 + HOLD_MS * 2
    const solvedToday = Boolean(fixed?.every((tone) => tone === 'ok'))
    let roundStart = performance.now() + (fixed ? 450 : 0)
    let celebrated = false
    function tileAngle(index: number, elapsed: number) {
      if (fixed && !fixed[index]) return 0
      const local = (t: number) => Math.min(1, Math.max(0, (t - index * STAGGER_MS) / FLIP_MS))
      if (fixed || elapsed < cycle + HOLD_MS) return easeInOut(local(elapsed)) * Math.PI
      return Math.PI + easeInOut(local(elapsed - cycle - HOLD_MS)) * Math.PI
    }

    const pointer = new THREE.Vector2()
    function onPointerMove(event: PointerEvent) {
      pointer.set(event.clientX / window.innerWidth - 0.5, event.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener('pointermove', onPointerMove, { passive: true })

    const host$ = trackHost(host, (width, height) => {
      renderer.setSize(width, height, false)
      camera.aspect = width / height
      camera.position.z = width / height < 0.9 ? 9.4 : 7.6
      camera.updateProjectionMatrix()
    })

    let frame = 0
    let last = performance.now()
    function render(now: number) {
      frame = requestAnimationFrame(render)
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      if (!host$.isVisible()) return
      const t = now / 1000

      if (reducedMotion) {
        tiles.forEach((tile, index) => { tile.pivot.rotation.x = fixed && !fixed[index] ? 0 : Math.PI })
      } else {
        let elapsed = now - roundStart
        if (!fixed && elapsed > roundLength) {
          round = (round + 1) % ROUNDS.length
          paintBack()
          roundStart = now
          elapsed = 0
        }
        tiles.forEach((tile, index) => {
          tile.pivot.rotation.x = tileAngle(index, elapsed)
          tile.pivot.position.z = Math.sin(t * 1.3 + tile.phase) * 0.08
        })
        if (solvedToday && !celebrated && elapsed > cycle + 150) {
          celebrated = true
          confetti.burst(new THREE.Vector3(0, -0.4, 0.6))
        }
        confetti.update(dt)
        network.rotation.y = t * 0.05
        network.rotation.x = Math.sin(t * 0.2) * 0.08
      }

      world.rotation.y += (pointer.x * 0.5 - 0.18 - world.rotation.y) * 0.05
      world.rotation.x += (pointer.y * 0.35 + 0.08 - world.rotation.x) * 0.05
      world.position.y = reducedMotion ? 0 : Math.sin(t * 0.8) * 0.06
      renderer.render(scene, camera)
    }
    frame = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onPointerMove)
      stopThemeWatch()
      host$.disconnect()
      tiles.forEach((tile) => tile.dispose())
      confetti.dispose()
      disposeScene(scene)
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [tonesKey])

  return <div ref={hostRef} className="hero-scene-canvas" aria-hidden="true" />
}
