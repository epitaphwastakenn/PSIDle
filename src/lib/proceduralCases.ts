import { disorders } from '../data/disorders'
import type { Case, CaseClue, Difficulty, Disorder } from '../types/models'

type LifeStage = 'adolescente' | 'jovem_adulto' | 'adulto' | 'adulto_maduro' | 'idoso'

interface LifeStageProfile {
  minAge: number
  maxAge: number
  activityContexts: string[]
  socialContexts: string[]
}

interface DisorderGenerationProfile {
  disorderId: Disorder['id']
  allowedStages: LifeStage[]
  openingLines: string[]
  symptomLines: string[]
  impairmentLines: string[]
  exclusionLines: string[]
  explanationLine: string
  differentialLines: Array<{ disorderId: string; whyNot: string }>
  tags: string[]
}

interface GenerationFilters {
  category?: string
  difficulty?: Difficulty
}

interface GenerateProceduralCaseInput extends GenerationFilters {
  seed: string | number
  caseIdPrefix: string
  sourceNote?: string
}

const lifeStageProfiles: Record<LifeStage, LifeStageProfile> = {
  adolescente: {
    minAge: 13,
    maxAge: 17,
    activityContexts: [
      'na rotina escolar',
      'em atividades de grupo no colegio',
      'durante provas e trabalhos',
      'em apresentacoes da escola',
    ],
    socialContexts: [
      'com colegas de turma',
      'na convivência familiar',
      'em interacoes com professores',
      'em eventos escolares',
    ],
  },
  jovem_adulto: {
    minAge: 18,
    maxAge: 25,
    activityContexts: [
      'na faculdade',
      'no inicio da carreira',
      'em estagio e estudos',
      'na conciliacao entre estudo e trabalho',
    ],
    socialContexts: [
      'em relacoes afetivas recentes',
      'com amigos da universidade',
      'na adaptacao a novas responsabilidades',
      'em ambientes sociais com pessoas novas',
    ],
  },
  adulto: {
    minAge: 26,
    maxAge: 40,
    activityContexts: [
      'no trabalho',
      'na gestao de rotina profissional',
      'em metas de carreira',
      'na organizacao da casa e trabalho',
    ],
    socialContexts: [
      'na convivência com familia',
      'em relacoes afetivas estaveis',
      'com equipe de trabalho',
      'em compromissos sociais frequentes',
    ],
  },
  adulto_maduro: {
    minAge: 41,
    maxAge: 60,
    activityContexts: [
      'na rotina profissional consolidada',
      'no cuidado de responsabilidades familiares',
      'na administracao de equipes',
      'na manutencao de compromissos de longo prazo',
    ],
    socialContexts: [
      'na rede de apoio familiar',
      'em relacoes de trabalho de alta demanda',
      'no cuidado com familiares',
      'em compromissos sociais e familiares',
    ],
  },
  idoso: {
    minAge: 61,
    maxAge: 75,
    activityContexts: [
      'na rotina apos aposentadoria',
      'em atividades comunitarias',
      'na organizacao da vida domestica',
      'em cuidados com saude e rotina diaria',
    ],
    socialContexts: [
      'na convivência com familiares',
      'em grupos sociais do bairro',
      'em atividades de lazer',
      'na rede de suporte pessoal',
    ],
  },
}

