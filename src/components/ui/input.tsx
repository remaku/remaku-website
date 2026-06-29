import { Input as InputPrimitive } from '@base-ui/react/input'

import { cn } from '@/lib/cn'

export function Input(props: React.ComponentProps<'input'>) {
  const { className, type, ...rest } = props

  return (
    <InputPrimitive
      type={type}
      data-slot='input'
      className={cn(
        'h-8 w-full min-w-0 rounded-lg border border-fd-secondary bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-fd-foreground placeholder:text-fd-muted-foreground focus-visible:border-fd-ring focus-visible:ring-3 focus-visible:ring-fd-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-fd-secondary/50 disabled:opacity-50 aria-invalid:border-fd-error aria-invalid:ring-3 aria-invalid:ring-fd-error/20 md:text-sm dark:bg-fd-secondary/30 dark:disabled:bg-fd-secondary/80 dark:aria-invalid:border-fd-error/50 dark:aria-invalid:ring-fd-error/40',
        className,
      )}
      {...rest}
    />
  )
}
