<template>
  <div>
    <!-- Page Header -->
    <div class="mt-[5%] relative overflow-hidden h-[250px] px-0">
      <img
        id="about-header"
        src="/img/contact.png"
        alt="Contact"
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%]"
      />
    </div>

    <!-- Contact Section -->
    <section class="bg-gray-50 py-8 md:py-12">
      <div class="container mx-auto px-4">
        <div class="flex justify-center">
          <div class="w-full max-w-5xl">
            <p class="text-gray-600 mb-8 text-center">
              The best way to contact us is to use our contact form below.
              Please fill out all of the required fields and we will get back to
              you as soon as possible.
            </p>
            <hr class="w-1/2 mx-auto mb-8 md:mb-12 border-gray-300" />
          </div>
        </div>
      </div>

      <div class="container mx-auto px-4">
        <div class="hb-p-66d53fef08346351d02d896e-1"></div>
        <img
          height="1"
          width="1"
          style="display: none"
          src="https://www.honeybook.com/p.png?pid=66d53fef08346351d02d896e"
          alt=""
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'More in Music - Contact',
  meta: [
    {
      property: 'og:image',
      content: '/img/main-image.jpg',
    },
  ],
  script: [
    {
      innerHTML: `
        (function(h,b,s,n,i,p,e,t) {
          h._HB_ = h._HB_ || {};h._HB_.pid = i;;;;
          t=b.createElement(s);t.type="text/javascript";t.async=!0;t.src=n;
          e=b.getElementsByTagName(s)[0];e.parentNode.insertBefore(t,e);
        })(window,document,"script","https://widget.honeybook.com/assets_users_production/websiteplacements/placement-controller.min.js","66d53fef08346351d02d896e");
      `,
      type: 'text/javascript',
    },
  ],
})
</script>
