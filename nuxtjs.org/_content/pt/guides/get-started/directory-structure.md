---
title: Estrutura de Diretórios
description: A estrutura padrão de uma aplicação Nuxt.js se destina a fornecer um excelente ponto de partida para aplicações de pequeno e grande porte. Você é livre para organizar seu aplicativo como quiser e pode criar outros diretórios como e quando precisar deles.
position: 3
category: get-started
csb_link: https://codesandbox.io/embed/github/nuxt-academy/guides-examples/tree/master/01_get_started/03_directory_structure?fontsize=14&hidenavigation=1&theme=dark
---

A estrutura padrão de aplicações Nuxt.js se destina a fornecer um excelente ponto de partida para aplicações de pequeno e grande porte. Você é livre para organizar sua aplicação como quiser e pode criar outros diretórios como e quando precisar deles.

Vamos criar os diretórios e arquivos que ainda não existem em nosso projeto.

```bash
mkdir components assets static
touch nuxt.config.js
```

Esses são os principais diretórios e arquivos que usamos ao construir uma aplicação Nuxt.js. Você encontrará uma explicação para cada um deles mais abaixo.

<base-alert type="info">

A criação de diretórios com esses nomes habilita algumas funcionalidades em seu projeto Nuxt.js.

</base-alert>

## Diretórios

### O diretório pages

O diretório `pages` contém as views e rotas de sua aplicação. Como você aprendeu no último capítulo, o Nuxt.js lê todos os arquivos `.vue` dentro deste diretório e os usa para criar o roteador da aplicação.

<base-alert type="next">

Saiba mais sobre o [diretório pages](/docs/2.x/directory-structure/pages)

</base-alert>

### O diretório components

O diretório `components` é onde você coloca todos os seus componentes Vue.js que são importados para suas páginas.

Com o Nuxt.js, você pode criar seus componentes e importá-los automaticamente em seus arquivos .vue, o que significa que não há necessidade de importá-los manualmente na seção de script. O Nuxt.js irá escanear e importar automaticamente para você assim que você tiver a opção components ativado.

<base-alert type="next">

Saiba mais sobre o [diretório components](/docs/2.x/directory-structure/components)

</base-alert>

### O diretório assets

O diretório `assets` contém seus arquivos não compiláveis, como seus estilos, imagens ou fontes.

<base-alert type="next">

Saiba mais sobre o [diretório assets](/docs/2.x/directory-structure/assets)

</base-alert>

### O diretório static

O diretório `static` é mapeado diretamente para a raiz do servidor e contém arquivos que devem manter seus nomes (por exemplo, `robots.txt`) _ou_ provavelmente não serão alterados (por exemplo, o favicon).

<base-alert type="next">

Saiba mais sobre o [diretório static](/docs/2.x/directory-structure/static)

</base-alert>

### O arquivo nuxt.config.js

O arquivo `nuxt.config.js` é o único ponto de configuração do Nuxt.js. Se você deseja adicionar módulos ou substituir as configurações padrões, este é o lugar para aplicar as alterações.

<base-alert type="next">

Saiba mais sobre o [arquivo nuxt.config.js](/docs/2.x/directory-structure/nuxt-config)

</base-alert>

### O arquivo package.json

O arquivo `package.json` contém todas as dependências e scripts da sua aplicação.

<app-modal>
  <code-sandbox  :src="csb_link"></code-sandbox>
</app-modal>

## Mais sobre as estruturas de projeto

Existem diretórios e arquivos mais úteis, incluindo [content](/docs/2.x/directory-structure/content), [layouts](/docs/2.x/directory-structure/layouts), [middleware](/docs/2.x/directory-structure/middleware), [modules](/docs/2.x/directory-structure/modules), [plugins](/docs/2.x/directory-structure/plugins) e [store](/docs/2.x/directory-structure/store). Como não são necessários para aplicações pequenas, não serão abordados aqui.

<base-alert type="next">

Para saber mais detalhes sobre todos os diretórios, fique à vontade para ler o [livro de Estrutura de Diretórios](/docs/2.x/directory-structure/nuxt).

</base-alert>
