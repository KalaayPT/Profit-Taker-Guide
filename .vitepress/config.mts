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
          svg: '<svg width="241" height="194" viewBox="0 0 241 194" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="mask0_1_219" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="-1" y="0" width="242" height="194"><path d="M240.469 0.958984H-0.00585938V193.918H240.469V0.958984Z" fill="white"/></mask><g mask="url(#mask0_1_219)"><path d="M96.1344 193.911C61.1312 193.911 32.6597 178.256 15.9721 149.829C1.19788 124.912 -0.00585938 97.9229 -0.00585938 67.7662C-0.00585938 49.8876 5.37293 34.3215 15.5413 22.7466C24.8861 12.1157 38.1271 5.22907 52.8317 3.35378C70.2858 1.14271 91.9848 0.958984 114.545 0.958984C151.259 0.958984 161.63 1.4088 176.075 2.85328C195.29 4.76026 211.458 11.932 222.824 23.5955C234.368 35.4428 240.469 51.2624 240.469 69.3627V72.9994C240.469 103.885 219.821 129.733 191.046 136.759C188.898 141.827 186.237 146.871 183.089 151.837L183.006 151.964C172.869 167.632 149.042 193.918 103.401 193.918H96.1281L96.1344 193.911Z" fill="white"/><path d="M174.568 17.9772C160.927 16.6151 151.38 16.1589 114.552 16.1589C90.908 16.1589 70.9008 16.387 54.7644 18.4334C33.3949 21.164 15.2058 37.5285 15.2058 67.7674C15.2058 98.0066 16.796 121.422 29.0741 142.107C42.9425 165.751 66.1302 178.707 96.1412 178.707H103.414C140.242 178.707 160.25 159.156 170.253 143.698C174.574 136.874 177.754 130.058 179.801 123.234C205.947 120.96 225.27 99.3624 225.27 72.9941V69.3577C225.27 40.9432 206.631 21.164 174.574 17.9772H174.568Z" fill="white"/><path d="M15.1975 67.7674C15.1975 37.5285 33.3866 21.164 54.7559 18.4334C70.8987 16.387 90.906 16.1589 114.544 16.1589C151.372 16.1589 160.919 16.6151 174.559 17.9772C206.617 21.1576 225.255 40.937 225.255 69.3577V72.9941C225.255 99.3687 205.932 120.966 179.786 123.234C177.74 130.058 174.559 136.874 170.238 143.698C160.235 159.156 140.228 178.707 103.4 178.707H96.1264C66.1155 178.707 42.9277 165.751 29.0595 142.107C16.7814 121.422 15.1912 98.4563 15.1912 67.7674" fill="#202020"/><path d="M32.2469 67.9899C32.2469 97.3168 34.0654 116.184 43.6127 133.689C54.5225 153.924 74.3018 161.653 96.8117 161.653H103.857C133.411 161.653 147.736 147.329 155.693 134.829C159.558 128.462 162.966 121.417 164.784 112.547L166.147 106.864H174.332C192.521 106.864 208.208 92.09 208.208 73.2166V69.8082C208.208 48.6669 195.024 37.5228 172.058 34.7987C159.102 33.6646 151.372 33.2084 114.538 33.2084C89.7602 33.2084 72.0272 33.4364 58.6152 35.4828C39.7483 38.2134 32.2407 48.8951 32.2407 67.9899" fill="white"/><path d="M166.158 83.6801C166.158 86.4107 168.204 88.4572 171.841 88.4572C183.435 88.4572 189.802 81.8619 189.802 70.9523C189.802 60.0427 183.435 53.2195 171.841 53.2195C168.204 53.2195 166.158 55.2657 166.158 57.9963V83.6866V83.6801Z" fill="#202020"/><path d="M54.5321 82.3198C54.5321 95.732 62.0332 107.326 71.5807 116.424C77.9478 122.562 87.9515 128.93 94.7685 133.022C96.8147 134.157 98.8611 134.841 101.136 134.841C103.866 134.841 106.134 134.157 107.959 133.022C114.782 128.93 124.779 122.562 130.919 116.424C140.694 107.332 148.195 95.7383 148.195 82.3198C148.195 67.7673 137.286 54.8115 121.599 54.8115C112.28 54.8115 105.912 59.5882 101.136 66.1772C96.8147 59.582 90.2259 54.8115 80.9001 54.8115C64.9855 54.8115 54.5256 67.7673 54.5256 82.3198" fill="#FF5A16"/></g></svg>'
        },
        link: 'https://www.ko-fi.com/kalaay',
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
