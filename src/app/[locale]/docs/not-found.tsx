import { getTranslations } from 'next-intl/server'

import { buttonVariants } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/cn'

export default async function NotFoundPage() {
  const t = await getTranslations()

  return (
    <div className='flex flex-col items-center justify-center gap-8 [grid-area:main]'>
      <div className='flex flex-col items-center gap-3 text-center'>
        <h1 className='text-4xl font-semibold'>{t('notFound.title')}</h1>
        <p className='max-w-md text-fd-muted-foreground'>{t('notFound.description')}</p>
      </div>
      <Link href='/' className={cn(buttonVariants({ variant: 'primary' }))}>
        {t('notFound.backHome')}
      </Link>
    </div>
  )
}
