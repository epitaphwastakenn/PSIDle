import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'

/** Shared building blocks for the three.js scenes: palette, flip tiles, confetti and lifecycle helpers. */

export interface Palette { accent: string; ok: string; bad: string; warn: string; tile: string; text: string; bg: string; surface: string; muted: string }
export type TileTone = 'ok' | 'near' | 'far'

export function readPalette(): Palette {
  const style = getComputedStyle(document.documentElement)
  const read = (name: string) => style.getPropertyValue(name).trim() || '#888888'
  return {
    accent: read('--accent'), ok: read('--ok'), bad: read('--bad'), warn: read('--warn'), tile: read('--surface-3'),
    text: read('--text'), bg: read('--bg'), surface: read('--surface'), muted: read('--text-3'),
  }
}

export function toneColor(palette: Palette, tone: TileTone): string {
  return tone === 'ok' ? palette.ok : tone === 'near' ? palette.warn : palette.bad
}

export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
export const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2)
export const easeOutBack = (t: number) => 1 + 2.2 * (t - 1) ** 3 + 1.2 * (t - 1) ** 2

export function loadDisplayFont(): Promise<unknown> {
  return document.fonts?.load('700 150px "Bricolage Grotesque"').catch(() => undefined) ?? Promise.resolve()
}

export function createRenderer(options: THREE.WebGLRendererParameters = {}): THREE.WebGLRenderer | null {
  try {
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power', ...options })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    return renderer
  } catch {
    return null
  }
}

export function addStudioLights(scene: THREE.Scene, rimColor: THREE.ColorRepresentation): THREE.PointLight {
  scene.add(new THREE.AmbientLight(0xffffff, 1.6))
  const key = new THREE.DirectionalLight(0xffffff, 2.2)
  key.position.set(3, 4, 6)
  scene.add(key)
  const rim = new THREE.PointLight(rimColor, 18, 20)
  rim.position.set(-4, -2, 3)
  scene.add(rim)
  return rim
}

