import test from 'node:test'
import assert from 'node:assert/strict'
import { disorders } from '../src/data/disorders.ts'
import { caseFiles } from '../src/data/cases/index.ts'
import type { CaseVariant, DisorderCaseSet } from '../src/data/cases/types.ts'
import { expandCaseText, hasOnlyKnownPlaceholders } from '../src/lib/caseText.ts'
import { normalizeText } from '../src/lib/normalize.ts'

// Lints authored cases (docs/CASOS-GUIA.md). Run one file with: CASE_FILE=humor npm test
const only = process.env.CASE_FILE
const files = Object.entries(caseFiles).filter(([name]) => !only || name === only)
if (only && !files.length) throw new Error(`Arquivo de casos desconhecido: ${only}`)

const LEVELS = ['easy', 'medium', 'hard'] as const
const byId = new Map(disorders.map((disorder) => [disorder.id, disorder]))

/** Words that point to a diagnostic family; they mislead when used outside it (and give it away at medium/hard). */
const FAMILY_TERMS: Record<string, RegExp> = {
  'Ansiedade': /\bansi(edade|os[oa]s?)\b/,
  'Humor': /\b(depressao|depressoes|depressiv\w*|deprimid\w*|bipolar\w*|maniac\w*|mania|manias|hipomania\w*|ciclotim\w*|distimi\w*)\b/,
  'Psicóticos': /\b(psicot\w*|psicoses?|esquizo\w*|delirios?|delirante\w*|alucinac\w*|alucinad\w*)\b/,
  'Obsessivo-compulsivo': /\b(obsess\w*|compuls\w*)\b/,
  'Trauma e Estresse': /\b(trauma|traumas|traumatic\w*)\b/,
  'Dissociativos': /\bdissocia\w*/,
  'Personalidade': /\bpersonalidade\b/,
  'Neurocognitivos': /\b(demencia\w*|neurocognitiv\w*)\b/,
  'Alimentação e Ingestão': /\b(anorex\w*|bulimi\w*)\b/,
  'Sintomas Somáticos': /\b(somatiz\w*|hipocondr\w*|psicossomatic\w*)\b/,
  'Neurodesenvolvimento': /\b(autis\w*|tdah|hiperativ\w*|dislex\w*|discalcul\w*)\b/,
  'Substâncias e Comportamentos Aditivos': /\b(vicio|vicios|viciad\w*|dependencia quimica)\b/,
}
/** Diagnostic labels that name (or nearly name) a disorder; never allowed in vignettes or clues. */
const LABELS = /\b(transtornos?|sindromes?|fobi\w*|panico|agorafob\w*|esquizofren\w*|narcolep\w*|cleptoman\w*|piroman\w*|tricotiloman\w*|borderline|tourette|delirium|pica)\b/
const META = /\b(caso ficticio|equipe do caso|criterios?|diagnostico diferencial|hipoteses?|o exercicio|neste recorte|o recorte)\b/

const words = (text: string) => text.trim().split(/\s+/).length
const padded = (text: string) => ` ${normalizeText(text).replace(/[^a-z0-9]+/g, ' ')} `
const hasPhrase = (text: string, phrase: string) => padded(text).includes(padded(phrase))
const expansions = (text: string, variant: CaseVariant) =>
  (variant.sex ? [variant.sex] : (['m', 'f'] as const)).map((sex) => expandCaseText(text, { name: 'Ana Clara', age: variant.ages[0], sex }))

function problemsIn(text: string, set: DisorderCaseSet, variant: CaseVariant, kind: 'vignette' | 'clue'): string[] {
  const disorder = byId.get(set.disorderId)!
  const normalized = normalizeText(text)
  const problems: string[] = []
  const label = normalized.match(LABELS)
  if (label) problems.push(`rótulo diagnóstico "${label[0]}"`)
  const meta = normalized.match(META)
  if (meta) problems.push(`linguagem de bastidor "${meta[0]}"`)
  for (const other of disorders) if (hasPhrase(text, other.namePt)) problems.push(`nome de diagnóstico "${other.namePt}"`)
  for (const alias of disorder.aliases) if (hasPhrase(text, alias)) problems.push(`apelido do diagnóstico "${alias}"`)
  for (const [family, pattern] of Object.entries(FAMILY_TERMS)) {
    const ownFamily = family === disorder.category
    // Own-family words are tolerated in easy vignettes and in clues; other families' words never are.
    if (ownFamily && (kind === 'clue' || variant.level === 'easy')) continue
    const hit = normalized.match(pattern)
    if (hit) problems.push(`termo da família ${family} "${hit[0]}"${ownFamily ? ' (própria família, só no fácil)' : ''}`)
  }
  if (kind === 'vignette' && variant.level !== 'easy') {
    // Giveaways match at the start of a word, so "cola" does not hit "escola".
    for (const giveaway of set.giveaways) {
      const stem = normalizeText(giveaway).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      if (new RegExp(`(^|[^a-z0-9])${stem}`).test(normalized)) problems.push(`entrega a resposta "${giveaway}"`)
    }
  }
  return problems
}

