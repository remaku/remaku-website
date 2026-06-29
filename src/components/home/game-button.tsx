import { cn } from '@/lib/cn'

export function GameButton(props: React.ComponentProps<'button'>) {
  const { children, className, ...rest } = props

  return (
    <button
      type='button'
      className={cn(
        'group relative flex items-center justify-center overflow-hidden rounded-xl border-4 border-amber-100 bg-linear-to-b from-amber-300 via-orange-500 to-red-600 px-10 py-4 text-xl font-black tracking-wider text-white uppercase shadow-[0_6px_0_#7f1d1d,0_14px_24px_rgba(0,0,0,.45)]',
        className,
      )}
      {...rest}
    >
      <span className='absolute inset-x-3 top-1 h-1/3 rounded-lg bg-white/35 blur-[1px]'></span>
      <span className='absolute inset-0 rounded-lg ring-2 ring-red-900/30 ring-inset'></span>
      <span className='relative drop-shadow-[0_2px_0_rgba(127,29,29,.9)]'>{children}</span>
    </button>
  )
}
