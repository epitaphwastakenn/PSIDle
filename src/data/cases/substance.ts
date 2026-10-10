import type { DisorderCaseSet } from './types'

export const substanceCases: DisorderCaseSet[] = [
  {
    disorderId: 'sedative_hypnotic_use_disorder',
    reference: {
      label: 'Manual MSD (Profissional) — Sedativos',
      url: 'https://www.msdmanuals.com/pt/profissional/t%C3%B3picos-especiais/drogas-recreativas-e-intoxicantes/ansiol%C3%ADticos-e-sedativos',
    },
    differential: {
      disorderId: 'aud',
      whyNot: 'Os sinais de intoxicação aparecem sem consumo de bebida alcoólica e acompanham as doses dos comprimidos.',
    },
    explanation: 'Uso de medicamento sedativo em doses crescentes e fora da prescrição, obtido de várias fontes, com tentativas frustradas de parar, desejo intenso, abstinência (tremor, suor, insônia), abandono de atividades e riscos como quedas e acidentes, por mais de 12 meses. Tolerância e abstinência isoladas não bastariam se o uso seguisse a prescrição. A ausência de bebida alcoólica e a relação com os horários das doses afastam o Transtorno por Uso de Álcool e um quadro neurocognitivo.',
    giveaways: ['clonazepam', 'diazepam', 'alprazolam', 'lorazepam', 'bromazepam', 'zolpidem', 'benzodiazep', 'sedativ', 'hipnotic', 'ansiolitic', 'rivotril'],
    variants: [
      {
        level: 'easy',
        ages: [35, 60],
        text: `{nome}, {idade} anos, procura o CAPS AD porque não consegue mais ficar sem o clonazepam. Começou com meio comprimido à noite, receitado há cinco anos numa fase de insônia, e hoje toma três a quatro por dia, inclusive de manhã. Quando a caixa acaba antes da hora, consegue receitas com médicos diferentes.

Já tentou reduzir duas vezes e desistiu por tremor, suor e irritação. Faltou ao trabalho por sonolência e bateu o carro no mês passado. Sabe que está prejudicando a família, mas continua tomando. Não bebe álcool nem usa outras drogas.`,
        clues: [
          'Sente uma vontade intensa de tomar uma dose extra sempre que tem um dia difícil.',
          'O uso foi aumentando ao longo dos anos; há mais de um ano toma doses durante o dia, não só à noite.',
          'Deixou de dirigir e de ir às reuniões da escola dos filhos com receio de cochilar.',
          'A sonolência e a fala lenta acompanham os comprimidos e aparecem sem nenhum consumo de bebida.',
        ],
        rulesOut: 'Não bebe álcool nem usa outras drogas.',
      },
      {
        level: 'medium',
        ages: [45, 70],
        text: `{nome}, {idade} anos, é {levado|levada} pelo filho ao pronto-atendimento após uma queda em casa. Estava {sonolento|sonolenta}, com a fala arrastada e passos desequilibrados, mas sem cheiro de bebida, e o teste de álcool no sangue deu negativo.

Em casa, o filho achou cartelas de comprimidos para dormir em três gavetas, com receitas de dois médicos diferentes. Há mais de um ano {ele|ela} toma várias doses ao longo do dia, deixou de ir aos encontros da igreja e fica {trêmulo|trêmula} e {irritadiço|irritadiça} quando atrasa a próxima. Já prometeu parar "quando a vida acalmar".`,
        clues: [
          'Conta que sente uma vontade forte de tomar mais um comprimido sempre que algo sai do planejado.',
          'Começou com uma dose à noite, receitada há anos, e foi aumentando até tomar também de manhã e à tarde.',
          'Perdeu prazos no trabalho e se afastou dos amigos para não precisar sair de casa sem os comprimidos.',
          'Nunca bebe; a fala arrastada e o desequilíbrio aparecem nas horas seguintes às doses.',
        ],
        rulesOut: 'o teste de álcool no sangue deu negativo',
      },
      {
        level: 'hard',
        ages: [58, 78],
        text: `{nome}, {idade} anos, chega à consulta de memória com a irmã, que se preocupa com os esquecimentos dos últimos meses: à tarde, {ele|ela} repete perguntas e já deixou o fogão aceso duas vezes. De manhã, porém, conversa bem, lembra dos compromissos e faz as contas da casa.

A irmã descobriu que os "remédios dos nervos" que {nome} toma desde que ficou {viúvo|viúva}, há seis anos, hoje vêm de receitas antigas e de um conhecido da farmácia. Toma vários ao longo do dia. Já tentou parar, mas nos dias sem eles treme, sua e passa a noite em claro. Não bebe.`,
        clues: [
          'Nos fins de tarde, depois das doses do dia, fica {sonolento|sonolenta} e com a fala mais lenta.',
          'Começou com uma dose à noite e foi aumentando ao longo dos anos, até tomar também de manhã e à tarde.',
          'Parou de dirigir e entregou as contas à irmã depois de dois pequenos acidentes em casa.',
          'Os testes de memória feitos de manhã, antes da primeira dose, vieram normais.',
        ],
        rulesOut: 'Não bebe.',
      },
    ],
  },
  {
    disorderId: 'aud',
    reference: {
      label: 'Manual MSD (Profissional) — Transtorno por uso de álcool e reabilitação',
      url: 'https://www.msdmanuals.com/pt/profissional/t%C3%B3picos-especiais/drogas-il%C3%ADcitas-e-intoxicantes/transtorno-por-uso-de-%C3%A1lcool-e-reabilita%C3%A7%C3%A3o',
    },
    differential: {
      disorderId: 'sedative_hypnotic_use_disorder',
      whyNot: 'Não há calmantes nem remédios para dormir; a intoxicação, o hálito, o tremor matinal aliviado pelo primeiro gole e as alterações do fígado apontam para o álcool.',
    },
    explanation: 'Consumo de álcool maior e mais longo que o pretendido, tentativas frustradas de parar, desejo intenso, tolerância, abstinência (tremor e suor matinais aliviados pela bebida), faltas e perdas no trabalho, abandono de atividades, uso em situações de risco, como dirigir, e manutenção apesar do dano ao fígado, há mais de 12 meses: bem mais que 2 dos 11 critérios do DSM-5-TR. Não há calmantes ou remédios para dormir, o que afasta o Transtorno por Uso de Sedativos/Hipnóticos. Quedas, pressão alta e sono ruim, quando aparecem, são consequências da bebida, e não quadros independentes.',
    giveaways: ['alcool', 'cerveja', 'cachac', 'pinga', 'pinguc', 'aguardente', 'vinho', 'vodka', 'vodca', 'whisky', 'uisque', 'conhaque', 'tequila', 'licor', 'destilad', 'caipirinha', 'chope', 'chopp', 'etanol', 'etilic', 'etilism', 'embriag', 'bebad', 'bebum', 'porre', 'birita', 'manguac', 'cerva', 'breja', 'drink', 'drinque'],
    variants: [
      {
        level: 'easy',
        ages: [38, 55],
        text: `{nome}, {idade} anos, eletricista, chega ao CAPS AD {levado|levada} pelo cônjuge depois de ser {demitido|demitida}. Bebe desde a juventude, mas há três anos toma cerveja todos os dias depois do expediente e cachaça nos fins de semana; hoje precisa de quase o dobro para sentir o mesmo efeito. Promete "só duas" e só para quando o bar fecha.

Ao acordar, as mãos tremem e o suor escorre até a primeira dose. Já tentou parar três vezes e não passou do quarto dia. Foi {pego|pega} numa blitz da Lei Seca, e o médico avisou que o fígado está alterado, mas continua bebendo. Não toma calmantes nem remédios para dormir e não usa outras drogas.`,
        clues: [
          'No fim da tarde sente uma vontade forte de beber e já saiu mais cedo do serviço para chegar ao bar.',
          'O consumo começou em encontros com amigos, por volta dos 18 anos, e foi aumentando; o padrão diário se mantém há mais de três anos.',
          'Faltava às segundas-feiras por ressaca, deixou o futebol de domingo e as brigas em casa ficaram frequentes.',
          'O tremor e o suor aparecem nas manhãs sem bebida e passam com ela; não há comprimidos para dormir ou calmantes em casa.',
        ],
        rulesOut: 'Não toma calmantes nem remédios para dormir',
      },
      {
        level: 'medium',
        ages: [30, 48],
        text: `{nome}, {idade} anos, corretor{|a} de imóveis, é {encaminhado|encaminhada} pelo médico do trabalho depois de bater o carro da empresa numa sexta à noite e se recusar a soprar o bafômetro. Os colegas contam que {ele|ela} chega às segundas com os olhos inchados, mascando bala de menta, e que some do plantão de vendas "para resolver um assunto" no boteco da esquina.

A família achou garrafas vazias atrás das caixas da lavanderia. Há mais de um ano promete "maneirar", mas cada saideira vira a noite inteira. De manhã, as mãos só param de tremer depois do primeiro gole. Os exames do fígado vieram alterados. Não usa remédios para dormir nem calmantes.`,
        clues: [
          'No fim da tarde, fica {inquieto|inquieta} e {irritado|irritada}, contando os minutos para sair do trabalho.',
          'Começou a sair "para relaxar" depois de uma promoção, há uns quatro anos; desde o ano passado não passa um dia sem.',
          'Perdeu duas vendas grandes por faltar a visitas marcadas e deixou de ir aos almoços de família aos domingos.',
          'A fala enrolada e o desequilíbrio aparecem à noite, com hálito de bebida, sem nenhum comprimido ou outra droga envolvida.',
        ],
        rulesOut: 'Não usa remédios para dormir nem calmantes.',
      },
      {
        level: 'hard',
        ages: [60, 74],
        text: `{nome}, {idade} anos, {aposentado|aposentada} há dois anos, vem à UBS porque a pressão "não baixa com remédio nenhum" e porque dorme mal. No mês passado, caiu no quintal e quebrou duas costelas. Nos exames, as enzimas do fígado estão altas e os glóbulos vermelhos, maiores que o normal.

A filha conta que, desde a aposentadoria, {nome} passa as tardes no quartinho dos fundos "consertando coisas" e volta com bala de menta na boca. Lá dentro, há garrafas vazias escondidas atrás do armário de ferramentas. Pela manhã, fica {trêmulo|trêmula} e {suado|suada} até passar meia hora no quartinho. Já jurou parar duas vezes. O único remédio que toma é o da pressão.`,
        clues: [
          'Fica {inquieto|inquieta} e {irritado|irritada} quando passa o dia fora de casa e pede para voltar antes do fim da tarde.',
          'As tardes no quartinho começaram logo após a aposentadoria e se estenderam ao longo de dois anos; hoje começam antes do almoço.',
          'Abandonou a caminhada com os amigos e já não busca os netos na escola; a queda aconteceu numa dessas tardes.',
          'O tremor matinal some depois do quartinho, sem nenhum comprimido; não usa calmantes nem remédios para dormir.',
        ],
        rulesOut: 'O único remédio que toma é o da pressão.',
      },
    ],
  },
  {
    disorderId: 'cannabis_use_disorder',
    reference: {
      label: 'Manual MSD (Profissional) — Canábis (maconha)',
      url: 'https://www.msdmanuals.com/pt/profissional/t%C3%B3picos-especiais/drogas-il%C3%ADcitas-e-intoxicantes/can%C3%A1bis-maconha',
    },
    differential: {
      disorderId: 'tobacco_use_disorder',
      whyNot: 'Não há uso de tabaco: o que é fumado causa olhos vermelhos, lentidão, riso fácil e fome, efeitos de intoxicação que a nicotina não produz.',
    },
    explanation: 'Uso de cannabis por mais de 12 meses, em quantidade crescente (tolerância), com tentativas frustradas de parar, desejo intenso, abstinência (irritação, insônia, perda de apetite), queda no rendimento, abandono de atividades e manutenção apesar de prejuízos físicos, como os vômitos cíclicos aliviados por banho quente, típicos da hiperêmese canabinoide: bem mais que 2 dos 11 critérios do DSM-5-TR. Não há tabaco, e cada uso causa olhos vermelhos, lentidão e fome, o que afasta o Transtorno por Uso de Tabaco. Quando há vômitos, eles não são provocados nem ligados a preocupação com o peso.',
    giveaways: ['maconh', 'cannabis', 'canab', 'canhamo', 'marijuana', 'maria joana', 'baseado', 'beck', 'erva', 'verdinha', 'skunk', 'haxixe', 'ganja', 'thc', 'cbd', 'bong', 'prensado', 'dichavad', 'larica'],
    variants: [
      {
        level: 'easy',
        ages: [20, 26],
        text: `{nome}, {idade} anos, estudante de Educação Física, procura a UBS do bairro porque "não consegue mais ficar sem a maconha". Começou a fumar com amigos aos 16, só em festas; hoje acende o primeiro baseado ao acordar e fuma cinco ou seis por dia, porque um só "já não faz nada".

Tentou parar duas vezes antes das provas: ficou {irritado|irritada}, sem fome e sem dormir por quase uma semana, e voltou. Trancou duas matérias, perdeu o estágio e largou o time de vôlei. Gasta quase toda a bolsa com a droga. Não fuma cigarro comum, não bebe e nunca ficou {desconfiado|desconfiada} ou ouviu vozes.`,
        clues: [
          'Pensa no próximo uso durante as aulas e sai do campus nos intervalos para fumar.',
          'Passou das festas para todos os fins de semana aos 17; o uso diário começou há mais de dois anos.',
          'Quase não sai do quarto da república, deixou de visitar a família e perdeu amizades fora do grupo de uso.',
          'Depois de fumar, fica com os olhos vermelhos, fome e lentidão; não usa cigarro industrializado nem outros produtos de tabaco.',
        ],
        rulesOut: 'Não fuma cigarro comum',
      },
      {
        level: 'medium',
        ages: [16, 17],
        text: `{nome}, {idade} anos, é {levado|levada} pelos pais à UBS porque as notas despencaram neste ano. A mãe achou na mochila sedas, um isqueiro e um potinho com folhas e flores secas de cheiro forte. {Ele|Ela} volta do "rolê" com os olhos vermelhos, rindo à toa, e esvazia a geladeira de madrugada.

Há mais de um ano usa quase todos os dias, inclusive antes da aula, e gasta a mesada e o dinheiro do lanche com isso. Quando os pais cortaram o dinheiro, passou dias {irritado|irritada}, sem apetite e sem dormir, até conseguir de novo. Largou o handebol. Não fuma cigarros comuns, e o humor é bom entre os usos.`,
        clues: [
          'Diz que precisa "dar um tapa" para conseguir dormir e que pensa nisso desde a hora em que acorda.',
          'Experimentou aos 14 numa festa, passou a usar nos fins de semana e, há pouco mais de um ano, todos os dias.',
          'Era {um aluno atento|uma aluna atenta} até o ano passado; agora falta às provas e se afastou dos amigos de infância.',
          'Não há cigarro industrializado nem cheiro de tabaco em casa, e não bebe; cada uso traz olhos vermelhos, riso fácil e fome.',
        ],
        rulesOut: 'Não fuma cigarros comuns',
      },
      {
        level: 'hard',
        ages: [26, 38],
        text: `{nome}, {idade} anos, operador{|a} de telemarketing, chega ao pronto-socorro pela quarta vez no ano com vômitos sem parar e dor na barriga. Endoscopia, ultrassom e exames de sangue vieram normais. Entre as crises, come bem, não provoca vômitos e não se preocupa com o peso. Conta que só encontra alívio em banhos muito quentes, de quase uma hora.

O cônjuge relata que, há oito anos, {ele|ela} fuma "para relaxar" do fim do expediente até dormir, e cada vez mais. Os olhos vivem vermelhos. Quando tenta ficar sem, passa noites em claro e explode por nada. Um médico já relacionou as crises ao hábito, mas {ele|ela} não conseguiu parar. Não usa cigarro comum.`,
        clues: [
          'Fora das crises, depois de fumar, fica {lento|lenta}, {risonho|risonha} e com uma fome fora do comum.',
          'As crises de vômito começaram há dois anos, quando passou a fumar também antes do trabalho, e voltam a cada poucos meses.',
          'Já perdeu um emprego por faltas nas crises e deixou de jogar bola com os amigos aos sábados.',
          'Não usa cigarro industrializado nem bebe; o que fuma é enrolado à mão com flores secas compradas de um conhecido.',
        ],
        rulesOut: 'Não usa cigarro comum.',
      },
    ],
  },
  {
    disorderId: 'stimulant_use_disorder',
    reference: {
      label: 'Manual MSD (Profissional) — Cocaína',
      url: 'https://www.msdmanuals.com/pt/profissional/t%C3%B3picos-especiais/drogas-il%C3%ADcitas-e-intoxicantes/coca%C3%ADna',
    },
    differential: {
      disorderId: 'bipolar_1',
      whyNot: 'A energia, a euforia e a falta de sono só aparecem durante o uso e somem quando ele acaba; nunca houve fase de euforia sem a substância.',
    },
    explanation: 'Uso de estimulante (cocaína aspirada ou fumada como crack, ou comprimidos anfetamínicos sem receita) em quantidade e frequência crescentes, com tolerância, abstinência (sono prolongado, fome e desânimo depois do uso), desejo intenso, tentativas frustradas de parar, gastos e perdas no trabalho e manutenção apesar de riscos, como acidentes e dor no peito, há mais de 12 meses: vários dos 11 critérios do DSM-5-TR. Euforia, energia e falta de sono só aparecem sob efeito da droga e somem fora dela, o que afasta um episódio maníaco do Transtorno Bipolar Tipo I.',
    giveaways: ['cocain', 'crack', 'pedra', 'merla', 'farinha', 'anfetamin', 'rebite', 'bolinha', 'speed', 'ecstasy', 'mdma', 'metilfenidato', 'ritalina', 'venvanse', 'femproporex', 'anfepramona', 'mazindol', 'estimulante', 'cristal'],
    variants: [
      {
        level: 'easy',
        ages: [26, 40],
        text: `{nome}, {idade} anos, chega ao CAPS AD {trazido|trazida} pela mãe, que já não sabe o que fazer. Começou com cocaína aspirada nas festas aos 20; há três anos passou para o crack. Hoje fuma pedra atrás de pedra por dois ou três dias, quase sem comer ou dormir, até o dinheiro acabar.

Depois, dorme quase um dia inteiro, acorda com fome e {desanimado|desanimada}, e a vontade de voltar é "mais forte do que tudo". Vendeu o celular e a TV de casa, perdeu o emprego de motorista e já tentou parar quatro vezes. Sem a droga, nunca teve fases de euforia ou de pouco sono. Não bebe e não usa outras drogas.`,
        clues: [
          'Cada tragada dá um prazer intenso que dura poucos minutos, seguido de uma vontade imediata de usar de novo.',
          'O uso de fim de semana virou diário há cerca de três anos, e no último ano os episódios ficaram mais longos.',
          'Afastou-se dos filhos, acumula dívidas com vizinhos e parentes e deixou de frequentar a igreja da família.',
          'A agitação e a falta de sono só aparecem nos dias de uso; nas semanas sem a droga, dorme e se comporta como sempre.',
        ],
        rulesOut: 'Sem a droga, nunca teve fases de euforia ou de pouco sono.',
      },
      {
        level: 'medium',
        ages: [35, 55],
        text: `{nome}, {idade} anos, caminhoneir{o|a}, é {atendido|atendida} numa UPA à beira da rodovia com o coração disparado, depois de quase tombar a carreta. Admite que toma comprimidos comprados sem receita em postos de estrada "para aguentar a madrugada". No início, um bastava para a viagem inteira; hoje engole quatro ou cinco por turno.

Há uns dois anos não consegue dirigir sem eles, e passou a tomá-los também nas folgas, para "dar conta da casa". Perdeu oito quilos. Quando para, dorme quase dois dias e acorda com uma fome enorme e sem ânimo para nada. Nas férias, sem os comprimidos, o sono e o humor são normais.`,
        clues: [
          'Sob efeito, fala sem parar, range os dentes e passa horas sem sentir fome nem cansaço.',
          'Começou há cinco anos, só nas viagens longas; nos últimos dois anos o uso ficou diário.',
          'Recebeu duas advertências da transportadora por atrasos e já não participa dos almoços de domingo com a família.',
          'Nunca teve fases de euforia ou noites em claro sem os comprimidos; não bebe e não usa outras drogas.',
        ],
        rulesOut: 'Nas férias, sem os comprimidos, o sono e o humor são normais.',
      },
      {
        level: 'hard',
        ages: [28, 45],
        text: `{nome}, {idade} anos, advogad{o|a}, chega ao pronto-socorro numa segunda de madrugada com dor no peito e o coração acelerado. Não fuma, pratica esportes e os exames do coração do ano passado eram normais. As pupilas estão dilatadas, e o nariz sangra com frequência há meses; o otorrino notou uma ferida no septo.

O cônjuge conta que {ele|ela} passa os fins de semana em festas, vai ao banheiro a cada meia hora e volta falando sem parar. Gastou R$ 40 mil em um ano, promete parar a cada segunda-feira e, às terças, dorme até tarde e falta ao escritório. Fora das festas, sempre teve sono e humor estáveis.`,
        clues: [
          'No domingo à noite, sente uma vontade enorme de continuar e liga para o fornecedor mesmo depois de prometer parar.',
          'Começou nas festas da faculdade, de vez em quando; há pouco mais de um ano passou a usar todo fim de semana, em quantidade crescente.',
          'Perdeu um cliente importante por faltar a uma audiência e voltou às festas uma semana depois de outra dor no peito.',
          'Nas férias com a família, sem festas, dorme bem e fica {tranquilo|tranquila}; nas festas, bebe pouco e não usa outras drogas.',
        ],
        rulesOut: 'Fora das festas, sempre teve sono e humor estáveis.',
      },
    ],
  },
  {
    disorderId: 'opioid_use_disorder',
    reference: {
      label: 'Manual MSD (Profissional) — Transtorno do uso de opioides e reabilitação',
      url: 'https://www.msdmanuals.com/pt/profissional/t%C3%B3picos-especiais/drogas-il%C3%ADcitas-e-intoxicantes/transtorno-do-uso-de-opioides-e-reabilita%C3%A7%C3%A3o',
    },
    differential: {
      disorderId: 'sedative_hypnotic_use_disorder',
      whyNot: 'O remédio é um analgésico potente, e a falta dele causa bocejos, coriza, arrepios, diarreia e dores no corpo, abstinência de opioide, sem calmantes ou remédios para dormir.',
    },
    explanation: 'Uso de opioide (tramadol ou analgésicos potentes) acima da dose e do tempo receitados, com tolerância, abstinência típica (bocejos, coriza, lacrimejamento, arrepios, diarreia, cólicas e dores no corpo) aliviada por nova dose, desejo intenso, tentativas frustradas de reduzir, tempo gasto para conseguir o remédio e prejuízos no trabalho e na família, por mais de 12 meses. Como o uso já não segue a prescrição, tolerância e abstinência contam entre os 11 critérios do DSM-5-TR. Não há calmantes ou remédios para dormir, e a abstinência é própria de opioide, o que afasta o Transtorno por Uso de Sedativos/Hipnóticos.',
    giveaways: ['opio', 'opiac', 'tramadol', 'tramal', 'ultracet', 'codein', 'tylex', 'morfin', 'dimorf', 'fentanil', 'durogesic', 'oxicodon', 'oxycontin', 'metadon', 'buprenorfin', 'heroin', 'petidin', 'meperidin', 'dolantina', 'nalbufin', 'naloxon', 'naltrexon', 'narcotic', 'entorpecente'],
    variants: [
      {
        level: 'easy',
        ages: [35, 55],
        text: `{nome}, {idade} anos, auxiliar de logística, procura a UBS porque "não vive mais sem o tramadol". O opioide foi receitado há três anos, depois de uma cirurgia na coluna; a dor melhorou, mas {ele|ela} passou de dois para oito comprimidos por dia, consegue receitas com médicos diferentes e compra o que falta pela internet.

Quando atrasa a dose, boceja sem parar, o nariz escorre, os pelos se arrepiam, tem diarreia e dor no corpo inteiro, e tudo melhora menos de uma hora depois de um novo comprimido. Já tentou reduzir três vezes. Foi {advertido|advertida} no trabalho por cochilar no galpão. Não usa calmantes nem remédios para dormir e não bebe.`,
        clues: [
          'Conta os comprimidos o dia todo e sente uma vontade intensa de tomar mais um quando algo dá errado.',
          'Nos primeiros meses tomava conforme a receita; o aumento começou no fim do primeiro ano e se mantém há mais de dois anos.',
          'Gasta boa parte do salário com consultas e comprimidos, deixou a pescaria com os irmãos e discute com a família por causa das receitas.',
          'A falta do remédio traz bocejos, coriza, arrepios e diarreia, que passam com ele; nenhum calmante ou remédio para dormir está envolvido.',
        ],
        rulesOut: 'Não usa calmantes nem remédios para dormir',
      },
      {
        level: 'medium',
        ages: [26, 45],
        text: `{nome}, {idade} anos, técnic{o|a} de enfermagem do centro cirúrgico, chega ao CAPS AD {afastado|afastada} do trabalho depois que a farmácia do hospital notou ampolas faltando nos seus plantões. Os colegas já tinham notado que {ele|ela} cochilava no meio das frases, com as pupilas pequenas como cabeça de alfinete, e havia marcas de agulha no seu braço.

Na consulta, admite que há mais de um ano aplica em si {mesmo|mesma} o analgésico potente usado após as grandes cirurgias, em doses cada vez maiores. Nas folgas, longe do hospital, o nariz escorre, boceja, sente cólicas e arrepios e não dorme; já trocou plantões para não ficar sem. Nunca mexeu nos sedativos do mesmo armário.`,
        clues: [
          'Depois de cada aplicação, sente coceira no rosto e fica com o intestino preso por dias.',
          'Começou há cerca de um ano e meio com uma ampola por plantão; hoje são quatro ou cinco, e passou a levar algumas para casa.',
          'Dobrava plantões só para ter acesso ao armário e deixou de buscar o filho na escola nos dias de folga.',
          'O sono pesado vem com pupilas pequenas, e a falta traz bocejos e coriza; não usa calmantes, remédios para dormir nem bebida.',
        ],
        rulesOut: 'Nunca mexeu nos sedativos do mesmo armário.',
      },
      {
        level: 'hard',
        ages: [45, 65],
        text: `{nome}, {idade} anos, costureir{o|a}, volta à UBS pela quinta vez em seis meses com o que chama de "virose": diarreia, cólicas, nariz escorrendo, olhos lacrimejando, bocejos e dor no corpo. Os exames de fezes e de sangue vieram normais. A agente comunitária observa que as crises começam sempre perto do fim do mês.

A filha explica: desde a cirurgia do joelho, há dois anos, {ele|ela} toma um remédio "forte para dor", receitado na época por algumas semanas. Hoje compra cartelas com receitas de três médicos e toma várias por dia; quando acabam, a "virose" aparece e some uma hora depois da próxima dose. Não toma remédios para dormir nem calmantes.`,
        clues: [
          'Nos dias bons, fica {sonolento|sonolenta}, com as pupilas bem pequenas e o intestino preso.',
          'Nas primeiras semanas após a cirurgia seguiu a receita; o aumento começou quando o joelho já tinha melhorado e dura mais de um ano.',
          'Atrasa as encomendas de costura, perdeu clientes antigos e já pegou dinheiro escondido da família para comprar as cartelas.',
          'A "virose" aparece quando o analgésico acaba e some com ele; não há calmantes nem bebida na rotina.',
        ],
        rulesOut: 'Não toma remédios para dormir nem calmantes.',
      },
    ],
  },
  {
    disorderId: 'tobacco_use_disorder',
    reference: {
      label: 'Manual MSD (Profissional) — Tabagismo e outros usos do tabaco',
      url: 'https://www.msdmanuals.com/pt/profissional/t%C3%B3picos-especiais/tabagismo/tabagismo-e-outros-usos-do-tabaco',
    },
    differential: {
      disorderId: 'cannabis_use_disorder',
      whyNot: 'Não há uso de maconha: as tragadas não causam olhos vermelhos, lentidão ou fome; o que domina é a necessidade de nicotina ao longo do dia e a abstinência quando falta.',
    },
    explanation: 'Uso de nicotina (cigarro ou cigarro eletrônico) em quantidade crescente, com desejo intenso logo ao acordar, tentativas frustradas de parar, tolerância, abstinência (irritação, inquietação, fome, dificuldade de concentração e insônia), abandono de atividades, uso em situação de risco, como fumar perto do oxigênio, e manutenção apesar de doença pulmonar, por mais de 12 meses: bem mais que 2 dos 11 critérios do DSM-5-TR. O uso não provoca intoxicação, com olhos vermelhos, lentidão ou fome, o que afasta o Transtorno por Uso de Cannabis.',
    giveaways: ['tabac', 'tabag', 'nicotin', 'cigarr', 'fumante', 'vape', 'e-cig', 'narguil', 'charuto', 'cachimbo', 'palheiro', 'fumo de rolo', 'marlboro', 'juul', 'ignite'],
    variants: [
      {
        level: 'easy',
        ages: [45, 62],
        text: `{nome}, {idade} anos, motorista de ônibus, procura o grupo de tabagismo da UBS depois que uma radiografia mostrou o pulmão "de fumante". Fuma desde os 14 anos; hoje são dois maços de cigarro por dia, e o primeiro vem antes de sair da cama. No almoço de família, levanta várias vezes para fumar na calçada.

Já tentou parar quatro vezes, com adesivo e por conta própria: em poucas horas fica {irritado|irritada}, {inquieto|inquieta}, com fome e sem concentração, e volta antes do fim da semana. Mesmo com tosse todas as manhãs, não consegue ficar sem. Não usa maconha nem outras drogas e bebe só em festas.`,
        clues: [
          'Depois do café e das refeições, a vontade de fumar fica tão forte que interrompe o que estiver fazendo.',
          'Começou com poucos por dia na adolescência; a quantidade subiu ao longo dos anos e está nesse nível há mais de uma década.',
          'Recebeu advertência por parar o ônibus para fumar no ponto final e deixou o futebol por falta de fôlego.',
          'Fumar não {o|a} deixa {alterado|alterada}: não há olhos vermelhos, lentidão ou fome fora de hora depois de cada um.',
        ],
        rulesOut: 'Não usa maconha nem outras drogas',
      },
      {
        level: 'medium',
        ages: [18, 24],
        text: `{nome}, {idade} anos, estudante de Direito, procura o ambulatório da faculdade porque "não aguenta uma aula inteira". Leva no bolso um aparelhinho recarregável, do tamanho de um pen drive, com sabor de menta, e dá tragadas a cada poucos minutos, até {escondido|escondida} no banheiro e de madrugada, quando acorda só para isso.

Começou há dois anos, em festas; hoje o refil que durava uma semana acaba em dois dias. Quando a bateria morre, fica {irritado|irritada}, {inquieto|inquieta} e não consegue se concentrar. Tentou largar três vezes. As tragadas não mudam a fala nem o comportamento, sem olhos vermelhos ou fome fora de hora.`,
        clues: [
          'A primeira tragada do dia vem antes de sair da cama, e a vontade volta forte depois de cada refeição.',
          'Sempre se concentrou bem nas aulas; o uso, que era só em festas, ficou diário há pouco mais de um ano.',
          'Saiu de duas provas para usar no banheiro, largou a natação por falta de fôlego e gasta quase toda a mesada com refis.',
          'Usar não muda o raciocínio nem o apetite; o mal-estar aparece quando fica sem, nunca depois das tragadas. Não bebe nem usa outras drogas.',
        ],
        rulesOut: 'sem olhos vermelhos ou fome fora de hora',
      },
      {
        level: 'hard',
        ages: [62, 80],
        text: `{nome}, {idade} anos, chega ao pronto-socorro com queimaduras no rosto e nas mãos e diz que foi uma faísca do fogão. Tem doença pulmonar crônica e usa oxigênio em casa há um ano; o pneumologista avisou sobre o risco de fogo perto do cateter.

A filha conta outra história: os dedos de {nome} são amarelados, há bitucas escondidas no vaso da varanda e um isqueiro no bolso do pijama. Desde os 15 anos, ninguém {o|a} viu passar um dia sem. Já tentou parar com remédio e adesivo, mas em poucas horas fica {irritado|irritada}, {inquieto|inquieta} e sem dormir. Nunca usou maconha ou outras drogas.`,
        clues: [
          'A primeira coisa que faz ao acordar é ir à varanda, mesmo com falta de ar, e volta lá a cada hora.',
          'Fuma cerca de um maço por dia há mais de quatro décadas e manteve o hábito depois de começar o oxigênio.',
          'Deixou de ir à igreja e às festas da família, onde não pode acender, e os netos já não dormem na casa.',
          'Fumar não {o|a} deixa {lento|lenta}, de olhos vermelhos ou com fome fora de hora; o problema é ficar sem.',
        ],
        rulesOut: 'Nunca usou maconha ou outras drogas.',
      },
    ],
  },
  {
    disorderId: 'inhalant_use_disorder',
    reference: {
      label: 'Manual MSD (Profissional) — Solventes voláteis',
      url: 'https://www.msdmanuals.com/pt/profissional/t%C3%B3picos-especiais/drogas-il%C3%ADcitas-e-intoxicantes/solventes-vol%C3%A1teis',
    },
    differential: {
      disorderId: 'aud',
      whyNot: 'A fala enrolada e o andar cambaleante vêm com cheiro de solvente, duram minutos e ocorrem sem bebida; os testes de álcool são negativos.',
    },
    explanation: 'Inalação repetida de solventes (cola, thinner ou outros produtos de pintura) por mais de 12 meses, em quantidade e frequência crescentes, com tentativas frustradas de parar, desejo intenso, tempo gasto para conseguir e usar, abandono da escola ou do trabalho, uso em situações de risco e manutenção apesar de danos físicos, como feridas ao redor do nariz e da boca e a perda de potássio com fraqueza: pelo menos 2 dos 10 critérios do DSM-5-TR (para inalantes não há critério de abstinência). A ausência de bebida e o teste de álcool negativo afastam o Transtorno por Uso de Álcool.',
    giveaways: ['inalant', 'solvent', 'cola', 'thinner', 'tiner', 'tinner', 'lolo', 'lanca-perfume', 'lanca perfume', 'benzina', 'gasolina', 'tolueno', 'hexano', 'acetona', 'aguarras', 'querosene', 'removedor', 'aerossol', 'spray', 'cheirinho'],
    variants: [
      {
        level: 'easy',
        ages: [14, 17],
        text: `{nome}, {idade} anos, é {levado|levada} ao CAPS infantojuvenil pelo Conselho Tutelar. Há mais de um ano cheira cola de sapateiro e thinner com um grupo da praça: molha um pano, põe num saco plástico e inspira até ficar {tonto|tonta}, com a fala enrolada e "tudo girando". No começo era nos fins de semana; hoje são várias vezes por dia.

Tem feridas em volta do nariz e da boca, e as roupas cheiram a solvente. Largou a escola, pede dinheiro à avó e aos vizinhos para comprar as latas e já tentou parar duas vezes, sem conseguir. Não bebe, e um teste de álcool feito no atendimento deu negativo.`,
        clues: [
          'Pensa no saco plástico assim que acorda e sai cedo de casa para encontrar o grupo e usar.',
          'Começou aos 12 com colegas mais velhos; o uso aumentou aos poucos e ficou diário no último ano.',
          'Foi {reprovado|reprovada} por faltas, deixou o futebol do projeto social e briga com a avó quando ela nega dinheiro.',
          'A tontura e a fala enrolada duram poucos minutos e vêm com cheiro químico, nunca de bebida.',
        ],
        rulesOut: 'um teste de álcool feito no atendimento deu negativo',
      },
      {
        level: 'medium',
        ages: [19, 26],
        text: `{nome}, {idade} anos, auxiliar numa oficina de funilaria e pintura, é {levado|levada} pelo patrão ao CAPS AD. Há um ano, se tranca no depósito com um pano úmido dentro de um saco plástico e sai de lá {tonto|tonta}, com a fala enrolada e andando torto; em meia hora volta ao normal. O produto é o mesmo que a oficina usa para limpar as pistolas de pintura.

Agora usa também em casa, várias vezes por dia, e precisa de cada vez mais para sentir o mesmo. Tem feridas em volta da boca e do nariz. Prometeu parar duas vezes e não conseguiu. O cheiro é químico, nunca de bebida, e {ele|ela} não bebe.`,
        clues: [
          'Passa o expediente pensando no depósito e inventa tarefas para ficar {sozinho|sozinha} perto das latas.',
          'Começou por curiosidade no primeiro mês de trabalho; o uso ficou diário há cerca de um ano e só aumentou.',
          'Recebeu duas advertências, quase foi {atropelado|atropelada} ao atravessar a avenida depois de usar e deixou de ir ao culto com a família.',
          'Um teste de álcool feito no CAPS logo depois de um episódio de fala enrolada deu negativo.',
        ],
        rulesOut: 'O cheiro é químico, nunca de bebida',
      },
      {
        level: 'hard',
        ages: [17, 24],
        text: `{nome}, {idade} anos, chega ao pronto-socorro com uma fraqueza nas pernas que {o|a} impede de subir a escada de casa. Os exames mostram potássio muito baixo e acidose causada por uma falha dos rins. Come normalmente, não vomita, não usa laxantes nem diuréticos e não se preocupa com o peso.

A mãe conta que, há mais de um ano, {ele|ela} passa as tardes num terreno baldio com um saco plástico e volta {tonto|tonta}, com a fala enrolada e um cheiro forte de produto de pintura no moletom. Há feridinhas em volta da boca e do nariz. Abandonou o curso técnico e já prometeu parar várias vezes. Não bebe.`,
        clues: [
          'Logo depois de usar, fica {eufórico|eufórica} e com a visão turva por alguns minutos, e em seguida {sonolento|sonolenta}.',
          'Começou aos 14 com colegas do bairro; há um ano o uso ficou diário, com cada vez mais produto no saco.',
          'Perdeu o estágio, afastou-se dos amigos do time e já desmaiou uma vez no terreno baldio, {sozinho|sozinha}.',
          'Um teste de álcool feito na chegada deu negativo, e a família nunca {o|a} viu beber.',
        ],
        rulesOut: 'Não bebe.',
      },
    ],
  },
  {
    disorderId: 'hallucinogen_use_disorder',
    reference: {
      label: 'Manual MSD (Profissional) — Alucinógenos',
      url: 'https://www.msdmanuals.com/pt/profissional/t%C3%B3picos-especiais/drogas-il%C3%ADcitas-e-intoxicantes/alucin%C3%B3genos',
    },
    differential: {
      disorderId: 'substance_induced_psychotic_disorder',
      whyNot: 'As alterações de percepção ficam restritas às horas de efeito, com a pessoa ciente de que vêm da droga; fora disso, não há vozes, visões nem desconfianças.',
    },
    explanation: 'Uso repetido de alucinógeno (LSD ou cogumelos com psilocibina) por mais de 12 meses, em frequência e dose crescentes, com tolerância rápida, desejo intenso, tentativas frustradas de reduzir, tempo gasto para obter e se recuperar, abandono de atividades, faltas e uso em situações de risco, como atravessar a avenida, pilotar moto ou cozinhar sob efeito: pelo menos 2 dos 10 critérios do DSM-5-TR (abstinência não é critério para alucinógenos). As alterações de percepção acontecem só durante o efeito e com a crítica preservada, o que afasta o Transtorno Psicótico Induzido por Substância.',
    giveaways: ['alucinogen', 'lsd', 'lisergic', 'acido', 'doce', 'selo', 'cogumelo', 'psilocib', 'psilocin', 'mescalin', 'peiote', 'dmt', 'ayahuasca', 'daime', 'psicodel', 'microdos', 'nbome', 'bad trip'],
    variants: [
      {
        level: 'easy',
        ages: [21, 27],
        text: `{nome}, {idade} anos, estudante de Design, procura o ambulatório de psiquiatria do hospital universitário depois de reprovar no semestre. Conheceu o LSD num festival aos 19; no último ano, passou a tomar "doce" todo fim de semana e, às vezes, às quartas. Como o efeito enfraquece quando repete em dias seguidos, aumentou para dois ou três selos por vez.

Passa o domingo e a segunda se recuperando, faltou a provas e largou a banda. Prometeu limitar a uma vez por mês e não cumpriu. Já atravessou uma avenida movimentada sob efeito. As cores e formas mudam só nas horas de efeito, e {ele|ela} sabe que vêm da droga; fora disso, pensa e percebe normalmente.`,
        clues: [
          'Durante o efeito, ouve as cores e vê as paredes respirando; o tempo parece se esticar por horas.',
          'O uso era raro no primeiro ano; a frequência e as doses subiram de forma contínua nos últimos doze meses.',
          'Perdeu a bolsa de estudos e deixou de ensaiar com a banda, que mantinha desde o ensino médio.',
          'Nunca teve vozes, visões ou desconfianças fora do efeito; não usa outras drogas e bebe pouco.',
        ],
        rulesOut: 'fora disso, pensa e percebe normalmente',
      },
      {
        level: 'medium',
        ages: [22, 30],
        text: `{nome}, {idade} anos, vive com os pais num sítio no interior de Goiás e é {levado|levada} à UBS pela irmã. Há mais de um ano colhe no pasto uns fungos pequenos que nascem no esterco do gado, seca-os e prepara um chá amargo. Depois de uma hora, as cores ficam vivas, as paredes parecem respirar e o tempo se arrasta por umas cinco horas.

O que era uma vez por mês virou três ou quatro vezes por semana, com porções cada vez maiores. Passa o dia seguinte {largado|largada} na rede, deixou de ajudar na lavoura e prometeu parar duas vezes. Fora do efeito, conversa normalmente e não vê nem ouve nada de estranho.`,
        clues: [
          'Diz que a vontade de "ver o mundo daquele jeito" volta poucos dias depois e que pensa nisso o tempo todo.',
          'Experimentou numa festa da cidade há cerca de dois anos; a frequência subiu aos poucos ao longo do último ano.',
          'Já saiu de moto sob efeito e caiu na estrada de terra; também deixou o time de futebol da comunidade.',
          'Sabe que as cores e formas vêm do chá e somem em poucas horas; nunca desconfiou de ninguém nem ouviu vozes. Não bebe.',
        ],
        rulesOut: 'Fora do efeito, conversa normalmente e não vê nem ouve nada de estranho.',
      },
      {
        level: 'hard',
        ages: [30, 40],
        text: `{nome}, {idade} anos, cozinheir{o|a} de restaurante, chega ao pronto-socorro com uma queimadura na mão. O chefe suspeita que tenha sido de propósito, mas {nome}, {calmo|calma} e {orientado|orientada}, explica que a chama do fogão "parecia dançar" e quis tocá-la. As pupilas estão dilatadas, e a pressão, um pouco alta.

Na carteira, há quadradinhos de papel colorido que {ele|ela} põe sob a língua antes do turno. Conta que o efeito dura quase o dia todo e que, de dois anos para cá, passou de uma vez por mês para quase todas as folgas e alguns dias de trabalho, em doses maiores. Já perdeu um emprego por faltas. Fora do efeito, percebe tudo normalmente.`,
        clues: [
          'Sob efeito, ouve as cores e sente o tempo parar; já precisa de mais papel para sentir o mesmo de antes.',
          'Começou em festas há cerca de cinco anos, poucas vezes por ano; a escalada aconteceu nos últimos dois anos.',
          'Foi {advertido|advertida} por errar pedidos, deixou o grupo de corrida e a queimadura aconteceu durante o expediente.',
          'Sabe que a chama "dançando" era efeito do papel; nunca se feriu de propósito, não usa outras drogas e não ouve vozes fora do efeito.',
        ],
        rulesOut: 'Fora do efeito, percebe tudo normalmente.',
      },
    ],
  },
  {
    disorderId: 'gambling_disorder',
    reference: {
      label: 'American Psychiatric Association — What is Gambling Disorder?',
      url: 'https://www.psychiatry.org/patients-families/gambling-disorder/what-is-gambling-disorder',
    },
    differential: {
      disorderId: 'bipolar_1',
      whyNot: 'As apostas não ocorrem dentro de fases de euforia, pouco sono e gastos generalizados; o comportamento é contínuo e movido pela tentativa de recuperar o dinheiro perdido.',
    },
    explanation: 'Apostas persistentes há mais de 12 meses, com valores crescentes para manter a emoção, tentativas frustradas de parar, irritação ao tentar reduzir, pensamento ocupado pelo jogo, retorno para recuperar perdas, mentiras sobre o tamanho do prejuízo, empréstimos e socorro financeiro da família e risco ao emprego e às relações: bem mais que os 4 de 9 critérios do DSM-5-TR. Não há episódios de euforia, pouco sono ou gastos fora das apostas, o que afasta um episódio maníaco do Transtorno Bipolar Tipo I; o dinheiro apostado separa o quadro do Transtorno de Jogos Eletrônicos, e a memória preservada afasta um quadro neurocognitivo.',
    giveaways: ['apost', 'bets', 'bet365', 'betano', 'cassino', 'casino', 'caca-niquel', 'caca niquel', 'tigrinho', 'fortune tiger', 'jogo do bicho', 'bingo', 'raspadinha', 'loteria', 'loterica', 'mega-sena', 'megasena', 'roleta', 'poquer', 'poker', 'jogo de azar', 'jogos de azar', 'ludopat'],
    variants: [
      {
        level: 'easy',
        ages: [22, 35],
        text: `{nome}, {idade} anos, entregador{|a} de aplicativo, procura o CAPS AD depois de vender a moto que usava para trabalhar. Começou nas apostas esportivas durante a Copa do Mundo, com R$ 20; hoje aposta todos os dias, em jogos de qualquer país, e precisa de valores cada vez maiores para sentir a mesma emoção. Quando perde, volta no dia seguinte para "recuperar".

Mente para o cônjuge sobre o saldo, pegou R$ 15 mil emprestados com parentes e com um agiota e já tentou parar três vezes: apaga os aplicativos, fica {irritado|irritada} e {inquieto|inquieta} e reinstala. Nunca teve fases de euforia, de pouco sono ou de gastos fora das apostas. Não bebe nem usa drogas.`,
        clues: [
          'Passa o dia conferindo resultados e planejando a próxima jogada, inclusive no meio das entregas.',
          'Os valores subiram de forma contínua nos últimos dois anos, e há um ano e meio não passa um dia sem jogar.',
          'Atrasou o aluguel duas vezes, o cônjuge ameaça ir embora e, sem a moto, perdeu a renda das entregas.',
          'O sono e o humor seguem estáveis fora das perdas; o que move cada jogada é a pressa de recuperar o dinheiro, não uma fase de euforia.',
        ],
        rulesOut: 'Nunca teve fases de euforia, de pouco sono ou de gastos fora das apostas.',
      },
      {
        level: 'medium',
        ages: [30, 50],
        text: `{nome}, {idade} anos, servidor{|a} públic{o|a}, chega à UBS a pedido do cônjuge, que descobriu dezenas de Pix de R$ 200 a R$ 500, feitos de madrugada, para plataformas de palpites esportivos. O limite do cartão estourou, e havia um empréstimo consignado que ninguém sabia existir.

Há mais de um ano, {ele|ela} acompanha partidas de ligas desconhecidas pelo celular, sempre "para recuperar o que perdeu". Já apagou os aplicativos várias vezes e reinstalou em dois dias. Pediu dinheiro à mãe para o condomínio, inventando um conserto no carro, e fica {irritado|irritada} quando tenta ficar sem. Não há fases de euforia nem noites sem sono por agitação; a insônia vem das dívidas.`,
        clues: [
          'Pensa nas próximas partidas durante o expediente e aumenta os valores para sentir a mesma adrenalina.',
          'Começou com valores pequenos no início do ano passado; os depósitos ficaram diários nos últimos meses.',
          'Foi {chamado|chamada} pela chefia por usar o celular o tempo todo, e o casal dorme em quartos separados desde a descoberta.',
          'Nunca teve semanas de energia excessiva, gastos com outras coisas ou pouca necessidade de sono; o dinheiro vai todo para as plataformas.',
        ],
        rulesOut: 'Não há fases de euforia nem noites sem sono por agitação',
      },
      {
        level: 'hard',
        ages: [65, 80],
        text: `{nome}, {idade} anos, {viúvo|viúva}, é {levado|levada} pelo filho ao geriatra por "esquecimento": a aposentadoria some antes do dia 10, as contas atrasam e o filho suspeita de golpe. Na consulta, porém, {nome} lembra datas, valores e nomes sem dificuldade, e os testes de memória vêm normais.

O extrato mostra dezenas de Pix de R$ 20 e R$ 50 para a mesma plataforma, inclusive às três da manhã, e dois empréstimos consignados. Há um ano e meio passa horas no celular girando "o joguinho dos bichinhos", {certo|certa} de que está "quase recuperando". Esconde o aparelho, já jurou parar e fica {irritado|irritada} quando o filho o pega. Nunca teve fases de euforia ou de gastos com outras coisas.`,
        clues: [
          'Cada rodada exige um depósito e promete prêmio em dinheiro; quando ganha algo, devolve tudo à plataforma na mesma hora.',
          'Começou alguns meses depois da morte do cônjuge, com valores pequenos, e os depósitos cresceram ao longo de um ano e meio.',
          'Deixou o grupo da igreja, onde deve dinheiro a duas amigas, e já pediu ao neto para pagar a conta de luz.',
          'O sono e a energia são os de sempre; não há dias de euforia nem planos grandiosos, só a pressa de recuperar o dinheiro.',
        ],
        rulesOut: 'Nunca teve fases de euforia ou de gastos com outras coisas.',
      },
    ],
  },
  {
    disorderId: 'gaming_disorder',
    reference: {
      label: 'OMS — Addictive behaviours: Gaming disorder (CID-11, 6C51)',
      url: 'https://www.who.int/news-room/questions-and-answers/item/addictive-behaviours-gaming-disorder',
    },
    differential: {
      disorderId: 'mdd',
      whyNot: 'Não há tristeza persistente nem perda geral de prazer: o interesse e o entusiasmo estão concentrados no jogo, e o humor é bom enquanto joga.',
    },
    explanation: 'Padrão de jogo eletrônico há mais de 12 meses, com perda de controle sobre início, duração e término das sessões, prioridade crescente do jogo sobre estudo, trabalho, sono, refeições e convívio, e continuação apesar de prejuízos claros (reprovação, disciplinas abandonadas, loja fechada, conflitos e dor por esforço repetitivo): os três elementos da CID-11 (6C51), com prejuízo significativo. O ânimo e o prazer estão preservados, o que afasta o Transtorno Depressivo Maior; não há dinheiro apostado, o que separa o quadro do Transtorno do Jogo.',
    giveaways: ['videogame', 'video game', 'game', 'jogo eletronico', 'jogos eletronicos', 'jogo online', 'jogos online', 'console', 'playstation', 'xbox', 'nintendo', 'free fire', 'fortnite', 'minecraft', 'roblox', 'league of legends', 'counter-strike', 'valorant', 'mmorpg', 'e-sports', 'esports'],
    variants: [
      {
        level: 'easy',
        ages: [15, 17],
        text: `{nome}, {idade} anos, é {levado|levada} pelos pais ao CAPS infantojuvenil porque "só vive para o videogame". Há um ano e meio joga um jogo online de tiro de oito a dez horas por dia, até as cinco da manhã, e não consegue parar, mesmo quando promete "só mais uma partida".

Faltou a tantas aulas que vai repetir o ano. Largou o basquete, não vê os amigos fora da tela e come no quarto. Quando os pais desligam o roteador, grita e bate portas, mas no dia seguinte volta a jogar. Fala das partidas com entusiasmo e não demonstra tristeza. Não gasta dinheiro com o jogo, não aposta e não usa drogas.`,
        clues: [
          'Mesmo na aula, pensa nas partidas e planeja como subir de nível; fica {irritado|irritada} quando é {interrompido|interrompida}.',
          'Até dois anos atrás, jogava só nos fins de semana; o tempo diário aumentou ao longo dos últimos 18 meses.',
          'As notas, antes boas, despencaram; os professores relatam que dorme na sala e não entrega trabalhos.',
          'Quando joga, mostra entusiasmo e se diverte; não há tristeza persistente, e as explosões só aparecem quando o jogo é interrompido.',
        ],
        rulesOut: 'Fala das partidas com entusiasmo e não demonstra tristeza.',
      },
      {
        level: 'medium',
        ages: [20, 26],
        text: `{nome}, {idade} anos, estudante de Engenharia, é {encaminhado|encaminhada} pela coordenação ao serviço de saúde da universidade depois de abandonar quatro disciplinas. O colega de república conta que {ele|ela} passa as noites de fone e microfone, comandando um time em partidas ranqueadas das oito da noite às seis da manhã, e come em frente à tela.

Há um ano e meio desinstala tudo "para focar" e reinstala em dois dias. Faltou ao casamento da irmã por causa de um campeonato online. Quando a internet cai, fica {irritado|irritada}, mas se anima ao falar das partidas. Não gasta dinheiro com elas e não demonstra tristeza fora da tela.`,
        clues: [
          'Dorme durante as aulas da manhã e já combina a próxima partida antes de terminar a anterior.',
          'Jogava com moderação no ensino médio; desde o segundo ano da faculdade, o tempo de tela só aumenta.',
          'Perdeu a bolsa de iniciação científica, deixou a academia e não visita a família há meses.',
          'Ri com o time, mantém o apetite e fala das vitórias com entusiasmo; não há tristeza persistente nem perda de prazer.',
        ],
        rulesOut: 'não demonstra tristeza fora da tela',
      },
      {
        level: 'hard',
        ages: [42, 58],
        text: `{nome}, {idade} anos, don{o|a} de uma papelaria, procura a UBS por dor no punho e no polegar direito e por "sono picado". O ortopedista atribuiu a inflamação a movimentos repetitivos, que {ele|ela} não reconhece no trabalho. O cônjuge conta que o celular não sai da mão de {nome}, nem no banho.

Há dois anos, {ele|ela} cuida de uma fazenda virtual: acorda de madrugada para "colher" plantações que ficaram prontas e não perde os eventos que duram poucas horas. Já deixou a loja fechada em horário comercial e faltou ao aniversário do neto. Apaga o aplicativo e reinstala no mesmo dia. Nunca gastou dinheiro nele e anda de bom humor.`,
        clues: [
          'Mesmo atendendo clientes, olha o celular a cada poucos minutos para não perder a colheita e se irrita quando a internet falha.',
          'Começou como passatempo na pandemia; nos últimos dois anos, as horas de jogo cresceram até ocupar as noites.',
          'O faturamento da papelaria caiu, o casal briga por causa do celular e deixou o grupo de caminhada do bairro.',
          'Sente prazer nas visitas dos netos e nas conversas com a família; não há tristeza persistente, e o sono melhora quando o celular fica fora do quarto.',
        ],
        rulesOut: 'anda de bom humor',
      },
    ],
  },
]
