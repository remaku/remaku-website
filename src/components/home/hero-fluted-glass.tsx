'use client'

import { FlutedGlass } from '@paper-design/shaders-react'
import { useTheme } from 'fumadocs-ui/provider/base'
import { useEffect, useState } from 'react'

const LIGHT_IMAGE = '/images/remaku-hero-light.png'
const DARK_IMAGE = '/images/remaku-hero-dark.png'

const webGlContextAttributes: WebGLContextAttributes = {
  alpha: true,
  antialias: false,
  depth: false,
  stencil: false,
  preserveDrawingBuffer: false,
  powerPreference: 'default',
}

async function preloadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    img.decoding = 'async'
    img.addEventListener('load', () => {
      resolve(img)
    })
    img.addEventListener('error', reject)
    img.src = src
  })
}

export function HeroFlutedGlass(props: React.ComponentProps<typeof FlutedGlass>) {
  const { resolvedTheme } = useTheme()

  const [images, setImages] = useState<{
    light?: HTMLImageElement
    dark?: HTMLImageElement
  }>({})

  useEffect(() => {
    let cancelled = false

    async function loadImages() {
      const [light, dark] = await Promise.all([preloadImage(LIGHT_IMAGE), preloadImage(DARK_IMAGE)])

      if (!cancelled) setImages({ light, dark })
    }

    void loadImages()

    return () => {
      cancelled = true
    }
  }, [])

  const isDark = resolvedTheme === 'dark'

  const image = isDark ? (images.dark ?? DARK_IMAGE) : (images.light ?? LIGHT_IMAGE)

  return (
    <FlutedGlass
      image={image}
      colorBack='hsla(0, 0%, 0%, 0)'
      colorHighlight='hsl(0, 0%, 100%)'
      distortion={0.5}
      distortionShape='prism'
      edges={0.25}
      fit='cover'
      grainMixer={0}
      grainOverlay={0}
      highlights={0.1}
      margin={0}
      scale={1}
      shadows={0.25}
      shape='lines'
      shift={0}
      size={0.5}
      stretch={0}
      speed={0}
      minPixelRatio={1}
      maxPixelCount={1920 * 1080 * 2}
      webGlContextAttributes={webGlContextAttributes}
      {...props}
    />
  )
}
