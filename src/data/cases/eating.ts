import type { DisorderCaseSet } from './types'

export const eatingCases: DisorderCaseSet[] = [
  {
    disorderId: 'anorexia_nervosa',
    reference: {
      label: 'Manual MSD (Profissional) — Anorexia nervosa',
      url: 'https://www.msdmanuals.com/pt/profissional/transtornos-psiqui%C3%A1tricos/transtornos-da-alimenta%C3%A7%C3%A3o-e-da-ingest%C3%A3o-de-alimentos/anorexia-nervosa',
    },
    differential: {
      disorderId: 'avoidant_restrictive_food_intake_disorder',
      whyNot: 'A comida é recusada por medo de engordar e por uma visão alterada do próprio corpo, e não por aversão a texturas, medo de engasgar ou falta de interesse em comer.',
    },
    explanation: 'Restrição alimentar que leva a peso significativamente baixo para a idade e o sexo, medo intenso de engordar ou comportamentos persistentes que impedem o ganho de peso, e alteração na forma de vivenciar o próprio corpo, com pouca noção da gravidade. Pulso lento, pressão baixa, desmaios e parada da menstruação mostram o risco clínico. Não há episódios de comer em excesso nem purgação (tipo restritivo), e exames normais afastam doença da tireoide. O Transtorno Alimentar Restritivo/Evitativo não serve porque, nele, a restrição não envolve preocupação com o peso ou com a forma do corpo.',
    giveaways: [],
    variants: [
      {
        level: 'easy',
        ages: [14, 17],
        sex: 'f',
        text: `{nome}, {idade} anos, é levada pela mãe à UBS porque emagreceu 10 kg em oito meses. Começou uma dieta "para ficar saudável" e foi cortando arroz, pão e doces até comer só salada, ovo e fruta, sempre contando as calorias. Hoje pesa 40 kg e mede 1,62 m, e a menstruação parou há quatro meses.

Pesa-se várias vezes por dia, corre todas as manhãs e diz que ainda precisa perder a barriga. Tem pavor de engordar e chora quando a mãe põe mais comida no prato. Acha que a família exagera: "estou ótima". Nunca teve episódios de comer muito nem provocou vômitos, e os exames de tireoide vieram normais.`,
        clues: [
          'No exame, tem pulso lento, pressão baixa, mãos frias e pelos finos e macios nos braços.',
          'A restrição começou aos poucos e se intensificou nos últimos três meses, mesmo com a família vigiando as refeições.',
          'Desmaiou na aula de educação física, foi afastada das atividades esportivas da escola e deixou de sair com as amigas para não comer fora.',
          'Não tem nojo de cheiros ou texturas nem medo de engasgar; recusa só o que acredita que engorda.',
        ],
        rulesOut: 'Tem pavor de engordar',
      },
      {
        level: 'medium',
        ages: [19, 24],
        text: `{nome}, {idade} anos, estudante de arquitetura, chega ao serviço de saúde da universidade {levado|levada} por uma colega de república, que estranhou o quanto {ele|ela} emagreceu desde o começo do ano passado. Na balança, 46 kg para 1,70 m; os exames de sangue e de tireoide vieram normais. Leva para a faculdade só uma marmita pequena de legumes cozidos e vai à academia antes e depois das aulas.

Diz que está bem e que ainda precisa secar a barriga e as coxas. Pesa-se toda manhã e, se o número sobe, pula o jantar. Evita rodízios e aniversários, usa moletom mesmo no calor e já teve tontura ao se levantar. Não usa remédios para emagrecer, nunca comeu grandes quantidades escondid{o|a} e não provoca vômitos.`,
        clues: [
          'Corta a comida em pedaços minúsculos, conta as calorias num aplicativo e masca chiclete para enganar a fome.',
          'Começou cortando doces para acompanhar a academia; mês a mês tirou arroz, pão e óleo, e perdeu 12 kg desde então.',
          'Desmaiou numa aula prática, perdeu provas por fraqueza e deixou de sair com a turma, porque os encontros sempre envolvem comida.',
          'Gosta de cozinhar para os colegas de casa e não tem aversão a sabores ou texturas; recusa apenas o que considera engordar.',
        ],
        rulesOut: 'ainda precisa secar a barriga e as coxas',
      },
      {
        level: 'hard',
        ages: [16, 18],
        sex: 'm',
        text: `{nome}, {idade} anos, corredor de um clube da cidade, chega ao pronto-atendimento depois de desmaiar no treino. O eletrocardiograma mostra 40 batimentos por minuto, e o técnico garante que é "coração de atleta". A mãe conta que, em dez meses, ele passou de 64 para 50 kg, com 1,76 m, e que anda tonto ao se levantar.

Em casa, come só frango grelhado e salada, tira a pele e a gordura de tudo, volta a correr à noite e se pesa depois de cada refeição. Recusou o bolo do próprio aniversário e se irrita quando a mãe usa azeite. Diz que nunca correu tão bem e que "não vai voltar a ser o gordinho da escola". Os exames de sangue e de tireoide vieram normais.`,
        clues: [
          'Diante do espelho, belisca a pele da barriga e diz que ainda sobra gordura, mesmo com as costelas aparentes.',
          'Começou a cortar doces e frituras para baixar o tempo nas provas; a perda de peso continuou mesmo depois do fim da temporada.',
          'Foi afastado das competições pelo médico do clube, não consegue se concentrar nas aulas e deixou de sair com os amigos quando há comida.',
          'Não tem nojo de texturas nem medo de engasgar; come com prazer o que considera "limpo" e recusa o que acha que engorda.',
        ],
        rulesOut: 'não vai voltar a ser o gordinho da escola',
      },
    ],
  },
  {
    disorderId: 'bulimia_nervosa',
    reference: {
      label: 'Manual MSD (Profissional) — Bulimia nervosa',
      url: 'https://www.msdmanuals.com/pt/profissional/transtornos-psiqui%C3%A1tricos/transtornos-da-alimenta%C3%A7%C3%A3o-e-da-ingest%C3%A3o-de-alimentos/bulimia-nervosa',
    },
    differential: {
      disorderId: 'anorexia_nervosa',
      whyNot: 'O peso está e sempre esteve na faixa normal; os episódios e a purgação não acontecem em um quadro de peso significativamente baixo.',
    },
    explanation: 'Episódios recorrentes em que a pessoa come, em pouco tempo, muito mais do que a maioria comeria, com perda de controle, seguidos de comportamentos compensatórios (vômito provocado, laxantes, jejum), ambos pelo menos uma vez por semana há mais de três meses, e autoavaliação dominada pelo peso e pela forma do corpo. Desgaste dos dentes, glândulas salivares aumentadas e calo no dorso da mão são marcas do vômito repetido. O peso normal afasta a Anorexia Nervosa, que tem prioridade quando o peso está significativamente baixo, e a compensação regular separa o quadro dos episódios de comer em excesso sem compensação.',
    giveaways: [],
    variants: [
      {
        level: 'easy',
        ages: [18, 24],
        text: `{nome}, {idade} anos, estudante, procura a clínica-escola da faculdade porque não consegue parar com os "ataques de comida". Três ou quatro vezes por semana, quase sempre à noite e {sozinho|sozinha}, come em meia hora um pacote de biscoitos, pão com manteiga e um pote de sorvete, sem conseguir parar. Depois, com culpa e medo de engordar, provoca o vômito.

Isso começou há cerca de um ano, depois de uma dieta rígida. Pesa-se todos os dias e diz que o número da balança decide se o dia foi bom ou ruim. No dia seguinte aos episódios, tenta ficar só com café. O peso está normal, com IMC de 22, e quase não varia.`,
        clues: [
          'Tem os dentes da frente sensíveis ao gelado e um calo no dorso da mão, de usar os dedos para vomitar.',
          'No começo os episódios eram esporádicos; há mais de seis meses acontecem toda semana, sempre seguidos de vômito.',
          'Falta às aulas da manhã depois das noites de episódios e gasta boa parte do dinheiro do mês com comida.',
          'Nunca teve peso baixo: as consultas dos últimos três anos registram peso estável, dentro da faixa normal.',
        ],
        rulesOut: 'O peso está normal, com IMC de 22',
      },
      {
        level: 'medium',
        ages: [20, 28],
        text: `{nome}, {idade} anos, recepcionista, é {encaminhado|encaminhada} pela nutricionista que {o|a} acompanha para "definir o corpo". Conta que segue a dieta à risca durante o dia, mas, em algumas noites, abre o armário e, em menos de uma hora, termina um pacote de pão de forma, meio pote de doce de leite e o que mais encontrar. Diz que, quando começa, não consegue parar.

A pessoa com quem divide o apartamento achou caixas de laxante no lixo e estranha o chuveiro ligado por muito tempo depois do jantar. Isso se repete toda semana há mais de um ano. O peso se manteve em torno de 58 kg, com 1,62 m, mas {ele|ela} se acha "enorme" quando a calça aperta e diz que só vai gostar de si mais magr{o|a}.`,
        clues: [
          'Admite que, depois desses episódios, força o vômito no banho e passa o dia seguinte quase sem comer.',
          'Os episódios começaram depois de uma dieta muito restrita e hoje acontecem duas ou três vezes por semana.',
          'Chega atrasad{o|a} ao trabalho depois das noites ruins, gasta parte do salário com comida e evita dormir fora de casa.',
          'Nunca esteve abaixo do peso; nas consultas com a nutricionista, o peso variou só dois quilos no último ano.',
        ],
        rulesOut: 'O peso se manteve em torno de 58 kg, com 1,62 m',
      },
      {
        level: 'hard',
        ages: [28, 38],
        text: `{nome}, {idade} anos, analista de sistemas, é {encaminhado|encaminhada} pelo dentista, que notou desgaste liso na face interna dos dentes da frente e as glândulas salivares do rosto aumentadas, sem dor. {Ele|Ela} atribui tudo ao refluxo e à água com limão, mas o gastroenterologista não encontrou refluxo que explicasse o desgaste.

Mora {sozinho|sozinha} e conta, sem muitos detalhes, que algumas noites por semana "perde a mão": pede dois lanches grandes, batata frita e sobremesa pelo aplicativo, come rápido e depois vai ao banheiro "para aliviar". Há anos se pesa toda manhã e diz que um quilo a mais estraga a semana. Pesa 70 kg para 1,74 m, estável.`,
        clues: [
          'Admite que, nessas noites, come em menos de uma hora muito mais do que pretendia, sem conseguir parar, e depois provoca o vômito.',
          'Os episódios começaram depois de uma dieta, aos vinte e poucos anos, e nos últimos três anos acontecem duas a três vezes por semana.',
          'Recusa viagens a trabalho e jantares com amigos para não ficar sem um banheiro reservado, e gasta boa parte do salário com pedidos de comida.',
          'Nunca teve peso baixo: os exames periódicos da empresa registram peso normal e estável há cinco anos.',
        ],
        rulesOut: 'Pesa 70 kg para 1,74 m, estável',
      },
    ],
  },
  {
    disorderId: 'binge_eating_disorder',
    reference: {
      label: 'Manual MSD (Profissional) — Transtorno de compulsão alimentar',
      url: 'https://www.msdmanuals.com/pt/profissional/transtornos-psiqui%C3%A1tricos/transtornos-da-alimenta%C3%A7%C3%A3o-e-da-ingest%C3%A3o-de-alimentos/transtorno-de-compuls%C3%A3o-alimentar',
    },
    differential: {
      disorderId: 'bulimia_nervosa',
      whyNot: 'Depois dos episódios não há vômito provocado, laxantes, jejum nem exercício excessivo; sem compensação regular, os episódios não bastam para esse quadro.',
    },
    explanation: 'Episódios recorrentes em que a pessoa come, em pouco tempo, muito mais do que a maioria comeria, com perda de controle, pelo menos uma vez por semana há mais de três meses, com três ou mais características associadas (comer rápido, até passar mal, sem fome, às escondidas por vergonha, culpa e nojo de si depois) e sofrimento marcado. Não há comportamentos compensatórios regulares, como vômito provocado, laxantes, jejum ou exercício excessivo, o que afasta a Bulimia Nervosa. Ganho de peso, pressão alta e diabetes são consequências frequentes, não exigências do quadro.',
    giveaways: [],
    variants: [
      {
        level: 'easy',
        ages: [35, 50],
        text: `{nome}, {idade} anos, motorista de aplicativo, procura a UBS porque "perdeu o controle da comida". Duas a três vezes por semana, à noite, em casa, come muito em pouco tempo e sem conseguir parar: um pacote inteiro de biscoitos, pão, as sobras do almoço e um litro de refrigerante, mesmo sem fome, até passar mal.

Come escondid{o|a} por vergonha e depois sente nojo de si e muita culpa. Isso acontece há cerca de um ano, período em que ganhou 15 kg; hoje o IMC é 34. Nunca provocou vômito, não usa laxantes e não faz jejum nem exercício para compensar.`,
        clues: [
          'Esconde as embalagens no porta-malas do carro para que a família não perceba quanto comeu.',
          'Os episódios começaram aos poucos e, desde então, não passam uma semana sem acontecer.',
          'Desenvolveu pressão alta, evita almoços de família por vergonha e gasta com comida parte do que ganha nas corridas.',
          'Nos dias seguintes aos episódios, mantém as refeições normais, sem jejum, e nunca usou diuréticos ou remédios para emagrecer.',
        ],
        rulesOut: 'Nunca provocou vômito, não usa laxantes e não faz jejum nem exercício para compensar.',
      },
      {
        level: 'medium',
        ages: [26, 38],
        text: `{nome}, {idade} anos, {professor|professora}, é {encaminhado|encaminhada} pela endocrinologista depois de ganhar 12 kg em um ano. Conta que, em algumas tardes, {sozinho|sozinha} em casa, abre o armário "só para beliscar" e, em meia hora, acaba com um pacote de pão, meio pote de doce de leite e um saco de salgadinhos, mesmo sem fome, até a barriga doer.

Diz que, no meio, pensa em parar, mas a mão continua indo ao pacote. Depois esconde as embalagens no fundo do lixo e passa a noite se culpando. Isso vem desde o carnaval do ano passado e hoje ocorre duas ou três vezes por semana. Promete que "amanhã começa a dieta", mas não pula refeições, não vomita nem toma laxantes.`,
        clues: [
          'Come tão rápido nesses momentos que mal sente o gosto, e evita comer doces na frente dos colegas por vergonha.',
          'No começo eram episódios raros, em semanas de fechamento de notas; há muitos meses não passam uma semana sem acontecer, inclusive nas férias.',
          'Passou a ter pressão alta e glicose no limite, e deixou de ir às confraternizações da escola por se sentir {julgado|julgada}.',
          'A nutricionista confirma que, nos dias seguintes, as refeições seguem normais, sem jejum nem treino extra.',
        ],
        rulesOut: 'não pula refeições, não vomita nem toma laxantes',
      },
      {
        level: 'hard',
        ages: [52, 66],
        text: `{nome}, {idade} anos, comerciante, chega à avaliação para cirurgia bariátrica com IMC de 41, diabetes e a certeza de que o problema é "a tireoide preguiçosa". Os exames hormonais vieram normais, e {ele|ela} garante que nas refeições come como todo mundo, o que a família confirma.

O cônjuge, porém, conta que duas ou três tardes por semana {nome} fecha a loja mais cedo e come, em meia hora e sem fome, um pacote de pães doces e uma lata de leite condensado, escondendo as embalagens. Depois fica {calado|calada} e {envergonhado|envergonhada}. Isso vem de uns dois anos para cá. Nunca vomitou nem usou laxantes ou remédios para compensar.`,
        clues: [
          'A sós, admite que nessas tardes come até a barriga estufar e não consegue parar, mesmo prometendo a si mesm{o|a} que seria só um pedaço.',
          'Os episódios começaram depois de uma dieta rígida e, desde então, não falham uma semana; ganhou 20 kg nesse período.',
          'A glicose não controla mesmo com remédios, a cirurgia foi adiada e {ele|ela} vem perdendo clientes por fechar a loja mais cedo.',
          'Nos dias seguintes, come normalmente: não faz jejum, não aumenta as caminhadas e nunca tentou provocar vômito.',
        ],
        rulesOut: 'Nunca vomitou nem usou laxantes ou remédios para compensar.',
      },
    ],
  },
  {
    disorderId: 'avoidant_restrictive_food_intake_disorder',
    reference: {
      label: 'Manual MSD (Profissional) — Transtorno de ingestão de alimentos esquivo/restritivo (TIAER)',
      url: 'https://www.msdmanuals.com/pt/profissional/transtornos-psiqui%C3%A1tricos/transtornos-da-alimenta%C3%A7%C3%A3o-e-da-ingest%C3%A3o-de-alimentos/transtorno-de-ingest%C3%A3o-de-alimentos-esquivo-restritivo-tiaer',
    },
    differential: {
      disorderId: 'anorexia_nervosa',
      whyNot: 'Não há medo de engordar nem distorção da imagem corporal: a pessoa se incomoda com a magreza e gostaria de ganhar peso.',
    },
    explanation: 'Restrição alimentar por aversão a cheiros e texturas, por medo de engasgar ou por pouco interesse em comer, com consequências claras: perda de peso ou queda na curva de crescimento, falta de ferro, necessidade de suplemento e prejuízo na vida social. Não há falta de comida nem prática cultural, e exames normais afastam uma doença que explique a recusa. A pessoa quer ganhar peso e não teme engordar, o que afasta a Anorexia Nervosa. Desenvolvimento e convívio normais afastam um quadro do neurodesenvolvimento, e a restrição, com suas consequências nutricionais, é o centro do problema, não um medo isolado.',
    giveaways: [],
    variants: [
      {
        level: 'easy',
        ages: [7, 10],
        text: `{nome}, {idade} anos, é {levado|levada} pelos pais ao pediatra da UBS porque "come quase nada". Desde pequen{o|a}, aceita só arroz branco, macarrão sem molho, pão de forma, um biscoito de uma marca específica e leite. Diante de feijão, carne ou fruta, tem ânsia só com o cheiro ou a textura, e a família desistiu de insistir.

Nos últimos dois anos caiu da curva de peso e ficou abaixo do esperado para a idade; os exames mostraram falta de ferro, e os testes para doença celíaca e alergias vieram normais. Diz que quer crescer forte como o irmão e não se preocupa com a aparência do corpo. Tem boas notas, brinca de faz de conta com os colegas e aceita bem mudanças na rotina.`,
        clues: [
          'Separa os alimentos para que não se toquem no prato e vomita quando é {forçado|forçada} a engolir algo de textura diferente.',
          'A recusa vem desde a introdução dos alimentos sólidos e, ao contrário do que aconteceu com os primos, não melhorou com a idade.',
          'Não vai a aniversários nem dorme na casa de amigos por causa da comida, e a pediatra receitou suplemento nutricional.',
          'Pede para ganhar peso, fica feliz quando a balança sobe e nunca fala em dieta ou em ficar magr{o|a}.',
        ],
        rulesOut: 'não se preocupa com a aparência do corpo',
      },
      {
        level: 'medium',
        ages: [12, 15],
        text: `{nome}, {idade} anos, é {levado|levada} pela mãe ao ambulatório de adolescentes porque perdeu 6 kg em três meses. Tudo começou num churrasco de família, quando se engasgou com um pedaço de carne e precisou de ajuda para voltar a respirar. Desde então só aceita sopa batida, iogurte, purê e vitamina, e mastiga cada colherada muitas vezes.

Na escola, não lancha e espera chegar em casa para tomar a vitamina. Queixa-se de que as roupas ficaram largas e quer voltar ao peso de antes. A endoscopia e a avaliação da deglutição vieram normais. Não tem pesadelos nem fica relembrando a cena, e fora das refeições segue a rotina como antes.`,
        clues: [
          'Quando a família insiste em algo sólido, sente a garganta "fechar", cospe o bocado e só se acalma bebendo água.',
          'Antes do engasgo comia de tudo; a restrição começou no mesmo dia e foi aumentando nas semanas seguintes.',
          'A pediatra receitou suplemento nutricional, e {ele|ela} deixou de ir às festas da turma, onde sempre há comida sólida.',
          'Não conta calorias nem evita o que engorda: aceita milk-shake e doce de leite, desde que sejam pastosos.',
        ],
        rulesOut: 'quer voltar ao peso de antes',
      },
      {
        level: 'hard',
        ages: [28, 40],
        text: `{nome}, {idade} anos, técnic{o|a} de enfermagem, é {encaminhado|encaminhada} pela gastroenterologista, que investigou "estômago pequeno" e perda de 7 kg no último ano: endoscopia, ultrassom, tireoide e exame para doença celíaca vieram normais. Pesa 49 kg com 1,72 m e não usa medicamentos nem outras substâncias.

Conta que comer sempre foi "uma obrigação chata": esquece de almoçar nos plantões, sente-se {satisfeito|satisfeita} com poucas garfadas e perde a vontade de qualquer prato depois de algumas colheradas. Não consegue terminar a garrafa do suplemento. Gostaria de recuperar o peso, porque os colegas brincam que {ele|ela} "some no uniforme". O humor está bom, e segue {animado|animada} com o trabalho e as aulas de violão.`,
        clues: [
          'Passa o dia sem sentir fome, não lembra de comer se ninguém chama e acha a hora da refeição uma perda de tempo.',
          'Desde criança comia pouco e devagar; a perda de peso se acentuou no último ano, com uma escala de plantões mais puxada.',
          'Teve tontura em dois plantões, foi {afastado|afastada} por uma semana para recuperar peso e evita jantares com colegas porque não consegue acompanhar.',
          'Não conta calorias nem evita alimentos calóricos; incomoda-se com a magreza e comeria qualquer coisa que despertasse vontade.',
        ],
        rulesOut: 'Gostaria de recuperar o peso',
      },
    ],
  },
  {
    disorderId: 'pica',
    reference: {
      label: 'Manual MSD (Profissional) — Picafagia',
      url: 'https://www.msdmanuals.com/pt/profissional/transtornos-psiqui%C3%A1tricos/transtornos-da-alimenta%C3%A7%C3%A3o-e-da-ingest%C3%A3o-de-alimentos/picafagia',
    },
    differential: {
      disorderId: 'intellectual_developmental_disorder',
      whyNot: 'Aprende, conversa e cuida de si como esperado para a idade; sem prejuízo intelectual e adaptativo, esse diagnóstico não se sustenta, ainda que o comportamento seja comum nele.',
    },
    explanation: 'Ingestão persistente, por mais de um mês, de substâncias sem valor nutritivo que não são alimento (terra, reboco, giz, papel, tijolo), inadequada ao nível de desenvolvimento e sem apoio em costume familiar ou cultural. Falta de ferro, verminose, prisão de ventre e risco de obstrução são associações e complicações comuns. Na gestação, o comportamento só conta quando é grave o bastante para exigir atenção própria, como ao agravar uma anemia que não responde ao tratamento. Aprendizagem, linguagem e autonomia normais afastam o Transtorno do Desenvolvimento Intelectual, contexto em que esse comportamento é frequente.',
    giveaways: ['geofagia', 'pagofagia'],
    variants: [
      {
        level: 'easy',
        ages: [5, 8],
        text: `{nome}, {idade} anos, é {levado|levada} pela avó à UBS porque, há cerca de seis meses, come terra e pedaços do reboco da parede quase todos os dias. Raspa a parede do quintal com as unhas e esconde punhados de terra no bolso para comer na escola, mesmo levando bronca.

O exame de sangue mostrou anemia por falta de ferro, e o de fezes, verminose. Em casa não falta comida, e ninguém da família tem o costume de comer barro. {nome} conversa, brinca com os colegas e aprende como eles, e a professora diz que vai bem na turma.`,
        clues: [
          'Também já foi {visto|vista} mastigando giz e papel, e diz que gosta do gosto de terra molhada.',
          'No começo eram pitadas escondidas; hoje come terra várias vezes ao dia, apesar da vigilância da família.',
          'Teve dores de barriga e prisão de ventre, faltou à escola e precisa ser {vigiado|vigiada} o tempo todo no recreio.',
          'Reconhece letras e números como a turma, conta histórias com detalhes e já se veste e toma banho sem ajuda.',
        ],
        rulesOut: 'a professora diz que vai bem na turma',
      },
      {
        level: 'medium',
        ages: [17, 20],
        text: `{nome}, {idade} anos, alun{o|a} de cursinho pré-vestibular, chega à UBS com a mãe por dor de barriga e intestino preso. A mãe achou na mochila duas caixas de giz pela metade e folhas de caderno rasgadas em tirinhas. {Ele|Ela} admite que, há uns cinco meses, mastiga e engole giz e papel quase todos os dias, sobretudo enquanto estuda.

Sabe que não é comida, mas diz que sente "uma vontade danada" do gosto de pó. Não faz isso para emagrecer nem por fome: come bem nas refeições e não se preocupa com o peso. O exame de sangue mostrou ferro baixo. Foi bem no último simulado, tem amigos e nunca teve dificuldade para aprender.`,
        clues: [
          'Guarda pedaços de giz no estojo para os intervalos e sente uma vontade forte quando passa muito tempo sem mastigar.',
          'Começou com tirinhas de papel, passou ao giz em poucas semanas e, desde então, não fica um dia sem.',
          'Já faltou a aulas por cólica e evita estudar com os colegas para que não vejam o que come.',
          'Aprendeu a ler na idade esperada, nunca repetiu de ano e cuida {sozinho|sozinha} da rotina de estudos e do transporte.',
        ],
        rulesOut: 'nunca teve dificuldade para aprender',
      },
      {
        level: 'hard',
        ages: [20, 34],
        sex: 'f',
        text: `{nome}, {idade} anos, caixa de supermercado, está no sexto mês da primeira gestação e chega ao pré-natal da UBS com anemia que não melhora apesar do sulfato ferroso, além de intestino preso há semanas. Garante que toma o remédio direitinho, e a família confirma.

Só quando a enfermeira pergunta sobre desejos ela conta, envergonhada, que há dois meses raspa e come lascas de tijolo do muro de casa todos os dias, "pelo gosto de barro", e esconde isso do cônjuge. Ninguém na família ou na vizinhança tem esse costume. Concluiu o ensino médio e sempre aprendeu sem dificuldade.`,
        clues: [
          'Sente uma vontade intensa do cheiro de terra molhada e passou a comer também a terra dos vasos de plantas.',
          'Começou no quarto mês de gestação, com pequenas lascas, e hoje come várias por dia, mesmo depois de orientada.',
          'A obstetra teme obstrução intestinal e verminose, e ela deixou de receber visitas para que não vejam o muro raspado.',
          'Faz sozinha as contas do caixa e da casa, e nunca precisou de ajuda para estudar ou trabalhar.',
        ],
        rulesOut: 'Concluiu o ensino médio e sempre aprendeu sem dificuldade.',
      },
    ],
  },
  {
    disorderId: 'rumination_disorder',
    reference: {
      label: 'Manual MSD (Profissional) — Transtorno de ruminação',
      url: 'https://www.msdmanuals.com/pt/profissional/transtornos-psiqui%C3%A1tricos/transtornos-da-alimenta%C3%A7%C3%A3o-e-da-ingest%C3%A3o-de-alimentos/transtorno-de-rumina%C3%A7%C3%A3o',
    },
    differential: {
      disorderId: 'bulimia_nervosa',
      whyNot: 'A comida volta sozinha, sem náusea e sem ser provocada, depois de refeições comuns; não há episódios de comer em excesso nem preocupação com o peso.',
    },
    explanation: 'Regurgitação repetida, há mais de um mês, de comida recém-ingerida, sem náusea nem esforço, remastigada, engolida de novo ou cuspida. Endoscopia, pHmetria ou manometria normais e a falta de resposta ao remédio para refluxo afastam uma causa gastrointestinal. Não há episódios de comer em excesso, vômito provocado nem preocupação com o peso, o que afasta a Bulimia Nervosa e a Anorexia Nervosa; a perda de peso vem da comida cuspida e das refeições evitadas por vergonha.',
    giveaways: ['regurgit'],
    variants: [
      {
        level: 'easy',
        ages: [13, 17],
        text: `{nome}, {idade} anos, chega ao ambulatório com a mãe porque, há cinco meses, regurgita a comida depois de quase todas as refeições. Uns dez minutos após comer, sem enjoo e sem esforço, volta à boca um bocado com o gosto do que acabou de comer; {ele|ela} mastiga de novo e engole, ou cospe discretamente no guardanapo.

A endoscopia, a pHmetria e os exames de sangue vieram normais, e o remédio para refluxo não ajudou. Perdeu 4 kg e passou a lanchar {sozinho|sozinha} no intervalo da escola. Não provoca vômito, não come em excesso e quer recuperar o peso perdido.`,
        clues: [
          'Antes de a comida voltar, sente uma pressão na barriga; isso nunca acontece durante o sono nem em jejum.',
          'Começou depois de uma virose com vômitos e, desde então, acontece todos os dias, sem melhora.',
          'Deixou de ir a aniversários, tem vergonha de comer na frente dos amigos e perdeu aulas por consultas e exames.',
          'Come porções normais, sem episódios de exagero, e não usa laxantes nem faz jejum para controlar o peso.',
        ],
        rulesOut: 'Não provoca vômito, não come em excesso',
      },
      {
        level: 'medium',
        ages: [25, 40],
        text: `{nome}, {idade} anos, {advogado|advogada}, procura a psicóloga por indicação do gastroenterologista. Há uns oito meses, minutos depois de comer, sente a comida "subir de volta" sem esforço e sem náusea; disfarça mastigando de novo, de boca fechada, ou vai ao banheiro cuspir. Para não ser {visto|vista}, passou a almoçar {sozinho|sozinha} na sala e anda sempre com lenços de papel.

Endoscopia e manometria vieram normais, e dois meses de remédio para refluxo não mudaram nada. Perdeu 5 kg sem querer e gostaria de recuperá-los. Come porções normais, nunca provocou vômito e não faz dieta.`,
        clues: [
          'O que volta tem o gosto da comida recém-engolida, não é azedo e nunca acontece durante o sono.',
          'Começou sem motivo claro e, há meses, acontece depois de quase todas as refeições, todos os dias.',
          'Recusa almoços com clientes e já pulou refeições antes de audiências para não passar vergonha diante do juiz.',
          'Não tem episódios de comer em grande quantidade, não usa laxantes e se incomoda com o peso perdido.',
        ],
        rulesOut: 'Come porções normais, nunca provocou vômito',
      },
      {
        level: 'hard',
        ages: [58, 72],
        text: `{nome}, {idade} anos, {aposentado|aposentada}, é {encaminhado|encaminhada} pela gastroenterologia depois de uma investigação de câncer de estômago por "vômitos" e perda de 6 kg em quatro meses. Endoscopia, tomografia, raio X contrastado e manometria do esôfago vieram normais, e o remédio para o estômago em dose dobrada não ajudou.

O cônjuge descreve o que vê à mesa: poucos minutos depois de comer, {nome} fica com as bochechas cheias, mastiga de novo, sem ânsia nem cara de enjoo, e engole. Quando há visitas, levanta e vai ao banheiro. Nada volta durante a noite, não come em excesso e se preocupa por estar perdendo peso.`,
        clues: [
          'Conta que a comida "sobe sozinha", com o gosto do que acabou de comer, e para de subir quando fica azeda.',
          'Começou há cerca de quatro meses, depois de uma gripe com muita tosse, e acontece depois de quase todas as refeições.',
          'Deixou de almoçar com os netos aos domingos e de ir às festas da igreja por vergonha de ser {visto|vista} mastigando.',
          'Nunca provocou vômito, não tem episódios de exagero alimentar e nunca se preocupou com o peso ou a forma do corpo.',
        ],
        rulesOut: 'não come em excesso e se preocupa por estar perdendo peso',
      },
    ],
  },
]
