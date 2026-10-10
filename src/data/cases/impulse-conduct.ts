import type { DisorderCaseSet } from './types'

const statPearlsImpulseControl = {
  label: 'StatPearls (NCBI Bookshelf) — Impulse Control Disorders',
  url: 'https://www.ncbi.nlm.nih.gov/sites/books/NBK562279/',
}

export const impulseConductCases: DisorderCaseSet[] = [
  {
    disorderId: 'intermittent_explosive_disorder',
    reference: statPearlsImpulseControl,
    differential: {
      disorderId: 'bpd',
      whyNot: 'A raiva vem em crises curtas e isoladas; entre elas o humor é estável, as relações são duradouras e não há medo de abandono, sensação de vazio ou autolesão.',
    },
    explanation: 'Crises recorrentes de agressividade impulsiva, desproporcionais ao motivo, sem planejamento e sem objetivo a conquistar: agressões verbais frequentes e pelo menos três episódios com objetos quebrados em 12 meses, seguidos de vergonha, com prejuízo no trabalho, nas relações ou na justiça. O padrão começa na adolescência e não se explica por álcool, drogas, pancada na cabeça ou fases de humor; o início depois dos 10 anos, em adultos, afasta o Transtorno Disruptivo da Desregulação do Humor. Entre as crises o humor é estável e as relações são duradouras, sem medo de abandono, vazio ou autolesão, o que afasta o Transtorno de Personalidade Borderline; o remorso e a ausência de ganho afastam o padrão antissocial.',
    giveaways: ['explos', 'explod', 'intermitent'],
    variants: [
      {
        level: 'easy',
        ages: [24, 40],
        text: `{nome}, {idade} anos, motorista de ônibus, procura o ambulatório depois de levar uma advertência: gritou com um passageiro que demorou a passar o cartão e chutou a porta do veículo até amassá-la. Diz que tem explosões de raiva por motivos pequenos desde a adolescência, que duram poucos minutos e passam tão rápido quanto começam.

Há mais de seis meses xinga alguém no trânsito ou em casa cerca de duas vezes por semana, e no último ano também quebrou o celular e abriu um buraco na porta do quarto com um soco. Depois de cada crise sente vergonha, pede desculpas e paga o prejuízo. Fora delas é uma pessoa tranquila, com casamento e amizades estáveis. Não bebe, não usa drogas, nunca bateu a cabeça e nunca teve fases de energia elevada.`,
        clues: [
          'As crises vêm sem aviso, quase sempre com pessoas próximas ou colegas, não servem para conseguir nada e terminam em menos de meia hora.',
          'Começaram por volta dos 15 anos, na escola, e se repetem desde então, com fases melhores e piores.',
          'Já perdeu um emprego por discutir com o chefe, e o cônjuge ameaça ir embora se nada mudar.',
          'Fora das crises o humor é estável; não tem medo de ser {abandonado|abandonada}, não se sente {vazio|vazia} e nunca se feriu de propósito.',
        ],
        rulesOut: 'Fora delas é uma pessoa tranquila, com casamento e amizades estáveis.',
      },
      {
        level: 'medium',
        ages: [19, 28],
        text: `{nome}, {idade} anos, estudante de engenharia, é {encaminhado|encaminhada} à clínica-escola pela coordenação do curso depois de jogar no chão a vidraria da bancada do laboratório porque um colega mexeu no seu projeto. A família conta que, no último ano, {ele|ela} também rachou a TV ao arremessar o controle num pênalti perdido e quebrou dois celulares contra a parede.

Desde os 13 anos é assim: algo pequeno dá errado, {ele|ela} grita, xinga e atira o que estiver à mão, e em dez minutos está {calmo|calma} de novo. Depois fica {envergonhado|envergonhada}, pede desculpas e paga o estrago. Namora há três anos, tem os mesmos amigos desde a escola e nunca se machucou de propósito. Não usa álcool nem drogas e nunca passou por fases de pouco sono e energia de sobra.`,
        clues: [
          'Diz que não planeja nada: "quando vejo, já foi". Não ganha nada com as brigas e, depois, acha o motivo bobo.',
          'Nunca passou mais de alguns meses sem um episódio, e eles ficaram mais frequentes depois que entrou na faculdade.',
          'Corre o risco de perder o estágio, e os colegas passaram a evitar fazer trabalhos em grupo com {ele|ela}.',
          'Entre os episódios o humor é estável; não teme ser {abandonado|abandonada}, não se sente {vazio|vazia} e sempre teve boas notas e atenção nas aulas.',
        ],
        rulesOut: 'Namora há três anos, tem os mesmos amigos desde a escola e nunca se machucou de propósito.',
      },
      {
        level: 'hard',
        ages: [46, 58],
        text: `{nome}, {idade} anos, gerente de uma loja de materiais de construção, chega ao pronto-socorro com a mão direita inchada; a radiografia mostra um dedo fraturado. Primeiro diz que prendeu a mão numa porta; depois admite que socou o balcão porque um cliente reclamou do troco. A loja está cortando funcionários, e {ele|ela} atribui tudo à pressão.

O cônjuge, que {o|a} acompanha, conta outra história: desde a juventude, coisas pequenas, como uma fila, uma piada ou uma fechada no trânsito, viram gritos, e neste ano já houve três episódios com objetos quebrados. Minutos depois {ele|ela} se acalma, pede perdão e conserta o que quebrou. Bebe uma cerveja no domingo, mas os episódios acontecem sem bebida. O casal está junto há 25 anos, e as amizades são antigas.`,
        clues: [
          'Não escolhe hora nem alvo: a raiva sobe em segundos por motivos banais, não serve para obter nada e some em minutos.',
          'O padrão começou por volta dos 16 anos, décadas antes do emprego atual, e nunca passou mais de alguns meses sem um episódio.',
          'Já respondeu a um processo por quebrar o retrovisor de um vizinho e evita festas de família com medo de estragar o encontro.',
          'Nunca sofreu pancada forte na cabeça nem teve fases de energia elevada; fora dos episódios, não há medo de abandono, sensação de vazio ou ideias de morte.',
        ],
        rulesOut: 'O casal está junto há 25 anos, e as amizades são antigas.',
      },
    ],
  },
  {
    disorderId: 'kleptomania',
    reference: statPearlsImpulseControl,
    differential: {
      disorderId: 'antisocial_personality_disorder',
      whyNot: 'Os objetos não são usados, vendidos nem desejados pelo valor, há culpa depois de cada episódio e não existe um padrão amplo de desrespeito a regras e aos outros desde a adolescência.',
    },
    explanation: 'Falha recorrente em resistir ao impulso de pegar objetos baratos e desnecessários, que não são usados, vendidos nem desejados pelo valor, com tensão crescente antes e alívio ou prazer no momento do ato, seguidos de vergonha. Os episódios não expressam raiva ou vingança e não decorrem de vozes, crenças estranhas ou fases de euforia. Sem ganho, com remorso e sem outros atos ilegais ao longo da vida, não há o padrão do Transtorno de Personalidade Antissocial. No caso mais velho, o início na juventude, a avaliação cognitiva normal e o descarte sem sofrimento afastam um quadro neurocognitivo e a acumulação.',
    giveaways: [],
    variants: [
      {
        level: 'easy',
        ages: [26, 42],
        text: `{nome}, {idade} anos, {farmacêutico|farmacêutica}, procura o ambulatório depois de ser {flagrado|flagrada} saindo de uma loja de departamentos com dois chaveiros no bolso, sem pagar. Conta que há anos sente um impulso forte de pegar objetos baratos de que não precisa, como canetas, pilhas e presilhas. Tinha dinheiro de sobra na carteira.

Antes de pegar, a tensão vai crescendo até ficar insuportável; no instante em que guarda o objeto, sente alívio e uma espécie de prazer. Depois vem a culpa: esconde tudo numa caixa no armário ou devolve às escondidas. Age sempre {sozinho|sozinha}, sem planejar, e não sente raiva das lojas. Fora isso, nunca teve problemas com a lei e paga as contas em dia.`,
        clues: [
          'Muitas vezes nem olha o objeto depois; diz que o que importa é o momento de pegar, não a coisa em si.',
          'Começou aos 17 anos, com uma borracha numa papelaria; passa meses sem episódios e depois tem semanas com vários.',
          'Evita ir sozinh{o|a} a shoppings, teme perder o registro profissional e esconde tudo do cônjuge por vergonha.',
          'Não vende nem usa o que pega, nunca mentiu para tirar vantagem de alguém, não ouve vozes e nunca teve fases de euforia ou de pouco sono.',
        ],
        rulesOut: 'Fora isso, nunca teve problemas com a lei e paga as contas em dia.',
      },
      {
        level: 'medium',
        ages: [38, 52],
        text: `{nome}, {idade} anos, {enfermeiro|enfermeira} há quinze anos num hospital público, vem à consulta por insistência do advogado. O segurança de um supermercado {o|a} parou com um ímã de geladeira e duas pilhas no bolso do casaco; no carrinho havia R$ 300 em compras já pagas no caixa, e o cartão tinha limite de sobra.

Em casa, o cônjuge achou uma gaveta com fones, carregadores e chaveiros ainda na embalagem, nada usado. {nome} diz que, no corredor da loja, sente um aperto crescente que só passa quando o objeto some no bolso, com um alívio quase gostoso; depois vem a vergonha. Isso acontece desde a faculdade, sempre sem planejar. Nunca teve outro problema com a polícia e sempre honrou as dívidas.`,
        clues: [
          'Às vezes devolve o objeto escondido na prateleira dias depois ou o deixa na caixa de doações da igreja.',
          'Os episódios começaram aos 19 anos e vêm em ondas: meses sem nada, depois várias vezes no mesmo mês.',
          'Passou a fazer compras só pela internet, responde a processo e teme perder o emprego se o caso chegar ao conselho profissional.',
          'Sente culpa a cada episódio, nunca enganou ninguém para tirar vantagem, não age por raiva nem ouve vozes e nunca teve fases de euforia ou de pouco sono.',
        ],
        rulesOut: 'Nunca teve outro problema com a polícia e sempre honrou as dívidas.',
      },
      {
        level: 'hard',
        ages: [60, 68],
        text: `{nome}, {idade} anos, {contador|contadora} {aposentado|aposentada}, é {levado|levada} ao ambulatório pela filha, que encontrou o quarto de hóspedes tomado por sacolas com meias, pilhas, potes e carregadores, quase tudo novo, alguns com o lacre antifurto da loja. A filha suspeitava de compras descontroladas, mas o extrato do cartão está normal, e {nome} deixou que ela doasse tudo sem protestar.

{Constrangido|Constrangida}, admite que pega essas coisas em lojas desde os 20 e poucos anos e nunca as usa. A vontade cresce até virar um aperto no peito; ao sair com o objeto, sente um alívio rápido, logo seguido de vergonha. Tem renda folgada, nunca respondeu a processo e sempre foi {conhecido|conhecida} pela honestidade. A avaliação cognitiva veio normal.`,
        clues: [
          'Pega sempre itens baratos, sem planejar e sem companhia, e diz que não quer o objeto: quer o momento de pegar.',
          'Os episódios começaram na juventude, com longas pausas, e ficaram mais frequentes depois da aposentadoria, quando passou a circular mais pelo comércio.',
          'Já foi {barrado|barrada} em duas lojas, deixou de sair com os netos e vive com medo de ser {denunciado|denunciada}.',
          'Sente culpa a cada episódio, e a filha não notou nenhuma mudança no jeito {dele|dela}; não age por raiva, não ouve vozes e nunca teve fases de euforia.',
        ],
        rulesOut: 'Tem renda folgada, nunca respondeu a processo',
      },
    ],
  },
  {
    disorderId: 'pyromania',
    reference: statPearlsImpulseControl,
    differential: {
      disorderId: 'conduct_disorder',
      whyNot: 'Atear fogo é a única transgressão, movida por tensão e fascínio; não há agressões, furtos, fugas, mentiras ou outras violações de regras, nem na infância nem depois.',
    },
    explanation: 'Fogo ateado de propósito em mais de uma ocasião, com tensão crescente antes, alívio ou prazer ao ver as chamas e a chegada dos bombeiros, e fascínio duradouro pelo fogo e por tudo que o cerca. Não há ganho financeiro, vingança, ideologia, ocultação de crime, crenças estranhas, intoxicação ou limitação intelectual que expliquem os atos, nem fases de energia elevada. Como o fogo é a única transgressão, sem agressões, furtos, fugas ou faltas à escola na infância e na adolescência, o Transtorno de Conduta e o padrão antissocial não explicam o quadro.',
    giveaways: ['incendiári'],
    variants: [
      {
        level: 'easy',
        ages: [19, 26],
        text: `{nome}, {idade} anos, {repositor|repositora} de supermercado, é {encaminhado|encaminhada} ao CAPS depois de ser {flagrado|flagrada} ateando fogo a um contêiner de lixo, o quinto incêndio que provoca no bairro desde o ano passado, sempre em lixeiras e terrenos baldios. Conta que é {fascinado|fascinada} por fogo desde criança: coleciona isqueiros, assiste a vídeos de incêndios e acompanha as ocorrências dos bombeiros.

Antes de cada incêndio, sente uma tensão que só cresce; ao ver as chamas e a chegada dos caminhões, vem um alívio prazeroso. Não ganha nada com isso, não tem raiva de ninguém e não quer esconder nada. Faz tudo {sóbrio|sóbria}. Na escola e na adolescência, nunca brigou, furtou, fugiu de casa ou matou aula, e nunca teve fases de energia elevada.`,
        clues: [
          'Costuma ficar no meio dos curiosos vendo o trabalho dos bombeiros e já pensou em se inscrever como brigadista {voluntário|voluntária}.',
          'O primeiro fogo foi aos 17 anos, num terreno vazio; desde então os episódios vêm em ondas, com meses de intervalo.',
          'Responde a inquérito policial, foi {afastado|afastada} do trabalho e os vizinhos passaram a desconfiar {dele|dela} a cada incêndio.',
          'Terminou o ensino médio sem dificuldade, não ouve vozes nem age por ideias estranhas; além do fogo, nunca agrediu, furtou ou enganou ninguém.',
        ],
        rulesOut: 'Na escola e na adolescência, nunca brigou, furtou, fugiu de casa ou matou aula',
      },
      {
        level: 'medium',
        ages: [25, 38],
        text: `{nome}, {idade} anos, {técnico|técnica} em informática, é {trazido|trazida} pela família ao ambulatório depois de uma visita da polícia. Em dois anos, o mato de quatro terrenos da rua pegou fogo, e {ele|ela} era sempre {o primeiro|a primeira} a chamar os bombeiros e a ficar até o fim, filmando tudo.

Acaba admitindo que acendeu os focos. Diz que, dias antes, fica {inquieto|inquieta}, passa de carro pelos terrenos e não pensa em outra coisa; quando o fogo pega, sente "como se tirasse um peso". Guarda dezenas de vídeos de incêndios e se inscreveu num curso de brigadista. Os terrenos não são seus nem de desafetos, e nunca teve outra encrenca com a lei nem problemas de comportamento na escola.`,
        clues: [
          'Sabe de cor o tempo de resposta do quartel do bairro e passa horas ouvindo a frequência de rádio dos bombeiros.',
          'O interesse por fogo vem desde a adolescência; os focos começaram há dois anos e se repetem a cada poucos meses, sempre do mesmo jeito.',
          'Perdeu o emprego após faltar para acompanhar ocorrências, e os vizinhos fizeram um abaixo-assinado pedindo que a família se mude.',
          'Age {sóbrio|sóbria}, não ouve vozes, nunca teve fases de energia elevada, não ganha nada com o fogo e nunca agrediu, furtou ou enganou alguém.',
        ],
        rulesOut: 'nunca teve outra encrenca com a lei nem problemas de comportamento na escola',
      },
      {
        level: 'hard',
        ages: [38, 52],
        text: `{nome}, {idade} anos, {professor|professora} de matemática, vai à UBS trocar o curativo de uma queimadura no antebraço, que atribui a um "acidente com álcool na churrasqueira". A enfermeira repara em marcas antigas de queimadura nas mãos e lembra que é a terceira queimadura atendida em um ano. {nome} comenta que anda {estressado|estressada} com a separação.

Na consulta seguinte, admite que se queimou em fogos que acendeu em terrenos baldios, sempre {sozinho|sozinha} e à noite. Descreve uma agonia que cresce por dias e some quando as chamas sobem; depois fica olhando até os bombeiros chegarem. Os terrenos não são de desafetos, não ganha nada com isso, age sem beber e nunca teve problemas de comportamento na escola nem com a polícia.`,
        clues: [
          'Desde jovem coleciona recortes e vídeos de grandes incêndios e conhece pelo nome os caminhões do quartel da cidade.',
          'Os fogos começaram uns cinco anos antes da separação e voltam em ondas, com meses de calmaria entre um e outro.',
          'Teme perder o cargo na escola se alguém descobrir, esconde as queimaduras com mangas compridas e deixou de sair com amigos à noite.',
          'Não ouve vozes, não tem crenças estranhas sobre o fogo, nunca teve fases de energia elevada e, fora isso, nunca agrediu, furtou ou enganou ninguém.',
        ],
        rulesOut: 'nunca teve problemas de comportamento na escola nem com a polícia',
      },
    ],
  },
  {
    disorderId: 'conduct_disorder',
    reference: {
      label: 'Manual MSD (Profissional) — Distúrbios de conduta',
      url: 'https://www.msdmanuals.com/pt/profissional/pediatria/transtornos-mentais-em-crian%C3%A7as-e-adolescentes/dist%C3%BArbios-de-conduta',
    },
    differential: {
      disorderId: 'oppositional_defiant_disorder',
      whyNot: 'Há ameaças, agressões, crueldade, furtos, arrombamentos e fugas, que vão muito além da teimosia; e não aparecem a irritação frequente nem as discussões com adultos.',
    },
    explanation: 'Padrão repetitivo de violação dos direitos dos outros e de regras importantes para a idade, com três ou mais comportamentos nos últimos 12 meses e ao menos um nos últimos 6: intimidação, brigas com objetos capazes de ferir, crueldade com animais, roubo com ameaça, arrombamentos, furtos, mentiras para obter vantagens, fugas e faltas à escola, com prejuízo escolar, familiar e legal. O início pode ser na infância, antes dos 10 anos, ou na adolescência, e a falta de culpa sugere emoções pró-sociais limitadas. Não há raiva frequente nem discussões com adultos, o que afasta o Transtorno Opositivo Desafiador; atenção preservada, humor estável e ausência de drogas afastam TDAH, quadros de humor e uso de substâncias.',
    giveaways: ['conduta', 'delinqu'],
    variants: [
      {
        level: 'easy',
        ages: [14, 16],
        text: `{nome}, {idade} anos, chega ao CAPSi com a mãe, {encaminhado|encaminhada} pelo conselho tutelar. No último ano, ameaçou alunos menores na saída da escola para tomar celulares e dinheiro, provocou várias brigas (numa delas usou um pedaço de pau, e o colega precisou levar pontos) e foi {pego|pega} arrombando carros no estacionamento do mercado.

Também quebra o patrimônio da escola, mente para conseguir o que quer e já fugiu de casa e dormiu fora três vezes. Os problemas começaram aos 12 anos. Não demonstra culpa: "quem vacila perde". Não é de discutir nem de perder a paciência; age com calma e planeja. Acompanha as aulas sem dificuldade quando vai, e não bebe nem usa drogas, segundo a família e a escola.`,
        clues: [
          'Intimida os mais novos da rua e, quando confrontad{o|a} com o estrago, diz que a culpa é de quem "deu mole".',
          'Os primeiros episódios, aos 12 anos, foram furtos na escola; desde o ano passado as agressões e as fugas ficaram mais frequentes.',
          'Foi {transferido|transferida} de escola duas vezes, está dois anos {atrasado|atrasada} e cumpre medida socioeducativa de liberdade assistida.',
          'Não tem acessos de raiva nem vive discutindo com adultos; na infância, as professoras nunca se queixaram de agitação, desatenção ou tristeza.',
        ],
        rulesOut: 'Não é de discutir nem de perder a paciência; age com calma e planeja.',
      },
      {
        level: 'medium',
        ages: [12, 14],
        text: `{nome}, {idade} anos, é {levado|levada} à UBS pela avó, com quem mora, depois que a escola avisou que {ele|ela} faltou 40 dias neste semestre: sai de casa de uniforme e passa as manhãs na rodoviária. A avó descobriu ainda que {nome} usou o cartão dela para comprar roupas e um celular e falsificou sua assinatura nos bilhetes da escola.

Há mais de um ano some à noite sem permissão, e por duas vezes dormiu fora sem dizer onde. No mês passado, foi {flagrado|flagrada} saindo de uma loja com fones de ouvido escondidos na mochila. Em casa, não discute nem grita: concorda com tudo e depois faz o que quer. Come e dorme bem e não usa drogas.`,
        clues: [
          'Mente com naturalidade para conseguir dinheiro ou escapar de tarefas e muda a história quando é {desmentido|desmentida}.',
          'As saídas noturnas começaram aos 11 anos, e as faltas e os furtos vieram depois; antes disso, não havia queixas da escola.',
          'Vai repetir o ano, perdeu a vaga no projeto de vôlei e a avó já foi chamada duas vezes ao conselho tutelar.',
          'Não é {irritadiço|irritadiça} nem respond{ão|ona}; as professoras nunca notaram distração ou agitação, e não há tristeza persistente nem fases de euforia.',
        ],
        rulesOut: 'não discute nem grita: concorda com tudo e depois faz o que quer',
      },
      {
        level: 'hard',
        ages: [10, 11],
        text: `{nome}, {idade} anos, chega ao pronto-socorro com uma mordida de cachorro na mão. O pai diz que o cão do vizinho "atacou do nada", mas a vizinha conta à equipe que viu {o menino|a menina} maltratar o animal com um pedaço de pau, por vários dias, através do portão. A pediatra aciona o serviço social e liga para a escola.

Segundo a coordenadora, neste ano {ele|ela} tomou o lanche dos menores sob ameaça, empurrou um colega na escada e rasgou os cadernos de quem {o|a} denunciou. Em casa, pegou R$ 200 da carteira da tia. Não chora nem pede desculpas quando é {descoberto|descoberta}. Não tem acessos de raiva nem discute com os adultos: nega com calma e muda de assunto.`,
        clues: [
          'Mostra pouca emoção quando alguém se machuca e só se preocupa com o castigo; com adultos, é {simpático|simpática} e convincente.',
          'As primeiras queixas, de ameaças a colegas, são do 3º ano, aos 8 anos; desde então aumentam a cada ano letivo.',
          'Foi {transferido|transferida} de escola no ano passado, não é {convidado|convidada} para aniversários e pais de colegas pediram sua saída da turma.',
          'Não é {irritadiço|irritadiça} nem bate boca com adultos; o serviço social não encontrou maus-tratos, e nunca houve queixa de desatenção, agitação ou tristeza.',
        ],
        rulesOut: 'Não tem acessos de raiva nem discute com os adultos',
      },
    ],
  },
  {
    disorderId: 'oppositional_defiant_disorder',
    reference: {
      label: 'Manual MSD (Profissional) — Transtorno opositivo desafiador (TDO)',
      url: 'https://www.msdmanuals.com/pt/profissional/pediatria/transtornos-mentais-em-crian%C3%A7as-e-adolescentes/transtorno-desafiador-opositivo-tdo',
    },
    differential: {
      disorderId: 'disruptive_mood_dysregulation_disorder',
      whyNot: 'As irritações são breves e ligadas a ordens e contrariedades; não há explosões graves várias vezes por semana nem mau humor persistente entre elas.',
    },
    explanation: 'Há mais de seis meses, toda semana, com pais, professores e colegas, e não só com irmãos: perde a paciência, irrita-se com facilidade, guarda rancor, discute, recusa regras, provoca de propósito, culpa os outros e se vinga, com prejuízo em casa e na escola. As irritações são curtas e o humor entre os conflitos é bom, o que afasta o Transtorno Disruptivo da Desregulação do Humor. Não há agressões, furtos, destruição ou fugas (Transtorno de Conduta), a atenção é preservada (TDAH) e não há fases de tristeza ou de euforia.',
    giveaways: ['desafi', 'opositor', 'opositiv', 'oposição'],
    variants: [
      {
        level: 'easy',
        ages: [7, 9],
        text: `{nome}, {idade} anos, é {levado|levada} pela mãe à UBS por indicação da escola. Há cerca de um ano, perde a paciência com frequência quando ouve um "não", discute e desafia a professora e os pais, se recusa a seguir regras simples e irrita os colegas de propósito. Quando leva bronca, sempre culpa outra pessoa.

Duas vezes neste semestre se vingou de colegas que contaram suas travessuras, escondendo o material deles. Mas nunca bateu em ninguém, não quebra objetos, não pega o que não é seu e não foge de casa. As birras são curtas: logo depois volta a brincar. Presta atenção nas aulas e lê bem para a idade.`,
        clues: [
          'Fica {melindrado|melindrada} com qualquer brincadeira e passa dias de cara amarrada com quem {o|a} contrariou.',
          'A teimosia começou por volta dos 6 anos, piorou no último ano e aparece toda semana, em casa e na escola.',
          'Foi {retirado|retirada} do passeio da turma, perdeu amigos e a família evita visitas porque cada pedido vira briga.',
          'Não tem crises intensas várias vezes por semana; entre um conflito e outro o humor é bom, e na casa da avó passa dias tranquilos.',
        ],
        rulesOut: 'As birras são curtas: logo depois volta a brincar.',
      },
      {
        level: 'medium',
        ages: [9, 12],
        text: `{nome}, {idade} anos, chega ao ambulatório com os pais e uma pasta de bilhetes da escola: "recusa-se a fazer as atividades", "responde à professora na frente da turma", "apagou de propósito o desenho do colega no quadro". Em casa, cada pedido, seja tomar banho, desligar o celular ou pôr a mesa, vira discussão, e a culpa é sempre de outra pessoa.

Há mais de um ano é assim, toda semana: quando é {contrariado|contrariada}, bate a porta e resmunga, mas não agride ninguém nem quebra nada, e entre uma discussão e outra o humor é bom. Quando se sente {injustiçado|injustiçada}, dá o troco: já escondeu o apagador da professora e trocou a senha do wi-fi para castigar o irmão. Dorme e come bem e aprende rápido.`,
        clues: [
          'Irrita-se com facilidade com brincadeiras dos colegas e costuma provocar o irmão e os primos só para vê-los bravos.',
          'Os pais lembram de teimosia desde os 5 anos, mas a piora veio há um ano e meio, sem nenhuma mudança na família.',
          'Levou duas advertências por desrespeito, perdeu o passeio da escola e os pais deixaram de visitar parentes para evitar brigas.',
          'Não tem crises de fúria nem mau humor o dia todo; nunca furtou, fugiu ou machucou alguém, presta atenção nas aulas e nunca teve semanas de tristeza.',
        ],
        rulesOut: 'entre uma discussão e outra o humor é bom',
      },
      {
        level: 'hard',
        ages: [13, 15],
        text: `{nome}, {idade} anos, chega ao ambulatório com um pedido da escola para "avaliar a atenção", porque as notas despencaram. Os testes mostram atenção e memória normais. Na conversa, {nome} explica que "não faz tarefa de professor chato" e que, nas aulas de história, de que gosta, entrega tudo em dia.

Os pais contam que, desde os 10 anos, cada regra vira queda de braço: {ele|ela} discute, fica dias sem falar com quem {o|a} contraria, provoca a irmã de propósito e culpa os outros pelas próprias falhas. Neste semestre, por duas vezes, espalhou boatos sobre colegas que {o|a} entregaram à coordenação. Nunca brigou fisicamente, furtou ou matou aula, e com os amigos do skate o humor é ótimo.`,
        clues: [
          'Perde a paciência quando ouve um "não", mas a irritação dura minutos e se dirige quase sempre aos adultos que cobram regras.',
          'A teimosia já chamava atenção na infância e ficou constante por volta dos 10 anos; desde então aparece toda semana, em casa e na escola.',
          'Está em recuperação em quatro matérias, foi {suspenso|suspensa} por desrespeito e as refeições em família viraram campo de batalha.',
          'Não tem crises de fúria nem quebra objetos; dorme e come bem, não usa drogas e nunca teve semanas de tristeza ou de euforia.',
        ],
        rulesOut: 'com os amigos do skate o humor é ótimo',
      },
    ],
  },
  {
    disorderId: 'compulsive_sexual_behaviour_disorder',
    reference: {
      label: 'OMS — CID-11, 6C72 Transtorno do comportamento sexual compulsivo',
      url: 'https://icd.who.int/browse/2025-01/mms/pt#1630268048',
    },
    differential: {
      disorderId: 'bipolar_2',
      whyNot: 'O comportamento sexual é contínuo há anos e não se limita a fases de energia elevada, pouca necessidade de sono e ideias de grandeza; o humor é estável.',
    },
    explanation: 'Há mais de seis meses, falha persistente em controlar impulsos sexuais intensos e repetitivos, com comportamento sexual que se torna o centro da vida e leva ao abandono de outras atividades e responsabilidades, várias tentativas frustradas de reduzir e manutenção apesar de dívidas, conflitos e advertências, com pouco ou nenhum prazer. O sofrimento vem da perda de controle e dos prejuízos, não apenas de julgamento moral. O padrão é contínuo, sem fases de euforia ou pouca necessidade de sono, o que afasta o Transtorno Bipolar Tipo II; não há uso de drogas nem apostas.',
    giveaways: ['pornograf', 'hipersexual', 'ninfoman'],
    variants: [
      {
        level: 'easy',
        ages: [27, 40],
        text: `{nome}, {idade} anos, analista de sistemas, procura o ambulatório porque diz ter perdido o controle da própria vida sexual. Há cerca de dois anos passa horas por dia em sites de pornografia, inclusive no trabalho, e marca encontros com desconhecidos por aplicativo várias vezes por semana, mesmo sabendo que vai se arrepender.

Já tentou parar muitas vezes: apagou os aplicativos, instalou bloqueadores, prometeu ao cônjuge. Volta em poucos dias. Diz que o prazer quase sumiu: "é um alívio rápido e depois culpa". Levou advertência por usar o computador da empresa e está {endividado|endividada}. Não é {religioso|religiosa} e não vê o sexo como errado; sofre pelo prejuízo. Nunca teve fases de euforia ou de pouco sono e não usa drogas.`,
        clues: [
          'Cancela compromissos para buscar novos encontros e deixou de lado a academia, os amigos e os cursos que fazia.',
          'Foi aumentando aos poucos ao longo desses dois anos e nunca deu trégua por mais de algumas semanas.',
          'O cônjuge descobriu as mensagens e saiu de casa, e as dívidas com motéis e sites já somam R$ 15 mil.',
          'O padrão é contínuo, sem semanas de energia elevada, pouca necessidade de sono ou ideias de grandeza, e nunca houve fases de tristeza profunda.',
        ],
        rulesOut: 'Nunca teve fases de euforia ou de pouco sono',
      },
      {
        level: 'medium',
        ages: [32, 48],
        text: `{nome}, {idade} anos, {professor|professora} {universitário|universitária}, é {encaminhado|encaminhada} pelo médico do trabalho depois de ser {flagrado|flagrada} pela segunda vez acessando sites de conteúdo adulto no computador da faculdade. Em casa, o cônjuge achou faturas de chamadas de vídeo eróticas pagas e três aplicativos de encontros reinstalados no celular.

Conta que há uns três anos não consegue passar um dia sem buscar esse tipo de estímulo; fica no celular até as 3 da manhã e chega {exausto|exausta} ao trabalho. Já apagou tudo várias vezes e voltou em poucos dias: "Nem tenho mais prazer, só não consigo parar." Não usa álcool ou outras drogas, e o humor e a energia são estáveis ao longo do ano.`,
        clues: [
          'Deixou de lado a corrida, os amigos e a pesquisa; os encontros e os sites passaram a ocupar o centro do dia.',
          'Aumentou aos poucos ao longo desses três anos e, desde então, nunca passou mais de duas semanas sem recaída.',
          'Recebeu advertência formal, gastou as economias da família e o casamento está por um fio.',
          'Não tem objeções morais ao sexo; o incômodo é não conseguir parar. Nunca teve semanas de euforia ou de pouca necessidade de sono.',
        ],
        rulesOut: 'o humor e a energia são estáveis ao longo do ano',
      },
      {
        level: 'hard',
        ages: [44, 58],
        text: `{nome}, {idade} anos, comerciante, é {levado|levada} ao CAPS AD por causa das dívidas: R$ 40 mil no cartão e um empréstimo consignado. Os parentes, muito religiosos, acreditam que o dinheiro foi para apostas on-line, mas {nome} nunca apostou. Os extratos mostram assinaturas de sites adultos, chamadas de vídeo pagas e diárias de motel.

Há quatro anos, diz, "a cabeça só pensa nisso": fecha a loja mais cedo, passa noites no celular e chega {exausto|exausta} no dia seguinte. Já trocou de número, deu o cartão para o irmão guardar e procurou um grupo de apoio, mas sempre volta. Quase não sente prazer, só um alívio que dura minutos. O humor e a energia nunca mudaram em fases, e não usa álcool, drogas ou remédios.`,
        clues: [
          'Abandonou o futebol de domingo e os almoços de família; quase todo o tempo livre gira em torno de encontros e conteúdo sexual.',
          'Começou de forma gradual há cerca de quatro anos e se mantém quase todos os dias; fora isso, a família não notou nenhuma outra mudança no jeito {dele|dela}.',
          'Atrasou o aluguel da loja, perdeu clientes por fechar cedo e o cônjuge pediu a separação.',
          'Diz que o que {o|a} aflige não é a reprovação da família, e sim não conseguir parar; nunca teve semanas de euforia ou de pouca necessidade de sono.',
        ],
        rulesOut: 'O humor e a energia nunca mudaram em fases',
      },
    ],
  },
]
