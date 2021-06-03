---
title: 'API: ignore 属性'
description: 为Nuxt.js应用程序自定义忽略文件
menu: ignore
category: configuration
position: 114
---

# .nuxtignore

您可以使用`.nuxtignore`文件让 Nuxt.js 在构建打包阶段忽略项目根目录(`rootDir`)中的布局(`layout`)，页面(`page`)，`store`和中间件(`middleware`)文件。`.nu​​xtignore`文件与.gitignore 和.eslintignore 文件的规范相同，其中每一行都是一个 glob 模式，指定应该忽略哪些文件。

例如:

```
# ignore layout foo.vue
layouts/foo.vue
# ignore layout files whose name ends with -ignore.vue
layouts/*-ignore.vue

# ignore page bar.vue
pages/bar.vue
# ignore page inside ignore folder
pages/ignore/*.vue

# ignore store baz.js
store/baz.js
# ignore store files match *.test.*
store/ignore/*.test.*

# ignore middleware files under foo folder except foo/bar.js
middleware/foo/*.js
!middleware/foo/bar.js
```

> 在[gitignore doc](https://git-scm.com/docs/gitignore)中查看关于规范中的更多配置细节

# ignorePrefix 属性

- 类型: `String`
- 默认: `'-'`

> 如果文件名以`ignorePrefix`指定的前缀开头，则在构建打包期间将忽略 pages / layout / middleware /或 store /中的任何文件

默认情况下，所有以 `-` 开头的文件都将被忽略，例如`store / -foo.js`和`pages / -bar.vue`。

# ignore 属性

- 类型: `Array`
- 默认: `['**/*.test.*', '**/*.spec.*']`

> 比`ignorePrefix`更简单：在构建中将忽略匹配在`ignore`内指定的`ignore`模式的所有文件。
