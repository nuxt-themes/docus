'use strict'

exports.tokenize = tokenizeDirectiveContainer
exports.concrete = true

const markdownLineEnding = require('micromark/dist/character/markdown-line-ending')
const createSpace = require('micromark/dist/tokenize/factory-space')
const prefixSize = require('micromark/dist/util/prefix-size')
const createAttributes = require('./factory-attributes')
const createLabel = require('./factory-label')
const createName = require('./factory-name')

const label = { tokenize: tokenizeLabel, partial: true }
const attributes = { tokenize: tokenizeAttributes, partial: true }

function tokenizeDirectiveContainer(effects, ok, nok) {
  const self = this
  const initialPrefix = prefixSize(this.events, 'linePrefix')
  let sizeOpen = 0
  let previous
  const containerSequenceSize = []

  return start

  function start(code) {
    /* istanbul ignore if - handled by mm */
    if (code !== 58 /* `:` */) throw new Error('expected `:`')
    effects.enter('directiveContainer')
    effects.enter('directiveContainerFence')
    effects.enter('directiveContainerSequence')
    return sequenceOpen(code)
  }

  function tokenizeClosingSection(effects, ok, nok) {
    let size = 0

    return createSpace(effects, closingPrefixAfter, 'linePrefix', 4)

    function closingPrefixAfter(code) {
      effects.enter('directiveContainerSectionSequence')
      return closingSequence(code)
    }

    function closingSequence(code) {
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
  function sectionOpen(code) {
    effects.exit('directiveContainerSection')
    effects.enter('directiveContainerSection')

    if (markdownLineEnding(code)) {
      return createSpace(effects, lineStart, 'whitespace')(code)
    }

    effects.enter('directiveContainerSectionTitle')
    return sectionTitle
  }

  function sectionTitle(code) {
    if (markdownLineEnding(code)) {
      effects.exit('directiveContainerSectionTitle')
      return createSpace(effects, lineStart, 'linePrefix', 4)(code)
    }
    effects.consume(code)
    return sectionTitle
  }

  function sequenceOpen(code) {
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

  function afterName(code) {
    return code === 91 /* `[` */ ? effects.attempt(label, afterLabel, afterLabel)(code) : afterLabel(code)
  }

  function afterLabel(code) {
    return code === 123 /* `{` */
      ? effects.attempt(attributes, afterAttributes, afterAttributes)(code)
      : afterAttributes(code)
  }

  function afterAttributes(code) {
    return createSpace(effects, openAfter, 'whitespace')(code)
  }

  function openAfter(code) {
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

  function contentStart(code) {
    if (code === null) {
      effects.exit('directiveContainer')
      return ok(code)
    }

    effects.enter('directiveContainerContent')
    effects.enter('directiveContainerSection')
    return lineStart(code)
  }

  function lineStart(code) {
    if (code === null) {
      return after(code)
    }
    const chunkStartFn = initialPrefix ? createSpace(effects, chunkStart, 'linePrefix', initialPrefix + 1) : chunkStart

    if (!containerSequenceSize.length && code === 45 /* `-` */) {
      return effects.attempt({ tokenize: tokenizeClosingSection, partial: true }, sectionOpen, chunkStartFn)(code)
    }

    const attempt = effects.attempt({ tokenize: tokenizeClosingFence, partial: true }, after, chunkStartFn)

    /**
     * disbale spliting inner sections
     */
    if (code === 58 /* `:` */) {
      return effects.check({ tokenize: detectContainer, partial: true }, chunkStartFn, attempt)(code)
    }

    return attempt
  }

  function chunkStart(code) {
    if (code === null) {
      return after(code)
    }

    const token = effects.enter('chunkDocument', {
      contentType: 'document',
      previous
    })
    if (previous) previous.next = token
    previous = token
    return contentContinue(code)
  }

  function contentContinue(code) {
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

  function after(code) {
    effects.exit('directiveContainerSection')
    effects.exit('directiveContainerContent')
    effects.exit('directiveContainer')
    return ok(code)
  }

  function tokenizeClosingFence(effects, ok, nok) {
    let size = 0

    return createSpace(effects, closingPrefixAfter, 'linePrefix', 4)

    function closingPrefixAfter(code) {
      effects.enter('directiveContainerFence')
      effects.enter('directiveContainerSequence')
      return closingSequence(code)
    }

    function closingSequence(code) {
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

    function closingSequenceEnd(code) {
      if (code === null || markdownLineEnding(code)) {
        effects.exit('directiveContainerFence')
        return ok(code)
      }

      return nok(code)
    }
  }
  function detectContainer(effects, ok, nok) {
    let size = 0

    return openingPrefixAfter

    function openingPrefixAfter(code) {
      return openingSequence(code)
    }

    function openingSequence(code) {
      if (code === 58 /* `:` */) {
        effects.consume(code)
        size++
        return openingSequence
      }

      // it is important to match sequence
      if (size < 3) return nok(code)

      return openingSequenceEnd
    }

    function openingSequenceEnd(code) {
      if (code === null || markdownLineEnding(code)) {
        return nok(code)
      }

      // memorize cotainer sequence
      containerSequenceSize.push(size)

      return ok(code)
    }
  }
}

function tokenizeLabel(effects, ok, nok) {
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

function tokenizeAttributes(effects, ok, nok) {
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
