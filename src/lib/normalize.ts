export function removeAccents(value: string): string {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

export function normalizeText(value: string): string {
  return removeAccents(value).trim().toLowerCase().replace(/\s+/g, ' ')
}
