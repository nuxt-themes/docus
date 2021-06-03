<template>
  <div ref="carbonadsText">
    <div id="bsa-native" />
  </div>
</template>

<script>
export default {
  mounted() {
    if (this.$refs.carbonadsText) {
      this.loadScript()
    }
  },
  methods: {
    loadScript() {
      if (window._bsa) {
        return this.scriptLoaded()
      }
      // Order is important (https://stackoverflow.com/questions/16230886/trying-to-fire-the-onload-event-on-script-tag)
      const script = document.createElement('script')
      script.setAttribute('type', 'text/javascript')
      this.$refs.carbonadsText.appendChild(script)
      script.onload = this.scriptLoaded
      script.setAttribute('src', '//m.servedby-buysellads.com/monetization.js')
    },
    scriptLoaded() {
      if (typeof window._bsa === 'undefined') {
        // eslint-disable-next-line no-console
        return console.warn('Could not load Carbon Ads Text')
      }
      window._bsa.init('custom', 'CKYD62QW', 'placement:nuxtjsorg', {
        target: '#bsa-native',
        template:
          '<a class="native-box" href="##statlink##"><div class="native-sponsor">Sponsor</div><div class="native-text"><strong>##company##</strong> — ##description##</div></a>'
      })
    }
  }
}
</script>

<style lang="scss">
.light-mode #bsa-native {
  .native-box {
    background-color: theme('colors.light.surface');
    // @apply shadow-lg;
    // box-shadow: theme('boxShadow.lg');
    border-color: theme('colors.gray.300');
  }

  .native-text {
    @apply text-light-onSurfacePrimary transition-colors duration-300 ease-linear;
  }
}

.dark-mode #bsa-native {
  .native-box {
    background-color: theme('colors.dark.surface');
    // @apply shadow-lg;
    // box-shadow: theme('boxShadow.lg');
    border-color: theme('colors.gray.900');
  }

  .native-text {
    @apply text-dark-onSurfacePrimary transition-colors duration-300 ease-linear;
  }
}

#bsa-native {
  .native-box {
    @apply transition-colors duration-300 ease-linear;

    align-items: center;
    border: 1px solid transparent;
    border-radius: theme('borderRadius.default');
    // @apply flex p-2 border rounded-lg items-center mb-4;
    display: flex;
    margin-bottom: theme('spacing.4');
    padding: theme('spacing.2');
  }

  a {
    // @apply no-underline;
    text-decoration: none;
  }

  .native-sponsor {
    // @apply bg-primary-base text-white rounded-md uppercase py-1 px-3 font-bold text-xs mx-2;
    background-color: theme('colors.primary.base');
    border-radius: theme('borderRadius.default');
    color: theme('colors.white');
    font-size: theme('fontSize.xs');
    font-weight: 500;
    margin: 0 theme('spacing.2');
    padding: theme('spacing.1') theme('spacing.3');
    text-transform: uppercase;

    &:hover {
      // @apply bg-primary-light;
      background-color: theme('colors.primary.light');
    }
  }

  .native-text {
    font-size: theme('fontSize.base');
    // @apply font-normal text-base pl-2;
    font-weight: 400;
    padding-left: theme('spacing.2');
  }
}
</style>
