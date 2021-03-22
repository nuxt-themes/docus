import Vue from 'vue'

export default {
  functional: true,
  props: {
    component: {
      type: [String, Object, Array],
      required: true
    }
  },
  render (h, { props, data, slots, children }) {
    if (typeof props.component === 'string' && Vue.component(props.component)) {
      return h(props.component, data, children)
    }
    return slots().default
  }
}
