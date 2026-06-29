import { notFound } from 'next/navigation'
import { ImageResponse } from 'next/og'
import { hasLocale } from 'next-intl'
import { getTranslations } from 'next-intl/server'

import { OGImage } from '@/components/og-image'
import { locales } from '@/i18n/config'
import { routing } from '@/i18n/routing'
import { appName } from '@/lib/shared'

export const revalidate = false

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function GET(_request: Request, { params }: RouteContext<'/[locale]/og/image.png'>) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) notFound()

  const t = await getTranslations({ locale })

  return new ImageResponse(<OGImage title={appName} description={t('site.description')} />, {
    width: 1200,
    height: 630,
  })
}
