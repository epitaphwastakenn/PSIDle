import test from 'node:test'
import assert from 'node:assert/strict'
import { getDailyStats } from '../src/lib/daily.ts'
import { buildShareText, getGuessTone } from '../src/lib/feedback.ts'
import { disorders } from '../src/data/disorders.ts'
import type { Attempt } from '../src/types/models.ts'

const attempt = (date: string, guesses: number, solved: boolean, caseDate?: string): Attempt => ({
  id: date + guesses, caseId: date, mode: 'daily', date, caseDate, guesses: Array.from({ length: guesses }, () => 'x'), solved, score: 0, cluesUsed: 0,
})

test('daily stats count the distribution and ignore archive plays for streaks', () => {
  const stats = getDailyStats([
    attempt('2026-10-01', 1, true), attempt('2026-10-02', 3, true), attempt('2026-10-03', 5, false),
    attempt('2026-10-05', 2, true), attempt('2026-10-06', 2, true, '2026-10-04'),
  ])
  assert.deepEqual(stats.distribution, [1, 2, 1, 0, 0])
  assert.equal(stats.played, 5)
  assert.equal(stats.wins, 4)
  assert.equal(stats.winRate, 80)
  assert.equal(stats.maxStreak, 3)
})

test('guess tones separate right answer, same family and other family', () => {
  const gad = disorders.find((item) => item.id === 'gad')!
  assert.equal(getGuessTone(gad.namePt, gad), 'ok')
  assert.equal(getGuessTone('Transtorno do Pânico', gad), 'near')
  assert.equal(getGuessTone('Transtorno Bipolar Tipo I', gad), 'far')
  const text = buildShareText({ date: new Date(2026, 9, 10), tones: ['far', 'near', 'ok'], solved: true, maxAttempts: 5, url: 'https://x' })
  assert.equal(text, 'PsiDle 10/10 🧠 3/5\n🟥🟨🟩\nhttps://x')
})
