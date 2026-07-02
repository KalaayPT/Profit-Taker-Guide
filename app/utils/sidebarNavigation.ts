import type { ContentNavigationItem } from "@nuxt/content";

type SidebarNavigationItem = ContentNavigationItem & {
  defaultOpen?: boolean;
  target?: string;
  children?: SidebarNavigationItem[];
};

type OrderedPageItem = Pick<ContentNavigationItem, "title" | "path">;

function normalizePath(path: string) {
  return path.replace(/\/$/, "") || "/";
}

function routeMatches(path: string, prefix: string) {
  const normalizedPath = normalizePath(path);
  const normalizedPrefix = normalizePath(prefix);

  return (
    normalizedPath === normalizedPrefix ||
    normalizedPath.startsWith(`${normalizedPrefix}/`)
  );
}

function isInTree(item: SidebarNavigationItem, path: string): boolean {
  if (item.path && normalizePath(item.path) === normalizePath(path)) {
    return true;
  }

  return item.children?.some((child) => isInTree(child, path)) ?? false;
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
  };
}

function guideChildren(path: string): SidebarNavigationItem[] {
  const advancedTopics = [
    { title: "Timing the Fight", path: "/guide/timing-the-fight" },
    { title: "Landing", path: "/guide/landing" },
    { title: "Positioning", path: "/guide/positioning" },
    { title: "Pogris", path: "/guide/pogris" },
    { title: "Speedrun Strats", path: "/guide/speedrun-strats" },
  ];

  return [
    { title: "Welcome", path: "/guide/welcome" },
    { title: "Getting Started", path: "/guide/getting-started" },
    { title: "Basic Principles", path: "/guide/basic-principles" },
    { title: "Beginner Traps", path: "/guide/beginner-traps" },
    {
      title: "Builds",
      defaultOpen: true,
      children: [
        { title: "Chroma", path: "/guide/chroma-builds" },
        { title: "Volt", path: "/guide/eclipse-builds" },
        { title: "Squad Setup", path: "/guide/squad-builds" },
      ],
    },
    { title: "Riven Guide", path: "/guide/riven-guide" },
    {
      title: "Advanced Topics",
      defaultOpen: advancedTopics.some(
        (item) => item.path === normalizePath(path),
      ),
      children: advancedTopics,
    },
  ];
}

function guidePageOrder(): OrderedPageItem[] {
  return [
    { title: "Welcome", path: "/guide/welcome" },
    { title: "Getting Started", path: "/guide/getting-started" },
    { title: "Basic Principles", path: "/guide/basic-principles" },
    { title: "Beginner Traps", path: "/guide/beginner-traps" },
    { title: "Chroma Builds", path: "/guide/chroma-builds" },
    { title: "Eclipse Builds", path: "/guide/eclipse-builds" },
    { title: "Squad Builds", path: "/guide/squad-builds" },
    { title: "Riven Guide", path: "/guide/riven-guide" },
    { title: "Timing the Fight", path: "/guide/timing-the-fight" },
    { title: "Landing", path: "/guide/landing" },
    { title: "Positioning", path: "/guide/positioning" },
    { title: "Pogris", path: "/guide/pogris" },
    { title: "Speedrun Strats", path: "/guide/speedrun-strats" },
  ];
}

function codexChildren(): SidebarNavigationItem[] {
  return [
    { title: "Overview", path: "/codex" },
    { title: "Contagion Zaws", path: "/codex/contagion-zaws" },
    { title: "Misc Trivia", path: "/codex/misc-trivia" },
  ];
}

function codexPageOrder(): OrderedPageItem[] {
  return [
    { title: "Overview", path: "/codex" },
    { title: "Contagion Zaws", path: "/codex/contagion-zaws" },
    { title: "Misc Trivia", path: "/codex/misc-trivia" },
  ];
}

function archiveChildren(): SidebarNavigationItem[] {
  return [
    { title: "Overview", path: "/miscellaneous/archive" },
    {
      title: "Creating Builds",
      path: "/miscellaneous/archive/creating-builds",
    },
    {
      title: "Untapped Potential",
      path: "/miscellaneous/archive/untapped-potential",
    },
  ];
}

