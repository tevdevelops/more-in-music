<template>
  <div>
    <div class="container mx-auto mt-20 mb-8">
      <img
        src="/img/conference-new.png"
        alt="More In Music Conference"
        class="block w-full"
      />
    </div>

    <div class="my-12">
      <NewsletterSignup />
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'More in Music - Conference',
  meta: [
    {
      property: 'og:image',
      content: '/img/main-image.jpg',
    },
  ],
})
</script>
