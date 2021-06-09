<template>
  <HomeSection class="dark:bg-secondary-dark">
    <template #header-illustration>
      <img
        loading="lazy"
        :src="`/img/home/explore/dark/landscape-explore.svg`"
        class="w-full h-40 object-fill left-0 pb-32 light:hidden"
        alt="A landscape image"
      />
      <img
        loading="lazy"
        :src="`/img/home/explore/light/landscape-explore.svg`"
        class="w-full h-40 object-fill left-0 pb-32 dark:hidden"
        alt="A landscape image"
      />
    </template>

    <template #section-content>
      <SectionContent class="col-span-12 items-center">
        <template #category>
          <CategoryLabel label="Explore" />
        </template>

        <template #title>
          <SectionTitle class="text-center"
            >Need to go <span class="text-terciary italic">Forward</span>? So much to
            <span class="text-terciary italic">Explore</span>.</SectionTitle
          >
        </template>

        <template #content>
          <ul class="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-6 py-8">
            <SectionContentItem
              v-for="(explore, index) in explores"
              :key="explore.title"
              :title="explore.title"
              :description="explore.description"
            >
              <template #image>
                <div class="relative group transition-opacity duration-500 relative mb-4">
                  <img
                    :src="`/img/home/explore/gem-${index + 1}-hover.svg`"
                    class="absolute bottom-0 opacity-0 hover:opacity-100 z-20 transition-opacity duration-500 h-32"
                  />
                  <img
                    :src="`/img/home/explore/gem-${index + 1}.svg`"
                    class="hover:opacity-0 z-10 transition-opacity duration-500 h-32"
                  />
                </div>
              </template>
            </SectionContentItem>
          </ul>
        </template>

        <template #button>
          <SectionButton
            to="#"
            aria-label="Explore more"
            size="sm"
            class="bg-primary-green text-gray-800 font-semibold hover:bg-green-300 focus:bg-green-300"
          >
            Explore more
          </SectionButton>
        </template>
      </SectionContent>
    </template>

    <template #footer-illustration>
      <img
        loading="lazy"
        :src="`/img/home/campfire/dark/landscape-campfire.svg`"
        class="w-full h-40 object-fill left-0 mt-32 light:hidden"
        alt="A landscape image"
      />
      <img
        loading="lazy"
        :src="`/img/home/campfire/light/landscape-campfire.svg`"
        class="w-full h-40 object-fill left-0 mt-32 dark:hidden"
        alt="A landscape image"
      />
    </template>
  </HomeSection>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  setup() {
    const explores = [
      {
        title: 'Examples',
        description: 'NuxtJS has been a discovery for our development teams.'
      },
      {
        title: 'Integrations',
        description: 'NuxtJS has been a discovery for our development teams.'
      },
      {
        title: 'Modules',
        description: 'NuxtJS has been a discovery for our development teams.'
      },
      {
        title: 'Starters',
        description: 'NuxtJS has been a discovery for our development teams.'
      }
    ]

    return {
      explores
    }
  }
})
</script>
