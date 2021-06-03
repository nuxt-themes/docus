---
title: 客户端专用插件
description: 在此示例中，展示了如何使用插件，使其仅在客户端可用
position: 402
category: plugins
csb_link: https://codesandbox.io/embed/github/nuxtlabs/examples/tree/master/plugins/client-only-plugins?fontsize=14&hidenavigation=1&module=%2Fplugins%2Fclient-only.client.js&theme=dark&view=editor
---

在此示例中，展示了如何使用插件，使其仅在客户端可用

<example-intro></example-intro>

`plugins/client-only.client.js` 使用 `window.alert()` 方法，这在服务器端不可用。

`nuxt.config.js` 包含 `plugins` 属性，可以通过添加`.client`扩展名使其仅在客户端注册插件。

<base-alert type="next">

在以下目录中了解更多信息 [plugins](/docs/2.x/directory-structure/plugins#client-or-server-side-only)

</base-alert>

<code-sandbox :src="csb_link"></code-sandbox>
