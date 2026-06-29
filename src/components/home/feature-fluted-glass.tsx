'use client'

import { FlutedGlass } from '@paper-design/shaders-react'

type FeatureFlutedGlassProps = {
  image: string
}

export function FeatureFlutedGlass(props: FeatureFlutedGlassProps) {
  const { image } = props

  return (
    <FlutedGlass
      width='100%'
      height='100%'
      image={image}
      angle={30}
      blur={1}
      distortion={1}
      distortionShape='flat'
      edges={0.5}
      fit='cover'
      grainMixer={0.1}
      grainOverlay={0.1}
      highlights={0}
      margin={0}
      scale={1.2}
      shadows={0}
      shape='linesIrregular'
      shift={0}
      size={0.9}
      stretch={1}
    />
  )
}
