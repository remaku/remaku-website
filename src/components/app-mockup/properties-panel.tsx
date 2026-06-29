import { ChevronDownIcon } from 'lucide-react'

import { Card } from './card'
import { Checkbox } from './checkbox'
import { Field } from './field'
import { Input } from './input'
import { TemplatePreview } from './template-preview'

type PropertiesPanelProps = {
  captureScreenLabel?: string
  matchMode?: string
  matchModeLabel?: string
  noteLabel?: string
  notePlaceholder?: string
  skipLabel?: string
  templateAlt: string
  templateLabel?: string
  templateName: string
  templateSrc: string
  title: string
}

export function PropertiesPanel(props: PropertiesPanelProps) {
  const {
    captureScreenLabel = 'Capture Screen',
    matchMode = 'Fast: grayscale',
    matchModeLabel = 'Match Mode',
    noteLabel = 'Note',
    notePlaceholder = 'Add a note for this step',
    skipLabel = 'Skip',
    templateAlt,
    templateLabel = 'Template',
    templateName,
    templateSrc,
    title,
  } = props

  return (
    <Card className='flex flex-col gap-3 overflow-hidden p-3'>
      <h2 className='truncate text-2xl font-medium'>{title}</h2>
      <div className='flex items-center gap-3'>
        <Checkbox id='skip' />
        <label htmlFor='skip'>{skipLabel}</label>
      </div>
      <Field label={noteLabel}>
        <Input placeholder={notePlaceholder} />
      </Field>
      <Field label={templateLabel}>
        <TemplatePreview src={templateSrc} alt={templateAlt} />
        <Input value={templateName} readOnly />
      </Field>
      <Field label={matchModeLabel}>
        <button
          type='button'
          className='flex h-8 w-full items-center justify-between rounded-md border bg-app-preview-control px-3 text-left'
        >
          <span>{matchMode}</span>
          <ChevronDownIcon className='size-4 opacity-65' />
        </button>
      </Field>
      <button type='button' className='h-8 rounded-md border bg-app-preview-control hover:bg-app-preview-button-hover'>
        {captureScreenLabel}
      </button>
    </Card>
  )
}
