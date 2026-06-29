import { defineI18n } from 'fumadocs-core/i18n'

export const locales = ['en', 'zh-TW', 'zh-CN'] as const
export const defaultLocale = 'en' as const

export const i18n = defineI18n({
  defaultLanguage: defaultLocale,
  languages: [...locales],
  hideLocale: 'default-locale',
})
