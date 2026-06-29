import { appName } from '@/lib/shared'

import { Logo } from './logo'

type OGImageProps = {
  title: string
  description: string
}

const brandColor = '#ff5101'

function descriptionFontSize(text: string) {
  const len = text.length
  if (len <= 30) return '52px'
  if (len <= 60) return '42px'
  return '34px'
}

export function OGImage(props: OGImageProps) {
  const { title, description } = props

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        color: 'white',
        padding: '4rem',
        backgroundColor: '#0c0c0c',
        borderBottom: `18px solid ${brandColor}`,
      }}
    >
      <p
        style={{
          fontWeight: 800,
          fontSize: '82px',
          margin: 0,
        }}
      >
        {title}
      </p>
      <p
        style={{
          fontSize: descriptionFontSize(description),
          color: 'rgba(240,240,240,0.8)',
          margin: 0,
          marginTop: '16px',
          paddingBottom: '28px',
          borderBottom: `10px dashed ${brandColor}`,
        }}
      >
        {description}
      </p>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '20px',
          marginTop: 'auto',
          color: brandColor,
        }}
      >
        <Logo width={80} height={80} />
        <p
          style={{
            fontSize: '56px',
            fontWeight: 600,
            margin: 0,
          }}
        >
          {appName}
        </p>
      </div>
    </div>
  )
}
