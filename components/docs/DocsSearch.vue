<script setup lang="ts">
import { useFuse } from '@vueuse/integrations/useFuse'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
})

type DocusSearchResult = {
  id: string
  path: string
  dir: string
  title: string
  description: string
  keywords: string[]
  body?: any[]
}

const emit = defineEmits(['update:modelValue'])

const q = ref('')
const searchInputRef = ref<HTMLInputElement>()
const resultsAreaRef = ref<HTMLDivElement>()
const selected = ref(-1)

const { navigation } = useContent()

const { data: files } = await useLazyAsyncData<DocusSearchResult[]>(
  'search-api',
  () => $fetch('/api/search')
)

const { results } = useFuse<DocusSearchResult>(
  q,
  files as any,
  {
    fuseOptions: {
      keys: [
        'title',
        'description',
        'keywords',
        'body'
      ],
      ignoreLocation: true,
      threshold: 0,
      includeMatches: true,
      includeScore: true,
    },
    matchAllWhenSearchEmpty: true
  }
)

function findNavItem(
  children: any,
  path: string,
  parent: any
) {
  for (const child of children) {
    if (child._path === path) {
      return {
        directoryTitle: parent.title,
        directoryIcon: parent.icon
      }
    }
    if (child.children) {
      const result: any = findNavItem(child.children, path, child)
      if (result) {
        return result
      }
    }
  }
  return undefined
}

function getNavItemMeta(
  path: string
) {
  let result
  for (const item of navigation.value) {
    if (item.children) {
      const found = findNavItem(item.children, path, item)
      if (found) { result = found }
    }
  }
  return result
}

function highlight(
  text: string,
  result: any
): string {
  const { indices, value }: { indices: number[][], value: string } = result || { indices: [], value: '' }

  if (text === value) return ''

  let content = ''
  let nextUnhighlightedIndiceStartingIndex = 0

  indices.forEach((indice) => {
    const lastIndiceNextIndex = indice[1] + 1
    const isMatched = (lastIndiceNextIndex - indice[0]) >= q.value.length

    content += [
      value.substring(nextUnhighlightedIndiceStartingIndex, indice[0]),
      isMatched && '<mark>',
      value.substring(indice[0], lastIndiceNextIndex),
      isMatched && '</mark>'
    ].filter(Boolean).join('')

    nextUnhighlightedIndiceStartingIndex = lastIndiceNextIndex
  })

  content += value.substring(nextUnhighlightedIndiceStartingIndex)

  const index = content.indexOf('<mark>')

  if (index > 60) {
    content = `${content.substring(index - 60)}`
  }

  return `${content}”`
}

function down() {
  if (selected.value === -1) { selected.value = 0 }
  else if (selected.value === results.value.length - 1) { /* Do nothing  */ }
  else { selected.value = selected.value + 1 }
}

function up() {
  if (selected.value === -1) { selected.value = results.value.length - 1 }
  else if (selected.value === 0) { /* Do nothing */ }
  else { selected.value = selected.value - 1 }
}

function go(index: number) {
  const selectedItem = results?.value?.[index]?.item
  const path = selectedItem?.path

  if (path) {
    // show.value = false
    emit('update:modelValue')
    useRouter().push(path)
  }
}

function closeButtonHandler() {
  if (q.value) {
    q.value = ''
    selected.value = -1
    searchInputRef.value?.focus?.()
  } else {
    emit('update:modelValue')
  }
}

// Scroll to selected item on change
watch(selected, value => {
  const nextId = results?.value?.[value]?.item?.id
  if (nextId) document.querySelector(`[id="${nextId}"]`)?.scrollIntoView({ block: 'nearest' })
})

// Reset selected item on search change
watch(
  q,
  _ => { selected.value = 0 }
)

// Reset local data when modal closing
watch(() => props.modelValue, (value) => {
  if (!value) {
    q.value = ''
    selected.value = -1
  }
})
</script>

