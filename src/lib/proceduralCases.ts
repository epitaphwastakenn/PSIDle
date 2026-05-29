import { disorders } from '../data/disorders'
import type { Case, CaseClue, Difficulty, Disorder } from '../types/models'

type LifeStage = 'adolescente' | 'jovem_adulto' | 'adulto' | 'adulto_maduro' | 'idoso'

interface LifeStageProfile {
  minAge: number
  maxAge: number
  roleLabels: string[]
  activityContexts: string[]
  socialContexts: string[]
  routineFrames: string[]
  stressorFrames: string[]
}

interface CategoryProfile {
  preferredStages: LifeStage[]
  titleFocus: string[]
  complaint: string[]
  symptom: string[]
  cognition: string[]
  coping: string[]
  impairment: string[]
  exclusion: string[]
  tagHints: string[]
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
    roleLabels: [
      'estudante do ensino medio',
      'adolescente em fase escolar',
      'jovem em rotina de provas',
      'aluno com atividades extracurriculares',
    ],
    activityContexts: [
      'na rotina escolar',
      'em apresentacoes e trabalhos em grupo',
      'na preparacao para provas',
      'na relacao entre estudo e vida social',
    ],
    socialContexts: [
      'na convivencia com colegas',
      'em interacoes com professores',
      'na relacao com familiares',
      'em ambientes sociais da escola',
    ],
    routineFrames: [
      'nos dias de maior demanda academica',
      'em semanas de avaliacoes',
      'na transicao entre atividades escolares',
      'ao final do periodo de aulas',
    ],
    stressorFrames: [
      'a pressao por desempenho aumentou nos ultimos meses',
      'mudancas no grupo social elevaram o estresse',
      'cobrancas de desempenho ficaram mais intensas',
      'a comparacao com colegas ampliou a autocranca',
    ],
  },
  jovem_adulto: {
    minAge: 18,
    maxAge: 25,
    roleLabels: [
      'estudante universitario',
      'jovem adulto em inicio de carreira',
      'jovem conciliando estudo e trabalho',
      'adulto jovem em transicao de rotina',
    ],
    activityContexts: [
      'na faculdade',
      'no estagio ou primeiro emprego',
      'na conciliacao entre aulas e trabalho',
      'em rotina de alta variacao de horarios',
    ],
    socialContexts: [
      'na convivencia com colegas',
      'em relacionamentos afetivos recentes',
      'na organizacao da vida adulta inicial',
      'na ampliacao de rede social',
    ],
    routineFrames: [
      'em periodos de fechamento de semestre',
      'na semana de maior carga de tarefas',
      'em fases de escolha de carreira',
      'ao tentar manter produtividade constante',
    ],
    stressorFrames: [
      'a incerteza profissional aumentou o desgaste emocional',
      'a acumulacao de papeis gerou sobrecarga',
      'mudancas de rotina reduziram previsibilidade',
      'demandas de desempenho se tornaram recorrentes',
    ],
  },
  adulto: {
    minAge: 26,
    maxAge: 45,
    roleLabels: [
      'adulto economicamente ativo',
      'profissional em fase de consolidacao',
      'pessoa adulta com rotina multipla',
      'adulto com alta demanda diaria',
    ],
    activityContexts: [
      'na rotina de trabalho',
      'na gestao de tarefas domesticas e profissionais',
      'na administracao de agenda intensa',
      'em metas ocupacionais de curto prazo',
    ],
    socialContexts: [
      'na convivencia familiar',
      'na relacao com equipe de trabalho',
      'em vinculos afetivos estaveis',
      'na manutencao de rede de apoio',
    ],
    routineFrames: [
      'durante ciclos de alta demanda',
      'em semanas com prazos acumulados',
      'ao fim de jornadas longas',
      'em periodos de responsabilidade simultanea',
    ],
    stressorFrames: [
      'conflitos entre vida pessoal e profissional elevaram o desgaste',
      'a sobrecarga de tarefas reduziu o tempo de recuperacao',
      'cobrancas financeiras aumentaram a tensao de base',
      'a necessidade de manter alto desempenho ficou constante',
    ],
  },
  adulto_maduro: {
    minAge: 46,
    maxAge: 60,
    roleLabels: [
      'adulto maduro com responsabilidades complexas',
      'profissional experiente com rotina intensa',
      'pessoa em fase de manutencao de multiplos papeis',
      'adulto em gestao simultanea de familia e trabalho',
    ],
    activityContexts: [
      'na rotina profissional consolidada',
      'na gestao de equipe e prazos',
      'em compromissos familiares continuos',
      'na manutencao de tarefas de longo prazo',
    ],
    socialContexts: [
      'na relacao com familiares',
      'na rede profissional de longa data',
      'em papeis de cuidado e suporte',
      'na convivencia com alta responsabilidade',
    ],
    routineFrames: [
      'em fases de acumulacao de decisoes',
      'durante semanas de alto volume de tarefas',
      'ao tentar manter previsibilidade em varias frentes',
      'em periodos de maior carga de cuidado',
    ],
    stressorFrames: [
      'a soma de responsabilidades elevou o desgaste emocional',
      'mudancas recentes de rotina aumentaram vulnerabilidade',
      'eventos familiares ampliaram tensao sustentada',
      'a pressao por estabilidade tornou o estresse mais cronico',
    ],
  },
  idoso: {
    minAge: 61,
    maxAge: 80,
    roleLabels: [
      'idoso em rotina comunitaria',
      'pessoa aposentada reorganizando habitos',
      'adulto mais velho com foco em autonomia',
      'idoso em manutencao de atividades de convivencia',
    ],
    activityContexts: [
      'na organizacao da rotina apos aposentadoria',
      'em atividades comunitarias regulares',
      'na manutencao de autonomia domestica',
      'em compromissos de saude e convivio',
    ],
    socialContexts: [
      'na convivencia com familiares',
      'na rede de apoio local',
      'em grupos de atividade social',
      'na adaptacao a mudancas de papel social',
    ],
    routineFrames: [
      'em semanas com variacao de disposicao fisica',
      'ao manter agenda de consultas e atividades',
      'em periodos de menor suporte presencial',
      'durante mudancas de rotina domestica',
    ],
    stressorFrames: [
      'preocupacoes com independencia aumentaram o estresse',
      'episodios recentes de saude elevaram hipervigilancia',
      'quebras de rotina ampliaram o desconforto emocional',
      'o isolamento em alguns dias intensificou sofrimento subjetivo',
    ],
  },
}

