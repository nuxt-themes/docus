<template>
  <button
    class="
      relative
      overflow-hidden
      px-4
      flex
      items-center
      bg-gray-200
      dark:bg-dark-surface
      dark:text-dark-onSurfaceSecondary
      rounded-full
      h-10
      outline-none
      text-light-onSurfacePrimary
      dark:text-dark-onSurfacePrimary
      transition-colors
      duration-300
      ease-linear
    "
    @click="setCurrentTheme"
  >
    <span
      class="
        relative
        mr-2
        overflow-hidden
        inline-block
        w-5
        h-5
        flex
        items-center
        justify-center
      "
    >
      <SvgIcon
        name="moon"
        class="w-5 h-5 absolute"
        :class="$colorMode.preference === 'dark' ? 'show' : 'hide'"
      />
      <SvgIcon
        name="system"
        class="w-5 h-5 absolute"
        :class="$colorMode.preference === 'system' ? 'show' : 'hide'"
      />
      <SvgIcon
        name="sun"
        class="w-5 h-5 absolute"
        :class="$colorMode.preference === 'light' ? 'show' : 'hide'"
      />
    </span>
    <transition name="from-bottom-to-bottom" mode="out-in">
      <span
        v-if="$colorMode.preference === 'dark'"
        key="dark"
        class="inline-block font-medium mr-1"
      >
        Dark
      </span>
      <span
        v-if="$colorMode.preference === 'system'"
        key="system"
        class="inline-block font-medium mr-1"
      >
        System
      </span>
      <span
        v-else-if="$colorMode.preference === 'light'"
        key="light"
        class="inline-block font-medium mr-1"
      >
        Light
      </span>
    </transition>
  </button>
</template>

<script>
export default {
  props: [],
  data() {
    return {
      //
    }
  },
  methods: {
    setCurrentTheme() {
      this.$colorMode.preference =
        this.$colorMode.preference === 'system'
          ? 'light'
          : this.$colorMode.preference === 'light'
          ? 'dark'
          : 'system'
    }
  }
}
</script>

<style lang="scss" scoped>
button {
  outline: none;
}

.show {
  animation: show-icon 300ms forwards;
}

.hide {
  animation: hide-icon 300ms forwards;
}

@keyframes show-icon {
  from {
    opacity: 0;
    transform: scaleY(0);
    // transform: translate3d(-100%, 10px, 0) rotate(-180deg) scale3d(0.5, 0.5, 0.5);
  }

  to {
    opacity: 1;
    transform: scaleY(1);
    // transform: translate3d(0, 0, 0) rotate(0) scale3d(1, 1, 1);
  }
}

@keyframes hide-icon {
  from {
    opacity: 1;
    transform: scaleY(1);
    // transform: translate3d(0, 0, 0) rotate(0) scale3d(1, 1, 1);
  }

  to {
    opacity: 0;
    transform: scaleY(0);
    // transform:  translate3d(100%, 10px, 0) rotate(180deg) scale3d(0.5, 0.5, 0.5);
  }
}

.from-bottom-to-bottom-enter-active {
  opacity: 1;
  transition: opacity 100ms, transform 100ms cubic-bezier(0.4, 0, 0.2, 1);
}

.from-bottom-to-bottom-leave-active {
  opacity: 1;
  transition: opacity 100ms, transform 100ms cubic-bezier(0.4, 0, 0.2, 1);
}

.from-bottom-to-bottom-enter {
  opacity: 0;
  transform: scaleY(0);
}

.from-bottom-to-bottom-leave-active {
  opacity: 0;
  transform: scaleY(0);
}
</style>
