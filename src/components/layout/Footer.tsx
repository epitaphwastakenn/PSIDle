import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <span className="footer-brand"><span className="brand-mark" aria-hidden="true">ψ</span>PsiDle · Conteúdo educacional, não diagnóstico.</span>
        <nav className="footer-links" aria-label="Rodapé">
          <Link to="/about">Sobre</Link>
          <Link to="/settings">Configurações</Link>
          <Link to="/profile">Perfil</Link>
        </nav>
      </div>
    </footer>
  )
}
