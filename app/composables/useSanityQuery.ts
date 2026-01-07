import { getSanityClient } from '~/lib/sanity.client'

/**
 * Composable to query Sanity data using the direct client
 */
export const useSanityQuery = async <T = any>(
  query: string,
  params: Record<string, any> = {}
) => {
  const sanity = getSanityClient()
  const data = await sanity.fetch<T>(query, params)
  return { data: ref(data) }
}

