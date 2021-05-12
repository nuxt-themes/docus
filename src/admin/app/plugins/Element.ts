import { Node, mergeAttributes } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import Test from '../components/Element.vue'

export const Element = Node.create({
  name: 'element',

  group: 'block',

  addAttributes() {
    return {
      _tag: {
        rendered: false
      },
      blank: {
        rendered: false
      },
      size: {
        rendered: false
      },
      href: {
        rendered: false
      }
    }
  },
  parseHTML() {
    return [
      {
        tag: 'div[data-type="element"]'
      }
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'element' })]
  },

  addNodeView() {
    return VueNodeViewRenderer(Test)
  }
})

export default Element
