export function Footer() {
  return (
    <footer className="site-footer mt-auto border-t border-[color:var(--border-soft)]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-[color:var(--text-muted)] md:flex-row md:items-center md:justify-between md:px-5 xl:px-6">
        <div>
          <p className="font-semibold text-[color:var(--text-body)]">&copy; {new Date().getFullYear()} PsiDle</p>
          <p className="mt-1">Estudo pessoal de psicologia em formato de jogo.</p>
        </div>
        <p className="max-w-md text-left md:text-right">Conteudo ficticio, estudo ativo e revisao para treinar raciocinio clinico sem uso diagnostico real.</p>
      </div>
    </footer>
  )
}
