<template>
  <div class="flex flex-col md:flex-row justify-center items-center md:items-stretch flex-wrap my-2 md:my-8">
    <div v-for="(tier, tierName) in tiers" :key="tierName" class="w-full md:w-1/3 p-2 max-w-md">
      <div
        class="border rounded-lg flex flex-col p-4 h-full relative"
        :class="[
          selectedTier === tierName
            ? 'bg-primary-500 border-primary-500 text-white'
            : 'border-gray-200 dark:border-gray-700'
        ]"
      >
        <InfoLabel
          v-if="tier.preSelected"
          :label="meta.preSelectedBadge"
          class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />

        <div class="flex justify-center text-2xl font-semibold my-2 text-center">
          {{ tier.title }}
        </div>
        <div
          class="flex justify-center text-center mb-8"
          :class="[selectedTier === tierName ? 'text-primary-200' : 'text-gray-500']"
        >
          {{ tier.description }}
        </div>

        <div class="flex justify-center mb-8">
          <div class="font-medium mr-1" :class="[selectedTier === tierName ? 'text-primary-300' : 'text-gray-400']">
            {{ meta.currency }}
          </div>
          <div class="font-bold text-5xl leading-none tracking-tighter mr-1">
            {{ plans[selectedPlan] && plans[selectedPlan].divider ? getBasePricing(tier) : tier.price[selectedPlan] }}
          </div>
          <div
            class="self-end lowercase font-medium"
            :class="[selectedTier === tierName ? 'text-primary-300' : 'text-gray-400']"
          >
            / {{ plans[basePlan].title }}
          </div>
        </div>

        <div class="mb-8">
          <div class="font-medium mb-2">{{ meta.featuresTitle }}</div>
          <ul>
            <li
              v-for="feature in tier.features"
              :key="feature"
              class="flex items-center py-0.5"
              :class="[selectedTier === tierName ? 'text-primary-200' : 'text-gray-500 dark:text-gray-400']"
            >
              <IconCheck class="w-4 h-4 mr-2" />
              <span>{{ feature }}</span>
            </li>
          </ul>
        </div>
        <div class="flex items-end flex-1">
          <button
            class="
              inline-block
              w-full
              font-semibold
              text-center
              items-center
              flex-none
              px-6
              py-3
              text-lg
              leading-6
              rounded-md
              border border-transparent border-l-0
              focus:outline-none
              select-none
            "
            :class="[
              selectedTier === tierName
                ? 'bg-primary-50 hover:bg-primary-100 text-primary-500'
                : 'bg-primary-500 hover:bg-primary-600 text-white'
            ]"
            @click="$emit('selectTier', tierName)"
          >
            {{ meta.buttonText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    tiers: {
      type: Object,
      default: () => {}
    },
    meta: {
      type: Object,
      default: () => {}
    },
    plans: {
      type: Object,
      default: () => {}
    },
    selectedTier: {
      type: String,
      default: ''
    },
    selectedPlan: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    let basePlan = null

    function getBasePricing(tier) {
      const price = tier.price[props.selectedPlan] / props.plans[props.selectedPlan].divider
      return price > 0 ? price.toFixed(2) : 0
    }

    Object.keys(props.plans).forEach(plan => {
      if (props.plans[plan] && props.plans[plan].base) basePlan = plan
    })

    return { getBasePricing, basePlan }
  }
})
</script>
