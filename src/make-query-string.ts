export function makeQueryString(object: Record<string, string | undefined>): string {
  return Object.entries(object)
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value!)}`)
    .join('&');
}