import {
  FC,
  forwardRef,
  ForwardRefRenderFunction,
  useId,
  useState,
} from "react"
import "./styles.scss"
import { SwitchProps } from "./Switch.types"
import cn from "@/utils/cn/cn"

const Switch: ForwardRefRenderFunction<HTMLInputElement, SwitchProps> = (
  { checked, onChange, className, labelProps, children, ...props },
  ref
) => {
  const inputId = useId()

  return (
    <label
      htmlFor={inputId}
      {...labelProps}
      className={cn("switch", labelProps?.className)}
    >
      <input
        ref={ref}
        className="switch__input"
        type="checkbox"
        checked={checked}
        onChange={onChange}
        id={inputId}
        {...props}
        hidden
      />
      <div className="switch__container light">
        <div className="switch__container-circle" />
      </div>
      {children && <p className="switch__label">{children}</p>}
    </label>
  )
}

export default forwardRef(Switch)
