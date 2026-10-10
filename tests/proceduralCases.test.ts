import test from 'node:test'
import assert from 'node:assert/strict'
import { caseSets } from '../src/data/cases/index.ts'
import { femaleNames, maleNames } from '../src/data/casePeople.ts'
import { disorders } from '../src/data/disorders.ts'
import { getDailyLevel, levelsFor } from '../src/lib/caseLevels.ts'
import { generateDailyProceduralCase, generatePracticeProceduralCase as generate } from '../src/lib/proceduralCases.ts'
import type { Case } from '../src/types/models.ts'

const tag = (item: Case, prefix: string) => item.tags.find((entry) => entry.startsWith(prefix))!.slice(prefix.length)

test('every diagnosis is served at its levels as a complete, filled-in case', () => {
  for (const disorder of disorders) {
    const levels = levelsFor(disorder)
    assert.ok(levels.includes('medium') && levels.includes('hard'), `${disorder.id}: faltam níveis`)
    assert.equal(levels.includes('easy'), disorder.difficulty !== 'hard', `${disorder.id}: fácil só para diagnósticos menos raros`)
    for (const level of levels) {
      for (let seed = 0; seed < 6; seed++) {
        const item = generate({ disorderId: disorder.id, level, seed })
        const where = `${disorder.id}/${level}/${seed}`
        assert.equal(item.correctDisorderId, disorder.id)
        assert.equal(item.difficulty, level, where)
        assert.equal(item.category, disorder.category)
        assert.doesNotMatch([item.vignette, ...item.clues.map((clue) => clue.text)].join(' '), /[{}]/, `${where}: marcador não preenchido`)
        assert.deepEqual(item.clues.map((clue) => clue.type), ['symptoms', 'duration', 'impairment', 'exclusion'])
        assert.deepEqual(item.differentials, [caseSets[disorder.id].differential])
        assert.match(item.reference!.url, /^https:\/\//)
        const variant = caseSets[disorder.id].variants[Number(tag(item, 'variant_'))]
        assert.equal(variant.level, level)
        const age = Number(tag(item, 'idade_'))
        assert.ok(age >= variant.ages[0] && age <= variant.ages[1], `${where}: idade ${age}`)
        const sex = tag(item, 'sexo_')
        if (variant.sex) assert.equal(sex, variant.sex, where)
        const names = sex === 'f' ? femaleNames : maleNames
        assert.ok(names.some((name) => item.vignette.includes(name)), `${where}: nome não concorda com o sexo`)
      }
    }
  }
})

test('the daily case is reproducible, ignores time of day and follows the weekly difficulty', () => {
  assert.deepEqual(generateDailyProceduralCase(new Date(2026, 8, 30, 1)), generateDailyProceduralCase(new Date(2026, 8, 30, 23)))
  assert.notEqual(generateDailyProceduralCase(new Date(2026, 8, 30)).id, generateDailyProceduralCase(new Date(2026, 9, 1)).id)
  // 12 Oct 2026 is a Monday.
  assert.deepEqual([12, 13, 14, 15, 16, 17, 18].map((day) => getDailyLevel(new Date(2026, 9, day))),
    ['easy', 'easy', 'medium', 'medium', 'hard', 'hard', 'medium'])
  for (let day = 0; day < 120; day++) {
    const date = new Date(2026, 0, 1 + day)
    const item = generateDailyProceduralCase(date)
    assert.equal(item.difficulty, getDailyLevel(date))
    const disorder = disorders.find((entry) => entry.id === item.correctDisorderId)!
    if (item.difficulty === 'easy') assert.notEqual(disorder.difficulty, 'hard', `${item.id}: diagnóstico raro em dia fácil`)
  }
})

test('random selection balances families instead of privileging the largest ones', () => {
  const counts = new Map([...new Set(disorders.map((item) => item.category))].map((category) => [category, 0]))
  for (let seed = 0; seed < 6000; seed++) {
    const item = generate({ seed, level: 'hard' })
    counts.set(item.category, counts.get(item.category)! + 1)
  }
  const expected = 6000 / counts.size
  for (const [category, count] of counts) assert.ok(count > expected * 0.75 && count < expected * 1.25, `${category}: ${count}`)
})

test('filters, exclusions and invalid requests have explicit behaviour', () => {
  for (const category of new Set(disorders.map((item) => item.category))) {
    for (const level of ['medium', 'hard'] as const) {
      const item = generate({ category, level, seed: category })
      assert.equal(item.category, category)
      assert.equal(item.difficulty, level)
    }
  }
  assert.throws(() => generate({ disorderId: 'unknown' }), /Transtorno desconhecido/)
  assert.throws(() => generate({ category: 'unknown' }), /Não há casos/)
  for (let seed = 0; seed < 60; seed++) {
    assert.notEqual(generate({ seed, category: 'Ansiedade', excludeDisorderIds: ['gad'] }).correctDisorderId, 'gad')
  }
})

test('the same seed reproduces the case and generation leaves the history untouched', () => {
  const history = [generate({ disorderId: 'panic', level: 'medium', seed: 32 })]
  const before = structuredClone(history)
  assert.deepEqual(generate({ disorderId: 'panic', level: 'hard', seed: 20, recentCases: history }), generate({ disorderId: 'panic', level: 'hard', seed: 20, recentCases: history }))
  assert.deepEqual(history, before)
})

test('variant rotation avoids the variant just served when the level has alternatives', () => {
  for (const disorder of disorders) {
    for (const level of levelsFor(disorder)) {
      const count = caseSets[disorder.id].variants.filter((variant) => variant.level === level).length
      if (count < 2) continue
      const first = generate({ disorderId: disorder.id, level, seed: 'rotation' })
      const second = generate({ disorderId: disorder.id, level, seed: 'rotation', recentCases: [first] })
      assert.notEqual(tag(second, 'variant_'), tag(first, 'variant_'), `${disorder.id}/${level}`)
    }
  }
})
