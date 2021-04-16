<template>
  <div
    v-if="toc.length"
    class="sticky left-0 flex-none w-full pl-4 mr-8 text-sm bg-white border-b border-gray-100 xl:relative xl:border-0 dark:border-gray-800 blur-header bg-opacity-80 dark:bg-gray-900 dark:bg-opacity-80 xl:bg-transparent lg:left-60 xl:left-0 sm:pl-6 xl:pl-8 xl:w-64 top-header xl:block xl:top-0"
  >
    <button
      class="relative z-10 flex items-center w-full py-3 text-sm font-semibold text-gray-900 focus:outline-none xl:hidden dark:text-gray-100"
      @click="showMobileToc = !showMobileToc"
    >
      <span class="mr-2">{{ title || $t('toc.title') }}</span>
      <IconChevronRight
        class="w-4 h-4 text-gray-400 transition-transform duration-100 transform"
        :class="[showMobileToc ? 'rotate-90' : 'rotate-0']"
      />
    </button>

    <div
      :class="[showMobileToc ? 'flex' : 'hidden xl:flex']"
      class="flex flex-col justify-between overflow-y-auto sticky max-h-(screen-header) -mt-10 pt-10 pb-4 top-header"
    >
      <PageTocTop />

      <h5 class="items-center hidden mb-2 xl:flex">
        <span class="text-sm font-semibold text-gray-900 dark:text-gray-100">{{ title || $t('toc.title') }}</span>
      </h5>

      <ul class="font-medium">
        <li v-for="link of mockedToc" :key="link.id" @click="showMobileToc = false">
          <a
            :href="`#${link.id}`"
            class="block py-1 transition-colors duration-100 transform"
            :class="{
              'text-gray-600 dark:text-gray-300 hover:text-primary-400 dark:hover:text-primary-400':
                activeHeadings.includes(link.id) || isActiveParent(link),
              'text-gray-400 dark:text-gray-500 hover:text-primary-500 dark:hover:text-primary-400':
                !activeHeadings.includes(link.id) && !isActiveParent(link)
            }"
            @click.prevent="scrollToHeading(link.id, '--docs-scroll-margin-block')"
          >
            {{ link.text }}
          </a>

          <ul v-if="link.children" class="overflow-x-hidden font-medium">
            <li v-for="childLink in link.children" :key="childLink.id">
              <a
                :href="`#${childLink.id}`"
                :class="{
                  'text-gray-600 dark:text-gray-300 hover:text-primary-400 dark:hover:text-primary-400': activeHeadings.includes(
                    childLink.id
                  ),
                  'text-gray-400 dark:text-gray-500 hover:text-primary-500 dark:hover:text-primary-400': !activeHeadings.includes(
                    childLink.id
                  )
                }"
                class="pl-3 block py-1 transition-colors duration-100 transform"
                @click.prevent="scrollToHeading(childLink.id, '--docs-scroll-margin-block')"
              >
                {{ childLink.text }}
              </a>
            </li>
          </ul>
        </li>
      </ul>
      <PageTocBottom />
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from '@nuxtjs/composition-api'
import { useScrollspy } from '../../app/composables'
import { scrollToHeading } from '../utils'

export default defineComponent({
  props: {
    toc: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: null
    }
  },
  setup(props) {
    const showMobileToc = ref(false)
    const mockedToc = ref([])
    const { activeHeadings, visibleHeadings, updateHeadings } = useScrollspy()

    // temporary mock structured toc
    props.toc.forEach(item => {
      if (item.depth === 2) {
        mockedToc.value.push(item)
      } else if (item.depth === 3) {
        const parent = mockedToc.value[mockedToc.value.length - 1]
        if (parent && parent.depth === 2) {
          if (!parent.children) {
            parent.children = []
          }
          parent.children.push(item)
        } else {
          mockedToc.value.push(item)
        }
      }
    })

    onMounted(() =>
      updateHeadings([
        ...document.querySelectorAll('.nuxt-content h2'),
        ...document.querySelectorAll('.nuxt-content h3')
      ])
    )

    const isActiveParent = link => {
      return link.children && link.children.some(child => activeHeadings.value.includes(child.id))
    }

    return {
      visibleHeadings,
      activeHeadings,
      showMobileToc,
      mockedToc,
      scrollToHeading,
      isActiveParent
    }
  }
})
</script>
