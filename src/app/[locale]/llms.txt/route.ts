import { llms } from 'fumadocs-core/source'
import { notFound } from 'next/navigation'
import { hasLocale } from 'next-intl'

import { routing } from '@/i18n/routing'
import { source } from '@/lib/source'

export const revalidate = false

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function GET(_request: Request, { params }: RouteContext<'/[locale]/llms.txt'>) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) notFound()

  return new Response(llms(source).index(locale))
}
