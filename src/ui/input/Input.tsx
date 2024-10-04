import { forwardRef, ForwardRefRenderFunction } from "react"
import { InputProps } from "@/ui/input/Input.types"

const Input: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { isError, className = "", ...props },
  ref
) => {
  return (
    <input
      ref={ref}
      className={`h-10 flex-1 outline-none text-sm text-neutral-600 bg-white px-3.5 border rounded-lg ${className} ${
        isError && "error"
      }`}
      {...props}
    />
  )
}

export default forwardRef(Input)
