import type { DisorderCaseSet } from './types'

export const obsessiveCases: DisorderCaseSet[] = [
  {
    disorderId: 'ocd',
    reference: {
      label: 'Manual MSD (Profissional) — Transtorno obsessivo-compulsivo (TOC)',
      url: 'https://www.msdmanuals.com/pt/profissional/psiquiatria/transtornos-obsessivo-compulsivos-e-transtornos-relacionados/transtorno-obsessivo-compulsivo-toc',
    },
    differential: {
      disorderId: 'obsessive_compulsive_personality_disorder',
      whyNot: 'Os pensamentos são intrusivos, indesejados e combatidos, e os rituais servem para aliviá-los; fora deles, não há o padrão duradouro de perfeccionismo, rigidez e apego a regras vivido como correto.',
    },
    explanation: 'Obsessões de contaminação, de causar dano ou de ofender a Deus, vividas como intrusivas e indesejadas, seguidas de compulsões visíveis ou mentais (lavar, conferir, rezar numa ordem exata) que aliviam o desconforto, tomam mais de uma hora por dia e causam prejuízo. A crítica preservada afasta um quadro psicótico, e não há substância, medicamento ou doença por trás do início. No Transtorno de Personalidade Obsessivo-Compulsiva não existem obsessões nem compulsões verdadeiras: perfeccionismo e rigidez formam um jeito de ser duradouro, vivido como correto, o que não se vê aqui.',
    giveaways: [],
    variants: [
      {
        level: 'easy',
        ages: [19, 24],
        text: `{nome}, {idade} anos, estudante de enfermagem, procura a UBS porque não consegue mais encostar em maçanetas, dinheiro ou no celular dos colegas. Há dois anos, pensamentos de que vai se contaminar e levar doenças para a avó invadem sua cabeça várias vezes ao dia. Sabe que são exagerados e tenta afastá-los, sem sucesso.

Para aliviar a aflição, lava as mãos até 40 vezes por dia e toma banhos de uma hora: são mais de três horas diárias, e as mãos vivem rachadas. Diz que virou uma obsessão e que odeia os próprios rituais. Fora deles, nunca se prendeu a ordem, listas ou regras. Não usa medicamentos nem outras substâncias.`,
        clues: [
          'Pede várias vezes à mãe que confirme que ninguém adoeceu por sua causa e evita sentar nos bancos do ônibus.',
          'Começou aos poucos, sem nenhuma doença antes, e piorou no último semestre, quando passou a ter aulas práticas no hospital.',
          'Trancou a disciplina de estágio e deixou de visitar a avó para não levar sujeira da rua.',
          'Nunca foi perfeccionista: o quarto vive bagunçado, entrega trabalhos sem revisar demais e não tenta impor regras a ninguém.',
        ],
        rulesOut: 'Fora deles, nunca se prendeu a ordem, listas ou regras.',
      },
      {
        level: 'medium',
        ages: [28, 45],
        text: `{nome}, {idade} anos, motorista de aplicativo, chega ao ambulatório de saúde mental {levado|levada} pela irmã, que perdeu a paciência com os atrasos. Antes de sair de casa, {ele|ela} confere o registro do gás, as tomadas e a porta até dez vezes e fotografa os botões do fogão. Na rua, se o carro passa num buraco, refaz o trajeto para ter certeza de que não atropelou ninguém.

Diz que sabe que é absurdo, mas a imagem de alguém ferido não sai da cabeça até conferir. Perde mais de duas horas por dia nisso, desde os 20 e poucos anos, e no último ano piorou. Fora dessas conferências, é {o|a} mais {relaxado|relaxada} da família com horários e arrumação.`,
        clues: [
          'Pede à irmã que repita que a porta ficou trancada e, se ela se recusa, volta para conferir de novo.',
          'Os rituais começaram aos poucos depois dos 20 anos, oscilam ao longo do tempo e nunca dependeram de remédio, bebida ou droga.',
          'Teve a conta suspensa no aplicativo por cancelar corridas no meio do caminho e hoje trabalha metade das horas de que precisa.',
          'Não exige perfeição de ninguém, delega tarefas sem problema e não se incomoda com bagunça; os rituais são a única coisa que {o|a} atormenta.',
        ],
        rulesOut: 'Fora dessas conferências, é {o|a} mais {relaxado|relaxada} da família com horários e arrumação.',
      },
      {
        level: 'hard',
        ages: [24, 38],
        text: `{nome}, {idade} anos, auxiliar administrativ{o|a}, procura a UBS pedindo um remédio para dormir: há meses só pega no sono de madrugada. Aos poucos, conta que na cama repete orações numa ordem exata e recomeça do zero sempre que uma frase ofensiva contra Deus "atravessa" o pensamento, contra a sua vontade.

Diz que vem de família evangélica e que ninguém na igreja exige isso; o pastor garante que não há pecado, mas a dúvida volta no dia seguinte. Reconhece que as frases nascem da própria cabeça e se horroriza com elas. Passa mais de duas horas por noite nisso. Fora da reza, não é perfeccionista nem {apegado|apegada} a regras, e o humor anda bom.`,
        clues: [
          'Evita ler certos trechos da Bíblia em voz alta e conta até 33 de cabeça quando a frase aparece, para "desfazer" o pensamento.',
          'Os pensamentos começaram aos 15 anos, sumiram por um tempo e voltaram fortes há um ano, sem relação com remédios, drogas ou doença.',
          'Chega {atrasado|atrasada} e {sonolento|sonolenta} ao trabalho, já recebeu advertência e deixou de ir aos cultos de domingo para não "provocar" as frases.',
          'No trabalho, delega, entrega tarefas sem revisar demais e não cobra dos outros padrões morais; a luta é só contra as frases que invadem a cabeça.',
        ],
        rulesOut: 'Fora da reza, não é perfeccionista',
      },
    ],
  },
  {
    disorderId: 'body_dysmorphic_disorder',
    reference: {
      label: 'Manual MSD (Profissional) — Transtorno dismórfico corporal',
      url: 'https://www.msdmanuals.com/pt/profissional/psiquiatria/transtornos-obsessivo-compulsivos-e-transtornos-relacionados/transtorno-dism%C3%B3rfico-corporal',
    },
    differential: {
      disorderId: 'social_anxiety',
      whyNot: 'O afastamento vem da preocupação com um defeito de aparência que os outros não veem, e não do medo de falar ou de se comportar mal diante das pessoas.',
    },
    explanation: 'Preocupação de horas por dia com defeitos de aparência que os outros não notam ou acham mínimos (pele, nariz, cabelo), com comportamentos repetitivos — conferir no espelho, fotografar-se, comparar-se, camuflar e pedir confirmação — e prejuízo nos estudos, no trabalho e na vida social. A preocupação não envolve peso ou gordura, o que afasta um transtorno alimentar, e não há outras crenças estranhas. No Transtorno de Ansiedade Social o medo é de agir de modo embaraçoso diante dos outros; aqui, o desconforto depende só da aparência.',
    giveaways: [],
    variants: [
      {
        level: 'easy',
        ages: [15, 18],
        text: `{nome}, {idade} anos, estudante do ensino médio, chega {encaminhado|encaminhada} pela dermatologista, que não encontrou nada além de duas marquinhas antigas de espinha. Há um ano, {ele|ela} se convenceu de que a pele do rosto está "cheia de crateras" e diz que pensa nisso o dia inteiro, como uma obsessão.

Passa até quatro horas por dia conferindo o rosto no espelho e na câmera do celular, compara a pele com a dos colegas e só sai de casa com base grossa ou boné. Pergunta à mãe várias vezes se as marcas estão aparecendo. Não se preocupa com o peso e, de boné, conversa à vontade com qualquer pessoa.`,
        clues: [
          'Espreme e raspa a pele com as unhas para "consertar" as marcas e apaga quase todas as fotos em que aparece.',
          'A preocupação começou aos poucos depois de uma fase de espinhas e foi ocupando cada vez mais horas, mesmo com a pele já limpa.',
          'Falta às aulas nos dias em que acha a pele "pior" e recusou a própria festa de aniversário por causa das fotos.',
          'Quando sente a pele bem coberta, apresenta trabalhos e fala em público sem dificuldade; o medo é só de que reparem nas marcas.',
        ],
        rulesOut: 'de boné, conversa à vontade com qualquer pessoa',
      },
      {
        level: 'medium',
        ages: [22, 34],
        text: `{nome}, {idade} anos, vende roupas numa loja de shopping e chega ao ambulatório {encaminhado|encaminhada} por um cirurgião plástico, que se recusou a operar de novo o nariz que {ele|ela} chama de "torto e enorme". A rinoplastia de dois anos atrás não ajudou. Para a família e os colegas, o nariz é comum.

{nome} tira dezenas de selfies por dia para checar o perfil, procura o próprio reflexo em cada vitrine e fala com a mão na frente do nariz. Compara-se com influenciadores e pede que a mãe diga se "dá para notar". Come normalmente, não liga para o peso e, fora a vergonha do nariz, sempre gostou de conversar com clientes.`,
        clues: [
          'Diz que pensa no nariz a maior parte do dia e evita ser {fotografado|fotografada} de perfil, até em aniversários da família.',
          'A preocupação começou aos 17 anos, depois de um comentário de um colega, e não diminuiu com a cirurgia; ao contrário, piorou.',
          'Pediu transferência para o estoque da loja, perdeu as comissões e gastou as economias em consultas com cirurgiões.',
          'Não tem medo de falar em público nem de passar vergonha por algo que faça; o desconforto aparece só quando acha que olham para o nariz.',
        ],
        rulesOut: 'fora a vergonha do nariz, sempre gostou de conversar com clientes',
      },
      {
        level: 'hard',
        ages: [38, 55],
        text: `{nome}, {idade} anos, contador{|a}, procura a dermatologia da policlínica pela terceira vez em um ano por "queda de cabelo". Os exames de sangue e a avaliação do couro cabeludo vieram normais para a idade, e {ele|ela} saiu {insatisfeito|insatisfeita}, pedindo um transplante.

O cônjuge conta que {ele|ela} usa dois espelhos para examinar o alto da cabeça e fotografa o couro cabeludo toda manhã, comparando com fotos antigas. Penteia os fios para "esconder as falhas", não tira o boné nem no escritório e largou o futebol de sábado para não molhar o cabelo de suor. Nunca arrancou fios. Com o boné, encontra os amigos sem nenhum constrangimento.`,
        clues: [
          'Passa quase duas horas por dia examinando o cabelo; não teme estar doente e diz que o problema é a "aparência horrível".',
          'Começou a se preocupar com o cabelo ainda na faculdade, e nos últimos dois anos a preocupação passou a tomar boa parte do dia.',
          'Recusou uma promoção que exigia reuniões presenciais com clientes e deixou de ir a casamentos e batizados da família.',
          'Não teme falar em público nem parecer {desajeitado|desajeitada}; o desconforto surge só quando acha que alguém pode ver o alto da sua cabeça.',
        ],
        rulesOut: 'Com o boné, encontra os amigos sem nenhum constrangimento.',
      },
    ],
  },
  {
    disorderId: 'hoarding_disorder',
    reference: {
      label: 'Manual MSD (Profissional) — Transtorno de acumulação',
      url: 'https://www.msdmanuals.com/pt/profissional/psiquiatria/transtornos-obsessivo-compulsivos-e-transtornos-relacionados/transtorno-de-acumula%C3%A7%C3%A3o',
    },
    differential: {
      disorderId: 'ocd',
      whyNot: 'Guardar não serve para neutralizar pensamentos intrusivos ou evitar uma catástrofe temida; os objetos são mantidos por apego e pela ideia de que serão úteis, e descartá-los causa sofrimento.',
    },
    explanation: 'Dificuldade persistente de se desfazer de objetos, independentemente do valor, pela necessidade de guardá-los e pelo sofrimento ao descartá-los, com acúmulo que impede o uso dos cômodos e traz riscos e prejuízo; quase sempre há aquisição excessiva. O padrão vem da juventude e piora com os anos, e a memória está preservada, o que afasta um quadro neurocognitivo. No TOC, guardar seria um ritual para afastar pensamentos intrusivos ou uma catástrofe temida, e no Transtorno de Personalidade Obsessivo-Compulsiva haveria perfeccionismo e rigidez; nada disso aparece aqui.',
    giveaways: [],
    variants: [
      {
        level: 'easy',
        ages: [55, 68],
        text: `{nome}, {idade} anos, {aposentado|aposentada}, é {levado|levada} à UBS pela filha depois que os bombeiros, chamados por vizinhos, apontaram risco de incêndio na casa. Jornais, sacolas, potes e caixas ocupam a sala e a cozinha até o teto; o fogão não pode ser usado e {ele|ela} dorme numa poltrona.

Desde a juventude tem dificuldade de jogar coisas fora, mesmo sem valor, porque "um dia vai precisar", e sofre muito só de pensar em descartá-las. Quando a filha tentou limpar, chorou e trouxe tudo de volta. Não guarda nada por medo de que algo ruim aconteça. Os testes de memória feitos no posto vieram normais.`,
        clues: [
          'Pega jornais gratuitos, folhetos e móveis deixados na calçada, mesmo sem espaço para guardá-los.',
          'Já guardava cadernos e embalagens na adolescência; o volume foi crescendo aos poucos e ficou grave depois que os filhos saíram de casa.',
          'Deixou de receber visitas por vergonha, e os vizinhos reclamam de baratas e do cheiro que vem do quintal.',
          'Diz que guarda por apego e para não desperdiçar; não há pensamentos ruins a afastar, nem rigidez ou perfeccionismo em outras áreas.',
        ],
        rulesOut: 'Não guarda nada por medo de que algo ruim aconteça.',
      },
      {
        level: 'medium',
        ages: [34, 48],
        text: `{nome}, {idade} anos, professor{|a} de história, mora {sozinho|sozinha} num apartamento de dois quartos e procura o ambulatório depois de uma briga com o irmão. Ele entrou para consertar um vazamento e precisou abrir caminho entre pilhas de revistas, provas antigas, roupas que não servem e eletrônicos quebrados.

A cama está coberta, então {nome} dorme no sofá; a pia guarda caixas e as refeições são compradas prontas. Quando o irmão encheu três sacos para o lixo, {nome} passou a noite revirando-os. Diz que tudo "ainda pode servir" e que jogar fora parece um desperdício insuportável. Não teme que algo ruim aconteça se descartar.`,
        clues: [
          'Compra livros e utensílios em promoção que nunca usa e traz para casa objetos que os colegas iam jogar fora.',
          'Guarda provas e cadernos desde a adolescência; o volume foi aumentando ano a ano e ficou crítico depois da última mudança de casa.',
          'Dá aulas com dedicação, mas não recebe ninguém em casa há anos, e o síndico ameaça multar pelo risco de incêndio.',
          'Guardar não alivia pensamentos que invadem a cabeça e não há perfeccionismo; o sofrimento aparece só quando alguém tenta tirar algo dali.',
        ],
        rulesOut: 'Não teme que algo ruim aconteça se descartar.',
      },
      {
        level: 'hard',
        ages: [70, 82],
        text: `{nome}, {idade} anos, chega ao pronto-atendimento após uma queda em casa: tropeçou numa pilha de caixas no corredor. O agente comunitário de saúde, que acompanhou o socorro, relata que os cômodos têm só "trilhas" entre sacolas, garrafas e aparelhos velhos, e os filhos acham que {ele|ela} está "ficando {esclerosado|esclerosada}".

Na avaliação, conversa bem, lembra datas e remédios, cuida das próprias contas e o teste de memória vem normal. Segundo a irmã, guarda tudo desde {moço|moça} e sempre sofreu para se desfazer de qualquer coisa. Diz que guarda porque "é tudo útil", não por medo de algum perigo.`,
        clues: [
          'Pega garrafas e sacolas na feira e na rua quase todos os dias, mesmo sem lugar para guardá-las.',
          'A irmã lembra que {ele|ela} já enchia o quarto de revistas aos 20 anos; o volume cresceu devagar e piorou depois da aposentadoria.',
          'O banheiro e a cozinha estão quase inutilizáveis, os filhos deixaram de levar os netos e já houve um princípio de incêndio.',
          'Não descreve pensamentos que invadem a cabeça nem rituais, e não é perfeccionista; sofre apenas quando alguém mexe nas coisas ou sugere doá-las.',
        ],
        rulesOut: 'não por medo de algum perigo',
      },
    ],
  },
  {
    disorderId: 'trichotillomania',
    reference: {
      label: 'Manual MSD (Profissional) — Tricotilomania',
      url: 'https://www.msdmanuals.com/pt/profissional/psiquiatria/transtornos-obsessivo-compulsivos-e-transtornos-relacionados/tricotilomania',
    },
    differential: {
      disorderId: 'ocd',
      whyNot: 'O gesto de arrancar não responde a pensamentos intrusivos nem a regras para afastar uma ameaça; vem com tensão, tédio ou concentração e traz alívio, muitas vezes de forma automática.',
    },
    explanation: 'Arrancar fios de forma recorrente, com falhas visíveis, tentativas repetidas de parar e sofrimento ou prejuízo. O gesto surge com tensão, tédio ou concentração, às vezes sem perceber, e traz alívio. O exame afasta fungos e outras causas de queda, não há remédios ou drogas envolvidos, e os fios não são tirados para melhorar a aparência, como no Transtorno Dismórfico Corporal. No TOC, o comportamento repetitivo serve para neutralizar obsessões, o que não acontece aqui.',
    giveaways: [],
    variants: [
      {
        level: 'easy',
        ages: [12, 16],
        text: `{nome}, {idade} anos, é {levado|levada} pela mãe ao pediatra da UBS por uma falha de contorno irregular no alto da cabeça. Conta, {envergonhado|envergonhada}, que há um ano arranca fios do couro cabeludo enquanto estuda ou vê vídeos: sente uma tensão que só passa quando puxa, e depois vem alívio.

Já tentou parar várias vezes, com luvas e cabelo preso, sem sucesso. Esconde a falha com bonés e deixou a natação. O exame mostra fios quebrados de tamanhos diferentes, sem sinais de fungo ou doença da pele, e {ele|ela} não toma remédios. O gesto não vem de nenhum pensamento que precise afastar, nem do desejo de mudar a aparência.`,
        clues: [
          'Às vezes procura um fio "mais grosso", enrola-o nos dedos e examina a raiz antes de largá-lo no chão.',
          'Começou de forma discreta na mudança de escola e piora nas semanas de prova e nas férias, quando passa mais tempo à toa.',
          'Recusa ir a festas de aniversário, onde podem mexer no seu cabelo, e chora quando a mãe toca no assunto.',
          'Não segue regras nem contagens ao puxar e não tem medos que o gesto precise neutralizar; muitas vezes só percebe depois.',
        ],
        rulesOut: 'O gesto não vem de nenhum pensamento que precise afastar',
      },
      {
        level: 'medium',
        ages: [22, 38],
        text: `{nome}, {idade} anos, analista de sistemas, chega ao ambulatório {encaminhado|encaminhada} pela oftalmologista, que notou cílios ralos e falhados nas duas pálpebras sem nenhuma inflamação. Em casa, a pessoa com quem mora já encontrou fios espalhados pela mesa do computador e no travesseiro.

{nome} admite que, em reuniões longas e diante da tela, leva a mão aos olhos e puxa um cílio atrás do outro, às vezes sem perceber; quando nota, sente um alívio rápido e, logo depois, vergonha. Disfarça com lápis as sobrancelhas, que também rareiam, e já prometeu a si {mesmo|mesma} parar dezenas de vezes. Não há medo ou ideia que o gesto precise afastar.`,
        clues: [
          'Antes de puxar, passa os dedos pela pálpebra procurando um fio "diferente" e o examina depois de arrancá-lo.',
          'Faz isso desde a adolescência, com fases melhores e piores; nunca usou remédios ou drogas que coincidissem com o início ou as pioras.',
          'Evita piscina, praia e chuva para não borrar o disfarce, recusa câmera ligada nas reuniões on-line e esconde o problema até dos amigos.',
          'Não conta, não ordena e não segue regras ao puxar; o gesto não neutraliza medo algum, e muitas vezes só percebe quando os fios já estão na mesa.',
        ],
        rulesOut: 'Não há medo ou ideia que o gesto precise afastar.',
      },
      {
        level: 'hard',
        ages: [7, 10],
        text: `{nome}, {idade} anos, é {levado|levada} ao pediatra pelos pais, que querem exames de vitamina e de "fungo" por causa de falhas no cabelo. A mãe acha que é anemia, porque {ele|ela} anda {pálido|pálida} e come pouca verdura. O hemograma veio normal, e o exame do couro cabeludo mostra só fios partidos em alturas diferentes, sem fungo nem inflamação.

A professora conta que, durante as leituras, {nome} enrola uma mecha nos dedos e puxa até soltar, e os pais encontram fios no travesseiro. Já pediu à mãe para segurar sua mão na hora de dormir, mas volta a puxar. Usa touca até em dias quentes. Não toma remédios. Não há rituais nem medos ligados ao gesto.`,
        clues: [
          'Puxa também os cílios quando se deita e diz que sente uma "coceirinha por dentro" que só passa quando o fio sai.',
          'Começou há cerca de oito meses, devagar, depois da mudança de escola; antes nunca teve falhas no cabelo.',
          'Recusa tirar a touca na educação física e deixou de ir a festas de aniversário depois que um colega apontou as falhas.',
          'Não conta, não arruma objetos e não teme que algo ruim aconteça se parar; puxa mais quando está {entediado|entediada} ou {concentrado|concentrada}.',
        ],
        rulesOut: 'Não há rituais nem medos ligados ao gesto.',
      },
    ],
  },
  {
    disorderId: 'excoriation_disorder',
    reference: {
      label: 'Manual MSD (Profissional) — Transtorno de escoriação (dermatotilexomania)',
      url: 'https://www.msdmanuals.com/pt/profissional/psiquiatria/transtornos-obsessivo-compulsivos-e-transtornos-relacionados/transtorno-de-escoria%C3%A7%C3%A3o-dermatotilexomania',
    },
    differential: {
      disorderId: 'body_dysmorphic_disorder',
      whyNot: 'A pessoa não cutuca para corrigir um defeito de aparência que só ela enxerga; as feridas são consequência do hábito, causam vergonha e são escondidas.',
    },
    explanation: 'Cutucar a pele de forma recorrente, com feridas, cicatrizes e infecções, tentativas repetidas de parar e sofrimento ou prejuízo. O gesto começa com tensão, tédio ou ao sentir uma irregularidade e traz alívio, às vezes de forma automática. Não há doença de pele, uso de estimulantes, crença de infestação ou intenção de se ferir que expliquem as lesões. No Transtorno Dismórfico Corporal, a pessoa mexe na pele para corrigir um defeito de aparência que acredita ter; aqui, a vergonha é das próprias feridas.',
    giveaways: [],
    variants: [
      {
        level: 'easy',
        ages: [18, 26],
        text: `{nome}, {idade} anos, {universitário|universitária}, procura a UBS por feridas no rosto, nos ombros e nos braços. Conta que, desde os 13 anos, cutuca a pele com as unhas e com pinça: começa ao sentir uma casquinha ou um carocinho e só para quando sangra. Na hora sente alívio; depois, vergonha.

Gasta até duas horas por noite nisso, já tentou parar muitas vezes, cobriu os espelhos e usa curativos, sem sucesso. Anda de manga comprida no calor. Não mexe na pele para corrigir defeitos; a vergonha é das feridas que o hábito deixa. O exame não mostra sarna nem outra doença de pele, e não usa remédios estimulantes nem drogas.`,
        clues: [
          'Às vezes cutuca sem perceber, enquanto estuda ou mexe no celular; outras vezes examina a pele de perto procurando o que tirar.',
          'O hábito começou com espinhas na adolescência, continuou depois que a pele melhorou e piora nas semanas de provas.',
          'Faltou a apresentações da faculdade por causa das feridas no rosto e já precisou de antibiótico por infecção num dos braços.',
          'Não acha que o rosto ou o corpo tenham algum defeito a corrigir; quer parar justamente para que a pele possa sarar.',
        ],
        rulesOut: 'Não mexe na pele para corrigir defeitos',
      },
      {
        level: 'medium',
        ages: [32, 48],
        text: `{nome}, {idade} anos, caixa de supermercado, chega ao ambulatório {encaminhado|encaminhada} pelo clínico depois da terceira infecção nos dedos em um ano. A pele em volta das unhas vive em carne viva: {nome} arranca cutículas e "pelinhas" com as unhas e com alicate no ônibus, vendo televisão e até no caixa, entre um cliente e outro.

Diz que começa sem perceber ou quando sente uma aspereza, e não sossega até deixar "liso", mesmo sangrando. Já cortou as unhas rente, usou luvas e curativos e prometeu parar, sem conseguir. Esconde as mãos nas fotos. Não mexe nos dedos para deixá-los bonitos; sabe que o hábito os estraga. Não há coceira, sarna ou outra doença de pele.`,
        clues: [
          'Também cutuca casquinhas no couro cabeludo à noite e sente um alívio rápido, seguido de culpa, quando consegue arrancar uma.',
          'O hábito vem da adolescência, com fases mais leves, e piorou há dois anos, no turno da noite; não usa estimulantes nem drogas.',
          'Foi {transferido|transferida} do caixa para a reposição depois que clientes reclamaram do sangue nos dedos e evita apertos de mão por vergonha.',
          'Não acha as mãos feias nem deformadas; o que quer é que os dedos sarem, e a vergonha vem das feridas.',
        ],
        rulesOut: 'Não mexe nos dedos para deixá-los bonitos',
      },
      {
        level: 'hard',
        ages: [13, 16],
        text: `{nome}, {idade} anos, chega ao CAPSij {encaminhado|encaminhada} pela escola, que viu várias feridas nos antebraços e nos ombros e suspeitou de automutilação. Os pais contam que {ele|ela} anda {fechado|fechada} sobre o assunto e passou a usar moletom no calor.

Na conversa, {nome} mostra que as feridas são pequenas e redondas, em pontos onde havia espinhas, pelinhos encravados ou casquinhas. Cutuca enquanto estuda ou rola o celular, muitas vezes sem notar, e só percebe quando sangra. Nunca quis se machucar e já tentou parar várias vezes. Não se acha {feio|feia} nem tenta consertar a pele: tem vergonha justamente das marcas.`,
        clues: [
          'Quando sente um carocinho ou uma aspereza, não consegue deixar de passar a unha até "tirar tudo", e então sente alívio.',
          'Começou há um ano, com a acne, e seguiu mesmo com a pele melhor; a dermatologista não achou outra doença, e não toma remédios.',
          'Tira boas notas e tem amigos, mas deixou o time de vôlei para não usar uniforme de manga curta e evita a praia com a família.',
          'Não passa tempo se avaliando no espelho nem se compara com os outros; mexe na pele pela sensação, não para mudar a aparência.',
        ],
        rulesOut: 'nem tenta consertar a pele: tem vergonha justamente das marcas',
      },
    ],
  },
  {
    disorderId: 'olfactory_reference_disorder',
    reference: {
      label: 'Manual MSD (Profissional) — Transtorno de referência olfativa',
      url: 'https://www.msdmanuals.com/pt/profissional/psiquiatria/transtornos-obsessivo-compulsivos-e-transtornos-relacionados/transtorno-de-refer%C3%AAncia-olfativa',
    },
    differential: {
      disorderId: 'delusional_disorder',
      whyNot: 'A crença se limita ao próprio cheiro, vem com rituais de checagem e disfarce, e a pessoa admite em parte que pode estar exagerando; não há outras ideias fixas ou absurdas.',
    },
    explanation: 'Preocupação persistente, por horas ao dia, com a ideia de exalar um odor corporal ofensivo que ninguém mais percebe, com comportamentos repetitivos (cheirar-se, banhos, trocas de roupa, perfume, chiclete, pedir confirmação), leitura de gestos alheios como reação ao cheiro, evitação e prejuízo. Exames normais afastam uma causa médica, e não há crises que sugiram epilepsia. O quadro consta na CID-11 e é citado no DSM-5-TR entre os relacionados ao TOC. No Transtorno Delirante, a convicção seria fixa e inabalável; aqui a pessoa admite que pode estar exagerando.',
    giveaways: [],
    variants: [
      {
        level: 'easy',
        ages: [18, 28],
        text: `{nome}, {idade} anos, atendente de telemarketing, procura a UBS dizendo que exala um cheiro forte de suor que incomoda todo mundo. Há dois anos pensa nisso a maior parte do dia, como uma obsessão: toma quatro banhos diários, troca de camiseta no trabalho, gasta um frasco de desodorante por semana e pede à mãe que cheire suas axilas.

Ninguém em casa sente odor algum, e o clínico também não. Mesmo assim, quando colegas abrem a janela ou coçam o nariz, acha na hora que é por sua causa. Deixou de pegar ônibus cheio. Admite que "talvez exagere um pouco". Não tem outras crenças estranhas, e os exames de sangue vieram normais.`,
        clues: [
          'Cheira as próprias roupas várias vezes ao dia e mantém distância das pessoas para que "não sintam".',
          'Começou aos poucos e foi ocupando mais horas do dia; nunca teve desmaios, crises ou cheiros estranhos que surgissem de repente.',
          'Pediu para trabalhar só de casa e recusou o convite para ser {padrinho|madrinha} de casamento da prima.',
          'Quando a mãe insiste que não sente nada, aceita que pode estar {enganado|enganada}, embora a dúvida volte; não tem ideias de perseguição.',
        ],
        rulesOut: 'Admite que "talvez exagere um pouco".',
      },
      {
        level: 'medium',
        ages: [26, 40],
        text: `{nome}, {idade} anos, {vendedor|vendedora} de planos de saúde, chega ao ambulatório {encaminhado|encaminhada} pelo otorrino, a quem pediu a retirada das amígdalas por causa do "hálito podre". Já passou por três dentistas e fez endoscopia; nenhum exame mostrou alteração, e ninguém percebe mau hálito.

Escova os dentes depois de cada conversa, masca chiclete o dia todo e fala virando o rosto ou com a mão na boca. Se um cliente se afasta ou olha o relógio, conclui que foi o cheiro. Pede à pessoa com quem mora que cheire seu hálito várias vezes ao dia. Às vezes reconhece que pode ser "coisa da cabeça", mas a dúvida volta logo.`,
        clues: [
          'Não teme ter uma doença grave: diz que o problema é incomodar os outros, e por isso sopra nas mãos e as cheira antes de cada visita.',
          'A preocupação começou aos 19 anos, depois de uma brincadeira de um colega, e nos últimos dois anos passou a ocupar várias horas do dia.',
          'Perdeu metas de vendas por evitar visitas presenciais e deixou de conversar de perto com a pessoa com quem mora.',
          'Não tem outras ideias estranhas nem se sente {perseguido|perseguida}; aceita repetir os testes de hálito e fica em dúvida quando dão normais.',
        ],
        rulesOut: 'Às vezes reconhece que pode ser "coisa da cabeça"',
      },
      {
        level: 'hard',
        ages: [40, 58],
        text: `{nome}, {idade} anos, motorista de ônibus, chega {encaminhado|encaminhada} pela gastroenterologia, onde se queixava de "gases com cheiro que todos sentem". Colonoscopia, exames de fezes e dieta sem lactose não mostraram nada. Tem um pouco de estufamento após o almoço, mas isso não {o|a} preocupa; o que {o|a} atormenta é a ideia de que o ônibus inteiro sente o cheiro.

O cônjuge conta que {ele|ela} toma três banhos por dia, leva roupa íntima extra na mochila, borrifa perfume no banco e cheira o assento quando desce. Quando um passageiro abre a janela, passa o resto do turno remoendo. Em casa ninguém sente nada. Diz que talvez seja "impressão", mas não consegue parar de conferir.`,
        clues: [
          'Passa boa parte do dia {atento|atenta} a qualquer sinal do cheiro e pergunta ao cônjuge, várias vezes, se "está dando para sentir".',
          'A preocupação surgiu por volta dos 30 anos e foi crescendo; nunca teve crises com cheiros estranhos repentinos, desmaios ou ausências.',
          'Pediu transferência para linhas noturnas, mais vazias, perdeu as horas extras e parou de ir ao culto e aos almoços de família.',
          'Aceita que o cheiro talvez não seja tão forte quanto imagina e não tem outras ideias estranhas, como perseguição ou vozes.',
        ],
        rulesOut: 'Diz que talvez seja "impressão"',
      },
    ],
  },
  {
    disorderId: 'ocd_related_disorder_due_to_medical_condition',
    reference: {
      label: 'Runge et al., Molecular Psychiatry (PMC) — Síndromes obsessivo-compulsivas secundárias: revisão sistemática',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12815680/',
    },
    differential: {
      disorderId: 'ocd',
      whyNot: 'Os sintomas surgiram pela primeira vez logo depois de uma doença documentada que atinge os circuitos cerebrais envolvidos, sem nenhum episódio parecido antes; no TOC primário não existe essa causa orgânica.',
    },
    explanation: 'Obsessões e compulsões que dominam o quadro e surgem pela primeira vez logo após uma doença que atinge os circuitos dos núcleos da base — um AVC no núcleo caudado ou a coreia de Sydenham que sucede a infecção por estreptococo —, sem história anterior, sem confusão mental e com prejuízo. A memória preservada afasta um quadro neurocognitivo, e não há medicamento novo capaz de causar os sintomas. No TOC primário, o início não depende de uma condição médica documentada com relação de tempo tão clara.',
    giveaways: [],
    variants: [
      {
        level: 'easy',
        ages: [58, 72],
        text: `{nome}, {idade} anos, comerciante, volta ao ambulatório de neurologia três meses depois de um AVC isquêmico pequeno no núcleo caudado, visto na ressonância; a fraqueza no braço sumiu em poucos dias. A queixa agora é outra: três semanas após o AVC, surgiram pensamentos repetitivos de que algo ruim aconteceria e uma compulsão por conferir portas, gás e a gaveta do caixa dezenas de vezes.

A família garante que {ele|ela} nunca teve nada parecido antes do AVC; sempre foi {desligado|desligada} com detalhes. Hoje perde mais de duas horas por dia nas conferências e sabe que são exageradas. Está {lúcido|lúcida}, {orientado|orientada}, com testes de memória normais. Os únicos remédios novos são para pressão, colesterol e para afinar o sangue.`,
        clues: [
          'Também passou a alinhar objetos no balcão e recomeça a arrumação se algo sai do lugar, mesmo achando aquilo sem sentido.',
          'Os sintomas começaram de forma bem marcada semanas após o AVC e se mantêm desde então; o humor e o sono seguem bons.',
          'Fecha a loja mais tarde por causa das conferências, perdeu clientes e voltou tantas vezes para checar o portão que a família passou a acompanhá-l{o|a}.',
          'Cônjuge e irmãos confirmam que, antes do AVC, nunca houve rituais, conferências repetidas ou medos desse tipo.',
        ],
        rulesOut: 'nunca teve nada parecido antes do AVC',
      },
      {
        level: 'medium',
        ages: [7, 12],
        text: `{nome}, {idade} anos, é {levado|levada} pela mãe ao pediatra da UBS porque "mudou de um mês para cá". Passou a lavar as mãos até ficarem vermelhas, a tocar o batente da porta um número certo de vezes e a refazer a lição quando a letra "não fica certa", chorando se é {interrompido|interrompida}.

Ao mesmo tempo, ficou {desastrado|desastrada}: derruba o copo, faz caretas que não controla e tem movimentos soltos e irregulares nos braços, que somem quando dorme. Seis semanas antes de tudo, teve dor de garganta forte, tratada só com chá. O pediatra ouviu um sopro novo no coração, e o exame de sangue mostrou anticorpos contra estreptococo elevados. Antes disso, nunca teve rituais.`,
        clues: [
          'Os movimentos mudam de lugar e de forma o tempo todo, não vêm precedidos de vontade e não podem ser segurados nem por um instante.',
          'O ecocardiograma confirmou inflamação numa válvula do coração; rituais e movimentos surgiram juntos, em poucos dias, e oscilam no mesmo ritmo.',
          'Não consegue mais escrever no caderno nem se vestir {sozinho|sozinha} e falta à escola porque se atrasa lavando as mãos.',
          'Até a infecção, nunca teve medo de sujeira nem necessidade de repetir gestos; tudo começou junto com os sinais no coração e nos movimentos.',
        ],
        rulesOut: 'Antes disso, nunca teve rituais.',
      },
      {
        level: 'hard',
        ages: [68, 80],
        text: `{nome}, {idade} anos, {aposentado|aposentada}, chega ao ambulatório de memória com o filho, que teme "o começo de uma esclerose": há dois meses {ele|ela} volta da padaria para ver se trancou a porta, relê os boletos várias vezes e pede que confirmem se desligou o ferro, mesmo tendo conferido.

Os testes de memória e de atenção vêm normais, e {nome} relata tudo com detalhes, {irritado|irritada} com a própria insistência: "eu sei que fechei, mas preciso ver". No prontuário consta uma internação curta há três meses por fraqueza na mão, com um pequeno AVC nos núcleos da base na tomografia. Antes disso, nunca tinha feito nada parecido.`,
        clues: [
          'Conta portas e janelas em voz baixa antes de dormir e recomeça se é {interrompido|interrompida}; diz que, se não fizer, "algo ruim acontece".',
          'A fraqueza na mão passou em dias; as conferências começaram cerca de um mês depois da internação, e o humor segue bom.',
          'Deixou de ir {sozinho|sozinha} ao banco e à igreja porque não consegue sair de casa sem voltar várias vezes, e chega {atrasado|atrasada} a tudo.',
          'Irmãs e filhos confirmam que, ao longo de toda a vida, nunca houve rituais ou conferências; os únicos remédios novos são para pressão e para afinar o sangue.',
        ],
        rulesOut: 'Antes disso, nunca tinha feito nada parecido.',
      },
    ],
  },
  {
    disorderId: 'substance_medication_induced_ocd_related_disorder',
    reference: {
      label: 'Manual MSD (Profissional) — Transtornos psiquiátricos relacionados a substâncias',
      url: 'https://www.msdmanuals.com/pt/profissional/psiquiatria/transtornos-relacionados-ao-uso-de-subst%C3%A2ncias/transtornos-psiqui%C3%A1tricos-relacionados-a-subst%C3%A2ncias',
    },
    differential: {
      disorderId: 'stimulant_use_disorder',
      whyNot: 'O estimulante foi usado em dose fixa, por pouco tempo, sem perda de controle, desejo intenso ou abandono de atividades, e foi interrompido sem dificuldade; o problema são os sintomas que ele provocou.',
    },
    explanation: 'Rituais de conferência, arrancar fios ou cutucar a pele surgem semanas após o início de um estimulante capaz de provocá-los (metilfenidato e lisdexanfetamina têm esse risco reconhecido em alerta da Anvisa), sem história anterior, diminuem nos dias sem o remédio e desaparecem em poucas semanas após a suspensão. O uso foi em dose fixa, sem perda de controle, fissura ou prejuízos ligados ao consumo, o que afasta o Transtorno por Uso de Estimulantes. A remissão sem o remédio afasta TOC, Tricotilomania e Transtorno de Escoriação primários.',
    giveaways: ['metilfenidato', 'ritalina', 'lisdexanfetamina', 'venvanse', 'anfetamina', 'estimulante', 'cocaina'],
    variants: [
      {
        level: 'easy',
        ages: [22, 32],
        text: `{nome}, {idade} anos, estuda para um concurso e procura a UBS {assustado|assustada} com o que chama de "obsessão de conferir". Há dois meses começou a tomar, sem receita, o metilfenidato de um primo para render mais nos estudos: um comprimido de manhã, de segunda a sexta. Cerca de duas semanas depois, surgiram dúvidas insistentes e rituais.

Relê cada parágrafo até "sentir que entendeu", confere tomadas e portas dez vezes e organiza as canetas por cor, perdendo três horas por dia. Nunca teve nada parecido. Nos fins de semana, sem o comprimido, os rituais quase somem. Nunca aumentou a dose, não sente vontade de tomar mais e não usa outras drogas.`,
        clues: [
          'Quando tenta parar no meio de uma releitura, vem a ideia de que "vai esquecer tudo", e só se acalma ao recomeçar.',
          'Por orientação do médico, suspendeu o comprimido; em duas semanas os rituais desapareceram e não voltaram.',
          'Nunca teve dificuldade de atenção; no período dos rituais, deixou de cumprir o cronograma de estudos e faltou a dois simulados.',
          'Parou sem dificuldade, não teve desejo intenso de voltar a tomar e nunca deixou compromissos de lado para conseguir o remédio.',
        ],
        rulesOut: 'Nunca aumentou a dose, não sente vontade de tomar mais',
      },
      {
        level: 'medium',
        ages: [28, 42],
        text: `{nome}, {idade} anos, {técnico|técnica} de enfermagem, chega ao ambulatório com falhas nas sobrancelhas e no alto da cabeça. A pessoa com quem mora conta que, ao chegar dos plantões, {ele|ela} passa horas diante da TV puxando fio por fio, e nas folgas quase não puxa. {nome} diz que sente uma tensão que alivia ao puxar e já tentou parar, sem conseguir.

Isso nunca tinha acontecido. Começou em março, três semanas depois que passou a tomar, nos dias de plantão dobrado, cápsulas que uma colega, tratada para déficit de atenção, dá "para aguentar a madrugada". Toma uma por plantão, sem aumentar, e não sente falta nas folgas. O couro cabeludo não mostra fungo nem outra doença.`,
        clues: [
          'Antes de puxar, sente uma espécie de coceira na raiz; depois examina o fio e às vezes o enrola nos dedos.',
          'Ao deixar as cápsulas, por orientação do ambulatório, o puxar diminuiu em poucos dias e sumiu em três semanas.',
          'Passou a trabalhar de touca o tempo todo, faltou ao casamento de uma amiga e se afastou das colegas por vergonha das falhas.',
          'Nunca buscou as cápsulas por conta própria, não pensa nelas nas folgas e parou no mesmo dia em que foi {orientado|orientada}, sem mal-estar.',
        ],
        rulesOut: 'Toma uma por plantão, sem aumentar, e não sente falta nas folgas.',
      },
      {
        level: 'hard',
        ages: [16, 18],
        text: `{nome}, {idade} anos, é {levado|levada} pela mãe à dermatologista por "espinhas que não saram". O exame mostra feridas abertas e crostas na testa e no queixo, sem acne ativa que as explique. {nome} acaba contando que passa horas, à noite, espremendo e raspando a pele diante do espelho do banheiro e que não consegue parar mesmo quando sangra.

Isso começou em agosto, na reta final para o vestibular, poucas semanas depois de passar a tomar escondido, nos dias de estudo puxado, os comprimidos que o irmão usa, com receita, para se concentrar. Nunca tinha mexido assim na pele. Toma um por vez, sem aumentar, e não pensa neles nos outros dias.`,
        clues: [
          'Começa quando sente uma aspereza ou casquinha, sente alívio ao arrancá-la e depois vergonha; não acha o rosto feio nem procura defeitos.',
          'Num feriado prolongado, sem os comprimidos, quase não mexeu na pele; quando voltou a tomá-los, as feridas reapareceram.',
          'Usa franja e máscara para esconder a testa, faltou ao aniversário de um amigo e dorme mal por causa das noites diante do espelho.',
          'Sempre se concentrou bem; nunca tomou mais de um comprimido por dia, não sente desejo de usar e parou sem dificuldade quando a mãe soube.',
        ],
        rulesOut: 'Toma um por vez, sem aumentar, e não pensa neles nos outros dias.',
      },
    ],
  },
]
