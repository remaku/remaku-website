import type { Metadata } from 'next'
import type { Locale } from 'next-intl'

import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  MarkdownCopyButton,
  ViewOptionsPopover,
} from 'fumadocs-ui/layouts/docs/page'
import { createRelativeLink } from 'fumadocs-ui/mdx'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'

import { getMDXComponents } from '@/components/mdx'
import { article, breadcrumb, JsonLd } from '@/lib/json-ld'
import { createPageMetadata } from '@/lib/metadata'
import { gitConfig } from '@/lib/shared'
import { getPageImage, getPageMarkdownUrl, getPageUrl, source } from '@/lib/source'
import { getBaseUrl } from '@/utils/get-base-url'
import { getLocalizedPath } from '@/utils/get-localized-path'

export function generateStaticParams() {
  return source.generateParams('slug', 'locale')
}

export async function generateMetadata(props: PageProps<'/[locale]/docs/[[...slug]]'>): Promise<Metadata> {
  const { params } = props
  const { locale, slug } = await params

  const page = source.getPage(slug, locale)
  if (!page) notFound()

  return createPageMetadata({
    title: page.data.title,
    description: page.data.description,
    canonical: getPageUrl(page).url,
    openGraphImage: getPageImage(page).url,
    locale: locale as Locale,
    date: page.data.date,
    lastModified: page.data.lastModified,
  })
}

export default async function Page(props: PageProps<'/[locale]/docs/[[...slug]]'>) {
  const { params } = props
  const { locale, slug } = await params
  const page = source.getPage(slug, locale)
  if (!page) notFound()

  setRequestLocale(locale as Locale)

  const baseUrl = getBaseUrl()
  const pageUrl = `${baseUrl}${page.url}`
  const breadcrumbItems = [{ name: 'Docs', url: `${baseUrl}${getLocalizedPath('/docs', locale as Locale)}` }]

  if (slug) {
    const slugArray: string[] = Array.isArray(slug) ? slug : [slug]

    for (const [i, name] of slugArray.slice(0, -1).entries()) {
      const path = `/docs/${slugArray.slice(0, i + 1).join('/')}`

      breadcrumbItems.push({
        name,
        url: `${baseUrl}${getLocalizedPath(path, locale as Locale)}`,
      })
    }
  }

  breadcrumbItems.push({ name: page.data.title, url: pageUrl })

  const MDX = page.data.body
  const markdownUrl = getPageMarkdownUrl(page).url

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <JsonLd
        json={article({
          title: page.data.title,
          description: page.data.description,
          url: pageUrl,
          baseUrl,
          datePublished: page.data.date,
          dateModified: page.data.lastModified,
        })}
      />
      <JsonLd json={breadcrumb(breadcrumbItems)} />
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription className='mb-0'>{page.data.description}</DocsDescription>
      <div className='flex flex-row items-center gap-2 border-b pb-6'>
        <MarkdownCopyButton markdownUrl={markdownUrl} />
        <ViewOptionsPopover
          markdownUrl={markdownUrl}
          githubUrl={`https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/content/docs/${page.path}`}
        />
      </div>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  )
}
