import { FC } from "react"
import { DataListItemProps } from "@/components/data-list/components/data-list-item/types"
import cn from "@/utils/cn/cn"
import "@/components/data-list/components/data-list-item/styles.scss"

const DataListItem: FC<DataListItemProps> = ({
  label,
  data,
  className,
  ...props
}) => {
  return (
    <div className={cn("data-list__item", className)} {...props}>
      <p className="data-list__item-label">{label}</p>
      <p className="data-list__item-data">{data}</p>
    </div>
  )
}

export default DataListItem
