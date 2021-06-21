import { Effects, Okay, NotOkay } from 'micromark/dist/shared-types'
import { Codes } from './constants'
import createAttributes from './factory-attributes'
import createLabel from './factory-label'

const label: any = { tokenize: tokenizeLabel, partial: true }
const attributes: any = { tokenize: tokenizeAttributes, partial: true }

function tokenize(effects: Effects, ok: Okay, nok: NotOkay) {
  return start

  function start(code: number) {
    if (code !== Codes.openningSquareBracket) {
      throw new Error('expected `[`')
    }

    effects.enter('directiveTextSpan')
    return effects.attempt(label, afterLabel, nok)(code)
  }

  function afterLabel(code: number) {
    if (code === Codes.closingParentheses) {
      effects.consume(code)
      return afterLabel
    }

    // Check for attributes after label
    if (code === Codes.openningCurlyBracket) {
      return effects.attempt(attributes, exit, nok)(code)
    }
    return nok(code)
  }

  function exit(code: number) {
    effects.exit('directiveTextSpan')
    return ok(code)
  }
}

/**
 * Labels starts with `[` and ends with `]`
 */
function tokenizeLabel(effects: Effects, ok: Okay, nok: NotOkay) {
  return createLabel(effects, ok, nok, 'directiveTextLabel', 'directiveTextLabelMarker', 'directiveTextLabelString')
}

/**
 * Attributes starts with `{` and ends with `}`
 */
function tokenizeAttributes(effects: Effects, ok: Okay, nok: NotOkay) {
  return createAttributes(
    effects,
    ok,
    nok,
    'directiveTextAttributes',
    'directiveTextAttributesMarker',
    'directiveTextAttribute',
    'directiveTextAttributeId',
    'directiveTextAttributeClass',
    'directiveTextAttributeName',
    'directiveTextAttributeInitializerMarker',
    'directiveTextAttributeValueLiteral',
    'directiveTextAttributeValue',
    'directiveTextAttributeValueMarker',
    'directiveTextAttributeValueData'
  )
}

export default {
  tokenize
}
