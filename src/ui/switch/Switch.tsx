import { FC, useId, useState } from "react"
import "./styles.scss"
import { SwitchProps } from "./Switch.types"
import cn from "@/utils/cn/cn"

const Switch: FC<SwitchProps> = ({
  checked,
  onChange,
  className,
  inputProps,
  ...props
}) => {
  const handleChange = () => {
    onChange && onChange(!checked)
  }

  const inputId = useId()

  return (
    <div>
      <input
        className="switch-input"
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        id={inputId}
        {...inputProps}
        hidden
      />
      <label
        className={cn("switch light", className)}
        htmlFor={inputId}
        {...props}
      >
        <div className="switch__circle" />
      </label>
    </div>
  )
}

export default Switch
