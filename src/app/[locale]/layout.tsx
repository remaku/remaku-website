import '@/styles/globals.css'

import type { Metadata, Viewport } from 'next'

import { i18nProvider } from 'fumadocs-ui/i18n'
import { RootProvider } from 'fumadocs-ui/provider/next'
import { Geist, Geist_Mono, Noto_Sans_SC, Noto_Sans_TC } from 'next/font/google'
import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'

import { Analytics } from '@/components/analytics'
import { routing } from '@/i18n/routing'
import { cn } from '@/lib/cn'
import { translations } from '@/lib/layout.shared'
import { createRootMetadata } from '@/lib/metadata'
import { appName } from '@/lib/shared'

export const metadata: Metadata = createRootMetadata({
  title: {
    template: `%s | ${appName}`,
    default: appName,
  },
})

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const notoSansTC = Noto_Sans_TC({
  variable: '--font-noto-sans-tc',
  subsets: ['latin'],
})

const notoSansSC = Noto_Sans_SC({
  variable: '--font-noto-sans-sc',
  subsets: ['latin'],
})

export default async function RootLayout(props: LayoutProps<'/[locale]'>) {
  const { params, children } = props
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) notFound()

  setRequestLocale(locale)

  return (
    <html
      lang={locale}
      className={cn(geistSans.variable, geistMono.variable, notoSansTC.variable, notoSansSC.variable)}
      suppressHydrationWarning
    >
      <body>
        <NextIntlClientProvider>
          <RootProvider i18n={i18nProvider(translations, locale)}>
            {children}
            <Analytics />
          </RootProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
