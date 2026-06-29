'use client'

import type { Macro, Step } from '@/components/app-mockup'

import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

import { KeystrokeDisplay, MacroPanel, Shell, StepTree, Toolbar } from '@/components/app-mockup'
import { FeatureContent } from '@/components/home/feature-content'
import { FeatureShowcase } from '@/components/home/feature-showcase'

const allSteps: Step[] = [
  { type: 'key', key: 'x' },
  { type: 'key', key: 'tab' },
  { type: 'key', key: 'ctrl+v' },
  { type: 'key', key: 'tab' },
  { type: 'key', key: 'ctrl+v' },
  { type: 'key', key: 'tab' },
  { type: 'text_input', text: 'hello@remaku.com' },
  { type: 'key', key: 'enter' },
]

function stepToLabel(step: Step): string {
  if (step.type === 'text_input') return step.text
  if (step.type === 'key') return step.key
  return step.type
}

function deactivateSteps(steps: Step[]): Step[] {
  return steps.map((s) => ({ ...s, active: false }))
}

export function MacroRecorderSection() {
  const t = useTranslations()

  const macros: Macro[] = [{ label: t('home.mockup.macros.spreadsheet'), active: true }]

  const [steps, setSteps] = useState<Step[]>([])
  const [displayKey, setDisplayKey] = useState<{ id: string; label: string } | null>(null)
  const [cycle, setCycle] = useState(0)

  useEffect(() => {
    const timers: number[] = []
    const stepInterval = 800

    for (const [i, step] of allSteps.entries()) {
      const delay = (i + 1) * stepInterval
      const stepId = `${cycle}-${step.type}-${i}`

      // oxlint-disable-next-line @eslint-react/web-api-no-leaked-timeout -- cleaned up via timers array
      const displayTimer = globalThis.setTimeout(() => {
        setDisplayKey({ id: stepId, label: stepToLabel(step) })
      }, delay)
      timers.push(displayTimer as unknown as number)

      // oxlint-disable-next-line @eslint-react/web-api-no-leaked-timeout -- cleaned up via timers array
      const stepTimer = globalThis.setTimeout(() => {
        setSteps((prev) => [...deactivateSteps(prev), { ...step, active: true }])
      }, delay + 350)
      timers.push(stepTimer as unknown as number)
    }

    const resetDelay = (allSteps.length + 1) * stepInterval + 600

    // oxlint-disable-next-line @eslint-react/web-api-no-leaked-timeout -- cleaned up via timers array
    const resetTimer = globalThis.setTimeout(() => {
      setSteps([])
      setDisplayKey(null)
      setCycle((c) => c + 1)
    }, resetDelay)
    timers.push(resetTimer as unknown as number)

    return () => {
      for (const id of timers) clearTimeout(id)
    }
  }, [cycle])

  return (
    <FeatureShowcase image='/images/remaku-wallpaper-3.png'>
      <FeatureContent
        title={t('home.features.macroRecorder.title')}
        description={t('home.features.macroRecorder.description')}
        cta={t('home.features.macroRecorder.cta')}
        href='/docs/features'
      />

      <Shell className='absolute top-1/2 left-(--shell-padding) w-(--shell-width) origin-left -translate-y-1/2 scale-(--shell-scale) md:left-[max(var(--shell-padding),calc(50%-var(--shell-width)/2))] md:origin-center md:scale-100'>
        <Toolbar />

        <div className='relative grid min-h-95 grid-cols-[13rem_minmax(0,1fr)] gap-1 p-2'>
          <MacroPanel macros={macros} />
          <StepTree steps={steps} animateEntries />
        </div>

        {displayKey && (
          <KeystrokeDisplay
            className='absolute bottom-4 left-4 z-10'
            label={t('home.features.macroRecorder.recording')}
            keys={[displayKey]}
          />
        )}
      </Shell>
    </FeatureShowcase>
  )
}
