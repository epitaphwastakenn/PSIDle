import { disorders } from '../data/disorders'
import { removeAccents } from './normalize'
import type { Case, CaseClue, Difficulty, Disorder } from '../types/models'

interface GenerationFilters {
  category?: string
  difficulty?: Difficulty
}

interface GenerateProceduralCaseInput extends GenerationFilters {
  seed: string | number
  caseIdPrefix: string
  sourceNote?: string
}

interface RoleContext {
  minAge: number
  maxAge: number
  role: string
  setting: string
}

const roleContexts: RoleContext[] = [
  { minAge: 13, maxAge: 18, role: 'estudante', setting: 'na rotina escolar' },
  { minAge: 16, maxAge: 24, role: 'estudante universitario', setting: 'na faculdade' },
  { minAge: 18, maxAge: 30, role: 'jovem em inicio de carreira', setting: 'no inicio da vida profissional' },
  { minAge: 20, maxAge: 65, role: 'profissional ativo', setting: 'na rotina de trabalho' },
  { minAge: 25, maxAge: 75, role: 'adulto com rotina familiar', setting: 'na convivencia domestica e social' },
  { minAge: 40, maxAge: 75, role: 'pessoa em fase de alta responsabilidade', setting: 'em rotina de cuidado e gestao de tarefas' },
  { minAge: 55, maxAge: 85, role: 'adulto mais velho', setting: 'na reorganizacao de habitos diarios' },
]

const names = [
  'Marina',
  'Joao',
  'Rafaela',
  'Thiago',
  'Camila',
  'Henrique',
  'Sonia',
  'Lucas',
  'Ana',
  'Pedro',
  'Livia',
  'Gabriel',
  'Nina',
  'Eduardo',
  'Bruna',
  'Carlos',
  'Renata',
  'Vitor',
  'Amanda',
  'Felipe',
]

const stressors = [
  'com acumulacao de demandas em curto prazo',
  'apos semanas de sobrecarga e pouco descanso',
  'em contexto de mudancas relevantes na rotina',
  'com aumento de cobranca por desempenho',
  'apos conflitos interpessoais recentes',
  'com quebra de habitos de sono e recuperacao',
  'em fase de incerteza sobre trabalho e estudo',
]

const functionalImpacts = [
  'queda de rendimento em tarefas importantes',
  'reducao da participacao social',
  'dificuldade de manter regularidade de sono',
  'atraso recorrente de compromissos',
  'evitacao de situacoes antes manejaveis',
  'dificuldade de manter foco por longos periodos',
]

const categorySignals: Partial<Record<string, string[]>> = {
  Humor: ['oscilacao afetiva', 'queda de energia', 'perda de interesse'],
  Ansiedade: ['medo antecipatorio', 'hipervigilancia', 'evitacao'],
  'Obsessivo-compulsivo': ['pensamentos intrusivos', 'rituais repetitivos', 'busca de aliviio imediato'],
  'Trauma e Estresse': ['reexperiencia', 'reatividade a gatilhos', 'evitacao defensiva'],
  Neurodesenvolvimento: ['sinais desde fases precoces', 'prejuizo em mais de um contexto', 'impacto em aprendizagem'],
  Psicoticos: ['alteracao de percepcao', 'pensamento desorganizado', 'quebra de teste de realidade'],
  Dissociativos: ['desconexao subjetiva', 'lacunas de memoria', 'estranhamento de si'],
  'Sintomas Somaticos': ['foco em sintomas corporais', 'ansiedade de saude', 'busca repetida de seguranca'],
  'Alimentacao e Ingestao': ['padrao alimentar desadaptativo', 'preocupacao corporal', 'impacto fisico e social'],
  'Sono-Vigilia': ['desregulacao de sono', 'sonolencia diurna', 'queda de recuperacao'],
  Personalidade: ['padrao relacional persistente', 'rigidez comportamental', 'instabilidade emocional'],
  'Uso de Substancias': ['perda de controle', 'uso apesar de prejuizos', 'recaida'],
  'Comportamentos Aditivos': ['prioridade excessiva do comportamento', 'dificuldade de interromper', 'prejuizo funcional'],
  Neurocognitivos: ['queda cognitiva progressiva', 'dificuldade de memoria', 'impacto na autonomia'],
  'Controle de Impulsos e Conduta': ['impulsividade', 'desregulacao de raiva', 'violacao de regras'],
}

