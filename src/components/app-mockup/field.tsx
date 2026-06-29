type FieldProps = {
  children: React.ReactNode
  label: string
}

export function Field(props: FieldProps) {
  const { children, label } = props

  return (
    <label className='grid gap-2'>
      <span>{label}</span>
      {children}
    </label>
  )
}
