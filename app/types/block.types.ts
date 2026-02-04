import type { PortableTextBlock } from '@portabletext/types'

export interface ButtonBlock {
  _key: string
  _type: 'buttonBlock'
  text: string
  size?: 'small' | 'medium' | 'large'
  linkType?: 'url' | 'reference'
  url?: string
  pageReference?: {
    _id: string
    _type: 'page' | 'homePage'
    slug?: string
    title?: string
  }
}

export interface RichTextBlock {
  _key: string
  _type: 'richTextBlock'
  alignment?: 'left' | 'center' | 'right'
  sticky?: boolean
  content?: (PortableTextBlock | ButtonBlock)[]
}

export interface VideoEmbedBlock {
  _key: string
  _type: 'videoEmbedBlock'
  videoType: 'youtube' | 'vimeo' | 'upload'
  youtubeUrl?: string
  vimeoUrl?: string
  videoFile?: {
    asset?: {
      _id?: string
      url?: string
    }
  }
  caption?: string
}

export interface GalleryBlock {
  _key: string
  _type: 'galleryBlock'
  images?: Array<{
    _key?: string
    asset?: {
      _id?: string
      url?: string
    }
    alt?: string
    caption?: string
  }>
}

export interface PageHeaderBlock {
  _key: string
  _type: 'pageHeaderBlock'
  text?: string
  textAlignment?: 'left' | 'center' | 'right'
  image?: {
    asset?: {
      _id?: string
      url?: string
    }
    alt?: string
  }
}

export interface EventCardsBlock {
  _key: string
  _type: 'eventCardsBlock'
  header?: string
  filter?: 'all' | 'new' | 'past'
}

export interface BlogCardsBlock {
  _key: string
  _type: 'blogCardsBlock'
  header?: string
  limit?: number
}

export interface ContactFormBlock {
  _key: string
  _type: 'contactFormBlock'
  formDescription?: string
}

export type ColumnContentBlock =
  | RichTextBlock
  | VideoEmbedBlock
  | GalleryBlock
  | PageHeaderBlock
  | EventCardsBlock
  | BlogCardsBlock
  | ContactFormBlock
