<template>
  <div v-if="images && images.length > 0" class="gallery-block my-4">
    <ClientOnly>
      <div ref="sliderContainer" class="keen-slider">
        <div
          v-for="(image, index) in images"
          :key="image._key || index"
          class="keen-slider__slide"
        >
          <div class="relative">
            <img
              v-if="image.asset"
              :src="getImageUrl(image.asset)"
              :alt="image.alt || ''"
              class="w-full h-auto rounded-lg object-cover"
            />
            <p
              v-if="image.caption"
              class="text-sm text-gray-600 mt-2 text-center"
            >
              {{ image.caption }}
            </p>
          </div>
        </div>
      </div>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { useKeenSlider } from 'keen-slider/vue'
import 'keen-slider/keen-slider.min.css'
import imageUrlBuilder from '@sanity/image-url'
import { getSanityClient } from '~/lib/sanity.client'

interface ImageAsset {
  _id?: string
  url?: string
}

interface GalleryImage {
  _key?: string
  asset?: ImageAsset
  alt?: string
  caption?: string
}

interface Props {
  images: GalleryImage[]
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

// Initialize Keen Slider
const [sliderContainer] = useKeenSlider(
  {
    loop: true,
    mode: 'snap',
    slides: {
      perView: 1,
      spacing: 16,
    },
    breakpoints: {
      '(min-width: 768px)': {
        slides: {
          perView: 2,
          spacing: 24,
        },
      },
      '(min-width: 1024px)': {
        slides: {
          perView: 3,
          spacing: 24,
        },
      },
    },
  },
  [],
)
</script>

<style scoped>
.gallery-block {
  width: 100%;
}

.keen-slider {
  width: 100%;
}

.keen-slider__slide {
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
