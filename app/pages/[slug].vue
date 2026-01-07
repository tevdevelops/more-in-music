<template>
  <div class="container mx-auto px-4 py-8 max-w-4xl">
    <h1 class="text-4xl font-bold mb-8">{{ page.title }}</h1>

    <div v-if="page.content" class="prose prose-lg max-w-none">
      <PortableText :value="page.content" :components="components" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { PortableText } from '@portabletext/vue'
import type { PortableTextBlock } from '@portabletext/types'
import imageUrlBuilder from '@sanity/image-url'
import { getSanityClient } from '~/lib/sanity.client'

interface Page {
  _id: string
  title: string
  slug: {
    current: string
  }
  content?: PortableTextBlock[]
  seo?: {
    title?: string
    description?: string
    image?: {
      asset?: {
        url?: string
      }
    }
  }
}

const route = useRoute()
const slug = Array.isArray(route.params.slug)
  ? route.params.slug.join('/')
  : route.params.slug || ''

// Fetch page from Sanity
const query = `*[_type == "page" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    content,
    seo
  }`

const { data } = await useSanityQuery<Page>(query, {
  slug: slug || 'home',
})

const page = data.value

// Handle 404 if page doesn't exist
if (!page) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page Not Found',
  })
}

// Set SEO metadata
useHead({
  title: page.seo?.title || page.title,
  meta: [
    {
      name: 'description',
      content: page.seo?.description || '',
    },
    {
      property: 'og:title',
      content: page.seo?.title || page.title,
    },
    {
      property: 'og:description',
      content: page.seo?.description || '',
    },
    {
      property: 'og:image',
      content: page.seo?.image?.asset?.url || '',
    },
  ],
})

// Portable Text components (customize as needed)
const builder = imageUrlBuilder(getSanityClient())

const components = {
  types: {
    image: ({ value }: any) => {
      const imageUrl = builder.image(value).url()
      return h('img', {
        src: imageUrl,
        alt: value.alt || '',
      })
    },
  },
}
</script>
