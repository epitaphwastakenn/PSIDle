# PsiDle

Jogo estatico de estudo em psicologia/psicopatologia, em portugues brasileiro, com casos clinicos ficticios.

## Aviso de seguranca

Este projeto e educacional e de entretenimento.

Nao e ferramenta diagnostica, nao e aconselhamento medico e nao deve ser usado para decisao clinica real.

Disclaimer no app:

> "Este site é uma ferramenta educacional para estudo de psicologia e psicopatologia. Os casos são fictícios e não devem ser usados para diagnóstico, tratamento ou tomada de decisão clínica. Em caso de sofrimento psicológico, procure um profissional qualificado."

Rodape:

> "Conteúdo educacional. Não é diagnóstico clínico."

## Stack

- Vite
- React
- TypeScript
- Tailwind CSS
- React Router (HashRouter para GitHub Pages)
- localStorage
- GitHub Actions (deploy no GitHub Pages)

## Sem backend

Projeto feito para hospedagem estatica no GitHub Pages (HTML/CSS/JS apos build).

Nao usa:

- API server
- SSR
- banco de dados
- Prisma/Supabase
- chaves secretas no frontend

## Instalar

Requer Node.js 22.15 ou superior (use a versão mais recente da linha 22).

```bash
npm install
```

## Rodar localmente

```bash
npm run dev
```

## Build

```bash
npm run build
```

Preview do build:

```bash
npm run preview
```

## Deploy no GitHub Pages

Workflow:

- `.github/workflows/deploy.yml`

Passos:

1. Commit e push para `main` ou `master`.
2. No GitHub: `Settings -> Pages -> Source: GitHub Actions`.
3. Aguarde o workflow `Deploy to GitHub Pages`.

## Sobre rotas e base path

- O projeto usa `HashRouter` para evitar problema de rota em host estatico.
- O `vite.config.ts` usa `base: './'` para funcionar bem em subpasta de repositorio.

## Dados estaticos

Arquivos:

- `src/data/disorders.ts`
- `src/data/cases.ts`
- `src/data/tasks.ts`
- `src/data/achievements.ts`

Tudo e TypeScript estatico/manual, sem fetch de backend.

## Geracao procedural de casos

- Caso diario: gerado proceduralmente de forma deterministica por data.
- Modo treino: gera casos ficticios proceduralmente a cada clique, com filtros por categoria e dificuldade.
- Idades e apresentações variam dentro de perfis coerentes; duração e limites clínicos não são sorteados pela dificuldade.
- Relatos curtos em dois parágrafos: situação observável, curso e um detalhe de comparação. Difícil significa distinguir hipóteses próximas, não ler mais texto.

Implementacao:

- `src/lib/proceduralCases.ts`
- `src/data/caseProfiles.ts`: apresentações, curso, distinção, pistas e diferencial de cada hipótese.
- `src/data/casePeople.ts`: nomes e sobrenomes, separados do conteúdo do caso.

### Seleção inteligente e continuidade

- O treino respeita os filtros e evita até oito hipóteses recentes, conforme o tamanho do catálogo filtrado.
- A seleção inteligente aumenta o peso de hipóteses novas, erros anteriores e categorias com menor aproveitamento. Pode ser desativada para sorteio uniforme.
- Preferências e partidas em andamento são salvas: sair da aba ou recarregar não apaga as tentativas.
- Antes de descartar um treino iniciado, o site pede confirmação no próprio painel.
- A mesma hipótese no treino rende 100%, 50%, 25% e depois 0% de XP/moedas de conclusão no mesmo dia. A leitura da explicação acompanha esse fator. Metas e conquistas continuam sendo resgatadas uma única vez.
- O resultado diário, a explicação e as recompensas permanecem acessíveis após concluir o caso, sem premiar novamente ao recarregar.
- Revisões usam a data agendada, inclusive para itens antes considerados dominados. O caderno permite buscar e expandir os casos já revisados.

