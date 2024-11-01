import { FC } from "react"
import { PageContentWrapperProps } from "@/layout/page-content-wrapper/types"
import cn from "@/utils/cn/cn"
import "@/layout/page-content-wrapper/styles.scss"

const PageContentWrapper: FC<PageContentWrapperProps> = ({
  className,
  ...props
}) => {
  return <div className={cn("page-content-wrapper", className)} {...props} />
}

export default PageContentWrapper
