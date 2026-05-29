import { fullDisclaimerText } from '../data/disclaimer'

export function AboutPage() {
  return (
    <div className="space-y-4">
      <h1 className="font-title text-3xl text-denim-600">Sobre o projeto</h1>

      <section className="rounded-2xl border border-surface-200 bg-white p-5 shadow-card">
        <h2 className="font-title text-2xl text-denim-600">Propósito educacional</h2>
        <p className="mt-2 leading-relaxed text-slate-700">
          O PsiDle é um jogo estático de estudo para reforçar raciocínio em psicologia e psicopatologia por meio de
          casos fictícios. Ele não substitui supervisão, formação clínica ou prática baseada em evidências.
        </p>
      </section>

      <section className="rounded-2xl border border-surface-200 bg-white p-5 shadow-card">
        <h2 className="font-title text-2xl text-denim-600">Aviso de segurança</h2>
        <p className="mt-2 leading-relaxed text-slate-700">{fullDisclaimerText}</p>
      </section>

      <section className="rounded-2xl border border-surface-200 bg-white p-5 shadow-card">
        <h2 className="font-title text-2xl text-denim-600">Limitações de conteúdo</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-700">
          <li>Todos os casos são fictícios e escritos manualmente para estudo.</li>
          <li>O app não publica PDF nem texto integral de manual diagnóstico protegido por copyright.</li>
          <li>As explicações são resumos autorais e não devem ser usadas como critério clínico real.</li>
          <li>O projeto não oferece recomendação de tratamento ou medicação.</li>
        </ul>
      </section>
    </div>
  )
}
