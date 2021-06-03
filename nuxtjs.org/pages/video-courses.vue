<template>
  <div class="shadow-nuxt">
    <div class="container mx-auto px-4 pt-16">
      <div class="flex flex-wrap justify-between mb-8">
        <div class="lg:w-6/12 lg:text-left text-center p-4 sm:p-0">
          <i18n
            path="video-courses.title"
            tag="h1"
            class="
              text-3xl
              xl:text-4xl
              text-light-onSurfacePrimary
              dark:text-dark-onSurfacePrimary
              font-medium
              leading-normal
              mb-6
              lg:pt-4
            "
          >
            {{ $t('video-courses.title') }}
            <template #nuxt>
              <AppTitle />
            </template>
          </i18n>
          <h3
            class="
              xl:text-lg
              text-light-onSurfaceSecondary
              dark:text-dark-onSurfaceSecondary
              font-medium
              leading-relaxed
              mb-8
            "
          >
            {{ $t('video-courses.description') }}
          </h3>
          <AppButton
            href="https://masteringnuxt.com/?utm_source=nuxt&utm_medium=link&utm_campaign=navbar_link"
            rel="noopener sponsored"
            target="_blank"
            class="sm:mr-4 py-3 px-6 text-base mb-4"
          >
            <SvgIcon slot="icon" name="meteor" class="h-5 -mb-1 mr-1" />
            {{ $t('video-courses.cta.discover') }}
          </AppButton>
        </div>
        <ThemesIllustration
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
      <section class="flex flex-wrap items-stretch -mx-4">
        <div
          v-for="course in courses"
          :key="course.title"
          class="w-full p-4 relative"
        >
          <span
            class="
              bg-orange-500
              text-white
              dark:text-black
              text-ss
              px-1
              rounded-sm
              lowercase
              absolute
              m-2
              right-0
              mr-6
            "
          >
            {{ course.type }}
          </span>
          <div
            class="
              flex flex-col
              md:flex-row
              block
              w-full
              h-full
              items-center
              pr-6
              bg-light-surface
              hover:bg-gray-200
              dark:bg-dark-surface
              rounded
              transition-colors
              duration-300
              ease-linear
            "
          >
            <div class="w-full p-6 order-2 md:order-1">
              <h4
                class="
                  inline
                  w-full
                  font-medium
                  text-xl
                  pb-2
                  text-light-onSurfacePrimary
                  dark:text-dark-onSurfacePrimary
                  transition-colors
                  duration-300
                  ease-linear
                "
              >
                {{ course.title }}
              </h4>
              <span class="inline"> on {{ course.platform }}</span>
              <p class="mb-3 text-gray-600">
                {{ course.description }}
              </p>
              <AppButton
                :href="course.link"
                rel="noopener sponsored"
                target="_blank"
                class="md:mr-4 p-3 mt-3 text-sm text-left block"
              >
                <SvgIcon
                  slot="icon"
                  name="play-circle"
                  class="h-4 -mb-1 mr-1"
                />
                {{ $t('video-courses.cta.start') }}
              </AppButton>
            </div>
            <img
              :src="'/courses/' + course.img + '.png'"
              :srcset="'/courses/' + course.img + '-2x.png 2x'"
              :alt="course.title"
              class="
                block
                w-auto
                rounded
                pt-6
                px-6
                md:py-8
                md:px-0
                order-1
                md:order-2
                self-start
              "
            />
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
  async asyncData({ $content, app }) {
    let courses = []

    try {
      courses = await $content(app.i18n.defaultLocale, 'video-courses')
        .only([
          'slug',
          'title',
          'position',
          'menu',
          'category',
          'type',
          'img',
          'description',
          'platform',
          'link'
        ])
        .sortBy('position')
        .fetch()

      if (app.i18n.locale !== app.i18n.defaultLocale) {
        const newCourses = await $content(app.i18n.locale, 'video-courses')
          .only([
            'slug',
            'title',
            'position',
            'menu',
            'category',
            'type',
            'img',
            'description',
            'platform',
            'link'
          ])
          .sortBy('position')
          .fetch()
        courses = courses.map(course => {
          const newCourse = newCourses.find(
            newCourse => newCourse.slug === course.slug
          )

          return newCourse || course
        })
      }
    } catch (e) {}

    return {
      courses
    }
  },
  data() {
    return {}
  },
  head() {
    const title = this.$t('video-courses.meta.title')
    const description = this.$t('video-courses.meta.description')

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
