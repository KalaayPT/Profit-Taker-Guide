import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import VideoPlayer from './VideoPlayer.vue'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'page-top': () => h('DataFriendlyToggle')
    })
  },
  enhanceApp({ app, router, siteData }) {

  },
  appearance: 'force-dark'
} as Theme