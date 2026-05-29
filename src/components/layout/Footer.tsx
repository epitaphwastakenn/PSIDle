export function Footer() {
  return (
    <footer className="mt-auto border-t border-[color:var(--border-soft)] bg-[color:rgba(10,14,34,0.45)]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-4 py-4 text-xs text-[color:var(--text-muted)] md:flex-row md:items-center md:justify-between">
        <p>&copy; {new Date().getFullYear()} PsiDle</p>
        <p>Estudo pessoal de psicologia</p>
      </div>
    </footer>
  )
}
