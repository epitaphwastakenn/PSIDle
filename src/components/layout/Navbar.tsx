import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Início' },
  { to: '/daily', label: 'Caso Diário' },
  { to: '/practice', label: 'Treino' },
  { to: '/review', label: 'Revisão' },
  { to: '/tasks', label: 'Tarefas' },
  { to: '/profile', label: 'Perfil' },
  { to: '/about', label: 'Sobre' },
]

function getLinkClass(isActive: boolean): string {
  return [
    'rounded-full px-3 py-1.5 text-sm font-semibold transition-colors',
    isActive ? 'bg-denim-600 text-white' : 'text-denim-600 hover:bg-denim-100',
  ].join(' ')
}

export function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-surface-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <div>
          <p className="font-title text-2xl text-denim-600">PsiDle</p>
          <p className="text-xs text-slate-500">Estudo de psicologia em formato de jogo</p>
        </div>
        <nav className="flex flex-wrap justify-end gap-1">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={({ isActive }) => getLinkClass(isActive)}>
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
