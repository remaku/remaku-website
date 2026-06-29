import { defineConfig } from '@nelsonlaidev/oxlint-config'

export default defineConfig({
  custom: {
    tailwindcss: {
      entryPoint: 'src/styles/globals.css',
      ignore: ['not-prose'],
    },
  },
})
