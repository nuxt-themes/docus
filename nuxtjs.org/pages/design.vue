<template>
  <div class="shadow-nuxt">
    <div class="container px-4 pt-16 pb-12 mx-auto">
      <div class="flex flex-wrap justify-between mb-8">
        <div class="p-4 text-center lg:w-6/12 lg:text-left sm:p-0">
          <i18n
            path="design.title"
            tag="h1"
            class="
              mb-6
              text-3xl
              font-medium
              leading-normal
              xl:text-4xl
              text-light-onSurfacePrimary
              dark:text-dark-onSurfacePrimary
              lg:pt-4
            "
          >
            {{ $t('design.title') }}
            <template #nuxt>
              <AppTitle />
            </template>
          </i18n>
          <i18n
            path="design.description"
            tag="h3"
            class="
              mb-6
              font-medium
              leading-relaxed
              xl:text-lg
              text-light-onSurfaceSecondary
              dark:text-dark-onSurfaceSecondary
            "
          >
            <template #break>
              <br />
            </template>
          </i18n>
        </div>
        <DesignIllustration
          class="
            w-2/3
            mx-auto
            lg:mx-0
            lg:w-5/12
            lg:-mt-8
            text-light-elevatedSurface
            dark:text-dark-elevatedSurface
          "
        />
      </div>
      <div class="flex flex-wrap -mx-4">
        <div class="w-full p-4 lg:w-1/2">
          <section class="p-6 bg-gray-100 rounded">
            <h2 class="mb-6 text-2xl font-medium leading-normal text-nuxt-gray">
              Light theme
            </h2>
            <figure class="rounded hover:bg-gray-200">
              <nuxt-img src="/logos/nuxt.svg" alt="nuxt-logo" />
              <figcaption>
                <a href="/logos/nuxt.svg" target="_blank" rel="noopener">
                  nuxt.svg
                </a>
                /
                <a href="/logos/nuxt-square.svg" target="_blank" rel="noopener">
                  nuxt-square.svg
                </a>
              </figcaption>
            </figure>
            <figure class="mt-6 rounded hover:bg-gray-200">
              <nuxt-img
                src="/logos/nuxt-icon.png"
                srcset="/logos/nuxt-icon@2x.png 2x"
                alt="nuxt-logo"
              />
              <figcaption>
                <a href="/logos/nuxt-icon.png" target="_blank" rel="noopener">
                  nuxt-icon.png
                </a>
              </figcaption>
              <span class="dimensions">512 x 512</span>
            </figure>
            <figure class="mt-6 rounded hover:bg-gray-200">
              <nuxt-img
                src="/logos/nuxt-emoji.png"
                srcset="/logos/nuxt-emoji@2x.png 2x"
                alt="nuxt-logo"
              />
              <figcaption>
                <a href="/logos/nuxt-emoji.png" target="_blank" rel="noopener">
                  nuxt-emoji.png
                </a>
              </figcaption>
              <span class="dimensions">128 x 128</span>
            </figure>
            <figure class="mt-6 rounded hover:bg-gray-200">
              <nuxt-img src="/logos/nuxtjs-typo.svg" alt="nuxt-logo" />
              <figcaption>
                <a href="/logos/nuxtjs-typo.svg" target="_blank" rel="noopener">
                  nuxtjs-typo.svg
                </a>
              </figcaption>
            </figure>
            <figure class="mt-6 rounded hover:bg-gray-200">
              <nuxt-img
                src="/logos/built-with-nuxt.svg"
                alt="built-with-nuxt-logo"
              />
              <figcaption>
                <a
                  href="/logos/built-with-nuxt.svg"
                  target="_blank"
                  rel="noopener"
                >
                  built-with-nuxt.svg
                </a>
              </figcaption>
            </figure>
          </section>
        </div>
        <div class="w-full p-4 lg:w-1/2">
          <section class="p-6 rounded bg-nuxt-gray">
            <h2 class="mb-6 text-2xl font-medium leading-normal text-white">
              Dark theme
            </h2>
            <figure class="rounded hover:bg-gray-800">
              <nuxt-img src="/logos/nuxt-white.svg" alt="nuxt-logo" />
              <figcaption>
                <a href="/logos/nuxt-white.svg" target="_blank" rel="noopener">
                  nuxt-white.svg
                </a>
                /
                <a
                  href="/logos/nuxt-square-white.svg"
                  target="_blank"
                  rel="noopener"
                >
                  nuxt-square-white.svg
                </a>
              </figcaption>
            </figure>
            <figure class="mt-6 rounded hover:bg-gray-800">
              <nuxt-img
                src="/logos/nuxt-icon-white.png"
                srcset="/logos/nuxt-icon-white@2x.png 2x"
                alt="nuxt-logo"
              />
              <figcaption>
                <a
                  href="/logos/nuxt-icon-white.png"
                  target="_blank"
                  rel="noopener"
                >
                  nuxt-icon-white.png
                </a>
              </figcaption>
              <span class="dimensions">512 x 512</span>
            </figure>
            <figure class="mt-6 rounded hover:bg-gray-800">
              <nuxt-img
                src="/logos/nuxt-emoji-white.png"
                srcset="/logos/nuxt-emoji-white@2x.png 2x"
                alt="nuxt-logo"
              />
              <figcaption>
                <a
                  href="/logos/nuxt-emoji-white.png"
                  target="_blank"
                  rel="noopener"
                >
                  nuxt-emoji-white.png
                </a>
              </figcaption>
              <span class="dimensions">128 x 128</span>
            </figure>
            <figure class="mt-6 rounded hover:bg-gray-800">
              <nuxt-img src="/logos/nuxtjs-typo-white.svg" alt="nuxt-logo" />
              <figcaption>
                <a
                  href="/logos/nuxtjs-typo-white.svg"
                  target="_blank"
                  rel="noopener"
                >
                  nuxtjs-typo-white.svg
                </a>
              </figcaption>
            </figure>
            <figure class="mt-6 rounded hover:bg-gray-800">
              <nuxt-img
                src="/logos/built-with-nuxt-white.svg"
                alt="built-with-nuxt-logo"
              />
              <figcaption>
                <a
                  href="/logos/built-with-nuxt-white.svg"
                  target="_blank"
                  rel="noopener"
                >
                  built-with-nuxt-white.svg
                </a>
              </figcaption>
            </figure>
          </section>
        </div>
      </div>
      <i18n
        path="design.other_download_message"
        tag="p"
        class="
          mt-8
          text-center
          transition-colors
          duration-300
          ease-linear
          text-light-onSurfacePrimary
          dark:text-dark-onSurfacePrimary
        "
      >
        <template #favicon>
          <a href="/favicon.ico" target="_blank" rel="noopener">favicon</a>
        </template>
        <template #sketch>
          <a href="/logos/nuxt-logos.sketch" target="_blank" rel="noopener">
            Sketch
          </a>
        </template>
      </i18n>
    </div>
  </div>
</template>

<script>
import DesignIllustration from '~/assets/illustrations/design.svg?inline'

export default {
  components: {
    DesignIllustration
  },
  transition: 'logos',
  head() {
    const title = this.$t('design.meta.title')
    const description = this.$t('design.meta.description')

    return {
      title,
      meta: [
        { hid: 'description', name: 'description', content: description },
        // Open Graph
        { hid: 'og:title', property: 'og:title', content: title },
        {
          hid: 'og:description',
          property: 'og:description',
          content: description
        },
        // Twitter Card
        { hid: 'twitter:title', name: 'twitter:title', content: title },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: description
        }
      ]
    }
  }
}
</script>

<style lang="postcss" scoped>
figure {
  @apply relative p-4 text-center text-gray-500 table w-full;

  &:hover {
    & .dimensions {
      @apply opacity-100;

      top: 10px;
    }
  }

  & img {
    @apply inline-block;
  }

  & figcaption {
    @apply pt-4;
  }

  & .dimensions {
    @apply font-normal absolute top-0 opacity-0;

    right: 20px;
    transition-duration: 0.3s;
    transition-property: all;
  }
}

a {
  @apply text-nuxt-lightgreen font-normal;

  &:hover {
    @apply underline;
  }
}
</style>
