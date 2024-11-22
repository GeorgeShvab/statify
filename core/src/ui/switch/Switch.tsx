import { forwardRef, ForwardRefRenderFunction, useId } from "react"
import { SwitchProps } from "@/ui/switch/Switch.types"
import cn from "@/utils/cn/cn"
import "@/ui/switch/styles.scss"

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
      <div className={cn("switch__container", className)}>
        <div className="switch__container-circle" />
      </div>
      {children && <p className="switch__label">{children}</p>}
    </label>
  )
}

export default forwardRef(Switch)
