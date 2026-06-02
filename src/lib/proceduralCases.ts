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

interface AnchoredDiagnosticProfile {
  openings: string[]
  coreSignals: string[]
  behaviors: string[]
  impacts: string[]
  exclusions: string[]
  mediumLayers?: string[]
}

interface HardCategoryBank {
  symptoms: string[]
  behaviors: string[]
  differentiators: string[]
}

interface MediumCategoryBank {
  symptoms: string[]
  behaviors: string[]
  ambiguityLayers: string[]
  differentiators: string[]
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

const abstractEasyFragments = [
  'tarefas com incerteza',
  'mudancas persistentes',
  'perfil funcional',
  'oscilacao de desempenho',
  'rotina perde previsibilidade',
  'dominios e evitacao',
  'sinais centrais envolvendo',
  'gestao emocional',
  'marcado e especifica',
  'contexto de sobrecarga',
  'desconforto percebido de forma clara',
  'maior exposicao social',
  'reasseguramento repetido',
]

const abstractHardFragments = [
  'autorregulacao',
  'significado subjetivo',
  'em camadas',
  'eixos de',
  'espiral',
  'dinamica processual',
  'fenomenologia inicial',
  'leitura processual',
  'padrao de organizacao',
  'marcadores clinicos aparecem',
  'alto custo de autocontrole',
  'rigidez interpretativa',
  'sobrevivencia funcional',
]

const abstractMediumFragments = [
  'padrao em camadas',
  'gatilho externo e vulnerabilidade basal',
  'mecanismos de enfrentamento',
  'leitura clinica exige integrar',
  'configuracao de pistas',
  'vetores de',
  'eixos de',
  'oscilacoes de intensidade',
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

const hardCategoryBanks: Partial<Record<string, HardCategoryBank>> = {
  Humor: {
    symptoms: [
      'humor deprimido na maior parte dos dias',
      'perda clara de interesse por atividades antes prazerosas',
      'queda importante de energia e iniciativa',
      'variacao anormal de sono e apetite',
    ],
    behaviors: [
      'passou a se isolar, entregar menos tarefas e abandonar atividades antes regulares',
      'tem dificuldade para sair da cama, manter autocuidado e sustentar compromissos basicos',
      'familiares notam reducao de fala, lentificacao e perda de envolvimento com a rotina',
    ],
    differentiators: [
      'o prejuizo vai alem de cansaco por estresse e se mantem mesmo em dias sem demanda aguda',
      'o quadro nao se explica apenas por preocupacao antecipatoria; o rebaixamento do humor e da energia ocupa o centro do caso',
      'a resposta correta depende de integrar humor, anedonia e impacto funcional, nao apenas fadiga isolada',
    ],
  },
  Ansiedade: {
    symptoms: [
      'preocupacao persistente que muda de tema ao longo da semana',
      'medo marcado diante de situacoes sociais avaliativas',
      'crises abruptas com taquicardia, falta de ar e medo intenso',
      'evitacao de lugares onde sair ou receber ajuda parece dificil',
    ],
    behaviors: [
      'revisa decisoes, busca confirmacao e reorganiza a rotina para reduzir desconforto',
      'evita exposicoes, muda trajetos ou cancela compromissos para se sentir mais seguro',
      'permanece em alerta para sinais fisicos ou situacoes que imagina nao conseguir manejar',
    ],
    differentiators: [
      'o desafio esta em definir se o medo e difuso, social, abrupto ou ligado a um contexto de escape dificil',
      'ha mais de uma hipotese ansiosa plausivel, mas o caso ainda oferece sinais suficientes para priorizar uma delas',
      'o diferencial depende de localizar o nucleo do medo e o tipo de evitacao que mantem o quadro',
    ],
  },
  'Obsessivo-compulsivo': {
    symptoms: [
      'pensamentos intrusivos recorrentes e indesejados',
      'duvida persistente de ter causado dano ou deixado algo inseguro',
      'necessidade de lavar, verificar, contar ou neutralizar para reduzir ansiedade',
      'alivio breve seguido pela volta da duvida',
    ],
    behaviors: [
      'gasta muito tempo repetindo rituais antes de sair de casa ou concluir tarefas',
      'retorna varias vezes ao mesmo ponto para verificar, limpar ou pedir certeza',
      'adapta a rotina para conseguir executar atos repetitivos que aliviam a ansiedade apenas por pouco tempo',
    ],
    differentiators: [
      'o caso pode lembrar preocupacao ansiosa comum, mas o ciclo intrusao-neutralizacao e o marcador central',
      'a resposta correta depende de reconhecer compulsao e alivio breve, nao apenas medo difuso',
      'o diferencial exige separar preocupacao cotidiana de obsessoes com rituais associados',
    ],
  },
  'Trauma e Estresse': {
    symptoms: [
      'lembrancas intrusivas ou sonhos ligados a um evento de forte impacto',
      'evitacao de lugares, conversas ou pistas associadas ao evento',
      'sobressalto aumentado, irritabilidade e hiperalerta',
      'sensacao persistente de inseguranca mesmo fora do perigo original',
    ],
    behaviors: [
      'muda trajetos, interrompe atividades ou evita pessoas que lembrem o evento',
      'tem piora do sono e reatividade intensa diante de estimulos inesperados',
      'familiares relatam alerta constante, afastamento e dificuldade de retomar a rotina anterior',
    ],
    differentiators: [
      'o caso pode confundir com ansiedade generalizada ou depressao, mas a ligacao com o evento e a reatividade a gatilhos pesa mais',
      'a resposta correta precisa explicar reexperiencia, evitacao e hiperreatividade no mesmo quadro',
      'o diferencial depende da relacao temporal com o evento e do padrao de gatilhos associados',
    ],
  },
  'Sintomas Somaticos': {
    symptoms: [
      'dor abdominal recorrente, aperto no peito ou sensacao frequente de fraqueza',
      'mal-estar corporal persistente com grande atencao a cada mudanca fisica',
      'desconfortos somaticos atuais que ocupam grande parte do pensamento',
      'sensacoes corporais repetidas interpretadas como sinal de problema serio',
    ],
    behaviors: [
      'realiza consultas, exames ou pesquisas repetidas tentando explicar os sintomas',
      'compara sensacoes do corpo ao longo do dia e interrompe a rotina ao perceber pequenas mudancas',
      'fala dos sintomas com frequencia, busca seguranca e reorganiza o cotidiano em torno deles',
    ],
    differentiators: [
      'o foco principal esta nos sintomas fisicos atuais e na resposta desproporcional a eles, nao apenas no medo abstrato de adoecer',
      'o caso pode lembrar ansiedade de doenca, panico ou TAG, mas a energia mental gira em torno de sintomas somaticos persistentes',
      'a resposta correta precisa explicar sintomas corporais presentes, tempo investido e prejuizo funcional associado',
    ],
  },
  Psicoticos: {
    symptoms: [
      'fala ou pensamento claramente desorganizados',
      'crencas rigidas pouco corrigiveis pela realidade compartilhada',
      'percepcao alterada ou experiencias incomuns com forte conviccao',
      'queda importante de funcionamento social ou ocupacional',
    ],
    behaviors: [
      'a narrativa fica dificil de seguir e mistura temas de forma pouco coerente',
      'o contato com outras pessoas piora por suspeita, estranhamento ou interpretacoes fixas',
      'familiares relatam perda de organizacao, isolamento e queda de autonomia',
    ],
    differentiators: [
      'o caso pode confundir com humor grave ou uso de substancias, mas a alteracao do teste de realidade exige explicacao central',
      'o diferencial depende de avaliar conviccao, desorganizacao e impacto global, nao apenas estresse intenso',
      'a resposta correta precisa dar conta da ruptura com a realidade compartilhada',
    ],
  },
}

const mediumCategoryBanks: Partial<Record<string, MediumCategoryBank>> = {
  Humor: {
    symptoms: [
      'humor rebaixado em boa parte da semana',
      'queda de energia e motivacao',
      'perda de interesse por atividades antes regulares',
      'sono irregular com piora do rendimento',
    ],
    behaviors: [
      'tem alternado tentativas de manter a rotina com dias de afastamento e queda de produtividade',
      'cumpre parte das obrigacoes, mas com esforco crescente e abandono de atividades que antes sustentava',
      'mantem compromissos essenciais, porem com isolamento progressivo e perda de iniciativa fora deles',
    ],
    ambiguityLayers: [
      'em alguns momentos o quadro parece cansaco por estresse, mas a perda de interesse e energia se mantem',
      'o caso pode lembrar sobrecarga ocupacional, embora a reducao de prazer e iniciativa pese mais',
      'existe espaco para pensar em ansiedade ou estresse, mas o eixo afetivo segue mais central',
    ],
    differentiators: [
      'a resposta correta precisa explicar humor, energia e anedonia melhor do que uma leitura apenas ansiosa',
      'o diferencial depende de reconhecer que o rebaixamento do humor nao aparece so em fases de maior demanda',
      'o conjunto favorece transtorno do humor mais do que uma reacao inespecifica ao estresse',
    ],
  },
  Ansiedade: {
    symptoms: [
      'preocupacao recorrente com varios temas do cotidiano',
      'medo acentuado em situacoes de avaliacao ou exposicao',
      'sensacoes fisicas intensas acompanhadas de medo de nova crise',
      'evitacao de lugares ou situacoes para manter sensacao de seguranca',
    ],
    behaviors: [
      'reorganiza a rotina, pede confirmacao ou evita compromissos para reduzir a ansiedade',
      'mantem parte do funcionamento, mas com crescente dependencia de estrategias de seguranca',
      'ora enfrenta a situacao com muito preparo, ora desiste dela para nao lidar com o desconforto',
    ],
    ambiguityLayers: [
      'mais de uma hipotese ansiosa parece plausivel ate o leitor localizar o nucleo do medo',
      'o caso mistura antecipacao, evitacao e sintomas fisicos sem entregar de imediato qual eixo e principal',
      'a dificuldade esta em diferenciar preocupacao difusa, julgamento social, panico ou evitacao situacional',
    ],
    differentiators: [
      'a resposta correta depende de identificar onde a ansiedade se ancora e o que a pessoa tenta evitar',
      'o diferencial fica mais justo quando se observa se o medo e amplo, social, abrupto ou ligado a escape dificil',
      'o caso oferece material para escolher entre hipoteses proximas sem depender de uma palavra isolada',
    ],
  },
  'Obsessivo-compulsivo': {
    symptoms: [
      'pensamentos intrusivos ou duvidas recorrentes',
      'necessidade de verificar, limpar, contar ou neutralizar para reduzir ansiedade',
      'alivio breve depois do ritual',
      'retorno rapido da duvida ou da intrusao',
    ],
    behaviors: [
      'a pessoa tenta resistir, mas acaba repetindo atos ou pedidos de confirmacao para seguir a rotina',
      'consegue manter parte do dia funcionando, embora perca tempo relevante com verificacoes e rituais',
      'oscila entre criticar o proprio exagero e voltar ao mesmo comportamento quando a ansiedade sobe',
    ],
    ambiguityLayers: [
      'em leitura superficial, o caso pode parecer apenas ansiedade elevada ou perfeccionismo',
      'o quadro admite confusao com preocupacao comum ate ficar claro o ciclo intrusao-neutralizacao',
      'o desafio esta em separar duvida cotidiana de ritual compulsivo com alivio breve',
    ],
    differentiators: [
      'a resposta correta precisa explicar obsessoes e compulsao, nao apenas medo difuso',
      'o diferencial depende de reconhecer a funcao ansiolítica do ritual',
      'o caso favorece TOC quando a repeticao serve para neutralizar a intrusao e nao so para se tranquilizar genericamente',
    ],
  },
  'Trauma e Estresse': {
    symptoms: [
      'lembrancas intrusivas ou sonhos ligados a evento marcante',
      'evitacao de pessoas, lugares ou temas associados ao ocorrido',
      'irritabilidade, alerta aumentado ou piora do sono',
      'reatividade intensa a gatilhos que lembram o evento',
    ],
    behaviors: [
      'retoma parte da rotina, mas muda trajetos, evita conversas e interrompe atividades diante de gatilhos',
      'tenta seguir funcionando, embora familiares notem afastamento e sobressalto frequente',
      'organiza o dia para nao encontrar pistas ligadas ao episodio, sem conseguir sustentar isso sempre',
    ],
    ambiguityLayers: [
      'pode lembrar ansiedade ou depressao se o leitor ignorar a relacao com o evento',
      'o caso nao entrega tudo de imediato porque trauma, evitacao e hiperreatividade aparecem distribuídos',
      'a dificuldade esta em conectar os sintomas ao evento precipitante e nao so ao estresse atual',
    ],
    differentiators: [
      'a resposta correta exige integrar trauma, gatilhos e reatividade no mesmo quadro',
      'o diferencial fica mais claro quando se observa que a evitacao e ligada ao evento e nao apenas a sobrecarga geral',
      'o caso sustenta transtorno relacionado a trauma mais do que um quadro ansioso inespecifico',
    ],
  },
  'Sintomas Somaticos': {
    symptoms: [
      'sintomas corporais persistentes como dor, aperto ou fraqueza',
      'preocupacao acentuada com a gravidade das sensacoes fisicas',
      'tempo excessivo gasto monitorando ou pesquisando o corpo',
      'procura recorrente por explicacao ou seguranca medica',
    ],
    behaviors: [
      'mantem parte da rotina, mas interrompe tarefas quando percebe mudancas fisicas e volta ao tema repetidamente',
      'alterna momentos de seguir com o dia e momentos de focar intensamente nas sensacoes corporais',
      'reorganiza compromissos, pesquisas e conversas em funcao dos sintomas atuais',
    ],
    ambiguityLayers: [
      'o caso pode confundir com ansiedade de doenca, panico ou TAG se o leitor focar so na preocupacao',
      'a dificuldade esta em perceber que os sintomas somaticos presentes sao o centro do sofrimento',
      'existe ambiguidade justa, mas o texto ainda mostra resposta desproporcional aos sintomas atuais',
    ],
    differentiators: [
      'a resposta correta depende de reconhecer sintomas fisicos presentes mais investimento excessivo neles',
      'o diferencial com ansiedade de doenca aparece quando o sofrimento gira em torno do sintoma atual e nao apenas do medo de adoecer',
      'o caso favorece sintomas somaticos porque o corpo organiza a rotina e a interpretacao do risco',
    ],
  },
}

const anchoredDiagnosticProfiles: Partial<Record<string, AnchoredDiagnosticProfile>> = {
  gad: {
    openings: [
      'passa boa parte dos dias preocupada com trabalho ou estudo, saude da familia e responsabilidades financeiras ao mesmo tempo',
      'vive antecipando problemas em varias areas da vida, mesmo quando nao existe um motivo unico e imediato',
      'relata preocupacao quase diaria com desempenho, compromissos comuns e bem-estar de pessoas proximas',
    ],
    coreSignals: [
      'mesmo quando tenta relaxar, a mente rapidamente encontra novos cenarios para se preocupar',
      'descreve dificuldade real para interromper a cadeia de pensamentos e voltar ao que estava fazendo',
      'permanece em alerta na maior parte dos dias, sem limitar o medo a um unico gatilho',
    ],
    behaviors: [
      'revisa decisoes simples varias vezes, pede confirmacao e adia tarefas por medo de errar',
      'demora para dormir porque continua imaginando problemas e respostas para cada possibilidade',
      'gasta energia tentando deixar tudo sob controle e ainda assim sente que algo pode dar errado',
    ],
    impacts: [
      'o quadro ja aparece com tensao muscular, cansaco, irritabilidade e dificuldade de concentracao',
      'a preocupacao constante reduziu rendimento, descanso e tolerancia a imprevistos',
      'a rotina ficou mais lenta porque a pessoa se prende a cenarios negativos antes de agir',
    ],
    exclusions: [
      'o medo nao fica restrito a uma situacao social especifica nem a um objeto unico',
      'o nucleo do caso nao sao crises abruptas isoladas, e sim preocupacao ampla e persistente',
      'nao ha ritual compulsivo central; o sofrimento principal vem da preocupacao difusa e dificil de controlar',
    ],
    mediumLayers: [
      'a tentativa de prevenir todos os problemas alimenta ainda mais a sensacao de sobrecarga',
      'quanto mais busca certeza, mais novos temas entram na corrente de preocupacao',
      'o proprio esforco de controle amplia a fadiga mental ao longo da semana',
    ],
  },
  panic: {
    openings: [
      'teve episodios subitos de medo intenso em atividades comuns, sem um unico gatilho previsivel',
      'passou a apresentar crises abruptas de intensa ativacao fisica, inclusive em momentos aparentemente corriqueiros',
      'relata ataques repentinos que atingem pico em poucos minutos e interrompem o que estava fazendo',
    ],
    coreSignals: [
      'nas crises surgem taquicardia, falta de ar, tremor, tontura e sensacao de perder o controle ou morrer',
      'depois dos episodios, ficou muito atento a qualquer sensacao corporal parecida com o inicio de uma nova crise',
      'o medo de ter outro ataque persistiu mesmo nos dias em que nao houve nova crise',
    ],
    behaviors: [
      'mudou trajetos, evita sair sozinho ou leva estrategias de seguranca por receio de uma nova crise',
      'interrompe atividades ao menor sinal fisico e monitora o corpo o tempo todo',
      'organiza a rotina tentando prevenir outro episodio repentino de medo intenso',
    ],
    impacts: [
      'a rotina ficou mais restrita porque a pessoa passou a funcionar em torno do medo de recorrencia',
      'o prejuizo aparece em deslocamentos, trabalho ou estudo pela necessidade constante de sentir seguranca',
      'mesmo entre as crises, o medo antecipatorio consome tempo e energia',
    ],
    exclusions: [
      'o problema central nao e um objeto especifico nem apenas ser julgado socialmente',
      'o quadro gira em torno de crises abruptas e do medo persistente de novas crises',
      'nao se trata de preocupacao difusa sobre varios temas ao longo do dia, e sim de episodios intensos com medo de recorrencia',
    ],
    mediumLayers: [
      'o monitoramento corporal passou a funcionar como gatilho para novas espirais de medo',
      'a tentativa de evitar sensacoes fisicas aumentou a vigilancia sobre o proprio corpo',
      'o caso se mantem pela combinacao entre crise aguda e medo prolongado de repeticao',
    ],
  },
  agoraphobia: {
    openings: [
      'fica muito ansiosa em onibus lotados, filas longas, shopping centers ou outros lugares dos quais imagina ser dificil sair rapidamente',
      'evita metro, cinema, ponte ou locais amplos quando pensa que pode passar mal e nao conseguir ajuda',
      'sente forte desconforto em ambientes nos quais escapar ou receber socorro parece complicado',
    ],
    coreSignals: [
      'o medo principal e passar mal, perder o controle ou precisar sair sem conseguir ajuda a tempo',
      'a ansiedade aumenta quando esta longe de uma saida facil ou quando precisa enfrentar esses lugares sozinha',
      'a sensacao de aprisionamento pesa mais do que a ideia de avaliacao social',
    ],
    behaviors: [
      'so aceita ir a esses lugares acompanhada, perto da saida ou com plano de fuga bem definido',
      'cancela compromissos se imagina ficar presa em um local dificil de abandonar',
      'limita trajetos e deslocamentos para nao se expor a situacoes em que seria dificil escapar',
    ],
    impacts: [
      'a area de circulacao da rotina encolheu e isso ja prejudica estudo, trabalho, lazer ou autonomia',
      'a evitacao de lugares especificos criou dependencia de companhia e reorganizacao da agenda',
      'o prejuizo aparece porque a pessoa deixa de comparecer a compromissos para manter sensacao de seguranca',
    ],
    exclusions: [
      'o foco nao e um objeto unico nem a avaliacao negativa de outras pessoas',
      'o nucleo do caso e a dificuldade imaginada de escapar ou receber ajuda nesses contextos',
      'pode haver medo de sensacoes fisicas, mas o padrao que se mantem e a evitacao de lugares e nao apenas a crise em si',
    ],
    mediumLayers: [
      'a necessidade de prever rotas de fuga passou a organizar boa parte das decisoes do dia',
      'a dependencia de companhia ou de lugares proximos da saida reforca a manutencao do quadro',
      'o medo se expandiu para diferentes cenarios com a mesma logica de falta de escape',
    ],
  },
  social_anxiety: {
    openings: [
      'fica muito ansiosa em seminarios, apresentacoes ou quando precisa falar diante de outras pessoas',
      'evita interacoes nas quais pode ser observada, julgada ou colocada em evidencia',
      'entra em forte alerta quando precisa conversar com desconhecidos, responder em publico ou ser avaliada socialmente',
    ],
    coreSignals: [
      'o foco do medo e parecer ridicula, tremer, corar, gaguejar ou ser julgada negativamente',
      'antes dessas situacoes, passa horas antecipando vergonha e possiveis criticas',
      'durante a exposicao, monitora cada detalhe do proprio desempenho e da reacao das pessoas',
    ],
    behaviors: [
      'ensaia em excesso, evita falar ou so participa quando consegue reduzir a chance de chamar atencao',
      'senta no fundo, pede para outra pessoa se expor ou inventa desculpas para nao participar',
      'depois da situacao, revive mentalmente o que disse e interpreta pequenos sinais como prova de fracasso',
    ],
    impacts: [
      'isso reduz participacao academica, oportunidades sociais e tarefas que exigem exposicao',
      'o prejuizo aparece porque a pessoa recusa experiencias importantes para evitar julgamento',
      'o medo de avaliacao negativa empobreceu contatos, apresentacoes e crescimento profissional ou escolar',
    ],
    exclusions: [
      'fora de situacoes de avaliacao social, o nivel de ansiedade cai bastante',
      'o medo central nao e ficar sem saida nem um objeto especifico, e sim ser julgado negativamente',
      'nao se trata de preocupacao difusa com varios dominios da vida, mas de exposicao social e desempenho',
    ],
    mediumLayers: [
      'a autovigilancia durante a exposicao acaba piorando a experiencia e reforcando a evitacao futura',
      'o caso se mantem pelo ciclo entre antecipacao, evitacao parcial e revisao pos-evento',
      'quanto mais tenta controlar a impressao passada, maior fica a tensao nas situacoes sociais',
    ],
  },
  specific_phobia: {
    openings: [
      'quando precisa entrar em elevadores fechados, sente medo imediato e vontade de sair antes mesmo de a porta fechar',
      'ao ficar perto de cachorros grandes, reage com medo intenso e tenta se afastar rapidamente',
      'so de pensar em agulhas, coleta de sangue ou vacinas, ja comeca a ficar tensa e evitar o compromisso',
      'quando imagina pegar aviao, passa a antecipar a experiencia com medo intenso e tenta cancelar a exposicao',
      'diante de lugares muito altos ou passarelas abertas, sente medo marcado e necessidade de recuar',
      'ao perceber tempestade forte se aproximando, fica focada em escapar da situacao e nao se expor',
    ],
    coreSignals: [
      'so de imaginar essa situacao, ja aparecem taquicardia, tremor ou aperto no corpo',
      'a reacao e rapida e concentrada nesse gatilho especifico, nao distribuida por toda a rotina',
      'a pessoa reconhece que o medo e desproporcional, mas ainda assim evita a exposicao',
    ],
    behaviors: [
      'muda rotas, falta a compromissos ou pede que outra pessoa resolva o que envolve esse gatilho',
      'aceita prejuizo pratico importante para nao se aproximar do objeto ou situacao temida',
      'organiza o dia para manter distancia do estimulo que desencadeia o medo',
    ],
    impacts: [
      'isso ja interfere em deslocamentos, consultas, viagens ou tarefas simples do cotidiano',
      'a evitacao tem custo funcional porque a pessoa perde oportunidades para nao se expor ao gatilho',
      'o prejuizo aparece quando compromissos dependem justamente da situacao temida',
    ],
    exclusions: [
      'fora desse gatilho circunscrito, nao descreve preocupacao ampla e constante com varios temas',
      'o medo nao esta centrado em julgamento social nem em ritual compulsivo, e sim nesse estimulo especifico',
      'o quadro nao depende de uma cadeia geral de incertezas, mas de exposicao a um objeto ou situacao delimitada',
    ],
    mediumLayers: [
      'a antecipacao do encontro com o gatilho ja basta para reorganizar a rotina em torno da evitacao',
      'o caso se mantem porque aliviar a ansiedade evitando o estimulo reforca o medo na exposicao seguinte',
      'a pessoa cria solucoes praticas para fugir do gatilho, mas isso amplia a dependencia da evitacao',
    ],
  },
  ocd: {
    openings: [
      'convive com pensamentos intrusivos de contaminacao, duvida de ter deixado algo destrancado ou medo de causar dano por descuido',
      'relata ideias recorrentes que invadem a mente contra a propria vontade e geram forte necessidade de neutralizacao',
      'passa por imagens ou duvidas repetitivas que reconhece como excessivas, mas nao consegue simplesmente largar',
    ],
    coreSignals: [
      'para aliviar a ansiedade, repete checagens, lavagens, contagens ou pedidos de confirmacao',
      'o alivio vem por pouco tempo e logo surge a sensacao de que precisa repetir o ritual',
      'mesmo percebendo exagero em parte do comportamento, sente que nao consegue interromper o ciclo com facilidade',
    ],
    behaviors: [
      'gasta muito tempo em rotinas repetitivas antes de conseguir sair de casa ou encerrar uma tarefa',
      'volta diversas vezes ao mesmo ponto para verificar, neutralizar ou ter certeza de que nada ruim aconteceu',
      'reformula a rotina em funcao de rituais que reduzem a ansiedade apenas temporariamente',
    ],
    impacts: [
      'o custo funcional aparece porque os rituais tomam tempo, energia e atrasam compromissos importantes',
      'o quadro interfere em estudo, trabalho ou convivencia pela repeticao inevitavel de atos ou pensamentos',
      'a rotina fica pesada porque a pessoa precisa concluir o ritual para sentir alivio momentaneo',
    ],
    exclusions: [
      'nao se trata apenas de preocupacao cotidiana ampla; ha intrusao seguida de neutralizacao repetitiva',
      'o medo nao depende de um unico objeto especifico nem apenas de avaliacao social',
      'o nucleo do caso e a combinacao entre obsessoes e compulsao para reduzir ansiedade',
    ],
    mediumLayers: [
      'quanto mais tenta resolver a duvida com certeza absoluta, mais o ciclo se alonga',
      'a necessidade de neutralizar a intrusao mantem o problema mesmo quando a pessoa critica o proprio comportamento',
      'o caso se sustenta pela sequencia intrusao, alivio breve e repeticao do ritual',
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

function pickDistinctValue(list: string[], selected: string, rng: () => number): string {
  const alternatives = list.filter((item) => item !== selected)
  return pickOne(alternatives.length > 0 ? alternatives : list, rng)
}

function selectHardCategoryBank(category: string): HardCategoryBank {
  const fallback: HardCategoryBank = {
    symptoms: [
      'sinais persistentes com impacto clinico em mais de uma area da vida',
      'sofrimento recorrente que altera rotina, sono ou desempenho',
      'mudancas observaveis de comportamento associadas a prejuizo funcional',
    ],
    behaviors: [
      'a pessoa reorganiza a rotina para tentar conter o desconforto, sem melhora sustentada',
      'familiares ou colegas notam queda funcional e mudancas repetidas de habitos',
      'o quadro interfere em compromissos, convivio ou capacidade de manter tarefas regulares',
    ],
    differentiators: [
      'o caso exige comparar hipoteses proximas, mas ainda oferece sinais suficientes para justificar a resposta correta',
      'a dificuldade esta em integrar sintomas, comportamento e impacto, nao em decifrar linguagem abstrata',
      'a resposta correta precisa explicar melhor o conjunto de sinais do que os diferenciais concorrentes',
    ],
  }

  return hardCategoryBanks[category] ?? fallback
}

function selectMediumCategoryBank(category: string): MediumCategoryBank {
  const fallback: MediumCategoryBank = {
    symptoms: [
      'sinais persistentes com impacto em mais de uma area da vida',
      'sofrimento clinicamente relevante que muda de intensidade conforme a rotina',
      'prejuizo observavel em desempenho, sono ou convivio',
    ],
    behaviors: [
      'a pessoa tenta manter a rotina, mas faz ajustes repetidos sem voltar ao funcionamento previo',
      'familiares ou colegas notam queda funcional mesmo quando ela ainda consegue cumprir parte das obrigacoes',
      'o quadro nao impede tudo de uma vez, mas exige cada vez mais esforco para manter compromissos usuais',
    ],
    ambiguityLayers: [
      'mais de uma hipotese pode parecer plausivel em uma leitura superficial',
      'a dificuldade esta em integrar sintomas e curso temporal sem depender de uma unica palavra-chave',
      'o caso exige diferenciar hipoteses proximas a partir de comportamento e impacto funcional',
    ],
    differentiators: [
      'a resposta correta precisa explicar melhor o conjunto de sinais do que as alternativas concorrentes',
      'o diferencial depende de observar qual padrao se repete na rotina e qual nao se sustenta',
      'o material oferece base suficiente para escolher a hipotese principal sem ficar nebuloso',
    ],
  }

  return mediumCategoryBanks[category] ?? fallback
}

function buildTitle(age: number, roleContext: RoleContext, difficulty: Difficulty, rng: () => number): string {
  const caseToken = Math.floor(rng() * 1296)
    .toString(36)
    .padStart(2, '0')
    .toUpperCase()

  if (difficulty === 'easy') {
    return `Caso de estudo: ${roleContext.setting} (${getAgeBandLabel(age)}, ref.${caseToken})`
  }

  return `${pickOne(titlePrefixes, rng)}: ${pickOne(titleAngles, rng)} na ${pickOne(titleDomains, rng)} ${pickOne(titleQualifiers, rng)} (${getAgeBandLabel(age)}, ${roleContext.setting}, ref.${caseToken})`
}

function buildAnchoredVignette(input: {
  disorder: Disorder
  name: string
  age: number
  roleContext: RoleContext
  rng: () => number
}): string | null {
  const profile = anchoredDiagnosticProfiles[input.disorder.id]

  if (!profile || input.disorder.difficulty === 'hard') {
    return null
  }

  const opening = pickOne(profile.openings, input.rng)
  const coreSignal = pickOne(profile.coreSignals, input.rng)
  const secondCoreSignal = pickDistinctValue(profile.coreSignals, coreSignal, input.rng)
  const behavior = pickOne(profile.behaviors, input.rng)
  const impact = pickOne(profile.impacts, input.rng)
  const exclusion = pickOne(profile.exclusions, input.rng)
  const timeline = buildTimeline(input.disorder.difficulty, input.rng)
  const progression = buildProgression(input.disorder.difficulty, input.rng)
  const mediumLayer = profile.mediumLayers?.length ? pickOne(profile.mediumLayers, input.rng) : null

  if (input.disorder.difficulty === 'easy') {
    return `${input.name}, ${input.age} anos, ${input.roleContext.role}, relata que ${opening}. ${coreSignal}. ${secondCoreSignal}. No dia a dia, ${behavior}. ${impact}. Na cronologia, ${timeline}, ${progression}. ${exclusion}.`
  }

  return `${input.name}, ${input.age} anos, ${input.roleContext.role}, apresenta quadro relevante ${input.roleContext.setting}. O relato se organiza em torno de ${opening}. ${coreSignal}. No manejo cotidiano, ${behavior}. ${mediumLayer ? `${mediumLayer}. ` : ''}${impact}. Em termos de curso, ${timeline}, ${progression}. Para o diferencial, chama atencao que ${exclusion}.`
}

function buildAnchoredClues(input: {
  caseId: string
  disorder: Disorder
  rng: () => number
}): CaseClue[] | null {
  const profile = anchoredDiagnosticProfiles[input.disorder.id]

  if (!profile || input.disorder.difficulty === 'hard') {
    return null
  }

  const opening = pickOne(profile.openings, input.rng)
  const coreSignal = pickOne(profile.coreSignals, input.rng)
  const secondCoreSignal = pickDistinctValue(profile.coreSignals, coreSignal, input.rng)
  const behavior = pickOne(profile.behaviors, input.rng)
  const impact = pickOne(profile.impacts, input.rng)
  const exclusion = pickOne(profile.exclusions, input.rng)
  const timeline = buildTimeline(input.disorder.difficulty, input.rng)
  const progression = buildProgression(input.disorder.difficulty, input.rng)
  const mediumLayer = profile.mediumLayers?.length ? pickOne(profile.mediumLayers, input.rng) : null

  const clueTexts =
    input.disorder.difficulty === 'easy'
      ? [
          `Queixa principal: ${opening}. ${coreSignal}.`,
          `Sinais centrais: ${secondCoreSignal}. No cotidiano, ${behavior}.`,
          `Curso: ${timeline}, ${progression}.`,
          `Impacto e diferencial: ${impact}. ${exclusion}.`,
        ]
      : [
          `Nucleo do caso: ${opening}. ${coreSignal}.`,
          `Pistas de manutencao: ${behavior}. ${secondCoreSignal}. ${mediumLayer ? `${mediumLayer}.` : ''}`,
          `Curso temporal: ${timeline}, ${progression}.`,
          `Impacto e contraste diagnostico: ${impact}. ${exclusion}.`,
        ]

  return clueTexts.map((text, index) => ({
    id: `${input.caseId}-clue-${index + 1}`,
    order: index + 1,
    type: clueTypeFlow[index],
    text,
  }))
}

function buildConcreteHardVignette(input: {
  disorder: Disorder
  name: string
  age: number
  roleContext: RoleContext
  rng: () => number
}): string {
  const bank = selectHardCategoryBank(input.disorder.category)
  const symptoms = pickManyUnique(bank.symptoms, 2, input.rng)
  const behavior = pickOne(bank.behaviors, input.rng)
  const differential = pickOne(bank.differentiators, input.rng)
  const impacts = pickManyUnique(functionalImpacts, 2, input.rng)
  const timeline = buildTimeline(input.disorder.difficulty, input.rng)
  const progression = buildProgression(input.disorder.difficulty, input.rng)

  return `${input.name}, ${input.age} anos, ${input.roleContext.role}, apresenta ${symptoms[0] ?? 'sofrimento clinicamente relevante'} e ${symptoms[1] ?? 'impacto funcional progressivo'} ${input.roleContext.setting}. No cotidiano, ${behavior}. Isso tem produzido ${impacts[0] ?? 'queda de rendimento em tarefas importantes'} e ${impacts[1] ?? 'atraso recorrente de compromissos'}. Na cronologia, ${timeline}, ${progression}. Para o diferencial, ${differential}.`
}

function pickClueDifferentials(correct: Disorder, rng: () => number): Disorder[] {
  const sameCategory = disorders.filter((item) => item.category === correct.category && item.id !== correct.id)
  const sameDifficulty = disorders.filter((item) => item.difficulty === correct.difficulty && item.id !== correct.id)
  const pool = sameCategory.length >= 2 ? sameCategory : sameDifficulty.length >= 2 ? sameDifficulty : disorders.filter((item) => item.id !== correct.id)
  return pickManyUnique(pool, 2, rng)
}

function buildConcreteHardClues(input: {
  caseId: string
  disorder: Disorder
  rng: () => number
}): CaseClue[] {
  const bank = selectHardCategoryBank(input.disorder.category)
  const symptoms = pickManyUnique(bank.symptoms, 2, input.rng)
  const behavior = pickOne(bank.behaviors, input.rng)
  const differential = pickOne(bank.differentiators, input.rng)
  const timeline = buildTimeline(input.disorder.difficulty, input.rng)
  const progression = buildProgression(input.disorder.difficulty, input.rng)
  const impacts = pickManyUnique(functionalImpacts, 2, input.rng)
  const differentialNames = pickClueDifferentials(input.disorder, input.rng).map((item) => item.namePt.toLowerCase())

  const clueTexts = [
    `Sinais principais: aparecem ${symptoms[0] ?? 'sinais persistentes'} e ${symptoms[1] ?? 'impacto funcional relevante'}.`,
    `Comportamento observavel: ${behavior}.`,
    `Curso e prejuizo: ${timeline}, ${progression}, com ${impacts[0] ?? 'queda de rendimento em tarefas importantes'} e ${impacts[1] ?? 'atraso recorrente de compromissos'}.`,
    `Diferenciais plausiveis: ${formatNaturalList(differentialNames) || 'hipoteses proximas da mesma categoria'}. Pista decisiva: ${differential}.`,
  ]

  return clueTexts.map((text, index) => ({
    id: `${input.caseId}-clue-${index + 1}`,
    order: index + 1,
    type: clueTypeFlow[index],
    text,
  }))
}

function buildConcreteMediumVignette(input: {
  disorder: Disorder
  name: string
  age: number
  roleContext: RoleContext
  rng: () => number
}): string {
  const bank = selectMediumCategoryBank(input.disorder.category)
  const symptoms = pickManyUnique(bank.symptoms, 2, input.rng)
  const behavior = pickOne(bank.behaviors, input.rng)
  const ambiguity = pickOne(bank.ambiguityLayers, input.rng)
  const differential = pickOne(bank.differentiators, input.rng)
  const impacts = pickManyUnique(functionalImpacts, 2, input.rng)
  const timeline = buildTimeline(input.disorder.difficulty, input.rng)
  const progression = buildProgression(input.disorder.difficulty, input.rng)

  return `${input.name}, ${input.age} anos, ${input.roleContext.role}, apresenta ${symptoms[0] ?? 'sinais persistentes'} e ${symptoms[1] ?? 'prejuizo funcional relevante'} ${input.roleContext.setting}. No cotidiano, ${behavior}. Isso ja trouxe ${impacts[0] ?? 'queda de rendimento em tarefas importantes'} e ${impacts[1] ?? 'dificuldade de manter regularidade de sono'}. ${ambiguity} Na cronologia, ${timeline}, ${progression}. Para o diferencial, ${differential}.`
}

function buildConcreteMediumClues(input: {
  caseId: string
  disorder: Disorder
  rng: () => number
}): CaseClue[] {
  const bank = selectMediumCategoryBank(input.disorder.category)
  const symptoms = pickManyUnique(bank.symptoms, 2, input.rng)
  const behavior = pickOne(bank.behaviors, input.rng)
  const ambiguity = pickOne(bank.ambiguityLayers, input.rng)
  const differential = pickOne(bank.differentiators, input.rng)
  const impacts = pickManyUnique(functionalImpacts, 2, input.rng)
  const timeline = buildTimeline(input.disorder.difficulty, input.rng)
  const progression = buildProgression(input.disorder.difficulty, input.rng)
  const differentialNames = pickClueDifferentials(input.disorder, input.rng).map((item) => item.namePt.toLowerCase())

  const clueTexts = [
    `Sinais principais: aparecem ${symptoms[0] ?? 'sinais persistentes'} e ${symptoms[1] ?? 'prejuizo funcional relevante'}.`,
    `Comportamento observavel: ${behavior}.`,
    `Curso e impacto: ${timeline}, ${progression}, com ${impacts[0] ?? 'queda de rendimento em tarefas importantes'} e ${impacts[1] ?? 'dificuldade de manter regularidade de sono'}.`,
    `Diferenciais em jogo: ${formatNaturalList(differentialNames) || 'hipoteses proximas da mesma categoria'}. Pista de leitura: ${ambiguity} ${differential}`,
  ]

  return clueTexts.map((text, index) => ({
    id: `${input.caseId}-clue-${index + 1}`,
    order: index + 1,
    type: clueTypeFlow[index],
    text,
  }))
}

function containsAbstractEasyLanguage(text: string): boolean {
  const normalized = removeAccents(text.toLowerCase())
  return abstractEasyFragments.some((fragment) => normalized.includes(removeAccents(fragment.toLowerCase())))
}

function validateEasyCase(input: {
  disorder: Disorder
  title: string
  vignette: string
  clues: CaseClue[]
}): boolean {
  if (input.disorder.difficulty !== 'easy') {
    return true
  }

  const combinedText = [input.title, input.vignette, ...input.clues.map((clue) => clue.text)].join(' ')
  if (containsAbstractEasyLanguage(combinedText)) {
    return false
  }

  const anchoredProfile = anchoredDiagnosticProfiles[input.disorder.id]
  if (input.disorder.category === 'Ansiedade') {
    return Boolean(anchoredProfile)
  }

  return input.clues.length >= 4
}

function containsAbstractHardLanguage(text: string): boolean {
  const normalized = removeAccents(text.toLowerCase())
  return abstractHardFragments.some((fragment) => normalized.includes(removeAccents(fragment.toLowerCase())))
}

function validateHardCase(input: {
  disorder: Disorder
  vignette: string
  clues: CaseClue[]
  differentials: Array<{ disorderId: string; whyNot: string }>
}): boolean {
  if (input.disorder.difficulty !== 'hard') {
    return true
  }

  const combinedText = [input.vignette, ...input.clues.map((clue) => clue.text)].join(' ')
  if (containsAbstractHardLanguage(combinedText)) {
    return false
  }

  const bank = selectHardCategoryBank(input.disorder.category)
  const normalized = removeAccents(combinedText.toLowerCase())
  const concreteMarkers = [...bank.symptoms, ...bank.behaviors, ...bank.differentiators].filter((marker) =>
    normalized.includes(removeAccents(marker.toLowerCase())),
  )

  return concreteMarkers.length >= 3 && input.differentials.length >= 2
}

function containsAbstractMediumLanguage(text: string): boolean {
  const normalized = removeAccents(text.toLowerCase())
  return abstractMediumFragments.some((fragment) => normalized.includes(removeAccents(fragment.toLowerCase())))
}

function validateMediumCase(input: {
  disorder: Disorder
  vignette: string
  clues: CaseClue[]
  differentials: Array<{ disorderId: string; whyNot: string }>
}): boolean {
  if (input.disorder.difficulty !== 'medium') {
    return true
  }

  const combinedText = [input.vignette, ...input.clues.map((clue) => clue.text)].join(' ')
  if (containsAbstractMediumLanguage(combinedText)) {
    return false
  }

  const anchoredProfile = anchoredDiagnosticProfiles[input.disorder.id]
  const markers =
    anchoredProfile
      ? [...anchoredProfile.coreSignals, ...anchoredProfile.behaviors, ...anchoredProfile.exclusions]
      : [
          ...selectMediumCategoryBank(input.disorder.category).symptoms,
          ...selectMediumCategoryBank(input.disorder.category).behaviors,
          ...selectMediumCategoryBank(input.disorder.category).differentiators,
        ]

  const normalized = removeAccents(combinedText.toLowerCase())
  const concreteMarkers = markers.filter((marker) => normalized.includes(removeAccents(marker.toLowerCase())))

  return concreteMarkers.length >= 3 && input.differentials.length >= 2
}

function buildVignette(input: {
  disorder: Disorder
  name: string
  age: number
  roleContext: RoleContext
  rng: () => number
}): string {
  const anchored = buildAnchoredVignette(input)

  if (anchored) {
    return anchored
  }

  const difficulty = input.disorder.difficulty
  const stressor = pickOne(stressors, input.rng)
  const signal = pickOne(categorySignals[input.disorder.category] ?? ['sofrimento emocional recorrente'], input.rng)
  const behaviorSnapshot = pickOne(behavioralSnapshotsByDifficulty[difficulty], input.rng)
  const internalLayer = pickOne(internalLayersByDifficulty[difficulty], input.rng)
  const timeline = buildTimeline(difficulty, input.rng)
  const progression = buildProgression(difficulty, input.rng)
  const categoryContext = selectCategoryContext(input.disorder.category)
  const contextSetting = pickOne(categoryContext.settings, input.rng)
  const copingAttempt = pickOne(categoryContext.copingAttempts, input.rng)
  const collateralSignal = pickOne(categoryContext.collateralSignals, input.rng)

  if (difficulty === 'easy') {
    return `${input.name}, ${input.age} anos, ${input.roleContext.role}, relata um problema que vem se repetindo ${input.roleContext.setting}. A dificuldade aparece ${contextSetting}, ${stressor}, e no dia a dia ${behaviorSnapshot}. Para lidar com isso, ${copingAttempt}; ${collateralSignal}. O quadro ja traz ${signal} e impacto concreto: ${internalLayer}. Na cronologia, ${timeline}, ${progression}.`
  }

  if (difficulty === 'medium') {
    return buildConcreteMediumVignette(input)
  }

  return buildConcreteHardVignette(input)
}

function createClues(input: {
  caseId: string
  disorder: Disorder
  roleContext: RoleContext
  rng: () => number
}): CaseClue[] {
  const anchored = buildAnchoredClues({
    caseId: input.caseId,
    disorder: input.disorder,
    rng: input.rng,
  })

  if (anchored) {
    return anchored
  }

  const difficulty = input.disorder.difficulty
  const summary = input.disorder.shortSummary.replace(/\.$/, '')
  const categoryHint = pickOne(categorySignals[input.disorder.category] ?? ['impacto funcional progressivo'], input.rng)
  const timeline = buildTimeline(input.disorder.difficulty, input.rng)
  const progression = buildProgression(input.disorder.difficulty, input.rng)
  const impacts = pickManyUnique(functionalImpacts, 3, input.rng)
  const behaviorSnapshot = pickOne(behavioralSnapshotsByDifficulty[difficulty], input.rng)
  const internalLayer = pickOne(internalLayersByDifficulty[difficulty], input.rng)
  const categoryContext = selectCategoryContext(input.disorder.category)
  const contextSetting = pickOne(categoryContext.settings, input.rng)
  const copingAttempt = pickOne(categoryContext.copingAttempts, input.rng)
  const collateralSignal = pickOne(categoryContext.collateralSignals, input.rng)

  const clueTextsByDifficulty: Record<Difficulty, string[]> = {
      easy: [
        `Queixa principal: o caso sugere ${summary}. A dificuldade fica mais evidente ${input.roleContext.setting}, especialmente ${contextSetting}.`,
        `Sinais observados: ${categoryHint}. Em termos concretos, ${behaviorSnapshot}; ${collateralSignal}.`,
        `Cronologia e manejo: ${timeline}, ${progression}. No enfrentamento, ${copingAttempt}.`,
        `Impacto funcional: ${impacts[0] ?? 'queda de desempenho'}, ${impacts[1] ?? 'evitacao social'} e ${impacts[2] ?? 'atraso de compromissos'}. Ponto importante: ${internalLayer}.`,
      ],
    medium: [
      ...buildConcreteMediumClues({
        caseId: input.caseId,
        disorder: input.disorder,
        rng: input.rng,
      }).map((clue) => clue.text),
    ],
    hard: buildConcreteHardClues({
      caseId: input.caseId,
      disorder: input.disorder,
      rng: input.rng,
    }).map((clue) => clue.text),
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
  const title = buildTitle(age, roleContext, disorder.difficulty, rng)
  const vignette = buildVignette({
    disorder,
    name,
    age,
    roleContext,
    rng,
  })
  const clues = createClues({
    caseId,
    disorder,
    roleContext,
    rng,
  })
  const differentials = buildDifferentials(disorder, rng)

  const safeHardContent =
    disorder.difficulty === 'hard' && !validateHardCase({ disorder, vignette, clues, differentials })
      ? {
          vignette: buildConcreteHardVignette({
            disorder,
            name,
            age,
            roleContext,
            rng,
          }),
          clues: buildConcreteHardClues({
            caseId,
            disorder,
            rng,
          }),
        }
      : {
          vignette,
          clues,
        }

  const safeMediumContent =
    disorder.difficulty === 'medium' && !validateMediumCase({ disorder, vignette, clues, differentials })
      ? {
          vignette: buildConcreteMediumVignette({
            disorder,
            name,
            age,
            roleContext,
            rng,
          }),
          clues: buildConcreteMediumClues({
            caseId,
            disorder,
            rng,
          }),
        }
      : {
          vignette,
          clues,
        }

  const safeTitle =
    disorder.difficulty === 'easy' && !validateEasyCase({ disorder, title, vignette, clues })
      ? `Caso de estudo: ${roleContext.setting} (${getAgeBandLabel(age)}, ref.${hashSeed(input.seed).toString(36).slice(0, 2).toUpperCase()})`
      : title

  return {
    id: caseId,
    title: safeTitle,
    category: disorder.category,
    difficulty: disorder.difficulty,
    vignette: disorder.difficulty === 'hard' ? safeHardContent.vignette : safeMediumContent.vignette,
    correctDisorderId: disorder.id,
    clues: disorder.difficulty === 'hard' ? safeHardContent.clues : safeMediumContent.clues,
    explanation: buildExplanation(disorder),
    differentials,
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
