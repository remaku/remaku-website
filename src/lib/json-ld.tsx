import type { BreadcrumbList, ListItem, Organization, TechArticle, Thing, WebSite, WithContext } from 'schema-dts'

import { appName, githubUrl } from '@/lib/shared'

type JsonLdProps = {
  json: WithContext<Thing>
}

export function JsonLd(props: JsonLdProps) {
  const { json } = props

  return (
    <script
      type='application/ld+json'
      // eslint-disable-next-line @eslint-react/dom-no-dangerously-set-innerhtml
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  )
}

export function organization(baseUrl: string): WithContext<Organization> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: appName,
    url: baseUrl,
    logo: `${baseUrl}/images/logo.png`,
    sameAs: [githubUrl],
  }
}

export function webSite(baseUrl: string, description: string): WithContext<WebSite> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: appName,
    url: baseUrl,
    description,
  }
}

type ArticleInput = {
  title: string
  description: string
  url: string
  baseUrl: string
  datePublished?: string
  dateModified?: string
}

export function article(input: ArticleInput): WithContext<TechArticle> {
  const { title, description, url, baseUrl, datePublished, dateModified } = input
  const now = new Date().toISOString()

  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: title,
    description,
    url,
    datePublished: datePublished ?? now,
    dateModified: dateModified ?? now,
    author: {
      '@type': 'Organization',
      name: appName,
      url: baseUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: appName,
      url: baseUrl,
    },
  }
}

type BreadcrumbInput = {
  name: string
  url: string
}

export function breadcrumb(items: BreadcrumbInput[]): WithContext<BreadcrumbList> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map(
      (item, index): ListItem => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url,
      }),
    ),
  }
}
