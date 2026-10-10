import type { Difficulty } from '../../types/models'

/**
 * Authoring format for clinical cases. See docs/CASOS-GUIA.md for the writing rules.
 *
 * Text placeholders, expanded when a case is generated:
 * - `{nome}`  the patient's first name
 * - `{idade}` the patient's age (number only: "{idade} anos")
 * - `{masc|fem}` gender agreement, e.g. "{cansado|cansada}", "{o|a} paciente"
 */
export interface CaseVariant {
  /** Abstraction level the vignette is written for; it is also the difficulty shown to the player. */
  level: Difficulty
  /** Ages that fit this particular story (school, work, retirement...). */
  ages: [number, number]
  /** Fixes the patient's sex when the story or the diagnosis requires it. */
  sex?: 'f' | 'm'
  /** Two short paragraphs separated by a blank line. */
  text: string
  /**
   * Revealed one by one after wrong guesses (or on request), always in this order:
   * [symptoms, course, impairment, exclusion]. Never names a disorder.
   */
  clues: [string, string, string, string]
  /** Exact excerpt of `text` or `clues` that rules out `differential.disorderId`. */
  rulesOut: string
}

export interface DisorderCaseSet {
  disorderId: string
  /** Online reference the presentation was checked against (verified URL). */
  reference: { label: string; url: string }
  /** The closest alternative; every variant must contain the fact that excludes it. */
  differential: { disorderId: string; whyNot: string }
  /** Shown after the case ends: the criteria present and why the differential does not fit. */
  explanation: string
  /** Words that give the answer away; they may appear in easy vignettes only (e.g. a substance name). */
  giveaways: string[]
  /** One variant per level at least: easy, medium and hard. */
  variants: CaseVariant[]
}
