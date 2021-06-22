<template>
  <div class="py-4 d-container-content">
    <div class="flex flex-col light:text-secondary-dark dark:text-white py-8">
      <h2 class="font-semibold text-xl">
        <Markdown use="title" unwrap="p" />
      </h2>
      <hr class="mt-2 mb-4" />
      <Markdown use="description" class="text-lg" />
      <Component :is="sectionComponent" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { Markdown } from '~docus/utils'

export default defineComponent({
  components: { Markdown },
  props: {
    sectionComponent: {
      type: String,
      default: null
    }
  }
})
</script>
