<template>
  <blockquote class="tweet">
    <div class="flex mb-4 author">
      <a :href="profileUrl" target="_blank" rel="noopener noreferrer nofollow">
        <img :src="avatar" :alt="name" class="rounded-full" :class="{'h-12 w-12': layout === 'tweet', 'w-6 h-6': layout === 'quote'}" />
      </a>
      <div class="flex-1 ml-2">
        <a :href="profileUrl" target="_blank" rel="noopener noreferrer nofollow">
          <span class="font-bold text-black dark:text-white" :class="{'block': layout === 'tweet'}">
            {{ name }}
          </span>
          <span class="text-sm text-gray-400">@{{ username }}</span>
        </a>
        <template v-if="layout !== 'tweet'">
          ·
          <a :href="tweetUrl" target="_blank" rel="noopener noreferrer nofollow" class="text-sm hover:text-blue-600">
            {{ $d(createdAt, "long") }}
          </a>
        </template>
      </div>
      <a v-if="layout === 'tweet'" :href="tweetUrl" target="_blank" rel="noopener noreferrer nofollow">
        <IconTwitter title="View on Twitter" role="img" class="text-blue-500" />
      </a>
    </div>
    <div class="content">
      <slot />
    </div>
    <div v-if="layout === 'tweet'" class="flex mt-2">
      <a :href="likeUrl" target="_blank" rel="noopener noreferrer nofollow" class="flex items-center hover:text-red-600">
        <IconHeart class="mr-2" />
        {{ heartCount }}
      </a>
      <a :href="tweetUrl" target="_blank" rel="noopener noreferrer nofollow" class="ml-4 hover:text-blue-600">
        {{ $d(createdAt, "long") }}
      </a>
    </div>
  </blockquote>
</template>

<script>
export default {
  props: {
    /**
     * Tweet id
     */
    id: { type: String, required: true },
    /**
     *
     * @ignore
     */
    name: { type: String, default: '' },
    /**
     *
     * @ignore
     */
    username: { type: String, default: '' },
    /**
     *
     * @ignore
     */
    avatar: { type: String, default: '' },
    /**
     *
     * @ignore
     */
    heartCount: { type: String, default: '' },
    /**
     *
     * @ignore
     */
    createdAt: { type: Number, default: 0 },
    /**
     *
     * @ignore
     */
    layout: { type: String, default: 'tweet' }
  },
  computed: {
    tweetUrl () {
      return `https://twitter.com/${this.username}/status/${this.id}`
    },
    profileUrl () {
      return `https://twitter.com/${this.username}`
    },
    likeUrl () {
      return `https://twitter.com/intent/like?tweet_id=${this.id}`
    }
  }
}
</script>

<style>
.tweet {
  @apply my-5 p-6 pb-3 border border-gray-300 rounded-md mx-auto;
  @apply dark:border-gray-700;
  width: calc(min(100%, 550px))!important;
}
.tweet.tweet-quote {
  @apply p-3;
}
.tweet .emoji {
  @apply w-5 h-5 m-0 inline-block;
}
.tweet .content p > a {
  @apply text-blue-600;
}

.tweet .image-container-1 {
  @apply mt-2 flex flex-wrap rounded-md overflow-hidden;
}
.tweet .image-container-1 .media-image {
  @apply w-full object-cover;
}

.tweet .image-container-2 {
  @apply mt-2 grid grid-cols-2 gap-1 rounded-md overflow-hidden;
}
.tweet .image-container-2 .media-image {
  height: 300px;
  @apply object-cover;
}

.tweet .image-container-3 {
  @apply mt-2 grid grid-cols-2 gap-1 grid-rows-2 rounded-md overflow-hidden;
}
.tweet .image-container-3 .media-image {
  height: 150px;
  @apply object-cover;
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
  @apply object-cover;
}
</style>
