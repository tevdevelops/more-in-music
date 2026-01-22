<template>
  <div>
    <!-- Page Title -->
    <div v-if="page.title" class="container mx-auto px-4 py-8">
      <h1 class="text-4xl font-bold">{{ page.title }}</h1>
    </div>

    <!-- Sections -->
    <template v-if="page.sections && page.sections.length > 0">
      <SectionRenderer
        v-for="(section, index) in page.sections"
        :key="section._id || index"
        :section="section"
      />
    </template>
    
    <!-- Legacy Content Section (fallback) -->
    <div v-else-if="page.content" class="container mx-auto px-4 py-12 max-w-4xl">
      <div class="prose prose-lg max-w-none">
        <PortableText :value="page.content" :components="components" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PortableText } from '@portabletext/vue'
import type { PortableTextBlock } from '@portabletext/types'
import imageUrlBuilder from '@sanity/image-url'
import { getSanityClient } from '~/lib/sanity.client'
import { h } from 'vue'
import SectionRenderer from '~/app/components/SectionRenderer.vue'

interface RichTextBlock {
  _key: string
  _type: 'richTextBlock'
  content?: PortableTextBlock[]
}

interface VideoEmbedBlock {
  _key: string
  _type: 'videoEmbedBlock'
  videoType: 'youtube' | 'vimeo' | 'upload'
  youtubeUrl?: string
  vimeoUrl?: string
  videoFile?: {
    asset?: {
      _id?: string
      url?: string
    }
  }
  caption?: string
}

interface Column {
  _key: string
  content?: Array<RichTextBlock | VideoEmbedBlock>
}

interface Section {
  _id?: string
  title?: string
  fullWidth?: boolean
  backgroundColor?: string
  backgroundImage?: {
    asset?: {
      _id?: string
      url?: string
    }
  }
  columns?: Column[]
}

interface Page {
  _id: string
  title: string
  slug?: {
    current?: string
  }
  sections?: Section[]
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

// Get slug from route
const route = useRoute()
const slug = route.params.slug as string

// Fetch page from Sanity
const query = `*[_type == "page" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    sections[]->{
      _id,
      title,
      fullWidth,
      backgroundColor,
      backgroundImage {
        asset-> {
          _id,
          url
        }
      },
      columns[]{
        _key,
        content[]{
          _key,
          _type,
          _type == "richTextBlock" => {
            ...,
            content
          },
          _type == "videoEmbedBlock" => {
            ...,
            videoType,
            youtubeUrl,
            vimeoUrl,
            videoFile {
              asset-> {
                _id,
                url
              }
            },
            caption
          }
        }
      }
    },
    content,
    seo {
      title,
      description,
      image {
        asset-> {
          url
        }
      }
    }
  }`

const { data } = await useSanityQuery<Page>(query, { slug })

const page = data.value

// Handle 404 if page doesn't exist
if (!page) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page Not Found',
  })
}

// Build image URL builder
const builder = imageUrlBuilder(getSanityClient())

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

// Portable Text components (for legacy content)
const components = {
  types: {
    image: ({ value }: any) => {
      const imageUrl = builder.image(value).url()
      return h('img', {
        src: imageUrl,
        alt: value.alt || '',
        class: 'rounded-lg my-4',
      })
    },
  },
}
</script>
