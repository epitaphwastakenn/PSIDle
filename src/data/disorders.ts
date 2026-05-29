import type { Disorder } from '../types/models'

export const disorders: Disorder[] = [
  {
    id: 'mdd',
    namePt: 'Transtorno Depressivo Maior',
    nameOriginal: 'Major Depressive Disorder',
    category: 'Humor',
    aliases: ['depressao maior', 'episodio depressivo maior', 'tdm'],
    shortSummary:
      'Quadro de humor deprimido e perda de interesse, com impacto funcional em rotina e vínculos.',
    studyNote:
      'Observe duração, intensidade e prejuízo geral. Sempre avaliar risco e contexto psicossocial.',
    difficulty: 'easy',
  },
  {
    id: 'gad',
    namePt: 'Transtorno de Ansiedade Generalizada',
    nameOriginal: 'Generalized Anxiety Disorder',
    category: 'Ansiedade',
    aliases: ['tag', 'ansiedade generalizada'],
    shortSummary:
      'Preocupação excessiva, difícil de controlar e presente em múltiplas áreas da vida.',
    studyNote:
      'Diferencie de preocupação situacional transitória e de quadros centrados em pânico.',
    difficulty: 'easy',
  },
  {
    id: 'panic',
    namePt: 'Transtorno do Pânico',
    nameOriginal: 'Panic Disorder',
    category: 'Ansiedade',
    aliases: ['panico', 'ataques de panico', 'tp'],
    shortSummary:
      'Ataques abruptos de intenso medo e preocupação persistente com novos episódios.',
    studyNote:
      'A antecipação ansiosa e mudanças de comportamento mantêm o ciclo do transtorno.',
    difficulty: 'medium',
  },
  {
    id: 'social_anxiety',
    namePt: 'Transtorno de Ansiedade Social',
    nameOriginal: 'Social Anxiety Disorder',
    category: 'Ansiedade',
    aliases: ['fobia social', 'tas', 'ansiedade social'],
    shortSummary:
      'Medo marcante de avaliação negativa em situações de exposição social.',
    studyNote:
      'Verifique evitação, sofrimento antecipatório e impacto em escola, trabalho e relações.',
    difficulty: 'medium',
  },
  {
    id: 'ocd',
    namePt: 'Transtorno Obsessivo-Compulsivo',
    nameOriginal: 'Obsessive-Compulsive Disorder',
    category: 'Obsessivo-compulsivo',
    aliases: ['toc', 'obsessivo compulsivo'],
    shortSummary:
      'Pensamentos intrusivos e comportamentos repetitivos voltados à redução de ansiedade.',
    studyNote:
      'Compulsões podem ser observáveis ou mentais; investigar tempo gasto e prejuízo.',
    difficulty: 'medium',
  },
  {
    id: 'ptsd',
    namePt: 'Transtorno de Estresse Pós-Traumático',
    nameOriginal: 'Posttraumatic Stress Disorder',
    category: 'Trauma e Estresse',
    aliases: ['tept', 'estresse pos traumatico'],
    shortSummary:
      'Após evento traumático, surgem revivescência, evitação e hipervigilância persistentes.',
    studyNote:
      'Atenção para gatilhos, alterações cognitivas e impacto ocupacional e afetivo.',
    difficulty: 'hard',
  },
  {
    id: 'adhd',
    namePt: 'Transtorno de Déficit de Atenção/Hiperatividade',
    nameOriginal: 'Attention-Deficit/Hyperactivity Disorder',
    category: 'Neurodesenvolvimento',
    aliases: ['tdah', 'deficit de atencao'],
    shortSummary:
      'Padrão persistente de desatenção e/ou hiperatividade-impulsividade em mais de um contexto.',
    studyNote:
      'Considere histórico de desenvolvimento e presença dos sinais desde fases precoces.',
    difficulty: 'medium',
  },
  {
    id: 'bipolar_2',
    namePt: 'Transtorno Bipolar Tipo II',
    nameOriginal: 'Bipolar II Disorder',
    category: 'Humor',
    aliases: ['bipolar 2', 'tb2', 'transtorno bipolar ii'],
    shortSummary:
      'Alternância entre episódios depressivos e períodos de hipomania, sem mania franca.',
    studyNote:
      'O histórico longitudinal é essencial para diferenciar de depressão unipolar.',
    difficulty: 'hard',
  },
  {
    id: 'bpd',
    namePt: 'Transtorno de Personalidade Borderline',
    nameOriginal: 'Borderline Personality Disorder',
    category: 'Personalidade',
    aliases: ['tp borderline', 'borderline', 'tpb'],
    shortSummary:
      'Instabilidade afetiva, impulsividade e dificuldade persistente na regulação interpessoal.',
    studyNote:
      'Foque em padrão duradouro de funcionamento e não apenas em crises isoladas.',
    difficulty: 'hard',
  },
  {
    id: 'aud',
    namePt: 'Transtorno por Uso de Álcool',
    nameOriginal: 'Alcohol Use Disorder',
    category: 'Uso de Substâncias',
    aliases: ['uso de alcool', 'dependencia de alcool', 'tua'],
    shortSummary:
      'Uso problemático com perda de controle, persistência apesar de danos e prejuízo funcional.',
    studyNote:
      'Investigue padrão de consumo, tentativas de redução e consequências em múltiplas áreas.',
    difficulty: 'easy',
  },
]

export const disorderCategories = Array.from(
  new Set(disorders.map((disorder) => disorder.category)),
)
