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
import Element from '../plugins/Element'

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
        content: props.body
      })
      value.value = editor.value.getJSON()

      editor.value.on('update', () => {
        value.value = editor.value.getJSON()
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

        editor.value.commands.setContent(props.body, false)
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
.raw-editor {
  @apply w-full h-full text-sm font-mono bg-gray-100 p-4;
}
.content-editor {
  .ProseMirror {
    white-space: initial;
    word-wrap: initial;
    padding: theme('padding.4');
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
  /* paragraph */
  p {
    @apply leading-relaxed;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
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
  /* table */
  table {
    /* TODO */
    font-size: 0.875rem;
    @apply leading-5;
    width: 100%;
    table-layout: auto;
    text-align: left;
    margin-top: 2em;
    margin-bottom: 2em;
  }
  /* inline code */
  code {
    /* TODO */
    /* font-size: 0.875em; */
    @apply text-sm;
    color: inherit;
    font-weight: 400;
    padding: theme('padding.1') theme('padding.2');
    background-color: theme('colors.gray.100');
    border-radius: theme('borderRadius.md');
  }

  a code {
    color: inherit;
    font-weight: inherit;
  }

  tbody code {
    /* TODO */
    font-size: 12px;
  }

  h1 a,
  h2 a,
  h3 a {
    &:hover {
      & code {
        border-color: theme('colors.gray.500');
      }
    }
    code {
      font-size: inherit;
      color: inherit;
      font-weight: inherit;
      pointer-events: none;
      border: 1px dashed transparent;
      position: relative;
      z-index: 0;
    }
    & code:before {
      content: '';
      position: absolute;
      top: -4px;
      left: -4px;
      z-index: -1;
      width: calc(100% + 8px);
      height: calc(100% + 8px);
      background-color: theme('colors.white');
      pointer-events: none;
    }
  }

  .dark {
    code {
      font-weight: inherit;
      color: inherit;
      background-color: theme('colors.gray.800');
    }
    h1 a,
    h2 a,
    h3 a {
      &:hover {
        code {
          border-color: theme('colors.gray.500');
        }
      }
      code:before {
        background-color: theme('colors.gray.900');
      }
    }
  }
  /* code block */
  pre {
    /* line-height: 1.7142857; */
    background: theme('colors.gray.200');
    border-radius: theme('borderRadius.md');
    padding: theme('padding.4');
    margin-top: 0px;
    margin-bottom: 0px;
    overflow-x: auto;
  }
  code {
    /* TODO */
    /* font-size: 0.875em; */
    @apply text-xs leading-relaxed;
    font-weight: 400;
    color: inherit;
    background-color: theme('colors.gray.100');
    border-radius: theme('borderRadius.md');
  }

  pre code {
    background-color: transparent;
    font-family: theme('fontFamily.mono');
    padding: 0;
  }

  .dark {
    code {
      background-color: theme('colors.gray.800');
      border-radius: theme('borderRadius.md');
    }
    pre code {
      background-color: transparent;
      color: theme('colors.gray.100');
    }
  }

  .code-group .docus-highlight {
    & > .filename {
      @apply rounded-tr-none;
    }
  }

  .docus-highlight {
    @apply relative my-4;

    /* Style filename span added by @nuxt/content */
    & > .filename {
      @apply absolute top-0 right-0 z-0 py-1.5 px-2 bg-gray-200 dark:bg-gray-700 rounded-tr-md rounded-bl font-mono font-semibold text-xs leading-none tracking-tight text-gray-600 dark:text-gray-200;
    }

    /* Style copy button added in `pages/_.vue` */
    & > .copy {
      @apply outline-none absolute right-0 bottom-0 px-3 py-1.5 text-gray-700 bg-gray-200 text-xs leading-none rounded-tl rounded-br-md font-mono dark:text-white dark:bg-gray-700 dark:border-gray-600;

      &:hover {
        @apply bg-gray-300 border-gray-300 dark:bg-gray-600 dark:border-gray-500;
      }

      &:focus {
        @apply bg-gray-300 border-gray-300 dark:bg-gray-600 dark:border-gray-500;
      }

      &.copied {
        @apply bg-gray-300 border-gray-300 dark:bg-gray-600 dark:border-gray-500;
      }
    }

    &:hover {
      & > .copy {
        @apply block;
      }
    }
  }
}
</style>
