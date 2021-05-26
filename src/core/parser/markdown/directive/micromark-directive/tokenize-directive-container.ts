import { Effects, Okay, NotOkay } from 'micromark/dist/shared-types'
import markdownLineEnding from 'micromark/dist/character/markdown-line-ending'
import createSpace from 'micromark/dist/tokenize/factory-space'
import prefixSize from 'micromark/dist/util/prefix-size'
import createAttributes from './factory-attributes'
import createLabel from './factory-label'
import createName from './factory-name'

const label: any = { tokenize: tokenizeLabel, partial: true }
const attributes: any = { tokenize: tokenizeAttributes, partial: true }

function tokenize(effects: Effects, ok: Okay, nok: NotOkay) {
  const self = this
  const initialPrefix = prefixSize(this.events, 'linePrefix')
  let sizeOpen = 0
  let previous
  const containerSequenceSize = []

  return start

  function start(code: number) {
    /* istanbul ignore if - handled by mm */
    if (code !== 58 /* `:` */) throw new Error('expected `:`')
    effects.enter('directiveContainer')
    effects.enter('directiveContainerFence')
    effects.enter('directiveContainerSequence')
    return sequenceOpen(code)
  }

  function tokenizeClosingSection(effects: Effects, ok: Okay, nok: NotOkay) {
    let size = 0

    return createSpace(effects, closingPrefixAfter, 'linePrefix', 4)

    function closingPrefixAfter(code: number) {
      effects.enter('directiveContainerSectionSequence')
      return closingSequence(code)
    }

    function closingSequence(code: number) {
      if (code === 45 /* `-` */) {
        effects.consume(code)
        size++
        return closingSequence
      }

      if (size < 3) return nok(code)
      effects.exit('directiveContainerSectionSequence')
      return createSpace(effects, ok, 'whitespace')(code)
    }
  }
  function sectionOpen(code: number) {
    effects.exit('directiveContainerSection')
    effects.enter('directiveContainerSection')

    if (markdownLineEnding(code)) {
      return createSpace(effects, lineStart, 'whitespace')(code)
    }

    effects.enter('directiveContainerSectionTitle')
    return sectionTitle
  }

  function sectionTitle(code: number) {
    if (markdownLineEnding(code)) {
      effects.exit('directiveContainerSectionTitle')
      return createSpace(effects, lineStart, 'linePrefix', 4)(code)
    }
    effects.consume(code)
    return sectionTitle
  }

  function sequenceOpen(code: number) {
    if (code === 58 /* `:` */) {
      effects.consume(code)
      sizeOpen++
      return sequenceOpen
    }

    if (sizeOpen < 3) {
      return nok(code)
    }

    effects.exit('directiveContainerSequence')
    return createName.call(self, effects, afterName, nok, 'directiveContainerName')(code)
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
    return createSpace(effects, openAfter, 'whitespace')(code)
  }

  function openAfter(code: number) {
    effects.exit('directiveContainerFence')

    if (code === null) {
      effects.exit('directiveContainer')
      return ok(code)
    }

    if (markdownLineEnding(code)) {
      effects.enter('lineEnding')
      effects.consume(code)
      effects.exit('lineEnding')
      return self.interrupt ? ok : contentStart
    }

    return nok(code)
  }

  function contentStart(code: number) {
    if (code === null) {
      effects.exit('directiveContainer')
      return ok(code)
    }

    effects.enter('directiveContainerContent')
    effects.enter('directiveContainerSection')
    return lineStart(code)
  }

  function lineStart(code: number) {
    if (code === null) {
      return after(code)
    }
    const chunkStartFn = initialPrefix ? createSpace(effects, chunkStart, 'linePrefix', initialPrefix + 1) : chunkStart

    if (!containerSequenceSize.length && code === 45 /* `-` */) {
      return effects.attempt(
        { tokenize: tokenizeClosingSection, partial: true } as any,
        sectionOpen,
        chunkStartFn
      )(code)
    }

    const attempt = effects.attempt({ tokenize: tokenizeClosingFence, partial: true } as any, after, chunkStartFn)

    /**
     * disbale spliting inner sections
     */
    if (code === 58 /* `:` */) {
      return effects.check({ tokenize: detectContainer, partial: true } as any, chunkStartFn, attempt)(code)
    }

    return attempt
  }

  function chunkStart(code: number) {
    if (code === null) {
      return after(code)
    }

    // @ts-ignore
    const token = effects.enter('chunkDocument', {
      contentType: 'document',
      previous
    })
    if (previous) previous.next = token
    previous = token
    return contentContinue(code)
  }

  function contentContinue(code: number) {
    if (code === null) {
      effects.exit('chunkDocument')
      return after(code)
    }

    if (markdownLineEnding(code)) {
      effects.consume(code)
      effects.exit('chunkDocument')
      return lineStart
    }

    effects.consume(code)
    return contentContinue
  }

  function after(code: number) {
    effects.exit('directiveContainerSection')
    effects.exit('directiveContainerContent')
    effects.exit('directiveContainer')
    return ok(code)
  }

  function tokenizeClosingFence(effects: Effects, ok: Okay, nok: NotOkay) {
    let size = 0

    return createSpace(effects, closingPrefixAfter, 'linePrefix', 4)

    function closingPrefixAfter(code: number) {
      effects.enter('directiveContainerFence')
      effects.enter('directiveContainerSequence')
      return closingSequence(code)
    }

    function closingSequence(code: number) {
      if (code === 58 /* `:` */) {
        effects.consume(code)
        size++
        return closingSequence
      }

      if (containerSequenceSize.length && size === containerSequenceSize[containerSequenceSize.length - 1]) {
        containerSequenceSize.pop()
      }
      // it is important to match sequence
      if (size !== sizeOpen) return nok(code)
      effects.exit('directiveContainerSequence')
      return createSpace(effects, closingSequenceEnd, 'whitespace')(code)
    }

    function closingSequenceEnd(code: number) {
      if (code === null || markdownLineEnding(code)) {
        effects.exit('directiveContainerFence')
        return ok(code)
      }

      return nok(code)
    }
  }
  function detectContainer(effects: Effects, ok: Okay, nok: NotOkay) {
    let size = 0

    return openingPrefixAfter

    function openingPrefixAfter(code: number) {
      return openingSequence(code)
    }

    function openingSequence(code: number) {
      if (code === 58 /* `:` */) {
        effects.consume(code)
        size++
        return openingSequence
      }

      // it is important to match sequence
      if (size < 3) return nok(code)

      return openingSequenceEnd
    }

    function openingSequenceEnd(code: number) {
      if (code === null || markdownLineEnding(code)) {
        return nok(code)
      }

      // memorize cotainer sequence
      containerSequenceSize.push(size)

      return ok(code)
    }
  }
}

function tokenizeLabel(effects: Effects, ok: Okay, nok: NotOkay) {
  // Always a `[`
  return createLabel(
    effects,
    ok,
    nok,
    'directiveContainerLabel',
    'directiveContainerLabelMarker',
    'directiveContainerLabelString',
    true
  )
}

function tokenizeAttributes(effects: Effects, ok: Okay, nok: NotOkay) {
  // Always a `{`
  return createAttributes(
    effects,
    ok,
    nok,
    'directiveContainerAttributes',
    'directiveContainerAttributesMarker',
    'directiveContainerAttribute',
    'directiveContainerAttributeId',
    'directiveContainerAttributeClass',
    'directiveContainerAttributeName',
    'directiveContainerAttributeInitializerMarker',
    'directiveContainerAttributeValueLiteral',
    'directiveContainerAttributeValue',
    'directiveContainerAttributeValueMarker',
    'directiveContainerAttributeValueData',
    true
  )
}

export default {
  tokenize,
  concrete: true
}
