<template>
  <div class="page-header-block w-full flex items-center justify-center">
    <div class="flex flex-col items-center justify-center gap-4">
      <h1 v-if="text" class="text-3xl md:text-4xl font-bold text-center">
        {{ text }}
      </h1>
      <img
        v-if="image?.asset"
        :src="getImageUrl(image.asset)"
        :alt="image.alt || ''"
        class="w-[80%] mx-auto max-w-[900px] object-contain"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import imageUrlBuilder from '@sanity/image-url'
import { getSanityClient } from '~/lib/sanity.client'

interface ImageAsset {
  _id?: string
  url?: string
}

interface PageHeaderImage {
  asset?: ImageAsset
  alt?: string
}

interface Props {
  text?: string
  image?: PageHeaderImage
}

const props = defineProps<Props>()

// Image URL builder
const builder = imageUrlBuilder(getSanityClient())

// Get image URL with appropriate sizing
function getImageUrl(asset: ImageAsset): string {
  if (!asset) return ''
  if (asset.url) return asset.url
  if (asset._id) {
    return builder.image(asset).width(1200).fit('max').url()
  }
  return ''
}
</script>
