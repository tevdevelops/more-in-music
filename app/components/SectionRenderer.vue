<template>
  <section
    :class="sectionClasses"
    :style="sectionStyles"
  >
    <div
      :class="containerClasses"
      class="py-12"
    >
      <div :class="gridClasses">
        <div
          v-for="(column, index) in props.section.columns"
          :key="column._key || index"
          :class="columnClasses"
        >
          <ColumnContentRenderer :content="(column.content || [])" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import imageUrlBuilder from '@sanity/image-url'
import { getSanityClient } from '~/lib/sanity.client'
import type { ColumnContentBlock } from '~/types/block.types'

interface Column {
  _key: string
  content?: ColumnContentBlock[]
}

interface Section {
  _id?: string
  title?: string
  fullWidth?: boolean
  backgroundColor?: string
  backgroundImage?: {
    asset?: {
      _id?: string
      url?: string
    }
  }
  columns?: Column[]
}

interface Props {
  section: Section
}

const props = defineProps<Props>()

const builder = imageUrlBuilder(getSanityClient())

// Background color classes mapping
const backgroundColorClasses: Record<string, string> = {
  white: 'bg-white',
  'gray-100': 'bg-gray-100',
  'gray-800': 'bg-gray-800',
  black: 'bg-black text-white',
  primary: 'bg-primary',
  secondary: 'bg-secondary',
}

// Section classes
const sectionClasses = computed(() => {
  const classes = []
  
  if (props.section.backgroundColor) {
    const bgClass = backgroundColorClasses[props.section.backgroundColor] || 'bg-white'
    classes.push(bgClass)
  } else {
    classes.push('bg-white')
  }
  
  return classes.join(' ')
})

// Section styles (for background image)
const sectionStyles = computed(() => {
  const styles: Record<string, string> = {}
  
  if (props.section.backgroundImage?.asset) {
    const imageUrl = builder.image(props.section.backgroundImage.asset).url()
    styles.backgroundImage = `url(${imageUrl})`
    styles.backgroundSize = 'cover'
    styles.backgroundPosition = 'center'
    styles.backgroundRepeat = 'no-repeat'
  }
  
  return styles
})

// Container classes
const containerClasses = computed(() => {
  if (props.section.fullWidth) {
    return 'w-full px-4'
  }
  return 'container mx-auto px-4'
})

// Grid classes based on column count
const gridClasses = computed(() => {
  const columnCount = props.section.columns?.length || 1
  
  if (columnCount === 1) {
    return 'grid grid-cols-1 gap-6'
  } else if (columnCount === 2) {
    return 'grid grid-cols-1 md:grid-cols-2 gap-6'
  }
  
  return 'grid grid-cols-1 gap-6'
})

// Column classes
const columnClasses = computed(() => {
  return 'w-full'
})
</script>
