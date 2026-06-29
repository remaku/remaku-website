import { KeyboardIcon } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'

import { cn } from '@/lib/cn'

type KeystrokeDisplayProps = {
  className?: string
  keys: Array<{
    id: string
    label: string
  }>
  label?: string
}

export function KeystrokeDisplay(props: KeystrokeDisplayProps) {
  const { keys, label, className, ...rest } = props
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      className={cn('flex flex-col items-start gap-1.5', className)}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
      animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      {...rest}
    >
      {label && (
        <div className='mb-0.5 rounded-md border bg-app-preview-card/95 px-2 py-1 text-xs font-medium text-app-preview-muted shadow-sm'>
          {label}
        </div>
      )}
      {keys.map((key, i) => (
        <motion.div
          key={key.id}
          className='flex items-center gap-2 rounded-md border bg-app-preview-card px-2.5 py-1'
          initial={shouldReduceMotion ? false : { opacity: 0, x: -12, scale: 0.96 }}
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  opacity: [0, 1, 1, 0],
                  x: [-12, 0, 0, 6],
                  scale: [0.96, 1, 1, 0.98],
                }
          }
          transition={{
            duration: 3,
            delay: i * 0.45,
            ease: 'easeOut',
            repeat: Infinity,
            repeatDelay: 1.2,
            times: [0, 0.18, 0.78, 1],
          }}
        >
          <KeyboardIcon className='size-3 shrink-0 text-brand' />
          <span className='text-xs font-medium text-app-preview-foreground/85'>{key.label}</span>
        </motion.div>
      ))}
    </motion.div>
  )
}
