export interface SanityEventSummary {
  _id: string
  title: string
  slug: string | null
  date: string
  description?: string
  location?: string
  rsvpLink?: string
  image?: {
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

export const useSanityEvents = async () => {
  const query = `*[_type == "event"] | order(date desc) {
    _id,
    title,
    "slug": slug.current,
    date,
    description,
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
    }
  }`

  const { data: events } = await useSanityQuery<SanityEventSummary[]>(query)
  return events.value
}
