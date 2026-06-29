'use client'

import { useTranslations } from 'next-intl'

import { WorkflowDithering } from '@/components/workflow-dithering'

export function WorkflowSection() {
  const t = useTranslations()

  return (
    <section className='relative grid overflow-hidden rounded-2xl border py-12 lg:grid-cols-[0.82fr_1.18fr]'>
      <WorkflowDithering className='absolute inset-0 -z-10 size-full' />

      <div className='overflow-hidden p-8 sm:p-10'>
        <div className='relative'>
          <p className='text-sm font-medium text-brand'>{t('home.workflow.eyebrow')}</p>
          <h2 className='mt-3 max-w-xl text-3xl/tight font-medium sm:text-4xl/tight'>{t('home.workflow.title')}</h2>
        </div>
      </div>

      <div className='grid gap-px sm:grid-cols-3 lg:grid-cols-1'>
        {[t('home.workflow.steps.0'), t('home.workflow.steps.1'), t('home.workflow.steps.2')].map((step, index) => (
          <div key={step} className='p-8 sm:p-10'>
            <div className='mb-8 flex size-10 items-center justify-center rounded-full bg-brand text-sm font-bold text-brand-foreground'>
              {index + 1}
            </div>
            <p className='text-xl/tight font-medium'>{step}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
