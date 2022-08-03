<template>
  <GithubRepository v-slot="{ repository }">
    <Repository :value="repository" />
  </GithubRepository>
</template>
