<template>
  <NodeViewWrapper class="element">
    <span>{{ name }}</span>
    <Component :is="name" v-bind="attrs" />
  </NodeViewWrapper>
</template>

<script lang="ts">
import { NodeViewWrapper, NodeViewContent } from '@tiptap/vue-3'
import { defineComponent } from 'vue3'
import { pascalCase } from 'scule'
import VideoPlayer from './VideoPlayer.vue'
import ButtonLink from './ButtonLink.vue'

export default defineComponent({
  components: { NodeViewWrapper, NodeViewContent, VideoPlayer, ButtonLink },
  props: {
    node: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    return {
      name: pascalCase(props.node.attrs._tag),
      attrs: props.node.attrs.props
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
