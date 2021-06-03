---
title: 'API: <client-only> 컴포넌트'
description: 클라이언트 사이드에서만 컴포넌트를 렌더링하고 서버사이드에서는 텍스트 placeholder를 보여줍니다.
menu: client-only
category: components
position: 44
---

> 이 컴포넌트는 클라이언트에서만 렌더링 할 목적으로 사용됩니다. 클라이언트에서만컴포넌트를 불러오기 위해서는 해당 컴포넌트를 [client-side only plugin](/guide/plugins#client-side-only)에 등록하세요

<div class="Alert Alert--orange">

**Warning:** Nuxt < `v2.9.0`에서는 `<client-only>` 대신에 `<no-ssr>`을 사용하세요.

</div>

**Props**:

- placeholder: `string`
  - `<client-only />`가 클라이언트 사이드에서 마운트 되기 전까지 텍스트를 placeholder로 사용합니다.

```html
<template>
  <div>
    <sidebar />
    <client-only placeholder="Loading...">
      <!-- 이 컴포넌트는 클라이언트에서만 렌더링 됩니다 -->
      <comments />
    </client-only>
  </div>
</template>
```

**Slots**:

- placeholder:
  - `<client-only />`가 클라이언트 사이드에서 마운트 되기 전까지 slot을 placeholder로 사용합니다.

```html
<template>
  <div>
    <sidebar />
    <client-only>
      <!-- 이 컴포넌트는 클라이언트에서만 렌더링 됩니다 -->
      <comments />

      <!-- 서버사이드에서 렌더링되는 로딩 인디케이터 -->
      <comments-placeholder slot="placeholder" />
    </client-only>
  </div>
</template>
```

이 컴포넌트는 [egoist/vue-client-only](https://github.com/egoist/vue-client-only)로부터 import 되었습니다. Thanks [@egoist](https://github.com/egoist)!
