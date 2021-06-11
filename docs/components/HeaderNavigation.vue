<template>
  <div class="w-full text-right pr-4">
    <ButtonLink v-show="$route.path === '/'" href="/get-started/installation" size="small" bold>
      Get started
    </ButtonLink>

    <ButtonLink v-show="$route.path.includes('templates')" href="/get-started/installation" size="small" bold>
      Back to Docs
    </ButtonLink>
  </div>
</template>
