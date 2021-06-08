<template>
  <div>
    <ul class="flex">
      <li>
        <button class="relative mr-8 text-lg font-bold light:text-gray-800" @click="activeCodeBlock = 'fromCLI'">
          From CLI
          <span v-if="activeCodeBlock === 'fromCLI'" class="absolute -bottom-1.5 left-0 h-0.5 bg-primary-green w-1/3" />
        </button>
      </li>
      <li>
        <button class="relative mr-8 text-lg font-bold light:text-gray-800" @click="activeCodeBlock = 'fromScratch'">
          From Scratch
          <span
            v-if="activeCodeBlock === 'fromScratch'"
            class="absolute -bottom-1.5 left-0 h-0.5 bg-primary-green w-1/3"
          />
        </button>
      </li>
    </ul>

    <!-- Code blocks -->
    <div class="mt-40 mb-40 lg:mt-0 lg:mb-0 w-full" :style="{ height: '300px' }">
      <div class="relative">
        <Transition name="fade">
          <AnimFromCliCodeblock v-if="activeCodeBlock === 'fromCLI'" />
        </Transition>

        <Transition name="fade">
          <AnimFromScratchCodeblock v-if="activeCodeBlock === 'fromScratch'" />
        </Transition>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
  setup() {
    const activeCodeBlock = 'fromCLI'

    return {
      activeCodeBlock
    }
  }
})
</script>
