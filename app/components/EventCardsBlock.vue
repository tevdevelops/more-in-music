<template>
  <div class="event-cards-block">
    <div v-if="header" class="mb-6">
      <h2 class="text-2xl font-bold text-brand-dark sm:text-3xl">
        {{ header }}
      </h2>
    </div>
    <EventCarousel
      v-if="filteredEvents.length > 0"
      :events="filteredEvents"
    />
    <div
      v-else
      class="rounded-3xl border border-dashed border-brand-dark/20 bg-white px-6 py-10 text-center text-brand-dark/70"
    >
      <p class="text-base font-semibold">
        {{ emptyMessage }}
      </p>
      <p class="mt-2 text-sm">
        Check back soon for new events.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { isEventInPast } from '~/utils/calendar'
import { useSanityEvents } from '~/composables/useSanityEvents'
import type { SanityEventSummary } from '~/composables/useSanityEvents'
import EventCarousel from '~/components/EventCarousel.vue'

interface Props {
  header?: string
  filter?: 'all' | 'new' | 'past'
}

const props = withDefaults(defineProps<Props>(), {
  filter: 'new',
})

const fetchedEvents = await useSanityEvents()
const allEvents = ref<SanityEventSummary[]>((fetchedEvents ?? []).filter(Boolean))

const normalize = (input: string) => new Date(input).getTime()

const effectiveFilter = computed(() => props.filter ?? 'new')

const filteredEvents = computed(() => {
  const list = allEvents.value
  const f = effectiveFilter.value
  if (f === 'new') {
    return list
      .filter((event) => !isEventInPast(event.date))
      .sort((a, b) => normalize(a.date) - normalize(b.date))
  }
  if (f === 'past') {
    return list
      .filter((event) => isEventInPast(event.date))
      .sort((a, b) => normalize(b.date) - normalize(a.date))
  }
  return [...list].sort((a, b) => normalize(b.date) - normalize(a.date))
})

const emptyMessage = computed(() => {
  const f = effectiveFilter.value
  if (f === 'new') return "We're locking in our next experiences."
  if (f === 'past') return 'Past memories loading soon.'
  return 'No events yet.'
})
</script>
