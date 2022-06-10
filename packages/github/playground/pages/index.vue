<template>
  <div>
    <GithubRepository v-slot="{ repository }">
      <div>
        <pre>{{ repository }}</pre>
      </div>
    </GithubRepository>
  </div>
</template>
