export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.YOUTUBE_API_KEY
  if (!apiKey) {
    return res.status(503).json({ error: 'YouTube metrics are not configured' })
  }

  const ids = String(req.query.ids || '')
    .split(',')
    .map((id) => id.trim())
    .filter((id) => /^[A-Za-z0-9_-]{11}$/.test(id))
    .slice(0, 50)

  if (!ids.length) {
    return res.status(400).json({ error: 'Provide one or more valid YouTube video IDs' })
  }

  try {
    const endpoint = new URL('https://www.googleapis.com/youtube/v3/videos')
    endpoint.searchParams.set('part', 'statistics')
    endpoint.searchParams.set('id', ids.join(','))
    endpoint.searchParams.set('key', apiKey)

    const response = await fetch(endpoint)
    if (!response.ok) {
      return res.status(502).json({ error: 'YouTube metrics request failed' })
    }

    const payload = await response.json()
    const checkedAt = new Date().toISOString()
    const videos = {}

    for (const video of payload.items || []) {
      const count = Number(video.statistics?.viewCount)
      if (Number.isFinite(count)) {
        videos[video.id] = { viewCount: count, viewsUpdatedAt: checkedAt }
      }
    }

    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')
    return res.status(200).json({ videos, checkedAt })
  } catch {
    return res.status(500).json({ error: 'Unable to retrieve YouTube metrics' })
  }
}
