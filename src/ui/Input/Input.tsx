import { ComponentProps, FC, forwardRef, ForwardRefRenderFunction } from "react"

interface Props extends ComponentProps<"input"> {
  isError?: boolean
}

const Input: ForwardRefRenderFunction<HTMLInputElement, Props> = (
  { isError, className = "", ...props },
  ref
) => {
  return (
    <input
      ref={ref}
      className={`h-10 flex-1 outline-none text-sm text-neutral-800 bg-white px-3.5 border rounded-lg ${className} ${
        isError && "error"
      }`}
      {...props}
    />
  )
}

export default forwardRef(Input)
