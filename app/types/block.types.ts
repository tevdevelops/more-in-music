import type { PortableTextBlock } from '@portabletext/types'

export interface RichTextBlock {
  _key: string
  _type: 'richTextBlock'
  content?: PortableTextBlock[]
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

export type ColumnContentBlock = RichTextBlock | VideoEmbedBlock | GalleryBlock
