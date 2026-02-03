<template>
  <div class="column-content">
    <template v-for="(block, index) in content" :key="block._key || index">
      <div
        v-if="block._type === 'richTextBlock' && block.content"
        class="prose prose-lg max-w-none"
        :class="[getAlignmentClass(block), getStickyClass(block)]"
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
      <GalleryBlock
        v-else-if="block._type === 'galleryBlock'"
        :images="block.images || []"
      />
      <PageHeaderBlock
        v-else-if="block._type === 'pageHeaderBlock'"
        :text="block.text"
        :text-alignment="block.textAlignment"
        :image="block.image"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { PortableText } from '@portabletext/vue'
import { usePortableTextComponents } from '~/composables/usePortableTextComponents'
import type { ColumnContentBlock, RichTextBlock } from '~/types/block.types'

interface Props {
  content: ColumnContentBlock[]
}

defineProps<Props>()

// PortableText components for rich text blocks
const portableTextComponents = usePortableTextComponents()

// Helper function to get alignment class for rich text blocks
function getAlignmentClass(block: ColumnContentBlock): string {
  if (block._type === 'richTextBlock') {
    const richTextBlock = block as RichTextBlock
    if (richTextBlock.alignment === 'center') {
      return 'text-center'
    }
    if (richTextBlock.alignment === 'right') {
      return 'text-right'
    }
  }
  return 'text-left'
}

// Helper function to get sticky class for rich text blocks
function getStickyClass(block: ColumnContentBlock): string {
  if (block._type === 'richTextBlock') {
    const richTextBlock = block as RichTextBlock
    if (richTextBlock.sticky) {
      return 'sticky top-0 z-10'
    }
  }
  return ''
}
</script>
