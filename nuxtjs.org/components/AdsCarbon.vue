<template>
  <div ref="carbonads" class="Carbon" />
</template>

<script>
export default {
  name: 'AdsCarbon',
  mounted() {
    if (this.$refs.carbonads) {
      const script = document.createElement('script')
      script.setAttribute('type', 'text/javascript')
      script.setAttribute('src', '//cdn.carbonads.com/carbon.js?serve=CKYILK7U&placement=nuxtjsorg')
      script.setAttribute('id', '_carbonads_js')
      this.$refs.carbonads.appendChild(script)
    }
  }
}
</script>

<style lang="postcss">
.dark-mode .Carbon {
  background-color: theme('colors.dark.surface');

  .carbon-text {
    color: theme('colors.dark.onSurfacePrimary');

    &:hover {
      color: theme('colors.dark.onSurfaceSecondary');
    }
  }
}

.light-mode .Carbon {
  background-color: theme('colors.gray.200');

  .carbon-text {
    @apply text-gray-600;

    &:hover {
      @apply text-gray-800;
    }
  }
}

.Carbon {
  @apply p-4 flex flex-col mt-4 max-w-full;

  @screen sm {
    @apply max-w-xs;
  }

  @screen lg {
    @apply mt-0;
    max-width: 160px;
  }

  #carbonads span {
    @apply flex flex-col justify-between;

    .carbon-wrap {
      @apply flex flex-col;

      flex: 1;

      @media (min-width: 320px) {
        @apply flex-row;
      }

      @screen lg {
        @apply flex-col;
      }

      .carbon-img {
        @apply flex items-start justify-center mb-4;

        @media (min-width: 320px) {
          @apply mb-0;
        }

        @screen lg {
          @apply mb-4;
        }
      }

      .carbon-text {
        @apply flex-1 text-sm w-full m-0 text-left block leading-relaxed;

        &:hover {
          @apply no-underline;
        }

        @media (min-width: 320px) {
          @apply ml-4;
        }

        @screen lg {
          @apply ml-0;
        }
      }
    }
  }

  img {
    @apply w-full;
  }

  & .carbon-poweredby {
    @apply ml-2 text-xs text-right text-gray-400 block pt-2;

    &:hover {
      @apply no-underline text-gray-500;
    }
  }
}
</style>
