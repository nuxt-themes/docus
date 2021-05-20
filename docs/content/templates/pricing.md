---
template: marketing
footer: false
---

:::pricing-block{yml}

plans:
  monthly:
    base: true
    title: Month
    label: Monthly
  annual:
    title: Year
    label: Yearly
    preSelected: true
    divider: 12

tiers:
  free:
    price: 
      monthly: 0
      annual: 0
    title: Free
    description: Our Free plan description
    features:
      - Feature One
      - Feature Two
  starter:
    preSelected: true
    price: 
      monthly: 10
      annual: 100
    title: Starter
    description: Our Starter plan pretty long multiline description
    features:
      - All Free Tier features
      - Feature Three
      - Feature Four
  pro:
    price: 
      monthly: 100
      annual: 1000
    title: Pro
    description: Our Pro plan description
    features:
      - All Starter Tier features
      - Feature Five
      - Feature Six

meta: 
  currency: $
  featuresTitle: 'Included features:'
  buttonText: Choose plan
  preSelectedBadge: Popular
  checkoutText: 'Total:'
  checkoutButtonText: Checkout

:::
 