<template>
  <div>
    <HomeSection class="pt-40 pb-20">
      <template #section-content>
        <SectionContent class="col-span-12 items-center">
          <template #category>
            <CategoryLabel label="Discover" />
          </template>

          <template #title>
            <SectionTitle class="pb-16 text-center">
              Intuitive <span class="text-primary-green italic">D</span>eveloper E<span
                class="text-primary-green italic"
                >x</span
              >perience
            </SectionTitle>
          </template>

          <template #content>
            <ul class="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-12">
              <SectionContentItem
                v-for="exp in experiences"
                :key="exp.title"
                :image="`/img/home/discover/dx/${exp.icon}.svg`"
                :title="exp.title"
                :description="exp.description"
              />
            </ul>
          </template>
        </SectionContent>
      </template>
    </HomeSection>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const experiences = [
      {
        title: 'Zero Configuration',
        description: 'Start coding your app right away, Nuxt takes care of the rest.',
        icon: 'zero-config'
      },
      {
        title: 'File-system Routing',
        description: 'Automatic routing and code-splitting every pages.',
        icon: 'file-system-routing'
      },

      {
        title: 'Rendering Modes',
        description: 'Switch between static-site generation or on-demand server rendering.',
        icon: 'hybrid'
      },

      {
        title: 'Data Fetching',
        description: 'Fetch your content from any source in your Vue components, SSR ready.',
        icon: 'typescript'
      },
      {
        title: 'Strong Conventions',
        description: 'Efficient teamwork with a strong directry structure and conventions.',
        icon: 'auto-inject'
      },
      {
        title: 'SEO Friendly',
        description: 'Meta Tags management and faster time-to-content for a great indexing.',
        icon: 'seo'
      },
      {
        title: 'Components Auto-import',
        description: 'Use your components, Nuxt will import them with smart code-splitting.',
        icon: 'auto-inject'
      },
      {
        title: 'Modules Ecosystem',
        description: 'Extend your app with 160+ Nuxt modules and create your own.',
        icon: 'modular'
      }
    ]

    return {
      experiences
    }
  }
})
</script>
