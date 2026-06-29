import { cn } from '@/lib/cn'

export function List(props: React.ComponentProps<'div'>) {
  const { children, className, ...rest } = props

  return (
    <div className={cn('flex flex-col gap-2', className)} {...rest}>
      {children}
    </div>
  )
}
