import type { Metadata } from 'next'
import type { Locale } from 'next-intl'

import { getTranslations, setRequestLocale } from 'next-intl/server'

import { CtaSection } from '@/components/home/cta-section'
import { FeaturesSection } from '@/components/home/features-section'
import { FooterSection } from '@/components/home/footer-section'
import { HeroSection } from '@/components/home/hero-section'
import { IntroSection } from '@/components/home/intro-section'
import { WorkflowSection } from '@/components/home/workflow-section'
import { locales } from '@/i18n/config'
import { JsonLd, organization, webSite } from '@/lib/json-ld'
import { createPageMetadata } from '@/lib/metadata'
import { getBaseUrl } from '@/utils/get-base-url'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata(props: PageProps<'/[locale]'>): Promise<Metadata> {
  const { params } = props
  const { locale } = await params

  const t = await getTranslations({ locale: locale as Locale })

  return createPageMetadata({
    title: false,
    description: t('site.description'),
    canonical: '/',
    openGraphImage: '/og/image.png',
    locale: locale as Locale,
  })
}

export default async function HomePage(props: PageProps<'/[locale]'>) {
  const { params } = props
  const { locale } = await params

  setRequestLocale(locale as Locale)

  const baseUrl = getBaseUrl()
  const t = await getTranslations({ locale: locale as Locale })

  return (
    <>
      <JsonLd json={organization(baseUrl)} />
      <JsonLd json={webSite(baseUrl, t('site.description'))} />
      <div className='mx-auto w-full max-w-(--fd-layout-width) space-y-42 px-4 py-6'>
        <HeroSection />
        <IntroSection />
        <FeaturesSection />
        <WorkflowSection />
        <CtaSection />
        <FooterSection />
      </div>
    </>
  )
}
