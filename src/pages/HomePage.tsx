import { Link } from 'react-router-dom'
import { getUserProgress } from '../lib/storage'
import { XPBar } from '../components/common/XPBar'

export function HomePage() {
  const progress = getUserProgress()

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-surface-200 bg-white p-6 shadow-card">
        <h1 className="font-title text-4xl text-denim-600">PsiDle</h1>
        <p className="mt-3 max-w-3xl leading-relaxed text-slate-700">
          Jogo de estudo em psicologia e psicopatologia com casos clínicos fictícios. Analise a vinheta, teste hipóteses e
          aprenda por diferenciação diagnóstica.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            to="/daily"
            className="rounded-xl bg-denim-600 px-4 py-2 font-semibold text-white transition hover:bg-denim-500"
          >
            Jogar caso diário
          </Link>
          <Link
            to="/practice"
            className="rounded-xl bg-mint-500 px-4 py-2 font-semibold text-white transition hover:bg-mint-500/90"
          >
            Modo treino
          </Link>
          <Link
            to="/review"
            className="rounded-xl bg-peach-500 px-4 py-2 font-semibold text-white transition hover:bg-peach-500/90"
          >
            Revisão
          </Link>
        </div>
      </section>

      <section className="rounded-2xl border border-surface-200 bg-white p-5 shadow-card">
        <h2 className="font-title text-2xl text-denim-600">Seu progresso</h2>
        <p className="mt-1 text-sm text-slate-600">
          Continue estudando para ganhar XP, moedas e manter sua sequência de dias.
        </p>
        <div className="mt-4">
          <XPBar xp={progress.xp} level={progress.level} />
        </div>
      </section>
    </div>
  )
}
