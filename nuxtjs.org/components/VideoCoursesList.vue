<template>
  <div class="px-6 mb-8">
    <div class="flex flex-wrap grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <ContentCardTemplate
        v-for="({ title, description, image, tier, slug }, id) in videoCourses"
        :key="id"
        class=""
        :title="title"
        :description="description"
        :image="image"
        :slug="slug"
        :tags="[tier]"
      >
        <div slot="footer" class="px-4 mb-4 mt-auto">
          <SectionButton to="#" size="md" class="bg-primary text-gray-800 hover:bg-green-300 focus:bg-green-300">
            Start course
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
    videoCourses: {
      type: Object,
      default: () => {}
    }
  }
})
</script>
