import { FC } from "react"
import ContentLoader, { IContentLoaderProps } from "react-content-loader"

const SelectWithSearchLoader: FC<IContentLoaderProps> = (props) => {
  return (
    <ContentLoader
      speed={5}
      width="100%"
      height="40px"
      viewBox="0 0 100% 40"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      preserveAspectRatio="none"
      {...props}
    >
      <rect x="0" y="0" rx="8" ry="8" width="100%" height="40" />
    </ContentLoader>
  )
}

export default SelectWithSearchLoader
