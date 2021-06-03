---
title: Async data in components?
description: Async data in Nuxt components?
category: development
position: 103
---

Because components do not have an `asyncData` method, you cannot directly fetch async data server side within a component. In order to get around this limitation you have two basic options:

1. Make the API call in the `mounted` hook and set data properties when loaded. _Downside: Won't work for server side rendering._
2. Make the API call in the `asyncData` or `fetch` methods of the page component and pass the data as props to the sub components. Server rendering will work fine. _Downside: the `asyncData` or `fetch` of the page might be less readable because it's loading the data for other components_.