for (const [file, sets] of files) {
  test(`casos/${file}: estrutura e referências`, () => {
    for (const set of sets) {
      const disorder = byId.get(set.disorderId)
      assert.ok(disorder, `${set.disorderId}: não está no catálogo jogável`)
      const where = `${file}/${set.disorderId}`
      assert.ok(byId.has(set.differential.disorderId), `${where}: diferencial desconhecido ${set.differential.disorderId}`)
      assert.notEqual(set.differential.disorderId, set.disorderId, `${where}: diferencial igual ao diagnóstico`)
      assert.match(set.reference.url, /^https:\/\/\S+$/, `${where}: referência sem URL https`)
      assert.ok(set.reference.label.trim().length > 5, `${where}: referência sem título`)
      const explanation = words(set.explanation)
      assert.ok(explanation >= 35 && explanation <= 130, `${where}: explicação com ${explanation} palavras (35–130)`)
      const whyNot = words(set.differential.whyNot)
      assert.ok(whyNot >= 8 && whyNot <= 45, `${where}: whyNot com ${whyNot} palavras (8–45)`)
      for (const level of LEVELS) assert.ok(set.variants.some((variant) => variant.level === level), `${where}: falta variante ${level}`)
      for (const variant of set.variants) {
        const at = `${where}/${variant.level}`
        const [min, max] = variant.ages
        assert.ok(min >= 3 && min <= max && max <= 95, `${at}: idades inválidas ${min}–${max}`)
        if (disorder!.caseAgeRange) {
          const [low, high] = disorder!.caseAgeRange
          assert.ok(min >= low && max <= high, `${at}: idades ${min}–${max} fora do intervalo do diagnóstico ${low}–${high}`)
        }
        if (set.disorderId === 'pmdd') assert.equal(variant.sex, 'f', `${at}: precisa de sex 'f'`)
        assert.ok(variant.text.includes('{nome}') && variant.text.includes('{idade}'), `${at}: vinheta sem {nome} ou {idade}`)
        for (const text of [variant.text, ...variant.clues]) assert.ok(hasOnlyKnownPlaceholders(text), `${at}: marcador desconhecido em "${text.slice(0, 60)}"`)
        const paragraphs = variant.text.trim().split(/\n\s*\n/)
        assert.equal(paragraphs.length, 2, `${at}: a vinheta precisa de exatamente 2 parágrafos`)
        const count = words(expandCaseText(variant.text, { name: 'Ana', age: min, sex: 'f' }))
        assert.ok(count >= 50 && count <= 135, `${at}: vinheta com ${count} palavras (50–135)`)
        assert.equal(variant.clues.length, 4, `${at}: são 4 pistas`)
        assert.equal(new Set(variant.clues).size, 4, `${at}: pistas repetidas`)
        for (const clue of variant.clues) {
          const clueWords = words(clue)
          assert.ok(clueWords >= 6 && clueWords <= 40, `${at}: pista com ${clueWords} palavras (6–40): "${clue}"`)
        }
        assert.ok(variant.rulesOut.trim().length >= 8, `${at}: rulesOut vazio`)
        assert.ok(variant.text.includes(variant.rulesOut) || variant.clues.some((clue) => clue.includes(variant.rulesOut)),
          `${at}: rulesOut não aparece literalmente na vinheta nem nas pistas`)
      }
    }
  })

  test(`casos/${file}: vocabulário (sem entregar nem confundir a família)`, () => {
    const problems: string[] = []
    for (const set of sets) for (const variant of set.variants) {
      const at = `${set.disorderId}/${variant.level}`
      for (const text of expansions(variant.text, variant)) for (const problem of problemsIn(text, set, variant, 'vignette')) problems.push(`${at} vinheta: ${problem}`)
      variant.clues.forEach((clue, index) => {
        for (const text of expansions(clue, variant)) for (const problem of problemsIn(text, set, variant, 'clue')) problems.push(`${at} pista ${index + 1}: ${problem}`)
      })
    }
    assert.deepEqual([...new Set(problems)], [])
  })
}

test('casos: cada diagnóstico aparece uma vez e nenhuma vinheta se repete', () => {
  const all = Object.values(caseFiles).flat()
  const ids = all.map((set) => set.disorderId)
  assert.deepEqual(ids.filter((id, index) => ids.indexOf(id) !== index), [], 'diagnósticos em mais de um arquivo')
  const texts = all.flatMap((set) => set.variants.map((variant) => normalizeText(variant.text)))
  assert.equal(new Set(texts).size, texts.length, 'vinhetas duplicadas')
})

test('casos: todo diagnóstico jogável tem casos escritos', { skip: Boolean(only) }, () => {
  const covered = new Set(Object.values(caseFiles).flat().map((set) => set.disorderId))
  assert.deepEqual(disorders.filter((disorder) => !covered.has(disorder.id)).map((disorder) => disorder.id), [])
})
