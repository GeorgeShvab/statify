import { FC } from "react"
import { DataListProps } from "@/components/data-list/types"
import cn from "@/utils/cn/cn"
import "@/components/data-list/styles.scss"

const DataList: FC<DataListProps> = ({ children, className, ...props }) => {
  return (
    <div className={cn("data-list", className)} {...props}>
      {children}
    </div>
  )
}

export default DataList
