# PsiDle

Jogo estático de estudo em psicologia/psicopatologia, inspirado em dinâmicas estilo Wordle, com identidade própria em português brasileiro.

O usuário recebe um caso clínico **fictício** e tenta identificar o transtorno mais provável para fins de estudo.

## Aviso importante

Este projeto é educacional e de entretenimento.

**Não é ferramenta diagnóstica, não é aconselhamento médico e não deve ser usado para decisão clínica real.**

Disclaimer exibido no app:

> "Este site é uma ferramenta educacional para estudo de psicologia e psicopatologia. Os casos são fictícios e não devem ser usados para diagnóstico, tratamento ou tomada de decisão clínica. Em caso de sofrimento psicológico, procure um profissional qualificado."

Rodapé:

> "Conteúdo educacional. Não é diagnóstico clínico."

## Stack

- Vite
- React
- TypeScript
- Tailwind CSS
- React Router
- localStorage (persistência)
- GitHub Actions (deploy no GitHub Pages)

## Por que não há backend

O projeto foi desenhado para GitHub Pages, então toda a aplicação é entregue como HTML/CSS/JS estático.

Por isso, **não usa**:

- API server
- SSR
- banco de dados
- Prisma/Supabase
- chaves secretas no frontend

## Instalação

Pré-requisitos:

- Node.js 22+
- npm 10+

Comandos:

```bash
npm install
```

## Rodar localmente

```bash
npm run dev
```

## Build de produção

```bash
npm run build
```

Pré-visualização local do build:

```bash
npm run preview
```

## Deploy no GitHub Pages

O workflow já está em:

- `.github/workflows/deploy.yml`

Fluxo:

1. `checkout`
2. `setup-node`
3. `npm ci`
4. `npm run build`
5. copia `dist/index.html` para `dist/404.html` (fallback SPA)
6. upload de artifact
7. deploy para Pages

### Configuração necessária no GitHub

1. Repositório no GitHub.
2. Abrir `Settings` → `Pages`.
3. Em **Build and deployment**, selecionar **Source: GitHub Actions**.
4. Fazer push para `main` (ou `master`).
5. Aguardar workflow `Deploy to GitHub Pages`.

### Base path no Vite

`vite.config.ts` está configurado para:

- em GitHub Actions: `/${nome-do-repo}/`
- local: `/`

Se você usar site de usuário/organização na raiz, pode fixar `base: '/'`.

## Como os dados estáticos funcionam

Arquivos de dados:

- `src/data/disorders.ts`
- `src/data/cases.ts`
- `src/data/tasks.ts`
- `src/data/achievements.ts`

Tudo é TypeScript estático (mock/manual), sem fetch de backend.

## Estrutura de gameplay (v1)

- Caso diário determinístico por data (client-side)
- Modo treino com filtros por categoria/dificuldade
- Pistas progressivas
- Palpite com aliases e normalização (minúsculas, trim, sem acento)
- Pontuação
- XP/moedas/nível/streak
- Tarefas diárias
- Revisão com repetição espaçada simples
- Perfil com estatísticas e conquistas

## Persistência local

Persistência via `localStorage` com chaves versionadas:

- `psidle:v1:progress`
- `psidle:v1:tasks`
- `psidle:v1:review`

Há tratamento para dados ausentes/corrompidos.

## Adicionar novos transtornos

Edite `src/data/disorders.ts` adicionando objetos `Disorder`:

- `id`
- `namePt`
- `aliases`
- `category`
- `shortSummary`
- `studyNote`
- `difficulty`

## Adicionar novos casos

Edite `src/data/cases.ts` com objetos `Case`:

- `id`, `title`, `category`, `difficulty`
- `vignette`
- `correctDisorderId`
- `clues`
- `explanation`
- `differentials`
- `status: "approved"`

Use apenas casos fictícios e texto autoral/parafraseado.

## Limites de conteúdo e copyright

- Não incluir PDF no repositório.
- Não colocar DSM PDF em `/public`.
- Não copiar texto extenso de manual diagnóstico.
- Não expor critérios integrais protegidos por copyright.
- Não usar conteúdo para diagnóstico real.
- Não recomendar medicação/tratamento.

## Licença e uso

Projeto para estudo pessoal e entretenimento educacional.
