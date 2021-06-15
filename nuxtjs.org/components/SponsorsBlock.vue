<template>
  <div class="flex flex-col">
    <p class="pt-8 text-base font-semibold text-gray-900 dark:text-gray-100">Partners</p>
    <div class="partners__block">
      <ul class="partners__block__slide-track">
        <li
          v-for="(partner, index) in partners"
          :key="`${partner.name}-${index}`"
          class="flex flex-col items-center partners__block__slide"
        >
          <a :href="partner.url" class="opacity-75 hover:opacity-100" rel="noopener sponsored" target="_blank">
            <img
              loading="lazy"
              :src="`/img/sponsors/${$colorMode.value}/${partner.img}`"
              :alt="partner.name"
              class="h-8"
            />
          </a>
        </li>
      </ul>
    </div>
    <AButton
      type="button"
      :to="localePath('/sponsor-nuxtjs')"
      class="
        font-medium
        rounded-md
        bg-primary-green
        text-gray-800
        hover:bg-green-300
        focus:bg-green-300
        inline-flex
        items-center
        px-4
        py-2.5
        text-xs
        2xl:text-sm
        w-32
        text-center
      "
    >
      Support Us
    </AButton>
  </div>
</template>

<script>
import { defineComponent, ref, useContext, useFetch } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const { $docus } = useContext()
    const partners = ref()

    useFetch(async () => {
      const documents = await $docus
        .search('/sponsors', { deep: true })
        .where({ tier: { $in: ['MVP Partners', 'Partners'] } })
        .fetch()

      /* Double partners array for correct animation */
      partners.value = documents.concat(documents)
    })
    return {
      partners
    }
  }
})
</script>

<style lang="postcss" scoped>
@-webkit-keyframes scroll {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
  100% {
    -webkit-transform: translateY(calc(-64px * 7));
    transform: translateY(calc(-64px * 7));
  }
}

@keyframes scroll {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
  100% {
    -webkit-transform: translateY(calc(-64px * 7));
    /* single logo height + margin-bottom * 7 */
    transform: translateY(calc(-64px * 7));
  }
}

.partners__block {
  @apply relative pb-8 h-40 overflow-hidden w-full;
}

.partners__block::before,
.partners__block::after {
  @apply absolute h-8 w-full z-10;
  content: '';
}

.light-mode .partners__block::before,
.light-mode .partners__block::after {
  background: linear-gradient(to top, #fff 0%, rgba(255, 255, 255, 0) 100%);
}

.dark-mode .partners__block::before,
.dark-mode .partners__block::after {
  background: linear-gradient(to top, #2f485e 0%, rgba(255, 255, 255, 0) 100%);
}

.partners__block::after {
  @apply right-0 top-0 transform rotate-180;
}

.partners__block::before {
  @apply left-0 bottom-0;
}

.partners__block .partners__block__slide-track {
  -webkit-animation: scroll 0s linear infinite;
  animation: 15s scroll 0s linear infinite;

  & img {
    @apply select-none cursor-pointer;
  }
}

.partners__block:hover .partners__block__slide-track {
  animation-play-state: paused;
}

.partners__block .partners__block__slide {
  @apply mb-8;
}
</style>
