<template>
  <GithubLastRelease v-slot="{ release }">
    <div>
      <ProseH2 :id="release.name" class="!mt-0">{{ release.name }}</ProseH2>
      <ContentRenderer :value="release" />
    </div>
  </GithubLastRelease>
</template>
