import { lazy, Suspense, useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '../components/common/Icon'
import { XPBar } from '../components/common/XPBar'
import { audioManager } from '../lib/audio'
import { findDailyAttempt, getTodayKey } from '../lib/daily'
import { getDueReviewItems } from '../lib/review'
import { ensureDailyTasksForToday, getActiveSession, getReviewItems, getUserProgress } from '../lib/storage'
import { generateDailyTasks } from '../lib/taskEngine'

const HeroScene = lazy(() => import('../components/common/HeroScene').then((module) => ({ default: module.HeroScene })))

export function HomePage() {
  const progress = getUserProgress()
  const [tasks] = useState(() => ensureDailyTasksForToday(() => generateDailyTasks(new Date())))
  const due = getDueReviewItems(getReviewItems()).length
  const daily = findDailyAttempt(progress.attempts, getTodayKey())
  const practice = getActiveSession('practice')
  const solved = progress.attempts.filter((attempt) => attempt.solved).length
  const doneTasks = tasks.filter((task) => task.completed).length
  const readyTasks = tasks.filter((task) => task.completed && !task.claimed).length
  const today = new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })

  return (
    <div className="page-stack">
      <section className="home-hero">
        <div className="home-hero-copy">
          <span className="kicker kicker-dot">{progress.displayName ? `Olá, ${progress.displayName} · ${today}` : today}</span>
          <h1 className="display-xl">Um caso clínico. <em>Cinco</em> tentativas.</h1>
          <p className="lead">Cada erro revela uma nova pista.</p>
          <div className="home-hero-actions">
            <Link className="btn btn-primary btn-lg" to="/daily" onClick={() => audioManager.playClick()}>
              <Icon name="play" width="18" height="18" />
              {daily ? 'Ver resultado' : getActiveSession('daily') ? 'Continuar' : 'Jogar o caso de hoje'}
            </Link>
            <Link className="btn btn-secondary btn-lg" to="/practice" onClick={() => audioManager.playClick()}>
              <Icon name="shuffle" width="18" height="18" />Treino
            </Link>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {daily && <span className="home-hero-note"><span className="status-dot" />{daily.solved ? 'Resolvido hoje' : 'Em revisão'} · {daily.score} pontos</span>}
            <Link to="/archive" className="text-link" onClick={() => audioManager.playClick()}>Dias anteriores<Icon name="arrow" /></Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-glow" aria-hidden="true" />
          <Suspense fallback={null}><HeroScene /></Suspense>
          <div className="hero-chip hero-chip-a" aria-hidden="true"><span className="tile tile-xs tile-warn" />Nova pista</div>
          <div className="hero-chip hero-chip-b" aria-hidden="true"><span className="tile tile-xs tile-ok" />Resolvido · +180 XP</div>
        </div>
      </section>

      <section aria-label="Seu progresso" className="grid-4">
        <div className="card stat-card">
          <div className="stat-card-top"><span className="stat-label">Nível</span><span className="icon-tile icon-tile-accent"><Icon name="spark" /></span></div>
          <span className="stat-value">{progress.level}</span>
          <XPBar xp={progress.xp} level={progress.level} />
        </div>
        <div className="card stat-card">
          <div className="stat-card-top"><span className="stat-label">Resolvidos</span><span className="icon-tile icon-tile-ok"><Icon name="check" /></span></div>
          <span className="stat-value">{solved}<small>de {progress.attempts.length}</small></span>
        </div>
        <div className="card stat-card">
          <div className="stat-card-top"><span className="stat-label">Sequência</span><span className="icon-tile icon-tile-warn"><Icon name="flame" /></span></div>
          <span className="stat-value">{progress.streak}<small>{progress.streak === 1 ? 'dia' : 'dias'}</small></span>
        </div>
        <Link to="/review" className="card card-link stat-card" onClick={() => audioManager.playClick()}>
          <div className="stat-card-top"><span className="stat-label">Para revisar</span><span className="icon-tile"><Icon name="book" /></span></div>
          <span className="stat-value">{due}</span>
        </Link>
      </section>

      <section className="grid-3" aria-label="Continue estudando">
        <Link to="/practice" className="card card-link mode-card" onClick={() => audioManager.playClick()}>
          <span className="icon-tile icon-tile-accent"><Icon name="shuffle" /></span>
          <h2 className="h2">Treino</h2>
          <p>Escolha tema e dificuldade.</p>
          <span className="text-link">{practice ? 'Continuar' : 'Começar'}<Icon name="arrow" className="arrow-icon" /></span>
        </Link>
        <Link to="/review" className="card card-link mode-card" onClick={() => audioManager.playClick()}>
          <span className="icon-tile icon-tile-warn"><Icon name="book" /></span>
          <h2 className="h2">Revisão</h2>
          <p>{due ? `${due} ${due === 1 ? 'caso pendente' : 'casos pendentes'}.` : 'Tudo em dia.'}</p>
          <span className="text-link">Abrir<Icon name="arrow" className="arrow-icon" /></span>
        </Link>
        <section className="card mode-card">
          <div className="stat-card-top">
            <h2 className="h2">Tarefas</h2>
            <span className="tag">{doneTasks}/{tasks.length}</span>
          </div>
          <ul className="task-mini">
            {tasks.map((task) => (
              <li key={task.id}>
                <span className={`tile tile-sm ${task.completed ? 'tile-ok' : ''}`}>{task.completed && <Icon name="check" />}</span>
                <span>{task.title}</span>
                <span className="mono small muted">+{task.rewardXp}</span>
              </li>
            ))}
          </ul>
          <Link to="/tasks" className="text-link">{readyTasks ? `Resgatar (${readyTasks})` : 'Ver todas'}<Icon name="arrow" /></Link>
        </section>
      </section>
    </div>
  )
}
