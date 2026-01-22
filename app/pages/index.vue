<template>
  <div>
    <!-- Hero Section -->
    <section
      v-if="homePage.hero"
      class="relative w-full flex items-center" :class="contentPositionClass"
    >
      <div v-if="heroImageUrl" class="w-full">
        <img
          :src="heroImageUrl"
          :alt="homePage.hero.heading || 'Hero image'"
          class="w-full object-cover"
        />
      </div>
      <div class="absolute z-10 text-center text-white max-w-[85%] mx-auto" >
        <img
          v-if="homePage.hero.overlay_logo && homePage.hero.overlay_logo.asset"
          :src="homePage.hero.overlay_logo.asset.url"
          :alt="homePage.hero.overlay_logo.asset.alt || 'Overlay logo'"
          class="w-full object-cover"
        />
        <h1
          v-if="homePage.hero.heading"
          class="text-5xl md:text-6xl font-bold mb-6"
        >
          {{ homePage.hero.heading }}
        </h1>
        <p v-if="homePage.hero.description" class="text-xl md:text-2xl">
          {{ homePage.hero.description }}
        </p>
      </div>
    </section>

    <!-- Sections -->
    <template v-if="homePage.sections && homePage.sections.length > 0">
      <SectionRenderer
        v-for="(section, index) in homePage.sections"
        :key="section._id || index"
        :section="section"
      />
    </template>
    
    <!-- Legacy Content Section (fallback) -->
    <div v-else-if="homePage.content" class="container mx-auto px-4 py-12 max-w-4xl">
      <div class="prose prose-lg max-w-none">
        <PortableText :value="homePage.content" :components="components" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PortableText } from '@portabletext/vue'
import type { PortableTextBlock } from '@portabletext/types'
import imageUrlBuilder from '@sanity/image-url'
import { getSanityClient } from '~/lib/sanity.client'

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

interface HomePage {
  _id: string
  title: string
  hero?: {
    image?: {
      asset?: {
        _id?: string
        _type?: string
        url?: string
      }
    }
    overlay_logo?: {
      asset?: {
        _id?: string
        _type?: string
        url?: string
        alt?: string
      }
    }
    content_position: string
    heading?: string
    description?: string
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

// Fetch homepage from Sanity
const query = `*[_type == "homePage"][0]{
    _id,
    title,
    hero {
      image {
        asset-> {
          _id,
          _type,
          url
        }
      },
      overlay_logo {
        asset-> {
          _id,
          _type,
          url,
          alt
        }
      },
      content_position,
      heading,
      description
    },
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

const { data } = await useSanityQuery<HomePage>(query)

const homePage = data.value

// Handle 404 if homepage doesn't exist
if (!homePage) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Home Page Not Found',
  })
}

// Determine content position class
const contentPositionClass = computed(() => {
  if (homePage.hero?.content_position === 'left') {
    return 'justify-start'
  } else if (homePage.hero?.content_position === 'right') {
    return 'justify-end'
  } else {
    return 'justify-center'
  }
})

// Build hero image URL
const builder = imageUrlBuilder(getSanityClient())
const heroImageUrl = homePage.hero?.image?.asset
  ? builder.image(homePage.hero.image.asset).width(1920).height(1080).url()
  : null

// Set SEO metadata
useHead({
  title: homePage.seo?.title || homePage.title,
  meta: [
    {
      name: 'description',
      content: homePage.seo?.description || '',
    },
    {
      property: 'og:title',
      content: homePage.seo?.title || homePage.title,
    },
    {
      property: 'og:description',
      content: homePage.seo?.description || '',
    },
    {
      property: 'og:image',
      content: homePage.seo?.image?.asset?.url || heroImageUrl || '',
    },
  ],
})

// Portable Text components
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
