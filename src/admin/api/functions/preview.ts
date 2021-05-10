import { Middleware } from 'h3'

export default <Middleware>function previewHandler() {
  const url = process.previewUrl

  return { url }
}
