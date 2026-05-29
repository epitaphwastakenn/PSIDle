import { Link } from 'react-router-dom'
import { XPBar } from '../components/common/XPBar'
import { audioManager } from '../lib/audio'
import { getUserProgress } from '../lib/storage'

export function HomePage() {
  const progress = getUserProgress()
  const displayName = progress.displayName?.trim()

  return (
    <div className="space-y-5">
      <section className="panel overflow-hidden p-5 md:p-7">
        <div className="grid gap-5 md:grid-cols-[1.25fr_0.75fr] md:items-center">
          <div>
            <h1 className="page-title text-3xl md:text-5xl">PsiDle</h1>
            <p className="mt-3 text-sm font-semibold text-[color:var(--accent)] md:text-base">
              {displayName ? `Bem vindo de volta, ${displayName}.` : 'Bem vindo ao seu espaco de estudo.'}
            </p>
            <p className="page-subtitle mt-3 max-w-2xl text-sm md:text-base">
              Treine raciocinio em psicologia com casos ficticios. Leia, compare hipoteses, erre com qualidade e
              evolua com revisao ativa.
            </p>

            <div className="mt-5 grid gap-2 sm:grid-cols-3">
              <Link to="/daily" onClick={() => audioManager.playClick()} className="btn-primary text-center">
                Jogar caso diario
              </Link>
              <Link to="/practice" onClick={() => audioManager.playClick()} className="btn-secondary text-center">
                Modo treino
              </Link>
              <Link to="/review" onClick={() => audioManager.playClick()} className="btn-ghost text-center">
                Revisao
              </Link>
            </div>
          </div>

          <div className="panel-soft p-4 md:p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-[color:var(--text-muted)]">
              Foco da sessao
            </p>
            <p className="mt-2 text-sm text-[color:var(--text-body)]">
              1 caso diario, treino filtrado por categoria/dificuldade e fila de revisao com repeticao espaçada.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              <span className="chip rounded-full px-3 py-1">Casos ficticios</span>
              <span className="chip rounded-full px-3 py-1">Estudo ativo</span>
              <span className="chip rounded-full px-3 py-1">Sem diagnostico real</span>
            </div>
          </div>
        </div>
      </section>

      <section className="panel p-5">
        <h2 className="page-title text-xl md:text-2xl">Seu progresso</h2>
        <p className="page-subtitle mt-1 text-sm">Continue estudando para subir nivel, ganhar moedas e manter streak.</p>
        <div className="mt-4">
          <XPBar xp={progress.xp} level={progress.level} />
        </div>
      </section>
    </div>
  )
}
