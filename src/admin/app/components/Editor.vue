<template>
  <textarea v-model="frontmatter" class="h-24 w-full" />
  <ContentEditor v-model:body="content" class="w-full h-full overflow-scroll" />
</template>

<script lang="ts">
import { GrayMatterFile } from 'gray-matter'
import { defineComponent, computed, ref, watch, PropType } from 'vue3'
import { useApi } from '../plugins/api'
import ContentEditor from './ContentEditor.vue'

type PermissiveGrayMatterFile = GrayMatterFile<any> & { file: any; path: any; body: any }

export default defineComponent({
  components: {
    ContentEditor
  },
  props: {
    file: {
      type: Object as PropType<PermissiveGrayMatterFile>,
      required: true
    }
  },
  setup(props) {
    const api = useApi()

    // Sync local data when file changes
    watch(
      () => props.file,
      newVal => {
        data.value = newVal.data
        content.value = newVal.body
      }
    )

    // Local data
    const data = ref(props.file.data)
    const content = ref(props.file.body)
    // Stringified reference for frontmatter text-area
    const frontmatter = computed({
      get() {
        return JSON.stringify(data.value, null, 2)
      },
      set(value: string) {
        try {
          data.value = JSON.parse(value)
        } catch (e) {
          // New value is not a valid JSON string.
          // Do nothing and wait for the next valid JSON input.
        }
      }
    })

    // API update on change on data or content
    watch([data, content], () => {
      api.put(`/pages${props.file.path}`, {
        data: data.value,
        content: content.value
      })
    })

    return {
      frontmatter,
      content
    }
  }
})
</script>

<style lang="postcss" scoped>
textarea {
  @apply whitespace-nowrap overflow-scroll;
}
</style>
