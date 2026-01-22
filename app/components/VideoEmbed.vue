<template>
  <div class="video-embed my-4">
    <div v-if="videoType === 'youtube' && youtubeUrl" class="aspect-video w-full">
      <iframe
        :src="youtubeEmbedUrl"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        class="w-full h-full rounded-lg"
      />
    </div>
    <div v-else-if="videoType === 'vimeo' && vimeoUrl" class="aspect-video w-full">
      <iframe
        :src="vimeoEmbedUrl"
        frameborder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowfullscreen
        class="w-full h-full rounded-lg"
      />
    </div>
    <div v-else-if="videoType === 'upload' && videoFile" class="aspect-video w-full">
      <video
        :src="videoFileUrl"
        controls
        class="w-full h-full rounded-lg"
      >
        Your browser does not support the video tag.
      </video>
    </div>
    <p v-if="caption" class="text-sm text-gray-600 mt-2 text-center">
      {{ caption }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
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

const props = defineProps<Props>()

/**
 * Extract YouTube video ID from URL
 */
function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
  ]
  
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match && match[1]) {
      return match[1]
    }
  }
  
  return null
}

/**
 * Extract Vimeo video ID from URL
 */
function extractVimeoId(url: string): string | null {
  const patterns = [
    /(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/,
    /vimeo\.com\/(\d+)/,
  ]
  
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match && match[1]) {
      return match[1]
    }
  }
  
  return null
}

const youtubeEmbedUrl = computed(() => {
  if (!props.youtubeUrl) return ''
  const videoId = extractYouTubeId(props.youtubeUrl)
  if (!videoId) return props.youtubeUrl
  return `https://www.youtube.com/embed/${videoId}`
})

const vimeoEmbedUrl = computed(() => {
  if (!props.vimeoUrl) return ''
  const videoId = extractVimeoId(props.vimeoUrl)
  if (!videoId) return props.vimeoUrl
  return `https://player.vimeo.com/video/${videoId}`
})

const videoFileUrl = computed(() => {
  return props.videoFile?.asset?.url || ''
})
</script>
