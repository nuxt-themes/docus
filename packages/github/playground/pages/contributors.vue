<template>
  <div>
    <GithubContributors v-slot="{ contributors }">
      <div v-for="contributor in contributors" :key="contributor.login">
        <div :id="contributor.login">
          <img style="height: 32px; width: 32px" :src="contributor.avatar_url" />
          {{ contributor.login }}
        </div>
      </div>
    </GithubContributors>
  </div>
</template>
