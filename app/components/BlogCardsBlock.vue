<template>
  <div class="blog-cards-block">
    <div v-if="header" class="mb-6">
      <h2 class="text-2xl font-bold text-brand-dark sm:text-3xl">
        {{ header }}
      </h2>
    </div>
    <BlogCarousel v-if="filteredPosts.length > 0" :posts="filteredPosts" />
    <div
      v-else
      class="rounded-3xl border border-dashed border-brand-dark/20 bg-white px-6 py-10 text-center text-brand-dark/70"
    >
      <p class="text-base font-semibold">No posts yet.</p>
      <p class="mt-2 text-sm">Check back soon for new stories.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSanityPosts } from '~/composables/useSanityPosts'
import type { SanityPostSummary } from '~/composables/useSanityPosts'

interface Props {
  header?: string
  limit?: number
}

const props = withDefaults(defineProps<Props>(), {
  limit: 6,
})

const fetchedPosts = await useSanityPosts()
const allPosts = ref<SanityPostSummary[]>((fetchedPosts ?? []).filter(Boolean))

const effectiveLimit = computed(() => props.limit ?? 6)

const filteredPosts = computed(() => {
  const list = allPosts.value
  const limit = effectiveLimit.value
  if (limit == null || limit <= 0) {
    return list
  }
  return list.slice(0, limit)
})
</script>
