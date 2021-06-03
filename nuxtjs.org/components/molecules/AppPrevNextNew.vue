<template>
  <div class="flex justify-between items-center">
    <NuxtLink
      v-if="prev"
      data-cy="prev"
      :to="
        localePath({
          name: 'docs-2.x-book-slug',
          params: { book: prevBook, slug: prev.slug }
        })
      "
      class="text-primary-base font-bold hover:underline flex items-center p-2 pl-0"
    >
      <IconArrowLeft class="w-4 h-4 mr-1" />
      <template v-if="prev.menu">
        {{ prev.menu }}
      </template>
      <template v-else>
        {{ prev.title }}
      </template>
    </NuxtLink>
    <span v-else>&nbsp;</span>
    <NuxtLink
      v-if="next"
      data-cy="next"
      :to="
        localePath({
          name: 'docs-2.x-book-slug',
          params: { book: nextBook, slug: next.slug }
        })
      "
      class="text-primary-base font-bold hover:underline flex items-center p-2 pr-0"
    >
      <template v-if="next.menu">
        {{ next.menu }}
      </template>
      <template v-else>
        {{ next.title }}
      </template>
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
      default: ''
    }
  },
  computed: {
    prevBook() {
      if (!this.prev) {
        return
      }

      const dirs = this.prev.dir.split('/').slice(-1)

      return dirs[dirs.length - 1]
    },
    nextBook() {
      if (!this.next) {
        return
      }

      const dirs = this.next.dir.split('/')

      return dirs[dirs.length - 1]
    }
  }
}
</script>
