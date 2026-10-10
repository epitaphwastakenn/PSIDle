import { anxietyCases } from './anxiety'
import { dissociativeSomaticCases } from './dissociative-somatic'
import { eatingCases } from './eating'
import { humorCases } from './humor'
import { impulseConductCases } from './impulse-conduct'
import { neurocognitiveCases } from './neurocognitive'
import { neurodevCommunicationCases } from './neurodevelopment-communication'
import { neurodevMotorLearningCases } from './neurodevelopment-motor-learning'
import { obsessiveCases } from './obsessive'
import { personalityCases } from './personality'
import { psychoticCases } from './psychotic'
import { sleepCases } from './sleep'
import { substanceCases } from './substance'
import { traumaCases } from './trauma'
import type { DisorderCaseSet } from './types'

/** Every authored case file, by file name (used by the content checks to lint one file at a time). */
export const caseFiles: Record<string, DisorderCaseSet[]> = {
  anxiety: anxietyCases,
  'dissociative-somatic': dissociativeSomaticCases,
  eating: eatingCases,
  humor: humorCases,
  'impulse-conduct': impulseConductCases,
  neurocognitive: neurocognitiveCases,
  'neurodevelopment-communication': neurodevCommunicationCases,
  'neurodevelopment-motor-learning': neurodevMotorLearningCases,
  obsessive: obsessiveCases,
  personality: personalityCases,
  psychotic: psychoticCases,
  sleep: sleepCases,
  substance: substanceCases,
  trauma: traumaCases,
}

export const caseSets: Record<string, DisorderCaseSet> = Object.fromEntries(
  Object.values(caseFiles).flat().map((set) => [set.disorderId, set]),
)
