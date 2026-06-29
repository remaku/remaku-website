import { cn } from '@/lib/cn'

type ListItemProps = {
  active?: boolean
} & React.ComponentProps<'button'>

export function ListItem(props: ListItemProps) {
  const { active = false, children, className, ...rest } = props

  return (
    <button
      type='button'
      data-active={active}
      className={cn(
        'relative flex h-10 w-full items-center rounded-lg px-4 text-left hover:bg-app-preview-button-hover data-[active=true]:bg-app-preview-button-hover',
        className,
      )}
      {...rest}
    >
      {active && (
        <div className='absolute top-1/2 left-0 h-4.5 w-0.75 -translate-y-1/2 rounded-l-[1px] rounded-r-sm bg-brand' />
      )}
      {children}
    </button>
  )
}
