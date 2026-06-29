import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'

import { FeatureFlutedGlass } from './feature-fluted-glass'

type FeatureShowcaseProps = {
  image: string
  reverse?: boolean
  children: [ReactNode, ReactNode]
}

export function FeatureShowcase(props: FeatureShowcaseProps) {
  const { image, reverse = false, children } = props
  const [content, visual] = children

  return (
    <article
      className={cn(
        'grid overflow-hidden rounded-2xl border bg-fd-card',
        reverse ? 'lg:grid-cols-[2fr_1fr]' : 'lg:grid-cols-[1fr_2fr]',
      )}
    >
      <div className={cn('flex flex-col justify-center gap-6 p-8 sm:p-12', reverse && 'lg:order-2')}>{content}</div>

      <div
        className={cn(
          'relative min-h-(--visual-height) overflow-hidden border-t [--shell-padding:1rem] [--shell-scale:clamp(.5,calc((100vw-2rem)/var(--shell-width)),1)] [--shell-width:48rem] [--visual-height:clamp(26rem,82vw,43.75rem)] md:[--shell-scale:1] md:[--visual-height:43.75rem] lg:border-t-0 lg:[--shell-padding:4rem]',
          reverse ? 'lg:border-r' : 'lg:border-l',
        )}
      >
        <FeatureFlutedGlass image={image} />
        {visual}
      </div>
    </article>
  )
}
