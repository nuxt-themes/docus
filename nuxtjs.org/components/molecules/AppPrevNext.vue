<template>
  <div class="flex justify-between items-center">
    <NuxtLink
      v-if="prev"
      :to="
        localePath({
          name: 'section-slug',
          params: { slug: prev.slug, section }
        })
      "
      class="text-primary-base font-bold hover:underline flex items-center p-2 pl-0"
    >
      <IconArrowLeft class="w-4 h-4 mr-1" />
      {{ prev.title }}
    </NuxtLink>
    <span v-else>&nbsp;</span>
    <NuxtLink
      v-if="next"
      :to="
        localePath({
          name: 'section-slug',
          params: { slug: next.slug, section }
        })
      "
      class="text-primary-base font-bold hover:underline flex items-center p-2 pr-0"
    >
      {{ next.title }}
      <IconArrowRight class="w-4 h-4 ml-1" />
    </NuxtLink>
    <span v-else>&nbsp;</span>
  </div>
</template>

<script>
export default {
  props: {
    prev: {
      type: Object,
      default: () => null
    },
    next: {
      type: Object,
      default: () => null
    },
    section: {
      type: String,
      required: true
    }
  }
}
</script>
