import { FC } from "react"
import { InputLabelProps } from "@/ui/input-label/types"
import cn from "@/utils/cn/cn"
import "@/ui/input-label/styles.scss"

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
