import { Link } from 'react-router-dom'
import { XPBar } from '../components/common/XPBar'
import { audioManager } from '../lib/audio'
import { getDailyTasks, getReviewItems, getUserProgress } from '../lib/storage'

export function HomePage() {
  const progress = getUserProgress()
  const reviewItems = getReviewItems()
  const dailyTasks = getDailyTasks()
  const displayName = progress.displayName?.trim()
  const dueReviews = reviewItems.filter((item) => item.status === 'due').length
  const readyTasks = dailyTasks.filter((task) => task.completed && !task.claimed).length
  const solvedAttempts = progress.attempts.filter((attempt) => attempt.solved).length

  return (
    <div className="space-y-6">
      <section className="hero-panel hero-shell panel overflow-hidden p-5 md:p-7">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <div className="hero-kicker-row">
              <span className="hero-kicker">Psicologia em formato de jogo</span>
              <span className="hero-subkicker">Casos ficticios • estudo ativo • revisao</span>
            </div>

            <h1 className="page-title mt-4 text-4xl md:text-5xl xl:text-6xl">
              Treino clinico com cara de produto real.
            </h1>
            <p className="mt-4 text-sm font-semibold text-[color:var(--accent)] md:text-base">
              {displayName ? `Bem vindo de volta, ${displayName}.` : 'Entre, escolha um foco e comece a estudar.'}
            </p>
            <p className="page-subtitle mt-3 max-w-2xl text-sm leading-relaxed md:text-base">
              Leia vinhetas, diferencie hipoteses, receba feedback imediato e transforme erro em revisao estruturada.
              O fluxo foi pensado para estudo rapido no celular e sessao longa no desktop.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <Link to="/daily" onClick={() => audioManager.playClick()} className="btn-primary hero-cta text-center">
                Jogar caso diario
              </Link>
              <Link to="/practice" onClick={() => audioManager.playClick()} className="btn-secondary hero-cta text-center">
                Modo treino
              </Link>
              <Link to="/review" onClick={() => audioManager.playClick()} className="btn-ghost hero-cta text-center">
                Revisao
              </Link>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="hero-metric panel-soft p-3">
                <p className="hero-metric-label">Casos resolvidos</p>
                <p className="hero-metric-value">{solvedAttempts}</p>
              </div>
              <div className="hero-metric panel-soft p-3">
                <p className="hero-metric-label">Revisoes pendentes</p>
                <p className="hero-metric-value">{dueReviews}</p>
              </div>
              <div className="hero-metric panel-soft p-3">
                <p className="hero-metric-label">Tarefas prontas</p>
                <p className="hero-metric-value">{readyTasks}</p>
              </div>
            </div>
          </div>

          <div className="hero-sidebar space-y-3">
            <div className="summary-surface p-4 md:p-5">
              <p className="hero-section-label">Ritmo da sessao</p>
              <div className="mt-3 space-y-3">
                <div className="hero-rail-item">
                  <span className="hero-rail-index">01</span>
                  <div>
                    <p className="font-semibold text-[color:var(--text-strong)]">Caso diario</p>
                    <p className="text-sm text-[color:var(--text-body)]">Um desafio fixo por dia para criar consistencia.</p>
                  </div>
                </div>
                <div className="hero-rail-item">
                  <span className="hero-rail-index">02</span>
                  <div>
                    <p className="font-semibold text-[color:var(--text-strong)]">Treino filtrado</p>
                    <p className="text-sm text-[color:var(--text-body)]">Escolha categoria e dificuldade com menos friccao.</p>
                  </div>
                </div>
                <div className="hero-rail-item">
                  <span className="hero-rail-index">03</span>
                  <div>
                    <p className="font-semibold text-[color:var(--text-strong)]">Revisao ativa</p>
                    <p className="text-sm text-[color:var(--text-body)]">Erros voltam como material util, nao como fim de tentativa.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="summary-surface p-4 md:p-5">
              <p className="hero-section-label">Leitura do produto</p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                <span className="chip rounded-full px-3 py-1">Casos ficticios</span>
                <span className="chip rounded-full px-3 py-1">Feedback imediato</span>
                <span className="chip rounded-full px-3 py-1">Nao diagnostico real</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="panel p-5 md:p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="page-title text-2xl md:text-3xl">Seu progresso</h2>
            <p className="page-subtitle mt-1 text-sm">Continue estudando para subir nivel, ganhar moedas e manter streak.</p>
          </div>
          <div className="quick-grid">
            <div className="mini-stat">
              <span className="mini-stat-label">XP</span>
              <span className="mini-stat-value">{progress.xp}</span>
            </div>
            <div className="mini-stat">
              <span className="mini-stat-label">Moedas</span>
              <span className="mini-stat-value">{progress.coins}</span>
            </div>
            <div className="mini-stat">
              <span className="mini-stat-label">Streak</span>
              <span className="mini-stat-value">{progress.streak}</span>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <XPBar xp={progress.xp} level={progress.level} />
        </div>
      </section>
    </div>
  )
}

