import type { DisorderCaseSet } from './types'

export const neurodevCommunicationCases: DisorderCaseSet[] = [
  {
    disorderId: 'adhd',
    reference: {
      label: 'Manual MSD (Profissional) — Transtorno de déficit de atenção/hiperatividade (TDAH)',
      url: 'https://www.msdmanuals.com/pt/profissional/pediatria/dist%C3%BArbios-de-aprendizagem-e-desenvolvimento/transtorno-de-deficit-de-aten%C3%A7%C3%A3o-hiperatividade-tdah',
    },
    differential: {
      disorderId: 'specific_learning_disorder_reading',
      whyNot: 'A leitura é fluente e a compreensão é boa; as notas caem por distração, esquecimento e tarefas inacabadas, e os mesmos sinais aparecem em casa e em outras atividades.',
    },
    explanation: 'Seis ou mais sinais de desatenção e/ou de hiperatividade-impulsividade (cinco a partir dos 17 anos) — distração, esquecimentos, perda de objetos, tarefas inacabadas, desorganização, inquietação, fala excessiva e dificuldade de esperar a vez —, vários deles antes dos 12 anos, em dois ou mais ambientes, por mais de seis meses e com prejuízo. A leitura fluente e com boa compreensão afasta o Transtorno Específico da Aprendizagem com Prejuízo na Leitura. O padrão presente desde a infância e a ausência de preocupações excessivas, fases de humor, problemas de sono, uso de substâncias ou atitude de desafio afastam quadros ansiosos, de humor e neurocognitivos e o Transtorno Opositivo Desafiador.',
    giveaways: ['metilfenidato', 'ritalina', 'lisdexanfetamina', 'venvanse'],
    variants: [
      {
        level: 'easy',
        ages: [7, 9],
        text: `{nome}, {idade} anos, chega à UBS com a mãe e um bilhete da escola: "não para {sentado|sentada} nem um minuto". As queixas começaram na pré-escola, aos 4 anos. Na sala, levanta da carteira o tempo todo, fala sem parar, responde antes de a professora terminar a pergunta e fura a fila do lanche. Em casa, sobe nos móveis e larga o dever pela metade.

Também vive no mundo da lua: perde lápis e casaco toda semana, esquece recados e parece não ouvir quando é {chamado|chamada}. No futebol do bairro, o treinador faz as mesmas queixas. Lê bem para a idade quando consegue se concentrar. Dorme bem, tem amigos e não é de birra nem de desafiar os adultos.`,
        clues: [
          'Qualquer barulho no corredor tira sua atenção, e nas provas deixa questões sem fazer por não perceber que havia mais no verso da folha.',
          'Os sinais apareceram por volta dos 4 anos e continuam iguais desde então, sem relação com mudanças ou problemas na família.',
          'Leva bilhete para casa quase toda semana e ficou de fora do passeio da turma porque atrapalhava as atividades.',
          'Lê e escreve no nível da turma; as notas baixas vêm de tarefas incompletas e da distração, não de dificuldade com as letras.',
        ],
        rulesOut: 'Lê bem para a idade quando consegue se concentrar.',
      },
      {
        level: 'medium',
        ages: [13, 15],
        text: `{nome}, {idade} anos, vem ao pediatra com o pai, que traz os boletins: as notas despencaram este ano. Em casa, leva três horas numa lista de exercícios, levanta para beber água, pega o celular e volta sem saber onde parou. Esquece provas marcadas, perde o carregador e o casaco do uniforme e erra contas que sabe fazer por pular um sinal.

As agendas do 1º ano já traziam recados como "conversa e não termina as atividades". No curso de inglês, a professora repete as instruções só para {ele|ela}. Lê com fluência e entende bem os textos; o difícil é chegar ao fim. Anda de bom humor, tem amigos, dorme bem, não usa álcool ou drogas e diz que não fica remoendo preocupações: "só esqueço".`,
        clues: [
          'O quarto e a mochila vivem bagunçados, e adia os trabalhos longos até a véspera, quando entrega tudo pela metade.',
          'Os recados sobre distração aparecem desde os 6 anos; as notas só caíram agora, com o volume de matérias e trabalhos do fim do fundamental.',
          'Ficou de recuperação em quatro matérias e saiu do time de vôlei por esquecer os horários dos treinos.',
          'Quando alguém {o|a} mantém na tarefa, lê, resolve os exercícios e acerta como os colegas; as falhas vêm da distração, não do conteúdo.',
        ],
        rulesOut: 'Lê com fluência e entende bem os textos',
      },
      {
        level: 'hard',
        ages: [28, 40],
        text: `{nome}, {idade} anos, auxiliar administrativ{o|a} de uma transportadora, procura a UBS com medo de estar "perdendo a memória", como a avó. Levou uma advertência por esquecer de emitir notas fiscais e vive procurando documentos na própria mesa. Em casa, as contas atrasam porque os boletos somem em pilhas de papel, e a família reclama que {ele|ela} se desliga no meio das conversas.

A mãe, que veio junto, diz que sempre foi assim: na escola, conversava, não terminava nada e passava de ano estudando na véspera. Lembra bem do que acontece quando está {atento|atenta}, e sempre leu bem. Dorme bem e não usa álcool, drogas ou remédios para dormir. Os exames de sangue, inclusive de tireoide, vieram normais, e {ele|ela} recebeu o resultado com alívio.`,
        clues: [
          'No trabalho, larga uma planilha pela metade para atender o telefone, esquece de voltar e comete erros por descuido.',
          'Os boletins do primário, guardados pela mãe, repetem "{distraído|distraída}, não conclui as tarefas"; o jeito é o mesmo desde então, sem fases de tristeza, euforia ou preocupação constante.',
          'Já pagou multa por esquecer de renovar a carteira de motorista e perdeu o prazo de matrícula num curso técnico.',
          'Lê relatórios com fluência e entende o que lê; a dificuldade é manter o foco até o fim sem se distrair.',
        ],
        rulesOut: 'sempre leu bem',
      },
    ],
  },
  {
    disorderId: 'autism_spectrum_disorder',
    reference: {
      label: 'Manual MSD (Profissional) — Transtornos do espectro autista',
      url: 'https://www.msdmanuals.com/pt/profissional/pediatria/dist%C3%BArbios-de-aprendizagem-e-desenvolvimento/transtornos-do-espectro-autista',
    },
    differential: {
      disorderId: 'social_pragmatic_communication_disorder',
      whyNot: 'Além das dificuldades de comunicação social, há padrões restritos e repetitivos desde cedo — movimentos repetidos, rotina rígida, interesses intensos e incômodo sensorial —, o que não existe no quadro apenas pragmático.',
    },
    explanation: 'Déficits persistentes nas três áreas da comunicação social — reciprocidade, comunicação não verbal (olhar, gestos, expressão) e relacionamentos — somados a pelo menos dois padrões restritos e repetitivos (estereotipias, insistência na mesmice, interesses intensos e reatividade sensorial), presentes desde a primeira infância, mesmo quando disfarçados na vida adulta, e com prejuízo. Audição normal e habilidades não verbais ou escolares adequadas afastam perda auditiva e Transtorno do Desenvolvimento Intelectual. São os comportamentos repetitivos que separam o quadro do Transtorno da Comunicação Social (Pragmática), que só se diagnostica na ausência deles.',
    giveaways: ['espectro', 'estereotipia', 'ecolalia', 'asperger'],
    variants: [
      {
        level: 'easy',
        ages: [3, 4],
        text: `{nome}, {idade} anos, é {levado|levada} pelos pais ao CAPS infantil por indicação da creche. Fala poucas palavras soltas e repete falas de desenho animado fora de hora. Não atende pelo nome, quase não olha nos olhos, não aponta para mostrar as coisas — puxa o adulto pela mão até o que quer — e não brinca com as outras crianças.

Passa horas enfileirando carrinhos e balança as mãos quando fica {animado|animada}. Chora {desesperado|desesperada} se a mãe muda o caminho da creche e tapa os ouvidos com o barulho do liquidificador. O exame de audição veio normal, e {ele|ela} monta sozinh{o|a} quebra-cabeças de 20 peças. Em casa, recebe muito carinho e estímulo dos pais e dos avós.`,
        clues: [
          'Não mostra brinquedos aos pais, não acompanha com o olhar quando eles apontam algo e sorri pouco para as pessoas.',
          'Os pais estranham desde 1 ano e meio: as poucas palavras não viraram frases, e o interesse por outras crianças nunca apareceu.',
          'Na creche, fica no canto do pátio e entra em crise nas trocas de atividade; a escola precisou reduzir seu horário.',
          'Além disso, gira as rodas dos carrinhos por longos minutos e só aceita beber água no mesmo copo azul.',
        ],
        rulesOut: 'Passa horas enfileirando carrinhos e balança as mãos',
      },
      {
        level: 'medium',
        ages: [8, 10],
        text: `{nome}, {idade} anos, vem ao centro de reabilitação com a mãe depois de uma reunião na escola. No recreio, anda {sozinho|sozinha} pela quadra; quando se aproxima dos colegas, é para falar longamente sobre linhas de metrô, sem notar que eles querem brincar de outra coisa. Fala como um adulto, com o rosto quase sem expressão, e raramente olha para quem conversa com {ele|ela}.

Sabe de cor as estações de várias cidades e desenha mapas por horas. Se a professora muda a ordem das aulas, chora e repete a rotina em voz alta. Usa abafador de ouvido por causa do sinal da escola. Tira boas notas e lê desde os 5 anos.`,
        clues: [
          'Entende ao pé da letra frases como "caiu a ficha" e não percebe quando um colega está chateado ou cansado da conversa.',
          'Aos 3 anos, já brincava {sozinho|sozinha} alinhando trens e repetia vinhetas da TV; os pais achavam que era só um jeito diferente.',
          'Não foi {convidado|convidada} para nenhum aniversário este ano e precisa sair mais cedo nos dias de ensaio da fanfarra.',
          'Quando fica contente, balança o corpo e faz sempre o mesmo som com a boca, como desde pequen{o|a}.',
        ],
        rulesOut: 'Se a professora muda a ordem das aulas, chora e repete a rotina em voz alta.',
      },
      {
        level: 'hard',
        ages: [22, 32],
        sex: 'f',
        text: `{nome}, {idade} anos, analista de laboratório, procura o ambulatório de saúde mental por exaustão: depois do expediente, precisa ficar horas sozinha, no quarto escuro, para "se recompor". Conta que estuda as conversas dos colegas, ensaia frases prontas e imita as expressões de uma atriz para parecer à vontade. Nunca entendeu para que serve o papo de corredor nem sabe quando é sua vez de falar.

Almoça a mesma comida há anos e passa as noites catalogando espécies de cogumelos. No laboratório, usa protetor de ouvido o dia todo e pediu para trocar as lâmpadas, que a ofuscam. A mãe conta que, aos 3 anos, ela enfileirava as bonecas em vez de brincar com elas e chorava quando mudavam os móveis de lugar. Não teme ser julgada: "só não sei as regras".`,
        clues: [
          'Os colegas dizem que ela fala olhando para um ponto fixo e que o tom de voz não muda nem quando conta algo engraçado.',
          'Gostaria de ter amigas, mas as amizades nunca duraram, desde a escola; o cansaço piorou quando a empresa acabou com as bancadas fixas.',
          'Recusou uma promoção por causa das reuniões e falta ao trabalho depois das festas da equipe, embora goste do que faz e não se sinta triste.',
          'Quando se sente sobrecarregada, esfrega os dedos em sequência, um gesto que repete desde menina.',
        ],
        rulesOut: 'Almoça a mesma comida há anos e passa as noites catalogando espécies de cogumelos.',
      },
    ],
  },
  {
    disorderId: 'intellectual_developmental_disorder',
    reference: {
      label: 'Manual MSD (Profissional) — Deficiência intelectual',
      url: 'https://www.msdmanuals.com/pt/profissional/pediatria/dist%C3%BArbios-de-aprendizagem-e-desenvolvimento/defici%C3%AAncia-intelectual',
    },
    differential: {
      disorderId: 'specific_learning_disorder_reading',
      whyNot: 'As dificuldades não se limitam à leitura: o teste padronizado mostra raciocínio globalmente abaixo da média, inclusive em provas sem leitura, e há prejuízo na autonomia fora da escola.',
    },
    explanation: 'Déficits nas funções intelectuais (raciocínio, resolução de problemas, aprendizagem), confirmados por avaliação clínica e por teste de inteligência padronizado, com déficits adaptativos nos domínios conceitual (letras, dinheiro, horas), social (imaturidade, ingenuidade) e prático (autocuidado, transporte, contas), tudo com início na infância. No Transtorno Específico da Aprendizagem a inteligência é normal e o prejuízo se limita a uma habilidade acadêmica. Audição e visão normais, interesse social preservado e ausência de perda de habilidades afastam causa sensorial, Transtorno do Espectro Autista e um quadro neurocognitivo adquirido.',
    giveaways: ['apae', 'retardo', 'deficiencia mental'],
    variants: [
      {
        level: 'easy',
        ages: [8, 9],
        text: `{nome}, {idade} anos, chega ao ambulatório de neuropediatria com a mãe, {encaminhado|encaminhada} pela escola. Está no 3º ano, ainda não reconhece todas as letras e só soma com a ajuda de palitinhos. Em casa, precisa de ajuda para tomar banho e se vestir, não entende as regras dos jogos dos colegas e prefere brincar com o primo de 5 anos. Fala como uma criança bem mais nova.

Sentou com 1 ano e andou com quase 2; as primeiras palavras vieram depois dos 3. A avaliação psicológica com teste padronizado mostrou QI de 55, com resultados baixos em todas as áreas, e a escala de comportamento adaptativo confirmou o atraso. Audição e visão são normais. É {carinhoso|carinhosa}, olha nos olhos e brinca com todos.`,
        clues: [
          'Não sabe dizer o próprio endereço, confunde manhã e tarde e ainda não entende para que serve o dinheiro.',
          'Aprende devagar, mas sempre avançando: nunca perdeu o que já sabia, e o atraso é percebido desde o primeiro ano de vida.',
          'Precisa de uma professora de apoio em sala e ainda não consegue amarrar o tênis nem cortar a comida {sozinho|sozinha}.',
          'Nas provas do teste que não exigem leitura, como montar blocos e completar figuras, também ficou bem abaixo da média.',
        ],
        rulesOut: 'mostrou QI de 55, com resultados baixos em todas as áreas',
      },
      {
        level: 'medium',
        ages: [14, 15],
        text: `{nome}, {idade} anos, é {trazido|trazida} à UBS pela tia depois de entregar o celular novo a meninos mais velhos, que prometeram devolvê-lo "amanhã". Está no 7º ano, depois de duas reprovações, lê frases curtas devagar e não entende o que leu. Não sabe se o troco da padaria está certo, confunde os dias da semana e não consegue pegar ônibus para um lugar novo.

Toma banho e arruma a cama {sozinho|sozinha}, mas precisa de lembretes para quase tudo. Andou e falou mais tarde que os primos. Na avaliação, o teste padronizado de inteligência ficou bem abaixo da média em todas as provas, inclusive nas que não exigem leitura. É {simpático|simpática}, conversa olhando nos olhos e tem amigos no bairro.`,
        clues: [
          'Prefere a companhia de crianças bem mais novas e não percebe quando os colegas riem {dele|dela} pelas costas.',
          'Na pré-escola, já era {o último|a última} a aprender cores e números; desde então avança devagar, sem perder o que conquistou.',
          'Não consegue cuidar do próprio dinheiro nem cumprir horários sem ajuda, e a família não {o|a} deixa {sozinho|sozinha} em casa.',
          'Enxerga e ouve bem, nunca faltou à escola e se atrapalha também em tarefas sem letras nem números, como montar um brinquedo copiando o modelo.',
        ],
        rulesOut: 'ficou bem abaixo da média em todas as provas, inclusive nas que não exigem leitura',
      },
      {
        level: 'hard',
        ages: [19, 25],
        text: `{nome}, {idade} anos, é {levado|levada} pela irmã ao ambulatório de neurologia porque, desde que caiu da moto, há oito meses, "não é mais {o mesmo|a mesma}". Perdeu o emprego de repositor{|a} no supermercado ao não conseguir usar o novo leitor de etiquetas. A tomografia do dia da queda foi normal, e {ele|ela} não chegou a desmaiar.

A irmã trouxe os papéis da escola: duas reprovações nos primeiros anos, reforço o tempo todo e abandono no 6º ano, lendo só frases simples. Até hoje não confere troco, depende dela para pagar as contas e já fez empréstimos a pedido de "amigos". Os testes padronizados aplicados agora mostram raciocínio bem abaixo da média em todas as áreas.`,
        clues: [
          'É {simpático|simpática} e conversa com todos, mas só entende instruções dadas uma de cada vez, com demonstração.',
          'O antigo supervisor conta que {ele|ela} sempre precisou de ajuda com tarefas novas; o que mudou foi o sistema, não o desempenho.',
          'Depende da irmã para ir às consultas e procurar emprego e não consegue preencher um cadastro {sozinho|sozinha}.',
          'Não é só a leitura: também não planeja o dia, não calcula quanto dinheiro falta para o fim do mês e se perde no caixa eletrônico.',
        ],
        rulesOut: 'Os testes padronizados aplicados agora mostram raciocínio bem abaixo da média em todas as áreas.',
      },
    ],
  },
  {
    disorderId: 'language_disorder',
    reference: {
      label: 'Manual MSD (Profissional) — Transtornos de comunicação em crianças',
      url: 'https://www.msdmanuals.com/pt/profissional/pediatria/doen%C3%A7as-diversas-da-orelha-do-nariz-e-da-garganta-em-crian%C3%A7as/transtornos-de-comunica%C3%A7%C3%A3o-em-crian%C3%A7as',
    },
    differential: {
      disorderId: 'autism_spectrum_disorder',
      whyNot: 'A criança busca contato, olha nos olhos, aponta, usa gestos para compensar a fala e brinca de faz de conta, sem movimentos repetitivos, rotinas rígidas ou interesses fixos.',
    },
    explanation: 'Vocabulário reduzido, frases curtas com erros gramaticais e dificuldade para organizar relatos, na expressão e na compreensão, bem abaixo do esperado para a idade, desde as primeiras palavras e com prejuízo escolar e social. A audiometria normal afasta perda auditiva; o raciocínio não verbal adequado afasta Transtorno do Desenvolvimento Intelectual; a pronúncia correta das palavras conhecidas diferencia do Transtorno dos Sons da Fala. A criança busca contato, usa gestos e brinca de faz de conta, sem comportamentos repetitivos, o que exclui o Transtorno do Espectro Autista. Em quem cresce com duas línguas, a dificuldade aparece em ambas.',
    giveaways: ['linguagem', 'disfasia'],
    variants: [
      {
        level: 'easy',
        ages: [4, 5],
        text: `{nome}, {idade} anos, é {levado|levada} pela mãe à fonoaudióloga da policlínica porque "fala como se fosse bem mais {novo|nova}". Disse as primeiras palavras aos 2 anos e só juntou duas palavras perto dos 3. Hoje usa frases curtas e com erros, como "ontem eu vai na vó" e "menino caiu chão", chama quase tudo de "aquilo" e não consegue contar o que fez na escola.

Também entende pouco: se perde em pedidos como "guarda o sapato e depois lava a mão". As palavras que diz saem bem pronunciadas. A audiometria foi normal, e monta quebra-cabeças como as crianças da idade. Olha nos olhos, aponta, usa gestos para se fazer entender e brinca de casinha com as primas.`,
        clues: [
          'Demora a encontrar o nome de objetos comuns, como "colher" e "escova", e usa sempre os mesmos poucos verbos.',
          'O atraso aparece desde as primeiras palavras; avança, mas a distância em relação às crianças da mesma idade não diminui.',
          'Na escolinha, os colegas não esperam suas explicações, e {ele|ela} chora quando não consegue contar o que aconteceu.',
          'Procura os colegas, divide os brinquedos e não tem rotinas rígidas, interesses fixos, movimentos repetitivos ou incômodo com barulhos.',
        ],
        rulesOut: 'Olha nos olhos, aponta, usa gestos para se fazer entender e brinca de casinha com as primas.',
      },
      {
        level: 'medium',
        ages: [6, 7],
        text: `{nome}, {idade} anos, vem à UBS com o pai depois de um bilhete da professora do 1º ano: "não acompanha as explicações". Em casa, o pai percebe que {ele|ela} responde "sim" a perguntas que não entendeu e, quando conta um passeio, junta pedaços soltos — "aí foi, aí o carro, aí acabou" — sem que se saiba quem fez o quê.

Usa poucas palavras para a idade, erra o tempo dos verbos e confunde "embaixo" com "atrás". Pronuncia bem os sons. A audiometria veio normal, e nos jogos de montar e de memória visual vai tão bem quanto os colegas. Sempre gostou de brincar com outras crianças, aponta, imita e mostra o que faz.`,
        clues: [
          'Na sala, fica {quieto|quieta} e {atento|atenta}, mas espera os colegas começarem a tarefa para copiar o que eles fazem.',
          'Disse as primeiras palavras depois dos 2 anos e só formou frases perto dos 4; desde então avança, mas sempre atrás dos colegas.',
          'Já perdeu recreios por "não obedecer" ordens que não entendeu e fala pouco nas rodas de conversa, porque se perde ao contar as coisas.',
          'Brinca de pega-pega e de faz de conta com os vizinhos e não tem movimentos repetitivos, rotinas rígidas ou interesses fixos.',
        ],
        rulesOut: 'Sempre gostou de brincar com outras crianças, aponta, imita e mostra o que faz.',
      },
      {
        level: 'hard',
        ages: [8, 9],
        text: `{nome}, {idade} anos, vem à UBS com a mãe. A família chegou da Venezuela a Boa Vista há dois anos, e a escola atribuía as dificuldades ao português, mas o irmão de 6 anos já conversa com desenvoltura. {nome} fala nas duas línguas, em casa e na escola, mas em frases curtas, sem ligar as ideias, e entende só instruções simples.

A mãe conta que, ainda na Venezuela, a avó dizia que {ele|ela} "falava como um bebê" em espanhol. Pronuncia bem as palavras que conhece. A audiometria é normal e, nos testes que não usam palavras, raciocina como as crianças da idade. Brinca de faz de conta com os vizinhos, mostra o que desenhou e não tem rotinas rígidas.`,
        clues: [
          'Avaliad{o|a} também em espanhol, com intérprete, ficou muito abaixo do esperado em vocabulário e frases e não consegue recontar uma história curta na ordem.',
          'As primeiras palavras vieram depois dos 2 anos, ainda na Venezuela; as dificuldades já existiam antes da mudança de país.',
          'Está repetindo o 2º ano e não acompanha as aulas mesmo com apoio em espanhol; os colegas desistem de esperar suas explicações.',
          'Procura os colegas, olha nos olhos, completa com gestos o que não consegue dizer e nunca teve movimentos repetitivos ou interesses fixos.',
        ],
        rulesOut: 'Brinca de faz de conta com os vizinhos, mostra o que desenhou e não tem rotinas rígidas.',
      },
    ],
  },
  {
    disorderId: 'speech_sound_disorder',
    reference: {
      label: 'Manual MSD (Profissional) — Transtornos de comunicação em crianças',
      url: 'https://www.msdmanuals.com/pt/profissional/pediatria/doen%C3%A7as-diversas-da-orelha-do-nariz-e-da-garganta-em-crian%C3%A7as/transtornos-de-comunica%C3%A7%C3%A3o-em-crian%C3%A7as',
    },
    differential: {
      disorderId: 'language_disorder',
      whyNot: 'Vocabulário, construção das frases e compreensão são adequados para a idade; o que falha é só a produção dos sons, que deixa a fala difícil de entender.',
    },
    explanation: 'Dificuldade persistente na produção dos sons da fala — trocas, omissões e simplificações que já deveriam ter desaparecido — que torna a fala pouco inteligível para estranhos e limita a participação social e escolar, com início no começo do desenvolvimento. Audiometria normal, boca e língua sem alterações e mastigação e deglutição preservadas afastam causas auditivas, estruturais e neurológicas. Vocabulário, gramática e compreensão adequados diferenciam do Transtorno de Linguagem. Quando a criança se cala na escola, é reação às zombarias, e ela fala em outros ambientes, o que afasta Mutismo Seletivo.',
    giveaways: ['fonologic', 'articulac', 'dislalia', 'fonetic'],
    variants: [
      {
        level: 'easy',
        ages: [5, 6],
        text: `{nome}, {idade} anos, vem à consulta de rotina na UBS, e a mãe pede ajuda: "só a família entende o que {ele|ela} fala". Troca e engole sons: diz "tasa" para casa, "dato" para gato, "pato" para prato e "faca" quando quer dizer vaca. Na escolinha, os colegas pedem para repetir e às vezes riem, e {ele|ela} desiste de falar.

Ao mesmo tempo, conta com detalhes o que aconteceu no parquinho, em frases completas, usa palavras variadas e entende tudo o que lhe pedem. A audiometria veio normal, e a pediatra não viu alterações na boca, na língua ou no céu da boca. Mastiga e engole bem, sem babar, e procura as outras crianças para brincar.`,
        clues: [
          'Encurta palavras longas, como "tefone" para telefone, e pessoas de fora entendem menos da metade do que diz.',
          'Os erros existem desde as primeiras palavras e não sumiram como nos primos da mesma idade; o resto do desenvolvimento foi no tempo esperado.',
          'Chora quando não é {entendido|entendida}, e os colegas da escolinha passaram a deixá-l{o|a} de fora das brincadeiras de faz de conta.',
          'Entende histórias longas, segue pedidos com várias etapas e monta frases com a gramática esperada para a idade.',
        ],
        rulesOut: 'conta com detalhes o que aconteceu no parquinho, em frases completas, usa palavras variadas e entende tudo o que lhe pedem',
      },
      {
        level: 'medium',
        ages: [6, 7],
        text: `{nome}, {idade} anos, vem à clínica-escola de fonoaudiologia com a avó, que cuida {dele|dela} durante o dia. A professora do 1º ano pediu ajuda: {nome} fala bastante, mas quase ninguém entende. A avó acha que é "língua presa" e conta que os vizinhos vivem perguntando a ela o que a criança disse. Em vez de "sapato", sai "tapato"; "chave" vira "tave".

Nas histórias que inventa, usa palavras difíceis, encadeia os acontecimentos e cumpre pedidos longos sem dificuldade. O exame da boca e do freio da língua foi normal, assim como a audiometria. Come de tudo, sem engasgos, e tem muitos amigos na rua.`,
        clues: [
          'Os erros são sempre os mesmos, também quando repete palavras devagar, e estranhos entendem só algumas palavras do que diz.',
          'Fala assim desde que começou a juntar palavras, aos 2 anos; o irmão mais novo já pronuncia melhor que {ele|ela}.',
          'Recusa-se a apresentar trabalhos na roda e já brigou com colegas que imitavam seu jeito de falar.',
          'Na avaliação, vocabulário, gramática e compreensão ficaram dentro do esperado para a idade; só a produção dos sons está alterada.',
        ],
        rulesOut: 'usa palavras difíceis, encadeia os acontecimentos e cumpre pedidos longos sem dificuldade',
      },
      {
        level: 'hard',
        ages: [7, 8],
        text: `{nome}, {idade} anos, é {encaminhado|encaminhada} pela escola à psicóloga da Secretaria de Educação porque "parou de falar na sala" no 2º ano. A professora achou que fosse timidez extrema ou algum problema em casa. A mãe conta que nada mudou na família e que, em casa, com os primos e no futebol da rua, {ele|ela} fala o tempo todo; na escola, ainda cochicha com o colega de mesa.

O silêncio começou quando a turma passou a rir do jeito como {ele|ela} diz as palavras: "tachorro", "pofessora". Os pais entendem quase tudo; estranhos, pouco. Conta histórias longas e bem amarradas, com palavras variadas, e entende tudo. A audiometria e o exame da boca foram normais.`,
        clues: [
          'Os erros se repetem sempre do mesmo jeito, mesmo quando fala devagar, e aparecem também em casa e com os amigos.',
          'Fala assim desde os 2 anos; a família achava que melhoraria com o tempo e nunca procurou fonoaudióloga.',
          'Não responde mais nas chamadas orais nem participa da roda de conversa, e a nota de participação caiu neste bimestre.',
          'Na avaliação, vocabulário e construção das frases estão adequados para a idade; a dificuldade é só pronunciar certos sons.',
        ],
        rulesOut: 'Conta histórias longas e bem amarradas, com palavras variadas, e entende tudo.',
      },
    ],
  },
  {
    disorderId: 'social_pragmatic_communication_disorder',
    reference: {
      label: 'PMC/NCBI — Swineford et al. (2014), Social (pragmatic) communication disorder: a research review of this new DSM-5 diagnostic category',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4258293/',
    },
    differential: {
      disorderId: 'autism_spectrum_disorder',
      whyNot: 'Nunca houve, nem na primeira infância, movimentos repetitivos, apego a rotinas, interesses fixos ou reações incomuns a sons e texturas, exigidos para o espectro autista.',
    },
    explanation: 'Dificuldades persistentes no uso social da linguagem: cumprimentar e compartilhar informações de modo adequado, ajustar a fala ao contexto e ao ouvinte, seguir as regras da conversa (turnos, reformular quando não é entendido) e compreender ironias, piadas e sentidos implícitos, desde a infância e com prejuízo social e escolar. Vocabulário, gramática e inteligência são normais, o que afasta Transtorno de Linguagem e Transtorno do Desenvolvimento Intelectual. Como nunca houve interesses restritos, rotinas rígidas, movimentos repetitivos ou alterações sensoriais, o Transtorno do Espectro Autista fica excluído; a falta de intenção de desafiar afasta o Transtorno Opositivo Desafiador.',
    giveaways: ['pragmatic'],
    variants: [
      {
        level: 'easy',
        ages: [7, 9],
        text: `{nome}, {idade} anos, vem ao ambulatório de saúde mental infantil com os pais, {encaminhado|encaminhada} pela escola por dificuldade "de conversar do jeito certo". Trata a diretora com a mesma intimidade que usa com os colegas, dá explicações longas demais às crianças pequenas e, quando não é {entendido|entendida}, repete tudo igual. Interrompe, muda de assunto de repente e leva tudo ao pé da letra: quando a professora disse que estava "chovendo canivete", foi olhar o céu.

Não entende piadas e fica de fora das brincadeiras, embora queira muito ter amigos. Na aula, é {atento|atenta} e {calmo|calma}, tem vocabulário rico, frases bem construídas e boas notas. Os pais garantem que nunca teve rotinas rígidas, interesses fixos, movimentos repetitivos ou incômodo com sons e texturas.`,
        clues: [
          'Ao chegar a uma festa, não cumprimenta ninguém e começa a contar do seu dia, sem notar os olhares de impaciência.',
          'Desde a pré-escola, as professoras anotam que {ele|ela} "fala fora de hora"; a fala em si se desenvolveu no tempo esperado.',
          'Não é {chamado|chamada} para os aniversários da turma e chora porque os colegas dizem que {ele|ela} é "sem noção".',
          'Adapta-se bem a mudanças, como a recente troca de escola, e tem interesses variados, do futebol aos desenhos animados.',
        ],
        rulesOut: 'nunca teve rotinas rígidas, interesses fixos, movimentos repetitivos ou incômodo com sons e texturas',
      },
      {
        level: 'medium',
        ages: [10, 12],
        text: `{nome}, {idade} anos, é {levado|levada} pela mãe à psicóloga da UBS depois de mais uma briga no grupo de mensagens da turma. Responde aos colegas com textos formais, como se escrevesse para a diretora, e comentou em voz alta que a professora "repetiu a roupa de ontem". Quando uma colega reclamou "que ótimo, mais prova!", achou que ela estava contente.

Nas conversas, fala por cima dos outros e não percebe quando querem mudar de assunto. Sempre falou bem, presta atenção às aulas e é {um dos melhores alunos|uma das melhores alunas} da sala. A mãe lembra que, na pré-escola, {ele|ela} brincava de tudo e aceitava bem as mudanças, sem rituais, gestos repetidos ou interesses fixos.`,
        clues: [
          'Conta as histórias do mesmo jeito para a avó e para os colegas e não muda a explicação quando alguém não entende.',
          'Desde os 5 anos não entendia as provocações de brincadeira dos colegas; a dificuldade pesou mais quando as conversas da turma se encheram de indiretas.',
          'Foi {removido|removida} do grupo da sala e passa o recreio na biblioteca, embora diga que queria muito ter amigos.',
          'Lida bem com barulho, roupas e comidas diferentes e troca de passatempo como os colegas da mesma idade.',
        ],
        rulesOut: 'aceitava bem as mudanças, sem rituais, gestos repetidos ou interesses fixos',
      },
      {
        level: 'hard',
        ages: [14, 16],
        text: `{nome}, {idade} anos, chega ao ambulatório de adolescentes {encaminhado|encaminhada} pela coordenação depois de três advertências por "falta de respeito": chamou o diretor de "meu querido", corrigiu a professora na frente da turma e, quando ela comentou "que bonito, hein?" sobre seu atraso, agradeceu. A mãe estranha: em casa, obedece, ajuda e não costuma responder.

{nome} fica {perplexo|perplexa} com as advertências e pede desculpas quando lhe explicam o que soou mal. Desde pequen{o|a}, fala na hora errada e não percebe quando o outro quer encerrar a conversa. Escreve bem, presta atenção às aulas, tem boas notas e interesses variados, e sempre lidou bem com mudanças, sem gestos repetidos ou apego a rotinas.`,
        clues: [
          'Nas apresentações, explica detalhes demais aos colegas e não percebe bocejos nem olhares de impaciência.',
          'Os primeiros bilhetes, na pré-escola, já falavam em "interromper a roda"; a fala, porém, se desenvolveu cedo e sem atraso.',
          'Foi {excluído|excluída} do grupo do trabalho de ciências e passa os intervalos {sozinho|sozinha}, embora tente se aproximar dos colegas.',
          'Nunca teve interesses fixos nem incômodo com barulhos ou texturas, e a mãe não lembra de nada parecido na primeira infância.',
        ],
        rulesOut: 'sempre lidou bem com mudanças, sem gestos repetidos ou apego a rotinas',
      },
    ],
  },
]
