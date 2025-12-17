<template>
  <div>
    <!-- Hero Section with Image Header -->
    <div class="relative w-full overflow-hidden bg-white max-h-[1700px]">
      <div class="relative w-full">
        <img
          class="w-full"
          src="/img/main-image.jpg"
          alt="More in Music Hero"
        />
      </div>
      <div
        class="absolute top-1/2 left-[63%] transform -translate-x-1/2 -translate-y-1/2 w-full"
      >
        <img class="w-[90%]" src="/img/more-in-music.png" alt="More in Music" />
      </div>
    </div>

    <!-- Featured Section -->
    <div class="flex flex-col lg:flex-row w-full">
      <div class="w-full lg:w-1/2">
        <h1 class="text-center lg:hidden font-bold mb-6">
          I'M MY WILDEST DREAMS COLLECTION
        </h1>
        <img
          src="/img/wildest-dreams-2.png"
          class="block w-full"
          alt="Wildest Dreams 2"
        />
        <img
          src="/img/wildest-dreams.png"
          class="block w-full"
          alt="Wildest Dreams"
        />
      </div>
      <div class="w-full lg:w-1/2">
        <div class="text-center px-4 py-8 lg:py-12">
          <h1 class="hidden lg:block font-bold mb-6">
            I'M MY WILDEST DREAM COLLECTION
          </h1>
          <div class="space-y-4 text-lg">
            <p>
              Introducing the I'm My Wildest Dreams campaign. More In Music
              connects established industry experts in the music industry with
              aspiring professionals who – like all budding talent – grows,
              flourishes, and reaches their <i>full</i> potential when they have
              guidance from those who have already traveled similar paths.
            </p>
            <p>
              Whether you're currently living your younger self's wildest
              dreams, or are putting in the work to make your future self proud,
              we hope this campaign inspires reflection on where you've come
              from, where you are, and where you're going. For the community
              who's been with us from the beginning, we're unveiling an
              exclusive Wildest Dreams collection.
            </p>
            <p>
              When you make a donation of $50 or more to More In Music today,
              you'll be the first to receive the Wildest Dreams t-shirt,
              long-sleeve, or hoodie.
            </p>
            <p>
              Between now and December 31st,
              <b>our goal is to raise $10,000</b> that directly supports More In
              Music's Student Cohort program as well as our education and career
              development initiatives.
            </p>
            <p>
              All donations made by December 31st will receive the collection
              ahead of its official release in Early 2026.
            </p>
          </div>

          <a
            href="https://betterunite.com/moreinmusicfoundation-alwayson"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-block mt-8"
          >
            <div
              class="w-[200px] bg-brand-button text-white rounded-full py-4 mx-auto my-12 text-4xl hover:opacity-90 transition-opacity"
            >
              <h3 class="text-center font-bold">DONATE</h3>
            </div>
          </a>
        </div>
      </div>
    </div>

    <!-- Video Section -->
    <div class="bg-brand-nav py-8">
      <div class="w-[90%] mx-auto">
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
    </div>

    <!-- DropInBlog and Newsletter Section -->
    <div class="w-full px-4 py-8">
      <div id="dib-recent-posts"></div>

      <div class="my-12">
        <NewsletterSignup />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'More in Music - Home',
  meta: [
    {
      property: 'og:image',
      content: '/img/main-image.jpg',
    },
  ],
})

// DropInBlog Script
useHead({
  script: [
    {
      async: true,
      src: 'https://io.dropinblog.com/embedjs/39ee9d3f-4ebe-4da0-8c59-7e4a59f13276.js',
    },
    {
      innerHTML: 'var dib_recent_posts = 2',
      type: 'text/javascript',
    },
  ],
})
</script>
