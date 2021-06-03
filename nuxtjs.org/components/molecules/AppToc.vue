<template>
  <div>
    <h6
      class="mb-3 lg:mb-2 text-gray-500 dark:text-gray-600 uppercase tracking-wide font-bold text-sm lg:text-xs"
    >
      {{ $t('guide.toc_title') }}
    </h6>
    <nav>
      <scrollactive
        highlight-first-item
        active-class="text-green-500"
        tag="ul"
        :offset="100"
      >
        <li
          v-for="link of toc"
          :key="link.id"
          class="text-gray-600 dark:text-gray-500"
          :class="{
            'border-t border-dashed dark:border-gray-800 first:border-t-0 font-semibold':
              link.depth === 2
          }"
        >
          <NuxtLink
            :to="`#${link.id}`"
            data-cy="toc"
            class="block text-sm scrollactive-item transition-transform ease-in-out duration-300 transform hover:translate-x-1"
            :class="{
              'py-2': link.depth === 2,
              'ml-2 pb-2': link.depth === 3
            }"
          >
            {{ link.text }}
          </NuxtLink>
        </li>
      </scrollactive>
    </nav>
  </div>
</template>

<script>
export default {
  props: {
    toc: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.affix {
  height: calc(100vh - 6rem);
  top: 6rem;
}

li {
  list-style: none;
}
</style>
