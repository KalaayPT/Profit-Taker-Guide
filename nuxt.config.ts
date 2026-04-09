import { resolve } from 'node:path'

const buildArgs = process.argv.join(' ')
const isCloudflarePagesBuild =
  buildArgs.includes('cloudflare_pages')
  || buildArgs.includes('cloudflare-pages')
  || process.env.CF_PAGES === '1'
const studioMediaPrefix = 'u'
const cloudflareBlobBucketName =
  process.env.NUXT_HUB_BLOB_BUCKET_NAME || 'profit-taker-guide-media'

export default defineNuxtConfig({
  extends: ["docus"],
  content: {
    build: {
      markdown: {
        toc: {
          depth: 4,
          searchDepth: 4,
        },
      },
    },
  },
  mcp: {
    enabled: false,
  },
  modules: [
    "@nuxthub/core",
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
    media: {
      external: true,
      publicUrl: "/",
      prefix: studioMediaPrefix,
      // Keep this conservative for Studio's current base64 upload path.
      maxFileSize: 25 * 1024 * 1024,
      allowedTypes: ["image/*", "video/*", "audio/*"],
    },
  },
  hub: {
    blob: isCloudflarePagesBuild
      ? {
          driver: "cloudflare-r2",
          binding: "BLOB",
          bucketName: cloudflareBlobBucketName,
        }
      : true,
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