const defaultCategoryProfile: CategoryProfile = {
  preferredStages: ['jovem_adulto', 'adulto', 'adulto_maduro'],
  titleFocus: ['padrao clinico recorrente', 'sinais em contexto', 'hipotese em construcao'],
  complaint: [
    'dificuldade persistente para manter estabilidade emocional e funcional',
    'sofrimento recorrente que interfere na rotina',
    'queda de previsibilidade no dia a dia',
    'desgaste subjetivo com impacto progressivo nas atividades',
  ],
  symptom: [
    'ha repeticao de sintomas em mais de um contexto',
    'os sinais se mantem apesar de tentativas espontaneas de ajuste',
    'o desconforto aparece mesmo em dias sem estressor agudo',
    'a regularidade funcional oscila ao longo da semana',
  ],
  cognition: [
    'com tendencia a antecipar cenarios negativos',
    'com autocranca elevada diante de erros pequenos',
    'com dificuldade de confiar no proprio julgamento',
    'com foco rigido nos sinais de piora',
  ],
  coping: [
    'procura aliviar o desconforto com evitacao de situacoes desafiadoras',
    'alterna esforco intenso com periodos de exaustao',
    'adota estrategias de controle que funcionam apenas no curto prazo',
    'posterga tarefas relevantes por receio de piora',
  ],
  impairment: [
    'o quadro compromete produtividade, qualidade de vida e relacoes',
    'ha custo funcional em pelo menos duas areas da vida',
    'a constancia da rotina caiu de forma progressiva',
    'atividades antes simples passaram a exigir alto custo emocional',
  ],
  exclusion: [
    'o padrao nao parece explicado por reacao breve e isolada',
    'a persistencia temporal afasta uma variacao transitora simples',
    'os sinais vao alem de estresse cotidiano esperado',
    'ha continuidade de sintomas em diferentes ambientes',
  ],
  tagHints: ['padrao_recorrente', 'prejuizo_funcional'],
}

