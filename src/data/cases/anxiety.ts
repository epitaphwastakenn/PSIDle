import type { DisorderCaseSet } from './types'

export const anxietyCases: DisorderCaseSet[] = [
  {
    disorderId: 'gad',
    reference: {
      label: 'Manual MSD (Profissional) — Transtorno de ansiedade generalizado',
      url: 'https://www.msdmanuals.com/pt/profissional/transtornos-psiqui%C3%A1tricos/ansiedade-e-transtornos-relacionados-a-estressores/transtorno-de-ansiedade-generalizado',
    },
    differential: {
      disorderId: 'panic',
      whyNot: 'As preocupações são contínuas e se espalham por vários temas; não há crises súbitas e inesperadas seguidas de medo de ter novas crises.',
    },
    explanation: 'Preocupação excessiva e difícil de controlar sobre vários temas do cotidiano, na maioria dos dias por mais de seis meses, com tensão muscular, cansaço, irritabilidade, dificuldade de concentração e sono ruim, causando prejuízo. Exames normais e ausência de substâncias afastam uma causa orgânica. Não há crises súbitas com medo de novas crises, como no Transtorno do Pânico, e a saúde não é o foco único, como no Transtorno de Ansiedade de Doença.',
    giveaways: [],
    variants: [
      {
        level: 'easy',
        ages: [30, 50],
        text: `{nome}, {idade} anos, analista financeir{o|a}, procura a unidade básica de saúde porque "não consegue desligar a cabeça". Há pouco mais de um ano se preocupa quase todos os dias com dinheiro, com a saúde dos pais, com prazos do trabalho e com a segurança dos filhos na volta da escola. Sabe que exagera, mas não consegue controlar.

Anda {tenso|tensa} e {cansado|cansada}, com dor nos ombros, irrita-se à toa e demora a pegar no sono. Já errou relatórios por falta de concentração. Nunca teve crises súbitas de medo. Os exames de tireoide recentes vieram normais e não usa medicamentos, energéticos ou outras substâncias.`,
        clues: [
          'Quando um problema se resolve, outro assunto ocupa o lugar logo em seguida.',
          'As preocupações começaram aos poucos e estão presentes na maior parte dos dias há mais de seis meses.',
          'Recusou uma promoção porque passaria as noites antecipando tudo o que poderia dar errado.',
          'O desconforto é contínuo; não há episódios de medo intenso que começam de repente e atingem o pico em minutos.',
        ],
        rulesOut: 'Nunca teve crises súbitas de medo.',
      },
      {
        level: 'medium',
        ages: [35, 60],
        text: `{nome}, {idade} anos, é {encaminhado|encaminhada} pela clínica médica depois de três consultas por dor no pescoço e cansaço sem causa encontrada; os exames, inclusive de tireoide, foram normais. Na conversa, conta que confere o saldo do banco várias vezes ao dia, liga para os filhos quando atrasam dez minutos e passa as noites repassando o que pode dar errado no trabalho.

A família diz que {ele|ela} "sempre foi de se preocupar", mas que piorou desde o início do ano passado e hoje quase não há um dia tranquilo. Anda com pavio curto e perde o fio das reuniões. Os assuntos mudam ao longo do dia, e nunca houve uma crise de medo que começasse de repente.`,
        clues: [
          'Diz que tenta se distrair, mas os pensamentos sobre o que pode dar errado voltam sozinhos.',
          'O padrão se mantém na maior parte dos dias há mais de um ano, sem um fato único que o tenha iniciado.',
          'Adiou as férias por passar semanas imaginando imprevistos e já não consegue relaxar nos fins de semana.',
          'Não há crises de medo intenso com pico em minutos; a tensão está presente o dia inteiro, em vários assuntos.',
        ],
        rulesOut: 'nunca houve uma crise de medo que começasse de repente',
      },
      {
        level: 'hard',
        ages: [62, 78],
        text: `{nome}, {idade} anos, {aposentado|aposentada}, é {trazido|trazida} pela filha ao ambulatório por "estômago embrulhado" e sono picado. Endoscopia e exames de sangue, inclusive de tireoide, vieram normais, e {ele|ela} recebeu o resultado com alívio: "então é nervoso".

A filha descreve um dia a dia de "e se...": e se a aposentadoria atrasar, e se o neto se acidentar de moto, e se a casa for assaltada durante a viagem — que acabou cancelada. Isso vem de uns dois anos para cá, quase todo dia. Anda com os ombros duros, cansa à toa e perde o fio da conversa. Nunca teve uma crise de medo que viesse de repente.`,
        clues: [
          'Tenta pensar em outra coisa, mas as preocupações voltam sozinhas, uma puxando a outra.',
          'O padrão começou devagar, antes da aposentadoria, e se mantém na maior parte dos dias há cerca de dois anos.',
          'Adia decisões simples, como pagar contas ou marcar viagens, com receio de que algo dê errado.',
          'Os exames normais acalmam; a saúde é só um dos muitos temas, e não o centro das preocupações.',
        ],
        rulesOut: 'Nunca teve uma crise de medo que viesse de repente.',
      },
    ],
  },
  {
    disorderId: 'panic',
    reference: {
      label: 'Manual MSD (Profissional) — Ataques e transtorno de pânico',
      url: 'https://www.msdmanuals.com/pt/profissional/transtornos-psiqui%C3%A1tricos/transtornos-de-ansiedade-e-transtornos-relacionados-a-trauma-e-a-estressores/ataques-e-transtorno-de-p%C3%A2nico',
    },
    differential: {
      disorderId: 'agoraphobia',
      whyNot: 'Não há medo nem evitação de transporte público, filas, multidões, lugares fechados ou de sair de casa sem companhia; o temor é ter uma nova crise, em qualquer lugar.',
    },
    explanation: 'Crises recorrentes e inesperadas de medo intenso, que começam de repente e atingem o pico em minutos, com palpitações, falta de ar, tremor, formigamento, tontura e medo de morrer, seguidas de mais de um mês de preocupação com novas crises e de mudanças de comportamento (largar a atividade física, vigiar o pulso, carregar remédio). Exames clínicos normais e a ausência de cafeína em excesso, medicamentos ou drogas afastam causa médica ou substância. Não é Agorafobia porque não há medo nem evitação de transporte, multidões, lugares fechados ou de sair sem companhia; não é TAG porque o medo se concentra nas crises.',
    giveaways: [],
    variants: [
      {
        level: 'easy',
        ages: [20, 34],
        text: `{nome}, {idade} anos, {operador|operadora} de telemarketing, procura a UBS depois de ir três vezes ao pronto-atendimento achando que estava infartando. Há dois meses tem crises que surgem do nada, vendo TV, no trabalho, até de madrugada: o coração dispara, falta o ar, as mãos tremem e formigam, o peito aperta e vem um medo enorme de morrer. Em uns dez minutos chega ao auge e depois vai passando.

Desde a primeira crise vive {preocupado|preocupada} com a próxima: largou a academia e mede o pulso várias vezes ao dia. Ainda assim, continua pegando o metrô lotado para o trabalho e indo ao mercado sem companhia. Eletrocardiograma e exames de sangue, inclusive de tireoide, vieram normais, e não usa remédios, energéticos, café em excesso ou drogas.`,
        clues: [
          'Nas crises também sente tontura, calafrios e a impressão de que vai perder o controle.',
          'Começou há dois meses, sem motivo aparente; desde então foram sete crises, e a preocupação com uma nova não dá trégua.',
          'Perdeu dias de trabalho nas idas ao pronto-atendimento e dorme mal, {atento|atenta} a qualquer batida diferente do coração.',
          'Não evita ônibus, filas, lugares fechados nem sair de casa sem companhia; teme a crise em si, onde quer que esteja.',
        ],
        rulesOut: 'continua pegando o metrô lotado para o trabalho e indo ao mercado sem companhia',
      },
      {
        level: 'medium',
        ages: [26, 42],
        text: `{nome}, {idade} anos, {professor|professora} de educação física, chega ao ambulatório {encaminhado|encaminhada} pela cardiologia, que não encontrou nada no coração. Nos últimos quatro meses, foi cinco vezes à UPA: de repente, planejando aulas, no almoço de domingo ou {deitado|deitada} no sofá, fica {pálido|pálida} e {suado|suada}, pede que abram as janelas, diz que o coração vai sair pela boca e que vai morrer. Quinze minutos depois está {exausto|exausta}, mas bem.

Hoje dá aula da arquibancada, sem correr com os alunos, e confere os batimentos no relógio várias vezes ao dia. Continua indo de ônibus para a escola e ao estádio aos domingos. Eletrocardiograma, teste de esforço e exames de sangue, inclusive de tireoide, deram normais, e não usa remédios, termogênicos, energéticos nem drogas.`,
        clues: [
          'Nas crises também treme, sente formigamento nas mãos e acha que vai desmaiar.',
          'As crises começaram há quatro meses, sem nenhum acontecimento que as explicasse, e desde então vive à espera da próxima.',
          'Recusou coordenar os jogos escolares deste ano e já perdeu vários dias de aula nas idas à UPA.',
          'Sai {sozinho|sozinha}, enfrenta filas de banco e sessões de cinema sem receio; o que teme é a crise em si, que pode vir em qualquer lugar.',
        ],
        rulesOut: 'Continua indo de ônibus para a escola e ao estádio aos domingos.',
      },
      {
        level: 'hard',
        ages: [38, 52],
        text: `{nome}, {idade} anos, {cabeleireiro|cabeleireira}, é {encaminhado|encaminhada} pelo otorrino após quase um ano tratando "labirintite" sem melhora; os exames do ouvido e a ressonância vieram normais. Conta que a tontura chega de supetão, junto com o coração aos pulos, suor frio, dormência nos lábios e a certeza de que vai desmaiar ou morrer ali; em poucos minutos atinge o máximo e, em meia hora, some.

Já aconteceu no salão, lavando louça e de madrugada. Desde as primeiras vezes vive à espera da próxima: cortou o café, sem mudança, evita subir a ladeira de casa a pé e não sai sem o remédio de labirinto no bolso. Segue indo de ônibus ao centro e às festas da igreja sem receio. Exames de sangue, inclusive de tireoide, e eletrocardiograma são normais.`,
        clues: [
          'Durante os episódios também sente aperto no peito, falta de ar e um tremor que não consegue controlar.',
          'Os episódios começaram há quase um ano, antes de qualquer remédio, e mantêm a mesma frequência com ou sem o remédio de labirinto.',
          'Reduziu os horários no salão com receio de ter um episódio atendendo cliente e perdeu boa parte da renda.',
          'Não tem receio de multidões, lugares fechados ou de sair {sozinho|sozinha}; os episódios vêm tanto em casa quanto na rua.',
        ],
        rulesOut: 'Segue indo de ônibus ao centro e às festas da igreja sem receio.',
      },
    ],
  },
  {
    disorderId: 'agoraphobia',
    reference: {
      label: 'Manual MSD (Profissional) — Agorafobia',
      url: 'https://www.msdmanuals.com/pt/profissional/transtornos-psiqui%C3%A1tricos/transtornos-de-ansiedade-e-transtornos-relacionados-a-trauma-e-a-estressores/agorafobia',
    },
    differential: {
      disorderId: 'panic',
      whyNot: 'Não há crises inesperadas, vindas do nada: o mal-estar surge apenas nas situações temidas ou ao antecipá-las e passa quando a pessoa sai delas ou volta para casa.',
    },
    explanation: 'Medo marcado e evitação de duas ou mais situações típicas — transporte público, lugares abertos ou fechados, filas e multidões, sair de casa sem companhia — pelo receio de passar mal, desmaiar ou cair e não conseguir sair ou receber ajuda, há mais de seis meses e com prejuízo importante. Não é Transtorno do Pânico porque não há crises inesperadas: o mal-estar só aparece nas situações temidas. Não é Fobia Específica porque o medo abrange vários grupos de situações, nem Transtorno de Ansiedade Social, porque o receio não é de ser julgado. Humor, memória e exames preservados afastam outras causas.',
    giveaways: [],
    variants: [
      {
        level: 'easy',
        ages: [19, 27],
        text: `{nome}, {idade} anos, vem à UBS com a mãe porque há mais de um ano quase não sai de casa sem companhia. Tem pavor de pegar ônibus ou metrô, entrar no shopping e ficar em filas: pensa que vai passar mal, desmaiar ou perder o controle e não vai conseguir sair dali nem ter quem ajude. Sente uma ansiedade forte só de imaginar.

Trancou a faculdade porque não consegue fazer o trajeto e só vai ao mercado de carro, com a irmã, em horários vazios. Em casa fica {tranquilo|tranquila}, mesmo {sozinho|sozinha}. Nunca teve crises de medo que viessem do nada; o mal-estar só aparece nessas situações e passa quando volta para casa. Os exames clínicos recentes vieram normais.`,
        clues: [
          'Não se importa com o que os outros pensam; o medo é de passar mal longe de uma saída, e com alguém de confiança consegue ir a alguns lugares.',
          'Começou aos poucos no fim do ensino médio, sem nenhum acontecimento marcante, e foi tomando cada vez mais lugares nos últimos dois anos.',
          'Perdeu o estágio, parou de ir à igreja e depende da família para ir a consultas e fazer compras.',
          'Mesmo em dias difíceis, nunca teve crise súbita de medo em casa ou em situações tranquilas; o mal-estar vem só ao enfrentar ou imaginar esses lugares.',
        ],
        rulesOut: 'Nunca teve crises de medo que viessem do nada',
      },
      {
        level: 'medium',
        ages: [28, 45],
        text: `{nome}, {idade} anos, auxiliar de contabilidade, chega ao ambulatório {encaminhado|encaminhada} pela médica do trabalho depois de pedir pela terceira vez para trabalhar só de casa. Conta que deixou o trem e paga carro de aplicativo, mesmo apertando o orçamento; vai ao mercado às sete da manhã, quando está vazio, e escolhe o caixa mais perto da porta. Na missa, só fica no último banco, junto à saída.

Isso vem desde o fim do ano retrasado. Recusou a festa da firma num salão lotado, "com uma porta só", e não vai ao centro sem alguém da família. Explica que teme passar mal e não ter como sair. Em casa ou no escritório, nunca teve um mal-estar que viesse do nada.`,
        clues: [
          'Quando não dá para evitar, sente as pernas bambas, o coração acelerado e a necessidade urgente de procurar a saída.',
          'O receio começou pelo trem lotado e foi se estendendo, em dois anos, a mercados, igrejas e qualquer lugar cheio.',
          'Gasta quase um terço do salário em corridas de aplicativo e já perdeu uma promoção que exigia ir à sede, no centro.',
          'Não tem crises inesperadas; o mal-estar só aparece nesses lugares, ou ao imaginá-los, e passa assim que sai deles.',
        ],
        rulesOut: 'Em casa ou no escritório, nunca teve um mal-estar que viesse do nada.',
      },
      {
        level: 'hard',
        ages: [66, 80],
        text: `{nome}, {idade} anos, {aposentado|aposentada}, é {levado|levada} pela neta à geriatria: a família acha que {ele|ela} está ficando {esquecido|esquecida} ou {tristonho|tristonha}, porque largou o grupo da terceira idade, a feira e a missa. Os testes de memória e os exames de rotina vieram normais e, em casa, segue {bem-humorado|bem-humorada}, cuida das plantas e recebe visitas com alegria.

A neta conta que só sai de carro e com alguém da família; recusa o ônibus do grupo e a fila do banco: "e se eu cair ou passar mal no meio do povo e ninguém me acudir?". A fisioterapeuta garante que anda com firmeza. Isso vem de uns dois anos para cá. Nunca teve um mal-estar repentino estando em casa ou em lugar tranquilo.`,
        clues: [
          'Quando a filha insiste em levá-l{o|a} ao supermercado, sua frio, fica com as pernas bambas e procura logo um apoio perto da porta.',
          'O receio começou devagar, há uns dois anos, sem queda nem susto que o explicasse, e foi alcançando cada vez mais lugares.',
          'Deixou de buscar a aposentadoria no banco, de ir às consultas sem companhia e de visitar a irmã, que mora do outro lado da cidade.',
          'Não há crises de medo que surjam do nada; o mal-estar só aparece ao sair ou ao imaginar esses lugares, e passa em casa.',
        ],
        rulesOut: 'Nunca teve um mal-estar repentino estando em casa ou em lugar tranquilo.',
      },
    ],
  },
  {
    disorderId: 'social_anxiety',
    reference: {
      label: 'Manual MSD (Profissional) — Transtorno de ansiedade social',
      url: 'https://www.msdmanuals.com/pt/profissional/transtornos-psiqui%C3%A1tricos/transtornos-de-ansiedade-e-transtornos-relacionados-a-trauma-e-a-estressores/transtorno-de-ansiedade-social',
    },
    differential: {
      disorderId: 'avoidant_personality_disorder',
      whyNot: 'O medo se limita a situações de exposição e avaliação; com amigos próximos e pessoas de confiança há espontaneidade, a autoestima está preservada e as relações em geral não são evitadas.',
    },
    explanation: 'Medo marcado e persistente de situações em que a pessoa é observada e pode ser avaliada — falar em público, ler em voz alta, comer, assinar ou se expor diante de outros —, com receio de que percebam sinais de nervosismo (rubor, tremor, suor) e a julguem, evitação ou sofrimento intenso, por mais de seis meses e com prejuízo. Não é Transtorno de Personalidade Esquiva porque o medo se restringe a situações de exposição: há amizades próximas, vida afetiva e autoestima preservadas fora delas. Não há crises inesperadas, preocupação com a aparência ou com odor, nem causa médica.',
    giveaways: [],
    variants: [
      {
        level: 'easy',
        ages: [19, 25],
        text: `{nome}, {idade} anos, estudante de administração, procura o serviço de psicologia da faculdade porque vai reprovar em duas matérias: não consegue apresentar seminários. Só de pensar em falar diante da turma sente uma ansiedade enorme, o rosto queima, a voz treme e tem certeza de que todos vão perceber e achá-l{o|a} {ridículo|ridícula}.

Também evita comer no bandejão, onde "todo mundo fica olhando", e nunca faz perguntas em aula. Isso vem desde os 13 anos e piorou na faculdade. Fora da sala de aula, sai com os amigos, namora e se acha tão capaz quanto os colegas. Nunca teve crises de medo fora dessas situações e não usa remédios ou drogas.`,
        clues: [
          'Antes de cada apresentação passa noites ensaiando e imaginando os colegas rindo do seu tremor e do rosto vermelho.',
          'Começou no oitavo ano, depois de travar numa leitura em voz alta, e se mantém desde então, pior nos semestres com seminários.',
          'Já trocou de turma para fugir de uma disciplina com seminários semanais e recusou um estágio que exigia apresentações para a diretoria.',
          'Com a família e a turma de amigos é {espontâneo|espontânea}; o medo aparece só quando se sente {observado|observada} e {avaliado|avaliada}.',
        ],
        rulesOut: 'Fora da sala de aula, sai com os amigos, namora e se acha tão capaz quanto os colegas.',
      },
      {
        level: 'medium',
        ages: [15, 16],
        text: `{nome}, {idade} anos, é {levado|levada} pela mãe ao ambulatório de adolescentes porque as notas despencaram no primeiro ano do ensino médio. A coordenação conta que {ele|ela} faltou em todos os dias de apresentação de trabalho, lancha {sozinho|sozinha} na biblioteca para não comer na frente da turma e, quando precisa ler em voz alta, fica {vermelho|vermelha} e a voz treme.

Em casa, pede que a mãe ligue para a pizzaria por {ele|ela}. Isso vem desde o oitavo ano e tem piorado. Nos fins de semana, joga bola com os vizinhos e é quem mais faz piada na turma do bairro; diz que sabe a matéria, só não suporta todo mundo olhando. Não usa drogas e nunca teve crises de medo do nada.`,
        clues: [
          'Na véspera das apresentações não dorme, imaginando os colegas cochichando sobre o seu nervosismo; na hora, as mãos suam e tremem.',
          'Começou por volta dos 13 anos, quando trocou de escola, e vem se mantendo desde então, pior a cada começo de semestre.',
          'Corre o risco de repetir o ano pelas notas zeradas nas apresentações e desistiu do curso de inglês por causa das conversas em dupla.',
          'Com os amigos de sempre se sente à vontade e não se acha inferior a ninguém; o problema surge só quando precisa se expor.',
        ],
        rulesOut: 'joga bola com os vizinhos e é quem mais faz piada na turma do bairro',
      },
      {
        level: 'hard',
        ages: [26, 40],
        text: `{nome}, {idade} anos, analista de sistemas, chega à dermatologia pedindo toxina botulínica para o suor nas mãos e nas axilas. A médica estranha o relato: a camisa encharca nas reuniões semanais, ao assinar papéis no balcão do banco e no almoço com a equipe, mas em casa e nos fins de semana as mãos ficam secas. {nome} passa essas horas escondendo as mãos "para ninguém perceber".

Faz home office sempre que pode, deixa a câmera desligada nas chamadas e já recusou duas vezes chefiar a equipe. Diz que é assim desde a adolescência. Com os amigos do futebol de quinta, que conhece há anos, conversa e brinca à vontade, e se considera competente no que faz. Os exames, inclusive de tireoide, são normais.`,
        clues: [
          'Não se preocupa com cheiro nem com a aparência: teme que reparem nas mãos molhadas e {o|a} achem {inseguro|insegura}.',
          'Começou no ensino médio, quando passou a evitar ir ao quadro, e se mantém há anos, pior desde que as reuniões ficaram semanais.',
          'Perdeu um aumento ao recusar a liderança, que exigiria conduzir reuniões, e é {visto|vista} pela chefia como alguém que some nelas.',
          'Fora do trabalho tem amizades antigas, mora com quem namora e não se acha inferior; o desconforto surge só quando é {observado|observada} ou {avaliado|avaliada}.',
        ],
        rulesOut: 'Com os amigos do futebol de quinta, que conhece há anos, conversa e brinca à vontade, e se considera competente no que faz.',
      },
    ],
  },
  {
    disorderId: 'specific_phobia',
    reference: {
      label: 'Manual MSD (Profissional) — Fobias específicas',
      url: 'https://www.msdmanuals.com/pt/profissional/transtornos-psiqui%C3%A1tricos/transtornos-de-ansiedade-e-transtornos-relacionados-a-trauma-e-a-estressores/fobias-espec%C3%ADficas',
    },
    differential: {
      disorderId: 'panic',
      whyNot: 'O medo surge de forma previsível, só diante do objeto ou da situação temida ou ao antecipá-los; não há crises inesperadas nem preocupação constante com novas crises.',
    },
    explanation: 'Medo intenso, imediato e desproporcional diante de um objeto ou situação bem delimitado — animal, avião, sangue ou agulha —, com evitação ativa ou enfrentamento sob grande sofrimento, há mais de seis meses e com prejuízo no trabalho, na família ou na saúde. No tipo sangue-injeção-ferimentos, a queda de pressão com desmaio é característica. Não é Transtorno do Pânico porque as reações só aparecem diante do estímulo temido, nunca de forma inesperada; não é Agorafobia porque o medo não se espalha por várias situações nem envolve o receio de ficar sem saída ou sem ajuda.',
    giveaways: [],
    variants: [
      {
        level: 'easy',
        ages: [25, 45],
        text: `{nome}, {idade} anos, agente {comunitário|comunitária} de saúde, procura a própria UBS porque está deixando de fazer visitas: não consegue entrar em quintal com cachorro. Basta ouvir um latido para o coração disparar, as pernas tremerem e vir uma ansiedade enorme; já atravessou a rua no meio dos carros para fugir de um vira-lata preso na coleira.

Tem esse medo desde criança, sem nunca ter sido {mordido|mordida} ou {atacado|atacada}, e sabe que é exagerado. A enfermeira já remanejou metade das suas casas e {ele|ela} pensa em pedir demissão. Longe de cães, anda de ônibus, vai a shows e nunca teve uma crise de medo sem motivo.`,
        clues: [
          'Ao ver um cachorro, mesmo pequeno ou preso, sente falta de ar e uma vontade incontrolável de sair correndo.',
          'O medo existe desde os seis ou sete anos, sem episódio que o explique, e nunca deu trégua, mesmo diante de cães mansos.',
          'Deixou de visitar a irmã, que tem um cão, e muda o trajeto até o trabalho para não passar por casas com cachorro.',
          'As reações só aparecem quando há um cão por perto ou quando imagina encontrar um; fora disso, não há crises.',
        ],
        rulesOut: 'nunca teve uma crise de medo sem motivo',
      },
      {
        level: 'medium',
        ages: [30, 50],
        text: `{nome}, {idade} anos, {vendedor|vendedora} de uma rede de farmácias, chega ao ambulatório {encaminhado|encaminhada} pelo médico da empresa depois de recusar uma vaga de gerente regional que exigia voos toda semana. Para ver a mãe no Piauí, encara 40 horas de ônibus. Na única vez em que tentou voar, há três anos, travou no portão de embarque, suando e tremendo, {certo|certa} de que o avião ia cair, e voltou para casa.

Só de ver uma passagem comprada perde o sono por dias; já fez a família desmarcar duas viagens de férias. No mais, leva vida comum: anda de metrô, usa elevador, vai a estádio. Fora de aeroportos e aviões, nunca passou por nada parecido.`,
        clues: [
          'Ao ouvir um avião passando baixo ou ver notícias sobre voos, sente o estômago gelar e muda de canal.',
          'O medo de voar existe desde a adolescência e se mantém igual há muitos anos, sem nenhum acidente ou susto que o explique.',
          'A recusa da promoção reduziu sua renda, e a família já discute por causa das férias sempre feitas de ônibus.',
          'Não tem crises fora desse contexto nem vive com medo de novas crises; o que teme é o avião em si.',
        ],
        rulesOut: 'Fora de aeroportos e aviões, nunca passou por nada parecido.',
      },
      {
        level: 'hard',
        ages: [48, 62],
        text: `{nome}, {idade} anos, {mecânico|mecânica}, chega à cardiologia {encaminhado|encaminhada} pela UBS por três desmaios no último ano; eletrocardiograma, Holter e ecocardiograma vieram normais. A médica repara que o colesterol, alto no último exame, está sem controle: {ele|ela} não faz exame de sangue há cinco anos, "por falta de tempo", e já faltou a duas coletas marcadas.

O primeiro desmaio foi justamente na coleta que enfim aceitou fazer; o segundo, ao socorrer o neto que abriu o joelho na calçada; o terceiro, diante de um programa de cirurgias na TV. Em todos, sentiu calor, a vista escureceu e apagou por segundos. Conta, sem graça, que desde {menino|menina} vira o rosto nas vacinas. Fora disso, nunca passou mal.`,
        clues: [
          'Não teme o resultado dos exames, e sim a agulha: só de imaginá-la, sente o estômago revirar e um medo que reconhece como exagerado.',
          'O medo de sangue e agulhas vem da infância, sem nenhum acidente que o explique, e nunca melhorou com o tempo.',
          'Adiou por anos o tratamento dentário e o controle do colesterol, e sai da oficina quando um colega se machuca.',
          'Os episódios só acontecem diante de sangue, ferimentos ou agulhas; não há crises inesperadas nem medo constante de novas crises.',
        ],
        rulesOut: 'Fora disso, nunca passou mal.',
      },
    ],
  },
  {
    disorderId: 'separation_anxiety_disorder',
    reference: {
      label: 'StatPearls (NCBI Bookshelf) — Separation Anxiety Disorder',
      url: 'https://www.ncbi.nlm.nih.gov/books/NBK560793/',
    },
    differential: {
      disorderId: 'gad',
      whyNot: 'As preocupações giram só em torno da separação e da segurança das figuras de apego; com elas por perto, não há preocupação excessiva com outros temas do dia a dia.',
    },
    explanation: 'Medo excessivo e inadequado para a idade de se separar das figuras de apego: sofrimento nas despedidas, preocupação de que algo grave aconteça a elas, recusa em ir à escola, dormir longe ou se afastar, pesadelos e queixas físicas nas separações, por pelo menos quatro semanas em crianças e seis meses em adultos, com prejuízo. Não é TAG porque as preocupações se restringem à separação. Não é Agorafobia porque o medo não é dos lugares, e sim de estar longe de quem ama; a boa interação social e a flexibilidade afastam o Transtorno do Espectro Autista.',
    giveaways: [],
    variants: [
      {
        level: 'easy',
        ages: [6, 8],
        text: `{nome}, {idade} anos, é {levado|levada} pela mãe ao pediatra da UBS porque, desde a volta das férias, há dois meses, chora e implora todas as manhãs para não ir à escola. Diz que tem medo de que a mãe sofra um acidente ou "suma" enquanto {ele|ela} estiver na aula, e reclama de dor de barriga, que some nos fins de semana.

Não dorme mais {sozinho|sozinha}, acorda com pesadelos em que a mãe vai embora e, em casa, vai atrás dela de cômodo em cômodo. Na escola, depois que a mãe sai, demora a se acalmar, mas brinca e já fez amigos. Não se preocupa com notas, com a própria saúde ou com outros assuntos: a ansiedade aparece só na hora da separação.`,
        clues: [
          'Pede à secretaria da escola para ligar para a mãe e pergunta várias vezes por dia a que horas ela vai voltar.',
          'Começou na volta às aulas e se mantém há cerca de dois meses, sem melhora, mesmo com a rotina da escola já conhecida.',
          'Já faltou a mais de dez dias de aula e deixou de ir ao aniversário de um primo porque a mãe não ficaria na festa.',
          'Quando está com a mãe, fica {despreocupado|despreocupada} e alegre; não antecipa problemas com escola, saúde ou dinheiro.',
        ],
        rulesOut: 'Não se preocupa com notas, com a própria saúde ou com outros assuntos',
      },
      {
        level: 'medium',
        ages: [9, 11],
        text: `{nome}, {idade} anos, é {encaminhado|encaminhada} pela escola ao CAPSi: desde o início do ano letivo, vai à coordenação quase todo dia com dor de cabeça e pede para ligar para casa; quando a mãe atende, melhora na hora. Recusou o acampamento da turma e as festas do pijama dos colegas: "e se acontecer alguma coisa com a minha mãe?".

Em casa, espera a mãe na porta do banheiro e voltou a dormir na cama dos pais. Nos plantões noturnos dela, fica {acordado|acordada} até ouvir a chave na porta. Com a família em casa, joga bola na rua com os vizinhos, brinca e conversa sem dificuldade e não se aflige com provas, com a própria saúde ou com o noticiário.`,
        clues: [
          'Acorda de madrugada com sonhos em que se perde da mãe numa rodoviária e corre para o quarto dos pais.',
          'Começou na volta às aulas, em fevereiro, e já dura mais de três meses, pior nas semanas de plantão da mãe.',
          'As notas caíram pelas aulas perdidas na coordenação, e a turma deixou de convidá-l{o|a} para passeios.',
          'Quando sabe que a mãe está bem e por perto, fica {tranquilo|tranquila}; as preocupações nunca se espalham para outros assuntos.',
        ],
        rulesOut: 'não se aflige com provas, com a própria saúde ou com o noticiário',
      },
      {
        level: 'hard',
        ages: [32, 46],
        text: `{nome}, {idade} anos, comerciante, procura a UBS pedindo um remédio para dormir. O cônjuge dirige caminhão há quinze anos, mas, de um ano para cá, as semanas de viagem viraram noites em claro: liga de hora em hora, segue o caminhão pelo aplicativo e imagina acidentes na estrada; quando cochila, sonha com a notícia de uma tragédia.

Nos dias de partida, tem dor de cabeça e enjoo. Recusou um curso em outra cidade para não se afastar da família e não deixa os filhos dormirem na casa da avó. Nas semanas em que o cônjuge está em casa, dorme bem e não se preocupa com contas, saúde ou a loja. Toca o negócio e decide as coisas da casa sem ajuda.`,
        clues: [
          'Vai {sozinho|sozinha} ao centro e ao banco sem receio, mas, quando os filhos viajam com a escola, liga para os professores até que respondam.',
          'Começou há pouco mais de um ano, sem acidente nem perda na família, e se repete a cada viagem desde então.',
          'Fecha a loja mais cedo nas semanas de viagem, já perdeu clientes e as discussões em casa por causa das ligações aumentaram.',
          'Com a família por perto, não antecipa problemas; as preocupações aparecem só quando alguém querido está longe.',
        ],
        rulesOut: 'Nas semanas em que o cônjuge está em casa, dorme bem e não se preocupa com contas, saúde ou a loja.',
      },
    ],
  },
  {
    disorderId: 'selective_mutism',
    reference: {
      label: 'IACAPAP — Tratado de Saúde Mental da Infância e Adolescência, cap. F.5: Mutismo Seletivo (2019)',
      url: 'https://www.iacapap.org/_Resources/Persistent/257ef345b01138db5e53572d65510504bbddc342/F.5-MUTISMO-SELETIVO-ATUALIZADO-2019-PORTUGUES.pdf',
    },
    differential: {
      disorderId: 'social_anxiety',
      whyNot: 'O bloqueio se restringe à fala: a criança brinca em grupo, se apresenta em atividades sem fala e vai a festas sem sinais de medo de ser observada ou julgada.',
    },
    explanation: 'Falha consistente em falar em situações em que se espera a fala, como a escola, apesar de falar normalmente em casa e com pessoas próximas, por mais de um mês (sem contar o primeiro mês de aula) e com prejuízo escolar e social. Audição, linguagem e domínio do idioma normais afastam Transtorno de Linguagem e barreira linguística; a reciprocidade social e o brincar imaginativo afastam o Transtorno do Espectro Autista. Não é Transtorno de Ansiedade Social porque não há medo de avaliação em outras situações: a criança brinca, se apresenta sem falar e vai a festas sem sofrimento.',
    giveaways: [],
    variants: [
      {
        level: 'easy',
        ages: [6, 7],
        text: `{nome}, {idade} anos, é {levado|levada} pelos pais à UBS a pedido da professora do 1º ano: na escola, não diz uma palavra desde que entrou na pré-escola, há um ano e meio, nem para responder à chamada ou pedir para ir ao banheiro. Comunica-se apontando, balançando a cabeça ou desenhando.

Em casa, fala sem parar com os pais, os irmãos e os primos, conta histórias e canta. A fonoaudióloga ouviu gravações caseiras e achou a linguagem adequada para a idade; a audição é normal. No recreio, brinca de pega-pega com os colegas e dançou na festa junina sem hesitar; o bloqueio é só para falar.`,
        clues: [
          'Quando um adulto de fora da família lhe dirige a palavra, fica imóvel, de olhos baixos, e espera a mãe responder por {ele|ela}.',
          'O silêncio começou no primeiro dia da pré-escola e não melhorou com o tempo, mesmo depois de conhecer bem a turma.',
          'A professora não consegue avaliar a leitura em voz alta, e {ele|ela} já molhou a roupa por não conseguir pedir para ir ao banheiro.',
          'Não demonstra medo de ser {observado|observada}: participa das brincadeiras, se apresenta em danças e vai feliz a aniversários, só sem falar.',
        ],
        rulesOut: 'No recreio, brinca de pega-pega com os colegas e dançou na festa junina sem hesitar',
      },
      {
        level: 'medium',
        ages: [8, 10],
        text: `{nome}, {idade} anos, chega ao ambulatório com a mãe, que responde a tudo enquanto {ele|ela} sorri e mexe nos cordões da mochila. Segundo a escola, no 3º ano ainda só cochicha com a melhor amiga, num canto do pátio, e entrega bilhetes à professora quando precisa de algo; na leitura em voz alta, fica em silêncio até chamarem outro aluno.

A mãe mostra vídeos do aniversário dos primos: {nome} comanda as brincadeiras, conta piadas e discute com os irmãos. Nunca falou em voz alta na escola, mas participa da educação física e das peças da turma, em papéis sem fala, sem sinal de aflição. A avaliação de audição e de linguagem, feita também com gravações caseiras, foi normal.`,
        clues: [
          'Quando um adulto desconhecido faz uma pergunta, trava, desvia o olhar e só responde com a cabeça.',
          'O silêncio fora de casa começou aos quatro anos, na entrada da pré-escola, e se mantém desde então em todas as séries.',
          'Nunca apresentou um trabalho oral, tira notas baixas em leitura por não ser {avaliado|avaliada} e não pede ajuda quando se machuca no recreio.',
          'Não teme ser {observado|observada} nem {julgado|julgada}: vai feliz a festas, dança e brinca em grupo; a dificuldade aparece só na hora de falar.',
        ],
        rulesOut: 'participa da educação física e das peças da turma, em papéis sem fala, sem sinal de aflição',
      },
      {
        level: 'hard',
        ages: [9, 12],
        text: `{nome}, {idade} anos, nasceu na Venezuela e chegou a Boa Vista há três anos. A escola pede avaliação porque {ele|ela} não fala em sala desde a matrícula: no começo, todos atribuíram ao idioma, e a professora ainda escreve as perguntas em espanhol para {ele|ela}.

Na rua de casa, porém, joga bola e discute com os vizinhos em português fluente, e com os irmãos alterna as duas línguas. Nas tarefas escritas, usa um português correto. No recreio, brinca em grupo e dança nas apresentações sem aflição, mas emudece sempre que um adulto ou a turma espera que diga algo. A mudança foi planejada, com emprego garantido para o pai.`,
        clues: [
          'Quando a coordenadora lhe pergunta algo, mesmo em espanhol, olha para o chão e espera em silêncio, sem conseguir responder.',
          'O silêncio fora de casa já existia na pré-escola, na Venezuela; a audição e o desenvolvimento da fala nas duas línguas são normais.',
          'Tira notas baixas em leitura oral, não consegue tirar dúvidas e fica de fora dos trabalhos em grupo que exigem falar.',
          'Fora a fala, não mostra medo de ser {observado|observada}: vai feliz a festas, se apresenta dançando e brinca com qualquer grupo.',
        ],
        rulesOut: 'No recreio, brinca em grupo e dança nas apresentações sem aflição',
      },
    ],
  },
  {
    disorderId: 'anxiety_disorder_due_to_medical_condition',
    reference: {
      label: 'Manual MSD (Profissional) — Visão geral dos transtornos de ansiedade',
      url: 'https://www.msdmanuals.com/pt/profissional/transtornos-psiqui%C3%A1tricos/transtornos-de-ansiedade-e-transtornos-relacionados-a-trauma-e-a-estressores/vis%C3%A3o-geral-dos-transtornos-de-ansiedade',
    },
    differential: {
      disorderId: 'substance_medication_induced_anxiety_disorder',
      whyNot: 'Não há medicamento, cafeína, suplemento ou droga capaz de provocar os sintomas; eles acompanham uma doença documentada nos exames e cedem com o tratamento dela.',
    },
    explanation: 'A ansiedade domina o quadro e é consequência fisiológica direta de uma doença comprovada por exame físico e laboratorial (hipertireoidismo, feocromocitoma, taquicardia paroxística): começou junto com ela, sem história prévia de ansiedade, e cedeu com o tratamento, sem confusão mental. Não é Transtorno de Ansiedade Induzido por Substância/Medicamento porque não há remédio, cafeína ou droga implicados. Não é Transtorno do Pânico nem TAG primários, porque a doença explica os sintomas, nem reação psicológica ao diagnóstico (Transtorno de Adaptação), já que os sintomas vieram antes dele.',
    giveaways: ['hipertireoid', 'tireotox', 'doenca de graves', 'bocio', 'feocromocitoma', 'paraganglioma', 'metanefrin', 'catecolamin', 'arritmia', 'taquicardia supraventricular', 'taquicardia paroxistica', 'fibrilacao'],
    variants: [
      {
        level: 'easy',
        ages: [25, 45],
        text: `{nome}, {idade} anos, {bancário|bancária}, procura a UBS porque há três meses vive com uma ansiedade que não reconhece em si: {inquieto|inquieta}, com o coração acelerado o dia todo, as mãos trêmulas e o sono curto. Sente calor quando todos estão com frio e perdeu 7 kg comendo mais do que antes.

Nunca teve problemas de nervos. O exame físico mostrou a tireoide aumentada, pulso de 118 em repouso e olhos mais saltados, e os exames de sangue confirmaram hipertireoidismo por doença de Graves. Não toma remédios, hormônios ou suplementos e não usa energéticos, café em excesso nem drogas. Com o tratamento iniciado pelo endocrinologista, a agitação começou a ceder.`,
        clues: [
          'Sente-se {irritado|irritada} e {apreensivo|apreensiva} o tempo todo, sem euforia nem planos grandiosos, e não consegue se concentrar.',
          'Os sintomas começaram há três meses, junto com a perda de peso, e foram diminuindo semanas após o início do remédio para a tireoide.',
          'Errou contas no caixa, foi {advertido|advertida} pela gerência e deixou de ir aos encontros da igreja por não conseguir ficar {parado|parada}.',
          'Não usa medicamentos, hormônio de tireoide, termogênicos, energéticos ou drogas que pudessem explicar a agitação.',
        ],
        rulesOut: 'Não toma remédios, hormônios ou suplementos e não usa energéticos, café em excesso nem drogas.',
      },
      {
        level: 'medium',
        ages: [35, 55],
        text: `{nome}, {idade} anos, motorista de aplicativo, chega ao ambulatório de saúde mental {encaminhado|encaminhada} pela clínica médica, que investiga suas "crises de nervoso". Há oito meses, várias vezes por semana, a cabeça lateja de repente, o coração dispara, vem um suor frio e um pressentimento de que algo terrível vai acontecer; fica {pálido|pálida}, treme e, em uns vinte minutos, tudo passa.

Numa delas, a pressão medida na farmácia estava em 230 por 130; fora das crises, é normal. O exame de urina de 24 horas mostrou derivados da adrenalina muito acima do normal, e a tomografia, um nódulo de 4 cm na glândula acima do rim esquerdo. Nunca teve problemas de nervos e não usa remédios, descongestionantes, café em excesso nem drogas.`,
        clues: [
          'Durante as crises também sente náusea, aperto no peito e a sensação de que vai morrer.',
          'As crises começaram há oito meses, sem nenhum episódio parecido antes, e cessaram por completo depois da retirada cirúrgica do nódulo.',
          'Reduziu as corridas pela metade, com medo de passar mal ao volante, e a renda da família caiu.',
          'Não usa medicamentos, termogênicos, energéticos, descongestionantes nem drogas que pudessem disparar as crises.',
        ],
        rulesOut: 'não usa remédios, descongestionantes, café em excesso nem drogas',
      },
      {
        level: 'hard',
        ages: [58, 72],
        text: `{nome}, {idade} anos, {aposentado|aposentada} dos Correios, é {levado|levada} pela filha à UBS: desde que parou de trabalhar, há um ano, anda "{nervoso|nervosa}" e já foi duas vezes ao pronto-socorro. A família acha que é falta do que fazer.

As crises vêm do nada: o coração dispara "de uma vez", bate forte no pescoço, falta o ar e vem a certeza de que vai morrer; aprendeu que, prendendo a respiração e fazendo força, às vezes tudo "desliga" na hora. No pronto-socorro, o eletrocardiograma feito durante uma crise mostrou 190 batimentos por minuto, que voltaram ao normal com um remédio na veia. Antes, nunca teve nada parecido. Não toma remédios de uso contínuo nem usa café em excesso, descongestionantes ou drogas.`,
        clues: [
          'Logo que cada crise termina, sente vontade urgente de urinar e ainda passa um tempo {trêmulo|trêmula} e {assustado|assustada}.',
          'As crises começaram há cerca de um ano e sumiram, junto com o nervosismo, após o procedimento indicado pelo cardiologista, mesmo seguindo {aposentado|aposentada}.',
          'Largou o coral da igreja e as viagens com os antigos colegas, e a filha passou a dormir na casa {dele|dela}.',
          'Os exames de tireoide são normais, e as crises não guardam relação com café, remédios ou qualquer outra substância.',
        ],
        rulesOut: 'Não toma remédios de uso contínuo nem usa café em excesso, descongestionantes ou drogas.',
      },
    ],
  },
  {
    disorderId: 'substance_medication_induced_anxiety_disorder',
    reference: {
      label: 'Manual MSD (Profissional) — Visão geral dos transtornos de ansiedade',
      url: 'https://www.msdmanuals.com/pt/profissional/transtornos-psiqui%C3%A1tricos/transtornos-de-ansiedade-e-transtornos-relacionados-a-trauma-e-a-estressores/vis%C3%A3o-geral-dos-transtornos-de-ansiedade',
    },
    differential: {
      disorderId: 'anxiety_disorder_due_to_medical_condition',
      whyNot: 'Nenhuma doença explica os sintomas: os exames são normais ou a doença de base está controlada, e a ansiedade começa com o uso do produto e termina dias após a suspensão.',
    },
    explanation: 'A ansiedade surgiu durante o uso de um produto capaz de provocá-la — pré-treino com muita cafeína, broncodilatador em inalações frequentes, corticoide em dose alta —, sem história prévia de ansiedade, e desapareceu poucos dias após a suspensão, o que afasta um transtorno de ansiedade independente. O uso seguiu a receita ou o rótulo, sem perda de controle, o que afasta um transtorno por uso de substância. Não é Transtorno de Ansiedade Devido a Outra Condição Médica porque os exames são normais e a doença de base (asma controlada, paralisia facial) não explica os sintomas.',
    giveaways: ['cafeina', 'pre-treino', 'pre treino', 'salbutamol', 'fenoterol', 'aerolin', 'berotec', 'broncodilatador', 'aminofilina', 'teofilina', 'corticoide', 'corticosteroide', 'prednisona', 'prednisolona', 'dexametasona', 'cortisona'],
    variants: [
      {
        level: 'easy',
        ages: [19, 30],
        text: `{nome}, {idade} anos, estudante de engenharia, vai à UBS porque há três semanas vive com uma ansiedade que nunca teve: coração acelerado, mãos trêmulas, inquietação e noites quase sem sono. Tudo começou quando passou a tomar duas doses diárias de um pré-treino com muita cafeína, além de três latas de energético, para "render mais" na academia.

Usava o produto só para treinar e parou sem dificuldade quando a médica pediu; quatro dias depois, já dormia bem e estava {calmo|calma}. Nunca tinha tido problemas de nervos e não usa outras drogas. Os exames de sangue, inclusive de tireoide, e o eletrocardiograma vieram normais.`,
        clues: [
          'Sentia-se {tenso|tensa} o dia todo, com dificuldade de concentração e a sensação de que algo ruim ia acontecer.',
          'Os sintomas começaram dias após iniciar o pré-treino, pioraram quando aumentou as doses e sumiram em menos de uma semana após parar.',
          'Faltou a duas provas da faculdade por não ter dormido e brigou com os colegas de república por pura irritação.',
          'O exame clínico foi normal e não há doença de tireoide, do coração ou outra condição que explique a agitação.',
        ],
        rulesOut: 'Os exames de sangue, inclusive de tireoide, e o eletrocardiograma vieram normais.',
      },
      {
        level: 'medium',
        ages: [18, 30],
        text: `{nome}, {idade} anos, atendente de padaria, volta ao pronto-atendimento pela segunda vez na semana, agora sem chiado no peito, mas com as mãos tremendo, o coração aos pulos e a sensação de que "vai acontecer alguma coisa". Desde a crise de asma da semana passada, faz em casa a inalação com as gotinhas receitadas, de quatro em quatro horas, como mandou o médico.

A mãe conta que, meia hora depois de cada inalação, {ele|ela} anda pela casa sem parar e não consegue dormir; perto da dose seguinte, melhora. A oxigenação está normal, o pulmão está limpo e os exames de sangue vieram normais. Nunca teve nada parecido e não usa café, energéticos nem drogas. Com a troca do tratamento, em dois dias voltou ao normal.`,
        clues: [
          'Nas horas seguintes a cada inalação, fica {irritado|irritada}, com o coração acelerado e dificuldade de se concentrar até em conversas.',
          'Os sintomas começaram no segundo dia das inalações frequentes e desapareceram dois dias depois que o médico trocou a medicação.',
          'Faltou a semana inteira no trabalho e passou duas noites em claro, andando pela casa.',
          'Os sintomas aparecem mesmo com a respiração boa e não coincidem com falta de ar; a tireoide e o coração foram avaliados e estão normais.',
        ],
        rulesOut: 'A oxigenação está normal, o pulmão está limpo e os exames de sangue vieram normais.',
      },
      {
        level: 'hard',
        ages: [50, 70],
        text: `{nome}, {idade} anos, {porteiro|porteira}, é {trazido|trazida} pelo filho à UBS uma semana depois de acordar com metade do rosto paralisada. No pronto-socorro, disseram que era uma inflamação de um nervo da face, sem gravidade, e receitaram comprimidos por dez dias. O filho acha que o susto com o rosto deixou {o pai|a mãe} "{atacado|atacada} dos nervos".

Desde o segundo dia dos comprimidos, seis pela manhã, tomados como receitado, anda de um lado para o outro, com o coração acelerado, as mãos trêmulas e um aperto de medo sem motivo; quase não dorme. Nunca foi de se afligir. Pressão, glicose, exames de sangue e eletrocardiograma estão normais.`,
        clues: [
          'Sente-se {exausto|exausta}, sem euforia nem ideias grandiosas, mas não consegue ficar {parado|parada} e se assusta com qualquer barulho.',
          'Os sintomas começaram no segundo dia do corticoide em dose alta, receitado para o rosto; nunca tinha tido nada parecido antes.',
          'Faltou a semana inteira na portaria por não conseguir ficar {sentado|sentada} no turno e brigou com o filho por pouca coisa.',
          'Três dias após a última dose, a agitação acabou, embora a paralisia do rosto continue igual; tireoide e coração seguem normais.',
        ],
        rulesOut: 'Pressão, glicose, exames de sangue e eletrocardiograma estão normais.',
      },
    ],
  },
]
