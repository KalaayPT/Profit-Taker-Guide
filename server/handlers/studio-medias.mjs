import { createError, eventHandler, getRequestProtocol, readBody, useSession } from 'h3'
import { joinURL, withLeadingSlash } from 'ufo'
import { useRuntimeConfig } from '#imports'
import { blob } from 'hub:blob'

const MEDIA_ROUTE_PREFIX = '/__nuxt_studio/medias'
const VIRTUAL_MEDIA_COLLECTION_NAME = 'public-assets'

function stripMediaRoutePrefix(path) {
  if (path === MEDIA_ROUTE_PREFIX) {
    return ''
  }

  if (path.startsWith(`${MEDIA_ROUTE_PREFIX}/`)) {
    return path.slice(MEDIA_ROUTE_PREFIX.length + 1)
  }

  return path.replace(`${MEDIA_ROUTE_PREFIX}/`, '')
}

function normalizeMediaKey(relativePath) {
  return relativePath
    .replace(/\//g, ':')
    .replace(new RegExp(`^${VIRTUAL_MEDIA_COLLECTION_NAME}:?`), '')
}

function isCollectionLookup(relativePath, key) {
  return (
    relativePath === ''
    || relativePath === VIRTUAL_MEDIA_COLLECTION_NAME
    || relativePath.endsWith('/')
    || relativePath.endsWith(':')
    || key === ''
  )
}

function normalizeListedPath(pathname, prefix) {
  const stripped = prefix ? pathname.slice(`${prefix}/`.length) : pathname
  const normalized = stripped.replace(/^\/+/, '').trim()

  if (!normalized || normalized === '.' || normalized === '..') {
    return null
  }

  if (normalized.endsWith('/')) {
    return null
  }

  return normalized
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

  const { prefix, publicUrl, maxFileSize, allowedTypes } = useRuntimeConfig(event).public.studio.media
  const relativePath = stripMediaRoutePrefix(event.path)
  const key = normalizeMediaKey(relativePath)

  if (event.method === 'GET') {
    if (isCollectionLookup(relativePath, key)) {
      const subPath = key.replace(/:$/g, '').replace(/:/g, '/')
      const effectivePrefix = prefix
        ? (subPath ? `${prefix}/${subPath}` : prefix)
        : subPath
      const { blobs } = await blob.list(effectivePrefix ? { prefix: `${effectivePrefix}/` } : {})

      return [...new Set(blobs.map((item) => normalizeListedPath(item.pathname, prefix)).filter(Boolean))]
    }

    const blobPath = key.replace(/:/g, '/')
    const pathname = prefix ? `${prefix}/${blobPath}` : blobPath
    const meta = await blob.head(pathname)

    if (!meta) {
      throw createError({ statusCode: 404, message: 'Item not found' })
    }

    const fsPath = withLeadingSlash(blobPath)
    const resolvedPath = meta.url ?? joinURL(publicUrl, prefix, fsPath)

    return {
      id: relativePath,
      fsPath,
      extension: fsPath.split('.').pop(),
      stem: fsPath.split('.').slice(0, -1).join('.'),
      path: resolvedPath,
    }
  }

  if (event.method === 'PUT') {
    const body = await readBody(event)
    const blobPath = key.replace(/:/g, '/')
    const pathname = prefix ? `${prefix}/${blobPath}` : blobPath

    if (!body.raw) {
      await blob.put(pathname, JSON.stringify(body), { contentType: 'application/json' })
      return 'OK'
    }

    const raw = body.raw
    const [meta, data] = raw.split(';base64,')
    const mimeType = meta.replace('data:', '')
    const approximateSize = data.length * 3 / 4

    if (approximateSize > maxFileSize) {
      throw createError({ statusCode: 413, message: `File size exceeds maximum of ${maxFileSize / 1024 / 1024}MB` })
    }

    if (!allowedTypes.some((type) => mimeType.startsWith(type.replace('*', '')))) {
      throw createError({ statusCode: 415, message: `File type "${mimeType}" is not allowed` })
    }

    const binaryString = atob(data)
    const bytes = new Uint8Array(binaryString.length)

    for (let index = 0; index < binaryString.length; index++) {
      bytes[index] = binaryString.charCodeAt(index)
    }

    await blob.put(pathname, bytes, { contentType: mimeType })
    return 'OK'
  }

  if (event.method === 'DELETE') {
    const blobPath = key.replace(/:/g, '/')
    const pathname = prefix ? `${prefix}/${blobPath}` : blobPath
    await blob.del(pathname)
    return 'OK'
  }

  throw createError({ statusCode: 405, message: 'Method not allowed' })
})
