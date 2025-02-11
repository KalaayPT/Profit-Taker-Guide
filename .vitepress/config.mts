import { defineConfig } from 'vitepress'
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs'
//import { InlineLinkPreviewElementTransform } from '@nolebase/vitepress-plugin-inline-link-preview/markdown-it'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  vite: { 
      optimizeDeps: { 
            exclude: [ 
              '@nolebase/vitepress-plugin-inline-link-preview/client', 
            ], 
          }, 
      ssr: { 
        noExternal: [ 
          // If there are other packages that need to be processed by Vite, you can add them here.
          '@nolebase/vitepress-plugin-highlight-targeted-heading', 
          //'@nolebase/vitepress-plugin-inline-link-preview', 
          '@nolebase/ui',
        ], 
      }, 
    }, 
  markdown: {
    config(md) {
      md.use(tabsMarkdownPlugin)
      //md.use(InlineLinkPreviewElementTransform) 
    }
  },
  title: "Profit-Taker Guide",
  description: 'Sparky! Right. We\'re all here. Let\'s get started.',
  head: [['link', { rel: 'icon', href: 'https://cdn.profit-taker.com/u/favicon.ico' }]],
  cleanUrls: true,
  sitemap: {
    hostname: 'https://profit-taker.com/'
    },
  appearance: 'dark',
  themeConfig: {
    logo: 'https://cdn.profit-taker.com/u/buried-debts-sigil.png.webp',
    search: {
      provider: 'local',
      options: { detailedView: true },
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Quick Start Guide', link: '/tldr' },
      { text: 'Basics', link: '/beginner/welcome' },
      { text: 'Advanced', link: '/advanced/welcome' },
      {
        text: 'Misc',
        items: [
          { text: 'Bugs', link: '/miscellaneous/bugs' },
          { text: 'Resources used', link: '/miscellaneous/resources-used-honorable-mentions.md' },
          { text: 'Privacy Policy', link: '/miscellaneous/privacy-policy.md' },
          { text: 'Calculator', link: 'https://calc.profit-taker.com' },
          { text: 'Analyzer', link: 'https://basi.is-a.dev/pta/' },
        ]
      }
    ],

    sidebar: {
      '/beginner/': [
        {
          text: 'Basics',
          items: [
            { text: 'Welcome', link: '/beginner/welcome' },
            { text: 'Getting Started', link: '/beginner/getting-started' },
            { text: 'Basic Principles', link: '/beginner/basic-principles' },

            {
              text: 'Basic Builds', link: '/beginner/vex-armor-builds' ,
              collapsed: false,
              items: [
                { text: 'Vex Armor Builds', link: '/beginner/vex-armor-builds' },
                { text: 'Eclipse Builds', link: '/beginner/eclipse-builds' },
                { text: 'Other Builds', link: '/beginner/other-builds' },
              ]
            },
            {
              text: 'Creating Builds', link: '/beginner/creating-builds',
              //collapsed: true,
              //items: [
              //  { text: 'Frame Build Factors', link: '/beginner/frame-builds' },
              //  {
              //    text: 'Weapon Build Factors', link: '/beginner/shields',
              //    collapsed: false,
              //    items: [
              //      { text: 'Shields', link: '/beginner/shields' },
              //      { text: 'Armor', link: '/beginner/armor' },
              //      { text: 'Pylons', link: '/beginner/pylons' },
              //    ]
              //  },
              //]
            },
            {
              text: 'Advanced Principles', link: '/beginner/timing-the-fight',
              collapsed: true,
              items: [
                { text: 'Timing the fight', link: '/beginner/timing-the-fight' },
                { text: 'Landing', link: '/beginner/landing' },
                { text: 'Positioning', link: '/beginner/positioning' },
                { text: 'Exodia Contagion Zaws', link: '/beginner/contagion-zaws' },
                { text: 'Pogris', link: '/beginner/pogris' },
                { text: 'Misc. Trivia', link: '/beginner/misc-trivia' },
              ]
            },
          ],
        },
        {
          text: 'See also',
          items: [
            { text: 'Advanced', link: '/advanced/welcome' },
            {
              text: 'Miscellaneous',
              collapsed: true,
              items: [
                { text: 'Bugs', link: '/miscellaneous/bugs' },
                { text: 'Resources used', link: '/miscellaneous/resources-used-honorable-mentions.md' },
                { text: 'Privacy Policy', link: '/miscellaneous/privacy-policy.md' },
                { text: 'Calculator', link: 'https://calc.profit-taker.com' },
                { text: 'Analyzer', link: 'https://basi.is-a.dev/pta/' },
              ]
            },
          ]
        }
      ],
      '/advanced/': [
        {
          text: 'Advanced',
          items: [
            { text: 'Welcome', link: '/advanced/welcome' },
            {
              text: 'Speedruns',
              collapsed: false,
              items: [
                { text: 'Strats', link: '/advanced/speedrun-strats' },
                { text: 'Solo Builds', link: '/advanced/solo-speedrun-builds' },
                { text: 'Squad Builds', link: '/advanced/squad-speedruns' },
              ]
            },
            { text: 'Riven Guide', link: '/advanced/riven-guide' },
            { text: 'Untapped Potential', link: '/advanced/untapped-potential' },
          ]
        },
        {
          text: 'See also',
          items: [
            { text: 'Beginner', link: '/beginner/welcome' },
            {
              text: 'Miscellaneous',
              collapsed: true,
              items: [
                { text: 'Bugs', link: '/miscellaneous/bugs' },
                { text: 'Resources used', link: '/miscellaneous/resources-used-honorable-mentions.md' },
                { text: 'Privacy Policy', link: '/miscellaneous/privacy-policy.md' },
                { text: 'Calculator', link: 'https://calc.profit-taker.com' },
                { text: 'Analyzer', link: 'https://basi.is-a.dev/pta/' },
              ]
            },
          ]
        }
      ],
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present Kalaay, ZeyroX, Reuzehagel',
    },
    socialLinks: [
      { icon: 'discord', link: 'https://discord.profit-taker.com' },
      { icon: 'github', link: 'https://github.com/KalaayPT/Profit-Taker-Guide' },
      {
        icon: {
          svg: '<svg fill="#000000" width="800px" height="800px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title>Support the website</title><path d="M9.197 0l-1.619 3.735h-2.407v3.359h0.921l0.943 5.975h-1.473l1.948 10.973 1.249-0.015 1.256 7.973h11.891l0.083-0.531 1.172-7.443 1.188 0.015 1.943-10.973h-1.407l0.937-5.975h1.011v-3.359h-2.557l-1.625-3.735zM9.901 1.073h12.057l1.025 2.375h-14.115zM6.235 4.803h19.525v1.228h-19.525zM6.839 14.136h18.183l-1.568 8.823-7.536-0.079-7.511 0.079z"/></svg>'
        },
        link: 'https://ko-fi.com/kalaay',
        ariaLabel: 'Support the website'
      }
    ],
    outline: [2, 6],
    editLink: { 
      pattern: 'https://github.com/KalaayPT/Profit-Taker-Guide/edit/master/:path', 
      text: 'Suggest changes to this page'
    },
    lastUpdated: {
      text: 'Last Updated',
      formatOptions: {
        dateStyle: 'medium',
        timeStyle: 'medium'
      }
    },
    externalLinkIcon : true,
  }
})
