import { NavLink, useLocation } from 'react-router-dom'
import { audioManager } from '../../lib/audio'
import type { ThemeMode } from '../../lib/theme'

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/daily', label: 'Caso diario' },
  { to: '/practice', label: 'Treino' },
  { to: '/review', label: 'Revisao' },
  { to: '/tasks', label: 'Tarefas' },
  { to: '/profile', label: 'Perfil' },
  { to: '/settings', label: 'Config.' },
  { to: '/about', label: 'Sobre' },
]

function getLinkClass(isActive: boolean): string {
  return isActive ? 'top-nav-link top-nav-link-active' : 'top-nav-link'
}

interface NavbarProps {
  theme: ThemeMode
  onToggleTheme: () => void
}

export function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const location = useLocation()
  const activeLink = links.find((link) => link.to === location.pathname) ?? links[0]

  return (
    <header className="site-header nav-shell sticky top-0 z-30 border-b border-[color:var(--border-soft)]">
      <div className="mx-auto w-full max-w-7xl px-4 py-3 md:px-5 xl:px-6">
        <div className="nav-panel">
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <span className="brand-mark shrink-0">PS</span>
              <div className="min-w-0">
                <p className="page-title truncate text-xl md:text-2xl">PsiDle</p>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
                  <span className="nav-kicker">Estudo clinico gamificado</span>
                  <span className="nav-current">Agora: {activeLink.label}</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="theme-toggle btn-ghost nav-theme-toggle px-3 py-2 text-xs md:text-sm"
              onClick={() => {
                audioManager.playClick()
                onToggleTheme()
              }}
            >
              {theme === 'dark' ? 'Modo claro' : 'Modo escuro'}
            </button>
          </div>

          <div className="mt-4">
            <nav className="nav-scroll no-scrollbar -mx-1 flex gap-1 overflow-x-auto px-1">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => audioManager.playClick()}
                  className={({ isActive }) => getLinkClass(isActive)}
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
