---
title: CSS 闪烁
description: 为什么 Nuxt.js 应用的页面会出现闪烁？
menu: Why a CSS flash appears
category: development
position: 102
---

# 为什么 Nuxt.js 应用的页面会出现闪烁？

![cssflash](/flash_css.gif)

这是因为在**开发模式**下，为了通过 Webpack 实现热加载，CSS 代码是打包在 JavaScript 代码中，并动态打到页面中去，从而元素重绘引起了闪烁。

不用担心，在生产模式下，CSS 代码会单独打包至独立的文件并置于 head 标签内，不会出现页面闪烁的现象。
