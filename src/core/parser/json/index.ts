import destr from 'destr'

export function useJSONParser() {
  return {
    parse: (content: string) => destr(content)
  }
}
