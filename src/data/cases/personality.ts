import type { DisorderCaseSet } from './types'

export const personalityCases: DisorderCaseSet[] = [
  {
    disorderId: 'bpd',
    reference: {
      label: 'Manual MSD (Profissional) — Transtorno de personalidade borderline',
      url: 'https://www.msdmanuals.com/pt/profissional/transtornos-psiqui%C3%A1tricos/transtornos-de-personalidade/transtorno-de-personalidade-borderline',
    },
    differential: {
      disorderId: 'bipolar_2',
      whyNot: 'As mudanças de humor duram horas, surgem depois de brigas ou do medo de rejeição e nunca formam dias seguidos de energia elevada com pouca necessidade de sono.',
    },
    explanation: 'Padrão desde a adolescência de relações intensas e instáveis, que oscilam entre idealização e desvalorização, esforços desesperados para evitar o abandono, autoimagem instável, impulsividade em gastos e direção, autolesão e ameaças de suicídio, humor que muda em horas, vazio crônico e raiva difícil de controlar, com prejuízo nos estudos, no trabalho e nas relações. As oscilações são reativas a conflitos e duram horas, sem dias seguidos de energia elevada e sono reduzido, o que afasta o Transtorno Bipolar Tipo II. Não há uso de drogas nem semanas seguidas de tristeza.',
    giveaways: ['limitrofe', 'instabilidade emocional'],
    variants: [
      {
        level: 'easy',
        ages: [19, 27],
        text: `{nome}, {idade} anos, estudante de publicidade, chega ao CAPS com a irmã depois de se ferir de propósito no fim de um namoro de dois meses. Conta que se apega muito rápido: no começo a pessoa é "perfeita"; na primeira demora para responder, vira "a pior do mundo". Para não ser {deixado|deixada}, já mandou dezenas de mensagens seguidas e ameaçou se matar.

Desde os 15 anos vive assim. Muda de visual, de curso e de planos a cada poucos meses e diz que não sabe quem é. Gasta o que não tem e dirige em alta velocidade depois de brigas. Sente um vazio constante. O humor vira em poucas horas após uma discussão e se acalma no mesmo dia; nunca teve dias seguidos de energia elevada.`,
        clues: [
          'Nas discussões, sente uma raiva que não consegue controlar, grita e quebra objetos; depois se envergonha e pede desculpas.',
          'Até os 14 anos ia bem na escola, sem queixas de comportamento; desde então, amizades e namoros começam intensos e terminam em rompimentos bruscos.',
          'Trancou a faculdade duas vezes, acumula dívidas no cartão e perdeu quase todos os amigos depois de brigas repetidas.',
          'Bebe pouco e não usa drogas; entre as brigas, dorme e rende como de costume, sem semanas seguidas de tristeza.',
        ],
        rulesOut: 'nunca teve dias seguidos de energia elevada',
      },
      {
        level: 'medium',
        ages: [23, 35],
        text: `{nome}, {idade} anos, recepcionista de hotel, é {encaminhado|encaminhada} pela UPA, onde foi {atendido|atendida} após tomar de uma vez os comprimidos que havia em casa quando o cônjuge ameaçou ir embora. Chama a médica do plantão de "um anjo", até lembrar que ela negou um atestado: aí ela vira "uma incompetente".

Desde o ensino médio troca de curso, de planos e até de religião de uma hora para outra, sem saber dizer do que gosta, e fala de um "buraco por dentro" que nada preenche. Quando o cônjuge demora a responder, liga trinta vezes, e já bloqueou a porta para impedir que saísse. O choro e a irritação surgem em minutos após uma briga e passam até o dia seguinte; nunca houve dias seguidos de pouco sono e energia de sobra.`,
        clues: [
          'Já gastou o salário inteiro numa noite de compras pela internet e costuma dirigir em alta velocidade depois de discussões.',
          'A família conta que as brigas, as idas ao pronto-socorro e as amizades rompidas de repente se repetem desde os 16 anos.',
          'Teve seis empregos em quatro anos, quase sempre saindo depois de discussões aos gritos com chefes que antes admirava.',
          'Não usa drogas e bebe só em festas; entre as crises, dorme bem e cumpre a rotina, sem semanas de tristeza contínua.',
        ],
        rulesOut: 'nunca houve dias seguidos de pouco sono e energia de sobra',
      },
      {
        level: 'hard',
        ages: [30, 45],
        text: `{nome}, {idade} anos, técnic{o|a} de enfermagem, procura o ambulatório pedindo um remédio para os "altos e baixos" sobre os quais leu na internet. Está {afastado|afastada} do hospital desde que gritou com a supervisora, a quem até o mês passado chamava de "a melhor chefe que já teve".

O cônjuge conta que o humor muda várias vezes no mesmo dia: {nome} está bem no almoço e, à noite, chora e bate portas por uma mensagem sem resposta, implorando para não ser {deixado|deixada}. Dorme o de sempre e nunca passou dias com energia de sobra. Desde a adolescência, muda de planos, de visual e da imagem que tem de si de uma hora para outra e diz viver com uma sensação de oco.`,
        clues: [
          'Tem marcas antigas nos braços de quando se machucava depois de brigas e, numa discussão recente, ameaçou se matar se o cônjuge saísse de casa.',
          'Os pais contam que, desde os 15 anos, cada sensação de rejeição vinha seguida de rompimentos, mudanças bruscas de planos e gastos sem controle.',
          'Trocou de hospital quatro vezes em seis anos, deve em três cartões por compras de madrugada e já foi {multado|multada} por correr de carro após discussões.',
          'Não usa drogas e bebe pouco; as quedas de humor duram horas, seguem conflitos e nunca formaram semanas seguidas de tristeza.',
        ],
        rulesOut: 'nunca passou dias com energia de sobra',
      },
    ],
  },
  {
    disorderId: 'avoidant_personality_disorder',
    reference: {
      label: 'Manual MSD (Profissional) — Transtorno da personalidade esquiva',
      url: 'https://www.msdmanuals.com/pt/profissional/transtornos-psiqui%C3%A1tricos/transtornos-de-personalidade/transtorno-da-personalidade-esquiva-tpe',
    },
    differential: {
      disorderId: 'social_anxiety',
      whyNot: 'O medo não se limita a falar em público ou a situações de avaliação: nasce de uma visão de si como inferior, presente desde a adolescência, e leva a evitar intimidade, amizades e qualquer novidade.',
    },
    explanation: 'Padrão desde a adolescência de inibição social, sentimento de inadequação e hipersensibilidade à crítica: evita funções com contato interpessoal por medo de rejeição, só se aproxima de quem tem certeza de que gosta de si, contém-se na intimidade por medo do ridículo, vê-se como inferior e evita atividades novas por receio de passar vergonha, com prejuízo no trabalho e nas relações. O medo não se restringe a situações de desempenho ou de avaliação: atinge a intimidade, as novidades e a própria autoimagem, um padrão global de personalidade, e não um medo circunscrito a situações sociais, como no Transtorno de Ansiedade Social. Ao contrário do esquizoide, deseja vínculos, e não há tristeza persistente.',
    giveaways: ['esquiv', 'evitativ'],
    variants: [
      {
        level: 'easy',
        ages: [22, 35],
        text: `{nome}, {idade} anos, auxiliar administrativ{o|a}, procura a UBS porque "não aguenta mais viver {escondido|escondida}". Diz que sempre se sentiu inferior, sem graça e sem nada de interessante para oferecer. Recusou duas vezes a vaga de {supervisor|supervisora} porque teria de lidar com a equipe e tem certeza de que seria {criticado|criticada} ou {rejeitado|rejeitada}.

Desde a adolescência só se aproxima de alguém quando tem certeza de que é {bem-vindo|bem-vinda}. Gostaria de ter amigos e namorar, mas não vai a encontros por medo de ser {ridicularizado|ridicularizada}. Nunca aprendeu a dirigir nem fez cursos, com receio de passar vergonha. O receio não se limita a falar em público: aparece em qualquer chance de ser {conhecido|conhecida} de perto.`,
        clues: [
          'Mesmo com a irmã, de quem é {próximo|próxima}, quase não fala de si, por medo de parecer {ridículo|ridícula} ao mostrar o que sente.',
          'Na infância brincava e tinha amigos; por volta dos 13 anos passou a se ver como inferior aos colegas, e o padrão nunca mais mudou.',
          'Mora com os pais e nunca namorou; não anda triste, mas sente falta de companhia e almoça {sozinho|sozinha} na escada do prédio para evitar os colegas.',
          'O desconforto não depende de plateia: aparece com a irmã, com colegas de anos e diante de qualquer atividade nova, sempre ligado à ideia de ser inferior.',
        ],
        rulesOut: 'O receio não se limita a falar em público',
      },
      {
        level: 'medium',
        ages: [26, 40],
        text: `{nome}, {idade} anos, bibliotecári{o|a}, procura o psicólogo do plano de saúde depois de recusar, pela terceira vez, a vaga no atendimento ao público, mesmo com aumento de salário: "as pessoas logo vão perceber que não sou grande coisa". Almoça {sozinho|sozinha} há sete anos e recusa os convites dos colegas, embora diga que gostaria de ir.

Só começou a namorar depois que a outra pessoa insistiu por meses e, ainda hoje, evita contar o que pensa para não virar motivo de riso. Nunca se arriscou num curso ou numa atividade nova, com receio de se mostrar incapaz. Na reunião anual, apresenta os relatórios do setor sem fugir da tarefa; o que evita é ser {conhecido|conhecida} de perto. Os pais dizem que é assim desde a adolescência.`,
        clues: [
          'Quando alguém novo chega ao setor, passa semanas sem puxar conversa, {convencido|convencida} de que não teria nada de interessante a oferecer.',
          'Na infância tinha amigos no bairro; a partir dos 13 anos passou a se achar inferior aos colegas, e o padrão se mantém há mais de dez anos.',
          'Segue no mesmo cargo há sete anos, apesar de boas avaliações; não anda triste, mas passa os fins de semana em casa, sentindo falta de companhia.',
          'Não teme apenas ser {observado|observada}: até com quem namora esconde o que sente, e evita qualquer atividade nova por se julgar menos capaz que os outros.',
        ],
        rulesOut: 'Na reunião anual, apresenta os relatórios do setor sem fugir da tarefa',
      },
      {
        level: 'hard',
        ages: [38, 55],
        text: `{nome}, {idade} anos, técnic{o|a} em contabilidade, vem à terapia de casal por insistência do cônjuge, que se queixa de solidão: em doze anos juntos, {nome} quase nunca fala do que sente e inventa desculpas para faltar a festas, até da própria família. {Ele|Ela} explica, sem levantar os olhos: "acho que ninguém aguentaria me conhecer direito".

Os dois se conheceram pela internet, e o cônjuge precisou insistir por meses até o primeiro encontro. No escritório, {nome} recusou a coordenação de uma equipe e nunca fez o curso de inglês pago pela empresa, {certo|certa} de que seria {o pior|a pior} da turma. Diz que é assim desde o colégio e que não se trata só de falar em público: sente-se menos que os outros em quase tudo.`,
        clues: [
          'Quando o cônjuge fica em silêncio, conclui que finalmente percebeu o quanto {ele|ela} é sem graça e se fecha ainda mais.',
          'A irmã lembra que na infância brincava com os primos e tinha amigos; desde os 14 anos se retraiu, padrão que se mantém igual há mais de 20 anos.',
          'Está há 15 anos no mesmo cargo apesar de elogios, sente falta de amigos próprios e o casamento corre risco pelo isolamento do casal.',
          'Não anda triste nem {desanimado|desanimada}; o que {o|a} trava não é só o medo de ser {observado|observada}, mas a certeza de ser {rejeitado|rejeitada} por quem chegar perto.',
        ],
        rulesOut: 'não se trata só de falar em público',
      },
    ],
  },
  {
    disorderId: 'obsessive_compulsive_personality_disorder',
    reference: {
      label: 'Manual MSD (Profissional) — Transtorno de personalidade obsessivo-compulsiva',
      url: 'https://www.msdmanuals.com/pt/profissional/transtornos-psiqui%C3%A1tricos/transtornos-de-personalidade/transtorno-de-personalidade-obsessivo-compulsiva-tpoc',
    },
    differential: {
      disorderId: 'ocd',
      whyNot: 'Não há pensamentos intrusivos indesejados nem rituais para aliviar aflição; a ordem, o detalhismo e a rigidez são vistos como corretos e fazem parte do jeito de ser desde a juventude.',
    },
    explanation: 'Padrão desde o início da vida adulta de preocupação com ordem, perfeccionismo e controle: listas e regras que fazem perder o objetivo, perfeccionismo que impede concluir tarefas, dedicação excessiva ao trabalho sem necessidade financeira, rigidez moral, dificuldade de descartar objetos sem valor, recusa em delegar, avareza e teimosia, com prejuízo no trabalho e na família. O comportamento é vivido como correto, sem pensamentos intrusivos nem rituais para aliviar aflição, o que afasta o Transtorno Obsessivo-Compulsivo. Os objetos guardados não tomam a casa, o que afasta o Transtorno de Acumulação.',
    giveaways: ['anancast', 'perfeccionis'],
    variants: [
      {
        level: 'easy',
        ages: [35, 55],
        text: `{nome}, {idade} anos, {contador|contadora}, procura o consultório porque o escritório ameaçou {demiti-lo|demiti-la}: há meses atrasa os balanços porque refaz cada planilha até não restar nenhum detalhe fora do padrão. Não deixa a equipe ajudar, já que "ninguém faz do jeito certo", e passa horas ajustando listas e cronogramas em vez de concluir o trabalho.

Desde a faculdade é assim: trabalha nos fins de semana, não tira férias há quatro anos e acha perda de tempo sair com amigos. Em casa, guarda aparelhos quebrados "para quando precisar" e controla cada centavo, embora tenha boas economias. Considera seu jeito o correto e não tem pensamentos intrusivos nem rituais para aliviar aflição.`,
        clues: [
          'Não usa nem uma caneta do escritório para fins pessoais e denuncia colegas que o fazem, sem aceitar exceções.',
          'Teve infância e adolescência sociáveis; desde o início da vida adulta organiza tudo em listas e horários rígidos, padrão que se mantém há mais de 15 anos.',
          'Perdeu dois clientes importantes por atrasos, e o cônjuge fala em separação por causa das brigas sobre gastos e horários.',
          'Os aparelhos guardados ficam em caixas etiquetadas na garagem; a casa é arrumada e todos os cômodos são usados normalmente.',
        ],
        rulesOut: 'não tem pensamentos intrusivos nem rituais para aliviar aflição',
      },
      {
        level: 'medium',
        ages: [40, 60],
        text: `{nome}, {idade} anos, engenheir{o|a} civil, é {encaminhado|encaminhada} pelo médico do trabalho após o terceiro atraso numa obra: passou duas semanas reescrevendo o manual de uma etapa já concluída e devolveu relatórios da equipe com correções de vírgula. Não delega nada, pois os colegas "fazem pela metade", e chega antes de todos e sai depois do último.

Os filhos contam que {ele|ela} sempre foi assim: impõe horários fixos para as refeições, espalha listas pela casa e nunca viajou de férias "para não perder tempo". Recusa-se a trocar a geladeira de 20 anos e guarda peças velhas que nunca usa. Acha que o problema são os outros; diz que nada lhe vem à cabeça contra a vontade e que não repete gestos para se acalmar.`,
        clues: [
          'Denunciou um colega por usar a impressora da empresa para imprimir um boleto pessoal e não entende por que a equipe se afastou.',
          'Os irmãos lembram que, desde a faculdade, organizava tudo em listas e cronogramas; o jeito é o mesmo há mais de 20 anos.',
          'Foi {preterido|preterida} em duas promoções por não conseguir trabalhar em equipe, e as brigas por dinheiro ameaçam o casamento.',
          'As peças ficam em caixas organizadas no depósito; a casa é arrumada, sem cômodos tomados por objetos.',
        ],
        rulesOut: 'nada lhe vem à cabeça contra a vontade',
      },
      {
        level: 'hard',
        ages: [45, 65],
        text: `{nome}, {idade} anos, {tesoureiro|tesoureira} {voluntário|voluntária} da igreja, procura o psicólogo indicado pelo pastor depois de ser {afastado|afastada} da função. Não aprovava compra alguma sem três orçamentos, nem de um pacote de café, passou meses reescrevendo o estatuto sem terminá-lo e exigia "a regra como está escrita", mesmo quando o próprio pastor pedia bom senso.

O cônjuge conta que {nome} sempre foi assim: trabalha também aos sábados sem precisar, guarda ferramentas quebradas em caixas etiquetadas e anota cada gasto da casa, negando até presentes de aniversário aos filhos. {Ele|Ela} não descreve pensamentos que surjam contra a vontade: diz apenas que "o certo é o certo" e se espanta com a reação dos outros.`,
        clues: [
          'Na repartição pública onde trabalha, não delega nada e revisa à noite os processos dos colegas, perdendo prazos por detalhes de formatação.',
          'Os irmãos lembram que, desde o início da faculdade, {nome} vivia de listas, horários e regras; o jeito é o mesmo há mais de 25 anos.',
          'Perdeu a função na igreja e uma promoção no trabalho, e os filhos evitam pedir qualquer coisa por medo das discussões.',
          'A casa é organizada, sem cômodos tomados por objetos, e não há lavagens, checagens ou gestos repetidos para afastar medo ou culpa.',
        ],
        rulesOut: 'não descreve pensamentos que surjam contra a vontade',
      },
    ],
  },
  {
    disorderId: 'narcissistic_personality_disorder',
    reference: {
      label: 'Manual MSD (Profissional) — Transtorno de personalidade narcisista',
      url: 'https://www.msdmanuals.com/pt/profissional/transtornos-psiqui%C3%A1tricos/transtornos-de-personalidade/transtorno-de-personalidade-narcisista',
    },
    differential: {
      disorderId: 'bipolar_1',
      whyNot: 'A grandiosidade é estável desde a juventude e não aparece em episódios: não há fases de euforia, sono reduzido, fala acelerada ou energia aumentada.',
    },
    explanation: 'Padrão desde o início da vida adulta de grandiosidade, fantasias de sucesso e poder, sensação de ser especial, necessidade constante de admiração, sentimento de merecer tratamento especial, exploração dos outros, falta de empatia, inveja e arrogância, com prejuízo no trabalho e nas relações. A grandiosidade é estável e não surge em episódios com sono reduzido e energia aumentada, o que afasta o Transtorno Bipolar Tipo I. A busca é por admiração como superior, e não por qualquer atenção, como no histriônico; não há conduta antissocial desde a adolescência nem desconfiança generalizada, como no paranoide.',
    giveaways: ['narcis'],
    variants: [
      {
        level: 'easy',
        ages: [30, 50],
        text: `{nome}, {idade} anos, advogad{o|a}, vem à terapia por exigência do escritório depois de humilhar um estagiário diante de clientes. Diz que está ali "por formalidade": considera-se {o melhor|a melhor} profissional da cidade, acha que só desembargadores estão à sua altura e se irrita quando não recebe tratamento especial, como passar na frente da fila do cartório.

Desde a faculdade sonha com fama e poder, precisa de elogios constantes e reage com fúria a qualquer crítica. Apresenta ideias de colegas como suas e não percebe quando magoa alguém. Diz que os outros têm inveja {dele|dela}. Esse jeito é o mesmo há mais de dez anos, sem fases de sono reduzido ou de energia acima do habitual.`,
        clues: [
          'Exige ser {chamado|chamada} de "doutor{|a}" até pelos vizinhos e despreza quem não tem diploma.',
          'Desde os 20 anos, colegas e ex-parceiros descrevem o mesmo comportamento, que se repete em todos os empregos e relações.',
          'Já mudou de escritório três vezes após brigas com sócios, e o casamento acabou porque o cônjuge se sentia usado.',
          'Nunca teve problemas com a lei nem brigas ou furtos na adolescência; usa os outros para ser {admirado|admirada}, não por dinheiro.',
        ],
        rulesOut: 'sem fases de sono reduzido ou de energia acima do habitual',
      },
      {
        level: 'medium',
        ages: [35, 55],
        text: `{nome}, {idade} anos, gerente de vendas, é {encaminhado|encaminhada} pelo RH depois de duas queixas de colegas. Na consulta, fala por meia hora dos prêmios que ganhou, corrige o vocabulário do psicólogo e pergunta se não há "alguém mais experiente" para {atendê-lo|atendê-la}. Conta que merece a diretoria há anos e só não chegou lá porque o chefe "tem medo de ser superado".

A equipe relata que {ele|ela} assina projetos alheios, exige prioridade em tudo e, quando uma colega perdeu o pai, só reclamou do atraso nas metas. O cônjuge diz que é assim desde que se conheceram, há 15 anos: precisa ser {elogiado|elogiada} o tempo todo. Dorme bem, tem a energia de sempre e nunca passou por fases de euforia ou agitação.`,
        clues: [
          'Frequenta só restaurantes e clubes "à altura" e diz que apenas pessoas de destaque conseguem {entendê-lo|entendê-la}.',
          'Ex-colegas de faculdade descrevem o mesmo comportamento desde os 20 anos, em todos os empregos e relacionamentos.',
          'Perdeu dois bons vendedores, que pediram transferência, e o casamento vive em crise por sua falta de interesse pelos problemas do cônjuge.',
          'Não busca qualquer tipo de atenção nem faz cenas: quer ser {admirado|admirada} como superior e despreza quem "faz graça" para aparecer.',
        ],
        rulesOut: 'nunca passou por fases de euforia ou agitação',
      },
      {
        level: 'hard',
        ages: [50, 65],
        text: `{nome}, {idade} anos, {professor|professora} universitári{o|a}, é {encaminhado|encaminhada} pela perícia da universidade depois que três orientandos {o|a} acusaram de humilhá-los em público. Diz ser vítima de "colegas invejosos" que não suportam ver "o único nome internacional do departamento". De fato publica bastante, mas exige ser {dispensado|dispensada} das aulas da graduação, "trabalho para iniciantes".

Os orientandos contam que {ele|ela} assina como {primeiro autor|primeira autora} trabalhos que não escreveu e riu de uma aluna que chorou ao falar da mãe doente. O cônjuge diz que é assim desde a juventude: precisa de elogios o tempo todo. Não desconfia da família nem dos amigos, e o jeito é o mesmo há décadas, sem fases de sono reduzido ou energia de sobra.`,
        clues: [
          'Fala com frequência do prêmio internacional que "certamente" receberá e do instituto com seu nome que pretende fundar.',
          'Ex-colegas de graduação lembram do mesmo comportamento aos 20 anos; desde então, o padrão se repete em todos os grupos e relações.',
          'Perdeu dois financiamentos por brigas com coautores, e o departamento deixou de indicar novos alunos para sua orientação.',
          'Nunca teve problemas com a lei nem brigas ou furtos na adolescência, e não teme ser {perseguido|perseguida}: apenas se vê como {invejado|invejada}.',
        ],
        rulesOut: 'sem fases de sono reduzido ou energia de sobra',
      },
    ],
  },
  {
    disorderId: 'dependent_personality_disorder',
    reference: {
      label: 'Manual MSD (Profissional) — Transtorno da personalidade dependente',
      url: 'https://www.msdmanuals.com/pt/profissional/transtornos-psiqui%C3%A1tricos/transtornos-de-personalidade/transtorno-da-personalidade-dependente-tpd',
    },
    differential: {
      disorderId: 'separation_anxiety_disorder',
      whyNot: 'O medo não é de que algo de ruim aconteça às pessoas queridas, mas de não conseguir decidir e cuidar de si; qualquer pessoa que assuma esse papel serve, e a submissão vem desde a juventude.',
    },
    explanation: 'Padrão desde a adolescência de necessidade excessiva de cuidado, com submissão: dificuldade de tomar decisões cotidianas sem conselhos, outros assumindo as principais áreas da vida, dificuldade de discordar por medo de perder apoio, insegurança para iniciar tarefas, aceitação de tarefas desagradáveis para manter apoio, desamparo ao ficar só e busca urgente de novo relacionamento quando um termina. O medo é de não dar conta de si, e qualquer pessoa que assuma o cuidado serve; não há temor de que algo aconteça às pessoas queridas, o que afasta o Transtorno de Ansiedade de Separação. Não há raiva intensa, autolesão ou instabilidade, como no borderline, nem crises de medo ou evitação de lugares.',
    giveaways: ['dependen'],
    variants: [
      {
        level: 'easy',
        ages: [22, 40],
        text: `{nome}, {idade} anos, {formado|formada} em administração, vem à UBS com a mãe, que responde à maioria das perguntas. Conta que não consegue escolher a roupa, o almoço ou o que escrever num e-mail sem perguntar a alguém, e que foi a mãe quem decidiu seu curso, seu emprego e o apartamento onde mora.

Desde a adolescência é assim. Há dois meses, quando o namoro de cinco anos terminou, começou outro relacionamento em uma semana, "para não ficar sem ninguém". Nunca discorda da chefia e aceita horas extras sem pagamento para não perder a aprovação. Sente-se {perdido|perdida} quando está {sozinho|sozinha}, com medo de não dar conta de si. Não teme que algo aconteça à mãe; teme não saber se virar sem ela.`,
        clues: [
          'Tem boas ideias no trabalho, mas não começa nenhum projeto sem alguém aprovando cada passo, por não confiar no próprio julgamento.',
          'A família conta que, desde os 15 anos, os pais e depois cada pessoa com quem namorou decidiram por {ele|ela}; o padrão nunca mudou.',
          'Perdeu uma promoção por não decidir nada sem consultar alguém, e os amigos se afastaram porque {ele|ela} só faz o que a pessoa com quem namora quer.',
          'Nunca teve explosões de raiva, autolesão ou mudanças bruscas de humor; diante do risco de ser {deixado|deixada}, fica ainda mais {submisso|submissa}.',
        ],
        rulesOut: 'Não teme que algo aconteça à mãe; teme não saber se virar sem ela.',
      },
      {
        level: 'medium',
        ages: [28, 45],
        text: `{nome}, {idade} anos, técnic{o|a} de laboratório, procura a clínica-escola de psicologia por sugestão de uma colega. Liga para o cônjuge até dez vezes por dia para perguntar o que comprar no mercado, que roupa usar numa reunião ou se deve aceitar um convite. Deixa que o cônjuge decida as finanças, a escola dos filhos e até o curso que {ele|ela} vai fazer.

Concorda com tudo, mesmo pensando diferente, "para não criar clima", e pega os plantões que ninguém quer para agradar a chefia. Quando o cônjuge viaja, chama a irmã para ficar junto e resolver o que surgir; não pensa em acidentes ou doenças, mas se angustia por ter de resolver as coisas sem ajuda. A irmã diz que é assim desde a adolescência.`,
        clues: [
          'Antes do casamento, quando um namoro acabou, engatou outro em poucas semanas com alguém que "cuidava de tudo".',
          'A irmã lembra que, desde os 15 anos, os pais escolhiam por {ele|ela} roupas, amizades e curso, e o padrão só passou para o cônjuge.',
          'Recusou a chefia do laboratório por medo de decidir sem ajuda, e tarefas simples param quando o cônjuge não atende o telefone.',
          'Nunca teve crises súbitas de medo nem evita sair de casa; também não tem explosões de raiva ou autolesão quando teme ser {deixado|deixada}.',
        ],
        rulesOut: 'não pensa em acidentes ou doenças, mas se angustia por ter de resolver as coisas sem ajuda',
      },
      {
        level: 'hard',
        ages: [60, 78],
        text: `{nome}, {idade} anos, {viúvo|viúva} há quatro meses, é {trazido|trazida} à UBS pela filha, que acha que "é tristeza pela perda": {nome} liga para ela quinze vezes por dia perguntando o que cozinhar, que conta pagar ou se deve abrir a porta ao entregador. A filha também se preocupa porque {nome} começou a namorar uma pessoa da igreja, que já administra sua aposentadoria.

{nome} fala do cônjuge com saudade, mas dorme, come e vai aos encontros da igreja como antes; o que {o|a} aflige é ter de decidir sem ninguém. Não teme que algo aconteça aos filhos. Segundo a filha, foi sempre o cônjuge quem decidiu tudo, das compras à cor do carro, e, antes do casamento, os pais.`,
        clues: [
          'Para não desagradar a nova companhia, assina papéis do banco sem ler e nunca diz não aos pedidos que recebe.',
          'A irmã mais velha conta que, desde a adolescência, {nome} não tomava nenhuma decisão sem os pais e, depois do casamento, sem o cônjuge.',
          'Deixa contas vencerem quando não há quem decida por {ele|ela}, e a filha reduziu o horário de trabalho para atender aos telefonemas.',
          'Conversa bem e lembra de tudo; a saudade do cônjuge não domina seus dias, e não há crises súbitas de medo nem receio de sair de casa.',
        ],
        rulesOut: 'Não teme que algo aconteça aos filhos.',
      },
    ],
  },
  {
    disorderId: 'paranoid_personality_disorder',
    reference: {
      label: 'Manual MSD (Profissional) — Transtorno de personalidade paranoide',
      url: 'https://www.msdmanuals.com/pt/profissional/transtornos-psiqui%C3%A1tricos/transtornos-de-personalidade/transtorno-de-personalidade-paranoide-tpp',
    },
    differential: {
      disorderId: 'delusional_disorder',
      whyNot: 'As desconfianças são muitas, mudam de alvo e cedem diante de provas; não há uma crença fixa e inabalável nem vozes, e o padrão existe desde o início da vida adulta.',
    },
    explanation: 'Desconfiança e suspeita generalizadas desde o início da vida adulta: suspeita sem base de que os outros querem enganar ou prejudicar, duvida da lealdade de amigos e colegas, evita confiar informações, vê ameaça em comentários neutros, guarda rancor, reage com raiva a ofensas que ninguém percebe e desconfia da fidelidade do cônjuge, com prejuízo no trabalho e na família. As suspeitas mudam de alvo e cedem diante de provas, sem crença fixa nem vozes, o que afasta o Transtorno Delirante. Não há crenças mágicas ou excentricidade, como no esquizotípico, nem uso de drogas ou declínio cognitivo.',
    giveaways: ['paranoi'],
    variants: [
      {
        level: 'easy',
        ages: [35, 60],
        text: `{nome}, {idade} anos, eletricista, vem ao CAPS por insistência da família depois de brigar com o terceiro vizinho em dois anos. Diz que "ninguém presta": acredita que os colegas querem {prejudicá-lo|prejudicá-la}, não conta nada pessoal a ninguém porque "tudo pode ser usado contra você" e vê deboche até num "bom dia". Nunca perdoa uma ofensa.

É assim desde os 20 anos, em todos os empregos e relações. Revira o celular do cônjuge em busca de traição, sem nunca ter achado nada. Quando lhe mostram provas de que se enganou, admite o erro naquela situação, mas logo passa a desconfiar de outra pessoa. Não ouve vozes, não usa drogas e não tem ideias estranhas sobre o mundo.`,
        clues: [
          'Desconfia até do irmão mais próximo, achando que só se aproxima por interesse na herança dos pais.',
          'Os irmãos contam que já na juventude rompia amizades por suspeitar de traições; o padrão é o mesmo desde então, sem fases de melhora.',
          'Perdeu dois empregos depois de acusar colegas de sabotagem e quase não tem amigos.',
          'As suspeitas mudam de alvo e cedem diante de provas; não há uma certeza única e inabalável nem percepções estranhas.',
        ],
        rulesOut: 'admite o erro naquela situação, mas logo passa a desconfiar de outra pessoa',
      },
      {
        level: 'medium',
        ages: [30, 50],
        text: `{nome}, {idade} anos, analista de sistemas, chega ao ambulatório de saúde mental com encaminhamento da empresa depois de acusar a equipe de apagar seus arquivos para {prejudicá-lo|prejudicá-la}. Troca a senha do computador toda semana, recusa almoços com colegas por achar que querem arrancar informações e leu como ameaça um e-mail que só pedia o relatório "assim que possível".

Ainda fala com raiva de um chefe que {o|a} corrigiu em público há dez anos. O cônjuge conta que {ele|ela} vasculha a fatura do cartão em busca de sinais de traição desde o namoro. Quando a área de TI mostrou registros de que ninguém mexeu nos arquivos, aceitou, mas passou a suspeitar do técnico que fez a checagem. Não ouve vozes.`,
        clues: [
          'Diz que os amigos de infância "só aparecem quando querem algo" e não confia nem nos irmãos para guardar seus documentos.',
          'A família lembra que a desconfiança aparece desde o início da vida adulta, em todos os empregos, sem fases de melhora ou piora marcantes.',
          'Mudou de emprego quatro vezes em oito anos por conflitos com colegas e quase não tem amigos.',
          'Não usa drogas nem estimulantes, os exames de rotina estão normais e não há crenças mágicas ou comportamento excêntrico.',
        ],
        rulesOut: 'aceitou, mas passou a suspeitar do técnico que fez a checagem',
      },
      {
        level: 'hard',
        ages: [60, 75],
        text: `{nome}, {idade} anos, {aposentado|aposentada} dos Correios, é {trazido|trazida} pelo filho à UBS para atualizar o cadastro e fazer exames de rotina, mas se recusa a informar endereço e telefone: "vocês anotam tudo e depois usam contra a gente". Diz que o banco desconta tarifas de propósito da sua aposentadoria e não deixa a enfermeira ver seus papéis.

O filho achou que fosse "coisa da idade", mas os testes de memória vieram normais e ele lembra {do pai|da mãe} sempre assim: brigou com os irmãos por uma herança que achava desviada, nunca perdoou um sócio de 30 anos atrás e, por anos, desconfiou da fidelidade do cônjuge. Quando o filho mostra os extratos, aceita que se enganou, mas logo desconfia de que o vizinho abre sua correspondência.`,
        clues: [
          'Quando a agente de saúde elogiou sua horta, concluiu que ela estava "de olho" no terreno.',
          'Um primo da mesma idade conta que, desde os 20 anos, {nome} rompia amizades por suspeitas de traição; o padrão nunca mudou.',
          'Não fala com os irmãos há anos e afastou os vizinhos com acusações e ameaças de processo.',
          'Não ouve vozes nem tem ideias estranhas; as suspeitas mudam de pessoa, e a orientação e a memória estão preservadas.',
        ],
        rulesOut: 'aceita que se enganou, mas logo desconfia de que o vizinho abre sua correspondência',
      },
    ],
  },
  {
    disorderId: 'antisocial_personality_disorder',
    reference: {
      label: 'Manual MSD (Profissional) — Transtorno de personalidade antissocial',
      url: 'https://www.msdmanuals.com/pt/profissional/transtornos-psiqui%C3%A1tricos/transtornos-de-personalidade/transtorno-de-personalidade-antissocial-tpas',
    },
    differential: {
      disorderId: 'conduct_disorder',
      whyNot: 'Os problemas de conduta começaram antes dos 15 anos, mas o padrão continua depois dos 18, com golpes, mentiras e falta de remorso; nessa idade, o quadro completo é de personalidade.',
    },
    explanation: 'Padrão, desde a adolescência e mantido na vida adulta, de desrespeito aos direitos alheios: atos ilegais repetidos, mentiras, nomes falsos e golpes, impulsividade, brigas, direção perigosa, irresponsabilidade com trabalho e dívidas e ausência de remorso. Há evidência de problemas de conduta antes dos 15 anos (furtos, faltas à escola, fugas, brigas), requisito do diagnóstico; como o padrão continuou depois dos 18 anos, o quadro não é mais de Transtorno de Conduta. Não ocorre só sob efeito de substâncias, em episódios de humor ou com sintomas psicóticos, e a agressividade faz parte de um padrão amplo e calculado, diferente do Transtorno Explosivo Intermitente.',
    giveaways: ['antissocial', 'psicopat', 'sociopat'],
    variants: [
      {
        level: 'easy',
        ages: [22, 35],
        text: `{nome}, {idade} anos, chega ao ambulatório por determinação judicial após ser {preso|presa} aplicando golpes de vendas falsas pela internet. Conta, sem constrangimento, que mente "quando precisa", usa nomes falsos e já enganou parentes para conseguir dinheiro. Sobre as vítimas, diz apenas que "deram mole".

Desde os 12 anos furtava colegas, matava aula, fugia de casa e arrumava brigas. Depois dos 18, acumulou detenções por agressão e por dirigir em alta velocidade sem habilitação, largou empregos sem aviso e não paga a pensão do filho. Não demonstra arrependimento. Age assim sem estar sob efeito de álcool ou drogas e nunca teve fases de energia elevada.`,
        clues: [
          'Muda de cidade de uma hora para outra, sem nenhum plano, sempre que as dívidas ou as denúncias apertam.',
          'A escola registrou furtos, brigas e fugas antes dos 13 anos; o padrão seguiu sem interrupção na vida adulta.',
          'Nunca ficou mais de três meses num emprego, deve dinheiro a vários parentes e perdeu o contato com o filho.',
          'Nunca ouviu vozes nem teve fases de euforia; os golpes são planejados com calma, e as brigas são só uma parte do padrão.',
        ],
        rulesOut: 'Depois dos 18, acumulou detenções por agressão',
      },
      {
        level: 'medium',
        ages: [25, 40],
        text: `{nome}, {idade} anos, é {levado|levada} ao CAPS pela mãe depois de fazer empréstimos no nome dela e sumir com o dinheiro. Na consulta, é {simpático|simpática} e conta versões diferentes da mesma história; quando a mãe chora, diz que ela "vai superar". Já trabalhou em sete lugares, saindo sem aviso ou {demitido|demitida} por desvio de caixa.

A mãe lembra que aos 11 anos {ele|ela} já furtava do caixa da padaria do tio, maltratava o cachorro e fugia da escola. Depois dos 18, teve duas detenções por brigas e passou a dirigir em alta velocidade sem habilitação. Bebe pouco, não usa drogas e faz tudo isso sem estar sob efeito de nada.`,
        clues: [
          'Usa um nome diferente nas redes sociais para pedir dinheiro emprestado a conhecidos, que nunca mais reencontra.',
          'Os problemas começaram antes dos 12 anos e seguiram sem pausa na vida adulta, sempre com o mesmo padrão de mentiras e golpes.',
          'Deve a vários parentes, perdeu a guarda do filho e não consegue alugar imóvel por causa das dívidas.',
          'Nunca ouviu vozes nem teve fases de euforia ou de pouco sono; as brigas são raras perto dos golpes, planejados com calma.',
        ],
        rulesOut: 'Depois dos 18, teve duas detenções por brigas',
      },
      {
        level: 'hard',
        ages: [32, 50],
        text: `{nome}, {idade} anos, {corretor|corretora} de imóveis, procura o consultório "para baixar o estresse" depois de ser {demitido|demitida} da imobiliária, que descobriu sinais de compra desviados para sua conta. Conta a história com calma, diz que "todo mundo no ramo faz isso" e só se queixa de que o cônjuge pediu a separação ao descobrir que {nome} imitava sua assinatura para pegar empréstimos.

A irmã, que {o|a} acompanha, lembra que aos 13 anos {ele|ela} furtava dinheiro dos avós, matava aula e foi {expulso|expulsa} de duas escolas por brigas e por ameaçar um professor com um canivete. Depois dos 18, mudou de emprego e de cidade várias vezes, deixando dívidas e processos para trás. Bebe socialmente e nunca teve fases de energia fora do comum.`,
        clues: [
          'Usa sobrenomes diferentes em cada imobiliária e mantinha duas contas bancárias que o cônjuge desconhecia.',
          'A irmã conta que, desde a adolescência, as mentiras, os furtos e os golpes nunca tiveram intervalo; apenas mudaram de forma.',
          'Responde a três processos por estelionato, perdeu o registro de corretor e os pais cortaram contato por causa das dívidas.',
          'Não usa drogas, não tem explosões de raiva e nunca ouviu vozes; as fraudes são planejadas e ocorrem com o humor estável.',
        ],
        rulesOut: 'Depois dos 18, mudou de emprego e de cidade várias vezes, deixando dívidas e processos para trás.',
      },
    ],
  },
  {
    disorderId: 'schizoid_personality_disorder',
    reference: {
      label: 'Manual MSD (Profissional) — Transtorno de personalidade esquizoide',
      url: 'https://www.msdmanuals.com/pt/profissional/transtornos-psiqui%C3%A1tricos/transtornos-de-personalidade/transtorno-de-personalidade-esquizoide',
    },
    differential: {
      disorderId: 'autism_spectrum_disorder',
      whyNot: 'Na infância, a fala, as brincadeiras e o contato social eram típicos, sem interesses restritos ou rotinas rígidas; o afastamento surgiu na adolescência e é por desinteresse, não por dificuldade de entender os outros.',
    },
    explanation: 'Padrão desde a adolescência de desapego das relações e expressão emocional restrita: não deseja nem aprecia vínculos próximos, inclusive em família, prefere atividades solitárias, tem pouco interesse sexual, sente prazer em poucas coisas, não tem amigos íntimos, parece indiferente a elogios e críticas e tem afeto frio, com prejuízo social e profissional. A infância com desenvolvimento social típico, sem interesses restritos nem rotinas rígidas, afasta o Transtorno do Espectro Autista. Não há medo de rejeição, como no esquivo, crenças estranhas ou percepções incomuns, como no esquizotípico, nem vozes ou tristeza persistente.',
    giveaways: [],
    variants: [
      {
        level: 'easy',
        ages: [28, 45],
        text: `{nome}, {idade} anos, conferente de estoque no turno da noite, vem ao ambulatório com a irmã, preocupada porque {ele|ela} "vive como um eremita". {nome} não entende a preocupação: prefere ficar {sozinho|sozinha}, não sente falta de amigos, nunca quis namorar e acha as festas de família "um desperdício de tempo".

Desde a adolescência é assim. Fala sem mudar a expressão, não se alegra com elogios nem se abala com críticas, e quase nada lhe dá prazer além de longas caminhadas. Não tem medo de ser {rejeitado|rejeitada}; apenas não se interessa pelos outros. Na infância, brincava e conversava como os irmãos. Não tem crenças estranhas nem ouve vozes.`,
        clues: [
          'Diz que nunca sentiu interesse por sexo ou por companhia e não vê nisso nenhum problema.',
          'A irmã conta que o afastamento ficou claro por volta dos 14 anos e se mantém igual há mais de dez anos, em casa e no trabalho.',
          'Recusou uma promoção que exigiria liderar uma equipe e não comparece nem ao aniversário dos pais.',
          'Não tem rotinas rígidas nem interesses restritos, entende ironias e regras sociais e não se sente triste; simplesmente prefere a própria companhia.',
        ],
        rulesOut: 'Na infância, brincava e conversava como os irmãos.',
      },
      {
        level: 'medium',
        ages: [35, 55],
        text: `{nome}, {idade} anos, programador{|a} em trabalho remoto, vai à UBS só para pegar um atestado exigido pelo novo contrato. O médico de família, que conhece a casa há anos, aproveita para conversar: {nome} mora {sozinho|sozinha} há 15 anos, não visita os pais nem no Natal e nunca teve um amigo próximo, sem que isso {o|a} incomode.

Não foi buscar o prêmio de destaque do ano e recebe críticas da chefia com a mesma expressão parada. Passa as folgas pescando {sozinho|sozinha} e nunca se interessou por namoro. Na infância, falava e brincava normalmente; o afastamento começou na adolescência. Não anda triste, dorme bem e nunca teve ideias estranhas ou percepções incomuns.`,
        clues: [
          'Quase nada lhe dá prazer: não acompanha esportes, séries ou música, e só a pesca {o|a} distrai.',
          'Os pais contam que, desde os 15 anos, preferia ficar no quarto a sair com os primos, e o padrão nunca mudou.',
          'Pode perder o emprego por recusar as reuniões presenciais do novo contrato e não tem ninguém a quem recorrer numa emergência.',
          'Não teme críticas nem rejeição e não sente falta de companhia; não tem rotinas rígidas nem interesses restritos.',
        ],
        rulesOut: 'Na infância, falava e brincava normalmente',
      },
      {
        level: 'hard',
        ages: [58, 72],
        text: `{nome}, {idade} anos, é {encaminhado|encaminhada} pela equipe de saúde da família depois que a agente comunitária {o|a} encontrou {caído|caída} em casa, onde estava havia horas: não tem celular nem a quem chamar. A equipe suspeitou de tristeza, mas {ele|ela} conversa com clareza, cuida das contas e nega estar triste: "sempre preferi assim".

O único irmão conta que {nome} foi uma criança comum, que brincava com os primos, mas desde a adolescência se afastou de todos. Nunca namorou nem mostrou interesse por isso, trabalhou 30 anos como vigia noturno sem amigos no serviço e recebeu a notícia da morte da mãe sem mudar a expressão. Não há ideias estranhas nem vozes.`,
        clues: [
          'Elogios e reclamações dos vizinhos parecem não {o|a} afetar, e diz que quase nada lhe dá prazer além de ouvir rádio.',
          'O afastamento começou por volta dos 15 anos e se mantém igual há mais de 40 anos, sem mudança recente de comportamento.',
          'Ninguém notou sua ausência por dois dias, e {ele|ela} recusa as visitas do irmão e da equipe, o que aumenta o risco de novos acidentes.',
          'Não teme rejeição nem sente falta de companhia; não tem rotinas rígidas nem interesses restritos, e dorme e come bem.',
        ],
        rulesOut: 'foi uma criança comum, que brincava com os primos',
      },
    ],
  },
  {
    disorderId: 'schizotypal_personality_disorder',
    reference: {
      label: 'Manual MSD (Profissional) — Transtorno de personalidade esquizotípica',
      url: 'https://www.msdmanuals.com/pt/profissional/transtornos-psiqui%C3%A1tricos/transtornos-de-personalidade/transtorno-de-personalidade-esquizot%C3%ADpica',
    },
    differential: {
      disorderId: 'schizophrenia',
      whyNot: 'As ideias estranhas não chegam a certezas inabaláveis, as percepções são impressões passageiras, não há vozes nem desorganização, e o padrão é estável desde a adolescência, sem surto nem declínio.',
    },
    explanation: 'Padrão desde a adolescência de desconforto intenso nas relações, com distorções cognitivas e perceptivas e excentricidade: ideias de referência, crenças mágicas que não pertencem ao seu meio cultural, percepções incomuns, fala vaga e cheia de rodeios, desconfiança, afeto restrito, aparência peculiar, falta de amigos íntimos e desconforto social que não diminui com a convivência. As ideias não são sustentadas com convicção total e as percepções são impressões passageiras, sem vozes, desorganização ou declínio, o que afasta a Esquizofrenia e o Transtorno Delirante. A infância com desenvolvimento social típico afasta o Transtorno do Espectro Autista.',
    giveaways: [],
    variants: [
      {
        level: 'easy',
        ages: [20, 32],
        text: `{nome}, {idade} anos, auxiliar de gráfica, vem ao CAPS com a mãe, que estranha seu jeito "de outro mundo". Diz ter um "sexto sentido" que permite prever acidentes pelas placas dos carros e acha que certas músicas no rádio são recados para {ele|ela}. Às vezes sente uma presença ao seu lado quando a casa está em silêncio.

Desde os 14 anos é {visto|vista} como {estranho|estranha}: usa roupas fora de época, fala de modo vago e cheio de rodeios e quase não sorri. Não tem amigos fora da família e, mesmo com colegas de anos, continua {desconfiado|desconfiada} e {tenso|tensa}. Admite que suas impressões podem ser coincidência. Não ouve vozes e não usa drogas.`,
        clues: [
          'Anota num caderno regras próprias sobre números e cores que, segundo {ele|ela}, explicam o que acontece no bairro.',
          'Na infância brincava e conversava como as outras crianças; as esquisitices começaram na adolescência e se mantêm iguais desde então.',
          'Largou o curso técnico por não suportar os trabalhos em grupo e só mantém o emprego porque trabalha {isolado|isolada} na máquina.',
          'Nunca houve período de piora, fala desorganizada ou certeza que não admitisse dúvida; a família, católica, estranha essas ideias.',
        ],
        rulesOut: 'Admite que suas impressões podem ser coincidência.',
      },
      {
        level: 'medium',
        ages: [24, 40],
        text: `{nome}, {idade} anos, auxiliar de almoxarifado, procura o serviço de psicologia da empresa por indicação do supervisor, depois de queixas dos colegas. Usa o mesmo casaco de lã até no verão e carrega no bolso um fio de cobre que, segundo {ele|ela}, "desvia as intenções" das pessoas. Acha que as risadas no corredor são sobre {ele|ela}, embora admita não ter certeza.

Fala em rodeios e metáforas que ninguém acompanha e, às vezes, vê um vulto no canto do olho que some quando olha. Almoça {sozinho|sozinha} há seis anos e continua desconfortável com a mesma equipe. A irmã diz que é assim desde a adolescência; antes, brincava e conversava normalmente. Não ouve vozes, não usa drogas e nunca teve uma fase de piora.`,
        clues: [
          'Mantém o rosto sério e sem expressão até quando os colegas brincam, e desconfia de quem tenta se aproximar.',
          'Desde os 15 anos a família estranha seu jeito de vestir, falar e pensar, que se mantém o mesmo desde então, sem períodos de piora.',
          'Foi {transferido|transferida} duas vezes de setor por conflitos e não tem nenhum amigo fora da família.',
          'Não tem rotinas rígidas nem interesses restritos, e nenhuma dessas ideias faz parte da religião ou dos costumes da família.',
        ],
        rulesOut: 'embora admita não ter certeza',
      },
      {
        level: 'hard',
        ages: [35, 55],
        text: `{nome}, {idade} anos, arquivista, procura a clínica médica por dores de cabeça que atribui às "ondas" da nova antena do bairro. Os exames vieram normais, e {ele|ela} aceita a explicação do médico, embora diga que "sente coisas que os outros não sentem". Veio de casaco grosso num dia de 30 graus e descreveu a dor com longos rodeios.

A irmã conta que, desde a adolescência, {nome} vive à parte: sem amigos, com um lenço amarrado no pulso "para segurar a energia" e a impressão de que buzinas e semáforos às vezes "falam com {ele|ela}". No arquivo onde trabalha há 15 anos, continua {desconfiado|desconfiada} e {tenso|tensa} com os mesmos colegas. Admite que pode ser impressão e não ouve vozes.`,
        clues: [
          'Às vezes tem a impressão de ver sombras passando no canto do olho, que somem quando olha diretamente.',
          'A irmã lembra uma infância comum, com amigos na rua; o jeito estranho surgiu na adolescência e não mudou nos últimos 20 anos.',
          'Nunca teve um relacionamento, foi {transferido|transferida} para o arquivo por conflitos e almoça {sozinho|sozinha} todos os dias.',
          'Não usa drogas, entre as consultas não pensa nas dores de cabeça, e nunca houve período de piora, fala desorganizada ou certezas inabaláveis.',
        ],
        rulesOut: 'Admite que pode ser impressão e não ouve vozes.',
      },
    ],
  },
  {
    disorderId: 'histrionic_personality_disorder',
    reference: {
      label: 'Manual MSD (Profissional) — Transtorno de personalidade histriônica',
      url: 'https://www.msdmanuals.com/pt/profissional/transtornos-psiqui%C3%A1tricos/transtornos-de-personalidade/transtorno-de-personalidade-histri%C3%B4nica',
    },
    differential: {
      disorderId: 'bpd',
      whyNot: 'Não há autolesão, ameaças de suicídio, vazio crônico nem raiva intensa; as emoções são vivas, mas superficiais e passageiras, e a busca é por atenção, não por evitar um abandono.',
    },
    explanation: 'Padrão desde a adolescência de emotividade excessiva e busca de atenção: desconforto quando não é o centro das atenções, comportamento sedutor inadequado, emoções superficiais que mudam rápido, uso da aparência para chamar atenção, fala impressionista e vaga, dramatização, sugestionabilidade e relações vistas como mais íntimas do que são, com prejuízo no trabalho e nas relações. Não há autolesão, vazio crônico, raiva intensa ou medo desesperado de abandono, o que afasta o Transtorno de Personalidade Borderline. A busca é por qualquer atenção, e não por admiração como superior, como no narcisista, e o padrão é contínuo, sem episódios de humor.',
    giveaways: ['histri'],
    variants: [
      {
        level: 'easy',
        ages: [22, 40],
        text: `{nome}, {idade} anos, representante comercial, procura terapia depois de ser {advertido|advertida} pela empresa por comportamento inadequado com clientes. Entra no consultório elogiando a decoração, chama a psicóloga de "minha amiga" já no primeiro encontro e conta, entre risos e lágrimas que se alternam em minutos, que "ninguém {o|a} entende".

Desde a adolescência precisa ser o centro das atenções: usa roupas chamativas, flerta com clientes e colegas, faz cenas quando ninguém repara {nele|nela} e muda de opinião conforme o último vídeo que viu. Descreve tudo como "maravilhoso" ou "horrível", sem dar detalhes. Nunca se machucou nem ameaçou se matar, e o choro passa em minutos.`,
        clues: [
          'Chama de "melhor amigo" um cliente que viu duas vezes e se magoa quando ele não lembra seu nome.',
          'Os pais contam que, desde os 15 anos, o mesmo jeito aparece na escola, no trabalho e nas relações, sem fases de energia diferente.',
          'Perdeu dois empregos por conflitos com colegas, e as amizades duram pouco porque as pessoas se cansam de suas cenas.',
          'Não há raiva explosiva, vazio ou medo desesperado de abandono; quando um namoro termina, logo se encanta por outra pessoa, sem grande sofrimento.',
        ],
        rulesOut: 'Nunca se machucou nem ameaçou se matar',
      },
      {
        level: 'medium',
        ages: [28, 50],
        text: `{nome}, {idade} anos, {servidor|servidora} da prefeitura, é {encaminhado|encaminhada} pela chefia ao serviço de saúde do servidor depois de queixas de colegas. Vai às reuniões com roupas de festa, interrompe para contar casos pessoais e, quando o assunto muda, chora alto; minutos depois está rindo. Diz que a estagiária que conheceu há uma semana já é "da família".

Fala muito, com frases como "foi tudo tão intenso", mas não consegue dizer o que aconteceu. Já mudou de igreja, de corte de cabelo e de opinião política seguindo a amizade do momento, e flerta com quem acaba de conhecer, até com fornecedores da prefeitura. A família diz que é assim desde o colégio. Nunca se feriu e esquece as brigas no dia seguinte.`,
        clues: [
          'Quando ninguém comenta suas fotos nas redes, posta mensagens enigmáticas até que perguntem o que houve.',
          'Os pais contam que, desde os 15 anos, precisava ser a atração de qualquer encontro, e o padrão nunca mudou.',
          'Já foi {transferido|transferida} três vezes de setor e perdeu amizades, que se cansaram de suas cenas.',
          'Não sente vazio, não ameaça se matar nem tem explosões de raiva; quando {contrariado|contrariada}, faz cena, mas se recompõe em minutos.',
        ],
        rulesOut: 'Nunca se feriu e esquece as brigas no dia seguinte.',
      },
      {
        level: 'hard',
        ages: [40, 60],
        text: `{nome}, {idade} anos, procura o consultório uma semana depois de o cônjuge sair de casa e diz estar "{destruído|destruída}, no fundo do poço". Minutos depois, ri ao mostrar fotos da festa de sábado e o perfil de alguém que conheceu num aplicativo. Chama o terapeuta de "meu confidente" e pergunta se gostou do seu perfume novo.

Segundo a irmã, o casamento acabou depois de anos de cenas em público sempre que {nome} não era o centro das atenções e de flertes com amigos do casal. {Ele|Ela} conta tudo de forma vaga, "foi intenso demais", e já pensa em mudar de cidade porque uma amiga sugeriu. Sempre foi assim, desde o colégio. Nunca se machucou de propósito e não fala em vazio.`,
        clues: [
          'Vai às consultas com roupas de festa e faz comentários em voz alta na recepção até que todos olhem.',
          'A irmã lembra o mesmo jeito desde os 15 anos, em casa, na escola e em todos os empregos, sem fases de energia ou sono diferentes.',
          'Mudou de emprego quatro vezes em dez anos por conflitos com colegas e perdeu amizades que se cansaram de suas cenas.',
          'Não há raiva explosiva nem ameaças de suicídio; a tristeza pela separação dura minutos e não {o|a} impede de sair todas as noites.',
        ],
        rulesOut: 'Nunca se machucou de propósito e não fala em vazio.',
      },
    ],
  },
]