const disorderProfiles: Record<Disorder['id'], DisorderGenerationProfile> = {
  mdd: {
    disorderId: 'mdd',
    allowedStages: ['jovem_adulto', 'adulto', 'adulto_maduro'],
    openingLines: [
      'relata queda acentuada de energia e perda de interesse por atividades antes prazerosas',
      'descreve semanas de desanimo, apatia e sensacao de inutilidade',
      'aponta humor deprimido persistente com dificuldade de manter atividades basicas',
    ],
    symptomLines: [
      'tem alteracoes de sono, concentracao reduzida e cansaco quase diario',
      'percebe lentificacao e dificuldade de iniciar tarefas simples',
      'apresenta baixa motivacao e queda importante de prazer nas rotinas',
    ],
    impairmentLines: [
      'o rendimento caiu de forma visivel e houve afastamento de pessoas proximas',
      'passou a evitar compromissos e teve prejuizo funcional no dia a dia',
      'a rotina ficou comprometida em trabalho, autocuidado e relacoes',
    ],
    exclusionLines: [
      'nao houve periodos recentes de energia elevada com pouca necessidade de sono',
      'o quadro nao e melhor explicado por picos de euforia prolongados',
      'nao ha historia recente de fases expansivas bem definidas',
    ],
    explanationLine:
      'A hipotese educativa mais provavel e um quadro depressivo maior pela combinacao de humor deprimido, anedonia e prejuizo funcional persistente.',
    differentialLines: [
      {
        disorderId: 'bipolar_2',
        whyNot: 'No bipolar II, o historico inclui fases de hipomania, o que nao apareceu neste caso.',
      },
      {
        disorderId: 'gad',
        whyNot: 'Na ansiedade generalizada o eixo principal e preocupacao excessiva difusa, nao anedonia central.',
      },
    ],
    tags: ['humor', 'anedonia', 'energia_baixa'],
  },
  gad: {
    disorderId: 'gad',
    allowedStages: ['adolescente', 'jovem_adulto', 'adulto', 'adulto_maduro'],
    openingLines: [
      'apresenta preocupacao excessiva em varias areas e refere dificuldade de desligar os pensamentos',
      'descreve ansiedade persistente sobre problemas cotidianos mesmo sem risco imediato',
      'relata antecipacao constante de cenarios negativos em multiplos temas',
    ],
    symptomLines: [
      'mantem tensao muscular, irritabilidade e dificuldade de relaxar',
      'tem sono nao reparador e fadiga associada ao excesso de preocupacao',
      'refere sensacao de alerta quase continuo com dificuldade de foco',
    ],
    impairmentLines: [
      'o excesso de preocupacao afeta desempenho e qualidade de vida',
      'a rotina ficou mais lenta por indecisao e revisao constante de tarefas',
      'houve queda no funcionamento academico/profissional e social',
    ],
    exclusionLines: [
      'nao descreve ataques abruptos de medo intenso como evento central',
      'a ansiedade nao fica restrita a avaliacao social especifica',
      'nao ha foco predominante em ritual compulsivo para alivio imediato',
    ],
    explanationLine:
      'A formulacao educativa sugere ansiedade generalizada pela preocupacao cronica, difusa e de dificil controle com impacto funcional.',
    differentialLines: [
      {
        disorderId: 'panic',
        whyNot: 'No panico o nucleo costuma ser ataques agudos recorrentes e medo de novas crises.',
      },
      {
        disorderId: 'social_anxiety',
        whyNot: 'Na ansiedade social o foco principal e avaliacao negativa em situacoes de exposicao.',
      },
    ],
    tags: ['preocupacao', 'ansiedade_diffusa', 'tensao'],
  },
  panic: {
    disorderId: 'panic',
    allowedStages: ['jovem_adulto', 'adulto', 'adulto_maduro'],
    openingLines: [
      'relata episodios abruptos de medo intenso com sensacao de perder o controle',
      'teve crises repentinas com sintomas fisicos intensos e medo de morrer',
      'descreve ataques agudos de ansiedade que atingem pico em poucos minutos',
    ],
    symptomLines: [
      'durante as crises, percebe taquicardia, falta de ar e tremor',
      'apos os episodios, passou a monitorar o corpo o tempo todo',
      'desenvolveu medo persistente de uma nova crise inesperada',
    ],
    impairmentLines: [
      'modificou trajetos e evitou sair sem companhia por medo de nova crise',
      'a evitação comprometeu rotina profissional e social',
      'passou a faltar compromissos por receio de crise em publico',
    ],
    exclusionLines: [
      'os episodios nao se explicam melhor por uso recente de substancia',
      'os sintomas nao ficaram restritos a um unico gatilho social',
      'o quadro nao e descrito apenas como preocupacao difusa sem ataques',
    ],
    explanationLine:
      'A hipotese educativa mais forte e transtorno do panico pelo padrao de ataques abruptos e medo antecipatorio de recorrencia.',
    differentialLines: [
      {
        disorderId: 'gad',
        whyNot: 'Na TAG a ansiedade e continua e difusa, sem ataques abruptos como eixo principal.',
      },
      {
        disorderId: 'ptsd',
        whyNot: 'No TEPT os sintomas ficam ancorados a trauma e revivescencia especifica.',
      },
    ],
    tags: ['ataques', 'medo_antecipatorio', 'evitacao'],
  },
  social_anxiety: {
    disorderId: 'social_anxiety',
    allowedStages: ['adolescente', 'jovem_adulto', 'adulto'],
    openingLines: [
      'evita situacoes de exposicao por medo intenso de julgamento',
      'tem forte receio de passar vergonha em contextos sociais',
      'descreve ansiedade elevada diante de interacoes com risco de avaliacao',
    ],
    symptomLines: [
      'antes dessas situacoes, surgem rubor, tremor e taquicardia',
      'fica dias antecipando critica e rejeicao em encontros sociais',
      'interpreta sinais neutros como prova de desaprovacao',
    ],
    impairmentLines: [
      'perdeu oportunidades academicas/profissionais por evitação',
      'a vida social encolheu por evitar eventos e exposicoes',
      'o medo de avaliacao compromete rotina e desempenho',
    ],
    exclusionLines: [
      'a ansiedade nao ocorre de forma equivalente em todos os contextos do dia',
      'nao ha ataques inesperados recorrentes como queixa principal',
      'o foco central permanece na avaliacao negativa de outras pessoas',
    ],
    explanationLine:
      'A formulacao educativa aponta para ansiedade social por medo persistente de avaliacao negativa com evitacao e prejuizo.',
    differentialLines: [
      {
        disorderId: 'gad',
        whyNot: 'Na TAG as preocupacoes se espalham para varios dominos sem foco social predominante.',
      },
      {
        disorderId: 'panic',
        whyNot: 'No panico o medo principal e a crise em si, nao julgamento social continuado.',
      },
    ],
    tags: ['avaliacao_social', 'evitacao', 'desempenho'],
  },
  ocd: {
    disorderId: 'ocd',
    allowedStages: ['adolescente', 'jovem_adulto', 'adulto', 'adulto_maduro'],
    openingLines: [
      'relata pensamentos intrusivos recorrentes e necessidade de repetir rituais para aliviar ansiedade',
      'descreve medo persistente de dano e compulsao de checagem/repeticao',
      'apresenta obsessoes desconfortaveis seguidas de comportamentos repetitivos de alivio',
    ],
    symptomLines: [
      'gasta tempo relevante em rituais mentais ou comportamentais',
      'reconhece exagero nos rituais, mas sente alivio apenas apos repeti-los',
      'os pensamentos intrusivos retornam mesmo apos tentativas de neutralizacao',
    ],
    impairmentLines: [
      'o tempo gasto em compulsao atrasa rotina e compromete produtividade',
      'a necessidade de ritualizar afeta convivência e pontualidade',
      'ha desgaste funcional pela repeticao de checagens e evitacoes',
    ],
    exclusionLines: [
      'o eixo do quadro nao e apenas preocupacao difusa sem rituais estruturados',
      'os comportamentos repetitivos nao sao descritos como habitos prazerosos',
      'o padrao nao se limita a medo de avaliacao social',
    ],
    explanationLine:
      'A hipotese educativa favorece TOC por obsessoes intrusivas e compulsões repetitivas com gasto de tempo e prejuizo.',
    differentialLines: [
      {
        disorderId: 'gad',
        whyNot: 'Na TAG pode haver ruminação, mas sem compulsões ritualizadas como estrategia central.',
      },
      {
        disorderId: 'social_anxiety',
        whyNot: 'Na ansiedade social o foco principal e julgamento, nao neutralizacao de obsessao.',
      },
    ],
    tags: ['obsessao', 'compulsao', 'ritual'],
  },
  ptsd: {
    disorderId: 'ptsd',
    allowedStages: ['jovem_adulto', 'adulto', 'adulto_maduro', 'idoso'],
    openingLines: [
      'apos evento traumatico, passou a ter lembrancas invasivas e evitacao de gatilhos',
      'relata pesadelos e revivescencias ligadas a experiencia de alto estresse',
      'descreve hiperalerta persistente depois de um evento potencialmente traumatico',
    ],
    symptomLines: [
      'evita locais, conversas ou situacoes associadas ao evento',
      'sente reatividade intensa a sons/imagens que lembram o trauma',
      'apresenta irritabilidade, sono ruim e hipervigilancia',
    ],
    impairmentLines: [
      'a evitacao reduziu autonomia e participacao social',
      'o quadro trouxe prejuizo ocupacional e desgaste em relacionamentos',
      'a rotina ficou limitada por gatilhos e medo de reviver a cena',
    ],
    exclusionLines: [
      'os sintomas ficam ancorados no trauma e nao apenas em preocupacoes gerais',
      'o quadro nao e melhor descrito por ataques inesperados sem vinculo a gatilho traumatico',
      'a revivescencia e a evitação ligada ao evento sao elementos centrais',
    ],
    explanationLine:
      'A formulacao educativa mais compativel e estresse pos-traumatico pela triade de revivescencia, evitacao e hiperreatividade apos trauma.',
    differentialLines: [
      {
        disorderId: 'panic',
        whyNot: 'No panico os ataques podem ocorrer sem memoria traumatica persistente como centro.',
      },
      {
        disorderId: 'gad',
        whyNot: 'Na TAG ha preocupacao difusa, sem revivescencia traumática estruturante.',
      },
    ],
    tags: ['trauma', 'revivescencia', 'hipervigilancia'],
  },
  adhd: {
    disorderId: 'adhd',
    allowedStages: ['adolescente', 'jovem_adulto', 'adulto'],
    openingLines: [
      'apresenta historico prolongado de desatencao e dificuldade de organizacao',
      'relata esquecimento frequente, dispersao e dificuldade de concluir tarefas',
      'descreve impulsividade leve e baixa consistencia em rotinas prolongadas',
    ],
    symptomLines: [
      'perde prazos, alterna tarefas em excesso e tem dificuldade de planejamento',
      'comete erros por desatenção e perde objetos essenciais com frequencia',
      'tem dificuldade de sustentar foco em tarefas monótonas',
    ],
    impairmentLines: [
      'o desempenho academico/profissional oscila por falhas executivas',
      'a desorganizacao recorrente gera conflito em casa e no trabalho',
      'o funcionamento diario sofre com atrasos e pendencias acumuladas',
    ],
    exclusionLines: [
      'o padrao nao aparece apenas em episodio depressivo atual',
      'nao ha episodios de elevacao de energia delimitados explicando todo o quadro',
      'os sinais aparecem em mais de um contexto desde fases mais precoces',
    ],
    explanationLine:
      'A hipotese educativa favorece TDAH por padrao persistente de desatenção/organizacao deficitária em multiplos contextos ao longo do tempo.',
    differentialLines: [
      {
        disorderId: 'bipolar_2',
        whyNot: 'No bipolar II espera-se episodicidade de ativacao, diferente de padrao cronico estavel.',
      },
      {
        disorderId: 'mdd',
        whyNot: 'A dificuldade de foco aqui nao e restrita a um periodo depressivo isolado.',
      },
    ],
    tags: ['desatencao', 'organizacao', 'funcao_executiva'],
  },
  bipolar_2: {
    disorderId: 'bipolar_2',
    allowedStages: ['jovem_adulto', 'adulto', 'adulto_maduro'],
    openingLines: [
      'relata alternancia entre fases depressivas e periodos de energia aumentada',
      'descreve ciclos de humor com ativacao, menor necessidade de sono e depois queda acentuada',
      'aponta historico de oscilacao episodica com impulsividade em fases de ativacao',
    ],
    symptomLines: [
      'nos periodos de ativacao fala mais rapido, inicia varios planos e dorme pouco',
      'as fases depressivas trazem anedonia, lentificacao e queda de rendimento',
      'ha mudanca de ritmo comportamental entre periodos de ativacao e depressao',
    ],
    impairmentLines: [
      'a oscilacao trouxe prejuizo financeiro, relacional e ocupacional',
      'o funcionamento fica instavel ao longo dos ciclos de humor',
      'a alternancia episodica comprometeu rotina e tomada de decisao',
    ],
    exclusionLines: [
      'nao houve quadro de mania franca com desorganizacao grave prolongada',
      'o padrao nao se explica apenas por reatividade emocional de curto prazo',
      'as mudancas de humor surgem em episodios e nao apenas por situacao pontual',
    ],
    explanationLine:
      'A formulacao educativa sugere bipolaridade tipo II pela combinacao de fases depressivas e periodos de hipomania sem mania franca.',
    differentialLines: [
      {
        disorderId: 'mdd',
        whyNot: 'Depressao unipolar nao explica fases de ativacao com menor necessidade de sono.',
      },
      {
        disorderId: 'bpd',
        whyNot: 'No borderline, oscilacoes costumam ser mais reativas e menos episodicas.',
      },
    ],
    tags: ['hipomania', 'episodico', 'humor'],
  },
  bpd: {
    disorderId: 'bpd',
    allowedStages: ['jovem_adulto', 'adulto'],
    openingLines: [
      'relata instabilidade emocional intensa e medo persistente de abandono',
      'descreve relacoes muito intensas, com oscilacao rapida entre idealizacao e frustração',
      'aponta impulsividade e sofrimento relacional recorrente em diferentes contextos',
    ],
    symptomLines: [
      'episodios emocionais costumam piorar apos gatilhos interpessoais',
      'ha dificuldade de regulacao afetiva e respostas impulsivas em conflitos',
      'a autoimagem varia de forma acentuada conforme dinamicas relacionais',
    ],
    impairmentLines: [
      'o padrao de crise interpessoal trouxe rupturas frequentes',
      'a impulsividade afetou estabilidade profissional e social',
      'a intensidade relacional gerou prejuizo funcional duradouro',
    ],
    exclusionLines: [
      'as mudancas emocionais nao aparecem em ciclos longos tipicos de episodio de humor',
      'o foco central e relacional, com reatividade a abandono e rejeicao',
      'nao se trata apenas de ansiedade social restrita a performance',
    ],
    explanationLine:
      'A hipotese educativa mais provavel e funcionamento borderline por instabilidade afetiva/relacional cronica e impulsividade interpessoal.',
    differentialLines: [
      {
        disorderId: 'bipolar_2',
        whyNot: 'No bipolar II as mudancas tendem a ser episodicas; aqui ha reatividade interpessoal constante.',
      },
      {
        disorderId: 'social_anxiety',
        whyNot: 'Ansiedade social nao explica a instabilidade relacional e impulsividade persistentes.',
      },
    ],
    tags: ['relacoes', 'impulsividade', 'regulacao_afetiva'],
  },
  aud: {
    disorderId: 'aud',
    allowedStages: ['jovem_adulto', 'adulto', 'adulto_maduro', 'idoso'],
    openingLines: [
      'relata perda de controle sobre consumo de alcool e tentativas frustradas de reduzir',
      'descreve uso recorrente de alcool apesar de consequencias negativas claras',
      'aponta padrao de consumo que persiste mesmo com prejuizos em varias areas',
    ],
    symptomLines: [
      'ha repeticao do uso mesmo apos promessas de pausa ou reducao',
      'o consumo ocupa parte relevante da rotina e da energia do dia',
      'ocorrem recaidas frequentes apos tentativas de controle',
    ],
    impairmentLines: [
      'o comportamento ja comprometeu rotina familiar e ocupacional',
      'houve conflito relacional e queda de desempenho por causa do uso',
      'o padrao gerou impactos funcionais recorrentes e previsiveis',
    ],
    exclusionLines: [
      'o quadro nao e resumido apenas a consumo social ocasional sem prejuizo',
      'a persistencia ocorre mesmo diante de danos percebidos',
      'a perda de controle e o prejuizo sustentado são centrais no caso',
    ],
    explanationLine:
      'A formulacao educativa favorece transtorno por uso de alcool pelo padrao de persistencia, perda de controle e prejuizo funcional.',
    differentialLines: [
      {
        disorderId: 'mdd',
        whyNot: 'Sintomas depressivos podem coexistir, mas nao explicam sozinhos o padrao de uso desadaptativo.',
      },
      {
        disorderId: 'gad',
        whyNot: 'Ansiedade pode coexistir, porem o eixo principal aqui e comportamento de uso problemático.',
      },
    ],
    tags: ['alcool', 'controle', 'prejuizo'],
  },
}

