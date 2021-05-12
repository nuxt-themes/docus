<template>
  <div class="flex flex-col h-screen">
    <EditorContent class="px-8 py-4 bg-white text-black h-72 overflow-scroll" :editor="editor" />

    <div class="flex-1 grid grid-cols-2 grid-rows-2 gap-1 h-64">
      <div class="p-2 bg-gray-700 flex flex-col">
        <h3>~~> Docus Document</h3>
        <NuxtContent class="flex-1 overflow-scroll" :document="docus" />
      </div>
      <div class="p-2 bg-gray-700 flex flex-col">
        <h3>~~> Tiptop Document converted from Docus (Preview only)</h3>
        <Editor v-model="tiptap" class="readonly flex-1 overflow-scroll" />
      </div>
      <div class="p-2 bg-gray-700 flex flex-col">
        <h3>~~> Docus JSON</h3>
        <pre class="flex-1 overflow-scroll text-xs"><code v-html="docus.body" /></pre>
      </div>
      <div class="p-2 bg-gray-700 flex flex-col">
        <h3>~~> Tiptap JSON</h3>
        <pre class="flex-1 overflow-scroll text-xs"><code v-html="json" /></pre>
      </div>
    </div>
  </div>
</template>

<script>
import { kebabCase } from 'scule'
import { Editor, EditorContent } from '@tiptap/vue-2'
import Link from '@tiptap/extension-link'
import { defaultExtensions } from '@tiptap/starter-kit'

export default {
  components: {
    EditorContent
  },
  data() {
    return {
      editor: null,
      json: null
    }
  },
  computed: {
    docus() {
      const body = this.json ? tiptapToDocus(this.json) : {}
      return { body }
    },
    tiptap() {
      return docusToTiptap(this.docus.body)
    }
  },
  mounted() {
    this.editor = new Editor({
      content: `
        <p>
        <a href="http://gogo.com">test</a> <code>dsd</code>
        </p>
        
      `,
      extensions: [...defaultExtensions(), Link]
    })
    this.json = this.editor.getJSON()
    this.editor.on('update', () => {
      this.json = this.editor.getJSON()
    })
  },
  beforeDestroy() {
    this.editor.destroy()
  }
}

function docusToTiptap(tree) {
  const handlers = {
    root: node => ({
      type: 'doc',
      content: node.children ? node.children.map(node => visit(node)) : []
    }),
    'prose-h': (node, level) => ({
      type: 'heading',
      attrs: {
        level
      },
      content: node.children[0].tag === 'prose-a' ? node.children[0].children.map(visit) : node.children.map(visit)
    }),
    'prose-h1': node => handlers['prose-h'](node, 1),
    'prose-h2': node => handlers['prose-h'](node, 2),
    'prose-h3': node => handlers['prose-h'](node, 3),
    'prose-h4': node => handlers['prose-h'](node, 4),
    'prose-h5': node => handlers['prose-h'](node, 5),
    'prose-h6': node => handlers['prose-h'](node, 6),
    'prose-paragraph': node => ({
      type: 'paragraph',
      content: node.children.map(visit)
    }),
    'prose-hr': () => ({
      type: 'horizontalRule'
    }),
    text: node => ({
      type: 'text',
      text: node.value
    }),
    'prose-ul': node => ({
      type: 'bulletList',
      content: node.children.map(visit)
    }),
    'prose-ol': node => ({
      type: 'orderedList',
      content: node.children.map(visit)
    }),
    'prose-li': node => ({
      type: 'listItem',
      content: node.children.map(visit)
    }),
    markNode: (node, type) => {
      const _node = visit(node.children[0])
      _node.marks = _node.marks || []
      _node.marks.push({ type, attrs: node.props })
      return _node
    },
    'prose-strong': node => handlers.markNode(node, 'bold'),
    'prose-a': node => handlers.markNode(node, 'link'),
    'prose-code-inline': node => handlers.markNode(node, 'code'),
    em: node => handlers.markNode(node, 'italic')
  }
  function visit(node) {
    const type = !node.type || node.type === 'element' ? node.tag : node.type

    if (handlers[type]) {
      node = handlers[type](node)
    }
    return node
  }
  return visit(tree)
}

function tiptapToDocus(tree) {
  const marks = {
    bold: node => ({
      type: 'element',
      tag: 'prose-strong',
      props: {},
      children: [node]
    }),
    italic: node => ({
      type: 'element',
      tag: 'em',
      props: {},
      children: [node]
    }),
    link: (node, { attrs }) => {
      return {
        type: 'prose-a',
        tag: 'a',
        props: attrs || {},
        children: [node]
      }
    },
    code: (node, { attrs }) => {
      return {
        type: 'element',
        tag: 'prose-code-inline',
        props: attrs || {},
        children: [node]
      }
    }
  }
  const handlers = {
    doc: node => ({
      type: 'root',
      children: node.content ? node.content.map(node => visit(node)) : [],
      props: {}
    }),
    horizontalRule: () => ({
      type: 'element',
      tag: 'prose-hr',
      props: {},
      children: []
    }),
    text: node => {
      let _node = {
        type: 'text',
        value: node.text
      }
      if (node.marks) {
        _node = node.marks.reduce((_node, { type, attrs }) => {
          return marks[type](_node, { attrs })
        }, _node)
      }
      return _node
    },
    paragraph: node => ({
      tag: 'prose-paragraph',
      children: node.content ? node.content.map(node => visit(node)) : [],
      props: {}
    }),
    orderedList: node => ({
      type: 'element',
      tag: 'prose-ol',
      props: {},
      children: node.content.map(visit)
    }),
    bulletList: node => ({
      type: 'element',
      tag: 'prose-ul',
      props: {},
      children: node.content.map(visit)
    }),
    listItem: node => ({
      type: 'element',
      tag: 'prose-li',
      props: {},
      children: node.content.map(visit)
    }),
    heading: node => {
      node.content = node.content || []
      const id = kebabCase(node.content.map(n => n.text))
      let children = node.content.map(visit)
      if (node.attrs.level < 5) {
        children = [
          {
            type: 'element',
            tag: 'prose-a',
            props: {
              href: '#' + id
            },
            children
          }
        ]
      }
      return {
        tag: 'prose-h' + node.attrs.level,
        props: {
          id
        },
        children
      }
    }
  }
  function visit(node) {
    if (handlers[node.type]) {
      node = handlers[node.type](node)
    }
    return node
  }
  return visit(tree)
}
</script>

<style lang="postcss">
/* Basic editor styles */
.ProseMirror {
  h1,
  h2,
  h3,
  h4 {
    font-size: revert;
    margin: revert;
    font-weight: revert;
  }
  ul,
  ol,
  li {
    margin: revert;
    padding: revert;
    list-style: revert;
  }
}
</style>
