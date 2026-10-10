import { disorders } from '../data/disorders'
import { caseProfiles, dailyExcludedIds } from '../data/caseProfiles'
import { firstNames, lastNames } from '../data/casePeople'
import type { Case, CaseClue, Difficulty, Disorder } from '../types/models'

interface GenerationFilters {
  disorderId?: string
  category?: string
  difficulty?: Difficulty
  excludeDisorderIds?: string[]
  /** Restrict to entries suited to the daily case (no classification-level subtypes). */
  dailyOnly?: boolean
}

interface GenerateProceduralCaseInput extends GenerationFilters {
  seed: string | number
  caseIdPrefix: string
  recentCases?: readonly Case[]
}

const titles = [
  'Um novo relato', 'Entre compromissos', 'Um recorte do cotidiano',
  'Na conversa de hoje', 'O que mudou', 'Além da primeira impressão',
  'Um olhar mais atento', 'Entre uma semana e outra',
]
const clueTypes: CaseClue['type'][] = ['symptoms', 'impairment', 'exclusion', 'differential']

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
    return selected
  }
  const pool = disorders.filter((item) =>
    (!filters.category || item.category === filters.category) &&
    (!filters.difficulty || item.difficulty === filters.difficulty) &&
    (!filters.dailyOnly || !dailyExcludedIds.has(item.id)),
  )
  if (!pool.length) throw new Error('Não há casos para esta combinação de filtros.')
  const unseen = pool.filter((item) => !filters.excludeDisorderIds?.includes(item.id))
  const candidates = unseen.length ? unseen : pool
  const category = pickOne([...new Set(candidates.map((item) => item.category))], rng)
  return pickOne(candidates.filter((item) => item.category === category), rng)
}

function choosePresentation(disorderId: string, recentCases: readonly Case[], rng: () => number): number {
  const indices = caseProfiles[disorderId].situations.map((_, index) => index)
  const seen = recentCases
    .filter((item) => item.correctDisorderId === disorderId)
    .flatMap((item) => item.tags.filter((tag) => tag.startsWith('presentation_')))
    .map((tag) => Number(tag.slice('presentation_'.length)))
    .filter((index) => indices.includes(index))
    .reverse()
  const recent = [...new Set(seen)].slice(0, indices.length - 1)
  return pickOne(indices.filter((index) => !recent.includes(index)), rng)
}

function buildProceduralCase(input: GenerateProceduralCaseInput): Case {
  const disorder = chooseDisorder(createRng(input.seed), input)
  const profile = caseProfiles[disorder.id]
  const identityRng = createRng(`${input.seed}:${disorder.id}:identity`)
  const contentRng = createRng(`${input.seed}:${disorder.id}:content`)
  const [minAge, maxAge] = disorder.caseAgeRange ?? profile.ageRange
  const age = minAge + Math.floor(identityRng() * (maxAge - minAge + 1))
  const name = `${pickOne(firstNames, identityRng)} ${pickOne(lastNames, identityRng)}`
  const presentation = choosePresentation(disorder.id, input.recentCases ?? [], contentRng)
  const id = `${input.caseIdPrefix}-v2-${disorder.id}-${hashSeed(input.seed).toString(36)}-p${presentation}`
  const comparison = disorders.find((item) => item.id === profile.differential.disorderId)!
  // The last clue names a close alternative without explaining it; the reasoning stays in the result.
  const clueTexts = [...profile.details, `Um diagnóstico próximo que vale descartar: ${comparison.namePt}.`]

  return {
    id,
    title: pickOne(titles, createRng(`${input.seed}:title`)),
    category: disorder.category,
    difficulty: disorder.difficulty,
    vignette: `${name}, ${age} anos, ${profile.situations[presentation]}\n\n${profile.course} ${profile.distinction}`,
    correctDisorderId: disorder.id,
    clues: clueTexts.map((text, index) => ({
      id: `${id}-clue-${index + 1}`, order: index + 1, type: clueTypes[index], text,
    })),
    explanation: `Neste caso fictício, a hipótese mais compatível é ${disorder.namePt}. O ponto decisivo: ${profile.distinction} ${profile.course}`,
    differentials: [{ ...profile.differential }],
    tags: ['procedural_v2', `presentation_${presentation}`, `idade_${age}`],
    sourceNote: 'Caso fictício composto com observações educacionais originais. Não é uma avaliação clínica.',
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
    dailyOnly: true,
    caseIdPrefix: `proc-daily-${dateKey}`,
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
