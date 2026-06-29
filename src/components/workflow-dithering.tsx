import { Dithering } from '@paper-design/shaders-react'
import { useTheme } from 'fumadocs-ui/provider/base'
import { useEffect, useMemo, useState } from 'react'

export function WorkflowDithering(props: React.ComponentProps<typeof Dithering>) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // oxlint-disable-next-line @eslint-react/set-state-in-effect
    setMounted(true)
  }, [])

  const colors = useMemo(() => {
    const isDark = resolvedTheme === 'dark'

    return {
      colorBack: isDark ? '#1d1002' : '#fff1e0',
      colorFront: isDark ? '#a85d0038' : '#ff8c0033',
    }
  }, [resolvedTheme])

  if (!mounted) return null

  return (
    <Dithering
      colorBack={colors.colorBack}
      colorFront={colors.colorFront}
      shape='warp'
      type='4x4'
      size={2}
      speed={0.24}
      {...props}
    />
  )
}
