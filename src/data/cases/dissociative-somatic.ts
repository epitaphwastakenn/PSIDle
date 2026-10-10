import type { DisorderCaseSet } from './types'

export const dissociativeSomaticCases: DisorderCaseSet[] = [
  {
    disorderId: 'dissociative_identity_disorder',
    reference: {
      label: 'Manual MSD (Profissional) — Transtorno dissociativo de identidade',
      url: 'https://www.msdmanuals.com/pt/profissional/transtornos-psiqui%C3%A1tricos/transtornos-dissociativos/transtorno-dissociativo-de-identidade',
    },
    differential: {
      disorderId: 'dissociative_amnesia',
      whyNot: 'As lacunas de memória vêm junto com estados de identidade distintos, com outro nome, voz e jeito, presenciados por outras pessoas; a amnésia isolada não explica essas trocas.',
    },
    explanation: 'Dois ou mais estados de identidade distintos, com nome, voz, postura e gostos próprios, presenciados por quem convive com a pessoa, com ruptura do senso de si e do controle sobre os próprios atos, além de lacunas repetidas de memória para fatos do cotidiano, muito além do esquecimento comum, com prejuízo. Eletroencefalograma e exames normais, ausência de álcool e drogas e trocas fora de qualquer prática religiosa afastam outras causas. Na Amnésia Dissociativa há lacunas de memória, mas não estados de identidade que se alternam. Não há vozes vindas de fora, fases de humor de dias ou relações instáveis que sugiram quadros psicóticos, bipolares ou de personalidade.',
    giveaways: ['identidade', 'múltiplas personalidades', 'personalidades múltiplas', 'alter ego'],
    variants: [
      {
        level: 'easy',
        ages: [24, 40],
        text: `{nome}, {idade} anos, auxiliar administrativ{o|a}, procura o ambulatório de psiquiatria, {envergonhado|envergonhada}, depois de muita insistência da irmã. Desde a adolescência, perde horas e até dias inteiros: encontra em casa roupas que não lembra de ter comprado e mensagens enviadas que não reconhece, e já se viu em bairros distantes sem saber como chegou.

A irmã descreve o que vê nesses períodos: ora {nome} fala com voz de criança e diz ter sete anos, ora se apresenta como "Dani", com outro jeito de andar, outra letra e outros gostos. Depois, não lembra de nada. Não bebe nem usa drogas, o eletroencefalograma veio normal e as trocas não acontecem em cultos ou rituais.`,
        clues: [
          'Diz que às vezes as mãos parecem agir sozinhas, como se outra pessoa estivesse no comando e {ele|ela} apenas assistisse.',
          'Os lapsos começaram no início da adolescência e se repetem várias vezes por mês, durando de minutos a dias, sem relação com sono ou febre.',
          'Perdeu dois empregos por faltas e por compromissos que não lembra de ter marcado, e a irmã passou a cuidar das contas da casa.',
          'As falhas de memória não se prendem a um fato marcante: coincidem com as trocas de nome, voz e jeito que a família presencia.',
        ],
        rulesOut: 'ora se apresenta como "Dani", com outro jeito de andar, outra letra e outros gostos',
      },
      {
        level: 'medium',
        ages: [26, 42],
        text: `{nome}, {idade} anos, professor{|a} do ensino fundamental, chega ao ambulatório com uma pasta de "provas" que juntou nos últimos meses: notas de compras que não reconhece, conversas no celular assinadas por um tal de "Rafa" e um caderno com letra que não é a sua. Diz que às vezes "volta a si" no meio da tarde sem saber o que fez desde o almoço.

O cônjuge conta que, nesses intervalos, {nome} fala mais grosso, usa gírias que nunca usou e não atende pelo próprio nome. Isso vem desde a juventude, várias vezes por mês. A família chegou a levá-l{o|a} para rezar, mas as mudanças acontecem em casa e no trabalho, fora de qualquer culto. Não bebe, e os exames neurológicos vieram normais.`,
        clues: [
          'Já foi {cumprimentado|cumprimentada} na rua por pessoas que {o|a} chamam de Rafa e dizem conhecê-l{o|a} de festas de que não se lembra.',
          'Os episódios começaram no fim da adolescência, duram de minutos a horas e se repetem várias vezes por mês, sem relação com sono, febre ou bebida.',
          'Recebeu advertência da escola por faltar a reuniões que marcou sem lembrar e passou a anotar no celular cada passo do dia.',
          'Os esquecimentos não se restringem a uma fase difícil ou a um único fato: são frequentes e coincidem com as mudanças que outros percebem.',
        ],
        rulesOut: 'nesses intervalos, {nome} fala mais grosso, usa gírias que nunca usou e não atende pelo próprio nome',
      },
      {
        level: 'hard',
        ages: [44, 55],
        text: `{nome}, {idade} anos, contador{|a}, é {levado|levada} pelo cônjuge ao ambulatório de neurologia por "falta de memória". Esquece trechos inteiros de dias de trabalho e, há duas semanas, foi {encontrado|encontrada} num shopping do outro lado da cidade sem saber como tinha chegado. Atribui tudo ao estresse do fechamento do ano; ressonância, eletroencefalograma e exames de sangue vieram normais.

Já sem {nome} na sala, o cônjuge acrescenta, constrangido, que nesses períodos {ele|ela} fala como criança pequena, chama a si mesm{o|a} de "Cris" e pede para ver desenhos animados; horas depois, volta ao jeito de sempre sem lembrar de nada. Diz que isso acontece desde que se casaram, há vinte anos. {nome} não bebe.`,
        clues: [
          'Encontra no carro brinquedos e cadernos de colorir que não lembra de ter comprado, embora não haja crianças pequenas em casa.',
          'Os lapsos ficaram mais frequentes nos últimos dois anos, chegando a três ou quatro por mês, sempre com volta completa ao jeito habitual.',
          'Perdeu um cliente por não lembrar de uma reunião que conduziu e deixou de dirigir com medo de "sumir" no trânsito.',
          'Um vídeo feito pelo filho mostra a mudança: em segundos, {nome} troca a postura e a voz, diz se chamar Cris e conversa com fluência.',
        ],
        rulesOut: 'nesses períodos {ele|ela} fala como criança pequena, chama a si mesm{o|a} de "Cris"',
      },
    ],
  },
  {
    disorderId: 'depersonalization_derealization_disorder',
    reference: {
      label: 'Manual MSD (Profissional) — Transtorno de despersonalização/desrealização',
      url: 'https://www.msdmanuals.com/pt/profissional/transtornos-psiqui%C3%A1tricos/transtornos-dissociativos/transtorno-de-despersonaliza%C3%A7%C3%A3o-desrealiza%C3%A7%C3%A3o',
    },
    differential: {
      disorderId: 'panic',
      whyNot: 'A estranheza é contínua, presente quase o dia todo, e não surge em crises súbitas de medo com coração disparado e falta de ar que passam em minutos.',
    },
    explanation: 'Experiências persistentes de distanciamento de si — sentir-se fora do corpo, observando a própria vida, com voz e mãos que parecem de outra pessoa — e de irrealidade do ambiente, visto como plano, sem cor ou atrás de um vidro, com o teste de realidade preservado: a pessoa sabe que é uma sensação. O quadro dura anos e traz prejuízo. Exames normais e ausência de drogas e remédios afastam causas orgânicas ou induzidas. A estranheza é contínua e não surge em crises súbitas de medo, como no Transtorno do Pânico; não há vozes nem crenças fixas, como nos quadros psicóticos, e o humor está preservado.',
    giveaways: ['irreal', 'estranhamento'],
    variants: [
      {
        level: 'easy',
        ages: [18, 23],
        text: `{nome}, {idade} anos, estudante de engenharia, procura o serviço de saúde da universidade porque, há quase dois anos, sente-se "fora do próprio corpo", como se assistisse à própria vida num filme. A voz parece de outra pessoa, o reflexo no espelho parece estranho e o mundo ao redor ficou sem cor, distante e irreal, como um cenário.

{Ele|Ela} sabe que é uma sensação e que tudo continua real: "não estou {louco|louca}, mas parece que vivo num sonho". Os sintomas começaram numa semana de provas e quase não dão trégua. Nunca teve crises súbitas de medo com coração disparado. Não usa maconha nem outras drogas, e o eletroencefalograma e a ressonância vieram normais.`,
        clues: [
          'Precisa tocar objetos e repetir o próprio nome para se sentir "presente"; às vezes as mãos parecem de outra pessoa.',
          'A sensação está presente quase o dia inteiro desde que começou, sem fases de tristeza, e piora quando dorme pouco.',
          'Trancou duas disciplinas porque não consegue acompanhar as aulas e se afastou dos amigos, que não entendem o que sente.',
          'A estranheza é constante, sem ondas de medo intenso que comecem de repente e passem em minutos; não há lugares que evite.',
        ],
        rulesOut: 'Nunca teve crises súbitas de medo com coração disparado.',
      },
      {
        level: 'medium',
        ages: [15, 17],
        text: `{nome}, {idade} anos, alun{o|a} do ensino médio, é {trazido|trazida} pela mãe ao ambulatório porque anda "{esquisito|esquisita}" desde o começo do ano passado. Passa minutos diante do espelho tocando o rosto, como quem tenta se reconhecer, e diz que a própria voz soa como uma gravação. Na escola, comenta que os colegas parecem atores e a sala, um cenário atrás de um vidro.

Pergunta à mãe se "isso é normal" e sabe que nada mudou de verdade: é a sensação que não passa. Está assim quase o dia todo, todos os dias. Não há momentos de medo intenso que venham de repente; o exame neurológico foi normal, e o teste de urina para drogas, pedido pelo pediatra, veio negativo.`,
        clues: [
          'Conta que se sente um robô: faz tudo no automático, como se apenas assistisse a si mesm{o|a} de fora.',
          'Começou numa semana de provas em que dormiu pouco e, desde então, nunca sumiu; piora quando está {cansado|cansada}.',
          'Saiu do time de vôlei e passa os intervalos sozinh{o|a}, porque conversar exige um esforço enorme para "parecer presente".',
          'A estranheza é um pano de fundo constante, sem ondas de medo com falta de ar; não está triste e não ouve vozes.',
        ],
        rulesOut: 'Não há momentos de medo intenso que venham de repente',
      },
      {
        level: 'hard',
        ages: [26, 32],
        text: `{nome}, {idade} anos, programador{|a}, chega {encaminhado|encaminhada} pelo oftalmologista. Queixa-se de que "a vista ficou chapada": tudo parece plano, sem profundidade, como numa tela, e as cores perderam a vida. Culpa as dez horas diárias no computador; já trocou de óculos duas vezes, e fundo de olho, campo visual, ressonância e eletroencefalograma vieram normais.

Na conversa, comenta de passagem que a própria voz soa distante e que às vezes olha as mãos no teclado como se fossem de outra pessoa. "Sei que é coisa da minha cabeça, mas não passa." Está assim, quase sem pausas, desde os 20 anos. Não usa drogas nem remédios e nunca teve crises de medo repentino.`,
        clues: [
          'Em fotos de família, reconhece o próprio rosto, mas sem sentir que aquela pessoa é {ele|ela}; as lembranças parecem cenas de filme.',
          'Começou no último ano da faculdade, numa fase de muito estresse, e persiste quase todos os dias desde então, sem fases de tristeza.',
          'Recusou uma promoção porque reuniões longas {o|a} deixam {exausto|exausta} do esforço de "parecer presente" diante da equipe.',
          'A sensação não vem em ondas de medo com falta de ar e coração acelerado; é contínua, e não há lugares que evite por receio de passar mal.',
        ],
        rulesOut: 'nunca teve crises de medo repentino',
      },
    ],
  },
  {
    disorderId: 'dissociative_amnesia',
    reference: {
      label: 'Manual MSD (Profissional) — Amnésia dissociativa',
      url: 'https://www.msdmanuals.com/pt/profissional/transtornos-psiqui%C3%A1tricos/transtornos-dissociativos/amn%C3%A9sia-dissociativa',
    },
    differential: {
      disorderId: 'dissociative_identity_disorder',
      whyNot: 'Ninguém observou outros nomes, vozes ou modos de agir, e não há lapsos repetidos no dia a dia; a perda de memória se restringe a informações ligadas a um estresse intenso.',
    },
    explanation: 'Incapacidade de recordar informações autobiográficas importantes ligadas a um estresse intenso, muito além do esquecimento comum: na fuga, o próprio nome e a história de vida; nos outros casos, um período inteiro, com o restante da memória preservado e capacidade normal de aprender coisas novas. Há sofrimento e prejuízo. A ausência de pancada na cabeça, álcool, drogas, convulsões e declínio cognitivo, com exames normais, afasta causas orgânicas. Não há estados de identidade alternados nem lapsos recorrentes no cotidiano, como no Transtorno Dissociativo de Identidade, nem pesadelos ou revivências que indiquem um quadro pós-traumático.',
    giveaways: ['amnésia'],
    variants: [
      {
        level: 'easy',
        ages: [35, 55],
        text: `{nome}, {idade} anos, é {levado|levada} pela polícia ao pronto-socorro de uma cidade a 400 km de casa: estava havia horas na rodoviária sem saber o próprio nome, onde morava ou como tinha chegado ali. {Calmo|Calma} e {atento|atenta}, conversava normalmente; só não lembrava da própria história.

A irmã, que registrou o desaparecimento, conta que {ele|ela} sumiu dois dias antes, logo depois de descobrir que o cônjuge mantinha outra família havia anos. Não havia sinais de pancada na cabeça; exame toxicológico, tomografia e eletroencefalograma vieram normais, e {ele|ela} não bebe. Nunca teve outro episódio de amnésia nem mudanças de nome ou de jeito.`,
        clues: [
          'Aprende coisas novas sem dificuldade: decora o nome das enfermeiras e os horários do hospital, mas não reconhece fotos da própria família.',
          'As lembranças começam a voltar no terceiro dia, primeiro as da infância; as das semanas antes da viagem continuam apagadas.',
          'Precisa da irmã para retomar contas, documentos e trabalho, e ainda não sabe dizer o que fez nos dois dias de sumiço.',
          'A família nunca {o|a} viu se apresentar com outro nome ou agir como outra pessoa, nem perder horas ou dias em outras ocasiões.',
        ],
        rulesOut: 'Nunca teve outro episódio de amnésia nem mudanças de nome ou de jeito.',
      },
      {
        level: 'medium',
        ages: [24, 40],
        text: `{nome}, {idade} anos, operador{|a} de caixa de supermercado, é {levado|levada} pela irmã à UBS. Há três meses, foi {chamado|chamada} à gerência e {acusado|acusada} de desviar dinheiro do caixa — injustamente, como as câmeras provaram depois. Do fim daquela reunião até o domingo seguinte, três dias inteiros, não guarda nenhuma lembrança: ouve o que a irmã conta "como se fosse a história de outra pessoa".

No resto, a memória vai bem: lembra da infância, das contas a pagar e de tudo o que fez desde então. Não bateu a cabeça, não bebe e nunca teve convulsões. Ninguém notou {nele|nela} mudanças de nome, de voz ou de jeito, nem outros esquecimentos assim.`,
        clues: [
          'Fala do "buraco" na memória com estranha tranquilidade e muda de assunto quando a irmã tenta reconstituir aqueles dias.',
          'O esquecimento surgiu logo após a reunião e, três meses depois, segue igual: nada voltou, e nenhuma outra lembrança se perdeu.',
          'Não voltou a trabalhar: diz que não consegue encarar ninguém sem saber o que fez e disse naqueles três dias, embora o humor e o sono estejam bons.',
          'Não tem pesadelos nem sobressaltos, não acha em casa objetos que não reconheça e a família não relata outros períodos esquecidos.',
        ],
        rulesOut: 'Ninguém notou {nele|nela} mudanças de nome, de voz ou de jeito, nem outros esquecimentos assim.',
      },
      {
        level: 'hard',
        ages: [56, 66],
        text: `{nome}, {idade} anos, é {encaminhado|encaminhada} pelo clínico ao ambulatório de memória porque "anda esquecendo coisas". A família estranhou quando, no aniversário do filho caçula, {ele|ela} perguntou por que o rapaz tinha perdido o emprego: não lembra de nada do mês em que o filho ficou preso, há dois anos — nem das visitas, nem da audiência, nem do advogado que pagaram.

No mais, cuida sozinh{o|a} da casa, paga as contas, usa o celular e comenta as notícias da semana. A avaliação de memória veio normal para a idade, assim como a ressonância e os exames de sangue. Não bebe, nunca bateu a cabeça nem teve convulsões e anda de bom humor. A família não lembra de outros brancos nem de dias em que {ele|ela} parecesse outra pessoa.`,
        clues: [
          'Diante de fotos e documentos daquele mês, olha com estranheza, como se fossem da vida de outra pessoa, e logo muda de assunto.',
          'A lacuna existe desde aquela época e não cresceu: dois anos depois, continua restrita ao mesmo mês, sem novos esquecimentos.',
          'O filho se magoa por {ele|ela} não lembrar das visitas e das promessas feitas naquele mês, e os almoços de família ficaram tensos.',
          'Ninguém nunca {o|a} viu se apresentar com outro nome ou agir como outra pessoa, e não há em casa objetos ou compras que não reconheça.',
        ],
        rulesOut: 'A família não lembra de outros brancos nem de dias em que {ele|ela} parecesse outra pessoa.',
      },
    ],
  },
  {
    disorderId: 'somatic_symptom_disorder',
    reference: {
      label: 'Manual MSD (Profissional) — Transtorno de sintomas somáticos',
      url: 'https://www.msdmanuals.com/pt/profissional/transtornos-psiqui%C3%A1tricos/sintoma-som%C3%A1tico-e-transtornos-relacionados/transtorno-de-sintomas-som%C3%A1ticos',
    },
    differential: {
      disorderId: 'illness_anxiety_disorder',
      whyNot: 'Os sintomas corporais são intensos, quase diários, e estão no centro do sofrimento; no Transtorno de Ansiedade de Doença eles são ausentes ou leves, e o foco é o medo de ter uma doença.',
    },
    explanation: 'Sintomas corporais incômodos e persistentes (dores, cansaço, enjoo), presentes há mais de seis meses, com pensamentos desproporcionais sobre sua gravidade, preocupação alta com a saúde e tempo e energia excessivos dedicados a eles: consultas e exames repetidos, anotações, pesquisas e restrição da rotina, com prejuízo. Achados médicos leves não excluem o diagnóstico. Não há sinais de sintomas provocados nem ganho externo, e as preocupações se restringem à saúde, com humor preservado. Como os sintomas são intensos e ocupam o centro do sofrimento, não se trata de Transtorno de Ansiedade de Doença, em que eles são ausentes ou leves.',
    giveaways: [],
    variants: [
      {
        level: 'easy',
        ages: [32, 45],
        text: `{nome}, {idade} anos, vendedor{|a}, chega ao ambulatório de clínica médica com uma pasta grossa de exames. Há três anos sente dores no abdome, nas costas e nas pernas, além de cansaço e enjoo quase diários. Já passou por gastro, reumato e neurologista; endoscopias, tomografias e exames de sangue vieram normais, mas {ele|ela} teme que seja "algo grave que ninguém achou".

Pensa nas dores o dia inteiro, anota cada sintoma num caderno, pesquisa na internet por horas e já trocou de médico seis vezes. As dores são reais e intensas, e nenhum exame normal {o|a} tranquiliza por mais de dois dias. Quer voltar a trabalhar normalmente, não tem crises súbitas de medo e as preocupações não vão além da saúde.`,
        clues: [
          'Interpreta qualquer pontada nova como sinal de que a doença está avançando e evita esforços para "não piorar".',
          'As queixas mudam de lugar ao longo dos meses, mas nunca somem; o estado de "estar doente" persiste há três anos, sem fases de tristeza.',
          'Reduziu as vendas pela metade porque falta para ir a consultas e não aguenta rodar a cidade com dor.',
          'O incômodo físico é diário e real: o sofrimento gira em torno das dores, e não do medo de ter uma doença escondida sem sintomas.',
        ],
        rulesOut: 'As dores são reais e intensas',
      },
      {
        level: 'medium',
        ages: [42, 56],
        text: `{nome}, {idade} anos, costureir{o|a}, volta pela quinta vez no ano à UBS com dor de cabeça e no pescoço que "não larga". Traz uma tabela da dor, de zero a dez, preenchida de hora em hora, quase sempre com notas entre 7 e 9, e as tomografias que pagou por conta própria, todas normais. A filha conta que recebe ligações no trabalho a cada pontada nova e que {ele|ela} desmarca encontros para "poupar o corpo".

Isso vem desde o carnaval de dois anos atrás. Cada exame normal alivia por um dia, e logo vem a dúvida de que "deixaram passar alguma coisa". Fora da dor, continua gostando das novelas e dos netos, não tem crises de medo repentino e não se preocupa além do normal com dinheiro ou família.`,
        clues: [
          'Dorme com colar cervical para "proteger o pescoço" e lê sobre aneurisma sempre que a dor muda de lugar.',
          'Desde que começou, nunca passou mais de uma semana sem dor, e o medo de que seja algo grave só cresceu.',
          'Recusou encomendas por receio de que a máquina de costura piore o pescoço, e a renda da casa caiu pela metade.',
          'Não é o medo de uma doença futura que {o|a} move: é a dor presente, forte e quase diária, que ocupa pensamentos e rotina.',
        ],
        rulesOut: 'preenchida de hora em hora, quase sempre com notas entre 7 e 9',
      },
      {
        level: 'hard',
        ages: [62, 72],
        text: `{nome}, {idade} anos, {aposentado|aposentada}, é {encaminhado|encaminhada} pelo ortopedista, que se recusa a operar: a ressonância mostra só um desgaste discreto na coluna, comum na idade, sem nada que aperte nervos. Desde que carregou sacos de cimento numa reforma, há dois anos, sente dor lombar forte todos os dias e já consultou cinco especialistas em busca de cirurgia.

O cônjuge conta que {ele|ela} passa as manhãs pesquisando sobre "coluna que paralisa", só senta numa cadeira específica, largou o dominó com os amigos para "não forçar" e se irrita quando ouve que o exame é normal. Ainda assim, ri com os netos e acompanha o futebol. Não pede remédio forte, e a força e a sensibilidade das pernas estão normais.`,
        clues: [
          'Acredita que um movimento errado pode deixá-l{o|a} numa cadeira de rodas e pede ajuda até para pegar objetos leves.',
          'A dor nunca deu trégua por mais de alguns dias nesses dois anos, e a preocupação com ela cresceu mês a mês.',
          'Deixou de ir à igreja e às festas da família por medo de ficar muito tempo {sentado|sentada} e "travar".',
          'A dor diária é o centro das conversas; não há medo de outras doenças sem sintomas nem checagens do corpo em busca de sinais.',
        ],
        rulesOut: 'sente dor lombar forte todos os dias e já consultou cinco especialistas em busca de cirurgia',
      },
    ],
  },
  {
    disorderId: 'illness_anxiety_disorder',
    reference: {
      label: 'Manual MSD (Profissional) — Transtorno de ansiedade de doença',
      url: 'https://www.msdmanuals.com/pt/profissional/transtornos-psiqui%C3%A1tricos/sintoma-som%C3%A1tico-e-transtornos-relacionados/transtorno-de-ansiedade-de-doen%C3%A7a',
    },
    differential: {
      disorderId: 'somatic_symptom_disorder',
      whyNot: 'Não há sintomas corporais relevantes, no máximo sensações leves; o sofrimento vem do medo de ter uma doença grave, e não de sintomas intensos que dominem o dia.',
    },
    explanation: 'Preocupação, há mais de seis meses, com ter uma doença grave, com sintomas corporais ausentes ou leves, alarme fácil diante de qualquer notícia ou sinal e comportamentos excessivos de checagem (apalpar o corpo, fotografar pintas, exames repetidos) ou de evitação mal-adaptativa (adiar exames, fugir de consultas e hospitais). A doença temida muda com o tempo, e exames normais trazem alívio breve. As preocupações não se espalham para outros temas, não há rituais fora da saúde nem crises súbitas de medo. Como não há sintomas corporais importantes no centro do sofrimento, não se trata de Transtorno de Sintomas Somáticos.',
    giveaways: [],
    variants: [
      {
        level: 'easy',
        ages: [25, 38],
        text: `{nome}, {idade} anos, bancári{o|a}, procura a UBS pela terceira vez no mês com medo constante de estar com uma doença grave. Há quase dois anos apalpa o pescoço e as axilas todos os dias em busca de "caroços", pesquisa doenças na internet por horas e já fez, por conta própria, teste de HIV, tomografia e colonoscopia — tudo normal.

Não sente dor nem outro sintoma no corpo: basta uma pinta nova ou um cansaço comum para o alarme disparar. Cada resultado normal acalma por poucos dias, e o medo muda de alvo — no ano passado era câncer; agora, esclerose múltipla. Fora a saúde, não há preocupações exageradas nem rituais, e nunca teve crises súbitas de medo.`,
        clues: [
          'Ao saber que um colega teve câncer, marcou novos exames no mesmo dia e passou a noite lendo sobre os primeiros sinais da doença.',
          'O medo começou depois da morte de um tio, há quase dois anos, e desde então nunca sumiu, só trocou de doença.',
          'Gastou boa parte das economias com exames particulares e chega {atrasado|atrasada} ao banco por causa das consultas.',
          'O exame físico é normal e não há incômodos no corpo; admite que pode estar exagerando, mas a ideia de uma doença escondida não {o|a} larga.',
        ],
        rulesOut: 'Não sente dor nem outro sintoma no corpo',
      },
      {
        level: 'medium',
        ages: [30, 45],
        text: `{nome}, {idade} anos, motorista de ônibus, chega ao dermatologista com o celular cheio de fotos das próprias pintas, tiradas toda noite com uma régua ao lado para comparar o tamanho. É o quarto especialista em dois anos, e as duas biópsias que pediu deram benignas. O cônjuge conta que {ele|ela} pede para conferir as costas no espelho antes de dormir e desistiu da praia nas férias "por precaução".

As pintas não coçam, não doem, não sangram e não mudaram. Quando o médico diz que estão normais, {nome} sai {aliviado|aliviada}, mas em uma semana volta a pensar que "algo pode ter escapado". Antes das pintas, o medo era de um problema no coração. Nunca teve crises súbitas de medo.`,
        clues: [
          'Lê relatos de pacientes até de madrugada e passa dias {abalado|abalada} com qualquer notícia sobre câncer de pele.',
          'O medo de estar com uma doença grave existe há mais de dois anos e muda de órgão; com outros assuntos, não se preocupa além do normal.',
          'Perde dias de trabalho com consultas e exames, e as brigas em casa aumentaram porque o cônjuge se cansou de conferir as pintas.',
          'Não se incomoda com a aparência das pintas nem sente nada nelas: o que {o|a} aflige é a ideia de que uma possa ser câncer.',
        ],
        rulesOut: 'As pintas não coçam, não doem, não sangram e não mudaram.',
      },
      {
        level: 'hard',
        ages: [48, 60],
        text: `{nome}, {idade} anos, don{o|a} de uma pequena oficina, é {levado|levada} à UBS pelo cônjuge, que reclama que {ele|ela} "não se cuida": há dois anos adia a colonoscopia pedida por causa do pai, que morreu de câncer de intestino. Não vai a consultas, não visita parentes internados e muda de canal quando o assunto é doença.

Em casa, porém, confere as fezes todos os dias, apalpa a barriga antes de dormir e pergunta aos filhos se está com "cara de doente". Fora uma azia leve depois do almoço, não sente nada. Explica por que foge do exame: "Se acharem alguma coisa, eu não aguento".`,
        clues: [
          'Lê escondido sobre câncer e passa noites em claro imaginando o pior a cada pequena variação no intestino.',
          'O medo começou pouco depois da morte do pai, há seis anos, e nunca sumiu: já foi do coração, hoje é do intestino. Com a oficina e as contas, é {tranquilo|tranquila}.',
          'As brigas com o cônjuge por causa do exame são constantes, e deixou de ir a festas de família, onde sempre se fala de doença.',
          'Não tem medo de agulha nem de hospital em si e nunca teve crises súbitas de medo: o que evita é a notícia. A azia é leve e não {o|a} preocupa.',
        ],
        rulesOut: 'Fora uma azia leve depois do almoço, não sente nada.',
      },
    ],
  },
  {
    disorderId: 'conversion_disorder',
    reference: {
      label: 'Manual MSD (Profissional) — Transtorno de sintomas neurológicos funcionais (conversivo)',
      url: 'https://www.msdmanuals.com/pt/profissional/transtornos-psiqui%C3%A1tricos/sintoma-som%C3%A1tico-e-transtornos-relacionados/transtorno-de-sintomas-neurol%C3%B3gicos-funcionais',
    },
    differential: {
      disorderId: 'factitious_disorder',
      whyNot: 'Não há sinal de engano: a história confere com a da família e com os registros, nada indica sintomas provocados ou inventados, e não há busca por internações ou procedimentos.',
    },
    explanation: 'Alteração da função motora — fraqueza na perna, crises com movimentos, tremor — com achados de exame incompatíveis com doença neurológica conhecida: sinal de Hoover, crise registrada com eletroencefalograma normal e resistência à abertura dos olhos, tremor que adota o ritmo da outra mão e some com a distração. Os exames normais complementam, mas o diagnóstico se apoia nesses sinais positivos. Há prejuízo importante. Nada indica sintomas inventados ou provocados, nem busca de internações, o que afasta o Transtorno Factício, e não há preocupação excessiva com os sintomas, como no Transtorno de Sintomas Somáticos.',
    giveaways: ['hoover', 'não epiléptic', 'psicogên', 'funcional'],
    variants: [
      {
        level: 'easy',
        ages: [18, 35],
        text: `{nome}, {idade} anos, recepcionista, chega ao pronto-socorro sem conseguir mexer a perna esquerda. A fraqueza começou de repente, na manhã seguinte a uma discussão feia em casa. A ressonância de crânio e de coluna veio normal, e os reflexos estão preservados.

No exame, o neurologista nota o sinal de Hoover: quando {nome} ergue a perna boa contra a mão do médico, o calcanhar da perna "paralisada" pressiona a maca com força, sem que {ele|ela} perceba. {nome} está {assustado|assustada} e quer voltar logo ao trabalho. A família confirma toda a história, e não há internações anteriores nem pedidos de exames ou de atestado.`,
        clues: [
          'Ao andar, arrasta a perna esquerda como um peso morto, com o pé raspando no chão, sem o padrão das lesões neurológicas conhecidas.',
          'É o primeiro episódio: a fraqueza surgiu poucas horas depois da discussão e se mantém igual há cinco dias.',
          'Precisa de muletas e da ajuda da irmã para tomar banho, e já perdeu uma semana de trabalho.',
          'Ninguém {o|a} viu provocar ou exagerar sintomas, e {ele|ela} aceitou bem a fisioterapia, sem pedir novos exames nem mais dias de internação.',
        ],
        rulesOut: 'A família confirma toda a história, e não há internações anteriores nem pedidos de exames ou de atestado.',
      },
      {
        level: 'medium',
        ages: [17, 28],
        text: `{nome}, {idade} anos, atendente de telemarketing, é {internado|internada} para investigar "crises" que começaram há oito meses, logo após a separação dos pais. Cai, sacode braços e pernas de forma desencontrada por até quinze minutos, sem responder e de olhos bem fechados, e chora ao voltar. Dois remédios para epilepsia não mudaram nada.

Na internação, a câmera do exame registrou uma crise típica: o eletroencefalograma ficou normal do início ao fim, e {nome} apertou os olhos quando a médica tentou abri-los. Depois, contou que sente as crises "chegando como um mal-estar" e que tem vergonha delas. A família confirma o relato, e {ele|ela} não busca atestados nem novas internações.`,
        clues: [
          'Durante as crises, a cabeça balança de um lado para o outro e os movimentos aumentam e diminuem em ondas, sem a sequência fixa de uma convulsão.',
          'As crises acontecem uma ou duas vezes por semana, quase sempre em dias de discussão em casa, e nunca durante o sono.',
          'Foi {afastado|afastada} do trabalho por segurança, trancou o curso técnico que fazia à noite e a família não {o|a} deixa mais sair sem companhia.',
          'Os registros do pronto-socorro e do neurologista batem com o que conta, e nunca houve indício de que provocasse ou inventasse as crises.',
        ],
        rulesOut: 'A família confirma o relato, e {ele|ela} não busca atestados nem novas internações.',
      },
      {
        level: 'hard',
        ages: [52, 64],
        text: `{nome}, {idade} anos, comerciante, chega ao ambulatório de neurologia com suspeita de Parkinson, a doença do pai. Há quatro meses, a mão direita treme sem parar: o tremor começou de um dia para o outro, já forte, logo depois de torcer o punho carregando caixas. Não há rigidez nem lentidão, o olfato e a memória estão preservados, e a tireoide está normal.

No exame, quando o médico pede que marque o ritmo de uma música com a mão esquerda, a direita passa a tremer no mesmo compasso; enquanto conta de trás para frente, o tremor quase some. {nome} quer voltar ao balcão, aceita a explicação sem pedir novos exames e não bebe nem toma remédios que causem tremor.`,
        clues: [
          'O tremor muda de ritmo e de direção ao longo da consulta e piora quando a atenção se volta para a mão.',
          'Atingiu a intensidade máxima já no primeiro dia e se mantém há quatro meses, sem a piora lenta e gradual de uma doença degenerativa.',
          'Não consegue mais assinar documentos, segurar um copo cheio ou contar troco, e passou o caixa da loja para o filho.',
          'O relato confere com o da família e com a ficha do pronto-atendimento onde tratou o punho; nunca pediu atestado, internação ou procedimento.',
        ],
        rulesOut: '{nome} quer voltar ao balcão, aceita a explicação sem pedir novos exames',
      },
    ],
  },
  {
    disorderId: 'factitious_disorder',
    reference: {
      label: 'Manual MSD (Profissional) — Transtorno factício autoimposto',
      url: 'https://www.msdmanuals.com/pt/profissional/transtornos-psiqui%C3%A1tricos/sintoma-som%C3%A1tico-e-transtornos-relacionados/transtorno-fact%C3%ADcio-autoimposto',
    },
    differential: {
      disorderId: 'somatic_symptom_disorder',
      whyNot: 'Há engano comprovado, com sinais provocados ou falsificados em segredo; no Transtorno de Sintomas Somáticos os sintomas são genuínos e o problema está nos pensamentos e comportamentos excessivos.',
    },
    explanation: 'Falsificação ou indução de sinais de doença com engano identificado — injeção de material contaminado na pele, aplicação de insulina sem ter diabetes, sangue acrescentado à urina —, com a pessoa se apresentando como doente e buscando internações e procedimentos. Não há ganho externo evidente, como afastamento, indenização ou remédios controlados, o que afasta a simulação. Como os sinais são produzidos de propósito, não se trata de Transtorno de Sintomas Somáticos nem de Transtorno de Conversão, em que os sintomas são genuínos e não intencionais.',
    giveaways: ['munchausen', 'fingi', 'forjad', 'autoprovoc', 'simulaç', 'simulav'],
    variants: [
      {
        level: 'easy',
        ages: [24, 38],
        text: `{nome}, {idade} anos, técnic{o|a} de enfermagem, está na quinta internação em dois anos, cada uma num hospital diferente, por febre e abscessos na coxa que não cicatrizam. As culturas mostram bactérias típicas das fezes, e as feridas pioram justamente quando a alta se aproxima.

Nesta internação, uma enfermeira encontrou na bolsa de {nome} uma seringa com fezes diluídas. {Ele|Ela} nega, mas pede novos exames e uma cirurgia. Não pede atestado nem afastamento, não tem processo ou seguro a receber e recusa remédios fortes para dor. Ninguém da família sabia das internações anteriores.`,
        clues: [
          'Conhece termos médicos a fundo, descreve os sintomas com precisão de livro e sugere à equipe os exames que deveriam ser feitos.',
          'As internações se repetem há dois anos em cidades diferentes, sempre com o mesmo tipo de ferida, que reaparece quando parecia curada.',
          'Já passou por três drenagens cirúrgicas, tem cicatrizes nas duas coxas e quase perdeu o emprego pelas faltas.',
          'A bactéria encontrada na seringa é a mesma das feridas, e os abscessos surgem apenas onde {ele|ela} alcança com as próprias mãos.',
        ],
        rulesOut: 'uma enfermeira encontrou na bolsa de {nome} uma seringa com fezes diluídas',
      },
      {
        level: 'medium',
        ages: [25, 40],
        text: `{nome}, {idade} anos, balconista de farmácia, já foi {levado|levada} quatro vezes ao pronto-socorro em seis meses com suor frio, tremor e confusão por glicose muito baixa. Não tem diabetes. Na última internação, a glicose despencou de madrugada, logo depois de uma ida ao banheiro, e {ele|ela} mesm{o|a} pediu que investigassem um tumor no pâncreas.

Ao arrumar o quarto, a família encontrou canetas de insulina escondidas no guarda-roupa, embora ninguém da casa use o remédio. {nome} diz não saber como foram parar ali. A supervisora conta que {ele|ela} nunca pediu para se afastar, e não há seguro, processo ou benefício em jogo.`,
        clues: [
          'Descreve as crises com termos técnicos e já chegou ao hospital com a própria glicose anotada, antes de qualquer exame.',
          'Os episódios começaram há seis meses, sempre longe dos olhos da equipe e da família, e nunca aconteceram durante o jejum supervisionado.',
          'Fez tomografia e ressonância do pâncreas e ficou uma semana {internado|internada}; a família vive em alerta. Nega tristeza ou qualquer vontade de se machucar.',
          'O sangue colhido numa das crises mostrou insulina alta com peptídeo C baixo, padrão de insulina aplicada, e não produzida pelo corpo.',
        ],
        rulesOut: 'a família encontrou canetas de insulina escondidas no guarda-roupa, embora ninguém da casa use o remédio',
      },
      {
        level: 'hard',
        ages: [38, 50],
        text: `{nome}, {idade} anos, analista de logística, é {encaminhado|encaminhada} à urologia por sangue na urina que vai e volta há um ano. Como teve uma pedra no rim há cinco anos, ninguém estranhou no início. Tomografias, duas cistoscopias e uma biópsia de rim não mostraram nada; mesmo assim, chega a cada consulta com novas amostras vermelhas e pergunta por mais procedimentos.

Desta vez, a residente pediu uma amostra colhida com um técnico presente: veio limpa. As colhidas no banheiro, sozinh{o|a}, seguem com sangue. Em outro hospital, contou ter feito uma cirurgia que não aparece em nenhum registro. Trabalha normalmente e nunca pediu atestado, benefício ou remédio para dor.`,
        clues: [
          'Fala com desenvoltura sobre doenças renais e se irrita quando um médico propõe apenas acompanhar, sem novos exames.',
          'Em um ano, passou por quatro hospitais, contando versões ligeiramente diferentes da mesma história, e troca de médico quando os resultados vêm normais.',
          'Depois da biópsia, teve um sangramento que {o|a} levou à UTI por dois dias e, mesmo assim, pediu uma nova.',
          'Na casa de {nome}, o cônjuge achou lancetas e algodões com sangue escondidos no banheiro, embora ninguém na família meça a glicose.',
        ],
        rulesOut: 'a residente pediu uma amostra colhida com um técnico presente: veio limpa',
      },
    ],
  },
  {
    disorderId: 'psychological_factors_affecting_medical_condition',
    reference: {
      label: 'Manual MSD (Profissional) — Fatores psicológicos que afetam outras condições médicas',
      url: 'https://www.msdmanuals.com/pt/profissional/transtornos-psiqui%C3%A1tricos/sintoma-som%C3%A1tico-e-transtornos-relacionados/fatores-psicol%C3%B3gicos-que-afetam-outras-condi%C3%A7%C3%B5es-m%C3%A9dicas',
    },
    differential: {
      disorderId: 'adjustment_disorder',
      whyNot: 'Não há sofrimento emocional desproporcional nem prejuízo no convívio em resposta a um estressor; o problema é o comportamento ou o estresse que piora diretamente a doença clínica, com consequências documentadas.',
    },
    explanation: 'Uma condição médica documentada — diabetes tipo 1, doença coronariana, asma — é piorada por fatores psicológicos ou comportamentais: negação da gravidade e abandono do tratamento, com internações e novo infarto, ou estresse e minimização de sintomas ligados no tempo a crises comprovadas. Esses fatores não se explicam por outro transtorno mental: humor, sono e convívio preservados, sem crises súbitas de medo, uso de substâncias, desejo de emagrecer ou busca por internações. Diferente do Transtorno de Adaptação, não há sofrimento emocional desproporcional a um estressor; o que está em jogo é o efeito direto sobre a doença.',
    giveaways: [],
    variants: [
      {
        level: 'easy',
        ages: [19, 24],
        text: `{nome}, {idade} anos, tem diabetes tipo 1 desde os 12. Desde que entrou na faculdade, há um ano e meio, deixa de aplicar a insulina perto dos colegas para "não parecer doente", não mede a glicose e repete que "não é tão grave assim". Nesse período, foi {internado|internada} três vezes por cetoacidose, e a hemoglobina glicada subiu de 7% para 12%.

Fora o diabetes, a vida segue bem: humor bom, notas em dia, amigos e sono preservados. Não quer emagrecer, não bebe nem usa drogas e detesta as internações. O endocrinologista {o|a} encaminha porque é o comportamento diante da doença, e não a doença em si, que está pondo sua vida em risco.`,
        clues: [
          'Quando a glicose sobe, atribui a sede e o cansaço ao calor e evita falar da doença até com a família.',
          'O padrão começou com a mudança para a faculdade e se mantém há um ano e meio, sem fases de tristeza ou de energia exagerada.',
          'Perdeu duas provas por causa das internações e já sente formigamento nos pés, sinal precoce de lesão nos nervos.',
          'O descuido não vem com sofrimento emocional desproporcional nem prejuízo no convívio; o dano aparece na própria doença, com internações e exames piores.',
        ],
        rulesOut: 'humor bom, notas em dia, amigos e sono preservados',
      },
      {
        level: 'medium',
        ages: [48, 60],
        text: `{nome}, {idade} anos, caminhoneir{o|a}, infartou há um ano. Três meses depois da alta, parou os remédios — "me sinto {ótimo|ótima}, não preciso disso" —, faltou à reabilitação e voltou às viagens de 14 horas. Quando sentia aperto no peito na estrada, tomava um antiácido e seguia viagem.

Há duas semanas, chegou ao pronto-socorro com um novo infarto, depois de dois dias de dor ignorada. O cônjuge conta que {ele|ela} dorme bem, está de bom humor e conversa sobre tudo — menos sobre o coração, assunto que encerra com uma piada. Nunca fumou, não bebe, recebe os remédios de graça no posto e não tem falhas de memória.`,
        clues: [
          'Esconde da família os episódios de falta de ar e diz ao cardiologista que "está tudo normal", mesmo com a pressão em 180 por 110.',
          'O padrão de minimizar os sintomas e largar o tratamento começou logo após a primeira alta e se repetiu a cada nova orientação.',
          'O segundo infarto deixou o coração mais fraco, e agora {ele|ela} está {impedido|impedida} de dirigir profissionalmente.',
          'Não há tristeza, medo ou aflição desproporcionais ligados à doença; o problema é o comportamento, que piorou diretamente a evolução do coração.',
        ],
        rulesOut: 'dorme bem, está de bom humor e conversa sobre tudo',
      },
      {
        level: 'hard',
        ages: [35, 50],
        text: `{nome}, {idade} anos, contador{|a}, é {encaminhado|encaminhada} pelo pneumologista com uma pergunta: "asma que não responde ao tratamento?". Em um ano, foram seis idas ao pronto-socorro, todas com chiado, oxigenação baixa e necessidade de nebulização. Usa a bombinha de manutenção do jeito certo — a farmácia confirma as retiradas — e passa meses sem nenhuma crise.

O calendário montado com a equipe mostra o que ninguém tinha ligado: as crises caem nas semanas de fechamento de balanço e de auditoria. Nesses períodos, {nome} fica {tenso|tensa} e dorme menos, como os colegas, mas sem sofrimento fora do comum, e a tensão some quando o prazo acaba. Não tem crises súbitas de medo, e no resto do ano o humor e o sono são bons.`,
        clues: [
          'Nos dias de prazo, ignora o aperto no peito até o fim do expediente, porque "não dá para parar agora", e só então usa a medicação de resgate.',
          'O padrão se repete há dois anos: crises nas semanas de prazo apertado e meses tranquilos no resto do ano, com o mesmo tratamento.',
          'Precisou de corticoide em comprimido quatro vezes no último ano e já perdeu dias de trabalho em internações curtas.',
          'A tensão dos prazos não traz tristeza, choro nem afastamento das pessoas; o que chama atenção é o efeito dela sobre a asma, comprovado em cada crise.',
        ],
        rulesOut: 'mas sem sofrimento fora do comum, e a tensão some quando o prazo acaba',
      },
    ],
  },
]
