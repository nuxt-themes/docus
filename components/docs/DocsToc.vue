<script setup lang="ts">
const route = useRoute()

const { activeHeadings, updateHeadings } = useScrollspy()

const { toc, prev, next } = useContent()

watch(route, () => {
  if (process.client) {
    setTimeout(() => {
      updateHeadings([
        ...document.querySelectorAll('.prose h1'),
        ...document.querySelectorAll('.prose h2'),
        ...document.querySelectorAll('.prose h3'),
      ])
    }, 200)
  }
}, {
  immediate: true,
})

function scrollToHeading(id: string, scrollMarginCssVar: string) {
  useScrollToHeading(id, scrollMarginCssVar)
}
</script>

<template>
  <div class="space-y-2">
    <NuxtLink v-if="prev" :to="prev.slug" class="flex lg:flex-row-reverse items-center text-secondary gap-x-3">
      <div class="flex-shrink-0 p-1 u-bg-gray-100 rounded-md">
        <Icon name="heroicons-solid:chevron-double-left" class="w-6 h-6 u-text-gray-400" />
      </div>

      <span>Previous page</span>
    </NuxtLink>

    <template v-if="toc.length">
      <div class="flex lg:flex-row-reverse items-center font-semibold u-text-gray-900 gap-x-3">
        <div class="flex-shrink-0 p-1 u-bg-gray-900 rounded-md">
          <Icon name="heroicons-outline:view-grid" class="w-6 h-6 u-text-white" />
        </div>

        <span>On this page</span>
      </div>

      <ul class="pl-3 lg:pr-3">
        <li v-for="link in toc" :key="link.text" class="border-l-2 lg:border-r-2 lg:border-l-0 min-w-0 lg:text-right" :class="activeHeadings.includes(link.id) ? 'u-border-gray-900' : 'u-border-gray-300'">
          <a
            :href="`#${link.id}`"
            class="text-secondary text-secondary-hover py-1 pl-3 lg:pr-3 block truncate"
            :class="{
              'text-primary-500 dark:text-primary-400': activeHeadings.includes(link.id),
            }"
            @click.prevent="scrollToHeading(link.id, '--docs-scroll-margin-block')"
          >
            {{ link.text }}
          </a>
        </li>
      </ul>
    </template>

    <NuxtLink v-if="next" :to="next.slug" class="flex lg:flex-row-reverse items-center text-secondary group gap-x-3">
      <div class="flex-shrink-0 p-1 u-bg-gray-100 rounded-md transition-base text-secondary-group-hover">
        <Icon name="heroicons-solid:chevron-double-right" class="w-6 h-6 u-text-gray-400" />
      </div>

      <span>Next page</span>
    </NuxtLink>
  </div>
</template>
