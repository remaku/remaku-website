import { notFound } from 'next/navigation'
import { hasLocale } from 'next-intl'

import { routing } from '@/i18n/routing'
import { getLLMText, source } from '@/lib/source'

export const revalidate = false

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function GET(_request: Request, { params }: RouteContext<'/[locale]/llms-full.txt'>) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) notFound()

  const pages = source.getPages(locale)
  const scanned = await Promise.all(pages.map(async (page) => getLLMText(page)))

  return new Response(scanned.join('\n\n'))
}
