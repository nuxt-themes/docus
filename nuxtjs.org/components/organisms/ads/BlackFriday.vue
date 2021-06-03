<template>
  <AppContainer v-if="isDisplayed" class="mt-6 lg:-mt-1 xl:-mt-2">
    <div class="bg-deep-cove bg-blackfriday">
      <SvgIcon
        name="times"
        class="
          fill-current
          text-gray-500
          w-3
          m-2
          float-right
          cursor-pointer
          hover:text-gray-300
        "
        @click.native="isDisplayed = false"
      />
      <a
        href="https://vueschool.io/sales/blackfriday?friend=nuxt&utm_source=Nuxtjs.org&utm_medium=Link&utm_content=TopBanner&utm_campaign=Black%20Friday"
        target="_blank"
        rel="noopener sponsored"
        class="
          px-4
          flex
          items-center
          justify-between
          py-3
          max-w-160
          md:py-2
          md:mx-auto
        "
      >
        <img
          src="/img/blackfriday/percent.png"
          width="47px"
          alt="percent"
          class="w-8 md:w-12"
        />
        <img
          src="/img/blackfriday/vueschool_logo.svg"
          width="160px"
          alt="VueSchool"
          class="hidden lg:inline-block md:max-w-full"
        />
        <img
          src="/img/blackfriday/title.png"
          width="180px"
          alt="BLACK FRIDAY SALE"
          class="max-w-2xs md:max-w-full pulse"
        />
        <img
          src="/img/blackfriday/40off.png"
          width="113px"
          alt="40% off"
          class="w-24 md:w-28 tada"
        />
        <div
          class="
            hidden
            rounded-full
            bg-nuxt-lightgreen
            text-white text-sm
            font-medium
            py-2
            px-4
            lg:inline-block
            md:py-3
            md:px-5
          "
        >
          ENROLL NOW
        </div>
      </a>
    </div>
  </AppContainer>
</template>

<script>
export default {
  data() {
    return {
      isDisplayed: true
    }
  }
}
</script>

<style>
.bg-blackfriday {
  background-image: url('/img/blackfriday/background.png');
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: cover;
}

.bg-deep-cove {
  background-color: #0d0751;
}

.pulse {
  animation: pulse 2s linear infinite;
}

.tada {
  animation: tada 3s linear infinite;
}

@keyframes pulse {
  from {
    transform: scale3d(1, 1, 1);
  }

  50% {
    transform: scale3d(1.05, 1.05, 1.05);
  }

  to {
    transform: scale3d(1, 1, 1);
  }
}

@keyframes tada {
  from {
    transform: scale3d(1, 1, 1);
  }

  10%,
  20% {
    transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);
  }

  30%,
  50%,
  70%,
  90% {
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
  }

  40%,
  60%,
  80% {
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
  }

  to {
    transform: scale3d(1, 1, 1);
  }
}
</style>
