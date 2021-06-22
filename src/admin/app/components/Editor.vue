<template>
  <textarea
    v-model="frontmatter"
    class="h-24 w-full font-mono px-4 py-2 d-border-primary border-b outline-none text-sm"
  />
  <textarea v-model="content" class="w-full h-full font-mono px-4 py-2 outline-none text-sm" />
</template>

<script lang="ts">
import YAML from 'js-yaml'
import { GrayMatterFile } from 'gray-matter'
import { defineComponent, computed, ref, watch, PropType } from 'vue3'
import { useApi } from '../plugins/api'

type PermissiveGrayMatterFile = GrayMatterFile<any> & { file: any; path: any }

export default defineComponent({
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
        content.value = newVal.content
      }
    )

    // Local data
    const data = ref(props.file.data)
    const content = ref(props.file.content)

    // Stringified reference for frontmatter text-area
    const frontmatter = computed({
      get() {
        return YAML.dump(data.value, null, 2)
      },
      set(value: string) {
        try {
          data.value = YAML.parse(value)
        } catch (e) {
          // New value is not a valid YAML string.
          // Do nothing and wait for the next valid YAML input.
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
