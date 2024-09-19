import { FC } from "react"
import { TagProps } from "./types"
import "./styles.scss"

const Tag: FC<TagProps> = ({ children }) => {
  return (
    <div className="tag light">
      <span>{children}</span>
    </div>
  )
}

export default Tag
