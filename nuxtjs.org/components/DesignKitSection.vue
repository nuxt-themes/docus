<template>
  <div class="py-4 d-container-content">
    <div class="flex flex-col text-secondary-dark py-8">
      <h2 class="font-semibold text-xl">
        <Markdown slot="title" unwrap="p" />
      </h2>
      <hr class="mt-2 mb-4" />
      <Markdown slot="description" unwrap="p" class="text-lg" />
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
      required: true
    }
  }
  /* setup() {
    const { $docus } = useContext()
    const designKit = ref()

    useFetch(async () => {
      designKit.value = await $docus.search('/design-kit', { deep: true }).fetch()
    })
    console.log('sections', designKit)
    return {
      designKit
    }
  } */
})
</script>
