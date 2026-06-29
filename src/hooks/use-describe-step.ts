import type { Step } from '@/components/app-mockup'

import { useTranslations } from 'next-intl'

const VALID_OPERATORS = new Set(['=', '\u2260', '>', '\u2265', '<', '\u2264'])

export function useDescribeStep() {
  const t = useTranslations()

  const buttonLabel = {
    left: t('home.hero.describeStep.button_left'),
    right: t('home.hero.describeStep.button_right'),
    middle: t('home.hero.describeStep.button_middle'),
  }

  return (step: Step): string => {
    switch (step.type) {
      case 'key': {
        return t('home.hero.describeStep.key', { key: step.key })
      }
      case 'delay': {
        return t('home.hero.describeStep.delay', { ms: String(step.ms ?? '') })
      }
      case 'wait_image': {
        return t('home.hero.describeStep.wait_image', { template: step.template })
      }
      case 'hold_key_until_gone': {
        return t('home.hero.describeStep.hold_key_until_gone', { key: step.key, template: step.template })
      }
      case 'text_input': {
        return t('home.hero.describeStep.text_input', { text: step.text })
      }
      case 'wait_number': {
        const operator = step.operator && VALID_OPERATORS.has(step.operator) ? step.operator : '\u2265'
        return t('home.hero.describeStep.wait_number', { operator, value: String(step.value ?? '') })
      }
      case 'if_number': {
        const operator = step.operator && VALID_OPERATORS.has(step.operator) ? step.operator : '='
        return t('home.hero.describeStep.if_number', { operator, value: String(step.value ?? '') })
      }
      case 'repeat_until_number': {
        const operator = step.operator && VALID_OPERATORS.has(step.operator) ? step.operator : '\u2265'
        return t('home.hero.describeStep.repeat_until_number', { operator, value: String(step.value ?? '') })
      }
      case 'repeat': {
        return t('home.hero.describeStep.repeat', { count: String(step.count ?? '') })
      }
      case 'if_image': {
        return t('home.hero.describeStep.if_image', { template: step.template })
      }
      case 'if_any_image': {
        return t('home.hero.describeStep.if_any_image')
      }
      case 'grid_nav': {
        return t('home.hero.describeStep.grid_nav', { rows: String(step.rows ?? '') })
      }
      case 'mouse_click': {
        const button = buttonLabel[step.button ?? 'left']
        if (step.target === 'image') {
          return t('home.hero.describeStep.mouse_click_image', { button, template: step.template ?? '' })
        }
        return t('home.hero.describeStep.mouse_click_coord', {
          button,
          x: String(step.x ?? ''),
          y: String(step.y ?? ''),
        })
      }
      case 'mouse_move': {
        if (step.target === 'image') {
          return t('home.hero.describeStep.mouse_move_image', { template: step.template ?? '' })
        }
        return t('home.hero.describeStep.mouse_move_coord', { x: String(step.x ?? ''), y: String(step.y ?? '') })
      }
      case 'mouse_scroll': {
        return t('home.hero.describeStep.mouse_scroll', { clicks: String(step.clicks ?? '') })
      }
    }
  }
}
