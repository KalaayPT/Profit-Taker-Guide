import { resolve } from 'node:path'

const buildArgs = process.argv.join(' ')
const isCloudflarePagesBuild =
  buildArgs.includes('cloudflare_pages')
  || buildArgs.includes('cloudflare-pages')
  || process.env.CF_PAGES === '1'

export default defineNuxtConfig({
  extends: ["docus"],
  mcp: {
    enabled: false,
  },
  modules: [
    [
      "nuxt-component-meta",
      {
        globalsOnly: true,
        include: [],
      },
    ],
    "nuxt-studio",
  ],
  studio: {
    route: "/_studio",
    repository: {
      provider: "github",
      owner: "KalaayPT",
      repo: "Profit-Taker-Guide",
      branch: "development",
    },
  },
  css: ["~/assets/css/main.css"],
  ogImage: {
    enabled: !isCloudflarePagesBuild,
  },
  hooks: {
    'nitro:config'(nitroConfig) {
      if (!isCloudflarePagesBuild) {
        return
      }

      nitroConfig.handlers = (nitroConfig.handlers || []).filter(
        handler => handler.route !== '/__nuxt_studio/ipx/**',
      )

      nitroConfig.handlers.push({
        route: '/__nuxt_studio/ipx/**',
        handler: resolve(process.cwd(), 'server/handlers/studio-ipx-cloudflare.mjs').replace(/\\/g, '/'),
      })
    },
  },
  vite: {
    optimizeDeps: {
      include: ["@vue/devtools-core", "@vue/devtools-kit"],
    },
  },
});
