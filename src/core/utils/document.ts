import { withoutTrailingSlash } from 'ufo'
import { DocusDocument, DocusMarkdownNode } from '../../types'
import { expandTags, flatUnwrap } from '../runtime/utils'

export function generatePosition(path: string, document: DocusDocument): string {
  const position = path
    .split('/')
    .filter(Boolean)
    .map(part => {
      const match = part.match(/^(\d+)\./)
      if (match) {
        return padLeft(match[1], 4)
      }
      return document.position ? padLeft(document.position, 4) : '9999' // Parts without a position are going down to the bottom
    })
    .join('')
  return padRight(position, 12)
}

/**
 * Clean up special keywords from path part
 */
export function generateSlug(name: string): string {
  return (
    name
      /**
       * Remove hidden keyword
       */
      .replace(/^_/, '')
      /**
       * Remove numbering
       */
      .replace(/(\d+\.)?(.*)/, '$2')
      /**
       * remove index keyword
       */
      .replace(/^index/, '')
      /**
       * remove draft keyword
       */
      .replace(/\.draft/, '')
  )
}

export function generateTo(path: string): string {
  return withoutTrailingSlash(path.split('/').map(generateSlug).join('/'))
}

export function isDraft(path: string): boolean {
  return !!path.match(/(\.draft)$/)
}

/**
 * Files or directories that starts with underscore `_` will mark as hidden
 * @param path content path
 * @returns true if the is part in the path that starts with `_`
 */
export function isHidden(path: string): boolean {
  return path.split('/').some(part => part.match(/^_.*/))
}

export function processDocumentInfo(document: DocusDocument): DocusDocument {
  // There is no need to extract if both title and descriptio is provided by user
  if (document.title && document.description) return document

  const [first, second] = document.body.children
    // top level `text` can be ignored
    .filter(node => node.type !== 'text')

  if (first && expandTags(['h1']).includes(first.tag)) {
    if (!document.title) {
      document.title = getTextContent(first)
      // Remove anchor link
      first.children = flatUnwrap(first.children, ['a'])

      document.titleNode = { body: first }

      // Remove node if heading extract is enables
      if (document.extract?.heading !== false) {
        Object.assign(first, {
          type: 'text',
          value: ''
        })
      }
    }
    // look for second element to find description
    if (second && expandTags(['p']).includes(second.tag)) {
      if (!document.description) {
        document.description = getTextContent(second)
        document.descriptionNode = { body: second }

        // Remove node if heading extract is enables
        if (document.extract?.heading !== false) {
          Object.assign(second, {
            type: 'text',
            value: ''
          })
        }
      }
    }
  } else if (first && expandTags(['p']).includes(first.tag)) {
    if (!document.description) {
      document.description = getTextContent(first)
      document.descriptionNode = { body: first }

      // Remove node if heading extract is enables
      if (document.extract?.heading !== false) {
        Object.assign(first, {
          type: 'text',
          value: ''
        })
      }
    }
  }
  return document
}

// Locals

function getTextContent(node: DocusMarkdownNode): string {
  let text = node.value || ''
  if (node.children) {
    text = text + node.children.map(child => getTextContent(child)).join('')
  }
  return text.trim()
}

function padLeft(value: string, length: number): string {
  return ('0'.repeat(length) + value).substr(String(value).length)
}

function padRight(value: string, length: number): string {
  return (value + '0'.repeat(length)).substr(0, length)
}
