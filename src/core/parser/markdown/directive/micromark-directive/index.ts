// https://github.com/micromark/micromark-extension-directive/blob/main/lib/syntax.js

import directiveText from './tokenize-directive-text'
import directiveContainer from './tokenize-directive-container'
import directiveContainerIndented from './tokenize-directive-container-indented'

export default function directive() {
  return {
    text: { 58: directiveText },
    flow: { 58: [directiveContainer, directiveText] },
    flowInitial: {
      '-2': directiveContainerIndented,
      '-1': directiveContainerIndented,
      32: directiveContainerIndented
    }
  }
}
