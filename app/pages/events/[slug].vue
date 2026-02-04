<template>
  <div class="bg-white">
    <div class="container mx-auto max-w-4xl px-4 pt-12 sm:pt-16">
      <!-- 1. Back link -->
      <NuxtLink
        to="/events"
        class="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-brand-dark/70 transition-colors duration-200 hover:text-brand-dark"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-4 w-4"
          aria-hidden="true"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
        Back to Events
      </NuxtLink>

      <!-- 2. Event title, date, location, calendar links -->
      <header class="mt-8 space-y-4">
        <h1
          class="text-3xl font-bold leading-tight text-brand-dark sm:text-4xl lg:text-5xl"
        >
          {{ event.title }}
        </h1>
        <p class="text-sm font-semibold text-brand-dark sm:text-base">
          {{ formattedDate }}
        </p>
        <p v-if="detailedTime" class="text-sm font-semibold text-brand-dark">
          {{ detailedTime }}
        </p>
        <p
          v-if="event.location"
          class="flex items-center gap-2 text-sm font-medium uppercase tracking-[0.08em] text-brand-dark/80"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-4 w-4 shrink-0"
            aria-hidden="true"
          >
            <path
              d="M12 21s-6.5-5.146-6.5-9.75A6.5 6.5 0 0 1 12 4.75a6.5 6.5 0 0 1 6.5 6.5C18.5 15.854 12 21 12 21Z"
            />
            <circle cx="12" cy="11.5" r="1.75" />
          </svg>
          <span>{{ event.location }}</span>
        </p>
        <div
          v-if="!isPastEvent && calendarLinks"
          class="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-brand-dark/80"
        >
          <a
            :href="calendarLinks.google"
            target="_blank"
            rel="noopener noreferrer"
            class="underline decoration-brand-accent decoration-2 underline-offset-2 transition hover:text-brand-dark"
          >
            Google Calendar
          </a>
          <span class="text-brand-dark/40">/</span>
          <a
            :href="calendarLinks.ics.href"
            :download="calendarLinks.ics.filename"
            class="underline decoration-brand-accent decoration-2 underline-offset-2 transition hover:text-brand-dark"
          >
            ICS
          </a>
        </div>
        <!-- 3. Event has concluded (towards top) -->
        <div
          v-if="isPastEvent"
          class="inline-flex items-center gap-2 rounded-full border border-brand-dark/10 bg-brand-dark/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-dark/80"
        >
          <span
            class="inline-block h-2 w-2 rounded-full bg-brand-accent"
          ></span>
          Event has concluded
        </div>
      </header>

      <!-- 4. Hero image -->
      <section
        v-if="heroImageUrl"
        class="relative mt-10 w-full overflow-hidden rounded-2xl"
      >
        <img
          :src="heroImageUrl"
          :alt="event.title"
          class="h-auto w-full object-cover"
        />
      </section>

      <!-- 5. RSVP button (centered below hero) -->
      <div
        v-if="!isPastEvent && event.rsvpLink"
        class="mt-10 flex justify-center"
      >
        <a
          :href="event.rsvpLink"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center justify-center gap-3 rounded-full bg-brand-button px-10 py-4 text-base font-semibold uppercase tracking-[0.14em] text-white transition-colors duration-200 hover:bg-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
        >
          RSVP
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
            <path d="m9 18 6-6-6-6" />
          </svg>
        </a>
      </div>

      <!-- 6. Description / bio section -->
      <section
        v-if="event.description || (event.body && event.body.length > 0)"
        class="mt-14 border-t border-brand-dark/10 pt-14"
      >
        <h2 class="text-2xl font-bold text-brand-dark sm:text-3xl">
          About this event
        </h2>
        <div
          class="mt-6 prose prose-lg max-w-none text-brand-dark/80 prose-p:leading-relaxed"
        >
          <p v-if="event.description" class="whitespace-pre-line">
            {{ event.description }}
          </p>
          <div v-if="event.body && event.body.length > 0" class="mt-6">
            <PortableText :value="event.body" :components="portableTextComponents" />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PortableText } from '@portabletext/vue'
import imageUrlBuilder from '@sanity/image-url'
import { getSanityClient } from '~/lib/sanity.client'
import { usePortableTextComponents } from '~/composables/usePortableTextComponents'
import { createCalendarLinks, isEventInPast } from '~/utils/calendar'
import { useSanityEvent } from '~/composables/useSanityEvent'

const portableTextComponents = usePortableTextComponents()

const route = useRoute()
const slug = route.params.slug as string

const event = await useSanityEvent(slug)

if (!event) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Event Not Found',
  })
}

const builder = imageUrlBuilder(getSanityClient())

const heroImageUrl = computed(() => {
  const asset = event.image?.asset
  if (!asset) return null

  if (asset.url) {
    return asset.url
  }

  if (asset._id) {
    return builder.image(asset).width(1600).height(900).fit('crop').url()
  }

  return null
})

const formattedDate = computed(() => {
  const dateValue = new Date(event.date)
  if (Number.isNaN(dateValue.getTime())) {
    return 'Date To Be Announced'
  }

  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(dateValue)
})

const detailedTime = computed(() => {
  const dateValue = new Date(event.date)
  if (Number.isNaN(dateValue.getTime())) {
    return ''
  }
  const hasTime =
    dateValue.getHours() !== 0 ||
    dateValue.getMinutes() !== 0 ||
    dateValue.getSeconds() !== 0
  if (!hasTime) {
    return ''
  }
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(dateValue)
})

const isPastEvent = computed(() => isEventInPast(event.date))

const calendarLinks = computed(() => {
  if (!event.date || isPastEvent.value) {
    return null
  }

  try {
    return createCalendarLinks({
      title: event.title,
      start: event.date,
      description: event.description,
      location: event.location,
    })
  } catch {
    return null
  }
})

useHead({
  title: `${event.title} | More In Music`,
  meta: [
    {
      name: 'description',
      content:
        event.description ||
        'Discover upcoming gatherings and community events powered by More In Music.',
    },
    {
      property: 'og:title',
      content: `${event.title} | More In Music`,
    },
    {
      property: 'og:description',
      content:
        event.description ||
        'Discover upcoming gatherings and community events powered by More In Music.',
    },
    {
      property: 'og:image',
      content: heroImageUrl.value || '',
    },
  ],
})
</script>
