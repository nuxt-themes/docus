import { Node, mergeAttributes } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import ElementView from './components/Element.vue'

export default Node.create({
  name: 'element',

  group: 'block',

  addAttributes() {
    return {
      _tag: {
        rendered: false
      },
      props: {
        rendered: false
      }
    }
  },
  parseHTML() {
    return [
      {
        tag: `div[data-type="${this.name}"]`
      }
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': this.name })]
  },

  addNodeView() {
    return VueNodeViewRenderer(ElementView)
  }
})
