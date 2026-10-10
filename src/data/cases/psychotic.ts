import type { DisorderCaseSet } from './types'

export const psychoticCases: DisorderCaseSet[] = [
  {
    disorderId: 'schizophrenia',
    reference: {
      label: 'Manual MSD (Profissional) — Esquizofrenia',
      url: 'https://www.msdmanuals.com/pt/profissional/transtornos-psiqui%C3%A1tricos/esquizofrenia-e-transtornos-relacionados/esquizofrenia',
    },
    differential: {
      disorderId: 'schizophreniform_disorder',
      whyNot: 'Os sinais contínuos já passam de seis meses, contando a fase de retraimento, e o funcionamento nunca voltou ao nível anterior.',
    },
    explanation: 'Delírios (vigilância, pensamentos roubados, inseridos ou divulgados, recados dirigidos à pessoa), vozes, fala desorganizada e sintomas negativos, com mais de um mês de fase ativa dentro de mais de seis meses de sinais contínuos e queda clara no estudo, no trabalho e no autocuidado. Não houve episódios de humor, e exames normais sem uso de substâncias afastam causa médica ou induzida. O Transtorno Esquizofreniforme fica excluído porque o quadro já passa de seis meses; a mudança em relação ao funcionamento anterior e a psicose franca afastam o Transtorno do Espectro Autista e a Personalidade Esquizotípica.',
    giveaways: [],
    variants: [
      {
        level: 'easy',
        ages: [20, 26],
        text: `{nome}, {idade} anos, é {levado|levada} pelos pais ao CAPS porque "não é mais {o mesmo|a mesma}". Há dois anos trancou a faculdade, afastou-se dos amigos e passou a ficar o dia inteiro no quarto. Há um ano e meio ouve vozes que comentam tudo o que faz e tem certeza de que os vizinhos instalaram câmeras no forro e espalham seus pensamentos pela internet.

Fala pouco, em frases que se perdem no meio, quase não toma banho e conta tudo isso sem mudar a expressão do rosto. Nunca teve fases de euforia nem de tristeza profunda. Não usa álcool nem drogas, e os exames de sangue e a tomografia vieram normais.`,
        clues: [
          'Acredita que um aparelho coloca na sua cabeça pensamentos que não são seus e pede aos pais que desliguem o wi-fi.',
          'O afastamento começou devagar, no fim do primeiro ano de faculdade; as vozes vieram meses depois e nunca cessaram.',
          'Perdeu a bolsa de estudos, não consegue pegar ônibus {sozinho|sozinha} e depende da mãe até para lembrar de comer.',
          'Mesmo nos meses mais calmos, continuou {isolado|isolada} e sem iniciativa; em nenhum momento voltou a ser como antes.',
        ],
        rulesOut: 'Há um ano e meio ouve vozes que comentam tudo o que faz',
      },
      {
        level: 'medium',
        ages: [26, 34],
        text: `{nome}, {idade} anos, recebe em casa a visita da equipe de Saúde da Família, a pedido da irmã. Trabalhava como operador{|a} de caixa até ser {demitido|demitida} por faltas; desde o começo do ano passado, vive no quarto com a janela vedada por cobertores. Conversa baixinho com alguém que ninguém vê e para no meio das frases, como se escutasse algo.

A irmã conta que {ele|ela} jura que o vizinho "entra na sua cabeça" e espalha pelo bairro tudo o que pensa. Deixou de tomar banho e de comer com a família, e responde com o rosto quase parado. Não houve semanas de euforia nem de choro e desânimo, não bebe nem usa drogas, e os exames pedidos pela UBS vieram normais.`,
        clues: [
          'Quando tenta explicar o que sente, mistura assuntos sem ligação e usa palavras que só {ele|ela} entende.',
          'A mudança veio aos poucos, com afastamento dos amigos, e desde então não houve nenhum mês sem esses comportamentos.',
          'Não consegue mais ir ao mercado, pagar contas ou arrumar o quarto; a irmã assumiu todas essas tarefas.',
          'Mesmo nos períodos mais tranquilos, segue {isolado|isolada}, sem iniciativa e longe do trabalho há mais de um ano.',
        ],
        rulesOut: 'desde o começo do ano passado, vive no quarto com a janela vedada por cobertores',
      },
      {
        level: 'hard',
        ages: [15, 17],
        text: `{nome}, {idade} anos, é {encaminhado|encaminhada} pela escola ao CAPSi porque as notas despencaram e a coordenação suspeita de drogas. Os pais, recém-separados, atribuem tudo à fase: {ele|ela} largou o futebol, passa as madrugadas {acordado|acordada} e responde aos professores com frases soltas, que não fecham uma ideia.

Uma professora achou no caderno páginas sobre "recados" que as músicas do rádio mandariam só para {ele|ela}, e colegas {o|a} ouvem discutindo {sozinho|sozinha} no banheiro. Isso vem desde o início do ano passado, sem melhora. O teste de urina para drogas deu negativo, nenhum colega {o|a} viu usar nada, os exames de sangue vieram normais e a família nunca notou fases de euforia nem semanas de choro.`,
        clues: [
          'Diz que alguém tira os pensamentos da sua cabeça durante as provas e, por isso, entrega as folhas em branco.',
          'Antes disso, tinha amigos e boas notas; a mudança veio devagar e começou antes da separação dos pais.',
          'Repetiu o ano, não sai de casa sem a mãe e só toma banho quando é {lembrado|lembrada}.',
          'Nenhum mês desde o início foi livre desses sinais, nem mesmo nas férias, longe da escola e da briga dos pais.',
        ],
        rulesOut: 'Isso vem desde o início do ano passado, sem melhora.',
      },
    ],
  },
  {
    disorderId: 'schizophreniform_disorder',
    reference: {
      label: 'Manual MSD (Profissional) — Transtorno esquizofreniforme',
      url: 'https://www.msdmanuals.com/pt/profissional/transtornos-psiqui%C3%A1tricos/esquizofrenia-e-transtornos-relacionados/transtorno-esquizofreniforme',
    },
    differential: {
      disorderId: 'schizophrenia',
      whyNot: 'Todo o episódio, do primeiro sinal à melhora completa, durou menos de seis meses e terminou com volta ao funcionamento anterior.',
    },
    explanation: 'Delírios e alucinações, com fala desorganizada ou retraimento, por mais de um mês, num episódio que, do primeiro sinal à melhora completa, durou menos de seis meses. Não houve episódios de humor, uso de substâncias nem doença clínica que expliquem o quadro. Passar de um mês afasta o Transtorno Psicótico Breve, mesmo quando há um estressor no início; terminar antes de seis meses, com volta ao funcionamento anterior, afasta a Esquizofrenia.',
    giveaways: [],
    variants: [
      {
        level: 'easy',
        ages: [19, 25],
        text: `{nome}, {idade} anos, estudante de engenharia, volta ao ambulatório com os pais para uma consulta de seguimento. Em março, passou a faltar às aulas e a dormir mal; em poucas semanas, dizia que colegas planejavam matá-l{o|a} e ouvia vozes ameaçadoras no corredor do alojamento.

Os delírios e as alucinações duraram cerca de dois meses e meio e, com o tratamento, desapareceram por completo. Hoje, cinco meses depois do primeiro sinal, {nome} está de volta às aulas, com as notas e os amigos de antes. Nunca teve fases de euforia nem de tristeza profunda, não usa drogas, e os exames de sangue, urina e imagem foram normais.`,
        clues: [
          'No auge, misturava assuntos sem ligação e passava horas {calado|calada}, com o rosto inexpressivo.',
          'As mudanças surgiram em poucas semanas, e os sintomas foram cedendo ao longo de um mês e meio de tratamento.',
          'Durante o episódio, perdeu as provas do semestre e ficou duas semanas {internado|internada}.',
          'Antes de março, tinha boa vida social e notas altas; agora, não resta nenhum sinal do episódio, nem mesmo retraimento.',
        ],
        rulesOut: 'Hoje, cinco meses depois do primeiro sinal, {nome} está de volta às aulas, com as notas e os amigos de antes.',
      },
      {
        level: 'medium',
        ages: [24, 35],
        text: `{nome}, {idade} anos, atendente de telemarketing, é {levado|levada} ao pronto-socorro pela pessoa com quem mora, depois de passar a noite tapando as tomadas com fita "para não escutarem". Há cerca de cinco semanas deixou de ir ao trabalho, diz que a empresa grava seus pensamentos e responde em voz alta a alguém que não está na sala.

Está {orientado|orientada}, e os exames, inclusive toxicológico e tomografia, vêm normais; não há relato de drogas nem de fases de euforia ou de desânimo prolongado. Com acompanhamento no CAPS, melhora aos poucos: pouco mais de três meses depois da primeira mudança, já não tem nenhum desses comportamentos e volta ao trabalho com o desempenho de antes.`,
        clues: [
          'Nas primeiras semanas, começava uma frase num assunto e a terminava em outro, sem nenhuma ligação.',
          'Nunca tinha tido nada parecido; a mudança surgiu em poucas semanas, sem um acontecimento marcante antes.',
          'Ficou quase três meses {afastado|afastada} do trabalho e deixou de pagar as contas da casa nesse período.',
          'Seis meses após o início, segue trabalhando normalmente, sem vozes, desconfiança ou retraimento.',
        ],
        rulesOut: 'pouco mais de três meses depois da primeira mudança, já não tem nenhum desses comportamentos',
      },
      {
        level: 'hard',
        ages: [30, 40],
        text: `{nome}, {idade} anos, contador{|a}, vem à consulta de retorno com o irmão. Em junho, logo após ser {transferido|transferida} para a filial de outra cidade, passou a dizer que os novos colegas trocavam sinais para {prejudicá-lo|prejudicá-la} e a ouvir comentários sobre si vindos do apartamento vazio ao lado. Parecia {perplexo|perplexa}, embora soubesse onde estava e que dia era.

A família achou que era cansaço da mudança, mas o quadro se arrastou por sete semanas até o início do tratamento e só cedeu por completo um mês depois. Hoje, quatro meses após o primeiro sinal, trabalha e convive como antes. Não usou drogas, não teve fases de euforia ou tristeza, e a ressonância e os exames de sangue foram normais.`,
        clues: [
          'No pior momento, as frases saíam truncadas e sem sequência, e passava horas {parado|parada} diante da janela.',
          'Não houve retraimento nem estranheza antes de junho; os sintomas se instalaram em cerca de duas semanas.',
          'Ficou dois meses {afastado|afastada} do serviço e dependeu do irmão para comer e pagar as contas.',
          'Somando tudo, do primeiro sinal à melhora completa, foram menos de três meses, sem nenhum sintoma desde então.',
        ],
        rulesOut: 'Hoje, quatro meses após o primeiro sinal, trabalha e convive como antes.',
      },
    ],
  },
  {
    disorderId: 'brief_psychotic_disorder',
    reference: {
      label: 'Manual MSD (Profissional) — Transtorno psicótico breve',
      url: 'https://www.msdmanuals.com/pt/profissional/transtornos-psiqui%C3%A1tricos/esquizofrenia-e-transtornos-relacionados/transtorno-psic%C3%B3tico-breve',
    },
    differential: {
      disorderId: 'schizophreniform_disorder',
      whyNot: 'Os sintomas duraram menos de um mês e terminaram com volta completa ao funcionamento anterior; não se chega ao mínimo de um mês exigido.',
    },
    explanation: 'Início súbito de delírios, alucinações ou fala desorganizada, com duração de pelo menos um dia e menos de um mês, seguido de volta completa ao funcionamento anterior. Orientação preservada, exames normais e ausência de substâncias e de fases de euforia ou tristeza afastam causa médica, induzida ou um episódio de humor com sintomas psicóticos. Durar menos de um mês afasta o Transtorno Esquizofreniforme. Os estressores (demissão, despejo) não envolveram ameaça à vida, o que afasta o Transtorno de Estresse Agudo; o início no pós-parto é uma forma reconhecida do quadro breve.',
    giveaways: [],
    variants: [
      {
        level: 'easy',
        ages: [25, 40],
        text: `{nome}, {idade} anos, é {levado|levada} pelo SAMU ao pronto-socorro dois dias depois de ser {demitido|demitida} da loja onde trabalhava havia oito anos. De repente, passou a dizer que o ex-patrão mandou pessoas para envenená-l{o|a}, a ouvir vozes que {o|a} xingavam pela janela e a falar frases sem sentido. A família nunca tinha visto nada parecido.

Está {orientado|orientada}, e os exames, incluindo o toxicológico e a tomografia, vieram normais. Não teve fases de euforia nem de tristeza profunda. Com acompanhamento, as alucinações e os delírios desapareceram em doze dias, e três semanas após o início {nome} já tinha voltado à rotina de antes e procurava outro emprego.`,
        clues: [
          'No pronto-socorro, andava de um lado para o outro e tapava os ouvidos, {assustado|assustada} com as vozes.',
          'O início foi súbito, sem sinais de estranheza nos meses anteriores; a demissão não envolveu ameaças nem violência.',
          'Durante o episódio, não conseguia se alimentar nem dormir e precisou de alguém da família ao lado dia e noite.',
          'Um mês e meio depois do início, segue sem sintomas, com o sono, a fala e a convivência de antes.',
        ],
        rulesOut: 'as alucinações e os delírios desapareceram em doze dias',
      },
      {
        level: 'medium',
        ages: [30, 45],
        text: `{nome}, {idade} anos, motorista de aplicativo, chega ao pronto-atendimento com a irmã. Na véspera, um dia depois de receber a ordem de despejo, trancou-se no carro dizendo que o dono do imóvel e a polícia queriam sumir com {ele|ela}, e conversava com alguém no banco de trás vazio.

Na triagem, sabe onde está e que dia é, mas as respostas saem desencontradas. Exames de sangue, tomografia e teste de drogas são normais, e a irmã nega bebida ou remédios. Dezessete dias depois, já sem nada disso, {nome} volta a dirigir e a cuidar da mudança como sempre fez.`,
        clues: [
          'No pronto-atendimento, cobre a cabeça com a camiseta e diz que um drone {o|a} filma pelo teto.',
          'O quadro surgiu de um dia para o outro; nunca houve episódio parecido nem semanas de euforia ou de tristeza prolongada.',
          'Durante a crise, parou de trabalhar e só conseguia comer ou dormir com alguém da família por perto.',
          'Dois meses depois, segue trabalhando e convivendo como antes, sem desconfiança nem vozes.',
        ],
        rulesOut: 'Dezessete dias depois, já sem nada disso',
      },
      {
        level: 'hard',
        ages: [22, 36],
        sex: 'f',
        text: `{nome}, {idade} anos, é levada pela mãe de volta à maternidade dez dias depois do parto do primeiro filho. A família achou que fosse a tristeza comum do pós-parto, mas desde a véspera ela insiste que o bebê foi trocado no berçário, tapa as frestas da porta e diz ouvir pelo monitor uma voz que manda não amamentar.

Está sem febre, com pressão normal, sabe onde está e que dia é, e os exames de sangue, tireoide e infecção vêm normais. Não bebeu, não usou drogas nem remédios além do analgésico do parto. Não há euforia, gastos ou fala acelerada, nem choro persistente. Dezenove dias depois, cuida do filho sozinha, como fazia antes da crise.`,
        clues: [
          'Em alguns momentos, fala frases sem sequência e se assusta com ruídos que ninguém mais escuta.',
          'Até a véspera, cuidava do bebê sem dificuldade; nunca teve nada parecido antes, nem durante a gravidez.',
          'Durante o episódio, não conseguiu amamentar nem ficar sozinha com o bebê, e a mãe assumiu os cuidados.',
          'Dois meses após o parto, segue bem, sem vozes nem desconfiança, e retomou os planos que tinha para a licença.',
        ],
        rulesOut: 'Dezenove dias depois, cuida do filho sozinha',
      },
    ],
  },
  {
    disorderId: 'schizoaffective_disorder',
    reference: {
      label: 'Manual MSD (Profissional) — Transtorno esquizoafetivo',
      url: 'https://www.msdmanuals.com/pt/profissional/transtornos-psiqui%C3%A1tricos/esquizofrenia-e-transtornos-relacionados/transtorno-esquizoafetivo',
    },
    differential: {
      disorderId: 'bipolar_1',
      whyNot: 'Delírios e alucinações persistiram por semanas com o humor normal; quando fazem parte de um quadro de humor, só aparecem durante os episódios de euforia ou de tristeza.',
    },
    explanation: 'Episódios de humor maiores (euforia com pouca necessidade de sono e gastos, ou tristeza profunda com culpa e perda de prazer) ocorreram junto com delírios e alucinações e ocupam a maior parte do tempo de doença, e houve mais de duas semanas de delírios ou alucinações com o humor normal. Substâncias e doenças clínicas foram afastadas. No Transtorno Bipolar Tipo I ou no Depressivo Maior com sintomas psicóticos, estes só aparecem durante os episódios de humor; na Esquizofrenia, os episódios de humor ocupam uma parte pequena da doença.',
    giveaways: [],
    variants: [
      {
        level: 'easy',
        ages: [26, 38],
        text: `{nome}, {idade} anos, é {acompanhado|acompanhada} no CAPS há quatro anos. Nesse período teve três fases de euforia, com gastos, fala acelerada e noites quase sem dormir, e duas de tristeza profunda, em que não saía da cama. Em todas elas ouvia vozes e tinha certeza de ser {vigiado|vigiada} pela polícia; somadas, essas fases ocupam a maior parte do tempo de doença.

Entre as crises, trabalha como vendedor{|a}. O que chama atenção é a última: o humor voltou ao normal, mas as alucinações e o delírio de perseguição continuaram por mais cinco semanas. Não usa álcool nem drogas, e os exames clínicos e de imagem são normais.`,
        clues: [
          'As vozes comentam o que faz e, às vezes, mandam que não coma a comida de casa.',
          'As crises começaram há quatro anos; cada fase de humor durou de dois a quatro meses, sempre com as vozes junto.',
          'Foi {internado|internada} duas vezes e perdeu um emprego depois de semanas de faltas durante uma crise.',
          'Numa crise anterior, as vozes também persistiram por três semanas depois que o sono e a energia se normalizaram.',
        ],
        rulesOut: 'o humor voltou ao normal, mas as alucinações e o delírio de perseguição continuaram por mais cinco semanas',
      },
      {
        level: 'medium',
        ages: [44, 60],
        text: `{nome}, {idade} anos, costureir{o|a}, é {levado|levada} pela filha ao ambulatório. Nos últimos três anos, passou por três períodos de quatro a cinco meses em que chorava todos os dias, perdeu peso, não sentia prazer em nada e dizia ser um peso para a família. Nessas épocas, escutava vozes {o|a} chamando de inútil e jurava que os vizinhos envenenavam a água.

Entre esses períodos, ficava bem por meses e voltava a costurar. No último, porém, o choro e o desânimo passaram em agosto, e as vozes e a história da água continuaram até outubro. Não bebe, não usa drogas, e a tireoide e os demais exames estão normais.`,
        clues: [
          'Nessas fases, também se culpava pelas doenças dos parentes, acordava de madrugada e deixava de tomar banho.',
          'O primeiro período começou há três anos, sem um motivo claro; nunca houve fases de euforia ou de energia de sobra.',
          'Perdeu as encomendas de costura e precisou ser {internado|internada} uma vez por recusar comida e água.',
          'Em setembro, já comendo, dormindo bem e brincando com os netos, ainda escondia a água e respondia às vozes.',
        ],
        rulesOut: 'o choro e o desânimo passaram em agosto, e as vozes e a história da água continuaram até outubro',
      },
      {
        level: 'hard',
        ages: [38, 52],
        text: `{nome}, {idade} anos, mecânic{o|a} de ônibus, é {levado|levada} por colegas ao pronto-socorro porque não come mais a marmita, {convencido|convencida} de que a chefia mistura veneno na comida, e discute com vozes que {o|a} ameaçam pelo rádio da oficina. Está {calmo|calma}, dorme bem e fala no ritmo de sempre.

O cônjuge conta que {nome} passou dois meses quase sem dormir, estourando os cartões com ferramentas e dizendo que seria dono da empresa, já ouvindo as vozes. Essa fase terminou há três semanas, mas as vozes e a certeza do veneno ficaram. Algo parecido aconteceu outras duas vezes em seis anos; entre as crises, trabalha normalmente. Não usa álcool nem drogas, e os exames vieram normais.`,
        clues: [
          'As vozes conversam entre si sobre {ele|ela} e comentam cada peça que monta na oficina.',
          'A primeira crise foi há seis anos; em todas, a fase de euforia durou dois a três meses e foi a parte mais longa.',
          'Recebeu advertências por brigas no trabalho e está {afastado|afastada} pela segunda vez nesses seis anos.',
          'Nas crises anteriores, as vozes e a desconfiança também persistiram de três a quatro semanas após o humor se normalizar.',
        ],
        rulesOut: 'Essa fase terminou há três semanas, mas as vozes e a certeza do veneno ficaram.',
      },
    ],
  },
  {
    disorderId: 'delusional_disorder',
    reference: {
      label: 'Manual MSD (Profissional) — Transtorno delirante',
      url: 'https://www.msdmanuals.com/pt/profissional/transtornos-psiqui%C3%A1tricos/esquizofrenia-e-transtornos-relacionados/transtorno-delirante',
    },
    differential: {
      disorderId: 'schizophrenia',
      whyNot: 'Não há vozes proeminentes, fala desorganizada nem perda de iniciativa; fora da crença fixa, a pessoa trabalha, convive e se cuida normalmente.',
    },
    explanation: 'Uma crença falsa e inabalável (perseguição, infidelidade ou infestação da pele), mantida por mais de um mês apesar das provas em contrário, sem alucinações proeminentes, fala desorganizada ou sintomas negativos; fora do tema, a pessoa trabalha e se cuida normalmente. A sensação de bichos na pele faz parte do próprio tema e é permitida. Memória preservada, exames normais e ausência de substâncias afastam causas neurocognitivas, médicas ou induzidas. Não é Esquizofrenia, porque falta o conjunto de sintomas exigido, nem Personalidade Paranoide, porque a crença surgiu recentemente, presa a um único tema, sem um padrão de desconfiança de toda a vida.',
    giveaways: [],
    variants: [
      {
        level: 'easy',
        ages: [45, 62],
        text: `{nome}, {idade} anos, comerciante, é {levado|levada} pelo filho ao ambulatório. Há dois anos tem certeza absoluta de que o vizinho de muro quer tomar sua casa e, para isso, põe veneno na caixa d'água. Já trocou a caixa três vezes, registrou boletim de ocorrência e mandou analisar a água, que veio limpa: diz que o laboratório "foi comprado".

Fora esse assunto, conversa bem, cuida da loja e das contas e não ouve vozes nem vê coisas. Até então, era {conhecido|conhecida} pela boa convivência com a vizinhança. Não bebe, não usa drogas, a memória está ótima e os exames recentes foram normais. Nunca teve fases de euforia nem de tristeza profunda.`,
        clues: [
          'Interpreta o latido do cachorro e as luzes acesas na casa ao lado, de madrugada, como provas do plano.',
          'A ideia surgiu depois de uma discussão sobre o muro e, em dois anos, nunca perdeu força nem mudou de tema.',
          "O prejuízo se concentra no tema: gastou as economias com caixas d'água e advogado e rompeu com a vizinhança.",
          'Não há fala confusa, perda de iniciativa ou descuido consigo; abre a loja todos os dias, como sempre fez.',
        ],
        rulesOut: 'Fora esse assunto, conversa bem, cuida da loja e das contas e não ouve vozes nem vê coisas.',
      },
      {
        level: 'medium',
        ages: [42, 60],
        text: `{nome}, {idade} anos, servidor{|a} públic{o|a}, chega ao consultório por insistência do cônjuge, que ameaça ir embora. Há um ano e meio examina roupas e lençóis, cronometra as idas do cônjuge à padaria e vê sinais de traição na posição do banco do carro e no barulho do portão. Um detetive contratado não achou nada, e isso só reforçou a certeza: "pagaram o detetive".

No trabalho, segue {elogiado|elogiada} e organiza a escala da equipe sem falhas. Não escuta vozes, fala de forma clara e não bebe nem usa drogas. Em vinte anos de casamento, nunca tinha sido {ciumento|ciumenta} nem {desconfiado|desconfiada} de ninguém. A memória está preservada e os exames clínicos vieram normais.`,
        clues: [
          'Passou a cheirar as roupas do cônjuge e a anotar as placas dos carros parados perto de casa.',
          'A desconfiança começou sem motivo concreto e segue igual há um ano e meio, sem fases de euforia ou de tristeza profunda.',
          'O casamento está por um fio, e os filhos evitam ficar em casa por causa das discussões diárias.',
          'Nunca viu vultos nem ouviu vozes; no trabalho, ninguém percebe nada de diferente.',
        ],
        rulesOut: 'Não escuta vozes, fala de forma clara',
      },
      {
        level: 'hard',
        ages: [62, 78],
        text: `{nome}, {idade} anos, {aposentado|aposentada}, chega ao ambulatório de dermatologia com um potinho cheio de fiapos e pedacinhos de pele: segundo {ele|ela}, são os bichos que vivem sob sua pele há oito meses. Sente-os andar à noite, já ferveu os lençóis e jogou fora o sofá.

O exame da pele mostra só arranhões; a biópsia e a análise do material foram negativas, e {ele|ela} acha que o laboratório errou. Fora isso, mantém o bom humor, cozinha, vai à igreja e controla as contas sem esquecer nada. Não vê nem ouve coisas estranhas, não usa drogas nem remédios novos, e hemograma, tireoide, rins e vitamina B12 estão normais.`,
        clues: [
          'Arranha a pele só para tirar o que chama de ovos e guarda pontinhos escuros das unhas como prova; nenhum argumento {o|a} demove.',
          'Tudo começou após picadas de inseto no quintal; as picadas sararam, mas a certeza de infestação só cresceu.',
          'Gastou parte da aposentadoria com dedetizações e deixou de receber os netos, com medo de passar os bichos.',
          'Além da sensação na pele, não há vozes, visões ou fala confusa, e segue cuidando {sozinho|sozinha} da casa.',
        ],
        rulesOut: 'Não vê nem ouve coisas estranhas',
      },
    ],
  },
  {
    disorderId: 'substance_induced_psychotic_disorder',
    reference: {
      label: 'Manual MSD (Profissional) — Transtorno psicótico induzido por substância ou medicamento',
      url: 'https://www.msdmanuals.com/pt/profissional/transtornos-psiqui%C3%A1tricos/esquizofrenia-e-transtornos-relacionados/transtorno-psic%C3%B3tico-induzido-por-subst%C3%A2ncia-ou-medicamento',
    },
    differential: {
      disorderId: 'brief_psychotic_disorder',
      whyNot: 'Os sintomas começaram durante a exposição a uma substância capaz de causá-los e cederam com a retirada; o quadro breve só se aplica sem essa causa.',
    },
    explanation: 'Delírios e alucinações surgidos durante a exposição a uma substância capaz de causá-los (corticoide em dose alta, cannabis, estimulante oculto em cápsulas para emagrecer), mais intensos e duradouros que uma intoxicação comum, sem história psicótica anterior, com orientação preservada e melhora após a retirada. Uso acidental, único ou conforme a receita, sem perda de controle, afasta um transtorno por uso de substância. O Transtorno Psicótico Breve não se aplica quando uma substância explica o quadro.',
    giveaways: ['prednisona', 'corticoide', 'corticoster', 'maconha', 'cannabis', 'anfetamin'],
    variants: [
      {
        level: 'easy',
        ages: [30, 55],
        text: `{nome}, {idade} anos, professor{|a}, é {levado|levada} pela família ao pronto-socorro. Há cinco dias toma prednisona em dose alta, 60 mg por dia, por uma perda súbita de audição. No terceiro dia, passou a dizer que colegas da escola armavam sua demissão e a ouvir vozes no forro comentando seus passos.

Nunca teve nada parecido, não usa álcool nem drogas e está {orientado|orientada} e {atento|atenta} na conversa, sem euforia nem tristeza. Com a redução gradual do corticoide, as alucinações e o delírio desapareceram em uma semana; um mês depois, segue sem sintomas e de volta à sala de aula.`,
        clues: [
          'Desconfia da comida servida em casa e escondeu o celular para não ser {rastreado|rastreada}.',
          'Os sintomas começaram dois dias depois da primeira dose e foram cedendo à medida que a dose caía.',
          'Precisou se afastar das aulas por duas semanas e não conseguia ficar {sozinho|sozinha} em casa.',
          'Os sintomas surgiram só durante o uso do remédio e não voltaram após a retirada; sangue e tomografia, normais.',
        ],
        rulesOut: 'Com a redução gradual do corticoide, as alucinações e o delírio desapareceram em uma semana',
      },
      {
        level: 'medium',
        ages: [18, 25],
        text: `{nome}, {idade} anos, estudante de direito, chega à UPA {trazido|trazida} por colegas de república. No sábado, numa festa, horas depois de comer, sem saber, dois brigadeiros "batizados" com a erva que um colega cultiva, passou a ter certeza de que os amigos queriam roubar seus órgãos. O efeito da festa passou, mas três dias depois ainda ouve sussurros combinando o plano e se tranca no quarto.

Nunca tinha usado nenhuma droga e bebe pouco. Está {orientado|orientada}, sabe a data e responde com atenção, sem euforia nem tristeza. Na semana seguinte, sem nova exposição, as ideias e os sussurros vão sumindo, e em dez dias {nome} volta às aulas como antes.`,
        clues: [
          'Cobriu a câmera do notebook e acredita que os vídeos da festa mostram os amigos combinando o crime.',
          'Até a festa, estava bem, sem isolamento nem ideias estranhas; tudo começou poucas horas depois dos doces.',
          'Perdeu uma semana de provas e só conseguia dormir com a mãe, que veio do interior para ficar junto.',
          'O exame de urina confirmou a substância dos doces, e os sintomas sumiram sem nova exposição, à medida que ela foi eliminada.',
        ],
        rulesOut: 'horas depois de comer, sem saber, dois brigadeiros "batizados" com a erva que um colega cultiva',
      },
      {
        level: 'hard',
        ages: [26, 40],
        text: `{nome}, {idade} anos, recepcionista, procura a UBS por insônia e porque "não aguenta mais ser {vigiado|vigiada}". Há dez dias tem certeza de que os vizinhos puseram microfones na parede e combinam, em voz baixa, como {prejudicá-lo|prejudicá-la}; ouve as conversas toda noite. Atribui a insônia ao estresse com o casamento, marcado para o mês que vem.

Só no fim da consulta conta que, há cinco semanas, toma cápsulas para emagrecer receitadas por uma clínica: "tiram a fome e o sono". Usa como indicado e nunca teve nada parecido. Está {orientado|orientada}, sem euforia ou tristeza, e a tireoide está normal. Suspensas as cápsulas, as vozes e a certeza dos microfones desaparecem em duas semanas.`,
        clues: [
          'Tapou as tomadas com algodão e passou a falar só por mensagens, para não ser {ouvido|ouvida} pelos vizinhos.',
          'As vozes surgiram pouco mais de três semanas após o início das cápsulas, sem nenhum sinal estranho nos meses anteriores.',
          'Faltou ao trabalho a semana inteira e pensou em cancelar o casamento por medo de ser {seguido|seguida}.',
          'A análise das cápsulas encontrou um estimulante que não constava do rótulo, e os sintomas não voltaram após a suspensão.',
        ],
        rulesOut: 'Suspensas as cápsulas, as vozes e a certeza dos microfones desaparecem em duas semanas.',
      },
    ],
  },
  {
    disorderId: 'psychotic_disorder_due_to_medical_condition',
    reference: {
      label: 'Manual MSD (Profissional) — Transtorno psicótico decorrente de outra condição médica',
      url: 'https://www.msdmanuals.com/pt/profissional/transtornos-psiqui%C3%A1tricos/esquizofrenia-e-transtornos-relacionados/transtorno-psic%C3%B3tico-decorrente-de-outra-condi%C3%A7%C3%A3o-m%C3%A9dica',
    },
    differential: {
      disorderId: 'delirium',
      whyNot: 'Atenção e orientação seguem preservadas, sem oscilação ao longo do dia; a alteração está nas crenças e percepções, não no nível de consciência.',
    },
    explanation: 'Delírios e alucinações proeminentes que começam e cedem junto com uma condição médica capaz de causá-los por mecanismo cerebral direto (crises do lobo temporal, lúpus em atividade, lesão comprimindo o lobo temporal), sem história psiquiátrica prévia e sem substâncias ou remédios que expliquem o quadro. A atenção e a orientação preservadas, sem flutuação, afastam o Delirium; a relação temporal com a doença e a melhora com o tratamento dela afastam a Esquizofrenia e outros quadros primários.',
    giveaways: ['epilep', 'lupus', 'tumor', 'meningioma', 'neoplasia', 'cancer'],
    variants: [
      {
        level: 'easy',
        ages: [25, 45],
        text: `{nome}, {idade} anos, tem epilepsia do lobo temporal desde a adolescência, com crises de olhar parado e estalar de lábios. Na semana passada, teve quatro crises num mesmo dia. Passou um dia e meio bem e então começou a dizer que os vizinhos queriam matá-l{o|a} e a ouvir vozes ameaçadoras vindas da rua.

No pronto-socorro, está {orientado|orientada}, {atento|atenta} e lembra de tudo o que aconteceu. Nunca teve sintomas psicóticos fora desse contexto, não usa álcool nem drogas, toma o mesmo anticonvulsivante há anos, sem mudança de dose, e a ressonância mostra a mesma cicatriz temporal já conhecida. Com as crises controladas, as alucinações e o delírio desaparecem em nove dias.`,
        clues: [
          'Reza alto pelos corredores e acredita que a comida do hospital foi envenenada a mando dos vizinhos.',
          'Já aconteceu duas vezes antes, sempre um ou dois dias após crises agrupadas, sumindo em menos de duas semanas.',
          'Nesses períodos, falta ao trabalho de porteir{o|a} e não consegue sair de casa sem companhia.',
          'Mesmo no auge, acerta a data, o local e contas simples, sem oscilar entre a manhã e a noite.',
        ],
        rulesOut: 'está {orientado|orientada}, {atento|atenta} e lembra de tudo o que aconteceu',
      },
      {
        level: 'medium',
        ages: [18, 35],
        text: `{nome}, {idade} anos, vendedor{|a}, é {levado|levada} pela família ao pronto-socorro porque há duas semanas se tranca no quarto, diz que a televisão manda recados sobre sua morte e responde a vozes que ninguém mais ouve. No último mês, surgiram também manchas vermelhas no rosto que pioram com o sol, dor e inchaço nas juntas das mãos e feridas na boca.

Está {orientado|orientada}, acompanha a entrevista e lembra do que fez nos últimos dias. Nunca teve nada parecido, não usa drogas e não tomava nenhum remédio. Os exames de sangue mostram anticorpos de uma doença autoimune em atividade, e há proteína na urina. Com o tratamento dessa doença pela reumatologia, as vozes e os recados somem em três semanas.`,
        clues: [
          'Recusa a comida da família, {convencido|convencida} de que querem {envenená-lo|envenená-la} para ficar com seu dinheiro.',
          'As vozes surgiram poucas semanas depois das dores nas juntas e foram sumindo junto com as manchas e o inchaço.',
          'Parou de trabalhar e de sair do quarto, e a família se reveza para garantir que coma.',
          'Em todo o período, reconhece o dia, o lugar e as pessoas, sem fases de sonolência ou confusão.',
        ],
        rulesOut: 'Está {orientado|orientada}, acompanha a entrevista e lembra do que fez nos últimos dias.',
      },
      {
        level: 'hard',
        ages: [58, 72],
        text: `{nome}, {idade} anos, motorista {aposentado|aposentada}, é {levado|levada} pela filha à clínica médica porque, há três meses, acusa os vizinhos de soltarem gás pela tomada para {envenená-lo|envenená-la}. Sente um cheiro de borracha queimada que ninguém mais sente e ouve os vizinhos combinando o plano. A filha atribuiu tudo à aposentadoria recente e à solidão.

Também tem acordado com dor de cabeça, que piora ao se abaixar. Está {orientado|orientada}, {atento|atenta}, faz as contas da casa e lembra dos compromissos. Nunca teve nada parecido, não bebe, não usa drogas nem remédios novos. A ressonância mostra uma lesão de 4 cm comprimindo o lobo temporal direito; três semanas após a cirurgia, o cheiro, as vozes e a certeza do gás desaparecem.`,
        clues: [
          'Vedou as tomadas com fita e passou a dormir na sala, {convencido|convencida} de que o gás vem do quarto.',
          'O cheiro e as ideias começaram junto com as dores de cabeça matinais, sem nenhum episódio parecido ao longo da vida.',
          'Deixou de visitar os netos e brigou com os vizinhos a ponto de a polícia ser chamada.',
          'Em várias consultas, manteve atenção e orientação estáveis, sem piora à noite nem sonolência.',
        ],
        rulesOut: 'Está {orientado|orientada}, {atento|atenta}, faz as contas da casa e lembra dos compromissos.',
      },
    ],
  },
]
