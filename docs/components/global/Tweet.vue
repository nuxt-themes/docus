<template>
  <div class="tweet">
    <div class="author flex mb-4">
      <img :src="avatar" class="w-12 h-12 rounded-full" />
      <div class="ml-2 flex-1">
        <div class="font-bold text-black dark:text-white">{{ name }}</div>
        <div class="text-sm text-gray-400">@{{ username }}</div>
      </div>
      <IconTwitter class="text-blue-500" />
    </div>
    <div class="content">
      <slot />
    </div>
    <div class="mt-2 flex">
      <a :href="`https://twitter.com/intent/like?tweet_id=${id}`" target="_blank" rel="noopener noreferrer" class="flex items-center hover:text-red-600">
        <IconHeart class="mr-2" />
        {{ heartCount }}
      </a>
      <a :href="`https://twitter.com/transitive_bs/status/${id}`" class="ml-4 hover:text-blue-600">
        {{ $d(createdAt, "long") }}
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: { type: String, default: '' },
    username: { type: String, default: '' },
    avatar: { type: String, default: '' },
    id: { type: String, default: '' },
    heartCount: { type: String, default: '' },
    createdAt: { type: Number, default: 0 }
  },
  data () {
    return {
      tweet: ''
    }
  }
}
</script>

<style>
.tweet {
  @apply my-5 p-6 pb-3 border border-gray-300 rounded-md mx-auto;
  @apply dark:border-gray-700;
  width: calc(min(100vw, 550px))!important;
}
.tweet .emoji {
  @apply w-5 h-5 m-0 inline-block;
}
.tweet .content a {
  @apply text-blue-600;
}

.tweet .image-container-1 {
  @apply mt-2 flex flex-wrap rounded-md overflow-hidden;
}
.tweet .image-container-1 .media-image {
  @apply w-full;
  object-fit: cover;
}

.tweet .image-container-2 {
  @apply mt-2 grid grid-cols-2 gap-1 rounded-md overflow-hidden;
}
.tweet .image-container-2 .media-image {
  height: 300px;
  object-fit: cover;
}

.tweet .image-container-3 {
  @apply mt-2 grid grid-cols-2 gap-1 grid-rows-2 rounded-md overflow-hidden;
}
.tweet .image-container-3 .media-image {
  height: 150px;
  object-fit: cover;
}
.tweet .image-container-3 .media-image:nth-child(3n+2) {
  height: 100%;
  @apply row-span-2;
}

.tweet .image-container-4 {
  @apply mt-2 grid grid-cols-2 gap-1 grid-rows-2 rounded-md overflow-hidden;
}
.tweet .image-container-4 .media-image {
  height: 150px;
  object-fit: cover;
}
</style>
