<template>
  <div class="shadow-nuxt">
    <div class="container mx-auto px-4 pt-16 pb-8">
      <div class="flex flex-wrap justify-between mb-8">
        <div class="lg:w-6/12 lg:text-left text-center p-4 sm:p-0">
          <i18n
            path="blog.title"
            tag="h1"
            class="text-3xl xl:text-4xl text-light-onSurfacePrimary dark:text-dark-onSurfacePrimary font-medium leading-normal mb-6 lg:pt-4"
          >
            {{ $t('blog.title') }}
            <template #nuxt>
              <AppTitle />
            </template>
          </i18n>

          <!--blog description i18n -->
          <i18n
            path="blog.description"
            tag="h3"
            class="xl:text-lg light:text-light-onSurfaceSecondary dark:text-dark-onSurfaceSecondary font-medium leading-relaxed mb-6"
          >
            <template #nuxtTeam>
              <NuxtLink
                class="text-nuxt-green underline"
                to="/team#nuxtCompany"
              >
                {{ $t('blog.nuxt_team') }}
              </NuxtLink>
            </template>
            <template #nuxtCommunity>
              <NuxtLink
                class="text-nuxt-green underline"
                to="/team#nuxtCommunity"
              >
                {{ $t('blog.nuxt_community') }}
              </NuxtLink>
            </template>
          </i18n>
        </div>
        <DesignIllustration
          class="w-2/3 mx-auto lg:mx-0 lg:w-5/12 lg:-mt-8 text-light-elevatedSurface dark:text-dark-elevatedSurface"
        />
      </div>
      <section>
        <BlogpostPreviewItem
          v-for="(post, index) in posts"
          :key="index"
          :post="post"
        />
      </section>
    </div>
  </div>
</template>

<script>
import DesignIllustration from '~/assets/illustrations/design.svg?inline'

export default {
  components: {
    DesignIllustration
  },
  async asyncData({ $content, app }) {
    let posts = await $content(app.i18n.defaultLocale, 'blog')
      .sortBy('date', 'desc')
      .fetch()

    if (app.i18n.defaultLocale !== app.i18n.locale) {
      try {
        const newPosts = await $content(app.i18n.locale, 'blog')
          .sortBy('date', 'desc')
          .fetch()

        posts = posts.map(post => {
          const newPost = newPosts.find(newPost => newPost.slug === post.slug)

          return newPost || post
        })
      } catch (err) {}
    }
    return {
      posts
    }
  },
  head() {
    const title = this.$i18n.t('blog.meta.title')
    const description = this.$i18n.t('blog.meta.description')

    return {
      title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: description
        },
        // Open Graph
        {
          hid: 'og:title',
          property: 'og:title',
          content: title
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: description
        },
        // // Twitter Card
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: title
        },
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
