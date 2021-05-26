// https://github.com/micromark/micromark-extension-directive/blob/main/lib/syntax.js

import directiveText from './tokenize-directive-text'
import directiveLeaf from './tokenize-directive-leaf'
import directiveContainer from './tokenize-directive-container'

export default function directive() {
  return {
    text: { 58: directiveText },
    flow: { 58: [directiveContainer, directiveLeaf] }
  }
}
