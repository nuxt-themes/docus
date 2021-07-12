import { ref, computed } from 'vue3'
import { useApi } from '../plugins/api'

export const previewOrigin = ref('http://localhost:4000')
export const previewPath = ref('/')
export const previewUrl = computed(() => previewOrigin.value + previewPath.value)

const api = useApi()

export async function fetchPreviewOrigin() {
  const { url } = (await api.get('/preview')) as any

  previewOrigin.value = url
}

export function getRoutePath(filepath: string) {
  return filepath
    .replace(/\/\d+\./g, '/') // remove digit index
    .replace(/\.md$/, '')
    .replace(/\/index$/, '/')
}

export function navigateToFile(filepath: string) {
  previewPath.value = getRoutePath(filepath)
}
