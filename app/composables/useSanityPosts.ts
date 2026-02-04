export interface SanityPostSummary {
  _id: string
  title: string
  slug: string | null
  excerpt?: string
  publishedAt: string
  author?: string
  mainImage?: {
    asset?: {
      _id?: string
      url?: string
      metadata?: {
        dimensions?: {
          width: number
          height: number
        }
      }
    }
  }
}

export const useSanityPosts = async () => {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    author,
    mainImage{
      asset->{
        _id,
        url,
        metadata{
          dimensions{
            width,
            height
          }
        }
      }
    }
  }`

  const { data: posts } = await useSanityQuery<SanityPostSummary[]>(query)
  return posts.value
}
