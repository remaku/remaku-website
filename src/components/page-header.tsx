import type { ComponentProps, ReactNode } from 'react'

import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/cn'

type PageHeaderProps = ComponentProps<'header'>

export function PageHeader(props: PageHeaderProps) {
  const { children, className, ...rest } = props

  return (
    <header className={cn('space-y-10', className)} {...rest}>
      <div className='max-w-3xl space-y-4'>{children}</div>
      <Separator />
    </header>
  )
}

type PageTitleProps = Omit<ComponentProps<'h1'>, 'children'> & {
  children: ReactNode
}

export function PageTitle(props: PageTitleProps) {
  const { children, className, ...rest } = props

  return (
    <h1 className={cn('text-3xl/tight font-medium md:text-5xl/tight', className)} {...rest}>
      {children}
    </h1>
  )
}

type PageDescriptionProps = Omit<ComponentProps<'p'>, 'children'> & {
  children: ReactNode
}

export function PageDescription(props: PageDescriptionProps) {
  const { className, ...rest } = props

  return <p className={cn('text-lg text-fd-muted-foreground', className)} {...rest} />
}
