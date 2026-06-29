import Image from 'next/image'

type TemplatePreviewProps = {
  alt: string
  src: string
}

export function TemplatePreview(props: TemplatePreviewProps) {
  const { alt, src } = props

  return (
    <div className='relative aspect-video overflow-hidden rounded-md bg-app-preview-control'>
      <Image src={src} alt={alt} fill sizes='(min-width: 768px) 18rem, 100vw' className='object-cover' />
    </div>
  )
}
