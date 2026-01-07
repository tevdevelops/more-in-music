import { createClient, type SanityClient } from '@sanity/client'

let sanityClient: SanityClient | null = null

/**
 * Get or create the Sanity client instance
 * Uses Nuxt runtime config to access environment variables
 */
export function getSanityClient(): SanityClient {
  // If client already exists, return it (singleton pattern)
  if (sanityClient) {
    return sanityClient
  }

  // Get runtime config (works in Nuxt context)
  const config = useRuntimeConfig()
  const projectId = config.public.sanityProjectId
  const dataset = config.public.sanityDataset

  if (!projectId || !dataset) {
    throw new Error(
      'Missing required Sanity environment variables: NUXT_PUBLIC_SANITY_PROJECT_ID and NUXT_PUBLIC_SANITY_DATASET must be set'
    )
  }

  sanityClient = createClient({
    projectId,
    dataset,
    apiVersion: '2025-10-01',
    useCdn: true,
  })

  return sanityClient
}

// Export for backward compatibility (creates client on first access)
export const sanity = new Proxy({} as SanityClient, {
  get(_target, prop) {
    const client = getSanityClient()
    const value = client[prop as keyof SanityClient]
    return typeof value === 'function' ? value.bind(client) : value
  },
})
