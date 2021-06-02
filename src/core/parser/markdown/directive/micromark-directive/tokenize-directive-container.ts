import { Effects, Okay, NotOkay } from 'micromark/dist/shared-types'
import markdownLineEnding from 'micromark/dist/character/markdown-line-ending'
import createSpace from 'micromark/dist/tokenize/factory-space'
import sizeChunks from 'micromark/dist/util/size-chunks'
import createAttributes from './factory-attributes'
import createLabel from './factory-label'
import createName from './factory-name'
import { Codes, ContainerSequenceSize, SectionSequenceSize } from './constants'

const label: any = { tokenize: tokenizeLabel, partial: true }
const attributes: any = { tokenize: tokenizeAttributes, partial: true }

/**
 * Calculate line indention size, line indention could be consists of multiple `linePrefix` events
 * @param events parser tokens
 * @returns line indention size
 */
function linePrefixSize(events) {
  let size = 0
  let index = events.length - 1
  let tail = events[index]
  while (index >= 0 && tail && tail[1].type === 'linePrefix' && tail[0] === 'exit') {
    size += sizeChunks(tail[2].sliceStream(tail[1]))
    index -= 1
    tail = events[index]
  }

  return size
}

function tokenize(effects: Effects, ok: Okay, nok: NotOkay) {
  const self = this
  const initialPrefix = linePrefixSize(this.events)
  let sizeOpen = 0
  let previous
  const containerSequenceSize = []

  return start

  function start(code: number) {
    /* istanbul ignore if - handled by mm */
    if (code !== Codes.colon) throw new Error('expected `:`')
    effects.enter('directiveContainer')
    effects.enter('directiveContainerFence')
    effects.enter('directiveContainerSequence')
    return sequenceOpen(code)
  }

  function tokenizeSectionClosing(effects: Effects, ok: Okay, nok: NotOkay) {
    let size = 0
    let sectionIndentSize = 0

    return closingPrefixAfter

    function closingPrefixAfter(code: number) {
      sectionIndentSize = linePrefixSize(self.events)
      effects.exit('directiveContainerSection')
      effects.enter('directiveContainerSectionSequence')
      return closingSectionSequence(code)
    }

    function closingSectionSequence(code: number) {
      if (code === Codes.dash) {
        effects.consume(code)
        size++
        return closingSectionSequence
      }

      if (size < SectionSequenceSize) return nok(code)
      if (sectionIndentSize !== initialPrefix) return nok(code)

      effects.exit('directiveContainerSectionSequence')
      return createSpace(effects, ok, 'whitespace')(code)
    }
  }
  function sectionOpen(code: number) {
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
    if (code === Codes.colon) {
      effects.consume(code)
      sizeOpen++
      return sequenceOpen
    }

    if (sizeOpen < ContainerSequenceSize) {
      return nok(code)
    }

    effects.exit('directiveContainerSequence')
    return createName.call(self, effects, afterName, nok, 'directiveContainerName')(code)
  }

  function afterName(code: number) {
    return code === Codes.openningSquareBracket
      ? effects.attempt(label, afterLabel, afterLabel)(code)
      : afterLabel(code)
  }

  function afterLabel(code: number) {
    return code === Codes.openningCurlyBracket
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

  function lineStartAfterPrefix(code: number) {
    if (code === null) {
      return after(code)
    }

    if (!containerSequenceSize.length && (code === Codes.dash || code === Codes.space)) {
      return effects.attempt({ tokenize: tokenizeSectionClosing, partial: true } as any, sectionOpen, chunkStart)
    }

    const attempt = effects.attempt({ tokenize: tokenizeClosingFence, partial: true } as any, after, chunkStart)

    /**
     * disbale spliting inner sections
     */
    if (code === Codes.colon) {
      return effects.check({ tokenize: detectContainer, partial: true } as any, chunkStart, attempt)(code)
    }

    return attempt
  }

  function lineStart(code: number) {
    if (code === null) {
      return after(code)
    }

    return initialPrefix
      ? createSpace(effects, lineStartAfterPrefix, 'linePrefix', initialPrefix + 1)
      : lineStartAfterPrefix
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
      if (code === Codes.colon) {
        effects.consume(code)
        size++
        return closingSequence
      }

      if (containerSequenceSize.length) {
        if (size === containerSequenceSize[containerSequenceSize.length - 1]) {
          containerSequenceSize.pop()
        }
        return nok(code)
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

    return openingSequence

    function openingSequence(code: number) {
      if (code === Codes.colon) {
        effects.consume(code)
        size++
        return openingSequence
      }

      if (size < ContainerSequenceSize) return nok(code)

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
