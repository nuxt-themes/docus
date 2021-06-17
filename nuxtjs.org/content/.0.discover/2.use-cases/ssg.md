---
title: SSG
---

Statically render your Nuxt.js application and get all of benefits of a universal app without a server. The nuxt build && nuxt export command will generate a completely static version of your website. It will generate HTML for every one of your routes and put it inside of its own file. Basically any .vue file that is placed inside the pages folder will be generated as a static html page.

## Benefits of Static Sites

### Search Engine Optimizaton

Static sites are similar to server rendered sites in that the markup is already there which helps search engines and social media crawlers crawl your site. Static sites can also have meta content for each page such as title and description which further improves SEO.

### No server needed

With static sites there is no need for a server. Everything gets generated during the build phase. This means your application gets generated as static files and you can then host all your static files, such as `.html`, `.js` and `.css` files as well as images, for free on any of the static hosting providers such as GitHub pages, Amazon S3, Netlify etc.

### Security

Static site generators create a set of static assets (HTML, CSS, JavaScript and Images) which can be served for a web server or directly from a CDN (content delivery network). As static sites are rendered in advance there are very few vectors for malicious attacks. With static sites we don't need to access the databases or perform logical operations therefore there is no way to inject malicious code. Removing this work from the server improves security.

### Scale

With a statically generated site everything is pre-built and can therefore be cached on a CDN and served directly to the users. Scaling your application is easy as your site has already been generated and each page is ready to be served. Adding more pages or scaling your site requires no extra thoughts on servers and traffic, we simply add the new pages and rebuild and regenerate our site. With some providers, scale is built in, while with others all you have to pay for is the increased bandwidth

### Performance

Performance is a key factor for any site and special focus is put on Time to First byte, which measures the time it takes from the initial request to the first byte received by the browser. Users and search engines demand fast and performant websites that don't take long to load.

There are many reasons that effect performance so how do static sites help in making your site more performant? By pre-generating your site you don't have to worry about letting the server spend time and resources on generating a page for every single HTTP request. And because static sites can be served from a CDN they are therefore closer to the user. A CDN is a distributed group of servers that work together to provide fast delivery of static assets including HTML pages, javascript files, stylesheets, images, and videos.

As our static sites are already generated there is no need for requests to servers to generate content or connect to databases, therefore less distance for your site to travel and less systems for it to interact with. This means that someone requesting your site from another country will be served from a local data centre instead of a server on the other side of the world.

### Less API requests

With static sites there are less API requests as all requests to your API are made at build time. You will only call your API again if you rebuild or regenerate your site. This not only helps performance but perhaps also costs if paying for how often your API is hit.

### Cost

Static sites are free to host. There is no need to pay to host your website as no servers are needed therefore you can host on gitHub pages, Netlify etc. And if your site scales there is no need to worry about extra traffic costs or adding extra servers to deal with the spike in traffic.

## Benefits of Nuxt.js Static Sites

### Faster applications

`nuxt export` will pre-render all your pages to HTML meaning all pages are pre-rendered with your data. On initial page load your HTML file contains all it's content so search engines can easily crawl your site. Nuxt.js also saves a payload file in order to mock `asyncData` and `fetch` for client-side navigation, this means **no HTTP calls to your API on client-side navigation.** By extracting the page payload to a js file, **it also reduces the size of the HTML file** that is \*\*\*\*served as well as preloading it (from the <link> in the header) for best performances. Nuxt.js will also fetch the payloads files which will make navigating between pages instant.

### Crawler Integrated

when working with dynamic pages, such as those coming from an API, these routes cannot be generated in the same way as the pages are generated due to the fact that we need to first make the call to the API to see what these pages are called. These pages will now be generated thanks to the crawler which will crawl every relative link and generate the corresponding pages.

### SPA Fallback

With Nuxt.js it is possible to build a static site that also has some part of it working as a single page application. Basically it is like having a single page application inside your static site. This can be very useful when there are parts of your site that you don't want to be generated as static such as hotel search results pages or payment or admin pages. With a single command and listing the pages or folders that you don't want generated these pages will not be generated but will instead fallback to SPA meaning that no content is generated for these pages at build time and instead they are generated client-side, in the browser, when the user visits the page.

### Locally serve your static site

Once you have statically generated your Nuxt app all its contents will be in the `dist/` folder ready for deployment. In order to see your production ready statically generated site you can use `nuxt serve` which starts a production HTTP server and serve your static app, supporting SPA fallback for those pages that you have excluded for generation.

This command is perfect to locally test your static application before pushing to your favourite static hosting provider.

### Preview mode

Live preview mode out of the box so that your API is called meaning you can see the changes to your content live by using the query of preview. This will automatically refresh the page data by calling `asyncData` and `fetch` which will call the API directly instead of the payload when using the preview query.

### Faster Re-deploy on content changes

Nuxt.js separates your code and data which allows for rebuilding of content without having to rebuild your entire site. By separating `nuxt build` and `nuxt export` we can pre-render your pages only if your content has changed, this means there is no Wepack build required, no new bundles created, therefore faster redeployments.

The first time you generate your site you will need to run `nuxt build` but after that if you only change the content then you only have to run `nuxt export` which will regenerate the payload.js file that contains your content. The HTML files will not be created but will be regenerated with the new content. If you create a new page in the pages folder and only run `nuxt export` then this page will not be created and will not exist as this require webpack to bundle the new page and webpack is not called in `nuxt export`.

However if you are working with dynamic pages, such as an `_slug.vue` file, for your blog posts which are coming from an API for example then a new page will be generated if you add new content in your CMS, or markdown file in your content folder, as the HTML structure and components of this page have already been created and are not changing. The webpack bundle for this page has already been created and Nuxt.js just needs to generate a new page with the new content based on that already created bundle.

When adding new pages or components you will need to rebuild your site using `nuxt build` so that webpack can create a new bundle for the new file but if you are only updating content such as when content comes from an API or making changes to your markdown files then you just need to run `nuxt export`. This makes regenerating your site on content change much faster.

### API is not exposed

As all requests to your API are made at build time to fetch all data and on client navigation data is fetched from a payload file in your static folder that means that your API is never exposed to the client. When inspecting your code in the network tab you will not see a call to your API and only the data returned and saved in the payload.

## How to create a Static Site in Nuxt.js

To create a static site in Nuxt.js you need to set the target to 'static' and use the nuxt build && nuxt export commands which will generate a dist folder full of your static assets. This is the folder that you will then use to deploy your application.

## When to use Static Sites

Static sites can be used for almost any website and if you need to worry about performance, SEO, cost and security then you really should opt for static sites.

With ecommerce site speed is particularly important as customers abandon sites that take too long to load. And as more and more companies are selling online retaining customers is extremely important as well as security. But can we build ecommerce sites as static sites? Many stores only need to update their content such as product prices and availability or add new products to the store. The main things that need to be changed are content. Because Nuxt.js lets you update only the content without having to rebuild the entire site this makes building an ecommerce site as a static site very feasible. What about shopping carts and payments? These can all be handled through Javascript and API's. This means you can create fast, reliable and secure ecommerce sites as static sites.

With static sites by taking advantage of the headless CMS's we can have our content separate to our codebase meaning anyone can update the content of your site without having to have any technical skills. This means there is no end to the sites that can be created as static sites.

With Nuxt.js you can also use a single page application fallback for those pages that you do not want rendered as static such as admin or payment pages meaning you really can have the best of both worlds.
