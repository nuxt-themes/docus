import { resolve } from 'path'

export const r = (...paths: string[]) => resolve(process.options.srcDir, ...paths)

export const normalizeFiles = (files, rootPath) => {
  for (const file of files) {
    file.path = file.path.replace(rootPath, '')
    if (file.children) {
      file.children = normalizeFiles(file.children, rootPath)
    }
  }

  files.sort((f1: any, f2: any) => f2.type.length - f1.type.length)

  return files
}
