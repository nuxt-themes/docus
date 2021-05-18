<template>
  <div>
    {{ selectedPlan }}
    <button
      v-for="(value, plan) in mock.plans"
      :key="plan"
      :class="{
        'bg-red-500': selectedPlan === plan
      }"
      @click="selectedPlan = plan"
    >
      {{ plan }}
    </button>
    <div
      v-for="(value, tier) in mock.tiers"
      :key="tier"
      :class="{
        'bg-red-500': selectedTier === tier
      }"
      @click="selectedTier = tier"
    >
      {{ value.title }}
    </div>
    <div>TOTAL: {{ mock.tiers[selectedTier].price[selectedPlan] }}</div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    plans: {
      type: Array,
      default: () => []
    }
  },
  setup() {
    const mock = {
      plans: {
        monthly: {},
        annual: {
          selected: true
        }
      },
      tiers: {
        free: {
          price: {
            monthly: 0,
            annual: 0
          },
          title: 'Free',
          description: 'Our Free plan'
        },
        starter: {
          price: {
            monthly: 10,
            annual: 100
          },
          title: 'Starter',
          description: 'Our Starter plan',
          selected: true
        },
        pro: {
          price: {
            monthly: 100,
            annual: 1000
          },
          title: 'Pro',
          description: 'Our Pro plan'
        }
      }
    }
    let selectedPlan = null
    let selectedTier = null
    Object.keys(mock.plans).forEach(plan => {
      if (mock.plans[plan].selected) selectedPlan = plan
    })
    Object.keys(mock.tiers).forEach(tier => {
      if (mock.tiers[tier].selected) selectedTier = tier
    })
    return { mock, selectedPlan, selectedTier }
  }
})
</script>
