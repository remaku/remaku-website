import { PlusIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Button } from './button'
import { Card } from './card'
import { List } from './list'
import { ListItem } from './list-item'

export type Macro = {
  label: string
  active?: boolean
}

type MacroPanelProps = {
  macros: Macro[]
}

export function MacroPanel(props: MacroPanelProps) {
  const { macros } = props
  const t = useTranslations()

  return (
    <Card className='flex flex-col p-3'>
      <div className='mb-4 flex items-center justify-between gap-3'>
        <p className='text-2xl font-medium'>{t('home.mockup.macros.title')}</p>
        <Button type='button'>
          <PlusIcon className='size-4' />
          <span>{t('home.mockup.macros.add')}</span>
        </Button>
      </div>
      <List className='gap-3'>
        {macros.map((macro) => (
          <ListItem active={macro.active} key={macro.label}>
            {macro.label}
          </ListItem>
        ))}
      </List>
    </Card>
  )
}
