'use client'

import type { LucideIcon } from 'lucide-react'

import {
  ChevronDownIcon,
  ChevronsUpDownIcon,
  ClockIcon,
  Grid3x3Icon,
  HandIcon,
  ImageIcon,
  ImagesIcon,
  KeyboardIcon,
  MousePointerClickIcon,
  MousePointerIcon,
  RepeatIcon,
  ScanSearchIcon,
} from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'

import { useDescribeStep } from '@/hooks/use-describe-step'
import { cn } from '@/lib/cn'

import { Card } from './card'

type StepCommon = {
  skip?: boolean
  note?: string
  active?: boolean
}

type KeyStep = StepCommon & {
  type: 'key'
  key: string
  hold_ms?: number
}

type DelayStep = StepCommon & {
  type: 'delay'
  ms?: number
}

type WaitImageStep = StepCommon & {
  type: 'wait_image'
  template: string
  timeout_ms?: number
  on_timeout?: string
  threshold?: number
}

type HoldKeyUntilGoneStep = StepCommon & {
  type: 'hold_key_until_gone'
  key: string
  template: string
  load_delay_ms?: number
  find_timeout_ms?: number
  gone_grace_ms?: number
  hard_timeout_ms?: number
  threshold?: number
}

type TextInputStep = StepCommon & {
  type: 'text_input'
  text: string
  interval_ms?: number
}

type RepeatStep = StepCommon & {
  type: 'repeat'
  count?: number
  steps?: Step[]
}

type IfImageStep = StepCommon & {
  type: 'if_image'
  template: string
  timeout_ms?: number
  threshold?: number
  then: Step[]
  else_?: Step[]
}

type IfAnyImageStep = StepCommon & {
  type: 'if_any_image'
  templates: string[]
  timeout_ms?: number
  on_timeout?: string
  threshold?: number
  branches?: Record<string, Step[]>
}

type GridNavStep = StepCommon & {
  type: 'grid_nav'
  rows?: number
  start?: number
  on_next_row?: Step[]
  on_next_col?: Step[]
}

type MouseClickStep = StepCommon & {
  type: 'mouse_click'
  button?: 'left' | 'right' | 'middle'
  target?: 'coordinate' | 'image'
  x?: number
  y?: number
  relative?: boolean
  template?: string
  threshold?: number
  timeout_ms?: number
  on_timeout?: string
  down_up_delay_ms?: number
}

type MouseMoveStep = StepCommon & {
  type: 'mouse_move'
  target?: 'coordinate' | 'image'
  x?: number
  y?: number
  relative?: boolean
  template?: string
  threshold?: number
  timeout_ms?: number
  on_timeout?: string
}

type MouseScrollStep = StepCommon & {
  type: 'mouse_scroll'
  clicks?: number
  interval_ms?: number
}

type WaitNumberStep = StepCommon & {
  type: 'wait_number'
  x?: number
  y?: number
  width?: number
  height?: number
  capture_width?: number
  capture_height?: number
  relative?: boolean
  operator?: string
  value?: number
  timeout_ms?: number
  stable_reads?: number
}

type IfNumberStep = StepCommon & {
  type: 'if_number'
  x?: number
  y?: number
  width?: number
  height?: number
  capture_width?: number
  capture_height?: number
  relative?: boolean
  operator?: string
  value?: number
  timeout_ms?: number
  stable_reads?: number
  then: Step[]
  else_?: Step[]
}

type RepeatUntilNumberStep = StepCommon & {
  type: 'repeat_until_number'
  x?: number
  y?: number
  width?: number
  height?: number
  capture_width?: number
  capture_height?: number
  relative?: boolean
  operator?: string
  value?: number
  timeout_ms?: number
  stable_reads?: number
  count?: number
  check_first?: boolean
  steps?: Step[]
}

export type Step =
  | KeyStep
  | DelayStep
  | WaitImageStep
  | HoldKeyUntilGoneStep
  | TextInputStep
  | RepeatStep
  | IfImageStep
  | IfAnyImageStep
  | GridNavStep
  | MouseClickStep
  | MouseMoveStep
  | MouseScrollStep
  | WaitNumberStep
  | IfNumberStep
  | RepeatUntilNumberStep

type StepTreeProps = {
  steps: Step[]
  maxHeight?: number
  animateEntries?: boolean
}

const stepIcons: Record<Step['type'], LucideIcon> = {
  key: KeyboardIcon,
  delay: ClockIcon,
  text_input: KeyboardIcon,
  wait_image: ImageIcon,
  hold_key_until_gone: HandIcon,
  repeat: RepeatIcon,
  if_image: ScanSearchIcon,
  if_any_image: ImagesIcon,
  grid_nav: Grid3x3Icon,
  mouse_click: MousePointerClickIcon,
  mouse_move: MousePointerIcon,
  mouse_scroll: ChevronsUpDownIcon,
  wait_number: ScanSearchIcon,
  if_number: ScanSearchIcon,
  repeat_until_number: RepeatIcon,
}

