import type { ContentNavigationItem } from '@nuxt/content'

type SidebarNavigationItem = ContentNavigationItem & {
  defaultOpen?: boolean
  target?: string
  children?: SidebarNavigationItem[]
}

function normalizePath(path: string) {
  return path.replace(/\/$/, '') || '/'
}

function routeMatches(path: string, prefix: string) {
  const normalizedPath = normalizePath(path)
  const normalizedPrefix = normalizePath(prefix)

  return normalizedPath === normalizedPrefix || normalizedPath.startsWith(`${normalizedPrefix}/`)
}

function isInTree(item: SidebarNavigationItem, path: string): boolean {
  if (item.path && normalizePath(item.path) === normalizePath(path)) {
    return true
  }

  return item.children?.some(child => isInTree(child, path)) ?? false
}

function section(
  title: string,
  children: SidebarNavigationItem[],
  path: string,
  defaultOpen = false,
): SidebarNavigationItem {
  return {
    title,
    path,
    defaultOpen,
    children,
  }
}

function guideChildren(path: string): SidebarNavigationItem[] {
  const advancedTopics = [
    { title: 'Timing the Fight', path: '/guide/timing-the-fight' },
    { title: 'Landing', path: '/guide/landing' },
    { title: 'Positioning', path: '/guide/positioning' },
    { title: 'Pogris', path: '/guide/pogris' },
    { title: 'Speedrun Strats', path: '/guide/speedrun-strats' },
  ]

  return [
    { title: 'Welcome', path: '/guide/welcome' },
    { title: 'Getting Started', path: '/guide/getting-started' },
    { title: 'Basic Principles', path: '/guide/basic-principles' },
    {
      title: 'Builds',
      defaultOpen: true,
      children: [
        { title: 'Chroma Builds', path: '/guide/chroma-builds' },
        { title: 'Eclipse Builds', path: '/guide/eclipse-builds' },
        { title: 'Other Builds', path: '/guide/other-builds' },
        { title: 'Squad Builds', path: '/guide/squad-builds' },
      ],
    },
    { title: 'Riven Guide', path: '/guide/riven-guide' },
    {
      title: 'Advanced Topics',
      defaultOpen: advancedTopics.some(item => item.path === normalizePath(path)),
      children: advancedTopics,
    },
  ]
}

function codexChildren(): SidebarNavigationItem[] {
  return [
    { title: 'Overview', path: '/codex' },
    { title: 'Creating Builds', path: '/codex/creating-builds' },
    { title: 'Contagion Zaws', path: '/codex/contagion-zaws' },
    { title: 'Misc Trivia', path: '/codex/misc-trivia' },
    { title: 'Untapped Potential', path: '/codex/untapped-potential' },
  ]
}

function miscellaneousChildren(): SidebarNavigationItem[] {
  return [
    { title: 'Known Bugs', path: '/miscellaneous/bugs' },
    { title: 'Resources Used', path: '/miscellaneous/resources-used-honorable-mentions' },
    { title: 'Privacy Policy', path: '/miscellaneous/privacy-policy' },
    { title: 'Calculator', path: 'https://calc.profit-taker.com', target: '_blank' },
    { title: 'Analyzer', path: 'https://pta.profit-taker.com', target: '_blank' },
  ]
}

function withActiveOpen(item: SidebarNavigationItem, path: string, fallbackOpen = false): SidebarNavigationItem {
  return {
    ...item,
    defaultOpen: fallbackOpen || isInTree(item, path),
  }
}

function collapsedUnlessActive(item: SidebarNavigationItem, path: string): SidebarNavigationItem {
  return withActiveOpen({
    ...item,
    defaultOpen: false,
  }, path)
}

function seeMore(items: SidebarNavigationItem[]): SidebarNavigationItem {
  return {
    title: 'See also',
    defaultOpen: true,
    children: items,
  }
}

export function getSidebarNavigation(path: string): SidebarNavigationItem[] {
  const guide = section('Guide', guideChildren(path), '/guide/welcome')
  const codex = section('Codex', codexChildren(), '/codex')
  const miscellaneous = section('Miscellaneous', miscellaneousChildren(), '/miscellaneous/bugs')

  if (routeMatches(path, '/guide')) {
    return [
      withActiveOpen(guide, path, true),
      seeMore([
        collapsedUnlessActive(codex, path),
        collapsedUnlessActive(miscellaneous, path),
      ]),
    ]
  }

  if (routeMatches(path, '/codex')) {
    return [
      withActiveOpen(codex, path, true),
      seeMore([
        collapsedUnlessActive(guide, path),
        collapsedUnlessActive(miscellaneous, path),
      ]),
    ]
  }

  if (routeMatches(path, '/miscellaneous')) {
    return [
      withActiveOpen(miscellaneous, path, true),
      seeMore([
        collapsedUnlessActive(guide, path),
        collapsedUnlessActive(codex, path),
      ]),
    ]
  }

  return [
    seeMore([
      collapsedUnlessActive(guide, path),
      collapsedUnlessActive(codex, path),
      collapsedUnlessActive(miscellaneous, path),
    ]),
  ]
}
