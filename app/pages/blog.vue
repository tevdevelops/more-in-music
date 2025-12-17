<template>
  <div>
    <!-- Page Header -->
    <div class="mt-[5%] relative overflow-hidden h-[250px] px-0">
      <img
        id="about-header"
        src="/img/blog.png"
        alt="Blog"
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%]"
      />
    </div>

    <!-- DropInBlog -->
    <div class="container mx-auto px-4 my-12">
      <div id="dib-posts"></div>
    </div>

    <!-- Newsletter -->
    <div class="my-12">
      <NewsletterSignup />
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'More in Music - Blog',
  meta: [
    {
      property: 'og:image',
      content: '/img/main-image.jpg',
    },
  ],
  script: [
    {
      async: true,
      src: 'https://io.dropinblog.com/embedjs/39ee9d3f-4ebe-4da0-8c59-7e4a59f13276.js',
    },
  ],
})
</script>
