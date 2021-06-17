<template>
  <HomeSection class="pb-20 light:bg-gray-50 dark:bg-secondary-darkest">
    <template #section-content>
      <SectionContent class="col-span-12 items-center">
        <template #category>
          <CategoryLabel label="Community" />
        </template>

        <template #title>
          <SectionTitle class="text-center">Sharing is <span class="text-primary italic">Caring</span></SectionTitle>
        </template>

        <template #content>
          <ul class="grid grid-cols-1 sm:grid-cols-2 gap-16 sm:gap-8 lg:gap-16 py-8">
            <li v-for="post in posts" :key="post.title" class="flex flex-col self-start">
              <NuxtLink :to="post.to">
                <div
                  class="aspect-w-16 aspect-h-9 bg-gray-100 overflow-hidden dark:bg-secondary-darker mb-4 rounded-lg"
                >
                  <NuxtImg :src="post.imgUrl" width="864" height="378" :alt="post.title" />
                </div>
              </NuxtLink>
              <span class="text-cloud-light text-body-base lg:text-body-lg font-bold mb-2">{{ post.category }}</span>
              <h3 class="text-body-xl lg:text-body-2xl font-bold mb-2">{{ post.title }}</h3>
              <p class="mb-4 text-body-base lg:text-body-lg">{{ post.description }}</p>
              <MMarketingLink color="primary-green" name="Read article" icon="IconChevronRight" :to="post.to" />
            </li>
          </ul>
        </template>
      </SectionContent>
    </template>
  </HomeSection>
</template>
<script>
import { defineComponent, ref, useContext, useFetch } from '@nuxtjs/composition-api'
export default defineComponent({
  setup() {
    const { $docus } = useContext()
    const posts = ref()
    useFetch(async () => {
      const documents = await $docus.search('/blog/', { deep: true }).sortBy('position', 'desc').limit(2).fetch()

      posts.value = documents.reverse()
    })
    return {
      posts
    }
  }
})
</script>
