<template>
  <HomeSection class="dark:bg-secondary-dark">
    <template #header-illustration>
      <img
        loading="lazy"
        :src="`/img/home/community/dark/landscape-community-t.svg`"
        class="w-full h-20 object-fill light:hidden"
        alt="A landscape image"
      />

      <img
        loading="lazy"
        :src="`/img/home/community/light/landscape-community-t.svg`"
        class="w-full h-20 object-fill dark:hidden"
        alt="A landscape image"
      />
    </template>

    <template #section-content>
      <SectionContent class="col-span-12 items-center pt-20 pb-60">
        <template #category>
          <CategoryLabel label="Community" />
        </template>

        <template #title>
          <SectionTitle class="text-center font-serif"
            >Developers <span class="text-primary-green italic">Love </span>it</SectionTitle
          >
        </template>

        <template #paragraph>
          <SectionDescription class="text-center"
            >Be part of the Nuxt.js community and help us Nuxtify the world.</SectionDescription
          >
        </template>

        <template #content>
          <ul class="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-8 lg:gap-16">
            <li
              v-for="testimonial in testimonials"
              :key="testimonial.author"
              class="
                relative
                flex flex-col
                items-center
                border-2 border-gray-200
                dark:border-secondary-light
                rounded-lg
                p-6
              "
            >
              <img :src="`/img/home/community/${testimonial.icon_author}.png`" class="absolute h-12 bottom-0 -mb-9" />
              <img
                :src="`/img/home/community/${testimonial.icon_job}.svg`"
                class="md:hidden lg:block absolute h-7 bottom-0 right-0 mr-4 mb-4"
              />
              <p class="text-center mb-4">{{ testimonial.testimonial }}</p>
              <span class="font-bold text-center text-base">{{ testimonial.author }}</span>
              <span class="text-center text-sm dark:text-secondary-lightest">{{ testimonial.job }}</span>
            </li>
          </ul>
        </template>
      </SectionContent>
    </template>

    <template #footer-illustration>
      <img
        loading="lazy"
        :src="`/img/home/community/dark/landscape-community-b.svg`"
        class="absolute w-full h-40 object-fill -mt-32 light:hidden"
        alt="A landscape image"
      />
      <img
        loading="lazy"
        :src="`/img/home/community/${$colorMode.value}/landscape-community-b.svg`"
        class="absolute w-full h-40 object-fill -mt-32 dark:hidden"
        alt="A landscape image"
      />
    </template>
  </HomeSection>
</template>
<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  setup() {
    const testimonials = [
      {
        testimonial:
          'Just migrated a few SPAs to @NuxtJS. Literally impossible to make the process any easier. Super impressive.',
        author: 'Evan You',
        icon_author: 'evan',
        job: 'Creator of VueJS',
        icon_job: 'vue'
      },
      {
        testimonial:
          'Just migrated a few SPAs to @NuxtJS. Literally impossible to make the process any easier. Super impressive.',
        author: 'Sarah Drasner',
        job: 'Core Team of VueJS',
        icon_author: 'sarah',
        icon_job: 'vue'
      },
      {
        testimonial:
          'Just migrated a few SPAs to @NuxtJS. Literally impossible to make the process any easier. Super impressive.',
        author: 'Addy Osmani',
        job: 'Chief Engineer of Chrome',
        icon_author: 'osman',
        icon_job: 'google'
      }
    ]

    return {
      testimonials
    }
  }
})
</script>
