import type { MetadataRoute } from 'next'

import { source } from '@/lib/source'
import { getBaseUrl } from '@/utils/get-base-url'

export const revalidate = false

function getUrl(path: string): string {
  return new URL(path, getBaseUrl()).toString()
}

export default function sitemap(): MetadataRoute.Sitemap {
  const items: MetadataRoute.Sitemap = source.getPages().map((page) => {
    return {
      url: getUrl(page.url),
      lastModified: page.data.lastModified ?? new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    }
  })

  return [
    {
      url: getUrl('/'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: getUrl('/docs'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...items,
  ]
}
