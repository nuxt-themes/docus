---
title: Atualizando
description: Atualizar o Nuxt.js é rápido, porém mais complexo do que atualizar seu package.json
position: 5
category: get-started
---

> Atualizar o Nuxt.js é rápido, porém mais complexo do que atualizar seu package.json

Se você estiver atualizando para o Nuxt v2.14 e quiser usar hospedagem estática, será necessário adicionar [target: static](/docs/2.x/features/deployment-targets#static-hosting) ao seu arquivo nuxt.config.js para que o comando generate funcione corretamente.

```js{}[nuxt.config.js]
export default {
  target: 'static'
}
```

## Para Começar

1. Verifique as [notas de versão](/docs/release-notes), da versão que deseja atualizar para ver se há instruções adicionais para essa versão específica.
2. Atualize a versão especificada para o pacote `nuxt` em seu arquivo `package.json`.

Após esta etapa, as instruções variam dependendo se você está usando Yarn ou npm. _[Yarn](https://yarnpkg.com/en/docs/usage) é o gerenciador de pacotes recomendado para trabalhar com o Nuxt, pois é a ferramenta de desenvolvimento em que os testes foram escritos._

## Yarn

3. remova o arquivo `yarn.lock`
4. remova o diretório `node_modules`
5. Execute o comando `yarn`
6. Após a instalação ser concluída e você ter executado seus testes, considere atualizar também outras dependências. O comando `yarn outdated` pode ser usado.

## npm

3. remova o arquivo `package-lock.json`
4. remova o diretório `node_modules`
5. Execute o comando `npm install`
6. Após a instalação ser concluída e você ter executado seus testes, considere atualizar também outras dependências. O comando `npm outdated` pode ser usado.
