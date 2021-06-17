<template>
  <div class="partners__slider">
    <ul class="partners__slide-track">
      <li
        v-for="(partner, index) in partners"
        :key="`${partner.alt}-${index}`"
        class="flex items-center p-8 mx-12 partners__slide md:p-4"
      >
        <Component :is="partner.component" class="flex w-full" />
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent, computed } from '@nuxtjs/composition-api'
export default defineComponent({
  props: {
    partnersLogo: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    // double array values
    const partners = computed(() => props.partnersLogo.concat(props.partnersLogo))

    return {
      partners
    }
  }
})
</script>

<style lang="postcss">
@-webkit-keyframes scroll {
  0% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
  100% {
    -webkit-transform: translateX(calc(-250px * 7));
    transform: translateX(calc(-250px * 7));
  }
}

@keyframes scroll {
  0% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
  100% {
    -webkit-transform: translateX(calc(-250px * 7));
    transform: translateX(calc(-250px * 7));
  }
}

.partners__slider {
  @apply relative pb-8 h-40 overflow-hidden w-full;
}

.partners__slider::before,
.partners__slider::after {
  @apply absolute h-24 w-48 z-10;
  background: linear-gradient(to right, white 0%, rgba(255, 255, 255, 0) 20%);
  content: '';
}

//TODO: put real color when there will be available via docus
.dark .partners__slider::before,
.dark .partners__slider::after {
  @apply absolute h-24 w-48 z-10;
  background: linear-gradient(to right, #001e26 0%, rgba(255, 255, 255, 0) 20%);
  content: '';
}

@screen sm {
  .partners__slider::before,
  .partners__slider::after {
    background: linear-gradient(to right, white 0%, rgba(255, 255, 255, 0) 50%);
  }
}

@screen sm {
  .dark .partners__slider::before,
  .dark .partners__slider::after {
    background: linear-gradient(to right, #001e26 0%, rgba(255, 255, 255, 0) 50%);
  }
}

@screen md {
  .partners__slider::before,
  .partners__slider::after {
    background: linear-gradient(to right, white 0%, rgba(255, 255, 255, 0) 100%);
  }
}

@screen md {
  .dark .partners__slider::before,
  .dark .partners__slider::after {
    background: linear-gradient(to right, #001e26 0%, rgba(255, 255, 255, 0) 100%);
  }
}

.partners__slider::after {
  @apply right-0 top-0 transform rotate-180;
}

.partners__slider::before {
  @apply left-0 top-0;
}

.partners__slider .partners__slide-track {
  @apply flex;
  -webkit-animation: scroll 30s linear infinite;
  animation: scroll 30s linear infinite;
  width: calc(250px * 14);
}

.partners__slider .partners__slide {
  @apply h-24 w-64;
}
</style>
