<template>
  <HomeSection class="py-20 light:bg-gray-50 dark:bg-secondary-darkest">
    <template #section-content>
      <SectionContent class="col-span-12 items-center">
        <template #category>
          <CategoryLabel label="Learn" />
        </template>

        <template #title>
          <SectionTitle class="text-center">Follow our <span class="text-terciary italic">Guides</span></SectionTitle>
        </template>

        <template #paragraph>
          <SectionDescription class="pb-16 text-center"
            >From an Idea to a Masterpiece, guides show the path to follow to become a Nuxter.</SectionDescription
          >
        </template>

        <template #content>
          <ul class="grid grid-cols-1 sm:grid-cols-3 gap-20 pb-8">
            <li v-for="guide in guides" :key="guide.title" class="flex flex-col items-center space-y-4">
              <img :src="`/img/home/learn/guides/${guide.icon}.svg`" class="h-32" />
              <h5 class="font-bold text-center">{{ guide.title }}</h5>
              <p class="text-center">{{ guide.description }}</p>
            </li>
          </ul>
        </template>

        <template #button>
          <SectionButton
            to="#"
            aria-label="Learn more"
            size="sm"
            class="bg-primary-green text-gray-800 font-semibold hover:bg-green-300 focus:bg-green-300"
          >
            Learn more
          </SectionButton>
        </template>
      </SectionContent>
    </template>
  </HomeSection>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  setup() {
    const guides = [
      {
        title: 'Usage',
        description: 'NuxtJS has been a discovery for our development teams.',
        icon: 'gem-usage'
      },
      {
        title: 'Internals',
        description: 'NuxtJS has been a discovery for our development teams.',
        icon: 'gem-internals'
      },
      {
        title: 'API References',
        description: 'NuxtJS has been a discovery for our development teams.',
        icon: 'gem-api'
      }
    ]

    return {
      guides
    }
  }
})
</script>
