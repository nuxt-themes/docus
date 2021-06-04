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
          <ALabel tag="span" class="text-primary-green font-bold text-lg"
            >Community</ALabel
          >
        </template>
        <template #title>
          <SectionTitle class="text-center font-serif" size="sm"
            >Developer love it</SectionTitle
          >
        </template>
        <template #paragraph>
          <SectionDescription class="pb-16 text-center" size="md"
            >Be part of the Nuxt.js community and help us Nuxtify the
            world.</SectionDescription
          >
        </template>
        <template #content>
          <ul
            class="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-20 pb-8 sm:mx-20 md:mx-0"
          >
            <li
              v-for="testimonial in testimonials"
              :key="testimonial.author"
              class="relative flex flex-col items-center space-y-3 border-3 border-gray-200 rounded-lg px-4 pb-6"
            >
              <img
                :src="`/img/home/community/${testimonial.icon_author}.png`"
                class="absolute h-12 bottom-0 -mb-9"
              />
              <img
                :src="`/img/home/community/${testimonial.icon_job}.svg`"
                class="md:hidden lg:block absolute h-7 bottom-5 right-0 mr-4 mb-4"
              />
              <ALabel tag="p" class="text-center px-4 xl:px-16 2xl:px-12">{{
                testimonial.testimonial
              }}</ALabel>
              <ALabel tag="span" class="font-bold text-center text-base">{{
                testimonial.author
              }}</ALabel>
              <ALabel tag="span" class="text-center text-sm">{{
                testimonial.job
              }}</ALabel>
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
