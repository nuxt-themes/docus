import checkQuote from 'mdast-util-to-markdown/lib/util/check-quote'
import formatLinkAsAutolink from 'mdast-util-to-markdown/lib/util/format-link-as-autolink'
import safe from 'mdast-util-to-markdown/lib/util/safe'
import phrasing from '../util/container-phrasing'

export default function link(node, _, context) {
  const quote = checkQuote(context)
  const suffix = quote === '"' ? 'Quote' : 'Apostrophe'
  let subexit
  let value

  // Disable auto lonk
  //   if (formatLinkAsAutolink(node, context)) {
  //     let stack
  //     // Hide the fact that we’re in phrasing, because escapes don’t work.
  //     stack = context.stack
  //     context.stack = []
  //     exit = context.enter('autolink')
  //     value = '<' + phrasing(node, context, { before: '<', after: '>' }) + '>'
  //     exit()
  //     context.stack = stack
  //     return value
  //   }
  const props = node.attrs || node.props || {}
  const url = props.href || node.url || ''
  const title = props.title || node.title || ''

  const exit = context.enter('link')
  subexit = context.enter('label')
  value = '[' + phrasing(node, context, { before: '[', after: ']' }) + ']('
  subexit()

  if (
    // If there’s no url but there is a title…
    (!url && title) ||
    // Or if there’s markdown whitespace or an eol, enclose.
    /[ \t\r\n]/.test(url)
  ) {
    subexit = context.enter('destinationLiteral')
    value += '<' + safe(context, url, { before: '<', after: '>' }) + '>'
  } else {
    // No whitespace, raw is prettier.
    subexit = context.enter('destinationRaw')
    value += safe(context, url, {
      before: '(',
      after: title ? ' ' : ')'
    })
  }

  subexit()

  if (title) {
    subexit = context.enter('title' + suffix)
    value += ' ' + quote + safe(context, title, { before: quote, after: quote }) + quote
    subexit()
  }

  value += ')'

  exit()
  return value
}
link.peek = linkPeek

function linkPeek(node, _, context) {
  return formatLinkAsAutolink(node, context) ? '<' : '['
}
