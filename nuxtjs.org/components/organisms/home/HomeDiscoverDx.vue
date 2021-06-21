<template>
  <div>
    <HomeSection class="pt-40 pb-20">
      <template #section-content>
        <SectionContent class="col-span-12 items-center">
          <template #category>
            <span class="text-tertiary font-bold text-lg">Discover</span>
          </template>

          <template #title>
            <SectionTitle class="pb-16 text-center">
              Intuitive <span class="text-primary italic">D</span>eveloper E<span class="text-primary italic">x</span
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
        description: 'Automatic compilation and bundling. Optimised for production from the start.',
        icon: 'zero-config'
      },
      {
        title: 'File-system Routing',
        description: 'Automatic compilation and bundling. Optimised for production from the start.',
        icon: 'file-system-routing'
      },
      {
        title: 'Components Auto-import',
        description: 'Automatic compilation and bundling. Optimised for production from the start.',
        icon: 'auto-import'
      },
      {
        title: 'Plugins Auto-injection',
        description: 'Automatic compilation and bundling. Optimised for production from the start.',
        icon: 'auto-inject'
      },
      {
        title: 'Hybrid: SSG or SSR',
        description: 'Automatic compilation and bundling. Optimised for production from the start.',
        icon: 'hybrid'
      },
      {
        title: 'Modular Architecture',
        description: 'Automatic compilation and bundling. Optimised for production from the start.',
        icon: 'modular'
      },
      {
        title: 'TypeScript Support',
        description: 'Automatic compilation and bundling. Optimised for production from the start.',
        icon: 'typescript'
      },
      {
        title: 'SEO Friendly',
        description: 'Automatic compilation and bundling. Optimised for production from the start.',
        icon: 'seo'
      }
    ]

    return {
      experiences
    }
  }
})
</script>
