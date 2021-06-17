<template>
  <div>
    <div v-for="(link, index) in links" :key="link.title">
      <h3
        class="font-semibold light:text-gray-400 dark:text-cloud-light text-lg"
        :class="{ 'mt-16 md:mt-0': index !== 0 }"
      >
        {{ link.title }}
      </h3>
      <ul class="mt-4 space-y-4">
        <li v-for="subLink in link.subLinks" :key="subLink.title">
          <ALink
            :href="subLink.href"
            :to="subLink.to"
            :aria-label="subLink.title"
            class="light:text-gray-500 dark:text-white"
            >{{ subLink.title }}</ALink
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    links: {
      type: Array,
      default: null
    }
  }
})
</script>
