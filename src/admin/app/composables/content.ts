import { ref } from 'vue3'
import { useApi } from '../plugins/api'
import { File } from '../../type'
import { getRoutePath, navigateToFile } from './preview'

const api = useApi()

export const files = ref<File[]>([])
export const currentFile = ref(null)

export const openFile = async (file: File) => {
  if (currentFile.value?.path === file.path) return

  navigateToFile(file.path)
  currentFile.value = await api.get(`/content${file.path}`)
}

export async function fetchFiles() {
  files.value = await api.get('/content')
}

export function findFileFromRoute(routePath: string, fileList: File[] = files.value) {
  for (const file of fileList) {
    if (getRoutePath(file.path) === routePath) {
      return file
    }
    if (file.children) {
      const result = findFileFromRoute(routePath, file.children)
      if (result) return result
    }
  }
}

export function onPreviewNavigated(routePath: string) {
  const file = findFileFromRoute(routePath)
  if (file) openFile(file)
}
