---
title: 升级
description: 升级Nuxt.js很快，但是更新package.json有点复杂。
position: 6
category: get-started
---

> 升级 Nuxt.js 很快，但是更新 package.json 有点复杂

如果要升级到 Nuxt v2.14，并想使用静态托管，则需要在你的`nuxt.config. js`文件中添加[target:static](/docs/2.x/features/deployment-targets#static-hosting))，以使 generate 命令正常工作。

```js{}[nuxt.config.js]
export default {
  target: 'static'
}
```

## 开始升级

查看发行说明中要升级的版本，以了解该特定版本是否还有其他说明。
更新在 package.json 文件中为 nuxt 软件包指定的版本。
完成此步骤后，说明会有所不同，具体取决于您使用的是 Yarn 还是 NPM。 Yarn 是与 Nuxt 一起使用的首选软件包管理器，因为它是针对测试编写的开发工具。

1. 查看[release notes](/docs/release-notes)中要升级的版本，以了解该特定版本是否还有其他说明。
2. 更新在`package.json`文件中为`nuxt`包指定的版本。

完成此步骤后，说明会有所不同，具体取决于您使用的是 Yarn 还是 NPM。 _[Yarn](https://yarnpkg.com/en/docs/usage) 是与 Nuxt 一起使用的首选软件包管理器，因为它是针对测试编写的开发工具。_

## Yarn

3. 删除`yarn.lock`文件
4. 删除`node_modules`文件夹
5. 运行`yarn`命令
6. 安装完成并运行测试后，也请考虑升级其他依赖项。可以使用`yarn outdated`命令。

## NPM

3. 删除`yarn.lock`文件
4. 删除`node_modules`文件夹
5. 运行`npm install`命令
6. 安装完成并运行测试后，也请考虑升级其他依赖项。可以使用`npm outdated`命令。