const categoryProfiles: Partial<Record<string, CategoryProfile>> = {
  Humor: {
    preferredStages: ['jovem_adulto', 'adulto', 'adulto_maduro'],
    titleFocus: ['oscilacao de humor', 'queda de interesse', 'variacao de energia'],
    complaint: [
      'humor deprimido e perda de interesse em atividades antes prazerosas',
      'oscilacao de energia com periodos de queda funcional',
      'desanimo persistente e reducao de iniciativa',
      'mudancas de humor com impacto importante no cotidiano',
    ],
    symptom: [
      'ha alteracao de sono, energia e concentracao',
      'aparecem oscilacoes de produtividade e motivacao',
      'nota-se variacao de ritmo mental ao longo das semanas',
      'surgem episodios de lentificacao e fadiga emocional',
    ],
    cognition: [
      'com pensamento de autodesvalorizacao recorrente',
      'com leitura pessimista de possibilidades futuras',
      'com dificuldade de manter perspectiva estavel sobre si',
      'com oscilacao entre culpa e desesperanca',
    ],
    coping: [
      'tenta compensar queda de energia com sobrecarga de tarefas',
      'isola-se em periodos de piora para reduzir estimulos',
      'organiza rotina de forma rigida para evitar novas oscilacoes',
      'procura distracoes passivas para aliviar sofrimento imediato',
    ],
    impairment: [
      'ha prejuizo em constancia de rendimento e convivencia',
      'atividades antes habituais perderam regularidade',
      'o funcionamento social caiu junto com o ocupacional',
      'a rotina se tornou imprevisivel por variacoes de energia',
    ],
    exclusion: [
      'nao se trata apenas de variacao cotidiana de humor',
      'o quadro excede reacao breve a estresse pontual',
      'a persistencia e intensidade sugerem sindrome estruturada',
      'o impacto funcional ultrapassa fases normais de oscilacao afetiva',
    ],
    tagHints: ['humor', 'energia', 'ritmo'],
  },
  Ansiedade: {
    preferredStages: ['adolescente', 'jovem_adulto', 'adulto'],
    titleFocus: ['medo antecipatorio', 'vigilancia constante', 'evitacao progressiva'],
    complaint: [
      'preocupacao excessiva e dificil de desligar',
      'medo intenso diante de situacoes especificas',
      'ansiedade recorrente com sensacao de perda de controle',
      'tensao persistente antes de atividades comuns',
    ],
    symptom: [
      'ha inquietacao, tensao fisica e fadiga mental',
      'aparecem pensamentos de catastrofe e evitacao',
      'nota-se hiperalerta e monitoramento constante de risco',
      'surgem sintomas autonomicos em momentos de maior ansiedade',
    ],
    cognition: [
      'com superestimacao de perigo e subestimacao de recursos',
      'com leitura ameaçadora de situacoes neutras',
      'com dificuldade de interromper cadeia de preocupacoes',
      'com busca repetida de garantias externas',
    ],
    coping: [
      'evita contextos que aumentam ansiedade antecipatoria',
      'pede reassuracao frequente para aliviar desconforto',
      'procrastina decisoes para reduzir incerteza imediata',
      'tenta controlar todas as variaveis da rotina',
    ],
    impairment: [
      'a evitacao reduziu participacao social e desempenho',
      'ha prejuizo de foco, sono e produtividade',
      'o custo emocional para tarefas simples aumentou',
      'a autonomia funcional diminuiu em situacoes de gatilho',
    ],
    exclusion: [
      'os sinais vao alem de nervosismo situacional esperado',
      'a persistencia sugere padrao clinico e nao evento isolado',
      'a intensidade nao acompanha apenas estressores objetivos',
      'o impacto funcional reforca hipotese sindromica',
    ],
    tagHints: ['ansiedade', 'evitacao', 'medo_antecipatorio'],
  },
  'Obsessivo-compulsivo': {
    preferredStages: ['adolescente', 'jovem_adulto', 'adulto'],
    titleFocus: ['rituais recorrentes', 'intrusoes mentais', 'controle excessivo'],
    complaint: [
      'pensamentos intrusivos recorrentes gerando grande desconforto',
      'necessidade de repetir comportamentos para aliviar ansiedade',
      'duvidas persistentes levando a verificacoes repetidas',
      'preocupacao intensa com ordem, dano ou contaminacao',
    ],
    symptom: [
      'ha gasto de tempo relevante com rituais',
      'o alivio ocorre apenas por curto periodo apos repeticao',
      'aparecem evitacoes para impedir ativacao de obsessões',
      'os comportamentos repetitivos interferem em compromissos diarios',
    ],
    cognition: [
      'com necessidade de certeza absoluta antes de agir',
      'com responsabilizacao exagerada por possiveis danos',
      'com dificuldade de tolerar incerteza cotidiana',
      'com foco rigido em detalhes percebidos como ameaçadores',
    ],
    coping: [
      'realiza checagens e neutralizacoes mentais frequentes',
      'busca repeticao de passos para reduzir desconforto',
      'evita gatilhos que ativam ciclo obsessivo',
      'pede confirmacoes sucessivas para aliviar duvida',
    ],
    impairment: [
      'o tempo consumido pelos rituais reduziu produtividade',
      'ha atraso recorrente em atividades por repeticoes',
      'a rotina ficou lenta e inflexivel por controle excessivo',
      'o sofrimento subjetivo aumentou junto com a evitacao',
    ],
    exclusion: [
      'nao parece apenas perfeccionismo sem sofrimento clinico',
      'o padrao vai alem de habitos comuns de organizacao',
      'a repeticao nao se explica por preferencia pessoal simples',
      'o prejuizo funcional sustenta hipotese de transtorno relacionado',
    ],
    tagHints: ['obsessao', 'compulsao', 'ritual'],
  },
  'Trauma e Estresse': {
    preferredStages: ['adolescente', 'jovem_adulto', 'adulto', 'adulto_maduro'],
    titleFocus: ['resposta a estressor', 'reexperiencia persistente', 'evitacao defensiva'],
    complaint: [
      'sintomas emocionais iniciados apos evento estressor relevante',
      'recordacoes intrusivas e desconforto frente a gatilhos associados',
      'evitacao de contextos lembrando experiencia adversa',
      'reatividade aumentada e dificuldade de recuperar sensacao de seguranca',
    ],
    symptom: [
      'ha hipervigilancia e sobressalto facil em situacoes comuns',
      'aparecem lembrancas indesejadas e pesadelos recorrentes',
      'nota-se evitacao ativa de pessoas, locais ou temas relacionados',
      'ocorre alteracao de sono e irritabilidade persistente',
    ],
    cognition: [
      'com sensacao de vulnerabilidade elevada',
      'com interpretacao de risco mesmo em cenarios neutros',
      'com dificuldade de integrar lembrancas sem forte ativacao emocional',
      'com expectativas negativas sobre seguranca futura',
    ],
    coping: [
      'reduz exposicao a gatilhos para evitar sofrimento imediato',
      'isola-se em periodos de maior ativacao',
      'altera rotas e rotina para escapar de lembrancas',
      'mantem vigilancia constante para prevenir repeticao do evento',
    ],
    impairment: [
      'ha prejuizo em convivio, sono e desempenho cotidiano',
      'a evitacao restringiu atividades antes habituais',
      'o custo emocional aumentou em compromissos sociais e ocupacionais',
      'a sensacao de seguranca permaneceu baixa por periodo prolongado',
    ],
    exclusion: [
      'o quadro nao se limita a estresse passageiro',
      'a persistencia temporal afasta resposta aguda simples',
      'o padrao sintomatico e coerente com estressor significativo',
      'ha impacto funcional alem de desconforto esperado no curto prazo',
    ],
    tagHints: ['trauma', 'evitacao', 'hipervigilancia'],
  },
  Neurodesenvolvimento: {
    preferredStages: ['adolescente', 'jovem_adulto'],
    titleFocus: ['sinais desde fases precoces', 'padrao desenvolvimental', 'prejuizo academico'],
    complaint: [
      'dificuldades persistentes observadas desde fases iniciais do desenvolvimento',
      'historico de sinais cognitivos/comportamentais em mais de um contexto',
      'prejuizo funcional em aprendizagem, atencao ou comunicacao',
      'dificuldade de autonomia esperada para faixa etaria',
    ],
    symptom: [
      'ha consistencia de sinais em escola, casa ou trabalho',
      'aparecem dificuldades de organizacao, planejamento ou regulacao',
      'nota-se impacto em desempenho academico e relacoes',
      'o quadro se manteve ao longo do tempo com variacao de intensidade',
    ],
    cognition: [
      'com dificuldade de flexibilidade cognitiva em tarefas novas',
      'com oscilacao de foco diante de demandas prolongadas',
      'com necessidade de maior suporte para manter constancia',
      'com sobrecarga em ambientes de alta estimulação',
    ],
    coping: [
      'depende de estrategias externas para organizar rotina',
      'evita tarefas de alta carga cognitiva sem suporte',
      'usa lembretes e estruturas rigidas para reduzir erros',
      'busca ambientes previsiveis para manter desempenho',
    ],
    impairment: [
      'ha prejuizo em aprendizagem, produtividade e autonomia',
      'o rendimento oscila de forma significativa entre contextos',
      'o custo para manter tarefas basicas e superior ao esperado',
      'a participacao social/academica fica reduzida',
    ],
    exclusion: [
      'os sinais nao se explicam apenas por estresse recente',
      'ha historia longitudinal que reforca padrao desenvolvimental',
      'o quadro vai alem de dificuldades pontuais transitórias',
      'a persistencia em varios contextos sustenta hipotese principal',
    ],
    tagHints: ['desenvolvimento', 'inicio_precoce', 'multicontexto'],
  },
  Psicoticos: {
    preferredStages: ['jovem_adulto', 'adulto', 'adulto_maduro'],
    titleFocus: ['alteracao de realidade', 'pensamento desorganizado', 'conviccoes rigidas'],
    complaint: [
      'alteracoes de percepcao e crencas com grande impacto funcional',
      'desorganizacao de pensamento com prejuizo de rotina',
      'experiencias subjetivas incomuns associadas a sofrimento relevante',
      'quebra de funcionalidade em decorrencia de sintomas psicoticos',
    ],
    symptom: [
      'ha dificuldade de teste de realidade em periodos de piora',
      'aparecem sinais de desorganizacao cognitiva e comportamental',
      'nota-se reducao de funcionalidade social e ocupacional',
      'os sintomas persistem alem de oscilacoes breves de estresse',
    ],
    cognition: [
      'com rigidez de interpretacao frente a contradicoes',
      'com dificuldade de integrar informacoes contextuais',
      'com aumento de desconfiança interpessoal',
      'com prejuizo na avaliacao critica de experiencias internas',
    ],
    coping: [
      'afasta-se de atividades devido desconfianca ou confusao',
      'reduz interacoes sociais para diminuir sobrecarga',
      'altera rotina por receio de ameaças percebidas',
      'tem dificuldade de manter planejamento consistente',
    ],
    impairment: [
      'ha queda marcada em autonomia e desempenho',
      'o funcionamento social sofreu deterioracao progressiva',
      'compromissos importantes deixaram de ser sustentados',
      'a previsibilidade da rotina ficou severamente comprometida',
    ],
    exclusion: [
      'o padrao nao se limita a ansiedade intensa isolada',
      'a extensao dos sinais ultrapassa variacao comum de humor',
      'a persistencia indica quadro estruturado e nao episodio breve reativo',
      'o prejuizo funcional e compativel com eixo psicotico',
    ],
    tagHints: ['psicotico', 'realidade', 'desorganizacao'],
  },
  'Uso de Substancias': {
    preferredStages: ['jovem_adulto', 'adulto', 'adulto_maduro'],
    titleFocus: ['perda de controle', 'uso persistente', 'recaidas recorrentes'],
    complaint: [
      'dificuldade de controlar frequencia ou quantidade de uso',
      'tentativas de reducao sem manutencao ao longo do tempo',
      'uso mantido apesar de prejuizos reconhecidos',
      'priorizacao crescente da substancia na rotina',
    ],
    symptom: [
      'ha repeticao de recaidas apos pausas curtas',
      'aparecem conflitos familiares ou ocupacionais relacionados ao uso',
      'nota-se consumo em contextos de risco e perda de limites',
      'o comportamento de uso persiste mesmo diante de consequencias',
    ],
    cognition: [
      'com minimizacao inicial de danos',
      'com ambivalencia entre reduzir e manter o padrao',
      'com justificativas frequentes para continuidade do uso',
      'com subestimacao do impacto acumulado',
    ],
    coping: [
      'estabelece promessas de controle de curta duracao',
      'evita contextos de monitoramento por terceiros',
      'busca alivio rapido por meio de repeticao do consumo',
      'posterga busca de ajuda acreditando em controle autonomo',
    ],
    impairment: [
      'ha queda de confiabilidade em compromissos relevantes',
      'ocorrem prejuizos financeiros, sociais e ocupacionais',
      'a qualidade de vida reduziu de forma progressiva',
      'a rotina ficou centrada em obter, usar ou recuperar-se do uso',
    ],
    exclusion: [
      'o quadro excede uso ocasional sem prejuizo significativo',
      'a persistencia apos danos afasta explicacao de episodio isolado',
      'ha perda de controle comportamental consistente',
      'o impacto em multiplas areas sustenta hipotese principal',
    ],
    tagHints: ['substancias', 'perda_de_controle', 'recaida'],
  },
}