function archivePageOrder(): OrderedPageItem[] {
  return [
    { title: "Archive", path: "/miscellaneous/archive" },
    {
      title: "Creating Builds",
      path: "/miscellaneous/archive/creating-builds",
    },
    {
      title: "Untapped Potential",
      path: "/miscellaneous/archive/untapped-potential",
    },
  ];
}

function miscellaneousChildren(): SidebarNavigationItem[] {
  return [
    { title: "Known Bugs", path: "/miscellaneous/bugs" },
    {
      title: "Resources Used",
      path: "/miscellaneous/resources-used-honorable-mentions",
    },
    { title: "Privacy Policy", path: "/miscellaneous/privacy-policy" },
    {
      title: "Calculator",
      path: "https://calc.profit-taker.com",
      target: "_blank",
    },
    {
      title: "Analyzer",
      path: "https://pta.profit-taker.com",
      target: "_blank",
    },
  ];
}

function miscellaneousPageOrder(): OrderedPageItem[] {
  return [
    { title: "Known Bugs", path: "/miscellaneous/bugs" },
    {
      title: "Resources Used",
      path: "/miscellaneous/resources-used-honorable-mentions",
    },
    { title: "Privacy Policy", path: "/miscellaneous/privacy-policy" },
  ];
}

function withActiveOpen(
  item: SidebarNavigationItem,
  path: string,
  fallbackOpen = false,
): SidebarNavigationItem {
  return {
    ...item,
    defaultOpen: fallbackOpen || isInTree(item, path),
  };
}

function collapsedUnlessActive(
  item: SidebarNavigationItem,
  path: string,
): SidebarNavigationItem {
  return withActiveOpen(
    {
      ...item,
      defaultOpen: false,
    },
    path,
  );
}

function seeMore(items: SidebarNavigationItem[]): SidebarNavigationItem {
  return {
    title: "See also",
    defaultOpen: true,
    children: items,
  };
}

export function getSidebarNavigation(path: string): SidebarNavigationItem[] {
  const guide = section("Guide", guideChildren(path), "/guide/welcome");
  const codex = section("Codex", codexChildren(), "/codex");
  const miscellaneous = section(
    "Miscellaneous",
    miscellaneousChildren(),
    "/miscellaneous/bugs",
  );

  if (routeMatches(path, "/guide")) {
    return [
      withActiveOpen(guide, path, true),
      seeMore([
        collapsedUnlessActive(codex, path),
        collapsedUnlessActive(miscellaneous, path),
      ]),
    ];
  }

  if (routeMatches(path, "/codex")) {
    return [
      withActiveOpen(codex, path, true),
      seeMore([
        collapsedUnlessActive(guide, path),
        collapsedUnlessActive(miscellaneous, path),
      ]),
    ];
  }

  if (routeMatches(path, "/miscellaneous/archive")) {
    const archive = section(
      "Archive",
      archiveChildren(),
      "/miscellaneous/archive",
    );

    return [
      withActiveOpen(archive, path, true),
      seeMore([
        collapsedUnlessActive(guide, path),
        collapsedUnlessActive(codex, path),
        collapsedUnlessActive(miscellaneous, path),
      ]),
    ];
  }

  if (routeMatches(path, "/miscellaneous")) {
    return [
      withActiveOpen(miscellaneous, path, true),
      seeMore([
        collapsedUnlessActive(guide, path),
        collapsedUnlessActive(codex, path),
      ]),
    ];
  }

  return [
    seeMore([
      collapsedUnlessActive(guide, path),
      collapsedUnlessActive(codex, path),
      collapsedUnlessActive(miscellaneous, path),
    ]),
  ];
}

export function getOrderedPageNavigation(): OrderedPageItem[] {
  return [
    ...guidePageOrder(),
    ...codexPageOrder(),
    ...miscellaneousPageOrder(),
    ...archivePageOrder(),
  ];
}

export function getCustomPageSurround(
  path: string,
): [OrderedPageItem | undefined, OrderedPageItem | undefined] | undefined {
  const orderedPages = getOrderedPageNavigation();
  const currentIndex = orderedPages.findIndex(
    (item) => normalizePath(item.path) === normalizePath(path),
  );

  if (currentIndex === -1) {
    return undefined;
  }

  return [orderedPages[currentIndex - 1], orderedPages[currentIndex + 1]];
}
