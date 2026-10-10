import * as THREE from 'three'
import { addStudioLights, createRenderer, createTile, type Palette, type TileTone, toneColor } from './kit'

const WIDTH = 1080
const HEIGHT = 1920
const SCENE_HEIGHT = 760
const EMPTY_TILE = '#2b3a3e'

// Stories always use the dark palette so the card looks the same whatever theme the player uses.
const STORY_PALETTE: Palette = {
  accent: '#2bb3a3', ok: '#3fbf7f', bad: '#e5646b', warn: '#e0b14a', tile: '#223034',
  text: '#eef4f3', bg: '#0b1214', surface: '#121b1e', muted: '#7f918f',
}

interface StoryInput { tones: TileTone[]; slots: number; solved: boolean; date: Date; url: string }

function renderTiles(input: StoryInput): HTMLCanvasElement | null {
  const renderer = createRenderer({ preserveDrawingBuffer: true })
  if (!renderer) return null
  renderer.setPixelRatio(1)
  renderer.setSize(WIDTH, SCENE_HEIGHT, false)
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(30, WIDTH / SCENE_HEIGHT, 0.1, 100)
  camera.position.set(0, 0, Math.max(10, input.slots * 2.6))
  addStudioLights(scene, STORY_PALETTE.accent)
  const group = new THREE.Group()
  group.rotation.set(-0.2, 0.22, 0.03)
  scene.add(group)

  const tiles = Array.from({ length: input.slots }, (_, index) => {
    const tile = createTile()
    const tone = input.tones[index]
    tile.setBodyColor(tone ? STORY_PALETTE.tile : EMPTY_TILE)
    tile.paint('front', '', EMPTY_TILE, STORY_PALETTE.muted)
    tile.paint('back', tone === 'ok' ? '✓' : '✕', tone ? toneColor(STORY_PALETTE, tone) : STORY_PALETTE.tile, '#ffffff', 140)
    tile.pivot.position.set((index - (input.slots - 1) / 2) * 1.75, Math.sin(index * 1.3) * 0.12, 0)
    tile.pivot.rotation.x = tone ? Math.PI : 0
    tile.pivot.scale.setScalar(1.55)
    group.add(tile.pivot)
    return tile
  })
  // A few loose tiles drifting around the row for depth.
  for (let index = 0; index < 7; index++) {
    const tile = createTile()
    const tone = (['ok', 'near', 'far'] as const)[index % 3]
    tile.setBodyColor(toneColor(STORY_PALETTE, tone))
    tile.paint('front', '', toneColor(STORY_PALETTE, tone), '#ffffff')
    tile.paint('back', '', toneColor(STORY_PALETTE, tone), '#ffffff')
    const angle = (index / 7) * Math.PI * 2
    tile.pivot.position.set(Math.cos(angle) * (input.slots * 1.1 + 1.6), Math.sin(angle) * 2.3, -1.5 - (index % 3))
    tile.pivot.rotation.set(index * 0.7, index * 1.1, index * 0.4)
    tile.pivot.scale.setScalar(0.55)
    group.add(tile.pivot)
    tiles.push(tile)
  }
  renderer.render(scene, camera)
  const output = document.createElement('canvas')
  output.width = WIDTH
  output.height = SCENE_HEIGHT
  output.getContext('2d')!.drawImage(renderer.domElement, 0, 0)
  tiles.forEach((tile) => tile.dispose())
  renderer.dispose()
  return output
}

/** Renders a vertical result card (1080×1920) ready for stories. */
export async function renderStoryImage(input: StoryInput): Promise<Blob> {
  await Promise.all([
    document.fonts?.load('700 200px "Bricolage Grotesque"'),
    document.fonts?.load('500 40px Geist'),
    document.fonts?.load('500 34px "Geist Mono"'),
  ]).catch(() => undefined)

  const canvas = document.createElement('canvas')
  canvas.width = WIDTH
  canvas.height = HEIGHT
  const ctx = canvas.getContext('2d')!
  const p = STORY_PALETTE

  ctx.fillStyle = p.bg
  ctx.fillRect(0, 0, WIDTH, HEIGHT)
  const glow = ctx.createRadialGradient(WIDTH * 0.75, 260, 40, WIDTH * 0.75, 260, 1100)
  glow.addColorStop(0, '#2bb3a33a')
  glow.addColorStop(1, '#2bb3a300')
  ctx.fillStyle = glow
  ctx.fillRect(0, 0, WIDTH, HEIGHT)
  ctx.fillStyle = '#d6efeb18'
  for (let x = 30; x < WIDTH; x += 44) for (let y = 30; y < 900; y += 44) {
    ctx.globalAlpha = Math.max(0, 1 - y / 900)
    ctx.fillRect(x, y, 3, 3)
  }
  ctx.globalAlpha = 1

  // Brand
  ctx.fillStyle = p.accent
  ctx.beginPath()
  ctx.roundRect(96, 120, 92, 92, 22)
  ctx.fill()
  ctx.fillStyle = '#03211d'
  ctx.font = '700 64px "Bricolage Grotesque", sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('ψ', 142, 170)
  ctx.textAlign = 'left'
  ctx.fillStyle = p.text
  ctx.font = '700 64px "Bricolage Grotesque", sans-serif'
  ctx.fillText('psidle', 214, 168)

  ctx.font = '500 34px "Geist Mono", monospace'
  ctx.fillStyle = p.muted
  ctx.fillText(input.date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase(), 96, 330)

  ctx.fillStyle = p.text
  ctx.font = '700 104px "Bricolage Grotesque", sans-serif'
  ctx.fillText(input.solved ? 'Caso resolvido.' : 'Esse me pegou.', 96, 440)
  ctx.font = '700 300px "Bricolage Grotesque", sans-serif'
  const score = `${input.solved ? input.tones.length : 'X'}/${input.slots}`
  const gradient = ctx.createLinearGradient(96, 0, 760, 0)
  gradient.addColorStop(0, p.accent)
  gradient.addColorStop(1, p.ok)
  ctx.fillStyle = gradient
  ctx.fillText(score, 84, 660)

  const tiles = renderTiles(input)
  if (tiles) ctx.drawImage(tiles, 0, 820)

  ctx.font = '500 42px Geist, sans-serif'
  ctx.fillStyle = p.text
  ctx.fillText('Um caso clínico por dia. Cinco tentativas.', 96, 1690)
  ctx.font = '500 34px "Geist Mono", monospace'
  ctx.fillStyle = p.accent
  ctx.fillText(input.url.replace(/^https?:\/\//, '').replace(/\/$/, ''), 96, 1760)

  return new Promise((resolve, reject) => canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('toBlob failed'))), 'image/png'))
}
