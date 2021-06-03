---
title: Modo de Pré-visualização
description: Visualização Instantânea para target static com modo de pré-visualização
category: features
position: 12
---

Com Nuxt.js e o estático total (full static), agora você pode usar a visualização instantânea imediatamente, que chamará sua API ou CMS para que você possa pré-visualizar as alterações antes do deploy.

<base-alert> Disponível apenas quando utilizar o [target:static](/docs/2.x/features/deployment-targets#static-hosting) </base-alert>

O modo de pré-visualização atualizará automaticamente os dados da página, uma vez que usa o `$nuxt.refresh` por debaixo dos panos e, portanto, chama nuxtServerInit, asyncData e fetch no cliente.

Para ativar a visualização instantânea, você precisará adicionar o seguinte plugin:

```js{}[plugins/preview.client.js]
export default function ({ query, enablePreview }) {
  if (query.preview) {
    enablePreview()
  }
}
```

<base-alert>
EnablePreview está disponível apenas no objeto de contexto de plugins. As pré-visualizações são tratadas no cliente e
portanto, o plugin deve ser executado no cliente: preview.client.js
</base-alert>

```js{}[nuxt.config.js]
export default {
  plugins: ['plugins/preview.client.js']
}
```

Depois de adicionar o plugin, você pode gerar seu site e exibi-lo.

<code-group>
<code-block label="npx" active>

```bash
npx nuxt generate
npx nuxt start
```

</code-block>
<code-block label="Yarn" >

```bash
yarn generate
yarn start
```

  </code-block>
</code-group>

Em seguida, você pode ver a pré-visualização da sua página, adicionando o parâmetro de consulta ao final da página que deseja ver:

```js
?preview=true
```

<base-alert>
enablePreview deve ser testado localmente com yarn start e não yarn
dev
</base-alert>

### Pré-visualizando páginas que ainda não foram geradas

Para páginas que ainda não foram geradas, o fallback SPA ainda chamará a API antes de mostrar a página 404, pois essas páginas existem na API, mas ainda não foram geradas.

Se você implementou o hook validate, você, provavelmente, precisará modificá-lo para que você não seja redirecionado à página 404 no modo de pré-visualização.

```js
validate({ params, query }) {
  if (query.preview) {
    return true
}
```

### Passando dados ao enablePreview

Você pode passar dados à função `enablePreview`. Esses dados estarão disponíveis no contexto como `$preview` e no `this.$preview`.

### O que vem em seguida

<base-alert type="next">

Confira o [livro de Estrutura de Diretórios](/docs/2.x/directory-structure/nuxt)

</base-alert>
