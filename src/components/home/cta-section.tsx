'use client'

import { SiGithub } from '@icons-pack/react-simple-icons'
import { DownloadIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { buttonVariants } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/cn'
import { githubUrl } from '@/lib/shared'

export function CtaSection() {
  const t = useTranslations()

  return (
    <section className='flex min-h-48 flex-col items-center justify-center gap-10'>
      <h2 className='text-center text-4xl font-medium'>{t('home.cta.title')}</h2>
      <div className='space-x-4'>
        <Link href='/download' className={cn(buttonVariants({ variant: 'primary' }))}>
          <DownloadIcon className='size-4' />
          {t('home.cta.primaryCta')}
        </Link>
        <Link href={githubUrl} className={cn(buttonVariants({ variant: 'secondary' }))}>
          <SiGithub className='size-4' />
          {t('home.cta.secondaryCta')}
        </Link>
      </div>
    </section>
  )
}
