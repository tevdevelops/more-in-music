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

h1,
h2 {
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.2;
}

h3 {
  font-size: 1.75rem;
  font-weight: 600;
}

h4 {
  font-size: 1.5rem;
  font-weight: 600;
}

h5 {
  font-size: 1.25rem;
  font-weight: 500;
}

h6 {
  font-size: 1rem;
  font-weight: 500;
}
</style>
