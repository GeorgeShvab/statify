import { FC } from "react"
import { PageWrapperProps } from "@/layout/page-wrapper/types"
import cn from "@/utils/cn/cn"
import "@/layout/page-wrapper/styles.scss"

const PageWrapper: FC<PageWrapperProps> = ({ className, ...props }) => {
  return <div className={cn("page-wrapper", className)} {...props} />
}

export default PageWrapper
