<template>
  <div>
    <!-- Sections -->
    <template v-if="page.sections && page.sections.length > 0">
      <SectionRenderer
        v-for="(section, index) in page.sections"
        :key="section._id || index"
        :section="section"
      />
    </template>

    <!-- Legacy Content Section (fallback) -->
    <div
      v-else-if="page.content"
      class="container mx-auto px-4 py-12 max-w-4xl"
    >
      <div class="prose prose-lg max-w-none">
        <PortableText :value="page.content" :components="components" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PortableText } from '@portabletext/vue'
import type { PortableTextBlock } from '@portabletext/types'
import { usePortableTextComponents } from '~/composables/usePortableTextComponents'
import type { ColumnContentBlock } from '~/types/block.types'

interface Column {
  _key: string
  content?: ColumnContentBlock[]
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
            alignment,
            sticky,
            content[]{
              ...,
              _type == "buttonBlock" => {
                ...,
                linkType,
                url,
                pageReference->{
                  _id,
                  _type,
                  "slug": slug.current,
                  title
                }
              }
            }
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
          },
          _type == "galleryBlock" => {
            ...,
            images[]{
              _key,
              asset-> {
                _id,
                url
              },
              alt,
              caption
            }
          },
          _type == "pageHeaderBlock" => {
            ...,
            text,
            image {
              asset-> {
                _id,
                url
              },
              alt
            }
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
const components = usePortableTextComponents()
</script>
