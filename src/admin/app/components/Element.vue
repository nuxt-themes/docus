<template>
  <NodeViewWrapper class="element">
    <NodeViewContent as="div" />
    Custom Block
  </NodeViewWrapper>
</template>

<script lang="ts">
import { NodeViewWrapper, NodeViewContent } from '@tiptap/vue-3'
import { defineComponent } from 'vue3'

export default defineComponent({
  components: { NodeViewWrapper, NodeViewContent },
  props: {
    node: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    return {
      ...props.node.attrs
    }
  }
})
</script>

<style>
.element {
  background: red;
  padding: 10px;
}
</style>
