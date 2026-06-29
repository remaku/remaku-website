'use client'

import { useTranslations } from 'next-intl'
import { useEffect } from 'react'

import { Logo } from '@/components/logo'
import { buttonVariants } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/cn'
import { appName } from '@/lib/shared'

export default function ErrorPage(props: { error: Error & { digest?: string }; reset: () => void }) {
  const { error, reset } = props

  const t = useTranslations()

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className='flex min-h-screen flex-col items-center justify-center gap-8 px-4'>
      <Link href='/' className='inline-flex items-center gap-3'>
        <Logo className='size-10' />
        <span className='text-lg font-semibold'>{appName}</span>
      </Link>
      <div className='flex flex-col items-center gap-3 text-center'>
        <h1 className='text-4xl font-semibold'>{t('error.title')}</h1>
        <p className='max-w-md text-fd-muted-foreground'>{t('error.description')}</p>
      </div>
      <div className='flex gap-4'>
        <button type='button' onClick={reset} className={cn(buttonVariants({ variant: 'primary' }))}>
          {t('error.retry')}
        </button>
        <Link href='/' className={cn(buttonVariants({ variant: 'secondary' }))}>
          {t('notFound.backHome')}
        </Link>
      </div>
    </main>
  )
}
