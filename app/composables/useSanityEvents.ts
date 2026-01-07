export const useSanityEvents = async () => {
  const query = `*[_type == "event"] | order(date desc) {
    _id,
    title,
    slug,
    date,
    description,
    location,
    "imageUrl": image.asset->url
  }`

  const { data: events } = await useSanityQuery(query)
  return events.value
}



