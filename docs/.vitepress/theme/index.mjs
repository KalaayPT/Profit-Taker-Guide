import theme from '@lando/vitepress-theme-default-plus';
import { enhanceAppWithTabs } from 'vitepress-plugin-tabs/client'

export default {
  ...theme,
  enhanceApp({ app }) {
    enhanceAppWithTabs(app)
  }
};