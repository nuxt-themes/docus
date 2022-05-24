<template>
  <div class="left-0 top-0 absolute max-w-full w-full">
    <div class="ellipsis" />
  </div>
</template>


<style lang="postcss" scoped>
.ellipsis {
  @apply md:w-[600px] h-[160px];
  background: linear-gradient(97.62deg, rgba(0, 71, 225, 0.22) 2.27%, rgba(26, 214, 255, 0.22) 50.88%, rgba(0, 220, 130, 0.22) 98.48%);
  filter: blur(169px);
  transform: matrix(-0.95, -0.3, -0.3, 0.95, 200, 250);
}
</style>
