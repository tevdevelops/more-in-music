<template>
  <NewsletterSignup />
  <footer
    class="pt-4 w-full h-[75px] bg-brand-button text-center text-white text-xs rounded-t-[200px] clear-both"
  >
    © {{ currentYear }} More in Music, Inc. All Rights Reserved.
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>
