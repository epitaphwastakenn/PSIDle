import { XPBar } from '../common/XPBar'
import { Icon } from '../common/Icon'

interface ProfileStatsProps {
  level: number
  xp: number
  coins: number
  streak: number
  totalCases: number
  dailyCases: number
  practiceCases: number
  accuracy: number
}

export function LevelCard({ level, xp, coins, streak }: Pick<ProfileStatsProps, 'level' | 'xp' | 'coins' | 'streak'>) {
  return (
    <section className="card level-card" aria-label="Seu nível">
      <div className="level-card-top">
        <div>
          <p className="kicker">Nível</p>
          <p className="level-number mt-2">{level}</p>
        </div>
        <span className="icon-tile icon-tile-accent"><Icon name="spark" /></span>
      </div>
      <XPBar xp={xp} level={level} />
      <div className="level-chips">
        <span className="tag">{xp.toLocaleString('pt-BR')} XP</span>
        <span className="tag tag-warn">{coins} moedas</span>
        <span className="tag tag-accent"><Icon name="flame" />{streak} {streak === 1 ? 'dia' : 'dias'}</span>
      </div>
    </section>
  )
}

export function ProfileStats({ totalCases, dailyCases, practiceCases, accuracy }: Pick<ProfileStatsProps, 'totalCases' | 'dailyCases' | 'practiceCases' | 'accuracy'>) {
  return (
    <section className="grid-4" aria-label="Seus números">
      <div className="card stat-card">
        <div className="stat-card-top"><span className="stat-label">Casos</span><span className="icon-tile"><Icon name="book" /></span></div>
        <span className="stat-value">{totalCases}</span>
      </div>
      <div className="card stat-card">
        <div className="stat-card-top"><span className="stat-label">Precisão</span><span className="icon-tile icon-tile-ok"><Icon name="check" /></span></div>
        <span className="stat-value">{Math.round(accuracy * 100)}<small>%</small></span>
      </div>
      <div className="card stat-card">
        <div className="stat-card-top"><span className="stat-label">Diários</span><span className="icon-tile icon-tile-accent"><Icon name="target" /></span></div>
        <span className="stat-value">{dailyCases}</span>
      </div>
      <div className="card stat-card">
        <div className="stat-card-top"><span className="stat-label">Treino</span><span className="icon-tile icon-tile-warn"><Icon name="shuffle" /></span></div>
        <span className="stat-value">{practiceCases}</span>
      </div>
    </section>
  )
}
