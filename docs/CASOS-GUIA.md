# Guia de escrita dos casos do PsiDle

Os casos ficam em `src/data/cases/*.ts`, um conjunto (`DisorderCaseSet`) por diagnóstico, no formato de `src/data/cases/types.ts`. Os modelos de referência são **`gad`** em `anxiety.ts` e **`sedative_hypnotic_use_disorder`** em `substance.ts`: leia os dois antes de escrever.

Verificação automática (rode sempre que mexer em um arquivo):

```bash
CASE_FILE=anxiety npm run test:cases
```

## 1. Base clínica

- **Critérios: DSM-5-TR (APA, 2022).** As famílias do jogo seguem os capítulos do DSM-5-TR. O caso precisa cumprir os critérios essenciais do diagnóstico: sintomas centrais, número mínimo de sintomas, duração, idade de início, prejuízo funcional e exclusões (substâncias, condições médicas, outro transtorno que explique melhor).
- **Referência online verificada.** Cada conjunto aponta para uma página real, aberta e conferida, que descreve o diagnóstico. Ordem de preferência:
  1. Manual MSD, edição para profissionais, em português (`https://www.msdmanuals.com/pt/profissional/...`);
  2. StatPearls / NCBI Bookshelf (`https://www.ncbi.nlm.nih.gov/books/NBK...`);
  3. outra fonte institucional (OMS/CID-11, sociedades médicas).
  Abra o link antes de usar: vários endereços do MSD mudaram e dão 404.
- **Escreva com palavras próprias.** A referência serve para conferir os fatos, não para copiar frases.

## 2. A regra mais importante: um caso, uma resposta

A vinheta mais as 4 pistas devem levar **um único diagnóstico do catálogo**. Antes de escrever, liste os diagnósticos que alguém poderia propor (da mesma família e de outras) e garanta que o caso contém o fato que exclui cada um deles.

- **Evite comorbidades.** Se outro diagnóstico poderia coexistir (por exemplo, uso de substância em um quadro psicótico), inclua o fato que o afasta ("usou pela primeira vez", "nunca perdeu o controle do uso").
- **Exclusões que costumam faltar:**
  - **Duração e início:** semanas ou meses, idade em que começou.
  - **Causa orgânica:** exames normais, medicamentos em uso, substâncias.
  - **Episódios de humor:** se houve fases de energia elevada ou de tristeza.
  - **Padrão de vida inteira ou mudança recente:** importante para personalidade, neurodesenvolvimento e quadros neurocognitivos.
- **`differential`** é o vizinho mais perigoso. Toda variante traz o fato que o exclui e o copia, palavra por palavra, em `rulesOut`.
- **Explique o porquê em `explanation`:** os critérios presentes e por que o diferencial não serve. Ali pode nomear diagnósticos.

## 3. Dificuldade = grau de abstração

A dificuldade mostrada ao jogador é o nível da variante. Cada diagnóstico tem pelo menos uma variante de cada nível.

| Nível | Como os sintomas aparecem | Exclusão do diferencial | O que o jogador precisa fazer |
|---|---|---|---|
| **Fácil** | Apresentação clássica, sintomas centrais ditos com clareza (linguagem leiga ou do paciente), duração explícita | Clara, na vinheta | Reconhecer o quadro |
| **Médio** | Sintomas mostrados por comportamentos e relatos ("confere o saldo várias vezes ao dia"), sem termos técnicos; duração dita de forma natural ("desde o início do ano passado") | Presente na vinheta, sem destaque | Juntar sinais e descartar o vizinho óbvio |
| **Difícil** | Apresentação real porém menos típica: outra idade, queixa inicial que aponta para outro lado (ex.: dor de estômago, falta de memória), um ruído realista (estresse recente, sintoma inespecífico). Sintomas inferidos de observações de terceiros | Discreta, mas presente na vinheta | Perceber o que importa no meio do ruído |

- **No difícil o caso nunca pode ficar aberto.** Um especialista que lê a vinheta e as pistas chega a um único diagnóstico. Abstração é sobre *como* a informação aparece, não sobre *esconder* informação essencial.
- **Exemplo de ruído realista:** no TAG difícil, a queixa é gastrointestinal (parece transtorno somático), mas o paciente aceita bem os exames normais e se preocupa com muitos temas.

## 4. Vocabulário

O teste automático barra:

