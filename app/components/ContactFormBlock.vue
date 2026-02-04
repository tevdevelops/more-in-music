<template>
  <div class="w-full max-w-3xl mx-auto my-12 px-12 py-8 bg-gray-100 rounded-lg">
    <p v-if="formDescription" class="text-brand-dark mb-6">
      {{ formDescription }}
    </p>
    <p v-else class="text-brand-dark mb-6">
      The best way to contact us is to use our contact form below. Please fill
      out all of the required fields and we will get back to you as soon as
      possible.
    </p>
    <form class="space-y-4" @submit.prevent="onSubmit">
      <div>
        <label
          for="contact-full-name"
          class="block text-brand-dark font-medium mb-1"
        >
          Full name *
        </label>
        <input
          id="contact-full-name"
          v-model="form.fullName"
          type="text"
          name="fullName"
          required
          placeholder="Your name here"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent"
        />
      </div>
      <div>
        <label
          for="contact-email"
          class="block text-brand-dark font-medium mb-1"
        >
          Email *
        </label>
        <input
          id="contact-email"
          v-model="form.email"
          type="email"
          name="email"
          required
          placeholder="E.g. myemail@email.com"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent"
        />
      </div>
      <div>
        <label
          for="contact-phone"
          class="block text-brand-dark font-medium mb-1"
        >
          Phone number *
        </label>
        <input
          id="contact-phone"
          v-model="form.phone"
          type="tel"
          name="phone"
          required
          placeholder="E.g. 541 444 0755"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent"
        />
      </div>
      <div>
        <label
          for="contact-topic"
          class="block text-brand-dark font-medium mb-1"
        >
          Choose a topic *
        </label>
        <select
          id="contact-topic"
          v-model="form.topic"
          name="topic"
          required
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent bg-white"
        >
          <option value="" disabled>Select an option</option>
          <option value="general">General</option>
          <option value="partnership">Partnership</option>
          <option value="volunteer">Volunteer</option>
          <option value="donate">Donate</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <label
          for="contact-message"
          class="block text-brand-dark font-medium mb-1"
        >
          Message / Question
        </label>
        <textarea
          id="contact-message"
          v-model="form.message"
          name="message"
          rows="5"
          required
          placeholder="What is your question or project?"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent resize-y"
        />
      </div>
      <p class="text-sm text-gray-600">
        Clicking SEND confirms you're okay with getting texts from More In
        Music. Message and/or data rates may apply.
      </p>
      <div class="flex justify-start pt-2">
        <button
          type="submit"
          class="bg-brand-button text-white py-3 px-8 rounded-full cursor-pointer hover:opacity-90 transition-opacity font-semibold"
        >
          SEND
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  formDescription?: string
}>()

const form = reactive({
  fullName: '',
  email: '',
  phone: '',
  topic: '' as string,
  message: '',
})

function onSubmit() {
  // Presentational only; submission endpoint and reCAPTCHA to be added later
  console.log('Contact form submit (stub):', form)
}
</script>
