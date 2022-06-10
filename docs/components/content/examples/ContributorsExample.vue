<template>
  <GithubContributors v-slot="{ contributors }" :query="{ source: '/docs/content/0.index.md' }">
    <div class="flex flex-col gap-2">
      <Contributor v-for="contributor in contributors" :key="contributor.login" :contributor="contributor" />
    </div>
  </GithubContributors>
</template>
