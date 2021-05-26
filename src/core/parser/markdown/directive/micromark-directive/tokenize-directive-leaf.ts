import { Effects, Okay, NotOkay } from 'micromark/dist/shared-types'
import markdownLineEnding from 'micromark/dist/character/markdown-line-ending'
import createSpace from 'micromark/dist/tokenize/factory-space'
import createAttributes from './factory-attributes'
import createLabel from './factory-label'
import createName from './factory-name'

const label: any = { tokenize: tokenizeLabel, partial: true }
const attributes: any = { tokenize: tokenizeAttributes, partial: true }

function tokenize(effects: Effects, ok: Okay, nok: NotOkay) {
  const self = this

  return start

  function start(code: number) {
    /* istanbul ignore if - handled by mm */
    if (code !== 58 /* `:` */) throw new Error('expected `:`')

    effects.enter('directiveLeaf')
    effects.enter('directiveLeafSequence')
    effects.consume(code)
    return inStart
  }

  function inStart(code: number) {
    if (code === 58 /* `:` */) {
      effects.consume(code)
      effects.exit('directiveLeafSequence')
      return createName.call(self, effects, afterName, nok, 'directiveLeafName')
    }

    return nok(code)
  }

  function afterName(code: number) {
    return code === 91 /* `[` */ ? effects.attempt(label, afterLabel, afterLabel)(code) : afterLabel(code)
  }

  function afterLabel(code: number) {
    return code === 123 /* `{` */
      ? effects.attempt(attributes, afterAttributes, afterAttributes)(code)
      : afterAttributes(code)
  }

  function afterAttributes(code: number) {
    return createSpace(effects, end, 'whitespace')(code)
  }

  function end(code: number) {
    if (code === null || markdownLineEnding(code)) {
      effects.exit('directiveLeaf')
      return ok(code)
    }

    return nok(code)
  }
}

function tokenizeLabel(effects: Effects, ok: Okay, nok: NotOkay) {
  // Always a `[`
  return createLabel(
    effects,
    ok,
    nok,
    'directiveLeafLabel',
    'directiveLeafLabelMarker',
    'directiveLeafLabelString',
    true
  )
}

function tokenizeAttributes(effects: Effects, ok: Okay, nok: NotOkay) {
  // Always a `{`
  return createAttributes(
    effects,
    ok,
    nok,
    'directiveLeafAttributes',
    'directiveLeafAttributesMarker',
    'directiveLeafAttribute',
    'directiveLeafAttributeId',
    'directiveLeafAttributeClass',
    'directiveLeafAttributeName',
    'directiveLeafAttributeInitializerMarker',
    'directiveLeafAttributeValueLiteral',
    'directiveLeafAttributeValue',
    'directiveLeafAttributeValueMarker',
    'directiveLeafAttributeValueData',
    true
  )
}

export default {
  tokenize
}
