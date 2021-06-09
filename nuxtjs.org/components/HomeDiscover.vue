<template>
  <div>
    <img
      loading="lazy"
      :src="`/img/home/discover/modules/dark/landscape-discover-modules-t.svg`"
      class="absolute w-full h-40 object-fill left-0 -mt-20 light:hidden"
      alt="A landscape image"
    />
    <img
      loading="lazy"
      :src="`/img/home/discover/modules/light/landscape-discover-modules-t.svg`"
      class="absolute w-full h-40 object-fill left-0 -mt-20 dark:hidden"
      alt="A landscape image"
    />

    <HomeSection class="py-40 light:bg-gray-50 dark:bg-secondary-darkest">
      <template #section-content>
        <SectionContent class="col-span-6 justify-center">
          <template #category>
            <CategoryLabel label="Discover" />
          </template>

          <template #title>
            <SectionTitle>
              Easier
              <span class="text-primary-green italic">Life</span>, from<span class="text-primary-green italic">
                Code</span
              >
              to<span class="text-primary-green italic"> Cloud</span>
            </SectionTitle>
          </template>

          <template #paragraph>
            <SectionDescription class="pb-8" size="md">
              Nuxt is an Open Source web framework based on official Vue.js libraries, Node.js and using powerful
              development tools such as Vite, Webpack, Babel and PostCSS. Nuxt's purpose is to make web application
              development intuitive and performant with a great developer experience in mind.
            </SectionDescription>
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
