<template>
  <div class="bg-white">
    <section class="py-16">
      <PageHeaderBlock :image="programmingImage" />
    </section>

    <section
      class="bg-brand-dark/3 border-y border-brand-dark/10 py-16 sm:py-20"
    >
      <div class="container mx-auto px-4">
        <div
          class="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p
              class="text-xs font-semibold uppercase tracking-[0.25em] text-brand-accent"
            >
              Programming
            </p>
            <h2 class="text-3xl font-bold text-brand-dark sm:text-4xl">
              Upcoming Events
            </h2>
          </div>
        </div>
        <EventCarousel
          v-if="upcomingEvents.length > 0"
          :events="upcomingEvents"
        />
        <div
          v-else
          class="rounded-3xl border border-dashed border-brand-dark/20 bg-white px-8 py-12 text-center text-brand-dark/70"
        >
          <p class="text-lg font-semibold">
            We’re locking in our next experiences.
          </p>
          <p class="mt-2 text-sm">
            Check back soon or join our newsletter to be the first to know about
            new events.
          </p>
        </div>
      </div>
    </section>

    <section class="py-16 sm:py-20">
      <div class="container mx-auto px-4">
        <div
          class="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p
              class="text-xs font-semibold uppercase tracking-[0.25em] text-brand-accent"
            >
              Highlights
            </p>
            <h2 class="text-3xl font-bold text-brand-dark sm:text-4xl">
              Past Events
            </h2>
            <p
              class="mt-3 max-w-2xl text-sm leading-relaxed text-brand-dark/70"
            >
              Relive standout sessions, panels, and showcases that have powered
              the More In Music community.
            </p>
          </div>
        </div>
        <EventCarousel v-if="pastEvents.length > 0" :events="pastEvents">
          <template #default="{ event }">
            <EventCard :event="event" :description-length="160">
              <template #actions>
                <NuxtLink
                  v-if="event.slug"
                  :to="`/events/${event.slug}`"
                  class="inline-flex w-fit items-center gap-3 rounded-full border border-brand-dark/20 px-6 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-brand-dark transition-colors duration-200 hover:border-brand-dark/40 hover:text-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
                >
                  View Recap
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
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </NuxtLink>
              </template>
            </EventCard>
          </template>
        </EventCarousel>
        <div
          v-else
          class="rounded-3xl border border-dashed border-brand-dark/20 bg-white px-8 py-12 text-center text-brand-dark/70"
        >
          <p class="text-lg font-semibold">Past memories loading soon.</p>
          <p class="mt-2 text-sm">
            Once we wrap our next event, we’ll share highlights and stories
            right here.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { isEventInPast } from '~/utils/calendar'
import { useSanityEvents } from '~/composables/useSanityEvents'

const fetchedEvents = await useSanityEvents()
const allEvents = ref((fetchedEvents ?? []).filter(Boolean))

const normalize = (input: string) => new Date(input).getTime()

const programmingImage = computed(() => {
  return {
    asset: {
      url: '/img/programming.png',
    },
  }
})

const upcomingEvents = computed(() =>
  allEvents.value
    .filter((event) => !isEventInPast(event.date))
    .sort((a, b) => normalize(a.date) - normalize(b.date))
)

const pastEvents = computed(() =>
  allEvents.value
    .filter((event) => isEventInPast(event.date))
    .sort((a, b) => normalize(b.date) - normalize(a.date))
)

useHead({
  title: 'Events | More In Music',
  meta: [
    {
      name: 'description',
      content:
        'Discover upcoming More In Music gatherings and revisit highlights from past events that uplift creators, leaders, and the community.',
    },
  ],
})
</script>
