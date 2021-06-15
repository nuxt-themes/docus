<template>
  <HomeSection class="">
    <template #header-illustration>
      <img
        loading="lazy"
        :src="`/img/home/community/dark/landscape-community-t.svg`"
        class="w-full h-20 object-fill light:hidden pointer-events-none"
        alt="A landscape image"
      />

      <img
        loading="lazy"
        :src="`/img/home/community/light/landscape-community-t.svg`"
        class="w-full h-20 object-fill dark:hidden pointer-events-none"
        alt="A landscape image"
      />
    </template>

    <template #section-content>
      <SectionContent class="col-span-12 items-center pt-20 pb-60">
        <template #category>
          <CategoryLabel label="Community" />
        </template>

        <template #title>
          <SectionTitle class="text-center font-serif">Testimonials</SectionTitle>
        </template>

        <template #paragraph>
          <SectionDescription class="text-center">Learn from experts about what they think of Nuxt.</SectionDescription>
        </template>

        <template #content>
          <ul class="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-4 lg:gap-8 pb-8 sm:mx-20 md:mx-0">
            <li
              v-for="testimonial in testimonials"
              :key="testimonial.author"
              class="
                relative
                flex flex-col
                items-center
                justify-between
                space-y-4
                border-2 border-gray-200
                dark:border-secondary-light
                rounded-lg
                p-4
              "
            >
              <ALabel tag="p" class="text-left" v-html="testimonial.testimonial"></ALabel>
              <div class="flex w-full justify-between items-center">
                <a :href="testimonial.authorUrl" target="_blank" rel="noopener">
                  <img
                    :src="`/img/home/community/${testimonial.authorIcon}.png`"
                    width="48"
                    height="48"
                    class="h-12 w-12"
                  />
                </a>
                <a
                  :href="testimonial.authorUrl"
                  target="_blank"
                  rel="noopener"
                  class="flex flex-1 pl-4 text-left flex-col"
                >
                  <ALabel tag="span" class="font-bold text-base">{{ testimonial.author }}</ALabel>
                  <ALabel tag="span" class="text-sm">{{ testimonial.job }}</ALabel>
                </a>
                <a :href="testimonial.jobUrl" target="_blank" rel="noopener sponsored" class="hidden xl:block">
                  <img
                    :src="`/img/home/community/${testimonial.jobIcon}.svg`"
                    width="28"
                    height="28"
                    :class="{ 'light-img': testimonial.jobIconDark }"
                  />
                  <img
                    v-if="testimonial.jobIconDark"
                    :src="`/img/home/community/${testimonial.jobIconDark}.svg`"
                    width="28"
                    height="28"
                    class="dark-img"
                  />
                </a>
              </div>
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
    const testimonials = [
      {
        testimonial:
          'Nuxt offers a compelling solution and a great ecosystem to help you ship fullstack Vue apps that are performant and SEO friendly. The flexibility to choose between SSR and SSG is icing on the cake.',
        author: 'Evan You',
        authorIcon: 'evan',
        authorUrl: 'https://twitter.com/youyuxi',
        job: 'Creator of Vue.js',
        jobIcon: 'vue',
        jobUrl: 'https://vuejs.org'
      },
      {
        testimonial:
          'Nuxt has outstanding developer productivity, experience, and performance right out of the gate!<br/>There’s so much attention to detail, ensuring teams have everything at their fingertips to productively build all manners of applications.',
        author: 'Sarah Drasner',
        authorIcon: 'sarah',
        authorUrl: 'https://twitter.com/sarah_edo',
        job: 'Core Team of Vue.js',
        jobIcon: 'vue',
        jobUrl: 'https://vuejs.org'
      },
      {
        testimonial:
          'Nuxt is a fantastic choice for teams building a production-grade product on the web. It aims to bake in performance best-practices while maintaining excellent Vue.js DX.',
        author: 'Addy Osmani',
        authorIcon: 'addy',
        authorUrl: 'https://twitter.com/addyosmani',
        job: 'Chief Engineer of Chrome',
        jobIcon: 'chrome',
        jobUrl: 'https://www.google.com/chrome/'
      },
      {
        testimonial:
          'Nuxt has been an incredible source of innovation and inspiration for developers and framework authors alike. It’s been amazing to see its growth in web projects of all sizes on the web.',
        author: 'Guillermo Rauch',
        authorIcon: 'guillermo',
        authorUrl: 'https://twitter.com/rauchg',
        job: 'CEO of Vercel',
        jobIcon: 'vercel-light',
        jobIconDark: 'vercel-dark',
        jobUrl: 'https://vercel.com'
      },
      {
        testimonial:
          'Nuxt has a unique approach of combining a great developer experience with reusable, fully integrated features that speed up the development and performance of your next website or application.',
        author: 'Dominik Angerer',
        authorIcon: 'dominik',
        authorUrl: 'https://twitter.com/domangerer',
        job: 'CEO of Storyblok',
        jobIcon: 'storyblok',
        jobUrl: 'https://www.storyblok.com'
      }
    ]

    return {
      testimonials
    }
  }
})
</script>
