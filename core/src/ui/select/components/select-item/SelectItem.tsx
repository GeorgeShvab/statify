import { FC } from "react"
import { SelectItemProps } from "@/ui/select/components/select-item/SelectItem.types"
import cn from "@/utils/cn/cn"
import "@/ui/select/components/select-item/styles.scss"

const SelectItem: FC<SelectItemProps> = ({
  size = "medium",
  className,
  isSelected,
  ...props
}) => {
  return (
    <li
      className={cn(
        "select__item",
        "light",
        size,
        className,
        isSelected && "selected"
      )}
      role="option"
      {...props}
    />
  )
}

export default SelectItem
