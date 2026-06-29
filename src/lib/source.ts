import type { Locale } from 'next-intl'

import { docs } from 'collections/server'
import { loader } from 'fumadocs-core/source'
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons'

import { i18n } from '@/i18n/config'
import { getLocalizedPath } from '@/utils/get-localized-path'

import { docsContentRoute, docsImageRoute, docsRoute } from './shared'

export const source = loader({
  baseUrl: docsRoute,
  i18n,
  source: docs.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
})

export function getPageImage(page: (typeof source)['$inferPage']) {
  const segments = [...page.slugs, 'image.png']

  return {
    segments,
    url: `${docsImageRoute}/${segments.join('/')}`,
  }
}

export function getPageUrl(page: (typeof source)['$inferPage']) {
  const segments = page.slugs

  return {
    segments,
    url: `${docsRoute}/${segments.join('/')}`,
  }
}

export function getPageMarkdownUrl(page: (typeof source)['$inferPage']) {
  const locale = page.locale ?? i18n.defaultLanguage
  const segments = [...page.slugs, 'content.md']

  return {
    segments,
    url: getLocalizedPath(`${docsContentRoute}/${segments.join('/')}`, locale as Locale),
  }
}

export async function getLLMText(page: (typeof source)['$inferPage']) {
  const processed = await page.data.getText('processed')

  return `# ${page.data.title} (${page.url})

${processed}`
}
