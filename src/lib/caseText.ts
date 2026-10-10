/** Fills the placeholders used in authored case texts. See src/data/cases/types.ts. */
export interface CasePerson {
  name: string
  age: number
  sex: 'f' | 'm'
}

const GENDER_PATTERN = /\{([^{}|]*)\|([^{}|]*)\}/g

export function expandCaseText(text: string, person: CasePerson): string {
  return text
    .replaceAll('{nome}', person.name)
    .replaceAll('{idade}', String(person.age))
    .replace(GENDER_PATTERN, (_, masculine: string, feminine: string) => (person.sex === 'f' ? feminine : masculine))
}

/** True when every placeholder in the text is one the expander understands. */
export function hasOnlyKnownPlaceholders(text: string): boolean {
  return text.replaceAll('{nome}', '').replaceAll('{idade}', '').replace(GENDER_PATTERN, '').match(/[{}]/) === null
}
