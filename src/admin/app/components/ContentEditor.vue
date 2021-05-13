<template>
  <EditorContent class="content-editor" :editor="editor" />
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted, onBeforeUnmount } from 'vue3'
import { Editor, EditorContent } from '@tiptap/vue-3'
import { mergeAttributes, Node } from '@tiptap/core'
import { defaultExtensions } from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import CodeBlock from '@tiptap/extension-code-block'
import { tiptapFromDocus } from '../plugins/tiptapFromDocus'
import Element from '../plugins/Element'
import { toMarkdown } from '../utils/stringify'

export default defineComponent({
  components: {
    EditorContent
  },
  props: {
    body: {
      type: [String, Object],
      default: ''
    }
  },
  emits: ['update:body'],
  setup(props, { emit }) {
    const editor = ref(null)
    const value = ref(null)

    onMounted(() => {
      editor.value = new Editor({
        extensions: [
          ...defaultExtensions(),
          Link,
          Element,
          Table.extend({
            renderHTML({ HTMLAttributes }) {
              return ['table', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
            }
          }),
          TableRow,
          TableCell,
          TableHeader,
          Node.create({
            name: 'tableHead',
            content: 'tableRow+',
            group: 'block',
            parseHTML: () => [{ tag: 'thead' }],
            renderHTML: ({ HTMLAttributes }) => ['thead', HTMLAttributes, 0]
          }),
          Node.create({
            name: 'tableBody',
            content: 'tableRow+',
            group: 'block',
            parseHTML: () => [{ tag: 'tbody' }],
            renderHTML: ({ HTMLAttributes }) => ['tbody', HTMLAttributes, 0]
          }),
          CodeBlock.extend({
            addAttributes() {
              return {
                language: {
                  rendered: false
                },
                title: {
                  rendered: false
                }
              }
            }
          })
        ],
        content: tiptapFromDocus(props.body)
      })
      editor.value.on('update', () => {
        value.value = toMarkdown(editor.value.getJSON())
        emit('update:body', value.value)
      })
    })

    watch(
      () => props.body,
      () => {
        // HTML
        const isSame = props.body === value.value
        if (isSame) {
          return
        }

        editor.value.commands.setContent(tiptapFromDocus(props.body), false)
      }
    )
    onBeforeUnmount(() => {
      editor.value.destroy()
    })
    return {
      editor,
      value
    }
  }
})
</script>
<style lang="postcss">
.content-editor {
  .ProseMirror {
    white-space: initial;
    word-wrap: initial;
  }
  ul {
    margin-left: 0px;
    margin-right: 0px;
    padding: 0px;
    margin-top: 1.25em;
    margin-bottom: 1.25em;
    list-style-type: none;

    ul,
    ol {
      margin-top: 0.5em;
      margin-bottom: 0.5em;
    }
  }
  ul li {
    margin-top: 0.25em;
    margin-bottom: 0.25em;
    position: relative;
    padding-left: 1.75em;
    &::before {
      content: '';
      position: absolute;
      background-color: theme('colors.gray.300');
      border-radius: 50%;
      width: 0.375em;
      height: 0.375em;
      top: calc(0.875em - 0.1875em);
      left: 0.25em;
    }
    /* *:first-child {
      margin-top: 1.25em;
    } */
    /* *:last-child {
      margin-bottom: 0.5em;
    } */
    p {
      margin-top: 0.75em;
      margin-bottom: 0.75em;
    }
  }

  .dark ul li::before {
    background-color: theme('colors.gray.600');
  }

  ol li {
    margin-top: 0.25em;
    margin-bottom: 0.25em;
    position: relative;
    padding-left: 1.75em;
    &::before {
      content: counter(list-item, decimal) '.';
      content: counter(list-item, var(--list-counter-style, decimal)) '.';
      position: absolute;
      font-weight: 500;
      color: theme('colors.gray.600');
      left: 0;
    }
    /* *:first-child {
      margin-top: 1.25em;
    } */
    /* *:last-child {
      margin-bottom: 0.5em;
    } */
    p {
      margin-top: 0.75em;
      margin-bottom: 0.75em;
    }
  }

  >>> .nuxt-content-highlight {
    margin: 0;
  }

  .dark ol li::before {
    color: theme('colors.gray.400');
  }

  /* H1 */
  h1 {
    /* TODO */
    font-size: 2rem;
    /* scroll-margin-block: var(--docs-scroll-margin-block); */
    color: theme('colors.gray.900');
    letter-spacing: theme('letterSpacing.tight');
    margin-top: 1.5em;
    margin-bottom: 0.5em;
    line-height: theme('lineHeight.snug');
    font-weight: theme('fontWeight.bold');
  }

  h1 + * {
    margin-top: 0;
  }
}
</style>
