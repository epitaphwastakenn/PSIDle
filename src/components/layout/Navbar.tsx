import { NavLink } from 'react-router-dom'
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
  return (
    <header className="nav-shell sticky top-0 z-30 border-b border-[color:var(--border-soft)] bg-[color:rgba(10,14,34,0.8)] backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <div>
          <p className="page-title text-xl md:text-2xl">PsiDle</p>
          <p className="page-subtitle text-xs">Estudo de psicologia em formato de jogo</p>
        </div>
        <button
          type="button"
          className="theme-toggle btn-ghost px-3 py-2 text-xs md:text-sm"
          onClick={() => {
            audioManager.playClick()
            onToggleTheme()
          }}
        >
          {theme === 'dark' ? 'Modo claro' : 'Modo escuro'}
        </button>
      </div>
      <div className="mx-auto w-full max-w-6xl px-4 pb-3">
        <nav className="no-scrollbar -mx-1 flex gap-1 overflow-x-auto px-1">
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
    </header>
  )
}
