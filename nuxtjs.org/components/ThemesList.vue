<template>
  <div class="px-6 mb-8">
    <div class="flex flex-wrap grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <ContentCardTemplate
        v-for="({ title, description, image, price, href }, id) in themes"
        :key="id"
        class=""
        :title="title"
        :description="description"
        :image="image"
        :href="href"
      >
        <div slot="footer" class="px-4 mb-4 mt-auto">
          <SectionButton :to="href" size="md" class="bg-primary text-gray-800 hover:bg-green-300 focus:bg-green-300">
            Get it for {{ price }}
          </SectionButton>
        </div>
      </ContentCardTemplate>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    themes: {
      type: Object,
      default: () => {}
    }
  }
})
</script>
