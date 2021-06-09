<template>
  <div>
    <HomeSection class="pt-40 pb-20 dark:bg-secondary-dark">
      <template #section-content>
        <SectionContent class="col-span-12 items-center">
          <template #category>
            <span class="text-terciary font-bold text-lg">Discover</span>
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
            <ul class="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12">
              <li v-for="exp in experiences" :key="exp.title">
                <div class="flex flex-col items-center space-y-4">
                  <img :src="`/img/home/discover/dx/${exp.icon}.svg`" :alt="`A ${exp.title} image`" />
                  <h5 class="text-center font-bold">{{ exp.title }}</h5>
                  <p class="text-center text-sm">{{ exp.description }}</p>
                </div>
              </li>
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
