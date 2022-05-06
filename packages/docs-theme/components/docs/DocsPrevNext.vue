<script>
import { upperFirst } from 'scule'
import { defineComponent, useDocus } from '#imports'

export default defineComponent({
  setup() {
    const { prev, next } = useDocus()

    return {
      prev,
      next,
    }
  },
  methods: {
    directory(link) {
      const dirs = link.split('/')
      const directory = dirs.length > 1 ? dirs[dirs.length - 2] : ''
      return directory.split('-').map(upperFirst).join(' ')
    },
  },
})
</script>

<template>
  <div v-if="prev || next" class="group mt-8 flex flex-row-reverse items-center justify-between gap-4 font-medium leading-7">
    <div class="flex w-full flex-1 items-center justify-start">
      <NuxtLink
        v-if="prev"
        :to="prev.slug"
        class="transition-base surface-border hover:surface-border-hover hover:text-secondary-hover group inline-flex w-full items-center justify-start truncate rounded-xl border px-4 py-2.5 transition"
      >
        <span class="relative flex flex-col items-end truncate">
          <span class="d-secondary-text mb-1 text-xs leading-tight">
            {{ directory(prev.slug) }}
          </span>

          <span class="flex w-full items-center leading-tight">
            <Icon name="heroicons-outline:chevron-double-left" class="mr-2 h-4 w-4 flex-shrink-0" />
            <span class="truncate">{{ prev.title }}</span>
          </span>
        </span>
      </NuxtLink>
    </div>

    <div class="order-first flex flex-1 justify-end">
      <NuxtLink
        v-if="next"
        :to="next.slug"
        class="transition-base surface-border hover:surface-border-hover hover:text-secondary-hover group inline-flex w-full items-center justify-end truncate rounded-xl border px-4 py-2.5 transition"
      >
        <span class="relative flex flex-col items-start truncate">
          <span class="d-secondary-text mb-1 text-xs leading-tight"> {{ directory(next.slug) }} </span>

          <span class="flex w-full items-center leading-tight">
            <span class="truncate">{{ next.title }}</span>
            <Icon name="heroicons-outline:chevron-double-right" class="ml-2 h-4 w-4 flex-shrink-0" />
          </span>
        </span>
      </NuxtLink>
    </div>
  </div>
</template>
