import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'page-top': () => h('DataFriendlyToggle')
    })
  },
  enhanceApp({ app, router, siteData }) {
    app.component('DataFriendlyToggle', {
      template: '<button @click="toggleDataFriendly">Toggle Data Friendly Mode</button>',
      methods: {
        toggleDataFriendly() {
          const isDataFriendly = localStorage.getItem('dataFriendly') === 'true';
          localStorage.setItem('dataFriendly', !isDataFriendly);
          this.updateMediaPlaceholders();
        },
        updateMediaPlaceholders() {
          const isDataFriendly = localStorage.getItem('dataFriendly') === 'true';
          const placeholders = document.querySelectorAll('.media-placeholder');
          placeholders.forEach((placeholder) => {
            if (isDataFriendly) {
              placeholder.src = '/media/placeholder.jpg';
              placeholder.addEventListener('click', this.loadRealImage);
            } else {
              placeholder.src = placeholder.dataset.src;
              placeholder.removeEventListener('click', this.loadRealImage);
            }
          });
        },
        loadRealImage(event) {
          const placeholder = event.target;
          placeholder.src = placeholder.dataset.src;
          placeholder.removeEventListener('click', this.loadRealImage);
        }
      },
      mounted() {
        this.updateMediaPlaceholders();
      }
    });
  },
  appearance: 'force-dark'
} as Theme