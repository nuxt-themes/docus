import { Effects, Okay, NotOkay } from 'micromark/dist/shared-types'
import createAttributes from './factory-attributes'
import createLabel from './factory-label'
import createName from './factory-name'

const label: any = { tokenize: tokenizeLabel, partial: true }
const attributes: any = { tokenize: tokenizeAttributes, partial: true }

function previous(code: number) {
  // If there is a previous code, there will always be a tail.
  return code !== 58 /* `:` */ || this.events[this.events.length - 1][1].type === 'characterEscape'
}

function tokenize(effects: Effects, ok: Okay, nok: NotOkay) {
  const self = this

  return start

  function start(code: number) {
    /* istanbul ignore if - handled by mm */
    if (code !== 58 /* `:` */) throw new Error('expected `:`')

    /* istanbul ignore if - handled by mm */
    if (!previous.call(self, self.previous)) {
      throw new Error('expected correct previous')
    }

    effects.enter('directiveText')
    effects.enter('directiveTextMarker')
    effects.consume(code)
    effects.exit('directiveTextMarker')
    return createName.call(self, effects, afterName, nok, 'directiveTextName')
  }

  function afterName(code: number) {
    if (code === 58 /* `:` */) {
      return nok(code)
    }
    return code === 91 /* `[` */ ? effects.attempt(label, afterLabel, afterLabel)(code) : afterLabel(code)
  }

  function afterLabel(code: number) {
    return code === 123 /* `{` */
      ? effects.attempt(attributes, afterAttributes, afterAttributes)(code)
      : afterAttributes(code)
  }

  function afterAttributes(code: number) {
    effects.exit('directiveText')
    return ok(code)
  }
}

function tokenizeLabel(effects: Effects, ok: Okay, nok: NotOkay) {
  // Always a `[`
  return createLabel(effects, ok, nok, 'directiveTextLabel', 'directiveTextLabelMarker', 'directiveTextLabelString')
}

function tokenizeAttributes(effects: Effects, ok: Okay, nok: NotOkay) {
  // Always a `{`
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
  tokenize,
  previous
}