const caseTitleStarters = ['Leitura de caso', 'Hipotese em foco', 'Sinais em contexto', 'Padrao observado']
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
  'Renata',
  'Vitor',
]

const intensityMarkers = [
  'desconforto emocional persistente',
  'sensacao de sobrecarga continua',
  'dificuldade de recuperar equilibrio apos gatilhos',
  'queda de tolerancia ao estresse cotidiano',
  'perda de previsibilidade da rotina',
]

const helpSeekingReasons = [
  'para compreender melhor o padrao dos sintomas',
  'buscando retomar estabilidade funcional',
  'com objetivo de organizar o raciocinio de estudo',
  'porque o impacto na rotina ficou mais evidente',
  'para reduzir erros de interpretacao sobre o quadro',
]

const durationByDifficulty: Record<Difficulty, string[]> = {
  easy: [
    'o padrao se repete ha varios meses',
    'os sinais aparecem de forma recorrente na maior parte das semanas',
    'a persistencia ultrapassa reacoes curtas a estresse',
    'o curso recente mostra continuidade sem remissao sustentada',
  ],
  medium: [
    'a cronologia mostra oscilacoes com impacto acumulado',
    'o quadro retorna mesmo apos tentativas de ajuste de rotina',
    'ha recorrencia em diferentes contextos do dia a dia',
    'as melhoras sao curtas e seguidas por nova piora',
  ],
  hard: [
    'o historico longitudinal indica ciclos de recaida e agravamento funcional',
    'a evolucao temporal sugere cronificacao com variacao de intensidade',
    'o padrao se mantem por periodo prolongado com prejuizo acumulativo',
    'o curso mostra fases distintas que exigem leitura diferencial cuidadosa',
  ],
}

