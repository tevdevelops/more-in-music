// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image', '@nuxt/fonts'],
  
  runtimeConfig: {
    public: {
      sanityProjectId: '', // can be overridden by NUXT_PUBLIC_SANITY_PROJECT_ID
      sanityDataset: '', // can be overridden by NUXT_PUBLIC_SANITY_DATASET
    },
  },
})