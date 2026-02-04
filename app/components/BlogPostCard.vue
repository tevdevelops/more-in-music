<template>
  <article
    v-navigate-on-click="`/blog/${post.slug}`"
    class="flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-[0_8px_24px_-4px_rgba(48,52,92,0.2)] transition-transform duration-300 hover:-translate-y-1"
  >
    <div v-if="imageUrl" class="relative h-56 w-full overflow-hidden">
      <img
        :src="imageUrl"
        :alt="post.title"
        class="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
      />
    </div>
    <div class="flex flex-1 flex-col gap-4 p-6 text-brand-dark md:p-7 lg:p-8">
      <div class="flex flex-col gap-2">
        <p
          class="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent"
        >
          {{ formattedDate }}
        </p>
        <h3 class="text-xl font-bold leading-snug md:text-2xl">
          {{ post.title }}
        </h3>
        <p
          v-if="post.author"
          class="text-sm font-medium uppercase tracking-[0.08em] text-brand-dark/80"
        >
          {{ post.author }}
        </p>
      </div>
      <p
        v-if="truncatedExcerpt"
        class="text-sm leading-relaxed text-brand-dark/70 md:text-base"
      >
        {{ truncatedExcerpt }}
      </p>
      <div class="mt-auto flex flex-col gap-3">
        <slot name="actions">
          <NuxtLink
            v-if="post.slug"
            :to="`/blog/${post.slug}`"
            class="inline-flex w-fit items-center gap-3 rounded-full bg-brand-button px-6 py-2 text-sm font-semibold uppercase tracking-[0.12em] text-white transition-colors duration-200 hover:bg-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
          >
            Read More
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="h-4 w-4"
              aria-hidden="true"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </NuxtLink>
        </slot>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { SanityPostSummary } from '~/composables/useSanityPosts'

interface Props {
  post: SanityPostSummary
  excerptLength?: number
}

const props = withDefaults(defineProps<Props>(), {
  excerptLength: 140,
})

const imageUrl = computed(() => {
  return props.post.mainImage?.asset?.url || null
})

const formattedDate = computed(() => {
  const dateValue = props.post.publishedAt
    ? new Date(props.post.publishedAt)
    : null
  if (!dateValue || Number.isNaN(dateValue.getTime())) {
    return ''
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(dateValue)
})

const truncatedExcerpt = computed(() => {
  if (!props.post.excerpt) {
    return ''
  }

  if (props.post.excerpt.length <= props.excerptLength) {
    return props.post.excerpt
  }

  return `${props.post.excerpt.slice(0, props.excerptLength).trim()}…`
})
</script>
