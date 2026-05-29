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
- A idade e sorteada com coerencia de contexto (escola, faculdade, trabalho, etc.), conforme etapa de vida.

Implementacao:

- `src/lib/proceduralCases.ts`

## Persistencia local

Chaves versionadas:

- `psidle:v1:progress`
- `psidle:v1:tasks`
- `psidle:v1:review`

Com tratamento de dados ausentes/corrompidos.

## Adicionar novos transtornos

Edite `src/data/disorders.ts` com objetos `Disorder`:

- `id`
- `namePt`
- `aliases`
- `category`
- `shortSummary`
- `studyNote`
- `difficulty`

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
