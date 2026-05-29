import type { Case } from '../types/models'

export const cases: Case[] = [
  {
    id: 'case-001',
    title: 'Agenda sem descanso',
    category: 'Ansiedade',
    difficulty: 'easy',
    vignette:
      'Marina, 28 anos, relata que passa o dia antecipando problemas em várias áreas da vida e sente que não consegue “desligar a cabeça”.',
    correctDisorderId: 'gad',
    clues: [
      {
        id: 'c001-1',
        order: 1,
        type: 'symptoms',
        text: 'Preocupações frequentes com trabalho, família e finanças, mesmo sem ameaça imediata.',
      },
      {
        id: 'c001-2',
        order: 2,
        type: 'duration',
        text: 'Esse padrão vem acontecendo quase todos os dias há mais de 8 meses.',
      },
      {
        id: 'c001-3',
        order: 3,
        type: 'impairment',
        text: 'Dorme mal, apresenta tensão muscular e queda de rendimento no trabalho.',
      },
      {
        id: 'c001-4',
        order: 4,
        type: 'exclusion',
        text: 'Não descreve ataques súbitos intensos nem medo central de locais específicos.',
      },
    ],
    explanation:
      'O quadro sugere ansiedade generalizada por envolver preocupação ampla, persistente e difícil de controlar, com prejuízo funcional.',
    differentials: [
      {
        disorderId: 'panic',
        whyNot:
          'No pânico, o foco costuma ser ataques abruptos e medo de novos episódios, o que não é o eixo principal aqui.',
      },
      {
        disorderId: 'social_anxiety',
        whyNot:
          'A ansiedade social é mais centrada em avaliação negativa em situações sociais específicas.',
      },
    ],
    tags: ['preocupacao', 'sono', 'tensao'],
    sourceNote: 'Caso fictício autoral para estudo.',
    status: 'approved',
  },
  {
    id: 'case-002',
    title: 'Medo do próximo ataque',
    category: 'Ansiedade',
    difficulty: 'medium',
    vignette:
      'Rafael, 31 anos, teve episódios súbitos de medo intenso com sensação de morte iminente e agora evita sair sozinho.',
    correctDisorderId: 'panic',
    clues: [
      {
        id: 'c002-1',
        order: 1,
        type: 'chief_complaint',
        text: 'Crises com palpitações, falta de ar e tremor que atingem pico em poucos minutos.',
      },
      {
        id: 'c002-2',
        order: 2,
        type: 'duration',
        text: 'Após as crises, passou semanas preocupado com um novo episódio.',
      },
      {
        id: 'c002-3',
        order: 3,
        type: 'impairment',
        text: 'Mudou rotina, evita transporte público e ficou mais ausente no trabalho.',
      },
      {
        id: 'c002-4',
        order: 4,
        type: 'exclusion',
        text: 'Exames clínicos recentes não explicam os episódios e não há uso de substâncias associado às crises.',
      },
    ],
    explanation:
      'A combinação de ataques de pânico recorrentes com preocupação persistente e evitação comportamental aponta para transtorno do pânico.',
    differentials: [
      {
        disorderId: 'gad',
        whyNot:
          'Na ansiedade generalizada, o sofrimento costuma ser contínuo e difuso, não centrado em ataques súbitos.',
      },
      {
        disorderId: 'ptsd',
        whyNot:
          'No TEPT, os sintomas estão vinculados a um evento traumático específico com revivescência e evitação de gatilhos relacionados.',
      },
    ],
    tags: ['crise', 'evitacao', 'medo antecipatorio'],
    sourceNote: 'Caso fictício autoral para estudo.',
    status: 'approved',
  },
  {
    id: 'case-003',
    title: 'Apresentação em sala',
    category: 'Ansiedade',
    difficulty: 'medium',
    vignette:
      'Bruna, 22 anos, evita seminários na faculdade porque teme ser humilhada ao falar em público.',
    correctDisorderId: 'social_anxiety',
    clues: [
      {
        id: 'c003-1',
        order: 1,
        type: 'symptoms',
        text: 'Antes de interações sociais, sente taquicardia, rubor e pensamento de que todos notarão seu nervosismo.',
      },
      {
        id: 'c003-2',
        order: 2,
        type: 'duration',
        text: 'Esse medo social está presente desde o ensino médio e piorou na universidade.',
      },
      {
        id: 'c003-3',
        order: 3,
        type: 'impairment',
        text: 'Perdeu nota em disciplinas por faltar em atividades que exigiam exposição.',
      },
      {
        id: 'c003-4',
        order: 4,
        type: 'differential',
        text: 'Quando está entre amigos próximos, o desconforto cai de forma importante.',
      },
    ],
    explanation:
      'O medo intenso de avaliação negativa em contextos sociais, associado à evitação e prejuízo acadêmico, favorece ansiedade social.',
    differentials: [
      {
        disorderId: 'panic',
        whyNot:
          'No pânico, as crises podem ocorrer fora de situações sociais e o medo principal gira em torno de novas crises.',
      },
      {
        disorderId: 'gad',
        whyNot:
          'Na TAG, as preocupações são mais amplas e não predominantemente ligadas à exposição social.',
      },
    ],
    tags: ['avaliacao social', 'universidade', 'evitacao'],
    sourceNote: 'Caso fictício autoral para estudo.',
    status: 'approved',
  },
  {
    id: 'case-004',
    title: 'Sem energia para as rotinas',
    category: 'Humor',
    difficulty: 'easy',
    vignette:
      'Carlos, 37 anos, relata semanas de desânimo, perda de interesse em atividades antes prazerosas e sensação de inutilidade.',
    correctDisorderId: 'mdd',
    clues: [
      {
        id: 'c004-1',
        order: 1,
        type: 'symptoms',
        text: 'Redução de energia, dificuldade de concentração e alteração do sono.',
      },
      {
        id: 'c004-2',
        order: 2,
        type: 'duration',
        text: 'Os sintomas persistem quase diariamente há cerca de 2 meses.',
      },
      {
        id: 'c004-3',
        order: 3,
        type: 'impairment',
        text: 'Passou a faltar ao trabalho e se afastou de amigos e familiares.',
      },
      {
        id: 'c004-4',
        order: 4,
        type: 'exclusion',
        text: 'Não há histórico recente de períodos com energia aumentada e redução da necessidade de sono.',
      },
    ],
    explanation:
      'Humor deprimido, anedonia, persistência dos sintomas e prejuízo global sustentam hipótese de transtorno depressivo maior.',
    differentials: [
      {
        disorderId: 'bipolar_2',
        whyNot:
          'No bipolar II é essencial investigar episódios de hipomania no histórico longitudinal, ausentes neste caso.',
      },
      {
        disorderId: 'gad',
        whyNot:
          'Embora ansiedade possa coexistir, o núcleo do caso é depressivo com perda de interesse acentuada.',
      },
    ],
    tags: ['humor deprimido', 'anedonia', 'prejuizo ocupacional'],
    sourceNote: 'Caso fictício autoral para estudo.',
    status: 'approved',
  },
  {
    id: 'case-005',
    title: 'Altos e baixos no mesmo ano',
    category: 'Humor',
    difficulty: 'hard',
    vignette:
      'Letícia, 26 anos, alterna períodos de tristeza profunda com fases de energia acima do habitual e impulsividade.',
    correctDisorderId: 'bipolar_2',
    clues: [
      {
        id: 'c005-1',
        order: 1,
        type: 'symptoms',
        text: 'Nos períodos de energia alta, dorme pouco, fala mais rápido e inicia vários projetos ao mesmo tempo.',
      },
      {
        id: 'c005-2',
        order: 2,
        type: 'duration',
        text: 'As fases de ativação duram alguns dias e são seguidas por semanas de humor deprimido.',
      },
      {
        id: 'c005-3',
        order: 3,
        type: 'impairment',
        text: 'Teve conflitos financeiros por compras impulsivas e queda de desempenho após fases depressivas.',
      },
      {
        id: 'c005-4',
        order: 4,
        type: 'differential',
        text: 'Não houve episódios de desorganização extrema ou necessidade de internação por humor elevado.',
      },
    ],
    explanation:
      'A presença de episódios depressivos associados a períodos de hipomania favorece transtorno bipolar tipo II.',
    differentials: [
      {
        disorderId: 'mdd',
        whyNot:
          'A depressão maior isolada não explica os períodos de ativação com menor necessidade de sono e impulsividade.',
      },
      {
        disorderId: 'bpd',
        whyNot:
          'No borderline, a oscilação afetiva costuma ser mais reativa a eventos interpessoais imediatos e menos episódica.',
      },
    ],
    tags: ['hipomania', 'depressao', 'curso longitudinal'],
    sourceNote: 'Caso fictício autoral para estudo.',
    status: 'approved',
  },
  {
    id: 'case-006',
    title: 'Rituais para aliviar culpa',
    category: 'Obsessivo-compulsivo',
    difficulty: 'medium',
    vignette:
      'Thiago, 24 anos, passa muito tempo conferindo portas e tomadas para aliviar medo de causar acidentes.',
    correctDisorderId: 'ocd',
    clues: [
      {
        id: 'c006-1',
        order: 1,
        type: 'symptoms',
        text: 'Relata pensamentos intrusivos de que “algo ruim vai acontecer por sua culpa”.',
      },
      {
        id: 'c006-2',
        order: 2,
        type: 'impairment',
        text: 'Demora mais de uma hora por dia em checagens repetitivas antes de sair de casa.',
      },
      {
        id: 'c006-3',
        order: 3,
        type: 'duration',
        text: 'O padrão vem se mantendo por aproximadamente um ano.',
      },
      {
        id: 'c006-4',
        order: 4,
        type: 'exclusion',
        text: 'Reconhece exagero nos rituais, mas sente alívio apenas quando repete as checagens.',
      },
    ],
    explanation:
      'Obsessões de dano e compulsões de checagem, com gasto de tempo e prejuízo, são compatíveis com transtorno obsessivo-compulsivo.',
    differentials: [
      {
        disorderId: 'gad',
        whyNot:
          'Na TAG pode haver preocupação constante, mas sem rituais compulsivos estruturados como principal estratégia de alívio.',
      },
      {
        disorderId: 'bpd',
        whyNot:
          'O caso não gira em torno de instabilidade interpessoal e impulsividade afetiva persistente.',
      },
    ],
    tags: ['obsessao', 'compulsao', 'checagem'],
    sourceNote: 'Caso fictício autoral para estudo.',
    status: 'approved',
  },
  {
    id: 'case-007',
    title: 'Volta do acidente',
    category: 'Trauma e Estresse',
    difficulty: 'hard',
    vignette:
      'Sonia, 41 anos, sobreviveu a um grave acidente rodoviário e desde então evita dirigir e tem pesadelos recorrentes.',
    correctDisorderId: 'ptsd',
    clues: [
      {
        id: 'c007-1',
        order: 1,
        type: 'symptoms',
        text: 'Descreve revivescências intensas quando escuta barulho de freio e sente como se “estivesse lá de novo”.',
      },
      {
        id: 'c007-2',
        order: 2,
        type: 'duration',
        text: 'Os sintomas persistem há cerca de 5 meses após o evento traumático.',
      },
      {
        id: 'c007-3',
        order: 3,
        type: 'impairment',
        text: 'Passou a evitar trajetos longos, teve irritabilidade e queda no convívio familiar.',
      },
      {
        id: 'c007-4',
        order: 4,
        type: 'exclusion',
        text: 'Os sintomas estão fortemente ligados ao trauma, não apenas a preocupações cotidianas.',
      },
    ],
    explanation:
      'Revivescência, evitação e hiperreatividade após trauma com prejuízo funcional indicam transtorno de estresse pós-traumático.',
    differentials: [
      {
        disorderId: 'gad',
        whyNot:
          'Na TAG, a preocupação tende a ser difusa e não centrada em reexperiência de um trauma específico.',
      },
      {
        disorderId: 'panic',
        whyNot:
          'Ataques de pânico podem coexistir, mas o núcleo aqui é a resposta persistente ao trauma.',
      },
    ],
    tags: ['trauma', 'revivescencia', 'evitacao'],
    sourceNote: 'Caso fictício autoral para estudo.',
    status: 'approved',
  },
  {
    id: 'case-008',
    title: 'Múltiplas abas, poucas entregas',
    category: 'Neurodesenvolvimento',
    difficulty: 'medium',
    vignette:
      'Henrique, 29 anos, relata dificuldade crônica para organizar tarefas, atrasos frequentes e sensação de mente dispersa desde a adolescência.',
    correctDisorderId: 'adhd',
    clues: [
      {
        id: 'c008-1',
        order: 1,
        type: 'symptoms',
        text: 'Interrompe atividades pela metade, esquece compromissos e perde objetos no dia a dia.',
      },
      {
        id: 'c008-2',
        order: 2,
        type: 'duration',
        text: 'Sinais semelhantes já apareciam em contexto escolar, segundo relatos familiares.',
      },
      {
        id: 'c008-3',
        order: 3,
        type: 'impairment',
        text: 'No trabalho, acumula pendências e recebe feedbacks recorrentes sobre desorganização.',
      },
      {
        id: 'c008-4',
        order: 4,
        type: 'differential',
        text: 'Oscilação de humor existe, mas não em episódios bem delimitados de elevação de energia.',
      },
    ],
    explanation:
      'Padrão persistente de desatenção com início precoce e presença em múltiplos contextos é compatível com TDAH.',
    differentials: [
      {
        disorderId: 'bipolar_2',
        whyNot:
          'No bipolar II, os períodos de ativação costumam ser episódicos; aqui o padrão é estável e de longa data.',
      },
      {
        disorderId: 'mdd',
        whyNot:
          'A dificuldade atencional não se restringe a um episódio depressivo atual.',
      },
    ],
    tags: ['desatencao', 'organizacao', 'funcionamento adulto'],
    sourceNote: 'Caso fictício autoral para estudo.',
    status: 'approved',
  },
  {
    id: 'case-009',
    title: 'Relações em tempestade',
    category: 'Personalidade',
    difficulty: 'hard',
    vignette:
      'Nina, 27 anos, descreve relações intensas e instáveis, medo de abandono e episódios de impulsividade após conflitos interpessoais.',
    correctDisorderId: 'bpd',
    clues: [
      {
        id: 'c009-1',
        order: 1,
        type: 'symptoms',
        text: 'Oscila rapidamente entre idealização e desvalorização de pessoas próximas.',
      },
      {
        id: 'c009-2',
        order: 2,
        type: 'impairment',
        text: 'Conflitos repetidos levaram a rupturas afetivas e faltas no trabalho.',
      },
      {
        id: 'c009-3',
        order: 3,
        type: 'duration',
        text: 'O padrão é observado há anos, em diferentes relações.',
      },
      {
        id: 'c009-4',
        order: 4,
        type: 'differential',
        text: 'Os picos emocionais costumam ocorrer após gatilhos interpessoais imediatos.',
      },
    ],
    explanation:
      'A instabilidade afetiva e relacional persistente, somada à impulsividade e medo de abandono, aponta para padrão borderline.',
    differentials: [
      {
        disorderId: 'bipolar_2',
        whyNot:
          'No bipolar II, as mudanças de humor tendem a formar episódios com duração mais definida.',
      },
      {
        disorderId: 'mdd',
        whyNot:
          'A depressão pode ocorrer, mas não explica sozinha a instabilidade interpessoal crônica.',
      },
    ],
    tags: ['instabilidade', 'impulsividade', 'relacoes'],
    sourceNote: 'Caso fictício autoral para estudo.',
    status: 'approved',
  },
  {
    id: 'case-010',
    title: 'Promessas de parar no fim de semana',
    category: 'Uso de Substâncias',
    difficulty: 'easy',
    vignette:
      'Eduardo, 34 anos, tenta reduzir o consumo de álcool há meses, mas retorna ao padrão anterior mesmo após consequências negativas.',
    correctDisorderId: 'aud',
    clues: [
      {
        id: 'c010-1',
        order: 1,
        type: 'chief_complaint',
        text: 'Refere perda de controle sobre quantidade e frequência de bebida em eventos sociais e em casa.',
      },
      {
        id: 'c010-2',
        order: 2,
        type: 'impairment',
        text: 'Já faltou ao trabalho por ressaca e teve conflitos familiares relacionados ao consumo.',
      },
      {
        id: 'c010-3',
        order: 3,
        type: 'duration',
        text: 'O padrão se mantém por mais de um ano, com tentativas de corte sem sucesso.',
      },
      {
        id: 'c010-4',
        order: 4,
        type: 'differential',
        text: 'Mantém o comportamento mesmo reconhecendo danos pessoais e profissionais.',
      },
    ],
    explanation:
      'Persistência do uso, perda de controle e manutenção apesar de prejuízo sugerem transtorno por uso de álcool.',
    differentials: [
      {
        disorderId: 'mdd',
        whyNot:
          'Sintomas depressivos podem coexistir, mas não explicam o padrão de consumo desadaptativo central.',
      },
      {
        disorderId: 'gad',
        whyNot:
          'Ansiedade pode ser gatilho para beber, porém o caso é estruturado por comportamento de uso problemático.',
      },
    ],
    tags: ['alcool', 'controle', 'prejuizo funcional'],
    sourceNote: 'Caso fictício autoral para estudo.',
    status: 'approved',
  },
]

export const approvedCases = cases.filter((item) => item.status === 'approved')
