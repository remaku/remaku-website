'use client'

import type { Macro, Step } from '@/components/app-mockup'

import { useTranslations } from 'next-intl'

import { MacroPanel, Shell, StepTree, Toolbar } from '@/components/app-mockup'
import { FeatureContent } from '@/components/home/feature-content'
import { FeatureShowcase } from '@/components/home/feature-showcase'

export function VisualEditorSection() {
  const t = useTranslations()

  const macros: Macro[] = [{ label: t('home.mockup.macros.spreadsheet'), active: true }]

  const steps: Step[] = [
    {
      type: 'repeat',
      count: 50,
      steps: [
        { type: 'wait_image', template: 'Form Ready', active: true },
        { type: 'key', key: 'ctrl+v' },
        { type: 'key', key: 'tab' },
        { type: 'key', key: 'ctrl+v' },
        { type: 'mouse_click', target: 'image' as const, template: 'Submit Button' },
        { type: 'wait_image', template: 'Saved Successfully' },
        { type: 'key', key: 'alt+tab' },
        { type: 'key', key: 'down' },
        { type: 'key', key: 'home' },
        { type: 'key', key: 'ctrl+c' },
        { type: 'key', key: 'alt+tab' },
      ],
    },
  ]

  return (
    <FeatureShowcase image='/images/remaku-wallpaper-1.png'>
      <FeatureContent
        cta={t('home.features.visualEditor.cta')}
        description={t('home.features.visualEditor.description')}
        href='/docs/step-editing'
        title={t('home.features.visualEditor.title')}
      />

      <Shell className='absolute top-1/2 left-(--shell-padding) w-(--shell-width) origin-left -translate-y-1/2 scale-(--shell-scale) md:left-[max(var(--shell-padding),calc(50%-var(--shell-width)/2))] md:origin-center md:scale-100'>
        <Toolbar />
        <div className='grid min-h-95 grid-cols-[14rem_minmax(0,1fr)] gap-1 p-2'>
          <MacroPanel macros={macros} />
          <StepTree maxHeight={420} steps={steps} />
        </div>
      </Shell>
    </FeatureShowcase>
  )
}
