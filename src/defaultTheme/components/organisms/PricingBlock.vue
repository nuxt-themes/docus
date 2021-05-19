<template>
  <div class="px-2 my-12 md:my-24">
    <div class="flex items-center justify-center my-2 md:my-8">
      <div class="bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
        <button
          v-for="(plan, planName) in plans"
          :key="planName"
          class="
            inline-block
            font-medium
            text-center
            items-center
            flex-none
            px-2
            py-1
            text-sm
            rounded-md
            border border-transparent border-l-0
            focus:outline-none
            select-none
          "
          :class="[
            selectedPlan === planName
              ? 'bg-white dark:bg-gray-600 shadow-sm text-gray-700 dark:text-gray-300'
              : 'text-gray-500 dark:text-gray-400'
          ]"
          @click="selectedPlan = planName"
        >
          {{ plan.label }}
        </button>
      </div>
    </div>

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
          <span
            v-if="tier.preSelected"
            class="
              absolute
              top-0
              left-1/2
              transform
              -translate-x-1/2 -translate-y-1/2
              text-xs text-primary-500
              px-2.5
              py-1.5
              leading-none
              rounded
              font-semibold
              uppercase
              tracking-wide
              bg-primary-100
              dark:bg-primary-900
              dark:text-primary-400
            "
          >
            {{ meta.preSelectedBadge }}
          </span>

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
            <div class="font-medium" :class="[selectedTier === tierName ? 'text-primary-300' : 'text-gray-400']">
              {{ meta.currency }}
            </div>
            <div class="font-bold text-5xl leading-none tracking-tighter">
              {{ plans[selectedPlan] && plans[selectedPlan].divider ? getBasePricing(tier) : tier.price[selectedPlan] }}
            </div>
            <div
              class="self-end lowercase font-medium"
              :class="[selectedTier === tierName ? 'text-primary-300' : 'text-gray-400']"
            >
              /{{ plans[basePlan].title }}
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
              @click="selectedTier = tierName"
            >
              {{ meta.buttonText }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col items-center">
      <div class="flex flex-col items-center mb-4">
        <div class="text-gray-500">{{ meta.checkoutText }}</div>
        <div class="font-bold text-4xl tracking-tighter">
          {{ tiers[selectedTier].price[selectedPlan] }}{{ meta.currency }}
        </div>
      </div>
      <button
        class="
          inline-block
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
          bg-primary-500
          hover:bg-primary-600
          text-white
        "
      >
        {{ meta.checkoutButtonText }}
      </button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    plans: {
      type: Object,
      default: () => {}
    },
    tiers: {
      type: Object,
      default: () => {}
    },
    meta: {
      type: Object,
      default: () => {}
    }
  },
  setup(props) {
    let selectedPlan = null
    let basePlan = null
    let selectedTier = null
    function getBasePricing(tier) {
      const price = tier.price[selectedPlan] / props.plans[selectedPlan].divider
      return price > 0 ? price.toFixed(2) : 0
    }
    Object.keys(props.plans).forEach(plan => {
      if (props.plans[plan] && props.plans[plan].preSelected) selectedPlan = plan
    })
    Object.keys(props.plans).forEach(plan => {
      if (props.plans[plan] && props.plans[plan].base) basePlan = plan
    })
    Object.keys(props.tiers).forEach(tier => {
      if (props.tiers[tier] && props.tiers[tier].preSelected) selectedTier = tier
    })
    return { selectedPlan, selectedTier, getBasePricing, basePlan }
  }
})
</script>