const clueTypeFlow: CaseClue['type'][] = ['chief_complaint', 'symptoms', 'duration', 'impairment']

const stopwords = new Set([
  'a',
  'o',
  'e',
  'de',
  'da',
  'do',
  'das',
  'dos',
  'com',
  'sem',
  'para',
  'por',
  'em',
  'no',
  'na',
  'nos',
  'nas',
  'um',
  'uma',
  'mais',
  'menos',
  'que',
  'como',
  'apos',
  'sobre',
  'entre',
  'sua',
  'seu',
  'suas',
  'seus',
  'ha',
  'ao',
  'os',
  'as',
  'ou',
  'nao',
  'com',
  'sem',
  'muito',
  'muita',
  'muitos',
  'muitas',
  'quando',
  'onde',
  'sendo',
  'tendo',
  'entre',
  'todas',
  'todos',
  'diante',
  'apesar',
  'apenas',
  'pode',
  'podem',
  'tipo',
  'quadro',
  'transtorno',
  'sintomas',
  'sinal',
  'sinais',
  'padrao',
  'rotina',
])

function hashSeed(seedInput: string | number): number {
  if (typeof seedInput === 'number') {
    const normalized = Math.floor(seedInput) >>> 0
    return normalized === 0 ? 1 : normalized
  }

  let hash = 2166136261
  for (let index = 0; index < seedInput.length; index += 1) {
    hash ^= seedInput.charCodeAt(index)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0 || 1
}

function createRng(seedInput: string | number): () => number {
  let state = hashSeed(seedInput)
  return () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0
    return state / 4294967296
  }
}

function pickOne<T>(list: T[], rng: () => number): T {
  const index = Math.floor(rng() * list.length)
  return list[index]
}

function pickManyUnique<T>(list: T[], amount: number, rng: () => number): T[] {
  const pool = [...list]
  const output: T[] = []
  const count = Math.min(Math.max(0, amount), pool.length)

  for (let index = 0; index < count; index += 1) {
    const selectedIndex = Math.floor(rng() * pool.length)
    const [selected] = pool.splice(selectedIndex, 1)
    output.push(selected)
  }

  return output
}

function chooseDisorder(rng: () => number, filters: GenerationFilters): Disorder {
  const exactFiltered = disorders.filter((disorder) => {
    const matchesCategory = !filters.category || disorder.category === filters.category
    const matchesDifficulty = !filters.difficulty || disorder.difficulty === filters.difficulty
    return matchesCategory && matchesDifficulty
  })

  if (exactFiltered.length > 0) {
    return pickOne(exactFiltered, rng)
  }

  if (filters.category) {
    const byCategory = disorders.filter((disorder) => disorder.category === filters.category)
    if (byCategory.length > 0) {
      return pickOne(byCategory, rng)
    }
  }

  if (filters.difficulty) {
    const byDifficulty = disorders.filter((disorder) => disorder.difficulty === filters.difficulty)
    if (byDifficulty.length > 0) {
      return pickOne(byDifficulty, rng)
    }
  }

  return pickOne(disorders, rng)
}

function normalizeToken(token: string): string {
  return removeAccents(token.toLowerCase()).replace(/[^a-z0-9]/g, '')
}

function extractKeywords(text: string, limit: number): string[] {
  const rawTokens = text.match(/[\p{L}\p{N}]+/gu) ?? []
  const table = new Map<string, { token: string; score: number }>()

  rawTokens.forEach((token) => {
    const normalized = normalizeToken(token)
    if (normalized.length < 4 || stopwords.has(normalized)) {
      return
    }

    const current = table.get(normalized)
    if (!current) {
      table.set(normalized, { token: token.toLowerCase(), score: 1 })
      return
    }

    current.score += 1
  })

  return [...table.values()]
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score
      }
      if (b.token.length !== a.token.length) {
        return b.token.length - a.token.length
      }
      return a.token.localeCompare(b.token)
    })
    .slice(0, limit)
    .map((entry) => entry.token)
}

