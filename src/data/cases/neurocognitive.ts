import type { DisorderCaseSet } from './types'

export const neurocognitiveCases: DisorderCaseSet[] = [
  {
    disorderId: 'delirium',
    reference: {
      label: 'Manual MSD (Profissional) — Delirium',
      url: 'https://www.msdmanuals.com/pt/profissional/dist%C3%BArbios-neurol%C3%B3gicos/delirium-e-dem%C3%AAncia/delirium',
    },
    differential: {
      disorderId: 'alzheimer_disease_ncd',
      whyNot: 'A mudança começou em horas ou poucos dias, junto com uma doença aguda ou um remédio, e oscila ao longo do dia; antes, a pessoa era independente e não tinha esquecimentos.',
    },
    explanation: 'Perturbação da atenção e da consciência (desorientação, perda do fio da conversa, sonolência ou agitação), instalada em horas a poucos dias, com flutuação ao longo do dia e outras alterações cognitivas e perceptivas, como esquecer o que acabou de ouvir ou ver bichos na parede. Há uma causa médica que explica o quadro: infecção urinária, pós-operatório com morfina, dor e noites sem dormir, ou queda do sódio após um diurético. O início súbito e a vida independente até dias antes afastam a Doença de Alzheimer, de instalação lenta; a forma quieta (hipoativa) não é tristeza persistente.',
    giveaways: ['delirium', 'confusional', 'confusao mental'],
    variants: [
      {
        level: 'easy',
        ages: [76, 90],
        text: `{nome}, {idade} anos, é {levado|levada} pela filha ao pronto-socorro porque, desde anteontem, "não fala coisa com coisa". Não sabe que dia é nem onde está, confunde o hospital com a casa onde cresceu e perde o fio da conversa no meio da frase. Não consegue dizer os meses do ano de trás para frente.

À noite fica {agitado|agitada} e tenta arrancar o soro; de manhã, amanhece mais {calmo|calma} e quase {lúcido|lúcida}. Está com febre e ardência ao urinar, e o exame de urina mostra infecção. Até a semana passada, cuidava {sozinho|sozinha} da casa, pagava as contas e ia à missa a pé. Não bebe nem toma remédios para dormir.`,
        clues: [
          'Troca o dia pela noite: cochila à tarde, passa a madrugada {acordado|acordada} e às vezes aponta bichos na parede que ninguém mais vê.',
          'Os sinais surgiram em menos de dois dias, junto com a febre, e começaram a melhorar após dois dias de antibiótico.',
          'Não consegue comer sem ajuda nem usar a campainha para chamar a enfermagem, e caiu ao tentar sair da maca.',
          'Um teste de memória feito no posto de saúde há seis meses foi normal, e o exame neurológico não mostra fraqueza nem fala enrolada.',
        ],
        rulesOut: 'Até a semana passada, cuidava {sozinho|sozinha} da casa, pagava as contas e ia à missa a pé.',
      },
      {
        level: 'medium',
        ages: [70, 86],
        text: `{nome}, {idade} anos, está na enfermaria de ortopedia, dois dias depois da cirurgia do fêmur que quebrou numa queda no quintal. A neta, que passa as noites como acompanhante, conta que {ele|ela} tenta descer da cama, puxa a sonda e diz que vai perder o ônibus da fábrica onde trabalhou há trinta anos.

De manhã reconhece a família e conversa, mas cochila no meio das frases e esquece o que acabou de ouvir. Desde a cirurgia recebe morfina, sente dor e quase não dorme com o barulho da enfermaria. Até a queda, morava {sozinho|sozinha}, cozinhava e pagava as próprias contas. Não bateu a cabeça, não bebe e não toma remédios para dormir.`,
        clues: [
          'Não consegue contar de 20 a 1 sem se perder e, em alguns momentos, confunde a enfermeira com uma irmã que já morreu.',
          'As mudanças começaram na primeira noite depois da operação e variam muito ao longo do dia, piorando sempre ao anoitecer.',
          'Arrancou o acesso venoso duas vezes, e a fisioterapia foi suspensa porque não consegue seguir instruções simples para ficar de pé.',
          'Antes da queda, administrava a aposentadoria e os remédios sem ajuda; ninguém notava esquecimentos, e o exame não mostra fraqueza nem fala enrolada.',
        ],
        rulesOut: 'Até a queda, morava {sozinho|sozinha}, cozinhava e pagava as próprias contas.',
      },
      {
        level: 'hard',
        ages: [74, 88],
        text: `{nome}, {idade} anos, é {levado|levada} à UBS pelo filho, que pede "um remédio para tristeza". O irmão de {nome} morreu há um mês; {ele|ela} chorou no enterro e retomou a rotina, mas há quatro dias quase não come, cochila o dia inteiro e responde só com "é" e "não".

Na consulta, fecha os olhos no meio das perguntas, diz que estão em 1998 e mexe sem parar nos botões da camisa. Segundo o filho, à tarde chega a conversar quase normalmente, mas à noite pergunta pela mãe, morta há décadas. Há dez dias, o clínico trocou o remédio da pressão por um diurético. Até a semana passada, fazia a feira {sozinho|sozinha} e controlava os próprios comprimidos.`,
        clues: [
          'Não consegue repetir quatro números em sequência; quando está mais {desperto|desperta}, não fala em tristeza nem em culpa, só pergunta onde está.',
          'A mudança se instalou em poucos dias, depois da troca do remédio da pressão, e varia de hora em hora; o exame mostra sódio de 121.',
          'Deixou de tomar banho e de comer sem ajuda e já não consegue usar o telefone para falar com a família.',
          'Um teste de memória feito na UBS há quatro meses foi normal; não bebe, não toma calmantes e não tem fraqueza nem fala enrolada.',
        ],
        rulesOut: 'Até a semana passada, fazia a feira {sozinho|sozinha} e controlava os próprios comprimidos.',
      },
    ],
  },
  {
    disorderId: 'alzheimer_disease_ncd',
    reference: {
      label: 'Manual MSD (Profissional) — Doença de Alzheimer',
      url: 'https://www.msdmanuals.com/pt/profissional/dist%C3%BArbios-neurol%C3%B3gicos/delirium-e-dem%C3%AAncia/doen%C3%A7a-de-alzheimer',
    },
    differential: {
      disorderId: 'vascular_neurocognitive_disorder',
      whyNot: 'Não há AVC nem piora em degraus: o declínio é lento e contínuo, começa pela memória recente, e a imagem não mostra lesões vasculares que expliquem o quadro.',
    },
    explanation: 'Declínio de início insidioso e progressão lenta e contínua, com memória e aprendizagem afetadas desde o início (repete perguntas, esquece conversas, não retém palavras nem com dicas) e outro domínio comprometido, como linguagem, orientação ou planejamento, a ponto de exigir ajuda com contas e remédios. Não há outra causa provável: sem sinais motores ou visões, sem tristeza persistente, álcool ou sedativos, e a imagem mostra redução do hipocampo. A ausência de AVC, de piora em degraus e de lesões vasculares afasta o Transtorno Neurocognitivo Vascular.',
    giveaways: ['alzheimer', 'hipocamp', 'amiloide'],
    variants: [
      {
        level: 'easy',
        ages: [72, 84],
        text: `{nome}, {idade} anos, {alfaiate|costureira} {aposentado|aposentada}, é {levado|levada} pela filha ao ambulatório de geriatria por esquecimentos que começaram há uns dois anos e pioram devagar. Repete as mesmas perguntas na mesma tarde, esquece recados e conversas recentes e guarda objetos em lugares estranhos. Há três meses se perdeu na volta da padaria que frequenta há trinta anos.

Já não consegue pagar as contas nem tomar os remédios sem ajuda, embora lembre bem da juventude. No teste de memória, fez 19 pontos de 30. Não anda triste, não bebe e não usa remédios para dormir. Os exames de sangue foram normais, e a ressonância não mostrou sinais de AVC, apenas redução do hipocampo.`,
        clues: [
          'Às vezes não acha palavras simples e se atrapalha com a receita de bolo que fazia de cor; o jeito de ser continua o mesmo.',
          'Os esquecimentos começaram de forma sutil e pioram aos poucos, sem saltos bruscos e sem dias muito melhores ou piores que outros.',
          'A filha assumiu a aposentadoria e a caixa de remédios depois que {ele|ela} tomou a mesma dose duas vezes no mesmo dia.',
          'Nunca teve fraqueza súbita, boca torta ou fala enrolada, e o exame neurológico é normal: anda firme, sem tremores.',
        ],
        rulesOut: 'a ressonância não mostrou sinais de AVC',
      },
      {
        level: 'medium',
        ages: [76, 85],
        text: `{nome}, {idade} anos, vem à UBS com a filha, que conta que {ele|ela} pergunta três ou quatro vezes por tarde se já almoçou e repete a mesma história da roça a cada visita. Deixou o feijão queimar duas vezes, esqueceu o aniversário do neto e acusou a vizinha de pegar a carteira que {ele|ela} {mesmo|mesma} tinha guardado no forno.

A filha acha que tudo começou "lá pelo nascimento do neto", há uns três anos, e foi piorando sem pressa. Parou de jogar truco porque não acompanha mais os pontos, e a conta de luz atrasou pela primeira vez na vida. Continua {animado|animada} com as visitas e com o futebol. A ressonância pedida pelo clínico não mostrou sinais de derrame.`,
        clues: [
          'Às vezes demora a achar palavras simples e chama o controle remoto de "aquele negócio da televisão".',
          'Os esquecimentos começaram discretos e aumentaram aos poucos, sem pioras repentinas e sem dias muito melhores ou piores que outros.',
          'A filha passou a cuidar do dinheiro e dos remédios depois que {ele|ela} pagou o mesmo boleto duas vezes no mês.',
          'Nunca teve fraqueza súbita, boca torta ou fala enrolada; anda firme, sem tremores, não bebe e não usa remédios para dormir.',
        ],
        rulesOut: 'A ressonância pedida pelo clínico não mostrou sinais de derrame.',
      },
      {
        level: 'hard',
        ages: [60, 66],
        text: `{nome}, {idade} anos, {contador|contadora}, é {levado|levada} pelos filhos ao ambulatório de neurologia seis meses depois de ficar {viúvo|viúva}. A família achou que era o luto: {ele|ela} esquece o que combinou com os filhos, repete perguntas e errou a declaração de imposto de dois clientes antigos.

Arrumando a casa, os filhos acharam bilhetes do cônjuge, de dois anos atrás, lembrando consultas, senhas e o caminho para a casa da irmã. {nome} se emociona ao falar do casamento, mas dorme bem, come bem, se diverte com os netos e continua gentil como sempre. Não bebe nem usa remédios para dormir. A ressonância não mostrou sinais de derrame.`,
        clues: [
          'No consultório, não lembra nenhuma das três palavras ditas cinco minutos antes, nem com dicas, e erra o dia do mês.',
          'Pelos bilhetes e relatos, as falhas começaram de forma sutil bem antes da viuvez e vêm piorando aos poucos, sem saltos.',
          'Passou os clientes para um colega e já não consegue pagar as contas da casa nem marcar as próprias consultas sem ajuda.',
          'Nunca teve fraqueza súbita nem fala enrolada, e a ressonância mostra redução do hipocampo, sem lesões nos vasos do cérebro.',
        ],
        rulesOut: 'A ressonância não mostrou sinais de derrame.',
      },
    ],
  },
  {
    disorderId: 'vascular_neurocognitive_disorder',
    reference: {
      label: 'Manual MSD (Profissional) — Comprometimento cognitivo e demência vasculares',
      url: 'https://www.msdmanuals.com/pt/profissional/dist%C3%BArbios-neurol%C3%B3gicos/delirium-e-dem%C3%AAncia/comprometimento-cognitivo-e-dem%C3%AAncia-vasculares',
    },
    differential: {
      disorderId: 'alzheimer_disease_ncd',
      whyNot: 'O declínio começou junto com eventos cerebrovasculares ou avançou em pequenos degraus, com lentidão e falhas executivas predominantes, memória que melhora com pistas e infartos visíveis na imagem.',
    },
    explanation: 'Declínio cognitivo que começa junto com eventos cerebrovasculares ou avança em pequenos degraus, com predomínio de lentidão, atenção e funções executivas (planejar, alternar tarefas), enquanto a memória melhora com pistas. Há fatores de risco, sinais como fraqueza passageira, marcha alterada e urgência urinária, e a imagem mostra infartos e lesões da substância branca suficientes para explicar o quadro, com perda de autonomia. A falta de declínio antes dos eventos e a memória que responde a pistas afastam a Doença de Alzheimer.',
    giveaways: ['vascular', 'avc', 'acidente vascular', 'derrame', 'isquemi', 'infarto cerebral', 'lacunar'],
    variants: [
      {
        level: 'easy',
        ages: [66, 80],
        text: `{nome}, {idade} anos, {hipertenso|hipertensa} e {diabético|diabética} há duas décadas, vem ao ambulatório de neurologia com o filho. Há um ano teve um AVC que deixou o braço esquerdo fraco por algumas semanas. Desde então, pensa e responde devagar, perde o fio das tarefas e não consegue mais organizar as contas nem seguir uma receita.

Antes do AVC, não tinha nenhum esquecimento. Há três meses teve um segundo AVC, pequeno, e piorou de novo de uma vez, em degraus. Lembra-se dos compromissos quando os anota. Não anda triste e não bebe. A ressonância mostra várias áreas de AVC antigo e lesões espalhadas na substância branca.`,
        clues: [
          'Leva o dobro do tempo para se vestir e se perde quando precisa fazer duas coisas ao mesmo tempo, como cozinhar e atender o telefone.',
          'O declínio veio em dois saltos, cada um logo após um AVC, com meses de estabilidade entre eles.',
          'Deixou de ajudar na mercearia da família porque erra o troco e não consegue mais planejar as compras da semana.',
          'Nos testes, lembra as palavras quando recebe pistas; falham sobretudo a atenção, a rapidez e o planejamento.',
        ],
        rulesOut: 'Antes do AVC, não tinha nenhum esquecimento.',
      },
      {
        level: 'medium',
        ages: [62, 78],
        text: `{nome}, {idade} anos, chega ao ambulatório com a filha, que diz que {ele|ela} "nunca mais foi a mesma pessoa" desde a internação do ano passado, quando acordou com a boca torta e a fala enrolada. Hoje demora a responder, se perde nas etapas do bolo que fazia de olhos fechados e não consegue conferir o troco da feira.

A pressão sempre foi alta, e o remédio, tomado quando lembrava. Antes daquela internação, cuidava {sozinho|sozinha} da casa e das contas. Em março, depois de um dia com a perna direita fraca, ficou ainda mais {lento|lenta}, de uma vez. Lembra-se dos recados quando recebe uma dica e continua gostando das novelas.`,
        clues: [
          'Não consegue mais planejar o almoço de domingo e se atrapalha quando precisa fazer duas coisas ao mesmo tempo.',
          'A mudança começou logo depois da internação, ficou estável por meses e piorou de novo, de repente, após o episódio de março.',
          'Deixou de ir {sozinho|sozinha} ao banco e à feira, e a filha agora separa os remédios da semana e paga as contas.',
          'A ressonância mostra cicatrizes de infartos antigos e lesões nos pequenos vasos do cérebro; a memória melhora bastante com pistas.',
        ],
        rulesOut: 'Antes daquela internação, cuidava {sozinho|sozinha} da casa e das contas.',
      },
      {
        level: 'hard',
        ages: [70, 82],
        text: `{nome}, {idade} anos, é {encaminhado|encaminhada} ao ambulatório de geriatria depois de cair duas vezes em casa. A família acha que é "coisa da idade" ou desânimo: há uns dois anos {ele|ela} anda mais devagar, com passos curtos e pés afastados, demora a responder, tem urgência para urinar e abandonou as palavras cruzadas.

Fala da vida com interesse e ri com os netos, mas leva meia hora para escolher a roupa e já não consegue planejar uma ida ao banco. Esquece recados, mas lembra quando recebe uma dica. Tem pressão alta mal controlada há trinta anos e, há três, ficou um dia com a perna esquerda fraca, sem procurar atendimento.`,
        clues: [
          'Nos testes, é muito {lento|lenta} e não consegue alternar números e letras numa sequência, embora entenda bem as instruções.',
          'As mudanças vieram de forma gradual, com pequenas pioras em saltos discretos ao longo de cerca de dois anos.',
          'Deixou de dirigir e de cuidar das contas, e a família agora organiza os remédios e as consultas.',
          'A ressonância mostra muitas lesões na substância branca e pequenos infartos antigos profundos, sem redução importante do hipocampo; não há tremor nem visões.',
        ],
        rulesOut: 'Esquece recados, mas lembra quando recebe uma dica.',
      },
    ],
  },
  {
    disorderId: 'lewy_body_neurocognitive_disorder',
    reference: {
      label: 'Manual MSD (Profissional) — Demência por corpos de Lewy e demência por doença de Parkinson',
      url: 'https://www.msdmanuals.com/pt/profissional/dist%C3%BArbios-neurol%C3%B3gicos/delirium-e-dem%C3%AAncia/dem%C3%AAncia-por-corpos-de-lewy-e-dem%C3%AAncia-por-doen%C3%A7a-de-parkinson',
    },
    differential: {
      disorderId: 'delirium',
      whyNot: 'As oscilações de atenção se repetem há mais de um ano, sobre um declínio progressivo, sem infecção, alteração nos exames ou remédio novo que as explique.',
    },
    explanation: 'Declínio cognitivo insidioso e progressivo com oscilações marcantes de atenção e alerta, percepções visuais recorrentes e detalhadas de pessoas ou animais que não estão lá e lentidão com rigidez surgida depois das falhas cognitivas. Somam-se comportamento motor durante os sonhos, piora grave após antipsicótico e dificuldade visuoespacial, com memória relativamente poupada no início. As oscilações se repetem por mais de um ano, sem infecção, alteração nos exames ou remédio que as explique, o que afasta o Delirium.',
    giveaways: ['lewy', 'parkinson', 'sinuclein'],
    variants: [
      {
        level: 'easy',
        ages: [68, 80],
        text: `{nome}, {idade} anos, {aposentado|aposentada}, vem ao ambulatório de neurologia com a família. Há cerca de um ano e meio alterna dias de boa conversa com dias em que fica {parado|parada}, olhando o nada, {sonolento|sonolenta} e sem acompanhar o que se diz. Vê crianças brincando na sala e um cachorro debaixo da mesa que ninguém mais vê, e descreve tudo em detalhes.

Meses depois dos primeiros sinais, começou a andar com passos curtos, rosto sem expressão e braços rígidos. Há anos se debate e grita dormindo, como se brigasse num sonho. Esquece pouco, mas calcula mal as distâncias e não consegue copiar um desenho simples. Os exames de sangue e urina são normais, e não usa nenhum remédio novo.`,
        clues: [
          'Depois de uma dose de haloperidol no pronto-socorro, ficou muito {rígido|rígida} e mais {confuso|confusa} por vários dias.',
          'O quadro começou de forma insidiosa e piora aos poucos; a rigidez e os passos curtos surgiram depois das primeiras falhas de atenção.',
          'Deixou de dirigir e de cuidar do dinheiro, e nos dias ruins precisa de ajuda para tomar banho e se vestir.',
          'As oscilações se repetem há mais de um ano sem febre, infecção ou troca de remédios, e a ressonância não mostra AVC.',
        ],
        rulesOut: 'Os exames de sangue e urina são normais, e não usa nenhum remédio novo.',
      },
      {
        level: 'medium',
        ages: [68, 82],
        text: `{nome}, {idade} anos, vem ao ambulatório de geriatria com o filho. Ele conta que há dias em que {nome} lê o jornal e conversa normalmente, e outros em que passa a tarde {parado|parada}, cochilando, sem acompanhar a novela. Às vezes oferece café a um homem sentado na poltrona vazia e se surpreende quando o filho diz que não há ninguém ali.

Tudo começou há uns dois anos e vem piorando aos poucos; depois, passou a arrastar os pés e a abotoar a roupa com lentidão. No ano passado, uma injeção de haloperidol no pronto-socorro {o|a} deixou {rígido|rígida} e {prostrado|prostrada} por dias. Exames de sangue e urina recentes vieram normais, e não houve troca de remédios.`,
        clues: [
          'Há muitos anos fala, chuta e dá socos dormindo, como se lutasse num sonho, e já caiu da cama duas vezes.',
          'As oscilações e as visões vieram primeiro; a lentidão dos movimentos apareceu cerca de um ano depois e vem aumentando.',
          'Deixou de cozinhar depois de deixar o gás aberto num dia ruim e já não sai {sozinho|sozinha} de casa.',
          'Esquece pouco nos dias bons; nenhuma fase ruim coincidiu com febre, infecção ou remédio novo, e nunca teve problemas psiquiátricos.',
        ],
        rulesOut: 'Exames de sangue e urina recentes vieram normais, e não houve troca de remédios.',
      },
      {
        level: 'hard',
        ages: [62, 72],
        text: `{nome}, {idade} anos, é {encaminhado|encaminhada} ao ambulatório do sono porque, há anos, grita, chuta e já machucou o cônjuge enquanto sonha que está brigando. Na consulta, o cônjuge menciona outras mudanças do último ano: há manhãs em que {nome} fica "{desligado|desligada}", olhando o nada por horas, e tardes em que conversa normalmente.

Parou de dirigir depois de raspar o carro duas vezes no portão de casa e, à noite, vê um gato no canto do quarto que ninguém mais vê. Anda um pouco mais devagar, e o braço direito já não balança ao caminhar. Lembra-se das consultas e das conversas. Os exames de sangue e os remédios que usa não explicam as oscilações.`,
        clues: [
          'No consultório, não consegue copiar dois pentágonos que se cruzam e, em alguns momentos, quase adormece no meio da conversa.',
          'Os sonhos agitados existem há anos; as oscilações e as visões começaram há cerca de um ano, e a lentidão ao andar, só nos últimos meses.',
          'Deixou a tesouraria da igreja depois de errar contas simples nos dias ruins e precisa de ajuda para organizar os remédios.',
          'Nenhuma fase ruim coincidiu com febre, infecção ou troca de remédios, e a ressonância não mostrou AVC nem outra lesão.',
        ],
        rulesOut: 'Os exames de sangue e os remédios que usa não explicam as oscilações.',
      },
    ],
  },
  {
    disorderId: 'frontotemporal_neurocognitive_disorder',
    reference: {
      label: 'Manual MSD (Profissional) — Demência frontotemporal (DFT)',
      url: 'https://www.msdmanuals.com/pt/profissional/dist%C3%BArbios-neurol%C3%B3gicos/delirium-e-dem%C3%AAncia/dem%C3%AAncia-frontotemporal-dft',
    },
    differential: {
      disorderId: 'alzheimer_disease_ncd',
      whyNot: 'A memória de fatos recentes e a orientação seguem preservadas; desde o início predominam mudanças de comportamento ou de linguagem, antes dos 65 anos, com atrofia frontal ou temporal anterior.',
    },
    explanation: 'Declínio insidioso e progressivo iniciado antes dos 65 anos, com desinibição, apatia, perda de empatia, comportamentos repetitivos e mudança alimentar ou, na variante de linguagem, perda progressiva do significado das palavras com fala fluente. Memória de fatos recentes, orientação e habilidades visuais ficam relativamente preservadas, e a imagem mostra atrofia frontal ou temporal anterior. Não há euforia, redução do sono, tristeza ou álcool que expliquem a mudança. A memória preservada e o predomínio de comportamento ou linguagem afastam a Doença de Alzheimer.',
    giveaways: ['frontotemporal', 'frontal', 'frontais', 'pick'],
    variants: [
      {
        level: 'easy',
        ages: [52, 64],
        text: `{nome}, {idade} anos, gerente de loja, é {levado|levada} ao ambulatório de neurologia pela família. Sempre {discreto|discreta} e gentil, há dois anos passou a contar piadas obscenas a clientes, a abraçar desconhecidos na rua e a comer pacotes inteiros de biscoito recheado. Ficou indiferente à cirurgia de um filho e larga as tarefas pela metade.

Repete os mesmos trajetos e bate palmas sempre na mesma sequência. Lembra-se dos compromissos e do que fez no dia anterior e se orienta bem pela cidade. Dorme a noite toda e nunca teve fases de euforia ou de tristeza. Não bebe. A ressonância mostra redução dos lobos frontais.`,
        clues: [
          'Pega comida do prato dos outros à mesa e não percebe o constrangimento que causa; quando é {criticado|criticada}, apenas dá de ombros.',
          'A mudança começou aos poucos, há cerca de dois anos, e vem se agravando de forma contínua, sem fases de melhora.',
          'Foi {afastado|afastada} da gerência após reclamações de clientes e deixou de pagar contas que antes administrava com cuidado.',
          'Nos testes, a memória e a cópia de desenhos estão quase normais; falham o planejamento, a flexibilidade e o julgamento social.',
        ],
        rulesOut: 'Lembra-se dos compromissos e do que fez no dia anterior e se orienta bem pela cidade.',
      },
      {
        level: 'medium',
        ages: [50, 62],
        text: `{nome}, {idade} anos, é {levado|levada} pela irmã ao CAPS depois de ser {flagrado|flagrada} comendo chocolates no mercado sem pagar, na frente do segurança, sem esconder nem entender a bronca. A irmã conta que, há uns dois anos, {nome} começou a puxar conversas íntimas com estranhos na fila do banco, riu alto no velório de uma tia e deixou de perguntar pelos sobrinhos.

Passou a comer doce de leite direto do pote e a cantar o mesmo refrão o dia inteiro. Esquece pouco: conta o que fez na véspera e não perde compromissos. Dorme bem, não bebe e não teve fases de euforia nem de tristeza. Não parece se incomodar com nada do que mudou.`,
        clues: [
          'Deixou de cuidar da própria higiene e assiste sem reação à irmã chorar, preocupada com {ele|ela}.',
          'As mudanças começaram de forma discreta há cerca de dois anos e vêm piorando sem parar, sem nenhum período de melhora.',
          'Perdeu o emprego de recepcionista após comentários inadequados a clientes e não consegue mais organizar as próprias contas.',
          'Nos testes, memória e orientação vão bem; falham o planejamento e a leitura de situações sociais, e a ressonância mostra atrofia frontal.',
        ],
        rulesOut: 'Esquece pouco: conta o que fez na véspera e não perde compromissos.',
      },
      {
        level: 'hard',
        ages: [57, 66],
        text: `{nome}, {idade} anos, {professor|professora} de história {aposentado|aposentada}, procura o ambulatório de neurologia com a filha por "memória fraca": há uns dois anos esquece o nome de coisas e de pessoas. Na consulta, não sabe dizer o nome de um cadeado e, quando ouve a palavra, pergunta o que ela quer dizer; chama o cachorro de "aquele bicho". Fala com fluência e boa gramática, mas com palavras cada vez mais vagas.

Conta em detalhes o que fez no aniversário do neto, vai {sozinho|sozinha} ao banco e não perde consultas. Ficou mais {rígido|rígida}: só aceita o mesmo prato no almoço e se irrita quando a rotina muda. Sempre falou e escreveu muito bem. Nunca teve fraqueza súbita ou fala enrolada e não anda triste.`,
        clues: [
          'Não reconhece mais frutas menos comuns, como o caqui, e pergunta para que serve um grampeador que usou a vida inteira.',
          'A dificuldade começou de forma sutil há cerca de dois anos e piora aos poucos, sem nenhum episódio súbito.',
          'Deixou de dar aulas particulares e de ler romances, porque já não entende muitas palavras, e quase não fala nas conversas em família.',
          'A ressonância mostra atrofia da parte anterior do lobo temporal esquerdo, sem lesões vasculares, e a memória para fatos recentes é normal nos testes.',
        ],
        rulesOut: 'Conta em detalhes o que fez no aniversário do neto, vai {sozinho|sozinha} ao banco e não perde consultas.',
      },
    ],
  },
  {
    disorderId: 'major_or_mild_ncd_due_to_traumatic_brain_injury',
    reference: {
      label: 'Manual MSD (Profissional) — Traumatismo cranioencefálico (TCE)',
      url: 'https://www.msdmanuals.com/pt/profissional/les%C3%B5es-intoxica%C3%A7%C3%A3o/traumatismo-cranioencef%C3%A1lico-tce/traumatismo-cranioencef%C3%A1lico-tce',
    },
    differential: {
      disorderId: 'ptsd',
      whyNot: 'Não há lembranças invasivas, pesadelos, evitação ou sobressaltos ligados ao acidente; as falhas de memória e atenção começaram logo após a lesão cerebral documentada e persistem.',
    },
    explanation: 'Lesão cerebral por impacto documentada, com perda de consciência ou amnésia do período do acidente, contusões ou sangramento na tomografia e, em um caso, perda do olfato. Os déficits de atenção, velocidade, memória e funções executivas surgiram logo após a recuperação da consciência e persistem meses depois, com irritabilidade e cansaço, prejudicando o trabalho; antes, o desempenho era bom, sem álcool ou drogas. Não há lembranças invasivas, pesadelos, evitação ou sobressaltos ligados ao acidente, o que afasta o Transtorno de Estresse Pós-Traumático.',
    giveaways: ['traumatismo', 'tce', 'cranioencefalico', 'concuss'],
    variants: [
      {
        level: 'easy',
        ages: [21, 32],
        text: `{nome}, {idade} anos, {entregador|entregadora} de aplicativo, vem ao centro de reabilitação dez meses depois de um acidente de moto. Teve um traumatismo craniano grave: ficou {desacordado|desacordada} por dois dias, a tomografia mostrou contusões e sangramento no cérebro, e não se lembra de nada da semana seguinte ao acidente.

Desde que acordou, pensa devagar, esquece o que acabaram de dizer e perde o fio das tarefas; melhorou pouco nos últimos meses. Antes, tinha terminado o ensino médio sem dificuldades e trabalhava bem. Não tem pesadelos nem lembranças invasivas do acidente e não evita motos. Não bebe nem usa drogas.`,
        clues: [
          'Ficou mais {irritadiço|irritadiça} e {impulsivo|impulsiva}, fala o que pensa sem filtro e se cansa rápido em lugares barulhentos.',
          'As falhas apareceram assim que recuperou a consciência, melhoraram um pouco nos primeiros meses e depois se estabilizaram.',
          'Foi {desligado|desligada} do aplicativo por atrasos e erros de endereço e hoje depende da mãe para controlar o dinheiro e as consultas.',
          'Fala do acidente sem aflição, assiste a vídeos de corrida de moto e só não voltou a pilotar por orientação médica.',
        ],
        rulesOut: 'Não tem pesadelos nem lembranças invasivas do acidente e não evita motos.',
      },
      {
        level: 'medium',
        ages: [38, 56],
        text: `{nome}, {idade} anos, eletricista, vem ao ambulatório com o cônjuge um ano depois de cair de uma escada de quatro metros num galpão. Ficou {desacordado|desacordada} no chão, acordou no hospital sem lembrar daquele dia nem dos três seguintes e passou duas semanas {internado|internada}.

Desde a alta, esquece o que foi combinado, se perde no meio do serviço e não consegue mais calcular o material de uma instalação. Antes da queda, trabalhava havia vinte anos sem erros. Perdeu o olfato, explode por pouco e logo se arrepende. Não tem pesadelos nem evita escadas, e conta a queda do jeito que ouviu dos colegas, sem aflição. Não bebe.`,
        clues: [
          'Fica {exausto|exausta} depois de meia hora de conversa e tem dores de cabeça frequentes, mas não anda triste nem {desanimado|desanimada}.',
          'As dificuldades estavam presentes desde que acordou no hospital; melhoraram nos primeiros seis meses e depois pararam de evoluir.',
          'Está {afastado|afastada} pelo INSS, não consegue fazer orçamentos e já discutiu com dois clientes por causa de erros na conta.',
          'A tomografia da internação mostrou contusões nos lobos frontais, e não há lembranças invasivas nem sobressaltos ligados ao acidente.',
        ],
        rulesOut: 'Não tem pesadelos nem evita escadas, e conta a queda do jeito que ouviu dos colegas, sem aflição.',
      },
      {
        level: 'hard',
        ages: [28, 45],
        text: `{nome}, {idade} anos, analista de recursos humanos, é {encaminhado|encaminhada} pelo médico do trabalho por erros e esquecimentos desde que voltou da licença. A família acha que é "abalo": há oito meses, {nome} dirigia o carro que capotou na estrada, e a amiga que ia ao lado quebrou a perna.

Não se lembra do capotamento nem da chegada ao hospital, onde ficou dois dias em observação, com um corte na testa. Desde então, perde o fio das reuniões, esquece senhas e prazos, demora para responder e-mails simples e tem dor de cabeça no fim do dia. Voltou a dirigir na mesma estrada sem medo e não sonha com o acidente. Antes, sempre foi {organizado|organizada} na escola e no trabalho.`,
        clues: [
          'Precisa reler várias vezes o mesmo parágrafo e não acompanha duas conversas ao mesmo tempo; o humor está bom, mas se irrita com barulho.',
          'As falhas apareceram logo após a alta e, depois de alguma melhora nos primeiros meses, continuam iguais.',
          'Perdeu a coordenação de um projeto e só dá conta da rotina com alarmes no celular e listas escritas.',
          'A tomografia do dia mostrou uma pequena contusão frontal; não há lembranças invasivas, sobressaltos ou evitação, e não bebe nem usa drogas.',
        ],
        rulesOut: 'Voltou a dirigir na mesma estrada sem medo e não sonha com o acidente.',
      },
    ],
  },
  {
    disorderId: 'major_or_mild_ncd_due_to_hiv_infection',
    reference: {
      label: 'MSD Manual (Professional Edition) — Human Immunodeficiency Virus (HIV)–Associated Dementia',
      url: 'https://www.msdmanuals.com/professional/infectious-diseases/human-immunodeficiency-virus-hiv-infection/human-immunodeficiency-virus-hiv-associated-dementia',
    },
    differential: {
      disorderId: 'mdd',
      whyNot: 'Há falta de iniciativa, mas não tristeza persistente, culpa ou perda de prazer; predominam lentidão, falhas de atenção e memória e sinais motores, em infecção por HIV documentada.',
    },
    explanation: 'Infecção por HIV documentada e declínio insidioso de padrão subcortical: lentidão para pensar e agir, falhas de atenção e de funções executivas, memória que melhora com pistas, falta de iniciativa e sinais motores, como mãos desajeitadas e marcha lenta, com prejuízo no trabalho e em casa. Imagem e líquor afastam infecções oportunistas, e não há álcool, drogas ou AVC. Não há tristeza persistente, culpa ou perda de prazer, e o declínio começou antes de qualquer perda recente, o que afasta o Transtorno Depressivo Maior.',
    giveaways: ['hiv', 'aids', 'soropositiv', 'antirretrovira', 'cd4', 'carga viral', 'tarv'],
    variants: [
      {
        level: 'easy',
        ages: [40, 55],
        text: `{nome}, {idade} anos, {cobrador|cobradora} de ônibus, vive com HIV há dezoito anos. Ficou anos sem tratamento regular e chegou a ter o CD4 muito baixo; há cinco anos toma os antirretrovirais direito, e a carga viral está indetectável. Há cerca de um ano, pensa e se move mais devagar, esquece compromissos e se perde em tarefas com várias etapas.

A letra piorou, deixa cair objetos e tropeça mais. Diz que não está triste e continua gostando dos mesmos programas, só "demora a engrenar". A ressonância mostra alterações difusas na substância branca, sem infartos, e o exame do líquor não mostrou infecção oportunista. Não bebe nem usa drogas.`,
        clues: [
          'Nos testes, é {lento|lenta} para tudo e lembra melhor quando recebe pistas; a coordenação fina das mãos também piorou.',
          'O declínio começou de forma insidiosa há cerca de um ano e piora devagar, sem episódios bruscos.',
          'Foi {transferido|transferida} para um serviço mais simples na garagem porque errava trocos e esquecia procedimentos.',
          'Dorme e come como sempre, não sente culpa nem desesperança e continua indo aos jogos do time aos domingos.',
        ],
        rulesOut: 'Diz que não está triste e continua gostando dos mesmos programas',
      },
      {
        level: 'medium',
        ages: [35, 50],
        text: `{nome}, {idade} anos, {cabeleireiro|cabeleireira}, vem à consulta com a irmã, que estranha a mudança do último ano: {nome} demora para responder, esquece clientes agendados, deixou a panela queimar duas vezes e não acompanha mais as contas do salão. Anda devagar, como se pensasse em cada passo.

Faz acompanhamento no SAE e toma o coquetel desde 2012; a médica diz que os exames de controle estão "zerados". Ri das piadas da irmã e diz que não está triste, mas passa o domingo no sofá se ninguém {o|a} chamar. Não bebe e nunca usou drogas.`,
        clues: [
          'As mãos ficaram desajeitadas: deixa cair tesouras e pentes e já não consegue fazer penteados que exigem precisão.',
          'A lentidão e os esquecimentos começaram aos poucos, há cerca de um ano, e vêm piorando devagar, sem nenhum episódio súbito.',
          'Deixou a agenda e o caixa do salão com a irmã e perdeu clientes por atrasos e cortes errados.',
          'Não perdeu o prazer nas coisas nem sente culpa; a carga viral é indetectável, e ressonância e líquor não mostram infecção oportunista.',
        ],
        rulesOut: 'Ri das piadas da irmã e diz que não está triste',
      },
      {
        level: 'hard',
        ages: [48, 60],
        text: `{nome}, {idade} anos, é {encaminhado|encaminhada} ao psicólogo da UBS por "desânimo" depois de ser {demitido|demitida} da gráfica onde trabalhou por quinze anos. A demissão veio após meses de atrasos e erros em pedidos simples, e o cônjuge conta que {nome} ficou mais {lento|lenta}, esquece recados e larga tarefas pela metade.

É {acompanhado|acompanhada} no serviço de infectologia há vinte anos e toma dois comprimidos todas as manhãs; os últimos exames de controle vieram "zerados". Diz que não se sente triste nem {culpado|culpada}, só "sem partida", e ainda ri com os netos. Não bebe, não usa drogas e nunca teve derrame.`,
        clues: [
          'Nos testes, é {lento|lenta} para tudo, melhora com pistas e tem dificuldade para alternar tarefas; a marcha também ficou mais lenta e insegura.',
          'As falhas começaram de forma gradual cerca de um ano antes da demissão e vêm piorando devagar desde então.',
          'Deixou de dirigir e de cuidar das contas da casa, e o cônjuge passou a conferir os comprimidos da manhã.',
          'A carga viral segue indetectável, o CD4 é 480, e ressonância, líquor e sorologia para sífilis não mostram outra causa; sono e apetite estão normais.',
        ],
        rulesOut: 'Diz que não se sente triste nem {culpado|culpada}',
      },
    ],
  },
]
