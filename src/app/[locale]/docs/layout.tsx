import type { Locale } from 'next-intl'

import { DocsLayout } from 'fumadocs-ui/layouts/docs'
import { setRequestLocale } from 'next-intl/server'

import { baseOptions } from '@/lib/layout.shared'
import { source } from '@/lib/source'

export default async function Layout(props: LayoutProps<'/[locale]/docs'>) {
  const { params, children } = props
  const { locale } = await params

  setRequestLocale(locale as Locale)

  return (
    <DocsLayout tree={source.getPageTree(locale)} {...baseOptions(locale)}>
      {children}
    </DocsLayout>
  )
}