function buildAge(rng: () => number): number {
  return 13 + Math.floor(rng() * 68)
}

function chooseRoleContext(age: number, rng: () => number): RoleContext {
  const compatible = roleContexts.filter((entry) => age >= entry.minAge && age <= entry.maxAge)
  if (compatible.length > 0) {
    return pickOne(compatible, rng)
  }
  return pickOne(roleContexts, rng)
}

function buildTimeline(difficulty: Difficulty, rng: () => number): string {
  if (difficulty === 'easy') {
    const months = 3 + Math.floor(rng() * 8)
    return `o padrao vem se repetindo ha cerca de ${months} meses`
  }

  if (difficulty === 'medium') {
    const months = 6 + Math.floor(rng() * 15)
    return `o quadro permanece recorrente ha aproximadamente ${months} meses, com oscilacoes`
  }

  const years = 1 + Math.floor(rng() * 5)
  return `ha um curso prolongado, em torno de ${years} anos, com recaidas e piora funcional cumulativa`
}

function buildProgression(difficulty: Difficulty, rng: () => number): string {
  const progressions: Record<Difficulty, string[]> = {
    easy: ['com piora gradual em fases de maior demanda', 'com desconforto continuo e sem remissao sustentada'],
    medium: [
      'com impacto crescente em rotina social e ocupacional',
      'com alternancia entre tentativas de ajuste e nova piora',
    ],
    hard: [
      'com ciclo de agravamento e recuperacoes parciais',
      'com queda progressiva de previsibilidade do funcionamento',
    ],
  }
  return pickOne(progressions[difficulty], rng)
}

function buildTitle(disorder: Disorder, age: number, roleContext: RoleContext, rng: () => number): string {
  const starters = ['Hipotese em foco', 'Leitura de caso', 'Pistas clinicas', 'Caso para estudo']
  const focus = extractKeywords(`${disorder.namePt} ${disorder.shortSummary}`, 2)
  const focusText = focus.length > 0 ? focus.join(' e ') : disorder.category.toLowerCase()
  return `${pickOne(starters, rng)}: ${focusText} (${age} anos, ${roleContext.setting})`
}

function buildVignette(input: {
  disorder: Disorder
  name: string
  age: number
  roleContext: RoleContext
  rng: () => number
}): string {
  const summary = input.disorder.shortSummary.replace(/\.$/, '').toLowerCase()
  const stressor = pickOne(stressors, input.rng)
  const signal = pickOne(categorySignals[input.disorder.category] ?? ['sofrimento emocional recorrente'], input.rng)

  return `${input.name}, ${input.age} anos, ${input.roleContext.role}, relata ${summary} ${input.roleContext.setting}. Nos ultimos meses, o relato se intensificou ${stressor}, com destaque para ${signal}.`
}

function createClues(input: {
  caseId: string
  disorder: Disorder
  roleContext: RoleContext
  rng: () => number
}): CaseClue[] {
  const summary = input.disorder.shortSummary.replace(/\.$/, '')
  const noteKeywords = extractKeywords(input.disorder.studyNote, 4)
  const summaryKeywords = extractKeywords(input.disorder.shortSummary, 4)
  const categoryHint = pickOne(categorySignals[input.disorder.category] ?? ['impacto funcional progressivo'], input.rng)
  const timeline = buildTimeline(input.disorder.difficulty, input.rng)
  const progression = buildProgression(input.disorder.difficulty, input.rng)
  const impacts = pickManyUnique(functionalImpacts, 2, input.rng)
  const noteHint = noteKeywords.length > 0 ? noteKeywords.join(', ') : input.disorder.category.toLowerCase()
  const focusHint = summaryKeywords.length > 0 ? summaryKeywords.join(', ') : summary.toLowerCase()

  const clueTexts = [
    `Relato principal: ${summary}. O desconforto fica mais evidente ${input.roleContext.setting}.`,
    `Sinais observados: ${categoryHint}. Termos-chave recorrentes no relato: ${focusHint}.`,
    `Cronologia: ${timeline}, ${progression}.`,
    `Impacto funcional: ${impacts[0] ?? 'queda de desempenho'} e ${impacts[1] ?? 'evitacao social'}. Ponto para estudo diferencial: ${noteHint}.`,
  ]

  return clueTexts.map((text, index) => ({
    id: `${input.caseId}-clue-${index + 1}`,
    order: index + 1,
    type: clueTypeFlow[index],
    text,
  }))
}

