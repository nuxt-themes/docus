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
          <ALabel tag="span" class="text-primary-green font-bold text-lg">Community</ALabel>
        </template>
        <template #title>
          <SectionTitle class="text-center font-serif" size="sm">Developer love it</SectionTitle>
        </template>
        <template #paragraph>
          <SectionDescription class="pb-16 text-center" size="md"
            >Be part of the Nuxt.js community and help us Nuxtify the world.</SectionDescription
          >
        </template>
        <template #content>
          <ul class="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-20 pb-8 sm:mx-20 md:mx-0">
            <li
              v-for="testimonial in testimonials"
              :key="testimonial.author"
              class="
                relative
                flex flex-col
                items-center
                justify-between
                space-y-4
                border-3 border-gray-200
                rounded-lg
                p-4
              "
            >
              <ALabel tag="p" class="text-left" v-html="testimonial.testimonial"></ALabel>
              <div class="flex w-full justify-between align-middle">
                <img
                  :src="`/img/home/community/${testimonial.icon_author}.png`"
                  width="48"
                  height="48"
                  class="h-12 w-12"
                />
                <div class="flex flex-1 pl-4 text-left flex-col">
                  <ALabel tag="span" class="font-bold text-base">{{ testimonial.author }}</ALabel>
                  <ALabel tag="span" class="text-sm">{{ testimonial.job }}</ALabel>
                </div>
                <img
                  :src="`/img/home/community/${testimonial.icon_job}.svg`"
                  width="28"
                  height="28"
                  class="hidden xl:block"
                />
              </div>
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
          'Nuxt offers a compelling solution and a great ecosystem to help you ship fullstack Vue apps that are performant and SEO friendly. The flexibility to choose between SSR and SSG is icing on the cake.',
        author: 'Evan You',
        icon_author: 'evan',
        job: 'Creator of Vue.js',
        icon_job: 'vue'
      },
      {
        testimonial:
          'NuxtJS has outstanding developer productivity, experience, and performance right out of the gate!<br/>There’s so much attention to detail, ensuring teams have everything at their fingertips to productively build all manners of applications.',
        author: 'Sarah Drasner',
        job: 'Core Team of Vue.js',
        icon_author: 'sarah',
        icon_job: 'vue'
      },
      {
        testimonial:
          'NuxtJS is a fantastic choice for teams building a production-grade product on the web. It aims to bake in performance best-practices while maintaining excellent Vue.js DX.',
        author: 'Addy Osmani',
        job: 'Chief Engineer of Chrome',
        icon_author: 'addy',
        icon_job: 'google'
      }
    ]

    return {
      testimonials
    }
  }
})
</script>
