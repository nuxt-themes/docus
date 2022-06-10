<template>
  <div>
    <GithubLastRelease v-slot="{ release }">
      <ProseH2 :id="release.name"> Last Release: {{ release.name }} </ProseH2>

      <p>Version: {{ release.v }}</p>

      <p>URL: {{ release.url }}</p>

      <p>Zipball: {{ release.zipall }}</p>

      <p>Tarball: {{ release.tarball }}</p>

      <p>Is prerelease ?: {{ release.prerelease }}</p>

      <p>Reactions: {{ release.reactions }}</p>

      <p>Author: {{ release.author }}</p>
    </GithubLastRelease>
  </div>
</template>
