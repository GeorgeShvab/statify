import { FC } from "react"
import { DropdownItemProps } from "@/ui/dropdown/Dropdown.types"
import cn from "@/utils/cn/cn"

const DropdownItem: FC<DropdownItemProps> = ({
  className,
  startIcon,
  endIcon,
  children,
  size = "medium",
  ...props
}) => {
  const content = (
    <>
      {startIcon}
      {children}
      {endIcon}
    </>
  )

  return (
    <li
      className={cn(
        "dropdown__item",
        "light",
        startIcon && "start-icon",
        endIcon && "end-icon",
        className,
        size
      )}
      {...props}
    >
      {content}
    </li>
  )
}

export default DropdownItem
