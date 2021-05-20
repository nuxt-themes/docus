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

    <PricingGrid
      :tiers="tiers"
      :plans="plans"
      :meta="meta"
      :selected-plan="selectedPlan"
      :selected-tier="selectedTier"
      @selectTier="selectedTier = $event"
    />

    <div class="flex flex-col items-center">
      <div class="flex flex-col items-center mb-4">
        <div class="text-gray-500 mb-1">{{ meta.checkoutText }}</div>
        <div class="flex items-baseline">
          <div class="flex font-bold text-4xl tracking-tighter mr-1">
            <span class="">{{ meta.currency }}</span>
            <span class="">{{ tiers[selectedTier].price[selectedPlan] }}</span>
          </div>
          <div class="text-gray-600 dark:text-gray-500">/ {{ plans[selectedPlan].title }}</div>
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
    let selectedTier = null

    Object.keys(props.plans).forEach(plan => {
      if (props.plans[plan] && props.plans[plan].preSelected) selectedPlan = plan
    })
    Object.keys(props.tiers).forEach(tier => {
      if (props.tiers[tier] && props.tiers[tier].preSelected) selectedTier = tier
    })

    return { selectedPlan, selectedTier }
  }
})
</script>
