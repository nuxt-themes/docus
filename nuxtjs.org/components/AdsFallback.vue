<template>
  <div class="nui-support-nuxt">
    <div class="pr-4 sm:pr-0">
      <BlockedIcon alt="Support NuxtJS" width="125" height="125" class="block mr-4" />
    </div>
    <div>
      <p class="m-0 font-bold sm:text-sm d-text-primary">NuxtJS needs you!</p>
      <p class="p-0 m-0 leading-normal text-gray-600 sm:text-xs">
        By whitelisting nuxtjs.org on your Ad-Blocker, you support our work and help us financially.
      </p>
    </div>
  </div>
</template>

<script>
import BlockedIcon from '~/assets/img/blocked.svg?inline'

export default {
  components: {
    BlockedIcon
  }
}
</script>

<style lang="postcss">
.nui-support-nuxt {
  @apply bg-gray-200 p-4 flex flex-row w-full items-center mt-4 rounded-md;
}

@screen sm {
  .nui-support-nuxt {
    @apply bg-white flex-col w-40 mt-0;
  }
}
</style>
