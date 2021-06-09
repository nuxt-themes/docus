<template>
  <HomeSection class="pb-20 light:bg-gray-50 dark:bg-secondary-darkest">
    <template #section-content>
      <SectionContent class="col-span-12 items-center">
        <template #category>
          <span class="text-primary-green font-bold text-lg">Campfire</span>
        </template>

        <template #title>
          <SectionTitle class="text-center">Sharing is <span class="text-terciary italic">Caring</span></SectionTitle>
        </template>

        <template #content>
          <ul class="grid grid-cols-1 sm:grid-cols-2 gap-20 sm:gap-12 md:gap-16 lg:gap-24 xl:gap-32 2xl:gap-40 py-8">
            <li v-for="(article, index) in articles" :key="article.title" class="flex flex-col self-start space-y-4">
              <img :src="`/img/home/campfire/article-${index + 1}.svg`" class="h-2/3" />
              <span class="text-primary-green font-bold">{{ article.category }}</span>
              <h4 class="text-lg font-bold">{{ article.title }}</h4>
              <p>{{ article.description }}</p>
              <MMarketingLink color="primary-green" name="Read article" icon="IconChevronRight" :to="'#'" />
            </li>
          </ul>
        </template>
      </SectionContent>
    </template>
  </HomeSection>
</template>
<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  setup() {
    const articles = [
      {
        category: 'Tips',
        title: 'Creating a Nuxt Module',
        description: 'Lorem ipsum dolor sit amet dolor sit amet dolsor sit amet, consectetur adipiscing elit, se...'
      },
      {
        category: 'Tips',
        title: 'Improve your developer experience with Nuxt Components',
        description: 'Lorem ipsum dolor sit amet dolor sit amet dolor sit amet, consectetur adipiscing elit, se...'
      }
    ]

    return {
      articles
    }
  }
})
</script>
