import test from 'node:test'
import assert from 'node:assert/strict'
import { disorders } from '../src/data/disorders.ts'
import { caseProfiles, dailyExcludedIds } from '../src/data/caseProfiles.ts'
import { normalizeText } from '../src/lib/normalize.ts'
import { generateDailyProceduralCase, generatePracticeProceduralCase as generate } from '../src/lib/proceduralCases.ts'
import type { Case } from '../src/types/models.ts'

test('every catalogue entry has an authored profile and a valid differential', () => {
  assert.deepEqual(Object.keys(caseProfiles).sort(), disorders.map((item) => item.id).sort())
  for (const disorder of disorders) {
    const profile = caseProfiles[disorder.id]
    assert.ok(profile.situations.length >= 2, disorder.id)
    assert.equal(new Set(profile.situations).size, profile.situations.length, disorder.id)
    assert.ok(disorders.some((item) => item.id === profile.differential.disorderId), disorder.id)
    assert.notEqual(profile.differential.disorderId, disorder.id)
    assert.equal(new Set(profile.details).size, 3, disorder.id)
  }
})

test('all presentations remain concise, coherent and free of the former padding', () => {
  const lengths = { easy: [] as number[], medium: [] as number[], hard: [] as number[] }
  for (const disorder of disorders) {
    const profile = caseProfiles[disorder.id]
    const seen = new Set<string>()
    for (let seed = 0; seed < 100; seed++) {
      const item = generate({ disorderId: disorder.id, seed })
      const words = item.vignette.split(/\s+/).length
      lengths[item.difficulty].push(words)
      assert.ok(words >= 30 && words <= 85, `${disorder.id}: ${words} words`)
      assert.equal(item.vignette.split('\n\n').length, 2)
      assert.ok(item.vignette.includes(profile.course), disorder.id)
      assert.ok(item.vignette.includes(profile.distinction), disorder.id)
      assert.doesNotMatch(item.vignette, /o exercício é conectar|considere o padrão|o recorte não quantifica|no registro do caso/i)
      assert.ok(!normalizeText(item.vignette).includes(normalizeText(disorder.namePt)), disorder.id)
      assert.ok(!item.vignette.includes(disorder.shortSummary), disorder.id)
      assert.equal(item.clues.length, 4)
      assert.equal(new Set(item.clues.map((clue) => clue.text)).size, 4)
      assert.deepEqual(item.clues.map((clue) => clue.order), [1, 2, 3, 4])
      const age = Number(item.tags.find((tag) => tag.startsWith('idade_'))!.slice(6))
      const range = disorder.caseAgeRange ?? profile.ageRange
      assert.ok(age >= range[0] && age <= range[1], `${disorder.id}: ${age}`)
      seen.add(item.tags.find((tag) => tag.startsWith('presentation_'))!)
    }
    assert.equal(seen.size, profile.situations.length, `${disorder.id}: missing presentation`)
  }
  const mean = (values: number[]) => values.reduce((sum, value) => sum + value, 0) / values.length
  assert.ok(mean(lengths.hard) <= mean(lengths.easy) + 10, 'hard cases should not mean much longer cases')
})

test('seeds vary the scene, not only names or ages', () => {
  for (const id of ['gad', 'ocd', 'specific_phobia', 'bipolar_2', 'conversion_disorder']) {
    const scenes = new Set(Array.from({ length: 100 }, (_, seed) => {
      const item = generate({ disorderId: id, seed })
      return item.vignette.split(' anos, ')[1].split('\n\n')[0]
    }))
    assert.equal(scenes.size, caseProfiles[id].situations.length, id)
  }
})

test('presentation rotation exhausts alternatives before repeating and preserves input snapshots', () => {
  for (const disorder of disorders) {
    const history: Case[] = []
    const count = caseProfiles[disorder.id].situations.length
    for (let round = 0; round < count * 3; round++) {
      const before = structuredClone(history)
      const item = generate({ disorderId: disorder.id, seed: 'same-seed', recentCases: history })
      assert.deepEqual(history, before)
      const tag = item.tags.find((entry) => entry.startsWith('presentation_'))!
      assert.ok(history.slice(-(count - 1)).every((previous) => !previous.tags.includes(tag)), disorder.id)
      if (round < count) assert.ok(history.every((previous) => previous.id !== item.id))
      history.push(item)
    }
  }
})

