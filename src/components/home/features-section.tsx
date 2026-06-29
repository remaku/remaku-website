'use client'

import { useTranslations } from 'next-intl'

import { ImageRecognitionSection } from '@/components/home/features-image-recognition-section'
import { MacroRecorderSection } from '@/components/home/features-macro-recorder-section'
import { VisualEditorSection } from '@/components/home/features-visual-editor-section'

export function FeaturesSection() {
  const t = useTranslations()

  return (
    <section className='space-y-14'>
      <div className='space-y-3'>
        <p className='font-medium text-brand'>{t('home.features.eyebrow')}</p>
        <h2 className='max-w-4xl text-3xl font-medium sm:text-5xl'>{t('home.features.title')}</h2>
      </div>

      <div className='space-y-28'>
        <VisualEditorSection />
        <ImageRecognitionSection />
        <MacroRecorderSection />
      </div>
    </section>
  )
}
