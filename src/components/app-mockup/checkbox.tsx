import { Checkbox as CheckboxPrimitive } from '@base-ui/react/checkbox'
import { CheckIcon } from 'lucide-react'

import { cn } from '@/lib/cn'

type CheckboxProps = {
  className?: string
  defaultChecked?: boolean
  id?: string
}

export function Checkbox(props: CheckboxProps) {
  const { className, defaultChecked = false, id } = props

  return (
    <CheckboxPrimitive.Root
      defaultChecked={defaultChecked}
      className={cn(
        'flex size-5 shrink-0 items-center justify-center rounded-md border bg-app-preview-checkbox data-checked:bg-brand data-checked:text-white',
        className,
      )}
      id={id}
    >
      <CheckboxPrimitive.Indicator className='flex data-unchecked:hidden'>
        <CheckIcon className='size-4' />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}
