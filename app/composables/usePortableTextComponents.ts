import { h } from 'vue'
import imageUrlBuilder from '@sanity/image-url'
import { getSanityClient } from '~/lib/sanity.client'

/**
 * Shared composable for PortableText component configuration
 * Provides consistent styling and custom block types across all PortableText usages
 */
export function usePortableTextComponents() {
  const builder = imageUrlBuilder(getSanityClient())

  return {
    // Block-level styling for headers and paragraphs
    block: {
      h1: (_props: any, { slots }: any) =>
        h('h1', { class: 'mb-4' }, slots.default?.()),
      h2: (_props: any, { slots }: any) =>
        h('h2', { class: 'mb-4' }, slots.default?.()),
      h3: (_props: any, { slots }: any) =>
        h('h3', { class: 'mb-4' }, slots.default?.()),
      h4: (_props: any, { slots }: any) =>
        h('h4', { class: 'mb-4' }, slots.default?.()),
      h5: (_props: any, { slots }: any) =>
        h('h5', { class: 'mb-4' }, slots.default?.()),
      h6: (_props: any, { slots }: any) =>
        h('h6', { class: 'mb-4' }, slots.default?.()),
      normal: (_props: any, { slots }: any) =>
        h('p', { class: 'mb-4' }, slots.default?.()),
    },
    // Custom block types
    types: {
      image: ({ value }: any) => {
        if (!value?.asset) return null
        const imageUrl = builder.image(value).url()
        return h('img', {
          src: imageUrl,
          alt: value.alt || '',
          class: 'rounded-lg my-4 max-w-full',
        })
      },
      buttonBlock: ({ value }: any) => {
        if (!value?.text) return null

        // Determine the href based on linkType
        let href = '#'
        if (value.linkType === 'url' && value.url) {
          href = value.url
        } else if (value.linkType === 'reference' && value.pageReference) {
          // Resolve the reference to a URL
          if (value.pageReference._type === 'homePage') {
            href = '/'
          } else if (value.pageReference._type === 'page' && value.pageReference.slug) {
            href = `/${value.pageReference.slug}`
          } else if (value.pageReference.slug) {
            // Fallback for any other type with a slug
            href = `/${value.pageReference.slug}`
          }
        } else if (value.url) {
          // Fallback to url if linkType is not set (backward compatibility)
          href = value.url
        }

        return h(
          'a',
          {
            href,
            class:
              'inline-block bg-brand-button text-white py-3 px-6 rounded-full cursor-pointer hover:opacity-90 transition-opacity font-semibold',
          },
          value.text
        )
      },
    },
  }
}
