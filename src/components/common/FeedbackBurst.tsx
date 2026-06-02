import type { CSSProperties } from 'react'

export type FeedbackBurstVariant = 'success' | 'danger' | 'reward' | 'review'
export type FeedbackBurstDensity = 'soft' | 'full'

interface FeedbackBurstProps {
  className?: string
  density?: FeedbackBurstDensity
  variant?: FeedbackBurstVariant
}

type Particle = {
  x: number
  y: number
  rotate: number
  delay: number
  shape: 'bar' | 'dot'
}

function buildParticles(count: number, radius: number): Particle[] {
  return Array.from({ length: count }, (_, index) => {
    const angle = (Math.PI * 2 * index) / count - Math.PI / 2
    const distance = radius + (index % 3) * 8

    return {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      rotate: (angle * 180) / Math.PI,
      delay: index * 14,
      shape: index % 3 === 0 ? 'dot' : 'bar',
    }
  })
}

const PARTICLES: Record<FeedbackBurstDensity, Particle[]> = {
  soft: buildParticles(10, 34),
  full: buildParticles(16, 48),
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export function FeedbackBurst({
  className,
  density = 'soft',
  variant = 'reward',
}: FeedbackBurstProps) {
  const particles = PARTICLES[density]

  return (
    <div
      aria-hidden="true"
      className={cx('feedback-burst', `feedback-burst-${variant}`, `feedback-burst-${density}`, className)}
    >
      <span className="feedback-burst-ring" />
      {particles.map((particle, index) => (
        <span
          key={`${variant}-${density}-${index}`}
          className={cx(
            'feedback-burst-particle',
            particle.shape === 'dot' ? 'feedback-burst-particle-dot' : undefined,
          )}
          style={
            {
              ['--burst-delay' as string]: `${particle.delay}ms`,
              ['--burst-rotate' as string]: `${particle.rotate}deg`,
              ['--burst-x' as string]: `${particle.x}px`,
              ['--burst-y' as string]: `${particle.y}px`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  )
}
