<template>
  <footer class="light:bg-gray-50 dark:bg-secondary-darker" aria-labelledby="footerHeading">
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
      <div class="pb-8 xl:grid xl:grid-cols-5 xl:gap-8">
        <div class="grid grid-cols-2 gap-8 xl:col-span-4">
          <div v-for="i in 2" :key="i">
            <MFooterLink
              :links="i === 1 ? links.slice(0, 2) : links.slice(2, 4)"
              class="md:grid md:grid-cols-2 md:gap-8"
            />
          </div>
        </div>
        <MFooterLanguage class="mt-12 xl:mt-0" />
      </div>
      <MFooterNewsLetter
        class="
          border-t
          light:border-gray-200
          dark:border-secondary-light
          pt-8
          lg:flex lg:items-center lg:justify-between
          xl:mt-0
        "
      />
      <MFooterFoot
        class="
          mt-8
          border-t border-gray-200
          dark:border-secondary-light
          pt-8
          md:flex md:items-center md:justify-between
          flex-row-reverse
        "
      />
    </div>
  </footer>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  setup() {
    const links = [
      {
        title: 'Solutions',
        subLinks: [
          {
            title: 'Marketing',
            href: '#'
          },
          {
            title: 'Analytics',
            href: '#'
          },
          {
            title: 'Commerce',
            href: '#'
          },
          {
            title: 'Insights',
            href: '#'
          }
        ]
      },
      {
        title: 'Support',
        subLinks: [
          {
            title: 'Pricing',
            href: '#'
          },
          {
            title: 'Documentation',
            href: '#'
          },
          {
            title: 'Guides',
            href: '#'
          },
          {
            title: 'API Status',
            href: '#'
          }
        ]
      },
      {
        title: 'Company',
        subLinks: [
          {
            title: 'About',
            href: '#'
          },
          {
            title: 'Blog',
            href: '#'
          },
          {
            title: 'Jobs',
            href: '#'
          },
          {
            title: 'Press',
            href: '#'
          },
          {
            title: 'Partners',
            href: '#'
          }
        ]
      },
      {
        title: 'Legal',
        subLinks: [
          {
            title: 'Claim',
            href: '#'
          },
          {
            title: 'Privacy',
            href: '#'
          },
          {
            title: 'Terms',
            href: '#'
          }
        ]
      }
    ]

    return { links }
  }
})
</script>
