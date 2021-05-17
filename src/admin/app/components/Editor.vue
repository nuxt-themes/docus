<template>
  <div class="flex flex-col h-full">
    <div class="p-2">
      <button
        class="relative flex-none px-4 py-1 text-sm font-medium leading-5 border rounded-md"
        @click="toggleEditor"
      >
        Toggle Editor
      </button>
    </div>
    <div class="flex flex-col h-full flex-1">
      <textarea v-if="rawEditor" v-model="raw" class="w-full h-full flex-1 p-2"></textarea>
      <div class="flex flex-col w-full h-full flex-1" v-else>
        <textarea v-model="frontmatter" class="h-24 w-full" />
        <ContentEditor v-model:body="content" class="w-full flex-1 overflow-scroll pb-32" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { GrayMatterFile } from 'gray-matter'
import { defineComponent, computed, ref, watch, PropType } from 'vue3'
import { useApi } from '../plugins/api'
import { tiptapFromDocus } from '../plugins/tiptap/docus-convertor'
import { toMarkdown } from '../utils/stringify'
import ContentEditor from './ContentEditor.vue'

type PermissiveGrayMatterFile = GrayMatterFile<any> & { file: any; path: any; body: any; raw: string }

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

    // Local data
    const data = ref(props.file.data)
    const content = ref(tiptapFromDocus(props.file.body))
    const raw = ref(props.file.raw)
    const rawEditor = ref(false)

    // Sync local data when file changes
    watch(
      () => props.file,
      newVal => {
        data.value = newVal.data
        content.value = tiptapFromDocus(newVal.body)
        raw.value = newVal.raw
      }
    )
    watch(
      () => content.value,
      newVal => {
        raw.value = toMarkdown(newVal)
      }
    )
    const toggleEditor = () => {
      rawEditor.value = !rawEditor.value
      if (rawEditor) {
        // TODO: evaluate json data
      }
    }

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
    watch([data, raw], () => {
      api.put(`/pages${props.file.path}`, {
        data: rawEditor ? false : data.value,
        content: raw.value
      })
    })

    return {
      rawEditor,
      frontmatter,
      content,
      raw,
      // events
      toggleEditor
    }
  }
})
</script>

<style lang="postcss" scoped>
textarea {
  @apply whitespace-nowrap overflow-scroll;
}
</style>
