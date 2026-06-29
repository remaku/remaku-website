import { cn } from '@/lib/cn'

export function Card(props: React.ComponentProps<'div'>) {
  const { children, className, ...rest } = props

  return (
    <div className={cn('min-h-0 rounded-lg border bg-app-preview-card', className)} {...rest}>
      {children}
    </div>
  )
}
