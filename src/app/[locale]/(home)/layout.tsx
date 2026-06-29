import type { Locale } from 'next-intl'

import { HomeLayout } from 'fumadocs-ui/layouts/home'
import { BookOpenIcon } from 'lucide-react'
import { setRequestLocale } from 'next-intl/server'

import { baseOptions } from '@/lib/layout.shared'

export default async function Layout(props: LayoutProps<'/[locale]'>) {
  const { params, children } = props
  const { locale } = await params

  setRequestLocale(locale as Locale)

  return (
    <HomeLayout
      {...baseOptions(locale)}
      links={[
        {
          text: 'Documentation',
          url: '/docs',
          icon: <BookOpenIcon />,
        },
      ]}
    >
      {children}
    </HomeLayout>
  )
}