export function drawFace(canvas: HTMLCanvasElement, label: string, background: string, color: string, fontSize = 150) {
  const ctx = canvas.getContext('2d')!
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = background
  ctx.beginPath()
  ctx.roundRect(0, 0, canvas.width, canvas.height, 40)
  ctx.fill()
  if (!label) return
  ctx.fillStyle = color
  ctx.font = `700 ${fontSize}px "Bricolage Grotesque", Geist, sans-serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(label, canvas.width / 2, canvas.height / 2 + 8)
}

export interface Tile {
  pivot: THREE.Group
  phase: number
  paint: (side: 'front' | 'back', label: string, background: string, color: string, fontSize?: number) => void
  setBodyColor: (color: string) => void
  dispose: () => void
}

/** A rounded tile with a front and a back face; rotating `pivot.rotation.x` by π flips it like Wordle. */
export function createTile(): Tile {
  const pivot = new THREE.Group()
  const bodyMaterial = new THREE.MeshStandardMaterial({ roughness: 0.35, metalness: 0.1 })
  const body = new THREE.Mesh(new RoundedBoxGeometry(1, 1, 0.24, 4, 0.12), bodyMaterial)
  pivot.add(body)
  const faceGeometry = new THREE.PlaneGeometry(0.94, 0.94)
  const faces = [0, 1].map((side) => {
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = 256
    const texture = new THREE.CanvasTexture(canvas)
    texture.colorSpace = THREE.SRGBColorSpace
    texture.anisotropy = 4
    const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true })
    const mesh = new THREE.Mesh(faceGeometry, material)
    mesh.position.z = side === 0 ? 0.125 : -0.125
    if (side === 1) mesh.rotation.x = Math.PI
    pivot.add(mesh)
    return { canvas, texture, material }
  })
  return {
    pivot,
    phase: Math.random() * Math.PI * 2,
    paint(side, label, background, color, fontSize) {
      const face = faces[side === 'front' ? 0 : 1]
      drawFace(face.canvas, label, background, color, fontSize)
      face.texture.needsUpdate = true
    },
    setBodyColor(color) {
      bodyMaterial.color.set(color)
    },
    dispose() {
      body.geometry.dispose()
      bodyMaterial.dispose()
      faceGeometry.dispose()
      faces.forEach((face) => { face.texture.dispose(); face.material.dispose() })
    },
  }
}

export interface Confetti {
  mesh: THREE.InstancedMesh
  /** Starts a new burst from `origin`. */
  burst: (origin?: THREE.Vector3) => void
  /** Advances the simulation; returns false once every piece has landed off-screen. */
  update: (dt: number) => boolean
  dispose: () => void
}

/** Tile-shaped confetti drawn with one instanced mesh. */
export function createConfetti(palette: Palette, count = 90): Confetti {
  const geometry = new THREE.BoxGeometry(0.14, 0.14, 0.04)
  const material = new THREE.MeshStandardMaterial({ roughness: 0.5 })
  const mesh = new THREE.InstancedMesh(geometry, material, count)
  mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
  mesh.frustumCulled = false
  const colors = [palette.ok, palette.warn, palette.accent, palette.bad]
  const color = new THREE.Color()
  for (let i = 0; i < count; i++) mesh.setColorAt(i, color.set(colors[i % colors.length]))
  const pieces = Array.from({ length: count }, () => ({
    position: new THREE.Vector3(), velocity: new THREE.Vector3(), rotation: new THREE.Euler(), spin: new THREE.Vector3(),
  }))
  const dummy = new THREE.Object3D()
  let alive = false
  mesh.visible = false

  return {
    mesh,
    burst(origin = new THREE.Vector3()) {
      alive = true
      mesh.visible = true
      for (const piece of pieces) {
        piece.position.copy(origin)
        const angle = Math.random() * Math.PI * 2
        const speed = 2.5 + Math.random() * 3.5
        piece.velocity.set(Math.cos(angle) * speed * 0.8, 3 + Math.random() * 4.5, Math.sin(angle) * speed * 0.5)
        piece.rotation.set(Math.random() * 6, Math.random() * 6, Math.random() * 6)
        piece.spin.set(Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5)
      }
    },
    update(dt) {
      if (!alive) return false
      let anyVisible = false
      pieces.forEach((piece, index) => {
        piece.velocity.y -= 9 * dt
        piece.velocity.multiplyScalar(1 - 0.6 * dt)
        piece.position.addScaledVector(piece.velocity, dt)
        piece.rotation.x += piece.spin.x * dt
        piece.rotation.y += piece.spin.y * dt
        piece.rotation.z += piece.spin.z * dt
        if (piece.position.y > -6) anyVisible = true
        dummy.position.copy(piece.position)
        dummy.rotation.copy(piece.rotation)
        dummy.updateMatrix()
        mesh.setMatrixAt(index, dummy.matrix)
      })
      mesh.instanceMatrix.needsUpdate = true
      if (!anyVisible) {
        alive = false
        mesh.visible = false
      }
      return alive
    },
    dispose() {
      geometry.dispose()
      material.dispose()
      mesh.dispose()
    },
  }
}

/** Keeps a renderer sized to its host and pauses work while the host is off-screen. */
export function trackHost(host: HTMLElement, onResize: (width: number, height: number) => void) {
  let visible = true
  const resizeObserver = new ResizeObserver(() => {
    const { width, height } = host.getBoundingClientRect()
    if (width && height) onResize(width, height)
  })
  resizeObserver.observe(host)
  const visibilityObserver = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting })
  visibilityObserver.observe(host)
  const { width, height } = host.getBoundingClientRect()
  if (width && height) onResize(width, height)
  return {
    isVisible: () => visible && !document.hidden,
    disconnect: () => { resizeObserver.disconnect(); visibilityObserver.disconnect() },
  }
}

export function onThemeChange(callback: () => void): () => void {
  const observer = new MutationObserver(callback)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
  return () => observer.disconnect()
}

export function disposeScene(scene: THREE.Scene) {
  scene.traverse((object) => {
    if (object instanceof THREE.Points || object instanceof THREE.LineSegments) {
      object.geometry.dispose()
      const materials = Array.isArray(object.material) ? object.material : [object.material]
      materials.forEach((material) => material.dispose())
    }
  })
}
