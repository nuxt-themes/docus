<template>
  <AppContainer aside fluid>
    <!-- TODO: handle layout property -->
    <template #aside>
      <AppAside class="block lg:hidden" />
    </template>
    <DHero
      title="Documentation generator based on Nuxt and Tailwind."
      description="Write in markdown, use Vue components, add style with TailwindCSS and enjoy the power of Nuxt."
      :cta="['Get started', '/get-started/installation']"
      :secondary="['Open on Github', $docus.repoUrl]"
    />
    <DFeatures :features="features" />
  </AppContainer>
</template>

<script>
export default {
  data () {
    return {
      features: [
        {
          icon: 'IconMarkdown',
          title: 'Write Markdown',
          description: 'Getting started with Docus is as simple as writing in Markdown, with frontmatter powering advanced layouts, auto-generated table-of-contents and more.'
        },
        {
          icon: 'IconVue',
          title: 'Vue Components',
          description: 'Add interactivity with a suite of out-of-the-box Vue components made for documentation — or take control and use your own components instead.'
        },
        {
          icon: 'IconNuxt',
          title: 'Nuxt Architecture',
          description: 'Benefit from the entire Nuxt ecosystem — with top performance, SEO optimization, and best practices baked into your site.'
        },
        {
          icon: 'IconTailwind',
          title: 'Tailwind CSS',
          description: 'TailwindCSS 2 (with next-generation JIT compilation) is built in for great developer experience and rapid customization of Docus — no configuration required.'
        },
        {
          icon: 'IconVite',
          title: 'Lightning Fast Development',
          description: 'Using the Vite dev server, development is a breeze — with instant start up and reload, no matter how big your site gets.'
        },
        {
          icon: 'IconLighthouse',
          title: 'Lighthouse Optimized',
          description: 'Chasing an all-green Lighthouse score? Docus uses best practices to ensure low TTI, FCP and LCP.'
        },
        {
          icon: 'IconZap',
          title: 'Smart Static Generation',
          description: 'Host anywhere, from a global CDN to your own static file server. No need to rebuild when your content changes — and regeneration takes only seconds.'
        },
        {
          icon: 'IconPuzzle',
          title: 'Extensible',
          description: 'Docus allows you to fine-tune every detail, whether adding content in custom slots, or replacing entire layout elements.'
        },
        {
          icon: 'IconGithub',
          title: 'Open Source',
          description: 'Docus is released under the MIT license and made with love by the NuxtLabs team.'
        }
      ]
    }
  },
  head () {
    return {
      title: 'Docus - Documentation generator based on Nuxt and Tailwind.'
    }
  }
}
</script>
