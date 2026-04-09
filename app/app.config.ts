export default defineAppConfig({
  github: {
    url: "https://github.com/KalaayPT/Profit-Taker-Guide",
    branch: "development",
  },
  ui: {
    colors: {
      primary: "cyan",
      neutral: "zinc",
    },
    header: {
      slots: {
        container:
          "relative lg:grid lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:justify-normal",
        left: "lg:flex-none",
        center: "hidden lg:flex flex-1 min-w-0",
        right: "lg:flex-none",
      },
    },
    main: {
      base: "min-h-[calc(100vh-var(--ui-header-height))]",
    },
    contentNavigation: {
      slots: {
        linkTrailing: "ms-auto inline-flex gap-1.5 items-center",
        linkTrailingIcon:
          "size-4 shrink-0 transform transition-transform duration-200 group-data-[state=open]:rotate-90",
      },
    },
    prose: {
      a: {
        base:
          "underline decoration-primary/50 underline-offset-4 hover:decoration-primary border-b-0",
      },
    },
    pageHero: {
      slots: {
        root: "overflow-hidden",
      },
    },
  },
  header: {
    title: "Profit-Taker Guide",
    logo: {
      light: "https://cdn.profit-taker.com/u/buried-debts-sigil.png.webp",
      dark: "https://cdn.profit-taker.com/u/buried-debts-sigil.png.webp",
      alt: "Profit-Taker Guide",
      class: "rounded-sm",
      favicon: "/favicon.ico",
    },
  },
});
