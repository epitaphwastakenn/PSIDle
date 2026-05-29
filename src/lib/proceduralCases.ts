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
  developmentChallenges: string[]
}

interface DisorderGenerationProfile {
  disorderId: Disorder['id']
  allowedStages: LifeStage[]
  titleFocus: string[]
  chiefComplaintCore: string[]
  triggerContexts: string[]
  symptomClusters: string[]
  cognitivePatterns: string[]
  copingPatterns: string[]
  impairmentConsequences: string[]
  exclusionAnchors: string[]
  explanationFrames: string[]
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
    roleLabels: [
      'estudante do ensino medio',
      'adolescente em fase escolar',
      'aluno em preparacao para provas',
      'jovem em rotina de estudos',
    ],
    activityContexts: [
      'na rotina escolar',
      'em aulas e trabalhos de grupo',
      'durante apresentacoes em sala',
      'na preparacao para provas',
      'na conciliacao entre escola e atividades extracurriculares',
    ],
    socialContexts: [
      'na convivenca com colegas',
      'em interacoes com professores',
      'na relacao com responsaveis',
      'em ambientes sociais da escola',
      'em grupos de amigos da mesma faixa etaria',
    ],
    routineFrames: [
      'no inicio da manha antes das aulas',
      'nos dias de maior demanda escolar',
      'ao final do periodo de estudos',
      'em semanas com calendario academico mais intenso',
      'em momentos de avaliacao escolar',
    ],
    stressorFrames: [
      'a pressao por desempenho academico aumentou',
      'mudancas no grupo social trouxeram estresse adicional',
      'cobrancas familiares ampliaram a sensacao de sobrecarga',
      'a comparacao com colegas elevou a autocranca',
      'a transicao entre etapas escolares tornou a rotina mais instavel',
    ],
    developmentChallenges: [
      'o quadro interfere no desenvolvimento de autonomia',
      'ha impacto na consolidacao de rotina e identidade',
      'a fase de transicao emocional amplifica os sintomas',
      'a adaptacao social dessa etapa fica mais fragil',
      'o engajamento academico e afetado de forma progressiva',
    ],
  },
  jovem_adulto: {
    minAge: 18,
    maxAge: 25,
    roleLabels: [
      'jovem adulto em fase de transicao',
      'estudante universitario',
      'profissional em inicio de carreira',
      'jovem conciliando estudo e trabalho',
    ],
    activityContexts: [
      'na faculdade',
      'no estagio ou primeiro emprego',
      'na conciliacao entre trabalho e estudos',
      'na organizacao da vida adulta inicial',
      'em rotinas com alta variacao de horarios',
    ],
    socialContexts: [
      'em grupos da universidade',
      'em relacionamentos afetivos recentes',
      'na convivencia com colegas de trabalho',
      'na ampliacao de rede social',
      'na adaptacao a novas responsabilidades',
    ],
    routineFrames: [
      'em periodos de fechamento de semestre',
      'na semana de maior carga de atividades',
      'ao tentar manter produtividade constante',
      'em dias de conciliacao entre multiplas tarefas',
      'em momentos de definicao de carreira',
    ],
    stressorFrames: [
      'incerteza profissional elevou tensao emocional',
      'a acumulacao de papeis simultaneos aumentou o desgaste',
      'mudancas de rotina reduziram previsibilidade do dia',
      'demandas de desempenho se tornaram mais frequentes',
      'a transicao para autonomia financeira trouxe preocupacao extra',
    ],
    developmentChallenges: [
      'a consolidacao de identidade adulta fica mais vulneravel',
      'o equilibrio entre autonomia e suporte ainda esta em formacao',
      'a sobrecarga dessa etapa compromete consistencia funcional',
      'a capacidade de planejamento de medio prazo sofre impacto',
      'a estabilidade de habitos e prejudicada com facilidade',
    ],
  },
  adulto: {
    minAge: 26,
    maxAge: 40,
    roleLabels: [
      'adulto economicamente ativo',
      'profissional em fase de consolidacao de carreira',
      'adulto com rotina multipla de responsabilidades',
      'pessoa adulta com alta demanda diaria',
    ],
    activityContexts: [
      'no trabalho',
      'na gestao de rotina profissional',
      'na combinacao entre casa e carreira',
      'em metas de desempenho ocupacional',
      'na administracao de agenda intensa',
    ],
    socialContexts: [
      'na convivencia familiar',
      'em relacoes afetivas estaveis',
      'na relacao com equipe de trabalho',
      'em compromissos sociais recorrentes',
      'na organizacao de rede de apoio',
    ],
    routineFrames: [
      'durante ciclos de alta demanda no trabalho',
      'em semanas com aculo de prazos',
      'na tentativa de manter rotina previsivel',
      'em periodos de responsabilidade simultanea',
      'ao final de jornadas longas',
    ],
    stressorFrames: [
      'conflitos entre vida pessoal e profissional intensificaram o desgaste',
      'cobrancas de desempenho aumentaram gradualmente',
      'a sobrecarga de tarefas diminuiu a recuperacao emocional',
      'fatores financeiros trouxeram tensao prolongada',
      'a necessidade de manter alta produtividade elevou o estresse basal',
    ],
    developmentChallenges: [
      'o equilibrio funcional entre dominios da vida perde estabilidade',
      'a capacidade de descanso e regulacao emocional fica reduzida',
      'a organizacao executiva da rotina e afetada de forma cumulativa',
      'a qualidade de vinculos sociais e pressionada pela sobrecarga',
      'o manejo de responsabilidades complexas se torna menos eficiente',
    ],
  },
  adulto_maduro: {
    minAge: 41,
    maxAge: 60,
    roleLabels: [
      'adulto maduro em rotina de alta responsabilidade',
      'profissional experiente com multiplas demandas',
      'adulto em fase de manutencao de papeis complexos',
      'pessoa com responsabilidades familiares e ocupacionais consolidadas',
    ],
    activityContexts: [
      'na rotina profissional consolidada',
      'na gestao de equipe e prazos',
      'no cuidado de demandas familiares continuas',
      'na manutencao de compromissos de longo prazo',
      'em fases de decisoes de medio e longo alcance',
    ],
    socialContexts: [
      'na relacao com familiares',
      'na rede profissional de longa data',
      'em papeis de cuidado e suporte',
      'em convivencias com alto grau de responsabilidade',
      'na manutencao de vinculos sociais importantes',
    ],
    routineFrames: [
      'em periodos de acumulacao de decisoes relevantes',
      'ao tentar manter previsibilidade em varias frentes',
      'durante semanas com grande carga de cuidado',
      'em fases de elevada exigencia profissional',
      'ao lidar com tarefas que exigem atencao continua',
    ],
    stressorFrames: [
      'a soma de responsabilidades aumentou o desgaste emocional',
      'eventos familiares recentes elevaram tensao sustentada',
      'a pressao por estabilidade ampliou o nivel de estresse',
      'demandas simultaneas reduziram tempo de recuperacao',
      'mudancas relevantes na rotina aumentaram vulnerabilidade emocional',
    ],
    developmentChallenges: [
      'a sustentacao de papies complexos fica mais fragil',
      'o manejo de estresse cronico se torna mais dificil',
      'a flexibilidade emocional para lidar com imprevistos diminui',
      'o funcionamento ocupacional e social tende a oscilar mais',
      'o custo funcional de sintomas persistentes aumenta',
    ],
  },
  idoso: {
    minAge: 61,
    maxAge: 78,
    roleLabels: [
      'idoso em rotina comunitaria',
      'pessoa aposentada em reorganizacao de habitos',
      'idoso com rotina centrada em saude e convivio',
      'adulto mais velho em fase de ajuste de ritmo de vida',
    ],
    activityContexts: [
      'na rotina apos aposentadoria',
      'em atividades de convivio no bairro',
      'na organizacao da vida domestica',
      'em compromissos de saude e lazer',
      'na manutencao de autonomia diaria',
    ],
    socialContexts: [
      'na convivencia com familiares',
      'em grupos de atividade comunitaria',
      'na relacao com rede de apoio',
      'em interacoes sociais de rotina',
      'na participacao em encontros de convivio',
    ],
    routineFrames: [
      'em semanas com variacao de disposicao fisica',
      'ao manter agenda de consultas e atividades',
      'durante mudancas de rotina domestica',
      'em periodos de menor suporte presencial',
      'ao tentar sustentar autonomia no dia a dia',
    ],
    stressorFrames: [
      'preocupacoes com independencia aumentaram o estresse',
      'mudancas de papel social trouxeram inseguranca',
      'isolamento relativo em alguns dias ampliou sofrimento',
      'eventos recentes de saude elevaram hipervigilancia',
      'a quebra de rotina habitual aumentou desconforto emocional',
    ],
    developmentChallenges: [
      'a manutencao de autonomia fica mais sensivel ao estresse',
      'a rede de apoio se torna central para preservar funcionamento',
      'variacoes de rotina tem impacto maior no bem-estar global',
      'o equilibrio entre ritmo e recuperacao exige mais estrategia',
      'a estabilidade emocional depende de rotina previsivel',
    ],
  },
}

