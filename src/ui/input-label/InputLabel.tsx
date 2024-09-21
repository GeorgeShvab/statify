import { FC } from "react"
import { InputLabelProps } from "./types"
import "./styles.scss"
import cn from "@/utils/cn/cn"

const InputLabel: FC<InputLabelProps> = ({
  label,
  children,
  className,
  ...props
}) => {
  return (
    <div className={cn("input-label", className)} {...props}>
      <p className="input-label__title">{label}</p>
      {children}
    </div>
  )
}

export default InputLabel
