'use client'

import { CheckCircle2Icon } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { FeatureContent } from '@/components/home/feature-content'
import { FeatureShowcase } from '@/components/home/feature-showcase'

import { GameButton } from './game-button'

export function ImageRecognitionSection() {
  const t = useTranslations()

  return (
    <FeatureShowcase image='/images/remaku-wallpaper-2.png' reverse>
      <FeatureContent
        cta={t('home.features.imageRecognition.cta')}
        description={t('home.features.imageRecognition.description')}
        href='/docs/image-recognition'
        title={t('home.features.imageRecognition.title')}
      />
      <div className='absolute top-1/2 left-(--shell-padding) h-150 w-(--shell-width) origin-left -translate-y-1/2 scale-(--shell-scale) rounded-xl bg-app-preview-shell/80 md:left-[max(var(--shell-padding),calc(50%-var(--shell-width)/2))] md:origin-center md:scale-100'>
        <div className='absolute top-5 left-5 size-8 border-t border-l border-brand/70'></div>
        <div className='absolute top-5 right-5 size-8 border-t border-r border-brand/70'></div>
        <div className='absolute bottom-5 left-5 size-8 border-b border-l border-brand/70'></div>
        <div className='absolute right-5 bottom-5 size-8 border-r border-b border-brand/70'></div>

        <div className='absolute top-[44%] left-1/2 z-20 -translate-1/2 space-y-8'>
          <GameButton className='w-70'>Start</GameButton>
          <GameButton className='w-70'>Settings</GameButton>
          <GameButton className='w-70'>Quit</GameButton>
        </div>

        <div className='absolute top-[12%] left-1/2 z-30 h-[28%] w-[42%] -translate-x-1/2 rounded-lg border border-brand bg-brand/10 md:left-1/2'>
          <div className='absolute -top-8 left-0 rounded-md bg-brand px-2 py-1 text-xs font-medium text-brand-foreground'>
            {t('home.features.imageRecognition.target')}
          </div>
        </div>

        <div className='absolute inset-y-0 left-1/2 z-30 w-px animate-remaku-feature-scan bg-brand/70' />

        <div className='absolute bottom-6 z-40 w-58 space-y-2 rounded-lg border bg-fd-secondary p-3 max-md:left-6 md:right-6'>
          <div className='flex items-center justify-between text-sm font-medium'>
            <div className='flex items-center gap-2'>
              <CheckCircle2Icon className='size-4 text-brand' />
              {t('home.features.imageRecognition.matched')}
            </div>
            <span>{t('home.features.imageRecognition.confidence')}</span>
          </div>
          <div className='flex h-24 items-center justify-center rounded-md border bg-app-preview-control/20'>
            <GameButton className='w-70 scale-50'>Start</GameButton>
          </div>
        </div>
      </div>
    </FeatureShowcase>
  )
}
