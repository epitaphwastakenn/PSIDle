import { caseSets } from '../data/cases/index'
import { femaleNames, maleNames } from '../data/casePeople'
import { disorders } from '../data/disorders'
import type { Case, CaseClue, Difficulty, Disorder } from '../types/models'
import { getDailyLevel, levelsFor } from './caseLevels'
import { expandCaseText } from './caseText'

interface GenerationFilters {
  disorderId?: string
  category?: string
  /** Abstraction level of the vignette (the difficulty shown); picked at random when omitted. */
  level?: Difficulty
  excludeDisorderIds?: string[]
}

interface GenerateProceduralCaseInput extends GenerationFilters {
  seed: string | number
  caseIdPrefix: string
  recentCases?: readonly Case[]
}

const titles = [
  'Um novo relato', 'Entre compromissos', 'Um recorte do cotidiano', 'Na conversa de hoje', 'O que mudou',
  'Além da primeira impressão', 'Um olhar mais atento', 'Entre uma semana e outra', 'Na sala de espera',
  'O que a família conta', 'Sinais pelo caminho', 'Uma história em partes', 'Antes da consulta', 'Por trás da queixa',
]
// Clues are authored in this fixed order (see src/data/cases/types.ts).
const clueTypes: CaseClue['type'][] = ['symptoms', 'duration', 'impairment', 'exclusion']

function hashSeed(seed: string | number): number {
  let hash = 2166136261
  for (const character of String(seed)) {
    hash = Math.imul(hash ^ character.charCodeAt(0), 16777619)
  }
  return hash >>> 0
}

function createRng(seed: string | number): () => number {
  let state = hashSeed(seed)
  return () => {
    state = (state + 0x6d2b79f5) >>> 0
    let value = Math.imul(state ^ (state >>> 15), 1 | state)
    value ^= value + Math.imul(value ^ (value >>> 7), 61 | value)
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296
  }
}

function pickOne<T>(list: readonly T[], rng: () => number): T {
  return list[Math.floor(rng() * list.length)]
}

function chooseDisorder(rng: () => number, filters: GenerationFilters): Disorder {
  if (filters.disorderId) {
    const selected = disorders.find((item) => item.id === filters.disorderId)
    if (!selected) throw new Error(`Transtorno desconhecido: ${filters.disorderId}`)
    if (!levelsFor(selected).length) throw new Error(`Ainda não há casos escritos para ${filters.disorderId}`)
    return selected
  }
  const pool = disorders.filter((item) =>
    (!filters.category || item.category === filters.category) &&
    levelsFor(item).length > 0 &&
    (!filters.level || levelsFor(item).includes(filters.level)),
  )
  if (!pool.length) throw new Error('Não há casos para esta combinação de filtros.')
  const unseen = pool.filter((item) => !filters.excludeDisorderIds?.includes(item.id))
  const candidates = unseen.length ? unseen : pool
  // Balance families first, so large families do not dominate the draw.
  const category = pickOne([...new Set(candidates.map((item) => item.category))], rng)
  return pickOne(candidates.filter((item) => item.category === category), rng)
}

/** Picks a variant of the level, rotating away from the ones recently served for this diagnosis. */
function chooseVariant(disorderId: string, level: Difficulty, recentCases: readonly Case[], rng: () => number): number {
  const indices = caseSets[disorderId].variants.flatMap((variant, index) => (variant.level === level ? [index] : []))
  const recent = recentCases
    .filter((item) => item.correctDisorderId === disorderId)
    .flatMap((item) => item.tags.filter((tag) => tag.startsWith('variant_')))
    .map((tag) => Number(tag.slice('variant_'.length)))
    .filter((index) => indices.includes(index))
    .reverse()
  const avoid = [...new Set(recent)].slice(0, indices.length - 1)
  return pickOne(indices.filter((index) => !avoid.includes(index)), rng)
}

function buildProceduralCase(input: GenerateProceduralCaseInput): Case {
  const disorder = chooseDisorder(createRng(input.seed), input)
  const set = caseSets[disorder.id]
  const levels = levelsFor(disorder)
  const level = input.level && levels.includes(input.level) ? input.level : pickOne(levels, createRng(`${input.seed}:level`))
  const variantIndex = chooseVariant(disorder.id, level, input.recentCases ?? [], createRng(`${input.seed}:${disorder.id}:variant`))
  const variant = set.variants[variantIndex]

  const identityRng = createRng(`${input.seed}:${disorder.id}:identity`)
  const sex = variant.sex ?? (identityRng() < 0.5 ? 'f' : 'm')
  const name = pickOne(sex === 'f' ? femaleNames : maleNames, identityRng)
  const [minAge, maxAge] = variant.ages
  const age = minAge + Math.floor(identityRng() * (maxAge - minAge + 1))
  const person = { name, age, sex } as const
  const id = `${input.caseIdPrefix}-v3-${disorder.id}-v${variantIndex}-${hashSeed(input.seed).toString(36)}`

  return {
    id,
    title: pickOne(titles, createRng(`${input.seed}:title`)),
    category: disorder.category,
    difficulty: level,
    vignette: expandCaseText(variant.text, person),
    correctDisorderId: disorder.id,
    clues: variant.clues.map((text, index) => ({
      id: `${id}-clue-${index + 1}`, order: index + 1, type: clueTypes[index], text: expandCaseText(text, person),
    })),
    explanation: set.explanation,
    differentials: [{ ...set.differential }],
    tags: ['authored_v3', `variant_${variantIndex}`, `idade_${age}`, `sexo_${sex}`],
    sourceNote: 'Caso fictício escrito a partir dos critérios do DSM-5-TR. Não é uma avaliação clínica.',
    reference: { ...set.reference },
    status: 'approved',
  }
}

function getDateKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

export function generateDailyProceduralCase(date: Date): Case {
  const dateKey = getDateKey(date)
  return buildProceduralCase({
    seed: `daily-${dateKey}`,
    caseIdPrefix: `proc-daily-${dateKey}`,
    level: getDailyLevel(date),
  })
}

export function generatePracticeProceduralCase(input: GenerationFilters & {
  seed?: string | number
  recentCases?: readonly Case[]
}): Case {
  return buildProceduralCase({
    ...input,
    seed: input.seed ?? crypto.randomUUID(),
    caseIdPrefix: 'proc-practice',
  })
}