test('legacy cases and another disorder do not affect presentation rotation', () => {
  const item = generate({ disorderId: 'gad', seed: 'legacy' })
  const legacy = { ...item, tags: ['idade_30'], id: 'old-case' }
  const unrelated = generate({ disorderId: 'ocd', seed: 12 })
  assert.deepEqual(generate({ disorderId: 'gad', seed: 'legacy', recentCases: [legacy, unrelated] }), item)
})

test('the same seed and history reproduce the whole case; daily ignores time of day', () => {
  const history = [generate({ disorderId: 'panic', seed: 32 })]
  assert.deepEqual(
    generate({ disorderId: 'panic', seed: 20, recentCases: history }),
    generate({ disorderId: 'panic', seed: 20, recentCases: history }),
  )
  assert.deepEqual(generateDailyProceduralCase(new Date(2026, 8, 30, 1)), generateDailyProceduralCase(new Date(2026, 8, 30, 23)))
  assert.notEqual(generateDailyProceduralCase(new Date(2026, 8, 30)).id, generateDailyProceduralCase(new Date(2026, 9, 1)).id)
})

test('random selection balances categories instead of privileging the largest catalogue group', () => {
  const counts = new Map([...new Set(disorders.map((item) => item.category))].map((category) => [category, 0]))
  for (let seed = 0; seed < 6000; seed++) {
    const item = generate({ seed })
    counts.set(item.category, counts.get(item.category)! + 1)
  }
  const expected = 6000 / counts.size
  for (const [category, count] of counts) assert.ok(count > expected * .75 && count < expected * 1.25, `${category}: ${count}`)
})

test('filters, exclusions and invalid requests have explicit behavior', () => {
  for (const disorder of disorders) {
    const item = generate({ category: disorder.category, difficulty: disorder.difficulty, seed: 3 })
    assert.equal(item.category, disorder.category)
    assert.equal(item.difficulty, disorder.difficulty)
  }
  assert.throws(() => generate({ disorderId: 'unknown' }), /Transtorno desconhecido/)
  assert.throws(() => generate({ category: 'unknown' }), /Não há casos/)
  for (let seed = 0; seed < 100; seed++) {
    assert.notEqual(generate({ seed, category: 'Ansiedade', excludeDisorderIds: ['gad'] }).correctDisorderId, 'gad')
  }
})

test('close hypotheses retain decisive facts rather than random contradictory timelines', () => {
  const expected: Record<string, RegExp> = {
    bipolar_1: /dez dias[\s\S]+supervisão contínua/,
    bipolar_2: /cinco dias[\s\S]+não causava prejuízo grave/,
    schizophrenia: /dois meses[\s\S]+oito/,
    schizophreniform_disorder: /três meses/,
    brief_psychotic_disorder: /dez dias[\s\S]+não houve sintomas residuais/,
    mild_neurocognitive_disorder: /independência[\s\S]+preservada/,
    major_neurocognitive_disorder: /compromete a independência/,
    conversion_disorder: /sinais positivos[\s\S]+não se baseia apenas em exames normais/,
  }
  for (const [disorderId, pattern] of Object.entries(expected)) {
    for (let seed = 0; seed < 30; seed++) assert.match(generate({ disorderId, seed }).vignette, pattern)
  }
})

test('the daily case skips classification-level and secondary-cause entries', () => {
  for (let day = 0; day < 365; day++) {
    const item = generateDailyProceduralCase(new Date(2026, 0, 1 + day))
    assert.ok(!dailyExcludedIds.has(item.correctDisorderId), item.correctDisorderId)
  }
})

test('the final clue names the close alternative without giving away the reasoning', () => {
  for (const disorder of disorders) {
    const item = generate({ disorderId: disorder.id, seed: 'clue' })
    const last = item.clues.at(-1)!.text
    assert.ok(!last.includes(caseProfiles[disorder.id].differential.whyNot), disorder.id)
    assert.notEqual(normalizeText(last.split(': ')[1].replace(/\.$/, '')), normalizeText(disorder.namePt), disorder.id)
  }
})
