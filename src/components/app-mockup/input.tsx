import { cn } from '@/lib/cn'

export function Input(props: React.ComponentProps<'input'>) {
  const { className, ...rest } = props

  return (
    <input
      className={cn(
        'h-8 w-full rounded-md border bg-app-preview-control px-3 outline-none placeholder:text-app-preview-muted',
        className,
      )}
      {...rest}
    />
  )
}
