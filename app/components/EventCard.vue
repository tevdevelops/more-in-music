<template>
  <article
    v-navigate-on-click="`/events/${event.slug}`"
    class="flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-[0_8px_24px_-4px_rgba(48,52,92,0.2)] transition-transform duration-300 hover:-translate-y-1"
  >
    <div v-if="imageUrl" class="relative h-56 w-full overflow-hidden">
      <img
        :src="imageUrl"
        :alt="event.title"
        class="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
      />
    </div>
    <div class="flex flex-1 flex-col gap-4 p-6 text-brand-dark md:p-7 lg:p-8">
      <div class="flex flex-col gap-2">
        <p
          class="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent"
        >
          {{ formattedDate }}
        </p>
        <h3 class="text-xl font-bold leading-snug md:text-2xl">
          {{ event.title }}
        </h3>
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
            class="h-4 w-4"
            aria-hidden="true"
          >
            <path
              d="M12 21s-6.5-5.146-6.5-9.75A6.5 6.5 0 0 1 12 4.75a6.5 6.5 0 0 1 6.5 6.5C18.5 15.854 12 21 12 21Z"
            />
            <circle cx="12" cy="11.5" r="1.75" />
          </svg>
          <span>{{ event.location }}</span>
        </p>
      </div>
      <p
        v-if="truncatedDescription"
        class="text-sm leading-relaxed text-brand-dark/70 md:text-base"
      >
        {{ truncatedDescription }}
      </p>
      <div class="mt-auto flex flex-col gap-3">
        <slot name="actions">
          <NuxtLink
            v-if="event.slug"
            :to="`/events/${event.slug}`"
            class="inline-flex w-fit items-center gap-3 rounded-full bg-brand-button px-6 py-2 text-sm font-semibold uppercase tracking-[0.12em] text-white transition-colors duration-200 hover:bg-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
          >
            Learn More
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
        </slot>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { SanityEventSummary } from '~/composables/useSanityEvents'

interface Props {
  event: SanityEventSummary
  descriptionLength?: number
}

const props = withDefaults(defineProps<Props>(), {
  descriptionLength: 140,
})

const imageUrl = computed(() => {
  return props.event.image?.asset?.url || null
})

const formattedDate = computed(() => {
  const dateValue = props.event.date ? new Date(props.event.date) : null
  if (!dateValue || Number.isNaN(dateValue.getTime())) {
    return 'Date TBA'
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour:
      dateValue.getHours() || dateValue.getMinutes() ? 'numeric' : undefined,
    minute: dateValue.getMinutes() ? '2-digit' : undefined,
  }).format(dateValue)
})

const truncatedDescription = computed(() => {
  if (!props.event.description) {
    return ''
  }

  if (props.event.description.length <= props.descriptionLength) {
    return props.event.description
  }

  return `${props.event.description.slice(0, props.descriptionLength).trim()}…`
})
</script>
