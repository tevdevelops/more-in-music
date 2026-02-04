import type { PortableTextBlock } from '@portabletext/types'
import type { SanityEventSummary } from '~/composables/useSanityEvents'
import { useSanityQuery } from '~/composables/useSanityQuery'

export interface SanityEventDetail extends SanityEventSummary {
  body?: PortableTextBlock[]
  seo?: {
    title?: string
    description?: string
    image?: {
      asset?: {
        url?: string
      }
    }
  }
}

export const useSanityEvent = async (slug: string) => {
  const query = `*[_type == "event" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    date,
    description,
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
    },
    location,
    rsvpLink,
    image{
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
    seo {
      title,
      description,
      image {
        asset->{
          url
        }
      }
    }
  }`

  const { data: event } = await useSanityQuery<SanityEventDetail | null>(query, {
    slug,
  })

  return event.value
}
