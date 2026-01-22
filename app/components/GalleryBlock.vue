<template>
  <ClientOnly>
    <div v-if="images && images.length > 0" class="relative">
      <swiper-container
        ref="swiperContainer"
        :init="false"
        class="w-full h-full"
      >
        <swiper-slide
          v-for="(image, index) in images"
          :key="image._key || index"
          class="flex flex-col items-center"
        >
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
        </swiper-slide>
      </swiper-container>

      <!-- Navigation Buttons -->
      <button
        @click="swiper.prev()"
        class="absolute top-1/2 -translate-y-1/2 left-2 md:left-3 z-10 bg-white/90 border border-black/10 rounded-full w-9 h-9 md:w-10 md:h-10 flex items-center justify-center cursor-pointer transition-all duration-200 ease-in-out text-gray-800 hover:bg-white hover:border-black/20 hover:scale-110 active:scale-95"
        aria-label="Previous slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>
      <button
        @click="swiper.next()"
        class="absolute top-1/2 -translate-y-1/2 right-2 md:right-3 z-10 bg-white/90 border border-black/10 rounded-full w-9 h-9 md:w-10 md:h-10 flex items-center justify-center cursor-pointer transition-all duration-200 ease-in-out text-gray-800 hover:bg-white hover:border-black/20 hover:scale-110 active:scale-95"
        aria-label="Next slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
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

// Swiper container reference
const swiperContainer = ref(null)

// Swiper breakpoints configuration
const breakpoints = {
  768: {
    slidesPerView: 2,
    spaceBetween: 24,
  },
}

// Initialize Swiper
const swiper = useSwiper(swiperContainer, {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 16,
  breakpoints: breakpoints,
})

onMounted(() => {
  // Swiper is automatically initialized by useSwiper
  if (swiper.instance) {
    console.log('Swiper initialized', swiper.instance)
  }
})
</script>
