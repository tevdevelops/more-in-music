<template>
  <div>
    <!-- Page Header -->
    <div class="mt-[5%] relative overflow-hidden h-[250px] px-0">
      <img
        id="about-header"
        src="/img/about.png"
        alt="About More in Music"
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%]"
      />
    </div>

    <div class="w-full px-4">
      <!-- Introduction -->
      <p class="w-[80%] mx-auto my-8 text-lg">
        More In Music was established by Noelle Chesnut Whitmore in February
        2019. Motivated by a desire to impact her community and instigate
        positive change, she saw the need to educate, especially young people,
        on the values of hard work, history, God, and perseverance. Combining
        her love for music with her commitment to giving back, More In Music was
        created to fulfill this vision.
      </p>

      <!-- Video Section -->
      <div class="w-[90%] mx-auto my-12">
        <div class="relative z-10 rounded-[30px]" style="padding: 56.25% 0 0 0">
          <iframe
            src="https://www.youtube.com/embed/_9cJwYl7z80?si=xHSIRj988xwgeigk"
            class="absolute top-0 left-0 w-full h-full rounded-[30px]"
            frameborder="0"
            allow="fullscreen"
            allowfullscreen
          ></iframe>
        </div>
      </div>

      <!-- Mission Statement -->
      <h1
        class="text-center text-brand-dark text-4xl font-bold mb-12 underline decoration-brand-accent decoration-[10px]"
      >
        Mission Statement
      </h1>

      <div class="w-[80%] mx-auto text-lg space-y-6 mb-8">
        <p>
          More In Music's mission is to illuminate the diverse career paths
          within the music industry, ignite the passion of current and future
          leaders, and cultivate a culture of empowerment and support.
        </p>

        <div>
          <p class="font-bold mb-2">Peer to Peer</p>
          <p>
            We believe in the power of shared experiences. Through storytelling
            and mutual support, we foster a community where industry
            professionals uplift and inspire one another, creating a unified and
            nurturing environment.
          </p>
        </div>

        <div>
          <p class="font-bold mb-2">Peer to Youth</p>
          <p>
            Our goal is to offer young individuals invaluable insights into the
            real-world experiences of industry veterans. By sharing stories of
            success and challenges, we equip the next generation with the
            knowledge and resilience they need to navigate their own musical
            journeys.
          </p>
        </div>

        <div>
          <p class="font-bold mb-2">Youth to Future</p>
          <p>
            We bridge the gap between emerging talent and established leaders
            through comprehensive programs. Our panels, workshops, mentorships,
            internships, and digital content—including web series and
            podcasts—are designed to provide practical skills and opportunities
            for young professionals to thrive in their careers.
          </p>
        </div>

        <p>
          <b>
            <NuxtLink to="/partnerships" class="hover:underline"
              >Join us</NuxtLink
            >
            in our mission to educate, inspire, empower, and help shape a future
            where every industry professional has the tools to succeed.
          </b>
        </p>
      </div>

      <!-- Programs & Initiatives -->
      <div class="w-[80%] mx-auto text-lg space-y-6 mb-8">
        <p class="font-bold">Programs & Initiatives:</p>

        <div>
          <p class="font-bold mb-2">More In Music Student Cohort Program</p>
          <p>
            The More In Music Student Cohort Program is a program for young
            adults, aged 18–26. Over the course of the program, the cohort
            produce every aspect of the conference. This diverse
            group—comprising participants from community colleges, state
            universities, private institutions, and those not currently enrolled
            in school—gain hands-on experience and mentorship in event
            production over a 23-week program. The cohort is involved in
            programming, booking, marketing, production, creative direction,
            logistics, and more, working in committees led by More In Music
            advisors guiding them through the planning process. Together, they
            curate and execute the event from start to finish.
          </p>
        </div>

        <div>
          <p class="font-bold mb-2">More In Music Conference</p>
          <p>
            The More In Music Conference is 1-2 Day traveling Conference. The
            Conference included panel conversations, workshops and key notes
            from some of the music industries most influential and diverse
            leaders. The Conference is focused on providing College Students and
            the community at large an opportunity to gain exposure to different
            careers in the music industry and well as learn and be mentored by
            some of the leading executives and creatives in the business.
            Attendees will also get an opportunity to learn from people at all
            levels in the music industry, as experience can be shared at any and
            all levels.
          </p>
        </div>

        <p class="font-bold">
          Support Us In Our Mission Of Creating Mentorship, Music Education &
          Career Development For All In The Music Industry
        </p>

        <a
          href="https://betterunite.com/moreinmusicfoundation-alwayson"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-block"
        >
          <div
            class="w-[200px] bg-brand-button text-white rounded-full py-4 mx-auto my-12 text-2xl hover:opacity-90 transition-opacity"
          >
            <h3 class="text-center font-bold">DONATE</h3>
          </div>
        </a>
      </div>

      <!-- Newsletter -->
      <div class="my-12">
        <NewsletterSignup />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'More in Music - About',
  meta: [
    {
      property: 'og:image',
      content: '/img/main-image.jpg',
    },
  ],
})
</script>
