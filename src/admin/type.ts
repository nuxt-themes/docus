export interface FileData {
  raw: string
}

export interface File extends FileData {
  path: string
  name: string
  extension: string
  children?: File[]
  isOpen?: boolean
}
