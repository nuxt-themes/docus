---
title: 'API: build 프로퍼티'
description: Nuxt.js를 사용하면 당신의 웹 어플리케이션을 원하는대로 빌드할 수 있도록 webpack 설정을 사용자 정의할 수 있습니다.
menu: build
category: configuration
position: 101
---

# build 프로퍼티

> Nuxt.js를 사용하면 당신의 웹 어플리케이션을 원하는대로 빌드할 수 있도록 webpack 설정을 사용자 정의할 수 있습니다.

## analyze

> Nuxt.js는 [webpack-bundle-analyzer](https://github.com/th0r/webpack-bundle-analyzer)를사용하여 번들을 시각화, 최적화 할 수 있도록 알려줍니다.

- 타입: `Boolean` or `Object`
- 기본값: `false`

만약 object라면 [여기](https://github.com/th0r/webpack-bundle-analyzer#as-plugin) 작성된 문서처럼 프로퍼티를 사용할 수 있습니다.

예제 (`nuxt.config.js`):

```js
module.exports = {
  build: {
    analyze: true
    // or
    analyze: {
      analyzerMode: 'static'
    }
  }
}
```

<div class="Alert Alert--teal">

**정보:** `nuxt build --analyze` 또는 `nuxt build -a` 명령어를 사용하여 당신의어플리케이션을 빌드하거나 [http://localhost:8888](http://localhost:8888)로 시각화하여 실행할 수 있습니다.

</div>

## babel

- 타입: `Object`

> JS와 Vue 파일에 대한 babel 설정을 사용자 정의 합니다.

기본값:

```js
{
  presets: ['@nuxt/babel-preset-app']
}
```

예제 (`nuxt.config.js`):

```js
module.exports = {
  build: {
    babel: {
      presets: ['es2015', 'stage-0']
    }
  }
}
```

## extend

- 타입: `Function`

> 클라이언트 및 서버 번들에 대한 webpack 구성을 수동으로 확장합니다.

확장은 두번 호출되는데, 한 번은 서버 번들, 또 한번은 클라이언트 번들에서 입니다. 메서드의 인자는 아래와 같습니다:

1. Webpack 설정 object
2. 다음 키가 있는 객체 (모두 boolean): `isDev`, `isClient`, `isServer`

예제 (`nuxt.config.js`):

```js
module.exports = {
  build: {
    extend(config, { isClient }) {
      // 오직 client-bundle을 위한 webpack 설정만을 확장합니다.
      if (isClient) {
        config.devtool = 'eval-source-map'
      }
    }
  }
}
```

기본 webpack 구성에 대해 더 알고싶다면 [webpack 폴더](https://github.com/nuxt/nuxt.js/tree/dev/packages/webpack/src/config) 를 확인해주세요.

## filenames

- 타입: `Object`

> 사용자가 정의한 번들 파일이름

- 기본값:

  ```js
  {
    app: ({ isDev }) => isDev ? '[name].js' : '[contenthash].js',
    chunk: ({ isDev }) => isDev ? '[name].js' : '[contenthash].js',
    css: ({ isDev }) => isDev ? '[name].css' : '[contenthash].css',
    img: ({ isDev }) => isDev ? '[path][name].[ext]' : 'img/[contenthash:7].[ext]',
    font: ({ isDev }) => isDev ? '[path][name].[ext]' : 'fonts/[contenthash:7].[ext]',
    video: ({ isDev }) => isDev ? '[path][name].[ext]' : 'videos/[contenthash:7].[ext]'
  }
  ```

예제 (`nuxt.config.js`):

```js
export default {
  build: {
    filenames: {
      chunk: ({ isDev }) => (isDev ? '[name].js' : '[id].[contenthash].js')
    }
  }
}
```

To understand a bit more about the use of manifest and vendor, take a look at this manifest 와 vendor의 사용법에 대해 자세히 알아 보시려면 [Webpack 문서](https://webpack.js.org/guides/code-splitting-libraries/)를 확인해주세요.

## loaders

- 타입: `Array`
  - Items: `Object`

> 사용자가 정의한 webpack loaders

기본값:

```js
;[
  {
    test: /\.(png|jpe?g|gif|svg)$/,
    loader: 'url-loader',
    query: {
      limit: 1000, // 1초
      name: 'img/[name].[hash:7].[ext]'
    }
  },
  {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    loader: 'url-loader',
    query: {
      limit: 1000, // 1초
      name: 'fonts/[name].[hash:7].[ext]'
    }
  }
]
```

예제 (`nuxt.config.js`):

```js
module.exports = {
  build: {
    loaders: [
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'url-loader',
        query: {
          limit: 10000, // 10KO
          name: 'img/[name].[hash].[ext]'
        }
      }
    ]
  }
}
```

<div class="Alert Alert--orange">

`nuxt.config.js`에 loaders가 정의되어 있다면, 기본 loaders를 덮어씁니다.

</div>

## plugins

- 타입: `Array`
- 기본값: `[]`

> Webpack plugins 추가

예제 (`nuxt.config.js`):

```js
const webpack = require('webpack')

module.exports = {
  build: {
    plugins: [
      new webpack.DefinePlugin({
        'process.VERSION': require('./package.json').version
      })
    ]
  }
}
```

## postcss

- 타입: `Array`

> 사용자 정의 [postcss](https://github.com/postcss/postcss) 옵션

기본값:

```js
;[
  require('autoprefixer')({
    browsers: ['last 3 versions']
  })
]
```

예제 (`nuxt.config.js`):

```js
module.exports = {
  build: {
    postcss: [
      require('postcss-nested')(),
      require('postcss-responsive-type')(),
      require('postcss-hexrgba')(),
      require('autoprefixer')({
        browsers: ['last 3 versions']
      })
    ]
  }
}
```

## publicPath

- 타입: `String`
- 기본값: `'/_nuxt/'`

> Nuxt.js는 최대한의 성능 향상을 위해 dist 파일들을 CDN에 업로드 할 수 있게 도와주는데, `publicPath`에 당신의 CDN을 간단하게 설정할 수 있습니다.

예제 (`nuxt.config.js`):

```js
module.exports = {
  build: {
    publicPath: 'https://cdn.nuxtjs.org'
  }
}
```

그러면, `nuxt build` 명령어를 실행했을 때, `.nuxt/dist/` 폴더를 당신의 CDN에 업로드 합니다.

## vendor

> Nuxt.js는 생성된 `vendor.bundle.js` 파일 내에 모듈을 추가하여 어플리케이션 번들의 용량을 줄여줍니다. 이것은 외부 모듈을 사용할 때 정말 효율적입니다 (예를들어 `axios`).

- 타입: `Array`
- Items: `String`

vendor 번들 안에 모듈/파일을 추가하려면 `nuxt.config.js`안에 `build.vendor`키를추가해주세요:

```js
module.exports = {
  build: {
    vendor: ['axios']
  }
}
```

사용자가 만든 라이브러리의 파일 경로를 정의할 수도 있습니다:

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
