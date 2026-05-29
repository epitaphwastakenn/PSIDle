import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <section className="panel p-6 text-center">
      <h1 className="page-title text-3xl">Pagina nao encontrada</h1>
      <p className="mt-2 text-sm text-[color:var(--text-body)]">Esse caminho nao existe no PsiDle.</p>
      <Link to="/" className="btn-primary mt-4 inline-flex">
        Voltar ao inicio
      </Link>
    </section>
  )
}
