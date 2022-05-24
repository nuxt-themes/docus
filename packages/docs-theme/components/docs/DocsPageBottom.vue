<script setup lang="ts">
import { resolveComponent, shallowRef } from 'vue'
import { useDocus, useRuntimeConfig } from '#imports'

const config = useRuntimeConfig()

const githubComponent = shallowRef()
if (config?.github) {
  githubComponent.value = resolveComponent('EditOnGithub')
}

const { page, theme } = useDocus()
</script>

<template>
  <div v-if="page" class="text-secondary mt-8 flex flex-row justify-between text-sm">
    <component :is="githubComponent" v-if="config?.github && theme?.github && theme?.github?.edit" v-slot="data" :content-dir="theme?.github?.root" :page="page">
      <NuxtLink :href="data?.url" target="_blank" rel="noopener" class="flex items-center transition-colors hover:text-primary-hover transition-base">
        <Icon name="heroicons-outline:pencil-alt" class="w-6 h-6 mr-1" />
        <span>Edit on GitHub</span>
      </NuxtLink>
    </component>

    <span v-if="page.mtime" class="flex items-center">Updated on: {{ new Intl.DateTimeFormat('en-US').format(Date.parse(page.mtime)) }}</span>
  </div>
</template>
