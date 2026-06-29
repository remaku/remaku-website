import { ArrowRightIcon } from 'lucide-react'

import { Link } from '@/i18n/navigation'

type FeatureContentProps = {
  title: string
  description: string
  cta: string
  href: string
}

export function FeatureContent(props: FeatureContentProps) {
  const { title, description, cta, href } = props

  return (
    <>
      <div className='space-y-3'>
        <h3 className='max-w-lg text-3xl font-medium sm:text-4xl'>{title}</h3>
        <p className='max-w-lg text-xl/tight text-fd-muted-foreground'>{description}</p>
      </div>
      <Link className='inline-flex w-fit items-center gap-2 text-lg font-medium text-brand' href={href}>
        {cta}
        <ArrowRightIcon className='size-5' />
      </Link>
    </>
  )
}
