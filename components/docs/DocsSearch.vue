<script setup lang="ts">
import { useFuse } from '@vueuse/integrations/useFuse'
const { navigation } = useContent()

defineProps({
  rememberResult: {
    type: Boolean,
    default: true
  }
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

const show = ref(false)

const q = ref('')

const resultsAreaRef = ref(null)

const selected = ref(-1)

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

function findNavItem (children: any, path: string, parent: any) {
  for (const child of children) {
    if (child.path === path) {
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

function getNavItemMeta(path?: string) {
  if (!path) return undefined

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
    content = `...${content.substring(index - 60)}`
  }

  return content
}

function down () {
  if (selected.value === -1) { selected.value = 0 }
  else if (selected.value === results.value.length - 1) { /* Do nothing  */ }
  else { selected.value = selected.value + 1 }
}

function up () {
  if (selected.value === -1) { selected.value = results.value.length - 1 }
  else if (selected.value === 0) { /* Do nothing */ }
  else { selected.value = selected.value - 1 }
}

function go(index: number) {
  const selectedItem = results?.value?.[index]?.item
  const path = selectedItem?.path

  console.log({selectedItem})

  if (path) {
    show.value = false
    useRouter().push(path)
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
watch(show, (value) => {
  if (!value) {
    q.value = ''
    selected.value = -1
  }
})
</script>

<template>
  <div>
    <DocsSearchButton @click="show = !show" />
    <Modal v-model="show">
      <div class="search-content">
        <div
          class="search-window"
          @click.stop
        >
          <div class="search-input">
            <input
              v-model="q"
              type="text"
              @keydown.up.prevent="up"
              @keydown.down.prevent="down"
              @keydown.enter="go(selected)"
            >
          </div>
          <div
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
            >
              <Icon
                v-if="getNavItemMeta(result?.item?.path)?.directoryIcon"
                :name="getNavItemMeta(result?.item?.path)?.directoryIcon"
              />
              <span>
                {{ getNavItemMeta(result?.item?.path)?.directoryTitle }}
              </span>
              →
              <span>
                {{ result.item.title }}
              </span>
              →
              <span v-html="highlight(q, result?.matches?.[0] as any)" />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<style scoped lang="ts">
css({
  '.search-content': {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    // alignItems: 'center',
    '.search-window': {
      display: 'flex',
      flexDirection: 'column',
      // padding: '1rem',
      border: '1px solid {elements.border.primary.static}',
      backgroundColor: '{elements.surface.primary.backgroundColor}',
      borderRadius: '0.5rem',
      marginTop: '20vh',
      width: '640px',
      height: 'fit-content',
      maxHeight: '320px',
      transition: 'all 200ms',
      overflow: 'hidden',
      '.search-input': {
        // border: '1px solid {elements.border.primary.static}',
        // borderRadius: '0.5rem',
        // backgroundColor: '{elements.surface.secondary.backgroundColor}',
        backgroundColor: '{color.gray.700}',
        // color: '{elements.text.primary.static}',
        input: {
          width: '100%',
          padding: '0.5rem',
          backgroundColor: 'transparent',
          '&:focus, &:focus-visible': {
            outline: 'none',
            // borderColor: '{elements.border.primary.focus}',
          }
        },
        '&:focus, &:focus-visible': {
          outline: 'none',
          // borderColor: '{elements.border.primary.focus}',
        }
      },
      '.search-results': {
        overflow: 'auto',
      },
      '.search-result': {
        my: '0.5rem',
        padding: '{space.1} {space.2}',
        truncate: true,
        display: 'flex',
        gap: '0.5rem',
        cursor: 'pointer',
        '&.selected': {
          backgroundColor: 'red'
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
