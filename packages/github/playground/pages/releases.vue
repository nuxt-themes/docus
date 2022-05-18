<template>
  <div>
    <GithubReleases v-slot="{ releases }">
      <div v-for="release in releases" :key="release.name">
        <ProseH2 :id="release.name">
          {{ release.name }}
        </ProseH2>

        <Document :value="release" />

        <p>Version: {{ release.v }}</p>

        <p>URL: {{ release.url }}</p>

        <p>Zipball: {{ release.zipall }}</p>

        <p>Tarball: {{ release.tarball }}</p>

        <p>Is prerelease ?: {{ release.prerelease }}</p>

        <p>Reactions: {{ release.reactions }}</p>

        <p>Author: {{ release.author }}</p>
      </div>
    </GithubReleases>
  </div>
</template>