const personNames = [
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
]

const durationByDifficulty: Record<Difficulty, string[]> = {
  easy: [
    'os sinais aparecem de forma quase diaria ha mais de seis meses',
    'o padrao vem se mantendo por varios meses, sem melhora sustentada',
    'os sintomas persistem por periodo prolongado e recorrente',
  ],
  medium: [
    'o quadro se repete por meses, com piora gradual da rotina funcional',
    'ha recorrencia ao longo do ano, com oscilacoes mas sem remissao completa',
    'a persistencia temporal indica padrao mais estavel que uma reacao momentanea',
  ],
  hard: [
    'o curso temporal mostra fases e recaidas com impacto cumulativo nos ultimos meses',
    'o historico longitudinal evidencia padrao persistente com alta complexidade clinica',
    'a evolucao em meses mostra cronificacao e aumento de prejuizo funcional',
  ],
}

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

function randomAge(stage: LifeStage, rng: () => number): number {
  const profile = lifeStageProfiles[stage]
  return profile.minAge + Math.floor(rng() * (profile.maxAge - profile.minAge + 1))
}

function chooseDisorder(rng: () => number, filters: GenerationFilters): Disorder {
  const byCategoryAndDifficulty = disorders.filter((disorder) => {
    const matchesCategory = !filters.category || disorder.category === filters.category
    const matchesDifficulty = !filters.difficulty || disorder.difficulty === filters.difficulty
    return matchesCategory && matchesDifficulty
  })

  if (byCategoryAndDifficulty.length) {
    return pickOne(byCategoryAndDifficulty, rng)
  }

  if (filters.category) {
    const byCategoryOnly = disorders.filter((disorder) => disorder.category === filters.category)
    if (byCategoryOnly.length) {
      return pickOne(byCategoryOnly, rng)
    }
  }

  if (filters.difficulty) {
    const byDifficultyOnly = disorders.filter((disorder) => disorder.difficulty === filters.difficulty)
    if (byDifficultyOnly.length) {
      return pickOne(byDifficultyOnly, rng)
    }
  }

  return pickOne(disorders, rng)
}

