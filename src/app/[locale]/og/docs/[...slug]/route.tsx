import { notFound } from 'next/navigation'
import { ImageResponse } from 'next/og'
import { hasLocale } from 'next-intl'

import { OGImage } from '@/components/og-image'
import { routing } from '@/i18n/routing'
import { getPageImage, source } from '@/lib/source'

export const revalidate = false

export function generateStaticParams() {
  return source.getPages().map((page) => ({
    locale: page.locale,
    slug: getPageImage(page).segments,
  }))
}

export async function GET(_request: Request, { params }: RouteContext<'/[locale]/og/docs/[...slug]'>) {
  const { locale, slug } = await params

  if (!hasLocale(routing.locales, locale)) notFound()

  const page = source.getPage(slug.slice(0, -1), locale)
  if (!page) notFound()

  return new ImageResponse(<OGImage title={page.data.title} description={page.data.description} />, {
    width: 1200,
    height: 630,
  })
}
