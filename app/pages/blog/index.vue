<template>
  <div class="bg-white">
    <section class="py-16">
      <PageHeaderBlock :image="blogImage" />
    </section>

    <section
      class="bg-brand-dark/3 border-y border-brand-dark/10 py-16 sm:py-20"
    >
      <div class="container mx-auto px-4">
        <div
          class="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p
              class="text-xs font-semibold uppercase tracking-[0.25em] text-brand-accent"
            >
              Blog
            </p>
            <h2 class="text-3xl font-bold text-brand-dark sm:text-4xl">
              Stories
            </h2>
          </div>
        </div>
        <div
          v-if="posts.length > 0"
          class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          <BlogPostCard v-for="post in posts" :key="post._id" :post="post" />
        </div>
        <div
          v-else
          class="rounded-3xl border border-dashed border-brand-dark/20 bg-white px-8 py-12 text-center text-brand-dark/70"
        >
          <p class="text-lg font-semibold">No posts yet.</p>
          <p class="mt-2 text-sm">
            Check back soon for stories and updates from More In Music.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useSanityPosts } from '~/composables/useSanityPosts'

const fetchedPosts = await useSanityPosts()
const posts = ref((fetchedPosts ?? []).filter(Boolean))

const blogImage = computed(() => ({
  asset: {
    url: '/img/blog.png',
  },
}))

useHead({
  title: 'Blog | More In Music',
  meta: [
    {
      name: 'description',
      content:
        'Stories, updates, and insights from More In Music—uplifting creators, leaders, and the community.',
    },
  ],
})
</script>
