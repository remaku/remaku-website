import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared'

import { zhCN } from '@fumadocs/language/zh-cn'
import { zhTW } from '@fumadocs/language/zh-tw'
import { uiTranslations } from 'fumadocs-ui/i18n'

import { Logo } from '@/components/logo'
import { i18n } from '@/i18n/config'

import { appName, githubUrl } from './shared'

export const translations = i18n
  .translations()
  .extend(uiTranslations())
  .preset('zh-TW', zhTW())
  .preset('zh-CN', zhCN())
  .add({
    en: {
      displayName: 'English',
    },
    'zh-TW': {
      displayName: '繁體中文',
    },
    'zh-CN': {
      displayName: '简体中文',
    },
  })

export function baseOptions(lang: string): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          <Logo className='size-8' />
          <span className='font-semibold'>{appName}</span>
        </>
      ),
      url: `/${lang}`,
    },
    githubUrl,
    links: [],
  }
}
