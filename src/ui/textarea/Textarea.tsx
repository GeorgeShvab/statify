import {
  ChangeEvent,
  FC,
  forwardRef,
  ForwardRefRenderFunction,
  useEffect,
  useRef,
} from "react"
import { TextareaProps } from "./types"
import "./styles.scss"
import cn from "@/utils/cn/cn"

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
    <div
      className={cn(
        "textarea py-2.5 flex-1 outline-none text-sm text-neutral-800 bg-white px-3.5 border rounded-lg",
        isError && "error"
      )}
    >
      <textarea
        ref={ref}
        className="textarea__input"
        onChange={handleChange}
        {...props}
      />
    </div>
  )
}

export default forwardRef(Textarea)
