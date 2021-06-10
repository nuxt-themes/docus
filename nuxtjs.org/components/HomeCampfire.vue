<template>
  <HomeSection class="pb-20 light:bg-gray-50 dark:bg-secondary-darkest">
    <template #section-content>
      <SectionContent class="col-span-12 items-center">
        <template #category>
          <CategoryLabel label="Campfire" />
        </template>

        <template #title>
          <SectionTitle class="text-center"
            >Sharing is <span class="text-primary-green italic">Caring</span></SectionTitle
          >
        </template>

        <template #content>
          <ul class="grid grid-cols-1 sm:grid-cols-2 gap-12 sm:gap-8 lg:gap-16 py-8">
            <li v-for="(article, index) in articles" :key="article.title" class="flex flex-col self-start">
              <img :src="`/img/home/campfire/article-${index + 1}.svg`" class="mb-4 h-2/3" />
              <span class="text-primary-green text-body-base lg:text-body-lg font-bold mb-2">{{
                article.category
              }}</span>
              <h3 class="text-body-xl lg:text-body-2xl font-bold mb-2">{{ article.title }}</h3>
              <p class="mb-4 text-body-base lg:text-body-lg">{{ article.description }}</p>
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
