---
title: Конфигурация BUILD
description: Nuxt.js позволяет конфигурировать опции webpack'а на ваше усмотрение.
menu: build
category: configuration
position: 101
---

# Build

> Nuxt.js позволяет конфигурировать опции webpack'а на ваше усмотрение.

## analyze

> Nuxt.js использует [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer) для визуализации ваших пакетов и их оптимизации.

- Тип: `Boolean` или `Object`
- По-умолчанию: `false`

Все доступные опции для объекта [здесь](https://github.com/webpack-contrib/webpack-bundle-analyzer#options-for-plugin).

Пример (`nuxt.config.js`):

```js
export default {
  build: {
    analyze: true,
    // или
    analyze: {
      analyzerMode: 'static'
    }
  }
}
```

<div class="Alert Alert--teal">

**Примечание:** вы можете использовать команду `nuxt build --analyze` или `nuxt build -a` для сборки своего приложения и запуска анализатора на [http://localhost:8888](http://localhost:8888).

</div>

## babel

> Конфигурация Babel для JavaScript и Vue файлов.

- Тип: `Object`
- По-умолчанию:

  ```js
  {
    presets: ['@nuxt/babel-preset-app']
  }
  ```

Пример (`nuxt.config.js`):

```js
export default {
  build: {
    babel: {
      presets: ['es2015', 'stage-0']
    }
  }
}
```

## cache

- Тип: `Boolean`
- По-умолчанию: `false`

> Включить кеш [terser-webpack-plugin ](https://github.com/webpack-contrib/terser-webpack-plugin#options) и [cache-loader](https://github.com/webpack-contrib/cache-loader#cache-loader)

## cssSourceMap

- Тип: `boolean`
- По-умолчанию: `true` для dev и `false` для production.

> Включить поддержку CSS Source Map (исходной карты CSS)

## devMiddleware

- Тип: `Object`

Смотри [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware) для доступных вариантов.

## extend

- Тип: `Function`

> Позволяет вручную расширить конфигурацию webpack для клиентских и серверных пакетов.

Функция вызывается дважды, один раз для серверной сборки и один раз для клиентской. Аргументы метода:

1. Конфигурационный объект Webpack
2. Объект со следующими ключами (все логические, кроме `loaders`):`isDev`, `isClient`,`isServer`

Пример (`nuxt.config.js`):

```js
module.exports = {
  build: {
    extend(config, { isClient }) {
      // Расширить конфигурацию webpack только для клиентской сборки
      if (isClient) {
        config.devtool = 'eval-source-map'
      }
    }
  }
}
```

Если вы хотите узнать больше о нашей конфигурации webpack по умолчанию, взгляните на наш [каталог webpack](https://github.com/nuxt/nuxt.js/tree/dev/packages/webpack/src/config).

## build.vendor

> Nuxt.js позволяет добавлять модули в генерируемый файл `vendor.bundle.js`, чтобы уменьшить размер финального приложения. Это действительно полезно при использовании внешних модулей (например, `axios`).

Для добавления стороннего модуля/файла внутрь приложения, создайте параметр `build.vendor` внутри `nuxt.config.js`:

```js
module.exports = {
  build: {
    vendor: ['axios']
  }
}
```

Вы можете также указать путь к файлу, например, к своей собственной библиотеке:

```js
module.exports = {
  build: {
    vendor: ['axios', '~plugins/my-lib.js']
  }
}
```

## followSymlinks

> By default, the build process does not scan files inside symlinks. This boolean includes them, thus allowing usage of symlinks inside folders such as the "pages" folder, for example.

- Type: `Boolean`

```js
export default {
  build: {
    followSymlinks: true
  }
}
```
