import { useMemo, useState } from 'react'
import { disorders } from '../data/disorders'
import { GameSession } from '../components/game/GameSession'
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
        <h1 className="font-title text-3xl text-denim-600">Caso diário</h1>
        <p className="text-sm text-slate-600">Um caso fixo por dia para manter consistência de estudo.</p>
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
    <section className="rounded-2xl border border-surface-200 bg-white p-5 shadow-card">
      <h2 className="font-title text-2xl text-denim-600">Você já jogou hoje</h2>
      <p className="mt-2 text-slate-700">
        Resultado salvo no navegador para hoje. Volte amanhã para um novo caso diário ou continue no modo treino.
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <Stat label="Acertou" value={attempt.solved ? 'Sim' : 'Não'} />
        <Stat label="Score" value={String(attempt.score)} />
        <Stat label="Pistas usadas" value={String(attempt.cluesUsed)} />
      </div>
      <p className="mt-4 text-sm text-slate-700">
        Resposta correta: <span className="font-semibold text-denim-600">{correctDisorderName}</span>
      </p>
      <div className="mt-3 rounded-xl bg-surface-50 p-3">
        <p className="text-sm font-semibold text-slate-700">Palpites enviados</p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
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
    <div className="rounded-xl bg-surface-50 p-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="text-lg font-bold text-denim-600">{value}</p>
    </div>
  )
}
