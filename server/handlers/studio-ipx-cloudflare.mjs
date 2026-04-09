import { readFile } from 'node:fs/promises'
import { extname, resolve } from 'node:path'
import { createError, eventHandler, getRequestProtocol, getRequestURL, setResponseHeader, useSession } from 'h3'
import { hasProtocol, parseURL } from 'ufo'
import { useRuntimeConfig } from '#imports'

const IPX_PREFIX = '/__nuxt_studio/ipx'
const DAY_IN_SECONDS = 60 * 60 * 24

function getContentTypeFromPath(path) {
  const extension = extname(path).toLowerCase()

  if (extension === '.ico') return 'image/x-icon'
  if (extension === '.svg') return 'image/svg+xml'
  if (extension === '.png') return 'image/png'
  if (extension === '.jpg' || extension === '.jpeg') return 'image/jpeg'
  if (extension === '.webp') return 'image/webp'
  if (extension === '.gif') return 'image/gif'
  if (extension === '.avif') return 'image/avif'

  return null
}

function parseIpxPath(pathname) {
  const relativePath = pathname.slice(IPX_PREFIX.length).replace(/^\/+/, '')

  if (!relativePath) {
    return null
  }

  const [modifiersString, ...idSegments] = relativePath.split('/')

  if (!modifiersString) {
    throw createError({
      statusCode: 400,
      statusMessage: 'IPX_MISSING_MODIFIERS',
      message: 'IPX modifiers are required.',
    })
  }

  const id = decodeURIComponent(idSegments.join('/')).replace(/^(https?:\/)([^/])/, '$1/$2')

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'IPX_MISSING_ID',
      message: 'IPX resource id is required.',
    })
  }

  return { id }
}

function requireAllowedDomain(id, publicUrl, external) {
  if (!external) {
    return
  }

  const configuredDomain = parseURL(publicUrl).host
  const requestDomain = parseURL(id).host

  if (configuredDomain && requestDomain !== configuredDomain) {
    throw createError({ statusCode: 403, statusMessage: 'IPX_FORBIDDEN_DOMAIN' })
  }
}

async function getOriginalExternalImage(id) {
  const response = await fetch(id).catch(() => null)

  if (!response?.ok) {
    return null
  }

  return {
    data: Buffer.from(await response.arrayBuffer()),
    contentType: response.headers.get('content-type'),
  }
}

async function getOriginalFsImage(id, publicDir) {
  if (hasProtocol(id)) {
    return null
  }

  const normalizedId = id.replace(/^\/+/, '')

  if (!normalizedId) {
    return null
  }

  const absolutePath = resolve(publicDir, normalizedId)
  const normalizedPublicDir = publicDir.replace(/[\\\/]+$/, '')

  if (!absolutePath.startsWith(`${normalizedPublicDir}/`) && !absolutePath.startsWith(`${normalizedPublicDir}\\`) && absolutePath !== normalizedPublicDir) {
    return null
  }

  const data = await readFile(absolutePath).catch(() => null)

  if (!data) {
    return null
  }

  return {
    data,
    contentType: getContentTypeFromPath(normalizedId),
  }
}

async function requireStudioAuth(event) {
  if (import.meta.dev) {
    return
  }

  const config = useRuntimeConfig(event)
  const session = await useSession(event, {
    name: 'studio-session',
    password: config.studio?.auth?.sessionSecret,
    cookie: {
      secure: getRequestProtocol(event) === 'https',
      path: '/',
    },
  })

  if (!session?.data?.user) {
    throw createError({ statusCode: 404, message: 'Not found' })
  }
}

export default eventHandler(async (event) => {
  await requireStudioAuth(event)

  const url = getRequestURL(event)

  if (!url.pathname.startsWith(`${IPX_PREFIX}/`)) {
    return
  }

  const parsed = parseIpxPath(url.pathname)

  if (!parsed) {
    return
  }

  const mediaConfig = useRuntimeConfig(event).public.studio.media

  requireAllowedDomain(parsed.id, mediaConfig.publicUrl, mediaConfig.external)

  const image = mediaConfig.external
    ? await getOriginalExternalImage(parsed.id)
    : await getOriginalFsImage(parsed.id, mediaConfig.publicUrl)

  if (!image) {
    throw createError({ statusCode: 404, statusMessage: 'Image not found' })
  }

  if (image.contentType) {
    setResponseHeader(event, 'content-type', image.contentType)
  }

  setResponseHeader(event, 'cache-control', `public, max-age=${DAY_IN_SECONDS}, s-maxage=${DAY_IN_SECONDS}`)

  return image.data
})
