<template>
  <div>
    <!-- Page Header -->
    <div class="mt-[5%] relative overflow-hidden h-[250px] px-0">
      <img
        id="event-header"
        src="/img/programming.png"
        alt="Programming"
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%]"
      />
    </div>

    <h1
      class="text-center text-brand-dark text-4xl font-bold mb-12 underline decoration-brand-accent decoration-[10px]"
    >
      Past Events
    </h1>

    <!-- Events List -->
    <div class="container mx-auto px-4">
      <div class="space-y-20 mb-12">
        <div
          v-for="event in events"
          :key="event.id"
          class="w-[90%] mx-auto mb-10"
        >
          <img :src="event.image" :alt="event.title" class="w-full mb-6" />
          <h2 class="font-black text-brand-button text-2xl mb-4">
            {{ event.title }}
          </h2>
          <h5 class="text-lg mb-4">{{ event.date }}</h5>
        </div>
      </div>
    </div>

    <!-- Newsletter -->
    <div class="my-12">
      <NewsletterSignup />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Event {
  id: number
  image: string
  title: string
  date: string
}

const events: Event[] = [
  {
    id: 1,
    image: '/img/img1.png',
    title:
      'MORE IN MUSIC: BRIDGE BUILDING SERIES WITH LYNN SCOTT & ALAUNA WILSON',
    date: 'Thursday, November 18, 2021',
  },
  {
    id: 2,
    image: '/img/img2.png',
    title:
      'MORE IN MUSIC X CLUBHOUSE PANEL : FINANCIAL LITERACY 101: UNDERSTANDING FINANCE & MONEY FOR LIFE + BUSINESS',
    date: 'Thursday, September 30, 2021',
  },
  {
    id: 3,
    image: '/img/img3.png',
    title:
      'MORE IN MUSIC: BRIDGE BUILDING SERIES WITH MORGAN RHODES & AUTUMN STEELE',
    date: 'Thursday, September 2, 2021',
  },
  {
    id: 4,
    image: '/img/img4.png',
    title:
      'MORE IN MUSIC X CLUBHOUSE PANEL : MARKETING + DIGITAL MARKETING: YOU HAVE A RECORD, NOW WHAT?',
    date: 'Friday, July 23, 2021',
  },
  {
    id: 5,
    image: '/img/img5.jpg',
    title:
      'MORE IN MUSIC: PRIVATE ALBUM LISTENING SESSION WITH KOSINE X SNAFU RECORDS',
    date: 'Thursday, May 6, 2021',
  },
  {
    id: 6,
    image: '/img/img6.png',
    title: 'MORE IN MUSIC X NEXTGEN NOW PANEL',
    date: 'Wednesday, April 7, 2021',
  },
  {
    id: 7,
    image: '/img/img7.png',
    title:
      'MORE IN MUSIC: BRIDGE BUILDING SERIES WITH SUZY RYOO & SARAH FIGUEROA',
    date: 'Monday, March 22, 2021',
  },
  {
    id: 8,
    image: '/img/img8.png',
    title:
      'MORE IN MUSIC: BRIDGE BUILDING SERIES WITH MERCK MERCURIADIS & EDDIE HAYES',
    date: 'Thursday, February 4, 2021',
  },
  {
    id: 9,
    image: '/img/img9.png',
    title: 'MORE IN MUSIC PANEL - 2.22',
    date: 'Saturday, February 22, 2020',
  },
  {
    id: 10,
    image: '/img/img10.png',
    title: 'MORE IN MUSIC PANEL - 11.17',
    date: 'Sunday, November 17, 2019',
  },
  {
    id: 11,
    image: '/img/img11.png',
    title: 'MORE IN MUSIC PANEL - 10.20',
    date: 'Sunday, October 20, 2019',
  },
  {
    id: 12,
    image: '/img/img12.png',
    title: 'MORE IN MUSIC PANEL - 9.29',
    date: 'Sunday, September 29, 2019',
  },
  {
    id: 13,
    image: '/img/img13.png',
    title: 'MORE IN MUSIC YOUTH - BET WEEKEND PANEL - 6.23',
    date: 'Sunday, June 23, 2019',
  },
  {
    id: 14,
    image: '/img/img15.jpg',
    title: 'MORE IN MUSIC - BET WEEKEND PANEL - 6.23',
    date: 'Sunday, June 23, 2019',
  },
  {
    id: 15,
    image: '/img/img14.png',
    title: 'MORE IN MUSIC x BET EXPERIENCE YOUTH PROGRAM x AEG PANEL - 6.21',
    date: 'Friday, June 21, 2019',
  },
  {
    id: 16,
    image: '/img/img16.jpg',
    title: 'MORE IN MUSIC PANEL - 3.30',
    date: 'Saturday, March 30, 2019',
  },
  {
    id: 17,
    image: '/img/img17.png',
    title: 'MORE IN MUSIC PANEL - 2.22',
    date: 'Friday, February 22, 2019',
  },
]

useHead({
  title: 'More in Music - Events',
  meta: [
    {
      property: 'og:image',
      content: '/img/main-image.jpg',
    },
  ],
})
</script>
