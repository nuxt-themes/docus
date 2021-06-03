<template>
  <AppContainer class="px-4">
    <section
      id="subscribe-to-newsletter"
      class="px-3 py-8 -mx-4 text-center rounded-t-lg lg:mx-0"
    >
      <!-- why title i18n -->
      <i18n
        path="homepage.newsletter.title"
        tag="h2"
        class="mb-2 text-3xl font-medium transition-colors duration-300 ease-linear text-light-onSurfacePrimary dark:text-dark-onSurfacePrimary"
      >
        <template #nuxt>
          <AppTitle />
        </template>
      </i18n>
      <p
        class="mb-6 transition-colors duration-300 ease-linear text-light-onSurfaceSecondary dark:text-dark-onSurfaceSecondary"
      >
        {{ $t('homepage.newsletter.description') }}
      </p>
        <form
          class="flex flex-row justify-center mb-2"
          data-cy="newsletter"
          @submit.prevent="subscribe"
        >
          <div>
            <label for="news-email" class="hidden">
              {{ $t('homepage.newsletter.form.email') }}
            </label>
            <input
              id="news-email"
              v-model="email"
              type="email"
              required
              :placeholder="$t('homepage.newsletter.form.email')"
              class="w-48 px-4 py-3 font-medium border border-r-0 rounded rounded-r-none outline-none md:w-64 bg-light-elevatedSurface text-light-onSurfacePrimary focus:border-primary-base"
              aria-label="Newsletter"
            />
          </div>
          <input
            type="submit"
            :value="
              pending
                ? $t('homepage.newsletter.form.subscribing')
                : $t('homepage.newsletter.form.subscribe')
            "
            name="subscribe"
            class="inline-block px-4 py-2 text-sm text-base font-medium text-white uppercase rounded rounded-l-none shadow cursor-pointer bg-primary-base hover:bg-primary-light hover:shadow-md"
            :class="[pending ? 'bg-nuxt-green' : '']"
          />
        </form>
        <p v-if="subscribed" class="py-1 text-nuxt-green">
          {{ $t('homepage.newsletter.form.subscribed_messages.pre') }}
          {{ subscribedEmail }}
          {{ $t('homepage.newsletter.form.subscribed_messages.post') }}
        </p>
        <p v-if="error" class="py-1 text-red-600">
          {{ error }}
        </p>
    </section>
  </AppContainer>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      subscribedEmail: '',
      pending: false,
      subscribed: false,
      error: null
    }
  },
  methods: {
    async subscribe() {
      if (!this.email.trim()) {
        return
      }
      this.error = null
      this.pending = true
      try {
        await new Promise(resolve => setTimeout(resolve, 400))
        await this.$http.$post(`${process.env.NUXT_API}/newsletter`, {
          email: this.email
        })
        this.subscribedEmail = this.email
        this.subscribed = true
        this.pending = false
      } catch (err) {
        this.pending = false
        if (err.response) {
          const { code } = await err.response.json()
          if (code === 'member-exists') {
            this.error = 'You are already registered.'
            return
          }
        }
        this.error = 'Unknown error'
      }
    }
  }
}
</script>
