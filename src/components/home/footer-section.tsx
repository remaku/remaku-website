'use client'

import { useTranslations } from 'next-intl'

import { Logo } from '@/components/logo'
import { Link } from '@/i18n/navigation'
import { appName, githubUrl } from '@/lib/shared'

const currentYear = new Date().getFullYear()

export function FooterSection() {
  const t = useTranslations()

  const columns = [
    {
      title: t('home.footer.columns.product'),
      links: [
        { label: t('home.footer.links.download'), href: '/download' },
        { label: t('home.footer.links.features'), href: '/docs/features' },
      ],
    },
    {
      title: t('home.footer.columns.resources'),
      links: [
        { label: t('home.footer.links.docs'), href: '/docs' },
        { label: t('home.footer.links.imageRecognition'), href: '/docs/image-recognition' },
        { label: t('home.footer.links.keyboardShortcuts'), href: '/docs/keyboard-shortcuts' },
      ],
    },
    {
      title: t('home.footer.columns.community'),
      links: [{ label: 'GitHub', href: githubUrl }],
    },
    {
      title: t('home.footer.columns.project'),
      links: [
        { label: t('home.footer.links.sourceCode'), href: githubUrl },
        { label: t('home.footer.links.license'), href: `${githubUrl}/blob/main/LICENSE` },
      ],
    },
  ]

  return (
    <footer className='pb-18 md:pb-24'>
      <div className='space-y-14 border-y py-12 md:space-y-18 md:py-16'>
        <div className='flex flex-col gap-8 md:flex-row md:items-center md:justify-between'>
          <Link href='/' className='inline-flex w-fit items-center gap-4'>
            <Logo className='size-11 rounded-xl' />
            <span className='text-xl font-semibold'>{appName}</span>
          </Link>

          <div className='inline-flex w-fit items-center gap-3'>
            <span className='relative flex size-2.5'>
              <span className='absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-30' />
              <span className='relative inline-flex size-2.5 rounded-full bg-emerald-500' />
            </span>
            {t('home.footer.status')}
          </div>
        </div>

        <nav aria-label={t('home.footer.navigationLabel')} className='grid gap-10 sm:grid-cols-2 lg:grid-cols-4'>
          {columns.map((column) => (
            <div key={column.title} className='space-y-5'>
              <h2 className='font-medium text-fd-muted-foreground'>{column.title}</h2>
              <ul className='space-y-4'>
                {column.links.map((link) => {
                  const isExternal = link.href.startsWith('https://')

                  return (
                    <li key={link.href}>
                      {isExternal ? (
                        <a
                          href={link.href}
                          target='_blank'
                          rel='noreferrer'
                          className='transition-colors hover:text-brand'
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link href={link.href} className='transition-colors hover:text-brand'>
                          {link.label}
                        </Link>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className='flex flex-col gap-5 pt-10 md:flex-row md:items-center md:justify-between'>
        <p>{t('home.footer.copyright', { year: String(currentYear) })}</p>
        <a href='mailto:hello@remaku.com' className='w-fit transition-colors hover:text-brand'>
          hello@remaku.com
        </a>
      </div>
    </footer>
  )
}