const progressionByDifficulty: Record<Difficulty, string[]> = {
  easy: ['com progressao lenta e constante', 'com oscilacoes leves na semana'],
  medium: ['com agravamento em periodos de estresse', 'com variacao de intensidade e queda de constancia'],
  hard: ['com recaidas recorrentes e custo funcional crescente', 'com perda progressiva de autonomia de rotina'],
}

const differentialLeadIns = [
  'No diferencial,',
  'Em comparacao com essa alternativa,',
  'Ao revisar hipotese concorrente,',
  'No contraste clinico,',
]

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
  const safeAmount = Math.min(Math.max(amount, 0), pool.length)

  for (let index = 0; index < safeAmount; index += 1) {
    const selectedIndex = Math.floor(rng() * pool.length)
    const [selected] = pool.splice(selectedIndex, 1)
    output.push(selected)
  }

  return output
}

function randomAge(stage: LifeStage, rng: () => number): number {
  const profile = lifeStageProfiles[stage]
  return profile.minAge + Math.floor(rng() * (profile.maxAge - profile.minAge + 1))
}

function getCategoryProfile(category: string): CategoryProfile {
  return categoryProfiles[category] ?? defaultCategoryProfile
}

function chooseDisorder(rng: () => number, filters: GenerationFilters): Disorder {
  const filtered = disorders.filter((disorder) => {
    const matchesCategory = !filters.category || disorder.category === filters.category
    const matchesDifficulty = !filters.difficulty || disorder.difficulty === filters.difficulty
    return matchesCategory && matchesDifficulty
  })

  if (filtered.length > 0) {
    return pickOne(filtered, rng)
  }

  const byCategory = filters.category ? disorders.filter((disorder) => disorder.category === filters.category) : []
  if (byCategory.length > 0) {
    return pickOne(byCategory, rng)
  }

  const byDifficulty = filters.difficulty
    ? disorders.filter((disorder) => disorder.difficulty === filters.difficulty)
    : []
  if (byDifficulty.length > 0) {
    return pickOne(byDifficulty, rng)
  }

  return pickOne(disorders, rng)
}

