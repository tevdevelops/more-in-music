<template>
  <nav class="fixed top-0 w-full z-50 bg-brand-nav">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center">
          <img class="w-[60px]" src="/img/logo.png" alt="More in Music Logo" />
        </NuxtLink>

        <!-- Mobile menu button -->
        <button
          @click="toggleMobileMenu"
          class="lg:hidden text-white p-2"
          aria-label="Toggle menu"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              v-if="!mobileMenuOpen"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <!-- Desktop menu -->
        <div class="hidden lg:flex lg:items-center lg:space-x-1">
          <NuxtLink to="/" class="text-white mx-2 py-2 hover:opacity-80">
            Home
          </NuxtLink>

          <!-- About dropdown -->
          <div class="relative group">
            <button
              class="text-white mx-2 py-2 hover:opacity-80 flex items-center"
            >
              About
              <svg
                class="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              class="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
            >
              <NuxtLink
                to="/about"
                class="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                About + Mission
              </NuxtLink>
            </div>
          </div>

          <!-- Programming dropdown -->
          <div class="relative group">
            <button
              class="text-white mx-2 py-2 hover:opacity-80 flex items-center"
            >
              Programming
              <svg
                class="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              class="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
            >
              <NuxtLink
                to="/events"
                class="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                Events
              </NuxtLink>
              <NuxtLink
                to="/conference"
                class="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                Conference
              </NuxtLink>
            </div>
          </div>

          <NuxtLink
            to="/partnerships"
            class="text-white mx-2 py-2 hover:opacity-80"
          >
            Partnerships
          </NuxtLink>

          <!-- Media dropdown -->
          <div class="relative group">
            <button
              class="text-white mx-2 py-2 hover:opacity-80 flex items-center"
            >
              Media
              <svg
                class="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              class="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
            >
              <NuxtLink
                to="/blog"
                class="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                Blog
              </NuxtLink>
              <NuxtLink
                to="/gallery"
                class="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                Gallery
              </NuxtLink>
            </div>
          </div>

          <NuxtLink to="/contact" class="text-white mx-2 py-2 hover:opacity-80">
            Contact
          </NuxtLink>

          <a
            href="https://betterunite.com/moreinmusicfoundation-alwayson"
            target="_blank"
            rel="noopener noreferrer"
            class="text-white mx-2 py-2 hover:opacity-80"
          >
            Donate
          </a>
        </div>
      </div>

      <!-- Mobile menu -->
      <div v-show="mobileMenuOpen" class="lg:hidden pb-4">
        <NuxtLink
          to="/"
          class="block text-white py-2 px-4 hover:bg-white/20"
          @click="closeMobileMenu"
        >
          Home
        </NuxtLink>

        <!-- About dropdown (mobile) -->
        <div>
          <button
            @click="toggleAboutDropdown"
            class="w-full text-left text-white py-2 px-4 hover:bg-white/20 flex items-center justify-between"
          >
            About
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                :d="aboutDropdownOpen ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'"
              />
            </svg>
          </button>
          <div v-show="aboutDropdownOpen" class="pl-4">
            <NuxtLink
              to="/about"
              class="block text-white py-2 px-4 hover:bg-white/20"
              @click="closeMobileMenu"
            >
              About + Mission
            </NuxtLink>
          </div>
        </div>

        <!-- Programming dropdown (mobile) -->
        <div>
          <button
            @click="toggleProgrammingDropdown"
            class="w-full text-left text-white py-2 px-4 hover:bg-white/20 flex items-center justify-between"
          >
            Programming
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                :d="
                  programmingDropdownOpen ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'
                "
              />
            </svg>
          </button>
          <div v-show="programmingDropdownOpen" class="pl-4">
            <NuxtLink
              to="/events"
              class="block text-white py-2 px-4 hover:bg-white/20"
              @click="closeMobileMenu"
            >
              Events
            </NuxtLink>
            <NuxtLink
              to="/conference"
              class="block text-white py-2 px-4 hover:bg-white/20"
              @click="closeMobileMenu"
            >
              Conference
            </NuxtLink>
          </div>
        </div>

        <NuxtLink
          to="/partnerships"
          class="block text-white py-2 px-4 hover:bg-white/20"
          @click="closeMobileMenu"
        >
          Partnerships
        </NuxtLink>

        <!-- Media dropdown (mobile) -->
        <div>
          <button
            @click="toggleMediaDropdown"
            class="w-full text-left text-white py-2 px-4 hover:bg-white/20 flex items-center justify-between"
          >
            Media
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                :d="mediaDropdownOpen ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'"
              />
            </svg>
          </button>
          <div v-show="mediaDropdownOpen" class="pl-4">
            <NuxtLink
              to="/blog"
              class="block text-white py-2 px-4 hover:bg-white/20"
              @click="closeMobileMenu"
            >
              Blog
            </NuxtLink>
            <NuxtLink
              to="/gallery"
              class="block text-white py-2 px-4 hover:bg-white/20"
              @click="closeMobileMenu"
            >
              Gallery
            </NuxtLink>
          </div>
        </div>

        <NuxtLink
          to="/contact"
          class="block text-white py-2 px-4 hover:bg-white/20"
          @click="closeMobileMenu"
        >
          Contact
        </NuxtLink>

        <a
          href="https://betterunite.com/moreinmusicfoundation-alwayson"
          target="_blank"
          rel="noopener noreferrer"
          class="block text-white py-2 px-4 hover:bg-white/20"
          @click="closeMobileMenu"
        >
          Donate
        </a>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const mobileMenuOpen = ref(false)
const aboutDropdownOpen = ref(false)
const programmingDropdownOpen = ref(false)
const mediaDropdownOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
  aboutDropdownOpen.value = false
  programmingDropdownOpen.value = false
  mediaDropdownOpen.value = false
}

const toggleAboutDropdown = () => {
  aboutDropdownOpen.value = !aboutDropdownOpen.value
}

const toggleProgrammingDropdown = () => {
  programmingDropdownOpen.value = !programmingDropdownOpen.value
}

const toggleMediaDropdown = () => {
  mediaDropdownOpen.value = !mediaDropdownOpen.value
}
</script>