<template>
  <Modal
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue')"
  >
    <div class="search-content w-full h-full flex justify-center">
      <div
        class="search-window flex flex-col overflow-hidden border border-primary-static sm:rounded-xs sm:mt-[20vh] sm:mx-4 w-full max-w-[640px] h-fit max-h-full sm:max-h-[320px] backdrop-blur-xl"
        @click.stop
      >
        <div
          class="search-input flex items-center bg-gray-200 dark:bg-gray-800 bg-opacity-50 dark:bg-opacity-50"
        >
          <Icon
            name="heroicons-outline:search"
            class="search-icon shrink-0 w-5 h-5 mx-4 text-tertiary-static"
          />
          <input
            ref="searchInputRef"
            v-model="q"
            type="text"
            placeholder="Search documentation"
            class="w-full bg-transparent outline-none py-3 text-primary-static placeholder:text-gray-500 dark:placeholder:text-gray-400 placeholder:opacity-50 dark:placeholder:opacity-50"
            @keydown.up.prevent="up"
            @keydown.down.prevent="down"
            @keydown.enter="go(selected)"
          >
          <button
            class="close-button flex p-3"
            @click="closeButtonHandler"
          >
            <Icon
              name="heroicons:x-mark"
              class="close-icon shrink-0 w-5 h-5 text-secondary-static"
            />
          </button>
        </div>
        <div
          v-if="results.length > 0"
          ref="resultsAreaRef"
          class="search-results overflow-auto flex flex-col"
        >
          <div
            v-for="(result, i) in results"
            :id="result.item.id"
            :key="result.item.id"
            class="search-result flex flex-col cursor-pointer py-3 px-2 gap-2 [&.selected]:bg-gray-300 [&.selected]:dark:bg-gray-700 [&.selected]:bg-opacity-50 [&.selected]:dark:bg-opacity-50"
            :class="[ selected === i && 'selected']"
            @click="go(selected)"
            @mouseenter.prevent="selected = i"
          >
            <div class="search-result-content-head flex items-center gap-2">
              <Icon
                v-if="getNavItemMeta(result?.item?.path)?.directoryIcon"
                :name="getNavItemMeta(result?.item?.path)?.directoryIcon"
                class="shrink-0 opacity-50 w-5 h-5 mx-2"
              />
              <Icon
                v-else
                name="solar:documents-bold-duotone"
                class="shrink-0 opacity-50 w-5 h-5 mx-2"
              />
              <span
                v-if="getNavItemMeta(result?.item?.path)?.directoryTitle"
                class="whitespace-nowrap"
              >
                {{ getNavItemMeta(result?.item?.path)?.directoryTitle }}
                <span
                  class="arrow opacity-50"
                  v-html="`→`"
                />
              </span>
              <span class="whitespace-nowrap">
                {{ result.item.title }}
              </span>
            </div>
            <p
              v-if="result?.matches?.[0]"
              class="search-result-content-preview truncate relative text-secondary-static"
            >
              <span>“</span>
              <span
                class="[&_mark]:bg-primary-500 [&_mark]:text-white"
                v-html="`${highlight(q, result?.matches?.[0] as any)}`"
              />
              <span>“</span>
            </p>
          </div>
        </div>

        <div
          v-else-if="!q"
          class="h-20 flex items-center justify-center text-tertiary-static"
        >
          Type your query to search docs
        </div>

        <div
          v-else
          class="h-20 flex items-center justify-center text-tertiary-static"
        >
          No results found. Try another query
        </div>
      </div>
    </div>
  </Modal>
</template>

<style scoped>
@media (prefers-reduced-motion: reduce) {
  .search-window {
    transition: all 0ms !important;
  }
}

.modal-enter-active .search-window,
.modal-leave-active .search-window {
  transition: transform 200ms theme('transitionTimingFunction.in-out-circ'), opacity 200ms theme('transitionTimingFunction.in-out-circ');
}

.modal-enter-from .search-window,
.modal-leave-to .search-window {
  opacity: 0;
  transform: scale(0.9);
}
</style>
