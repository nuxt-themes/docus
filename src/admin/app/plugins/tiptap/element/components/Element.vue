<template>
  <NodeViewWrapper class="element">
    <details class="flex">
      <summary>{{ type }}</summary>
      <select v-model="type" class="w-24">
        <option value="alert">Alert</option>
        <option value="button-link">Button Link</option>
        <option value="video-player">Video Player</option>
      </select>
      <textarea v-model="raw" class="block w-full flex-1 h-24 rounded-md my-2"></textarea>
    </details>
    <!-- <Component :is="name" v-bind="attrs" /> -->
    <NodeViewContent />
  </NodeViewWrapper>
</template>

<script lang="ts">
import { NodeViewWrapper, NodeViewContent } from '@tiptap/vue-3'
import { defineComponent, ref, watch } from 'vue3'
import VideoPlayer from './VideoPlayer.vue'
import ButtonLink from './ButtonLink.vue'

export default defineComponent({
  components: { NodeViewWrapper, NodeViewContent, VideoPlayer, ButtonLink },
  props: {
    node: {
      type: Object,
      default: () => ({})
    },
    updateAttributes: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    const raw = ref(JSON.stringify(props.node.attrs.props, null, 2))
    const type = ref(props.node.attrs._tag)

    watch(
      () => [raw.value, type.value],
      () => {
        props.updateAttributes({
          props: JSON.parse(raw.value),
          _tag: type
        })
      }
    )
    return {
      type,
      attrs: props.node.attrs.props,
      raw
    }
  }
})
</script>

<style lang="postcss">
.element {
  @apply p-4 bg-gray-100 rounded-md;
}
</style>
