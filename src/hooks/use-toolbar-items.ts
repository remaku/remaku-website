import type { LucideIcon } from 'lucide-react'

import {
  ArrowDownIcon,
  ArrowUpIcon,
  KeyboardIcon,
  PlayIcon,
  PlusIcon,
  Redo2Icon,
  Trash2Icon,
  Undo2Icon,
} from 'lucide-react'
import { useTranslations } from 'next-intl'

type ToolbarItem = {
  label: string
  icon?: LucideIcon
  iconOnly?: boolean
  disabled?: boolean
}

export function useToolbarItems(): ToolbarItem[] {
  const t = useTranslations()

  return [
    { label: t('home.mockup.toolbar.file') },
    { label: t('home.mockup.toolbar.edit') },
    { label: t('home.mockup.toolbar.help') },
    { label: t('home.mockup.toolbar.run'), icon: PlayIcon },
    { label: t('home.mockup.toolbar.record'), icon: KeyboardIcon },
    { label: t('home.mockup.toolbar.add'), icon: PlusIcon },
    { label: t('home.mockup.toolbar.delete'), icon: Trash2Icon, iconOnly: true },
    { label: t('home.mockup.toolbar.moveUp'), icon: ArrowUpIcon, iconOnly: true },
    { label: t('home.mockup.toolbar.moveDown'), icon: ArrowDownIcon, iconOnly: true },
    { label: t('home.mockup.toolbar.undo'), icon: Undo2Icon, iconOnly: true },
    { label: t('home.mockup.toolbar.redo'), icon: Redo2Icon, iconOnly: true, disabled: true },
  ]
}