function chooseLifeStage(profile: CategoryProfile, rng: () => number): LifeStage {
  const stagePool = profile.preferredStages.length > 0 ? profile.preferredStages : (Object.keys(lifeStageProfiles) as LifeStage[])
  return pickOne(stagePool, rng)
}

function buildTitle(profile: CategoryProfile, activityContext: string, difficulty: Difficulty, rng: () => number): string {
  const levelLabels: Record<Difficulty, string> = {
    easy: 'basico',
    medium: 'intermediario',
    hard: 'avancado',
  }
  return `${pickOne(caseTitleStarters, rng)}: ${pickOne(profile.titleFocus, rng)} (${activityContext}, nivel ${levelLabels[difficulty]})`
}

function buildVignette(input: {
  profile: CategoryProfile
  stageProfile: LifeStageProfile
  personName: string
  age: number
  roleLabel: string
  activityContext: string
  socialContext: string
  rng: () => number
}): string {
  const complaint = pickOne(input.profile.complaint, input.rng)
  const routine = pickOne(input.stageProfile.routineFrames, input.rng)
  const stressor = pickOne(input.stageProfile.stressorFrames, input.rng)
  const intensity = pickOne(intensityMarkers, input.rng)
  const helpReason = pickOne(helpSeekingReasons, input.rng)

  return `${input.personName}, ${input.age} anos, ${input.roleLabel}, relata ${complaint} ${input.activityContext}. O quadro aparece ${input.socialContext}, especialmente ${routine}. Atualmente descreve ${intensity} e busca este estudo ${helpReason}. ${stressor}.`
}

