import { useSanityQuery } from './useSanityQuery'

/**
 * Base type for raw child nav link from Sanity (before enrichment)
 */
type RawChildNavLink = {
  _key: string
  label: string
  linkType: 'internal' | 'external'
  internalReference?: {
    _id: string
    _type: 'page' | 'homePage'
    slug?: {
      current: string
    }
  }
  externalUrl?: string
}

/**
 * Base type for raw nav link from Sanity (before enrichment)
 */
type RawNavLink = {
  _key: string
  label: string
  linkType: 'internal' | 'external' | 'dropdownOnly'
  internalReference?: {
    _id: string
    _type: 'page' | 'homePage'
    slug?: {
      current: string
    }
  }
  externalUrl?: string
  children?: RawChildNavLink[]
}

export interface ChildNavLink {
  _key: string
  label: string
  linkType: 'internal' | 'external'
  internalReference?: {
    _id: string
    _type: 'page' | 'homePage'
    slug?: {
      current: string
    }
  }
  externalUrl?: string
  url: string
  // Computed helper properties
  isInternal: boolean
  isExternal: boolean
  component: 'a' | 'NuxtLink'
  linkProps: {
    href?: string
    to?: string
    target?: string
    rel?: string
  }
}

/**
 * Main navigation link
 */
export interface NavLink {
  _key: string
  label: string
  linkType: 'internal' | 'external' | 'dropdownOnly'
  internalReference?: {
    _id: string
    _type: 'page' | 'homePage'
    slug?: {
      current: string
    }
  }
  externalUrl?: string
  children?: ChildNavLink[]
  url: string
  // Computed helper properties
  isInternal: boolean
  isExternal: boolean
  isDropdownOnly: boolean
  hasChildren: boolean
  component: 'a' | 'NuxtLink' | 'button'
  linkProps: {
    href?: string
    to?: string
    target?: string
    rel?: string
  }
}

/**
 * Header document structure
 */
export interface Header {
  _id: string
  navigationItems?: NavLink[]
}

/**
 * Resolve URL for a navigation link
 */
function resolveNavLinkUrl(link: RawNavLink | RawChildNavLink): string {
  if (link.linkType === 'external' && link.externalUrl) {
    return link.externalUrl
  }

  if (link.linkType === 'internal' && link.internalReference) {
    const ref = link.internalReference
    
    // HomePage references go to root
    if (ref._type === 'homePage') {
      return '/'
    }
    
    // Page references use their slug
    if (ref._type === 'page' && ref.slug?.current) {
      return `/${ref.slug.current}`
    }
  }

  // Dropdown-only or no valid link
  return '#'
}

/**
 * Enrich child nav link with computed properties
 */
function enrichChildNavLink(child: RawChildNavLink): ChildNavLink {
  const url = resolveNavLinkUrl(child)
  const isInternal = child.linkType === 'internal'
  const isExternal = child.linkType === 'external'
  const component = isExternal ? 'a' : 'NuxtLink'

  return {
    ...child,
    url,
    isInternal,
    isExternal,
    component,
    linkProps: {
      ...(isExternal ? { href: url, target: '_blank', rel: 'noopener noreferrer' } : { to: url }),
    },
  }
}

/**
 * Enrich nav link with computed properties
 */
function enrichNavLink(item: RawNavLink): NavLink {
  const url = resolveNavLinkUrl(item)
  const isInternal = item.linkType === 'internal'
  const isExternal = item.linkType === 'external'
  const isDropdownOnly = item.linkType === 'dropdownOnly'
  const hasChildren = Boolean(item.children && item.children.length > 0)
  
  // Determine component based on link type and children
  let component: 'a' | 'NuxtLink' | 'button'
  if (isDropdownOnly && hasChildren) {
    component = 'button'
  } else if (isExternal) {
    component = 'a'
  } else {
    component = 'NuxtLink'
  }

  // Enrich children if they exist
  const enrichedChildren = item.children?.map(enrichChildNavLink)

  return {
    ...item,
    url,
    isInternal,
    isExternal,
    isDropdownOnly,
    hasChildren,
    component,
    children: enrichedChildren,
    linkProps: {
      ...(isDropdownOnly && hasChildren
        ? {} // No link props for dropdown-only buttons
        : isExternal
        ? { href: url, target: '_blank', rel: 'noopener noreferrer' }
        : { to: url }),
    },
  }
}

/**
 * Resolve all URLs and enrich navigation items with computed properties
 */
function enrichNavigationItems(navItems: RawNavLink[]): NavLink[] {
  return navItems.map(enrichNavLink)
}

/**
 * Composable to fetch header navigation from Sanity
 */
export const useSanityHeader = async () => {
  // Query the singleton header document by type
  // Resolve internal references to get slug information
  const query = `*[_type == "header"][0]{
    _id,
    navigationItems[]{
      _key,
      label,
      linkType,
      internalReference->{
        _id,
        _type,
        slug
      },
      externalUrl,
      children[]{
        _key,
        label,
        linkType,
        internalReference->{
          _id,
          _type,
          slug
        },
        externalUrl
      }
    }
  }`

  const { data } = await useSanityQuery<Header>(query)
  const header = data.value

  // Enrich navigation items with computed properties
  const navigationItems = header?.navigationItems
    ? enrichNavigationItems(header.navigationItems)
    : []

  return {
    header: header || null,
    navigationItems: ref(navigationItems),
  }
}
