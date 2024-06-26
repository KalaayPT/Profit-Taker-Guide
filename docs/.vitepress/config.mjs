import { defineConfig } from '@lando/vitepress-theme-default-plus/config';

export default defineConfig({
  title: "Profit-Taker Guide",
  description: 'New, improved and no longer a Google Doc!',
  head: [['link', { rel: 'icon', href: 'https://cdn.profit-taker.com/favicon.ico' }]],
  themeConfig: {
    search: {
      provider: 'local'
    },
    appearance: 'dark',
    nav: [
      { text: 'Beginner', link: '/beginner/welcome' },
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
          text: 'Beginner',
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
    contributors: {
      merge: 'name',
      debotify: true,
      exclude: [
        'KalaayPT <ha.me445@gmail.com>',
        'KalaayPT <github.erratic421@passinbox.com>',
      ],
      include: [
        {
          avatar: 'https://avatars.githubusercontent.com/u/146133939',
          name: 'KalaayPT',
          email: 'contact@kalaay.dev',
          title: 'Maintainer',
          links: [
            { icon: 'github', link: 'https://github.com/KalaayPT/' },
          ],
          maintainer: true,
          mergeOnly: true,
          mergeWith: 'contact@kalaay.dev'
        },
      ],
    },
    editLink: { pattern: 'https://github.com/KalaayPT/Profit-Taker-Guide/edit/master/docs/:path' },
  }
});
