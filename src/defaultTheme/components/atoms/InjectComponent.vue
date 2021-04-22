<script>
import Vue from 'vue'
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  functional: true,
  props: {
    component: {
      type: [String, Object, Array],
      required: true
    },
    tag: {
      type: String,
      default: 'span'
    }
  },
  render(h, { props, data, slots, children }) {
    if (typeof props.component === 'string' && Vue.component(props.component)) {
      return h(props.component, data, children)
    }

    return h(props.tag, data, slots().default)
  }
})
</script>
