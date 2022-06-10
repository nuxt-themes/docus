<script setup lang="ts">
import { resolveComponent, shallowRef } from 'vue'
import { useDocus, useRuntimeConfig } from '#imports'

const config = useRuntimeConfig()

const githubComponent = shallowRef()
if (config?.github) {
  githubComponent.value = resolveComponent('GithubLink')
}

const { page, theme } = useDocus()
</script>

<template>
  <div v-if="page" class="u-text-gray-500 mt-8 flex flex-row justify-between text-sm">
    <component :is="githubComponent" v-if="config?.github && theme?.github && theme?.github?.edit" v-slot="data" :content-dir="theme?.github?.root" :page="page">
      <NuxtLink :href="data?.url" target="_blank" rel="noopener" class="hover:text-primary-500 flex items-center gap-1 text-sm">
        <span>Edit this page on GitHub</span>
        <Icon name="heroicons-outline:external-link" class="h-4 w-4" />
      </NuxtLink>
    </component>

    <span v-if="page.mtime" class="flex items-center">Updated on: {{ new Intl.DateTimeFormat('en-US').format(Date.parse(page.mtime)) }}</span>
  </div>
</template>
