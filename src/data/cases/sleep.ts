import type { DisorderCaseSet } from './types'

export const sleepCases: DisorderCaseSet[] = [
  {
    disorderId: 'insomnia_disorder',
    reference: {
      label: 'Manual MSD (Profissional) — Insônia e sonolência diurna excessiva (SDE)',
      url: 'https://www.msdmanuals.com/pt/profissional/dist%C3%BArbios-neurol%C3%B3gicos/transtornos-de-sono-e-vig%C3%ADlia/ins%C3%B4nia-e-sonol%C3%AAncia-diurna-excessiva-sde',
    },
    differential: {
      disorderId: 'mdd',
      whyNot: 'O humor e o interesse pelas atividades seguem preservados; a única preocupação é o próprio sono, sem tristeza persistente, culpa ou perda de prazer que formem um episódio depressivo.',
    },
    explanation: 'Dificuldade para iniciar e manter o sono, com despertares longos, pelo menos três noites por semana há mais de três meses, apesar de tempo suficiente na cama, com cansaço, irritação e falhas durante o dia. Vigiar o relógio e se preocupar com a próxima noite mantêm o problema. Não há ronco, desconforto nas pernas, horário biológico deslocado, substâncias ou doença física que expliquem a queixa. Humor e interesse preservados afastam o Transtorno Depressivo Maior, e preocupações restritas ao sono afastam o Transtorno de Ansiedade Generalizada.',
    giveaways: ['insone'],
    variants: [
      {
        level: 'easy',
        ages: [35, 55],
        text: `{nome}, {idade} anos, auxiliar administrativ{o|a} numa escola estadual, procura a UBS porque "não dorme direito há mais de um ano". Vai para a cama às 23h, mas fica olhando o relógio e só pega no sono lá pelas 2h; às 4h acorda de novo e não volta a dormir até o despertador, às 6h.

Isso ocorre quase todas as noites, inclusive nas férias. Durante o dia, anda {cansado|cansada}, {irritado|irritada} e já esqueceu prazos no trabalho. Não ronca, não sente incômodo nas pernas, não usa remédios e não toma café depois do almoço. O humor e a vontade de fazer as coisas seguem os de sempre; a única preocupação é a próxima noite.`,
        clues: [
          'À medida que a noite se aproxima, fica {tenso|tensa} só de pensar na cama, e quanto mais se esforça para dormir, mais {desperto|desperta} fica.',
          'Começou numa fase de sobrecarga no trabalho, há cerca de um ano e meio, e continuou mesmo depois que a rotina se acalmou.',
          'Passou a recusar horas extras, errou duas planilhas no último mês e evita sair à noite para "poupar energia".',
          'Não há tristeza persistente nem perda de prazer, e as preocupações se limitam ao sono e às consequências de dormir mal.',
        ],
        rulesOut: 'O humor e a vontade de fazer as coisas seguem os de sempre',
      },
      {
        level: 'medium',
        ages: [52, 66],
        text: `{nome}, {idade} anos, comerciante, chega ao ambulatório de clínica médica pedindo um remédio para dormir, coisa que nunca usou. Deita às 22h, ouve o relógio da sala bater meia-noite, uma hora, e só apaga perto das 2h; antes das 5h, já está de olhos abertos "esperando o dia". Numa viagem, no sofá da irmã, dormiu a noite inteira.

A rotina vem desde o Carnaval do ano passado, na maior parte das noites. Fecha a loja mais cedo porque erra o troco e perde a paciência com os clientes. Toma um café de manhã e não bebe. Segundo o cônjuge, não ronca nem mexe as pernas. Continua gostando do futebol e de cozinhar aos domingos.`,
        clues: [
          'Mesmo {exausto|exausta}, não consegue cochilar à tarde: deita, fecha os olhos e o sono simplesmente não vem.',
          'Começou com o barulho de uma obra vizinha naquele Carnaval; a obra terminou em poucas semanas, mas as noites ruins continuaram.',
          'Deixou de dirigir na estrada e passou a faltar ao grupo da igreja, {cansado|cansada} demais para sair à noite.',
          'Não há tristeza que dure o dia todo nem perda de interesse; as preocupações giram apenas em torno do sono.',
        ],
        rulesOut: 'Continua gostando do futebol e de cozinhar aos domingos.',
      },
      {
        level: 'hard',
        ages: [66, 79],
        text: `{nome}, {idade} anos, {aposentado|aposentada}, vem à consulta de memória {trazido|trazida} pelo filho, que notou esquecimentos: perde as chaves e se distrai no meio das conversas. Nos testes de memória, porém, vai bem, e continua cuidando {sozinho|sozinha} das contas da casa.

Conversando sobre a rotina, conta que, desde a recuperação de uma cirurgia no joelho, há quase dois anos, deita às 22h30, leva mais de uma hora para dormir e desperta às 2h sem motivo, ficando {acordado|acordada} até quase 5h. Isso ocorre na maioria das noites, e os lapsos aparecem sobretudo depois das noites piores. O joelho não dói mais, não ronca, não usa remédios e continua indo ao coral com prazer.`,
        clues: [
          'Para "compensar", passou a ficar mais tempo na cama de manhã, o que só deixou as noites mais fragmentadas.',
          'As noites ruins começaram com a dor do pós-operatório; a dor passou em poucos meses, mas o sono picado continuou até hoje.',
          'Deixou a tesouraria da associação de moradores e parou de dirigir à noite, com medo de errar por cansaço.',
          'Não há tristeza persistente, culpa ou perda de interesse; os exames de sangue vieram normais e não há queixa de dor.',
        ],
        rulesOut: 'continua indo ao coral com prazer',
      },
    ],
  },
  {
    disorderId: 'hypersomnolence_disorder',
    reference: {
      label: 'Manual MSD (Profissional) — Hipersonia idiopática',
      url: 'https://www.msdmanuals.com/pt/profissional/dist%C3%BArbios-neurol%C3%B3gicos/transtornos-de-sono-e-vig%C3%ADlia/hipersonia-idiop%C3%A1tica',
    },
    differential: {
      disorderId: 'narcolepsy',
      whyNot: 'Não há perda súbita de força com emoções, os cochilos longos não restauram e o teste de latências múltiplas mostra adormecimento rápido sem entradas precoces em sono REM.',
    },
    explanation: 'Sonolência excessiva apesar de um sono principal longo, de nove horas ou mais, com cochilos que não restauram e grande dificuldade para despertar, quase todos os dias há anos, com prejuízo nos estudos ou no trabalho. A polissonografia afasta pausas respiratórias, e o teste de latências múltiplas mostra adormecimento rápido sem períodos REM precoces. Sem cataplexia e sem esses períodos REM, a Narcolepsia não se sustenta. Exames normais, ausência de remédios e drogas e humor preservado afastam causa médica, efeito de substâncias e Transtorno Depressivo Maior.',
    giveaways: ['hipersonia'],
    variants: [
      {
        level: 'easy',
        ages: [20, 28],
        text: `{nome}, {idade} anos, estudante de Administração, procura o ambulatório do sono porque "dorme demais e nunca acorda {descansado|descansada}". Mesmo dormindo 10 a 11 horas por noite, precisa de quatro despertadores e, ao levantar, fica {confuso|confusa} e {lento|lenta} por quase uma hora. Cochila nas aulas e, em casa, tira sonecas de duas horas que não aliviam o sono.

Isso acontece quase todos os dias desde os 18 anos. Nunca sentiu o corpo amolecer ao rir ou se emocionar. A polissonografia não mostrou pausas na respiração, e no teste de cochilos adormeceu em média em 6 minutos, sem entrar em sono REM em nenhum. Tireoide e hemograma estão normais, não usa remédios nem drogas e o humor é bom.`,
        clues: [
          'Já atendeu o celular logo ao acordar e, minutos depois, não se lembrava de ter conversado com ninguém.',
          'Começou aos poucos no fim do ensino médio e se mantém há anos, mesmo nas férias, quando dorme ainda mais.',
          'Trancou duas disciplinas por faltas nas aulas da manhã e perdeu um estágio por chegar {atrasado|atrasada}.',
          'Nunca acordou sem conseguir se mexer nem viu vultos ao pegar no sono, e a noite passa sem despertares.',
        ],
        rulesOut: 'adormeceu em média em 6 minutos, sem entrar em sono REM em nenhum',
      },
      {
        level: 'medium',
        ages: [31, 45],
        text: `{nome}, {idade} anos, técnic{o|a} de laboratório, é {encaminhado|encaminhada} pela médica do trabalho depois de ser {encontrado|encontrada} dormindo no vestiário. Deita às 22h, levanta às 7h30 com cinco alarmes e, mesmo assim, chega {atrasado|atrasada}; nos primeiros minutos do dia "parece {bêbado|bêbada}", tropeça e esquece o que ia fazer.

Desde a faculdade, quase todo dia, cochila no ônibus e no almoço e acorda pior. Nos fins de semana, dorme até meio-dia sem se sentir {descansado|descansada}. Gargalhadas nunca lhe tiraram a força das pernas. No teste de cochilos, adormeceu rápido, mas em nenhum entrou na fase dos sonhos. Os exames de sangue vieram normais, não usa remédios nem bebe, e o humor está bom.`,
        clues: [
          'Depois de um cochilo, fica mais {lento e desorientado|lenta e desorientada} do que antes de dormir, segundo os colegas.',
          'Começou por volta dos 20 anos, foi se firmando aos poucos e se mantém há mais de dez anos, inclusive nas férias.',
          'Recebeu advertência pelos atrasos e deixou de dirigir depois de quase dormir num cruzamento.',
          'O sono da noite é contínuo e profundo, e nunca ficou {paralisado|paralisada} nem viu vultos ao adormecer.',
        ],
        rulesOut: 'No teste de cochilos, adormeceu rápido, mas em nenhum entrou na fase dos sonhos.',
      },
      {
        level: 'hard',
        ages: [33, 46],
        text: `{nome}, {idade} anos, motorista de aplicativo, chega ao ambulatório do sono com suspeita de apneia: ronca, ganhou peso e quase bateu o carro ao cochilar num semáforo. A família acha que é desânimo, mas {ele|ela} segue jogando bola e fazendo planos.

A polissonografia mostrou ronco leve, sem pausas na respiração, e quase dez horas de sono contínuo. Desde os 25 anos dorme assim, desperta com dificuldade e, entre as corridas, cochila uma hora no carro e volta pior. Nunca perdeu a força ao rir ou se assustar. No teste de cochilos, dormiu em 5 minutos em média, sem chegar à fase dos sonhos. Não bebe nem usa remédios ou drogas, e os exames de sangue são normais.`,
        clues: [
          'Quando é {acordado|acordada} de repente, demora a entender onde está e já saiu de casa com o chinelo trocado.',
          'Começou aos poucos, sem doença ou mudança de rotina na época, e nunca melhorou, nem em férias com muitas horas de sono.',
          'Reduziu as corridas pela metade, perdeu renda e deixou de levar a filha à escola com medo de dormir ao volante.',
          'Nunca acordou {paralisado|paralisada} nem viu vultos ao adormecer, e os cochilos são longos e sem sonhos.',
        ],
        rulesOut: 'sem chegar à fase dos sonhos',
      },
    ],
  },
  {
    disorderId: 'narcolepsy',
    reference: {
      label: 'Manual MSD (Profissional) — Narcolepsia',
      url: 'https://www.msdmanuals.com/pt/profissional/dist%C3%BArbios-neurol%C3%B3gicos/transtornos-de-sono-e-vig%C3%ADlia/narcolepsia',
    },
    differential: {
      disorderId: 'hypersomnolence_disorder',
      whyNot: 'Além da sonolência, há perda súbita de força desencadeada por risadas e entrada precoce em sono REM nos cochilos do teste, achados que não pertencem à hipersonolência.',
    },
    explanation: 'Necessidade irresistível de dormir várias vezes ao dia, há mais de três meses, com cochilos curtos que restauram, associada a cataplexia: perda breve de força desencadeada por risadas ou emoções, com consciência preservada. Paralisia do sono, imagens vívidas ao adormecer e sono noturno fragmentado completam o quadro, e o teste de latências múltiplas mostra adormecimento rápido com dois ou mais períodos REM. Cataplexia e períodos REM precoces afastam o Transtorno de Hipersonolência. As visões restritas à transição entre sono e vigília, com crítica preservada, não indicam quadro psicótico.',
    giveaways: ['cataplexia', 'hipocretina', 'orexina'],
    variants: [
      {
        level: 'easy',
        ages: [19, 25],
        text: `{nome}, {idade} anos, estudante de Enfermagem, procura o ambulatório do sono porque "apaga" sem querer: já dormiu no ônibus, numa prova e até conversando com amigos. Um cochilo de 15 minutos {o|a} deixa {renovado|renovada}, mas o sono volta em poucas horas. Quando ri de uma piada, os joelhos dobram e o queixo cai por alguns segundos, sem perder a consciência.

Isso acontece quase todos os dias desde o fim do ensino médio. Às vezes acorda sem conseguir se mexer e, ao adormecer, vê vultos no quarto, sabendo que não são reais. A polissonografia não mostrou pausas na respiração, e no teste de cochilos adormeceu em 3 minutos, entrando em sono REM em quatro de cinco. Não usa remédios nem drogas.`,
        clues: [
          'À noite, acorda várias vezes e tem sonhos muito vívidos, às vezes logo nos primeiros minutos de sono.',
          'A sonolência veio primeiro; as quedas de força ao rir surgiram meses depois e hoje ocorrem várias vezes por semana.',
          'Foi {reprovado|reprovada} numa disciplina por dormir nas provas e evita rir alto em público com medo de cair.',
          'A noite de sono dura umas sete horas, e o problema não é acordar de manhã, mas os ataques de sono ao longo do dia.',
        ],
        rulesOut: 'Quando ri de uma piada, os joelhos dobram e o queixo cai por alguns segundos, sem perder a consciência.',
      },
      {
        level: 'medium',
        ages: [32, 42],
        text: `{nome}, {idade} anos, vendedor{|a} numa loja de móveis, é {encaminhado|encaminhada} pela clínica médica após dormir {sentado|sentada} enquanto atendia um cliente. Cochila várias vezes ao dia, até em pé no metrô, e dez minutos de sono {o|a} deixam bem por algumas horas.

A família estranha outra coisa: quando {ele|ela} gargalha, a cabeça tomba e o copo escapa da mão, mas continua ouvindo tudo e se recupera em segundos. Às vezes acorda sem conseguir mexer o corpo. Isso vem desde os 20 e poucos anos, quase todo dia. O teste de cochilos mostrou adormecimento em 4 minutos e entrada direta na fase dos sonhos em três deles. Não usa remédios nem drogas.`,
        clues: [
          'Ao pegar no sono, às vezes vê alguém parado na porta do quarto e logo percebe que não havia ninguém.',
          'A sonolência começou há mais de dez anos; os episódios ao gargalhar vieram depois e ocorrem várias vezes por mês.',
          'Foi {advertido|advertida} pelo gerente, parou de dirigir e evita festas de família, onde costuma rir muito.',
          'Acordar de manhã não é difícil; a noite é picada, cheia de despertares, e o problema são os ataques de sono durante o dia.',
        ],
        rulesOut: 'O teste de cochilos mostrou adormecimento em 4 minutos e entrada direta na fase dos sonhos em três deles.',
      },
      {
        level: 'hard',
        ages: [13, 16],
        text: `{nome}, {idade} anos, é {levado|levada} pela mãe ao CAPSi porque diz ver um homem parado ao lado da cama e, nessas horas, não conseguir se mexer. A escola relata que {ele|ela} dorme nas aulas e já "desmaiou" duas vezes no recreio, rindo com os colegas.

Na conversa, {nome} explica que a figura só aparece quando está pegando no sono ou acordando, e sabe que não é real; {acordado|acordada}, nunca viu nem ouviu nada estranho. Nos "desmaios", ouvia tudo, mas as pernas não obedeciam por alguns segundos. Há quase um ano cochila todo dia. O exame de sono mostrou adormecimento em 2 minutos e entrada precoce na fase dos sonhos em quatro cochilos.`,
        clues: [
          'Tem sonhos muito vívidos e acorda várias vezes durante a noite, mesmo indo dormir cedo.',
          'A sonolência começou há quase um ano, depois de uma gripe forte, e os episódios ao rir surgiram meses depois; não usa drogas.',
          'Tirou zero numa prova em que dormiu sobre a carteira e passou a evitar o recreio com medo de cair de novo.',
          'Os cochilos depois da escola duram uns 20 minutos e {o|a} deixam {disposto|disposta} para estudar por algum tempo.',
        ],
        rulesOut: 'O exame de sono mostrou adormecimento em 2 minutos e entrada precoce na fase dos sonhos em quatro cochilos.',
      },
    ],
  },
  {
    disorderId: 'circadian_sleep_wake_disorder',
    reference: {
      label: 'Manual MSD (Profissional) — Transtornos do sono relacionados ao ritmo circadiano',
      url: 'https://www.msdmanuals.com/pt/profissional/dist%C3%BArbios-neurol%C3%B3gicos/transtornos-de-sono-e-vig%C3%ADlia/transtornos-do-sono-relacionados-ao-ritmo-circadiano',
    },
    differential: {
      disorderId: 'insomnia_disorder',
      whyNot: 'Quando segue o próprio horário, a pessoa adormece rápido, dorme o suficiente e acorda descansada; a dificuldade nasce do desencontro entre o relógio interno e os horários exigidos.',
    },
    explanation: 'Padrão persistente de sono fora de sincronia com os horários exigidos pela escola, pelo trabalho em turnos ou pela família, com dificuldade para dormir na hora desejada, despertar fora de hora e sonolência, causando prejuízo. Quando a pessoa segue o próprio relógio, adormece rápido e dorme bem, o que mostra qualidade e duração preservadas e afasta o Transtorno de Insônia, em que o sono é ruim em qualquer horário. A ausência de telas como causa, de substâncias e de alterações do humor afasta outras explicações, como o Transtorno Depressivo Maior.',
    giveaways: ['circadian', 'relogio biologico', 'atraso de fase', 'avanco de fase'],
    variants: [
      {
        level: 'easy',
        ages: [17, 18],
        text: `{nome}, {idade} anos, {aluno|aluna} do terceiro ano do ensino médio, vai à UBS com a mãe porque "não tem sono antes das 3h". Mesmo deitando às 22h, sem celular, fica {acordado|acordada} até de madrugada; às 6h30, para ir à escola, mal consegue levantar e cochila nas primeiras aulas.

Nas férias e nos fins de semana, quando dorme das 3h às 11h, adormece em minutos e acorda {bem-disposto|bem-disposta}. O padrão começou aos 14 anos e se repete desde então. Tem bom humor, rende bem nas aulas da tarde e não usa energéticos, café à noite ou drogas. A mãe resume: "o relógio d{ele|ela} é outro".`,
        clues: [
          'À noite, sente-se mais {esperto|esperta} e com a cabeça boa para estudar justamente quando a família vai dormir.',
          'O horário foi atrasando no início da adolescência e se mantém há mais de três anos, piorando a cada volta às aulas.',
          'Acumula faltas e atrasos no primeiro horário e ficou em recuperação em duas matérias da manhã.',
          'Dormindo no próprio horário, o sono é contínuo e reparador, sem despertares no meio da noite.',
        ],
        rulesOut: 'quando dorme das 3h às 11h, adormece em minutos',
      },
      {
        level: 'medium',
        ages: [28, 45],
        text: `{nome}, {idade} anos, técnic{o|a} de enfermagem, faz há um ano plantões noturnos de 12 horas, em noites alternadas, num hospital público. Depois do plantão, deita às 9h e acorda ao meio-dia sem conseguir voltar a dormir; de madrugada, no serviço, briga com o sono e já cochilou no ônibus de volta, passando do ponto.

Nas noites de folga, deita às 23h, dorme direto até as 7h e acorda {descansado|descansada}; nas férias, o sono foi ótimo. Toma café só no começo do plantão, não usa remédios nem bebe. Continua {animado|animada} com os planos de fazer faculdade, mas ficou {assustado|assustada} ao errar a anotação de um medicamento.`,
        clues: [
          'Durante o dia, em casa, o sono é leve e qualquer barulho da rua {o|a} desperta, mesmo com a cortina fechada.',
          'As queixas surgiram nas primeiras semanas da escala noturna e se mantêm há cerca de um ano, sempre ligadas aos plantões.',
          'Pediu para trocar de setor, falta aos almoços de domingo da família e deixou de dirigir depois do plantão.',
          'Quando cobriu colegas no turno do dia por um mês, voltou a dormir à noite e a render normalmente.',
        ],
        rulesOut: 'Nas noites de folga, deita às 23h, dorme direto até as 7h',
      },
      {
        level: 'hard',
        ages: [67, 80],
        text: `{nome}, {idade} anos, {aposentado|aposentada}, é {levado|levada} pela filha à geriatria porque "acorda às 3h e não dorme mais". A filha teme que seja tristeza: {ele|ela} cochila no sofá às 19h, perde a novela e o jantar em família, e às 4h já está varrendo o quintal.

Nas semanas em que a filha viaja, {nome} janta às 18h, deita às 20h e dorme até as 3h30 sem acordar, levantando {disposto|disposta}. O padrão foi se instalando ao longo de uns cinco anos, e a mãe d{ele|ela} era igual. Continua cuidando da horta e jogando dominó na praça com prazer, e não usa remédios nem bebe à noite.`,
        clues: [
          'Nas noites em que a família {o|a} segura {acordado|acordada} até as 22h, desperta mesmo assim às 3h30 e passa o dia {sonolento|sonolenta}.',
          'Desde jovem era {o primeiro|a primeira} a dormir nas festas, e o horário foi ficando cada vez mais cedo depois dos 60 anos.',
          'Deixou de ir ao culto da noite e às festas da família, e já cochilou à mesa diante dos netos, envergonhando-se.',
          'Deitando às 20h, pega no sono em minutos, e nunca ficou rolando na cama {preocupado|preocupada} com a hora de dormir.',
        ],
        rulesOut: 'deita às 20h e dorme até as 3h30 sem acordar',
      },
    ],
  },
  {
    disorderId: 'nightmare_disorder',
    reference: {
      label: 'Manual MSD (Profissional) — Parassonias',
      url: 'https://www.msdmanuals.com/pt/profissional/dist%C3%BArbios-neurol%C3%B3gicos/transtornos-de-sono-e-vig%C3%ADlia/parassonias',
    },
    differential: {
      disorderId: 'ptsd',
      whyNot: 'Os sonhos mudam de enredo e não reproduzem nenhum evento ameaçador vivido; não houve exposição a um fato traumático, nem há lembranças invasivas, evitação ou sobressalto constante durante o dia.',
    },
    explanation: 'Sonhos longos, muito angustiantes e lembrados em detalhes, várias vezes por semana há meses, em geral na segunda metade da noite, com despertar rápido e plena orientação, levando a medo de dormir, cansaço e prejuízo. Nenhuma substância ou medicamento explica o quadro, e o humor está preservado. O conteúdo não repete um evento vivido e não há reexperiência, evitação ou hipervigilância durante o dia, o que afasta o Transtorno de Estresse Pós-Traumático. A lembrança do sonho e a lucidez ao despertar diferenciam do terror noturno, e a ausência de crises acordado afasta o Transtorno do Pânico.',
    giveaways: ['pesadelo'],
    variants: [
      {
        level: 'easy',
        ages: [22, 35],
        text: `{nome}, {idade} anos, designer, procura o ambulatório do sono porque tem pesadelos quase todas as noites. Sonha que está sendo {perseguido|perseguida} num prédio sem saída ou que a família some numa enchente, e acorda de madrugada com o coração disparado, lembrando cada detalhe e sabendo logo onde está.

Os sonhos ruins existem desde a adolescência, mas há oito meses vêm cinco ou mais vezes por semana. Agora adia a hora de deitar com medo de sonhar e passa o dia {exausto|exausta}. Nunca viveu enchente, assalto ou outra situação de perigo, e os sonhos não repetem nada que aconteceu. Não usa remédios, álcool ou drogas, e o humor está bom.`,
        clues: [
          'Os pesadelos costumam vir nas últimas horas da noite, perto das 4h ou 5h, e às vezes recomeçam quando volta a dormir.',
          'Teve sonhos ruins ocasionais desde os 13 anos; a piora atual começou sem motivo aparente e se mantém há oito meses.',
          'Perdeu prazos de entrega, recusou uma viagem em que dividiria quarto e evita cochilar à tarde para não sonhar.',
          'Durante o dia, não tem lembranças invasivas, sustos exagerados nem evita lugares ou assuntos específicos.',
        ],
        rulesOut: 'os sonhos não repetem nada que aconteceu',
      },
      {
        level: 'medium',
        ages: [14, 17],
        text: `{nome}, {idade} anos, vem com a mãe ao ambulatório de hebiatria porque "vira a noite no celular" e anda {irritado|irritada} e {sonolento|sonolenta} nas aulas. A sós, conta que enrola para dormir de propósito: quase toda madrugada acorda de sonhos longos em que cai de um penhasco ou é {enterrado|enterrada} viv{o|a}, lembra cada cena e custa a ter coragem de fechar os olhos.

Isso começou há uns oito meses, sem nenhuma briga, acidente ou violência na época, e os sonhos mudam de enredo sem repetir nada vivido. Ao acordar, sabe na hora onde está. Antes, dormia às 22h sem dificuldade. Segue no futsal e com os amigos e não usa remédios nem drogas.`,
        clues: [
          'Os despertares acontecem perto do amanhecer, com o coração disparado e o corpo suado, e o sono demora a voltar.',
          'Teve sonhos ruins esporádicos na infância; o aumento atual começou sem motivo claro e acontece quatro a cinco noites por semana.',
          'Cochilou numa prova, as notas caíram e passou a recusar convites para dormir na casa de amigos.',
          'Fora da cama, não pensa nos sonhos sem querer, não evita lugares ou assuntos e não se assusta à toa.',
        ],
        rulesOut: 'os sonhos mudam de enredo sem repetir nada vivido',
      },
      {
        level: 'hard',
        ages: [30, 45],
        text: `{nome}, {idade} anos, contador{|a}, chega {encaminhado|encaminhada} pela cardiologia: há um ano e meio acorda de madrugada com o coração a 120, {suado|suada} e sem ar. Holter, ecocardiograma e tireoide vieram normais, e nenhum remédio foi receitado.

{Perguntado|Perguntada} sobre o momento exato, {nome} lembra que sempre desperta de um sonho comprido, quase sempre depois das 4h: ora é {perseguido|perseguida} num estacionamento, ora um filho some no mar. Conta tudo em detalhes e logo sabe onde está. Nenhum dos sonhos repete algo que tenha vivido, e de dia não tem crises nem sustos. Acontece três ou quatro vezes por semana; tem evitado dormir e anda {exausto|exausta}. Não bebe nem usa drogas.`,
        clues: [
          'Depois desses despertares, demora a voltar a dormir com receio de "continuar o sonho"; dormindo, não fala nem se debate, segundo o cônjuge.',
          'As noites agitadas começaram há um ano e meio, sem mudança de rotina, remédio novo ou fato marcante na época.',
          'Passou a dormir no sofá para não acordar o cônjuge e já faltou a fechamentos de mês por exaustão.',
          'Não evita lugares nem assuntos, não tem lembranças invasivas durante o dia e não vive em estado de alerta.',
        ],
        rulesOut: 'Nenhum dos sonhos repete algo que tenha vivido',
      },
    ],
  },
  {
    disorderId: 'restless_legs_syndrome',
    reference: {
      label: 'Manual MSD (Profissional) — Transtorno do movimento periódico dos membros e síndrome das pernas inquietas',
      url: 'https://www.msdmanuals.com/pt/profissional/dist%C3%BArbios-neurol%C3%B3gicos/transtornos-de-sono-e-vig%C3%ADlia/transtorno-do-movimento-peri%C3%B3dico-dos-membros-dmpm-e-s%C3%ADndrome-das-pernas-inquietas-spi',
    },
    differential: {
      disorderId: 'insomnia_disorder',
      whyNot: 'A dificuldade para dormir decorre da vontade de mexer as pernas no repouso noturno; quando a sensação cede, o sono vem rápido e se mantém, sem preocupação própria com dormir.',
    },
    explanation: 'Vontade de mexer as pernas com sensações desagradáveis, que começa ou piora em repouso, alivia com o movimento e predomina no fim do dia, pelo menos três vezes por semana há mais de três meses, atrasando o sono e causando prejuízo. Ferritina, função dos rins e exame das pernas normais, sem medicamentos implicados, afastam causas secundárias, câimbras, problemas de circulação e inquietação causada por remédios. O sono só falha por causa das pernas e vem fácil quando elas sossegam, o que afasta o Transtorno de Insônia. A atenção preservada durante o dia mostra que não se trata de agitação de outra origem.',
    giveaways: ['willis', 'ekbom'],
    variants: [
      {
        level: 'easy',
        ages: [42, 60],
        text: `{nome}, {idade} anos, professor{|a} de escola pública, procura a UBS porque não consegue ficar com as pernas paradas à noite. Ao sentar para ver TV ou deitar, sente "formigas andando por dentro das panturrilhas" e uma vontade incontrolável de mexê-las; levantar e andar pela casa alivia na hora, mas o incômodo volta quando deita.

Acontece quase todas as noites há mais de um ano e quase nunca de manhã. Só pega no sono depois da 1h, quando a sensação passa, e então dorme bem até o despertador. A mãe tinha o mesmo. Ferritina, função dos rins e exame das pernas estão normais, e não usa remédios.`,
        clues: [
          'Em viagens longas de ônibus ou no cinema, precisa levantar ou bater os pés para aguentar ficar {sentado|sentada}.',
          'Começou de leve por volta dos 35 anos e foi ficando mais frequente; há mais de um ano ocorre quase todo dia.',
          'Chega {cansado|cansada} às aulas da manhã e desistiu da pós-graduação noturna por não conseguir ficar {parado|parada}.',
          'Nas noites raras em que as pernas não incomodam, adormece em poucos minutos e não acorda de madrugada.',
        ],
        rulesOut: 'quando a sensação passa, e então dorme bem até o despertador',
      },
      {
        level: 'medium',
        ages: [58, 72],
        text: `{nome}, {idade} anos, {dono|dona} de uma banca de jornal, vem ao ambulatório porque o cônjuge foi dormir no quarto dos fundos: à noite, {ele|ela} não para de mexer as pernas, levanta várias vezes e anda pelo corredor. Conta que, quando deita ou senta para ver o jornal na TV, as pernas "agoniam por dentro" e só sossegam se as movimenta.

De dia, atrás do balcão, não sente nada. Há uns dois anos isso ocorre na maior parte das noites; na missa de domingo à noite, já saiu no meio. Quando a agonia passa, dorme logo e só acorda de manhã. Os exames de sangue, incluindo ferro e rins, vieram normais, e só toma remédio para pressão há dez anos.`,
        clues: [
          'Descreve um repuxar e formigar fundo nas panturrilhas, que piora quanto mais tempo fica {parado|parada}.',
          'Começou com noites esparsas e passou a ocorrer quase sempre desde o último inverno, sem relação com remédio novo.',
          'Deixou de viajar de ônibus para visitar a filha no interior e anda {irritado|irritada} e {cansado|cansada} no trabalho.',
          'Não há preocupação com o sono em si: só quer que as pernas fiquem quietas para conseguir deitar em paz.',
        ],
        rulesOut: 'Quando a agonia passa, dorme logo e só acorda de manhã.',
      },
      {
        level: 'hard',
        ages: [8, 11],
        text: `{nome}, {idade} anos, é {levado|levada} pela mãe ao pediatra por "dores do crescimento" e porque "não para {quieto|quieta} na cama"; a tia acha que é agitação demais. Quase toda noite, ao deitar, chuta o lençol, levanta para andar no corredor e esfrega as pernas na parede.

{Perguntado|Perguntada} com calma, {nome} explica que "parece que tem bichinho andando dentro da perna" e que a vontade de mexer só passa andando; quando o bichinho some, dorme fácil. De manhã e na escola, presta atenção e fica {sentado|sentada} sem dificuldade. Isso vem há um ano. A mãe tem o mesmo desde jovem. Ferritina e exame físico estão normais, e não toma remédios.`,
        clues: [
          'No cinema à noite, troca de posição o tempo todo e pede para sair; nas sessões da manhã, assiste ao filme inteiro.',
          'Começou há cerca de um ano, com noites esparsas, e hoje acontece quatro ou cinco noites por semana.',
          'Dorme menos do que precisa, acorda {irritado|irritada} e deixou o catecismo da noite por não aguentar ficar {sentado|sentada}.',
          'Não tem medo de dormir nem fica rolando na cama à toa: o que {o|a} impede de pegar no sono é a sensação nas pernas.',
        ],
        rulesOut: 'quando o bichinho some, dorme fácil',
      },
    ],
  },
  {
    disorderId: 'sleepwalking_type_nrem_arousal_disorder',
    reference: {
      label: 'Manual MSD (Profissional) — Parassonias',
      url: 'https://www.msdmanuals.com/pt/profissional/dist%C3%BArbios-neurol%C3%B3gicos/transtornos-de-sono-e-vig%C3%ADlia/parassonias',
    },
    differential: {
      disorderId: 'rem_sleep_behavior_disorder',
      whyNot: 'Os episódios surgem nas primeiras horas de sono, com olhar vago e despertar difícil e confuso, sem lembrança de sonho; no Transtorno Comportamental do Sono REM, a pessoa encena sonhos tarde da noite, acorda lúcida e os relata.',
    },
    explanation: 'Episódios recorrentes de despertar incompleto no primeiro terço da noite, em que a pessoa se levanta e anda de olhos abertos, com olhar vago, pouca resposta aos outros e difícil despertar, sem lembrança de sonho e com amnésia do episódio, causando risco e prejuízo. Não há álcool, drogas ou remédios para dormir implicados. A ausência de grito e de pavor afasta o tipo terror noturno; o horário, a confusão ao ser acordado e a falta de relato de sonho afastam o Transtorno Comportamental do Sono REM. Comer durante os episódios, sem lembrança e sem perda de controle acordado, não indica Transtorno de Compulsão Alimentar.',
    giveaways: ['sonambul'],
    variants: [
      {
        level: 'easy',
        ages: [7, 12],
        text: `{nome}, {idade} anos, é {levado|levada} pelos pais à pediatria porque, umas duas vezes por semana, levanta da cama dormindo e anda pela casa. Cerca de uma hora depois de pegar no sono, aparece na sala de olhos abertos e olhar vazio; não responde quando chamam e é muito difícil de acordar. Na semana passada, foi {encontrado|encontrada} tentando abrir o portão.

Os episódios começaram há seis meses. Volta para a cama {sozinho|sozinha} ou {guiado|guiada} pelos pais e, de manhã, não se lembra de nada nem de ter sonhado. Nunca grita, chora ou parece {apavorado|apavorada}. O pai tinha episódios parecidos na infância. A criança é saudável e não toma remédios.`,
        clues: [
          'Às vezes murmura palavras soltas durante os episódios, que duram de cinco a quinze minutos.',
          'Os episódios aparecem mais depois de dias muito cansativos ou noites mal dormidas e se repetem há cerca de seis meses.',
          'Os pais instalaram trancas no portão, e {nome} deixou de dormir na casa dos colegas, com vergonha.',
          'Quando os pais conseguem {acordá-lo|acordá-la}, fica {confuso|confusa} por alguns minutos e não conta nenhum sonho.',
        ],
        rulesOut: 'de manhã, não se lembra de nada nem de ter sonhado',
      },
      {
        level: 'medium',
        ages: [18, 24],
        text: `{nome}, {idade} anos, estudante de Engenharia, vem ao serviço de saúde da universidade {levado|levada} pelos colegas de república. Contam que, pouco depois de ir dormir, {ele|ela} às vezes vai até a cozinha, abre a geladeira, arruma as cadeiras e já tentou sair pela porta de chinelo, de olhos abertos, "olhando através da gente".

Quando {o|a} chamam, responde com murmúrios e volta para a cama; de manhã, não se lembra de nada nem de sonho algum. Acontece uma ou duas vezes por semana há quatro meses, mais nas semanas de prova, quando dorme pouco. Teve episódios assim aos dez anos. Não bebe, não usa drogas nem remédios para dormir, e nunca gritou ou pareceu {assustado|assustada}.`,
        clues: [
          'Nos episódios, o rosto fica sem expressão e as respostas são palavras soltas, sem sentido, segundo os colegas.',
          'Os episódios tinham sumido na adolescência e voltaram neste ano, concentrados nas semanas de prova e noites mal dormidas.',
          'Os colegas passaram a trancar a porta e esconder a chave, e {ele|ela} desistiu de viajar com a turma por vergonha.',
          'Os episódios ocorrem nas duas primeiras horas de sono; ao ser {acordado|acordada}, fica {confuso|confusa} e nunca descreve um sonho.',
        ],
        rulesOut: 'de manhã, não se lembra de nada nem de sonho algum',
      },
      {
        level: 'hard',
        ages: [28, 45],
        text: `{nome}, {idade} anos, analista de RH, procura a nutricionista porque ganhou 8 kg em seis meses sem mudar a dieta. Achava que alguém da casa mexia na despensa: de manhã, encontra embalagens abertas, pão com margarina e açúcar pela pia e até carne congelada mordida.

O cônjuge resolveu observar: cerca de uma hora depois de deitar, {nome} vai até a cozinha de olhos abertos, come rápido e não responde quando {chamado|chamada}. No dia seguinte, não se lembra de nada nem de sonho algum. {Acordado|Acordada}, não come escondido nem perde o controle. Andava dormindo na infância. Não usa remédios para dormir, álcool ou drogas.`,
        clues: [
          'Já se queimou de leve no fogão e cortou o dedo durante os episódios, sem acordar e sem gritar.',
          'Os episódios começaram há seis meses, numa fase de horas extras e noites curtas, e ocorrem três ou quatro vezes por semana.',
          'Passou a trancar a geladeira com cadeado e evita dormir fora de casa, com vergonha de ser {visto|vista} comendo dormindo.',
          'Os episódios surgem nas primeiras horas da noite e, quando {acordado|acordada}, fica {confuso|confusa} e não relata sonho.',
        ],
        rulesOut: 'No dia seguinte, não se lembra de nada nem de sonho algum.',
      },
    ],
  },
  {
    disorderId: 'sleep_terror_type_nrem_arousal_disorder',
    reference: {
      label: 'Manual MSD (Profissional) — Parassonias',
      url: 'https://www.msdmanuals.com/pt/profissional/dist%C3%BArbios-neurol%C3%B3gicos/transtornos-de-sono-e-vig%C3%ADlia/parassonias',
    },
    differential: {
      disorderId: 'nightmare_disorder',
      whyNot: 'Não há sonho lembrado nem despertar lúcido: durante o episódio a pessoa não responde ao consolo e depois não se recorda dele, ao passo que o pesadelo acorda por completo e é contado em detalhes.',
    },
    explanation: 'Episódios recorrentes de despertar abrupto no primeiro terço da noite, que começam com grito, medo intenso e sinais de ativação do corpo, como suor, coração acelerado, respiração rápida e pupilas dilatadas, com pouca resposta ao consolo, pouca ou nenhuma lembrança de sonho e amnésia do episódio, causando sofrimento ou prejuízo. Não há substâncias ou outra condição que expliquem. A falta de lembrança e a confusão ao despertar afastam o Transtorno de Pesadelos; a ausência de deambulação afasta o tipo sonambulismo, e o horário precoce e a falta de encenação de sonho afastam o Transtorno Comportamental do Sono REM.',
    giveaways: ['terror', 'pavor noturno'],
    variants: [
      {
        level: 'easy',
        ages: [4, 6],
        text: `{nome}, {idade} anos, é {levado|levada} pelos pais à pediatria porque, cerca de uma hora depois de dormir, senta na cama e dá um grito agudo, de olhos arregalados, {suado|suada}, com o coração disparado e a respiração rápida. Parece {aterrorizado|aterrorizada}, não reconhece os pais e empurra quem tenta {acalmá-lo|acalmá-la}.

Depois de uns cinco minutos, deita e volta a dormir. De manhã, não se lembra de nada. Os episódios ocorrem duas ou três vezes por semana há quatro meses. Fora isso, é uma criança tranquila, vai bem na escolinha e não toma remédios. O exame da pediatra foi normal.`,
        clues: [
          'Durante o episódio, as pupilas ficam dilatadas e {ele|ela} parece olhar através dos pais, sem responder às perguntas.',
          'Começou quando deixou de tirar a soneca da tarde e piora nas noites que seguem dias muito agitados.',
          'Os pais se revezam para vigiar o sono, e a família evita viagens e visitas em que precisaria dividir quarto.',
          'Os episódios acontecem nas primeiras horas da noite e, quando a criança é acordada, não conta nenhum sonho.',
        ],
        rulesOut: 'De manhã, não se lembra de nada.',
      },
      {
        level: 'medium',
        ages: [9, 12],
        text: `{nome}, {idade} anos, vem com a mãe ao ambulatório porque precisou voltar mais cedo do acampamento da escola: na primeira noite, pouco depois de dormir, sentou no colchonete gritando, {trêmulo|trêmula} e {suado|suada}, e os colegas não conseguiram {acalmá-lo|acalmá-la}. A mãe conta que, em casa, isso ocorre duas ou três vezes por semana desde o início do ano.

Nessas horas, {nome} parece não enxergar ninguém e afasta a mão de quem chega; minutos depois, deita e dorme. No café da manhã, não sabe o que aconteceu e não lembra de sonho algum. Nunca levanta para andar pela casa. Não toma remédios, e o exame do pediatra foi normal.`,
        clues: [
          'Nos episódios, o coração bate forte, a respiração acelera e as pupilas ficam enormes, segundo a mãe.',
          'Teve episódios esparsos aos 5 anos; voltaram no início do ano, junto com a mudança para o turno da manhã e noites mais curtas.',
          'Ficou com vergonha dos colegas e recusa convites para dormir fora; a irmã, que divide o quarto, pediu para mudar de cômodo.',
          'Os episódios surgem até duas horas depois de pegar no sono, nunca perto do amanhecer, e não há relato de sonho.',
        ],
        rulesOut: 'não sabe o que aconteceu e não lembra de sonho algum',
      },
      {
        level: 'hard',
        ages: [26, 40],
        text: `{nome}, {idade} anos, engenheir{o|a} civil, procura o ambulatório do sono depois que um vizinho chamou a polícia por causa dos gritos. O cônjuge conta que, cerca de uma hora após deitar, {ele|ela} senta de repente, grita, sua, respira rápido e olha fixo para a parede; não responde e às vezes empurra quem se aproxima.

Em minutos volta a dormir e, de manhã, guarda no máximo uma imagem solta, "o teto descendo", sem história de sonho. Teve episódios assim na infância, que voltaram há um ano, duas vezes por semana. Nunca viveu desabamento ou violência e não tem crises {acordado|acordada}. Não bebe nem usa remédios. A videopolissonografia flagrou um episódio saindo do sono profundo, sem atividade epiléptica.`,
        clues: [
          'O cônjuge nota pupilas dilatadas e coração disparado; {ele|ela} nunca sai da cama, e tentar {acordá-lo|acordá-la} só aumenta a agitação.',
          'Os episódios da infância sumiram na adolescência e voltaram há um ano, quando passou a viajar muito e dormir pouco.',
          'Evita viagens a trabalho com quarto compartilhado e tem receio de assustar o filho pequeno durante a noite.',
          'Quando é {acordado|acordada} à força, fica {confuso|confusa} por minutos e não sabe dizer o que sonhava.',
        ],
        rulesOut: 'sem história de sonho',
      },
    ],
  },
  {
    disorderId: 'rem_sleep_behavior_disorder',
    reference: {
      label: 'Manual MSD (Profissional) — Parassonias',
      url: 'https://www.msdmanuals.com/pt/profissional/dist%C3%BArbios-neurol%C3%B3gicos/transtornos-de-sono-e-vig%C3%ADlia/parassonias',
    },
    differential: {
      disorderId: 'lewy_body_neurocognitive_disorder',
      whyNot: 'Memória, atenção e autonomia estão preservadas, sem flutuações, visões durante a vigília ou rigidez e lentidão; a encenação de sonhos aparece isolada, sem o declínio cognitivo que esse quadro exige.',
    },
    explanation: 'Episódios repetidos de fala, gritos e movimentos complexos durante o sono que encenam sonhos de ameaça, na segunda metade da noite, terminando com despertar lúcido e relato do sonho, com risco de lesão para a pessoa e para quem divide a cama. A polissonografia mostra sono REM sem a perda normal do tônus muscular. Não há remédios, álcool ou outra condição que expliquem. O horário, a lucidez e a lembrança do sonho afastam o sonambulismo e o terror noturno. Com cognição, exame neurológico e autonomia normais, não há Transtorno Neurocognitivo com Corpos de Lewy, embora o seguimento neurológico seja indicado.',
    giveaways: ['sono rem', 'atonia'],
    variants: [
      {
        level: 'easy',
        ages: [60, 75],
        text: `{nome}, {idade} anos, {aposentado|aposentada}, vem ao ambulatório do sono porque o cônjuge passou a dormir em outro quarto. Há dois anos, quase toda madrugada, {ele|ela} fala alto, xinga, dá socos e chutes como se brigasse; já caiu da cama e cortou o supercílio. Quando {acordado|acordada}, fica {lúcido|lúcida} na hora e conta o sonho: estava se defendendo de um ladrão.

Os episódios acontecem sempre na segunda metade da noite. A polissonografia registrou movimentos durante o sono REM, sem o relaxamento muscular normal dessa fase. Memória, exame neurológico e testes cognitivos estão normais, sem tremor ou lentidão. Não toma nenhum remédio de uso contínuo e não bebe.`,
        clues: [
          'Os gestos acompanham o sonho: grita nomes, dá socos no ar e já acertou o cônjuge no rosto sem querer.',
          'Começou com falas durante o sono há cerca de dois anos e evoluiu, nos últimos meses, para socos e quedas da cama.',
          'Passou a dormir {cercado|cercada} de travesseiros e evita viajar ou dormir na casa dos filhos, com medo de machucar alguém.',
          'Cuida {sozinho|sozinha} das contas e da agenda, sem esquecimentos, e nunca viu pessoas ou bichos quando {acordado|acordada}.',
        ],
        rulesOut: 'Memória, exame neurológico e testes cognitivos estão normais, sem tremor ou lentidão.',
      },
      {
        level: 'medium',
        ages: [58, 72],
        text: `{nome}, {idade} anos, motorista de táxi, chega ao ambulatório com o cônjuge, que mostra no celular vídeos gravados de madrugada: {nome} fala alto, gesticula como se dirigisse e, numa noite, pulou da cama gritando "sai da frente!". {Despertado|Despertada} pelo cônjuge, logo reconheceu onde estava e contou que sonhava com um assalto ao táxi.

Isso começou há um ano e meio, sempre no fim da madrugada. O exame de sono registrou os movimentos na fase dos sonhos, quando o corpo deveria estar relaxado. Durante o dia, trabalha, faz as contas e dirige sem esquecimentos ou tremores. Não usa remédios, não bebe e nunca sofreu um assalto.`,
        clues: [
          'Às vezes ri ou chora alto durante o sono e, {acordado|acordada}, lembra que no sonho estava numa situação parecida.',
          'Primeiro vieram as falas durante o sono; os gestos bruscos e as quedas apareceram nos últimos seis meses.',
          'Machucou o punho ao bater no criado-mudo, e o cônjuge, atingido duas vezes, passou a dormir no sofá.',
          'Os testes de memória e o exame neurológico vieram normais, sem rigidez, lentidão ou visões durante o dia.',
        ],
        rulesOut: 'Durante o dia, trabalha, faz as contas e dirige sem esquecimentos ou tremores.',
      },
      {
        level: 'hard',
        ages: [66, 80],
        text: `{nome}, {idade} anos, {aposentado|aposentada}, é {levado|levada} pelos filhos à geriatria com medo de que esteja "perdendo a cabeça": à noite, grita palavrões, debate-se e, na semana passada, quebrou o abajur com um soco. O clínico anotou ainda que {ele|ela} perdeu o olfato há alguns anos e vive com o intestino preso.

De dia, {nome} administra a pensão, vai {sozinho|sozinha} ao banco e faz palavras cruzadas; os testes de memória e o exame neurológico foram normais. Os episódios ocorrem de madrugada, várias vezes por semana, há uns três anos, e terminam com {nome} {desperto|desperta}, contando que lutava contra um cachorro. Não usa remédios contínuos nem bebe. A polissonografia mostrou movimentos na fase dos sonhos, sem o relaxamento muscular esperado.`,
        clues: [
          'Já falou nomes de colegas antigos e fez gestos de quem nada ou corre, sempre de olhos fechados.',
          'No início, há uns três anos, eram só falas e risadas durante o sono; os socos e as quedas vieram depois.',
          'Acertou uma cotovelada no cônjuge, e a família pôs o colchão no chão e tirou objetos da mesa de cabeceira.',
          'Não há oscilações de atenção ao longo do dia nem visões de pessoas ou bichos quando está {acordado|acordada}.',
        ],
        rulesOut: 'os testes de memória e o exame neurológico foram normais',
      },
    ],
  },
]
