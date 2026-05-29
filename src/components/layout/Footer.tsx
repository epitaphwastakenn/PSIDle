import { shortDisclaimerText } from '../../data/disclaimer'

export function Footer() {
  return (
    <footer className="mt-10 border-t border-surface-200 bg-white/80">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-4 py-4 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} PsiDle</p>
        <p className="font-semibold">{shortDisclaimerText}</p>
      </div>
    </footer>
  )
}
