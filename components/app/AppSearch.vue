<script setup lang="ts">
import { useFuse } from '@vueuse/integrations/useFuse'
const { navigation } = useContent()

const show = ref(false)

const q = ref('')

const searchResults = ref([])

const { data: files } = await useLazyAsyncData('components', () => queryContent('components').where({ _type: 'markdown', navigation: { $ne: false } }).find(), { default: () => [] })

const { results } = useFuse(q, files, {
  fuseOptions: {
    keys: [
      'title',
      'description',
    ],
    ignoreLocation: true,
    threshold: 0,
    includeMatches: true,
    includeScore: true,
  },
  matchAllWhenSearchEmpty: false
})

console.log('files', files.value)
console.log('results', results.value)

function findNavItem (children: any, path: string, parent: any) {
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

function getNavItemMeta (path: string) {
  let result
  for (const item of navigation.value) {
    if (item.children) {
      const found = findNavItem(item.children, path, item)
      if (found) {
        result = found
      }
    }
  }
  return result
}

function highlight(text: string, { indices, value }: { indices: number[][], value: string }): string {
  if (text === value) {
    return ''
  }

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

// console.log('HIGHLIGHT', highlight(q.value, results.value[0].matches[0]))

// watch(q, async (value) => {
//   // debouncedSearch()
//   console.log('search', value)
//   await fuse.value.search(value)
// })

watch(results, (value) => {
  console.log('results', value)
})
</script>

<template>
  <div>
    <button @click="show = !show">
      search
    </button>

    <Modal v-model="show">
      <div class="search-content">
        <div
          class="search-window"
          @click.stop
        >
          <input
            v-model="q"
            type="text"
          >
          <div v-if="results.length">
            <div v-for="result in results">
              <a
                :href="result.item._path"
                class="search-link"
              >
                <span>
                  {{ getNavItemMeta(result?.item?._path)?.directoryTitle }}
                </span>
                →
                <span>
                  {{ result.item.title }}
                </span>
                →
                <span v-html="highlight(q, result.matches?.[0])" />
              </a>
            </div>
            <!-- <div v-html="highlight(q, results?.[0].matches?.[0])"></div> -->
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
      padding: '1rem',
      border: '1px solid {elements.border.primary.static}',
      backgroundColor: '{elements.surface.primary.backgroundColor}',
      borderRadius: '0.5rem',
      marginTop: '20vh',
      width: '640px',
      height: 'fit-content',
      maxHeight: '320px',
      transition: 'all 200ms',
      '.search-link': {
        my: '0.5rem',
        truncate: true,
        display: 'flex',
        gap: '0.5rem',
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
  transition: transform 200ms $dt('ease.back.out'), opacity 200ms $dt('ease.back.out');
}

.modal-enter-from .search-window,
.modal-leave-to .search-window {
  opacity: 0;
  transform: translate3d(0, 25px, 0);
}
</style>
