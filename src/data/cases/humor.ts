import type { DisorderCaseSet } from './types'

export const humorCases: DisorderCaseSet[] = [
  {
    disorderId: 'mdd',
    reference: {
      label: 'Manual MSD (Profissional) — Transtornos depressivos',
      url: 'https://www.msdmanuals.com/pt/profissional/transtornos-psiqui%C3%A1tricos/transtornos-do-humor/transtornos-depressivos',
    },
    differential: {
      disorderId: 'bipolar_2',
      whyNot: 'Nunca houve dias seguidos de energia elevada, pouca necessidade de sono e euforia; sem um episódio hipomaníaco, um episódio depressivo isolado não basta para o Tipo II.',
    },
    explanation: 'Há poucos meses, quase todos os dias, humor deprimido e perda de interesse com pelo menos cinco sintomas: sono e apetite alterados com perda de peso, cansaço, lentidão, sentimento de inutilidade ou culpa, dificuldade de concentração e pensamentos de morte, com prejuízo no trabalho e na vida social. Exames normais e ausência de substâncias afastam causa orgânica. O quadro surgiu depois de um período de funcionamento normal, o que afasta o Transtorno Depressivo Persistente, e nunca houve fases de euforia ou energia elevada, o que afasta o Transtorno Bipolar Tipo II. No difícil, a queixa física perde importância diante dos exames normais, sem preocupação excessiva com a saúde.',
    giveaways: [],
    variants: [
      {
        level: 'easy',
        ages: [28, 45],
        text: `{nome}, {idade} anos, caixa de supermercado, procura a UBS porque se sente {deprimido|deprimida} o dia inteiro, quase todos os dias, há cerca de dois meses. Perdeu o gosto pelas coisas: largou o futebol de domingo, não tem vontade nem de ver televisão com os filhos e passa as folgas na cama.

Acorda às quatro da manhã sem conseguir voltar a dormir, come pouco e perdeu 6 kg. Diz que é um peso para a família e que às vezes pensa que seria melhor não acordar mais. Tem errado o troco por falta de concentração. Antes disso estava bem e nunca teve fases de euforia ou de energia fora do comum. Exames de sangue e de tireoide vieram normais; não bebe nem usa drogas.`,
        clues: [
          'Fala devagar, demora a responder e diz que até tomar banho virou um esforço enorme.',
          'O desânimo começou sem um motivo claro e foi piorando semana a semana; antes, levava a rotina de sempre.',
          'Recebeu uma advertência no trabalho e deixou de ir aos almoços de domingo na casa da mãe.',
          'Nunca passou dias seguidos dormindo pouco sem sentir cansaço, falando sem parar ou gastando além da conta.',
        ],
        rulesOut: 'nunca teve fases de euforia ou de energia fora do comum',
      },
      {
        level: 'medium',
        ages: [19, 25],
        text: `{nome}, {idade} anos, estudante de engenharia, é {levado|levada} ao serviço de saúde da universidade pela colega de apartamento. Há uns dois meses, desde a volta às aulas, quase não sai do quarto: dorme até o meio da tarde e ainda acorda {cansado|cansada}, faz uma refeição por dia e largou os ensaios da bateria universitária, de que tanto gostava.

A colega conta que {nome} chora no banho, diz que "não serve para nada" e já perguntou quem cuidaria do gato "se acontecesse alguma coisa". Perdeu três provas e emagreceu 5 kg. Até o semestre passado estava bem, com boas notas, e nunca houve época em que dormisse pouco e ficasse a mil. Exames recentes normais; não bebe nem usa drogas.`,
        clues: [
          'Responde às perguntas devagar, com poucas palavras, e se culpa por "dar trabalho" a todo mundo.',
          'A mudança começou há cerca de dois meses, sem nenhum acontecimento marcante antes, e piora a cada semana.',
          'Trancou duas matérias e parou de responder às mensagens da família e do grupo da bateria.',
          'A família confirma que {ele|ela} nunca teve dias de euforia, gastos fora do comum ou noites em claro sem sentir cansaço.',
        ],
        rulesOut: 'nunca houve época em que dormisse pouco e ficasse a mil',
      },
      {
        level: 'hard',
        ages: [55, 68],
        text: `{nome}, {idade} anos, feirante, chega ao ambulatório de clínica médica com o filho por ter perdido 8 kg em três meses e por dores pelo corpo. Com medo de câncer, a família pagou endoscopia, colonoscopia, tomografia e exames de sangue, inclusive de tireoide: tudo normal. {nome} recebe os resultados com um "tanto faz" e não volta a falar das dores.

O filho conta que {ele|ela} entregou a banca ao sobrinho, não acompanha mais os jogos do time e passa as tardes {sentado|sentada} olhando a rua. Acorda às três da madrugada, fala baixo e devagar e repete que "só dá trabalho". Toma há anos o mesmo remédio de pressão e não bebe. Sempre teve humor estável, sem fases de euforia ou de energia fora do comum.`,
        clues: [
          'Perdeu a vontade de comer até os pratos de que mais gostava e diz que não se importaria de "dormir e não acordar".',
          'A mudança começou há uns quatro meses, sem perda ou problema que a explique; a memória e as contas da casa seguem em dia.',
          'Não vai mais à igreja nem às festas da família, e os netos reclamam que {ele|ela} "não conversa mais".',
          'A família não lembra de nenhum período de dias seguidos em que {ele|ela} dormisse pouco, gastasse demais ou ficasse {agitado|agitada}.',
        ],
        rulesOut: 'sem fases de euforia ou de energia fora do comum',
      },
    ],
  },
  {
    disorderId: 'persistent_depressive_disorder',
    reference: {
      label: 'Manual MSD (Profissional) — Transtornos depressivos (transtorno depressivo persistente)',
      url: 'https://www.msdmanuals.com/pt/profissional/transtornos-psiqui%C3%A1tricos/transtornos-do-humor/transtornos-depressivos',
    },
    differential: {
      disorderId: 'mdd',
      whyNot: 'Os sintomas são poucos e mais brandos do que num episódio depressivo maior, nunca chegaram a semanas de piora intensa e estão presentes quase todos os dias há anos.',
    },
    explanation: 'Humor deprimido na maior parte do dia, na maioria dos dias, por bem mais de dois anos, sem intervalos bons maiores que dois meses, com pouca energia, baixa autoestima e desesperança. A pessoa segue funcionando, com esforço e prejuízo, e nunca teve um período de semanas com sintomas suficientes para um episódio depressivo maior, o que afasta o Transtorno Depressivo Maior. A ausência de fases de euforia afasta os quadros bipolares e o Ciclotímico; exames normais e ausência de álcool afastam causa orgânica. No difícil, o quadro antecede em muitos anos a separação, o que afasta o Transtorno de Adaptação.',
    giveaways: [],
    variants: [
      {
        level: 'easy',
        ages: [29, 45],
        text: `{nome}, {idade} anos, auxiliar administrativ{o|a}, procura a UBS porque vive "meio {deprimido|deprimida}" desde os 18 anos. Sente-se para baixo na maior parte dos dias, tem pouca energia e não acredita que a vida vá melhorar. Não lembra de ter passado mais de um mês inteiro bem.

Nunca deixou de trabalhar nem de cuidar da casa, mas faz tudo no esforço, e a família já se acostumou com o "jeito desanimado". Nunca teve semanas piores a ponto de parar a vida ou pensar em morrer, nem fases de euforia ou de energia de sobra. Os exames, inclusive de tireoide, vieram normais, e não bebe.`,
        clues: [
          'Acha-se menos capaz que os colegas e diz que, se foi {contratado|contratada}, foi por pura sorte.',
          'O desânimo começou no fim da adolescência e se mantém há mais de dez anos, com poucas variações.',
          'Recusou uma promoção por achar que não daria conta e quase não sai com os amigos nos fins de semana.',
          'Sono, apetite e peso seguem como sempre, e nunca houve um período de semanas em que tudo piorasse de uma vez.',
        ],
        rulesOut: 'Nunca teve semanas piores a ponto de parar a vida ou pensar em morrer',
      },
      {
        level: 'medium',
        ages: [35, 50],
        text: `{nome}, {idade} anos, técnic{o|a} de enfermagem, procura o ambulatório por cansaço; os exames, inclusive de tireoide, vieram normais. Na conversa, diz que "sempre foi assim": passa os fins de semana no sofá, acha que qualquer colega faria seu trabalho melhor e desconversa quando alguém faz um elogio.

O cônjuge confirma que {ele|ela} anda "{apagado|apagada}" na maior parte dos dias desde a faculdade, há uns quinze anos; as férias animam por uma semana, no máximo. Nunca houve semanas de piora: segue nos plantões, come e dorme bem e nunca falou em morrer. Ninguém lembra de fases de euforia ou de energia de sobra, e não bebe.`,
        clues: [
          'Quando fala do futuro, diz que não adianta fazer planos porque "nada muda mesmo".',
          'O desânimo começou aos poucos no início da faculdade e, desde então, nunca sumiu por mais de algumas semanas.',
          'Desistiu de concorrer a uma vaga de supervisão por achar que não daria conta e largou a especialização no meio.',
          'Mesmo nos piores meses, nunca perdeu o interesse por tudo nem passou semanas sem conseguir trabalhar.',
        ],
        rulesOut: 'Nunca houve semanas de piora',
      },
      {
        level: 'hard',
        ages: [42, 58],
        text: `{nome}, {idade} anos, bancári{o|a}, é {encaminhado|encaminhada} pela UBS ao ambulatório de saúde mental e atribui tudo à separação, há quatro meses: sente-se sem graça, {cansado|cansada} e sem perspectiva. Fala do fim do casamento com calma e diz que se dá bem com o ex-cônjuge.

A irmã, que {o|a} acompanha, discorda: "{nome} já era assim muito antes". Conta que, desde os vinte e poucos anos, {ele|ela} anda {desanimado|desanimada} quase todo dia, acha que os outros fazem tudo melhor e tem poucas semanas boas por ano. Mesmo depois da separação, trabalha normalmente, come e dorme bem. Nunca teve fases de euforia ou de energia de sobra. Exames de rotina normais; não bebe.`,
        clues: [
          'Diz que lê a mesma página várias vezes e custa a se concentrar em filmes ou conversas longas.',
          'Os prontuários da UBS registram queixas de desânimo e cansaço em consultas de mais de dez anos atrás, bem antes da separação.',
          'Recusou duas vezes a chance de virar gerente e quase não saía com os amigos, já muito antes do fim do casamento.',
          'Nem antes nem depois da separação houve semanas de piora intensa, perda de interesse por tudo ou ideias de morte.',
        ],
        rulesOut: 'Mesmo depois da separação, trabalha normalmente, come e dorme bem',
      },
    ],
  },
  {
    disorderId: 'bipolar_1',
    reference: {
      label: 'Manual MSD (Profissional) — Transtornos bipolares',
      url: 'https://www.msdmanuals.com/pt/profissional/transtornos-psiqui%C3%A1tricos/transtornos-do-humor/transtornos-bipolares',
    },
    differential: {
      disorderId: 'bipolar_2',
      whyNot: 'O episódio de humor elevado durou mais de uma semana, trouxe prejuízo grave e exigiu internação; no Tipo II, as fases elevadas são hipomaníacas, sem esse nível de gravidade.',
    },
    explanation: 'Episódio de humor elevado ou irritável com aumento de energia por mais de uma semana, com menor necessidade de sono, fala acelerada, fuga de ideias, grandiosidade, distração, aumento de atividade e gastos de risco, causando prejuízo grave e exigindo internação: é um episódio maníaco, suficiente para o Tipo I mesmo sem episódios depressivos. Exame toxicológico negativo e ausência de remédios ou doenças afastam causa induzida. No difícil, a queixa atual é de desânimo, mas a fase agitada do passado, com internação, define o Tipo I e afasta a depressão unipolar. Como houve mania completa, e não só hipomania, não se trata do Transtorno Bipolar Tipo II.',
    giveaways: [],
    variants: [
      {
        level: 'easy',
        ages: [19, 30],
        text: `{nome}, {idade} anos, vendedor{|a} numa loja de celulares, é {trazido|trazida} pela família ao pronto-atendimento. Há dez dias dorme duas ou três horas por noite sem sentir cansaço, fala sem parar, pula de um assunto para outro e diz que vai ficar milionári{o|a} com um aplicativo que inventou.

Gastou o dinheiro do aluguel em roupas e eletrônicos, pediu demissão aos gritos e brigou com vizinhos às três da manhã. A família diz que nunca tinha visto {nome} assim. O exame toxicológico deu negativo, a tireoide está normal e não toma nenhum remédio. Pelo risco de novas brigas e gastos, a equipe indica internação.`,
        clues: [
          'Na sala de espera, puxa conversa com todos, canta alto e se irrita quando pedem que espere a vez.',
          'A mudança começou em poucos dias, sem gatilho aparente, e se mantém o dia inteiro há mais de uma semana.',
          'Além do emprego perdido, deixou uma dívida de 15 mil reais no cartão e foi {levado|levada} à delegacia após uma briga.',
          'A agitação já passa de uma semana, trouxe perdas graves e exigiu internação para evitar novos riscos.',
        ],
        rulesOut: 'a equipe indica internação',
      },
      {
        level: 'medium',
        ages: [30, 45],
        text: `{nome}, {idade} anos, professor{|a} de matemática, é {levado|levada} ao pronto-atendimento pelo cônjuge e por um irmão. Há quase duas semanas passa as madrugadas escrevendo um "método revolucionário" de ensino, manda áudios de dez minutos para ex-alunos e fala tão rápido que ninguém consegue interromper.

Financiou um carro em 60 parcelas sem consultar ninguém e anunciou que vai se candidatar a prefeit{o|a}. Na escola, saiu no meio da aula para discutir com a diretora e foi {afastado|afastada}. Dorme duas horas por noite e diz estar "melhor do que nunca". Não usa drogas nem começou remédio novo, e o exame de urina veio limpo. A equipe opta pela internação.`,
        clues: [
          'Muda de assunto a cada frase, distrai-se com qualquer barulho do corredor e fica {irritado|irritada} quando é {contrariado|contrariada}.',
          'Aos 24 anos teve uma fase de tristeza profunda que durou meses; a agitação atual começou em poucos dias, sem gatilho.',
          'O cônjuge descobriu dívidas de 40 mil reais e precisou bloquear os cartões e a conta conjunta.',
          'Não são apenas dias mais produtivos: a fase já passa de uma semana, tirou {nome} do trabalho e exige internação.',
        ],
        rulesOut: 'A equipe opta pela internação.',
      },
      {
        level: 'hard',
        ages: [40, 55],
        text: `{nome}, {idade} anos, don{o|a} de uma pequena oficina, procura a UBS pedindo "um remédio para levantar o ânimo". Há um mês dorme mais de dez horas, só abre a oficina depois do almoço, perdeu o gosto por tudo e se culpa pelas dívidas. Um vizinho melhorou com um comprimido, e {ele|ela} quer o mesmo.

A irmã, que {o|a} acompanha, conta que as dívidas vêm de outra época: aos 28 anos, {nome} passou quase duas semanas dormindo duas horas por noite, fechando negócios com desconhecidos e falando em abrir uma rede de oficinas, até precisar de internação. A família chamou aquilo de "estafa". Na época não usava drogas nem remédios; os exames atuais estão normais.`,
        clues: [
          'Nas últimas semanas fala pouco e devagar, perdeu 4 kg e diz que a família estaria melhor sem {ele|ela}.',
          'Aquela fase agitada começou em poucos dias e só cedeu com a internação; depois dela, vieram outras duas fases longas de desânimo.',
          'Na fase agitada perdeu o sócio e o carro; agora a oficina está quase parada e os clientes sumiram.',
          'A fase dos 28 anos durou mais de uma semana, trouxe perdas graves e terminou em internação psiquiátrica, sem drogas envolvidas.',
        ],
        rulesOut: 'até precisar de internação',
      },
    ],
  },
  {
    disorderId: 'bipolar_2',
    reference: {
      label: 'Manual MSD (Profissional) — Transtornos bipolares',
      url: 'https://www.msdmanuals.com/pt/profissional/transtornos-psiqui%C3%A1tricos/transtornos-do-humor/transtornos-bipolares',
    },
    differential: {
      disorderId: 'mdd',
      whyNot: 'Além das fases de tristeza, houve períodos de quatro dias ou mais de energia elevada, pouco sono e aceleração, notados por outras pessoas; isso afasta a depressão unipolar.',
    },
    explanation: 'Pelo menos um episódio depressivo maior (duas semanas ou mais, com tristeza ou perda de interesse e cinco ou mais sintomas) e pelo menos um episódio hipomaníaco: quatro dias ou mais de humor e energia elevados, com menos sono, fala acelerada e aumento de atividade, notados por outras pessoas, sem prejuízo grave, sintomas psicóticos ou internação, por isso não é Transtorno Bipolar Tipo I. Os episódios ocorreram sem drogas ou remédios. A hipomania afasta o Transtorno Depressivo Maior, e o episódio depressivo completo afasta o Ciclotímico. No difícil, a queixa de memória faz parte do desânimo atual e some nos intervalos.',
    giveaways: [],
    variants: [
      {
        level: 'easy',
        ages: [24, 38],
        text: `{nome}, {idade} anos, designer, procura o ambulatório porque está {deprimido|deprimida} há três semanas: chora todos os dias, perdeu o interesse pelo trabalho e pelos amigos, dorme mal, come pouco e se sente um fracasso. Já teve duas fases assim desde os 20 anos.

Conta também que, no ano passado, passou cinco dias dormindo quatro horas por noite, {eufórico|eufórica} e {cheio|cheia} de energia, falando rápido e começando vários projetos ao mesmo tempo; os colegas estranharam a mudança. Naqueles dias continuou trabalhando normalmente e não precisou de internação. Não usa drogas e, na época, não tomava nenhum remédio.`,
        clues: [
          'Naqueles cinco dias, sentia-se mais {criativo|criativa} e confiante do que nunca e gastou mais do que costuma em cursos e equipamentos.',
          'As fases de tristeza duram semanas e se repetem desde os 20 anos; entre elas, e fora daqueles dias acelerados, fica bem.',
          'Nas fases de tristeza deixa de entregar trabalhos e já perdeu dois clientes fixos.',
          'A mudança daqueles cinco dias foi notada por colegas e pela família e aconteceu sem remédios, energéticos ou drogas.',
        ],
        rulesOut: 'passou cinco dias dormindo quatro horas por noite',
      },
      {
        level: 'medium',
        ages: [28, 45],
        text: `{nome}, {idade} anos, corretor{|a} de imóveis, é {encaminhado|encaminhada} pela UBS depois de um mês praticamente na cama: chora {escondido|escondida}, não tem vontade de nada, dorme doze horas por dia, emagreceu 4 kg e repete que "estragou a própria vida". Faltou a todas as visitas marcadas.

O cônjuge conta que {ele|ela} "vira outra pessoa" de tempos em tempos. Há uns seis meses, por uns cinco dias, dormiu quatro horas por noite sem cansaço, andou radiante, fechou três vendas, falava sem parar e planejou reformar a casa inteira; os colegas acharam ótimo. Nunca precisou de internação, e não usava drogas nem remédios.`,
        clues: [
          'Naqueles dias acelerados, puxava conversa com desconhecidos na rua e mal conseguia ficar {sentado|sentada} durante o almoço.',
          'Desde os 20 e poucos anos, alterna meses de desânimo com alguns dias de aceleração, voltando ao normal entre as fases.',
          'Nas fases de desânimo fica semanas sem vender e já atrasou o aluguel; a família nunca sabe como {ele|ela} vai estar.',
          'Os dias acelerados aparecem sem remédios ou drogas, são notados por colegas e família e duram de quatro a cinco dias.',
        ],
        rulesOut: 'por uns cinco dias, dormiu quatro horas por noite sem cansaço',
      },
      {
        level: 'hard',
        ages: [38, 55],
        text: `{nome}, {idade} anos, contador{|a}, procura a clínica médica por cansaço e "memória fraca" há um mês: esquece prazos, relê a mesma planilha várias vezes e dorme dez horas sem acordar {descansado|descansada}. Hemograma, tireoide e vitamina B12 vieram normais. Admite que perdeu a vontade de tudo e que se acha um peso no escritório.

{Perguntado|Perguntada} sobre o passado, sorri: "quando estou bem, estou bem demais". Duas vezes por ano tem uns cinco dias em que dorme três horas, fecha balanços atrasados de madrugada e fala tanto que os colegas brincam que {nome} "ligou no 220". Nessas fases nunca brigou, se endividou ou foi parar no hospital. Não usa drogas.`,
        clues: [
          'Nos dias acelerados, sente-se mais {esperto|esperta} que todos e começa um assunto antes de terminar o outro.',
          'As fases de desânimo, de semanas, começaram por volta dos 25 anos; nos intervalos, memória e rendimento voltam ao normal.',
          'No mês atual, entregou duas declarações com erro e recebeu uma advertência da chefia.',
          'Os dias acelerados surgem sem remédios, café em excesso ou drogas, e a mudança é notada por colegas e pela família.',
        ],
        rulesOut: 'Duas vezes por ano tem uns cinco dias em que dorme três horas',
      },
    ],
  },
  {
    disorderId: 'cyclothymic_disorder',
    reference: {
      label: 'Manual MSD (Profissional) — Transtorno ciclotímico',
      url: 'https://www.msdmanuals.com/pt/profissional/transtornos-psiqui%C3%A1tricos/transtornos-do-humor/transtorno-ciclot%C3%ADmico',
    },
    differential: {
      disorderId: 'bipolar_2',
      whyNot: 'As fases para cima nunca chegam a quatro dias seguidos e as para baixo não chegam a duas semanas de sintomas completos; não há hipomania nem episódio depressivo maior.',
    },
    explanation: 'Há mais de dois anos, na maior parte do tempo e sem intervalos estáveis maiores que dois meses, alternam-se períodos com sintomas hipomaníacos (energia, pouco sono, fala e ideias aceleradas, gastos) e períodos com sintomas depressivos, sem nunca completar um episódio hipomaníaco, maníaco ou depressivo maior, com prejuízo no trabalho, nos estudos ou nas relações. A curta duração das fases afasta o Transtorno Bipolar Tipo II. As viradas não dependem de conflitos com outras pessoas, o que afasta o Transtorno de Personalidade Borderline; drogas e doenças foram excluídas. No difícil, a desatenção só aparece nas viradas e não existia na infância, o que afasta o TDAH.',
    giveaways: [],
    variants: [
      {
        level: 'easy',
        ages: [20, 28],
        text: `{nome}, {idade} anos, atendente de telemarketing, procura a UBS porque o humor "parece uma montanha-russa" desde os 16 anos. Sem motivo aparente, alterna dois ou três dias {elétrico|elétrica}, dormindo cinco horas sem cansaço, falante e {cheio|cheia} de ideias, com alguns dias para baixo, sem vontade de sair e achando tudo sem graça.

Raramente passa um mês inteiro estável. As fases para cima nunca passaram de três dias, e as para baixo nunca chegaram a duas semanas, mas o trabalho e os namoros oscilam junto. Nunca foi {internado|internada}, não usa drogas e a tireoide está normal.`,
        clues: [
          'Nos dias para cima, gasta mais do que planejava e começa cursos que abandona assim que o ânimo cai.',
          'O vaivém começou aos 16 anos e, há mais de dois anos, ocupa a maior parte dos meses.',
          'Já foi {advertido|advertida} por faltas nos dias ruins e terminou dois namoros que não aguentaram as viradas.',
          'Os dias para baixo trazem desânimo, mas nunca vieram com semanas de culpa, perda de peso ou ideias de morte.',
        ],
        rulesOut: 'As fases para cima nunca passaram de três dias',
      },
      {
        level: 'medium',
        ages: [30, 45],
        text: `{nome}, {idade} anos, cabeleireir{o|a} com salão próprio, procura a UBS a pedido do cônjuge. Há dias em que chega ao salão às seis da manhã, muda os móveis de lugar, liga para clientes que não vê há anos e fala sem parar; em outros, desmarca a agenda, fica na cama e diz que nada tem graça.

Segundo o cônjuge, é assim há mais de dez anos, com poucas semanas de calmaria por ano. Os dias agitados duram um ou dois, e os apagados, menos de uma semana; as viradas não dependem de brigas ou de notícias. Os clientes reclamam dos cancelamentos. Não bebe nem usa drogas, e os exames de rotina estão normais.`,
        clues: [
          'Nos dias agitados, dorme quatro ou cinco horas sem sentir falta e compra produtos por impulso para o salão.',
          'As oscilações começaram por volta dos 18 anos e, desde então, nunca houve dois meses seguidos de humor estável.',
          'Perdeu clientes fixos pelos cancelamentos e já atrasou o aluguel do salão três vezes.',
          'Nos dias apagados sente desânimo e cansaço, mas nunca passou semanas sem trabalhar, sem comer ou pensando em morrer.',
        ],
        rulesOut: 'Os dias agitados duram um ou dois',
      },
      {
        level: 'hard',
        ages: [20, 26],
        text: `{nome}, {idade} anos, estudante de direito, procura o ambulatório pedindo avaliação para "falta de atenção": não termina as leituras, perde prazos e não consegue se fixar num assunto. Trouxe por conta própria os boletins do ensino fundamental, que só elogiam a atenção e o comportamento.

A mãe, que veio junto, descreve um vaivém desde os 15 anos: dois ou três dias falante, dormindo pouco e {cheio|cheia} de planos, seguidos de quatro ou cinco dias {calado|calada}, sem energia e sem sair do quarto. A distração aparece justamente nessas viradas. Nenhuma fase durou mais que isso ou terminou em internação. Não usa drogas; toma só café.`,
        clues: [
          'Nos dias de energia, faz compras por impulso e manda mensagens a madrugada inteira; nos de baixa, diz que nunca vai se formar.',
          'O padrão se repete há mais de cinco anos, ocupa a maior parte dos meses e nunca dependeu de brigas ou de provas.',
          'Já reprovou em três disciplinas por alternar dias de estudo intenso com dias sem abrir um livro.',
          'Nunca chegou a quatro dias seguidos de euforia, nem a duas semanas seguidas de tristeza com perda de interesse por tudo.',
        ],
        rulesOut: 'Nenhuma fase durou mais que isso',
      },
    ],
  },
  {
    disorderId: 'pmdd',
    reference: {
      label: 'Manual MSD (Profissional) — Síndrome pré-menstrual (inclui o transtorno disfórico pré-menstrual)',
      url: 'https://www.msdmanuals.com/pt/profissional/ginecologia-e-obstetr%C3%ADcia/sangramento-uterino-anormal/s%C3%ADndrome-pr%C3%A9-menstrual-spm',
    },
    differential: {
      disorderId: 'mdd',
      whyNot: 'Os sintomas aparecem só na semana antes da menstruação e desaparecem poucos dias depois que ela começa; no restante do mês, humor, sono e apetite são normais.',
    },
    explanation: 'Na maioria dos ciclos do último ano, cinco ou mais sintomas na semana anterior à menstruação (irritabilidade, choro fácil, sentimento de inutilidade ou desesperança, tensão, cansaço, sono ruim, vontade de doces, inchaço e dor nas mamas) que melhoram poucos dias após o início do fluxo e somem na semana seguinte, com prejuízo no trabalho e nas relações. O registro diário prospectivo de pelo menos dois ciclos confirma o padrão. Fora dessa janela o humor é normal, o que afasta o Transtorno Depressivo Maior com piora pré-menstrual; tireoide normal e ausência de anticoncepcional hormonal afastam outras causas.',
    giveaways: ['TPM', 'pré-menstrual', 'premenstrual'],
    variants: [
      {
        level: 'easy',
        ages: [24, 38],
        sex: 'f',
        text: `{nome}, {idade} anos, recepcionista de clínica, procura a ginecologista da UBS por uma "TPM fora do normal". Há mais de um ano, na semana antes de menstruar, fica irritada a ponto de brigar com todo mundo, chora por qualquer coisa, sente-se sem saída, dorme mal, tem vontade incontrolável de doce e os seios incham e doem.

Dois ou três dias depois que a menstruação desce, volta ao normal e passa o resto do mês bem. O diário que preencheu por dois ciclos, a pedido da médica, confirmou o padrão. Não usa anticoncepcional hormonal, a tireoide está normal e nunca teve fases de tristeza fora desses dias.`,
        clues: [
          'Nesses dias também tem dificuldade de se concentrar e sente que qualquer tarefa simples é demais para ela.',
          'O padrão se repete na maioria dos ciclos do último ano, sempre começando cerca de uma semana antes do sangramento.',
          'Já foi advertida por responder mal a pacientes e evita marcar compromissos na semana anterior à menstruação.',
          'Na semana seguinte à menstruação, o diário mostra humor, sono e apetite normais em todos os ciclos registrados.',
        ],
        rulesOut: 'nunca teve fases de tristeza fora desses dias',
      },
      {
        level: 'medium',
        ages: [28, 40],
        sex: 'f',
        text: `{nome}, {idade} anos, professora do ensino fundamental, chega ao ambulatório de saúde da mulher depois de mais uma briga feia em casa. Mostra no celular as anotações diárias dos últimos três ciclos: "gritei com as crianças", "chorei no ônibus sem motivo", "me sinto um lixo", "comi um pacote inteiro de biscoito", "barriga e peito inchados".

Todas essas anotações se concentram nos seis dias antes de a menstruação descer; dois dias depois, voltam a aparecer "dia normal" e "aula boa". A família diz que é assim quase todo mês há uns dois anos. Não toma anticoncepcional, os exames estão normais e, fora desses dias, está bem.`,
        clues: [
          'Nesses dias também se sente tensa, "no limite", e perde a vontade de corrigir provas ou de ver as amigas.',
          'As anotações repetem o mesmo desenho nos três ciclos, e a família lembra de crises parecidas na maioria dos meses do último ano.',
          'Já pediu para sair da sala no meio da aula para não gritar com os alunos e evita encontros de família nessa semana.',
          'Na semana depois da menstruação, as anotações mostram sono, apetite, ânimo e paciência normais, em todos os ciclos.',
        ],
        rulesOut: 'fora desses dias, está bem',
      },
      {
        level: 'hard',
        ages: [36, 45],
        sex: 'f',
        text: `{nome}, {idade} anos, enfermeira, é atendida no pronto-atendimento depois de jogar o crachá na mesa da chefe e sair chorando do plantão. Diz que "não aguenta mais nada", que se sente inútil e sem paciência há quatro dias, e atribui tudo aos plantões dobrados. A colega que a acompanha estranha: "ela é a mais calma da equipe".

No retorno, {nome} traz a tabela de humor que vinha preenchendo desde crises anteriores: em dois ciclos, irritação, choro, cansaço, inchaço e vontade de doce aparecem nos cinco dias anteriores à menstruação e somem no segundo dia de fluxo, sem voltar até o ciclo seguinte. Usa DIU de cobre; tireoide e hemograma estão normais.`,
        clues: [
          'Nesses dias também dorme mal, sente o corpo pesado e esquece tarefas simples da escala.',
          'Crises parecidas, sempre na semana anterior à menstruação, se repetem na maioria dos meses há pouco mais de um ano.',
          'Já trocou plantões para não trabalhar nesses dias e quase terminou o relacionamento por brigas que só acontecem nessa fase.',
          'Na semana seguinte à menstruação, a tabela marca humor, sono e energia normais, mesmo nas semanas de plantões dobrados.',
        ],
        rulesOut: 'somem no segundo dia de fluxo, sem voltar até o ciclo seguinte',
      },
    ],
  },
  {
    disorderId: 'disruptive_mood_dysregulation_disorder',
    reference: {
      label: 'Manual MSD (Profissional) — Transtornos depressivos em crianças e adolescentes',
      url: 'https://www.msdmanuals.com/pt/profissional/pediatria/transtornos-psiqui%C3%A1tricos-em-crian%C3%A7as-e-adolescentes/transtornos-depressivos-em-crian%C3%A7as-e-adolescentes',
    },
    differential: {
      disorderId: 'bipolar_1',
      whyNot: 'A irritação é crônica e contínua, sem episódios distintos de dias com euforia, grandiosidade e pouca necessidade de sono; explosões frequentes não configuram mania.',
    },
    explanation: 'Explosões de raiva graves e desproporcionais, três ou mais vezes por semana, com humor irritável na maior parte do dia entre elas, em casa e na escola, há mais de um ano, com início antes dos 10 anos e diagnóstico entre 6 e 18 anos. Não há períodos distintos de euforia, grandiosidade ou pouca necessidade de sono, o que afasta o Transtorno Bipolar Tipo I. Quando esse quadro está completo, ele substitui o Transtorno Opositivo Desafiador e o Explosivo Intermitente. Não há furtos, mentiras ou crueldade (Transtorno de Conduta), desatenção fora das crises ou sinais de episódio depressivo, e no difícil o quadro antecede em anos a separação dos pais.',
    giveaways: [],
    variants: [
      {
        level: 'easy',
        ages: [9, 11],
        text: `{nome}, {idade} anos, é {levado|levada} pelos pais ao CAPS infantojuvenil por encaminhamento da escola. Desde os 7 anos tem explosões de raiva quatro ou cinco vezes por semana por motivos pequenos, como perder um jogo ou ouvir um "não": grita, chuta portas e já quebrou o tablet e uma carteira da sala.

Entre uma crise e outra, segundo os pais e a professora, passa quase o dia todo {emburrado|emburrada} e de mau humor, em casa e na escola. Nunca teve fases de dias com euforia, sono reduzido ou ideias de grandeza. Fora das crises, come e dorme bem, presta atenção e aprende sem dificuldade, e não há histórico de violência em casa.`,
        clues: [
          'As explosões são muito maiores que o motivo, duram até meia hora e assustam os irmãos menores.',
          'O padrão começou aos 7 anos e, desde então, nunca deu trégua por mais de um mês.',
          'Foi {suspenso|suspensa} duas vezes, deixou de ser {convidado|convidada} para aniversários e os pais evitam sair com {ele|ela}.',
          'O mau humor é o mesmo o ano inteiro, sem semanas diferentes, e nunca passou noites sem dormir {cheio|cheia} de energia.',
        ],
        rulesOut: 'Nunca teve fases de dias com euforia, sono reduzido ou ideias de grandeza.',
      },
      {
        level: 'medium',
        ages: [8, 10],
        text: `{nome}, {idade} anos, chega ao ambulatório de psiquiatria infantil com a mãe e a agenda escolar cheia de bilhetes: rasgou a prova ao errar uma conta, jogou a mochila na professora porque a fila demorou, chutou o colega que pegou "seu" lápis. Em casa, quebrou o controle da TV ao ouvir que era hora de dormir.

As cenas se repetem três ou quatro vezes por semana desde o primeiro ano, quando tinha 6 anos. No resto do tempo, segundo mãe e professora, vive de cara fechada, resmungando e respondendo atravessado. Faz as lições com atenção quando está {calmo|calma}, dorme bem e nunca teve dias de euforia ou de energia sem sono.`,
        clues: [
          'As explosões duram de dez a trinta minutos, com gritos e objetos atirados, e destoam até do que se espera de crianças menores.',
          'Desde o primeiro ano não houve um mês sequer sem crises, e o mau humor diário continua nas férias, na casa dos tios.',
          'Já mudou de escola uma vez, não tem amigos na turma e a mãe parou de levá-l{o|a} à igreja por vergonha das cenas.',
          'O humor é o mesmo o ano todo; nunca houve dias seguidos de alegria exagerada, grandiosidade ou pouca necessidade de sono.',
        ],
        rulesOut: 'nunca teve dias de euforia ou de energia sem sono',
      },
      {
        level: 'hard',
        ages: [13, 15],
        text: `{nome}, {idade} anos, é {encaminhado|encaminhada} ao CAPSi depois de ser {suspenso|suspensa} por empurrar um colega que riu do tênis {dele|dela}. A mãe acha que é "revolta pela separação", que aconteceu há seis meses, mas o relatório da escola cita episódios iguais desde o terceiro ano, por volta dos 8 anos, e notas sempre boas.

Em casa e na escola, explode umas três ou quatro vezes por semana por frustrações pequenas, como perder no videogame ou ser {corrigido|corrigida}. Entre as crises, o humor é azedo quase o dia inteiro, coisa que até o técnico do futsal comenta, mas come e dorme bem. Não furta, não mente para tirar vantagem, não usa drogas e nunca teve dias de euforia ou de sono reduzido sem cansaço.`,
        clues: [
          'As explosões incluem gritos, socos na parede e objetos quebrados, muito além do que a situação pede.',
          'As crises e o mau humor começaram por volta dos 8 anos e nunca sumiram por três meses seguidos, bem antes da separação.',
          'Foi {cortado|cortada} do time de futsal, perdeu amigos e acumula três advertências na escola só neste ano.',
          'A irritação não vem em fases: é a mesma há anos, sem períodos de dias com energia excessiva, grandiosidade ou noites sem dormir.',
        ],
        rulesOut: 'nunca teve dias de euforia ou de sono reduzido sem cansaço',
      },
    ],
  },
]
