<template>
  <Container>
    <!-- <Page>  -->
    <section class="px-4 my-24">
      <h1
        class="mt-10 mb-8 text-4xl font-semibold leading-none tracking-tight text-center text-gray-900 md:text-left dark:text-gray-100 sm:text-6xl lg:text-8xl sm:mt-14 sm:mb-10"
      >
        Documentation generator<br />based on Nuxt and Tailwind.
      </h1>
      <div class="flex flex-col md:flex-row">
        <div class="flex flex-col items-start pr-2 mb-8 md:w-1/2">
          <h3
            class="mb-4 text-lg text-center text-gray-700 md:text-left sm:text-2xl sm:leading-tight sm:mb-8 dark:text-gray-200"
          >
            Write in markdown, use Vue components, add style with TailwindCSS
            and enjoy the power of Nuxt.
          </h3>
          <ButtonLink
            class="mx-auto md:mx-0"
            size="large"
            href="/get-started/installation"
          >
            Get started
          </ButtonLink>
        </div>
        <div class="w-full m-auto md:w-1/2 sm:w-580px ">
          <div class="md:pl-2">
            <Terminal snippet="npx degit nuxtlabs/docus-starter" />
          </div>
        </div>
      </div>
    </section>

    <section class="px-4 my-24">
      <h2
        class="mt-16 mb-8 text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-100"
      >
        What’s included?
      </h2>
      <ul
        class="grid grid-cols-2 gap-4 font-semibold text-center text-gray-900 dark:text-gray-100 sm:grid-cols-3 xl:grid-cols-4 sm:gap-6 xl:gap-8"
      >
        <li v-for="feature of features" :key="feature.title" class="flex">
          <NuxtLink
            class="relative w-full px-6 pt-8 pb-6 border border-gray-100 rounded-xl dark:border-gray-800"
            to="/usage/content"
          >
            <component
              :is="feature.icon"
              v-if="feature.icon"
              class="h-16 max-w-full mx-auto mb-3"
            />
            <h2>{{ feature.title }}</h2>
          </NuxtLink>
        </li>
      </ul>
    </section>
    <!-- </Page> -->
  </Container>
</template>

<script>
export default {
  data() {
    return {
      features: [
        {
          icon: "IconMarkdown",
          title: "Write Markdown"
        },
        {
          icon: "IconVue",
          title: "Vue Components"
        },
        {
          icon: "IconNuxt",
          title: "Nuxt Architecture"
        },
        {
          icon: "IconTailwind",
          title: "Tailwind CSS"
        },
        {
          icon: "IconSSG",
          title: "Static Generation"
        },
        {
          icon: "IconLighthouse",
          title: "Lighthouse Optimised"
        },
        {
          icon: "IconZap",
          title: "Smart Generation"
        },
        {
          icon: "IconPuzzle",
          title: "Extensible"
        }
      ]
    };
  }
};
</script>
