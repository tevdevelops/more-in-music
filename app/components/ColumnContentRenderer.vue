<template>
  <div class="column-content">
    <template v-for="(block, index) in content" :key="block._key || index">
      <div
        v-if="block._type === 'richTextBlock'"
        class="prose prose-lg max-w-none"
      >
        <PortableText
          :value="block.content"
          :components="portableTextComponents"
        />
      </div>
      <VideoEmbed
        v-else-if="block._type === 'videoEmbedBlock'"
        :video-type="block.videoType"
        :youtube-url="block.youtubeUrl"
        :vimeo-url="block.vimeoUrl"
        :video-file="block.videoFile"
        :caption="block.caption"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { PortableText } from '@portabletext/vue'
import type { PortableTextBlock } from '@portabletext/types'
import imageUrlBuilder from '@sanity/image-url'
import { getSanityClient } from '~/lib/sanity.client'
import { h } from 'vue'
import VideoEmbed from './VideoEmbed.vue'

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

interface Props {
  content: Array<RichTextBlock | VideoEmbedBlock>
}

defineProps<Props>()

// Image URL builder for PortableText images
const builder = imageUrlBuilder(getSanityClient())

// PortableText components for rich text blocks
const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset) return null
      const imageUrl = builder.image(value).url()
      return h('img', {
        src: imageUrl,
        alt: value.alt || '',
        class: 'rounded-lg my-4 max-w-full',
      })
    },
  },
}
</script>