- **Rótulos e nomes de diagnóstico** em vinhetas e pistas: "transtorno", "síndrome", "fobia", "pânico", "agorafobia", "esquizofrenia", "narcolepsia", "borderline", "Tourette", "delirium", "pica"… e qualquer nome do catálogo ou apelido do próprio diagnóstico.
- **Palavras de família** fora da família. Isso evita o caso que "fala de ansiedade, mas não é da família Ansiedade".
  - **Termos de outras famílias:** proibidos sempre.
  - **Termos da própria família:** liberados só no **fácil** (vinheta) e nas pistas.

| Família | Palavras barradas |
|---|---|
| Ansiedade | ansiedade, ansioso |
| Humor | depressão, deprimido, bipolar, mania, maníaco, hipomania |
| Psicóticos | psicótico, psicose, esquizo…, delírio, delirante, alucinação |
| Obsessivo-compulsivo | obsessão, compulsão, compulsivo |
| Trauma e Estresse | trauma, traumático |
| Dissociativos | dissociação, dissociativo |
| Personalidade | personalidade |
| Neurocognitivos | demência, neurocognitivo |
| Alimentação e Ingestão | anorexia, bulimia |
| Sintomas Somáticos | somatização, hipocondria, psicossomático |
| Neurodesenvolvimento | autismo, TDAH, hiperatividade, dislexia, discalculia |
| Substâncias e Comportamentos Aditivos | vício, viciado, dependência química |

  Descreva em vez de rotular: "convicção inabalável de que o vizinho o envenena" no lugar de "delírio"; "vê pessoas que não estão lá" no lugar de "alucinação"; "angústia" ou "aflição" no lugar de "ansiedade".
- **`giveaways`:** palavras que entregam a resposta. Ficam liberadas só na vinheta do fácil (ex.: o nome da substância). No médio e no difícil, descreva pelo contexto: "comprimidos para dormir conseguidos com receitas de dois médicos", "remédios dos nervos", "pó", "garrafas escondidas no armário".
- **Nada de bastidor:** "caso fictício", "critério", "hipótese", "diagnóstico diferencial", "o exercício".

## 5. Realismo

- **Contexto de chegada:** quem traz (família, escola, encaminhamento), onde (UBS, CAPS, pronto-atendimento, ambulatório, consultório) e por quê.
- **Detalhes concretos do cotidiano brasileiro:** trabalho, escola, ônibus, igreja, família, contas. Use números plausíveis e fala do paciente entre aspas de vez em quando.
- **Idade de início e perfil típicos do diagnóstico.** Em crianças, quem relata são pais e escola.
- **Linguagem clínica neutra e sem caricatura.** Nada de sintomas em lista; conte uma história curta.
- **Formato:**
  - **Vinheta:** 2 parágrafos, 50–135 palavras. O 1º apresenta a pessoa, o contexto e a queixa; o 2º traz o curso, os detalhes decisivos e a exclusão.
  - **Marcadores:** `{nome}`, `{idade}` e `{masc|fem}` para concordância: `{cansado|cansada}`, `{o|a} paciente`, `analista financeir{o|a}`.
  - **`sex`:** use só quando o diagnóstico ou a história exige (ex.: TDPM → `'f'`).
  - **`ages`:** coerente com a história de cada variante e dentro do `caseAgeRange` do diagnóstico, quando houver.

## 6. Pistas

São 4 por variante, sempre nesta ordem: **Sintomas → Curso → Prejuízo → Exclusão**.

1. **Sintomas:** mais um sinal típico, ainda não citado.
2. **Curso:** início, duração, evolução.
3. **Prejuízo:** impacto concreto na vida (trabalho, escola, relações).
4. **Exclusão:** o fato que afasta o diferencial principal, sem nomear transtornos.

Cada pista tem 6–40 palavras, traz informação nova, nunca contradiz a vinheta e nunca nomeia diagnósticos.

## 7. Lista de verificação

- [ ] Critérios do DSM-5-TR cumpridos: sintomas, número, duração, idade, prejuízo, exclusões.
- [ ] Referência aberta e conferida.
- [ ] Ninguém que conhece o assunto propõe um segundo diagnóstico com a vinheta e as pistas.
- [ ] O fácil é resolvível só com a vinheta; o difícil tem ruído, mas não fica aberto.
- [ ] Sem nomes, rótulos, palavras de outra família, e `giveaways` só no fácil.
- [ ] `rulesOut` copiado literalmente da vinheta ou das pistas.
- [ ] `CASE_FILE=<arquivo> npm run test:cases` passando.
