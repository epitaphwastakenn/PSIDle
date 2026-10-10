import type { DisorderCaseSet } from './types'

export const traumaCases: DisorderCaseSet[] = [
  {
    disorderId: 'ptsd',
    reference: {
      label: 'Manual MSD (Profissional) — Transtorno de estresse pós-traumático (TEPT)',
      url: 'https://www.msdmanuals.com/pt/profissional/psiquiatria/transtornos-de-ansiedade-e-transtornos-relacionados-a-trauma-e-a-estressores/transtorno-de-estresse-p%C3%B3s-traum%C3%A1tico-tept',
    },
    differential: {
      disorderId: 'complex_ptsd',
      whyNot: 'O evento foi único e a pessoa mantém a autoestima, o controle das emoções e os vínculos próximos; faltam as alterações da auto-organização que definem o quadro complexo.',
    },
    explanation: 'Exposição direta a ameaça real de morte, há mais de um mês, seguida de lembranças intrusivas e pesadelos, reações intensas a lembretes, evitação de lugares ligados ao evento, crença persistente de que o perigo vai voltar, medo constante, hipervigilância, sobressaltos, sono ruim e falta de concentração, com prejuízo no trabalho ou na escola. A duração acima de um mês afasta o Transtorno de Estresse Agudo, e exames normais, sem pancada na cabeça nem uso de substâncias, afastam causas orgânicas. Diferente do TEPT Complexo, o evento foi único e a autoestima, a regulação das emoções e os relacionamentos estão preservados.',
    giveaways: [],
    variants: [
      {
        level: 'easy',
        ages: [30, 52],
        text: `{nome}, {idade} anos, motorista de ônibus, chega ao CAPS {encaminhado|encaminhada} pelo médico do trabalho. Há quatro meses, durante um assalto ao ônibus, ficou vários minutos com uma arma apontada para a cabeça. Desde então, revive a cena sem querer, tem pesadelos com o assaltante e acorda {encharcado|encharcada} de suor. Pediu para sair da linha e evita até passar pelo ponto onde tudo aconteceu.

Diz que sente que nenhum lugar é seguro e vive com medo. Senta sempre de frente para a porta, se assusta com qualquer barulho, dorme mal e se distrai com facilidade. Apesar do trauma, segue próxim{o|a} da família e dos colegas, não se sente menos por causa do que viveu e não tem explosões de raiva. Não sofreu pancada na cabeça e não usa álcool ou outras substâncias.`,
        clues: [
          'Cenas de assalto na televisão fazem seu coração disparar e as mãos tremerem, por isso deixou de ver o noticiário.',
          'Os sintomas começaram na primeira semana após o assalto e não diminuíram ao longo dos quatro meses seguintes.',
          'Está {afastado|afastada} pelo INSS, não consegue andar de ônibus nem nas folgas e depende de parentes para levar os filhos à escola.',
          'Foi um episódio único na vida de {nome}; fora as reações ligadas ao assalto, a autoestima, o controle das emoções e as amizades seguem como antes.',
        ],
        rulesOut: 'segue próxim{o|a} da família e dos colegas, não se sente menos por causa do que viveu e não tem explosões de raiva',
      },
      {
        level: 'medium',
        ages: [45, 68],
        text: `{nome}, {idade} anos, chega à UBS pedindo um remédio para dormir. Em março, a enchente invadiu sua casa de madrugada, e {ele|ela} passou nove horas no telhado com a neta, vendo a água subir, até o resgate dos bombeiros. A casa foi reformada, mas {nome} acompanha a previsão do tempo o dia inteiro e, quando começa a chover, não consegue pregar o olho.

Sonha com a água entrando pela porta, pula da cadeira com trovões e repete que "a qualquer hora vem de novo". Mudou o caminho da feira para não passar pelo córrego. Agora, em agosto, continua indo à igreja, cuidando da neta e conversando com as vizinhas como antes, sem se culpar pelo que aconteceu.`,
        clues: [
          'Nas noites de chuva, passa horas na janela vigiando a rua, com o coração acelerado e um medo que não passa.',
          'O sono ruim e os sustos começaram ainda na semana da enchente e se mantêm, quase sem alívio, há cinco meses.',
          'Recusa faxinas em bairros mais baixos e falta ao trabalho nos dias nublados, o que já reduziu a renda da família.',
          'Nunca tinha vivido nada parecido; longe dos lembretes da enchente, segue {calmo|calma}, confiante em si e próxim{o|a} das pessoas, e não usa álcool.',
        ],
        rulesOut: 'continua indo à igreja, cuidando da neta e conversando com as vizinhas como antes, sem se culpar pelo que aconteceu',
      },
      {
        level: 'hard',
        ages: [14, 17],
        text: `{nome}, {idade} anos, é {levado|levada} pela mãe ao pediatra da UBS por dor de barriga quase todas as manhãs e faltas na escola. Exames de sangue, fezes e ultrassom vieram normais. A dor aparece nos dias de aula, antes de sair de casa, e some nas férias e nos fins de semana que passa na casa da avó, longe da mãe.

Há três meses, num tiroteio perto do ponto de ônibus da escola, {nome} se jogou no chão enquanto uma bala atingia o muro ao lado. Desde então, faz um caminho mais longo, acorda à noite com o barulho dos tiros nos sonhos e pula da cadeira com estouro de fogos. Diz que "ali ninguém está seguro". Continua com os mesmos amigos, sem explosões, e não se acha {fraco|fraca} por isso.`,
        clues: [
          'Anda com medo o tempo todo na rua e fica de olho em qualquer moto que passa perto, mesmo longe da escola.',
          'Até o tiroteio, era {bom aluno|boa aluna} e quase nunca faltava; a mudança começou na semana seguinte e não cedeu desde então.',
          'Já soma vinte faltas no bimestre, não consegue se concentrar nas provas e largou o curso de inglês, que fica na mesma rua.',
          'Nunca tinha vivido violência antes; em casa e no grupo de jovens da igreja, segue {carinhoso|carinhosa}, {seguro|segura} de si e sem crises de choro ou raiva.',
        ],
        rulesOut: 'Continua com os mesmos amigos, sem explosões, e não se acha {fraco|fraca} por isso.',
      },
    ],
  },
  {
    disorderId: 'complex_ptsd',
    reference: {
      label: 'U.S. Department of Veterans Affairs, National Center for PTSD — Complex PTSD: History and Definitions (CID-11)',
      url: 'https://www.ptsd.va.gov/professional/treat/essentials/complex_ptsd.asp',
    },
    differential: {
      disorderId: 'bpd',
      whyNot: 'Os problemas começaram após violência prolongada na vida adulta, em quem antes tinha vínculos estáveis; a autoimagem é negativa de forma constante, sem medo de abandono nem relações intensas e instáveis.',
    },
    explanation: 'Exposição prolongada e repetida a violência da qual era difícil escapar (anos de agressões, trabalho forçado), seguida do núcleo do TEPT (revivência no presente, evitação e sensação constante de ameaça) e das três alterações da auto-organização descritas na CID-11 (6B41): desregulação emocional intensa, imagem de si como alguém sem valor, com vergonha e culpa, e dificuldade persistente de manter vínculos e de se sentir próximo dos outros, com prejuízo importante. Essas alterações separam o quadro do TEPT. O início na vida adulta, depois de anos de relações estáveis, sem medo de abandono nem autoimagem oscilante, afasta o Transtorno de Personalidade Borderline.',
    giveaways: [],
    variants: [
      {
        level: 'easy',
        ages: [30, 48],
        text: `{nome}, {idade} anos, chega ao CAPS {encaminhado|encaminhada} pelo CREAS. Durante nove anos de casamento, sofreu agressões e ameaças de morte quase toda semana, sem conseguir sair de casa por medo e falta de dinheiro. Separou-se há um ano, mas revive as agressões como se estivessem acontecendo agora, tem pesadelos, evita o antigo bairro e vive em alerta, sempre de costas para a parede.

Depois de tanto trauma, sente-se {derrotado|derrotada} e sem valor, com uma vergonha que não passa. Tem explosões de raiva e choro que não consegue controlar e, em seguida, fica horas sem sentir nada. Afasta quem tenta se aproximar e não confia em ninguém. Antes do casamento, tinha amizades antigas, emprego fixo e nenhuma dificuldade desse tipo.`,
        clues: [
          'Diz que deve ter merecido as agressões e se sente {fracassado|fracassada} por ter demorado tanto a ir embora.',
          'As lembranças e o estado de alerta começaram ainda nos primeiros anos de agressões e persistem, sem trégua, um ano após a separação.',
          'Não conseguiu voltar a trabalhar e só sai de casa para as consultas; mesmo assim, come bem, cuida das plantas com gosto e não bebe.',
          'Não tem medo de ser {abandonado|abandonada}, nunca se feriu, e a imagem que faz de si não oscila: é sempre a de alguém sem valor.',
        ],
        rulesOut: 'Antes do casamento, tinha amizades antigas, emprego fixo e nenhuma dificuldade desse tipo.',
      },
      {
        level: 'medium',
        ages: [28, 50],
        text: `{nome}, {idade} anos, vem ao CAPS com a assistente social do abrigo municipal. Há um ano, foi {resgatado|resgatada} pela fiscalização do trabalho numa carvoaria onde passou três anos sob vigilância armada, com uma dívida que nunca acabava e castigos para quem tentasse fugir. Ainda sonha com os fornos quase toda noite, revive o lugar quando sente cheiro de fumaça e recusa vagas na zona rural.

Diz que foi {tratado|tratada} como bicho e que hoje não presta para nada. Num momento está {calmo|calma}; no outro, quebra coisas ou chora sem parar, e depois passa dias como se não sentisse nada. Dorme com uma cadeira travando a porta, não conversa com ninguém no abrigo e recusou rever os irmãos. Antes da carvoaria, trabalhava na construção civil e era {querido|querida} no bairro.`,
        clues: [
          'Sente vergonha de contar à família o que viveu e diz que a culpa foi sua por ter aceitado aquela proposta de emprego.',
          'As lembranças, os sustos e o alerta começaram ainda na carvoaria e não melhoraram no ano que se passou desde o resgate.',
          'Largou duas vagas de emprego na primeira semana; no abrigo, só se ocupa da horta, que cuida {sozinho|sozinha} e com gosto.',
          'Não teme ser {abandonado|abandonada}, nunca se machucou de propósito e, em vez de relações intensas e instáveis, evita qualquer vínculo; também não bebe.',
        ],
        rulesOut: 'Antes da carvoaria, trabalhava na construção civil e era {querido|querida} no bairro.',
      },
      {
        level: 'hard',
        ages: [63, 78],
        text: `{nome}, {idade} anos, é {trazido|trazida} pela filha ao ambulatório de geriatria por "esquecimento": perde o fio da conversa, esquece recados e passa noites em claro. Os testes de memória e os exames de sangue vieram normais. Há oito meses mora com a filha, depois que a Justiça afastou o filho caçula, que por cinco anos {o|a} agrediu e ameaçou dentro de casa.

A filha conta que {nome} acorda gritando, congela ao ouvir chaves na porta e não passa nem perto da rua antiga. Repete que é um peso e que mereceu tudo, alterna crises de choro e gritos por nada com horas {paralisado|paralisada} e não deixa os netos se aproximarem. Recusou até as visitas do coral, onde cantou por trinta anos com o mesmo grupo de amigos.`,
        clues: [
          'Passa parte da noite olhando o portão pela janela, com medo de que o filho apareça a qualquer momento.',
          'Até o filho voltar a morar com {ele|ela}, era independente e sociável; as mudanças vieram com as agressões e não pioram aos poucos.',
          'Deixou de cozinhar e de sair {sozinho|sozinha}, e a filha reduziu o horário de trabalho; entre as crises, come bem, não bebe e se distrai com o rádio.',
          'Nunca teve relações tumultuadas nem medo de ser {abandonado|abandonada}; a vida inteira foi de vínculos longos e estáveis.',
        ],
        rulesOut: 'onde cantou por trinta anos com o mesmo grupo de amigos',
      },
    ],
  },
  {
    disorderId: 'acute_stress_disorder',
    reference: {
      label: 'Manual MSD (Profissional) — Transtorno de estresse agudo',
      url: 'https://www.msdmanuals.com/pt/profissional/psiquiatria/transtornos-de-ansiedade-e-transtornos-relacionados-a-trauma-e-a-estressores/transtorno-de-estresse-agudo',
    },
    differential: {
      disorderId: 'ptsd',
      whyNot: 'Os sintomas começaram logo após o evento e existem há menos de um mês; o TEPT só pode ser diagnosticado quando o quadro dura mais de um mês.',
    },
    explanation: 'Exposição direta a ameaça real de morte seguida, já nos primeiros dias, de nove ou mais sintomas entre revivências intrusivas, pesadelos, reações físicas a lembretes, sensação de irrealidade, incapacidade de sentir alegria, evitação, insônia, sobressaltos, hipervigilância, irritabilidade e falta de concentração, com sofrimento e prejuízo, entre 3 dias e 1 mês após o evento. Com menos de um mês de duração, o quadro ainda não pode ser chamado de TEPT. A ausência de pancada na cabeça, de álcool e de outras substâncias afasta causa orgânica; no hospital, a orientação e a atenção preservadas, sem flutuação, afastam o Delirium.',
    giveaways: [],
    variants: [
      {
        level: 'easy',
        ages: [22, 45],
        text: `{nome}, {idade} anos, vai à UBS dez dias depois de um capotamento na rodovia, em que ficou {preso|presa} nas ferragens por quase uma hora, sentindo cheiro de gasolina, até o resgate. Saiu só com arranhões, e a tomografia da cabeça veio normal. Desde a primeira noite, revê o acidente sem querer e tem pesadelos com o carro girando.

Diz que anda como se estivesse num sonho, não consegue sentir alegria nem com os filhos e evita falar do trauma. Não entra em carro, se assusta com qualquer buzina, dorme mal, perde a concentração e responde com irritação a qualquer pergunta. Não bebe nem usa outras substâncias.`,
        clues: [
          'Ao ouvir uma freada na rua, o coração dispara, as mãos suam e precisa se sentar até passar.',
          'Os sintomas começaram nas primeiras horas após o acidente e se mantêm intensos todos os dias desde então.',
          'Não voltou ao trabalho, que exige dirigir todos os dias, e deixou de levar os filhos à escola.',
          'Tudo começou há apenas dez dias, no dia do acidente; antes disso, {nome} nunca tinha tido sintomas parecidos.',
        ],
        rulesOut: 'dez dias depois de um capotamento na rodovia',
      },
      {
        level: 'medium',
        ages: [25, 50],
        text: `{nome}, {idade} anos, gerente de loja, é {levado|levada} ao pronto-atendimento pelo irmão porque quase não dorme. No domingo retrasado, foi {rendido|rendida} na garagem de casa, {obrigado|obrigada} a dirigir por duas horas com um revólver encostado no corpo e a sacar dinheiro em vários caixas. Desde então, deixa a luz acesa a noite toda, e o rosto do homem volta à memória sempre que fecha os olhos.

Diz que tudo parece "um filme de outra pessoa". Deixou o carro com o irmão, só anda de aplicativo e muda de calçada quando vê alguém de moto. Pula se alguém toca seu ombro, esquece tarefas simples na loja e não ri de mais nada. Não bebe, não usa remédios e não se machucou naquela noite.`,
        clues: [
          'Tem pesadelos quase todas as noites e muda de assunto sempre que alguém pergunta sobre o que aconteceu.',
          'Tudo começou na mesma noite do sequestro e não deu trégua nos dias seguintes; antes disso, dormia e trabalhava bem.',
          'Foi {afastado|afastada} da loja depois de errar o caixa duas vezes e gritar com um cliente que se aproximou por trás.',
          'Ainda não se passou um mês desde o sequestro; os sintomas existem há cerca de duas semanas.',
        ],
        rulesOut: 'No domingo retrasado, foi {rendido|rendida} na garagem de casa',
      },
      {
        level: 'hard',
        ages: [50, 72],
        text: `A ortopedia pede avaliação de {nome}, {idade} anos, {internado|internada} há seis dias por fratura na perna após ser {atropelado|atropelada} por uma moto. À noite acorda gritando, pede para desligar a TV quando passa notícia de trânsito e fica vigiando a porta do quarto. A enfermagem suspeita de confusão mental.

Na entrevista, {nome} sabe a data, o hospital e o motivo da internação, acompanha as perguntas sem se perder e lembra das visitas do dia. Conta que vê a moto vindo sempre que fecha os olhos, sente-se "fora do corpo" nos curativos, não sente alegria nem quando os netos ligam e se assusta com qualquer ruído no corredor. Não bateu a cabeça e não bebe.`,
        clues: [
          'Quando o fisioterapeuta fala em voltar a andar na rua, o coração dispara e {nome} muda logo de assunto.',
          'Os sintomas surgiram no primeiro dia e não oscilam ao longo das horas; recebe só dipirona, sem febre nem exames alterados.',
          'Recusa a cadeira de rodas perto da janela que dá para a avenida, o que atrasa a fisioterapia, e vive {irritado|irritada} com a equipe.',
          'Tudo começou com o atropelamento, há menos de uma semana; antes disso, {nome} nunca tinha tido sintomas parecidos.',
        ],
        rulesOut: 'há seis dias por fratura na perna após ser {atropelado|atropelada} por uma moto',
      },
    ],
  },
  {
    disorderId: 'adjustment_disorder',
    reference: {
      label: 'Manual MSD (Profissional) — Transtornos de adaptação',
      url: 'https://www.msdmanuals.com/pt/profissional/psiquiatria/transtornos-de-ansiedade-e-transtornos-relacionados-a-trauma-e-a-estressores/transtornos-de-adapta%C3%A7%C3%A3o',
    },
    differential: {
      disorderId: 'mdd',
      whyNot: 'Os sintomas são poucos e ligados ao estressor, sem humor deprimido na maior parte do dia nem perda geral de prazer; o apetite, o interesse e os planos se mantêm.',
    },
    explanation: 'Sintomas emocionais e de comportamento que surgiram nas primeiras semanas após um estressor identificável e sem ameaça à vida (demissão, separação dos pais com mudança de cidade, perda da carteira de motorista), com sofrimento desproporcional e prejuízo, sem preencher outro transtorno. Poucos sintomas, com prazer, apetite e planos preservados, afastam o Transtorno Depressivo Maior; preocupações restritas ao estressor e curta duração afastam a Ansiedade Generalizada; a ausência de ameaça à vida afasta o TEPT; e não se trata de luto. No idoso, testes cognitivos normais afastam um quadro neurocognitivo. Espera-se melhora em até 6 meses após o fim do estressor e de suas consequências.',
    giveaways: ['adapta'],
    variants: [
      {
        level: 'easy',
        ages: [40, 58],
        text: `{nome}, {idade} anos, procura a UBS seis semanas depois de ser {demitido|demitida} da fábrica onde trabalhou por dezoito anos. Desde a demissão, chora {escondido|escondida}, perde a paciência com a família, dorme mal pensando nas contas e passou a evitar os amigos "para não ter de explicar". Diz que o futuro não sai da cabeça e que se sente {perdido|perdida} sem a rotina da fábrica.

Parou de enviar currículos e faltou a uma entrevista por vergonha. Mesmo assim, ainda se anima nos almoços de domingo com a família, come como antes e não pensa em morrer. Não usa álcool nem outras substâncias.`,
        clues: [
          'Fica {irritado|irritada} quando alguém pergunta sobre emprego e já discutiu com o cunhado num aniversário por causa disso.',
          'Os sintomas começaram na primeira semana após a demissão; antes dela, nunca tinha passado por nada parecido.',
          'A família reclama das brigas em casa, e {nome} perdeu o prazo de inscrição num curso gratuito de requalificação.',
          'A tristeza vem quando pensa no emprego e nas contas; no resto do dia, consegue se distrair com a horta e com os sobrinhos.',
        ],
        rulesOut: 'ainda se anima nos almoços de domingo com a família, come como antes e não pensa em morrer',
      },
      {
        level: 'medium',
        ages: [13, 16],
        text: `{nome}, {idade} anos, é {levado|levada} pela mãe ao CAPSi a pedido da nova escola. Há dois meses, depois da separação dos pais, mudou-se com a mãe do interior de Minas para Salvador e deixou para trás a turma de sempre. Desde a mudança, as notas despencaram, cabula aulas para ficar na praça e responde aos gritos quando é {cobrado|cobrada}.

A mãe conta que {nome} chora à noite depois de falar com o pai por vídeo e passa as tardes {trancado|trancada} no quarto. Até o ano passado era {elogiado|elogiada} pelos professores e nunca tinha se metido em confusão. Nos treinos de futsal, que manteve na cidade nova, ainda ri e se diverte com o time, e o apetite segue o mesmo.`,
        clues: [
          'Anda {irritado|irritada} e {choroso|chorosa}, diz que perdeu a vida que tinha e se recusa a fazer trabalhos em grupo com os colegas novos.',
          'Tudo começou nas primeiras semanas após a mudança; nas férias que passou com o pai, na cidade antiga, ficou bem melhor.',
          'Acumula faltas e notas vermelhas em quatro matérias, com risco de reprovação; nega uso de álcool e drogas, e a mãe não notou sinais disso.',
          'Não tem ideias de morte, dorme bem e faz planos animados para rever os amigos antigos nas próximas férias.',
        ],
        rulesOut: 'Nos treinos de futsal, que manteve na cidade nova, ainda ri e se diverte com o time, e o apetite segue o mesmo.',
      },
      {
        level: 'hard',
        ages: [72, 84],
        text: `{nome}, {idade} anos, {aposentado|aposentada}, é {trazido|trazida} pelo filho ao geriatra porque "mudou de gênio": bate portas, discute com todos e se recusa a ir a festas de família. Os parentes temem o começo de uma doença da memória. Os testes cognitivos vieram normais, e {nome} continua cuidando {sozinho|sozinha} das contas e dos remédios.

Há sete semanas, o exame de vista impediu a renovação da carteira de motorista. Desde então, diz que perdeu a liberdade, passa horas na garagem lustrando o carro parado e chora quando precisa pedir carona para ir ao banco. Ainda vai a pé ao centro de convivência todas as tardes, joga baralho e ri com os amigos, e o apetite é o mesmo.`,
        clues: [
          'Fica de mau humor nos dias em que depende de alguém para sair e reclama que "virou criança" nas mãos dos filhos.',
          'A irritação começou na semana em que a carteira foi negada; antes, era {conhecido|conhecida} pela calma e nunca teve problemas parecidos.',
          'Faltou ao casamento da neta para não pedir carona e brigou com o vizinho que se ofereceu para {levá-lo|levá-la}, afastando parte da família.',
          'Fora das situações ligadas à carteira, mantém o bom humor, dorme bem e faz planos para a viagem à praia no fim do ano.',
        ],
        rulesOut: 'Ainda vai a pé ao centro de convivência todas as tardes, joga baralho e ri com os amigos, e o apetite é o mesmo.',
      },
    ],
  },
  {
    disorderId: 'prolonged_grief_disorder',
    reference: {
      label: 'Manual MSD (Profissional) — Transtornos depressivos (seção sobre transtorno do luto prolongado)',
      url: 'https://www.msdmanuals.com/pt/profissional/psiquiatria/transtornos-do-humor/transtornos-depressivos',
    },
    differential: {
      disorderId: 'mdd',
      whyNot: 'A dor está centrada na pessoa que morreu, com saudade e preocupação com ela, e não em sentimentos de inutilidade, culpa generalizada ou tristeza sem foco.',
    },
    explanation: 'Morte de pessoa próxima há pelo menos 12 meses (6 meses em crianças e adolescentes), seguida de saudade intensa e preocupação com quem morreu quase todos os dias, com três ou mais sintomas associados, como sensação de que parte de si morreu, descrença, evitação de lembretes, dor emocional intensa, dificuldade de retomar a vida, falta de sentido e solidão, acima do esperado pela cultura e com prejuízo. A dor centrada na perda, sem culpa generalizada nem autodesvalorização e com prazer preservado fora das lembranças, afasta o Transtorno Depressivo Maior. Mortes por doença, sem ameaça vivida pela pessoa, afastam o TEPT; na criança, ficar longe da mãe não causa medo, o que afasta a Ansiedade de Separação.',
    giveaways: [],
    variants: [
      {
        level: 'easy',
        ages: [60, 80],
        text: `{nome}, {idade} anos, {viúvo|viúva}, é {levado|levada} à UBS pela filha. O cônjuge morreu de câncer há um ano e meio, e desde então {nome} sente uma saudade que não dá trégua: passa os dias pensando em quem perdeu, conversa com a foto e diz que uma parte de si foi enterrada junto. Ainda põe dois pratos na mesa e repete que "não consegue acreditar".

Deixou o grupo de dança da terceira idade e diz que a vida perdeu o sentido. A filha conta que, na comunidade da família, todos esperavam que {nome} já tivesse retomado a rotina. Não se sente {culpado|culpada} nem sem valor; a tristeza gira toda em torno da falta do cônjuge.`,
        clues: [
          'Sente uma solidão intensa à noite e evita abrir o guarda-roupa, onde as roupas do cônjuge continuam intocadas.',
          'A dor não diminuiu ao longo dos dezoito meses; no último mês, a saudade e as lembranças vieram quase todos os dias.',
          'Deixou as contas atrasarem, faltou às próprias consultas de rotina e recusa as viagens que a filha organiza.',
          'Come normalmente, cuida de si e, quando o assunto é outro, conversa sem tristeza; o sofrimento aparece ligado a quem perdeu.',
        ],
        rulesOut: 'Não se sente {culpado|culpada} nem sem valor; a tristeza gira toda em torno da falta do cônjuge.',
      },
      {
        level: 'medium',
        ages: [24, 40],
        text: `{nome}, {idade} anos, é {encaminhado|encaminhada} ao psicólogo da UBS pelo médico de família. A mãe, com quem morava, morreu de insuficiência cardíaca em novembro do ano retrasado. Desde então, {nome} liga quase todo dia para o número dela só para ouvir a mensagem da caixa postal e mantém o quarto exatamente como estava, sem deixar ninguém mexer em nada.

Trancou a faculdade no semestre seguinte e diz que "uma parte de mim foi junto". Às vezes se pega esperando a mãe chegar do trabalho. Os amigos chamam para sair, mas {nome} responde que "sem ela nada faz sentido". Não se culpa, não se acha sem valor e mantém o apetite e o sono de sempre.`,
        clues: [
          'Sente uma dor intensa quando alguém fala da mãe no passado e uma solidão que não passa nem com a casa cheia.',
          'A saudade não diminuiu desde o enterro; os tios, que também perderam a irmã, já retomaram a vida e estranham a intensidade da dor.',
          'Perdeu a bolsa de estudos, vai do trabalho direto para casa e recusou todos os convites dos amigos neste mês.',
          'Fora das lembranças da mãe, o humor não muda: não há autocrítica, sensação de fracasso nem ideias de morte.',
        ],
        rulesOut: 'Não se culpa, não se acha sem valor e mantém o apetite e o sono de sempre.',
      },
      {
        level: 'hard',
        ages: [10, 13],
        text: `{nome}, {idade} anos, é {levado|levada} pela mãe ao CAPSi porque há meses não dorme no próprio quarto: passa as noites na cama que era da avó, {abraçado|abraçada} a um casaco dela. A avó, que {o|a} criou enquanto a mãe trabalhava, morreu de pneumonia no hospital há nove meses. Na escola, a professora nota que {nome} anda {distraído|distraída} e largou a natação, que fazia com a avó.

Pergunta quase todo dia se a avó sentiu dor e se morreu sozinha, diz que "não parece verdade" e chora ao passar em frente ao hospital. Quando a mãe viaja a trabalho, fica {tranquilo|tranquila} na casa da tia. Nos fins de semana, ainda se diverte com a prima, come bem e não se culpa por nada.`,
        clues: [
          'Guarda o celular da avó embaixo do travesseiro, ouve os áudios antigos dela toda noite e diz que ninguém entende essa saudade.',
          'Até a morte da avó, dormia {sozinho|sozinha} e ia bem na escola; nove meses depois, a saudade não diminuiu, e a família acha a reação muito acima do esperado.',
          'As notas caíram em três matérias, e recusou a festa de aniversário que a família preparou, dizendo que "sem a vó não tem graça".',
          'A tristeza vem em ondas, puxada pelas lembranças da avó; entre elas, {nome} brinca, ri e faz planos como antes.',
        ],
        rulesOut: 'Nos fins de semana, ainda se diverte com a prima, come bem e não se culpa por nada.',
      },
    ],
  },
  {
    disorderId: 'reactive_attachment_disorder',
    reference: {
      label: 'StatPearls (NCBI Bookshelf) — Reactive Attachment Disorder',
      url: 'https://www.ncbi.nlm.nih.gov/books/NBK537155/',
    },
    differential: {
      disorderId: 'autism_spectrum_disorder',
      whyNot: 'Não há interesses restritos, movimentos repetitivos nem falhas de comunicação: a criança usa olhar, gestos, frases e faz de conta. O retraimento é diante de quem cuida e acompanha a negligência precoce.',
    },
    explanation: 'Padrão consistente de retraimento emocional diante dos cuidadores, evidente antes dos 5 anos: a criança raramente busca ou aceita conforto quando sofre, tem pouca resposta social e emocional, pouco afeto positivo e episódios inexplicáveis de medo, tristeza ou irritação, depois de cuidado gravemente insuficiente (negligência, abrigo, trocas repetidas de cuidadores), com idade de desenvolvimento acima de 9 meses. Comunicação, faz de conta e ausência de comportamentos repetitivos afastam o Transtorno do Espectro Autista; a distância mantida com estranhos afasta o Transtorno de Relacionamento Social Desinibido; a calma e a atenção nas atividades afastam o TDAH; e, ao contrário da criança deprimida, esta não procura conforto em ninguém.',
    giveaways: ['apego'],
    variants: [
      {
        level: 'easy',
        ages: [4, 5],
        text: `{nome}, {idade} anos, chega ao CAPSi com a mãe da família acolhedora. Aos 2 anos, foi {retirado|retirada} pelo conselho tutelar de uma casa onde passava dias no berço, quase sem contato com adultos, e depois viveu num abrigo com troca constante de cuidadores. Está com a família atual há seis meses e, quando se machuca ou se assusta, não procura ninguém nem aceita colo: fica {parado|parada}, olhando o chão.

Quase não sorri, responde pouco quando brincam com {ele|ela} e tem crises de choro ou medo sem motivo, até na hora do banho. Mesmo assim, aponta o que quer, olha nos olhos, brinca de casinha e fala frases completas. Com adultos estranhos, mantém a mesma distância.`,
        clues: [
          'Não corre para mostrar um desenho nem chama ninguém para dividir uma descoberta; passa a maior parte do tempo {quieto|quieta}, num canto.',
          'Os relatórios do abrigo descrevem o mesmo retraimento desde os 2 anos, e ele segue presente há mais de um ano, em casa e na escola.',
          'Na pré-escola, não participa das rodas, não pede ajuda quando se machuca e não forma vínculo com as professoras.',
          'Não tem interesses restritos, movimentos repetitivos nem incômodo com sons ou texturas, e a avaliação mostrou desenvolvimento próximo do esperado para a idade.',
        ],
        rulesOut: 'aponta o que quer, olha nos olhos, brinca de casinha e fala frases completas',
      },
      {
        level: 'medium',
        ages: [5, 6],
        text: `{nome}, {idade} anos, foi {adotado|adotada} há oito meses, depois de passar os primeiros anos num abrigo com muitas crianças para poucas cuidadoras. Os pais procuram o ambulatório porque {nome} cai no parquinho, rala o joelho e levanta sem olhar para ninguém. Quando a mãe tenta {acalmá-lo|acalmá-la}, vira o rosto e espera o colo acabar.

Em casa, raramente ri e reage pouco às brincadeiras do pai; às vezes fica com medo ou chora de repente durante o jantar, sem nada que explique. Com adultos desconhecidos, mantém distância. Pede o que quer com olhar e gestos, conversa com frases e inventa histórias com os bonecos, sem rituais nem movimentos repetidos.`,
        clues: [
          'Não estende os braços quando os pais chegam para {buscá-lo|buscá-la} e quase não sorri nem ao ganhar um presente.',
          'Os relatórios do abrigo já descreviam esse jeito desde os 3 anos; com a família, houve apenas pequenos avanços.',
          'Na escola, fica de fora das brincadeiras e não procura a professora quando se machuca, embora fique {quieto|quieta} e termine as atividades.',
          'A avaliação do desenvolvimento não encontrou atraso de linguagem, interesses restritos nem incômodo com sons e texturas.',
        ],
        rulesOut: 'Pede o que quer com olhar e gestos, conversa com frases e inventa histórias com os bonecos, sem rituais nem movimentos repetidos.',
      },
      {
        level: 'hard',
        ages: [5, 7],
        text: `{nome}, {idade} anos, é {encaminhado|encaminhada} pela pediatra à neurologia infantil porque "parece não sentir dor": não chora nas vacinas e quebrou o braço na escola sem pedir ajuda; a fratura só foi percebida no fim da aula. No exame, retira a mão da agulha, faz careta, e o restante da avaliação neurológica é normal.

Vive com a tia há um ano. Antes, passou por três famílias e um abrigo, depois de ser {deixado|deixada} {sozinho|sozinha} por dias quando bebê. A tia conta que {nome} nunca a procura quando está mal, recebe abraço de corpo duro, raramente ri e, às vezes, se assusta e chora sem motivo. Brinca de faz de conta e conversa olhando nos olhos; com estranhos, fica distante.`,
        clues: [
          'Come e dorme bem e tem energia para brincar, mas responde pouco às brincadeiras e aos elogios da tia e brinca quase sempre {sozinho|sozinha}.',
          'Os relatórios do abrigo, de quando tinha 3 anos, já descreviam uma criança que não pedia colo nem buscava os adultos.',
          'Na escola, fica {quieto|quieta} e termina as tarefas, mas não pede ajuda nem quando se machuca e não forma vínculo com a professora.',
          'Não tem interesses restritos, rituais nem movimentos repetitivos, e a linguagem e o faz de conta estão adequados para a idade.',
        ],
        rulesOut: 'Brinca de faz de conta e conversa olhando nos olhos',
      },
    ],
  },
  {
    disorderId: 'disinhibited_social_engagement_disorder',
    reference: {
      label: 'Zeanah & Gleason, J Child Psychol Psychiatry (PMC) — Attachment disorders in early childhood',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4342270/',
    },
    differential: {
      disorderId: 'adhd',
      whyNot: 'Em sala, a criança presta atenção, espera a vez e termina as tarefas; a falta de reserva aparece com adultos desconhecidos e acompanha a história de cuidado gravemente insuficiente, não uma impulsividade geral.',
    },
    explanation: 'Padrão em que a criança se aproxima ativamente de adultos desconhecidos, sem a reserva esperada, com intimidade física e verbal excessiva, pouca ou nenhuma checagem do cuidador ao se afastar e disposição para sair com estranhos, depois de cuidado gravemente insuficiente (negligência, abrigo, trocas de cuidadores), com idade de desenvolvimento acima de 9 meses. O comportamento não se limita à impulsividade: a atenção e o autocontrole em sala estão preservados, o que afasta o TDAH. A criança busca conforto nos cuidadores atuais, o que afasta o Transtorno de Apego Reativo, e se comunica e brinca bem com os colegas, sem comportamentos repetitivos, o que afasta o Transtorno do Espectro Autista.',
    giveaways: ['desinibi'],
    variants: [
      {
        level: 'easy',
        ages: [4, 6],
        text: `{nome}, {idade} anos, foi {adotado|adotada} há um ano, depois de viver desde bebê num abrigo com muitas crianças e cuidadoras que mudavam o tempo todo. Os pais procuram o CAPSi porque {nome} se aproxima de qualquer adulto desconhecido sem nenhuma timidez: no mercado, abraça estranhos, senta no colo de visitas e chama de "mãe" moças que acabou de conhecer.

No parque, sai correndo sem olhar para trás e, na semana passada, foi {encontrado|encontrada} de mãos dadas com um homem que oferecia sorvete, {pronto|pronta} para ir embora com ele. Quando se machuca, porém, corre para os pais e se acalma no colo deles. Na escola, presta atenção, espera a vez e brinca com os colegas como as outras crianças.`,
        clues: [
          'Pergunta a desconhecidos onde moram e se pode dormir na casa deles, e pede colo a qualquer funcionário de loja.',
          'As cuidadoras do abrigo já descreviam esse comportamento aos 2 anos, e ele se mantém igual há mais de um ano com a família.',
          'Os pais não conseguem {levá-lo|levá-la} a lugares cheios sem segurar sua mão o tempo todo, e a escola reforçou a vigilância na saída.',
          'Em sala, fica {sentado|sentada} nas atividades, termina as tarefas e não interrompe os colegas; a falta de reserva aparece só diante de adultos desconhecidos.',
        ],
        rulesOut: 'Na escola, presta atenção, espera a vez e brinca com os colegas como as outras crianças.',
      },
      {
        level: 'medium',
        ages: [7, 9],
        text: `{nome}, {idade} anos, vive há um ano e meio com uma família acolhedora, depois de passar por quatro lares e dois abrigos desde que foi {retirado|retirada} da mãe biológica, aos 2 anos, por negligência. A escola chamou a família porque {nome} entra na diretoria para abraçar visitantes, pergunta ao novo porteiro se pode morar com ele e já entrou no carro do pai de um colega que mal conhecia.

Em passeios, some de vista sem procurar a mãe acolhedora, que é quem {ele|ela} chama quando está triste ou se machuca. A professora diz que, na sala, {nome} acompanha as explicações, termina as tarefas e espera a vez de falar. Tem amigos da mesma idade e entende as brincadeiras deles.`,
        clues: [
          'Senta no colo de adultos que acabou de conhecer e conta detalhes da própria vida a qualquer pessoa na fila do posto de saúde.',
          'Os relatórios dos abrigos descrevem esse jeito desde os 3 anos, e ele continuou mesmo depois de criar laços com a família atual.',
          'A escola proibiu que saia da sala sem um adulto, e a família deixou de {levá-lo|levá-la} a festas por medo de que vá embora com alguém.',
          'Não é {agitado|agitada} nem {distraído|distraída}: em casa e na escola, consegue esperar, planejar e se concentrar; o problema se limita à falta de reserva com estranhos.',
        ],
        rulesOut: 'na sala, {nome} acompanha as explicações, termina as tarefas e espera a vez de falar',
      },
      {
        level: 'hard',
        ages: [5, 7],
        text: `O conselho tutelar encaminha {nome}, {idade} anos, ao CAPSi depois que {ele|ela} sumiu numa praia lotada e foi {encontrado|encontrada}, uma hora depois, no carro de uma família desconhecida, comendo biscoitos. Os pais, acusados de descuido, contam que já {o|a} vigiam de perto e que, em casa, {nome} é {agitado|agitada} e fala sem parar.

Foi {adotado|adotada} aos 3 anos, depois de ser {retirado|retirada} da família biológica por negligência e passar por vários lares provisórios. Na consulta, entra no consultório antes dos pais, senta no colo da psicóloga e pergunta se pode ir para a casa dela. Nas tarefas da escola, porém, fica {sentado|sentada}, espera a vez e termina o que começa. Quando cai, chora e procura a mãe.`,
        clues: [
          'No posto de saúde, puxa conversa com qualquer adulto da fila, oferece abraços e conta onde mora sem que perguntem.',
          'Desde a adoção, aos 3 anos, o comportamento com estranhos se mantém, embora {nome} tenha criado laços fortes com os pais.',
          'A família evita praias, shoppings e festas, e a escola precisou designar um adulto só para {acompanhá-lo|acompanhá-la} na saída.',
          'A professora não nota inquietação nem distração nas aulas; a agitação em casa aparece nos dias de visita, quando {nome} corre para receber quem chega.',
        ],
        rulesOut: 'Nas tarefas da escola, porém, fica {sentado|sentada}, espera a vez e termina o que começa.',
      },
    ],
  },
]
