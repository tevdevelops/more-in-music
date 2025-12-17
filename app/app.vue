<template>
  <div class="min-h-screen flex flex-col">
    <AppNavbar />
    <main class="flex-grow pt-16">
      <NuxtPage />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
useHead({
  htmlAttrs: {
    lang: 'en',
  },
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  ],
})
</script>

<style>
body {
  font-family: 'Montserrat', sans-serif;
}
</style>
