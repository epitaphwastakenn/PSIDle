import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'

const LETTERS = ['P', 'S', 'I', 'D', 'L', 'E']
type Tone = 'ok' | 'bad' | 'warn'
// Each round reveals one row of guesses; the last one is the solved word.
const ROUNDS: Tone[][] = [
  ['bad', 'warn', 'bad', 'bad', 'warn', 'bad'],
  ['warn', 'ok', 'bad', 'ok', 'warn', 'ok'],
  ['ok', 'ok', 'ok', 'ok', 'ok', 'ok'],
]
const FLIP_MS = 520
const STAGGER_MS = 170
const HOLD_MS = 2200
const NODE_COUNT = 90

interface Palette { accent: string; ok: string; bad: string; warn: string; tile: string; text: string }

function readPalette(): Palette {
  const style = getComputedStyle(document.documentElement)
  const read = (name: string) => style.getPropertyValue(name).trim() || '#888888'
  return { accent: read('--accent'), ok: read('--ok'), bad: read('--bad'), warn: read('--warn'), tile: read('--surface-3'), text: read('--text') }
}

function drawFace(canvas: HTMLCanvasElement, letter: string, background: string, color: string) {
  const ctx = canvas.getContext('2d')!
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = background
  ctx.beginPath()
  ctx.roundRect(0, 0, canvas.width, canvas.height, 40)
  ctx.fill()
  ctx.fillStyle = color
  ctx.font = '700 150px "Bricolage Grotesque", Geist, sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(letter, canvas.width / 2, canvas.height / 2 + 8)
}

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2)

