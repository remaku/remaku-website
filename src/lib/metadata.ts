import type { Metadata } from 'next'
import type { TemplateString } from 'next/dist/lib/metadata/types/metadata-types'
import type { Locale } from 'next-intl'

import { routing } from '@/i18n/routing'
import { getBaseUrl } from '@/utils/get-base-url'
import { getLocalizedPath } from '@/utils/get-localized-path'

import { appName, twitterHandle, twitterUserId } from './shared'

type RootMetadataOptions = {
  title: TemplateString
}

export function createRootMetadata(options: RootMetadataOptions): Metadata {
  return {
    title: options.title,
  }
}

type PageMetadataOptions = {
  title: string | false
  description: string
  canonical: string
  openGraphImage: string
  locale: Locale
  date?: string
  lastModified?: string
}

export function createPageMetadata(options: PageMetadataOptions): Metadata {
  const baseUrl = getBaseUrl()
  const localizedCanonical = getLocalizedPath(options.canonical, options.locale)

  return {
    ...(options.title && { title: options.title }),
    description: options.description,
    metadataBase: new URL(baseUrl),
    openGraph: {
      type: options.date ? 'article' : 'website',
      siteName: appName,
      url: localizedCanonical,
      locale: options.locale,
      ...(options.date && { publishedTime: options.date }),
      ...(options.lastModified && { modifiedTime: options.lastModified }),
      images: {
        url: getLocalizedPath(options.openGraphImage, options.locale),
      },
    },
    alternates: {
      canonical: localizedCanonical,
      languages: {
        'x-default': getLocalizedPath(options.canonical, routing.defaultLocale),
        ...Object.fromEntries(routing.locales.map((locale) => [locale, getLocalizedPath(options.canonical, locale)])),
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    authors: {
      name: appName,
      url: baseUrl,
    },
    twitter: {
      card: 'summary_large_image',
      siteId: twitterUserId,
      creatorId: twitterUserId,
      site: twitterHandle,
      creator: twitterHandle,
    },
    icons: {
      icon: [
        {
          url: '/favicon-96x96.png',
          sizes: '96x96',
          type: 'image/png',
        },
        {
          url: '/favicon.svg',
          type: 'image/svg+xml',
        },
      ],
      shortcut: '/favicon.ico',
      apple: {
        url: '/apple-touch-icon.png',
        sizes: '180x180',
      },
    },
    manifest: '/site.webmanifest',
  }
}
