<template>
  <div>
    <div v-for="release in releases" :key="release.name">
      <div class="group flex items-center justify-between">
        <h2 :id="release.name">
          {{ release.name }}
        </h2>
        <span class="text-gray-500 group-hover:text-gray-600">
          Released on
          <time
            :datetime="release.date"
            :title="new Date(release.date).toString()"
          >
            {{ release.date | dateFormat }}
          </time>
        </span>
      </div>
      <nuxt-content :document="release" />
    </div>
  </div>
</template>

<script>
const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

export default {
  filters: {
    dateFormat(date) {
      date = new Date(date)
      let s = date.getDate() + ' ' + monthNames[date.getMonth()]
      if (date.getFullYear() < new Date().getFullYear()) {
        s += ' ' + date.getFullYear()
      }
      return s
    }
  },
  data() {
    return {
      releases: []
    }
  },
  async fetch() {
    this.releases = await this.$http.$get('/_releases')
  }
}
</script>
