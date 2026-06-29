import { ChevronDownIcon } from 'lucide-react'

import { cn } from '@/lib/cn'

type ButtonProps = {
  type?: 'button' | 'dropdown'
  className?: string
} & React.ComponentProps<'button'>

export function Button(props: ButtonProps) {
  const { type = 'dropdown', className, children, ...rest } = props

  return (
    <button
      type='button'
      className={cn(
        'flex h-8 items-center rounded-md border bg-app-preview-control px-3 hover:bg-app-preview-button-hover',
        type === 'dropdown' ? 'justify-between' : 'justify-center gap-2',
        className,
      )}
      {...rest}
    >
      {children}
      {type === 'dropdown' && <ChevronDownIcon className='size-4 opacity-65' />}
    </button>
  )
}
