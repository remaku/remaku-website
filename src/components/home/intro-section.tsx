'use client'

import { useTranslations } from 'next-intl'

export function IntroSection() {
  const t = useTranslations()

  return (
    <section>
      <p className='max-w-5xl text-3xl/tight font-medium sm:text-5xl/tight'>
        {t('home.intro.lead')} <span className='text-brand'>{t('home.intro.emphasis')}</span>
      </p>
    </section>
  )
}
