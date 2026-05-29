import { fullDisclaimerText } from '../data/disclaimer'

export function AboutPage() {
  return (
    <div className="space-y-4">
      <h1 className="page-title text-3xl">Sobre o projeto</h1>

      <section className="panel p-5">
        <h2 className="page-title text-xl">Proposito educacional</h2>
        <p className="mt-2 text-sm leading-relaxed text-[color:var(--text-body)]">
          O PsiDle foi criado para estudo pessoal de psicologia e psicopatologia com casos totalmente ficticios. A
          proposta e praticar formulacao de hipoteses e comparacao de diferenciais em formato de jogo.
        </p>
      </section>

      <section className="panel p-5">
        <h2 className="page-title text-xl">Aviso educacional</h2>
        <p className="mt-2 text-sm leading-relaxed text-[color:var(--text-body)]">{fullDisclaimerText}</p>
      </section>

      <section className="panel p-5">
        <h2 className="page-title text-xl">Limites de uso</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[color:var(--text-body)]">
          <li>Casos, vinhetas e explicacoes sao conteudo de estudo.</li>
          <li>Nao substitui supervisao, formacao clinica ou avaliacao profissional.</li>
          <li>Nao oferece recomendacao de medicacao, tratamento ou conduta clinica real.</li>
        </ul>
      </section>
    </div>
  )
}
