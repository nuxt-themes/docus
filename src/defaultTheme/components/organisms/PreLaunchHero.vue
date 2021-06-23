<template>
  <section class="flex flex-col md:flex-row d-container-content py-12 md:py-24">
    <div class="w-full md:w-1/2 flex flex-col justify-center mb-8 md:mb-0">
      <div class="flex flex-col items-center md:items-start mb-2">
        <InfoLabel label="🚀 Coming Soon" class="mx-2 mb-4" />
        <h2
          class="
            mb-2
            text-5xl
            font-semibold
            sm:leading-none
            tracking-tighter
            text-center text-gray-900
            md:text-left
            dark:text-gray-100
            sm:text-6xl
            lg:text-7xl
            sm:mb-4
          "
        >
          {{ title }}
        </h2>
        <p
          class="
            mb-2
            text-base text-center text-gray-700
            md:text-left
            sm:text-xl
            xl:text-2xl
            leading-base
            sm:mb-4
            dark:text-gray-300
          "
        >
          {{ description }}
        </p>
      </div>

      <div class="w-full">
        <div class="flex flex-col max-w-md mx-auto md:mx-0">
          <p class="text-sm mb-2 font-medium text-center md:text-left text-gray-600 dark:text-gray-500">
            {{ cta.description }}
          </p>
          <div
            class="
              flex flex-col
              md:flex-row
              border border-gray-300
              placeholder-gray-900
              dark:border-gray-700
              rounded-md
              p-1
              w-full
              mb-2
            "
          >
            <input
              type="text"
              :placeholder="cta.placeholder"
              class="
                flex-1
                py-3
                px-3
                focus:outline-none
                bg-transparent
                dark:text-gray-100
                placeholder-gray-400
                dark:placeholder-gray-600
              "
            />
            <button
              class="
                inline-block
                font-semibold
                text-center
                items-center
                flex-none
                px-6
                py-3
                text-lg
                leading-6
                rounded-md
                text-white
                transition-colors
                duration-200
                border border-transparent border-l-0
                bg-primary-500
                hover:bg-primary-600
                focus:outline-none
                select-none
              "
            >
              {{ cta.label }}
            </button>
          </div>
          <SocialIcons padding="p-1.5" />
        </div>
      </div>
    </div>

    <div class="w-full md:w-1/2 flex-col flex">
      <!-- <svg class="max-h-64 md:max-h-96 mx-auto" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="119" y="100" width="205" height="205" class="text-primary-500" fill="currentColor" />
        <circle cx="122.5" cy="290.5" r="85.5" class="text-rose-500" fill="currentColor" />
        <path d="M256.5 24L347.866 182.25H165.134L256.5 24Z" class="text-yellow-500" fill="currentColor" />
      </svg> -->
      <img class="max-h-64 md:max-h-96 mx-auto" :src="imageUrl" alt="" />
    </div>
  </section>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    title: {
      type: String,
      default: 'Hero title'
    },
    description: {
      type: String,
      default: 'I am the Hero description, with some text useful to go with the title.'
    },
    cta: {
      type: Object,
      default: () => ({
        label: 'CTA label',
        description: 'CTA description',
        placeholder: 'CTA placeholder'
      })
    },
    imageUrl: {
      type: String,
      default: 'https://source.unsplash.com/random'
    }
  }
})
</script>