function buildDifferentials(correct: Disorder, rng: () => number): Array<{ disorderId: string; whyNot: string }> {
  const sameCategory = disorders.filter((item) => item.category === correct.category && item.id !== correct.id)
  const sameDifficulty = disorders.filter((item) => item.difficulty === correct.difficulty && item.id !== correct.id)
  const fallback = disorders.filter((item) => item.id !== correct.id)
  const pool = sameCategory.length >= 2 ? sameCategory : sameDifficulty.length >= 2 ? sameDifficulty : fallback
  const alternatives = pickManyUnique(pool, 2, rng)
  const correctFocus = extractKeywords(`${correct.shortSummary} ${correct.studyNote}`, 3).join(', ')
  const leadIns = ['No diferencial,', 'Em comparacao clinica,', 'Ao revisar hipotese alternativa,']

  return alternatives.map((candidate) => ({
    disorderId: candidate.id,
    whyNot: `${pickOne(leadIns, rng)} ${candidate.namePt.toLowerCase()} pode parecer proximo, mas este caso favorece ${correct.namePt.toLowerCase()} pelo conjunto de pistas centrado em ${correctFocus || 'sinais nucleares do quadro'}.`,
  }))
}

function buildExplanation(disorder: Disorder): string {
  return `Hipotese educacional mais provavel: ${disorder.namePt}. ${disorder.shortSummary} ${disorder.studyNote}`
}

function buildProceduralCase(input: GenerateProceduralCaseInput): Case {
  const rng = createRng(input.seed)
  const disorder = chooseDisorder(rng, input)
  const age = buildAge(rng)
  const roleContext = chooseRoleContext(age, rng)
  const name = pickOne(names, rng)
  const caseId = `${input.caseIdPrefix}-${disorder.id}-${hashSeed(input.seed).toString(36)}`

  return {
    id: caseId,
    title: buildTitle(disorder, age, roleContext, rng),
    category: disorder.category,
    difficulty: disorder.difficulty,
    vignette: buildVignette({
      disorder,
      name,
      age,
      roleContext,
      rng,
    }),
    correctDisorderId: disorder.id,
    clues: createClues({
      caseId,
      disorder,
      roleContext,
      rng,
    }),
    explanation: buildExplanation(disorder),
    differentials: buildDifferentials(disorder, rng),
    tags: [...extractKeywords(disorder.namePt, 2), ...extractKeywords(disorder.shortSummary, 3), `idade_${age}`],
    sourceNote: input.sourceNote ?? 'Caso ficticio gerado proceduralmente para estudo educacional.',
    status: 'approved',
  }
}

function getDateKey(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function generateDailyProceduralCase(date: Date): Case {
  const dateKey = getDateKey(date)
  return buildProceduralCase({
    seed: `daily-${dateKey}`,
    caseIdPrefix: `proc-daily-${dateKey}`,
    sourceNote: 'Caso diario ficticio gerado proceduralmente para estudo educacional.',
  })
}

export function generatePracticeProceduralCase(input: {
  category?: string
  difficulty?: Difficulty
  seed?: string | number
}): Case {
  const fallbackSeed = `${Date.now()}-${Math.random()}`
  return buildProceduralCase({
    seed: input.seed ?? fallbackSeed,
    caseIdPrefix: 'proc-practice',
    category: input.category,
    difficulty: input.difficulty,
  })
}
