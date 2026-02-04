<template>
  <div class="bg-white">
    <div class="container mx-auto max-w-4xl px-4 pt-12 sm:pt-16">
      <NuxtLink
        to="/blog"
        class="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-brand-dark/70 transition-colors duration-200 hover:text-brand-dark"
      >
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
          <path d="M15 18l-6-6 6-6" />
        </svg>
        Back to Blog
      </NuxtLink>

      <header class="mt-8 space-y-4">
        <h1
          class="text-3xl font-bold leading-tight text-brand-dark sm:text-4xl lg:text-5xl"
        >
          {{ post.title }}
        </h1>
        <p class="text-sm font-semibold text-brand-dark sm:text-base">
          {{ formattedDate }}
        </p>
        <p
          v-if="post.author"
          class="text-sm font-medium uppercase tracking-[0.08em] text-brand-dark/80"
        >
          {{ post.author }}
        </p>
      </header>

      <section
        v-if="heroImageUrl"
        class="relative mt-10 w-full overflow-hidden rounded-2xl"
      >
        <img
          :src="heroImageUrl"
          :alt="post.title"
          class="h-auto w-full object-cover"
        />
      </section>

      <section
        v-if="post.body && post.body.length > 0"
        class="mt-14 border-t border-brand-dark/10 pt-14"
      >
        <div
          class="prose prose-lg max-w-none text-brand-dark/80 prose-p:leading-relaxed"
        >
          <PortableText
            :value="post.body"
            :components="portableTextComponents"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PortableText } from '@portabletext/vue'
import imageUrlBuilder from '@sanity/image-url'
import { getSanityClient } from '~/lib/sanity.client'
import { usePortableTextComponents } from '~/composables/usePortableTextComponents'
import { useSanityPost } from '~/composables/useSanityPost'

const portableTextComponents = usePortableTextComponents()

const route = useRoute()
const slug = route.params.slug as string

const post = await useSanityPost(slug)

if (!post) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Post Not Found',
  })
}

const builder = imageUrlBuilder(getSanityClient())

const heroImageUrl = computed(() => {
  const asset = post.mainImage?.asset
  if (!asset) return null

  if (asset.url) {
    return asset.url
  }

  if (asset._id) {
    return builder.image(asset).width(1600).height(900).fit('crop').url()
  }

  return null
})

const formattedDate = computed(() => {
  const dateValue = new Date(post.publishedAt)
  if (Number.isNaN(dateValue.getTime())) {
    return ''
  }

  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(dateValue)
})

useHead({
  title: `${post.title} | More In Music`,
  meta: [
    {
      name: 'description',
      content:
        post.excerpt ||
        'Stories and updates from More In Music—uplifting creators, leaders, and the community.',
    },
    {
      property: 'og:title',
      content: `${post.title} | More In Music`,
    },
    {
      property: 'og:description',
      content:
        post.excerpt ||
        'Stories and updates from More In Music—uplifting creators, leaders, and the community.',
    },
    {
      property: 'og:image',
      content: heroImageUrl.value || '',
    },
  ],
})
</script>
