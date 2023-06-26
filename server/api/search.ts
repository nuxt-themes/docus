import { defineEventHandler } from 'h3'
import { serverQueryContent } from '#content/server'

// Source storage
// import { prefixStorage } from 'unstorage'
// import { useStorage } from '#imports'
// const sourceStorage = prefixStorage(useStorage(), 'content:source')

export default defineEventHandler(async (event) => {
  const appConfig = useAppConfig()

  // `full-text` or `meta`
  const mode = appConfig?.docus?.search?.mode || 'meta'

  // Fetch all documents
  let docs = await serverQueryContent(event).find()

  docs = await Promise.all(
    docs
      .filter(
        (doc) => {
        // Only use `.md` files which are not drafts and has content
          return doc?._extension === 'md' &&
          doc?._draft === false &&
          doc?._empty === false
        }
      )
      .map(
        async ({ _id: id, _path: path, _dir: dir, title = '', description = '', body = undefined, ...rest }) => {
          return {
            id,
            path,
            dir,
            title,
            description,
            keywords: body?.toc?.links.map(link => link?.text),
            // Only fetch body for `full-text` mode.
            body: extractTextFromAst(body) || ''
          }
        }
      )
  )

  return docs
})

function extractTextFromAst(node) {
  console.log({ node })
  let text = ''
  if (node.type === 'text') {
    text += node.value
  }
  if (node.children) {
    for (const child of node.children) {
      text += ' ' + extractTextFromAst(child)
    }
  }
  return text
}
