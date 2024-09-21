import { FC } from "react"
import { LabelProps } from "@/ui/label/types"
import cn from "@/utils/cn/cn"
import "@/ui/label/styles.scss"

const Label: FC<LabelProps> = ({ label, children, className, ...props }) => {
  return (
    <div className={cn("input-label", className)} {...props}>
      <p className="input-label__title">{label}</p>
      {children}
    </div>
  )
}

export default Label