function buildTitle(context: string, difficulty: Difficulty, rng: () => number): string {
  const easyTitles = ['Rotina em alerta', 'Um dia apos o outro', 'Sinais na rotina']
  const mediumTitles = ['Pistas no contexto atual', 'Entre rotina e sofrimento', 'Sinais que se repetem']
  const hardTitles = ['Padrao clinico complexo', 'Curso longitudinal em foco', 'Contexto de alta complexidade']

  const byDifficulty: Record<Difficulty, string[]> = {
    easy: easyTitles,
    medium: mediumTitles,
    hard: hardTitles,
  }

  return `${pickOne(byDifficulty[difficulty], rng)} (${context})`
}

function createClues(
  profile: DisorderGenerationProfile,
  disorder: Disorder,
  contextActivity: string,
  contextSocial: string,
  rng: () => number,
): CaseClue[] {
  return [
    {
      id: `clue-${disorder.id}-1`,
      order: 1,
      type: 'chief_complaint',
      text: `${pickOne(profile.openingLines, rng)} ${contextActivity}.`,
    },
    {
      id: `clue-${disorder.id}-2`,
      order: 2,
      type: 'symptoms',
      text: `${pickOne(profile.symptomLines, rng)} ${contextSocial}.`,
    },
    {
      id: `clue-${disorder.id}-3`,
      order: 3,
      type: 'duration',
      text: pickOne(durationByDifficulty[disorder.difficulty], rng),
    },
    {
      id: `clue-${disorder.id}-4`,
      order: 4,
      type: 'impairment',
      text: `${pickOne(profile.impairmentLines, rng)} ${pickOne(profile.exclusionLines, rng)}.`,
    },
  ]
}

