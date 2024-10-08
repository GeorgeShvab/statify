import { FC } from "react"
import Tag from "@/ui/tag/Tag"
import { TagsProps } from "@/ui/tag/components/tags/types"
import cn from "@/utils/cn/cn"
import "@/ui/tag/components/tags/styles.scss"

const Tags: FC<TagsProps> = ({ data, className, ...props }) => {
  return (
    <div className={cn("tags", className)} {...props}>
      {data.map((item, index) => (
        <Tag key={index + item}>{item}</Tag>
      ))}
    </div>
  )
}

export default Tags
