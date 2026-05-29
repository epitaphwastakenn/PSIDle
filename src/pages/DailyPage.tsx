import { useMemo, useState } from 'react'
import { GameSession } from '../components/game/GameSession'
import { disorders } from '../data/disorders'
import { getTodayKey } from '../lib/daily'
import { generateDailyProceduralCase } from '../lib/proceduralCases'
import { getUserProgress } from '../lib/storage'
import type { Attempt } from '../types/models'

export function DailyPage() {
  const [, setProgressVersion] = useState(0)
  const todayKey = getTodayKey()
  const dailyCase = generateDailyProceduralCase(new Date())
  const progress = getUserProgress()

  const latestDailyAttempt = useMemo(() => {
    const allTodayAttempts = progress.attempts.filter(
      (attempt) => attempt.mode === 'daily' && attempt.caseId === dailyCase.id && attempt.date === todayKey,
    )
    return allTodayAttempts.at(-1)
  }, [dailyCase.id, progress.attempts, todayKey])

  const alreadyPlayedToday = progress.lastPlayedDailyDate === todayKey && Boolean(latestDailyAttempt)
  const correctDisorder = disorders.find((disorder) => disorder.id === dailyCase.correctDisorderId)

  return (
    <div className="space-y-4">
      <div>
        <h1 className="page-title text-3xl">Caso diario</h1>
        <p className="page-subtitle text-sm">Um caso fixo por dia para manter consistencia de estudo.</p>
      </div>

      {alreadyPlayedToday && latestDailyAttempt ? (
        <DailyResultSummary attempt={latestDailyAttempt} correctDisorderName={correctDisorder?.namePt ?? 'N/A'} />
      ) : (
        <GameSession caseData={dailyCase} mode="daily" onComplete={() => setProgressVersion((value) => value + 1)} />
      )}
    </div>
  )
}

function DailyResultSummary({ attempt, correctDisorderName }: { attempt: Attempt; correctDisorderName: string }) {
  return (
    <section className="panel p-5">
      <h2 className="page-title text-xl">Voce ja jogou hoje</h2>
      <p className="mt-2 text-sm text-[color:var(--text-body)]">
        Resultado salvo no navegador. Volte amanha para um novo caso diario ou continue no modo treino.
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <Stat label="Acertou" value={attempt.solved ? 'Sim' : 'Nao'} />
        <Stat label="Score" value={String(attempt.score)} />
        <Stat label="Pistas usadas" value={String(attempt.cluesUsed)} />
      </div>
      <p className="mt-4 text-sm text-[color:var(--text-body)]">
        Resposta correta: <span className="font-semibold text-[color:var(--text-strong)]">{correctDisorderName}</span>
      </p>
      <div className="panel-soft mt-3 p-3">
        <p className="text-sm font-semibold text-[color:var(--text-strong)]">Palpites enviados</p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[color:var(--text-body)]">
          {attempt.guesses.map((guess, index) => (
            <li key={`${guess}-${index}`}>{guess}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="stat-tile p-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-[color:var(--text-muted)]">{label}</p>
      <p className="text-lg font-bold text-[color:var(--text-strong)]">{value}</p>
    </div>
  )
}