const stepDepthIndent = 40
const treeButtonClassName =
  'relative flex h-8 w-full items-center rounded-md text-left hover:bg-app-preview-button-hover'

function getContainerChildren(step: Step): Step[] | null {
  switch (step.type) {
    case 'repeat': {
      return step.steps ?? null
    }
    case 'repeat_until_number': {
      return step.steps ?? null
    }
    case 'if_image': {
      return [...step.then, ...(step.else_ ?? [])]
    }
    case 'if_number': {
      return [...step.then, ...(step.else_ ?? [])]
    }
    case 'if_any_image': {
      return Object.values(step.branches ?? {}).flat()
    }
    case 'grid_nav': {
      return [...(step.on_next_row ?? []), ...(step.on_next_col ?? [])]
    }
    case 'key':
    case 'delay':
    case 'wait_image':
    case 'wait_number':
    case 'hold_key_until_gone':
    case 'text_input':
    case 'mouse_click':
    case 'mouse_move':
    case 'mouse_scroll': {
      return null
    }
  }
}

export function StepTree(props: StepTreeProps) {
  const { steps, maxHeight, animateEntries } = props

  return (
    <Card className='flex flex-col p-3'>
      <div style={maxHeight ? { maxHeight: `${maxHeight}px`, overflowY: 'auto' } : undefined} className='no-scrollbar'>
        <div className='space-y-1.5'>
          {animateEntries ? (
            <AnimatePresence>
              {steps.map((step, i) => (
                <motion.div
                  // oxlint-disable-next-line @eslint-react/no-array-index-key
                  key={`${step.type}-${i}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                >
                  <StepTreeNode depth={0} step={step} />
                </motion.div>
              ))}
            </AnimatePresence>
          ) : (
            steps.map((step, i) => (
              // oxlint-disable-next-line @eslint-react/no-array-index-key -- static demo data, never reorders
              <StepTreeNode key={`${step.type}-${i}`} depth={0} step={step} />
            ))
          )}
        </div>
      </div>
    </Card>
  )
}

function StepTreeNode(props: { depth: number; step: Step }) {
  const { depth, step } = props
  const children = getContainerChildren(step)

  if (children && children.length > 0) {
    return <ContainerNode depth={depth} step={step} />
  }

  return <LeafNode depth={depth} step={step} />
}

function ContainerNode(props: { depth: number; step: Step }) {
  const { depth, step } = props
  const [expanded, setExpanded] = useState(true)
  const describeStep = useDescribeStep()
  const Icon = stepIcons[step.type]
  const children = getContainerChildren(step) ?? []
  const childDepth = depth + 1

  return (
    <div>
      <button
        type='button'
        aria-expanded={expanded}
        className={cn(treeButtonClassName, 'gap-2 px-2')}
        style={{ paddingLeft: depth * stepDepthIndent + 20 }}
        onClick={() => {
          setExpanded((v) => !v)
        }}
      >
        <ChevronDownIcon className={cn('size-4 shrink-0 opacity-75 transition-transform', !expanded && '-rotate-90')} />
        <Icon className='size-5 shrink-0' />
        <span className='min-w-0 truncate'>{describeStep(step)}</span>
      </button>
      <div
        aria-hidden={!expanded}
        className={cn(
          'grid transition-[grid-template-rows,opacity] duration-300 ease-out',
          expanded ? 'grid-rows-[1fr] opacity-100' : 'pointer-events-none grid-rows-[0fr] opacity-0',
        )}
      >
        <div className='min-h-0 overflow-hidden'>
          <div className='space-y-1.5 pt-1.5'>
            {children.map((child, i) => (
              // oxlint-disable-next-line @eslint-react/no-array-index-key -- static demo data, never reorders
              <StepTreeNode key={`${child.type}-${i}`} depth={childDepth} step={child} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function LeafNode(props: { depth: number; step: Step }) {
  const { depth, step } = props
  const describeStep = useDescribeStep()
  const Icon = stepIcons[step.type]

  return (
    <button
      type='button'
      data-active={step.active}
      className={cn(treeButtonClassName, 'gap-3 pr-3 data-[active=true]:bg-app-preview-button-hover')}
      style={{ paddingLeft: depth * stepDepthIndent + 20 }}
    >
      {step.active && (
        <span className='absolute top-1/2 left-0 h-4.5 w-0.75 -translate-y-1/2 rounded-l-[1px] rounded-r-sm bg-brand' />
      )}
      <Icon className='size-5 shrink-0' />
      <span className='min-w-0 truncate'>{describeStep(step)}</span>
    </button>
  )
}
