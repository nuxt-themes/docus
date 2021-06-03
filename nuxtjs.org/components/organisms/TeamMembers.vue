<template>
  <div
    class="
      bg-light-surface
      dark:bg-dark-surface
      rounded
      p-8
      transition-colors
      duration-300
      ease-linear
      w-full
    "
  >
    <h2
      class="
        text-2xl
        xl:text-3xl
        text-center text-light-onSurfacePrimary
        dark:text-dark-onSurfacePrimary
        font-medium
        leading-normal
        mb-6
        pt-4
      "
    >
      {{ title }}
    </h2>
    <div class="flex flex-wrap -mx-2 md:-mx-4">
      <div
        v-for="profile of team"
        :key="profile.name"
        class="w-full md:w-1/2 lg:w-1/3 p-4"
      >
        <div class="rounded p-6">
          <img
            class="h-32 w-32 rounded-full mx-auto"
            :src="`https://github.com/${profile.github}.png`"
          />
          <div
            class="
              text-center
              pt-4
              text-light-onSurfacePrimary
              dark:text-dark-onSurfacePrimary
              transition-colors
              duration-300
              ease-linear
            "
          >
            <h2 class="text-xl">
              {{ profile.name }}
              <span v-if="profile.alias" class="font-normal text-sm">
                ({{ profile.alias }})
              </span>
            </h2>
            <div v-if="profile.role" class="text-gray-600 py-1">
              {{ profile.role }}
            </div>
            <div class="text-sm py-1">
              {{ profile.city }}
            </div>

            <div class="pb-2">
              <a
                :href="`https://github.com/${profile.github}`"
                rel="noopener"
                target="_blank"
                class="mx-1"
              >
                <SvgIcon
                  name="github"
                  class="
                    h-5
                    inline-block
                    text-gray-700
                    hover:text-gray-900
                    cursor-pointer
                    text-light-onSurfacePrimary
                    dark:text-dark-onSurfacePrimary
                    transition-colors
                    duration-300
                    ease-linear
                  "
                />
              </a>
              <a
                v-if="profile.twitter"
                :href="`https://twitter.com/${profile.twitter}`"
                rel="noopener"
                target="_blank"
                class="mx-1"
              >
                <SvgIcon
                  name="twitter"
                  class="
                    h-5
                    ml-1
                    inline-block
                    text-blue-600
                    hover:text-blue-400
                  "
                />
              </a>
              <a
                v-if="profile.website"
                :href="profile.website"
                rel="noopener"
                target="_blank"
                class="mx-1"
              >
                <SvgIcon
                  name="website"
                  class="
                    h-5
                    inline-block
                    text-nuxt-green
                    hover:text-nuxt-lightgreen
                  "
                />
              </a>
            </div>
            <div
              class="
                flex flex-row flex-wrap
                justify-center
                light:text-light-onSurfaceSecondary
                dark:text-dark-onSurfaceSecondary
              "
            >
              <span
                v-for="(badge, i) in profile.badges"
                :key="i"
                class="
                  truncate
                  uppercase
                  tracking-wider
                  font-medium
                  text-ss
                  px-2
                  py-1
                  rounded-full
                  mr-2
                  mb-2
                  border border-light-border
                  dark:border-dark-border
                  transition-colors
                  duration-300
                  ease-linear
                "
              >
                {{ badge }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    team: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped></style>
