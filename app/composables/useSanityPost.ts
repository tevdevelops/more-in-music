import type { PortableTextBlock } from '@portabletext/types'
import type { SanityPostSummary } from '~/composables/useSanityPosts'
import { useSanityQuery } from '~/composables/useSanityQuery'

export interface SanityPostDetail extends SanityPostSummary {
  body?: PortableTextBlock[]
}

export const useSanityPost = async (slug: string) => {
  const query = `*[_type == "post" && slug.current == $slug][0]{
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
    },
    body[]{
      ...,
      _type == "image" => {
        ...,
        asset->{
          _id,
          url,
          metadata {
            dimensions { width, height }
          }
        }
      }
    }
  }`

  const { data: post } = await useSanityQuery<SanityPostDetail | null>(query, {
    slug,
  })

  return post.value
}
