import { ComponentProps, FC } from 'react'

interface Props extends ComponentProps<'input'> {}

const Input: FC<Props> = ({ className = '', ...props }) => {
  return (
    <input
      className={`h-10 flex-1 outline-none text-sm text-neutral-800 bg-white px-3.5 border rounded-lg ${className}`}
      {...props}
    />
  )
}

export default Input
