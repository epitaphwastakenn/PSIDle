import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { addStudioLights, createRenderer, onThemeChange, prefersReducedMotion, readPalette, trackHost } from '../../lib/three/kit'

export interface CategoryStat { category: string; played: number; solved: number; accuracy: number }

interface Tooltip { x: number; y: number; stat: CategoryStat }

const NODES_PER_CLUSTER = 9
const SPHERE_RADIUS = 2.2
const LINKS_PER_CLUSTER = 2
const PULSES = 24

/** Deterministic pseudo-random numbers so the brain keeps the same shape between visits. */
function seeded(seed: number) {
  let state = seed * 9301 + 49297
  return () => {
    state = (state * 9301 + 49297) % 233280
    return state / 233280
  }
}

/** Evenly spread points on a sphere (Fibonacci lattice). */
function spherePoint(index: number, total: number): THREE.Vector3 {
  const y = 1 - (index / Math.max(1, total - 1)) * 2
  const radius = Math.sqrt(1 - y * y)
  const theta = index * Math.PI * (3 - Math.sqrt(5))
  return new THREE.Vector3(Math.cos(theta) * radius, y * 0.82, Math.sin(theta) * radius).multiplyScalar(SPHERE_RADIUS)
}

/** Each diagnostic family is a cluster of neurons; it glows brighter the more the player gets it right. */
export function NeuralMap({ stats }: { stats: CategoryStat[] }) {
  const hostRef = useRef<HTMLDivElement>(null)
  const [tooltip, setTooltip] = useState<Tooltip | null>(null)
  const statsKey = JSON.stringify(stats)

  useEffect(() => {
    const host = hostRef.current!
    const data = JSON.parse(statsKey) as CategoryStat[]
    const reducedMotion = prefersReducedMotion()
    const maybeRenderer = createRenderer()
    if (!maybeRenderer) return
    const renderer = maybeRenderer
    host.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100)
    camera.position.set(0, 0.5, 8.6)
    const rim = addStudioLights(scene, 0xffffff)
    const brain = new THREE.Group()
    scene.add(brain)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableZoom = false
    controls.enablePan = false
    controls.enableDamping = true
    controls.autoRotate = !reducedMotion
    controls.autoRotateSpeed = 0.8
    controls.rotateSpeed = 0.6

    const centers = data.map((_, index) => spherePoint(index, data.length))
    const random = seeded(7)
    const satellites = centers.map((center) => Array.from({ length: NODES_PER_CLUSTER }, () =>
      center.clone().add(new THREE.Vector3().randomDirection().multiplyScalar(0.25 + random() * 0.4))))

    // Cluster cores (also the hover targets) and their satellite neurons.
    const coreGeometry = new THREE.SphereGeometry(0.16, 24, 16)
    const cores = centers.map((center, index) => {
      const material = new THREE.MeshStandardMaterial({ roughness: 0.3, emissiveIntensity: 1 })
      const mesh = new THREE.Mesh(coreGeometry, material)
      mesh.position.copy(center)
      mesh.userData.index = index
      brain.add(mesh)
      return mesh
    })
    // Soft additive halo behind each studied family; its strength follows accuracy.
    const haloCanvas = document.createElement('canvas')
    haloCanvas.width = haloCanvas.height = 128
    const haloContext = haloCanvas.getContext('2d')!
    const haloGradient = haloContext.createRadialGradient(64, 64, 0, 64, 64, 64)
    haloGradient.addColorStop(0, '#ffffffcc')
    haloGradient.addColorStop(0.35, '#ffffff40')
    haloGradient.addColorStop(1, '#ffffff00')
    haloContext.fillStyle = haloGradient
    haloContext.fillRect(0, 0, 128, 128)
    const haloTexture = new THREE.CanvasTexture(haloCanvas)
    const halos = centers.map((center) => {
      const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: haloTexture, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }))
      sprite.position.copy(center)
      brain.add(sprite)
      return sprite
    })

    const nodeGeometry = new THREE.SphereGeometry(0.05, 10, 8)
    const nodeMaterial = new THREE.MeshStandardMaterial({ roughness: 0.4, emissiveIntensity: 0.9 })
    const nodes = new THREE.InstancedMesh(nodeGeometry, nodeMaterial, centers.length * NODES_PER_CLUSTER)
    const dummy = new THREE.Object3D()
    satellites.flat().forEach((position, index) => {
      dummy.position.copy(position)
      dummy.updateMatrix()
      nodes.setMatrixAt(index, dummy.matrix)
    })
    brain.add(nodes)

    // Synapses: inside each cluster, and between each cluster and its nearest neighbours.
    const links: Array<[number, number]> = []
    centers.forEach((center, index) => {
      centers.map((other, otherIndex) => ({ otherIndex, distance: center.distanceTo(other) }))
        .filter((entry) => entry.otherIndex !== index)
        .sort((a, b) => a.distance - b.distance)
        .slice(0, LINKS_PER_CLUSTER)
        .forEach(({ otherIndex }) => {
          if (!links.some(([a, b]) => (a === otherIndex && b === index))) links.push([index, otherIndex])
        })
    })
    const lineGeometry = new THREE.BufferGeometry()
    const linePositions: number[] = []
    satellites.forEach((group, index) => group.forEach((node) => linePositions.push(...centers[index].toArray(), ...node.toArray())))
    links.forEach(([a, b]) => linePositions.push(...centers[a].toArray(), ...centers[b].toArray()))
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3))
    lineGeometry.setAttribute('color', new THREE.Float32BufferAttribute(new Float32Array(linePositions.length), 3))
    const lineMaterial = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.55, depthWrite: false })
    brain.add(new THREE.LineSegments(lineGeometry, lineMaterial))

    // Signals travelling along synapses between families the player has already studied.
    const activeLinks = links.filter(([a, b]) => data[a].played > 0 && data[b].played > 0)
    const pulseGeometry = new THREE.BufferGeometry()
    pulseGeometry.setAttribute('position', new THREE.Float32BufferAttribute(new Float32Array(PULSES * 3), 3))
    const pulseMaterial = new THREE.PointsMaterial({ size: 0.11, transparent: true, opacity: 0.95, depthWrite: false })
    const pulses = new THREE.Points(pulseGeometry, pulseMaterial)
    pulses.visible = activeLinks.length > 0 && !reducedMotion
    brain.add(pulses)
    const pulseState = Array.from({ length: PULSES }, (_, index) => ({ link: index % Math.max(1, activeLinks.length), t: Math.random(), speed: 0.25 + Math.random() * 0.35 }))

    function applyPalette() {
      const palette = readPalette()
      const dim = new THREE.Color(palette.tile).lerp(new THREE.Color(palette.muted), 0.35)
      const lit = new THREE.Color(palette.accent)
      const strong = new THREE.Color(palette.ok)
      rim.color.set(palette.accent)
      pulseMaterial.color.set(palette.ok)
      const clusterColor = (stat: CategoryStat) => stat.played
        ? lit.clone().lerp(strong, stat.accuracy / 100)
        : dim.clone()
      const glow = (stat: CategoryStat) => (stat.played ? 0.25 + 0.75 * (stat.accuracy / 100) : 0)

      cores.forEach((core, index) => {
        const stat = data[index]
        const material = core.material as THREE.MeshStandardMaterial
        material.color.copy(clusterColor(stat))
        material.emissive.copy(clusterColor(stat))
        material.emissiveIntensity = glow(stat) * 0.9
        core.scale.setScalar(stat.played ? 1 + Math.min(1, stat.played / 8) * 0.6 : 0.8)
        const halo = halos[index].material
        halo.color.copy(clusterColor(stat))
        halo.opacity = stat.played ? 0.35 + 0.65 * (stat.accuracy / 100) : 0
        halos[index].scale.setScalar(stat.played ? 1.1 + 1.1 * (stat.accuracy / 100) : 0.01)
      })
      nodeMaterial.color.set('#ffffff')
      nodeMaterial.emissive.set('#000000')
      satellites.forEach((group, clusterIndex) => group.forEach((_, nodeIndex) => {
        const stat = data[clusterIndex]
        // Solved cases light up satellites one by one.
        const litNode = nodeIndex < Math.round((stat.solved / Math.max(1, stat.played)) * NODES_PER_CLUSTER) && stat.played > 0
        nodes.setColorAt(clusterIndex * NODES_PER_CLUSTER + nodeIndex, litNode ? clusterColor(stat) : dim)
      }))
      if (nodes.instanceColor) nodes.instanceColor.needsUpdate = true

      const colors = lineGeometry.getAttribute('color') as THREE.BufferAttribute
      let vertex = 0
      const setSegment = (color: THREE.Color) => {
        colors.setXYZ(vertex++, color.r, color.g, color.b)
        colors.setXYZ(vertex++, color.r, color.g, color.b)
      }
      satellites.forEach((group, index) => group.forEach(() => setSegment(data[index].played ? clusterColor(data[index]).multiplyScalar(0.8) : dim.clone().multiplyScalar(0.5))))
      links.forEach(([a, b]) => setSegment(data[a].played && data[b].played ? lit : dim.clone().multiplyScalar(0.4)))
      colors.needsUpdate = true
    }
    applyPalette()
    const stopThemeWatch = onThemeChange(applyPalette)

    const host$ = trackHost(host, (width, height) => {
      renderer.setSize(width, height, false)
      camera.aspect = width / height
      camera.position.setLength(width / height < 0.9 ? 10.5 : 8.6)
      camera.updateProjectionMatrix()
    })

    // Hover / tap: show the family under the pointer.
    const raycaster = new THREE.Raycaster()
    const pointer = new THREE.Vector2()
    let hovered = -1
    function pick(event: PointerEvent) {
      const rect = renderer.domElement.getBoundingClientRect()
      pointer.set(((event.clientX - rect.left) / rect.width) * 2 - 1, -((event.clientY - rect.top) / rect.height) * 2 + 1)
      raycaster.setFromCamera(pointer, camera)
      const hit = raycaster.intersectObjects(cores, false)[0]
      hovered = hit ? (hit.object.userData.index as number) : -1
      renderer.domElement.style.cursor = hovered >= 0 ? 'pointer' : 'grab'
      setTooltip(hovered >= 0 ? { x: event.clientX - rect.left, y: event.clientY - rect.top, stat: data[hovered] } : null)
    }
    function clearPick() {
      hovered = -1
      setTooltip(null)
    }
    renderer.domElement.addEventListener('pointermove', pick)
    renderer.domElement.addEventListener('pointerdown', pick)
    renderer.domElement.addEventListener('pointerleave', clearPick)

    let frame = 0
    let last = performance.now()
    function render(now: number) {
      frame = requestAnimationFrame(render)
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      if (!host$.isVisible()) return
      controls.autoRotate = !reducedMotion && hovered < 0
      controls.update()
      cores.forEach((core, index) => {
        const target = index === hovered ? 1.6 : 1
        core.userData.hover = THREE.MathUtils.lerp(core.userData.hover ?? 1, target, 0.15)
        const base = data[index].played ? 1 + Math.min(1, data[index].played / 8) * 0.6 : 0.8
        const breathe = reducedMotion || !data[index].played ? 1 : 1 + Math.sin(now / 600 + index) * 0.06
        core.scale.setScalar(base * core.userData.hover * breathe)
      })
      if (pulses.visible) {
        const positions = pulseGeometry.getAttribute('position') as THREE.BufferAttribute
        pulseState.forEach((pulse, index) => {
          pulse.t += pulse.speed * dt
          if (pulse.t > 1) {
            pulse.t = 0
            pulse.link = Math.floor(Math.random() * activeLinks.length)
          }
          const [a, b] = activeLinks[pulse.link]
          const point = centers[a].clone().lerp(centers[b], pulse.t)
          positions.setXYZ(index, point.x, point.y, point.z)
        })
        positions.needsUpdate = true
      }
      renderer.render(scene, camera)
    }
    frame = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(frame)
      stopThemeWatch()
      host$.disconnect()
      controls.dispose()
      renderer.domElement.removeEventListener('pointermove', pick)
      renderer.domElement.removeEventListener('pointerdown', pick)
      renderer.domElement.removeEventListener('pointerleave', clearPick)
      coreGeometry.dispose()
      haloTexture.dispose()
      halos.forEach((halo) => halo.material.dispose())
      cores.forEach((core) => (core.material as THREE.Material).dispose())
      nodeGeometry.dispose()
      nodeMaterial.dispose()
      nodes.dispose()
      lineGeometry.dispose()
      lineMaterial.dispose()
      pulseGeometry.dispose()
      pulseMaterial.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [statsKey])

  return (
    <div className="neural-map">
      <div ref={hostRef} className="neural-map-canvas" role="img" aria-label="Mapa das famílias diagnósticas: quanto mais brilho, mais acertos." />
      {tooltip && (
        <div className="neural-tooltip" style={{ left: tooltip.x, top: tooltip.y }}>
          <strong>{tooltip.stat.category}</strong>
          <span>{tooltip.stat.played ? `${tooltip.stat.accuracy}% · ${tooltip.stat.solved}/${tooltip.stat.played} casos` : 'Ainda não estudado'}</span>
        </div>
      )}
    </div>
  )
}
