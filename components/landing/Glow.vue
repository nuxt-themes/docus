<script setup lang="ts">
import type { PropType } from 'vue'

const { isFirefox } = useUserAgent()

const show = ref(false)

onMounted(() => {
  show.value = isFirefox.value ? false : true
})
</script>

<template>
  <div v-if="show" class="glow pointer-events-none before:pointer-events-none after:pointer-events-none absolute start-0 end-0 z-0 opacity-0 overflow-hidden w-full before:inset-0 before:opacity-0 before:absolute after:absolute after:inset-0 after:opacity-0">
    <svg>
      <filter id="f">
        <feTurbulence type="fractalNoise" baseFrequency="7.5" />
      </filter>
    </svg>
  </div>
</template>

<style scoped>
.glow {
  --mask-gradient: radial-gradient(circle at 51% 64%, rgba(0,0,0, 1) -7%, rgba(0,0,0, 0) 70%);
  height: calc(var(--hero-height) + var(--app-header-height) + 20rem);
  top: calc(0px - var(--app-header-height));
  /* background-image: TODO; */
  animation: enter-opacity 750ms forwards 500ms theme('transitionTimingFunction.in-out-expo');
}
.dark .glow {
  --mask-gradient: radial-gradient(circle at 51% 64%, rgba(0,0,0, 1) -7%, rgba(0,0,0, 0) 70%);
}

.glow::after {
  --gradient: radial-gradient(circle at 10% 50%, theme('colors.secondary.500') 4%, theme('colors.primary.200') 25%, theme('colors.primary.500') 65%);
  background-image: var(--gradient);
}

.glow::before {
  filter: url(#f);
}

.dark .glow::after {
  --gradient: radial-gradient(circle at 10% 50%, theme('colors.secondary.500'), theme('colors.primary.500') 45%, theme('colors.primary.200') 82%);
}

@media screen(xl) {
  .glow {
    --mask-gradient: radial-gradient(at 70% 45%, red, rgba(0, 0, 0, 0) 85%);
  }
  .dark .glow {
    --mask-gradient: radial-gradient(at 70% 45%, red, rgba(0, 0, 0, 0) 85%);
  }
  .glow::after {
    --gradient: radial-gradient(circle at 10% 50%, theme('colors.secondary.200') 15%, theme('colors.primary.500') 60%, theme('colors.primary.400') 55%, theme('colors.primary.400') 75%, theme('colors.secondary.500') 90%)
  }
  .dark .glow::after {
    --gradient: radial-gradient(circle at 10% 50%, theme('colors.secondary.700') 15%, theme('colors.primary.500') 60%, theme('colors.primary.600') 55%, theme('colors.primary.600') 75%, theme('colors.secondary.500') 90%);
  }
}

@keyframes enter-opacity {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.glow::after, .glow::before {
  --mask: var(--mask-gradient), var(--mask-gradient), var(--mask-gradient);
  -webkit-mask: var(--mask);
  mask: var(--mask);
  mask-composite: intersect;
  -webkit-mask-composite: source-in;
  mix-blend-mode: color;
  animation: enter-scale 0ms forwards 500ms linear;
}
@keyframes enter-scale {
  from {
    opacity: 0;
    /* transform: scale(2); */
  }
  to {
    opacity: 1;
    /* transform: scale(1); */
  }
}
</style>
