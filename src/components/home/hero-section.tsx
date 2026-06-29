'use client'

import type { Macro, Step } from '../app-mockup'

import { BookOpenIcon, DownloadIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { HeroFlutedGlass } from '@/components/home/hero-fluted-glass'
import { buttonVariants } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/cn'

import { MacroPanel, PropertiesPanel, Shell, StepTree, Toolbar } from '../app-mockup'

export function HeroSection() {
  const t = useTranslations()

  const macros: Macro[] = [{ label: t('home.mockup.macros.autoCrafting'), active: true }]
  const steps: Step[] = [
    {
      type: 'repeat',
      count: 64,
      steps: [
        { type: 'wait_image', template: 'Crafting Ready', active: true },
        { type: 'mouse_click', x: 150, y: 2032 },
        { type: 'delay', ms: 500 },
        { type: 'key', key: 'e' },
      ],
    },
  ]

  return (
    <section className='relative flex h-[70vh] max-h-225 flex-col gap-12 overflow-hidden rounded-2xl border px-4 md:p-12'>
      <div className='flex flex-col items-center space-y-8 pt-8 text-center sm:items-start sm:text-left'>
        <p className='inline-block rounded-full border border-brand/50 px-3 py-2 text-xs font-medium text-brand'>
          {t('home.hero.eyebrow')}
        </p>
        <h1 className='text-2xl/tight font-medium sm:text-4xl/tight xl:text-5xl'>{t('home.hero.h1')}</h1>
        <div className='space-x-4'>
          <Link href='/download' className={cn(buttonVariants({ variant: 'primary' }))}>
            <DownloadIcon className='size-4' />
            {t('home.hero.primaryCta')}
          </Link>
          <Link href='/docs' className={cn(buttonVariants({ variant: 'secondary' }))}>
            <BookOpenIcon className='size-4' />
            {t('home.hero.secondaryCta')}
          </Link>
        </div>
      </div>

      <Shell
        className='absolute top-80 left-[16%] max-w-200 rounded-xl border-2 sm:top-100 lg:top-88 lg:max-w-280'
        data-testid='app-preview'
      >
        <Toolbar />

        <div className='grid min-h-112 grid-cols-[minmax(13rem,0.9fr)_minmax(22rem,2.15fr)_minmax(15rem,1fr)] gap-1 p-2'>
          <MacroPanel macros={macros} />
          <StepTree steps={steps} />
          <PropertiesPanel
            title={t('home.mockup.properties.title')}
            skipLabel={t('home.mockup.properties.skip')}
            noteLabel={t('home.mockup.properties.note')}
            notePlaceholder={t('home.mockup.properties.notePlaceholder')}
            templateLabel={t('home.mockup.properties.template')}
            templateSrc='/images/remaku-app-preview-template.png'
            templateAlt={t('home.mockup.properties.templateAlt')}
            templateName={t('home.mockup.properties.templateName')}
            matchModeLabel={t('home.mockup.properties.matchMode')}
            matchMode={t('home.mockup.properties.matchModeValue')}
            captureScreenLabel={t('home.mockup.properties.captureScreen')}
          />
        </div>

        <div className='px-4 pt-1 pb-3 text-sm'>{t('home.mockup.status')}</div>
      </Shell>
      <HeroFlutedGlass className='absolute inset-0 -z-10 size-full' />
    </section>
  )
}
