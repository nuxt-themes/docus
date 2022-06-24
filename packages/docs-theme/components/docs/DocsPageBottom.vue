<script setup lang="ts">
import { resolveComponent, shallowRef } from 'vue'
import { useDocus, useRuntimeConfig } from '#imports'

const config = useRuntimeConfig()

const githubLinkComponent = shallowRef()
const githubFileContributorsComponent = shallowRef()
if (config?.github) {
  githubLinkComponent.value = resolveComponent('GithubLink')
  githubFileContributorsComponent.value = resolveComponent('GithubFileContributors')
}

const { page, theme } = useDocus()

const root = computed(() => theme.value?.github?.root || '/')

const source = computed(() => root.value + page.value._file || '')
</script>

<template>
  <div v-if="page" class="u-text-gray-500 mt-8 flex flex-col-reverse md:flex-row gap-4 justify-between text-sm">
    <div class="flex-1 flex flex-col gap-4 w-full md:w-1/2">
      <component :is="githubLinkComponent" v-if="page && config?.github && theme?.github && theme?.github?.edit" v-slot="data" :content-dir="root" :page="page">
        <span class="flex">
          <NuxtLink :href="data?.url" target="_blank" rel="noopener" class="gap-2 hover:text-primary-500 flex items-center grow-0 inline-block text-sm">
            <Icon name="heroicons-outline:external-link" class="h-5 w-5" />
            <span>Edit this page on GitHub</span>
          </NuxtLink>
        </span>
      </component>

      <span v-if="page.mtime" class="flex items-center">Updated on: {{ new Intl.DateTimeFormat('en-US').format(Date.parse(page.mtime)) }}</span>
    </div>

    <div class="flex-1 w-full md:w-1/2">
      <component
        :is="githubFileContributorsComponent"
        v-if="page && config?.github && theme?.github && theme?.github?.contributors"
        v-slot="{ contributors, pending }"
        :source="root + page?._file"
      >
        <div class="flex flex-col gap-4">
          <span class="gap-2 flex items-center grow-0 inline-block text-sm">
            <Icon name="heroicons-outline:user-group" class="h-5 w-5" />
            <span>Contributors</span>
          </span>
          <div v-if="contributors?.length" class="flex flex-wrap gap-2">
            <NuxtLink
              v-for="contributor in contributors"
              :key="contributor.login"
              :alt="contributor.name"
              :title="`@${contributor.login} on GitHub`"
              :to="`https://github.com/${contributor.login}`"
            >
              <img :src="contributor.avatar_url" class="transition-colors inline-block h-6 w-6 rounded-full ring-2 u-ring-gray-200 hover:ring-primary-500" />
            </NuxtLink>
          </div>
          <span v-else-if="pending" class="h-6 w-6 opacity-0 block">&nbsp;</span>
          <span v-else-if="!pending && !contributors?.length" class="u-text-gray-500 block">No contributors.</span>
        </div>
      </component>
    </div>
  </div>
</template>
