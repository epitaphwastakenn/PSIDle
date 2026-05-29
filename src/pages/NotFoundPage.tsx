import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <section className="rounded-2xl border border-surface-200 bg-white p-6 text-center shadow-card">
      <h1 className="font-title text-3xl text-denim-600">Página não encontrada</h1>
      <p className="mt-2 text-slate-700">Esse caminho não existe no PsiDle.</p>
      <Link
        to="/"
        className="mt-4 inline-flex rounded-xl bg-denim-600 px-4 py-2 font-semibold text-white transition hover:bg-denim-500"
      >
        Voltar ao início
      </Link>
    </section>
  )
}
