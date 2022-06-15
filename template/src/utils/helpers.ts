export function replaceAll(value: string, search: string, replacement: string) {
  const target = value
  return target.replace(new RegExp(search, 'g'), replacement)
}