export function HeroScene() {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = hostRef.current!
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' })
    } catch {
      // No WebGL: the hero keeps its glow and chips without the 3D scene.
      return
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    host.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100)
    camera.position.set(0, 0, 7.6)

    scene.add(new THREE.AmbientLight(0xffffff, 1.6))
    const key = new THREE.DirectionalLight(0xffffff, 2.2)
    key.position.set(3, 4, 6)
    scene.add(key)
    const rim = new THREE.PointLight(0xffffff, 18, 20)
    rim.position.set(-4, -2, 3)
    scene.add(rim)

    const world = new THREE.Group()
    scene.add(world)

    // Neuron-like network behind the tiles.
    const nodes: THREE.Vector3[] = Array.from({ length: NODE_COUNT }, () => {
      const v = new THREE.Vector3().randomDirection().multiplyScalar(3.2 + Math.random() * 1.6)
      v.z -= 1.5
      return v
    })
    const pointsGeometry = new THREE.BufferGeometry().setFromPoints(nodes)
    const pointsMaterial = new THREE.PointsMaterial({ size: 0.07, transparent: true, opacity: 0.9, depthWrite: false })
    const network = new THREE.Group()
    network.add(new THREE.Points(pointsGeometry, pointsMaterial))
    const linePositions: number[] = []
    nodes.forEach((a, i) => nodes.slice(i + 1).forEach((b) => {
      if (a.distanceTo(b) < 1.55) linePositions.push(a.x, a.y, a.z, b.x, b.y, b.z)
    }))
    const linesGeometry = new THREE.BufferGeometry()
    linesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3))
    const linesMaterial = new THREE.LineBasicMaterial({ transparent: true, opacity: 0.22, depthWrite: false })
    network.add(new THREE.LineSegments(linesGeometry, linesMaterial))
    world.add(network)

    // Tiles: a neutral front face and a coloured back face, flipped around X like Wordle.
    const boxGeometry = new RoundedBoxGeometry(1, 1, 0.24, 4, 0.12)
    const faceGeometry = new THREE.PlaneGeometry(0.94, 0.94)
    const boxMaterial = new THREE.MeshStandardMaterial({ roughness: 0.35, metalness: 0.1 })
    const tiles = LETTERS.map((letter, index) => {
      const pivot = new THREE.Group()
      const col = index % 3
      const row = Math.floor(index / 3)
      pivot.position.set((col - 1) * 1.18, (0.5 - row) * 1.18, 0)
      pivot.add(new THREE.Mesh(boxGeometry, boxMaterial))
      const faces = [0, 1].map((side) => {
        const canvas = document.createElement('canvas')
        canvas.width = canvas.height = 256
        const texture = new THREE.CanvasTexture(canvas)
        texture.colorSpace = THREE.SRGBColorSpace
        texture.anisotropy = 4
        const mesh = new THREE.Mesh(faceGeometry, new THREE.MeshBasicMaterial({ map: texture, transparent: true }))
        mesh.position.z = side === 0 ? 0.125 : -0.125
        if (side === 1) mesh.rotation.x = Math.PI
        pivot.add(mesh)
        return { canvas, texture }
      })
      world.add(pivot)
      return { letter, pivot, faces, phase: Math.random() * Math.PI * 2 }
    })

    let palette = readPalette()
    let round = reducedMotion ? ROUNDS.length - 1 : 0
    function paintFront() {
      tiles.forEach((tile) => {
        drawFace(tile.faces[0].canvas, tile.letter, palette.tile, palette.text)
        tile.faces[0].texture.needsUpdate = true
      })
    }
    function paintBack() {
      tiles.forEach((tile, index) => {
        const tone = ROUNDS[round][index]
        drawFace(tile.faces[1].canvas, tile.letter, palette[tone], '#ffffff')
        tile.faces[1].texture.needsUpdate = true
      })
    }
    function applyPalette() {
      palette = readPalette()
      boxMaterial.color.set(palette.tile)
      pointsMaterial.color.set(palette.accent)
      linesMaterial.color.set(palette.accent)
      rim.color.set(palette.accent)
      paintFront()
      paintBack()
    }
    applyPalette()
    document.fonts?.load('700 150px "Bricolage Grotesque"').then(applyPalette).catch(() => undefined)

    const themeObserver = new MutationObserver(applyPalette)
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    // Timeline: flip in (staggered) → hold → flip out → next round.
    const cycle = FLIP_MS + STAGGER_MS * (tiles.length - 1)
    const roundLength = cycle * 2 + HOLD_MS * 2
    let roundStart = performance.now()
    function tileAngle(index: number, elapsed: number) {
      const local = (t: number) => Math.min(1, Math.max(0, (t - index * STAGGER_MS) / FLIP_MS))
      if (elapsed < cycle + HOLD_MS) return easeInOut(local(elapsed)) * Math.PI
      return Math.PI + easeInOut(local(elapsed - cycle - HOLD_MS)) * Math.PI
    }

    const pointer = new THREE.Vector2()
    function onPointerMove(event: PointerEvent) {
      pointer.set(event.clientX / window.innerWidth - 0.5, event.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener('pointermove', onPointerMove, { passive: true })

    function resize() {
      const { width, height } = host.getBoundingClientRect()
      if (!width || !height) return
      renderer.setSize(width, height, false)
      camera.aspect = width / height
      camera.position.z = width / height < 0.9 ? 9.4 : 7.6
      camera.updateProjectionMatrix()
    }
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(host)
    resize()

    let visible = true
    const visibilityObserver = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting })
    visibilityObserver.observe(host)

    let frame = 0
    function render(now: number) {
      frame = requestAnimationFrame(render)
      if (!visible || document.hidden) return
      const t = now / 1000

      if (reducedMotion) {
        tiles.forEach((tile) => { tile.pivot.rotation.x = Math.PI })
      } else {
        let elapsed = now - roundStart
        if (elapsed > roundLength) {
          round = (round + 1) % ROUNDS.length
          paintBack()
          roundStart = now
          elapsed = 0
        }
        tiles.forEach((tile, index) => {
          tile.pivot.rotation.x = tileAngle(index, elapsed)
          tile.pivot.position.z = Math.sin(t * 1.3 + tile.phase) * 0.08
        })
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
      themeObserver.disconnect()
      resizeObserver.disconnect()
      visibilityObserver.disconnect()
      tiles.forEach((tile) => tile.faces.forEach((face) => face.texture.dispose()))
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points || object instanceof THREE.LineSegments) {
          object.geometry.dispose()
          const materials = Array.isArray(object.material) ? object.material : [object.material]
          materials.forEach((material) => material.dispose())
        }
      })
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return <div ref={hostRef} className="hero-scene-canvas" aria-hidden="true" />
}

