import { FC } from "react"
import "./styles.scss"
import { SwitchProps } from "./Switch.types"
import cn from "@/utils/cn/cn"

const Switch: FC<SwitchProps> = ({
  checked,
  onChange,
  className,
  ...props
}) => {
  const handleChange = () => {
    onChange(!checked)
  }

  return (
    <div
      className={cn("switch light", className, checked && "checked")}
      onClick={handleChange}
      {...props}
    >
      <div className="switch__circle" />
    </div>
  )
}

export default Switch
