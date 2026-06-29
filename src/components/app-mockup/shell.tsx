import { ArrowLeftIcon, MinusIcon, SquareIcon, XIcon } from 'lucide-react'

import { cn } from '@/lib/cn'

import { Logo } from '../logo'

type ShellProps = {
  showBackButton?: boolean
} & React.ComponentProps<'div'>

export function Shell(props: ShellProps) {
  const { showBackButton = false, children, className, ...rest } = props

  return (
    <div
      className={cn('overflow-hidden rounded-2xl border bg-app-preview-shell text-app-preview-foreground', className)}
      {...rest}
    >
      <div className='flex h-12 items-center justify-between px-4'>
        <div className='flex items-center gap-3'>
          {showBackButton && <ArrowLeftIcon className='size-4' />}
          <Logo className='size-5' />
          <span className='font-medium'>Remaku</span>
        </div>
        <div className='flex items-center gap-8 opacity-80'>
          <MinusIcon className='size-4' />
          <SquareIcon className='size-3' />
          <XIcon className='size-4' />
        </div>
      </div>
      {children}
    </div>
  )
}
