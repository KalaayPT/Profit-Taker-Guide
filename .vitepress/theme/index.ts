// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import { enhanceAppWithTabs } from 'vitepress-plugin-tabs/client'
//import VPNavBarSearchButton from './components/VPNavBarSearchButton.vue';
import {  NolebaseHighlightTargetedHeading,  } from '@nolebase/vitepress-plugin-highlight-targeted-heading/client'
import { NolebaseInlineLinkPreviewPlugin, } from '@nolebase/vitepress-plugin-inline-link-preview/client'
import '@nolebase/vitepress-plugin-inline-link-preview/client/style.css'
import { InjectionKey } from '@nolebase/vitepress-plugin-inline-link-preview/client'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      'layout-top': () => [ 
        h(NolebaseHighlightTargetedHeading), 
      ],
    })
  },
  enhanceApp({ app, router, siteData }) {
    enhanceAppWithTabs(app)
    //app.use(NolebaseInlineLinkPreviewPlugin) 
    //app.provide(InjectionKey, { 
    //
    //    }) 
    //app.component('VPNavBarSearchButton', VPNavBarSearchButton);
    // ...
  }
} satisfies Theme
