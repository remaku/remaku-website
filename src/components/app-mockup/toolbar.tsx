import { useToolbarItems } from '@/hooks/use-toolbar-items'

export function Toolbar() {
  const items = useToolbarItems()

  return (
    <div className='flex items-center gap-1 px-3 py-1'>
      {items.map((item) => {
        const Icon = item.icon

        return (
          <button
            type='button'
            key={item.label}
            aria-label={item.label}
            className='flex h-9 shrink-0 items-center justify-center gap-2 rounded-md px-3 text-app-preview-foreground/85 hover:bg-app-preview-button-hover disabled:opacity-45'
            disabled={item.disabled}
          >
            {Icon && <Icon className='size-4' />}
            {!item.iconOnly && <span>{item.label}</span>}
          </button>
        )
      })}
    </div>
  )
}
