import type { Locale } from 'next-intl'

import { routing } from '@/i18n/routing'

export function getLocalizedPath(path: string, locale: Locale): string {
  if (locale === routing.defaultLocale) return path

  return `/${locale}${path}`
}