const caseTitleStarters = [
  'Sinais em camadas',
  'Rastro clinico',
  'Pistas da rotina',
  'Entre sintomas e contexto',
  'Padrao em observacao',
  'Leitura de caso',
  'Mapa de funcionamento',
  'Contexto e sofrimento',
  'Hipotese em construcao',
  'Rotina sob pressao',
  'Ajuste e desajuste',
  'Ciclo em foco',
]

const caseTitleLenses = [
  'em ambiente',
  'na vida diaria',
  'em fase de transicao',
  'com impacto funcional',
  'em rotina de alta demanda',
  'com variacao de sintomas',
  'em contexto relacional',
  'com desgaste progressivo',
  'na experiencia subjetiva',
  'em padrao recorrente',
]

const intensityMarkers = [
  'desconforto emocional persistente',
  'sensacao de sobrecarga continua',
  'dificuldade de manter estabilidade interna',
  'aumento de reatividade em situacoes comuns',
  'queda de tolerancia ao estresse cotidiano',
  'cansaco emocional de curso prolongado',
  'percepcao de perda de controle da rotina',
  'oscilacao de funcionamento ao longo da semana',
  'dificuldade de recuperar equilibrio apos gatilhos',
  'sofrimento com impacto subjetivo relevante',
]

const helpSeekingReasons = [
  'porque quer compreender melhor o que esta acontecendo',
  'buscando organizar o raciocinio sobre os sintomas',
  'com objetivo de melhorar o funcionamento do dia a dia',
  'para reduzir erros de interpretacao sobre o proprio quadro',
  'com interesse em estudar hipoteses diferenciais',
  'porque percebe aumento do prejuizo funcional',
  'tentando interromper um ciclo de piora progressiva',
  'na tentativa de recuperar previsibilidade na rotina',
  'porque os sintomas passaram a ocupar mais espaco mental',
  'com foco em aprendizado e prevencao de recaida',
]

const connectivePhrases = [
  'nos relatos mais recentes',
  'ao longo das ultimas semanas',
  'com observacao consistente no cotidiano',
  'segundo auto-relato estruturado',
  'em acompanhamento de rotina',
  'em diferentes situacoes do dia',
  'com padrao percebido por pessoas proximas',
  'na comparacao com periodos anteriores',
  'em descricoes repetidas de sofrimento',
  'em contexto de demanda continuada',
]

const socialResponsePatterns = [
  'evita expor dificuldades para nao parecer fragil',
  'procura confirmar varias vezes se esta agindo da forma correta',
  'oscila entre buscar apoio e se isolar',
  'interpreta feedback neutro como sinal de risco',
  'reduz participacao em interacoes espontaneas',
  'mantem vigilancia constante sobre possiveis erros',
  'tem dificuldade de confiar no proprio julgamento',
  'antecipa cenarios negativos antes de encontros sociais',
  'adota postura de controle excessivo em conversas',
  'demonstra desgaste em situacoes que antes eram manejaveis',
]

const functionalDomains = [
  'com impacto em desempenho academico',
  'com impacto em produtividade profissional',
  'com impacto em qualidade de sono',
  'com impacto em organizacao domestica',
  'com impacto em relacoes interpessoais',
  'com impacto em tomada de decisao',
  'com impacto em planejamento de medio prazo',
  'com impacto em energia para tarefas basicas',
  'com impacto em constancia de habitos saudaveis',
  'com impacto em autonomia funcional',
]

const dailyImpactFrames = [
  'a pessoa descreve que tarefas simples parecem mais pesadas que antes',
  'ha reducao de espontaneidade em atividades anteriormente neutras',
  'pequenos imprevistos passam a gerar resposta emocional desproporcional',
  'o tempo gasto para iniciar tarefas aumentou de forma notavel',
  'a rotina ficou mais lenta por revisao excessiva de decisoes',
  'compromissos cotidianos comecam a ser adiados com frequencia',
  'o desgaste aparece mesmo em dias sem eventos criticos',
  'a regularidade funcional caiu em mais de um dominio da vida',
  'a previsibilidade da rotina ficou comprometida',
  'o custo emocional para manter desempenho aumentou',
]

const uncertaintyFrames = [
  'nao ha indicios de que o quadro seja apenas reacao breve a evento isolado',
  'o padrao se mantem alem de variacoes normais de humor',
  'os sinais vao alem de oscilacoes situacionais esperadas',
  'a persistencia temporal afasta interpretacao de episodio pontual',
  'o relato indica continuidade de sintomas em diferentes contextos',
  'ha repeticao de sinais mesmo quando as demandas diminuem',
  'a intensidade do sofrimento nao acompanha apenas eventos agudos',
  'o funcionamento nao retorna totalmente ao padrao previo',
]

const differentialLeadIns = [
  'Comparado a essa alternativa,',
  'Em contraste com essa hipotese,',
  'Como diferencial proximo,',
  'No raciocinio comparativo,',
  'Ao revisar a hipotese concorrente,',
  'Pelo criterio educacional de exclusao,',
]

const durationByDifficulty: Record<Difficulty, string[]> = {
  easy: [
    'o padrao aparece de forma recorrente ha varios meses',
    'os sinais persistem na maior parte das semanas recentes',
    'ha continuidade dos sintomas sem remissao sustentada',
    'o quadro se repete com frequencia ao longo do semestre',
    'a persistencia temporal ultrapassa reacoes de curto prazo',
    'o curso dos sintomas manteve regularidade nos ultimos meses',
    'os relatos repetidos indicam manutencao do mesmo eixo de sofrimento',
    'a recorrencia e observada de maneira consistente no cotidiano',
  ],
  medium: [
    'o curso clinico mostra oscilacoes, mas com tendencia de agravamento funcional',
    'ha repeticao de episodios ao longo do ano com impacto acumulado',
    'a cronologia sugere padrao consolidado alem de variacao situacional',
    'a persistencia aparece em ciclos que se repetem em diferentes semanas',
    'o quadro mantem continuidade com piora gradual da organizacao diaria',
    'o historico recente aponta para repeticao de sintomas em multiplos contextos',
    'as tentativas de compensacao geram alivio parcial e temporario',
    'o comportamento sintomatico retorna apos curtos periodos de melhora',
  ],
  hard: [
    'o historico longitudinal descreve ciclos com recaidas e aumento de complexidade',
    'a evolucao temporal sugere cronificacao com prejuizo cumulativo',
    'o curso mostra fases distintas que exigem leitura diferencial cuidadosa',
    'ha persistencia por periodo prolongado com oscilacao de intensidade',
    'o padrao temporal combina estabilidade de eixo com variacao de forma',
    'a progressao indica impacto progressivo em varios dominios funcionais',
    'o relato sugere manutencao de sintomas mesmo com ajustes de rotina',
    'o quadro apresenta retorno recorrente apos tentativas de manejo',
  ],
}

