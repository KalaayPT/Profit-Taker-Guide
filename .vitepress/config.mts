import { defineConfig } from 'vitepress'
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  markdown: {
    config(md) {
      md.use(tabsMarkdownPlugin)
    }
  },
  title: "Profit-Taker Guide",
  description: 'Revised!',
  head: [['link', { rel: 'icon', href: 'https://cdn.profit-taker.com/favicon.ico' }]],
  cleanUrls: true,
  themeConfig: {
    logo: 'https://cdn.profit-taker.com/buried-debts-sigil.png.webp',
    search: {
      provider: 'local',
      options: { detailedView: true },
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
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
              text: 'Basic Builds',
              collapsed: false,
              items: [
                { text: 'Vex Armor Builds', link: '/beginner/vex-armor-builds' },
                { text: 'Eclipse Builds', link: '/beginner/eclipse-builds' },
                { text: 'Other Builds', link: '/beginner/other-builds' },
              ]
            },
            { text: 'Creating Builds', link: '/beginner/creating-builds' },
            { text: 'Advanced Principles', link: '/beginner/advanced-principles' },
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
      { icon: 'github', link: 'https://github.com/KalaayPT/Profit-Taker-Guide' }
    ],
    outline: [2, 6],
    editLink: { 
      pattern: 'https://github.com/KalaayPT/Profit-Taker-Guide/edit/master/docs/:path', 
      text: 'Suggest changes to this page'
    },
    lastUpdated: {
      text: 'Updated at',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    },
    externalLinkIcon : true,
  }
})
