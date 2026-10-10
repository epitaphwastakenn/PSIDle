import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <section className="not-found">
      <div className="tile-row">
        {['4', '0', '4'].map((digit, index) => <span key={index} className={`tile tile-flip ${index === 1 ? 'tile-bad' : 'tile-filled'}`} style={{ animationDelay: `${index * 90}ms` }}>{digit}</span>)}
      </div>
      <h1 className="display">Página não encontrada.</h1>
      <p className="lead">Esse caminho não existe no PsiDle.</p>
      <Link to="/" className="btn btn-primary">Voltar ao início</Link>
    </section>
  )
}
