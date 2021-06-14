<template>
  <article>
    <AdsFallback v-if="$store.state.adBlocked" />
    <AdsCarbon v-else :key="$route.params.slug" />
  </article>
</template>
