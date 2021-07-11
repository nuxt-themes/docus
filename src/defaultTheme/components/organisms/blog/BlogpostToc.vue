<template>
  <div
    v-if="toc.length"
    class="sticky z-10 px-4 text-sm border-dashed top-header d-border-header d-blur-header d-page-mobile-toc-bg"
  >
    <button
      class="
        relative
        z-10
        flex
        items-center
        w-full
        py-3
        text-sm
        font-semibold
        text-gray-900
        focus:outline-none
        dark:text-gray-100
      "
      @click="showMobileToc = !showMobileToc"
    >
      <span class="mr-2">{{ title || $t('toc.title') }}</span>
      <IconChevronRight
        class="w-4 h-4 d-tertiary-text transition-transform duration-100 transform"
        :class="[showMobileToc ? 'rotate-90' : 'rotate-0']"
      />
    </button>

    <ul :class="[showMobileToc ? 'flex flex-col' : 'hidden']" class="pb-4 overflow-x-hidden font-medium">
      <li v-for="link of filteredToc" :key="link.id" @click="showMobileToc = false">
        <a
          :href="`#${link.id}`"
          class="block py-1 transition-colors duration-100 transform"
          :class="{
            'd-secondary-text-active hover:d-secondary-text-hover': activeHeadings.includes(link.id),
            'd-secondary-text hover:d-secondary-text-hover': !activeHeadings.includes(link.id)
          }"
          @click.prevent="scrollToHeading(link.id, '--blogpost-scroll-margin-block')"
          >{{ link.text }}</a
        >
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent, reactive, computed, toRefs, onMounted } from '@nuxtjs/composition-api'
import { useScrollspy } from '../../../composables'
import { scrollToHeading } from '../../../utils/dom'

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
    const state = reactive({
      activeLink: '',
      exactActiveLink: '',
      showMobileToc: false
    })
    const { activeHeadings, updateHeadings } = useScrollspy()

    onMounted(() =>
      updateHeadings([
        ...document.querySelectorAll('.docus-content h1'),
        ...document.querySelectorAll('.docus-content h2'),
        ...document.querySelectorAll('.docus-content h3')
      ])
    )

    const filteredToc = computed(() => {
      const toc = [...props.toc]
      toc.shift()
      return toc
    })

    return {
      ...toRefs(state),
      activeHeadings,
      scrollToHeading,
      filteredToc
    }
  }
})
</script>
