import type { Metadata } from 'next'
import type { Locale } from 'next-intl'

import { Accordion, Accordions } from 'fumadocs-ui/components/accordion'
import { DownloadIcon, ExternalLinkIcon, HistoryIcon } from 'lucide-react'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { PageDescription, PageHeader, PageTitle } from '@/components/page-header'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { locales } from '@/i18n/config'
import { cn } from '@/lib/cn'
import { getRemakuReleases, remakuInstallerFileName } from '@/lib/github-releases'
import { createPageMetadata } from '@/lib/metadata'
import { githubUrl } from '@/lib/shared'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata(props: PageProps<'/[locale]/download'>): Promise<Metadata> {
  const { params } = props
  const { locale } = await params

  const t = await getTranslations({ locale: locale as Locale })

  return createPageMetadata({
    title: t('download.metadata.title'),
    description: t('download.metadata.description'),
    canonical: '/download',
    openGraphImage: '/og/image.png',
    locale: locale as Locale,
  })
}

export default async function DownloadPage(props: PageProps<'/[locale]/download'>) {
  const { params } = props
  const { locale } = await params
  const typedLocale = locale as Locale

  setRequestLocale(typedLocale)

  const t = await getTranslations({ locale: typedLocale })
  const { latest, releases, unavailable } = await getRemakuReleases()
  const olderReleases = releases.slice(1)
  const latestPublishedAt = formatReleaseDate(latest.publishedAt, typedLocale)

  return (
    <main className='mx-auto w-full max-w-(--fd-layout-width) px-4 py-14 md:py-20'>
      <div className='space-y-10'>
        <PageHeader>
          <PageTitle>{t('download.hero.title')}</PageTitle>
          <PageDescription>{t('download.hero.description')}</PageDescription>
        </PageHeader>

        <section className='grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]' aria-labelledby='latest-download'>
          <div className='space-y-8'>
            <div className='space-y-4'>
              <p className='text-sm font-medium text-brand'>{t('download.latest.label')}</p>
              <div className='space-y-3'>
                <h2 id='latest-download' className='text-2xl font-medium md:text-3xl'>
                  {t('download.latest.title', { version: latest.version })}
                </h2>
                {latestPublishedAt ? (
                  <p className='text-fd-muted-foreground'>
                    {t('download.latest.published', { date: latestPublishedAt })}
                  </p>
                ) : null}
              </div>
            </div>

            <div className='flex flex-col gap-3 sm:flex-row'>
              <a href={latest.downloadUrl} className={cn(buttonVariants({ variant: 'primary' }), 'w-full sm:w-fit')}>
                <DownloadIcon className='size-4' />
                {t('download.latest.primaryCta')}
              </a>
              <a
                href={latest.releaseUrl}
                target='_blank'
                rel='noreferrer'
                className={cn(buttonVariants({ variant: 'secondary' }), 'w-full sm:w-fit')}
              >
                <ExternalLinkIcon className='size-4' />
                {t('download.latest.releaseNotes')}
              </a>
            </div>

            {unavailable ? (
              <div className='rounded-lg border border-fd-border bg-fd-muted/30 p-4 text-sm text-fd-muted-foreground'>
                <p className='font-medium text-fd-foreground'>{t('download.fallback.title')}</p>
                <p className='mt-2'>{t('download.fallback.description')}</p>
              </div>
            ) : null}
          </div>

          <dl className='grid content-start gap-5 text-sm'>
            <div className='space-y-1'>
              <dt className='text-fd-muted-foreground'>{t('download.details.platform')}</dt>
              <dd className='font-medium'>{t('download.details.platformValue')}</dd>
            </div>
            <div className='space-y-1'>
              <dt className='text-fd-muted-foreground'>{t('download.details.file')}</dt>
              <dd className='font-medium'>{remakuInstallerFileName}</dd>
            </div>
            <div className='space-y-1'>
              <dt className='text-fd-muted-foreground'>{t('download.details.source')}</dt>
              <dd>
                <a
                  href={githubUrl}
                  target='_blank'
                  rel='noreferrer'
                  className='font-medium transition-colors hover:text-brand'
                >
                  {t('download.details.sourceValue')}
                </a>
              </dd>
            </div>
          </dl>
        </section>

        <Separator />

        <section className='space-y-6' aria-labelledby='older-downloads'>
          <div className='space-y-2'>
            <div className='space-y-2'>
              <div className='flex items-center gap-2 text-brand'>
                <HistoryIcon className='size-4' />
                <p className='text-sm font-medium'>{t('download.versions.eyebrow')}</p>
              </div>
              <h2 id='older-downloads' className='text-2xl font-medium'>
                {t('download.versions.title')}
              </h2>
            </div>
          </div>

          {olderReleases.length > 0 ? (
            <Accordions>
              {olderReleases.map((release) => {
                const publishedAt = formatReleaseDate(release.publishedAt, typedLocale)

                return (
                  <Accordion
                    key={release.version}
                    value={release.version}
                    title={
                      <span className='flex flex-col gap-1 text-left'>
                        <span className='font-medium'>{release.version}</span>
                        {publishedAt ? (
                          <span className='text-sm font-normal text-fd-muted-foreground'>
                            {t('download.versions.published', { date: publishedAt })}
                          </span>
                        ) : null}
                      </span>
                    }
                  >
                    <div className='flex flex-col gap-2 py-2 sm:flex-row'>
                      <a
                        href={release.downloadUrl}
                        className={cn(buttonVariants({ variant: 'secondary' }), 'sm:px-4 sm:py-2')}
                      >
                        <DownloadIcon className='size-4' />
                        {t('download.versions.download')}
                      </a>
                      <a
                        href={release.releaseUrl}
                        target='_blank'
                        rel='noreferrer'
                        className={cn(buttonVariants({ variant: 'secondary' }), 'sm:px-4 sm:py-2')}
                      >
                        <ExternalLinkIcon className='size-4' />
                        {t('download.versions.releaseNotes')}
                      </a>
                    </div>
                  </Accordion>
                )
              })}
            </Accordions>
          ) : (
            <div className='rounded-lg border p-6 text-fd-muted-foreground'>{t('download.versions.empty')}</div>
          )}
        </section>
      </div>
    </main>
  )
}

function formatReleaseDate(value: string, locale: Locale): string {
  if (!value) return ''

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) return ''

  return new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(date)
}
