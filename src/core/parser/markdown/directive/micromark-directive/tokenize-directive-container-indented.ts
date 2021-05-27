import { Effects, Okay, NotOkay } from 'micromark/dist/shared-types'
import createSpace from 'micromark/dist/tokenize/factory-space'
import codeFenced from 'micromark/dist/tokenize/code-fenced.js'
import prefixSize from 'micromark/dist/util/prefix-size'
import directiveContainer from './tokenize-directive-container'

function tokenize(effects: Effects, ok: Okay, nok: NotOkay) {
  const self = this
  return createSpace(effects, lineStart, 'linePrefix')

  function lineStart(code) {
    if (prefixSize(self.events, 'linePrefix') < 4) {
      return nok(code)
    }
    switch (code) {
      case 96 /* '`' */:
        return codeFenced.tokenize.call(self, effects, ok, nok)(code)
      case 58 /* ':' */:
        return directiveContainer.tokenize.call(self, effects, ok, nok)(code)
      default:
        return nok(code)
    }
  }
}

export default {
  tokenize
}
