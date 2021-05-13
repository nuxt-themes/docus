import checkStrong from 'mdast-util-to-markdown/lib/util/check-strong'
import phrasing from '../util/container-phrasing'

strong.peek = strongPeek

// To do: there are cases where emphasis cannot “form” depending on the
// previous or next character of sequences.
// There’s no way around that though, except for injecting zero-width stuff.
// Do we need to safeguard against that?
export default function strong(node, _, context) {
  const marker = checkStrong(context)
  const exit = context.enter('strong')
  const value = phrasing(node, context, { before: marker, after: marker })
  exit()
  return marker + marker + value + marker + marker
}

function strongPeek(_node, _, context) {
  return context.options.strong || '*'
}
