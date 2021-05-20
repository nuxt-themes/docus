// https://github.com/remarkjs/remark-directive/blob/main/index.js
import syntax from './micromark-directive/syntax'
import fromMarkdown from './remark-directive/from-markdown'
import toMarkdown from './remark-directive/to-markdown'

let warningIssued

module.exports = directive

function directive() {
  const data = this.data()

  /* istanbul ignore next - old remark. */
  if (
    !warningIssued &&
    ((this.Parser && this.Parser.prototype && this.Parser.prototype.blockTokenizers) ||
      (this.Compiler && this.Compiler.prototype && this.Compiler.prototype.visitors))
  ) {
    warningIssued = true
    console.warn('[remark-directive] Warning: please upgrade to remark 13 to use this plugin')
  }

  add('micromarkExtensions', syntax())
  add('fromMarkdownExtensions', fromMarkdown)
  add('toMarkdownExtensions', toMarkdown)

  function add(field, value) {
    /* istanbul ignore if - other extensions. */
    if (data[field]) data[field].push(value)
    else data[field] = [value]
  }
}
