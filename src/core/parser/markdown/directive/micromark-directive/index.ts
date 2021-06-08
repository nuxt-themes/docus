// https://github.com/micromark/micromark-extension-directive/blob/main/lib/syntax.js

import directiveInline from './tokenize-directive-inline'
import directiveContainer from './tokenize-directive-container'
import directiveContainerIndented from './tokenize-directive-container-indented'

export default function directive() {
  return {
    text: { 58: directiveInline },
    flow: { 58: [directiveContainer, directiveInline] },
    flowInitial: {
      '-2': directiveContainerIndented,
      '-1': directiveContainerIndented,
      32: directiveContainerIndented
    }
  }
}
