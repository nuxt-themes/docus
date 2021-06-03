<template>
  <div class="shadow-nuxt">
    <div class="container mx-auto px-4 pt-16">
      <div class="flex flex-wrap justify-between mb-8">
        <div class="lg:w-6/12 lg:text-left text-center p-4 sm:p-0">
          <i18n
            path="themes.title"
            tag="h1"
            class="text-3xl xl:text-4xl text-light-onSurfacePrimary dark:text-dark-onSurfacePrimary font-medium leading-normal mb-6 lg:pt-4"
          >
            {{ $t('themes.title') }}
            <template #nuxt>
              <AppTitle />
            </template>
          </i18n>
          <h3
            class="xl:text-lg text-light-onSurfaceSecondary dark:text-dark-onSurfaceSecondary font-medium leading-relaxed mb-6"
          >
            {{ $t('themes.description') }}
          </h3>
        </div>
        <ThemesIllustration
          class="w-2/3 mx-auto lg:mx-0 lg:w-5/12 lg:-mt-8 text-light-elevatedSurface dark:text-dark-elevatedSurface"
        />
      </div>
      <section class="flex flex-wrap items-stretch -mx-4 pb-8">
        <div v-for="theme in themes" :key="theme.title" class="w-full p-4">
          <div
            class="block sm:flex w-full h-full items-start bg-light-surface dark:bg-dark-surface rounded transition-colors duration-300 ease-linear"
          >
            <img
              :src="'/themes/' + theme.img + '.jpg'"
              :srcset="'/themes/' + theme.img + '-2x.jpg 2x'"
              :alt="theme.title"
              class="block w-full sm:w-auto sm:h-full rounded"
            />
            <div class="w-full p-6">
              <h4
                class="block w-full font-medium text-xl pb-2 text-light-onSurfacePrimary dark:text-dark-onSurfacePrimary transition-colors duration-300 ease-linear"
              >
                {{ theme.title }}
                <!-- <span class="float-right text-nuxt-lightgreen">{{ theme.price }}</span> -->
              </h4>
              <p class="mb-3 text-gray-600">
                {{ theme.description }}
              </p>
              <p
                v-if="theme.discount"
                class="text-sm italic text-nuxt-lightgreen"
              >
                {{ theme.discount1 }}
                <b class="whitespace-no-wrap">
                  {{ theme.discount2 }}
                </b>
              </p>
              <AppButton
                :href="theme.link"
                rel="noopener sponsored"
                target="_blank"
                class="sm:mr-4 p-3 mt-3 text-sm text-left"
              >
                <!-- <nui-svg-shopping slot="icon" class="h-4 -mb-1 mr-1" /> -->
                {{ $t('themes.button') }} {{ theme.price }}
              </AppButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import ThemesIllustration from '~/assets/illustrations/themes.svg?inline'

export default {
  components: {
    ThemesIllustration
  },
  data() {
    return {
      themes: [
        {
          title: 'Nuxt Argon Dashboard PRO',
          description: 'Premium Bootstrap 4 + NuxtJS Admin Template.',
          price: '99$',
          link:
            'https://www.creative-tim.com/product/nuxt-argon-dashboard-pro?partner=120213',
          img: 'nuxt-argon-dashboard-pro',
          discount1: '-30% discount code:',
          discount2: '30nuxt-exclusive'
        },
        {
          title: 'Nuxt Argon Dashboard PRO Laravel',
          description: 'FULL STACK APP WITH NUXT, LARAVEL & JSON:API.',
          price: '149$',
          link:
            'https://www.creative-tim.com/product/nuxt-argon-dashboard-pro-laravel?partner=120213',
          img: 'nuxt-argon-dashboard-pro-laravel'
        },
        {
          title: 'Nuxt Now UI Kit',
          description: 'Premium Bootstrap Nuxt.js UI Kit.',
          price: '89$',
          link:
            'https://www.creative-tim.com/product/nuxt-now-ui-kit-pro?partner=120213',
          img: 'nuxt-now-ui-kit'
        },
        {
          title: 'Nuxt Black Dashboard PRO',
          description: 'Premium Bootstrap 4 Nuxt.js Admin Template.',
          price: '79$',
          link:
            'https://www.creative-tim.com/product/nuxt-black-dashboard-pro?partner=120213',
          img: 'nuxt-black-dashboard-pro'
        },
        {
          title: 'Nuxt Scutum Dashboard',
          description: 'Professional Material Design UIkit Admin Template.',
          price: '26$',
          link: 'https://1.envato.market/scutum-nuxt',
          img: 'nuxt-scutum-dashboard'
        },
        {
          title: 'Luma Nuxt',
          description:
            'A beautifully crafted user interface with Nuxt.js for modern Education Platforms.',
          price: '27$',
          link: 'https://1.envato.market/luma',
          img: 'luma-nuxt'
        },
        {
          title: 'Multikart',
          description: 'Responsive Nuxtjs eCommerce Template.',
          price: '28$',
          link: 'https://1.envato.market/multikart',
          img: 'multikart'
        },
        {
          title: 'Sofbox',
          description: 'Software landing page template.',
          price: '22$',
          link: 'https://1.envato.market/sofbox',
          img: 'sofbox'
        },
        {
          title: 'Veluxi',
          description:
            'Modern template collection to present your startup & your companies the way they truly deserve.',
          price: '15$',
          link: 'https://1.envato.market/veluxi',
          img: 'veluxi'
        },
        {
          title: 'Bolster',
          description: 'Nuxt.js eCommerce Template.',
          price: '25$',
          link: 'https://1.envato.market/bolster',
          img: 'bolster'
        }
      ]
    }
  },
  head() {
    const title = this.$t('themes.meta.title')
    const description = this.$t('themes.meta.description')

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

<style></style>
