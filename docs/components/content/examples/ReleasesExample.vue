<template>
  <GithubReleases v-slot="{ releases }">
    <div v-for="release in releases" :key="release.name">
      <ProseH2 :id="release.name" class="!mt-0">{{ release.name }}</ProseH2>
      <ContentRenderer :value="release" />
    </div>
  </GithubReleases>
</template>
