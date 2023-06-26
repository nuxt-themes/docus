import { prefixStorage } from 'unstorage'
import { defineEventHandler } from 'h3'
import { useStorage } from '#imports'
import { serverQueryContent } from '#content/server'

const sourceStorage = prefixStorage(useStorage(), 'content:source')

export default defineEventHandler(async (event) => {
  const appConfig = useAppConfig()

  // const mode = appConfig?.docus?.search?.mode || 'meta'

  // Fetch all documents
  let docs = await serverQueryContent(event).find()

  console.log({sourceStorage})

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
            body: await sourceStorage?.getItem?.(id) || ''
          }
        }
      )
  )

  return docs
})