Os casos são composições locais de texto, não IA generativa. As 121 hipóteses têm perfis próprios ou de famílias explicitamente definidas. O gerador não monta sintomas aleatórios de uma categoria nem repete a definição do catálogo no enunciado. Os diferenciais são escolhidos editorialmente por relevância, não por sorteio.

O sorteio sem hipótese definida equilibra categorias antes de escolher uma hipótese. O treino mantém a seleção inteligente e consulta casos anteriores para alternar apresentações da mesma hipótese. Com duas apresentações, por exemplo, evita repetir a última. Esse repertório é finito: variar seed não produz conhecimento clínico novo nem garante casos infinitamente inéditos.

Os IDs novos identificam a versão 2 do gerador. Partidas em andamento, resultados diários e revisões mantêm seus snapshots antigos, sem migração destrutiva. Para ver a redação nova durante uma partida antiga, use **Novo caso** no treino.

O catálogo continua precisando de revisão humana especializada: testes de código verificam integridade e coerência estrutural, não validade diagnóstica. Algumas entradas misturam nomenclaturas DSM e CID; as narrativas não são critérios completos nem um substituto de avaliação clínica.

### Testes

```bash
npm test
npm run lint
npm run build
```

A suíte verifica filtros, rotação de hipóteses e apresentações, pesos adaptativos, reprodução do diário, cobertura do catálogo, faixas etárias, limites de palavras, fatos discriminantes, revisão, aliases e recompensas por repetição. O workflow de deploy executa essas verificações antes de publicar.

Fontes e critérios de UX: [notas de pesquisa](docs/UX-E-ESTUDO.md).

## Persistencia local

Chaves versionadas:

- `psidle:v1:progress`
- `psidle:v1:tasks`
- `psidle:v1:review`
- `psidle:v1:session:daily`
- `psidle:v1:session:practice`
- `psidle:v1:practice-selection`
- `psidle:user-settings:v1`

Com tratamento de dados ausentes/corrompidos.

## Audio e configuracoes

Sons opcionais devem ficar em:

- `public/sounds/correct.mp3`
- `public/sounds/wrong.mp3`
- `public/sounds/type-1.mp3`
- `public/sounds/type-2.mp3`
- `public/sounds/click.mp3`

Se algum arquivo estiver ausente, o app ignora a falha silenciosamente.

As preferencias de som ficam salvas em `localStorage` na chave `psidle:user-settings:v1`. O painel permite mutar tudo, ajustar volume geral, mutar sons individuais e controlar volume separado para acerto, erro, digitacao e clique.

Navegadores bloqueiam audio antes da primeira interacao do usuario. Por isso, o app destrava o sistema de audio no primeiro `pointerdown`, `touchstart` ou `keydown`; depois disso os sons funcionam normalmente conforme as configuracoes.

## Adicionar novos transtornos

Edite `src/data/disorders.ts` com objetos `Disorder`:

- `id`
- `namePt`
- `aliases`
- `category`
- `shortSummary`
- `studyNote`
- `difficulty`

Inclua também um perfil com o mesmo `id` em `src/data/caseProfiles.ts`: pelo menos duas situações compatíveis, `ageRange`, `course`, `distinction`, três pistas em `details` e um diferencial existente. Todas as situações precisam combinar com o mesmo curso e a mesma distinção. Escreva observações originais e curtas; não cole definições no enunciado. Rode os testes para verificar cobertura e tamanho. Novas condições não recebem um texto genérico silenciosamente.

## Adicionar novos casos manuais

Edite `src/data/cases.ts` com objetos `Case`:

- `id`, `title`, `category`, `difficulty`
- `vignette`
- `correctDisorderId`
- `clues`
- `explanation`
- `differentials`
- `status: "approved"`

## Limites de conteudo e copyright

- Nao incluir PDF no repositorio.
- Nao colocar DSM PDF em `/public`.
- Nao copiar texto extenso de manual diagnostico protegido por copyright.
- Nao expor criterios integrais protegidos por copyright.
- Nao usar o app para diagnostico real.
- Nao recomendar medicacao/tratamento.

## Licenca e uso

Projeto para estudo pessoal e entretenimento educacional.
