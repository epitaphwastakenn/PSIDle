import { disorders } from '../data/disorders'
import { removeAccents } from './normalize'
import type { Case, CaseClue, Difficulty, Disorder } from '../types/models'

interface GenerationFilters {
  category?: string
  difficulty?: Difficulty
  excludeDisorderIds?: string[]
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

interface CategoryContextBank {
  settings: string[]
  copingAttempts: string[]
  collateralSignals: string[]
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

const firstNames = [
  'Alice',
  'Aline',
  'Amanda',
  'Ana',
  'Ana Beatriz',
  'Ana Clara',
  'Ana Julia',
  'Andressa',
  'Arthur',
  'Augusto',
  'Barbara',
  'Beatriz',
  'Bianca',
  'Brenda',
  'Bruna',
  'Bruno',
  'Caio',
  'Camila',
  'Carla',
  'Carlos',
  'Carolina',
  'Catarina',
  'Cecilia',
  'Cesar',
  'Clara',
  'Clarice',
  'Cristiane',
  'Daniel',
  'Daniela',
  'Danilo',
  'Davi',
  'Debora',
  'Diego',
  'Douglas',
  'Eduarda',
  'Eduardo',
  'Elaine',
  'Elisa',
  'Eloisa',
  'Enzo',
  'Erica',
  'Estevao',
  'Evelyn',
  'Fabiana',
  'Fabio',
  'Felipe',
  'Fernanda',
  'Fernando',
  'Flavia',
  'Francisco',
  'Gabriel',
  'Gabriela',
  'Giovana',
  'Gisele',
  'Guilherme',
  'Gustavo',
  'Helena',
  'Henrique',
  'Hugo',
  'Ian',
  'Igor',
  'Iris',
  'Isabela',
  'Isadora',
  'Joana',
  'Joao',
  'Joaquim',
  'Jorge',
  'Jose',
  'Juliana',
  'Julio',
  'Karen',
  'Karina',
  'Katia',
  'Kaua',
  'Lais',
  'Lara',
  'Larissa',
  'Laura',
  'Leticia',
  'Livia',
  'Lorena',
  'Luana',
  'Lucas',
  'Luciana',
  'Lucia',
  'Luis',
  'Luiza',
  'Marcela',
  'Marcelo',
  'Marcia',
  'Marcos',
  'Maria',
  'Maria Clara',
  'Mariana',
  'Marina',
  'Marta',
  'Matheus',
  'Melissa',
  'Micaela',
  'Miguel',
  'Milena',
  'Murilo',
  'Nadia',
  'Natalia',
  'Nicolas',
  'Nina',
  'Otavio',
  'Paola',
  'Patricia',
  'Paulo',
  'Pedro',
  'Priscila',
  'Rafaela',
  'Rafael',
  'Raissa',
  'Renan',
  'Renata',
  'Ricardo',
  'Roberta',
  'Rodrigo',
  'Rosana',
  'Samuel',
  'Sabrina',
  'Sofia',
  'Sonia',
  'Tainara',
  'Talita',
  'Tamara',
  'Tatiane',
  'Teresa',
  'Thiago',
  'Vanessa',
  'Veronica',
  'Vicente',
  'Vitoria',
  'Vitor',
  'William',
  'Yasmin',
]

const lastNames = [
  'Almeida',
  'Alves',
  'Andrade',
  'Araujo',
  'Barbosa',
  'Barros',
  'Batista',
  'Borges',
  'Campos',
  'Cardoso',
  'Carvalho',
  'Castro',
  'Cavalcante',
  'Correia',
  'Costa',
  'Cruz',
  'Dias',
  'Domingues',
  'Duarte',
  'Esteves',
  'Farias',
  'Fernandes',
  'Ferreira',
  'Freitas',
  'Gomes',
  'Goncalves',
  'Lima',
  'Lopes',
  'Machado',
  'Macedo',
  'Matos',
  'Medeiros',
  'Melo',
  'Mendes',
  'Monteiro',
  'Moraes',
  'Moreira',
  'Nascimento',
  'Nogueira',
  'Novaes',
  'Oliveira',
  'Pacheco',
  'Peixoto',
  'Pereira',
  'Ramos',
  'Rezende',
  'Ribeiro',
  'Rocha',
  'Rodrigues',
  'Santana',
  'Santos',
  'Silva',
  'Siqueira',
  'Soares',
  'Sousa',
  'Teixeira',
  'Vieira',
]

const titlePrefixes = [
  'Caderno clinico',
  'Painel de estudo',
  'Sessao de raciocinio',
  'Recorte de pratica',
  'Laboratorio de hipoteses',
  'Cena para analise',
]

const titleAngles = [
  'pistas iniciais',
  'perfil funcional',
  'curso e contexto',
  'leitura longitudinal',
  'mapa de sinais',
  'recorte de funcionamento',
  'observacao em camadas',
]

const titleDomains = [
  'rotina academica',
  'rotina de trabalho',
  'convivio familiar',
  'vida social',
  'autocuidado e sono',
  'organizacao cotidiana',
  'gestao emocional',
]

const titleQualifiers = [
  'com variacao progressiva',
  'com sobrecarga recente',
  'com impacto multifatorial',
  'com sinais persistentes',
  'com oscilacao de desempenho',
  'com custo funcional crescente',
]

const stressors = [
  'com acumulacao de demandas em curto prazo',
  'apos semanas de sobrecarga e pouco descanso',
  'em contexto de mudancas relevantes na rotina',
  'com aumento de cobranca por desempenho',
  'apos conflitos interpessoais recentes',
  'com quebra de habitos de sono e recuperacao',
  'em fase de incerteza sobre trabalho e estudo',
  'apos transicao de rotina academica para profissional',
  'durante periodo de maior exposicao social',
  'em etapa de reorganizacao familiar e financeira',
  'apos variacoes frequentes de agenda',
  'com perda de tempo de lazer e recuperacao',
  'com pressao por resultados em curto prazo',
  'apos evento estressor de media intensidade',
  'com ciclos de tentativa de compensacao sem estabilidade',
]

const functionalImpacts = [
  'queda de rendimento em tarefas importantes',
  'reducao da participacao social',
  'dificuldade de manter regularidade de sono',
  'atraso recorrente de compromissos',
  'evitacao de situacoes antes manejaveis',
  'dificuldade de manter foco por longos periodos',
  'aumento de conflitos em relacoes proximas',
  'menor tolerancia a frustacao no cotidiano',
  'prejuizo em organizacao de prioridades',
  'descontinuidade de projetos de medio prazo',
  'queda de autocuidado em semanas de maior carga',
  'maior dependencia de estrategias improvisadas para funcionar',
]

const behavioralSnapshotsByDifficulty: Record<Difficulty, string[]> = {
  easy: [
    'passou a adiar tarefas simples que antes eram feitas sem esforco',
    'tem levado mais tempo para iniciar compromissos do dia',
    'relata oscilacao objetiva de desempenho entre dias consecutivos',
    'observa dificuldade pratica para manter rotina de estudos ou trabalho',
    'tem alternado dias de produtividade com dias de travamento funcional',
    'passou a evitar pequenos compromissos por receio de nao dar conta',
    'relata queda de consistencia em tarefas previsiveis',
    'descreve cansaco mental desproporcional em tarefas simples',
  ],
  medium: [
    'alterna periodos curtos de compensacao com recaidas funcionais',
    'descreve tentativas de controle que aliviam apenas no curto prazo',
    'mantem esforco elevado, mas com desgaste progressivo ao longo da semana',
    'apresenta variacao de desempenho conforme gatilhos contextuais',
    'combina estrategias de evitacao com picos de hipercontrole pouco sustentaveis',
    'apresenta ciclos de sobrecompensacao seguidos por queda abrupta de energia',
    'faz ajustes frequentes de rotina sem ganhos consistentes de estabilidade',
    'vive alternancia entre monitoramento excessivo e abandono de estrategias',
  ],
  hard: [
    'o funcionamento oscila em ciclos de organizacao parcial seguidos de descompensacao',
    'a regulacao emocional e cognitiva parece depender de alto custo de autocontrole',
    'o padrao se manifesta como processo de manutencao, nao apenas como eventos isolados',
    'ha ruptura gradual entre intencao, execucao e avaliacao das proprias condutas',
    'o padrao se repete mesmo com tentativas estruturadas de reorganizacao',
    'a previsibilidade do funcionamento caiu apesar de alto investimento adaptativo',
    'os sinais parecem acoplados a mecanimos de evitacao e sobrecarga em espiral',
    'a organizacao subjetiva mostra rigidez crescente diante de estressores usuais',
  ],
}

const internalLayersByDifficulty: Record<Difficulty, string[]> = {
  easy: [
    'com desconforto percebido de forma clara pela propria pessoa',
    'com sofrimento subjetivo descrito de maneira objetiva',
    'com consciencia de que o quadro ja afeta mais de uma area da vida',
    'com percepcao nitida de perda de qualidade de vida',
  ],
  medium: [
    'com ambivalencia entre reconhecer prejuizo e tentar normalizar os sinais',
    'com sensacao de perda progressiva de previsibilidade na rotina',
    'com aumento de autovigilancia e reducao de flexibilidade emocional',
    'com conflito entre necessidade de rendimento e capacidade de recuperacao',
    'com alternancia entre expectativa de melhora rapida e frustracao recorrente',
  ],
  hard: [
    'com tensao entre necessidade de controle e enfraquecimento da autorregulacao',
    'com leitura interna marcada por rigidez interpretativa e fadiga adaptativa',
    'com dinamica de manutencao que combina vulnerabilidade, evitacao e sobrecompensacao',
    'com deslocamento progressivo de identidade para o papel de "sobrevivencia funcional"',
    'com processos de sentido que reforcam ciclos de alerta e exaustao',
  ],
}

const abstractionLensesByDifficulty: Record<Difficulty, string[]> = {
  easy: [
    'o quadro aparece como sequencia de sinais concretos no cotidiano',
    'os indicios surgem de forma observavel em tarefas e relacoes',
    'a mudanca funcional pode ser vista em comportamentos especificos',
    'os dados sugerem padrao reconhecivel sem necessidade de inferencia complexa',
  ],
  medium: [
    'o caso sugere um padrao em camadas, com fatores internos e contextuais',
    'os sinais se organizam em ciclo de ativacao, alivio breve e nova piora',
    'a narrativa aponta para interacao entre gatilho externo e vulnerabilidade basal',
    'o funcionamento oscila conforme demandas sociais e mecanismos de enfrentamento',
    'a leitura clinica exige integrar sinais comportamentais e custo subjetivo',
  ],
  hard: [
    'o caso se apresenta mais como dinamica processual do que como lista de sintomas',
    'a leitura exige integrar temporalidade, funcionamento e mecanismos de manutencao',
    'o nucleo clinico emerge da relacao entre contexto, autorregulacao e significado subjetivo',
    'os marcadores clinicos aparecem de forma distribuida e parcialmente mascarada por compensacao',
    'o material convida a formular hipotese por padrao de organizacao, nao por evento unico',
  ],
}

const inferencePromptsByDifficulty: Record<Difficulty, string[]> = {
  easy: [
    'identifique quais sinais sao nucleares e quais sao secundarios',
    'compare os dados com hipoteses mais prevalentes da mesma categoria',
    'diferencie sofrimento situacional de padrao clinico persistente',
    'mapeie quais elementos falam a favor e contra cada hipotese principal',
  ],
  medium: [
    'avalie se o padrao e melhor explicado por eixo primario ou por comorbidade',
    'considere como os comportamentos de enfrentamento mantem o ciclo atual',
    'teste hipoteses diferenciais com foco em curso temporal e impacto funcional',
    'discuta quais pistas sao mais discriminativas entre hipoteses proximas',
    'separe fatores precipitantes de fatores perpetuadores no caso',
  ],
  hard: [
    'priorize formulacao de mecanismo, nao apenas correspondencia por checklist',
    'analise a coerencia entre fenomenologia, cronologia e prejuizo estrutural',
    'revise diferenciais proximos a partir de padroes de manutencao e nao de sinais isolados',
    'teste se a hipotese escolhida explica melhor o conjunto completo de variaveis',
    'avalie a consistencia interna do caso em multiplos eixos de funcionamento',
  ],
}

const categorySignals: Partial<Record<string, string[]>> = {
  Humor: [
    'oscilacao afetiva',
    'queda de energia',
    'perda de interesse',
    'lentificacao psicologica',
    'variacao de motivacao com impacto ocupacional',
  ],
  Ansiedade: [
    'medo antecipatorio',
    'hipervigilancia',
    'evitacao',
    'tensao fisiologica persistente',
    'busca repetida de garantias',
  ],
  'Obsessivo-compulsivo': [
    'pensamentos intrusivos',
    'rituais repetitivos',
    'busca de alivio imediato',
    'checagem compulsiva',
    'dificuldade de tolerar incerteza',
  ],
  'Trauma e Estresse': [
    'reexperiencia',
    'reatividade a gatilhos',
    'evitacao defensiva',
    'hiperativacao autonoma',
    'alteracoes de confianca e seguranca basica',
  ],
  Neurodesenvolvimento: [
    'sinais desde fases precoces',
    'prejuizo em mais de um contexto',
    'impacto em aprendizagem',
    'variacao de desempenho por demanda executiva',
    'persistencia de dificuldades ao longo do desenvolvimento',
  ],
  Psicoticos: [
    'alteracao de percepcao',
    'pensamento desorganizado',
    'quebra de teste de realidade',
    'conteudo ideativo rigido',
    'dificuldade de autocorrecao de inferencias',
  ],
  Dissociativos: [
    'desconexao subjetiva',
    'lacunas de memoria',
    'estranhamento de si',
    'sensacao de irrealidade contextual',
    'flutuacao de continuidade autobiografica',
  ],
  'Sintomas Somaticos': [
    'foco em sintomas corporais',
    'ansiedade de saude',
    'busca repetida de seguranca',
    'hiperfoco interoceptivo',
    'uso frequente de servicos por angustia persistente',
  ],
  'Alimentacao e Ingestao': [
    'padrao alimentar desadaptativo',
    'preocupacao corporal',
    'impacto fisico e social',
    'comportamentos compensatorios',
    'restricao ou descontrole alimentar recorrente',
  ],
  'Sono-Vigilia': [
    'desregulacao de sono',
    'sonolencia diurna',
    'queda de recuperacao',
    'latencia prolongada para dormir',
    'instabilidade do ciclo sono-vigilia',
  ],
  Personalidade: [
    'padrao relacional persistente',
    'rigidez comportamental',
    'instabilidade emocional',
    'distorcoes interpessoais recorrentes',
    'estrategias defensivas inflexiveis',
  ],
  'Uso de Substancias': [
    'perda de controle',
    'uso apesar de prejuizos',
    'recaida',
    'priorizacao do consumo',
    'reducoes mal sucedidas',
  ],
  'Comportamentos Aditivos': [
    'prioridade excessiva do comportamento',
    'dificuldade de interromper',
    'prejuizo funcional',
    'escalada de tempo investido',
    'continuidade apesar de perdas',
  ],
  Neurocognitivos: [
    'queda cognitiva progressiva',
    'dificuldade de memoria',
    'impacto na autonomia',
    'oscilacao atencional',
    'prejuizo instrumental no dia a dia',
  ],
  'Controle de Impulsos e Conduta': [
    'impulsividade',
    'desregulacao de raiva',
    'violacao de regras',
    'baixa inibicao comportamental',
    'ciclos de acao impulsiva e arrependimento',
  ],
}

const categoryContextBanks: Partial<Record<string, CategoryContextBank>> = {
  Humor: {
    settings: ['na rotina de autocuidado', 'em demandas de produtividade', 'na relacao com metas de longo prazo'],
    copingAttempts: [
      'tentou aumentar disciplina por conta propria',
      'procurou compensar com mais horas de atividade',
      'alternou periodos de isolamento com tentativas de retomada',
    ],
    collateralSignals: [
      'familia relata mudanca de ritmo e iniciativa',
      'colegas percebem queda consistente de energia social',
      'a propria pessoa descreve perda de prazer em atividades antes neutras',
    ],
  },
  Ansiedade: {
    settings: ['em situacoes de avaliacao', 'em tarefas com incerteza', 'na previsao de eventos futuros'],
    copingAttempts: [
      'busca reasseguramento repetido antes de decidir',
      'evita cenarios com baixa previsibilidade',
      'prepara planos detalhados para reduzir desconforto antecipatorio',
    ],
    collateralSignals: [
      'relatos proximos descrevem tensao constante',
      'ha aumento de verificacoes e perguntas repetidas',
      'o ciclo de preocupacao se estende para multiplos dominios',
    ],
  },
  'Obsessivo-compulsivo': {
    settings: ['na organizacao de rotinas domesticas', 'em tarefas de responsabilidade', 'em contextos de higiene e seguranca'],
    copingAttempts: [
      'repete rituais para reduzir ansiedade',
      'tenta neutralizar pensamentos com verificacoes',
      'evita gatilhos por receio de perder controle',
    ],
    collateralSignals: [
      'rotinas ficam mais longas por repeticoes',
      'ha alivio breve seguido de retomada do ciclo',
      'o gasto de tempo compromete compromissos relevantes',
    ],
  },
  'Trauma e Estresse': {
    settings: ['apos evento de forte impacto emocional', 'em contato com pistas associadas ao evento', 'na tentativa de retomar rotina anterior'],
    copingAttempts: [
      'evita contextos lembrados como gatilho',
      'aumenta monitoramento de seguranca',
      'tenta suprimir memorias relacionadas ao episodio',
    ],
    collateralSignals: [
      'familia percebe irritabilidade e alerta elevado',
      'ha queda de tolerancia a estimulos inesperados',
      'o padrao interfere em deslocamento, sono ou convivio',
    ],
  },
  Neurodesenvolvimento: {
    settings: ['desde etapas escolares', 'em tarefas com alta demanda executiva', 'na transicao entre ambientes estruturados e livres'],
    copingAttempts: [
      'usa lembretes e listas de forma inconsistente',
      'depende de terceiros para organizar sequencias complexas',
      'alterna hiperfoco pontual com perda de continuidade',
    ],
    collateralSignals: [
      'historico longitudinal aponta sinais persistentes',
      'o desempenho muda conforme suporte externo disponivel',
      'ha impacto simultaneo em estudo/trabalho e vida diaria',
    ],
  },
  Personalidade: {
    settings: ['em vinculos afetivos proximos', 'em contexto de critica ou frustracao', 'na manutencao de limites interpessoais'],
    copingAttempts: [
      'responde com estrategias relacionais extremas',
      'oscila entre busca intensa de proximidade e afastamento',
      'interpreta sinais neutros como ameaca ou rejeicao',
    ],
    collateralSignals: [
      'padrao relacional se repete em diferentes vinculos',
      'ha desgaste cronico na rede de apoio',
      'mudancas de humor parecem fortemente reativas ao contexto social',
    ],
  },
  'Comportamentos Aditivos': {
    settings: ['em atividades digitais de alta recompensa', 'em ambientes de aposta recorrente', 'em periodos de maior estresse e escape'],
    copingAttempts: [
      'tenta limitar tempo sem manter o plano',
      'reorganiza agenda para encaixar o comportamento',
      'oculta frequencia real da atividade',
    ],
    collateralSignals: [
      'outros compromissos perdem prioridade',
      'ha continuidade apesar de perdas objetivas',
      'surgem conflitos por promessas repetidas nao sustentadas',
    ],
  },
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

function buildPersonName(rng: () => number): string {
  const firstName = pickOne(firstNames, rng)
  const maybeSecondName = rng() < 0.22 ? ` ${pickOne(firstNames, rng)}` : ''
  const lastName = pickOne(lastNames, rng)
  const maybeSecondLastName = rng() < 0.55 ? ` ${pickOne(lastNames, rng)}` : ''
  return `${firstName}${maybeSecondName} ${lastName}${maybeSecondLastName}`
}

function chooseDisorder(rng: () => number, filters: GenerationFilters): Disorder {
  const excluded = new Set(filters.excludeDisorderIds ?? [])
  const exactFiltered = disorders.filter((disorder) => {
    const matchesCategory = !filters.category || disorder.category === filters.category
    const matchesDifficulty = !filters.difficulty || disorder.difficulty === filters.difficulty
    return matchesCategory && matchesDifficulty
  })

  const exactNotExcluded = exactFiltered.filter((disorder) => !excluded.has(disorder.id))

  if (exactNotExcluded.length > 0) {
    return pickOne(exactNotExcluded, rng)
  }

  if (exactFiltered.length > 0) {
    return pickOne(exactFiltered, rng)
  }

  if (filters.category) {
    const byCategory = disorders.filter((disorder) => disorder.category === filters.category)
    const byCategoryNotExcluded = byCategory.filter((disorder) => !excluded.has(disorder.id))
    if (byCategoryNotExcluded.length > 0) {
      return pickOne(byCategoryNotExcluded, rng)
    }
    if (byCategory.length > 0) {
      return pickOne(byCategory, rng)
    }
  }

  if (filters.difficulty) {
    const byDifficulty = disorders.filter((disorder) => disorder.difficulty === filters.difficulty)
    const byDifficultyNotExcluded = byDifficulty.filter((disorder) => !excluded.has(disorder.id))
    if (byDifficultyNotExcluded.length > 0) {
      return pickOne(byDifficultyNotExcluded, rng)
    }
    if (byDifficulty.length > 0) {
      return pickOne(byDifficulty, rng)
    }
  }

  const allNotExcluded = disorders.filter((disorder) => !excluded.has(disorder.id))
  return pickOne(allNotExcluded.length > 0 ? allNotExcluded : disorders, rng)
}

function normalizeToken(token: string): string {
  return removeAccents(token.toLowerCase()).replace(/[^a-z0-9]/g, '')
}

function uniqueValues<T>(list: T[]): T[] {
  return [...new Set(list)]
}

function formatNaturalList(values: string[]): string {
  if (!values.length) {
    return ''
  }
  if (values.length === 1) {
    return values[0]
  }
  if (values.length === 2) {
    return `${values[0]} e ${values[1]}`
  }
  return `${values.slice(0, -1).join(', ')} e ${values.at(-1)}`
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

function getAgeBandLabel(age: number): string {
  if (age <= 17) {
    return 'adolescencia'
  }
  if (age <= 24) {
    return 'inicio da vida adulta'
  }
  if (age <= 39) {
    return 'adulto jovem'
  }
  if (age <= 59) {
    return 'adulto'
  }
  return 'adulto mais velho'
}

function selectCategoryContext(category: string): CategoryContextBank {
  const fallback: CategoryContextBank = {
    settings: ['na organizacao da rotina', 'na convivencia social', 'na manutencao de responsabilidades diarias'],
    copingAttempts: [
      'tenta ajustar habitos com esforco proprio',
      'reorganiza tarefas para reduzir sobrecarga',
      'alterna estrategias de compensacao sem estabilidade',
    ],
    collateralSignals: [
      'o entorno percebe mudanca funcional progressiva',
      'o impacto aparece em mais de uma area da vida',
      'ha variacao de desempenho apesar de tentativa de controle',
    ],
  }

  return categoryContextBanks[category] ?? fallback
}

function buildTimeline(difficulty: Difficulty, rng: () => number): string {
  if (difficulty === 'easy') {
    const inWeeks = rng() < 0.3
    if (inWeeks) {
      const weeks = 8 + Math.floor(rng() * 18)
      return `o padrao vem se repetindo ha cerca de ${weeks} semanas`
    }

    const months = 3 + Math.floor(rng() * 9)
    return `o padrao vem se repetindo ha cerca de ${months} meses`
  }

  if (difficulty === 'medium') {
    const months = 6 + Math.floor(rng() * 19)
    return `o quadro permanece recorrente ha aproximadamente ${months} meses, com oscilacoes de intensidade`
  }

  const years = 1 + Math.floor(rng() * 7)
  return `ha um curso prolongado, em torno de ${years} anos, com recaidas e custo funcional cumulativo`
}

function buildProgression(difficulty: Difficulty, rng: () => number): string {
  const progressions: Record<Difficulty, string[]> = {
    easy: [
      'com piora gradual em fases de maior demanda',
      'com desconforto continuo e sem remissao sustentada',
      'com alivio apenas parcial em periodos de baixa exigencia',
      'com piora perceptivel quando a rotina perde previsibilidade',
    ],
    medium: [
      'com impacto crescente em rotina social e ocupacional',
      'com alternancia entre tentativas de ajuste e nova piora',
      'com recuo funcional apos periodos de compensacao intensa',
      'com ampliacao do prejuizo para novas areas da vida diaria',
    ],
    hard: [
      'com ciclo de agravamento e recuperacoes parciais',
      'com queda progressiva de previsibilidade do funcionamento',
      'com reorganizacao defensiva que preserva forma, mas nao estabilidade',
      'com rigidez adaptativa e aumento de vulnerabilidade a gatilhos contextuais',
    ],
  }
  return pickOne(progressions[difficulty], rng)
}

function buildTitle(age: number, roleContext: RoleContext, rng: () => number): string {
  const caseToken = Math.floor(rng() * 1296)
    .toString(36)
    .padStart(2, '0')
    .toUpperCase()

  return `${pickOne(titlePrefixes, rng)}: ${pickOne(titleAngles, rng)} na ${pickOne(titleDomains, rng)} ${pickOne(titleQualifiers, rng)} (${getAgeBandLabel(age)}, ${roleContext.setting}, ref.${caseToken})`
}

function selectKeywordFocus(disorder: Disorder, rng: () => number): {
  broadFocus: string
  compressedFocus: string
} {
  const fromSummary = extractKeywords(disorder.shortSummary, 5)
  const fromStudy = extractKeywords(disorder.studyNote, 5)
  const combined = uniqueValues([...fromSummary, ...fromStudy])

  if (!combined.length) {
    return {
      broadFocus: disorder.category.toLowerCase(),
      compressedFocus: disorder.category.toLowerCase(),
    }
  }

  const broad = formatNaturalList(pickManyUnique(combined, Math.min(3, combined.length), rng))
  const compact = formatNaturalList(pickManyUnique(combined, Math.min(2, combined.length), rng))

  return {
    broadFocus: broad || disorder.category.toLowerCase(),
    compressedFocus: compact || disorder.category.toLowerCase(),
  }
}

function buildVignette(input: {
  disorder: Disorder
  name: string
  age: number
  roleContext: RoleContext
  rng: () => number
}): string {
  const difficulty = input.disorder.difficulty
  const stressor = pickOne(stressors, input.rng)
  const signal = pickOne(categorySignals[input.disorder.category] ?? ['sofrimento emocional recorrente'], input.rng)
  const behaviorSnapshot = pickOne(behavioralSnapshotsByDifficulty[difficulty], input.rng)
  const internalLayer = pickOne(internalLayersByDifficulty[difficulty], input.rng)
  const abstractionLens = pickOne(abstractionLensesByDifficulty[difficulty], input.rng)
  const timeline = buildTimeline(difficulty, input.rng)
  const progression = buildProgression(difficulty, input.rng)
  const keywordFocus = selectKeywordFocus(input.disorder, input.rng)
  const categoryContext = selectCategoryContext(input.disorder.category)
  const contextSetting = pickOne(categoryContext.settings, input.rng)
  const copingAttempt = pickOne(categoryContext.copingAttempts, input.rng)
  const collateralSignal = pickOne(categoryContext.collateralSignals, input.rng)

  if (difficulty === 'easy') {
    return `${input.name}, ${input.age} anos, ${input.roleContext.role}, descreve mudancas persistentes ${input.roleContext.setting}. O quadro aparece ${contextSetting}, ${stressor}, com destaque para ${signal}. No cotidiano, ${behaviorSnapshot}; ${copingAttempt}, ${internalLayer}. Relatos colaterais indicam que ${collateralSignal}. Na cronologia, ${timeline}, ${progression}, com sinais centrais envolvendo ${keywordFocus.compressedFocus}.`
  }

  if (difficulty === 'medium') {
    return `${input.name}, ${input.age} anos, ${input.roleContext.role}, apresenta quadro funcionalmente relevante ${input.roleContext.setting}. O relato se intensificou ${stressor}; no eixo comportamental, ${behaviorSnapshot}. Em paralelo, ${copingAttempt}, mas ${collateralSignal}. ${abstractionLens}, combinando ${signal} e marcadores como ${keywordFocus.compressedFocus}. Em termos de curso, ${timeline}, ${progression}, com prejuizo progressivo na organizacao cotidiana.`
  }

  return `${input.name}, ${input.age} anos, ${input.roleContext.role}, apresenta narrativa clinica em camadas ${input.roleContext.setting}. Em vez de eventos isolados, o quadro se adensa ${stressor}, enquanto ${behaviorSnapshot}. No manejo espontaneo, ${copingAttempt}, porem ${collateralSignal}. ${abstractionLens}, articulando ${signal} com eixos de ${keywordFocus.broadFocus}. Na leitura longitudinal, ${timeline}, ${progression}, sugerindo desajuste crescente entre autorregulacao, vinculos e desempenho funcional.`
}

function createClues(input: {
  caseId: string
  disorder: Disorder
  roleContext: RoleContext
  rng: () => number
}): CaseClue[] {
  const difficulty = input.disorder.difficulty
  const summary = input.disorder.shortSummary.replace(/\.$/, '')
  const categoryHint = pickOne(categorySignals[input.disorder.category] ?? ['impacto funcional progressivo'], input.rng)
  const timeline = buildTimeline(input.disorder.difficulty, input.rng)
  const progression = buildProgression(input.disorder.difficulty, input.rng)
  const impacts = pickManyUnique(functionalImpacts, 3, input.rng)
  const behaviorSnapshot = pickOne(behavioralSnapshotsByDifficulty[difficulty], input.rng)
  const internalLayer = pickOne(internalLayersByDifficulty[difficulty], input.rng)
  const abstractionLens = pickOne(abstractionLensesByDifficulty[difficulty], input.rng)
  const inferencePrompt = pickOne(inferencePromptsByDifficulty[difficulty], input.rng)
  const keywordFocus = selectKeywordFocus(input.disorder, input.rng)
  const categoryContext = selectCategoryContext(input.disorder.category)
  const contextSetting = pickOne(categoryContext.settings, input.rng)
  const copingAttempt = pickOne(categoryContext.copingAttempts, input.rng)
  const collateralSignal = pickOne(categoryContext.collateralSignals, input.rng)

  const clueTextsByDifficulty: Record<Difficulty, string[]> = {
    easy: [
      `Queixa principal: o caso sugere ${summary}. O desconforto fica mais evidente ${input.roleContext.setting}, especialmente ${contextSetting}.`,
      `Sinais observados: ${categoryHint}. Em termos concretos, ${behaviorSnapshot}; ${internalLayer}.`,
      `Cronologia e manejo: ${timeline}, ${progression}. No enfrentamento, ${copingAttempt}, mas ${collateralSignal}.`,
      `Impacto funcional: ${impacts[0] ?? 'queda de desempenho'}, ${impacts[1] ?? 'evitacao social'} e ${impacts[2] ?? 'atraso de compromissos'}. Foco de raciocinio: ${inferencePrompt}.`,
    ],
    medium: [
      `Nucleo narrativo: ha um padrao compativel com ${summary}. No cotidiano ${input.roleContext.setting}, ${behaviorSnapshot}, ${internalLayer}.`,
      `Configuracao de pistas: ${categoryHint}. Em camadas, aparecem eixos de ${keywordFocus.compressedFocus}, associados a ${contextSetting}.`,
      `Temporalidade e manutencao: ${timeline}, ${progression}. O padrao retorna mesmo apos estrategias como ${copingAttempt}.`,
      `Prejuizo: ${impacts[0] ?? 'queda de desempenho'} e ${impacts[1] ?? 'evitacao social'}, com extensao para ${impacts[2] ?? 'sono irregular'}. Relato colateral: ${collateralSignal}. Pergunta critica: ${inferencePrompt}.`,
    ],
    hard: [
      `Fenomenologia inicial: o caso pode ser descrito como ${summary}. Em contexto ${input.roleContext.setting}, ${behaviorSnapshot}, ${internalLayer}.`,
      `Leitura processual: ${abstractionLens}. O material aponta para interacao entre ${categoryHint}, ${contextSetting} e vetores de ${keywordFocus.compressedFocus}.`,
      `Curso longitudinal: ${timeline}, ${progression}. A repeticao do ciclo persiste mesmo quando ${copingAttempt}; adicionalmente, ${collateralSignal}.`,
      `Estrutura de prejuizo: ${impacts[0] ?? 'queda de desempenho'}, ${impacts[1] ?? 'evitacao social'} e ${impacts[2] ?? 'desorganizacao de rotina'}. Foco para diferencial: ${inferencePrompt}.`,
    ],
  }

  const clueTexts = clueTextsByDifficulty[difficulty]

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
  const name = buildPersonName(rng)
  const caseId = `${input.caseIdPrefix}-${disorder.id}-${hashSeed(input.seed).toString(36)}`

  return {
    id: caseId,
    title: buildTitle(age, roleContext, rng),
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
  excludeDisorderIds?: string[]
}): Case {
  const fallbackSeed = `${Date.now()}-${Math.random()}`
  return buildProceduralCase({
    seed: input.seed ?? fallbackSeed,
    caseIdPrefix: 'proc-practice',
    category: input.category,
    difficulty: input.difficulty,
    excludeDisorderIds: input.excludeDisorderIds,
  })
}
