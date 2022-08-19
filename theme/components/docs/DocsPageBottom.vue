<script setup lang="ts">
import { resolveComponent, shallowRef } from 'vue'

const config = useRuntimeConfig()

const githubLinkComponent = shallowRef()
const githubFileContributorsComponent = shallowRef()
if (config?.github) {
  githubLinkComponent.value = resolveComponent('GithubLink')
  githubFileContributorsComponent.value = resolveComponent('GithubFileContributors')
}

const { page } = useContent()
const docus = useDocus()

const root = computed(() => docus.value.github?.root || '/')

const source = computed(() => root.value + page.value._file || '')
</script>

<template>
  <div v-if="page" class="flex flex-col-reverse justify-between gap-4 mt-8 text-sm u-text-gray-500 md:flex-row">
    <div class="flex flex-col flex-1 w-full gap-4 md:w-1/2">
      <component :is="githubLinkComponent" v-if="page && config?.github && docus?.github && docus?.github?.edit" v-slot="data" :content-dir="root" :page="page">
        <span class="flex">
          <NuxtLink :href="data?.url" target="_blank" rel="noopener" class="flex items-center inline-block gap-2 text-sm hover:text-primary-500 grow-0">
            <Icon name="heroicons-outline:external-link" class="w-5 h-5" />
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
          <span class="flex items-center inline-block gap-2 text-sm grow-0">
            <Icon name="heroicons-outline:user-group" class="w-5 h-5" />
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
              <img :src="contributor.avatar_url" class="inline-block w-6 h-6 transition-colors rounded-full u-ring-gray-200 hover:ring-primary-500 ring-2">
            </NuxtLink>
          </div>
          <span v-else-if="pending" class="block w-6 h-6 opacity-0">&nbsp;</span>
          <span v-else-if="!pending && !contributors?.length" class="block u-text-gray-500">No contributors.</span>
        </div>
      </component>
    </div>
  </div>
</template>
