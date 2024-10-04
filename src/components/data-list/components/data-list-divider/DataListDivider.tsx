import { FC } from "react"
import { DataListDividerProps } from "@/components/data-list/components/data-list-divider/types"
import "@/components/data-list/components/data-list-divider/styles.scss"

const DataListDivider: FC<DataListDividerProps> = (props) => {
  return (
    <div className="data-list__divider" {...props}>
      <hr />
    </div>
  )
}

export default DataListDivider
