<script setup>
const props = defineProps({
  throttle: {
    type: Number,
    default: 200
  },
  duration: {
    type: Number,
    default: 2000
  }
})

const nuxtApp = useNuxtApp()

// Options & Data
const data = reactive({
  percent: 0,
  show: false,
  canSucceed: true
})
// Local variables
let _timer = null
let _throttle = null
let _cut

// Functions
function clear () {
  _timer && clearInterval(_timer)
  _throttle && clearTimeout(_throttle)
  _timer = null
}
function start () {
  if (data.show) { return }
  clear()
  data.percent = 0
  data.canSucceed = true

  if (props.throttle) {
    _throttle = setTimeout(startTimer, props.throttle)
  } else {
    startTimer()
  }
}
function increase (num) {
  data.percent = Math.min(100, Math.floor(data.percent + num))
}
function finish () {
  data.percent = 100
  hide()
}
function hide () {
  clear()
  setTimeout(() => {
    data.show = false
    setTimeout(() => {
      data.percent = 0
    }, 400)
  }, 500)
}
function startTimer () {
  data.show = true
  _cut = 10000 / Math.floor(props.duration)
  _timer = setInterval(() => {
    increase(_cut)
  }, 100)
}

// Hooks
nuxtApp.hook('content:middleware:start', start)
nuxtApp.hook('page:start', start)
nuxtApp.hook('page:finish', finish)

onBeforeUnmount(() => clear)
</script>

<template>
  <div
    class="nuxt-progress"
    :class="{
      'nuxt-progress-failed': !data.canSucceed,
    }"
    :style="{
      width: `${data.percent}%`,
      insetInlineStart: data.left,
      opacity: data.show ? 1 : 0,
      backgroundSize: `${(100 / data.percent) * 100}% auto`,
    }"
  />
</template>

<style lang="ts">
css({
  '.nuxt-progress': {
    height: '{docus.loadingBar.height}',
    position: 'fixed',
    top: '0px',
    insetInlineStart: '0px',
    insetInlineEnd: '0px',
    width: '0%',
    opacity: 1,
    transition: 'width 0.1s, height 0.4s, opacity 0.4s',
    background: 'repeating-linear-gradient(to right, {docus.loadingBar.gradientColorStop1} 0%, {docus.loadingBar.gradientColorStop2} 50%, {docus.loadingBar.gradientColorStop3} 100%)',
    zIndex: '999999',
  }
})
</style>
