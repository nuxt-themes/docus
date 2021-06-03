<template>
  <div class="shadow-nuxt">
    <div class="container px-4 pt-16 pb-12 mx-auto">
      <div class="flex flex-wrap justify-between mb-8">
        <div class="p-4 text-center lg:w-6/12 lg:text-left sm:p-0">
          <i18n
            path="sponsor.title"
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
            {{ $t('sponsor.title') }}
            <template #nuxt>
              <AppTitle />
            </template>
          </i18n>
          <i18n
            path="sponsor.description"
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
        <SponsorIllustration
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
      <section class="text-center">
        <h2
          class="
            pt-10
            pb-8
            text-2xl
            font-medium
            uppercase
            text-light-onSurfacePrimary
            dark:text-dark-onSurfacePrimary
          "
        >
          {{ $t('sponsor.pledges.title') }}
        </h2>
        <i18n
          path="sponsor.pledges.description"
          tag="p"
          class="
            mb-12
            text-light-onSurfaceSecondary
            dark:text-dark-onSurfaceSecondary
          "
        >
          <template #opencollective>
            <a href="https://github.com/sponsors/nuxt">GitHub</a>
          </template>
        </i18n>
        <div
          v-for="(group, groupKey) in sponsors"
          :key="groupKey"
          class="pb-8 text-center"
        >
          <h2 class="pb-8 text-xl uppercase">
            <span
              class="
                pb-2
                transition-colors
                duration-300
                ease-linear
                border-b-2 border-nuxt-lightgreen
                text-light-onSurfacePrimary
                dark:text-dark-onSurfacePrimary
              "
            >
              {{ groupKey }}
            </span>
          </h2>
          <a
            v-for="(sponsor, i) in group"
            :key="i"
            class="inline-block m-4 sponsor"
            :href="`${sponsor.url}?ref=nuxt`"
            target="_blank"
            rel="noopener sponsored"
          >
            <ClientOnly>
              <img
                :src="`/img/sponsors/${$colorMode.value}/${sponsor.img}`"
                :alt="sponsor.name"
                :title="sponsor.name"
                class="inline-block"
                :class="sponsor.class"
              />
            </ClientOnly>
          </a>
        </div>
        <div class="text-center">
          <AppButton
            href="https://github.com/sponsors/nuxt"
            class="px-6 py-3 text-base"
          >
            <SvgbIcon
              slot="icon"
              name="github"
              class="inline-block h-5 mr-1 -mt-1"
            />
            {{ $t('sponsor.become_a_sponsor') }}
          </AppButton>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import SponsorIllustration from '~/assets/illustrations/sponsor.svg?inline'
import sponsors from '~/content/sponsors'

export default {
  components: {
    SponsorIllustration
  },
  data() {
    return {
      sponsors
    }
  },
  head() {
    const title = this.$t('sponsor.meta.title')
    const description = this.$t('sponsor.meta.description')

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

<style lang="scss">
.sponsor {
  & img {
    filter: grayscale(100%);
    opacity: 0.75;
    transition: all 0.5s;
  }

  &:hover {
    & img {
      filter: grayscale(0%);
      opacity: 1;
    }
  }
}
</style>
