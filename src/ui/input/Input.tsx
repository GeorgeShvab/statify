import { forwardRef, ForwardRefRenderFunction } from "react"
import { InputProps } from "@/ui/input/Input.types"
import cn from "@/utils/cn/cn"
import "@/ui/input/styles.scss"

const Input: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { isError, className, ...props },
  ref
) => {
  const inputClassName = cn("input", className, isError && "error")

  return <input ref={ref} className={inputClassName} {...props} />
}

export default forwardRef(Input)
