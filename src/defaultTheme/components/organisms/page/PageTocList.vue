<template>
  <ul class="font-medium ml-4">
    <li v-for="link of toc" :key="link.id" @click="$emit('click')">
      <a
        :href="`#${link.id}`"
        class="block py-1 transition-colors duration-100 transform"
        :class="{
          'd-secondary-text-active hover:d-secondary-text-hover':
            activeHeadings.includes(link.id) || isActiveParent(link),
          'd-secondary-text hover:d-secondary-text-hover': !activeHeadings.includes(link.id) && !isActiveParent(link)
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
              'd-secondary-text-active hover:d-secondary-text-hover': activeHeadings.includes(childLink.id),
              'd-secondary-text hover:d-secondary-text-hover': !activeHeadings.includes(childLink.id)
            }"
            class="block py-1 pl-3 transition-colors duration-100 transform"
            @click.prevent="scrollToHeading(childLink.id, '--docs-scroll-margin-block')"
          >
            {{ childLink.text }}
          </a>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
import { defineComponent, onMounted } from '@nuxtjs/composition-api'
import { useScrollspy } from '../../../composables'
import { scrollToHeading } from '../../../utils'

export default defineComponent({
  props: {
    toc: {
      type: Array,
      default: () => []
    }
  },
  setup() {
    const { activeHeadings, visibleHeadings, updateHeadings } = useScrollspy()

    onMounted(() =>
      setTimeout(() => {
        updateHeadings([
          ...document.querySelectorAll('.docus-content h1'),
          ...document.querySelectorAll('.docus-content h2'),
          ...document.querySelectorAll('.docus-content h3')
        ])
      }, 200)
    )

    const isActiveParent = link => {
      return link.children && link.children.some(child => activeHeadings.value.includes(child.id))
    }

    return {
      visibleHeadings,
      activeHeadings,
      scrollToHeading,
      isActiveParent
    }
  }
})
</script>
