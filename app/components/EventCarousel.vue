<template>
  <ClientOnly>
    <template v-if="events && events.length > 0">
      <div class="relative overflow-visible">
        <swiper-container
          ref="swiperContainer"
          :init="false"
          class="!overflow-visible w-full"
        >
          <swiper-slide
            v-for="event in events"
            :key="event._id"
            class="h-auto overflow-visible pb-8 pr-2"
          >
            <slot :event="event">
              <EventCard :event="event" />
            </slot>
          </swiper-slide>
        </swiper-container>

        <button
          v-if="showNavigation"
          type="button"
          @click="handlePrev"
          class="absolute left-0 top-1/2 z-10 -translate-y-1/2 transform rounded-full border border-brand-dark/10 bg-white/90 p-3 text-brand-dark shadow-[0_12px_24px_-16px_rgba(48,52,92,0.6)] transition hover:scale-105 hover:border-brand-dark/20 hover:bg-white active:scale-95 md:-left-4"
          aria-label="Previous event"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-5 w-5"
            aria-hidden="true"
          >
            <path d="m14 18-6-6 6-6" />
          </svg>
        </button>

        <button
          v-if="showNavigation"
          type="button"
          @click="handleNext"
          class="absolute right-0 top-1/2 z-10 -translate-y-1/2 transform rounded-full border border-brand-dark/10 bg-white/90 p-3 text-brand-dark shadow-[0_12px_24px_-16px_rgba(48,52,92,0.6)] transition hover:scale-105 hover:border-brand-dark/20 hover:bg-white active:scale-95 md:-right-4"
          aria-label="Next event"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-5 w-5"
            aria-hidden="true"
          >
            <path d="m10 6 6 6-6 6" />
          </svg>
        </button>
      </div>
    </template>
    <template v-else>
      <slot name="empty" />
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
import type { SwiperContainer } from 'swiper/element'
import type { SanityEventSummary } from '~/composables/useSanityEvents'
import EventCard from '~/components/EventCard.vue'

interface Props {
  events: SanityEventSummary[]
  spaceBetween?: number
}

const props = withDefaults(defineProps<Props>(), {
  spaceBetween: 24,
})

const swiperContainer = ref<SwiperContainer | null>(null)

const swiper = useSwiper(swiperContainer, {
  loop: false,
  slidesPerView: 1,
  spaceBetween: props.spaceBetween,
  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: props.spaceBetween + 8,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: props.spaceBetween + 8,
    },
  },
})

const showNavigation = computed(() => props.events.length > 1)

const handlePrev = () => {
  swiper.prev()
}

const handleNext = () => {
  swiper.next()
}

watch(
  () => props.events.length,
  async () => {
    await nextTick()
    swiper.instance.value?.update?.()
  }
)
</script>
