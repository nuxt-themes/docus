export interface FileData {
  raw: string
}

export interface File extends FileData {
  path: string
  extension: string
}