function createClues(input: {
  caseId: string
  profile: CategoryProfile
  stageProfile: LifeStageProfile
  activityContext: string
  socialContext: string
  difficulty: Difficulty
  rng: () => number
}): CaseClue[] {
  const chief = pickManyUnique(input.profile.complaint, 2, input.rng)
  const symptom = pickManyUnique(input.profile.symptom, 2, input.rng)
  const cognition = pickOne(input.profile.cognition, input.rng)
  const coping = pickOne(input.profile.coping, input.rng)
  const impairment = pickOne(input.profile.impairment, input.rng)
  const exclusion = pickOne(input.profile.exclusion, input.rng)
  const duration = pickOne(durationByDifficulty[input.difficulty], input.rng)
  const progression = pickOne(progressionByDifficulty[input.difficulty], input.rng)
  const routine = pickOne(input.stageProfile.routineFrames, input.rng)

  return [
    {
      id: `${input.caseId}-clue-1`,
      order: 1,
      type: 'chief_complaint',
      text: `${chief[0] ?? pickOne(input.profile.complaint, input.rng)} ${input.activityContext}; ${
        chief[1] ?? pickOne(input.profile.complaint, input.rng)
      } ${input.socialContext}.`,
    },
    {
      id: `${input.caseId}-clue-2`,
      order: 2,
      type: 'symptoms',
      text: `${symptom[0] ?? pickOne(input.profile.symptom, input.rng)}. ${
        symptom[1] ?? pickOne(input.profile.symptom, input.rng)
      }, ${cognition}. Tambem ${coping}.`,
    },
    {
      id: `${input.caseId}-clue-3`,
      order: 3,
      type: 'duration',
      text: `${duration}, ${progression}. O padrao fica mais visivel ${routine}.`,
    },
    {
      id: `${input.caseId}-clue-4`,
      order: 4,
      type: 'impairment',
      text: `${impairment}. ${exclusion}.`,
    },
  ]
}

