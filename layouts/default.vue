<script setup>
const { page, fetchNavigation } = useContent()

await fetchNavigation()
</script>

<template>
  <div class="w-full flex min-h-screen flex-col">
    <Navbar />

    <div class="min-h-[calc(100vh-12rem)] sm:min-h-[calc(100vh-8rem)] flex flex-col">
      <DocsPage>
        <template #aside>
          <DocsAside v-if="page?.value?.aside || typeof page?.value?.aside === 'undefined'" />
        </template>

        <DocsPageContent>
          <div class="prose dark:prose-invert max-w-none">
            <NuxtPage />
          </div>
        </DocsPageContent>
      </DocsPage>
    </div>

    <Footer />
  </div>
</template>
