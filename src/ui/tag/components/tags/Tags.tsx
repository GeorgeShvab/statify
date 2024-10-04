import { FC } from "react"
import Tag from "@/ui/tag/Tag"
import { TagsProps } from "@/ui/tag/components/tags/types"
import "@/ui/tag/components/tags/styles.scss"

const Tags: FC<TagsProps> = ({ data, ...props }) => {
  return (
    <div className="tags" {...props}>
      {data.map((item, index) => (
        <Tag key={index + item}>{item}</Tag>
      ))}
    </div>
  )
}

export default Tags