function buildVignette(
  profile: DisorderGenerationProfile,
  age: number,
  personName: string,
  contextActivity: string,
  rng: () => number,
): string {
  return `Uma pessoa de ${age} anos, chamada ${personName}, ${pickOne(profile.openingLines, rng)} ${contextActivity}.`
}

function buildProceduralCase(input: GenerateProceduralCaseInput): Case {
  const rng = createRng(input.seed)
  const disorder = chooseDisorder(rng, input)
  const profile = disorderProfiles[disorder.id]
  const stage = pickOne(profile.allowedStages, rng)
  const stageProfile = lifeStageProfiles[stage]
  const age = randomAge(stage, rng)
  const personName = pickOne(personNames, rng)
  const contextActivity = pickOne(stageProfile.activityContexts, rng)
  const contextSocial = pickOne(stageProfile.socialContexts, rng)
  const clues = createClues(profile, disorder, contextActivity, contextSocial, rng)
  const title = buildTitle(contextActivity, disorder.difficulty, rng)

  return {
    id: `${input.caseIdPrefix}-${disorder.id}-${hashSeed(input.seed)}`,
    title,
    category: disorder.category,
    difficulty: disorder.difficulty,
    vignette: buildVignette(profile, age, personName, contextActivity, rng),
    correctDisorderId: disorder.id,
    clues,
    explanation: profile.explanationLine,
    differentials: profile.differentialLines,
    tags: [...profile.tags, stage, `idade_${age}`],
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
