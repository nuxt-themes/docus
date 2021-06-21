<template>
  <div>
    <img
      loading="lazy"
      :src="`/img/home/discover/modules/dark/landscape-discover-modules-t.svg`"
      class="absolute w-full h-40 object-fill left-0 -mt-24 light:hidden"
      alt="A landscape image"
    />
    <img
      loading="lazy"
      :src="`/img/home/discover/modules/light/landscape-discover-modules-t.svg`"
      class="absolute w-full h-40 object-fill left-0 -mt-24 dark:hidden"
      alt="A landscape image"
    />

    <HomeSection class="py-20 light:bg-gray-50 dark:bg-secondary-darkest">
      <template #section-content>
        <SectionContent class="col-span-6 items-center md:items-start justify-center">
          <template #category>
            <CategoryLabel :label="category" />
          </template>

          <template #title>
            <h2
              class="
                font-normal
                text-center
                md:text-left
                font-serif
                text-display-6
                md:text-display-5
                2xl:text-display-4
              "
            >
              <Markdown slot="title" unwrap="p" />
            </h2>
          </template>

          <template #paragraph>
            <p class="pt-2 pb-8 text-center md:text-left font-normal text-body-base md:text-body-lg 2xl:text-body-xl">
              <Markdown slot="description" unwrap="p" />
            </p>
            <div class="flex justify-center md:justify-start">
              <SectionButton
                :to="primary.url"
                :aria-label="primary.text"
                size="md"
                class="bg-primary-green text-gray-800 hover:bg-green-300 focus:bg-green-300"
                :icon-left="primary.icon"
              >
                {{ primary.text }}
              </SectionButton>
            </div>
          </template>
        </SectionContent>
      </template>

      <template #right-illustration>
        <div class="col-span-6 w-full flex justify-center items-center md:justify-end">
          <img
            class="sm:w-3/5 md:w-3/4 lg:w-4/6 xl:w-3/5"
            loading="lazy"
            src="~/static/img/home/discover/modules/discover-modules.svg"
            alt="Image of a simplified diagram of how Nuxt works"
          />
        </div>
      </template>
    </HomeSection>

    <img
      loading="lazy"
      :src="`/img/home/discover/modules/dark/landscape-discover-modules-b.svg`"
      class="absolute w-full h-40 object-fill left-0 -mt-20 z-10 light:hidden"
      alt="A landscape image"
    />
    <img
      loading="lazy"
      :src="`/img/home/discover/modules/light/landscape-discover-modules-b.svg`"
      class="absolute w-full h-40 object-fill left-0 -mt-20 z-10 dark:hidden"
      alt="A landscape image"
    />
  </div>
</template>

<script>
export default {
  props: {
    category: {
      type: String,
      default: 'Category'
    },
    primary: {
      type: Object,
      default: () => ({
        text: 'Get started',
        url: '/get-started',
        icon: 'IconPlay'
      })
    }
  }
}
</script>
