<template>
  <div>
    <!-- Page Header -->
    <div class="mt-[5%] relative overflow-hidden h-[250px] px-0">
      <img
        id="event-header"
        src="/img/gallery.png"
        alt="Gallery"
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%]"
      />
    </div>

    <!-- Carousel -->
    <div class="container mx-auto px-4 my-12">
      <div class="relative">
        <!-- Carousel Slides -->
        <div class="overflow-hidden rounded-lg">
          <div
            class="flex transition-transform duration-500 ease-in-out"
            :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
          >
            <div
              v-for="(slide, index) in slides"
              :key="index"
              class="w-full flex-shrink-0"
            >
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[800px]">
                <img
                  :src="slide.image1"
                  :alt="`Gallery image ${index + 1}-1`"
                  class="w-full h-full object-cover"
                />
                <img
                  :src="slide.image2"
                  :alt="`Gallery image ${index + 1}-2`"
                  class="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Previous Button -->
        <button
          @click="previousSlide"
          class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-brand-button text-white p-3 rounded-full hover:opacity-90 transition-opacity"
          aria-label="Previous slide"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <!-- Next Button -->
        <button
          @click="nextSlide"
          class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-brand-button text-white p-3 rounded-full hover:opacity-90 transition-opacity"
          aria-label="Next slide"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Newsletter -->
    <div class="my-12">
      <NewsletterSignup />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Slide {
  image1: string
  image2: string
}

const slides: Slide[] = [
  {
    image1: '/img/gallery1.jpg',
    image2: '/img/gallery2.jpg',
  },
  {
    image1: '/img/gallery3.jpg',
    image2: '/img/gallery4.jpg',
  },
  {
    image1: '/img/gallery1.jpg',
    image2: '/img/gallery3.jpg',
  },
]

const currentSlide = ref(0)

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.length
}

const previousSlide = () => {
  currentSlide.value =
    currentSlide.value === 0 ? slides.length - 1 : currentSlide.value - 1
}

useHead({
  title: 'More in Music - Gallery',
  meta: [
    {
      property: 'og:image',
      content: '/img/main-image.jpg',
    },
  ],
})
</script>
