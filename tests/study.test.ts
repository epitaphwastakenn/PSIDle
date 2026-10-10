import test from 'node:test'
import assert from 'node:assert/strict'
import { disorders } from '../src/data/disorders.ts'
import { levelsFor } from '../src/lib/caseLevels.ts'
import { getPracticePool, selectPracticeDisorder } from '../src/lib/study.ts'
import { generateDailyProceduralCase, generatePracticeProceduralCase } from '../src/lib/proceduralCases.ts'
import { addReviewItem, getDueReviewItems, gradeReviewItem } from '../src/lib/review.ts'
import { calculateScore } from '../src/lib/scoring.ts'
import { getPracticeRewardFactor } from '../src/lib/rewards.ts'
import { findDisorderByGuess } from '../src/lib/guessing.ts'
import type { Attempt } from '../src/types/models.ts'

test('selection respects category and difficulty with no silent broadening', () => {
  for (const disorder of disorders) {
    for (const level of levelsFor(disorder)) {
      const pool = getPracticePool(disorder.category, level)
      const chosen = selectPracticeDisorder({ pool, attempts: [], servedIds: [], adaptive: true, random: () => .5 })!
      assert.equal(chosen.category, disorder.category)
      assert.ok(levelsFor(chosen).includes(level), `${chosen.id} sem casos ${level}`)
    }
  }
  assert.equal(selectPracticeDisorder({ pool: [], attempts: [], servedIds: [], adaptive: true }), undefined)
})

test('recent hypotheses stay excluded until the pool requires rotation', () => {
  const pool = disorders.slice(0, 4)
  const result = selectPracticeDisorder({ pool, attempts: [], servedIds: pool.slice(0, 3).map((item) => item.id), adaptive: true, random: () => 0 })!
  assert.equal(result.id, pool[3].id)
  const rotated = selectPracticeDisorder({ pool, attempts: [], servedIds: pool.map((item) => item.id), adaptive: true, random: () => .5 })!
  assert.equal(rotated.id, pool[0].id)
})

test('a single-disorder pool remains playable', () => {
  assert.equal(selectPracticeDisorder({ pool: [disorders[0]], attempts: [], servedIds: [disorders[0].id], adaptive: true })!.id, disorders[0].id)
})

test('adaptive weighting increases practice of an earlier missed hypothesis', () => {
  const pool = disorders.slice(0, 12)
  const attempts: Attempt[] = pool.slice(0, 3).map((item, i) => ({
    id: item.id, caseId: item.id, mode: 'practice', date: '2026-09-29', guesses: ['x'], solved: i > 0, score: 0, cluesUsed: 4, correctDisorderId: item.id,
  }))
  const input = { pool, attempts, servedIds: pool.slice(3).map((item) => item.id), random: () => .4 }
  const result = selectPracticeDisorder({ ...input, adaptive: true })!
  assert.equal(result.id, pool[0].id)
  assert.equal(selectPracticeDisorder({ ...input, adaptive: false })!.id, pool[1].id)
})

test('daily is reproducible and procedural cases match the selected disorder', () => {
  const date = new Date(2026, 8, 29)
  assert.deepEqual(generateDailyProceduralCase(date), generateDailyProceduralCase(date))
  for (const disorder of disorders) {
    const generated = generatePracticeProceduralCase({ disorderId: disorder.id, seed: 'coverage' })
    assert.equal(generated.correctDisorderId, disorder.id)
    assert.equal(generated.category, disorder.category)
    assert.ok(levelsFor(disorder).includes(generated.difficulty), disorder.id)
    assert.ok(generated.vignette.length > 100)
    assert.equal(generated.clues.length, 4)
    assert.ok(generated.clues.every((clue) => clue.text.length > 20), disorder.id)
    assert.ok(generated.title.length < 90, generated.title)
    assert.ok(generated.differentials.every((entry) => entry.disorderId !== disorder.id))
  }
})

test('childhood cases use their explicit age range', () => {
  for (const disorder of disorders.filter((item) => item.caseAgeRange)) {
    for (let seed = 0; seed < 20; seed++) {
      const generated = generatePracticeProceduralCase({ disorderId: disorder.id, seed })
      const age = Number(generated.tags.find((tag) => tag.startsWith('idade_'))!.slice(6))
      assert.ok(age >= disorder.caseAgeRange![0] && age <= disorder.caseAgeRange![1], disorder.id)
    }
  }
})

test('review timing uses dueAt even for mastered items and preserves case history', () => {
  const now = new Date('2026-09-29T12:00:00Z')
  const caseData = generateDailyProceduralCase(now)
  const [item] = addReviewItem([], { caseId: caseData.id, correctDisorderId: caseData.correctDisorderId, caseSnapshot: caseData, originalGuesses: ['TAG'], originalCluesUsed: 1, now })
  assert.equal(getDueReviewItems([item], now).length, 1)
  const reviewed = gradeReviewItem(item, true, 'TAG', now)
  assert.equal(getDueReviewItems([reviewed], now).length, 0)
  assert.deepEqual(reviewed.originalGuesses, ['TAG'])
  assert.equal(reviewed.reviewHistory!.length, 1)
  assert.equal(getDueReviewItems([{ ...reviewed, status: 'mastered' }], new Date(reviewed.dueAt)).length, 1)
  const missed = gradeReviewItem(reviewed, false, 'Outra hipótese', now)
  assert.equal(getDueReviewItems([missed], now).length, 0)
})

test('alias and accent normalization preserve scores and valid guesses', () => {
  assert.ok(findDisorderByGuess('  tDaH  ', disorders))
  for (const item of disorders) assert.equal(findDisorderByGuess(item.namePt, disorders)!.id, item.id)
  assert.equal(calculateScore({ solved: true, cluesUsed: 0, wrongGuesses: 0 }).score, 100)
  assert.equal(calculateScore({ solved: false, cluesUsed: 4, wrongGuesses: 5 }).score, 0)
})

test('repeat rewards diminish only for the same practice hypothesis on the same day', () => {
  const attempt: Attempt = { id: 'a', caseId: 'a', mode: 'practice', date: '2026-09-29', guesses: ['x'], solved: true, score: 100, cluesUsed: 0, correctDisorderId: disorders[0].id }
  for (const [count, factor] of [1, .5, .25, 0, 0].entries()) {
    assert.equal(getPracticeRewardFactor(Array.from({ length: count }, () => attempt), disorders[0].id, attempt.date), factor)
  }
  assert.equal(getPracticeRewardFactor([attempt], disorders[0].id, '2026-09-30'), 1)
  assert.equal(getPracticeRewardFactor([{ ...attempt, mode: 'daily' }], disorders[0].id, attempt.date), 1)
})
