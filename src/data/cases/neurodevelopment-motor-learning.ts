import type { DisorderCaseSet } from './types'

export const neurodevMotorLearningCases: DisorderCaseSet[] = [
  {
    disorderId: 'developmental_coordination_disorder',
    reference: {
      label: 'MedlinePlus (NIH/NLM) — Developmental coordination disorder',
      url: 'https://medlineplus.gov/ency/article/001533.htm',
    },
    differential: {
      disorderId: 'adhd',
      whyNot: 'A atenção e o comportamento são adequados: espera a vez, segue instruções e se empenha nas tarefas. A lentidão e a falta de jeito aparecem mesmo com calma e concentração.',
    },
    explanation: 'Aquisição e execução de habilidades motoras coordenadas bem abaixo do esperado para a idade — tropeços, objetos derrubados, bola, bicicleta, cadarço e escrita lenta e irregular —, presentes desde o início do desenvolvimento e com prejuízo na escola, no autocuidado e no lazer. Inteligência e visão normais e exame neurológico sem sinais de paralisia cerebral ou de outra doença do movimento completam o Transtorno do Desenvolvimento da Coordenação. Não é TDAH: atenção e controle do comportamento são adequados, e os erros nascem da execução dos movimentos, não da pressa ou da distração. Ortografia e organização dos textos preservadas afastam um prejuízo específico na escrita.',
    giveaways: ['coordenacao', 'dispraxia'],
    variants: [
      {
        level: 'easy',
        ages: [7, 8],
        text: `{nome}, {idade} anos, é {levado|levada} ao pediatra da UBS a pedido da escola: a professora acha {o menino|a menina} {desajeitado|desajeitada} demais para a idade. Tropeça, esbarra nos colegas, derruba o copo no lanche, não consegue recortar com a tesoura nem agarrar a bola, e escreve devagar, com letra grande e torta. Em casa, ainda precisa de ajuda com botões e cadarços.

A mãe conta que {ele|ela} sentou e andou mais tarde que os irmãos e que a falta de coordenação vem desde pequen{o|a}. Fala bem, acompanha a turma em leitura e contas e brinca com os colegas. Na sala, presta atenção, espera a vez e não é {agitado|agitada}. A avaliação psicológica mostrou inteligência na média, e os exames neurológico e de vista foram normais.`,
        clues: [
          'Ainda não anda de bicicleta sem rodinhas nem pula corda; no caderno, as palavras estão certas, mas as letras saem tortas e fora da linha.',
          'As dificuldades existem desde os primeiros anos e não pioraram: aprende cada movimento novo, mas sempre bem depois das outras crianças da mesma idade.',
          'Não termina as atividades de cópia no tempo da aula e chora quando os colegas riem das quedas na educação física.',
          'Em casa, ouve histórias e brinca de faz de conta por longos períodos; os erros aparecem na execução dos movimentos, não por pressa ou distração.',
        ],
        rulesOut: 'presta atenção, espera a vez e não é {agitado|agitada}',
      },
      {
        level: 'medium',
        ages: [9, 10],
        text: `{nome}, {idade} anos, chega à consulta com a mãe porque passou a chorar nas manhãs de educação física. Na quadra, a bola escapa das mãos, {ele|ela} tropeça nos próprios pés e os colegas já não {o|a} escolhem para o time. Na sala, ainda copia o primeiro parágrafo do quadro quando a turma já terminou, e o caderno vive amassado de tanto apagar.

Em casa, usa tênis de velcro porque não aprendeu a dar laço, derrama o suco ao servir e só largou as rodinhas da bicicleta no ano passado; a mãe diz que "sempre foi assim". Lê e faz contas no nível da turma, e a professora {o|a} descreve como {atento|atenta} e {caprichoso|caprichosa}, só que muito {lento|lenta}. Os exames neurológico e de vista foram normais.`,
        clues: [
          'Segura o lápis com força excessiva e reclama de dor na mão; o que escreve, porém, tem ortografia e ideias adequadas para a série.',
          'Sentou e andou alguns meses depois do esperado, e desde a educação infantil as professoras notam que leva mais tempo para aprender cada movimento novo.',
          'Deixou de ir a festas com brincadeiras de corrida e precisa de tempo extra para terminar as provas escritas, que muitas vezes ficam incompletas.',
          'Conversa com facilidade, tem dois amigos inseparáveis e passa horas {concentrado|concentrada} em histórias e jogos de tabuleiro, sem se levantar nem interromper ninguém.',
        ],
        rulesOut: 'a professora {o|a} descreve como {atento|atenta} e {caprichoso|caprichosa}',
      },
      {
        level: 'hard',
        ages: [15, 16],
        text: `{nome}, {idade} anos, no 1º ano do ensino médio, chega ao ambulatório de adolescentes {encaminhado|encaminhada} pelo ortopedista, que não encontrou lesão para a dor no punho que surge depois de escrever. Nas provas dissertativas, não termina as respostas, e a escola, que vê letra irregular e cadernos incompletos, sugeriu investigar falta de atenção.

A mãe lembra que {nome} foi {o último|a última} da rua a andar de bicicleta, ainda prefere tênis sem cadarço e vive derrubando copos à mesa. Em sala, é {atento|atenta}, espera a vez e se esforça em tudo, só que leva bem mais tempo que os colegas. Os trabalhos digitados saem bem escritos e sem erros, as notas em matemática são boas, e os exames neurológico e de vista foram normais.`,
        clues: [
          'Na educação física, evita jogos com bola: não consegue agarrar nem chutar na direção certa e costuma cair quando muda de direção na corrida.',
          'Os pais contam que sentou e andou mais tarde que os primos e que, desde a pré-escola, levava muito mais tempo para aprender a se vestir e a recortar.',
          'Ficou de recuperação em duas matérias só por não terminar as provas escritas e desistiu do violão por não conseguir posicionar os dedos nas cordas.',
          'Os professores nunca notaram agitação, distração ou respostas impulsivas; conversa com facilidade e tem um grupo de amigos do bairro desde a infância.',
        ],
        rulesOut: 'Em sala, é {atento|atenta}, espera a vez e se esforça em tudo',
      },
    ],
  },
  {
    disorderId: 'specific_learning_disorder_reading',
    reference: {
      label: 'Manual MSD (Profissional) — Dislexia',
      url: 'https://www.msdmanuals.com/pt/profissional/pediatria/dist%C3%BArbios-de-aprendizagem-e-desenvolvimento/dislexia',
    },
    differential: {
      disorderId: 'language_disorder',
      whyNot: 'A linguagem oral está preservada: entende o que ouve, tem bom vocabulário e se expressa bem. A dificuldade está em decodificar as palavras escritas, não em compreender a língua.',
    },
    explanation: 'Leitura de palavras imprecisa, lenta e trabalhosa — lê sílaba por sílaba, adivinha finais, perde a linha —, com compreensão do texto limitada pela decodificação. Começou na alfabetização, persiste há mais de seis meses apesar de reforço e fica bem abaixo do esperado nos testes, com prejuízo escolar. Inteligência, visão, audição e escolarização adequadas afastam outras explicações. Não é Transtorno de Linguagem: compreensão e expressão orais estão preservadas, e o conteúdo é entendido quando é ouvido. A atenção adequada nas aulas afasta o TDAH, e o bom desempenho em matemática mostra que o prejuízo não é global.',
    giveaways: ['dislex'],
    variants: [
      {
        level: 'easy',
        ages: [8, 9],
        text: `{nome}, {idade} anos, no 3º ano do ensino fundamental, é {levado|levada} pelos pais à fonoaudióloga porque ainda lê sílaba por sílaba. Troca as letras ao ler, adivinha o final das palavras maiores, perde a linha e, no fim de um parágrafo, não sabe dizer o que leu. Pede para a mãe ler os enunciados das tarefas.

Desde o 1º ano faz reforço escolar sem grande avanço, enquanto os colegas da mesma escola já leem livros sozinhos. Quando alguém lê a história em voz alta, entende tudo e reconta com detalhes; em contas, acompanha a turma. O pai teve a mesma dificuldade na escola. A avaliação mostrou inteligência na média, e os exames de vista e audição foram normais.`,
        clues: [
          'Na avaliação da fonoaudióloga, leu muito menos palavras por minuto e errou bem mais do que o esperado para a idade, sobretudo em palavras desconhecidas.',
          'As dificuldades apareceram na alfabetização e se mantêm há mais de um ano, apesar do reforço duas vezes por semana e do treino diário em casa.',
          'Tira notas baixas em ciências e história porque não consegue ler as questões a tempo, embora preste atenção e participe das aulas.',
          'Fala com frases completas e vocabulário rico para a idade, entende instruções orais longas e conta histórias com começo, meio e fim.',
        ],
        rulesOut: 'Quando alguém lê a história em voz alta, entende tudo e reconta com detalhes',
      },
      {
        level: 'medium',
        ages: [10, 11],
        text: `{nome}, {idade} anos, é {encaminhado|encaminhada} pela escola porque "não entende o que lê": nas provas, erra questões sobre conteúdos que sabe explicar quando a professora pergunta em voz alta. A lição de leitura leva a tarde inteira, e {ele|ela} inventa desculpas para não ler para a turma.

A mãe conta que a alfabetização foi lenta e que, desde o 2º ano, {nome} frequenta aulas de reforço, com pouco resultado. Ainda lê devagar, pulando linhas e trocando palavras parecidas, e se cansa depois de poucas frases. Nos problemas de matemática, acerta quando alguém lê o enunciado. Entende documentários e discute o que viu com detalhes e vocabulário amplo. Visão e audição foram examinadas e estão normais.`,
        clues: [
          'Lendo em voz alta, para no meio das palavras longas, chuta o final a partir da primeira sílaba e lê "bato" onde está escrito "pato".',
          'As dificuldades começaram na alfabetização, aos 6 anos, e seguem há pelo menos quatro anos, apesar do reforço semanal e de uma professora particular.',
          'Ficou de recuperação em português e ciências, embora preste atenção e participe das aulas, e já pediu para trocar de escola por vergonha de ler em voz alta.',
          'Nos testes, raciocínio e compreensão de textos ouvidos ficaram na média, enquanto a leitura de palavras ficou muito abaixo do esperado para a idade.',
        ],
        rulesOut: 'Entende documentários e discute o que viu com detalhes e vocabulário amplo',
      },
      {
        level: 'hard',
        ages: [16, 17],
        text: `{nome}, {idade} anos, estudante do ensino médio que se prepara para o ENEM, é {encaminhado|encaminhada} pelo oftalmologista, que não encontrou alteração na vista para a dor de cabeça que sente ao estudar. Nos simulados, deixa as últimas questões em branco por falta de tempo, embora acerte quase tudo o que consegue ler.

A irmã mais nova lê em quinze minutos o capítulo que {nome} leva uma hora para terminar, voltando à mesma linha várias vezes. Prefere videoaulas e, ouvindo, entende e discute temas complexos. A mãe conta que a leitura só deslanchou no 4º ano, depois de dois anos com uma psicopedagoga. Em matemática e nos seminários, sempre foi bem.`,
        clues: [
          'Lendo em voz alta, acerta as palavras conhecidas, mas trava em nomes novos e termos técnicos, que lê sílaba por sílaba, e perde o sentido da frase.',
          'A leitura melhorou com o acompanhamento na infância, mas nunca ficou fluente; o problema pesa mais agora, com provas longas e cronometradas.',
          'Deixou de ler os livros obrigatórios e só assiste a resumos em vídeo; as notas em provas longas despencaram, mas as redações continuam bem avaliadas.',
          'Na avaliação, a velocidade de leitura ficou muito abaixo do esperado para a idade, enquanto vocabulário, compreensão oral, raciocínio e audição ficaram normais.',
        ],
        rulesOut: 'Prefere videoaulas e, ouvindo, entende e discute temas complexos',
      },
    ],
  },
  {
    disorderId: 'specific_learning_disorder_writing',
    reference: {
      label: 'Manual MSD (Profissional) — Visão geral dos transtornos de aprendizagem',
      url: 'https://www.msdmanuals.com/pt/profissional/pediatria/dist%C3%BArbios-de-aprendizagem-e-desenvolvimento/vis%C3%A3o-geral-dos-transtornos-de-aprendizagem',
    },
    differential: {
      disorderId: 'developmental_coordination_disorder',
      whyNot: 'A letra é legível e o traçado, firme; os mesmos erros aparecem quando o texto é digitado, e não há dificuldade motora em esportes, desenho ou autocuidado.',
    },
    explanation: 'Erros persistentes de ortografia (trocas, omissões e junções de palavras), pontuação ausente, frases incompletas e ideias desorganizadas, muito abaixo do esperado para a idade, desde os primeiros anos escolares e por mais de seis meses apesar de intervenção, com prejuízo nas notas. Leitura fluente, matemática adequada, boa expressão oral e inteligência, visão e audição normais restringem o prejuízo à escrita. Não é Transtorno do Desenvolvimento da Coordenação: a letra é legível, a motricidade é normal e os mesmos erros aparecem quando o texto é digitado, o que mostra que o problema está na linguagem escrita, não no gesto motor.',
    giveaways: ['disortograf', 'disgraf'],
    variants: [
      {
        level: 'easy',
        ages: [9, 10],
        text: `{nome}, {idade} anos, no 4º ano, é {levado|levada} à psicopedagoga porque escreve com muitos erros. Troca "s" por "z" e "ch" por "x", esquece letras, junta palavras, como em "derrepente" e "agente", e os textos saem sem pontuação, com frases soltas que não formam uma história. No ditado, erra até as palavras treinadas na véspera.

A dificuldade aparece desde a alfabetização e não melhorou com um ano de reforço. {nome} lê com fluência, entende o que lê, vai bem em matemática e, falando, conta histórias com começo, meio e fim. A letra é bonita e caprichada. Presta atenção nas aulas, a avaliação mostrou inteligência na média, e visão e audição estão normais.`,
        clues: [
          'Escreve a mesma palavra de jeitos diferentes no mesmo texto e não percebe os erros quando relê; no teste padronizado de escrita, ficou bem abaixo da série.',
          'Os erros chamaram atenção já no 2º ano e persistem há mais de dois anos, mesmo com reforço semanal e treino de ditado em casa.',
          'Tira notas baixas em português e nas provas dissertativas de ciências, apesar de saber o conteúdo quando a professora pergunta oralmente.',
          'Anda de bicicleta, joga bola e recorta sem dificuldade; digitando no computador, os mesmos erros de ortografia e de pontuação aparecem.',
        ],
        rulesOut: 'A letra é bonita e caprichada.',
      },
      {
        level: 'medium',
        ages: [11, 12],
        text: `{nome}, {idade} anos, no 6º ano, chega com os pais depois de mais um bilhete da professora de português: as redações "não têm pé nem cabeça". As frases começam e não terminam, as ideias aparecem fora de ordem, não há parágrafos nem pontuação, e palavras simples saem escritas de três jeitos diferentes na mesma página.

Em casa, {nome} explica com clareza o enredo dos livros que lê e resolve bem os problemas de matemática. A letra é firme e legível, e os erros continuam quando digita sem corretor. Faz acompanhamento com a fonoaudióloga desde o 4º ano, com pouca melhora. Presta atenção nas aulas, e quando é {avaliado|avaliada} oralmente as notas sobem. Visão e audição foram examinadas e estão normais.`,
        clues: [
          'Ao copiar do quadro, reproduz o texto sem erros; quando escreve por conta própria, omite palavras, esquece acentos e troca letras de som parecido.',
          'Os pais lembram que os erros de escrita chamavam atenção desde o 2º ano, enquanto a leitura deslanchou no tempo esperado.',
          'Perdeu pontos em todas as provas dissertativas do bimestre e passou a escrever o mínimo possível para não ser {corrigido|corrigida} na frente dos colegas.',
          'Desenha bem, amarra o cadarço, joga vôlei no time da escola e escreve à mão no mesmo ritmo dos colegas.',
        ],
        rulesOut: 'A letra é firme e legível',
      },
      {
        level: 'hard',
        ages: [15, 17],
        text: `{nome}, {idade} anos, no ensino médio, é {encaminhado|encaminhada} pela orientadora educacional por "desinteresse": entrega provas com respostas de uma linha e deixou de fazer as redações. Os professores estranham, porque nos debates em sala {ele é dos|ela é das} que mais argumentam.

Na conversa, {nome} admite que escreve pouco para não errar: desde o fundamental os textos voltam riscados de vermelho, com a mesma palavra escrita de formas diferentes, frases emendadas e ideias fora de ordem. Lê os livros do vestibular sem esforço e vai bem em matemática. Fez reforço por dois anos, sem melhora. A letra é legível, e digitando os erros se repetem.`,
        clues: [
          'Numa amostra de texto, escreveu "concerteza", "excessão" e "pesquiza", quase não usou vírgulas nem pontos e mudou de assunto no meio do parágrafo.',
          'Os erros de escrita aparecem desde a alfabetização e nunca deixaram de existir; ficaram mais evidentes agora, com redações longas e provas dissertativas.',
          'Tirou nota quase zero na redação do simulado do ENEM, embora acompanhe as aulas com atenção, e desistiu de tentar jornalismo, curso que sempre quis.',
          'É {animado|animada}, joga no time de handebol, tem muitos amigos e escreve à mão no mesmo ritmo da turma, com traçado firme.',
        ],
        rulesOut: 'A letra é legível, e digitando os erros se repetem',
      },
    ],
  },
  {
    disorderId: 'specific_learning_disorder_math',
    reference: {
      label: 'Manual MSD (Profissional) — Visão geral dos transtornos de aprendizagem',
      url: 'https://www.msdmanuals.com/pt/profissional/pediatria/dist%C3%BArbios-de-aprendizagem-e-desenvolvimento/vis%C3%A3o-geral-dos-transtornos-de-aprendizagem',
    },
    differential: {
      disorderId: 'intellectual_developmental_disorder',
      whyNot: 'A dificuldade se limita aos números: leitura, escrita, raciocínio verbal e autonomia em tarefas sem cálculo estão no nível esperado para a idade.',
    },
    explanation: 'Dificuldade persistente com senso numérico, fatos aritméticos e cálculo — conta nos dedos, não memoriza a tabuada, não compara nem estima quantidades —, iniciada nos primeiros anos escolares, mantida por mais de seis meses apesar de reforço e bem abaixo do esperado para a idade, com prejuízo na escola ou no trabalho. Leitura, escrita, visão, audição e escolarização adequadas restringem o problema à matemática. Não é Transtorno do Desenvolvimento Intelectual: o raciocínio verbal e o desempenho nas outras áreas são normais. A atenção preservada afasta o TDAH, e o padrão de vida inteira afasta um declínio adquirido.',
    giveaways: ['discalcul'],
    variants: [
      {
        level: 'easy',
        ages: [9, 10],
        text: `{nome}, {idade} anos, no 4º ano, é {levado|levada} pela mãe à UBS depois de um bilhete da professora: "a matemática não entra". Ainda conta nos dedos para fazer 4 + 3, não decorou a tabuada apesar de treinar todos os dias, confunde os sinais de mais e de vezes e não sabe dizer se 35 é maior ou menor que 53.

A dificuldade com números vem desde a educação infantil e não melhorou com um ano de reforço. Nas outras matérias, vai bem: lê com fluência, escreve bons textos e presta atenção nas aulas. A avaliação psicológica mostrou inteligência na média, e os exames de visão e audição foram normais.`,
        clues: [
          'Para saber quanto é 9 + 1, começa a contar do 1, e ao armar contas coloca os números fora das colunas certas.',
          'Aos 5 anos já demorava para contar objetos e reconhecer números; desde o 1º ano, as notas de matemática ficam muito abaixo das da turma.',
          'Ficou de recuperação em matemática duas vezes e não consegue conferir o troco na cantina, o que virou motivo de piada entre os colegas.',
          'Lê livros {sozinho|sozinha}, cuida das próprias coisas e, na avaliação, só o cálculo e o senso numérico ficaram muito abaixo do esperado para a idade.',
        ],
        rulesOut: 'A avaliação psicológica mostrou inteligência na média',
      },
      {
        level: 'medium',
        ages: [11, 13],
        text: `{nome}, {idade} anos, é {trazido|trazida} pelos pais depois de mais uma nota vermelha em matemática. Na prova, conta nos dedos escondidos embaixo da carteira, chega a resultados diferentes para a mesma conta e, nos problemas, entende a história, mas não sabe se deve somar ou dividir. No mercado, não percebe quando o troco vem errado e ainda não lê as horas no relógio de ponteiros.

A professora conta que {ele|ela} presta atenção, confere tudo e mesmo assim erra. Faz aulas particulares há dois anos, com pouco avanço. Em português e geografia, está entre os melhores da turma e escreve redações elogiadas. Os pais lembram que a tabuada nunca "entrou". Visão e audição foram examinadas e estão normais.`,
        clues: [
          'Não percebe quando um resultado é absurdo, como 48 + 39 dar 717, e erra estimativas simples, como quantos ônibus seriam necessários para levar a turma a um passeio.',
          'A dificuldade chamou atenção no 1º ano; o boletim mostra notas baixas em matemática ano após ano, enquanto as demais matérias melhoravam.',
          'Evita jogos de tabuleiro com pontuação, pede aos colegas para dividir a conta do lanche e ficou de recuperação no último bimestre.',
          'Na avaliação, o raciocínio verbal ficou acima da média, e o desempenho em cálculo e em fatos numéricos, muito abaixo do esperado para a idade.',
        ],
        rulesOut: 'Em português e geografia, está entre os melhores da turma',
      },
      {
        level: 'hard',
        ages: [28, 45],
        text: `{nome}, {idade} anos, procura a UBS com medo de estar "perdendo a memória": desde que passou para o caixa da padaria, esquece preços, erra o troco e já teve a diferença descontada do salário duas vezes. O gerente acha que {ele|ela} anda {distraído|distraída}.

Na conversa, lembra com detalhes a semana, os pedidos dos clientes e as receitas que prepara. Conta que matemática sempre foi "um terror": repetiu o 6º ano por causa dela, ainda conta nos dedos e usa a calculadora do celular até para dividir uma conta por dois. Lê romances e escreve os avisos da igreja. Os exames de rotina vieram normais.`,
        clues: [
          'Não consegue estimar se R$ 50 bastam para três itens de R$ 18 e se perde ao calcular 10% de gorjeta, mesmo sem pressa.',
          'Desde os primeiros anos escolares contava nos dedos e não memorizava a tabuada, mesmo com aulas de reforço; a dificuldade nunca passou e agora pesa mais, com o caixa.',
          'Pediu para voltar ao balcão, evita pagar contas {sozinho|sozinha} no banco e deixa as compras do mês para a irmã calcular.',
          'Terminou o ensino médio com boas notas em português e história, aprende receitas novas rapidamente, não se distrai no atendimento e nunca perdeu habilidades que já dominava.',
        ],
        rulesOut: 'Lê romances e escreve os avisos da igreja',
      },
    ],
  },
  {
    disorderId: 'tourette_disorder',
    reference: {
      label: 'Manual MSD (Profissional) — Transtorno de tique e síndrome de Tourette em crianças e adolescentes',
      url: 'https://www.msdmanuals.com/pt/profissional/pediatria/dist%C3%BArbios-neurol%C3%B3gicos-em-crian%C3%A7as/transtorno-de-tique-e-s%C3%ADndrome-de-tourette-em-crian%C3%A7as-e-adolescentes',
    },
    differential: {
      disorderId: 'persistent_motor_tic_disorder',
      whyNot: 'Além de vários tiques motores, há tiques vocais, como pigarros, fungadas e sons curtos; um tique vocal em qualquer momento do quadro afasta o tique apenas motor.',
    },
    explanation: 'Vários tiques motores (piscar, caretas, sacudir a cabeça, encolher os ombros) e pelo menos um tique vocal (pigarro, fungada, sons ou palavras), com início antes dos 18 anos e mais de um ano desde o primeiro tique, oscilando em tipo e intensidade. Os tiques são precedidos por uma sensação desconfortável, podem ser segurados por pouco tempo e somem no sono. A ausência de estimulantes, de outras substâncias e de doença neurológica completa o Transtorno de Tourette. O tique vocal afasta o Transtorno de Tique Motor Persistente; a falta de pensamentos intrusivos e de rituais afasta o TOC.',
    giveaways: ['coprolalia', 'tique vocal', 'tiques vocais'],
    variants: [
      {
        level: 'easy',
        ages: [8, 11],
        text: `{nome}, {idade} anos, é {levado|levada} pelos pais ao neuropediatra por causa de tiques que começaram há três anos. Primeiro piscava com força; depois vieram caretas, sacudidas da cabeça e o ombro que sobe sozinho. Há um ano e meio surgiram também tiques vocais: pigarros, fungadas e um "hã!" alto que escapa várias vezes por hora.

Os tiques vão e voltam, pioram quando está {cansado|cansada} ou {nervoso|nervosa} e somem quando dorme. {nome} diz que sente uma "coceira" antes e que consegue segurar por alguns minutos, mas depois "explode". Não toma remédios, o exame neurológico é normal e, na escola, presta atenção e vai bem.`,
        clues: [
          'Em algumas semanas aparecem movimentos novos, como tocar o nariz ou dar um pulinho, que depois dão lugar aos antigos.',
          'Desde o início, há três anos, os tiques mudaram de tipo e de intensidade e tiveram fases mais fracas, mas nunca sumiram por completo.',
          'Os colegas imitam os sons na sala, e {ele|ela} passou a evitar a apresentação oral e o coral da escola.',
          'Os sons não vêm de alergia ou resfriado: surgem em rajadas, com a mesma sensação que antecede os movimentos. Não há rituais nem pensamentos que {o|a} perturbem.',
        ],
        rulesOut: 'surgiram também tiques vocais: pigarros, fungadas e um "hã!" alto',
      },
      {
        level: 'medium',
        ages: [11, 13],
        text: `{nome}, {idade} anos, é {encaminhado|encaminhada} pela escola por "indisciplina": na sala, faz barulhos com a garganta, funga sem estar {resfriado|resfriada} e às vezes solta um "ei!" no meio da explicação. A professora acha que é provocação, mas {ele|ela} fica {vermelho|vermelha} e pede desculpas.

Os pais contam que, aos 6 anos, {nome} começou a piscar forte e a franzir o nariz; depois vieram movimentos bruscos do pescoço e dos ombros. Movimentos e sons mudam ao longo dos meses e nunca pararam por completo. {Ele|Ela} diz que sente uma pressão antes e que consegue segurar na prova, mas depois precisa "soltar". Não usa remédios, e o exame neurológico foi normal.`,
        clues: [
          'Em casa, vendo TV, os movimentos e os sons aumentam; jogando futebol ou tocando teclado, quase desaparecem.',
          'Os sons começaram por volta dos 9 anos, três anos depois dos primeiros movimentos, e costumam piorar nas semanas de volta às aulas.',
          'Levou duas advertências por "atrapalhar a aula", embora preste atenção e tire boas notas, e pediu para sentar no fundo da sala.',
          'O pediatra descartou rinite e problemas de garganta: os sons vêm precedidos pela mesma pressão dos movimentos. Não há rituais nem pensamentos que {o|a} perturbem.',
        ],
        rulesOut: 'faz barulhos com a garganta, funga sem estar {resfriado|resfriada}',
      },
      {
        level: 'hard',
        ages: [18, 24],
        text: `{nome}, {idade} anos, chega ao ambulatório {encaminhado|encaminhada} pelo otorrino, que tratou por dois anos um pigarro supostamente alérgico, sem resultado; a nasofibroscopia e os testes de alergia vieram normais. O pigarro vem em rajadas, junto com fungadas, piora nas semanas de prova da faculdade e nunca aparece durante o sono.

A mãe, que {o|a} acompanha, comenta que desde os 8 anos {nome} "tem uns cacoetes": piscadas fortes, caretas e sacudidas da cabeça, que mudam de tipo e vão e voltam. {Ele|Ela} conta que sente um incômodo na garganta antes e que consegue segurar o pigarro nas aulas, mas depois precisa soltar. Não usa medicamentos nem drogas, e o exame neurológico é normal.`,
        clues: [
          'Em casa, às vezes solta um "hum" curto ou estala a língua, sem perceber até alguém comentar.',
          'As piscadas começaram aos 8 anos e o pigarro, por volta dos 12; os movimentos ficaram mais discretos na adolescência, mas os sons persistiram.',
          'Evita apresentar seminários e saiu {constrangido|constrangida} de uma entrevista de estágio depois que o entrevistador comentou as fungadas.',
          'Garganta e nariz são saudáveis: o pigarro e as fungadas vêm com o mesmo incômodo que antecede as piscadas. Não há pensamentos intrusivos nem rituais.',
        ],
        rulesOut: 'O pigarro vem em rajadas, junto com fungadas',
      },
    ],
  },
  {
    disorderId: 'persistent_motor_tic_disorder',
    reference: {
      label: 'Manual MSD (Profissional) — Transtorno de tique e síndrome de Tourette em crianças e adolescentes',
      url: 'https://www.msdmanuals.com/pt/profissional/pediatria/dist%C3%BArbios-neurol%C3%B3gicos-em-crian%C3%A7as/transtorno-de-tique-e-s%C3%ADndrome-de-tourette-em-crian%C3%A7as-e-adolescentes',
    },
    differential: {
      disorderId: 'tourette_disorder',
      whyNot: 'Em nenhum momento houve sons involuntários, como pigarros, fungadas, gemidos ou palavras; sem ao menos um tique vocal, o quadro permanece apenas motor.',
    },
    explanation: 'Tiques motores — piscadas fortes, caretas, movimentos bruscos da cabeça e dos ombros —, súbitos, rápidos e repetidos, precedidos por uma sensação de incômodo e que podem ser segurados por pouco tempo, iniciados antes dos 18 anos e presentes há mais de um ano, com fases de melhora e piora. Não há uso de estimulantes nem doença neurológica. Como nunca houve pigarros, fungadas, sons ou palavras, não se cumpre o Transtorno de Tourette, e a duração acima de um ano afasta um quadro provisório. A falta de pensamentos intrusivos e de rituais afasta o TOC.',
    giveaways: ['tique motor', 'tiques motores'],
    variants: [
      {
        level: 'easy',
        ages: [9, 12],
        text: `{nome}, {idade} anos, é {levado|levada} pela mãe ao pediatra por causa de tiques motores que começaram aos 7 anos: pisca com força, franze o nariz e, às vezes, puxa a cabeça para o lado. Os tiques mudam de intensidade, somem durante o sono e pioram em época de provas ou quando está {cansado|cansada}.

{nome} conta que sente uma "agonia" no olho antes de piscar e que consegue segurar por um tempo. Nunca fez sons, pigarros, fungadas ou palavras repetidas. O exame de vista foi normal, {ele|ela} não usa remédios e o exame neurológico não mostrou alterações. Na escola, presta atenção e tem boas notas.`,
        clues: [
          'Em algumas fases aparece também um abrir e fechar rápido da boca, que dura semanas e depois dá lugar aos movimentos antigos.',
          'Desde os 7 anos, os tiques passaram por fases mais fracas e mais fortes, mas nunca sumiram por mais de algumas semanas.',
          'Os colegas deram um apelido por causa das piscadas, e {ele|ela} passou a evitar ler em voz alta para a turma.',
          'Mesmo nas fases mais fortes, nunca houve barulhos com a garganta ou o nariz; também não há rituais nem pensamentos que {o|a} perturbem.',
        ],
        rulesOut: 'Nunca fez sons, pigarros, fungadas ou palavras repetidas.',
      },
      {
        level: 'medium',
        ages: [12, 14],
        text: `{nome}, {idade} anos, chega com o pai ao ambulatório de pediatria porque os colegas passaram a filmar suas caretas e postar nas redes. Nos dias piores, várias vezes por minuto, {ele|ela} estica o canto da boca, arregala os olhos e joga a cabeça para trás, num movimento rápido que diz não conseguir evitar por muito tempo.

O pai lembra que tudo começou aos 9 anos com piscadas fortes, que mais tarde deram lugar aos movimentos atuais. Há meses quase tranquilos e semanas difíceis, sobretudo em época de provas. Nunca fez barulhos com a garganta, fungadas ou palavras soltas. Não toma remédios, e o neurologista não encontrou alterações no exame.`,
        clues: [
          'Antes de cada movimento, sente um repuxar no rosto que só alivia depois de fazê-lo; {concentrado|concentrada} no videogame, quase não acontece.',
          'Teve uma fase quase sem movimentos aos 11 anos, que durou uns dois meses; depois eles voltaram, mudando de forma ao longo do tempo.',
          'Os colegas imitam as caretas no recreio; {ele|ela} abandonou o teatro da escola e não quer mais apresentar trabalhos na frente da turma.',
          'Nem nas piores semanas apareceram pigarros, gemidos ou outros sons; não há rituais, nunca usou estimulantes, e os movimentos são breves e sem ritmo regular.',
        ],
        rulesOut: 'Nunca fez barulhos com a garganta, fungadas ou palavras soltas.',
      },
      {
        level: 'hard',
        ages: [27, 40],
        text: `{nome}, {idade} anos, analista de sistemas, é {encaminhado|encaminhada} pelo fisioterapeuta que trata há meses sua dor no pescoço. Na clínica, perceberam que {nome} gira a cabeça bruscamente para o lado e aperta os olhos várias vezes por hora. {Ele|Ela} atribui tudo ao estresse do novo cargo.

Conta que os "cacoetes" existem desde os 10 anos, quando começou piscando forte; na adolescência quase sumiram e voltaram nos últimos meses. Sente um repuxar no pescoço antes do movimento e consegue segurá-lo nas reuniões, à custa de muito desconforto. A irmã, que {o|a} acompanha, confirma que nunca houve sons, pigarros ou fungadas. Não usa medicamentos, estimulantes ou drogas, e o exame neurológico é normal.`,
        clues: [
          'Além do giro da cabeça e das piscadas, às vezes encolhe o ombro direito; os movimentos aumentam à noite, vendo TV, e diminuem enquanto programa.',
          'Nunca deixaram de existir por completo: mesmo nos anos mais tranquilos, a família notava piscadas fortes em dias de cansaço ou de muita tensão.',
          'Evita apresentar resultados em reuniões e passou a trabalhar com a câmera desligada nas chamadas de vídeo para que ninguém veja os movimentos.',
          'Mesmo na infância, nas fases mais fortes, os pais nunca ouviram barulhos com a garganta ou o nariz; não há rituais nem pensamentos intrusivos.',
        ],
        rulesOut: 'nunca houve sons, pigarros ou fungadas',
      },
    ],
  },
]
