import { createError, eventHandler, getHeader, getRouterParam } from 'h3'
import { blob } from 'hub:blob'

const LEGACY_MEDIA_ORIGIN = 'https://cdn.profit-taker.com/u'

async function proxyLegacy(path: string, range?: string) {
  const response = await fetch(`${LEGACY_MEDIA_ORIGIN}/${path}`, {
    headers: range ? { range } : undefined,
  })

  if (!response.ok || !response.body) {
    throw createError({
      statusCode: response.status || 404,
      statusMessage: 'Media not found',
    })
  }

  const headers = new Headers(response.headers)
  if (!headers.has('accept-ranges')) {
    headers.set('accept-ranges', 'bytes')
  }

  return new Response(response.body, {
    status: response.status,
    headers,
  })
}

export default eventHandler(async (event) => {
  const path = getRouterParam(event, 'path')

  if (!path) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Media not found',
    })
  }

  const key = `u/${path}`
  const range = getHeader(event, 'range') || undefined
  const bucket = globalThis.BLOB || globalThis.__env__?.BLOB

  if (bucket) {
    const object = await bucket.get(
      key,
      range ? { range: new Headers({ range }) } : undefined,
    )

    if (object) {
      const headers = new Headers()
      object.writeHttpMetadata(headers)
      headers.set('etag', object.httpEtag)
      headers.set('accept-ranges', 'bytes')

      if (object.range) {
        const start = object.range.offset || 0
        const length = object.range.length || object.size
        const end = start + length - 1

        headers.set('content-length', String(length))
        headers.set('content-range', `bytes ${start}-${end}/${object.size}`)

        return new Response(object.body, {
          status: 206,
          headers,
        })
      }

      headers.set('content-length', String(object.size))

      return new Response(object.body, {
        headers,
      })
    }
  }

  try {
    return await blob.serve(event, `/${key}`)
  }
  catch {
    return proxyLegacy(path, range)
  }
})