function buildDifferentials(disorder: Disorder, rng: () => number): Array<{ disorderId: string; whyNot: string }> {
  const sameCategory = disorders.filter((candidate) => candidate.category === disorder.category && candidate.id !== disorder.id)
  const fallbackPool = disorders.filter((candidate) => candidate.id !== disorder.id)
  const pool = sameCategory.length >= 2 ? sameCategory : fallbackPool
  const picked = pickManyUnique(pool, 2, rng)

  return picked.map((candidate) => ({
    disorderId: candidate.id,
    whyNot: `${pickOne(differentialLeadIns, rng)} ${candidate.namePt.toLowerCase()} pode ser proximo, mas o conjunto de pistas favorece melhor ${disorder.namePt.toLowerCase()} neste caso ficticio.`,
  }))
}

function buildExplanation(disorder: Disorder): string {
  return `Hipotese educacional mais provavel: ${disorder.namePt}. ${disorder.shortSummary} ${disorder.studyNote}`
}

function buildProceduralCase(input: GenerateProceduralCaseInput): Case {
  const rng = createRng(input.seed)
  const disorder = chooseDisorder(rng, input)
  const categoryProfile = getCategoryProfile(disorder.category)
  const stage = chooseLifeStage(categoryProfile, rng)
  const stageProfile = lifeStageProfiles[stage]
  const personName = pickOne(personNames, rng)
  const age = randomAge(stage, rng)
  const roleLabel = pickOne(stageProfile.roleLabels, rng)
  const activityContext = pickOne(stageProfile.activityContexts, rng)
  const socialContext = pickOne(stageProfile.socialContexts, rng)
  const caseId = `${input.caseIdPrefix}-${disorder.id}-${hashSeed(input.seed).toString(36)}`

  const clues = createClues({
    caseId,
    profile: categoryProfile,
    stageProfile,
    activityContext,
    socialContext,
    difficulty: disorder.difficulty,
    rng,
  })

  return {
    id: caseId,
    title: buildTitle(categoryProfile, activityContext, disorder.difficulty, rng),
    category: disorder.category,
    difficulty: disorder.difficulty,
    vignette: buildVignette({
      profile: categoryProfile,
      stageProfile,
      personName,
      age,
      roleLabel,
      activityContext,
      socialContext,
      rng,
    }),
    correctDisorderId: disorder.id,
    clues,
    explanation: buildExplanation(disorder),
    differentials: buildDifferentials(disorder, rng),
    tags: [...categoryProfile.tagHints, stage, `idade_${age}`],
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
