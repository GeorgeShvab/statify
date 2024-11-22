import { FC } from "react"
import { TagProps } from "@/ui/tag/types"
import "@/ui/tag/styles.scss"

const Tag: FC<TagProps> = ({ children }) => {
  return (
    <div className="tag">
      <span>{children}</span>
    </div>
  )
}

export default Tag