const temporalProgressionByDifficulty: Record<Difficulty, string[]> = {
  easy: [
    'com progressao lenta e constante',
    'com manutencao de intensidade semelhante',
    'com pequenas oscilacoes semanais',
    'com impacto funcional gradativo',
    'com recorrencia previsivel em dias de maior demanda',
  ],
  medium: [
    'com agravamento perceptivel em periodos de estresse',
    'com aumento de evitacao em tarefas relevantes',
    'com variacao de intensidade e queda de consistencia funcional',
    'com ampliacao de prejuizo em duas ou mais areas',
    'com ciclos de melhora curta seguidos de recaida',
  ],
  hard: [
    'com combinacao de recaidas e desgaste acumulado',
    'com alternancia de fases e impacto amplo no funcionamento',
    'com resposta limitada a estrategias espontaneas de controle',
    'com perda progressiva de previsibilidade da rotina',
    'com padrao clinico que exige diferenciacao fina',
  ],
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
  'Renata',
  'Vitor',
  'Paula',
  'Mateus',
  'Julia',
  'Felipe',
  'Amanda',
  'Leandro',
]

const disorderProfiles: Record<Disorder['id'], DisorderGenerationProfile> = {
  mdd: {
    disorderId: 'mdd',
    allowedStages: ['jovem_adulto', 'adulto', 'adulto_maduro'],
    titleFocus: ['queda de interesse', 'desanimo persistente', 'reduzida vitalidade', 'recolhimento progressivo'],
    chiefComplaintCore: [
      'relata humor deprimido e perda de interesse em atividades antes significativas',
      'descreve sensacao de vazio com energia reduzida na maior parte dos dias',
      'aponta diminuicao acentuada de motivacao para tarefas usuais',
      'refere tristeza persistente acompanhada de desengajamento geral',
      'percebe queda de prazer em atividades que antes traziam satisfacao',
      'menciona cansaco emocional que compromete iniciativa cotidiana',
    ],
    triggerContexts: [
      'especialmente quando precisa manter ritmo constante de tarefas',
      'com piora em periodos de cobranca por desempenho',
      'mesmo em dias sem eventos estressores claros',
      'com tendencia de isolamento ao longo da semana',
      'na tentativa de retomar habitos que antes eram automaticos',
      'quando compara o funcionamento atual com meses anteriores',
    ],
    symptomClusters: [
      'ha alteracao de sono, lentificacao e dificuldade de concentracao',
      'surgem fadiga intensa, baixa iniciativa e dificuldade de decisao',
      'aparecem anedonia, autoavaliacao negativa e queda de foco',
      'observa-se perda de energia, indecisao e ritmo mental reduzido',
      'ocorrem desinteresse social, reducao de produtividade e cansaco persistente',
      'nota-se dificuldade de iniciar tarefas e manter constancia ao longo do dia',
    ],
    cognitivePatterns: [
      'com interpretacao frequente de fracasso pessoal',
      'com visao pessimista sobre capacidade de melhora',
      'com ruminacao sobre erros passados',
      'com tendencia a autocranca rigida',
      'com antecipacao de resultados negativos',
      'com desvalorizacao de pequenas conquistas',
    ],
    copingPatterns: [
      'tenta compensar com mais horas de trabalho, mas esgota rapidamente',
      'adota estrategias de evitacao para reduzir desconforto imediato',
      'alterna dias de esforco intenso com periodos de paralizacao',
      'busca distracao passiva para aliviar sofrimento por curto prazo',
      'reduz compromissos para preservar energia minima',
      'posterga tarefas complexas por sentir baixa prontidao',
    ],
    impairmentConsequences: [
      'o rendimento funcional caiu de forma evidente',
      'ha afastamento gradual de pessoas e atividades importantes',
      'a pessoa perdeu regularidade em tarefas basicas',
      'o funcionamento ocupacional e social ficou mais instavel',
      'o custo emocional para manter rotina aumentou consideravelmente',
      'a consistencia de autocuidado foi reduzida',
    ],
    exclusionAnchors: [
      'nao ha relato de fases claras de energia elevada com pouca necessidade de sono',
      'o quadro nao e melhor explicado por periodos de expansividade sustentada',
      'nao surgiram sinais de hipomania estruturada no periodo observado',
      'a oscilacao descrita nao indica episodios de ativacao tipicos de mania',
      'os sintomas atuais mantem eixo depressivo predominante',
      'o padrao nao aponta para ciclo de elevacao marcada de humor',
    ],
    explanationFrames: [
      'A leitura educacional mais provavel e de um quadro depressivo maior.',
      'A formulacao de estudo favorece hipotese de depressao maior.',
      'No raciocinio diferencial, o eixo principal sugere transtorno depressivo maior.',
      'O padrao de sintomas e prejuizo e mais compativel com depressao maior.',
      'Os elementos centrais deste caso sustentam hipotese de depressao maior.',
      'A integracao de sinais aponta para transtorno depressivo maior.',
    ],
    differentialLines: [
      {
        disorderId: 'bipolar_2',
        whyNot: 'nao foram descritas fases de hipomania que expliquem o curso longitudinal.',
      },
      {
        disorderId: 'gad',
        whyNot: 'o nucleo do caso e anedonia e queda global de energia, nao preocupacao difusa predominante.',
      },
    ],
    tags: ['humor', 'anedonia', 'energia_baixa'],
  },
  gad: {
    disorderId: 'gad',
    allowedStages: ['adolescente', 'jovem_adulto', 'adulto', 'adulto_maduro'],
    titleFocus: ['preocupacao excessiva', 'ansiedade difusa', 'alerta constante', 'sobrecarga cognitiva'],
    chiefComplaintCore: [
      'apresenta preocupacao excessiva em varios temas da vida cotidiana',
      'descreve ansiedade persistente com dificuldade de desligar pensamentos',
      'relata antecipacao frequente de problemas em diferentes areas',
      'aponta sensacao de alerta continuo mesmo sem ameaca imediata',
      'menciona mente ocupada por cenarios de risco durante boa parte do dia',
      'refere dificuldade de controlar cadeia de preocupacoes sucessivas',
    ],
    triggerContexts: [
      'principalmente quando precisa lidar com incerteza',
      'com piora em dias de acumulacao de tarefas',
      'mesmo apos receber sinais de que a situacao esta sob controle',
      'especialmente em temas de desempenho e responsabilidade',
      'quando tenta descansar e surgem novas preocupacoes',
      'ao tomar decisoes simples do cotidiano',
    ],
    symptomClusters: [
      'ha tensao muscular, irritabilidade e fadiga ao final do dia',
      'aparecem inquietacao, dificuldade de foco e sono nao reparador',
      'observa-se cansaco mental com dificuldade de relaxamento',
      'surgem sintomas fisicos de ansiedade e preocupacao persistente',
      'nota-se hipervigilancia, indecisao e desgaste cognitivo',
      'ocorre revisao excessiva de tarefas e baixa sensacao de seguranca',
    ],
    cognitivePatterns: [
      'com tendencia a superestimar probabilidade de erro',
      'com necessidade de prever todas as possibilidades negativas',
      'com dificuldade de tolerar duvida e imprevisibilidade',
      'com foco em risco potencial mesmo em cenarios neutros',
      'com autocobranca por controle total da rotina',
      'com interpretacao catastrofica de pequenos imprevistos',
    ],
    copingPatterns: [
      'tenta reduzir ansiedade revisando tarefas repetidamente',
      'busca garantias externas para aliviar incerteza',
      'organiza listas excessivas e ainda sente inseguranca',
      'adota evitacao de decisoes para nao lidar com erro potencial',
      'procura monitorar continuamente sinais de problema',
      'aumenta ritmo de trabalho para compensar sensacao de risco',
    ],
    impairmentConsequences: [
      'a produtividade cai por excesso de monitoramento interno',
      'ha desgaste emocional constante ao longo da semana',
      'a rotina fica lenta por indecisao e revisao continua',
      'ocorre dificuldade de recuperar energia apos demandas comuns',
      'o funcionamento social sofre por preocupacao antecipatoria',
      'a qualidade de vida reduz de forma progressiva',
    ],
    exclusionAnchors: [
      'nao ha ataques abruptos e inesperados como eixo central do quadro',
      'a ansiedade nao fica restrita apenas a desempenho social',
      'nao se observa ritual compulsivo estruturado como principal alivio',
      'o padrao descrito e difuso e continuo, nao episodico agudo',
      'os sintomas se espalham por varios dominios e nao por um unico gatilho',
      'o quadro nao esta limitado a lembrancas traumaticas especificas',
    ],
    explanationFrames: [
      'A formulacao educacional favorece ansiedade generalizada.',
      'No estudo diferencial, o padrao e mais compativel com TAG.',
      'A combinacao de preocupacao difusa e persistencia temporal sugere TAG.',
      'O eixo clinico principal sustenta hipotese de ansiedade generalizada.',
      'A leitura de caso indica predominio de ansiedade generalizada.',
      'A hipotese de TAG se destaca pelo padrao de preocupacao cronica.',
    ],
    differentialLines: [
      {
        disorderId: 'panic',
        whyNot: 'nao ha predominio de ataques abruptos recorrentes como evento principal.',
      },
      {
        disorderId: 'social_anxiety',
        whyNot: 'a preocupacao ultrapassa cenarios de avaliacao social e alcanza varios dominios.',
      },
    ],
    tags: ['preocupacao', 'ansiedade_diffusa', 'tensao'],
  },
  panic: {
    disorderId: 'panic',
    allowedStages: ['jovem_adulto', 'adulto', 'adulto_maduro'],
    titleFocus: ['crises agudas', 'medo de recorrencia', 'evitacao antecipatoria', 'alarme fisiologico'],
    chiefComplaintCore: [
      'relata episodios repentinos de medo intenso com perda de controle percebida',
      'descreve crises abruptas com sensacao de catastrofe iminente',
      'aponta ataques de ansiedade que atingem pico em poucos minutos',
      'refere episodios fisicos intensos acompanhados de medo de morrer',
      'menciona crises inesperadas seguidas de preocupacao persistente',
      'percebe ataques agudos de alarme corporal sem aviso claro',
    ],
    triggerContexts: [
      'inclusive em situacoes antes consideradas seguras',
      'com receio de nova crise em locais publicos',
      'apos periodos curtos de estabilidade aparente',
      'principalmente quando esta longe de apoio imediato',
      'com monitoramento constante de sensacoes corporais',
      'mesmo sem gatilho situacional unico definido',
    ],
    symptomClusters: [
      'durante as crises aparecem taquicardia, tremor e falta de ar',
      'ocorrem sudorese, tontura e sensacao de desmaio iminente',
      'ha onda de medo intenso com sintomas autonomicos marcados',
      'surgem parestesias, aperto toracico e desorganizacao momentanea',
      'aparecem sintomas fisicos abruptos com alto desconforto subjetivo',
      'nota-se ativacao fisiologica rapida e dificuldade de autorregulacao',
    ],
    cognitivePatterns: [
      'com interpretacao de perigo imediato para a propria vida',
      'com vigilancia excessiva de sinais corporais',
      'com medo persistente de perder controle em publico',
      'com antecipacao de crise em trajetos habituais',
      'com receio de nao conseguir ajuda a tempo',
      'com leitura catastrofica de sensacoes benignas',
    ],
    copingPatterns: [
      'reduz deslocamentos sem companhia',
      'evita locais com dificil saida rapida',
      'planeja rota de fuga em ambientes comuns',
      'carrega itens de seguranca para diminuir ansiedade',
      'cancela compromissos quando percebe sinais iniciais de ativacao',
      'permanece perto de ambientes considerados seguros',
    ],
    impairmentConsequences: [
      'a evitacao passou a limitar autonomia diaria',
      'a rotina social e ocupacional ficou mais restrita',
      'compromissos frequentes foram adiados por medo de recorrencia',
      'o funcionamento caiu pela combinacao de crise e antecipacao ansiosa',
      'a pessoa passou a organizar a vida em torno de prevencao de crise',
      'ha perda de espontaneidade em deslocamentos e interacoes',
    ],
    exclusionAnchors: [
      'o quadro nao e melhor explicado por preocupacao difusa continua sem crises abruptas',
      'a ansiedade social isolada nao explica ataques inesperados em multiplos cenarios',
      'nao ha vinculo exclusivo com lembrancas traumaticas especificas',
      'os episodios aparecem com padrao agudo e recorrente',
      'o medo principal e a propria crise e sua recorrencia',
      'os sintomas nao se limitam a gatilho unico de desempenho social',
    ],
    explanationFrames: [
      'A formulacao de estudo e mais compativel com transtorno do panico.',
      'No raciocinio diferencial, predomina hipotese de transtorno do panico.',
      'A recorrencia de ataques abruptos favorece a hipotese de panico.',
      'A combinacao de crise aguda e medo antecipatorio sustenta panico.',
      'O eixo de sintomas aponta para transtorno do panico.',
      'A leitura clinica educacional sugere transtorno do panico.',
    ],
    differentialLines: [
      {
        disorderId: 'gad',
        whyNot: 'o padrao principal nao e preocupacao difusa continua, mas ataques agudos recorrentes.',
      },
      {
        disorderId: 'ptsd',
        whyNot: 'nao ha eixo de revivescencia traumatica como elemento organizador central.',
      },
    ],
    tags: ['ataques', 'medo_antecipatorio', 'evitacao'],
  },
  social_anxiety: {
    disorderId: 'social_anxiety',
    allowedStages: ['adolescente', 'jovem_adulto', 'adulto'],
    titleFocus: ['avaliacao negativa', 'evitacao social', 'exposicao em foco', 'medo de julgamento'],
    chiefComplaintCore: [
      'evita situacoes de exposicao por medo de julgamento',
      'descreve receio intenso de passar vergonha em publico',
      'relata ansiedade elevada antes de interacoes avaliativas',
      'aponta desconforto marcante ao ser observado por outras pessoas',
      'menciona medo persistente de ser avaliado de forma negativa',
      'refere antecipacao ansiosa de encontros sociais',
    ],
    triggerContexts: [
      'sobretudo em apresentacoes, reunioes ou conversas com desconhecidos',
      'com piora quando sente que pode ser criticado',
      'principalmente em situacoes de desempenho observavel',
      'ao precisar falar diante de grupos',
      'em ambientes sociais com pouca familiaridade',
      'quando ha possibilidade de erro visivel',
    ],
    symptomClusters: [
      'antes da exposicao surgem tremor, rubor e taquicardia',
      'ha antecipacao prolongada, evitacao e sofrimento previo',
      'aparece monitoramento excessivo da propria performance',
      'ocorre bloqueio cognitivo em momentos de maior visibilidade social',
      'surgem sintomas fisicos de ansiedade e desejo de fuga',
      'nota-se rigidez comportamental em interacoes avaliativas',
    ],
    cognitivePatterns: [
      'com expectativa de humilhacao publica',
      'com tendencia a superestimar falhas proprias',
      'com foco rigido em sinais de desaprovacao',
      'com autocranca alta apos interacoes simples',
      'com lembranca seletiva de momentos constrangedores',
      'com interpretacao negativa de feedback neutro',
    ],
    copingPatterns: [
      'evita eventos onde precise se expor verbalmente',
      'faz roteiro mental extensivo antes de conversar',
      'prefere permanecer em silencio para reduzir risco percebido',
      'abandona atividades com elevada visibilidade social',
      'reduz contato com grupos novos',
      'busca saida rapida de situacoes de avaliacao',
    ],
    impairmentConsequences: [
      'ha perda de oportunidades academicas e profissionais',
      'a vida social encolheu progressivamente',
      'o funcionamento global foi reduzido por evitacao de exposicao',
      'compromissos importantes deixam de ser cumpridos',
      'a pessoa passa a escolher rotinas com menor interacao',
      'o sofrimento antecipatorio consome energia diaria significativa',
    ],
    exclusionAnchors: [
      'a ansiedade nao e difusa em todos os temas do cotidiano',
      'nao ha ataques inesperados recorrentes fora do contexto social avaliativo',
      'o eixo do quadro permanece no medo de avaliacao negativa',
      'os sintomas melhoram quando o risco de julgamento cai',
      'o padrao nao e explicado por ritual compulsivo estruturado',
      'nao ha revivescencia traumatica como elemento central',
    ],
    explanationFrames: [
      'A hipotese educativa principal e ansiedade social.',
      'O conjunto de sinais favorece transtorno de ansiedade social.',
      'No diferencial, predomina quadro de ansiedade social.',
      'A evitacao por medo de avaliacao negativa sustenta ansiedade social.',
      'A formulacao de caso sugere transtorno de ansiedade social.',
      'A leitura funcional e mais compativel com ansiedade social.',
    ],
    differentialLines: [
      {
        disorderId: 'gad',
        whyNot: 'as preocupacoes nao sao amplamente difusas; concentram-se em avaliacao social.',
      },
      {
        disorderId: 'panic',
        whyNot: 'o medo central nao e crise inesperada em si, mas julgamento negativo em exposicao.',
      },
    ],
    tags: ['avaliacao_social', 'evitacao', 'desempenho'],
  },
  ocd: {
    disorderId: 'ocd',
    allowedStages: ['adolescente', 'jovem_adulto', 'adulto', 'adulto_maduro'],
    titleFocus: ['obsessao e ritual', 'checagem repetitiva', 'intrusoes persistentes', 'neutralizacao ansiosa'],
    chiefComplaintCore: [
      'relata pensamentos intrusivos repetidos seguidos de necessidade de neutralizacao',
      'descreve medo de dano acompanhado por rituais de checagem',
      'aponta obsessoes desconfortaveis com compulsao para reduzir ansiedade',
      'refere imagens ou ideias intrusivas que retornam apesar de esforco para bloquear',
      'menciona repeticao de atos mentais e comportamentais para aliviar tensao',
      'percebe ciclo de intrusao, ansiedade e ritual de alivio',
    ],
    triggerContexts: [
      'com piora em momentos de responsabilidade',
      'sobretudo ao precisar encerrar tarefas e sair de casa',
      'mesmo quando reconhece exagero na conduta',
      'na tentativa de obter certeza absoluta',
      'quando surge duvida sobre seguranca ou erro',
      'em contextos de maior cansaco e estresse',
    ],
    symptomClusters: [
      'ha repeticao de checagens e duvida persistente apos cada verificacao',
      'ocorrem rituais mentais longos para reduzir desconforto interno',
      'aparecem comportamentos repetitivos com alivio breve',
      'surgem pensamentos intrusivos de responsabilidade excessiva',
      'nota-se necessidade de confirmar e reconfirmar decisoes simples',
      'o tempo diario gasto em neutralizacao e relevante',
    ],
    cognitivePatterns: [
      'com baixa tolerancia a incerteza',
      'com sobrestimacao de risco e culpa',
      'com necessidade de controle total de possibilidade de erro',
      'com sensacao de responsabilidade ampliada por eventos improvaveis',
      'com desconforto intenso diante de duvida residual',
      'com rigidez de criterio para sentir seguranca',
    ],
    copingPatterns: [
      'revisa procedimentos varias vezes antes de encerrar tarefas',
      'busca alivio por meio de rituais repetitivos',
      'evita situacoes que dispararam duvida anteriormente',
      'repete frases mentais para neutralizar intrusao',
      'pede confirmacao frequente para reduzir ansiedade',
      'adota sequencias fixas de comportamento para sentir controle',
    ],
    impairmentConsequences: [
      'o tempo consumido em rituais compromete pontualidade e produtividade',
      'ha desgaste nas relacoes por necessidade de confirmacao constante',
      'a rotina perde fluidez devido a repeticoes demoradas',
      'o funcionamento diario e afetado por ciclo de duvida e checagem',
      'a pessoa evita compromissos para reduzir exposicao a gatilhos',
      'o custo mental para manter atividades comuns se torna elevado',
    ],
    exclusionAnchors: [
      'o quadro nao se limita a preocupacao difusa sem comportamento compulsivo',
      'os rituais nao sao descritos como atividade prazerosa, mas como alivio ansioso',
      'a ansiedade social isolada nao explica a estrutura obsesso-compulsiva',
      'a dinamica central e intrusao seguida de neutralizacao repetitiva',
      'o comportamento e egodistonico e percebido como excessivo',
      'nao ha apenas habito rotineiro sem sofrimento associado',
    ],
    explanationFrames: [
      'A leitura educacional favorece transtorno obsessivo-compulsivo.',
      'O padrao observado e mais compativel com TOC.',
      'No raciocinio diferencial, predomina hipotese de TOC.',
      'A estrutura de obsessao e compulsao sustenta TOC.',
      'A formulacao de caso aponta para transtorno obsessivo-compulsivo.',
      'O nucleo sintomatico e coerente com TOC.',
    ],
    differentialLines: [
      {
        disorderId: 'gad',
        whyNot: 'a preocupacao aqui e acompanhada de ritual compulsivo estruturado para alivio.',
      },
      {
        disorderId: 'social_anxiety',
        whyNot: 'o eixo nao e medo de julgamento, e sim intrusao e neutralizacao compulsiva.',
      },
    ],
    tags: ['obsessao', 'compulsao', 'ritual'],
  },
  ptsd: {
    disorderId: 'ptsd',
    allowedStages: ['jovem_adulto', 'adulto', 'adulto_maduro', 'idoso'],
    titleFocus: ['revivescencia traumatica', 'evitacao de gatilhos', 'hipervigilancia', 'memoria intrusiva'],
    chiefComplaintCore: [
      'apos evento potencialmente traumatico, relata lembrancas invasivas recorrentes',
      'descreve pesadelos e revivescencias relacionadas a experiencia critica',
      'aponta estado de alerta persistente desde episodio traumatico',
      'refere evitacao de situacoes associadas ao evento adverso',
      'menciona reatividade intensa diante de sinais que lembram o trauma',
      'percebe reexperiencia emocional de cenas ligadas ao evento',
    ],
    triggerContexts: [
      'sobretudo quando encontra sons ou imagens associadas ao episodio',
      'com piora em locais que lembram o contexto traumatico',
      'ao se deparar com estimulos semelhantes aos do evento',
      'durante situacoes de perda de controle percebido',
      'mesmo apos tentativas de evitar gatilhos diretos',
      'com aumento de sintomas em periodos de maior estresse geral',
    ],
    symptomClusters: [
      'ha revivescencia, evitacao e hipervigilancia de forma combinada',
      'surgem irritabilidade, sono fragmentado e respostas de sobressalto',
      'ocorrem lembrancas intrusivas com sofrimento marcante',
      'aparece desconforto intenso diante de pistas associativas',
      'nota-se reducao de participacao em atividades por medo de gatilho',
      'o estado de alerta elevado persiste fora de situacoes de risco real',
    ],
    cognitivePatterns: [
      'com percepcao de inseguranca continuada',
      'com expectativa de nova ameaca iminente',
      'com tendencia a evitar lembrancas internas e externas',
      'com sensacao de vulnerabilidade corporal e emocional',
      'com dificuldade de diferenciar sinal atual de memoria traumatica',
      'com interpretacao de ambiente neutro como potencialmente perigoso',
    ],
    copingPatterns: [
      'evita trajetos, conversas e locais associados ao trauma',
      'reduz exposicao social para prevenir disparo de sintomas',
      'mantem vigilancia constante do ambiente',
      'organiza rotina para minimizar contato com gatilhos',
      'adota estrategias de controle para diminuir revivescencia',
      'interrompe atividades quando surgem sinais associativos',
    ],
    impairmentConsequences: [
      'a evitacao reduziu autonomia e liberdade de deslocamento',
      'a vida social e ocupacional ficou restrita por medo de gatilhos',
      'o funcionamento caiu pela combinacao de revivescencia e hiperalerta',
      'ha desgaste relacional por irritabilidade e retraimento',
      'a pessoa passa a organizar rotina em torno da prevencao de disparos',
      'o bem-estar global foi reduzido por sofrimento intrusivo persistente',
    ],
    exclusionAnchors: [
      'o quadro nao e apenas preocupacao difusa sem referencia traumatica',
      'os sintomas mantem vinculo tematico claro com evento adverso',
      'ataques de panico isolados nao explicam revivescencia estruturada',
      'a evitacao dirigida ao trauma e um elemento central da apresentacao',
      'ha relacao consistente entre gatilho e aumento de sintomas',
      'o eixo principal nao e medo social de julgamento',
    ],
    explanationFrames: [
      'A hipotese educativa principal e estresse pos-traumatico.',
      'A combinacao de revivescencia, evitacao e hiperalerta sugere TEPT.',
      'No diferencial, o padrao e mais compativel com TEPT.',
      'A estrutura de sintomas orienta para transtorno de estresse pos-traumatico.',
      'A leitura longitudinal favorece hipotese de TEPT.',
      'O conjunto de sinais e coerente com estresse pos-traumatico.',
    ],
    differentialLines: [
      {
        disorderId: 'panic',
        whyNot: 'o nucleo do caso esta ligado a trauma e revivescencia, nao apenas a crise inesperada.',
      },
      {
        disorderId: 'gad',
        whyNot: 'a ansiedade nao e difusa; ela se organiza em torno de memorias e gatilhos traumaticos.',
      },
    ],
    tags: ['trauma', 'revivescencia', 'hipervigilancia'],
  },
  adhd: {
    disorderId: 'adhd',
    allowedStages: ['adolescente', 'jovem_adulto', 'adulto'],
    titleFocus: ['desatencao persistente', 'falha executiva', 'desorganizacao cronica', 'inconsistencia funcional'],
    chiefComplaintCore: [
      'relata historico persistente de desatencao e desorganizacao',
      'descreve dificuldade cronica para manter foco em tarefas prolongadas',
      'aponta esquecimentos frequentes e perda de sequencia de atividades',
      'refere alternancia constante de tarefas sem conclusao',
      'menciona baixa consistencia para planejar e executar rotinas',
      'percebe impulsividade leve associada a falhas de organizacao',
    ],
    triggerContexts: [
      'principalmente em tarefas longas e de baixa estimulacao',
      'com piora quando ha multiplos prazos simultaneos',
      'em contextos que exigem planejamento detalhado',
      'ao tentar manter regularidade de habitos diarios',
      'com aumento de erros em atividades repetitivas',
      'quando precisa dividir atencao entre varias demandas',
    ],
    symptomClusters: [
      'ha perda de prazos, distraibilidade e dificuldade de finalizacao',
      'ocorrem esquecimentos recorrentes e falhas de monitoramento de tarefa',
      'surgem trocas frequentes de foco sem conclusao efetiva',
      'aparece dificuldade de priorizacao e gestao de tempo',
      'nota-se oscilacao de desempenho ligada a funcao executiva',
      'observa-se baixa sustentacao atencional em tarefas monotomas',
    ],
    cognitivePatterns: [
      'com sensacao de mente sempre dividida em varias trilhas',
      'com dificuldade de manter sequencia mental estavel',
      'com tendencia a subestimar tempo necessario para tarefas',
      'com falha de memoria de trabalho em demandas cotidianas',
      'com perda de referencia entre etapas de uma mesma atividade',
      'com frustracao por inconsistencias de desempenho',
    ],
    copingPatterns: [
      'usa lembretes externos para reduzir esquecimentos',
      'divide tarefas em blocos curtos para conseguir avancar',
      'procura ambientes de menor distracao',
      'compensa atrasos com periodos intensos de esforco',
      'acumula listas e alarmes para manter organizacao minima',
      'evita tarefas longas por antecipar perda de foco',
    ],
    impairmentConsequences: [
      'a consistencia academica ou profissional fica comprometida',
      'ha atraso recorrente em entregas e compromissos',
      'a desorganizacao gera conflitos interpessoais',
      'o rendimento oscila de forma significativa ao longo da semana',
      'o funcionamento diario exige esforco extra para manter minima estrutura',
      'a pessoa relata desgaste por tentar compensar falhas executivas',
    ],
    exclusionAnchors: [
      'o padrao nao se restringe a episodio depressivo atual',
      'nao ha ciclos episodicos claros de elevacao de energia que expliquem o quadro',
      'os sinais aparecem em mais de um contexto de funcionamento',
      'a dificuldade atencional e cronica e nao apenas situacional',
      'a variacao de humor nao explica integralmente o padrao executivo',
      'o curso descreve continuidade de sinais desde fases anteriores da vida',
    ],
    explanationFrames: [
      'A formulacao educacional favorece hipotese de TDAH.',
      'No estudo diferencial, o padrao e mais compativel com TDAH.',
      'A persistencia executiva e atencional sustenta leitura de TDAH.',
      'A apresentacao funcional sugere transtorno de deficit de atencao/hiperatividade.',
      'A combinacao de sinais e contexto longitudinal aponta para TDAH.',
      'A hipotese principal de estudo recai em TDAH.',
    ],
    differentialLines: [
      {
        disorderId: 'bipolar_2',
        whyNot: 'o padrao e cronico de desorganizacao e nao episodico de elevacao de humor.',
      },
      {
        disorderId: 'mdd',
        whyNot: 'as falhas atencionais nao se limitam a fase depressiva circunscrita.',
      },
    ],
    tags: ['desatencao', 'organizacao', 'funcao_executiva'],
  },
  bipolar_2: {
    disorderId: 'bipolar_2',
    allowedStages: ['jovem_adulto', 'adulto', 'adulto_maduro'],
    titleFocus: ['oscilacao episodica', 'fases de ativacao', 'curso de humor', 'alternancia afetiva'],
    chiefComplaintCore: [
      'relata alternancia entre fases depressivas e periodos de ativacao',
      'descreve ciclos de humor com energia aumentada seguidos de queda acentuada',
      'aponta historico de oscilacao episodica com impulsividade em fases de ativacao',
      'refere periodos de menor necessidade de sono intercalados com fases de desanimo',
      'menciona variacao de ritmo psicologico em blocos de dias ou semanas',
      'percebe alternancia entre expansao comportamental e retraimento depressivo',
    ],
    triggerContexts: [
      'com impacto notavel em planejamento e relacoes',
      'principalmente em periodos de maior demanda decisoria',
      'com piora funcional apos fases de ativacao',
      'ao longo de ciclos repetidos durante o ano',
      'mesmo com tentativas espontaneas de ajuste de rotina',
      'com repercussao em escolhas financeiras e ocupacionais',
    ],
    symptomClusters: [
      'nas fases de ativacao ha fala acelerada, aumento de projetos e sono reduzido',
      'nos periodos depressivos surgem anedonia, lentificacao e baixa energia',
      'o ritmo cognitivo varia de expansao para queda marcada',
      'aparecem decisoes impulsivas em fases de maior energia',
      'observa-se alternancia de produtividade elevada e exaustao subsequente',
      'ha oscilacao de iniciativa e autocontrole ao longo dos ciclos',
    ],
    cognitivePatterns: [
      'com percepcao de grandiosidade funcional em fases de ativacao',
      'com subestimacao de risco em periodos expansivos',
      'com autocranca intensa nas fases depressivas',
      'com dificuldade de manter leitura estavel do proprio estado',
      'com mudanca de metas em funcao da fase atual',
      'com oscilacao entre excesso de confianca e desvalorizacao',
    ],
    copingPatterns: [
      'tenta compensar fases de queda com sobrecarga nas fases de alta',
      'faz ajustes de agenda para reduzir danos de impulsividade',
      'evita decisoes importantes quando percebe sinais de ativacao',
      'procura monitorar sono e ritmo para detectar viradas de fase',
      'alterna periodos de hiperfoco com paralisacao subsequente',
      'restringe exposicoes de risco apos consequencias negativas previas',
    ],
    impairmentConsequences: [
      'a oscilacao impacta estabilidade ocupacional e relacional',
      'ha prejuizo em consistencia de desempenho ao longo do tempo',
      'consequencias financeiras e sociais aparecem em fases de ativacao',
      'a previsibilidade de rotina fica comprometida pelos ciclos',
      'o funcionamento global oscila de forma relevante entre fases',
      'ha custo emocional acumulado apos repeticao de ciclos',
    ],
    exclusionAnchors: [
      'nao ha descricao de mania franca com desorganizacao grave sustentada',
      'as oscilacoes nao parecem apenas reatividade interpessoal momentanea',
      'o padrao e episodico e longitudinalmente repetido',
      'a alternancia excede variacao habitual de humor',
      'os periodos de ativacao possuem caracteristicas proprias e recorrentes',
      'o quadro nao e apenas depressao unipolar',
    ],
    explanationFrames: [
      'A hipotese educacional mais provavel e bipolaridade tipo II.',
      'No diferencial, o curso episodico favorece transtorno bipolar II.',
      'A alternancia entre fases depressivas e hipomanicas sustenta bipolar II.',
      'A leitura longitudinal e mais compativel com transtorno bipolar tipo II.',
      'A estrutura temporal do quadro aponta para bipolaridade tipo II.',
      'A formulacao de caso sugere transtorno bipolar II.',
    ],
    differentialLines: [
      {
        disorderId: 'mdd',
        whyNot: 'depressao unipolar nao explica periodos de ativacao com menor necessidade de sono.',
      },
      {
        disorderId: 'bpd',
        whyNot: 'a oscilacao apresentada tem carater episodico, e nao apenas reatividade interpessoal imediata.',
      },
    ],
    tags: ['hipomania', 'episodico', 'humor'],
  },
  bpd: {
    disorderId: 'bpd',
    allowedStages: ['jovem_adulto', 'adulto'],
    titleFocus: ['instabilidade relacional', 'reatividade afetiva', 'medo de abandono', 'impulsividade interpessoal'],
    chiefComplaintCore: [
      'relata instabilidade afetiva intensa e medo de abandono',
      'descreve relacoes marcadas por aproximacao e afastamento rapido',
      'aponta sofrimento interpessoal recorrente com impulsividade',
      'refere oscilacao emocional acentuada diante de conflitos relacionais',
      'menciona dificuldade persistente de regulacao em vinculos proximos',
      'percebe alternancia entre idealizacao e frustracao em relacoes',
    ],
    triggerContexts: [
      'principalmente apos sinais de rejeicao percebida',
      'com piora em discussoes interpessoais',
      'ao interpretar distancia emocional de pessoas proximas',
      'em fases de inseguranca afetiva intensa',
      'quando ha risco de rompimento de vinculo',
      'em contextos de alto investimento emocional',
    ],
    symptomClusters: [
      'ha reatividade afetiva rapida com respostas impulsivas',
      'ocorrem mudancas abruptas de avaliacao sobre pessoas proximas',
      'aparece dificuldade de manter estabilidade emocional em conflitos',
      'surgem comportamentos impulsivos apos gatilhos relacionais',
      'nota-se sensacao cronica de instabilidade em autoimagem e vinculo',
      'ha oscilacao emocional intensa em curto intervalo',
    ],
    cognitivePatterns: [
      'com medo persistente de abandono',
      'com interpretacao extrema de sinais relacionais',
      'com dificuldade de integrar qualidades e limites nas relacoes',
      'com urgencia de reparacao imediata apos conflito',
      'com alternancia entre idealizacao e desvalorizacao',
      'com leitura dicotomica de proximidade e rejeicao',
    ],
    copingPatterns: [
      'busca contato intenso para reduzir inseguranca momentanea',
      'afasta-se de forma brusca para evitar dor antecipada',
      'tenta regular sofrimento por meio de acao impulsiva',
      'procura reafirmacao frequente em relacoes proximas',
      'alterna necessidade de proximidade e evitacao defensiva',
      'adota respostas imediatas com baixa elaboracao emocional',
    ],
    impairmentConsequences: [
      'ha ruptura recorrente de vinculos importantes',
      'o funcionamento ocupacional sofre em periodos de crise interpessoal',
      'a intensidade emocional compromete estabilidade de rotina',
      'conflitos frequentes reduzem suporte social efetivo',
      'o custo subjetivo da instabilidade relacional e elevado',
      'a consistencia funcional cai apos gatilhos de abandono',
    ],
    exclusionAnchors: [
      'as mudancas emocionais nao se organizam em episodios longos de humor elevado',
      'o eixo principal e relacional e reativo a gatilhos interpessoais',
      'a variacao nao se limita a ansiedade de desempenho social',
      'o padrao mostra instabilidade cronica de regulacao e vinculo',
      'nao ha predominio de ataque abrupto inesperado como no panico',
      'o quadro nao se explica por preocupacao difusa isolada',
    ],
    explanationFrames: [
      'A formulacao educacional favorece funcionamento borderline.',
      'No estudo diferencial, o padrao e mais compativel com traços borderline clinicamente relevantes.',
      'A combinacao de instabilidade relacional e impulsividade sugere quadro borderline.',
      'A leitura de caso aponta para padrao borderline persistente.',
      'O eixo interpessoal e afetivo sustenta hipotese de transtorno borderline.',
      'A dinamica de regulacao emocional e vinculo favorece hipotese borderline.',
    ],
    differentialLines: [
      {
        disorderId: 'bipolar_2',
        whyNot: 'a oscilacao aqui e fortemente reativa a contexto interpessoal, sem episodios hipomanicos claros.',
      },
      {
        disorderId: 'social_anxiety',
        whyNot: 'o sofrimento nao se restringe a julgamento social; envolve instabilidade cronica de vinculos.',
      },
    ],
    tags: ['relacoes', 'impulsividade', 'regulacao_afetiva'],
  },
  aud: {
    disorderId: 'aud',
    allowedStages: ['jovem_adulto', 'adulto', 'adulto_maduro', 'idoso'],
    titleFocus: ['uso persistente', 'perda de controle', 'recaida frequente', 'prejuizo por consumo'],
    chiefComplaintCore: [
      'relata dificuldade de controlar consumo de alcool',
      'descreve tentativas repetidas de reduzir uso sem sucesso sustentado',
      'aponta padrao de consumo que persiste apesar de consequencias negativas',
      'refere perda de limite em episodios de uso recorrente',
      'menciona retomada frequente do padrao anterior apos promessas de pausa',
      'percebe uso progressivamente mais central na rotina',
    ],
    triggerContexts: [
      'principalmente em dias de maior estresse',
      'com piora em contextos sociais de facil acesso a bebida',
      'mesmo apos reconhecer prejuizos claros',
      'em momentos de cansaco emocional acumulado',
      'quando tenta aliviar tensao rapidamente',
      'em periodos de menor monitoramento da rotina',
    ],
    symptomClusters: [
      'ha repeticao do uso apesar de impactos pessoais e profissionais',
      'ocorrem recaidas apos tentativas breves de reducao',
      'aparece dificuldade de interromper consumo apos inicio',
      'nota-se priorizacao crescente de contextos de uso',
      'surgem conflitos recorrentes associados ao padrao de consumo',
      'o uso permanece mesmo diante de consequencias previsiveis',
    ],
    cognitivePatterns: [
      'com minimizacao inicial de danos',
      'com expectativa de que controle sera retomado no curto prazo',
      'com justificativas recorrentes para manutencao do padrao',
      'com ambivalencia entre desejo de reduzir e repeticao de uso',
      'com avaliacao otimista de risco imediato',
      'com leitura subestimada do impacto funcional acumulado',
    ],
    copingPatterns: [
      'faz acordos de reducao que duram pouco tempo',
      'evita situacoes de monitoramento por terceiros',
      'tenta limitar quantidade sem manter consistencia',
      'posterga busca de ajuda por acreditar em controle autonomo',
      'usa abstinencias curtas como prova de controle temporario',
      'organiza rotina para manter acesso ao consumo',
    ],
    impairmentConsequences: [
      'ha prejuizo em rotina familiar e ocupacional',
      'compromissos importantes deixam de ser cumpridos',
      'a confiabilidade funcional diminui progressivamente',
      'conflitos interpessoais se tornam mais frequentes',
      'o desempenho em tarefas de responsabilidade cai',
      'a qualidade de vida geral e reduzida pelo padrao de uso',
    ],
    exclusionAnchors: [
      'o quadro ultrapassa consumo social ocasional sem prejuizo',
      'a persistencia ocorre mesmo diante de danos reconhecidos',
      'ha perda de controle comportamental relevante para o dia a dia',
      'o padrao nao e explicado apenas por episodio isolado de estresse',
      'as recaidas repetidas sugerem manutencao do ciclo de uso',
      'a funcionalidade global sofre impacto em mais de um dominio',
    ],
    explanationFrames: [
      'A hipotese educativa principal e transtorno por uso de alcool.',
      'No diferencial, o padrao e mais compativel com uso problematico de alcool.',
      'A combinacao de persistencia, perda de controle e prejuizo sustenta TUA.',
      'A leitura longitudinal favorece transtorno por uso de alcool.',
      'A estrutura funcional do caso aponta para uso problematico de alcool.',
      'A formulacao de estudo sugere transtorno por uso de alcool.',
    ],
    differentialLines: [
      {
        disorderId: 'mdd',
        whyNot: 'sintomas depressivos podem coexistir, mas nao explicam o padrao de consumo persistente.',
      },
      {
        disorderId: 'gad',
        whyNot: 'ansiedade pode estar presente, porem o eixo principal e comportamento de uso desadaptativo.',
      },
    ],
    tags: ['alcool', 'controle', 'prejuizo'],
  },
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

function pickManyUnique<T>(list: T[], amount: number, rng: () => number): T[] {
  const pool = [...list]
  const count = Math.min(Math.max(0, amount), pool.length)
  const output: T[] = []

  for (let index = 0; index < count; index += 1) {
    const chosen = Math.floor(rng() * pool.length)
    const [value] = pool.splice(chosen, 1)
    output.push(value)
  }

  return output
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

function buildTitle(
  disorderProfile: DisorderGenerationProfile,
  activityContext: string,
  difficulty: Difficulty,
  rng: () => number,
): string {
  const starter = pickOne(caseTitleStarters, rng)
  const focus = pickOne(disorderProfile.titleFocus, rng)
  const lens = pickOne(caseTitleLenses, rng)
  const difficultyToken: Record<Difficulty, string> = {
    easy: 'base',
    medium: 'intermediario',
    hard: 'avancado',
  }

  return `${starter}: ${focus} ${lens} (${activityContext}, nivel ${difficultyToken[difficulty]})`
}

function buildVignette(input: {
  profile: DisorderGenerationProfile
  stageProfile: LifeStageProfile
  age: number
  personName: string
  roleLabel: string
  activityContext: string
  socialContext: string
  rng: () => number
}): string {
  const primaryComplaint = pickOne(input.profile.chiefComplaintCore, input.rng)
  const trigger = pickOne(input.profile.triggerContexts, input.rng)
  const routine = pickOne(input.stageProfile.routineFrames, input.rng)
  const stressor = pickOne(input.stageProfile.stressorFrames, input.rng)
  const helpReason = pickOne(helpSeekingReasons, input.rng)
  const intensity = pickOne(intensityMarkers, input.rng)
  const transition = pickOne(connectivePhrases, input.rng)

  return `${input.personName}, ${input.age} anos, ${input.roleLabel}, relata que ${primaryComplaint} ${input.activityContext}. ${transition}, ${trigger} ${input.socialContext}, especialmente ${routine}. Atualmente, descreve ${intensity} e busca este estudo ${helpReason}. ${stressor}.`
}

function createClues(input: {
  profile: DisorderGenerationProfile
  disorder: Disorder
  stageProfile: LifeStageProfile
  activityContext: string
  socialContext: string
  difficulty: Difficulty
  rng: () => number
}): CaseClue[] {
  const chiefFragments = pickManyUnique(input.profile.chiefComplaintCore, 2, input.rng)
  const symptomFragments = pickManyUnique(input.profile.symptomClusters, 2, input.rng)
  const cognition = pickOne(input.profile.cognitivePatterns, input.rng)
  const coping = pickOne(input.profile.copingPatterns, input.rng)
  const duration = pickOne(durationByDifficulty[input.difficulty], input.rng)
  const progression = pickOne(temporalProgressionByDifficulty[input.difficulty], input.rng)
  const development = pickOne(input.stageProfile.developmentChallenges, input.rng)
  const impact = pickOne(input.profile.impairmentConsequences, input.rng)
  const dailyImpact = pickOne(dailyImpactFrames, input.rng)
  const domainA = pickOne(functionalDomains, input.rng)
  const domainB = pickOne(functionalDomains, input.rng)
  const socialPattern = pickOne(socialResponsePatterns, input.rng)
  const exclusion = pickOne(input.profile.exclusionAnchors, input.rng)
  const uncertainty = pickOne(uncertaintyFrames, input.rng)

  return [
    {
      id: `clue-${input.disorder.id}-${hashSeed(`${input.disorder.id}-1`)}-1`,
      order: 1,
      type: 'chief_complaint',
      text: `${chiefFragments[0]} ${input.activityContext}; ${chiefFragments[1]} ${input.socialContext}.`,
    },
    {
      id: `clue-${input.disorder.id}-${hashSeed(`${input.disorder.id}-2`)}-2`,
      order: 2,
      type: 'symptoms',
      text: `${symptomFragments[0]}. ${symptomFragments[1]}, ${cognition}. Tambem ${coping} e ${socialPattern}.`,
    },
    {
      id: `clue-${input.disorder.id}-${hashSeed(`${input.disorder.id}-3`)}-3`,
      order: 3,
      type: 'duration',
      text: `${duration}, ${progression}. ${development}.`,
    },
    {
      id: `clue-${input.disorder.id}-${hashSeed(`${input.disorder.id}-4`)}-4`,
      order: 4,
      type: 'impairment',
      text: `${impact}, ${domainA} e ${domainB}. ${dailyImpact}. ${exclusion}; ${uncertainty}.`,
    },
  ]
}

function buildExplanation(profile: DisorderGenerationProfile, disorder: Disorder, rng: () => number): string {
  const frame = pickOne(profile.explanationFrames, rng)
  return `${frame} ${disorder.shortSummary} ${disorder.studyNote}`
}

function buildDifferentials(profile: DisorderGenerationProfile, rng: () => number): Array<{ disorderId: string; whyNot: string }> {
  return profile.differentialLines.map((entry) => {
    return {
      disorderId: entry.disorderId,
      whyNot: `${pickOne(differentialLeadIns, rng)} ${entry.whyNot}`,
    }
  })
}

function buildProceduralCase(input: GenerateProceduralCaseInput): Case {
  const rng = createRng(input.seed)
  const disorder = chooseDisorder(rng, input)
  const profile = disorderProfiles[disorder.id]
  const stage = pickOne(profile.allowedStages, rng)
  const stageProfile = lifeStageProfiles[stage]
  const age = randomAge(stage, rng)
  const personName = pickOne(personNames, rng)
  const roleLabel = pickOne(stageProfile.roleLabels, rng)
  const activityContext = pickOne(stageProfile.activityContexts, rng)
  const socialContext = pickOne(stageProfile.socialContexts, rng)

  const clues = createClues({
    profile,
    disorder,
    stageProfile,
    activityContext,
    socialContext,
    difficulty: disorder.difficulty,
    rng,
  })

  const title = buildTitle(profile, activityContext, disorder.difficulty, rng)
  const vignette = buildVignette({
    profile,
    stageProfile,
    age,
    personName,
    roleLabel,
    activityContext,
    socialContext,
    rng,
  })

  return {
    id: `${input.caseIdPrefix}-${disorder.id}-${hashSeed(input.seed)}`,
    title,
    category: disorder.category,
    difficulty: disorder.difficulty,
    vignette,
    correctDisorderId: disorder.id,
    clues,
    explanation: buildExplanation(profile, disorder, rng),
    differentials: buildDifferentials(profile, rng),
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
