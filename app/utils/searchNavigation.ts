import type { ContentNavigationItem } from '@nuxt/content'

function navigationRank(item: ContentNavigationItem) {
  const path = item.path || ''

  if (path === '/guide' || path.startsWith('/guide/')) {
    return 0
  }

  if (path === '/codex' || path.startsWith('/codex/')) {
    return 1
  }

  if (path === '/miscellaneous' || path.startsWith('/miscellaneous/')) {
    return 2
  }

  if (path === '/tldr') {
    return 3
  }

  if (path === '/') {
    return 4
  }

  return 5
}

export function sortSearchNavigation(items: ContentNavigationItem[]) {
  return [...items].sort((left, right) => {
    const rankDifference = navigationRank(left) - navigationRank(right)

    if (rankDifference !== 0) {
      return rankDifference
    }

    return (left.title || '').localeCompare(right.title || '')
  })
}
