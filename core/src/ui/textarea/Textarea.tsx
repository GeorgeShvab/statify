"use client"

import { ChangeEvent, forwardRef, ForwardRefRenderFunction } from "react"
import { TextareaProps } from "@/ui/textarea/types"
import cn from "@/utils/cn/cn"
import "@/ui/textarea/styles.scss"

const Textarea: ForwardRefRenderFunction<HTMLTextAreaElement, TextareaProps> = (
  { className, onChange, isError, ...props },
  ref
) => {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) onChange(e)

    e.target.style.height = "auto"
    e.target.style.height = e.target.scrollHeight + "px"
  }

  return (
    <div className={cn("textarea", isError && "error")}>
      <textarea
        ref={ref}
        className={cn("textarea__input", className)}
        onChange={handleChange}
        {...props}
      />
    </div>
  )
}

export default forwardRef(Textarea)
