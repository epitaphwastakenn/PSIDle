# PsiDle: decisões de experiência e estudo

## Direção de produto

Preservar a identidade azul/roxo e o modo claro. Reduzir competição visual: uma ação principal por bloco, leitura confortável, navegação no fluxo da página, controles próprios para toque e animação de entrada da página sem cascata por cartão. O toast permanece em portal, fixo na parte inferior, com entrada e saída.

O objetivo do treino é comparar hipóteses de casos fictícios, não avaliar pessoas reais. O sistema não coleta sintomas pessoais, não recomenda tratamento e não estima competência clínica.

## Fontes consultadas

- [WCAG 2.2, W3C](https://www.w3.org/TR/WCAG22/): referência de acessibilidade. Isso orienta o trabalho, mas não é uma declaração de conformidade integral.
- [Reflow, W3C](https://www.w3.org/WAI/WCAG21/Understanding/reflow): verificar leitura em largura de 320 CSS px sem rolagem horizontal.
- [Target Size Enhanced, W3C](https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced): alvos de toque de 44 CSS px como objetivo de conforto, incluindo botões e linhas clicáveis.
- [Combobox, ARIA APG](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/): autocomplete com seleção por setas, Enter e Escape, estado expandido e opção ativa comunicados à tecnologia assistiva.
- [CSS transitions, web.dev](https://web.dev/learn/css/transitions): priorizar opacity/transform na entrada; evitar animações contínuas decorativas desnecessárias.
- [Reduced motion, web.dev](https://web.dev/articles/prefers-reduced-motion): respeitar a preferência do sistema em animações e scroll.
- [Revisão sistemática sobre prática distribuída e recuperação em formação em saúde](https://pubmed.ncbi.nlm.nih.gov/37615780/): fundamenta a escolha de tentar recordar antes de revelar e revisitar conteúdo em dias diferentes. Resultados e intervenções são heterogêneos; não justificam prometer um ganho individual específico.
- [Estudo sobre prática intercalada em aprendizagem diagnóstica](https://pubmed.ncbi.nlm.nih.gov/27072443/) e [outro estudo de formatos de prática](https://pubmed.ncbi.nlm.nih.gov/28744821/): a evidência depende da tarefa. Alternar temas é uma opção do produto, não uma técnica garantidamente superior em qualquer contexto.
- [Estudo sobre reflexão e raciocínio diagnóstico](https://pubmed.ncbi.nlm.nih.gov/33978967/): motivação para explicações e comparação de hipóteses após a resposta, sem equiparar o jogo a formação supervisionada.
- [Visão geral do manual clínico da CID-11, OMS](https://www.who.int/publications/i/item/9789240077263): referência sobre classificação e limitações. Nenhum PDF foi incorporado ou copiado.
- [DMDD, NIMH](https://www.nimh.nih.gov/health/topics/disruptive-mood-dysregulation-disorder-dmdd): reforça a necessidade de não sortear idade adulta indiscriminadamente para quadros próprios da infância/adolescência.
- [Esquizofrenia, NIMH](https://www.nimh.nih.gov/health/publications/schizophrenia) e [transtorno bipolar, NIMH](https://www.nimh.nih.gov/health/publications/bipolar-disorder): exemplos de por que curso, contexto e história importam e não devem ser inventados a partir da dificuldade do jogo.

## Seleção do treino

O algoritmo é uma heurística explícita, local, sem modelo de IA ou API:

1. Aplicar categoria e dificuldade sem ampliar os filtros silenciosamente.
2. Excluir até oito hipóteses recentes, mantendo pelo menos uma opção no conjunto.
3. Sortear com peso base 1; acrescentar 3 para hipótese inédita, 4 se o último resultado foi erro e 2 para categoria com pelo menos duas partidas e aproveitamento inferior a 60%.
4. Com seleção inteligente desligada, usar pesos iguais entre as opções não recentes.
5. Salvar as hipóteses apresentadas, mesmo antes da conclusão, para evitar repetição por regeneração sucessiva.

Esses números são escolhas de produto, não parâmetros validados por estudos. Não há promessa de ausência absoluta de repetição. Um filtro com uma única hipótese informa essa limitação.

## Conteúdo e limites

O gerador v2 usa perfis editoriais de observações em `src/data/caseProfiles.ts`. Cada perfil contém apresentações compatíveis com um curso e uma distinção fixos. Nomes, idades e apresentações variam por seed; novas composições não significam conhecimentos clínicos novos. A primeira pista deixou de repetir a definição do catálogo. Nenhuma dificuldade acrescenta parágrafos abstratos ou altera duração para parecer mais complexa.

O enunciado mantém os fatos necessários à comparação, sem esconder toda a informação decisiva atrás de pistas. As pistas ajudam a interpretar, acrescentam informações e terminam com um diferencial selecionado por relevância. Categorias residuais incluem exercícios sobre limites de informação, não diagnósticos específicos inventados a partir de registros incompletos.

O treino evita apresentações recentemente vistas da mesma hipótese usando snapshots de tentativas e da sessão atual. O sorteio geral é equilibrado entre categorias. O repertório continua finito, e a seleção adaptativa do treino permanece uma heurística local.

Referências públicas consultadas para conferir distinções, sem copiar critérios ou texto dos manuais:

- [Ansiedade generalizada, NIMH](https://www.nimh.nih.gov/health/publications/generalized-anxiety-disorder-gad) e [pânico, NIMH](https://www.nimh.nih.gov/health/publications/panic-disorder-when-fear-overwhelms): preocupação ampla versus crises e antecipação de recorrência.
- [TOC, NIMH](https://www.nimh.nih.gov/health/publications/obsessive-compulsive-disorder-when-unwanted-thoughts-or-repetitive-behaviors-take-over): intrusões e repetições, sem equivaler a organização ou perfeccionismo.
- [Transtornos dissociativos, APA](https://www.psychiatry.org/patients-families/dissociative-disorders/what-are-dissociative-disorders), [personalidade, APA](https://www.psychiatry.org/patients-families/personality-disorders/what-are-personality-disorders) e [alimentação, APA](https://www.psychiatry.org/patients-families/eating-disorders/what-are-eating-disorders): distinções gerais usadas como orientação editorial, não validação dos exemplos.
- [Tipos de demência, NIA](https://www.nia.nih.gov/health/infographics/understanding-different-types-dementia) e [narcolepsia, NHLBI](https://www.nhlbi.nih.gov/health/narcolepsy): curso adquirido, apresentação cognitiva e manifestações do sono.
- [Gaming disorder, OMS](https://www.who.int/standards/classifications/frequently-asked-questions/gaming-disorder): perda de controle e prejuízo, não apenas número de horas jogadas.
- [Estudo prospectivo do sinal de Hoover](https://pubmed.ncbi.nlm.nih.gov/22118379/): sinais positivos no exame funcional, sem equiparar exames normais a falsificação de sintomas.
- [Esquizofrenia e transtornos relacionados, APA](https://www.psychiatry.org/patients-families/schizophrenia/what-is-schizophrenia): curso temporal e relação entre alterações de humor e psicose.

Na verificação automatizada de 100 seeds por hipótese, os relatos v2 ficaram entre 37 e 70 palavras; médias aproximadas de 50,5 (fácil), 50,4 (médio) e 51,4 (difícil). São medidas da versão atual, não limites de complexidade clínica. Há 254 apresentações editoriais no catálogo de 121 hipóteses, antes da variação de identidade.

As narrativas e os diferenciais ainda precisam de revisão humana especializada antes de qualquer uso formal de ensino. Testes automatizados verificam integridade e comportamento, não validade diagnóstica. O PsiDle não deve ser usado para diagnóstico, tratamento ou decisão clínica.

## Roteiro de verificação

- Conferir início, treino, diário, revisão, tarefas, perfil e configurações em 320, 390, 768 e 1366 px.
- Trocar rotas rapidamente: uma única entrada de página; sem cartões em cascata e sem teclado aberto automaticamente.
- Enviar resposta desconhecida e repetir um palpite: não perder tentativas.
- Errar, sair e recarregar: manter o caso, as pistas e o histórico.
- Encerrar o diário: manter resultado e explicação após recarregar; não duplicar XP.
- Adicionar à revisão, responder ao flashcard e consultar o mesmo caso no caderno pesquisável.
- Conferir toast sem alterar dimensões do documento; conferir modo claro, foco visível e navegação por teclado.
- Verificar som em aparelho físico e redução de movimento nas configurações reais do sistema. Emulação de tamanho de tela não substitui Safari/iOS ou Chrome/Android reais.
