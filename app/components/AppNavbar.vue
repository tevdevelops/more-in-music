<template>
  <nav class="fixed top-0 w-full z-50 bg-brand-nav">
    <div class="container mx-auto px-4 py-2">
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
        <div v-if="navigationItems.length > 0" class="hidden lg:flex lg:items-center lg:gap-4 lg:space-x-1">
          <template v-for="item in navigationItems" :key="item._key">
            <!-- Dropdown menu item -->
            <div v-if="item.hasChildren" class="relative group">
              <button
                @click="toggleDropdown(item._key)"
                class="text-white mx-2 py-2 hover:opacity-80 flex items-center"
              >
                {{ item.label }}
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
                <template v-for="child in item.children" :key="child._key">
                  <NuxtLink
                    v-bind="child.linkProps"
                    class="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    {{ child.label }}
                  </NuxtLink>
                </template>
              </div>
            </div>
            <!-- Simple link item -->
            <NuxtLink
              v-else
              v-bind="item.linkProps"
              class="text-white mx-2 py-2 hover:opacity-80"
            >
              {{ item.label }}
            </NuxtLink>
          </template>
        </div>
      </div>

      <!-- Mobile menu -->
      <div v-show="mobileMenuOpen && navigationItems.length > 0" class="lg:hidden py-4">
        <template v-for="item in navigationItems" :key="item._key">
          <!-- Dropdown menu item (mobile) -->
          <div v-if="item.hasChildren">
            <button
              @click="toggleDropdown(item._key)"
              class="w-full text-left text-white py-2 px-4 hover:bg-white/20 flex items-center justify-between"
            >
              {{ item.label }}
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
                  :d="dropdownStates[item._key] ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'"
                />
              </svg>
            </button>
            <div v-show="dropdownStates[item._key]" class="pl-4">
              <template v-for="child in item.children" :key="child._key">
                <NuxtLink
                  v-bind="child.linkProps"
                  class="block text-white py-2 px-4 hover:bg-white/20"
                  @click="closeMobileMenu"
                >
                  {{ child.label }}
                </NuxtLink>
              </template>
            </div>
          </div>
          <!-- Simple link item (mobile) -->
          <NuxtLink
            v-else
            v-bind="item.linkProps"
            class="block text-white py-2 px-4 hover:bg-white/20"
            @click="closeMobileMenu"
          >
            {{ item.label }}
          </NuxtLink>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useSanityHeader } from '~/composables/useSanityHeader'

// Fetch navigation items from Sanity
const { navigationItems } = await useSanityHeader()

// Mobile menu state
const mobileMenuOpen = ref(false)

// Dynamic dropdown states for mobile menu (keyed by nav item _key)
const dropdownStates = ref<Record<string, boolean>>({})

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
  // Close all dropdowns
  Object.keys(dropdownStates.value).forEach((key) => {
    dropdownStates.value[key] = false
  })
}

const toggleDropdown = (key: string) => {
  dropdownStates.value[key] = !dropdownStates.value[key]
}
</script>
