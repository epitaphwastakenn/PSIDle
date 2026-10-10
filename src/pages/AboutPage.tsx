import { Icon } from '../components/common/Icon'
import { fullDisclaimerText } from '../data/disclaimer'

export function AboutPage() {
  return (
    <div className="page-stack">
      <header className="page-header">
        <h1 className="display">Sobre</h1>
      </header>

      <div className="grid-3">
        <section className="card prose-card">
          <span className="icon-tile icon-tile-accent"><Icon name="target" /></span>
          <h2 className="h2">Como jogar</h2>
          <p>Um caso fictício por dia. Cinco tentativas; cada erro revela uma pista.</p>
        </section>
        <section className="card prose-card">
          <span className="icon-tile icon-tile-ok"><Icon name="book" /></span>
          <h2 className="h2">Para quê</h2>
          <p>Praticar raciocínio clínico e diagnóstico diferencial. Os casos seguem os critérios do DSM-5-TR e cada um traz a fonte em que foi conferido.</p>
        </section>
        <section className="card prose-card">
          <span className="icon-tile icon-tile-warn"><Icon name="info" /></span>
          <h2 className="h2">Limites</h2>
          <ul>
            <li><Icon name="check" />Casos simplificados.</li>
            <li><Icon name="check" />Não substitui formação ou supervisão.</li>
            <li><Icon name="check" />Sem recomendações de tratamento.</li>
          </ul>
        </section>
      </div>

      <aside className="callout callout-warn">
        <p>{fullDisclaimerText}</p>
      </aside>
    </div>
  )
}
