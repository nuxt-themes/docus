---
title: Components
menuTitle: Components
category: Usage
position: 4
---

The theme comes with some default Vue.js components you can use directly in your markdown content.

> You can create your own components in the `components/global/` folder, check out [this section](/writing#vue-components).

### `<alert>`

<code-group>
<code-block label="Preview" active>
<div class="p-4 pb-0 border-2 border-t-0 dark:border-gray-700 rounded-b-md">
<alert>

Check out an info alert with a `codeblock` and a [link](/)!

</alert>
</div>
</code-block>
<code-block label="Code">

```md
<alert>

Check out an info alert with a `codeblock` and a [link](/)!

</alert>
```

</code-block>
</code-group>

| Prop | Type | Default | Values |
|---------|------|-------------| ---|
| `type` | `String` | `'info'` | `['info', 'success', 'warning', 'danger']` |

### `<list>`

<code-group>
<code-block label="Preview" active>

<div class="p-4 border-2 border-t-0 dark:border-gray-700 rounded-b-md">
  <list :items="['Nuxt', 'Docus', 'TailwindCSS']"></list>
</div>

</code-block>
<code-block label="Code">

```md
---
items:
  - Nuxt
  - Docus
  - TailwindCSS
---

<list :items="items"></list>
```

</code-block>
</code-group>

| Prop | Type | Default | Values |
|---------|------|-------------| ---|
| `items` | `Array` | `[]` | Array of string |
| `type` | `String` | `'primary'` | `['primary', 'info', 'success', 'warning', 'danger']` |
| `icon` | `String` | `null` | Used to override the default `type` icon, check out the [icons available](https://github.com/nuxt/content/tree/dev/packages/theme-docs/src/components/global/icons) |

### `<badge>`

<code-group>
  <code-block label="Preview" active>
    <div class="p-4 border-2 border-t-0 dark:border-gray-700 rounded-b-md">
      <badge>v1.2+</badge>
    </div>
  </code-block>
  <code-block label="Code">

```md
<badge>v1.2+</badge>
```

  </code-block>
</code-group>

### `<code-group>`

This component uses `slots`, refer to [`code-block`](#code-block) below.

### `<code-block>`

**Example**

```html
ℹ️ Backslashes are for demonstration

<code-group>
  <code-block label="Yarn" active>

  ```bash
  yarn add docus
  \```

  </code-block>
  <code-block label="NPM">

  ```bash
  npm install docus
  \```

  </code-block>
</code-group>
```

**Result**

<code-group>
  <code-block label="Yarn" active>

  ```bash
  yarn add docus
  ```

  </code-block>
  <code-block label="NPM">

  ```bash
  npm install docus
  ```

  </code-block>
</code-group>

| Prop | Type | Required | Default | Description |
|---------|------|-------------| ---| -- |
| `label` | `String` | yes | | Label to display for the tab |
| `active` | `Boolean` | no | `false` | Select which tab should be active |

### `<code-sandbox>`

Embed CodeSandbox easily in your documentation with great performances, using the [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) to load when visible in the viewport.

<code-group>
  <code-block label="Preview" active>
    <div class="p-4 pb-0 border-2 border-t-0 dark:border-gray-700 rounded-b-md">
      <code-sandbox src="https://codesandbox.io/embed/nuxt-content-l164h?hidenavigation=1&theme=dark"></code-sandbox>
    </div>
  </code-block>
  <code-block label="Code">

```md
---
link: https://codesandbox.io/embed/nuxt-content-l164h?hidenavigation=1&theme=dark
---

<code-sandbox :src="link"></code-sandbox>
```

  </code-block>
</code-group>

| Prop | Type | Required | Value |
|---------|------|-------------| ---|
| `src` | `String` | `true` | Url to CodeSandbox embed |
