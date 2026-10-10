import { Link, NavLink } from 'react-router-dom'
import { audioManager } from '../../lib/audio'
import { getDueReviewItems } from '../../lib/review'
import { getReviewItems, getUserProgress } from '../../lib/storage'
import type { ThemeMode } from '../../lib/theme'
import { Icon, type IconName } from '../common/Icon'

const links: Array<{ to: string; label: string; short: string; icon: IconName }> = [
  { to: '/', label: 'Início', short: 'Início', icon: 'home' },
  { to: '/daily', label: 'Caso diário', short: 'Diário', icon: 'target' },
  { to: '/practice', label: 'Treino', short: 'Treino', icon: 'shuffle' },
  { to: '/review', label: 'Revisão', short: 'Revisão', icon: 'book' },
  { to: '/tasks', label: 'Tarefas', short: 'Tarefas', icon: 'list' },
]

interface NavbarProps { theme: ThemeMode; onToggleTheme: () => void; onHelp: () => void }

export function Navbar({ theme, onToggleTheme, onHelp }: NavbarProps) {
  const progress = getUserProgress()
  const due = getDueReviewItems(getReviewItems()).length
  const initial = (progress.displayName?.trim().charAt(0) || 'ψ').toUpperCase()
  const badge = (to: string) => to === '/review' && due > 0 ? <span className="nav-badge">{due > 9 ? '9+' : due}</span> : null

  return (
    <>
      <header className="site-header">
        <a className="skip-link" href="#main-content" onClick={(event) => {
          event.preventDefault()
          document.getElementById('main-content')!.focus()
        }}>Pular para o conteúdo</a>
        <div className="header-inner">
          <Link to="/" className="brand" aria-label="PsiDle, início">
            <span className="brand-mark" aria-hidden="true">ψ</span>psidle
          </Link>
          <nav className="primary-nav" aria-label="Navegação principal">
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.to === '/'} onClick={() => audioManager.playClick()}
                className={({ isActive }) => `nav-link${isActive ? ' nav-link-active' : ''}`}>
                {link.label}{badge(link.to)}
              </NavLink>
            ))}
          </nav>
          <div className="header-actions">
            <button type="button" className="icon-btn" aria-label="Como jogar" title="Como jogar" onClick={() => { audioManager.playClick(); onHelp() }}>
              <Icon name="help" />
            </button>
            <button type="button" className="icon-btn" aria-label={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
              title={theme === 'dark' ? 'Modo claro' : 'Modo escuro'} onClick={() => { audioManager.playClick(); onToggleTheme() }}>
              <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
            </button>
            <NavLink to="/settings" aria-label="Configurações" title="Configurações" onClick={() => audioManager.playClick()}
              className={({ isActive }) => `icon-btn${isActive ? ' icon-btn-active' : ''}`}>
              <Icon name="sliders" />
            </NavLink>
            <NavLink to="/profile" aria-label="Perfil" title="Perfil" onClick={() => audioManager.playClick()}
              className={({ isActive }) => `avatar-btn${isActive ? ' avatar-btn-active' : ''}`}>
              {initial}
            </NavLink>
          </div>
        </div>
      </header>
      <nav className="tabbar" aria-label="Navegação principal">
        {links.map((link) => (
          <NavLink key={link.to} to={link.to} end={link.to === '/'} onClick={() => audioManager.playClick()}
            className={({ isActive }) => `tab-link${isActive ? ' tab-link-active' : ''}`}>
            <Icon name={link.icon} />{link.short}{badge(link.to)}
          </NavLink>
        ))}
      </nav>
    </>
  )
}
