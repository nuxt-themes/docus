<template>
  <blockquote class="tweet" :class="`tweet-${layout}`">
    <div class="flex mb-4 author">
      <a :href="profileUrl" target="_blank" rel="noopener noreferrer nofollow">
        <nuxt-img
          :src="avatar"
          :alt="name"
          class="rounded-full"
          height="48"
          width="48"
          :class="{ 'h-12 w-12': layout === 'tweet', 'w-6 h-6': layout === 'quote' }"
        />
      </a>
      <div class="flex-1 ml-2">
        <a :href="profileUrl" target="_blank" rel="noopener noreferrer nofollow">
          <span class="font-bold text-black dark:text-white" :class="{ block: layout === 'tweet' }">
            {{ name }}
          </span>
          <span class="text-sm text-gray-400">@{{ username }}</span>
        </a>
        <template v-if="layout !== 'tweet'">
          ·
          <a :href="tweetUrl" target="_blank" rel="noopener noreferrer nofollow" class="text-sm hover:text-blue-600">
            {{ $d(createdAt, 'long') }}
          </a>
        </template>
      </div>
      <a v-if="layout === 'tweet'" :href="tweetUrl" target="_blank" rel="noopener noreferrer nofollow">
        <IconTwitter title="View on Twitter" role="img" class="text-blue-500" />
      </a>
    </div>
    <slot />
    <div v-if="layout === 'tweet'" class="flex mt-2">
      <a
        :href="likeUrl"
        target="_blank"
        rel="noopener noreferrer nofollow"
        class="flex items-center hover:text-red-600"
      >
        <IconHeart class="mr-2" />
        {{ heartCount }}
      </a>
      <a :href="tweetUrl" target="_blank" rel="noopener noreferrer nofollow" class="ml-4 hover:text-blue-600">
        {{ $d(createdAt, 'long') }}
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
    tweetUrl() {
      return `https://twitter.com/${this.username}/status/${this.id}`
    },
    profileUrl() {
      return `https://twitter.com/${this.username}`
    },
    likeUrl() {
      return `https://twitter.com/intent/like?tweet_id=${this.id}`
    }
  },
  mounted() {
    const playButton = this.$el.querySelector('.Icon--playCircle')
    if (playButton) {
      playButton.addEventListener('click', this.playVideo)
    }
  },
  methods: {
    playVideo({ target }) {
      const wrapper = target.parentNode.parentNode
      const size = wrapper.getBoundingClientRect()
      const iframe = document.createElement('iframe')
      iframe.setAttribute('src', `https://twitter.com/i/videos/${this.id}?embed_source=facebook`)
      iframe.setAttribute('width', size.width)
      iframe.setAttribute('referrerpolicy', 'no-referrer')
      iframe.setAttribute('allow', 'autoplay')
      iframe.setAttribute('height', size.height)
      wrapper.innerHTML = ''
      wrapper.appendChild(iframe)
    }
  }
}
</script>

<style lang="postcss">
blockquote.tweet {
  @apply my-5 p-6 pb-3 border border-gray-300 rounded-md mx-auto b-0 not-italic;
  @apply dark:border-gray-700;
  width: calc(min(100%, 550px)) !important;
  & img {
    @apply m-0;
  }
}
.tweet .link {
  @apply block;
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
.tweet .media-image {
  @apply m-0;
}
.tweet .NaturalImage {
  @apply mt-2 flex flex-wrap rounded-md overflow-hidden relative;
}
.tweet .NaturalImage .media-image {
  @apply w-full object-cover;
}

.tweet .ImageGrid--2 {
  @apply mt-2 grid grid-cols-2 gap-1 rounded-md overflow-hidden;
}
.tweet .ImageGrid--2 .media-image {
  height: 300px;
  @apply object-cover;
}

.tweet .ImageGrid--3 {
  @apply mt-2 grid grid-cols-2 gap-1 grid-rows-2 rounded-md overflow-hidden;
}
.tweet .ImageGrid--3 .media-image {
  height: 150px;
  @apply object-cover;
}
.tweet .ImageGrid--3 .media-image:nth-child(3n + 2) {
  height: 100%;
  @apply row-span-2;
}

.tweet .ImageGrid--4 {
  @apply mt-2 grid grid-cols-2 gap-1 grid-rows-2 rounded-md overflow-hidden;
}
.tweet .ImageGrid--4 .media-image {
  height: 150px;
  @apply object-cover;
}
.tweet .PlayButton--centered {
  @apply absolute top-0 right-0 left-0 bottom-0;
}
.tweet .Icon--playCircle {
  width: 150px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  @apply absolute cursor-pointer rounded-full bg-gray-600 text-white bg-opacity-80 p-4;

  &:after {
    content: 'Load Video';
    @apply flex items-center justify-center;
  }
}
</style>
