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
    <div class="search-content">
      <div
        class="search-window"
        @click.stop
      >
        <div class="search-input">
          <Icon
            name="heroicons-outline:search"
            class="search-icon"
          />
          <input
            ref="searchInputRef"
            v-model="q"
            type="text"
            placeholder="Search documentation"
            @keydown.up.prevent="up"
            @keydown.down.prevent="down"
            @keydown.enter="go(selected)"
          >
          <button
            class="close-button"
            @click="closeButtonHandler"
          >
            <Icon
              name="heroicons:x-mark"
              class="close-icon"
            />
          </button>
        </div>
        <div
          v-if="results.length > 0"
          ref="resultsAreaRef"
          class="search-results"
        >
          <div
            v-for="(result, i) in results"
            :id="result.item.id"
            :key="result.item.id"
            class="search-result"
            :class="{ selected: selected === i }"
            @click="go(selected)"
            @mouseenter.prevent="selected = i"
          >
            <div class="search-result-content-wrapper">
              <div class="search-result-content-head">
                <Icon
                  v-if="getNavItemMeta(result?.item?.path)?.directoryIcon"
                  :name="getNavItemMeta(result?.item?.path)?.directoryIcon"
                />
                <Icon
                  v-else
                  name="solar:documents-bold-duotone"
                />
                <span v-if="getNavItemMeta(result?.item?.path)?.directoryTitle">
                  {{ getNavItemMeta(result?.item?.path)?.directoryTitle }}
                  <span
                    class="arrow"
                    v-html="`→`"
                  />
                </span>
                <span>
                  {{ result.item.title }}
                </span>
              </div>
              <p
                v-if="result?.matches?.[0]"
                class="search-result-content-preview"
              >
                <span>“</span>
                <span
                  v-html="`${highlight(q, result?.matches?.[0] as any)}`"
                />
                <span>“</span>
              </p>
            </div>
          </div>
        </div>

        <div
          v-else-if="!q"
          class="search-results empty"
        >
          Type your query to search docs
        </div>

        <div
          v-else
          class="search-results empty"
        >
          No results found. Try another query
        </div>
      </div>
    </div>
  </Modal>
</template>

<style scoped lang="ts">
css({
  '.search-content': {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',

    '.search-window': {
      display: 'flex',
      flexDirection: 'column',
      border: '1px solid {elements.border.primary.static}',
      borderRadius: '{docus.docs.search.results.window.borderRadius}',
      marginTop: '{docus.docs.search.results.window.marginTop}',
      width: '100%',
      maxWidth: '{docus.docs.search.results.window.maxWidth}',
      height: 'fit-content',
      maxHeight: '{docus.docs.search.results.window.maxHeight}',
      mx: '{docus.docs.search.results.window.marginX}',
      overflow: 'hidden',
      backdropFilter: '{docus.docs.search.backdropFilter}',

      '.search-input': {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '{docus.docs.search.input.backgroundColor}',
        '.search-icon': {
          color: '{elements.text.tertiary.color.static}',
          flexShrink: 0,
          marginLeft: '{space.4}',
          marginRight: '{space.4}',
          width: '{size.20}',
          height: '{size.20}',
        },
        '.close-button': {
          display: 'flex',
          padding: '{space.3}',
        },
        '.close-icon': {
          color: '{elements.text.secondary.color.static}',
          flexShrink: 0,
          width: '{size.20}',
          height: '{size.20}',
        },
        input: {
          width: '100%',
          padding: '{space.4} 0',
          color: '{elements.text.primary.color.static}',
          backgroundColor: 'transparent',
          '&:focus, &:focus-visible': {
            outline: 'none',
          },
          '&::placeholder': {
            color: '{elements.text.tertiary.color.static}',
            opacity: '0.5'
          }
        },
        '&:focus, &:focus-visible': {
          outline: 'none',
        }
      },

      '.search-results': {
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        '&.empty': {
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '{elements.text.tertiary.color.static}',
        }
      },

      '.search-result': {
        padding: '{space.1} {space.2}',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        '&.selected': {
          backgroundColor: '{docus.docs.search.results.selected.backgroundColor}',
        },
        '.search-result-content-wrapper': {
          display: 'flex',
          gap: '{space.2}',
          borderRadius: '{radii.2xs}',
          padding: '{space.2} 0',
          flexDirection: 'column',
          overflow: 'hidden'
        },
        '.search-result-content-head': {
          display: 'flex',
          alignItems: 'center',
          gap: '{space.2}',
          svg: {
            flexShrink: '0',
            opacity: '0.5',
            width: '{size.20}',
            height: '{size.20}',
            marginLeft: '{space.2}',
            marginRight: '{space.2}',
          },
          span: {
            whiteSpace: 'nowrap',
          },
          '.arrow': {
            opacity: '0.5'
          },
        },
        '.search-result-content-preview': {
          truncate: true,
          opacity: '0.6',
          position: 'relative',
        },
        ':deep(mark)': {
          color: 'white',
          backgroundColor: '{docus.docs.search.results.highlight.backgroundColor}',
        }
      }
    }
  }
})
</style>


<style scoped>
@media (prefers-reduced-motion: reduce) {
  .search-window {
    transition: all 0ms !important;
  }
}

.modal-enter-active .search-window,
.modal-leave-active .search-window {
  transition: transform 200ms $dt('ease.circ.inOut'), opacity 200ms $dt('ease.circ.inOut');
}

.modal-enter-from .search-window,
.modal-leave-to .search-window {
  opacity: 0;
  transform: scale(0.9);
}
</style>
