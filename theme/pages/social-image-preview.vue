<template>
  <div>
    <div class="spacer">
      <h1 class="title">{{ $route.query.title }}</h1>
      <div class="description">{{ $route.query.description }}</div>
      <BuiltWithNuxtLight />
    </div>
  </div>
</template>

<style>
  body {
      text-align: center;
      font-size: 75px;
  }
  .spacer {
      margin: 150px;
  }
  .emoji {
      height: 1em;
      width: 1em;
      margin: 0 .05em 0 .1em;
      vertical-align: -0.1em;
  }

  .title {
      font-size: 2em;
      font-style: normal;
      line-height: 1.8;
  }
</style>
