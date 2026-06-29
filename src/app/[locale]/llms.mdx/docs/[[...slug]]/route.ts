import { notFound } from 'next/navigation'
import { hasLocale } from 'next-intl'

import { routing } from '@/i18n/routing'
import { getLLMText, getPageMarkdownUrl, source } from '@/lib/source'

export const revalidate = false

export function generateStaticParams() {
  return source.getPages().map((page) => ({
    locale: page.locale,
    slug: getPageMarkdownUrl(page).segments,
  }))
}

export async function GET(_request: Request, { params }: RouteContext<'/[locale]/llms.mdx/docs/[[...slug]]'>) {
  const { locale, slug } = await params

  if (!hasLocale(routing.locales, locale)) notFound()

  const page = source.getPage(slug?.slice(0, -1), locale)
  if (!page) notFound()

  return new Response(await getLLMText(page), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  })
}
